import React from "react";
import { DockContextType } from "./DockData";
import { DockTabs } from "./DockTabs";
import { DragDropDiv } from "./dragdrop/DragDropDiv";
import { DragState } from "./dragdrop/DragManager";
import { DockDropLayer } from "./DockDropLayer";
import { getFloatPanelSize, nextZIndex } from "./Algorithm";
import { DockDropEdge } from "./DockDropEdge";
export class DockPanel extends React.PureComponent {
    constructor() {
        super(...arguments);
        this.getRef = (r) => {
            this._ref = r;
        };
        this.state = { dropFromPanel: null, draggingHeader: false };
        this.onDragOver = (e) => {
            if (DockPanel._droppingPanel === this) {
                return;
            }
            let { panelData } = this.props;
            let dockId = this.context.getDockId();
            let tab = DragState.getData('tab', dockId);
            let panel = DragState.getData('panel', dockId);
            if (tab || panel) {
                DockPanel.droppingPanel = this;
            }
            if (tab) {
                if (tab.parent) {
                    this.setState({ dropFromPanel: tab.parent });
                }
                else {
                    // add a fake panel
                    this.setState({ dropFromPanel: { activeId: '', tabs: [], group: tab.group } });
                }
            }
            else if (panel) {
                this.setState({ dropFromPanel: panel });
            }
        };
        // drop to move in float mode
        this.onPanelHeaderDragStart = (event) => {
            let { panelData } = this.props;
            let { parent, x, y, z } = panelData;
            let dockId = this.context.getDockId();
            if (parent && parent.mode === 'float') {
                this._movingX = x;
                this._movingY = y;
                // hide the panel, but not create drag layer element
                event.setData({ panel: this.props.panelData }, dockId);
                event.startDrag(null, null);
                this.onFloatPointerDown();
            }
            else {
                let tabGroup = this.context.getGroup(panelData.group);
                let [panelWidth, panelHeight] = getFloatPanelSize(this._ref, tabGroup);
                event.setData({ panel: panelData, panelSize: [panelWidth, panelHeight] }, dockId);
                event.startDrag(null);
            }
            this.setState({ draggingHeader: true });
        };
        this.onPanelHeaderDragMove = (e) => {
            let { width, height } = this.context.getLayoutSize();
            let { panelData } = this.props;
            panelData.x = this._movingX + e.dx;
            panelData.y = this._movingY + e.dy;
            if (width > 200 && height > 200) {
                if (panelData.y < 0) {
                    panelData.y = 0;
                }
                else if (panelData.y > height - 16) {
                    panelData.y = height - 16;
                }
                if (panelData.x + panelData.w < 16) {
                    panelData.x = 16 - panelData.w;
                }
                else if (panelData.x > width - 16) {
                    panelData.x = width - 16;
                }
            }
            this.forceUpdate();
        };
        this.onPanelHeaderDragEnd = (e) => {
            if (!this._unmounted) {
                this.setState({ draggingHeader: false });
                this.context.onSilentChange(this.props.panelData.activeId, 'move');
            }
        };
        this.onPanelCornerDragTL = (e) => {
            this.onPanelCornerDrag(e, 'tl');
        };
        this.onPanelCornerDragTR = (e) => {
            this.onPanelCornerDrag(e, 'tr');
        };
        this.onPanelCornerDragBL = (e) => {
            this.onPanelCornerDrag(e, 'bl');
        };
        this.onPanelCornerDragBR = (e) => {
            this.onPanelCornerDrag(e, 'br');
        };
        this.onPanelCornerDragMove = (e) => {
            let { panelData } = this.props;
            let { dx, dy } = e;
            if (this._movingCorner.startsWith('t')) {
                // when moving top corners, dont let it move header out of screen
                let { width, height } = this.context.getLayoutSize();
                if (this._movingY + dy < 0) {
                    dy = -this._movingY;
                }
                else if (this._movingY + dy > height - 16) {
                    dy = height - 16 - this._movingY;
                }
            }
            switch (this._movingCorner) {
                case 'tl': {
                    panelData.x = this._movingX + dx;
                    panelData.w = this._movingW - dx;
                    panelData.y = this._movingY + dy;
                    panelData.h = this._movingH - dy;
                    break;
                }
                case 'tr': {
                    panelData.w = this._movingW + dx;
                    panelData.y = this._movingY + dy;
                    panelData.h = this._movingH - dy;
                    break;
                }
                case 'bl': {
                    panelData.x = this._movingX + dx;
                    panelData.w = this._movingW - dx;
                    panelData.h = this._movingH + dy;
                    break;
                }
                case 'br': {
                    panelData.w = this._movingW + dx;
                    panelData.h = this._movingH + dy;
                    break;
                }
            }
            this.forceUpdate();
        };
        this.onPanelCornerDragEnd = (e) => {
            this.context.onSilentChange(this.props.panelData.activeId, 'move');
        };
        this.onFloatPointerDown = () => {
            let { panelData } = this.props;
            let { z } = panelData;
            let newZ = nextZIndex(z);
            if (newZ !== z) {
                panelData.z = newZ;
                this.forceUpdate();
            }
        };
        this.onPanelClicked = () => {
            if (!this._ref.contains(this._ref.ownerDocument.activeElement)) {
                this._ref.querySelector('.dock-bar').focus();
            }
        };
        this._unmounted = false;
    }
    static set droppingPanel(panel) {
        if (DockPanel._droppingPanel === panel) {
            return;
        }
        if (DockPanel._droppingPanel) {
            DockPanel._droppingPanel.onDragOverOtherPanel();
        }
        DockPanel._droppingPanel = panel;
    }
    onDragOverOtherPanel() {
        if (this.state.dropFromPanel) {
            this.setState({ dropFromPanel: null });
        }
    }
    onPanelCornerDrag(e, corner) {
        let { parent, x, y, w, h } = this.props.panelData;
        if (parent && parent.mode === 'float') {
            this._movingCorner = corner;
            this._movingX = x;
            this._movingY = y;
            this._movingW = w;
            this._movingH = h;
            e.startDrag(null, null);
        }
    }
    render() {
        let { dropFromPanel, draggingHeader } = this.state;
        let { panelData, size } = this.props;
        let { minWidth, minHeight, group: styleName, id, parent, panelLock } = panelData;
        if (panelLock) {
            if (panelLock.panelStyle) {
                styleName = panelLock.panelStyle;
            }
        }
        let panelClass;
        if (styleName) {
            panelClass = styleName
                .split(' ')
                .map((name) => `dock-style-${name}`)
                .join(' ');
        }
        let isMax = parent && parent.mode === 'maximize';
        let isFloat = parent && parent.mode === 'float';
        let pointerDownCallback = this.onFloatPointerDown;
        let onPanelHeaderDragStart = this.onPanelHeaderDragStart;
        if (!isFloat || isMax) {
            pointerDownCallback = null;
        }
        if (isMax) {
            dropFromPanel = null;
            onPanelHeaderDragStart = null;
        }
        let cls = `dock-panel ${panelClass ? panelClass : ''}${dropFromPanel ? ' dock-panel-dropping' : ''}${draggingHeader ? ' dragging' : ''}`;
        let style = { minWidth, minHeight, flex: `${size} 1 ${size}px` };
        if (isFloat) {
            style.left = panelData.x;
            style.top = panelData.y;
            style.width = panelData.w;
            style.height = panelData.h;
            style.zIndex = panelData.z;
        }
        let droppingLayer;
        if (dropFromPanel) {
            let tabGroup = this.context.getGroup(dropFromPanel.group);
            let dockId = this.context.getDockId();
            if (!tabGroup.tabLocked || DragState.getData('tab', dockId) == null) {
                // not allowed locked tab to create new panel
                let DockDropClass = this.context.useEdgeDrop() ? DockDropEdge : DockDropLayer;
                droppingLayer = React.createElement(DockDropClass, { panelData: panelData, panelElement: this._ref, dropFromPanel: dropFromPanel });
            }
        }
        return (React.createElement(DragDropDiv, { getRef: this.getRef, className: cls, style: style, "data-dockid": id, onMouseDownCapture: pointerDownCallback, onTouchStartCapture: pointerDownCallback, onDragOverT: isFloat ? null : this.onDragOver, onClick: this.onPanelClicked },
            React.createElement(DockTabs, { panelData: panelData, onPanelDragStart: onPanelHeaderDragStart, onPanelDragMove: this.onPanelHeaderDragMove, onPanelDragEnd: this.onPanelHeaderDragEnd }),
            isFloat ?
                [
                    React.createElement(DragDropDiv, { key: "drag-size-t-l", className: "dock-panel-drag-size dock-panel-drag-size-t-l", onDragStartT: this.onPanelCornerDragTL, onDragMoveT: this.onPanelCornerDragMove, onDragEndT: this.onPanelCornerDragEnd }),
                    React.createElement(DragDropDiv, { key: "drag-size-t-r", className: "dock-panel-drag-size dock-panel-drag-size-t-r", onDragStartT: this.onPanelCornerDragTR, onDragMoveT: this.onPanelCornerDragMove, onDragEndT: this.onPanelCornerDragEnd }),
                    React.createElement(DragDropDiv, { key: "drag-size-b-l", className: "dock-panel-drag-size dock-panel-drag-size-b-l", onDragStartT: this.onPanelCornerDragBL, onDragMoveT: this.onPanelCornerDragMove, onDragEndT: this.onPanelCornerDragEnd }),
                    React.createElement(DragDropDiv, { key: "drag-size-b-r", className: "dock-panel-drag-size dock-panel-drag-size-b-r", onDragStartT: this.onPanelCornerDragBR, onDragMoveT: this.onPanelCornerDragMove, onDragEndT: this.onPanelCornerDragEnd })
                ]
                : null,
            droppingLayer));
    }
    componentWillUnmount() {
        if (DockPanel._droppingPanel === this) {
            DockPanel.droppingPanel = null;
        }
        this._unmounted = true;
    }
}
DockPanel.contextType = DockContextType;
