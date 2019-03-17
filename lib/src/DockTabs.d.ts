import React from "react";
import { DockContext, PanelData, TabData } from "./DockData";
export declare class TabCache {
    static readonly usedDataKeys: string[];
    data: TabData;
    context: DockContext;
    content: React.ReactNode;
    constructor(context: DockContext);
    setData(data: TabData): boolean;
    onCloseClick: (e: React.MouseEvent<Element, MouseEvent>) => void;
    onDragStart: (e: React.DragEvent<Element>) => void;
    onDragOver: (e: React.DragEvent<Element>) => void;
    onDrop: (e: React.DragEvent<Element>) => void;
    render(): React.ReactNode;
    destroy(): void;
}
interface Props {
    panelData: PanelData;
}
export declare class DockTabs extends React.Component<Props, any> {
    static readonly propKeys: string[];
    context: DockContext;
    _cache: Map<string, TabCache>;
    constructor(props: Props);
    updateTabs(tabs: TabData[]): void;
    shouldComponentUpdate(nextProps: Readonly<Props>, nextState: Readonly<any>, nextContext: any): boolean;
    renderTabBar: () => JSX.Element;
    renderTabContent: () => JSX.Element;
    onTabChange: (activeId: string) => void;
    render(): React.ReactNode;
}
export {};
