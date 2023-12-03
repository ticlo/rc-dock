import * as React from "react";
import { DockContext, PanelData } from "./DockData";
interface Props {
    panelData: PanelData;
    onWindowOpened?(panel: PanelData, window: Window): void;
    onWindowClosing?(panel: PanelData, window: Window): void;
}
export declare class WindowPanel extends React.PureComponent<Props, any> {
    static contextType: React.Context<DockContext>;
    context: DockContext;
    _window: Window;
    onOpen: (w: Window) => void;
    onUnload: () => void;
    initPopupInnerRect: () => any;
    render(): React.ReactNode;
}
export {};
