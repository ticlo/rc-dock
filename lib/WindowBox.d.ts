import React from "react";
import { BoxData } from "./DockData";
interface Props {
    boxData: BoxData;
}
export declare class WindowBox extends React.PureComponent<Props, any> {
    static enabled: boolean;
    render(): React.ReactNode;
}
export {};
