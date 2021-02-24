import React from "react";
import NewWindow from "rc-new-window";
import { DockContextType } from "./DockData";
import { DockPanel } from "./DockPanel";
import { mapElementToScreenRect, mapWindowToElement } from "rc-new-window/lib/ScreenPosition";
export class WindowPanel extends React.PureComponent {
    constructor() {
        super(...arguments);
        this.onOpen = (w) => {
            if (!this._window && w) {
                this._window = w;
            }
        };
        this.onUnload = () => {
            let { panelData } = this.props;
            let layoutRoot = this.context.getRootElement();
            const rect = mapWindowToElement(layoutRoot, this._window);
            if (rect.width > 0 && rect.height > 0) {
                panelData.x = rect.left;
                panelData.y = rect.top;
                panelData.w = rect.width;
                panelData.h = rect.height;
            }
            this.context.dockMove(panelData, null, 'float');
        };
        this.initPopupInnerRect = () => {
            let { panelData } = this.props;
            return mapElementToScreenRect(this.context.getRootElement(), {
                left: panelData.x,
                top: panelData.y,
                width: panelData.w,
                height: panelData.h
            });
        };
    }
    render() {
        let { panelData } = this.props;
        let { x, y, w, h } = panelData;
        return React.createElement(NewWindow, { copyStyles: true, onOpen: this.onOpen, onClose: this.onUnload, onBlock: this.onUnload, initPopupInnerRect: this.initPopupInnerRect, width: w, height: h },
            React.createElement("div", { className: 'dock-wbox' },
                React.createElement(DockPanel, { size: panelData.size, panelData: panelData, key: panelData.id })));
    }
}
WindowPanel.contextType = DockContextType;
