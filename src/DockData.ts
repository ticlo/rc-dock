import React from 'react';

export interface TabGroup {
  floatable?: boolean;
  multiTabs?: boolean;
  // when tabs are locked, you can only drag the whole panel
  tabLocked?: boolean;
  animated?: boolean;
  panelExtra?: (panel: PanelData, context: DockContext) => React.ReactElement;
}

export const defaultGroup: TabGroup = {
  floatable: true,
};

export const placeHolderStyle = 'place-holder';
export const placeHolderGroup: TabGroup = {
  floatable: false,
};


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

export interface TabData extends DockDataBase {
  id?: string;
  parent?: PanelData;
  title: React.ReactChild;
  content: React.ReactElement | ((tab: TabData) => React.ReactElement);
  closable?: boolean;
  group: string;

  cached?: boolean;
  cacheContext?: React.Context<any>;
}

interface PanelLock {
  // override the default style from TabGroup.name
  panelStyle?: string;
  // override the default element from TabGroup.panelExtra
  panelExtra?: (panel: PanelData) => React.ReactElement;
}

export interface PanelData extends DockDataBase {
  id?: string | number;
  parent?: BoxData;
  activeId?: string;
  tabs: TabData[];
  group: string;

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

export interface DefaultLayout extends LayoutData {
  groups?: {[key: string]: TabGroup};
}

export type DropDirection =
  'left' | 'right' | 'bottom' | 'top' | 'middle' | 'remove' | 'before-tab' | 'after-tab' | 'float';

export interface DockContext {
  /** @ignore */
  setDropRect(element: HTMLElement, direction?: DropDirection, source?: any, event?: MouseEvent): void;

  dockMove(source: TabData | PanelData, target: TabData | PanelData | BoxData, direction: DropDirection): void;

  getGroup(name: string): TabGroup;

  find(id: string | number): PanelData | TabData;

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