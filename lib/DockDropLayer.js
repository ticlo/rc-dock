"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
class DockDropSquare extends react_1.default.PureComponent {
    constructor() {
        super(...arguments);
        this.onDragOver = () => {
        };
    }
    onDragLeave() {
    }
    onDrop() {
    }
    render() {
        let { direction } = this.props;
        let cls = `dock-drop-square dock-drop-${direction}`;
        return react_1.default.createElement("div", { className: cls, onDragOver: this.onDragOver, onDragLeave: this.onDragLeave, onDrop: this.onDrop });
    }
}
exports.DockDropSquare = DockDropSquare;
class DockDropLayer extends react_1.default.PureComponent {
    render() {
        let { panelData } = this.props;
        return (react_1.default.createElement("div", { className: 'dock-drop-layer' },
            react_1.default.createElement(DockDropSquare, { direction: 'middle', panelData: panelData }),
            react_1.default.createElement(DockDropSquare, { direction: 'left', panelData: panelData }),
            react_1.default.createElement(DockDropSquare, { direction: 'right', panelData: panelData }),
            react_1.default.createElement(DockDropSquare, { direction: 'top', panelData: panelData }),
            react_1.default.createElement(DockDropSquare, { direction: 'bottom', panelData: panelData })));
    }
}
exports.DockDropLayer = DockDropLayer;
//# sourceMappingURL=DockDropLayer.js.map