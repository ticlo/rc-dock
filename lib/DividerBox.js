"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.DividerBox = void 0;
const React = __importStar(require("react"));
const DockData_1 = require("./DockData");
const Divider_1 = require("./Divider");
class DividerBox extends React.PureComponent {
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
                    childrenRender.push(React.createElement(Divider_1.Divider, { idx: i, key: i, isVertical: isVertical, getDividerData: this.getDividerData, changeSizes: this.changeSizes }));
                }
                childrenRender.push(children[i]);
            }
        }
        else {
            childrenRender = children;
        }
        let cls;
        if (mode === 'vertical') {
            cls = 'divider-box dock-vbox';
        }
        else {
            cls = 'divider-box dock-hbox';
        }
        if (className) {
            cls = `${cls} ${className}`;
        }
        return (React.createElement("div", Object.assign({ ref: this.getRef, className: cls }, others), childrenRender));
    }
}
exports.DividerBox = DividerBox;
DividerBox.contextType = DockData_1.DockContextType;
