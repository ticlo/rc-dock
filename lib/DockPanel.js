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
        this.onDragOver = () => {
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
        };
        this.onPanelHeaderDrag = (event, initFunction) => {
            let { parent, x, y } = this.props.panelData;
            if (parent && parent.mode === 'float'
                && !event.target.draggable // dragging tab instead of panel
            ) {
                this._movingX = x;
                this._movingY = y;
                initFunction(this._ref.parentElement, this.onPanelHeaderDragMove);
            }
        };
        this.onPanelHeaderDragMove = (e, dx, dy) => {
            let { panelData } = this.props;
            panelData.x = this._movingX + dx;
            panelData.y = this._movingY + dy;
            this.forceUpdate();
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
        let { minWidth, minHeight, group, id, parent } = panelData;
        let { panelClass, headless } = group;
        let isFloat = parent && parent.mode === 'float';
        if (isFloat) {
            headless = false;
        }
        console.log(`panel render ${id}`);
        let cls = `dock-panel${headless ? ' dock-headless-panel' : ''} ${panelClass ? panelClass : ''}${dropFromPanel ? ' dock-panel-dropping' : ''}`;
        let style = { minWidth, minHeight, flex: `1 1 ${size}px` };
        if (panelData.parent.mode === 'float') {
            style.left = panelData.x;
            style.top = panelData.y;
            style.width = panelData.w;
            style.height = panelData.h;
        }
        let droppingLayer;
        if (dropFromPanel) {
            droppingLayer = react_1.default.createElement(DockDropLayer_1.DockDropLayer, { panelData: panelData, panelElement: this._ref, dropFromPanel: dropFromPanel });
        }
        return (react_1.default.createElement("div", { ref: this.getRef, className: cls, style: style, "data-dockid": id, onDragOver: isFloat ? null : this.onDragOver },
            react_1.default.createElement(DockTabs_1.DockTabs, { panelData: panelData, onPanelHeaderDrag: this.onPanelHeaderDrag }),
            isFloat ?
                react_1.default.createElement(DragInitiator_1.DragInitiator, { className: 'dock-panel-drag-size', onDragInit: this.onPanelCornerDrag })
                : null,
            droppingLayer));
    }
}
exports.DockPanel = DockPanel;
//# sourceMappingURL=DockPanel.js.map