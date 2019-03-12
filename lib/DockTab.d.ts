import React from "react";
export interface DockTabFeatures {
    title: string;
    group?: string;
    floatable?: boolean;
    closable?: boolean;
    multiTabs?: boolean;
    tabLocked?: boolean;
    panelClass?: string;
}
export interface DockTabProps {
    title: string;
    group?: string;
    floatable?: boolean;
    closable?: boolean;
    multiTabs?: boolean;
    tabLocked?: boolean;
    panelClass?: string;
}
export declare class DockTab extends React.PureComponent<DockTabProps, any> {
    render(): React.ReactNode;
}
