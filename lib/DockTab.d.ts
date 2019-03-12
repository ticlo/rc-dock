import React from "react";
export interface DockTabProps {
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
