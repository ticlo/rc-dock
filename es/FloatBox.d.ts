import * as React from "react";
import { BoxData, DockContext } from "./DockData";
interface Props {
    boxData: BoxData;
}
export declare class FloatBox extends React.PureComponent<Props, any> {
    static contextType: React.Context<DockContext>;
    context: DockContext;
    render(): React.ReactNode;
}
export {};
