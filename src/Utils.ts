import { TabGroup } from "./DockData";

export function mergeTabGroups(group?: TabGroup, localGroup?: TabGroup): TabGroup | undefined {
  return (group || localGroup) && {...group, ...localGroup};
}

export interface Size {
  height: number;
  width: number;
}

export interface Coordinates {
  x: number;
  y: number;
}

export function getFloatingCoordinatesBySize(size: Size, dockLayoutSize: Size): Coordinates {
  const { height: dockLayoutHeight, width: dockLayoutWidth } = dockLayoutSize;
  const { height, width } = size;
  const x = (dockLayoutWidth - width) / 2;
  const y = (dockLayoutHeight - height) / 2;

  return {
    x,
    y
  };
}
