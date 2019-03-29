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
        this.onPanelCornerDragTL = (event, initFunction) => {
            this.onPanelCornerDrag(event, initFunction, 'tl');
        };
        this.onPanelCornerDragTR = (event, initFunction) => {
            this.onPanelCornerDrag(event, initFunction, 'tr');
        };
        this.onPanelCornerDragBL = (event, initFunction) => {
            this.onPanelCornerDrag(event, initFunction, 'bl');
        };
        this.onPanelCornerDragBR = (event, initFunction) => {
            this.onPanelCornerDrag(event, initFunction, 'br');
        };
        this.onPanelCornerDragMove = (e, dx, dy) => {
            let { panelData } = this.props;
            switch (this._movingCorner) {
                case 'tl': {
                    panelData.x = this._movingX + dx;
                    panelData.w = this._movingW - dx;
                    panelData.y = this._movingY + dy;
                    panelData.h = this._movingH - dy;
                    break;
                }
                case 'tr': {
                    panelData.w = this._movingW + dx;
                    panelData.y = this._movingY + dy;
                    panelData.h = this._movingH - dy;
                    break;
                }
                case 'bl': {
                    panelData.x = this._movingX + dx;
                    panelData.w = this._movingW - dx;
                    panelData.h = this._movingH + dy;
                    break;
                }
                case 'br': {
                    panelData.w = this._movingW + dx;
                    panelData.h = this._movingH + dy;
                    break;
                }
            }
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
    onPanelCornerDrag(event, initFunction, corner) {
        let { parent, x, y, w, h } = this.props.panelData;
        if (parent && parent.mode === 'float') {
            this._movingCorner = corner;
            this._movingX = x;
            this._movingY = y;
            this._movingW = w;
            this._movingH = h;
            initFunction(this._ref, this.onPanelCornerDragMove);
        }
    }
    render() {
        let { dropFromPanel } = this.state;
        let { panelData, size } = this.props;
        let { minWidth, minHeight, group: groupName, id, parent, panelLock } = panelData;
        if (panelLock) {
            if (panelLock.panelStyle) {
                groupName = panelLock.panelStyle;
            }
        }
        let panelClass;
        if (groupName) {
            panelClass = groupName
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
                [
                    react_1.default.createElement(DragInitiator_1.DragInitiator, { key: 'drag-size-t-l', className: 'dock-panel-drag-size dock-panel-drag-size-t-l', onDragInit: this.onPanelCornerDragTL }),
                    react_1.default.createElement(DragInitiator_1.DragInitiator, { key: 'drag-size-t-r', className: 'dock-panel-drag-size dock-panel-drag-size-t-r', onDragInit: this.onPanelCornerDragTR }),
                    react_1.default.createElement(DragInitiator_1.DragInitiator, { key: 'drag-size-b-l', className: 'dock-panel-drag-size dock-panel-drag-size-b-l', onDragInit: this.onPanelCornerDragBL }),
                    react_1.default.createElement(DragInitiator_1.DragInitiator, { key: 'drag-size-b-r', className: 'dock-panel-drag-size dock-panel-drag-size-b-r', onDragInit: this.onPanelCornerDragBR })
                ]
                : null,
            droppingLayer));
    }
}
DockPanel.contextType = DockData_1.DockContextType;
exports.DockPanel = DockPanel;
//# sourceMappingURL=DockPanel.js.map