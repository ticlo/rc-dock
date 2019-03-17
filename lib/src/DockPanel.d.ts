import React from "react";
import { PanelData, TabGroup } from "./DockData";
interface Props {
    panelData: PanelData;
    size: number;
}
interface State {
    dropping: TabGroup;
}
export declare class DockPanel extends React.PureComponent<Props, State> {
    static _droppingPanel: DockPanel;
    static droppingPanel: DockPanel;
    state: State;
    onDragOver: () => void;
    onDragLeave(): void;
    render(): React.ReactNode;
}
export {};
