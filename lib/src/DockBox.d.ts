import React from "react";
import { BoxData } from "./DockData";
import { DividerChild } from "./Divider";
interface Props {
    size: number;
    boxData: BoxData;
}
export declare class DockBox extends React.PureComponent<Props, any> {
    _ref: HTMLDivElement;
    getRef: (r: HTMLDivElement) => void;
    getDividerData: (idx: number) => {
        element: HTMLDivElement;
        beforeDivider: DividerChild[];
        afterDivider: DividerChild[];
    };
    changeSizes: (sizes: number[]) => void;
    render(): React.ReactNode;
}
export {};
