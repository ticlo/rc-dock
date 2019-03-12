import React from "react";

export interface DockTabProps {

  group?: string;
  floatable?: boolean;
  closable?: boolean;
  multiTabs?: boolean;
  // when tabs are locked, you can only drag the whole panel
  tabLocked?: boolean;
  panelClass?: string;
}

export class DockTab extends React.PureComponent<DockTabProps, any> {

  render(): React.ReactNode {
    return (
      <div className='dock-panel'>

      </div>
    );
  }
}