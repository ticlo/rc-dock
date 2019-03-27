import React, { CSSProperties } from "react";
import { BoxData, LayoutData, PanelData, DockContext, DropDirection, TabData } from "./DockData";
import * as Serializer from "./Serializer";
interface LayoutProps {
    defaultLayout: LayoutData | BoxData;
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
    prepareInitData(data: LayoutData | BoxData): LayoutData;
    dockMove(source: TabData, target: TabData | PanelData | BoxData, direction: DropDirection): void;
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
    saveLayout(modifier?: Serializer.SaveModifier): Serializer.SavedLayout;
    loadLayout(savedLayout: Serializer.SavedLayout, modifier?: Serializer.LoadModifier): void;
}
export {};
