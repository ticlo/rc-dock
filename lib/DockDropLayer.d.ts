import React from "react";
import { DropDirection, PanelData } from "./DockData";
interface DockDropSquareProps {
    direction: DropDirection;
    panelData: PanelData;
}
export declare class DockDropSquare extends React.PureComponent<DockDropSquareProps, any> {
    onDragOver: () => void;
    onDragLeave(): void;
    onDrop(): void;
    render(): React.ReactNode;
}
interface DockDropLayerProps {
    panelData: PanelData;
}
export declare class DockDropLayer extends React.PureComponent<DockDropLayerProps, any> {
    render(): React.ReactNode;
}
export {};
