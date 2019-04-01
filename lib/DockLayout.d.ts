import React, { CSSProperties } from "react";
import { BoxData, LayoutData, PanelData, DockContext, DropDirection, TabData, DefaultLayout, TabGroup, SavedLayout, LoadModifier, SaveModifier } from "./DockData";
interface LayoutProps {
    defaultLayout: DefaultLayout;
    style?: CSSProperties;
}
interface LayoutState {
    layout: LayoutData;
    /** @ignore */
    dropRect?: {
        left: number;
        width: number;
        top: number;
        height: number;
        element: HTMLElement;
        source?: any;
        direction?: DropDirection;
    };
}
export declare class DockLayout extends React.PureComponent<LayoutProps, LayoutState> implements DockContext {
    /** @ignore */
    _ref: HTMLDivElement;
    /** @ignore */
    getRef: (r: HTMLDivElement) => void;
    _groups: {
        [key: string]: TabGroup;
    };
    /** @ignore */
    prepareInitData(data: DefaultLayout): LayoutData;
    getGroup(name: string): TabGroup;
    dockMove(source: TabData, target: TabData | PanelData | BoxData, direction: DropDirection): void;
    find(id: string): PanelData | TabData;
    updateTab(id: string, newTab: TabData): boolean;
    constructor(props: LayoutProps);
    /** @ignore */
    dragEnd: () => void;
    /** @ignore */
    setDropRect(element: HTMLElement, direction?: DropDirection, source?: any, event?: MouseEvent): void;
    /** @ignore */
    render(): React.ReactNode;
    /** @ignore */
    componentWillUnmount(): void;
    saveLayout(modifier?: SaveModifier): SavedLayout;
    loadLayout(savedLayout: SavedLayout, modifier?: LoadModifier): void;
}
export {};
