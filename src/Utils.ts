import { TabGroup } from "./DockData";

export function mergeTabGroups(group?: TabGroup, localGroup?: TabGroup): TabGroup | undefined {
  return (group || localGroup) && {...group, ...localGroup};
}
