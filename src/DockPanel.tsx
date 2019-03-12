import React from "react";
import {DockTabProps} from "./DockTab";
import {TabFeature} from "./DockData";

interface DockPanelProps extends TabFeature {
  width?: number;
  height?: number;
}

class DockPanel extends React.PureComponent<DockPanelProps, any> {

  render(): React.ReactNode {
    return (
      <div className='dock-panel'>

      </div>
    );
  }
}