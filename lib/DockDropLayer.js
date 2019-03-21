"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const DockData_1 = require("./DockData");
const DragStore_1 = require("./DragStore");
class DockDropSquare extends react_1.default.PureComponent {
    constructor() {
        super(...arguments);
        this.state = { dropping: false };
        this.onDragOver = (e) => {
            let { panelElement, direction } = this.props;
            this.setState({ dropping: true });
            this.context.setDropRect(panelElement, direction);
            e.dataTransfer.dropEffect = 'move';
            e.preventDefault();
            e.stopPropagation();
        };
        this.onDragLeave = (e) => {
            this.setState({ dropping: false });
        };
        this.onDrop = (e) => {
            let tab = DragStore_1.DragStore.getData(DockData_1.DockContextType, 'tab');
            if (tab) {
                let { panelData, direction } = this.props;
                this.context.moveTab(tab, panelData, direction);
            }
        };
    }
    render() {
        let { direction } = this.props;
        let { dropping } = this.state;
        let cls = `dock-drop-square dock-drop-${direction}${dropping ? ' dock-drop-square-dropping' : ''}`;
        return react_1.default.createElement("div", { className: cls, onDragOver: this.onDragOver, onDragLeave: this.onDragLeave, onDrop: this.onDrop });
    }
}
DockDropSquare.contextType = DockData_1.DockContextType;
exports.DockDropSquare = DockDropSquare;
class DockDropLayer extends react_1.default.PureComponent {
    constructor() {
        super(...arguments);
        this.onDragOver = (e) => {
            let { panelElement } = this.props;
            this.context.setDropRect(null);
            this.context.setDropRect(panelElement, 'float');
            e.dataTransfer.dropEffect = 'link';
            e.preventDefault();
            e.stopPropagation();
        };
        this.onDrop = (e) => {
        };
    }
    render() {
        let { panelData, panelElement, dropFromPanel } = this.props;
        let children = [
            react_1.default.createElement(DockDropSquare, { key: 'left', direction: 'left', panelData: panelData, panelElement: panelElement }),
            react_1.default.createElement(DockDropSquare, { key: 'right', direction: 'right', panelData: panelData, panelElement: panelElement }),
            react_1.default.createElement(DockDropSquare, { key: 'top', direction: 'top', panelData: panelData, panelElement: panelElement }),
            react_1.default.createElement(DockDropSquare, { key: 'bottom', direction: 'bottom', panelData: panelData, panelElement: panelElement })
        ];
        if (panelData.group === dropFromPanel.group) {
            children.push(react_1.default.createElement(DockDropSquare, { key: 'middle', direction: 'middle', panelData: panelData, panelElement: panelElement }));
        }
        let samePanel = panelData === dropFromPanel;
        return (react_1.default.createElement("div", { className: `dock-drop-layer${samePanel ? ' dock-drop-float' : ''}`, onDragOver: this.onDragOver, onDrop: this.onDrop }, children));
    }
}
DockDropLayer.contextType = DockData_1.DockContextType;
exports.DockDropLayer = DockDropLayer;
//# sourceMappingURL=DockDropLayer.js.map