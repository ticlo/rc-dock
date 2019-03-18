"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
let _idCount = 0;
function nextId() {
    ++_idCount;
    if (_idCount >= Number.MAX_SAFE_INTEGER) {
        _idCount = -Number.MAX_SAFE_INTEGER;
    }
    return _idCount;
}
exports.nextId = nextId;
exports.DockContextType = react_1.default.createContext(null);
exports.DockContextProvider = exports.DockContextType.Provider;
exports.DockContextConsumer = exports.DockContextType.Consumer;
//# sourceMappingURL=DockData.js.map