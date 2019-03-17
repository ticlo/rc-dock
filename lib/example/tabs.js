"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_dom_1 = __importDefault(require("react-dom"));
const DockLayout_1 = require("../src/DockLayout");
let group = {
    closable: true
};
let box = {
    dockbox: {
        mode: 'horizontal',
        children: [
            {
                tabs: [{
                        id: 'hello',
                        title: 'hello',
                        content: react_1.default.createElement("span", { style: { margin: 50 } }, "hello"),
                        group
                    }, {
                        id: 'world',
                        title: 'world',
                        content: react_1.default.createElement("span", { style: { margin: 50 } }, "world"),
                        group
                    }],
                group,
                activeId: 'world',
                id: 'panel1',
            },
            {
                tabs: [{
                        id: 'hello',
                        title: 'hello',
                        content: react_1.default.createElement("span", { style: { margin: 50 } }, "hello"),
                        group
                    }, {
                        id: 'world',
                        title: 'world',
                        content: react_1.default.createElement("span", { style: { margin: 50 } }, "world"),
                        group
                    }],
                group,
                activeId: 'world',
                id: 'panel2',
            }
        ]
    },
    floatbox: {
        children: [
            {
                tabs: [{
                        id: 'hello',
                        title: 'hello',
                        content: react_1.default.createElement("span", { style: { margin: 50 } }, "hello"),
                        group
                    }, {
                        id: 'world',
                        title: 'world',
                        content: react_1.default.createElement("span", { style: { margin: 50 } }, "world"),
                        group
                    }],
                group,
                activeId: 'world',
                id: 'panel2',
                x: 20, y: 30, w: 200, h: 200
            }
        ]
    }
};
class Demo extends react_1.default.Component {
    constructor() {
        super(...arguments);
        this.state = { activeId: 'world' };
        this.onTabChange = (activeId) => {
            this.setState({ activeId });
        };
    }
    render() {
        return (react_1.default.createElement("div", { style: { margin: 20 } },
            react_1.default.createElement("h2", null, "Addable Tabs"),
            react_1.default.createElement(DockLayout_1.DockLayout, { defaultLayout: box, style: { position: 'absolute', left: 100, top: 100, width: 600, height: 300 } })));
    }
}
react_dom_1.default.render(react_1.default.createElement(Demo, null), document.getElementById('app'));
//# sourceMappingURL=tabs.js.map