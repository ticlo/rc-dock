import React from "react";
import { Divider } from "./Divider";
import { DockPanel } from "./DockPanel";
export class DockBox extends React.PureComponent {
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
    }
    render() {
        let { boxData } = this.props;
        let { minWidth, minHeight, size, children, mode, id } = boxData;
        let isVertical = mode === 'vertical';
        console.log(`box render ${id}`);
        let childrenRender = [];
        for (let i = 0; i < children.length; ++i) {
            if (i > 0) {
                childrenRender.push(React.createElement(Divider, { idx: i, key: i, isVertical: isVertical, getDividerData: this.getDividerData, changeSizes: this.changeSizes }));
            }
            let child = children[i];
            if ('tabs' in child) {
                childrenRender.push(React.createElement(DockPanel, { size: child.size, panelData: child, key: child.id }));
                // render DockPanel
            }
            else if ('children' in child) {
                childrenRender.push(React.createElement(DockBox, { size: child.size, boxData: child, key: child.id }));
            }
        }
        let cls;
        if (mode === 'vertical') {
            cls = 'dock-box dock-vbox';
        }
        else {
            cls = 'dock-box dock-hbox';
        }
        return (React.createElement("div", { ref: this.getRef, className: cls, "data-dockid": id, style: { minWidth, minHeight, flex: `${size} 1 ${size}px` } }, childrenRender));
    }
}
//# sourceMappingURL=DockBox.js.map