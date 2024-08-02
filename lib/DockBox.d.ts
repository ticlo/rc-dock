import React from "react";
import { BoxData, DockContext } from "./DockData";
import { DividerChild } from "./Divider";
interface Props {
    size: number;
    boxData: BoxData;
    preferredWidth?: number;
    preferredHeight?: number;
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
    setIgnorePreferredSize: (idx: number) => void;
    changeSizes: (sizes: number[]) => void;
    onDragEnd: () => void;
    getExpandedPanelsCount(): number;
    componentDidUpdate(prevProps: Readonly<Props>, prevState: Readonly<any>, snapshot?: any): void;
    hasDockedChildren(children: any[]): boolean;
    render(): React.ReactNode;
}
export {};
