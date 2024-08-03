import * as React from "react";
import { BoxData, DockContext, PanelData } from "./DockData";
interface Props {
    boxData: BoxData;
}
export declare class MaxBox extends React.PureComponent<Props, any> {
    static contextType: React.Context<DockContext>;
    context: DockContext;
    hidePanelData: PanelData;
    render(): React.ReactNode;
}
export {};
