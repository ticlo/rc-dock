import React, {CSSProperties} from "react";
import {
  BoxData,
  LayoutData,
  PanelData,
  DockContextProvider,
  nextId,
  DockContext,
  DropDirection,
  TabData,
  DefaultLayout,
  TabGroup,
  placeHolderStyle,
  placeHolderGroup,
  defaultGroup,
  SavedLayout,
  LoadModifier,
  SaveModifier
} from "./DockData";
import {DockBox} from "./DockBox";
import {FloatBox} from "./FloatBox";
import {DockPanel} from "./DockPanel";
import * as Algorithm from "./Algorithm";
import * as Serializer from "./Serializer";

interface LayoutProps {
  defaultLayout: DefaultLayout;
  style?: CSSProperties;
}

interface LayoutState {
  layout: LayoutData;
  /** @ignore */
  dropRect?: {left: number, width: number, top: number, height: number, element: HTMLElement, source?: any, direction?: DropDirection};
}

export class DockLayout extends React.PureComponent<LayoutProps, LayoutState> implements DockContext {
  /** @ignore */
  _ref: HTMLDivElement;
  /** @ignore */
  getRef = (r: HTMLDivElement) => {
    this._ref = r;
  };

  _groups: {[key: string]: TabGroup} = {};

  /** @ignore */
  prepareInitData(data: DefaultLayout): LayoutData {
    let layout = {...data};

    // add groups
    if ('groups' in data) {
      for (let name in data.groups) {
        this._groups[name] = {...data.groups[name]};
      }
    }
    this._groups[placeHolderStyle] = placeHolderGroup;

    Algorithm.fixLayoutData(layout);
    return layout;
  }

  getGroup(name: string) {
    if (name in this._groups) {
      return this._groups[name];
    }
    return defaultGroup;
  }

  dockMove(source: TabData, target: TabData | PanelData | BoxData, direction: DropDirection) {
    let {layout} = this.state;

    layout = Algorithm.removeFromLayout(layout, source);

    target = Algorithm.getUpdatedObject(target); // target might change during removeTab

    if (target) {
      if ('tabs' in target) {
        // pandel target
        if (direction === 'middle') {
          layout = Algorithm.addTabToPanel(layout, source, target);
        } else {
          let newPanel = Algorithm.converToPanel(source);
          if (direction === 'float') {
            newPanel.z = this.nextFloatZIndex(null);
            layout = Algorithm.floatPanel(layout, newPanel, this.state.dropRect);
          } else {
            layout = Algorithm.dockPanelToPanel(layout, newPanel, target, direction);
          }
        }

      } else if ('children' in target) {
        // box target
        let newPanel = Algorithm.converToPanel(source);
        layout = Algorithm.dockPanelToBox(layout, newPanel, target, direction);
      } else {
        layout = Algorithm.addTabToTab(layout, source, target, direction);
      }
    }
    layout = Algorithm.fixLayoutData(layout);
    this.setState({layout});
    this.dragEnd();
  }

  find(id: string): PanelData | TabData {
    return Algorithm.find(this.state.layout, id);
  }

  updateTab(id: string, newTab: TabData): boolean {
    let tab = this.find(id);
    if (tab && !('tabs' in tab)) {
      let panelData = tab.parent;
      let idx = panelData.tabs.indexOf(tab);
      if (idx >= 0) {
        let {layout} = this.state;
        layout = Algorithm.removeFromLayout(layout, tab); // remove old tab
        panelData = Algorithm.getUpdatedObject(panelData); // panelData might change during removeTab
        layout = Algorithm.addTabToPanel(layout, newTab, panelData, idx); // add new tab
        layout = Algorithm.fixLayoutData(layout);
        this.setState({layout});
        return true;
      }
    }
    return false;
  }

  constructor(props: LayoutProps) {
    super(props);
    this.state = {
      layout: this.prepareInitData(props.defaultLayout),
      dropRect: null
    };
    document.addEventListener('dragend', this.dragEnd);
  }

  /** @ignore */
  dragEnd = () => {
    DockPanel.droppingPanel = null;
    if (this.state.dropRect) {
      this.setState({dropRect: null});
    }
  };

  /** @ignore */
  setDropRect(element: HTMLElement, direction?: DropDirection, source?: any, event?: MouseEvent) {
    let {dropRect} = this.state;
    if (dropRect) {
      if (direction === 'remove') {
        if (dropRect.source === source) {
          this.setState({dropRect: null});
        }
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
        left = x - 150;
        top = y - 15;
        width = 300;
        height = 300;
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
  _zCount = 0;

  /** @ignore */
  nextFloatZIndex(current?: number): number {
    if (current === this._zCount) {
      // already the top
      return current;
    }
    // if (this._zCount >= Number.MAX_SAFE_INTEGER) {
    //   is it a bug here? No !
    // }
    return ++this._zCount;
  }

  /** @ignore */
  render(): React.ReactNode {
    let {style} = this.props;
    let {layout, dropRect} = this.state;
    let dropRectStyle: CSSProperties;
    if (dropRect) {
      let {element, direction, ...rect} = dropRect;
      dropRectStyle = {...rect, display: 'block'};
    }
    return (
      <div ref={this.getRef} className='dock-layout' style={style}>
        <DockContextProvider value={this}>
          <DockBox size={1} boxData={layout.dockbox}/>
          <FloatBox boxData={layout.floatbox}/>
        </DockContextProvider>
        <div className='dock-drop-indicator' style={dropRectStyle}/>
      </div>
    );
  }

  /** @ignore */
  componentWillUnmount(): void {
    document.removeEventListener('dragend', this.dragEnd);
  }

  // public api

  saveLayout(modifier?: SaveModifier): SavedLayout {
    return Serializer.saveLayoutData(this.state.layout, modifier);
  }

  loadLayout(savedLayout: SavedLayout, modifier?: LoadModifier) {
    let layout = Serializer.loadLayoutData(savedLayout, this.props.defaultLayout, modifier);
    layout = Algorithm.fixLayoutData(layout);
    this.setState({layout});
  }
}
