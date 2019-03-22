import React from "react";
import {BoxData, DockContext, DockContextType, DockMode, DropDirection, PanelData, TabData, TabGroup} from "./DockData";
import {DockTabs} from "./DockTabs";
import {Divider, DividerChild} from "./Divider";
import {DockPanel} from "./DockPanel";
import {DragStore} from "./DragStore";

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

  onDragOver = (e: React.DragEvent) => {
    let {panelElement, direction} = this.props;
    this.setState({dropping: true});
    this.context.setDropRect(panelElement, direction, this, e.nativeEvent);
    e.dataTransfer.dropEffect = 'move';
    e.preventDefault();
    e.stopPropagation();
  };

  onDragLeave = (e: React.DragEvent) => {
    let {panelElement, direction} = this.props;
    this.setState({dropping: false});
    this.context.setDropRect(null, 'remove', this);
  };

  onDrop = (e: React.DragEvent) => {
    let tab: TabData = DragStore.getData(DockContextType, 'tab');
    if (tab) {
      let {panelData, direction} = this.props;
      this.context.moveTab(tab, panelData, direction);
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
      <div className={classes.join(' ')}
           onDragOver={this.onDragOver} onDragLeave={this.onDragLeave} onDrop={this.onDrop}/>
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

  static addDepthSquare(children: React.ReactNode[], mode: DockMode, panelData: PanelData, panelElement: HTMLElement, depth?: number) {
    if (mode === 'horizontal') {
      children.push(
        <DockDropSquare key={`top${depth}`} direction='top' depth={depth} panelData={panelData}
                        panelElement={panelElement}/>);
      children.push(
        <DockDropSquare key={`bottom${depth}`} direction='bottom' depth={depth} panelData={panelData}
                        panelElement={panelElement}/>
      );
    } else {
      children.push(
        <DockDropSquare key={`left${depth}`} direction='left' depth={depth} panelData={panelData}
                        panelElement={panelElement}/>);
      children.push(
        <DockDropSquare key={`right${depth}`} direction='right' depth={depth} panelData={panelData}
                        panelElement={panelElement}/>
      );
    }
  }

  render(): React.ReactNode {
    let {panelData, panelElement, dropFromPanel} = this.props;

    let children: React.ReactNode[] = [];
    DockDropLayer.addDepthSquare(children, 'horizontal', panelData, panelElement, 0);
    DockDropLayer.addDepthSquare(children, 'vertical', panelData, panelElement, 0);

    if (panelData.group === dropFromPanel.group && panelData !== dropFromPanel) {
      // dock to tabs
      children.push(
        <DockDropSquare key='middle' direction='middle' panelData={panelData} panelElement={panelElement}/>
      );
    }

    if (dropFromPanel.group.floatable) {
      children.push(
        <DockDropSquare key='float' direction='float' panelData={panelData} panelElement={panelElement}/>
      );
    }
    let box = panelData.parent;
    if (box && box.children.length > 1) {
      DockDropLayer.addDepthSquare(children, box.mode, panelData, panelElement, 1);
      if (box.parent) {
        DockDropLayer.addDepthSquare(children, box.parent.mode, panelData, panelElement, 2);
      }
    }

    return (
      <div className='dock-drop-layer'>
        {children}
      </div>
    );
  }
}
