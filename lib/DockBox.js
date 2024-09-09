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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DockBox = void 0;
const React = __importStar(require("react"));
const DockData_1 = require("./DockData");
const Divider_1 = require("./Divider");
const DockPanel_1 = require("./DockPanel");
const classnames_1 = __importDefault(require("classnames"));
const react_dom_1 = require("react-dom");
class DockBox extends React.PureComponent {
    constructor() {
        super(...arguments);
        this.getRef = (r) => {
            this._ref = r;
        };
        this.getDividerData = (idx) => {
            if (!this._ref) {
                return null;
            }
            let { children, mode } = this.props.boxData;
            let nodes = this._ref.childNodes;
            if (nodes.length !== children.length * 2 - 1) {
                return;
            }
            let dividerChildren = [];
            for (let i = 0; i < children.length; ++i) {
                const child = children[i];
                if (mode === 'vertical') {
                    dividerChildren.push({ size: nodes[i * 2].offsetHeight, minSize: child.minHeight, collapsed: child.collapsed });
                }
                else {
                    dividerChildren.push({ size: nodes[i * 2].offsetWidth, minSize: child.minWidth, collapsed: child.collapsed });
                }
            }
            return {
                element: this._ref,
                beforeDivider: dividerChildren.slice(0, idx),
                afterDivider: dividerChildren.slice(idx)
            };
        };
        this.setIgnorePreferredSize = (idx) => {
            if (!this._ref) {
                return;
            }
            let { children } = this.props.boxData;
            let nodes = this._ref.childNodes;
            if (nodes.length === children.length * 2 - 1) {
                const leftChild = children[idx - 1];
                const rightChild = children[idx];
                leftChild.ignorePreferredSize = true;
                rightChild.ignorePreferredSize = true;
            }
        };
        this.changeSizes = (sizes) => {
            let { children } = this.props.boxData;
            if (children.length !== sizes.length) {
                return;
            }
            for (let i = 0; i < children.length; ++i) {
                if (!children[i].collapsed) {
                    children[i].size = sizes[i];
                }
            }
            react_dom_1.flushSync(() => {
                this.forceUpdate();
            });
        };
        this.onDragEnd = () => {
            this.context.onSilentChange(null, 'move');
        };
    }
    getExpandedPanelsCount() {
        const { children } = this.props.boxData;
        return children.filter(panel => !panel.collapsed).length;
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.getExpandedPanelsCount() !== 0) {
            return;
        }
        const { children } = this.props.boxData;
        const lastChild = children[children.length - 1];
        if (!lastChild) {
            return;
        }
        if (!('tabs' in lastChild)) {
            return;
        }
        const firstTab = lastChild.tabs[0];
        firstTab.collapsed = false;
        this.context.updateTab(firstTab.id, firstTab, false, 'configure-tab');
    }
    hasDockedChildren(children) {
        if (!(children === null || children === void 0 ? void 0 : children.length)) {
            return false;
        }
        for (const child of children) {
            if (!('children' in child)) {
                return true;
            }
            if (this.hasDockedChildren(child.children)) {
                return true;
            }
        }
        return false;
    }
    render() {
        let { boxData, preferredWidth, preferredHeight } = this.props;
        let { minWidth, minHeight, size, children, mode, id, widthFlex, heightFlex } = boxData;
        let isVertical = mode === 'vertical';
        let childrenRender = [];
        const isCollapseDisabled = this.getExpandedPanelsCount() === 1;
        for (let i = 0; i < children.length; ++i) {
            if (i > 0) {
                childrenRender.push(React.createElement(Divider_1.Divider, { idx: i, key: i, isVertical: isVertical, onDragEnd: this.onDragEnd, getDividerData: this.getDividerData, changeSizes: this.changeSizes, setIgnorePreferredSize: this.setIgnorePreferredSize }));
            }
            let child = children[i];
            if ('tabs' in child) {
                childrenRender.push(React.createElement(DockPanel_1.DockPanel, { size: child.size, preferredWidth: !child.ignorePreferredSize ? child.preferredWidth : undefined, preferredHeight: !child.ignorePreferredSize ? child.preferredHeight : undefined, panelData: child, key: child.id, isCollapseDisabled: isCollapseDisabled }));
                // render DockPanel
            }
            else if ('children' in child) {
                childrenRender.push(React.createElement(DockBox, { size: child.size, preferredWidth: !child.ignorePreferredSize ? child.preferredWidth : undefined, preferredHeight: !child.ignorePreferredSize ? child.preferredHeight : undefined, boxData: child, key: child.id }));
            }
        }
        let cls;
        let flex = 1;
        if (mode === 'vertical') {
            cls = 'dock-box dock-vbox';
            if (widthFlex != null) {
                flex = widthFlex;
            }
        }
        else {
            // since special boxes dont reuse this render function, this can only be horizontal box
            cls = 'dock-box dock-hbox';
            if (heightFlex != null) {
                flex = heightFlex;
            }
        }
        let flexGrow = flex * size * 1000000;
        let flexShrink = flex * 1000000;
        if (flexShrink < 1) {
            flexShrink = 1;
        }
        if (isVertical && preferredWidth != null) {
            flexGrow = 1;
            flexShrink = 1;
            size = preferredWidth;
        }
        else if (!isVertical && preferredHeight != null) {
            flexGrow = 1;
            flexShrink = 1;
            size = preferredHeight;
        }
        const style = { minWidth, minHeight };
        if (this.hasDockedChildren(children)) {
            style.flex = `${flexGrow} ${flexShrink} ${size}px`;
        }
        return (React.createElement("div", { ref: this.getRef, className: classnames_1.default(cls, this.context.getClassName()), "data-dockid": id, style: style }, childrenRender));
    }
}
exports.DockBox = DockBox;
DockBox.contextType = DockData_1.DockContextType;
