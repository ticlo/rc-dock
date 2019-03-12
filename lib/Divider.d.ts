import React from 'react';
import { AbstractPointerEvent, DragInitFunction } from "./DragInitiator";
export interface BoxChild {
    size: number;
    minSize?: number;
}
export interface BoxData {
    element: HTMLElement;
    beforeDivider: BoxChild[];
    afterDivider: BoxChild[];
}
interface DividerProps {
    idx: number;
    className?: string;
    isVertical?: boolean;
    getBoxData(idx: number): BoxData;
    changeSizes(sizes: number[]): void;
}
declare class BoxDataCache implements BoxData {
    element: HTMLElement;
    beforeDivider: BoxChild[];
    afterDivider: BoxChild[];
    beforeSize: number;
    beforeMinSize: number;
    afterSize: number;
    afterMinSize: number;
    constructor(data: BoxData);
}
export declare class Divider extends React.PureComponent<DividerProps, any> {
    boxData: BoxDataCache;
    startDrag: (e: PointerEvent, initFunction: DragInitFunction) => void;
    dragMove2: (e: AbstractPointerEvent, dx: number, dy: number) => void;
    dragMoveAll: (e: AbstractPointerEvent, dx: number, dy: number) => void;
    dragEnd: (e: AbstractPointerEvent, dx: number, dy: number) => void;
    render(): React.ReactNode;
}
export {};
