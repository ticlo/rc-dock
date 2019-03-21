import React from "react";
import {BoxData, DockContext, DockContextType, DropDirection, PanelData, TabData, TabGroup} from "./DockData";
import {DockTabs} from "./DockTabs";
import {Divider, DividerChild} from "./Divider";
import {DockPanel} from "./DockPanel";
import {DragStore} from "./DragStore";

interface DockDropSquareProps {
  direction: DropDirection;
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
    this.context.setDropRect(panelElement, direction);
    e.dataTransfer.dropEffect = 'move';
    e.preventDefault();
    e.stopPropagation();
  };

  onDragLeave = (e: React.DragEvent) => {
    this.setState({dropping: false});
  };

  onDrop = (e: React.DragEvent) => {
    let tab: TabData = DragStore.getData(DockContextType, 'tab');
    if (tab) {
      let {panelData, direction} = this.props;
      this.context.moveTab(tab, panelData, direction);
    }
  };

  render(): React.ReactNode {
    let {direction} = this.props;
    let {dropping} = this.state;

    let cls = `dock-drop-square dock-drop-${direction}${dropping ? ' dock-drop-square-dropping' : ''}`;
    return <div className={cls} onDragOver={this.onDragOver} onDragLeave={this.onDragLeave} onDrop={this.onDrop}/>;
  }
}


interface DockDropLayerProps {
  panelData: PanelData;
  panelElement: HTMLElement;
  dropFromPanel: PanelData;
}

export class DockDropLayer extends React.PureComponent<DockDropLayerProps, any> {

  render(): React.ReactNode {
    let {panelData, panelElement, dropFromPanel} = this.props;

    let children = [
      <DockDropSquare key='left' direction='left' panelData={panelData} panelElement={panelElement}/>,
      <DockDropSquare key='right' direction='right' panelData={panelData} panelElement={panelElement}/>,
      <DockDropSquare key='top' direction='top' panelData={panelData} panelElement={panelElement}/>,
      <DockDropSquare key='bottom' direction='bottom' panelData={panelData} panelElement={panelElement}/>
    ];
    if (panelData.group === dropFromPanel.group) {
      if (panelData === dropFromPanel) {
        // float panel
        children.push(
          <DockDropSquare key='float' direction='float' panelData={panelData} panelElement={panelElement}/>
        );
      } else {
        // dock to tabs
        children.push(
          <DockDropSquare key='middle' direction='middle' panelData={panelData} panelElement={panelElement}/>
        );
      }
    }

    return (
      <div className='dock-drop-layer'>
        {children}
      </div>
    );
  }
}
