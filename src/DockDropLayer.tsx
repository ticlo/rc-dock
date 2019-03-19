import React from "react";
import {BoxData, DockContextType, DropDirection, PanelData, TabData, TabGroup} from "./DockData";
import {DockTabs} from "./DockTabs";
import {Divider, DividerChild} from "./Divider";
import {DockPanel} from "./DockPanel";
import {DragStore} from "./DragStore";

interface DockDropSquareProps {
  direction: DropDirection;
  panelData: PanelData;
}

export class DockDropSquare extends React.PureComponent<DockDropSquareProps, any> {
  onDragOver = () => {

  };

  onDragLeave() {
  }

  onDrop() {

  }

  render(): React.ReactNode {
    let {direction} = this.props;
    let cls = `dock-drop-square dock-drop-${direction}`;
    return <div className={cls} onDragOver={this.onDragOver} onDragLeave={this.onDragLeave} onDrop={this.onDrop}/>;
  }
}


interface DockDropLayerProps {
  panelData: PanelData;
}

export class DockDropLayer extends React.PureComponent<DockDropLayerProps, any> {

  render(): React.ReactNode {
    let {panelData} = this.props;


    return (
      <div className='dock-drop-layer'>
        <DockDropSquare direction='middle' panelData={panelData}/>
        <DockDropSquare direction='left' panelData={panelData}/>
        <DockDropSquare direction='right' panelData={panelData}/>
        <DockDropSquare direction='top' panelData={panelData}/>
        <DockDropSquare direction='bottom' panelData={panelData}/>
      </div>
    );
  }
}
