import * as React from "react";
import { DragState } from "./dragdrop/DragManager";
export interface DividerChild {
    size: number;
    minSize?: number;
}
export interface DividerData {
    element: HTMLElement;
    beforeDivider: DividerChild[];
    afterDivider: DividerChild[];
}
interface DividerProps {
    idx: number;
    className?: string;
    isVertical?: boolean;
    getDividerData(idx: number): DividerData;
    changeSizes(sizes: number[]): void;
    onDragEnd?(): void;
}
declare class BoxDataCache implements DividerData {
    element: HTMLElement;
    beforeDivider: DividerChild[];
    afterDivider: DividerChild[];
    beforeSize: number;
    beforeMinSize: number;
    afterSize: number;
    afterMinSize: number;
    constructor(data: DividerData);
}
export declare class Divider extends React.PureComponent<DividerProps, any> {
    boxData: BoxDataCache;
    startDrag: (e: DragState) => void;
    dragMove: (e: DragState) => void;
    dragMove2(dx: number, dy: number): void;
    dragMoveAll(dx: number, dy: number): void;
    dragEnd: (e: DragState) => void;
    render(): React.ReactNode;
}
export {};
