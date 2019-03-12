"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const rc_tabs_1 = require("rc-tabs");
class DockTab extends react_1.default.PureComponent {
    render() {
        return (react_1.default.createElement(rc_tabs_1.TabPane, { tab: '' }));
    }
}
exports.DockTab = DockTab;
//# sourceMappingURL=DockTab.js.map