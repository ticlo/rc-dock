import React from "react";
import { DockContext, PanelData } from "./DockData";
import { default as DragManager, DragState } from "./dragdrop/DragManager";
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
    onDragOver: (e: DragManager.DragState) => void;
    onDragOverOtherPanel(): void;
    _movingX: number;
    _movingY: number;
    onPanelHeaderDragStart: (event: DragManager.DragState) => void;
    onPanelHeaderDragMove: (e: DragManager.DragState) => void;
    onPanelHeaderDragEnd: (e: DragManager.DragState) => void;
    _movingW: number;
    _movingH: number;
    _movingCorner: string;
    onPanelCornerDragTL: (e: DragManager.DragState) => void;
    onPanelCornerDragTR: (e: DragManager.DragState) => void;
    onPanelCornerDragBL: (e: DragManager.DragState) => void;
    onPanelCornerDragBR: (e: DragManager.DragState) => void;
    onPanelCornerDrag(e: DragState, corner: string): void;
    onPanelCornerDragMove: (e: DragManager.DragState) => void;
    onPanelCornerDragEnd: (e: DragManager.DragState) => void;
    onFloatPointerDown: () => void;
    render(): React.ReactNode;
    _unmounted: boolean;
    componentWillUnmount(): void;
}
export {};
