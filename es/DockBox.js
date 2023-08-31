import React from "react";
import { DockContextType } from "./DockData";
import { Divider } from "./Divider";
import { DockPanel } from "./DockPanel";
import classNames from "classnames";
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
                }
            }
            return null;
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
            if (children.length === sizes.length) {
                for (let i = 0; i < children.length; ++i) {
                    if (!children[i].collapsed) {
                        children[i].size = sizes[i];
                    }
                }
                this.forceUpdate();
            }
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
        if (!('tabs' in lastChild)) {
            return;
        }
        const firstTab = lastChild.tabs[0];
        firstTab.collapsed = false;
        this.context.updateTab(firstTab.id, firstTab, false);
    }
    render() {
        let { boxData, preferredWidth, preferredHeight } = this.props;
        let { minWidth, minHeight, size, children, mode, id, widthFlex, heightFlex } = boxData;
        let isVertical = mode === 'vertical';
        let childrenRender = [];
        const isCollapseDisabled = this.getExpandedPanelsCount() === 1;
        for (let i = 0; i < children.length; ++i) {
            if (i > 0) {
                childrenRender.push(React.createElement(Divider, { idx: i, key: i, isVertical: isVertical, onDragEnd: this.onDragEnd, getDividerData: this.getDividerData, changeSizes: this.changeSizes, setIgnorePreferredSize: this.setIgnorePreferredSize }));
            }
            let child = children[i];
            if ('tabs' in child) {
                childrenRender.push(React.createElement(DockPanel, { size: child.size, preferredWidth: !child.ignorePreferredSize ? child.preferredWidth : undefined, preferredHeight: !child.ignorePreferredSize ? child.preferredHeight : undefined, panelData: child, key: child.id, isCollapseDisabled: isCollapseDisabled }));
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
        return (React.createElement("div", { ref: this.getRef, className: classNames(cls, this.context.getClassName()), "data-dockid": id, style: { minWidth, minHeight, flex: `${flexGrow} ${flexShrink} ${size}px` } }, childrenRender));
    }
}
DockBox.contextType = DockContextType;
