var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};
import React from "react";
import SaveRef from 'rc-tabs/lib/SaveRef';
import ScrollableTabBarNode from 'rc-tabs/lib/ScrollableTabBarNode';
import TabBarTabsNode from 'rc-tabs/lib/TabBarTabsNode';
import InkTabBarNode from 'rc-tabs/lib/InkTabBarNode';
import { DragInitiator } from "./DragInitiator";
export class DockTabBarRootNode extends React.PureComponent {
    render() {
        const _a = this.props, { onKeyDown, extraContent, style, children, onDragMoveInit, onHtmlDrag } = _a, restProps = __rest(_a, ["onKeyDown", "extraContent", "style", "children", "onDragMoveInit", "onHtmlDrag"]);
        const tabBarExtraContentStyle = { float: 'right' };
        const extraContentStyle = (extraContent && extraContent.props) ? extraContent.props.style : {};
        let newChildren = children;
        if (extraContent) {
            newChildren = [
                React.cloneElement(extraContent, {
                    key: 'extra',
                    style: Object.assign({}, tabBarExtraContentStyle, extraContentStyle),
                }),
                React.cloneElement(children, { key: 'content' }),
            ];
        }
        return (React.createElement(DragInitiator, { onDragInit: onDragMoveInit, onDrag: onHtmlDrag, draggable: onHtmlDrag != null, role: "tablist", className: 'dock-tabs-bar', tabIndex: 0, ref: this.props.saveRef('root'), onKeyDown: onKeyDown, style: style }, newChildren));
    }
}
export class DockTabBar extends React.PureComponent {
    render() {
        const _a = this.props, { children: renderTabBarNode, onDragMoveInit, onHtmlDrag } = _a, restProps = __rest(_a, ["children", "onDragMoveInit", "onHtmlDrag"]);
        return (React.createElement(SaveRef, null, (saveRef, getRef) => (React.createElement(DockTabBarRootNode, Object.assign({ saveRef: saveRef, onDragMoveInit: onDragMoveInit, onHtmlDrag: onHtmlDrag }, restProps),
            React.createElement(ScrollableTabBarNode, Object.assign({ saveRef: saveRef, getRef: getRef }, restProps),
                React.createElement(TabBarTabsNode, Object.assign({ saveRef: saveRef, renderTabBarNode: renderTabBarNode }, restProps)),
                React.createElement(InkTabBarNode, Object.assign({ saveRef: saveRef, getRef: getRef }, restProps)))))));
    }
}
//# sourceMappingURL=DockTabBar.js.map