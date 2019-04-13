import React, { CSSProperties } from "react";
import { BoxData, LayoutData, PanelData, DockContext, DropDirection, TabData, TabGroup, LayoutBase, TabBase, PanelBase } from "./DockData";
interface LayoutProps {
    /**
     * - when [[LayoutProps.loadTab]] callback is defined, tabs in defaultLayout only need to have an id, unless loadTab requires other fields
     * - when [[LayoutProps.loadTab]] is not defined, tabs must contain title and content, as well as other fields in [[TabData]] when needed
     */
    defaultLayout?: LayoutData;
    /**
     * set layout only when you want to use DockLayout as a fully controlled react component
     * when using controlled layout, [[LayoutProps.onChange]] must be set to enable any layout change
     */
    layout?: LayoutBase;
    /**
     * Tab Groups, defines additional configuration for different groups
     */
    groups?: {
        [key: string]: TabGroup;
    };
    /**
     * @param newLayout layout data can be set to [[LayoutProps.layout]] directly when used as controlled component
     */
    onLayoutChange?(newLayout: LayoutBase): void;
    /**
     * - default mode: showing 4 to 9 squares to help picking drop areas
     * - edge mode: using the distance between mouse and panel border to pick drop area
     *   - in edge mode, dragging float panel's header won't bring panel back to dock layer
     */
    dropMode?: 'default' | 'edge';
    /**
     * override the default saveTab behavior
     * @return must at least have an unique id
     */
    saveTab?(tab: TabData): TabBase;
    /**
     * override the default loadTab behavior
     * - when loadTab is not defined, [[LayoutProps.defaultLayout]] will be used to find a tab to load, thus defaultLayout must contain the titles and contents for TabData
     * - when loadTab is defined, [[LayoutProps.defaultLayout]] can ignore all those and only keep id and other custom data
     */
    loadTab?(tab: TabBase): TabData;
    /**
     * modify the savedPanel, you can add additional data into the savedPanel
     */
    afterPanelSaved?(savedPanel: PanelBase, panel: PanelData): void;
    /**
     * modify the loadedPanel, you can retrieve additional data into the panel
     * - modifying panel tabs is allowed, make sure to add or replace full TabData with title and content, because loadTab won't be called after this
     * - if tabs is empty, but still remaining in layout because of panelLock, make sure also set the group if it's not null
     */
    afterPanelLoaded?(savedPanel: PanelBase, loadedPanel: PanelData): void;
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
    /** @ignore */
    dragging?: boolean;
}
export declare class DockLayout extends React.PureComponent<LayoutProps, LayoutState> implements DockContext {
    /** @ignore */
    _ref: HTMLDivElement;
    /** @ignore */
    getRef: (r: HTMLDivElement) => void;
    /** @ignore */
    prepareInitData(data: LayoutData): LayoutData;
    /** @inheritDoc */
    getGroup(name: string): TabGroup;
    /**
     * @inheritDoc
     * @param source @inheritDoc
     * @param target @inheritDoc
     * @param direction @inheritDoc
     */
    dockMove(source: TabData | PanelData, target: TabData | PanelData | BoxData, direction: DropDirection): void;
    /** @inheritDoc */
    find(id: string): PanelData | TabData;
    /** @ignore */
    getLayoutSize(): {
        width: number;
        height: number;
    };
    /** @inheritDoc */
    updateTab(id: string, newTab: TabData): boolean;
    constructor(props: LayoutProps);
    /** @ignore */
    onDragStateChange: (draggingScopt: any) => void;
    /** @ignore */
    useEdgeDrop(): boolean;
    /** @ignore */
    setDropRect(element: HTMLElement, direction?: DropDirection, source?: any, event?: {
        clientX: number;
        clientY: number;
    }): void;
    /** @ignore */
    render(): React.ReactNode;
    _onWindowResize: any;
    /** @ignore */
    componentWillUnmount(): void;
    /** @ignore
     * change layout
     */
    changeLayout(layoutData: LayoutData): void;
    /** @ignore
     * some layout change were handled by component silently
     * but they should still call this function to trigger onLayoutChange
     */
    onSilentChange(): void;
    saveLayout(): LayoutBase;
    /**
     * load layout
     * calling this api won't trigger the [[LayoutProps.onLayoutChange]] callback
     */
    loadLayout(savedLayout: LayoutBase): void;
    /** @ignore */
    static loadLayoutData(savedLayout: LayoutBase, props: LayoutProps, width?: number, height?: number): LayoutData;
    static getDerivedStateFromProps(props: LayoutProps, state: LayoutState): {
        layout: LayoutData;
    };
}
export {};
