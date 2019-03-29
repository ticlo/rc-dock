"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const DockData_1 = require("./DockData");
const DockTabs_1 = require("./DockTabs");
const DragInitiator_1 = require("./DragInitiator");
const DragStore_1 = require("./DragStore");
const DockDropLayer_1 = require("./DockDropLayer");
class DockPanel extends react_1.default.PureComponent {
    constructor() {
        super(...arguments);
        this.getRef = (r) => {
            this._ref = r;
        };
        this.state = { dropFromPanel: null };
        this.onDragEnter = () => {
            let { panelData } = this.props;
            DockPanel.droppingPanel = this;
            let tab = DragStore_1.DragStore.getData(DockData_1.DockContextType, 'tab');
            let panel = DragStore_1.DragStore.getData(DockData_1.DockContextType, 'panel');
            if (tab) {
                if (tab.parent) {
                    this.setState({ dropFromPanel: tab.parent });
                }
                else {
                    // add a fake panel
                    this.setState({ dropFromPanel: { activeId: '', tabs: [], group: tab.group } });
                }
            }
            else if (panel) {
                this.setState({ dropFromPanel: panel });
            }
        };
        // drop to move in float mode
        this.onPanelHeaderDragInit = (event, initFunction) => {
            let { panelData } = this.props;
            let { parent, x, y, z } = panelData;
            if (parent && parent.mode === 'float'
                && !event.target.draggable // dragging tab instead of panel
            ) {
                this._movingX = x;
                this._movingY = y;
                initFunction(this._ref.parentElement, this.onPanelHeaderDragMove);
                this.onFloatPointerDown();
            }
        };
        this.onPanelHeaderDragMove = (e, dx, dy) => {
            let { panelData } = this.props;
            panelData.x = this._movingX + dx;
            panelData.y = this._movingY + dy;
            this.forceUpdate();
        };
        // drag in dock mode
        this.onPanelHeaderHtmlDrag = (event) => {
            DragStore_1.DragStore.dragStart(DockData_1.DockContextType, { panel: this.props.panelData }, event.nativeEvent, this._ref);
            event.stopPropagation();
        };
        this.onPanelCornerDrag = (event, initFunction) => {
            let { parent, w, h } = this.props.panelData;
            if (parent && parent.mode === 'float') {
                this._movingW = w;
                this._movingH = h;
                initFunction(this._ref, this.onPanelCornerDragMove);
            }
        };
        this.onPanelCornerDragMove = (e, dx, dy) => {
            let { panelData } = this.props;
            panelData.w = this._movingW + dx;
            panelData.h = this._movingH + dy;
            this.forceUpdate();
        };
        this.onFloatPointerDown = () => {
            let { panelData } = this.props;
            let { z } = panelData;
            let newZ = this.context.nextFloatZIndex(z);
            if (newZ !== z) {
                panelData.z = newZ;
                this.forceUpdate();
            }
        };
    }
    static set droppingPanel(panel) {
        if (DockPanel._droppingPanel === panel) {
            return;
        }
        if (DockPanel._droppingPanel) {
            DockPanel._droppingPanel.onDragLeave();
        }
        DockPanel._droppingPanel = panel;
    }
    onDragLeave() {
        if (this.state.dropFromPanel) {
            this.setState({ dropFromPanel: null });
        }
    }
    render() {
        let { dropFromPanel } = this.state;
        let { panelData, size } = this.props;
        let { minWidth, minHeight, group: panelStyle, id, parent, panelLock } = panelData;
        if (panelLock) {
            if (panelLock.panelStyle) {
                panelStyle = panelLock.panelStyle;
            }
        }
        let panelClass;
        if (panelStyle) {
            panelClass = panelStyle
                .split(' ')
                .map((name) => `dock-style-${name}`)
                .join(' ');
        }
        let isFloat = parent && parent.mode === 'float';
        let pointerDownCallback;
        if (isFloat) {
            pointerDownCallback = this.onFloatPointerDown;
        }
        let cls = `dock-panel ${panelClass ? panelClass : ''}${dropFromPanel ? ' dock-panel-dropping' : ''}`;
        let style = { minWidth, minHeight, flex: `${size} 1 ${size}px` };
        if (panelData.parent.mode === 'float') {
            style.left = panelData.x;
            style.top = panelData.y;
            style.width = panelData.w;
            style.height = panelData.h;
            style.zIndex = panelData.z;
        }
        let droppingLayer;
        if (dropFromPanel) {
            droppingLayer = react_1.default.createElement(DockDropLayer_1.DockDropLayer, { panelData: panelData, panelElement: this._ref, dropFromPanel: dropFromPanel });
        }
        let onPanelHeaderDragInit = this.onPanelHeaderDragInit;
        let onPanelHeaderHtmlDrag = this.onPanelHeaderHtmlDrag;
        if (isFloat) {
            onPanelHeaderHtmlDrag = null;
        }
        else {
            onPanelHeaderDragInit = null;
        }
        return (react_1.default.createElement("div", { ref: this.getRef, className: cls, style: style, "data-dockid": id, onPointerDown: pointerDownCallback, onDragEnter: isFloat ? null : this.onDragEnter },
            react_1.default.createElement(DockTabs_1.DockTabs, { panelData: panelData, onPanelHeaderDragInit: onPanelHeaderDragInit, onPanelHeaderHtmlDrag: onPanelHeaderHtmlDrag }),
            isFloat ?
                react_1.default.createElement(DragInitiator_1.DragInitiator, { className: 'dock-panel-drag-size', onDragInit: this.onPanelCornerDrag })
                : null,
            droppingLayer));
    }
}
DockPanel.contextType = DockData_1.DockContextType;
exports.DockPanel = DockPanel;
//# sourceMappingURL=DockPanel.js.map