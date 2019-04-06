"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const DockData_1 = require("./DockData");
const DragDropDiv_1 = require("./dragdrop/DragDropDiv");
const DragManager_1 = require("./dragdrop/DragManager");
class DockDropSquare extends react_1.default.PureComponent {
    constructor() {
        super(...arguments);
        this.state = { dropping: false };
        this.onDragOver = (e) => {
            let { panelElement: targetElement, direction, depth, panelData } = this.props;
            this.setState({ dropping: true });
            for (let i = 0; i < depth; ++i) {
                targetElement = targetElement.parentElement;
            }
            if (panelData.group === DockData_1.placeHolderStyle && direction !== 'float') {
                // place holder panel should always have full size drop rect
                this.context.setDropRect(targetElement, 'middle', this, e);
            }
            else {
                this.context.setDropRect(targetElement, direction, this, e);
            }
            e.accept('move');
        };
        this.onDragLeave = (e) => {
            let { panelElement, direction } = this.props;
            this.setState({ dropping: false });
            this.context.setDropRect(null, 'remove', this);
        };
        this.onDrop = (e) => {
            let source = DragManager_1.DragState.getData('tab', DockData_1.DockContextType);
            if (!source) {
                source = DragManager_1.DragState.getData('panel', DockData_1.DockContextType);
            }
            if (source) {
                let { panelData, direction, depth } = this.props;
                let target = panelData;
                for (let i = 0; i < depth; ++i) {
                    target = target.parent;
                }
                this.context.dockMove(source, target, direction);
            }
        };
    }
    render() {
        let { direction, depth } = this.props;
        let { dropping } = this.state;
        let classes = ['dock-drop-square'];
        classes.push(`dock-drop-${direction}`);
        if (depth) {
            classes.push(`dock-drop-deep`);
        }
        if (dropping) {
            classes.push('dock-drop-square-dropping');
        }
        return (react_1.default.createElement(DragDropDiv_1.DragDropDiv, { className: classes.join(' '), onDragOverT: this.onDragOver, onDragLeaveT: this.onDragLeave, onDropT: this.onDrop }));
    }
    componentWillUnmount() {
        this.context.setDropRect(null, 'remove', this);
    }
}
DockDropSquare.contextType = DockData_1.DockContextType;
exports.DockDropSquare = DockDropSquare;
class DockDropLayer extends react_1.default.PureComponent {
    static addDepthSquare(children, mode, panelData, panelElement, depth) {
        if (mode === 'horizontal') {
            children.push(react_1.default.createElement(DockDropSquare, { key: `top${depth}`, direction: 'top', depth: depth, panelData: panelData, panelElement: panelElement }));
            children.push(react_1.default.createElement(DockDropSquare, { key: `bottom${depth}`, direction: 'bottom', depth: depth, panelData: panelData, panelElement: panelElement }));
        }
        else {
            children.push(react_1.default.createElement(DockDropSquare, { key: `left${depth}`, direction: 'left', depth: depth, panelData: panelData, panelElement: panelElement }));
            children.push(react_1.default.createElement(DockDropSquare, { key: `right${depth}`, direction: 'right', depth: depth, panelData: panelData, panelElement: panelElement }));
        }
    }
    render() {
        let { panelData, panelElement, dropFromPanel } = this.props;
        let children = [];
        // check if it's whole panel dragging
        let draggingPanel = DragManager_1.DragState.getData('panel', DockData_1.DockContextType);
        let fromGroup = this.context.getGroup(dropFromPanel.group);
        if (fromGroup.floatable !== false && (!draggingPanel || !draggingPanel.panelLock)) {
            children.push(react_1.default.createElement(DockDropSquare, { key: 'float', direction: 'float', panelData: panelData, panelElement: panelElement }));
        }
        if (draggingPanel !== panelData) { // don't drop panel to itself
            // 4 direction base drag square
            DockDropLayer.addDepthSquare(children, 'horizontal', panelData, panelElement, 0);
            DockDropLayer.addDepthSquare(children, 'vertical', panelData, panelElement, 0);
            if (panelData.group === dropFromPanel.group && panelData !== dropFromPanel) {
                // dock to tabs
                children.push(react_1.default.createElement(DockDropSquare, { key: 'middle', direction: 'middle', panelData: panelData, panelElement: panelElement }));
            }
            let box = panelData.parent;
            if (box && box.children.length > 1) {
                // deeper drop
                DockDropLayer.addDepthSquare(children, box.mode, panelData, panelElement, 1);
                if (box.parent) {
                    DockDropLayer.addDepthSquare(children, box.parent.mode, panelData, panelElement, 2);
                }
            }
        }
        return (react_1.default.createElement("div", { className: 'dock-drop-layer' }, children));
    }
}
DockDropLayer.contextType = DockData_1.DockContextType;
exports.DockDropLayer = DockDropLayer;
//# sourceMappingURL=DockDropLayer.js.map