import { TabGroup } from "./DockData";
export declare function mergeTabGroups(group?: TabGroup, localGroup?: TabGroup): TabGroup | undefined;
export interface Size {
    height: number;
    width: number;
}
export interface Coordinates {
    x: number;
    y: number;
}
export declare function getFloatingCoordinatesBySize(size: Size, dockLayoutSize: Size): Coordinates;
