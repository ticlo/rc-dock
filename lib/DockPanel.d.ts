import React from "react";
import { DockContext, PanelData } from "./DockData";
import { DragState } from "./dragdrop/DragManager";
interface Props {
    panelData: PanelData;
    size: number;
}
interface State {
    dropFromPanel: PanelData;
    draggingHeader: boolean;
}
export declare class DockPanel extends React.PureComponent<Props, State> {
    static contextType: React.Context<DockContext>;
    context: DockContext;
    _ref: HTMLDivElement;
    getRef: (r: HTMLDivElement) => void;
    static _droppingPanel: DockPanel;
    static droppingPanel: DockPanel;
    state: State;
    onDragOver: (e: DragState) => void;
    onDragLeave(): void;
    _movingX: number;
    _movingY: number;
    onPanelHeaderDragStart: (event: DragState) => void;
    onPanelHeaderDragMove: (e: DragState) => void;
    onPanelHeaderDragEnd: (e: DragState) => void;
    _movingW: number;
    _movingH: number;
    _movingCorner: string;
    onPanelCornerDragTL: (e: DragState) => void;
    onPanelCornerDragTR: (e: DragState) => void;
    onPanelCornerDragBL: (e: DragState) => void;
    onPanelCornerDragBR: (e: DragState) => void;
    onPanelCornerDrag(e: DragState, corner: string): void;
    onPanelCornerDragMove: (e: MouseEvent | TouchEvent, dx: number, dy: number) => void;
    onFloatPointerDown: () => void;
    render(): React.ReactNode;
}
export {};
