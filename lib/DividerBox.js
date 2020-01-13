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
const react_1 = __importDefault(require("react"));
const DockData_1 = require("./DockData");
const Divider_1 = require("./Divider");
class DividerBox extends react_1.default.PureComponent {
    constructor() {
        super(...arguments);
        this.getRef = (r) => {
            this._ref = r;
        };
        this.getDividerData = (idx) => {
            if (this._ref) {
                let { children, mode } = this.props;
                let nodes = this._ref.childNodes;
                let length = 1;
                if (Array.isArray(children)) {
                    length = children.length;
                }
                if (nodes.length === length * 2 - 1) {
                    let dividerChildren = [];
                    for (let i = 0; i < length; ++i) {
                        if (mode === 'vertical') {
                            dividerChildren.push({ size: nodes[i * 2].offsetHeight });
                        }
                        else {
                            dividerChildren.push({ size: nodes[i * 2].offsetWidth });
                        }
                    }
                    return {
                        element: this._ref,
                        beforeDivider: dividerChildren.slice(0, idx),
                        afterDivider: dividerChildren.slice(idx)
                    };
                }
            }
            return null;
        };
        this.changeSizes = (sizes) => {
            let { mode } = this.props;
            let nodes = this._ref.childNodes;
            if (nodes.length === sizes.length * 2 - 1) {
                for (let i = 0; i < sizes.length; ++i) {
                    if (mode === 'vertical') {
                        nodes[i * 2].style.height = `${sizes[i]}px`;
                    }
                    else {
                        nodes[i * 2].style.width = `${sizes[i]}px`;
                    }
                }
                this.forceUpdate();
            }
        };
    }
    render() {
        let _a = this.props, { children, mode, className } = _a, others = __rest(_a, ["children", "mode", "className"]);
        let isVertical = mode === 'vertical';
        let childrenRender = [];
        if (Array.isArray((children))) {
            for (let i = 0; i < children.length; ++i) {
                if (i > 0) {
                    childrenRender.push(react_1.default.createElement(Divider_1.Divider, { idx: i, key: i, isVertical: isVertical, getDividerData: this.getDividerData, changeSizes: this.changeSizes }));
                }
                childrenRender.push(children[i]);
            }
        }
        else {
            childrenRender = children;
        }
        let cls;
        if (mode === 'vertical') {
            cls = 'dock-box dock-vbox';
        }
        else {
            cls = 'dock-box dock-hbox';
        }
        if (className) {
            cls = `${cls} ${className}`;
        }
        return (react_1.default.createElement("div", Object.assign({ ref: this.getRef, className: cls }, others), childrenRender));
    }
}
exports.DividerBox = DividerBox;
DividerBox.contextType = DockData_1.DockContextType;
