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
exports.FloatBox = void 0;
const React = __importStar(require("react"));
const DockPanel_1 = require("./DockPanel");
class FloatBox extends React.PureComponent {
    render() {
        let { children } = this.props.boxData;
        let childrenRender = [];
        for (let child of children) {
            if ('tabs' in child) {
                childrenRender.push(React.createElement(DockPanel_1.DockPanel, { size: child.size, panelData: child, key: child.id }));
            }
        }
        return (React.createElement("div", { className: 'dock-box dock-fbox' }, childrenRender));
    }
}
exports.FloatBox = FloatBox;
