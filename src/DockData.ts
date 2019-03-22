import React from 'react';

interface DockDataBase {
  minWidth?: number;
  minHeight?: number;
}

export type DockMode = 'horizontal' | 'vertical' | 'float';

export interface BoxData extends DockDataBase {
  id?: string | number;
  parent?: BoxData;
  size?: number;
  mode?: DockMode;
  children: (BoxData | PanelData)[];
}


export interface TabGroup {
  floatable?: boolean;
  closable?: boolean;
  multiTabs?: boolean;
  // when tabs are locked, you can only drag the whole panel
  tabLocked?: boolean;
  headless?: boolean;
  panelClass?: string;
}

export interface TabData extends DockDataBase {
  id?: string;
  parent?: PanelData;
  title: string;
  content: React.ReactNode | (() => React.ReactNode);
  group: TabGroup;
}

export interface PanelData extends DockDataBase {
  id?: string | number;
  parent?: BoxData;
  activeId: string;
  tabs: TabData[];
  group: TabGroup;

  // docked only
  size?: number;
  panelLocked?: boolean; // panel won't disappear even when all children are gone

  // float mode only
  x?: number;
  y?: number;
  z?: number;
  w?: number;
  h?: number;
}

export interface LayoutData {
  dockbox?: BoxData;
  floatbox?: BoxData;
}

export type DropDirection =
  'left' | 'right' | 'bottom' | 'top' | 'middle' | 'remove' | 'before-tab' | 'after-tab' | 'float';

export interface DockContext {
  setDropRect(element: HTMLElement, direction?: DropDirection, source?: any, event?: MouseEvent): void;

  moveTab(tab: TabData, target: TabData | PanelData | BoxData, direction: DropDirection): void;

  movePanel(panel: PanelData, target: PanelData, direction: DropDirection): void;

  nextFloatZIndex(current: number): number;
}

let _idCount = 0;

export function nextId() {
  ++_idCount;
  if (_idCount >= Number.MAX_SAFE_INTEGER) {
    _idCount = -Number.MAX_SAFE_INTEGER;
  }
  return _idCount;
}


export const DockContextType = React.createContext<DockContext>(null);
export const DockContextProvider = DockContextType.Provider;
export const DockContextConsumer = DockContextType.Consumer;