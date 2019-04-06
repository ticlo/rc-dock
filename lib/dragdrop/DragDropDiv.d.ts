import React from "react";
import * as DragManager from "./DragManager";
export declare type AbstractPointerEvent = MouseEvent | TouchEvent;
interface DragDropDivProps extends React.HTMLAttributes<HTMLDivElement> {
    getRef?: (ref: HTMLDivElement) => void;
    onDragStartT?: DragManager.DragHandler;
    onDragMoveT?: DragManager.DragHandler;
    onDragEndT?: DragManager.DragHandler;
    onDragOverT?: DragManager.DragHandler;
    onDragLeaveT?: DragManager.DragHandler;
    onDropT?: DragManager.DragHandler;
}
export declare class DragDropDiv extends React.Component<DragDropDivProps, any> {
    element: HTMLElement;
    _getRef: (r: HTMLDivElement) => void;
    dragging: boolean;
    isTouch: boolean;
    baseX: number;
    baseY: number;
    scaleX: number;
    scaleY: number;
    waitingMove: boolean;
    onPointerDown: (e: React.PointerEvent<Element>) => void;
    addListeners(e: React.PointerEvent): void;
    checkFirstMove(e: AbstractPointerEvent): boolean;
    onMouseMove: (e: MouseEvent) => void;
    onMouseEnd: (e?: MouseEvent) => void;
    onTouchMove: (e: TouchEvent) => void;
    onTouchEnd: (e?: TouchEvent) => void;
    onKeyDown: (e?: KeyboardEvent) => void;
    cleanup(): void;
    onEnd(): void;
    render(): React.ReactNode;
    componentWillUnmount(): void;
}
export {};
