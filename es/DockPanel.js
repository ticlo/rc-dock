import * as React from "react";
import { DockContextType, maximePlaceHolderId } from "./DockData";
import { DockTabs } from "./DockTabs";
import { DragDropDiv } from "./dragdrop/DragDropDiv";
import { DragState } from "./dragdrop/DragManager";
import { DockDropLayer } from "./DockDropLayer";
import { getFloatPanelSize, getPanelTabPosition, nextZIndex } from "./Algorithm";
import { DockDropEdge } from "./DockDropEdge";
import { groupClassNames, mergeTabGroups } from "./Utils";
import classNames from "classnames";
import { flushSync } from "react-dom";
export class DockPanel extends React.PureComponent {
    constructor() {
        super(...arguments);
        this.getRef = (r) => {
            this._ref = r;
            if (r) {
                let { parent } = this.props.panelData;
                if (((parent === null || parent === void 0 ? void 0 : parent.mode) === 'float')) {
                    r.addEventListener('pointerdown', this.onFloatPointerDown, { capture: true, passive: true });
                }
            }
        };
        this.state = { dropFromPanel: null, draggingHeader: false };
        this.onDragOver = (e) => {
            if (DockPanel._droppingPanel === this) {
                return;
            }
            let dockId = this.context.getDockId();
            let tab = DragState.getData('tab', dockId);
            let panel = DragState.getData('panel', dockId);
            if (tab || panel) {
                DockPanel.droppingPanel = this;
            }
            if (tab) {
                if (tab.parent) {
                    flushSync(() => {
                        this.setState({ dropFromPanel: tab.parent });
                    });
                }
                else {
                    // add a fake panel
                    flushSync(() => {
                        this.setState({ dropFromPanel: { activeId: '', tabs: [], group: tab.group, localGroup: tab.localGroup } });
                    });
                }
            }
            else if (panel) {
                flushSync(() => {
                    this.setState({ dropFromPanel: panel });
                });
            }
        };
        // used both by dragging head and corner
        this._movingX = 0;
        this._movingY = 0;
        // drop to move in float mode
        this.onPanelHeaderDragStart = (event) => {
            let { panelData } = this.props;
            let { parent, x, y, z } = panelData;
            let dockId = this.context.getDockId();
            if ((parent === null || parent === void 0 ? void 0 : parent.mode) === 'float') {
                this._movingX = x;
                this._movingY = y;
                // hide the panel, but not create drag layer element
                event.setData({ panel: panelData, tabGroup: panelData.group }, dockId);
                event.startDrag(null, null);
                this.onFloatPointerDown();
            }
            else {
                let tabGroup = mergeTabGroups(this.context.getGroup(panelData.group), panelData.localGroup);
                let [panelWidth, panelHeight] = getFloatPanelSize(this._ref, tabGroup);
                event.setData({ panel: panelData, panelSize: panelData.collapsed ? [300, 300] : [panelWidth, panelHeight], tabGroup: panelData.group }, dockId);
                event.startDrag(null);
            }
            flushSync(() => {
                this.setState({ draggingHeader: true });
            });
        };
        this.onPanelHeaderDragMove = (e) => {
            var _a;
            let { panelData } = this.props;
            if (((_a = panelData.parent) === null || _a === void 0 ? void 0 : _a.mode) !== 'float') {
                return;
            }
            let { width, height } = this.context.getLayoutSize();
            panelData.x = this._movingX + e.dx;
            panelData.y = this._movingY + e.dy;
            if (width > 200 && height > 200) {
                if (!this.context.isFloatingTopCheckDisabled() && panelData.y < 0) {
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
            if (!this._unmounted) {
                flushSync(() => {
                    this.forceUpdate();
                });
            }
        };
        this.onPanelHeaderDragEnd = (e) => {
            var _a;
            if (!this._unmounted) {
                flushSync(() => {
                    this.setState({ draggingHeader: false });
                });
                if (e.dropped === false) {
                    const { panelData } = this.props;
                    if (((_a = panelData.parent) === null || _a === void 0 ? void 0 : _a.mode) === "float") {
                        // in float mode, the position change needs to be sent to the layout
                        this.context.onSilentChange(this.props.panelData.activeId, 'move');
                    }
                }
            }
        };
        this.onPanelCornerDragT = (e) => {
            this.onPanelCornerDrag(e, 't');
        };
        this.onPanelCornerDragB = (e) => {
            this.onPanelCornerDrag(e, 'b');
        };
        this.onPanelCornerDragL = (e) => {
            this.onPanelCornerDrag(e, 'l');
        };
        this.onPanelCornerDragR = (e) => {
            this.onPanelCornerDrag(e, 'r');
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
            if (!this.context.isFloatingTopCheckDisabled() && this._movingCorner.startsWith('t')) {
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
                case 't': {
                    panelData.y = this._movingY + dy;
                    panelData.h = this._movingH - dy;
                    break;
                }
                case 'b': {
                    panelData.h = this._movingH + dy;
                    break;
                }
                case 'l': {
                    panelData.x = this._movingX + dx;
                    panelData.w = this._movingW - dx;
                    break;
                }
                case 'r': {
                    panelData.w = this._movingW + dx;
                    break;
                }
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
            panelData.w = Math.max(panelData.w || 0, panelData.minWidth || 0);
            panelData.h = Math.max(panelData.h || 0, panelData.minHeight || 0);
            flushSync(() => {
                this.forceUpdate();
            });
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
                flushSync(() => {
                    this.forceUpdate();
                });
            }
        };
        this.onPanelClicked = (e) => {
            const target = e.nativeEvent.target;
            if (!this._ref.contains(this._ref.ownerDocument.activeElement) && target instanceof Node && this._ref.contains(target)) {
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
        queueMicrotask(() => {
            flushSync(() => {
                this.setState({ dropFromPanel: null });
            });
        });
    }
    onPanelCornerDrag(e, corner) {
        let { parent, x, y, w, h } = this.props.panelData;
        if ((parent === null || parent === void 0 ? void 0 : parent.mode) === 'float') {
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
        let { panelData, size, preferredWidth, preferredHeight, isCollapseDisabled } = this.props;
        let { minWidth, minHeight, group, id, parent, panelLock, collapsed, localGroup } = panelData;
        let styleName = group;
        let tabGroup = mergeTabGroups(this.context.getGroup(group), localGroup);
        let { widthFlex, heightFlex } = tabGroup;
        if (panelLock) {
            let { panelStyle, widthFlex: panelWidthFlex, heightFlex: panelHeightFlex } = panelLock;
            if (panelStyle) {
                styleName = panelStyle;
            }
            if (typeof panelWidthFlex === 'number') {
                widthFlex = panelWidthFlex;
            }
            if (typeof panelHeightFlex === 'number') {
                heightFlex = panelHeightFlex;
            }
        }
        let panelClass = classNames(groupClassNames(styleName));
        let isMax = (parent === null || parent === void 0 ? void 0 : parent.mode) === 'maximize';
        let isFloat = (parent === null || parent === void 0 ? void 0 : parent.mode) === 'float';
        let isHBox = (parent === null || parent === void 0 ? void 0 : parent.mode) === 'horizontal';
        let isVBox = (parent === null || parent === void 0 ? void 0 : parent.mode) === 'vertical';
        let onPanelHeaderDragStart = this.onPanelHeaderDragStart;
        if (isMax) {
            dropFromPanel = null;
            onPanelHeaderDragStart = null;
        }
        let cls = `dock-panel ${panelClass ? panelClass : ''}${dropFromPanel ? ' dock-panel-dropping' : ''}${draggingHeader ? ' dragging' : ''}${panelData.tabs.length === 1 ? ' dock-panel-one-tab' : ''}`;
        let flex = 1;
        if (isHBox && widthFlex != null) {
            flex = widthFlex;
        }
        else if (isVBox && heightFlex != null) {
            flex = heightFlex;
        }
        let flexGrow = flex * size * 1000000;
        let flexShrink = flex * 1000000;
        if (flexShrink < 1) {
            flexShrink = 1;
        }
        if (isHBox && preferredWidth != null) {
            flexGrow = 1;
            flexShrink = 1;
            size = preferredWidth;
        }
        else if (isVBox && preferredHeight != null) {
            flexGrow = 1;
            flexShrink = 1;
            size = preferredHeight;
        }
        let style = { minWidth, minHeight, flexGrow, flexShrink, flexBasis: `${size}px` };
        const displayCollapsed = collapsed && (isHBox || isVBox);
        if (displayCollapsed) {
            style = { flexGrow: 0, flexShrink: 0, flexBasis: panelData.headerSize };
        }
        if (isFloat) {
            style.left = panelData.x;
            style.top = panelData.y;
            style.width = panelData.w;
            style.height = panelData.h;
            style.zIndex = panelData.z;
        }
        let droppingLayer;
        if (dropFromPanel) {
            let dropFromGroup = mergeTabGroups(this.context.getGroup(dropFromPanel.group), dropFromPanel.localGroup);
            let dockId = this.context.getDockId();
            if (!dropFromGroup.tabLocked || DragState.getData('tab', dockId) == null) {
                // not allowed locked tab to create new panel
                let DockDropClass = this.context.useEdgeDrop() ? DockDropEdge : DockDropLayer;
                droppingLayer = React.createElement(DockDropClass, { panelData: panelData, panelElement: this._ref, dropFromPanel: dropFromPanel });
            }
        }
        return (React.createElement(DragDropDiv, { getRef: this.getRef, className: classNames(cls, {
                "dock-collapsed": displayCollapsed
            }), style: style, "data-dockid": id, onDragOverT: isFloat ? null : this.onDragOver, onClick: this.onPanelClicked },
            React.createElement(DockTabs, { panelData: panelData, onPanelDragStart: onPanelHeaderDragStart, onPanelDragMove: this.onPanelHeaderDragMove, onPanelDragEnd: this.onPanelHeaderDragEnd, isCollapseDisabled: isCollapseDisabled }),
            isFloat ?
                [
                    React.createElement(DragDropDiv, { key: "drag-size-t", className: classNames("dock-panel-drag-size", {
                            "dock-panel-drag-size-t": tabGroup === null || tabGroup === void 0 ? void 0 : tabGroup.resizable
                        }), onDragStartT: this.onPanelCornerDragT, onDragMoveT: this.onPanelCornerDragMove, onDragEndT: this.onPanelCornerDragEnd, panelData: panelData, role: "resizer" }),
                    React.createElement(DragDropDiv, { key: "drag-size-b", className: classNames("dock-panel-drag-size", {
                            "dock-panel-drag-size-b": tabGroup === null || tabGroup === void 0 ? void 0 : tabGroup.resizable
                        }), onDragStartT: this.onPanelCornerDragB, onDragMoveT: this.onPanelCornerDragMove, onDragEndT: this.onPanelCornerDragEnd, panelData: panelData, role: "resizer" }),
                    React.createElement(DragDropDiv, { key: "drag-size-l", className: classNames("dock-panel-drag-size", {
                            "dock-panel-drag-size-l": tabGroup === null || tabGroup === void 0 ? void 0 : tabGroup.resizable
                        }), onDragStartT: this.onPanelCornerDragL, onDragMoveT: this.onPanelCornerDragMove, onDragEndT: this.onPanelCornerDragEnd, panelData: panelData, role: "resizer" }),
                    React.createElement(DragDropDiv, { key: "drag-size-r", className: classNames("dock-panel-drag-size", {
                            "dock-panel-drag-size-r": tabGroup === null || tabGroup === void 0 ? void 0 : tabGroup.resizable
                        }), onDragStartT: this.onPanelCornerDragR, onDragMoveT: this.onPanelCornerDragMove, onDragEndT: this.onPanelCornerDragEnd, panelData: panelData, role: "resizer" }),
                    React.createElement(DragDropDiv, { key: "drag-size-t-l", className: classNames("dock-panel-drag-size", {
                            "dock-panel-drag-size-t-l": tabGroup === null || tabGroup === void 0 ? void 0 : tabGroup.resizable
                        }), onDragStartT: this.onPanelCornerDragTL, onDragMoveT: this.onPanelCornerDragMove, onDragEndT: this.onPanelCornerDragEnd, panelData: panelData, role: "resizer" }),
                    React.createElement(DragDropDiv, { key: "drag-size-t-r", className: classNames("dock-panel-drag-size", {
                            "dock-panel-drag-size-t-r": tabGroup === null || tabGroup === void 0 ? void 0 : tabGroup.resizable
                        }), onDragStartT: this.onPanelCornerDragTR, onDragMoveT: this.onPanelCornerDragMove, onDragEndT: this.onPanelCornerDragEnd, panelData: panelData, role: "resizer" }),
                    React.createElement(DragDropDiv, { key: "drag-size-b-l", className: classNames("dock-panel-drag-size", {
                            "dock-panel-drag-size-b-l": tabGroup === null || tabGroup === void 0 ? void 0 : tabGroup.resizable
                        }), onDragStartT: this.onPanelCornerDragBL, onDragMoveT: this.onPanelCornerDragMove, onDragEndT: this.onPanelCornerDragEnd, panelData: panelData, role: "resizer" }),
                    React.createElement(DragDropDiv, { key: "drag-size-b-r", className: classNames("dock-panel-drag-size", {
                            "dock-panel-drag-size-b-r": tabGroup === null || tabGroup === void 0 ? void 0 : tabGroup.resizable
                        }), onDragStartT: this.onPanelCornerDragBR, onDragMoveT: this.onPanelCornerDragMove, onDragEndT: this.onPanelCornerDragEnd, panelData: panelData, role: "resizer" })
                ]
                : null,
            droppingLayer));
    }
    componentDidMount() {
        const panelData = this.context.find(this.props.panelData.id);
        const maximizedPanelData = this.context.find(maximePlaceHolderId);
        if ((panelData === null || panelData === void 0 ? void 0 : panelData.activeId) === (maximizedPanelData === null || maximizedPanelData === void 0 ? void 0 : maximizedPanelData.activeId)) {
            return;
        }
        queueMicrotask(() => {
            this.updatePanelData();
        });
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        const { panelData } = this.props;
        if (panelData.tabs.length && (panelData.headerSize === undefined || getPanelTabPosition(prevProps.panelData) !== getPanelTabPosition(this.props.panelData))) {
            queueMicrotask(() => {
                this.updatePanelData();
            });
        }
    }
    updatePanelData() {
        var _a;
        const { panelData } = this.props;
        const tabPosition = getPanelTabPosition(panelData);
        this.context.updatePanelData(panelData.id, Object.assign(Object.assign({}, panelData), { headerSize: this.getHeaderSize(tabPosition) }), 'configure-panel');
        if (((_a = panelData.parent) === null || _a === void 0 ? void 0 : _a.mode) === "float") {
            const firstTab = panelData.tabs[0];
            firstTab.collapsed = false;
            this.context.updateTab(firstTab.id, firstTab, false, 'configure-tab');
        }
    }
    getHeaderSize(tabPosition) {
        if (!tabPosition) {
            return 0;
        }
        const dockBarRect = this._ref.querySelector('.dock-bar').getBoundingClientRect();
        return (tabPosition === "top" || tabPosition === "bottom") ? dockBarRect.height : dockBarRect.width;
    }
    componentWillUnmount() {
        if (DockPanel._droppingPanel === this) {
            DockPanel.droppingPanel = null;
        }
        if (this._ref) {
            this._ref.removeEventListener('pointerdown', this.onFloatPointerDown, { capture: true });
        }
        this._unmounted = true;
    }
}
DockPanel.contextType = DockContextType;
