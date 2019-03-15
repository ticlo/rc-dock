import React from 'react';

interface DockDataBase {
  id: string | number;
  minWidth?: number;
  minHeight?: number;
}

export interface BoxData extends DockDataBase {
  parent?: BoxData;
  size: number;
  isVertical?: boolean;
  children: (BoxData | PanelData)[];
}


export interface TabGroup {
  floatable?: boolean;
  closable?: boolean;
  multiTabs?: boolean;
  // when tabs are locked, you can only drag the whole panel
  tabLocked?: boolean;
  panelClass?: string;
}

export interface TabData extends DockDataBase {
  parent?: PanelData;
  title: string;
  content: React.ReactNode | (() => React.ReactNode);
  group: TabGroup;
}

export interface PanelData extends DockDataBase {
  parent?: BoxData;
  size: number;
  activeId: string;
  tabs: TabData[];
  group: TabGroup;
}

export interface DockContext {

}

const Context = React.createContext<DockContext>(null);
export const DockContextProvider = Context.Provider;
export const DockContextConsumer = Context.Consumer;