import { DropDirection, LayoutData, TabData } from "./DockData";
export declare function addTabToTab(layout: LayoutData, tab: TabData, target: TabData, direction: DropDirection): LayoutData;
export declare function removeTab(layout: LayoutData, tab: TabData): LayoutData;
export declare function fixLayout(layout: LayoutData): LayoutData;
