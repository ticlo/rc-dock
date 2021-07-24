"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WindowBox = void 0;
const react_1 = __importDefault(require("react"));
const WindowPanel_1 = require("./WindowPanel");
class WindowBox extends react_1.default.PureComponent {
    render() {
        let { children } = this.props.boxData;
        let childrenRender = [];
        for (let child of children) {
            if ('tabs' in child) {
                childrenRender.push(react_1.default.createElement(WindowPanel_1.WindowPanel, { key: child.id, panelData: child }));
            }
        }
        return (react_1.default.createElement(react_1.default.Fragment, null, childrenRender));
    }
}
exports.WindowBox = WindowBox;
WindowBox.enabled = typeof window === 'object' && ((window === null || window === void 0 ? void 0 : window.navigator.platform) === 'Win32' || (window === null || window === void 0 ? void 0 : window.navigator.platform) === 'MacIntel');
