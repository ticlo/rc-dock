import React from 'react';

interface DockDataBase {
  id: string;
  minWidth?: number;
  minHeight?: number;
}

export interface BoxData extends DockDataBase {
  size: number;
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
  title: string;
  content: React.ReactNode | (() => React.ReactNode);
  group: TabGroup;
}

export interface PanelData extends DockDataBase {
  size: number;
  tabs: TabData[];
  group: TabGroup;
}

export interface DockContext {

}

const Context = React.createContext<DockContext>(null);
export const DockContextProvider = Context.Provider;
export const DockContextConsumer = Context.Consumer;