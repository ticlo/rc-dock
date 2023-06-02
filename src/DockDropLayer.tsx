import * as React from "react";
import {
  BoxData,
  DockContext,
  DockContextType,
  DockMode,
  DropDirection,
  PanelData,
  TabData,
  placeHolderStyle
} from "./DockData";
import {DragDropDiv} from "./dragdrop/DragDropDiv";
import {DragState} from "./dragdrop/DragManager";


interface DockDropSquareProps {
  direction: DropDirection;
  depth?: number;
  panelData: PanelData;
  panelElement: HTMLElement;
}

interface DockDropSquareState {
  dropping: boolean;
}

export class DockDropSquare extends React.PureComponent<DockDropSquareProps, DockDropSquareState> {
  static contextType = DockContextType;

  context!: DockContext;

  state = {dropping: false};

  onDragOver = (e: DragState) => {
    let {panelElement: targetElement, direction, depth, panelData} = this.props;
    this.setState({dropping: true});
    for (let i = 0; i < depth; ++i) {
      targetElement = targetElement.parentElement;
    }
    if (panelData.group === placeHolderStyle && direction !== 'float') {
      // place holder panel should always have full size drop rect
      this.context.setDropRect(targetElement, 'middle', this, e);
    } else {
      let dockId = this.context.getDockId();
      let panelSize: [number, number] = DragState.getData('panelSize', dockId);
      this.context.setDropRect(targetElement, direction, this, e, panelSize);
    }
    e.accept('');
  };

  onDragLeave = (e: DragState) => {
    this.setState({dropping: false});
    this.context.setDropRect(null, 'remove', this);
  };

  onDrop = (e: DragState) => {
    let dockId = this.context.getDockId();
    let source: TabData | PanelData = DragState.getData('tab', dockId);
    if (!source) {
      source = DragState.getData('panel', dockId);
    }
    if (source) {
      let {panelData, direction, depth} = this.props;
      let target: PanelData | BoxData = panelData;
      for (let i = 0; i < depth; ++i) {
        target = target.parent;
      }
      this.context.dockMove(source, target, direction);
    }
  };

  render(): React.ReactNode {
    let {direction, depth} = this.props;
    let {dropping} = this.state;

    let classes = ['dock-drop-square'];
    classes.push(`dock-drop-${direction}`);
    if (depth) {
      classes.push(`dock-drop-deep`);
    }
    if (dropping) {
      classes.push('dock-drop-square-dropping');
    }

    return (
      <DragDropDiv className={classes.join(' ')}
                   onDragOverT={this.onDragOver} onDragLeaveT={this.onDragLeave} onDropT={this.onDrop}>
        <div className="dock-drop-square-box"/>
      </DragDropDiv>
    );
  }

  componentWillUnmount(): void {
    this.context.setDropRect(null, 'remove', this);
  }
}

interface DockDropLayerProps {
  panelData: PanelData;
  panelElement: HTMLElement;
  dropFromPanel: PanelData;
}

export class DockDropLayer extends React.PureComponent<DockDropLayerProps, any> {
  static contextType = DockContextType;

  context!: DockContext;

  static addDepthSquare(children: React.ReactNode[], mode: DockMode, panelData: PanelData, panelElement: HTMLElement, depth?: number) {
    if (mode === 'horizontal') {
      children.push(
        <DockDropSquare key={`top${depth}`} direction="top" depth={depth} panelData={panelData}
                        panelElement={panelElement}/>);
      children.push(
        <DockDropSquare key={`bottom${depth}`} direction="bottom" depth={depth} panelData={panelData}
                        panelElement={panelElement}/>
      );
    } else {
      children.push(
        <DockDropSquare key={`left${depth}`} direction="left" depth={depth} panelData={panelData}
                        panelElement={panelElement}/>);
      children.push(
        <DockDropSquare key={`right${depth}`} direction="right" depth={depth} panelData={panelData}
                        panelElement={panelElement}/>
      );
    }
  }

  render(): React.ReactNode {
    let {panelData, panelElement, dropFromPanel} = this.props;
    let dockId = this.context.getDockId();

    let children: React.ReactNode[] = [];

    // check if it's whole panel dragging
    let draggingPanel = DragState.getData('panel', dockId);

    let fromGroup = this.context.getGroup(dropFromPanel.group);
    if (fromGroup.floatable !== false &&
      (!draggingPanel ||
        (
          !draggingPanel.panelLock && // panel with panelLock can't float
          draggingPanel.parent?.mode !== 'float' && // don't show float drop when over a float panel
          !(fromGroup.floatable === 'singleTab' && draggingPanel.tabs.length > 1) // singleTab can float only with one tab
        )
      )
    ) {
      children.push(
        <DockDropSquare key="float" direction="float" panelData={panelData} panelElement={panelElement}/>
      );
    }

    if (draggingPanel !== panelData && !fromGroup.disableDock) { // don't drop panel to itself

      // 4 direction base drag square
      DockDropLayer.addDepthSquare(children, 'horizontal', panelData, panelElement, 0);
      DockDropLayer.addDepthSquare(children, 'vertical', panelData, panelElement, 0);

      if (!draggingPanel?.panelLock && panelData.group === dropFromPanel.group && panelData !== dropFromPanel) {
        // dock to tabs
        children.push(
          <DockDropSquare key="middle" direction="middle" panelData={panelData} panelElement={panelElement}/>
        );
      }


      let box = panelData.parent;
      if (box && box.children.length > 1) {
        // deeper drop
        DockDropLayer.addDepthSquare(children, box.mode, panelData, panelElement, 1);
        if (box.parent) {
          DockDropLayer.addDepthSquare(children, box.parent.mode, panelData, panelElement, 2);
        }
      }
    }

    return (
      <div className="dock-drop-layer">
        {children}
      </div>
    );
  }
}
