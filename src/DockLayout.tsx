/**
 * DockLayout component and its configuration callbacks.
 * @module
 */
import * as React from "react";
import * as ReactDOM from "react-dom";
import debounce from 'lodash/debounce';
import {
  BoxData,
  ColumnState,
  defaultGroup,
  DockContext,
  DockContextProvider,
  DropDirection,
  FloatPosition,
  LayoutBase,
  LayoutData,
  LayoutSize,
  PanelBase,
  PanelData,
  SideColumns,
  placeHolderGroup,
  placeHolderStyle,
  TabBase,
  TabData,
  TabDefinitions,
  TabGroup,
  TabPaneCache
} from "./DockData";
import * as Columns from './SideColumns';
import {DockBox} from "./DockBox";
import {FloatBox} from "./FloatBox";
import {DockPanel} from "./DockPanel";
import * as Algorithm from "./Algorithm";
import * as Serializer from "./Serializer";
import * as DragManager from "./dragdrop/DragManager";
import {MaxBox} from "./MaxBox";
import {WindowBox} from "./WindowBox";

/** DockLayout configuration, tab definitions and persistence callbacks. */
export interface LayoutProps {
  /**
   * Shared drag scope. Layouts with the same id allow tabs and panels to move between them.
   */
  dockId?: string;

  /**
   * Initial uncontrolled layout. Tabs may be `{id}` references resolved by
   * {@link tabs} or {@link loadTab}, or full inline {@link TabData} definitions.
   */
  defaultLayout?: LayoutBase;

  /**
   * Controlled layout. Accept changes by supplying {@link onLayoutChange} and updating this prop.
   */
  layout?: LayoutBase;

  /**
   * Tab definitions keyed by id. The key supplies the tab's id.
   * Replace this object to update titles and content independently of layout.
   * Definitions are copied into the runtime layout; closing a tab does not remove its definition.
   */
  tabs?: TabDefinitions;

  /** Collapse and accordion controls for the outer columns of a horizontal dock layout. */
  sideColumns?: SideColumns;

  /**
   * Tab style and behavior options keyed by group name.
   */
  groups?: {[key: string]: TabGroup};

  /**
   * Called after a user action or layout API change; `loadLayout` does not call it.
   * @param newLayout Saved layout; assign to {@link layout} for controlled use.
   * @param currentTabId Tab involved in the change, when available.
   * @param direction Docking command or change reason.
   */
  onLayoutChange?(newLayout: LayoutBase, currentTabId?: string, direction?: DropDirection): void;

  /**
   * Drop targeting: `default` shows direction buttons; `edge` uses pointer distance from panel edges.
   * Edge mode does not dock floating panels by their headers. Defaults to `default`.
   */
  dropMode?: 'default' | 'edge';

  /**
   * Serialize a tab. The default result is `{id: tab.id}`.
   * @param tab Runtime tab definition.
   * @returns Serializable reference containing a unique id.
   */
  saveTab?(tab: TabData): TabBase;

  /**
   * Resolve tabs missing from {@link tabs}. Without a loader, inline definitions
   * and definitions in {@link defaultLayout} are used.
   * @param tab Saved tab reference, including fields returned by {@link saveTab}.
   * @returns Full tab definition, or null to skip an unavailable tab.
   */
  loadTab?(tab: TabBase): TabData | null;

  /**
   * Add application data to a saved panel by mutating it.
   * @param savedPanel Serialized panel to modify.
   * @param panel Original runtime panel.
   */
  afterPanelSaved?(savedPanel: PanelBase, panel: PanelData): void;

  /**
   * Restore application data by mutating the loaded panel.
   * Added tabs must be full definitions; `loadTab` is not called again.
   * @param savedPanel Serialized panel containing application data.
   * @param loadedPanel Resolved panel to modify; set its group explicitly if it has no tabs.
   */
  afterPanelLoaded?(savedPanel: PanelBase, loadedPanel: PanelData): void;

  /** CSS styles for the layout container, including its position and size. */
  style?: React.CSSProperties;

  /**
   * Render maximized panels in this DOM element or element id instead of the layout container.
   */
  maximizeTo?: string | HTMLElement;
}

interface LayoutState {
  layout: LayoutData;
  tabs?: LayoutProps['tabs'];
  tabDefinitions?: TabDefinitions;
  /** @ignore */
  dropRect?: {left: number, width: number, top: number, height: number, element: HTMLElement, source?: any, direction?: DropDirection};
  /** @ignore */
  floatAnchorRect?: FloatPosition;
}

class DockPortalManager extends React.PureComponent<LayoutProps, LayoutState> {
  /** @ignore */
  _caches = new Map<string, TabPaneCache>();

  /** @ignore */
  _pendingDestroy: any;

  /** @ignore */
  _isMounted = false;

  /** @ignore */
  destroyRemovedPane = () => {
    this._pendingDestroy = null;
    let cacheRemoved = false;
    for (let [id, cache] of this._caches) {
      if (cache.owner == null) {
        this._caches.delete(id);
        cacheRemoved = true;
      }
    }
    if (cacheRemoved && this._isMounted) {
      this.forceUpdate();
    }
  };


  /** @ignore */
  getTabCache(id: string, owner: any): TabPaneCache {
    let cache = this._caches.get(id);
    if (!cache) {
      let div = document.createElement('div');
      div.className = 'dock-pane-cache';
      cache = {div, id, owner};
      this._caches.set(id, cache);
    } else {
      cache.owner = owner;
    }

    return cache;
  }

  /** @ignore */
  removeTabCache(id: string, owner: any): void {
    let cache = this._caches.get(id);
    if (cache && cache.owner === owner) {
      cache.owner = null;
      if (!this._pendingDestroy) {
        // it could be reused by another component, so let's wait
        this._pendingDestroy = setTimeout(this.destroyRemovedPane, 1);
      }
    }
  }

  /** @ignore */
  updateTabCache(id: string, children: React.ReactNode): void {
    let cache = this._caches.get(id);
    if (cache) {
      cache.portal = ReactDOM.createPortal(children, cache.div, cache.id);
      this.forceUpdate();
    }
  }
}

/** Docking layout component. Use a ref for tab moves, updates and layout persistence. */
export class DockLayout extends DockPortalManager implements DockContext {
  /** @ignore */
  _ref: HTMLDivElement;
  /** @ignore */
  getRef = (r: HTMLDivElement) => {
    this._ref = r;
  };

  /** @ignore */
  getRootElement() {
    return this._ref;
  }

  /** @ignore */
  prepareInitData(data: LayoutBase, tabDefinitions?: TabDefinitions): LayoutData {
    if (!this.props.tabs) {
      return Algorithm.fixLayoutData({...data} as LayoutData, this.props.groups, this.props.loadTab);
    }
    return DockLayout.loadLayoutData(data, {...this.props, afterPanelLoaded: undefined}, 0, 0, tabDefinitions);
  }

  /** @ignore */
  resolveTab = (tab: TabBase): TabData | null => {
    if ('title' in tab && 'content' in tab) {
      return tab as TabData;
    }
    return this.find(tab.id, Algorithm.Filter.AnyTab) as TabData ||
      Serializer.loadTabData(tab, this.state.tabDefinitions, this.props.loadTab);
  };

  /** @ignore */
  getDockId(): any {
    return this.props.dockId || this;
  }

  /** @inheritDoc */
  getGroup(name: string) {
    if (name) {
      let {groups} = this.props;
      if (groups && name in groups) {
        return groups[name];
      }
      if (name === placeHolderStyle) {
        return placeHolderGroup;
      }
    }
    return defaultGroup;
  }

  /** @ignore */
  canDock(target: TabData | PanelData | BoxData, direction: DropDirection) {
    return Columns.canDock(this.getLayout(), this.props.sideColumns, target, direction);
  }

  /** @ignore */
  onColumnChange(columnId: string, state: ColumnState, tab?: TabData) {
    let layout = this.getLayout();
    const views = this.getColumnViews(layout);
    const view = views && Array.from(views.values()).find((item) => item.column.id === columnId);
    if (!view) return;
    if (tab) {
      tab = this.find(tab.id, Algorithm.Filter.AnyTab) as TabData;
      if (!tab || !view.panels.includes(tab.parent)) return;
      const panel = tab.parent;
      if (panel.activeId !== tab.id) layout = Algorithm.replacePanel(layout, panel, {
        ...panel, tabs: panel.tabs.map((item) => ({...item})), activeId: tab.id,
      });
    }
    const columns: LayoutBase['columns'] = Object.assign(Object.create(null), layout.columns);
    const next = {...columns[columnId], ...state};
    if (next.collapsed || next.activePanelId) columns[columnId] = next;
    else delete columns[columnId];
    layout = {...layout, columns: Object.keys(columns).length ? columns : undefined};
    Algorithm.clearObjectCache();
    this.changeLayout(layout, tab?.id, 'collapsed' in state ? 'collapse' : 'accordion');
  }

  /** @inheritDoc */
  dockMove(
    sourceData: TabBase | PanelBase,
    target: string | TabData | PanelData | BoxData | null,
    direction: DropDirection,
    floatPosition?: FloatPosition
  ) {
    if (this.props.sideColumns && (direction === 'left' || direction === 'right' || direction === 'top' || direction === 'bottom')) {
      const dropTarget = typeof target === 'string' ? this.find(target, Algorithm.Filter.All) : target;
      if (!this.canDock(dropTarget, direction)) {
        this.onDragStateChange(false);
        return;
      }
    }
    let source = sourceData as TabData | PanelData;
    if ('tabs' in sourceData) {
      let panel = sourceData as PanelBase;
      if (!(panel as PanelData).parent && panel.tabs.some((tab) => !('title' in tab && 'content' in tab))) {
        source = {...panel, tabs: panel.tabs.map(this.resolveTab).filter(Boolean)};
      }
    } else {
      source = this.resolveTab(sourceData as TabBase);
      if (!source) {
        return;
      }
    }
    let layout = this.getLayout();
    if (direction === 'maximize') {
      layout = Algorithm.maximize(layout, source);
      this.panelToFocus = source.id;
    } else if (direction === 'front') {
      layout = Algorithm.moveToFront(layout, source);
    } else {
      layout = Algorithm.removeFromLayout(layout, source);
    }

    if (typeof target === 'string') {
      target = this.find(target, Algorithm.Filter.All);
    } else {
      target = Algorithm.getUpdatedObject(target); // target might change during removeTab
    }

    if (direction === 'float') {
      let newPanel = Algorithm.converToPanel(source);
      newPanel.z = Algorithm.nextZIndex(null);
      if (this.state.dropRect || floatPosition) {
        layout = Algorithm.floatPanel(layout, newPanel, this.state.dropRect || floatPosition);
      } else {
        layout = Algorithm.floatPanel(layout, newPanel);
        if (this._ref) {
          layout = Algorithm.fixFloatPanelPos(layout, this._ref.offsetWidth, this._ref.offsetHeight);
        }
      }
    } else if (direction === 'new-window') {
      let newPanel = Algorithm.converToPanel(source);
      layout = Algorithm.panelToWindow(layout, newPanel);
    } else if (target) {
      if ('tabs' in (target as PanelData)) {
        // panel target
        if (direction === 'middle') {
          layout = Algorithm.addTabToPanel(layout, source, target as PanelData);
        } else {
          let newPanel = Algorithm.converToPanel(source);
          layout = Algorithm.dockPanelToPanel(layout, newPanel, target as PanelData, direction);
        }

      } else if ('children' in (target as BoxData)) {
        // box target
        let newPanel = Algorithm.converToPanel(source);
        layout = Algorithm.dockPanelToBox(layout, newPanel, target as BoxData, direction);
      } else {
        // tab target
        layout = Algorithm.addNextToTab(layout, source, target as TabData, direction);
      }
    }
    if (layout !== this.getLayout()) {
      layout = Algorithm.fixLayoutData(layout, this.props.groups);
      const currentTabId: string = source.hasOwnProperty('tabs') ? (source as PanelData).activeId : (source as TabData).id;
      this.changeLayout(layout, currentTabId, direction);
    }
    this.onDragStateChange(false);
  }

  /** @inheritDoc */
  find(id: string | ((item: PanelData | TabData | BoxData) => boolean), filter?: Algorithm.Filter): PanelData | TabData | BoxData | undefined {
    return Algorithm.find(this.getLayout(), id, filter);
  }

  /** @ignore */
  getLayoutSize(): LayoutSize {
    if (this._ref) {
      return {width: this._ref.offsetWidth, height: this._ref.offsetHeight};
    }
    return {width: 0, height: 0};
  }

  /** @inheritDoc */
  updateTab(id: string, newTab: TabBase | null, makeActive: boolean = true): boolean {
    let tab = this.find(id, Algorithm.Filter.AnyTab) as TabData;
    if (!tab) {
      return false;
    }
    let panelData = tab.parent;
    let idx = panelData.tabs.indexOf(tab);
    if (idx >= 0) {
      let layout = this.getLayout();
      let constraintsChanged = false;
      if (newTab) {
        let resolvedTab = 'content' in newTab && 'title' in newTab ? newTab as TabData :
          Serializer.loadTabData(newTab, this.state.tabDefinitions, this.props.loadTab);
        if (!resolvedTab) {
          return false;
        }
        let tabs = panelData.tabs.concat();
        tabs[idx] = resolvedTab;
        let activeId = makeActive ? resolvedTab.id : panelData.activeId;
        if (!makeActive && activeId === id && resolvedTab.id !== id) activeId = tabs[0].id;
        layout = Algorithm.replacePanel(layout, panelData, {...panelData, tabs, activeId});
        constraintsChanged = tab.minWidth !== resolvedTab.minWidth || tab.minHeight !== resolvedTab.minHeight || tab.group !== resolvedTab.group;
        if (!makeActive) {
          this.panelToFocus = panelData.id;
        }
      } else if (makeActive && panelData.activeId !== id) {
        layout = Algorithm.replacePanel(layout, panelData, {...panelData, activeId: id});
      }

      if (constraintsChanged) layout = Algorithm.fixLayoutData(layout, this.props.groups);
      else Algorithm.clearObjectCache();
      this.changeLayout(layout, newTab?.id ?? id, 'update');
      return true;
    }
  }

  /** @inheritDoc */
  navigateToPanel(fromElement?: HTMLElement, direction?: string) {
    if (!direction) {
      if (!fromElement) {
        fromElement = this._ref.querySelector('.dock-tab-active>.dock-tab-btn');
      }
      fromElement.focus();
      return;
    }
    let targetTab: HTMLElement;
    // use panel rect when move left/right, and use tabbar rect for up/down
    let selector = (direction === 'ArrowUp' || direction === 'ArrowDown') ?
      '.dock>.dock-bar' : '.dock-box>.dock-panel';
    let panels = Array.from(this._ref.querySelectorAll(selector));

    let currentPanel = panels.find((panel) => panel.contains(fromElement));
    let currentRect = currentPanel.getBoundingClientRect();
    let matches: any[] = [];
    for (let panel of panels) {
      if (panel !== currentPanel) {
        let rect = panel.getBoundingClientRect();
        let distance = Algorithm.findNearestPanel(currentRect, rect, direction);
        if (distance >= 0) {
          matches.push({panel, rect, distance});
        }
      }
    }
    matches.sort((a, b) => a.distance - b.distance);
    for (let match of matches) {
      targetTab = match.panel.querySelector('.dock-tab-active>.dock-tab-btn');
      if (targetTab) {
        break;
      }
    }

    if (targetTab) {
      targetTab.focus();
    }
  }

  /**
   * Create a layout with either `defaultLayout` or `layout`.
   * @param props Layout configuration.
   */
  constructor(props: LayoutProps) {
    super(props);
    let {layout, defaultLayout, tabs} = props;
    if (!layout && !defaultLayout) {
      throw new Error('DockLayout requires layout or defaultLayout.');
    }

    let tabDefinitions = Serializer.createTabCache(tabs);
    this.state = {
      layout: layout ? DockLayout.loadLayoutData(layout, props, 0, 0, tabDefinitions) :
        this.prepareInitData(defaultLayout, tabDefinitions),
      tabs,
      tabDefinitions,
      dropRect: null,
    };
  }

  /** @ignore */
  onDragStateChange = (draggingScope: any) => {
    if (draggingScope == null) {
      DockPanel.droppingPanel = null;
      this.setState({dropRect: null, floatAnchorRect: null});
    }
  };

  /** @ignore */
  useEdgeDrop() {
    return this.props.dropMode === 'edge';
  }

  /** @ignore */
  setFloatAnchorRect(panel: PanelData) {
    let candidate = {...panel};
    let {width, height} = this.getLayoutSize();
    Algorithm.anchorFloatPanel(candidate, width, height);
    let floatAnchorRect = candidate.floatAnchor ? {
      left: panel.x, top: panel.y,
      width: panel.w + (candidate.floatAnchor.right ?? 0),
      height: panel.h + (candidate.floatAnchor.bottom ?? 0),
    } : null;
    this.setState({floatAnchorRect});
  }

  /** @ignore */
  setDropRect(element: HTMLElement, direction?: DropDirection, source?: any, event?: {clientX: number, clientY: number}, panelSize: [number, number] = [300, 300]) {
    let {dropRect} = this.state;
    if (dropRect) {
      if (direction === 'remove') {
        this.setState((oldStates) => {
          if (oldStates.dropRect.source === source) {
            return {dropRect: null};
          }
          return {};
        });
        return;
      } else if (dropRect.element === element && dropRect.direction === direction && direction !== 'float') {
        // skip duplicated update except for float dragging
        return;
      }
    }
    if (!element) {
      this.setState({dropRect: null});
      return;
    }
    let layoutRect = this._ref.getBoundingClientRect();
    let scaleX = this._ref.offsetWidth / layoutRect.width;
    let scaleY = this._ref.offsetHeight / layoutRect.height;

    let elemRect = element.getBoundingClientRect();
    let left = (elemRect.left - layoutRect.left) * scaleX;
    let top = (elemRect.top - layoutRect.top) * scaleY;
    let width = elemRect.width * scaleX;
    let height = elemRect.height * scaleY;

    let ratio = 0.5;
    if (element.classList.contains('dock-box')) {
      ratio = 0.3;
    }
    switch (direction) {
      case 'float': {
        let x = (event.clientX - layoutRect.left) * scaleX;
        let y = (event.clientY - layoutRect.top) * scaleY;
        top = y - 15;
        width = panelSize[0];
        height = panelSize[1];
        left = x - (width >> 1);
        break;
      }
      case 'right':
        left += width * (1 - ratio);
      case 'left': // tslint:disable-line no-switch-case-fall-through
        width *= ratio;
        break;
      case 'bottom':
        top += height * (1 - ratio);
      case 'top': // tslint:disable-line no-switch-case-fall-through
        height *= ratio;
        break;
      case 'after-tab':
        left += width - 15;
        width = 30;
        break;
      case 'before-tab':
        left -= 15;
        width = 30;
        break;
    }

    this.setState({dropRect: {left, top, width, height, element, source, direction}});
  }

  /** @ignore */
  private columnCache: {root: BoxData, options: SideColumns, states: LayoutBase['columns'], views: Map<BoxData | PanelData, Columns.ColumnView>};

  private getColumnViews(layout: LayoutData) {
    const {sideColumns: options} = this.props;
    if (!options) return;
    const cache = this.columnCache;
    if (cache?.root === layout.dockbox && cache.options === options && cache.states === layout.columns) return cache.views;
    const views = Columns.getColumnViews(layout, options, cache?.views);
    this.columnCache = {root: layout.dockbox, options, states: layout.columns, views};
    return views;
  }

  /** @ignore */
  render(): React.ReactNode {
    // clear tempLayout
    this.tempLayout = null;

    let {style, maximizeTo, sideColumns} = this.props;
    let {layout, dropRect, floatAnchorRect} = this.state;
    const columns = this.getColumnViews(layout);
    const paddingLeft = columns?.get(layout.dockbox.children[0])?.collapsed ? 0 : sideColumns?.left?.padding;
    const paddingRight = columns?.get(layout.dockbox.children.at(-1))?.collapsed ? 0 : sideColumns?.right?.padding;
    let dropRectStyle: React.CSSProperties = floatAnchorRect ? {...floatAnchorRect, display: 'block', transition: 'none'} : undefined;
    if (dropRect) {
      let {element, direction, ...rect} = dropRect;
      dropRectStyle = {...rect, display: 'block'};
      if (direction === 'float') {
        dropRectStyle.transition = 'none';
      }
    }
    let maximize: React.ReactNode;
    // if (layout.maxbox && layout.maxbox.children.length === 1) {
    if (maximizeTo) {
      if (typeof maximizeTo === 'string') {
        maximizeTo = document.getElementById(maximizeTo);
      }
      maximize = ReactDOM.createPortal(
        <MaxBox boxData={layout.maxbox}/>,
        maximizeTo
      );
    } else {
      maximize = <MaxBox boxData={layout.maxbox}/>;
    }
    // }

    let portals: React.ReactPortal[] = [];
    for (let [key, cache] of this._caches) {
      if (cache.portal) {
        portals.push(cache.portal);
      }
    }

    return (
      <div ref={this.getRef} className="dock-layout" style={style}>
        <DockContextProvider value={this}>
          <DockBox size={1} boxData={layout.dockbox} columns={columns} paddingLeft={paddingLeft} paddingRight={paddingRight}/>
          <FloatBox boxData={layout.floatbox}/>
          <WindowBox boxData={layout.windowbox}/>
          {maximize}
          {portals}
        </DockContextProvider>
        <div className="dock-drop-indicator" style={dropRectStyle}/>
      </div>
    );
  }

  /** @ignore */
  _onWindowResize: any = debounce(() => {
    let layout = this.getLayout();

    if (this._ref) {
      let newLayout = Algorithm.fixFloatPanelPos(layout, this._ref.offsetWidth, this._ref.offsetHeight);
      if (layout !== newLayout) {
        newLayout = Algorithm.fixLayoutData(newLayout, this.props.groups); // panel parent might need a fix
        this.changeLayout(newLayout, null, 'move');
      }
    }
  }, 200);

  /** @ignore */
  _resizeObserver: ResizeObserver;


  /** @ignore */
  panelToFocus: string;

  /** @ignore */
  componentDidMount() {
    this._isMounted = true;
    DragManager.addDragStateListener(this.onDragStateChange);
    globalThis.addEventListener?.('resize', this._onWindowResize);
    if (typeof ResizeObserver !== 'undefined') {
      this._resizeObserver = new ResizeObserver(this._onWindowResize);
      this._resizeObserver.observe(this._ref);
    }
  }

  /** @ignore
   * move focus to panelToFocus
   */
  componentDidUpdate(prevProps: Readonly<LayoutProps>, prevState: Readonly<LayoutState>, snapshot?: any) {
    if (this.panelToFocus) {
      let panel = this._ref.querySelector(`.dock-panel[data-dockid="${this.panelToFocus}"]`) as HTMLElement;
      if (panel && !panel.contains(this._ref.ownerDocument.activeElement)) {
        (panel.querySelector('.dock-bar') as HTMLElement)?.focus();
      }
      this.panelToFocus = null;
    }
  }

  /** @ignore */
  componentWillUnmount(): void {
    this._resizeObserver?.disconnect();
    globalThis.removeEventListener?.('resize', this._onWindowResize);
    DragManager.removeDragStateListener(this.onDragStateChange);
    this._onWindowResize.cancel();
    this._isMounted = false;
  }

  /** @ignore
   * layout state doesn't change instantly after setState, use this to make sure the correct layout is
   */
  tempLayout: LayoutData;

  /**
   * Replace the runtime layout without calling `onLayoutChange`.
   * Use {@link loadLayout} for saved layouts.
   * @param layout Resolved runtime layout with parent links and tab definitions.
   */
  setLayout(layout: LayoutData) {
    this.tempLayout = layout;
    this.setState({layout});
  }

  /** Return the current runtime layout, including tab content and parent links. */
  getLayout() {
    return this.tempLayout || this.state.layout;
  }

  /** @ignore
   * change layout
   */
  changeLayout(layoutData: LayoutData, currentTabId: string, direction: DropDirection, silent: boolean = false) {
    let {layout, onLayoutChange} = this.props;
    let savedLayout: LayoutBase;
    if (onLayoutChange) {
      savedLayout = Serializer.saveLayoutData(layoutData, this.props.saveTab, this.props.afterPanelSaved);
      layoutData.loadedFrom = savedLayout;
      onLayoutChange(savedLayout, currentTabId, direction);
      if (layout) {
        // if layout prop is defined, we need to force an update to make sure it's either updated or reverted back
        this.forceUpdate();
      }
    }
    if (!layout && !silent) {
      // uncontrolled layout when Props.layout is not defined
      this.setLayout(layoutData);
    }
  }

  /** @ignore
   * some layout change were handled by component silently
   * but they should still call this function to trigger onLayoutChange
   */
  onSilentChange(currentTabId: string = null, direction?: DropDirection) {
    let {onLayoutChange} = this.props;
    if (onLayoutChange) {
      let layout = this.getLayout();
      this.changeLayout(layout, currentTabId, direction, true);
    }
  }

  // public api

  /**
   * Save layout positions and column state, with tabs serialized by {@link LayoutProps.saveTab}.
   * @returns Layout data suitable for `loadLayout` or the controlled `layout` prop.
   */
  saveLayout(): LayoutBase {
    return Serializer.saveLayoutData(this.getLayout(), this.props.saveTab, this.props.afterPanelSaved);
  }

  /**
   * Restore a saved layout, resolving tabs through `tabs`, `loadTab` or `defaultLayout`.
   * Does not call {@link LayoutProps.onLayoutChange}.
   * @param savedLayout Previously saved or application-provided layout.
   */
  loadLayout(savedLayout: LayoutBase) {
    this.setLayout(DockLayout.loadLayoutData(savedLayout, this.props, this._ref.offsetWidth, this._ref.offsetHeight, this.state.tabDefinitions));
  }

  /** @ignore */
  static loadLayoutData(
    savedLayout: LayoutBase,
    props: LayoutProps,
    width = 0,
    height = 0,
    tabDefinitions = Serializer.createTabCache(props.tabs)
  ): LayoutData {
    let {defaultLayout, loadTab, afterPanelLoaded, groups} = props;
    let layout = Serializer.loadLayoutData(
      savedLayout,
      defaultLayout,
      loadTab,
      afterPanelLoaded,
      tabDefinitions
    );
    layout = Algorithm.fixFloatPanelPos(layout, width, height);
    layout = Algorithm.fixLayoutData(layout, groups);
    layout.loadedFrom = savedLayout;
    return layout;
  }

  /** @ignore */
  static getDerivedStateFromProps(props: LayoutProps, state: LayoutState) {
    let {layout: layoutToLoad} = props;
    let {layout: currentLayout} = state;
    let tabDefinitions = props.tabs === state.tabs ? state.tabDefinitions : Serializer.createTabCache(props.tabs);
    if (layoutToLoad && layoutToLoad !== currentLayout.loadedFrom) {
      // auto reload on layout prop change
      return {
        layout: DockLayout.loadLayoutData(layoutToLoad, props, 0, 0, tabDefinitions),
        tabs: props.tabs,
        tabDefinitions,
      };
    }
    if (props.tabs !== state.tabs) {
      let layout = Algorithm.updateLayoutTabs(currentLayout, tabDefinitions, state.tabDefinitions, props.groups);
      return {layout, tabs: props.tabs, tabDefinitions};
    }
    return null;
  }
}
