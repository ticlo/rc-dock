import React from 'react';

interface MinSize {
  minWidth?: number;
  minHeight?: number;
}

export interface BoxProps extends MinSize {
  key: string;
  size: number;
  children: (BoxProps | PanelProps)[];
}


export interface TabFeature extends MinSize {
  group?: string;
  floatable?: boolean;
  closable?: boolean;
  multiTabs?: boolean;
  // when tabs are locked, you can only drag the whole panel
  tabLocked?: boolean;
  panelClass?: string;
}

export interface TabProps extends TabFeature {
  key: string;
  content: React.ReactNode | (() => React.ReactNode);
}

export interface PanelProps {
  key: string;
  size: number;
  tabs: TabProps[];
  default?: TabFeature;
}
