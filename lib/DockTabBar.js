"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const SaveRef_1 = __importDefault(require("rc-tabs/lib/SaveRef"));
const ScrollableTabBarNode_1 = __importDefault(require("rc-tabs/lib/ScrollableTabBarNode"));
const TabBarTabsNode_1 = __importDefault(require("rc-tabs/lib/TabBarTabsNode"));
const InkTabBarNode_1 = __importDefault(require("rc-tabs/lib/InkTabBarNode"));
const DragInitiator_1 = require("./DragInitiator");
class DockTabBarRootNode extends react_1.default.PureComponent {
    render() {
        const _a = this.props, { onKeyDown, extraContent, style, children, onDragMoveInit, onHtmlDrag } = _a, restProps = __rest(_a, ["onKeyDown", "extraContent", "style", "children", "onDragMoveInit", "onHtmlDrag"]);
        const tabBarExtraContentStyle = { float: 'right' };
        const extraContentStyle = (extraContent && extraContent.props) ? extraContent.props.style : {};
        let newChildren = children;
        if (extraContent) {
            newChildren = [
                react_1.default.cloneElement(extraContent, {
                    key: 'extra',
                    style: Object.assign({}, tabBarExtraContentStyle, extraContentStyle),
                }),
                react_1.default.cloneElement(children, { key: 'content' }),
            ];
        }
        return (react_1.default.createElement(DragInitiator_1.DragInitiator, { onDragInit: onDragMoveInit, onDrag: onHtmlDrag, draggable: onHtmlDrag != null, role: "tablist", className: 'dock-bar', tabIndex: 0, ref: this.props.saveRef('root'), onKeyDown: onKeyDown, style: style }, newChildren));
    }
}
exports.DockTabBarRootNode = DockTabBarRootNode;
class DockTabBar extends react_1.default.PureComponent {
    render() {
        const _a = this.props, { children: renderTabBarNode, onDragMoveInit, onHtmlDrag } = _a, restProps = __rest(_a, ["children", "onDragMoveInit", "onHtmlDrag"]);
        return (react_1.default.createElement(SaveRef_1.default, null, (saveRef, getRef) => (react_1.default.createElement(DockTabBarRootNode, Object.assign({ saveRef: saveRef, onDragMoveInit: onDragMoveInit, onHtmlDrag: onHtmlDrag }, restProps),
            react_1.default.createElement(ScrollableTabBarNode_1.default, Object.assign({ saveRef: saveRef, getRef: getRef }, restProps),
                react_1.default.createElement(TabBarTabsNode_1.default, Object.assign({ saveRef: saveRef, renderTabBarNode: renderTabBarNode }, restProps)),
                react_1.default.createElement(InkTabBarNode_1.default, Object.assign({ saveRef: saveRef, getRef: getRef }, restProps)))))));
    }
}
exports.DockTabBar = DockTabBar;
//# sourceMappingURL=DockTabBar.js.map