/**
 * Layout models, tab definitions and docking options.
 * @module
 */
import * as React from "react";
import {Filter} from "./Algorithm";

export {Filter};

/** Shared docking behavior and header options for tabs with the same group name. */
export interface TabGroup {
  /**
   * Allow floating panels; `singleTab` limits each floating panel to one tab.
   * Enabled for ungrouped tabs by default.
   */
  floatable?: boolean | 'singleTab';

  /**
   * Allow floating panels to open in separate browser windows. Defaults to false.
   */
  newWindow?: boolean;

  /**
   * Disable drag targets in the docked layout. Defaults to false.
   */
  disableDock?: boolean;

  /**
   * Show the maximize control. Enabled for ungrouped tabs by default.
   */
  maximizable?: boolean;

  /**
   * Prevent tabs from being dragged into new panels; moves between matching groups
   * remain allowed. Defaults to false.
   */
  tabLocked?: boolean;

  /**
   * Former tab-switch animation option.
   * @deprecated No longer supported.
   */
  animated?: boolean;

  /**
   * Render custom content on the right of the header, replacing the default controls.
   * @param panel Current panel data.
   * @param context Layout API.
   * @returns Header content, or null to render nothing.
   */
  panelExtra?: (panel: PanelData, context: DockContext) => React.ReactElement;

  /**
   * Clamp the initial width of dragged floating panels to `[min, max]` pixels.
   * Defaults to `[100, 600]`.
   */
  preferredFloatWidth?: [number, number];
  /**
   * Clamp the initial height of dragged floating panels to `[min, max]` pixels.
   * Defaults to `[50, 500]`.
   */
  preferredFloatHeight?: [number, number];

  /**
   * Multiplier for panel width growth and shrinkage in horizontal layouts.
   */
  widthFlex?: number;
  /**
   * Multiplier for panel height growth and shrinkage in vertical layouts.
   */
  heightFlex?: number;
  /**
   * Icon for the tab overflow menu.
   */
  moreIcon?: React.ReactNode;
}

/** @ignore */
export const defaultGroup: TabGroup = {
  floatable: true,
  maximizable: true,
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
  /** Minimum width in pixels. */
  minWidth?: number;
  /** Minimum height in pixels. */
  minHeight?: number;
}

/** Box orientation or layer: docked, floating, browser windows, or maximized. */
export type DockMode = 'horizontal' | 'vertical' | 'float' | 'window' | 'maximize';


/** Tab reference used in layouts and serialization; resolved to {@link TabData}. */
export interface TabBase {
  /**
   * Unique tab id. Registry keys supply this id when using {@link TabDefinitions}.
   */
  id?: string;

  /** Application-defined fields carried by tab references and definitions. */
  [key:string]: unknown;
}

/** Panel layout, containing tab references or full inline definitions. */
export interface PanelBase {
  /**
   * Unique panel id; generated when omitted.
   */
  id?: string;

  /**
   * Relative width in a horizontal parent or height in a vertical parent.
   */
  size?: number;
  /** Ordered tabs in this panel. */
  tabs: TabBase[];
  /**
   * Selected tab id; defaults to the first tab.
   */
  activeId?: string;

  /**
   * Group name; defaults to the first tab's group.
   */
  group?: string;

  /** Floating or window panel's left offset from the layout, in pixels. */
  x?: number;
  /** Floating or window panel's top offset from the layout, in pixels. */
  y?: number;
  /** Floating panel's stacking order. */
  z?: number;
  /** Floating or window panel width in pixels. */
  w?: number;
  /** Floating or window panel height in pixels. */
  h?: number;
  /**
   * Float mode only: gaps to preserve when the layout resizes.
   * Dragging within 0–32px of the right or bottom edge sets that edge's anchor.
   */
  floatAnchor?: {
    /** Gap from the layout's right edge, in pixels. */
    right?: number;
    /** Gap from the layout's bottom edge, in pixels. */
    bottom?: number;
  };

  /**
   * Keep an empty panel and prevent dragging the whole panel into the floating layer.
   * Also provides panel-specific sizing and header overrides.
   */
  panelLock?: PanelLock; // if not null, panel won't disappear even when all children are gone
}

/** Saved or input box containing panels and nested boxes. */
export interface BoxBase {
  /**
   * Unique box id; generated when omitted.
   */
  id?: string;
  /** Child arrangement or layer. Docked boxes use `horizontal` or `vertical`. */
  mode: DockMode;

  /**
   * Relative width in a horizontal parent or height in a vertical parent.
   */
  size?: number;
  /** Ordered child boxes and panels. Floating, window and maximized layers contain panels only. */
  children: (BoxBase | PanelBase)[];
}

/** Controls and spacing for one outer dock column. */
export interface SideColumnOptions {
  /** Allow collapse to a rail of tab titles; selecting a title restores the column. */
  collapsible?: boolean;
  /** Allow one expanded panel while other panels show only their headers. */
  accordion?: boolean;
  /** Outer spacing in pixels, even without a column; removed while this column is collapsed. */
  padding?: number;
}

/** Outer columns of a horizontal root with at least two children. */
export interface SideColumns {
  /** Options for the first root column. */
  left?: SideColumnOptions;
  /** Options for the last root column. */
  right?: SideColumnOptions;
}

/** Saved collapse and accordion state for a column id. */
export interface ColumnState {
  /** Whether the column is displayed as a tab-title rail. */
  collapsed?: boolean;
  /** The expanded panel while accordion mode is active. */
  activePanelId?: string;
}

/** Input or saved layout, with tab references resolved by the layout's tab registry or loader. */
export interface LayoutBase {
  /** Main tree of docked panels and boxes. */
  dockbox: BoxBase;
  /** Floating panels in a box with mode `float`. */
  floatbox?: BoxBase;
  /** Separate browser-window panels in a box with mode `window`. */
  windowbox?: BoxBase;
  /** Maximized layer with at most one panel, in a box with mode `maximize`. */
  maxbox?: BoxBase;
  /** Side column state keyed by the id of the column's box or panel. */
  columns?: {[id: string]: ColumnState};
}

interface BoxChild extends DockDataBase {
  /** Containing box, assigned at runtime. */
  parent?: BoxData;
  /** Multiplier for width growth and shrinkage in horizontal layouts. */
  widthFlex?: number;
  /** Multiplier for height growth and shrinkage in vertical layouts. */
  heightFlex?: number;
}

/**
 * Runtime box with resolved children, sizing constraints and parent links.
 */
export interface BoxData extends BoxBase, BoxChild {
  /** Child arrangement or layer. */
  mode: DockMode;
  /** Ordered runtime child boxes and panels. */
  children: (BoxData | PanelData)[];
}

/** Tab definition with its title, content and display options. */
export interface TabData extends TabBase, DockDataBase {

  /**
   * Style and behavior group from {@link DockLayout!LayoutProps.groups | LayoutProps.groups}.
   * Tabs with different groups cannot share a panel through drag and drop.
   */
  group?: string;

  /** @ignore */
  parent?: PanelData;
  /**
   * Title displayed in the panel's tab bar and collapsed column rail.
   */
  title: React.ReactChild;
  /** Tab body, or a render function receiving the current tab data. */
  content: React.ReactElement | ((tab: TabData) => React.ReactElement);
  /** Show a close button. Defaults to false. */
  closable?: boolean;


  /**
   * Keep visited tab content mounted while inactive. Defaults to true.
   * When false, inactive content is unmounted.
   */
  cached?: boolean;
  /**
   * Former context override for cached content.
   * @deprecated No longer needed.
   */
  cacheContext?: React.Context<any>;
}

/** Tab definitions keyed by id; keys supply each definition's tab id. */
export type TabDefinitions = Readonly<{[id: string]: TabData}>;

/** Panel-specific options applied when {@link PanelBase.panelLock} is set. */
export interface PanelLock {
  /** Style group override, without changing the panel's docking group. */
  panelStyle?: string;

  /** Minimum panel width in pixels. */
  minWidth?: number;
  /** Minimum panel height in pixels. */
  minHeight?: number;

  /**
   * Override {@link TabGroup.panelExtra} for this panel.
   * @param panel Current panel data.
   * @returns Header content, or null to render nothing.
   */
  panelExtra?: (panel: PanelData) => React.ReactElement;

  /**
   * Override the panel's width growth and shrinkage multiplier.
   */
  widthFlex?: number;
  /**
   * Override the panel's height growth and shrinkage multiplier.
   */
  heightFlex?: number;
}

/**
 * Runtime panel with resolved tab definitions and a parent box.
 */
export interface PanelData extends PanelBase, BoxChild {

  /** Containing box, assigned at runtime. */
  parent?: BoxData;

  /** Ordered runtime tabs in this panel. */
  tabs: TabData[];

}

/** @ignore */
export interface TabPaneCache {
  id: string;
  div: HTMLDivElement;
  owner: any;
  portal?: React.ReactPortal;
}


/** Runtime layout with resolved tabs, parent links and normalized layer boxes. */
export interface LayoutData extends LayoutBase {
  /**
   * Main tree of docked panels and boxes.
   */
  dockbox: BoxData;
  /**
   * Floating layer; children must be panels.
   */
  floatbox?: BoxData;

  /**
   * Browser-window layer; children must be panels.
   */
  windowbox?: BoxData;


  /**
   * Maximized layer; contains at most one panel.
   */
  maxbox?: BoxData;

  /** @ignore
   * keep the last loaded layout to prevent unnecessary reloading
   */
  loadedFrom?: LayoutBase;
}

/**
 * Docking commands and layout-change reasons.
 * `left`/`right`/`top`/`bottom` split beside a panel or box; `middle` merges tabs.
 * `before-tab`/`after-tab` insert beside a tab. `float`, `new-window`, `front`,
 * `maximize` and `remove` manage panel layers. `move`, `active`, `update`,
 * `collapse` and `accordion` describe changes reported by `onLayoutChange`.
 */
export type DropDirection =
  'left'
  | 'right'
  | 'bottom'
  | 'top'
  | 'middle'
  | 'remove'
  | 'before-tab'
  | 'after-tab'
  | 'float'
  | 'front'
  | 'maximize'
  | 'new-window'
  | 'move' // dockbox or float panel moved, or float panel resized
  | 'active' // become active tab
  | 'update' // tab updated with updateTab
  | 'collapse' // side column collapsed or restored
  | 'accordion' // expanded panel in a side column changed
  ;

/** Floating panel dimensions in pixels. */
export interface FloatSize {
  /** Width in pixels. */
  width: number;
  /** Height in pixels. */
  height: number;
}

/** Floating panel bounds relative to the layout, in pixels. */
export interface FloatPosition extends FloatSize {
  /** Offset from the layout's left edge. */
  left: number;
  /** Offset from the layout's top edge. */
  top: number;
}

/** Layout container dimensions in pixels. */
export type LayoutSize = FloatSize;

/** Layout API available through a DockLayout ref or a panel header callback. */
export interface DockContext {
  /** @ignore */
  canDock(target: TabData | PanelData | BoxData, direction: DropDirection): boolean;

  /** @ignore */
  onColumnChange(columnId: string, state: ColumnState, tab?: TabData): void;

  /** @ignore */
  getDockId(): any;

  /** @ignore */
  useEdgeDrop(): boolean;

  /** @ignore */
  setDropRect(element: HTMLElement, direction?: DropDirection, source?: any, event?: {clientX: number, clientY: number}, panelSize?: [number, number]): void;

  /** @ignore */
  setFloatAnchorRect(panel: PanelData): void;

  /** @ignore */
  getLayoutSize(): LayoutSize;

  /** @ignore
   * When a state change happen to the layout that's handled locally, like inside DockPanel or DockBox.
   * It still need to tell the context there is a change so DockLayout can call onLayoutChange callback.
   * This usually happens on dragEnd event of size/location change.
   */
  onSilentChange(currentTabId?: string, direction?: DropDirection): void;

  /**
   * Move or add a tab or panel. Obtain existing items with {@link find}.
   * @param source Existing item or new tab/panel definition; tabs may be `{id}` references.
   * @param target Target id or data. Tab insertion requires a tab target; layer commands use null.
   * @param direction Docking command from {@link DropDirection}; side-column restrictions also apply.
   * @param floatPosition Optional bounds for `float`; otherwise bounds are inferred from the panel or layout.
   */
  dockMove(
    source: TabBase | PanelBase,
    target: string | TabData | PanelData | BoxData | null,
    direction: DropDirection,
    floatPosition?: FloatPosition
  ): void;

  /**
   * Get a group from {@link DockLayout!LayoutProps.groups | LayoutProps.groups}, or the default group when absent.
   * @param name Group name; an empty name selects the default group.
   */
  getGroup(name: string): TabGroup;

  /**
   * Find a tab, panel or box by id or predicate.
   * @param id Id or predicate matching the desired item.
   * @param filter Bitmask selecting item types and layers. Defaults to {@link Filter.AnyTabPanel}.
   * @returns First matching item, or undefined.
   */
  find(id: string | ((item: PanelData | TabData | BoxData) => boolean), filter?: Filter): PanelData | TabData | BoxData | undefined;

  /**
   * Replace an open tab's definition, optionally activating it.
   * @param id Existing tab id.
   * @param newTab Full definition or `{id}` reference; null leaves the definition unchanged.
   * @param makeActive Select the updated tab. Defaults to true.
   * @returns False if the tab is missing or its replacement cannot be resolved.
   */
  updateTab(id: string, newTab: TabBase | null, makeActive?: boolean): boolean;

  /**
   * Focus the active tab in a nearby panel.
   * @param fromElement Element in the starting panel; omit with no direction to focus the active tab.
   * @param direction `ArrowLeft`, `ArrowRight`, `ArrowUp` or `ArrowDown`; omit to focus fromElement.
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
}

/** @ignore */
export const DockContextType = React.createContext<DockContext>(null!);
/** @ignore */
export const DockContextProvider = DockContextType.Provider;
/** @ignore */
export const DockContextConsumer = DockContextType.Consumer;
