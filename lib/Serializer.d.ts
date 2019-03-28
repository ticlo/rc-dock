import { BoxData, DockMode, LayoutData, PanelData, TabData, TabGroup } from "./DockData";
interface DefaultLayoutCache {
    panels: Map<string | number, PanelData>;
    tabs: Map<string, TabData>;
}
interface SavedTab {
    id: string;
    group: string;
}
interface SavedPanel {
    id: string | number;
    group: string;
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
export interface SavedLayout {
    dockbox: SavedBox;
    floatbox: SavedBox;
}
export declare function createLayoutCache(defaultLayout: LayoutData | BoxData): DefaultLayoutCache;
export interface SaveModifier {
    modifySavedPanel?(savedPanel: SavedPanel, panelData: PanelData): void;
    modifySavedTab?(savedTab: SavedTab, tabData: TabData): void;
}
export interface LoadModifier {
    modifyLoadedPanel?(panelData: PanelData, savedPanel: SavedPanel): void;
    loadTab?(savedTab: SavedTab): TabData;
    loadGroup?(groupName: string): TabGroup;
}
export declare function saveLayoutData(layout: LayoutData, modifier?: SaveModifier): SavedLayout;
export declare function loadLayoutData(savedLayout: SavedLayout, defaultLayout: LayoutData | BoxData, modifier?: LoadModifier): LayoutData;
export {};
