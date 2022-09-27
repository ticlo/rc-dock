import * as React from "react";
import { BoxData, DockContext } from "./DockData";
import { DividerChild } from "./Divider";
interface Props {
    size: number;
    boxData: BoxData;
}
export declare class DockBox extends React.PureComponent<Props, any> {
    static contextType: React.Context<DockContext>;
    context: DockContext;
    _ref: HTMLDivElement;
    getRef: (r: HTMLDivElement) => void;
    getDividerData: (idx: number) => {
        element: HTMLDivElement;
        beforeDivider: DividerChild[];
        afterDivider: DividerChild[];
    };
    changeSizes: (sizes: number[]) => void;
    onDragEnd: () => void;
    render(): React.ReactNode;
}
export {};
