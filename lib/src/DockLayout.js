"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const DockData_1 = require("./DockData");
const DockBox_1 = require("./DockBox");
const FloatBox_1 = require("./FloatBox");
class DockLayout extends react_1.default.PureComponent {
    fixPanelData(panel) {
        panel.id = DockData_1.nextId();
        if (!(panel.size > 0)) {
            panel.size = 200;
        }
        for (let child of panel.tabs) {
            child.parent = panel;
        }
    }
    fixBoxData(box) {
        box.id = DockData_1.nextId();
        if (!(box.size > 0)) {
            box.size = 200;
        }
        for (let child of box.children) {
            child.parent = box;
            if ('children' in child) {
                // add box id
                this.fixBoxData(child);
            }
            else if ('tabs' in child) {
                // add panel id
                this.fixPanelData(child);
            }
        }
    }
    prepareInitData(data) {
        let layout;
        if (Array.isArray(data)) {
            layout = {
                dockbox: { mode: 'horizontal', children: data, size: 1 }
            };
        }
        else if ('dockbox' in data || 'floatbox' in data) {
            layout = data;
        }
        else if ('children' in data) {
            layout = {
                dockbox: data
            };
        }
        if (!('dockbox' in layout)) {
            layout.dockbox = { mode: 'horizontal', children: [], size: 1 };
        }
        if (!('floatbox' in layout)) {
            layout.floatbox = { mode: 'float', children: [], size: 1 };
        }
        else {
            layout.floatbox.mode = 'float';
        }
        this.fixBoxData(layout.dockbox);
        this.fixBoxData(layout.floatbox);
        console.log(layout);
        return layout;
    }
    constructor(props) {
        super(props);
        this.state = { layout: this.prepareInitData(props.defaultLayout) };
    }
    render() {
        let { style } = this.props;
        let { layout } = this.state;
        return (react_1.default.createElement("div", { className: 'dock-layout', style: style },
            react_1.default.createElement(DockData_1.DockContextProvider, { value: this },
                react_1.default.createElement(DockBox_1.DockBox, { size: 1, boxData: layout.dockbox }),
                react_1.default.createElement(FloatBox_1.FloatBox, { boxData: layout.floatbox }))));
    }
}
exports.DockLayout = DockLayout;
//# sourceMappingURL=DockLayout.js.map