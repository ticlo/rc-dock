"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DockContextConsumer = exports.DockContextProvider = exports.DockContextType = exports.placeHolderGroup = exports.maximePlaceHolderId = exports.placeHolderStyle = exports.defaultGroup = void 0;
const React = __importStar(require("react"));
/** @ignore */
exports.defaultGroup = {
    floatable: true,
    maximizable: true,
};
/** @ignore */
exports.placeHolderStyle = 'place-holder';
/** @ignore */
exports.maximePlaceHolderId = '-maximized-placeholder-';
/** @ignore */
exports.placeHolderGroup = {
    floatable: false,
};
/** @ignore */
exports.DockContextType = React.createContext(null);
/** @ignore */
exports.DockContextProvider = exports.DockContextType.Provider;
/** @ignore */
exports.DockContextConsumer = exports.DockContextType.Consumer;
