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
   *
   * panelExtra can also be used as a listener on panel state changes,
   * if you don't need to show extra content in this case, just return null
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


export interface TabBase {
  /**
   * id must be unique
   */
  id?: string;
}

export interface PanelBase {
  /**
   * id will be auto generated if it's undefined
   */
  id?: string;

  /**
   * the size in dock box
   * width when in horizontal layout and height when in vertical layout
   */
  size?: number;
  tabs: TabBase[];
  /**
   * the id of current tab
   */
  activeId?: string;

  /** float mode only */
  x?: number;
  /** float mode only */
  y?: number;
  /** float mode only */
  z?: number;
  /** float mode only */
  w?: number;
  /** float mode only */
  h?: number;
}

export interface BoxBase {
  /**
   * id will be auto generated if it's undefined
   */
  id?: string;
  mode: DockMode;
  /**
   * the size in dock box
   * width when in horizontal layout and height when in vertical layout
   */
  size?: number;
  children: (BoxBase | PanelBase)[];
}

export interface LayoutBase {
  dockbox: BoxBase;
  floatbox?: BoxBase;
}

/**
 * a box is the layout element that contains other boxes or panels
 */
export interface BoxData extends BoxBase, DockDataBase {
  parent?: BoxData;

  mode: DockMode;
  children: (BoxData | PanelData)[];
}

export interface TabData extends TabBase, DockDataBase {

  /**
   * - group defines style of the panel
   * - tabs with different tab groups can not be put in same panel
   * - more options for the group can be defined as TabGroup in [[LayoutProps.groups]]
   */
  group?: string;

  /** @ignore */
  parent?: PanelData;
  /**
   * title that's shown in the tab of the panel header
   */
  title: React.ReactChild;
  content: React.ReactElement | ((tab: TabData) => React.ReactElement);
  closable?: boolean;


  /**
   * - when value is true: content will always reuse the react component thus allows the component to keep its internal state
   * - when value is false: content will be destroyed when it's not visible, [[TabGroup.animated]] should be set to false since animation would show blank pages
   * - when value is undefined: content is rendered normally as react component
   */
  cached?: boolean;
  /**
   * cached tab is disconnected with parent react component
   * if react context is needed in the cached tab, the context type need to be specified here
   */
  cacheContext?: React.Context<any>;
}

interface PanelLock {
  /** override the default style */
  panelStyle?: string;

  /**
   * override the default extra content from TabGroup.panelExtra
   *
   * panelExtra can also be used as a listener on panel state changes,
   * if you don't need to show extra content in this case, just return null
   */
  panelExtra?: (panel: PanelData) => React.ReactElement;
}

/**
 * a panel is a visiaul container with tabs button in the title bar
 */
export interface PanelData extends PanelBase, DockDataBase {

  parent?: BoxData;

  tabs: TabData[];

  /**
   * if group is undefined, it will be set to the group name of first tab
   */
  group?: string;

  /**
   * addition information of a panel
   * this prevents the panel from being removed when there is no tab inside
   * a locked panel can not be moved to float layer either
   */
  panelLock?: PanelLock; // if not null, panel won't disappear even when all children are gone


}

export interface LayoutData extends LayoutBase {
  /**
   * dock box
   */
  dockbox: BoxData;
  /**
   * float box
   * children must be PanelData, child box is not allowed
   */
  floatbox?: BoxData;

  /** @ignore
   * keep the last loaded layout to prevent unnecessary reloading
   */
  loadedFrom?: LayoutBase;
}

export type DropDirection =
  'left' | 'right' | 'bottom' | 'top' | 'middle' | 'remove' | 'before-tab' | 'after-tab' | 'float';

export interface DockContext {
  /** @ignore */
  useEdgeDrop(): boolean;

  /** @ignore */
  setDropRect(element: HTMLElement, direction?: DropDirection, source?: any, event?: {clientX: number, clientY: number}): void;

  /** @ignore */
  getLayoutSize(): {width: number, height: number};

  /** @ignore
   * when a state change happen to the layout that's handled locally, like inside DockPanel or DockBox
   * it still need to tell the context there is a change so DockLayout can call onLayoutChange callback
   * this usually happens on dragEnd event of size/location change
   */
  onSilentChange(currentTabId?: string): void;

  /**
   * move a tab or a panel, if source or target is already in the layout, you can use the find method to get it with id first
   * @param source the source TabData or PanelData being moved
   *  - it can exist in the layout already
   *  - or can be a new tab or new panel that you want to add to the layout
   * @param target where you want to drop the source
   * @param direction which direction to drop<br>
   *  - when direction is 'after-tab' or 'before-tab', target must be TabData
   *  - when direction is 'remove', target must be null
   *  - when direction is 'float', target doesnt matter. If this is called directly from code without any user interaction, source must be PanelData with x,y,w,h properties
   *
   */
  dockMove(source: TabData | PanelData, target: TabData | PanelData | BoxData, direction: DropDirection): void;

  /**
   * get the TabGroup defined in defaultLayout
   */
  getGroup(name: string): TabGroup;

  /**
   * find PanelData or TabData by id
   */
  find(id: string): PanelData | TabData;

  /**
   * update a tab with new TabData
   * @returns returns false if the tab is not found
   */
  updateTab(id: string, newTab: TabData): boolean;
}

/** @ignore */
export const DockContextType = React.createContext<DockContext>(null);
/** @ignore */
export const DockContextProvider = DockContextType.Provider;
/** @ignore */
export const DockContextConsumer = DockContextType.Consumer;
