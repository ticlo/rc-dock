import * as React from "react";
import { DockContextType, placeHolderStyle } from "./DockData";
import { DragDropDiv } from "./dragdrop/DragDropDiv";
import { DragState } from "./dragdrop/DragManager";
import classNames from "classnames";
import { mergeTabGroups } from "./Utils";
import { flushSync } from "react-dom";
export class DockDropSquare extends React.PureComponent {
    constructor() {
        super(...arguments);
        this.state = { dropping: false };
        this.onDragOver = (e) => {
            let { panelElement: targetElement, direction, depth, panelData } = this.props;
            flushSync(() => {
                this.setState({ dropping: true });
            });
            for (let i = 0; i < depth; ++i) {
                targetElement = targetElement.parentElement;
            }
            if (panelData.group === placeHolderStyle && direction !== 'float') {
                // place holder panel should always have full size drop rect
                this.context.setDropRect(targetElement, 'middle', this, e);
            }
            else {
                let dockId = this.context.getDockId();
                let panelSize = DragState.getData('panelSize', dockId);
                this.context.setDropRect(targetElement, direction, this, e, panelSize);
            }
            e.accept('');
        };
        this.onDragLeave = (e) => {
            queueMicrotask(() => {
                flushSync(() => {
                    this.setState({ dropping: false });
                });
            });
            this.context.setDropRect(null, 'remove', this);
        };
        this.onDrop = (e) => {
            let dockId = this.context.getDockId();
            let source = DragState.getData('tab', dockId);
            if (!source) {
                source = DragState.getData('panel', dockId);
            }
            if (source) {
                let { panelData, direction, depth } = this.props;
                let target = panelData;
                for (let i = 0; i < depth; ++i) {
                    target = target.parent;
                }
                this.context.dockMove(source, target, direction);
            }
        };
    }
    render() {
        let { direction, depth } = this.props;
        let { dropping } = this.state;
        let classes = ['dock-drop-square'];
        classes.push(`dock-drop-${direction}`);
        if (depth) {
            classes.push(`dock-drop-deep`);
        }
        if (dropping) {
            classes.push('dock-drop-square-dropping');
        }
        return (React.createElement(DragDropDiv, { className: classes.join(' '), onDragOverT: this.onDragOver, onDragLeaveT: this.onDragLeave, onDropT: this.onDrop },
            React.createElement("div", { className: classNames("dock-drop-square-box", this.context.getClassName()) })));
    }
    componentWillUnmount() {
        this.context.setDropRect(null, 'remove', this);
    }
}
DockDropSquare.contextType = DockContextType;
export class DockDropLayer extends React.PureComponent {
    static addDepthSquare(children, mode, panelData, panelElement, depth) {
        if (mode === 'horizontal') {
            children.push(React.createElement(DockDropSquare, { key: `top${depth}`, direction: "top", depth: depth, panelData: panelData, panelElement: panelElement }));
            children.push(React.createElement(DockDropSquare, { key: `bottom${depth}`, direction: "bottom", depth: depth, panelData: panelData, panelElement: panelElement }));
        }
        else {
            children.push(React.createElement(DockDropSquare, { key: `left${depth}`, direction: "left", depth: depth, panelData: panelData, panelElement: panelElement }));
            children.push(React.createElement(DockDropSquare, { key: `right${depth}`, direction: "right", depth: depth, panelData: panelData, panelElement: panelElement }));
        }
    }
    render() {
        var _a;
        let { panelData, panelElement, dropFromPanel } = this.props;
        let dockId = this.context.getDockId();
        let children = [];
        // check if it's whole panel dragging
        let draggingPanel = DragState.getData('panel', dockId);
        let draggingTab = DragState.getData('tab', dockId);
        let fromPanelGroup = mergeTabGroups(this.context.getGroup(dropFromPanel.group), dropFromPanel.localGroup);
        let fromTabGroup = mergeTabGroups(this.context.getGroup(draggingTab === null || draggingTab === void 0 ? void 0 : draggingTab.group), draggingTab === null || draggingTab === void 0 ? void 0 : draggingTab.localGroup);
        if (fromPanelGroup.floatable !== false && (fromTabGroup === null || fromTabGroup === void 0 ? void 0 : fromTabGroup.floatable) !== false &&
            (!draggingPanel ||
                (!draggingPanel.panelLock && // panel with panelLock can't float
                    ((_a = draggingPanel.parent) === null || _a === void 0 ? void 0 : _a.mode) !== 'float' && // don't show float drop when over a float panel
                    !(fromPanelGroup.floatable === 'singleTab' && draggingPanel.tabs.length > 1) // singleTab can float only with one tab
                ))) {
            children.push(React.createElement(DockDropSquare, { key: "float", direction: "float", panelData: panelData, panelElement: panelElement }));
        }
        if (draggingPanel !== panelData && !fromPanelGroup.disableDock) { // don't drop panel to itself
            // 4 direction base drag square
            DockDropLayer.addDepthSquare(children, 'horizontal', panelData, panelElement, 0);
            DockDropLayer.addDepthSquare(children, 'vertical', panelData, panelElement, 0);
            if (!(draggingPanel === null || draggingPanel === void 0 ? void 0 : draggingPanel.panelLock) && panelData.group === dropFromPanel.group && panelData !== dropFromPanel) {
                // dock to tabs
                children.push(React.createElement(DockDropSquare, { key: "middle", direction: "middle", panelData: panelData, panelElement: panelElement }));
            }
            let box = panelData.parent;
            if (box && box.children.length > 1) {
                // deeper drop
                DockDropLayer.addDepthSquare(children, box.mode, panelData, panelElement, 1);
                if (box.parent) {
                    DockDropLayer.addDepthSquare(children, box.parent.mode, panelData, panelElement, 2);
                }
            }
        }
        return (React.createElement("div", { className: classNames("dock-drop-layer", this.context.getClassName()), style: {
                top: panelData.tabPosition === "top" ? panelData.headerSize : 0,
                bottom: panelData.tabPosition === "bottom" ? panelData.headerSize : 0,
                left: panelData.tabPosition === "left" ? panelData.headerSize : 0,
                right: panelData.tabPosition === "right" ? panelData.headerSize : 0
            } }, children));
    }
}
DockDropLayer.contextType = DockContextType;
