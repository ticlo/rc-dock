import React from "react";
import { DragDropDiv } from "./dragdrop/DragDropDiv";
export function DockTabBar(props) {
    const { onDragStart, onDragMove, onDragEnd, TabNavList, ...restProps } = props;
    return (React.createElement(DragDropDiv, { onDragStartT: onDragStart, onDragMoveT: onDragMove, onDragEndT: onDragEnd, role: "tablist", className: 'dock-bar', tabIndex: 0 },
        React.createElement(TabNavList, Object.assign({}, restProps))));
}
