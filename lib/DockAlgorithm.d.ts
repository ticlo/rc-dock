import { DropDirection, LayoutData, PanelData, TabData } from "./DockData";
export declare function addTabToTab(layout: LayoutData, tab: TabData, target: TabData, direction: DropDirection): LayoutData;
export declare function addTabToPanel(layout: LayoutData, tab: TabData, target: PanelData, idx?: number): LayoutData;
export declare function removeTab(layout: LayoutData, tab: TabData): LayoutData;
export declare function fixLayout(layout: LayoutData): LayoutData;
