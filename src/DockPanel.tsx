import React from "react";
import {DockTabProps} from "./DockTab";
import {DockContext, TabFeature} from "./DockData";

interface DockPanelProps extends TabFeature {
  width?: number;
  height?: number;
}

class DockPanel extends React.PureComponent<DockPanelProps, any> {

  context!: DockContext;

  render(): React.ReactNode {
    let a = this.context;
    return (
      <div className='dock-panel'>

      </div>
    );
  }
}