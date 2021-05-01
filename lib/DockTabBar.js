"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DockTabBar = void 0;
const react_1 = __importDefault(require("react"));
const DragDropDiv_1 = require("./dragdrop/DragDropDiv");
function DockTabBar(props) {
    const { onDragStart, onDragMove, onDragEnd, TabNavList } = props, restProps = __rest(props, ["onDragStart", "onDragMove", "onDragEnd", "TabNavList"]);
    return (react_1.default.createElement(DragDropDiv_1.DragDropDiv, { onDragStartT: onDragStart, onDragMoveT: onDragMove, onDragEndT: onDragEnd, role: "tablist", className: 'dock-bar' },
        react_1.default.createElement(TabNavList, Object.assign({}, restProps))));
}
exports.DockTabBar = DockTabBar;
