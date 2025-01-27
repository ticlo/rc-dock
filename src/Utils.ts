import { TabGroup, Size, Coordinates } from "./DockData";

export function mergeTabGroups(group?: TabGroup, localGroup?: TabGroup): TabGroup | undefined {
  return (group || localGroup) && {...group, ...localGroup};
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

export const groupClassNames = (groupNames: string = ''): string[] =>
  groupNames
    .split(' ')
    .filter((value) => value !== '')
    .map((name) => `dock-style-${name}`);
