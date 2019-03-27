import { DockMode, LayoutData, PanelData, TabData } from "./DockData";
interface DefaultLayoutCache {
    panels: Map<string | number, PanelData>;
    tabs: Map<string, TabData>;
}
interface SavedTab {
    id: string;
    groupName: string;
}
interface SavedPanel {
    id: string | number;
    groupName: string;
    size: number;
    tabs: SavedTab[];
    activeId: string;
    x?: number;
    y?: number;
    z?: number;
    w?: number;
    h?: number;
}
interface SavedBox {
    id: string | number;
    mode: DockMode;
    size: number;
    children: (SavedBox | SavedPanel)[];
}
interface SavedLayout {
    dockbox: SavedBox;
    floatbox: SavedBox;
}
export declare function createLayoutCache(defaultLayout: LayoutData): DefaultLayoutCache;
export interface SaveModifier {
    modifySavedPanel?(savedPanel: SavedPanel, panelData: PanelData): void;
    modifySavedTab?(savedTab: SavedTab, tabData: TabData): void;
}
export interface LoadModifier {
    loadPanel?(savedPanel: SavedPanel): PanelData;
    loadTab?(savedTab: SavedTab): TabData;
}
export declare function saveLayout(layout: LayoutData, modifier?: SaveModifier): SavedLayout;
export declare function loadLayout(savedLayout: SavedLayout, defaultLayout: LayoutData, modifier?: LoadModifier): LayoutData;
export {};
