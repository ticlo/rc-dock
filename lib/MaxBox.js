"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const DockPanel_1 = require("./DockPanel");
class MaxBox extends react_1.default.PureComponent {
    render() {
        let panelData = this.props.boxData.children[0];
        if (panelData) {
            this.hidePanelData = { ...panelData, tabs: [] };
            return (react_1.default.createElement("div", { className: 'dock-box dock-mbox dock-mbox-show' },
                react_1.default.createElement(DockPanel_1.DockPanel, { size: 100, panelData: panelData })));
        }
        else if (this.hidePanelData) {
            // use the hiden data only once, dont keep it for too long
            let hidePanelData = this.hidePanelData;
            this.hidePanelData = null;
            return (react_1.default.createElement("div", { className: 'dock-box dock-mbox dock-mbox-hide' },
                react_1.default.createElement(DockPanel_1.DockPanel, { size: 100, panelData: hidePanelData })));
        }
        else {
            return (react_1.default.createElement("div", { className: 'dock-box dock-mbox dock-mbox-hide' }));
        }
    }
}
exports.MaxBox = MaxBox;
