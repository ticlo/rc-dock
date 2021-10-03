export declare type DragType = 'left' | 'right' | 'touch';
interface DragDropComponent {
    element: HTMLElement;
    ownerDocument: Document;
    dragType: DragType;
    baseX: number;
    baseY: number;
    scaleX: number;
    scaleY: number;
}
export declare class DragState {
    _init: boolean;
    event: MouseEvent | TouchEvent;
    component: DragDropComponent;
    pageX: number;
    pageY: number;
    clientX: number;
    clientY: number;
    dx: number;
    dy: number;
    constructor(event: MouseEvent | TouchEvent, component: DragDropComponent, init?: boolean);
    moved(): boolean;
    /**
     * @param refElement, the element being moved
     * @param draggingHtml, the element show in the dragging layer
     */
    startDrag(refElement?: HTMLElement, draggingHtml?: HTMLElement | string): void;
    setData(data?: {
        [key: string]: any;
    }, scope?: any): void;
    static getData(field: string, scope?: any): any;
    get dragType(): DragType;
    acceptMessage: string;
    rejected: boolean;
    accept(message?: string): void;
    reject(): void;
    _onMove(): void;
    _onDragEnd(canceled?: boolean): void;
}
export declare type DragHandler = (state: DragState) => void;
interface DragHandlers {
    onDragOverT?: DragHandler;
    onDragLeaveT?: DragHandler;
    onDropT?: DragHandler;
}
export declare function isDragging(): boolean;
export declare function addHandlers(element: HTMLElement, handlers: DragHandlers): void;
export declare function removeHandlers(element: HTMLElement): void;
export declare function destroyDraggingElement(e: DragState): void;
export declare function addDragStateListener(callback: (scope: any) => void): void;
export declare function removeDragStateListener(callback: (scope: any) => void): void;
export {};
