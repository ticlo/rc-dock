import * as React from "react";
import * as DragManager from "./DragManager";
import { GestureState } from "./GestureManager";
export declare type AbstractPointerEvent = MouseEvent | TouchEvent;
interface DragDropDivProps extends React.HTMLAttributes<HTMLDivElement> {
    getRef?: (ref: HTMLDivElement) => void;
    onDragStartT?: DragManager.DragHandler;
    onDragMoveT?: DragManager.DragHandler;
    onDragEndT?: DragManager.DragHandler;
    onDragOverT?: DragManager.DragHandler;
    onDragLeaveT?: DragManager.DragHandler;
    /**
     * Anything returned by onDropT will be stored in DragState.dropped
     * return false to indicate the drop is canceled
     */
    onDropT?: DragManager.DropHandler;
    /**
     * by default onDragStartT will be called on first drag move
     * but if directDragT is true, onDragStartT will be called as soon as mouse is down
     */
    directDragT?: boolean;
    useRightButtonDragT?: boolean;
    onGestureStartT?: (state: GestureState) => boolean;
    onGestureMoveT?: (state: GestureState) => void;
    onGestureEndT?: () => void;
    gestureSensitivity?: number;
}
export declare class DragDropDiv extends React.PureComponent<DragDropDivProps, any> {
    element: HTMLElement;
    ownerDocument: Document;
    _getRef: (r: HTMLDivElement) => void;
    dragType: DragManager.DragType;
    baseX: number;
    baseY: number;
    scaleX: number;
    scaleY: number;
    waitingMove: boolean;
    listening: boolean;
    gesturing: boolean;
    baseX2: number;
    baseY2: number;
    baseDis: number;
    baseAng: number;
    onPointerDown: (e: React.MouseEvent | React.TouchEvent) => void;
    onDragStart(event: MouseEvent | TouchEvent): void;
    addDragListeners(event: MouseEvent | TouchEvent): void;
    checkFirstMove(e: AbstractPointerEvent): boolean;
    executeFirstMove(state: DragManager.DragState): boolean;
    onMouseMove: (e: MouseEvent) => void;
    onTouchMove: (e: TouchEvent) => void;
    onDragEnd: (e?: TouchEvent | MouseEvent) => void;
    addGestureListeners(event: TouchEvent): void;
    onGestureStart(event: TouchEvent): void;
    onGestureMove: (e: TouchEvent) => void;
    onGestureEnd: (e?: TouchEvent) => void;
    onKeyDown: (e: KeyboardEvent) => void;
    cancel(): void;
    removeListeners(): void;
    cleanupDrag(state: DragManager.DragState): void;
    render(): React.ReactNode;
    componentDidUpdate(prevProps: DragDropDivProps): void;
    componentWillUnmount(): void;
}
export {};
