"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MaxBox = void 0;
const react_1 = __importDefault(require("react"));
const DockData_1 = require("./DockData");
const DockPanel_1 = require("./DockPanel");
const classnames_1 = __importDefault(require("classnames"));
class MaxBox extends react_1.default.PureComponent {
    render() {
        let panelData = this.props.boxData.children[0];
        if (panelData) {
            this.hidePanelData = Object.assign(Object.assign({}, panelData), { id: '', tabs: [] });
            return (react_1.default.createElement("div", { className: classnames_1.default("dock-box dock-mbox dock-mbox-show", this.context.getClassName()) },
                react_1.default.createElement(DockPanel_1.DockPanel, { size: 100, panelData: panelData })));
        }
        else if (this.hidePanelData) {
            // use the hiden data only once, dont keep it for too long
            let hidePanelData = this.hidePanelData;
            this.hidePanelData = null;
            return (react_1.default.createElement("div", { className: classnames_1.default("dock-box dock-mbox dock-mbox-hide", this.context.getClassName()) },
                react_1.default.createElement(DockPanel_1.DockPanel, { size: 100, panelData: hidePanelData })));
        }
        else {
            return (react_1.default.createElement("div", { className: classnames_1.default("dock-box dock-mbox dock-mbox-hide", this.context.getClassName()) }));
        }
    }
}
exports.MaxBox = MaxBox;
MaxBox.contextType = DockData_1.DockContextType;
