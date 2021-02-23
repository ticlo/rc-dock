"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DockBox = void 0;
const react_1 = __importDefault(require("react"));
const DockData_1 = require("./DockData");
const Divider_1 = require("./Divider");
const DockPanel_1 = require("./DockPanel");
class DockBox extends react_1.default.PureComponent {
    constructor() {
        super(...arguments);
        this.getRef = (r) => {
            this._ref = r;
        };
        this.getDividerData = (idx) => {
            if (this._ref) {
                let { children, mode } = this.props.boxData;
                let nodes = this._ref.childNodes;
                if (nodes.length === children.length * 2 - 1) {
                    let dividerChildren = [];
                    for (let i = 0; i < children.length; ++i) {
                        if (mode === 'vertical') {
                            dividerChildren.push({ size: nodes[i * 2].offsetHeight, minSize: children[i].minHeight });
                        }
                        else {
                            dividerChildren.push({ size: nodes[i * 2].offsetWidth, minSize: children[i].minWidth });
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
            let { children } = this.props.boxData;
            if (children.length === sizes.length) {
                for (let i = 0; i < children.length; ++i) {
                    children[i].size = sizes[i];
                }
                this.forceUpdate();
            }
        };
        this.onDragEnd = () => {
            this.context.onSilentChange();
        };
    }
    render() {
        let { boxData } = this.props;
        let { minWidth, minHeight, size, children, mode, id } = boxData;
        let isVertical = mode === 'vertical';
        let childrenRender = [];
        for (let i = 0; i < children.length; ++i) {
            if (i > 0) {
                childrenRender.push(react_1.default.createElement(Divider_1.Divider, { idx: i, key: i, isVertical: isVertical, onDragEnd: this.onDragEnd, getDividerData: this.getDividerData, changeSizes: this.changeSizes }));
            }
            let child = children[i];
            if ('tabs' in child) {
                childrenRender.push(react_1.default.createElement(DockPanel_1.DockPanel, { size: child.size, panelData: child, key: child.id }));
                // render DockPanel
            }
            else if ('children' in child) {
                childrenRender.push(react_1.default.createElement(DockBox, { size: child.size, boxData: child, key: child.id }));
            }
        }
        let cls;
        if (mode === 'vertical') {
            cls = 'dock-box dock-vbox';
        }
        else {
            cls = 'dock-box dock-hbox';
        }
        return (react_1.default.createElement("div", { ref: this.getRef, className: cls, "data-dockid": id, style: { minWidth, minHeight, flex: `${size} 1 ${size}px` } }, childrenRender));
    }
}
exports.DockBox = DockBox;
DockBox.contextType = DockData_1.DockContextType;
