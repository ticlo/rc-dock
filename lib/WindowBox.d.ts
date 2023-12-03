import * as React from "react";
import { BoxData, PanelData } from "./DockData";
interface Props {
    boxData: BoxData;
    onWindowOpened?(panel: PanelData, window: Window): void;
    onWindowClosing?(panel: PanelData, window: Window): void;
}
export declare class WindowBox extends React.PureComponent<Props, any> {
    static enabled: boolean;
    render(): React.ReactNode;
}
export {};
