import { BoxData, LayoutData, LoadModifier, PanelData, LayoutBase, SaveModifier, TabData } from "./DockData";
interface DefaultLayoutCache {
    panels: Map<string, PanelData>;
    tabs: Map<string, TabData>;
}
export declare function createLayoutCache(defaultLayout: LayoutData | BoxData): DefaultLayoutCache;
export declare function saveLayoutData(layout: LayoutData, modifier?: SaveModifier): LayoutBase;
export declare function loadLayoutData(savedLayout: LayoutBase, defaultLayout: LayoutData | BoxData, modifier?: LoadModifier): LayoutData;
export {};
