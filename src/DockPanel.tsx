import React from "react";
import {DockTabProps} from "./DockTab";

interface DockPanelProps extends DockTabProps {
  minWidth?: number;
  minHeight?: number;
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