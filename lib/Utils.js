"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mergeTabGroups = void 0;
function mergeTabGroups(group, localGroup) {
    return (group || localGroup) && Object.assign(Object.assign({}, group), localGroup);
}
exports.mergeTabGroups = mergeTabGroups;
