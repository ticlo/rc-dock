"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WindowPanel = void 0;
const react_1 = __importDefault(require("react"));
const rc_new_window_1 = __importDefault(require("rc-new-window"));
const DockData_1 = require("./DockData");
const DockPanel_1 = require("./DockPanel");
const ScreenPosition_1 = require("rc-new-window/lib/ScreenPosition");
class WindowPanel extends react_1.default.PureComponent {
    constructor() {
        super(...arguments);
        this.onOpen = (w) => {
            if (!this._window && w) {
                this._window = w;
            }
        };
        this.onUnload = () => {
            let { panelData } = this.props;
            let layoutRoot = this.context.getRootElement();
            const rect = (0, ScreenPosition_1.mapWindowToElement)(layoutRoot, this._window);
            if (rect.width > 0 && rect.height > 0) {
                panelData.x = rect.left;
                panelData.y = rect.top;
                panelData.w = rect.width;
                panelData.h = rect.height;
            }
            this.context.dockMove(panelData, null, 'float');
        };
        this.initPopupInnerRect = () => {
            let { panelData } = this.props;
            return (0, ScreenPosition_1.mapElementToScreenRect)(this.context.getRootElement(), {
                left: panelData.x,
                top: panelData.y,
                width: panelData.w,
                height: panelData.h
            });
        };
    }
    render() {
        let { panelData } = this.props;
        let { x, y, w, h } = panelData;
        return react_1.default.createElement(rc_new_window_1.default, { copyStyles: true, onOpen: this.onOpen, onClose: this.onUnload, onBlock: this.onUnload, initPopupInnerRect: this.initPopupInnerRect, width: w, height: h },
            react_1.default.createElement("div", { className: 'dock-wbox' },
                react_1.default.createElement(DockPanel_1.DockPanel, { size: panelData.size, panelData: panelData, key: panelData.id })));
    }
}
exports.WindowPanel = WindowPanel;
WindowPanel.contextType = DockData_1.DockContextType;
