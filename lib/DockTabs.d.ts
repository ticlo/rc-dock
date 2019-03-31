import React from "react";
import { DockContext, DropDirection, PanelData, TabData } from "./DockData";
import { DragInitHandler } from "./DragInitiator";
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
    onDragStart: (e: React.DragEvent<Element>) => void;
    onDragOver: (e: React.DragEvent<Element>) => void;
    onDragLeave: (e: React.DragEvent<Element>) => void;
    onDrop: (e: React.DragEvent<Element>) => void;
    getDropDirection(e: React.DragEvent): DropDirection;
    render(): React.ReactElement;
    destroy(): void;
}
interface Props {
    panelData: PanelData;
    onPanelHeaderDragInit: DragInitHandler;
    onPanelHeaderHtmlDrag: React.DragEventHandler;
}
export declare class DockTabs extends React.Component<Props, any> {
    static contextType: React.Context<DockContext>;
    static readonly propKeys: string[];
    context: DockContext;
    _cache: Map<string, TabCache>;
    constructor(props: Props, context: any);
    updateTabs(tabs: TabData[]): void;
    shouldComponentUpdate(nextProps: Readonly<Props>, nextState: Readonly<any>, nextContext: any): boolean;
    renderTabBar: () => JSX.Element;
    renderTabContent: () => JSX.Element;
    onTabChange: (activeId: string) => void;
    render(): React.ReactNode;
}
export {};
