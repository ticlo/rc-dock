"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_dom_1 = __importDefault(require("react-dom"));
const lib_1 = require("../lib");
class Demo extends react_1.default.Component {
    constructor() {
        super(...arguments);
        this.state = { droptxt: 'drop here' };
        this.onDragStart = (state) => {
            state.startDrag();
        };
        this.onDragOver = (state) => {
            state.accept('move');
        };
        this.onDrop = (state) => {
            this.setState({ droptxt: 'dropped' });
        };
    }
    render() {
        return (react_1.default.createElement("div", null,
            react_1.default.createElement(lib_1.DragDropDiv, { style: { cursor: '' }, onDragStart: this.onDragStart }, "drag here"),
            react_1.default.createElement(lib_1.DragDropDiv, { onDragOver: this.onDragOver, onDrop: this.onDrop }, this.state.droptxt)));
    }
}
react_dom_1.default.render(react_1.default.createElement(Demo, null), document.getElementById('app'));
//# sourceMappingURL=dragdrop.js.map