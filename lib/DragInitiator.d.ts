import React from "react";
export declare type AbstractPointerEvent = MouseEvent | TouchEvent;
declare type PointerEventHandler = (e: AbstractPointerEvent, dx: number, dy: number) => void;
export declare type DragInitFunction = (referenceElement: HTMLElement, moveListener?: PointerEventHandler, endListener?: PointerEventHandler) => void;
export declare type DragInitHandler = (event: PointerEvent, initFunction: DragInitFunction) => void;
interface DragInitiatorProps extends React.HTMLAttributes<HTMLDivElement> {
    getRef?: React.Ref<HTMLDivElement>;
    onDragInit?: DragInitHandler;
}
export declare class DragInitiator extends React.Component<DragInitiatorProps, any> {
    moveListener?: PointerEventHandler;
    endListener?: PointerEventHandler;
    dragging: boolean;
    isTouch: boolean;
    baseX: number;
    baseY: number;
    scaleX: number;
    scaleY: number;
    onPointerDown: (e: React.PointerEvent<Element>) => void;
    onMouseMove: (e: MouseEvent) => void;
    onMouseEnd: (e?: MouseEvent) => void;
    onTouchMove: (e: TouchEvent) => void;
    onTouchEnd: (e?: TouchEvent) => void;
    onEnd(): void;
    render(): React.ReactNode;
    componentWillUnmount(): void;
}
export {};
