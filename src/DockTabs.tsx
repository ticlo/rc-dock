import React from "react";
import { BoxData, DockContext, DockContextType, DropDirection, PanelData, TabData, TabGroup, DockTabIdContext } from "./DockData";
import Tabs from 'rc-tabs';
import Menu, {MenuItem} from 'rc-menu';
import Dropdown from 'rc-dropdown';
import * as DragManager from "./dragdrop/DragManager";
import {DragDropDiv} from "./dragdrop/DragDropDiv";
import {DockTabBar} from "./DockTabBar";
import DockTabPane from "./DockTabPane";
import { getFloatPanelSize, getPanelTabPosition, find, Filter } from "./Algorithm";
import {WindowBox} from "./WindowBox";
import classNames from "classnames";
import { getFloatingCoordinatesBySize, mergeTabGroups, Size } from "./Utils";

function findParentPanel(element: HTMLElement) {
  for (let i = 0; i < 10; ++i) {
    if (!element) {
      return null;
    }
    if (element.classList.contains('dock-panel')) {
      return element;
    }
    element = element.parentElement;
  }
  return null;
}

function isPopupDiv(r: HTMLDivElement): boolean {
  return (r == null || r.parentElement?.tagName === 'LI' || r.parentElement?.parentElement?.tagName === 'LI');
}

interface DockTabTitleProps {
  title: React.ReactChild;
  onMouseWheelClick: (e: MouseEvent) => void;
}

class DockTabTitle extends React.PureComponent<DockTabTitleProps> {
  ref = React.createRef<HTMLDivElement>();

  constructor(props: DockTabTitleProps) {
    super(props);

    this.handleMouseWheelClick = this.handleMouseWheelClick.bind(this);
  }

  handleMouseWheelClick(e: MouseEvent) {
    if (e.button === 1) {
      this.props.onMouseWheelClick(e);
    }
  }

  componentDidMount() {
    const tabElement = this.ref.current.parentElement.parentElement.parentElement;
    tabElement.addEventListener("mouseup", this.handleMouseWheelClick);
  }

  componentWillUnmount() {
    const tabElement = this.ref.current.parentElement.parentElement.parentElement;
    tabElement.removeEventListener("mouseup", this.handleMouseWheelClick);
  }

  render() {
    const { title } = this.props;
    return <div ref={this.ref} className="dock-tab-title">{title}</div>;
  }
}

export class TabCache {


  _ref: HTMLDivElement;
  getRef = (r: HTMLDivElement) => {
    if (isPopupDiv(r)) {
      return;
    }
    this._ref = r;
  };

  _hitAreaRef: HTMLDivElement;
  getHitAreaRef = (r: HTMLDivElement) => {
    if (isPopupDiv(r)) {
      return;
    }
    this._hitAreaRef = r;
  };

  data: TabData;
  context: DockContext;
  content: React.ReactElement;

  constructor(context: DockContext) {
    this.context = context;
    this.handleMouseWheelClick = this.handleMouseWheelClick.bind(this);
  }

  setData(data: TabData) {
    if (data !== this.data) {
      this.data = data;
      this.content = this.render();
      return true;
    }
    return false;
  }

  removeTab() {
    this.context.dockMove(this.data, null, 'remove');
  }

  onCloseClick = (e: React.MouseEvent) => {
    this.removeTab();
    e.stopPropagation();
  };

  onDragStart = (e: DragManager.DragState) => {
    let panel = this.data.parent;
    if (panel.parent.mode === 'float' && panel.tabs.length === 1) {
      // when it's the only tab in a float panel, skip this drag, let parent tab bar handle it
      return;
    }
    let panelElement = findParentPanel(this._ref);
    let tabGroup = mergeTabGroups(this.context.getGroup(this.data.group), this.data.localGroup);
    let [panelWidth, panelHeight] = getFloatPanelSize(panelElement, tabGroup);

    e.setData({
      tab: this.data,
      panelSize: [panelWidth, panelHeight],
      tabGroup: this.data.group
    }, this.context.getDockId());
    e.startDrag(this._ref.parentElement, this._ref.parentElement);
  };
  onDragOver = (e: DragManager.DragState) => {
    let dockId = this.context.getDockId();
    let tab: TabData = DragManager.DragState.getData('tab', dockId);
    let panel: PanelData = DragManager.DragState.getData('panel', dockId);
    let group: string;
    let localGroup: TabGroup;
    if (tab) {
      panel = tab.parent;
      group = tab.group;
      localGroup = tab.localGroup;
    } else {
      // drag whole panel
      if (!panel) {
        return;
      }
      if (panel?.panelLock) {
        e.reject();
        return;
      }
      group = panel.group;
      localGroup = panel.localGroup;
    }
    let tabGroup = mergeTabGroups(this.context.getGroup(group), localGroup);
    if (group !== this.data.group) {
      e.reject();
    } else if (tabGroup?.floatable === 'singleTab' && this.data.parent?.parent?.mode === 'float') {
      e.reject();
    } else if (tab && tab !== this.data) {
      let direction = this.getDropDirection(e);
      this.context.setDropRect(this._hitAreaRef, direction, this);
      e.accept('');
    } else if (panel && panel !== this.data.parent) {
      let direction = this.getDropDirection(e);
      this.context.setDropRect(this._hitAreaRef, direction, this);
      e.accept('');
    }
  };
  onDragLeave = (e: DragManager.DragState) => {
    this.context.setDropRect(null, 'remove', this);
  };
  onDrop = (e: DragManager.DragState) => {
    let dockId = this.context.getDockId();
    let panel: PanelData;
    let tab: TabData = DragManager.DragState.getData('tab', dockId);
    if (tab) {
      panel = tab.parent;
    } else {
      panel = DragManager.DragState.getData('panel', dockId);
    }
    if (tab && tab !== this.data) {
      let direction = this.getDropDirection(e);
      this.context.dockMove(tab, this.data, direction);
    } else if (panel && panel !== this.data.parent) {
      let direction = this.getDropDirection(e);
      this.context.dockMove(panel, this.data, direction);
    }
  };

  getDropDirection(e: DragManager.DragState): DropDirection {
    let rect = this._hitAreaRef.getBoundingClientRect();

    if (["left", "right"].includes(getPanelTabPosition(this.data.parent!)!)) {
      let midy = rect.top + rect.height * 0.5;
      return e.clientY > midy ? 'under-tab' : 'above-tab';
    }

    let midx = rect.left + rect.width * 0.5;
    return e.clientX > midx ? 'after-tab' : 'before-tab';
  }

  handleMouseWheelClick(e: MouseEvent) {
    if (this.isTabClosable()) {
      this.removeTab();
      e.stopPropagation();
    }
  }

  isTabClosable() {
    const { parent, closable } = this.data;

    return closable && parent.tabs.length > 1;
  }

  render(): React.ReactElement {
    let {id, title, group, content, closable, cached, parent, localGroup, handleTabActiveChange} = this.data;
    let {onDragStart, onDragOver, onDrop, onDragLeave} = this;
    if (parent.parent.mode === 'window') {
      onDragStart = null;
      onDragOver = null;
      onDrop = null;
      onDragLeave = null;
    }
    let tabGroup = mergeTabGroups(this.context.getGroup(group), localGroup);
    if (typeof content === 'function') {
      content = content(this.data);
    }
    const tabClosable = closable && parent.tabs.length > 1;
    let tab = (
      <DragDropDiv getRef={this.getRef} onDragStartT={onDragStart} role="tab" aria-selected={parent.activeId === id}
                   onDragOverT={onDragOver} onDropT={onDrop} onDragLeaveT={onDragLeave} tabData={this.data}>
        <DockTabTitle title={title} onMouseWheelClick={this.handleMouseWheelClick} />
        {tabClosable ?
          <div className="dock-tab-close-btn" onClick={this.onCloseClick}/>
          : null
        }
        <div className="dock-tab-hit-area" ref={this.getHitAreaRef}/>
      </DragDropDiv>
    );

    return (
      <DockTabPane key={id} cacheId={id} cached={cached} tab={tab} onTabActiveChange={handleTabActiveChange}>
        <DockTabIdContext.Provider value={id}>
          {content}
        </DockTabIdContext.Provider>
      </DockTabPane>
    );
  }


  destroy() {
    // place holder
  }
}

interface Props {
  panelData: PanelData;
  onPanelDragStart: DragManager.DragHandler;
  onPanelDragMove: DragManager.DragHandler;
  onPanelDragEnd: DragManager.DragHandler;
  isCollapseDisabled?: boolean;
}

export class DockTabs extends React.PureComponent<Props> {
  static contextType = DockContextType;

  static readonly propKeys = ['group', 'tabs', 'activeId', 'onTabChange'];

  context!: DockContext;
  _cache: Map<string, TabCache> = new Map();

  cachedTabs: TabData[];

  animationDisabled = false;

  updateTabs(tabs: TabData[]) {
    if (tabs === this.cachedTabs) {
      return;
    }
    this.cachedTabs = tabs;
    let newCache = new Map<string, TabCache>();
    let reused = 0;
    for (let tabData of tabs) {
      let {id} = tabData;
      if (this._cache.has(id)) {
        let tab = this._cache.get(id);
        newCache.set(id, tab);
        tab.setData(tabData);
        ++reused;
      } else {
        let tab = new TabCache(this.context);
        newCache.set(id, tab);
        tab.setData(tabData);
      }
    }
    if (reused !== this._cache.size) {
      for (let [id, tab] of this._cache) {
        if (!newCache.has(id)) {
          tab.destroy();
        }
      }
    }
    this._cache = newCache;
  }

  handleMaximizeClick = (e: React.MouseEvent) => {
    let {panelData} = this.props;
    this.context.dockMove(panelData, null, 'maximize');
    // prevent the focus change logic
    e.stopPropagation();
  };
  handleCollapseExpandClick = (e: React.MouseEvent) => {
    const {panelData} = this.props;
    const firstTab = panelData.tabs[0];
    firstTab.collapsed = !panelData?.collapsed;
    this.context.updateTab(firstTab.id!, firstTab, false);
    this.animationDisabled = true;
    const navElement = document.querySelector(`[data-dockid="${panelData.id}"] .dock-nav`);
    navElement.classList.add('animation-disabled');
    setTimeout(() => {
      navElement.classList.remove('animation-disabled');
    });

    // prevent the focus change logic
    e.stopPropagation();
  };
  handleToggleFloatingClick = (e: React.MouseEvent) => {
    const { panelData } = this.props;

    if (panelData.parent.mode === 'float') {
      let targetParent;
      for (let dockParent = panelData.dockParent; dockParent && !targetParent; dockParent = dockParent.parent) {
        const dockParentId = dockParent?.id;
        targetParent = dockParentId ?
          find(
            this.context.getLayout(),
            dockParentId,
            Filter.Panel | Filter.Box | Filter.EveryWhere
          ) as PanelData | BoxData :
          null;
      }

      let target;
      let direction: DropDirection;
      let mode;
      if (panelData.dockParent) {
        mode = 'tabs' in panelData.dockParent ? panelData.dockParent.parent.mode : panelData.dockParent.mode;
      } else {
        mode = "horizontal";
      }

      if (!targetParent) {
        targetParent = this.context.getLayout().dockbox;
        const lastChild = panelData.panelIndex !== 0;

        if (mode === "horizontal") {
          direction = lastChild ? "right" : "left";
        } else {
          direction = lastChild ? "bottom" : "top";
        }
        target = targetParent;
      } else if ('tabs' in targetParent) {
        const lastChild = panelData.tabIndex > targetParent.tabs.length - 1;
        const childIndex = lastChild ? targetParent.tabs.length - 1 : panelData.tabIndex;

        if (targetParent.tabPosition === "top" || targetParent.tabPosition === "bottom") {
          direction = lastChild ? "after-tab" : "before-tab";
        } else {
          direction = lastChild ? "above-tab" : "under-tab";
        }

        target = targetParent.tabs[childIndex];
      } else if (targetParent.children.length !== 0) {
        const lastChild = panelData.panelIndex > targetParent.children.length - 1;
        const childIndex = lastChild ? targetParent.children.length - 1 : panelData.panelIndex;

        if (mode === "horizontal") {
          direction = lastChild ? "right" : "left";
        } else {
          direction = lastChild ? "bottom" : "top";
        }

        target = targetParent.children[childIndex];
      } else {
        targetParent.children.push(panelData);
        target = targetParent.children[0];
        direction = "right";
      }
      panelData.needSetSize = true;
      this.context.dockMove(panelData, target, direction);
    } else {
      const floatingSize: Size = { width: 400, height: 300 };
      const { x, y } = getFloatingCoordinatesBySize(floatingSize, this.context.getLayoutSize());
      Object.assign(panelData, {
        x: panelData.x || x,
        y: panelData.y || y,
        w: panelData.w || floatingSize.width,
        h: panelData.h || floatingSize.height
      });
      this.context.dockMove(panelData, null, 'float');
    }

    e.stopPropagation();
  }
  handleNewWindowClick = () => {
    let {panelData} = this.props;
    this.context.dockMove(panelData, null, 'new-window');
  };

  addNewWindowMenu(element: React.ReactElement, showWithLeftClick: boolean) {
    const nativeMenu = (
      <Menu onClick={this.handleNewWindowClick}>
        <MenuItem>
          New Window
        </MenuItem>
      </Menu>
    );
    let trigger = showWithLeftClick ? ['contextMenu', 'click'] : ['contextMenu'];
    return (
      <Dropdown
        prefixCls="dock-dropdown"
        overlay={nativeMenu}
        trigger={trigger}
        mouseEnterDelay={0.1}
        mouseLeaveDelay={0.1}>
        {element}
      </Dropdown>
    );
  }

  handlePanelCloseClick = (e: React.MouseEvent) => {
    let {panelData} = this.props;
    this.context.dockMove(panelData.tabs[0], null, 'remove');
    e.stopPropagation();
  };

  renderTabBar = (props: any, TabNavList: React.ComponentType) => {
    let {panelData, onPanelDragStart, onPanelDragMove, onPanelDragEnd, isCollapseDisabled} = this.props;
    let {group: groupName, panelLock, localGroup, toggleFloatingDisabled} = panelData;
    let group = mergeTabGroups(this.context.getGroup(groupName), localGroup);
    let {panelExtra} = group;

    let { maximizable, collapsible, floatable } = group;
    if (panelData.parent.mode === 'window') {
      onPanelDragStart = null;
      maximizable = false;
    }

    if (['float', 'window', 'maximize'].includes(panelData.parent.mode)) {
      collapsible = false;
    }

    if (panelLock) {
      if (panelLock.panelExtra) {
        panelExtra = panelLock.panelExtra;
      }
    }

    let showNewWindowButton = group.newWindow && WindowBox.enabled && panelData.parent.mode === 'float';

    let panelDefaultContent: React.ReactElement;
    let panelExtraContent: React.ReactElement;
    if (panelExtra) {
      panelExtraContent = panelExtra(panelData, this.context);
    }

    if (maximizable || showNewWindowButton) {
      panelDefaultContent = <div
        className={panelData.parent.mode === 'maximize' ? "dock-panel-min-btn" : "dock-panel-max-btn" }
        onClick={maximizable ? this.handleMaximizeClick : null}
      />;
      if (showNewWindowButton) {
        panelDefaultContent = this.addNewWindowMenu(panelDefaultContent, !maximizable);
      }
    }

    const renderCollapseExpandBtn = () => {
      if (panelData.collapsed) {
        return (
          <div
            className='dock-panel-expand-btn'
            onClick={this.handleCollapseExpandClick}
          />
        );
      }

      if (isCollapseDisabled) {
        return (
          <div className='dock-panel-collapse-btn dock-panel-collapse-btn-disabled' />
        );
      }

      return (
        <div className='dock-panel-collapse-btn' onClick={this.handleCollapseExpandClick} />
      );
    };

    const renderToggleFloatingBtn = () => {
      return (
        <div
          className={panelData.parent.mode === 'float' ? 'dock-panel-restore-floating-btn' : 'dock-panel-make-floating-btn'}
          onClick={this.handleToggleFloatingClick}
        />
      );
    };

    panelExtraContent = <>
      {panelExtraContent}
      {collapsible ? renderCollapseExpandBtn() : null}
      {(!toggleFloatingDisabled && floatable && !panelLock) ? renderToggleFloatingBtn() : null}
      {panelDefaultContent}
      {panelData.tabs.length === 1 && panelData.tabs[0].closable && <div className="dock-panel-close-btn" onClick={this.handlePanelCloseClick} />}
    </>;

    return (
      <DockTabBar onDragStart={onPanelDragStart} onDragMove={onPanelDragMove} onDragEnd={onPanelDragEnd}
                  TabNavList={TabNavList} isMaximized={panelData.parent.mode === 'maximize'} {...props}
                  extra={panelExtraContent} panelData={panelData} />
    );
  };

  onTabChange = (activeId: string) => {
    this.props.panelData.activeId = activeId;
    this.context.onSilentChange(activeId, 'active');
    this.context.updatePanelLocalGroup(this.props.panelData);
    this.forceUpdate();
  };

  draggingObserver = new MutationObserver(this.draggingCallback.bind(this));

  componentDidMount() {
    this.draggingObserver.observe(document.body, {
      attributes: true
    });
  }

  componentWillUnmount() {
    this.draggingObserver.disconnect();
  }

  draggingCallback(mutationList: MutationRecord[]) {
    const navElement = document.querySelector(`[data-dockid="${this.props.panelData.id}"] .dock-nav`);

    mutationList.forEach((mutation) => {
      if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
        const dragging = (mutation.target as HTMLElement).classList.contains("dock-dragging");

        if (dragging) {
          this.animationDisabled = true;
          navElement.classList.add('animation-disabled');
          return;
        }

        setTimeout(() => {
          navElement?.classList.remove('animation-disabled');
        });
      }
    });
  }

  componentDidUpdate(prevProps: Readonly<Props>, prevState: Readonly<{}>, snapshot?: any) {
    if (!this.animationDisabled) {
      return;
    }

    setTimeout(() => {
      this.animationDisabled = false;
    });
  }

  render(): React.ReactNode {
    const panelData = this.props.panelData;
    let {group, tabs, activeId, localGroup} = panelData;
    let tabGroup = mergeTabGroups(this.context.getGroup(group), localGroup);
    let {animated, moreIcon} = tabGroup;
    if (animated == null) {
      animated = true;
    }
    if (!moreIcon) {
      moreIcon = "...";
    }

    if (this.animationDisabled) {
      animated = false;
    }

    this.updateTabs(tabs);

    let children: React.ReactNode[] = [];
    for (let [id, tab] of this._cache) {
      children.push(tab.content);
    }

    const tabPosition = getPanelTabPosition(panelData);

    return (
      <Tabs prefixCls={classNames(this.context.getClassName(), "dock")}
            moreIcon={moreIcon}
            animated={animated}
            renderTabBar={this.renderTabBar}
            activeKey={activeId}
            tabPosition={tabPosition}
            onChange={this.onTabChange}
      >
        {children}
      </Tabs>
    );
  }
}
