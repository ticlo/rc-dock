import React from 'react';
import { AbstractPointerEvent, DragInitFunction } from "./DragInitiator";
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
    startDrag: (e: PointerEvent, initFunction: DragInitFunction) => void;
    dragMove: (e: AbstractPointerEvent, dx: number, dy: number) => void;
    dragMove2(e: AbstractPointerEvent, dx: number, dy: number): void;
    dragMoveAll(e: AbstractPointerEvent, dx: number, dy: number): void;
    dragEnd: (e: AbstractPointerEvent, dx: number, dy: number) => void;
    render(): React.ReactNode;
}
export {};
