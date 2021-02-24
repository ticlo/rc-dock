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
import React from "react";
import { DragDropDiv } from "./dragdrop/DragDropDiv";
export function DockTabBar(props) {
    const { onDragStart, onDragMove, onDragEnd, TabNavList } = props, restProps = __rest(props, ["onDragStart", "onDragMove", "onDragEnd", "TabNavList"]);
    return (React.createElement(DragDropDiv, { onDragStartT: onDragStart, onDragMoveT: onDragMove, onDragEndT: onDragEnd, role: "tablist", className: 'dock-bar', tabIndex: 0 },
        React.createElement(TabNavList, Object.assign({}, restProps))));
}
