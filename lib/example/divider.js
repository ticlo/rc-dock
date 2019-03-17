"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_dom_1 = __importDefault(require("react-dom"));
const Divider_1 = require("../src/Divider");
let index = 1;
class Demo extends react_1.default.Component {
    constructor() {
        super(...arguments);
        this.getRef = (r) => {
            this._ref = r;
        };
        this.state = { sizes: [200, 200, 30] };
        this.getDividerData = (idx) => {
            let children = [];
            this._ref.childNodes.forEach((child) => {
                if (!child.classList.contains('dock-divider')) {
                    children.push({
                        size: child.offsetWidth,
                        minSize: 20 // give them 20px min width
                    });
                }
            });
            return {
                element: this._ref,
                beforeDivider: children.slice(0, idx),
                afterDivider: children.slice(idx)
            };
        };
        this.changeSizes = (sizes) => {
            this.setState({ sizes });
        };
    }
    render() {
        let { sizes } = this.state;
        return (react_1.default.createElement("div", { ref: this.getRef, className: 'box' },
            react_1.default.createElement("div", { style: { width: sizes[0] } }),
            react_1.default.createElement(Divider_1.Divider, { idx: 1, getDividerData: this.getDividerData, changeSizes: this.changeSizes }),
            react_1.default.createElement("div", { style: { width: sizes[1] } }),
            react_1.default.createElement(Divider_1.Divider, { idx: 2, getDividerData: this.getDividerData, changeSizes: this.changeSizes }),
            react_1.default.createElement("div", { style: { width: sizes[2] } })));
    }
}
react_dom_1.default.render(react_1.default.createElement(Demo, null), document.getElementById('app'));
//# sourceMappingURL=divider.js.map