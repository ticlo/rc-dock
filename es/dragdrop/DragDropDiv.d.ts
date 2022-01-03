import React from "react";
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
    onDropT?: DragManager.DragHandler;
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
    extraData?: any;
}
interface ExternalDataProps {
    externalData?: any;
}
declare const EnhancedDndDragDropDiv: (props: DragDropDivProps & ExternalDataProps) => JSX.Element;
export { EnhancedDndDragDropDiv as DragDropDiv };
