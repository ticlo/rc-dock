import React from 'react';
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
export interface TabGroup {
    multiTabs?: boolean;
    tabLocked?: boolean;
    panelClass?: string;
    animated?: boolean;
}
export interface TabData extends DockDataBase {
    id?: string;
    parent?: PanelData;
    title: string;
    content: React.ReactElement | (() => React.ReactElement);
    closable?: boolean;
    group: TabGroup;
    cached?: boolean;
    cacheContext?: React.Context<any>;
}
interface PanelLock {
    floatable?: boolean;
    panelClass?: string;
    animated?: boolean;
}
export interface PanelData extends DockDataBase {
    id?: string | number;
    parent?: BoxData;
    activeId?: string;
    tabs: TabData[];
    group: TabGroup;
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
export declare type DropDirection = 'left' | 'right' | 'bottom' | 'top' | 'middle' | 'remove' | 'before-tab' | 'after-tab' | 'float';
export interface DockContext {
    /** @ignore */
    setDropRect(element: HTMLElement, direction?: DropDirection, source?: any, event?: MouseEvent): void;
    dockMove(source: TabData | PanelData, target: TabData | PanelData | BoxData, direction: DropDirection): void;
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
