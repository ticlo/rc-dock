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
    static set droppingPanel(panel: DockPanel);
    state: State;
    onDragOver: (e: DragState) => void;
    onDragOverOtherPanel(): void;
    _movingX: number;
    _movingY: number;
    onPanelHeaderDragStart: (event: DragState) => void;
    onPanelHeaderDragMove: (e: DragState) => void;
    onPanelHeaderDragEnd: (e: DragState) => void;
    _initX: number;
    _initY: number;
    _movingW: number;
    _movingH: number;
    _movingCorner: string;
    _movingEdge: 'r' | 'l' | 't' | 'b' | null;
    onPanelCornerDragTL: (e: DragState) => void;
    onPanelCornerDragTR: (e: DragState) => void;
    onPanelCornerDragBL: (e: DragState) => void;
    onPanelCornerDragBR: (e: DragState) => void;
    onPanelEdgeStartDragR: (e: React.DragEvent<HTMLDivElement>) => void;
    onPanelEdgeDragStart(e: React.DragEvent<HTMLDivElement>, edge: "r" | "l" | "t" | "b"): void;
    onPanelEdgeDragMove: (e: React.DragEvent<HTMLDivElement>) => void;
    onPanelEdgeDragEnd: (e: React.DragEvent<HTMLDivElement>) => void;
    onPanelCornerDrag(e: DragState, corner: string): void;
    onPanelCornerDragMove: (e: DragState) => void;
    onPanelCornerDragEnd: (e: DragState) => void;
    onFloatPointerDown: () => void;
    onPanelClicked: (e: React.MouseEvent) => void;
    render(): React.ReactNode;
    _unmounted: boolean;
    componentWillUnmount(): void;
}
export {};
