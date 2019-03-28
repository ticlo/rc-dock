"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
exports.defaultGroup = {
    floatable: true,
};
exports.placeHolderStyle = 'place-holder';
exports.placeHolderGroup = {
    floatable: false,
};
/** @ignore */
let _idCount = 0;
/** @ignore */
function nextId() {
    ++_idCount;
    // if (_idCount >= Number.MAX_SAFE_INTEGER) {
    // }
    return `+${_idCount}`;
}
exports.nextId = nextId;
/** @ignore */
exports.DockContextType = react_1.default.createContext(null);
/** @ignore */
exports.DockContextProvider = exports.DockContextType.Provider;
/** @ignore */
exports.DockContextConsumer = exports.DockContextType.Consumer;
//# sourceMappingURL=DockData.js.map