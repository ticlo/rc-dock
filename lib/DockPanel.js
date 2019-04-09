"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const DockData_1 = require("./DockData");
const DockTabs_1 = require("./DockTabs");
const DragDropDiv_1 = require("./dragdrop/DragDropDiv");
const DragManager_1 = require("./dragdrop/DragManager");
const DockDropLayer_1 = require("./DockDropLayer");
const Algorithm_1 = require("./Algorithm");
const DockDropEdge_1 = require("./DockDropEdge");
class DockPanel extends react_1.default.PureComponent {
    constructor() {
        super(...arguments);
        this.getRef = (r) => {
            this._ref = r;
        };
        this.state = { dropFromPanel: null, draggingHeader: false };
        this.onDragOver = (e) => {
            if (DockPanel._droppingPanel === this) {
                return;
            }
            let { panelData } = this.props;
            DockPanel.droppingPanel = this;
            let tab = DragManager_1.DragState.getData('tab', DockData_1.DockContextType);
            let panel = DragManager_1.DragState.getData('panel', DockData_1.DockContextType);
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
        this.onPanelHeaderDragStart = (event) => {
            let { panelData } = this.props;
            let { parent, x, y, z } = panelData;
            if (parent && parent.mode === 'float') {
                this._movingX = x;
                this._movingY = y;
                // hide the panel, but not create drag layer element
                event.startDrag(null, null);
                event.setData({ panel: this.props.panelData }, DockData_1.DockContextType);
                this.onFloatPointerDown();
            }
            else {
                event.startDrag(null);
                event.setData({ panel: this.props.panelData }, DockData_1.DockContextType);
            }
            this.setState({ draggingHeader: true });
        };
        this.onPanelHeaderDragMove = (e) => {
            let { panelData } = this.props;
            panelData.x = this._movingX + e.dx;
            panelData.y = this._movingY + e.dy;
            this.forceUpdate();
        };
        this.onPanelHeaderDragEnd = (e) => {
            this.setState({ draggingHeader: false });
        };
        this.onPanelCornerDragTL = (e) => {
            this.onPanelCornerDrag(e, 'tl');
        };
        this.onPanelCornerDragTR = (e) => {
            this.onPanelCornerDrag(e, 'tr');
        };
        this.onPanelCornerDragBL = (e) => {
            this.onPanelCornerDrag(e, 'bl');
        };
        this.onPanelCornerDragBR = (e) => {
            this.onPanelCornerDrag(e, 'br');
        };
        this.onPanelCornerDragMove = (e) => {
            let { panelData } = this.props;
            switch (this._movingCorner) {
                case 'tl': {
                    panelData.x = this._movingX + e.dx;
                    panelData.w = this._movingW - e.dx;
                    panelData.y = this._movingY + e.dy;
                    panelData.h = this._movingH - e.dy;
                    break;
                }
                case 'tr': {
                    panelData.w = this._movingW + e.dx;
                    panelData.y = this._movingY + e.dy;
                    panelData.h = this._movingH - e.dy;
                    break;
                }
                case 'bl': {
                    panelData.x = this._movingX + e.dx;
                    panelData.w = this._movingW - e.dx;
                    panelData.h = this._movingH + e.dy;
                    break;
                }
                case 'br': {
                    panelData.w = this._movingW + e.dx;
                    panelData.h = this._movingH + e.dy;
                    break;
                }
            }
            this.forceUpdate();
        };
        this.onFloatPointerDown = () => {
            let { panelData } = this.props;
            let { z } = panelData;
            let newZ = Algorithm_1.nextZIndex(z);
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
    onPanelCornerDrag(e, corner) {
        let { parent, x, y, w, h } = this.props.panelData;
        if (parent && parent.mode === 'float') {
            this._movingCorner = corner;
            this._movingX = x;
            this._movingY = y;
            this._movingW = w;
            this._movingH = h;
            e.startDrag(null, null);
        }
    }
    render() {
        let { dropFromPanel, draggingHeader } = this.state;
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
        let cls = `dock-panel ${panelClass ? panelClass : ''}${dropFromPanel ? ' dock-panel-dropping' : ''}${draggingHeader ? ' dragging' : ''}`;
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
            let DockDropClass = this.context.useEdgeDrop() ? DockDropEdge_1.DockDropEdge : DockDropLayer_1.DockDropLayer;
            DockDropClass = DockDropEdge_1.DockDropEdge;
            droppingLayer = react_1.default.createElement(DockDropClass, { panelData: panelData, panelElement: this._ref, dropFromPanel: dropFromPanel });
        }
        return (react_1.default.createElement(DragDropDiv_1.DragDropDiv, { getRef: this.getRef, className: cls, style: style, "data-dockid": id, onPointerDown: pointerDownCallback, onDragOverT: isFloat ? null : this.onDragOver },
            react_1.default.createElement(DockTabs_1.DockTabs, { panelData: panelData, onPanelDragStart: this.onPanelHeaderDragStart, onPanelDragMove: this.onPanelHeaderDragMove, onPanelDragEnd: this.onPanelHeaderDragEnd }),
            isFloat ?
                [
                    react_1.default.createElement(DragDropDiv_1.DragDropDiv, { key: 'drag-size-t-l', className: 'dock-panel-drag-size dock-panel-drag-size-t-l', onDragStartT: this.onPanelCornerDragTL, onDragMoveT: this.onPanelCornerDragMove }),
                    react_1.default.createElement(DragDropDiv_1.DragDropDiv, { key: 'drag-size-t-r', className: 'dock-panel-drag-size dock-panel-drag-size-t-r', onDragStartT: this.onPanelCornerDragTR, onDragMoveT: this.onPanelCornerDragMove }),
                    react_1.default.createElement(DragDropDiv_1.DragDropDiv, { key: 'drag-size-b-l', className: 'dock-panel-drag-size dock-panel-drag-size-b-l', onDragStartT: this.onPanelCornerDragBL, onDragMoveT: this.onPanelCornerDragMove }),
                    react_1.default.createElement(DragDropDiv_1.DragDropDiv, { key: 'drag-size-b-r', className: 'dock-panel-drag-size dock-panel-drag-size-b-r', onDragStartT: this.onPanelCornerDragBR, onDragMoveT: this.onPanelCornerDragMove })
                ]
                : null,
            droppingLayer));
    }
}
DockPanel.contextType = DockData_1.DockContextType;
exports.DockPanel = DockPanel;
//# sourceMappingURL=DockPanel.js.map