"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.groupClassNames = void 0;
const groupClassNames = (groupNames = '') => groupNames
    .split(' ')
    .filter((value) => value !== '')
    .map((name) => `dock-style-${name}`);
exports.groupClassNames = groupClassNames;
