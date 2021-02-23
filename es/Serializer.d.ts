import { BoxData, LayoutData, PanelData, LayoutBase, PanelBase, TabBase, TabData } from "./DockData";
interface DefaultLayoutCache {
    panels: Map<string, PanelData>;
    tabs: Map<string, TabData>;
}
export declare function createLayoutCache(defaultLayout: LayoutData | BoxData): DefaultLayoutCache;
export declare function saveLayoutData(layout: LayoutData, saveTab?: (tab: TabData) => TabBase, afterPanelSaved?: (savedPanel: PanelBase, panel: PanelData) => void): LayoutBase;
export declare function loadLayoutData(savedLayout: LayoutBase, defaultLayout: LayoutData, loadTab?: (savedTab: TabBase) => TabData, afterPanelLoaded?: (savedPanel: PanelBase, panel: PanelData) => void): LayoutData;
export {};
