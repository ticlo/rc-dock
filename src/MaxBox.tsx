import React from "react";
import {BoxData, PanelData} from "./DockData";
import {DockPanel} from "./DockPanel";

interface Props {
  boxData: BoxData;
}

export class MaxBox extends React.PureComponent<Props, any> {

  render(): React.ReactNode {
    let panelData = this.props.boxData.children[0] as PanelData;


    return (
      <div className='dock-box dock-mbox'>
        <DockPanel size={100} panelData={panelData} key={panelData.id}/>
      </div>
    );
  }
}
