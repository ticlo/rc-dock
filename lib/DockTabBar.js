"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const SaveRef_1 = __importDefault(require("rc-tabs/lib/SaveRef"));
const ScrollableTabBarNode_1 = __importDefault(require("rc-tabs/lib/ScrollableTabBarNode"));
const TabBarTabsNode_1 = __importDefault(require("rc-tabs/lib/TabBarTabsNode"));
const InkTabBarNode_1 = __importDefault(require("rc-tabs/lib/InkTabBarNode"));
const DragDropDiv_1 = require("./dragdrop/DragDropDiv");
class DockTabBarRootNode extends react_1.default.PureComponent {
    render() {
        const { onKeyDown, extraContent, style, children, onDragStart, onDragMove, onDragEnd, ...restProps } = this.props;
        const tabBarExtraContentStyle = { float: 'right' };
        const extraContentStyle = (extraContent && extraContent.props) ? extraContent.props.style : {};
        let newChildren = children;
        if (extraContent) {
            newChildren = [
                react_1.default.cloneElement(extraContent, {
                    key: 'extra',
                    style: {
                        ...tabBarExtraContentStyle,
                        ...extraContentStyle,
                    },
                }),
                react_1.default.cloneElement(children, { key: 'content' }),
            ];
        }
        return (react_1.default.createElement(DragDropDiv_1.DragDropDiv, { onDragStartT: onDragStart, onDragMoveT: onDragMove, onDragEndT: onDragEnd, role: "tablist", className: 'dock-bar', tabIndex: 0, getRef: this.props.saveRef('root'), onKeyDown: onKeyDown, style: style }, newChildren));
    }
}
class DockTabBar extends react_1.default.PureComponent {
    render() {
        const { children: renderTabBarNode, onDragStart, onDragMove, onDragEnd, extraContent, ...restProps } = this.props;
        return (react_1.default.createElement(SaveRef_1.default, null, (saveRef, getRef) => (react_1.default.createElement(DockTabBarRootNode, Object.assign({ saveRef: saveRef, onDragStart: onDragStart, onDragMove: onDragMove, onDragEnd: onDragEnd, extraContent: extraContent }, restProps),
            react_1.default.createElement(ScrollableTabBarNode_1.default, Object.assign({ saveRef: saveRef, getRef: getRef }, restProps),
                react_1.default.createElement(TabBarTabsNode_1.default, Object.assign({ saveRef: saveRef, renderTabBarNode: renderTabBarNode }, restProps)),
                react_1.default.createElement(InkTabBarNode_1.default, Object.assign({ saveRef: saveRef, getRef: getRef }, restProps)))))));
    }
}
exports.DockTabBar = DockTabBar;
