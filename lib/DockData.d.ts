import React from 'react';
interface MinSize {
    minWidth?: number;
    minHeight?: number;
}
export interface Box extends MinSize {
    key: string;
    size: number;
    children: (Box | Panel)[];
}
interface TabFeature extends MinSize {
    group?: string;
    floatable?: boolean;
    closable?: boolean;
    multiTabs?: boolean;
    tabLocked?: boolean;
    panelClass?: string;
}
export interface Tab extends TabFeature {
    key: string;
    render: React.ReactNode | (() => React.ReactNode);
}
export interface Panel {
    key: string;
    size: number;
    tabs: Tab[];
    default?: TabFeature;
}
export {};
