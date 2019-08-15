import React from "react";
import {BoxData, PanelData} from "./DockData";
import {DockPanel} from "./DockPanel";

interface Props {
  boxData: BoxData;
}

export class MaxBox extends React.PureComponent<Props, any> {

  // a place holder panel data to be used during hide animation
  hidePanelData: PanelData;

  render(): React.ReactNode {
    let panelData = this.props.boxData.children[0] as PanelData;

    if (panelData) {
      this.hidePanelData = {...panelData, tabs: []};
      return (
        <div className='dock-box dock-mbox dock-mbox-show'>
          <DockPanel size={100} panelData={panelData}/>
        </div>
      );
    } else if (this.hidePanelData) {
      // use the hiden data only once, dont keep it for too long
      let hidePanelData = this.hidePanelData;
      this.hidePanelData = null;
      return (
        <div className='dock-box dock-mbox dock-mbox-hide'>
          <DockPanel size={100} panelData={hidePanelData}/>
        </div>
      );
    } else {
      return (
        <div className='dock-box dock-mbox dock-mbox-hide'/>
      );
    }
  }
}
