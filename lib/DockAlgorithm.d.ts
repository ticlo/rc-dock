import { DropDirection, LayoutData, PanelData, TabData } from "./DockData";
export declare function setWatchObject(obj: any): void;
export declare function getWatchObject(obj: any): any;
export declare function clearWatchObj(): void;
export declare function addTabToTab(layout: LayoutData, tab: TabData, target: TabData, direction: DropDirection): LayoutData;
export declare function addTabToPanel(layout: LayoutData, tab: TabData, panel: PanelData, idx?: number): LayoutData;
export declare function removeTab(layout: LayoutData, tab: TabData): LayoutData;
export declare function fixLayoutData(layout: LayoutData): LayoutData;
