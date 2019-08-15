"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const DockPanel_1 = require("./DockPanel");
class MaxBox extends react_1.default.PureComponent {
    render() {
        let panelData = this.props.boxData.children[0];
        return (react_1.default.createElement("div", { className: 'dock-box dock-mbox' },
            react_1.default.createElement(DockPanel_1.DockPanel, { size: 100, panelData: panelData, key: panelData.id })));
    }
}
exports.MaxBox = MaxBox;
//# sourceMappingURL=MaxBox.js.map