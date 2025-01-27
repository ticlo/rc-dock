import * as React from "react";
import { TabPosition } from "rc-tabs/lib/interface";
import {Filter} from "./Algorithm";
import {
  ConnectableElement,
  DragPreviewOptions,
  XYCoord
} from "react-dnd";
import { DragSourceMonitor, DropTargetMonitor } from "react-dnd/dist/types/types";

export interface TabGroup {
  /**
   * Whether tab can be dragged into float layer.
   * If value is "singleTab", float panel can't have multiple tabs.
   *
   * default: false
   */
  floatable?: boolean | 'singleTab';

  /**
   * Whether tab can be converted to native window, only works when floatable is true.
   *
   * default: false
   */
  newWindow?: boolean;

  /**
   * Disable dock, so the panel will only work in float mode.
   *
   * default: false
   */
  disableDock?: boolean;

  /**
   * Whether tab can be maximized
   *
   * default: false
   */
  maximizable?: boolean;

  /**
   * Whether tab can be moved
   *
   * default: true
   */
  movable?: boolean;

  /**
   * Whether tab can be resized
   *
   * default: true
   */
  resizable?: boolean;

  /**
   * Whether panel can be collapsed
   *
   * default: false
   */
  collapsible?: boolean;

  /**
   * When tabs are locked, you can not drag tab to create new panel, but it can still be dropped into a different panel if they have the same tab group.
   *
   * default false
   */
  tabLocked?: boolean;
  /**
   * Whether to show animation effect when switch tabs.
   *
   * default true
   */
  animated?: boolean;

  /**
   * Generate extra content show in the right side of tab bar.
   *
   * panelExtra can also be used as a listener on panel state changes,
   * If you don't need to show extra content in this case, just return null.
   */
  panelExtra?: (panel: PanelData, context: DockContext) => React.ReactElement;

  /**
   * When creating float panel from dragging, DockLayout would use the original panel's size.
   * Use this to defined the [min, max] allowed with for the default size of a float panel.
   * If not specified, minWidth = 100, maxWidth = 600
   */
  preferredFloatWidth?: [number, number];
  /**
   * When creating float panel from dragging, DockLayout would use the original panel's size.
   * Use this to defined the [min, max] allowed height for the default size of a float panel.
   * If not specified, minHeight = 50, maxHeight = 500
   */
  preferredFloatHeight?: [number, number];

  /**
   * Override the default flex grow and flex shrink for panel width
   */
  widthFlex?: number;
  /**
   * Override the default flex grow and flex shrink for panel height
   */
  heightFlex?: number;
  /**
   * Override the default `moreIcon`
   */
  moreIcon?: React.ReactNode;
}

/** @ignore */
export const defaultGroup: TabGroup = {
  floatable: true,
  maximizable: true,
  movable: true,
  resizable: true
};
/** @ignore */
export const placeHolderStyle = 'place-holder';
/** @ignore */
export const maximePlaceHolderId = '-maximized-placeholder-';
/** @ignore */
export const placeHolderGroup: TabGroup = {
  floatable: false,
};

/** @ignore */
interface DockDataBase {
  minWidth?: number;
  minHeight?: number;
  collapsed?: boolean;
  headerSize?: number;
}

export type DockMode = 'horizontal' | 'vertical' | 'float' | 'window' | 'maximize';


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
   * The size in dock box,
   * width when in horizontal layout and height when in vertical layout
   */
  size?: number;

  preferredWidth?: number;
  preferredHeight?: number;
  ignorePreferredSize?: boolean;

  tabs: TabBase[];
  /**
   * The id of current tab
   */
  activeId?: string;

  tabPosition?: TabPosition;

  /**
   * if group is undefined, it will be set to the group name of first tab
   */
  group?: string;

  localGroup?: TabGroup;

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
  collapsed?: boolean;
  headerSize?: number;
  dockLocation?: DockLocation;
  needSetSize?: boolean;

  /**
   * addition information of a panel,
   * This prevents the panel from being removed when there is no tab inside
   * a locked panel can not be moved to float layer either
   */
  panelLock?: PanelLock; // if not null, panel won't disappear even when all children are gone

  /**
   * Defines if toggle floating available for a panel
   */
  toggleFloatingDisabled?: boolean;
}

export interface BoxBase {
  /**
   * id will be auto generated if it's undefined
   */
  id?: string;
  mode: DockMode;

  /**
   * The size in dock box,
   * width when in horizontal layout and height when in vertical layout
   */
  size?: number;
  preferredWidth?: number;
  preferredHeight?: number;
  ignorePreferredSize?: boolean;
  children: (BoxBase | PanelBase)[];
}

export interface LayoutBase {
  dockbox: BoxBase;
  floatbox?: BoxBase;
  windowbox?: BoxBase;
  maxbox?: BoxBase;
}

interface BoxChild extends DockDataBase {
  parent?: BoxData;
  widthFlex?: number;
  heightFlex?: number;
  preferredWidth?: number;
  preferredHeight?: number;
  ignorePreferredSize?: boolean;
}

/**
 * a box is the layout element that contains other boxes or panels
 */
export interface BoxData extends BoxBase, BoxChild {
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

  localGroup?: TabGroup;

  preferredWidth?: number;
  preferredHeight?: number;

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
   * - when value is false: content will be destroyed when it's not visible, [[TabGroup.animated]] should be set to false, otherwise animation would show blank pages
   * - when value is undefined: content is rendered normally as react component
   */
  cached?: boolean;
  /**
   * @deprecated no longer needed
   */
  cacheContext?: React.Context<any>;

  tabPosition?: TabPosition;

  handleTabActiveChange?: (active: boolean) => void;
}

interface PanelLock {
  /** override the default style */
  panelStyle?: string;

  minWidth?: number;
  minHeight?: number;

  /**
   * override the default extra content from TabGroup.panelExtra,
   *
   * panelExtra can also be used as a listener on panel state changes,
   * if you don't need to show extra content in this case, just return null
   */
  panelExtra?: (panel: PanelData) => React.ReactElement;

  /**
   * override the default flex grow and flex shrink for panel width
   */
  widthFlex?: number;
  /**
   * override the default flex grow and flex shrink for panel height
   */
  heightFlex?: number;
}

/**
 * a panel is a visiaul container with tabs button in the title bar
 */
export interface PanelData extends PanelBase, BoxChild {

  parent?: BoxData;

  tabs: TabData[];
}

export interface TabPaneCache {
  id: string;
  div: HTMLDivElement;
  owner: any;
  portal?: React.ReactPortal;
}


export interface LayoutData extends LayoutBase {
  /**
   * dock box
   */
  dockbox: BoxData;
  /**
   * float box,
   * Children must be PanelData, child box is not allowed
   */
  floatbox?: BoxData;

  /**
   * window box,
   * Children must be PanelData, child box is not allowed
   */
  windowbox?: BoxData;


  /**
   * The maximized panel,
   * only one child allowed, child must be PanelData
   */
  maxbox?: BoxData;

  /** @ignore
   * keep the last loaded layout to prevent unnecessary reloading
   */
  loadedFrom?: LayoutBase;
}

export type DropDirection =
  'left'
  | 'right'
  | 'bottom'
  | 'top'
  | 'middle'
  | 'remove'
  | 'before-tab'
  | 'after-tab'
  | 'under-tab'
  | 'above-tab'
  | 'float'
  | 'front'
  | 'maximize'
  | 'new-window'
  | 'move' // dockbox or float panel moved, or float panel resized
  | 'active' // become active tab
  | 'update' // tab updated with updateTab
  | 'collapse'
  | 'configure-panel'
  | 'configure-tab'
  ;

export interface Coordinates {
  x: number;
  y: number;
}

export interface Size {
  width: number;
  height: number;
}

export type LayoutSize = Size;

export interface DockLocation {
  parent?: PanelData | BoxData;
  tabIndex?: number;
  panelIndex?: number;
}

export interface DockMoveAdditionalData {
  dockLocation?: DockLocation;
  changeLayoutData?: any;
}

export interface DockContext {
  /** @ignore */
  getDockId(): any;

  /** @ignore */
  useEdgeDrop(): boolean;

  /** @ignore */
  setDropRect(element: HTMLElement, direction?: DropDirection, source?: any, event?: {clientX: number, clientY: number}, panelSize?: [number, number]): void;

  /** @ignore */
  getLayoutSize(): LayoutSize;

  /** @ignore
   * When a state change happen to the layout that's handled locally, like inside DockPanel or DockBox.
   * It still need to tell the context there is a change so DockLayout can call onLayoutChange callback.
   * This usually happens on dragEnd event of size/location change.
   */
  onSilentChange(currentTabId?: string, direction?: DropDirection): void;

  /**
   * Move a tab or a panel, if source or target is already in the layout, you can use the find method to get it with id first
   * @param source the source TabData or PanelData being moved
   *  - it can exist in the layout already
   *  - or can be a new tab or new panel that you want to add to the layout
   * @param target where you want to drop the source, can be the id or target data model
   * @param direction which direction to drop<br>
   *  - when direction is 'after-tab' or 'before-tab', target must be TabData
   *  - when direction is 'remove' or 'front', target must be null
   *  - when direction is 'float', target doesnt matter. If this is called directly from code without any user interaction, source must be PanelData with x,y,w,h properties
   * @param additionalData optional additional data
   */
  dockMove(source: TabData | PanelData, target: string | TabData | PanelData | BoxData | null, direction: DropDirection, additionalData?: DockMoveAdditionalData): void;

  /**
   * Get the TabGroup defined in defaultLayout
   */
  getGroup(name: string): TabGroup;

  /**
   * Find PanelData or TabData by id
   */
  find(id: string, filter?: Filter): PanelData | TabData | BoxData | undefined;

  updatePanelLocalGroup(panel: PanelData): void;

  /**
   * Update a tab with new TabData
   * @param id tab id to update
   * @param newTab new tab data, if newTab is null, it only changes the active tab of parent panel
   * @param makeActive whether to make the tab the active child of parent panel
   * @param direction which direction to drop
   * @returns returns false if the tab is not found
   */
  updateTab(id: string, newTab: TabData | null, makeActive?: boolean, direction?: DropDirection): boolean;

  updatePanelData(id: string, panelData: PanelData, direction: DropDirection): void;

  /**
   * Move focus to a dockpanel near by
   * @param fromElement
   * @param direction
   */
  navigateToPanel(fromElement: HTMLElement, direction?: string): void;

  /** @ignore */
  getTabCache(id: string, owner: any): TabPaneCache;

  /** @ignore */
  removeTabCache(id: string, owner: any): void;

  /** @ignore */
  updateTabCache(id: string, portal: React.ReactNode): void;

  /** @ignore */
  getRootElement(): HTMLDivElement;

  getExternalData(): any;

  getDefaultDndSpec(): DndSpec | undefined;

  getClassName(): string | undefined;

  getLayout(): LayoutData;
}

/** @ignore */
export const DockContextType = React.createContext<DockContext>(null);
/** @ignore */
export const DockContextProvider = DockContextType.Provider;
/** @ignore */
export const DockContextConsumer = DockContextType.Consumer;

export const DockTabIdContext = React.createContext<string | null>(null);

/**
 * DnD item types
 */
export type Identifier = string | symbol;
export type SourceType = Identifier;
export type TargetType = Identifier | Identifier[];

export interface DragObject {
  baseX: number;
  baseY: number;
  element: HTMLElement;
  scaleX: number;
  scaleY: number;
  checkParent(targetRef: HTMLElement): boolean;
  externalData?: any;
}

export interface DropResult {
  clientOffset: XYCoord;
  externalData?: any;
  dropOutside?: boolean;
}

export interface DragSourceSpec<Props = any, DragObject = any, DropResult = any> {
  itemType?: SourceType;
  preview?: {
    elementOrNode: ConnectableElement;
    options?: DragPreviewOptions | undefined;
  };
  beforeBeginDrag?: (props: Props, monitor: DragSourceMonitor<DragObject, DropResult>, component: any) => void;
  afterBeginDrag?: (props: Props, monitor: DragSourceMonitor<DragObject, DropResult>, component: any) => void;
  beforeEndDrag?: (props: Props, monitor: DragSourceMonitor<DragObject, DropResult>, component: any) => void;
  afterEndDrag?: (props: Props, monitor: DragSourceMonitor<DragObject, DropResult>, component: any) => void;
}

export interface DropTargetSpec<Props = any, DragObject = any, DropResult = any> {
  itemType?: TargetType;
  beforeDrop?: (props: Props, monitor: DropTargetMonitor<DragObject, DropResult>, component: any) => void;
  afterDrop?: (props: Props, monitor: DropTargetMonitor<DragObject, DropResult>, component: any) => void;
  canDrop?: (props: Props, monitor: DropTargetMonitor<DragObject, DropResult>, component: any) => boolean;
}

export interface DndSpec {
  dragSourceSpec?: DragSourceSpec;
  dropTargetSpec?: DropTargetSpec;
}
