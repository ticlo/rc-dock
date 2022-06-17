"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FloatBox = void 0;
const react_1 = __importDefault(require("react"));
const DockData_1 = require("./DockData");
const DockPanel_1 = require("./DockPanel");
const classnames_1 = __importDefault(require("classnames"));
class FloatBox extends react_1.default.PureComponent {
    render() {
        let { children } = this.props.boxData;
        let childrenRender = [];
        for (let child of children) {
            if ('tabs' in child) {
                childrenRender.push(react_1.default.createElement(DockPanel_1.DockPanel, { size: child.size, panelData: child, key: child.id }));
            }
        }
        return (react_1.default.createElement("div", { className: classnames_1.default("dock-box dock-fbox", this.context.getClassName()) }, childrenRender));
    }
}
exports.FloatBox = FloatBox;
FloatBox.contextType = DockData_1.DockContextType;
