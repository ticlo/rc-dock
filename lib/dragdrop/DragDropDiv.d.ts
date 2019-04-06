import React, { CSSProperties } from "react";
import * as DragManager from "./DragManager";
export declare type AbstractPointerEvent = MouseEvent | TouchEvent;
interface DragDropDivProps {
    className?: string;
    style?: CSSProperties;
    getRef?: (ref: HTMLDivElement) => void;
    onDragStart?: DragManager.DragHandler;
    onDragMove?: DragManager.DragHandler;
    onDragEnd?: DragManager.DragHandler;
    onDragOver?: DragManager.DragHandler;
    onDragLeave?: DragManager.DragHandler;
    onDrop?: DragManager.DragHandler;
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
    startDrag(element: HTMLElement, state: DragManager.DragState): void;
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
