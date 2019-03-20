import React, {CSSProperties} from "react";
import {
  BoxData,
  LayoutData,
  PanelData,
  DockContextProvider,
  nextId,
  DockContext,
  DropDirection,
  TabData
} from "./DockData";
import {DockBox} from "./DockBox";
import {FloatBox} from "./FloatBox";
import {Simulate} from "react-dom/test-utils";
import drop = Simulate.drop;
import {DockPanel} from "./DockPanel";
import * as Algorithm from "./DockAlgorithm";

interface Props {
  defaultLayout: LayoutData | BoxData | (BoxData | PanelData)[];
  style?: CSSProperties;
}

interface State {
  layout: LayoutData;
  dropRect?: {left: number, width: number, top: number, height: number, element: HTMLElement, direction?: DropDirection};
}

export class DockLayout extends React.PureComponent<Props, State> implements DockContext {

  _ref: HTMLDivElement;
  getRef = (r: HTMLDivElement) => {
    this._ref = r;
  };


  prepareInitData(data: LayoutData | BoxData | (BoxData | PanelData)[]): LayoutData {
    let layout: LayoutData;
    if (Array.isArray(data)) {
      layout = {
        dockbox: {mode: 'horizontal', children: data, size: 1}
      };
    } else if ('dockbox' in data || 'floatbox' in data) {
      layout = data;
    } else if ('children' in data) {
      layout = {
        dockbox: data
      };
    }
    Algorithm.fixLayoutData(layout);
    return layout;
  }

  moveTab(tab: TabData, target: TabData | PanelData, direction: DropDirection) {
    let {layout} = this.state;
    Algorithm.setWatchObject(target);
    layout = Algorithm.removeTab(layout, tab);
    if (target) {
      if ('tabs' in target) {
        // is panel
      } else {
        layout = Algorithm.addTabToTab(layout, tab, Algorithm.getWatchObject(target), direction);
      }
    }
    layout = Algorithm.fixLayoutData(layout);
    this.setState({layout});
    this.dragEnd();
    Algorithm.clearWatchObj();
  }

  movePanel(panel: PanelData, target: PanelData, direction: DropDirection) {
    this.dragEnd();
  }

  constructor(props: Props) {
    super(props);
    this.state = {
      layout: this.prepareInitData(props.defaultLayout),
      dropRect: null
    };
    document.addEventListener('dragend', this.dragEnd);
  }

  dragEnd = () => {
    DockPanel.droppingPanel = null;
    if (this.state.dropRect) {
      this.setState({dropRect: null});
    }
  };

  setDropRect(element: HTMLElement, direction?: DropDirection) {
    let {dropRect} = this.state;
    if (dropRect && dropRect.element === element && dropRect.direction === direction) {
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

    switch (direction) {
      case 'right':
        left += width * 0.5;
      case 'left': // tslint:disable-line no-switch-case-fall-through
        width *= 0.5;
        break;
      case 'bottom':
        top += height * 0.5;
      case 'top': // tslint:disable-line no-switch-case-fall-through
        height *= 0.5;
        break;
      case 'after-tab':
        left += width - 10;
        width = 30;
        break;
      case 'before-tab':
        left -= 30 - 10;
        width = 30;
        break;
    }

    this.setState({dropRect: {left, top, width, height, element, direction}});
  }

  render(): React.ReactNode {
    let {style} = this.props;
    let {layout, dropRect} = this.state;
    console.log(`layout render `);
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

  componentWillUnmount(): void {
    document.removeEventListener('dragend', this.dragEnd);
  }
}
