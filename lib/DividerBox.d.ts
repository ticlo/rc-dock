import * as React from "react";
import { DockContext } from "./DockData";
import { DividerChild } from "./Divider";
interface Props extends React.HTMLAttributes<HTMLDivElement> {
    mode?: 'horizontal' | 'vertical';
}
export declare class DividerBox extends React.PureComponent<Props, any> {
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
    render(): React.ReactNode;
}
export {};
