import React from "react";
import { BoxData, PanelData } from "./DockData";
interface Props {
    boxData: BoxData;
}
export declare class MaxBox extends React.PureComponent<Props, any> {
    hidePanelData: PanelData;
    render(): React.ReactNode;
}
export {};
