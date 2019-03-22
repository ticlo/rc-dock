import React from "react";
import { DockContextType } from "./DockData";
import { DragStore } from "./DragStore";
export class DockDropSquare extends React.PureComponent {
    constructor() {
        super(...arguments);
        this.state = { dropping: false };
        this.onDragOver = (e) => {
            let { panelElement, direction } = this.props;
            this.setState({ dropping: true });
            this.context.setDropRect(panelElement, direction, this, e.nativeEvent);
            e.dataTransfer.dropEffect = 'move';
            e.preventDefault();
            e.stopPropagation();
        };
        this.onDragLeave = (e) => {
            let { panelElement, direction } = this.props;
            this.setState({ dropping: false });
            this.context.setDropRect(null, 'remove', this);
        };
        this.onDrop = (e) => {
            let tab = DragStore.getData(DockContextType, 'tab');
            if (tab) {
                let { panelData, direction } = this.props;
                this.context.moveTab(tab, panelData, direction);
            }
        };
    }
    render() {
        let { direction } = this.props;
        let { dropping } = this.state;
        let cls = `dock-drop-square dock-drop-${direction}${dropping ? ' dock-drop-square-dropping' : ''}`;
        return React.createElement("div", { className: cls, onDragOver: this.onDragOver, onDragLeave: this.onDragLeave, onDrop: this.onDrop });
    }
    componentWillUnmount() {
        this.context.setDropRect(null, 'remove', this);
    }
}
DockDropSquare.contextType = DockContextType;
export class DockDropLayer extends React.PureComponent {
    render() {
        let { panelData, panelElement, dropFromPanel } = this.props;
        let children = [
            React.createElement(DockDropSquare, { key: 'left', direction: 'left', panelData: panelData, panelElement: panelElement }),
            React.createElement(DockDropSquare, { key: 'right', direction: 'right', panelData: panelData, panelElement: panelElement }),
            React.createElement(DockDropSquare, { key: 'top', direction: 'top', panelData: panelData, panelElement: panelElement }),
            React.createElement(DockDropSquare, { key: 'bottom', direction: 'bottom', panelData: panelData, panelElement: panelElement })
        ];
        if (panelData.group === dropFromPanel.group && panelData !== dropFromPanel) {
            // dock to tabs
            children.push(React.createElement(DockDropSquare, { key: 'middle', direction: 'middle', panelData: panelData, panelElement: panelElement }));
        }
        if (dropFromPanel.group.floatable) {
            children.push(React.createElement(DockDropSquare, { key: 'float', direction: 'float', panelData: panelData, panelElement: panelElement }));
        }
        return (React.createElement("div", { className: 'dock-drop-layer' }, children));
    }
}
//# sourceMappingURL=DockDropLayer.js.map