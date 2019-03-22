import React from "react";
import { DockContextType } from "./DockData";
import { DockTabs } from "./DockTabs";
import { DragInitiator } from "./DragInitiator";
import { DragStore } from "./DragStore";
import { DockDropLayer } from "./DockDropLayer";
export class DockPanel extends React.PureComponent {
    constructor() {
        super(...arguments);
        this.getRef = (r) => {
            this._ref = r;
        };
        this.state = { dropFromPanel: null };
        this.onDragEnter = () => {
            let { panelData } = this.props;
            DockPanel.droppingPanel = this;
            let tab = DragStore.getData(DockContextType, 'tab');
            let panel = DragStore.getData(DockContextType, 'panel');
            if (tab) {
                if (tab.parent) {
                    this.setState({ dropFromPanel: tab.parent });
                }
                else {
                    // add a fake panel
                    this.setState({ dropFromPanel: { activeId: '', tabs: [], group: tab.group } });
                }
            }
        };
        this.onPanelHeaderDrag = (event, initFunction) => {
            let { panelData } = this.props;
            let { parent, x, y, z } = panelData;
            if (parent && parent.mode === 'float'
                && !event.target.draggable // dragging tab instead of panel
            ) {
                this._movingX = x;
                this._movingY = y;
                initFunction(this._ref.parentElement, this.onPanelHeaderDragMove);
                this.onFloatPointerDown();
            }
        };
        this.onPanelHeaderDragMove = (e, dx, dy) => {
            let { panelData } = this.props;
            panelData.x = this._movingX + dx;
            panelData.y = this._movingY + dy;
            this.forceUpdate();
        };
        this.onPanelCornerDrag = (event, initFunction) => {
            let { parent, w, h } = this.props.panelData;
            if (parent && parent.mode === 'float') {
                this._movingW = w;
                this._movingH = h;
                initFunction(this._ref, this.onPanelCornerDragMove);
            }
        };
        this.onPanelCornerDragMove = (e, dx, dy) => {
            let { panelData } = this.props;
            panelData.w = this._movingW + dx;
            panelData.h = this._movingH + dy;
            this.forceUpdate();
        };
        this.onFloatPointerDown = () => {
            let { panelData } = this.props;
            let { z } = panelData;
            let newZ = this.context.nextFloatZIndex(z);
            if (newZ !== z) {
                panelData.z = newZ;
                this.forceUpdate();
            }
        };
    }
    static set droppingPanel(panel) {
        if (DockPanel._droppingPanel === panel) {
            return;
        }
        if (DockPanel._droppingPanel) {
            DockPanel._droppingPanel.onDragLeave();
        }
        DockPanel._droppingPanel = panel;
    }
    onDragLeave() {
        if (this.state.dropFromPanel) {
            // this.setState({dropFromPanel: null});
        }
    }
    render() {
        let { dropFromPanel } = this.state;
        let { panelData, size } = this.props;
        let { minWidth, minHeight, group, id, parent } = panelData;
        let { panelClass, headless } = group;
        let isFloat = parent && parent.mode === 'float';
        let pointerDownCallback;
        if (isFloat) {
            headless = false;
            pointerDownCallback = this.onFloatPointerDown;
        }
        console.log(`panel render ${id}`);
        let cls = `dock-panel${headless ? ' dock-headless-panel' : ''} ${panelClass ? panelClass : ''}${dropFromPanel ? ' dock-panel-dropping' : ''}`;
        let style = { minWidth, minHeight, flex: `1 1 ${size}px` };
        if (panelData.parent.mode === 'float') {
            style.left = panelData.x;
            style.top = panelData.y;
            style.width = panelData.w;
            style.height = panelData.h;
            style.zIndex = panelData.z;
        }
        let droppingLayer;
        if (dropFromPanel) {
            droppingLayer = React.createElement(DockDropLayer, { panelData: panelData, panelElement: this._ref, dropFromPanel: dropFromPanel });
        }
        return (React.createElement("div", { ref: this.getRef, className: cls, style: style, "data-dockid": id, onPointerDown: pointerDownCallback, onDragEnter: isFloat ? null : this.onDragEnter },
            React.createElement(DockTabs, { panelData: panelData, onPanelHeaderDrag: this.onPanelHeaderDrag }),
            isFloat ?
                React.createElement(DragInitiator, { className: 'dock-panel-drag-size', onDragInit: this.onPanelCornerDrag })
                : null,
            droppingLayer));
    }
}
DockPanel.contextType = DockContextType;
//# sourceMappingURL=DockPanel.js.map