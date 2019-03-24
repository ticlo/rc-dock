import React, { CSSProperties } from "react";
import { BoxData, LayoutData, PanelData, DockContext, DropDirection, TabData } from "./DockData";
interface LayoutProps {
    defaultLayout: LayoutData | BoxData | (BoxData | PanelData)[];
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
    /** @ignore */
    prepareInitData(data: LayoutData | BoxData | (BoxData | PanelData)[]): LayoutData;
    moveTab(tab: TabData, target: TabData | PanelData | BoxData, direction: DropDirection): void;
    movePanel(panel: PanelData, target: PanelData, direction: DropDirection): void;
    constructor(props: LayoutProps);
    /** @ignore */
    dragEnd: () => void;
    /** @ignore */
    setDropRect(element: HTMLElement, direction?: DropDirection, source?: any, event?: MouseEvent): void;
    /** @ignore */
    _zCount: number;
    /** @ignore */
    nextFloatZIndex(current?: number): number;
    /** @ignore */
    render(): React.ReactNode;
    /** @ignore */
    componentWillUnmount(): void;
}
export {};
