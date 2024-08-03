import * as React from "react";
import { DockContext, DockMode, DropDirection, PanelData } from "./DockData";
import { DragState } from "./dragdrop/DragManager";
interface DockDropSquareProps {
    direction: DropDirection;
    depth?: number;
    panelData: PanelData;
    panelElement: HTMLElement;
}
interface DockDropSquareState {
    dropping: boolean;
}
export declare class DockDropSquare extends React.PureComponent<DockDropSquareProps, DockDropSquareState> {
    static contextType: React.Context<DockContext>;
    context: DockContext;
    state: {
        dropping: boolean;
    };
    onDragOver: (e: DragState) => void;
    onDragLeave: (e: DragState) => void;
    onDrop: (e: DragState) => void;
    render(): React.ReactNode;
    componentWillUnmount(): void;
}
interface DockDropLayerProps {
    panelData: PanelData;
    panelElement: HTMLElement;
    dropFromPanel: PanelData;
}
export declare class DockDropLayer extends React.PureComponent<DockDropLayerProps, any> {
    static contextType: React.Context<DockContext>;
    context: DockContext;
    static addDepthSquare(children: React.ReactNode[], mode: DockMode, panelData: PanelData, panelElement: HTMLElement, depth?: number): void;
    render(): React.ReactNode;
}
export {};
