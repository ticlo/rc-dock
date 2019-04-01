import { BoxData, LayoutData, LoadModifier, PanelData, SavedLayout, SaveModifier, TabData } from "./DockData";
interface DefaultLayoutCache {
    panels: Map<string, PanelData>;
    tabs: Map<string, TabData>;
}
export declare function createLayoutCache(defaultLayout: LayoutData | BoxData): DefaultLayoutCache;
export declare function saveLayoutData(layout: LayoutData, modifier?: SaveModifier): SavedLayout;
export declare function loadLayoutData(savedLayout: SavedLayout, defaultLayout: LayoutData | BoxData, modifier?: LoadModifier): LayoutData;
export {};
