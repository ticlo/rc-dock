import React from 'react';
export interface TabGroup {
    floatable?: boolean;
    multiTabs?: boolean;
    tabLocked?: boolean;
    animated?: boolean;
}
export declare const defaultGroup: TabGroup;
export declare const placeHolderStyle = "place-holder";
export declare const placeHolderGroup: TabGroup;
interface DockDataBase {
    minWidth?: number;
    minHeight?: number;
}
export declare type DockMode = 'horizontal' | 'vertical' | 'float';
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
    content: React.ReactElement | (() => React.ReactElement);
    closable?: boolean;
    group: string;
    cached?: boolean;
    cacheContext?: React.Context<any>;
}
interface PanelLock {
    panelStyle?: string;
    animated?: boolean;
}
export interface PanelData extends DockDataBase {
    id?: string | number;
    parent?: BoxData;
    activeId?: string;
    tabs: TabData[];
    group: string;
    size?: number;
    panelLock?: PanelLock;
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
    groups?: {
        [key: string]: TabGroup;
    };
}
export declare type DropDirection = 'left' | 'right' | 'bottom' | 'top' | 'middle' | 'remove' | 'before-tab' | 'after-tab' | 'float';
export interface DockContext {
    /** @ignore */
    setDropRect(element: HTMLElement, direction?: DropDirection, source?: any, event?: MouseEvent): void;
    dockMove(source: TabData | PanelData, target: TabData | PanelData | BoxData, direction: DropDirection): void;
    getGroup(name: string): TabGroup;
    /** @ignore */
    nextFloatZIndex(current: number): number;
}
/** @ignore */
export declare function nextId(): string;
/** @ignore */
export declare const DockContextType: React.Context<DockContext>;
/** @ignore */
export declare const DockContextProvider: React.ProviderExoticComponent<React.ProviderProps<DockContext>>;
/** @ignore */
export declare const DockContextConsumer: React.ExoticComponent<React.ConsumerProps<DockContext>>;
export {};
