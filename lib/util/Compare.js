"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function compareKeys(a, b, keys) {
    if (a === b) {
        return true;
    }
    if (a && b && typeof a === 'object' && typeof b === 'object') {
        for (let key of keys) {
            if (a[key] !== b[key]) {
                return false;
            }
        }
        return true;
    }
    return false;
}
exports.compareKeys = compareKeys;
const isArray = Array.isArray;
function compareChildKeys(a, b, keys) {
    if (a === b) {
        return true;
    }
    if (isArray(a) && isArray(b)) {
        let len = a.length;
        if (len !== b.length) {
            return false;
        }
        for (let i = 0; i < len; ++i) {
            if (!compareKeys(a[i], b[i], keys)) {
                return false;
            }
        }
        return true;
    }
    return false;
}
exports.compareChildKeys = compareChildKeys;
//# sourceMappingURL=Compare.js.map