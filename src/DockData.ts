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
  name?: string;
  floatable?: boolean;
  multiTabs?: boolean;
  // when tabs are locked, you can only drag the whole panel
  tabLocked?: boolean;
  panelClass?: string;
  animated?: boolean;
}

export interface TabData extends DockDataBase {
  id?: string;
  parent?: PanelData;
  title: React.ReactChild;
  content: React.ReactElement | (() => React.ReactElement);
  closable?: boolean;
  group: TabGroup;

  cached?: boolean;
  cacheContext?: React.Context<any>;
}

interface PanelLock {
  panelClass?: string;
  animated?: boolean; // TODO
}

export interface PanelData extends DockDataBase {
  id?: string | number;
  parent?: BoxData;
  activeId?: string;
  tabs: TabData[];
  group: TabGroup;

  // docked only
  size?: number;
  panelLock?: PanelLock; // if not null, panel won't disappear even when all children are gone

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
  /** @ignore */
  setDropRect(element: HTMLElement, direction?: DropDirection, source?: any, event?: MouseEvent): void;

  dockMove(source: TabData | PanelData, target: TabData | PanelData | BoxData, direction: DropDirection): void;

  /** @ignore */
  nextFloatZIndex(current: number): number;
}

/** @ignore */
let _idCount = 0;

/** @ignore */
export function nextId() {
  ++_idCount;
  // if (_idCount >= Number.MAX_SAFE_INTEGER) {
  // }
  return `+${_idCount}`;
}

/** @ignore */
export const DockContextType = React.createContext<DockContext>(null);
/** @ignore */
export const DockContextProvider = DockContextType.Provider;
/** @ignore */
export const DockContextConsumer = DockContextType.Consumer;