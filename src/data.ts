import React from 'react';


export interface Box {
  key: string;
  size: number;
  children: (Box | Panel)[];
}


interface TabFeature {
  group?: string;
  floatable?: boolean;
  closable?: boolean;
  multiple?: boolean;
  tabClass?: string;
  panelClass?: string;
}

export interface Tab extends TabFeature {
  key: string;
  render: React.ReactNode | (() => React.ReactNode);
}

export interface Panel {
  key: string;
  size: number;
  tabs: Tab[];
  default?: TabFeature;
}
