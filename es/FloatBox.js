import React from "react";
import { DockContextType } from "./DockData";
import { DockPanel } from "./DockPanel";
import classNames from "classnames";
export class FloatBox extends React.PureComponent {
    render() {
        let { children } = this.props.boxData;
        let childrenRender = [];
        for (let child of children) {
            if ('tabs' in child) {
                childrenRender.push(React.createElement(DockPanel, { size: child.size, panelData: child, key: child.id }));
            }
        }
        return (React.createElement("div", { className: classNames("dock-box dock-fbox", this.context.getClassName()) }, childrenRender));
    }
}
FloatBox.contextType = DockContextType;
