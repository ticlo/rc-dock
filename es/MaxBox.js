import React from "react";
import { DockContextType } from "./DockData";
import { DockPanel } from "./DockPanel";
import classNames from "classnames";
export class MaxBox extends React.PureComponent {
    render() {
        let panelData = this.props.boxData.children[0];
        if (panelData) {
            this.hidePanelData = Object.assign(Object.assign({}, panelData), { id: '', tabs: [] });
            return (React.createElement("div", { className: classNames("dock-box dock-mbox dock-mbox-show", this.context.getClassName()) },
                React.createElement(DockPanel, { size: 100, panelData: panelData })));
        }
        else if (this.hidePanelData) {
            // use the hiden data only once, dont keep it for too long
            let hidePanelData = this.hidePanelData;
            this.hidePanelData = null;
            return (React.createElement("div", { className: classNames("dock-box dock-mbox dock-mbox-hide", this.context.getClassName()) },
                React.createElement(DockPanel, { size: 100, panelData: hidePanelData })));
        }
        else {
            return (React.createElement("div", { className: classNames("dock-box dock-mbox dock-mbox-hide", this.context.getClassName()) }));
        }
    }
}
MaxBox.contextType = DockContextType;
