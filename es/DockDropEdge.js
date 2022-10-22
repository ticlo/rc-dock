import * as React from "react";
import { DockContextType } from "./DockData";
import { DragDropDiv } from "./dragdrop/DragDropDiv";
import { DragState } from "./dragdrop/DragManager";
export class DockDropEdge extends React.PureComponent {
    constructor() {
        super(...arguments);
        this.getRef = (r) => {
            this._ref = r;
        };
        this.onDragOver = (e) => {
            var _a, _b, _c;
            let { panelData, panelElement, dropFromPanel } = this.props;
            let dockId = this.context.getDockId();
            let draggingPanel = DragState.getData('panel', dockId);
            let fromGroup = this.context.getGroup(dropFromPanel.group);
            if (draggingPanel && ((_a = draggingPanel.parent) === null || _a === void 0 ? void 0 : _a.mode) === 'float') {
                // ignore float panel in edge mode
                return;
            }
            let { direction, mode, depth } = this.getDirection(e, fromGroup, draggingPanel === panelData, (_c = (_b = draggingPanel === null || draggingPanel === void 0 ? void 0 : draggingPanel.tabs) === null || _b === void 0 ? void 0 : _b.length) !== null && _c !== void 0 ? _c : 1);
            depth = this.getActualDepth(depth, mode, direction);
            if (!direction || (direction === 'float' && dropFromPanel.panelLock)) {
                this.context.setDropRect(null, 'remove', this);
                return;
            }
            let targetElement = panelElement;
            for (let i = 0; i < depth; ++i) {
                targetElement = targetElement.parentElement;
            }
            let panelSize = DragState.getData('panelSize', dockId);
            this.context.setDropRect(targetElement, direction, this, e, panelSize);
            e.accept('');
        };
        this.onDragLeave = (e) => {
            this.context.setDropRect(null, 'remove', this);
        };
        this.onDrop = (e) => {
            var _a, _b;
            let { panelData, dropFromPanel } = this.props;
            let dockId = this.context.getDockId();
            let fromGroup = this.context.getGroup(dropFromPanel.group);
            let source = DragState.getData('tab', dockId);
            let draggingPanel = DragState.getData('panel', dockId);
            if (!source) {
                source = draggingPanel;
            }
            if (source) {
                let { direction, mode, depth } = this.getDirection(e, fromGroup, draggingPanel === panelData, (_b = (_a = draggingPanel === null || draggingPanel === void 0 ? void 0 : draggingPanel.tabs) === null || _a === void 0 ? void 0 : _a.length) !== null && _b !== void 0 ? _b : 1);
                depth = this.getActualDepth(depth, mode, direction);
                if (!direction) {
                    return;
                }
                let target = panelData;
                for (let i = 0; i < depth; ++i) {
                    target = target.parent;
                }
                this.context.dockMove(source, target, direction);
            }
        };
    }
    getDirection(e, group, samePanel, tabLength) {
        let rect = this._ref.getBoundingClientRect();
        let widthRate = Math.min(rect.width, 500);
        let heightRate = Math.min(rect.height, 500);
        let left = (e.clientX - rect.left) / widthRate;
        let right = (rect.right - e.clientX) / widthRate;
        let top = (e.clientY - rect.top) / heightRate;
        let bottom = (rect.bottom - e.clientY) / heightRate;
        let min = Math.min(left, right, top, bottom);
        let depth = 0;
        if (group.disableDock || samePanel) {
            // use an impossible min value to disable dock drop
            min = 1;
        }
        if (min < 0) {
            return { direction: null, depth: 0 };
        }
        else if (min < 0.075) {
            depth = 3; // depth 3 or 4
        }
        else if (min < 0.15) {
            depth = 1; // depth 1 or 2
        }
        else if (min < 0.3) {
            // default
        }
        else if (group.floatable) {
            if (group.floatable === 'singleTab') {
                if (tabLength === 1) {
                    // singleTab can float only with one tab
                    return { direction: 'float', mode: 'float', depth: 0 };
                }
            }
            else {
                return { direction: 'float', mode: 'float', depth: 0 };
            }
        }
        switch (min) {
            case left: {
                return { direction: 'left', mode: 'horizontal', depth };
            }
            case right: {
                return { direction: 'right', mode: 'horizontal', depth };
            }
            case top: {
                return { direction: 'top', mode: 'vertical', depth };
            }
            case bottom: {
                return { direction: 'bottom', mode: 'vertical', depth };
            }
        }
        // probably a invalid input causing everything to be NaN?
        return { direction: null, depth: 0 };
    }
    getActualDepth(depth, mode, direction) {
        let afterPanel = (direction === 'bottom' || direction === 'right');
        if (!depth) {
            return depth;
        }
        let { panelData } = this.props;
        let previousTarget = panelData;
        let targetBox = panelData.parent;
        let lastDepth = 0;
        if (panelData.parent.mode === mode) {
            ++depth;
        }
        while (targetBox && lastDepth < depth) {
            if (targetBox.mode === mode) {
                if (afterPanel) {
                    if (targetBox.children.at(-1) !== previousTarget) {
                        // dont go deeper if current target is on different side of the box
                        break;
                    }
                }
                else {
                    if (targetBox.children[0] !== previousTarget) {
                        // dont go deeper if current target is on different side of the box
                        break;
                    }
                }
            }
            previousTarget = targetBox;
            targetBox = targetBox.parent;
            ++lastDepth;
        }
        while (depth > lastDepth) {
            depth -= 2;
        }
        return depth;
    }
    render() {
        return (React.createElement(DragDropDiv, { getRef: this.getRef, className: "dock-drop-edge", onDragOverT: this.onDragOver, onDragLeaveT: this.onDragLeave, onDropT: this.onDrop }));
    }
    componentWillUnmount() {
        this.context.setDropRect(null, 'remove', this);
    }
}
DockDropEdge.contextType = DockContextType;
