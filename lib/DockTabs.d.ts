import React from "react";
import { DockContext, DropDirection, PanelData, TabData } from "./DockData";
import { default as DragManager, DragState } from "./dragdrop/DragManager";
export declare class TabCache {
    _ref: HTMLDivElement;
    getRef: (r: HTMLDivElement) => void;
    _hitAreaRef: HTMLDivElement;
    getHitAreaRef: (r: HTMLDivElement) => void;
    data: TabData;
    context: DockContext;
    content: React.ReactElement;
    constructor(context: DockContext);
    setData(data: TabData): boolean;
    onCloseClick: (e: React.MouseEvent<Element, MouseEvent>) => void;
    onDragStart: (e: DragManager.DragState) => void;
    onDragOver: (e: DragManager.DragState) => void;
    onDragLeave: (e: DragManager.DragState) => void;
    onDrop: (e: DragManager.DragState) => void;
    getDropDirection(e: DragState): DropDirection;
    render(): React.ReactElement;
    destroy(): void;
}
interface Props {
    panelData: PanelData;
    onPanelDragStart: DragManager.DragHandler;
    onPanelDragMove: DragManager.DragHandler;
    onPanelDragEnd: DragManager.DragHandler;
}
export declare class DockTabs extends React.Component<Props, any> {
    static contextType: React.Context<DockContext>;
    static readonly propKeys: string[];
    context: DockContext;
    _cache: Map<string, TabCache>;
    constructor(props: Props, context: any);
    updateTabs(tabs: TabData[]): void;
    shouldComponentUpdate(nextProps: Readonly<Props>, nextState: Readonly<any>, nextContext: any): boolean;
    onMaximizeClick: () => void;
    renderTabBar: () => JSX.Element;
    renderTabContent: () => JSX.Element;
    onTabChange: (activeId: string) => void;
    render(): React.ReactNode;
}
export {};
