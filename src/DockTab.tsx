import React from "react";
import {TabPane} from 'rc-tabs';

export interface DockTabFeatures {
  title: string;
  group?: string;
  floatable?: boolean;
  closable?: boolean;
  multiTabs?: boolean;
  // when tabs are locked, you can only drag the whole panel
  tabLocked?: boolean;
  panelClass?: string;
}


export interface DockTabProps {
  title: string;
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
      <TabPane tab=''>

      </TabPane>
    );
  }
}