import React from 'react';

export interface TabGroup {
  /**
   * whether tab can be dragged into float layer
   * default: false
   */
  floatable?: boolean;
  /**
   * when tabs are locked, you can not drag tab out of its panel
   * default false
   */
  tabLocked?: boolean;
  /**
   * whether to show animation effect when switch tabs
   * default true
   */
  animated?: boolean;

  /**
   * generate extra content show in the right side of tab bar
   */
  panelExtra?: (panel: PanelData, context: DockContext) => React.ReactElement;
}

/** @ignore */
export const defaultGroup: TabGroup = {
  floatable: true,
};
/** @ignore */
export const placeHolderStyle = 'place-holder';
/** @ignore */
export const placeHolderGroup: TabGroup = {
  floatable: false,
};

/** @ignore */
interface DockDataBase {
  minWidth?: number;
  minHeight?: number;
}

export type DockMode = 'horizontal' | 'vertical' | 'float';

/**
 * a box is the layout element that contains other boxes or panels
 */
export interface BoxData extends DockDataBase {
  id?: string;
  parent?: BoxData;

  /**
   * the size in dock box
   * width when in horizontal layout and height when in vertical layout
   */
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

  /**
   * cached tab will always reuse the react component thus allows the component to keep its internal state
   */
  cached?: boolean;
  /**
   * cached tab is disconnected with parent react component
   * if react context is needed in the cached tab, the context type need to be specified here
   */
  cacheContext?: React.Context<any>;
}

interface PanelLock {
  // override the default style from TabGroup.name
  panelStyle?: string;
  // override the default element from TabGroup.panelExtra
  panelExtra?: (panel: PanelData) => React.ReactElement;
}

/**
 * a panel is a visiaul container with tabs button in the title bar
 */
export interface PanelData extends DockDataBase {
  id?: string;
  parent?: BoxData;
  activeId?: string;
  tabs: TabData[];
  group: string;

  // docked only
  /**
   * the size in dock box
   * width when in horizontal layout and height when in vertical layout
   */
  size?: number;
  /**
   * addition information of a panel
   * this prevents the panel from being removed when there is no tab inside
   * a locked panel can not be moved to float layer either
   */
  panelLock?: PanelLock; // if not null, panel won't disappear even when all children are gone

  // float mode only
  x?: number;
  y?: number;
  z?: number;
  w?: number;
  h?: number;
}

export interface LayoutData {
  /**
   * dock box
   */
  dockbox?: BoxData;
  /**
   * float box
   * children must be PanelData, child box is not allowed
   */
  floatbox?: BoxData;
}

export interface DefaultLayout extends LayoutData {
  /**
   * Tab Groups
   */
  groups?: {[key: string]: TabGroup};
}

export type DropDirection =
  'left' | 'right' | 'bottom' | 'top' | 'middle' | 'remove' | 'before-tab' | 'after-tab' | 'float';

export interface DockContext {
  /** @ignore */
  setDropRect(element: HTMLElement, direction?: DropDirection, source?: any, event?: MouseEvent): void;

  dockMove(source: TabData | PanelData, target: TabData | PanelData | BoxData, direction: DropDirection): void;

  getGroup(name: string): TabGroup;

  find(id: string): PanelData | TabData;

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


/// serializer

export interface SavedTab {
  id: string;
  group: string;
}

export interface SavedPanel {
  id: string;
  group: string;
  size: number;
  tabs: SavedTab[];
  activeId: string;

  // for float panel
  x?: number;
  y?: number;
  z?: number;
  w?: number;
  h?: number;
}

export interface SavedBox {
  id: string;
  mode: DockMode;
  size: number;
  children: (SavedBox | SavedPanel)[];
}

export interface SavedLayout {
  dockbox: SavedBox;
  floatbox: SavedBox;
}


export interface SaveModifier {
  modifySavedPanel?(savedPanel: SavedPanel, panelData: PanelData): void;

  modifySavedTab?(savedTab: SavedTab, tabData: TabData): void;
}

export interface LoadModifier {
  // should return a empty panel and ignore tabs
  modifyLoadedPanel?(savedPanel: SavedPanel, panelData: PanelData): void;

  loadTab?(savedTab: SavedTab): TabData;
}