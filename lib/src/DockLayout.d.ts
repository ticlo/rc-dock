import React, { CSSProperties } from "react";
import { BoxData, LayoutData, PanelData } from "./DockData";
interface Props {
    defaultLayout: LayoutData | BoxData | (BoxData | PanelData)[];
    style?: CSSProperties;
}
interface State {
    layout: LayoutData;
}
export declare class DockLayout extends React.PureComponent<Props, State> {
    fixPanelData(panel: PanelData): void;
    fixBoxData(box: BoxData): void;
    prepareInitData(data: LayoutData | BoxData | (BoxData | PanelData)[]): LayoutData;
    constructor(props: Props);
    render(): React.ReactNode;
}
export {};
