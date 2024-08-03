"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.groupClassNames = exports.getFloatingCoordinatesBySize = exports.mergeTabGroups = void 0;
function mergeTabGroups(group, localGroup) {
    return (group || localGroup) && Object.assign(Object.assign({}, group), localGroup);
}
exports.mergeTabGroups = mergeTabGroups;
function getFloatingCoordinatesBySize(size, dockLayoutSize) {
    const { height: dockLayoutHeight, width: dockLayoutWidth } = dockLayoutSize;
    const { height, width } = size;
    const x = (dockLayoutWidth - width) / 2;
    const y = (dockLayoutHeight - height) / 2;
    return {
        x,
        y
    };
}
exports.getFloatingCoordinatesBySize = getFloatingCoordinatesBySize;
const groupClassNames = (groupNames = '') => groupNames
    .split(' ')
    .filter((value) => value !== '')
    .map((name) => `dock-style-${name}`);
exports.groupClassNames = groupClassNames;
