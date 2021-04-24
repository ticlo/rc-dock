import React from "react";
import { DockPanel } from "./DockPanel";
export class MaxBox extends React.PureComponent {
    render() {
        let panelData = this.props.boxData.children[0];
        if (panelData) {
            this.hidePanelData = { ...panelData, tabs: [] };
            return (React.createElement("div", { className: 'dock-box dock-mbox dock-mbox-show' },
                React.createElement(DockPanel, { size: 100, panelData: panelData })));
        }
        else if (this.hidePanelData) {
            // use the hiden data only once, dont keep it for too long
            let hidePanelData = this.hidePanelData;
            this.hidePanelData = null;
            return (React.createElement("div", { className: 'dock-box dock-mbox dock-mbox-hide' },
                React.createElement(DockPanel, { size: 100, panelData: hidePanelData })));
        }
        else {
            return (React.createElement("div", { className: 'dock-box dock-mbox dock-mbox-hide' }));
        }
    }
}
