import React, {CSSProperties, PointerEventHandler} from "react";
import {DockContext, DockContextType, DockMode, PanelData, TabData, TabGroup} from "./DockData";
import {DockTabs} from "./DockTabs";
import {AbstractPointerEvent, DragDropDiv} from "./dragdrop/DragDropDiv";
import {default as DragManager, DragState} from "./dragdrop/DragManager";
import {DockDropLayer} from "./DockDropLayer";
import {nextZIndex} from "./Algorithm";
import {DockDropEdge} from "./DockDropEdge";

interface Props {
  panelData: PanelData;
  size: number;
}

interface State {
  dropFromPanel: PanelData;
  draggingHeader: boolean;
}

export class DockPanel extends React.PureComponent<Props, State> {
  static contextType = DockContextType;

  context!: DockContext;

  _ref: HTMLDivElement;
  getRef = (r: HTMLDivElement) => {
    this._ref = r;
  };

  static _droppingPanel: DockPanel;
  static set droppingPanel(panel: DockPanel) {
    if (DockPanel._droppingPanel === panel) {
      return;
    }
    if (DockPanel._droppingPanel) {
      DockPanel._droppingPanel.onDragOverOtherPanel();
    }
    DockPanel._droppingPanel = panel;
  }

  state: State = {dropFromPanel: null, draggingHeader: false};

  onDragOver = (e: DragState) => {
    if (DockPanel._droppingPanel === this) {
      return;
    }
    let {panelData} = this.props;
    DockPanel.droppingPanel = this;
    let tab: TabData = DragState.getData('tab', DockContextType);
    let panel: PanelData = DragState.getData('panel', DockContextType);
    if (tab) {
      if (tab.parent) {
        this.setState({dropFromPanel: tab.parent});
      } else {
        // add a fake panel
        this.setState({dropFromPanel: {activeId: '', tabs: [], group: tab.group}});
      }
    } else if (panel) {
      this.setState({dropFromPanel: panel});
    }
  };

  onDragOverOtherPanel() {
    if (this.state.dropFromPanel) {
      this.setState({dropFromPanel: null});
    }
  }

  // used both by dragging head and corner
  _movingX: number;
  _movingY: number;
  // drop to move in float mode
  onPanelHeaderDragStart = (event: DragState) => {
    let {panelData} = this.props;
    let {parent, x, y, z} = panelData;
    if (parent && parent.mode === 'float') {
      this._movingX = x;
      this._movingY = y;
      // hide the panel, but not create drag layer element
      event.setData({panel: this.props.panelData}, DockContextType);
      event.startDrag(null, null);
      this.onFloatPointerDown();
    } else {
      event.setData({panel: this.props.panelData}, DockContextType);
      event.startDrag(null);
    }
    this.setState({draggingHeader: true});
  };
  onPanelHeaderDragMove = (e: DragState) => {
    let {width, height} = this.context.getLayoutSize();
    let {panelData} = this.props;
    panelData.x = this._movingX + e.dx;
    panelData.y = this._movingY + e.dy;
    if (width > 200 && height > 200) {
      if (panelData.y < 0) {
        panelData.y = 0;
      } else if (panelData.y > height - 16) {
        panelData.y = height - 16;
      }

      if (panelData.x + panelData.w < 16) {
        panelData.x = 16 - panelData.w;
      } else if (panelData.x > width - 16) {
        panelData.x = width - 16;
      }
    }
    this.forceUpdate();
  };
  onPanelHeaderDragEnd = (e: DragState) => {
    if (!this._unmounted) {
      this.setState({draggingHeader: false});
      this.context.onSilentChange(this.props.panelData.activeId);
    }
  };


  _movingW: number;
  _movingH: number;
  _movingCorner: string;
  onPanelCornerDragTL = (e: DragState) => {
    this.onPanelCornerDrag(e, 'tl');
  };
  onPanelCornerDragTR = (e: DragState) => {
    this.onPanelCornerDrag(e, 'tr');
  };
  onPanelCornerDragBL = (e: DragState) => {
    this.onPanelCornerDrag(e, 'bl');
  };
  onPanelCornerDragBR = (e: DragState) => {
    this.onPanelCornerDrag(e, 'br');
  };

  onPanelCornerDrag(e: DragState, corner: string) {
    let {parent, x, y, w, h} = this.props.panelData;
    if (parent && parent.mode === 'float') {
      this._movingCorner = corner;
      this._movingX = x;
      this._movingY = y;
      this._movingW = w;
      this._movingH = h;
      e.startDrag(null, null);
    }
  }

  onPanelCornerDragMove = (e: DragState) => {
    let {panelData} = this.props;
    let {dx, dy} = e;

    if (this._movingCorner.startsWith('t')) {
      // when moving top corners, dont let it move header out of screen
      let {width, height} = this.context.getLayoutSize();
      if (this._movingY + dy < 0) {
        dy = -this._movingY;
      } else if (this._movingY + dy > height - 16) {
        dy = height - 16 - this._movingY;
      }
    }

    switch (this._movingCorner) {
      case 'tl': {
        panelData.x = this._movingX + dx;
        panelData.w = this._movingW - dx;
        panelData.y = this._movingY + dy;
        panelData.h = this._movingH - dy;
        break;
      }
      case 'tr': {
        panelData.w = this._movingW + dx;
        panelData.y = this._movingY + dy;
        panelData.h = this._movingH - dy;
        break;
      }
      case 'bl': {
        panelData.x = this._movingX + dx;
        panelData.w = this._movingW - dx;
        panelData.h = this._movingH + dy;
        break;
      }
      case 'br': {
        panelData.w = this._movingW + dx;
        panelData.h = this._movingH + dy;
        break;
      }
    }

    this.forceUpdate();
  };
  onPanelCornerDragEnd = (e: DragState) => {
    this.context.onSilentChange();
  };

  onFloatPointerDown = () => {
    let {panelData} = this.props;
    let {z} = panelData;
    let newZ = nextZIndex(z);
    if (newZ !== z) {
      panelData.z = newZ;
      this.forceUpdate();
    }
  };


  render(): React.ReactNode {
    let {dropFromPanel, draggingHeader} = this.state;
    let {panelData, size} = this.props;
    let {minWidth, minHeight, group: styleName, id, parent, panelLock} = panelData;
    if (panelLock) {
      if (panelLock.panelStyle) {
        styleName = panelLock.panelStyle;
      }
    }
    let panelClass: string;
    if (styleName) {
      panelClass = styleName
        .split(' ')
        .map((name) => `dock-style-${name}`)
        .join(' ');
    }

    let isFloat = parent && parent.mode === 'float';
    let pointerDownCallback = this.onFloatPointerDown;
    if (!isFloat) {
      pointerDownCallback = null;
    }
    let cls = `dock-panel ${
      panelClass ? panelClass : ''}${
      dropFromPanel ? ' dock-panel-dropping' : ''}${
      draggingHeader ? ' dragging' : ''
      }`;
    let style: React.CSSProperties = {minWidth, minHeight, flex: `${size} 1 ${size}px`};
    if (panelData.parent.mode === 'float') {
      style.left = panelData.x;
      style.top = panelData.y;
      style.width = panelData.w;
      style.height = panelData.h;
      style.zIndex = panelData.z;
    }
    let droppingLayer: React.ReactNode;
    if (dropFromPanel) {
      let tabGroup = this.context.getGroup(dropFromPanel.group);
      if (!tabGroup.tabLocked || DragState.getData('tab', DockContextType) == null) {
        // not allowed locked tab to create new panel
        let DockDropClass = this.context.useEdgeDrop() ? DockDropEdge : DockDropLayer;
        droppingLayer = <DockDropClass panelData={panelData} panelElement={this._ref} dropFromPanel={dropFromPanel}/>;
      }
    }

    return (
      <DragDropDiv getRef={this.getRef} className={cls} style={style} data-dockid={id}
                   onMouseDownCapture={pointerDownCallback} onTouchStartCapture={pointerDownCallback}
                   onDragOverT={isFloat ? null : this.onDragOver}>
        <DockTabs panelData={panelData} onPanelDragStart={this.onPanelHeaderDragStart}
                  onPanelDragMove={this.onPanelHeaderDragMove} onPanelDragEnd={this.onPanelHeaderDragEnd}/>
        {isFloat ?
          [
            <DragDropDiv key='drag-size-t-l' className='dock-panel-drag-size dock-panel-drag-size-t-l'
                         onDragStartT={this.onPanelCornerDragTL} onDragMoveT={this.onPanelCornerDragMove}
                         onDragEndT={this.onPanelCornerDragEnd}/>,
            <DragDropDiv key='drag-size-t-r' className='dock-panel-drag-size dock-panel-drag-size-t-r'
                         onDragStartT={this.onPanelCornerDragTR} onDragMoveT={this.onPanelCornerDragMove}
                         onDragEndT={this.onPanelCornerDragEnd}/>,
            <DragDropDiv key='drag-size-b-l' className='dock-panel-drag-size dock-panel-drag-size-b-l'
                         onDragStartT={this.onPanelCornerDragBL} onDragMoveT={this.onPanelCornerDragMove}
                         onDragEndT={this.onPanelCornerDragEnd}/>,
            <DragDropDiv key='drag-size-b-r' className='dock-panel-drag-size dock-panel-drag-size-b-r'
                         onDragStartT={this.onPanelCornerDragBR} onDragMoveT={this.onPanelCornerDragMove}
                         onDragEndT={this.onPanelCornerDragEnd}/>
          ]
          : null
        }
        {droppingLayer}
      </DragDropDiv>
    );
  }

  _unmounted = false;

  componentWillUnmount(): void {
    if (DockPanel._droppingPanel === this) {
      DockPanel.droppingPanel = null;
    }
    this._unmounted = true;
  }
}
