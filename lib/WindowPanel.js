"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WindowPanel = void 0;
const react_1 = __importDefault(require("react"));
const debounce_1 = __importDefault(require("lodash/debounce"));
const react_new_window_1 = __importDefault(require("react-new-window"));
const DockData_1 = require("./DockData");
const DockPanel_1 = require("./DockPanel");
const Algorithm_1 = require("./Algorithm");
class WindowPanel extends react_1.default.PureComponent {
    constructor() {
        super(...arguments);
        this.onOpen = (w) => {
            if (!this._window && w) {
                window.addEventListener('beforeunload', this.onMainWindowUnload);
                w.addEventListener('resize', this.onNewWindowResize);
                this._window = w;
            }
        };
        this.onUnload = () => {
            let { panelData } = this.props;
            if (this.context.find(panelData.id, Algorithm_1.Filter.Panel | Algorithm_1.Filter.Windowed)) {
                let layoutRoot = this.context.getRootElement();
                let layoutRect = layoutRoot.getBoundingClientRect();
                panelData.w = this._window.innerWidth;
                panelData.h = this._window.innerHeight;
                let windowWidthDiff = (this._window.outerWidth - this._window.innerWidth) - (window.outerWidth - window.innerWidth);
                let windowHeightDiff = (this._window.outerHeight - this._window.innerHeight) - (window.outerHeight - window.innerHeight);
                if (windowWidthDiff > 0) {
                    // when window has a border but main window has no border
                    windowWidthDiff = Math.round(windowWidthDiff / 2);
                    windowHeightDiff -= windowWidthDiff;
                }
                else {
                    windowWidthDiff = 0;
                }
                panelData.x = this._window.screenX - window.screenX + windowWidthDiff - layoutRect.x;
                panelData.y = this._window.screenY - window.screenY + windowHeightDiff - layoutRect.y;
                this.context.dockMove(panelData, null, 'float');
            }
        };
        this.onMainWindowUnload = () => {
            if (this._window) {
                this.onNewWindowResize.cancel();
                this._window.close();
            }
        };
        this.onNewWindowResize = debounce_1.default(() => {
            // add/remove element on main document, force it to dispatch resize observer event on the popup window
            let div = document.createElement('div');
            document.body.append(div);
            div.remove();
            // TODO update resize event
        }, 200);
    }
    componentWillUnmount() {
        if (this._window) {
            window.removeEventListener('beforeunload', this.onMainWindowUnload);
            this._window = null;
        }
    }
    render() {
        let { panelData } = this.props;
        return react_1.default.createElement(react_new_window_1.default, { copyStyles: true, title: document.title, onOpen: this.onOpen, onUnload: this.onUnload, onBlock: this.onUnload, features: {
                width: panelData.w,
                height: panelData.h,
            } },
            react_1.default.createElement("div", { className: 'dock-wbox' },
                react_1.default.createElement(DockPanel_1.DockPanel, { size: panelData.size, panelData: panelData, key: panelData.id })));
    }
}
exports.WindowPanel = WindowPanel;
WindowPanel.contextType = DockData_1.DockContextType;
