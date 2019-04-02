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
export declare const defaultGroup: TabGroup;
/** @ignore */
export declare const placeHolderStyle = "place-holder";
/** @ignore */
export declare const placeHolderGroup: TabGroup;
/** @ignore */
interface DockDataBase {
    minWidth?: number;
    minHeight?: number;
}
export declare type DockMode = 'horizontal' | 'vertical' | 'float';
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
    /**
     * id will be auto generated if it's undefined
     */
    id?: string;
    parent?: PanelData;
    /**
     * title that's shown in the tab of the panel header
     */
    title: React.ReactChild;
    content: React.ReactElement | ((tab: TabData) => React.ReactElement);
    closable?: boolean;
    /**
     * - group defines style of the panel
     * - tabs with different tab groups can not be put in same panel
     * - more options for the group can be defined as TabGroup in [[DefaultLayout.groups]]
     */
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
    panelStyle?: string;
    panelExtra?: (panel: PanelData) => React.ReactElement;
}
/**
 * a panel is a visiaul container with tabs button in the title bar
 */
export interface PanelData extends DockDataBase {
    /**
     * id will be auto generated if it's undefined
     */
    id?: string;
    parent?: BoxData;
    /**
     * the id of current tab
     */
    activeId?: string;
    tabs: TabData[];
    /**
     * if group is undefined, it will be set to the group name of first tab
     */
    group: string;
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
    panelLock?: PanelLock;
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
    groups?: {
        [key: string]: TabGroup;
    };
}
export declare type DropDirection = 'left' | 'right' | 'bottom' | 'top' | 'middle' | 'remove' | 'before-tab' | 'after-tab' | 'float';
export interface DockContext {
    /** @ignore */
    setDropRect(element: HTMLElement, direction?: DropDirection, source?: any, event?: MouseEvent): void;
    /**
     * move a tab or a panel, if source or target is already in the layout, you can use the find method to get it with id first
     * @param source the source TabData or PanelData being moved
     *  - it can exist in the layout already
     *  - or can be a new tab or new panel that you want to add to the layout
     * @param target where you want to drop the source
     * @param direction which direction to drop<br>
     *  - when target is tab, direction can only be 'after-tab' or 'before-tab'
     *  - when target is null, direction can only be 'remove'
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
export declare const DockContextType: React.Context<DockContext>;
/** @ignore */
export declare const DockContextProvider: React.ProviderExoticComponent<React.ProviderProps<DockContext>>;
/** @ignore */
export declare const DockContextConsumer: React.ExoticComponent<React.ConsumerProps<DockContext>>;
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
    /**
     * modify the savedPanel, you can add additional data into the panel
     */
    modifySavedPanel?(savedPanel: SavedPanel, panelData: PanelData): void;
    /**
     * modify the savedTab, you can add additional data into the tab
     */
    modifySavedTab?(savedTab: SavedTab, tabData: TabData): void;
}
export interface LoadModifier {
    /**
     * modify the loaded panelData
     */
    modifyLoadedPanel?(savedPanel: SavedPanel, panelData: PanelData): void;
    /**
     * completely overwrite the default behavior of loading tab
     * returned TabData must contain id, title and content
     */
    loadTab?(savedTab: SavedTab): TabData;
}
export {};
