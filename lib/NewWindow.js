"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NewWindow = void 0;
const react_1 = __importDefault(require("react"));
const DockPanel_1 = require("./DockPanel");
const react_new_window_1 = __importDefault(require("react-new-window"));
class NewWindow extends react_1.default.PureComponent {
    render() {
        let { children } = this.props.boxData;
        let childrenRender = [];
        for (let child of children) {
            if ('tabs' in child) {
                childrenRender.push(react_1.default.createElement(react_new_window_1.default, { key: child.id, copyStyles: true, title: document.title, features: {
                        width: child.w + 16,
                        height: child.h + 40,
                        left: 0,
                        top: child.y - 32,
                    } },
                    react_1.default.createElement("div", { className: 'dock-wbox ' },
                        react_1.default.createElement(DockPanel_1.DockPanel, { size: child.size, panelData: child, key: child.id }))));
            }
        }
        return (react_1.default.createElement(react_1.default.Fragment, null, childrenRender));
    }
}
exports.NewWindow = NewWindow;
