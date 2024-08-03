import * as React from "react";
import { WindowPanel } from "./WindowPanel";
export class WindowBox extends React.PureComponent {
    render() {
        let { children } = this.props.boxData;
        let childrenRender = [];
        for (let child of children) {
            if ('tabs' in child) {
                childrenRender.push(React.createElement(WindowPanel, { key: child.id, panelData: child }));
            }
        }
        return (React.createElement(React.Fragment, null, childrenRender));
    }
}
WindowBox.enabled = typeof window === 'object' && ((window === null || window === void 0 ? void 0 : window.navigator.platform) === 'Win32' || (window === null || window === void 0 ? void 0 : window.navigator.platform) === 'MacIntel');
