import { BoxData, DropDirection, LayoutData, PanelData, TabData, TabGroup } from "./DockData";
export declare const placeHolderGroup: TabGroup;
export declare function getUpdatedObject(obj: any): any;
export declare function addTabToTab(layout: LayoutData, tab: TabData, target: TabData, direction: DropDirection): LayoutData;
export declare function addTabToPanel(layout: LayoutData, source: TabData | PanelData, panel: PanelData, idx?: number): LayoutData;
export declare function converToPanel(source: TabData | PanelData): PanelData;
export declare function dockPanelToPanel(layout: LayoutData, newPanel: PanelData, panel: PanelData, direction: DropDirection): LayoutData;
export declare function dockPanelToBox(layout: LayoutData, newPanel: PanelData, box: BoxData, direction: DropDirection): LayoutData;
export declare function floatPanel(layout: LayoutData, newPanel: PanelData, rect: {
    left: number;
    top: number;
    width: number;
    height: number;
}): LayoutData;
export declare function removeFromLayout(layout: LayoutData, source: TabData | PanelData): LayoutData;
export declare function fixLayoutData(layout: LayoutData): LayoutData;
