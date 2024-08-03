export function mergeTabGroups(group, localGroup) {
    return (group || localGroup) && Object.assign(Object.assign({}, group), localGroup);
}
export function getFloatingCoordinatesBySize(size, dockLayoutSize) {
    const { height: dockLayoutHeight, width: dockLayoutWidth } = dockLayoutSize;
    const { height, width } = size;
    const x = (dockLayoutWidth - width) / 2;
    const y = (dockLayoutHeight - height) / 2;
    return {
        x,
        y
    };
}
export const groupClassNames = (groupNames = '') => groupNames
    .split(' ')
    .filter((value) => value !== '')
    .map((name) => `dock-style-${name}`);
