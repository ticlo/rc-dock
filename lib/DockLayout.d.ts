import React, { CSSProperties } from "react";
import { BoxData, LayoutData, PanelData, DockContext, DropDirection, TabData } from "./DockData";
interface Props {
    defaultLayout: LayoutData | BoxData | (BoxData | PanelData)[];
    style?: CSSProperties;
}
interface State {
    layout: LayoutData;
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
export declare class DockLayout extends React.PureComponent<Props, State> implements DockContext {
    _ref: HTMLDivElement;
    getRef: (r: HTMLDivElement) => void;
    prepareInitData(data: LayoutData | BoxData | (BoxData | PanelData)[]): LayoutData;
    moveTab(tab: TabData, target: TabData | PanelData, direction: DropDirection): void;
    movePanel(panel: PanelData, target: PanelData, direction: DropDirection): void;
    constructor(props: Props);
    dragEnd: () => void;
    setDropRect(element: HTMLElement, direction?: DropDirection, source?: any, event?: MouseEvent): void;
    _zCount: number;
    nextFloatZIndex(current?: number): number;
    render(): React.ReactNode;
    componentWillUnmount(): void;
}
export {};
