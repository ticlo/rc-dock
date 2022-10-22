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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WindowPanel = void 0;
const React = __importStar(require("react"));
const rc_new_window_1 = __importDefault(require("rc-new-window"));
const DockData_1 = require("./DockData");
const DockPanel_1 = require("./DockPanel");
const ScreenPosition_1 = require("rc-new-window/lib/ScreenPosition");
class WindowPanel extends React.PureComponent {
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
            const rect = ScreenPosition_1.mapWindowToElement(layoutRoot, this._window);
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
            return ScreenPosition_1.mapElementToScreenRect(this.context.getRootElement(), {
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
        return React.createElement(rc_new_window_1.default, { copyStyles: true, onOpen: this.onOpen, onClose: this.onUnload, onBlock: this.onUnload, initPopupInnerRect: this.initPopupInnerRect, width: w, height: h },
            React.createElement("div", { className: 'dock-wbox' },
                React.createElement(DockPanel_1.DockPanel, { size: panelData.size, panelData: panelData, key: panelData.id })));
    }
}
exports.WindowPanel = WindowPanel;
WindowPanel.contextType = DockData_1.DockContextType;
