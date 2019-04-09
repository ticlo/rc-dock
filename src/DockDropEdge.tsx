import React from "react";
import {
  BoxData,
  DockContext,
  DockContextType,
  DockMode,
  DropDirection,
  PanelData,
  TabData,
  TabGroup,
  placeHolderStyle
} from "./DockData";
import {DockTabs} from "./DockTabs";
import {Divider, DividerChild} from "./Divider";
import {DockPanel} from "./DockPanel";
import {DragDropDiv} from "./dragdrop/DragDropDiv";
import {DragState} from "./dragdrop/DragManager";

interface DockDropEdgeProps {
  panelData: PanelData;
  panelElement: HTMLElement;
  dropFromPanel: PanelData;
}

export class DockDropEdge extends React.PureComponent<DockDropEdgeProps, any> {
  static contextType = DockContextType;

  context!: DockContext;

  _ref: HTMLDivElement;
  getRef = (r: HTMLDivElement) => {
    this._ref = r;
  };


  getDirection(e: DragState): {direction: DropDirection, mode?: DockMode, depth: number} {
    let rect = this._ref.getBoundingClientRect();
    let left = (e.clientX - rect.left) / rect.width;
    let right = (rect.right - e.clientX) / rect.width;
    let top = (e.clientY - rect.top) / rect.height;
    let bottom = (rect.bottom - e.clientY) / rect.height;
    let min = Math.min(left, right, top, bottom);
    let depth = 0;
    if (min < 0) {
      return {direction: null, depth: 0};
    } else if (min < 0.075) {
      depth = 3; // depth 3 or 4
    } else if (min < 0.15) {
      depth = 1; // depth 1 or 2
    } else if (min < 0.3) {
      // default
    } else {
      return {direction: 'float', mode: 'float', depth: 0};
    }
    switch (min) {
      case left: {
        return {direction: 'left', mode: 'horizontal', depth};
      }
      case right: {
        return {direction: 'right', mode: 'horizontal', depth};
      }
      case top: {
        return {direction: 'top', mode: 'vertical', depth};
      }
      case bottom: {
        return {direction: 'bottom', mode: 'vertical', depth};
      }
    }
    // probably a invalid input causing everything to be NaN?
    return {direction: null, depth: 0};
  }

  onDragOver = (e: DragState) => {
    let {panelData, panelElement, dropFromPanel} = this.props;
    let draggingPanel = DragState.getData('panel', DockContextType);

    let fromGroup = this.context.getGroup(dropFromPanel.group);
    if (draggingPanel && draggingPanel.parent.mode === 'float') {
      // ignore float panel in edge mode
      return;
    }
    let {direction, depth} = this.getDirection(e);
    if (!direction) {
      this.context.setDropRect(null, 'remove', this);
    }
    let targetElement = panelElement;
    for (let i = 0; i < depth; ++i) {
      targetElement = targetElement.parentElement;
    }
    this.context.setDropRect(targetElement, direction, this, e);
    e.accept('');
  };

  onDragLeave = (e: DragState) => {
    this.context.setDropRect(null, 'remove', this);
  };

  onDrop = (e: DragState) => {
    let {panelData, dropFromPanel} = this.props;
    let source: TabData | PanelData = DragState.getData('tab', DockContextType);
    if (!source) {
      source = DragState.getData('panel', DockContextType);
    }
    if (source) {
      let {direction, depth} = this.getDirection(e);
      if (!direction) {
        return;
      }
      let target: PanelData | BoxData = panelData;
      for (let i = 0; i < depth; ++i) {
        target = target.parent;
      }
      this.context.dockMove(source, target, direction);
    }
  };

  render()
    :
    React.ReactNode {
    return (
      <DragDropDiv getRef={this.getRef} className='dock-drop-edge'
                   onDragOverT={this.onDragOver} onDragLeaveT={this.onDragLeave} onDropT={this.onDrop}/>
    );
  }

  componentWillUnmount()
    :
    void {
    this.context.setDropRect(null, 'remove', this);
  }
}
