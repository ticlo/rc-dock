import React from 'react';
interface DockDataBase {
    id: string;
    minWidth?: number;
    minHeight?: number;
}
export interface BoxData extends DockDataBase {
    parent?: BoxData;
    size: number;
    children: (BoxData | PanelData)[];
}
export interface TabGroup {
    floatable?: boolean;
    closable?: boolean;
    multiTabs?: boolean;
    tabLocked?: boolean;
    panelClass?: string;
}
export interface TabData extends DockDataBase {
    parent?: PanelData;
    title: string;
    content: React.ReactNode | (() => React.ReactNode);
    group: TabGroup;
}
export interface PanelData extends DockDataBase {
    parent?: BoxData;
    size: number;
    activeId: string;
    tabs: TabData[];
    group: TabGroup;
}
export interface DockContext {
}
export declare const DockContextProvider: React.ProviderExoticComponent<React.ProviderProps<DockContext>>;
export declare const DockContextConsumer: React.ExoticComponent<React.ConsumerProps<DockContext>>;
export {};
