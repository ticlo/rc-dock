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


  getDirection(e: DragState, group: TabGroup): {direction: DropDirection, mode?: DockMode, depth: number} {
    let rect = this._ref.getBoundingClientRect();
    let widthRate = Math.min(rect.width, 500);
    let heightRate = Math.min(rect.height, 500);
    let left = (e.clientX - rect.left) / widthRate;
    let right = (rect.right - e.clientX) / widthRate;
    let top = (e.clientY - rect.top) / heightRate;
    let bottom = (rect.bottom - e.clientY) / heightRate;
    let min = Math.min(left, right, top, bottom);
    let depth = 0;
    if (group.disableDock) {
      // impossible min value, disable dock drop
      min = 1;
    }
    if (min < 0) {
      return {direction: null, depth: 0};
    } else if (min < 0.075) {
      depth = 3; // depth 3 or 4
    } else if (min < 0.15) {
      depth = 1; // depth 1 or 2
    } else if (min < 0.3) {
      // default
    } else if (group.floatable) {
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

  getActualDepth(depth: number, mode: DockMode, direction: DropDirection): number {
    let afterPanel = (direction === 'bottom' || direction === 'right');
    if (!depth) {
      return depth;
    }
    let {panelData} = this.props;
    let previousTarget: BoxData | PanelData = panelData;
    let targetBox: BoxData = panelData.parent;
    let lastDepth = 0;
    if (panelData.parent.mode === mode) {
      ++depth;
    }
    while (targetBox && lastDepth < depth) {
      if (targetBox.mode === mode) {
        if (afterPanel) {
          if (targetBox.children[targetBox.children.length - 1] !== previousTarget) {
            // dont go deeper if current target is on different side of the box
            break;
          }
        } else {
          if (targetBox.children[0] !== previousTarget) {
            // dont go deeper if current target is on different side of the box
            break;
          }
        }
      }
      previousTarget = targetBox;
      targetBox = targetBox.parent;
      ++lastDepth;
    }
    while (depth > lastDepth) {
      depth -= 2;
    }
    return depth;
  }

  onDragOver = (e: DragState) => {
    let {panelData, panelElement, dropFromPanel} = this.props;
    let draggingPanel = DragState.getData('panel', DockContextType);

    let fromGroup = this.context.getGroup(dropFromPanel.group);
    if (draggingPanel && draggingPanel.parent.mode === 'float') {
      // ignore float panel in edge mode
      return;
    }
    let {direction, mode, depth} = this.getDirection(e, fromGroup);
    depth = this.getActualDepth(depth, mode, direction);
    if (!direction || (direction === 'float' && dropFromPanel.panelLock)) {
      this.context.setDropRect(null, 'remove', this);
      return;
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
    let fromGroup = this.context.getGroup(dropFromPanel.group);
    let source: TabData | PanelData = DragState.getData('tab', DockContextType);
    if (!source) {
      source = DragState.getData('panel', DockContextType);
    }
    if (source) {
      let {direction, mode, depth} = this.getDirection(e, fromGroup);
      depth = this.getActualDepth(depth, mode, direction);
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
