export type DragType = 'left' | 'right' | 'touch';
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
    dropped: any;
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
    getData(field: string, scope?: any): any;
    static getData(field: string, scope?: any): any;
    get dragType(): DragType;
    acceptMessage: string;
    rejected: boolean;
    accept(message?: string): void;
    reject(): void;
    _onMove(): void;
    _onDragEnd(canceled?: boolean): void;
    getRect(): DOMRect;
}
export type DragHandler = (state: DragState) => void;
export type DropHandler = (state: DragState) => any;
export interface DragHandlers {
    onDragOverT?: DragHandler;
    onDragLeaveT?: DragHandler;
    onDropT?: DropHandler;
}
export interface HandlerHost {
    getHandlers(): DragHandlers;
}
export declare function isDragging(): boolean;
export declare function addHandlers(element: HTMLElement, handler: HandlerHost): void;
export declare function removeHandlers(element: HTMLElement): void;
export declare function destroyDraggingElement(e: DragState): void;
export declare function addDragStateListener(callback: (scope: any) => void): void;
export declare function removeDragStateListener(callback: (scope: any) => void): void;
export {};
