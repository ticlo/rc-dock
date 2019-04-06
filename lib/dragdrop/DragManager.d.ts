interface DragDropComponent {
    element: HTMLElement;
    baseX: number;
    baseY: number;
    scaleX: number;
    scaleY: number;
    startDrag(element: HTMLElement, state: DragState): void;
}
export declare class DragState {
    _init: boolean;
    event: MouseEvent | TouchEvent;
    component: DragDropComponent;
    pageX: number;
    pageY: number;
    dx: number;
    dy: number;
    constructor(event: MouseEvent | TouchEvent, component: DragDropComponent, init?: boolean);
    /**
     * @param refElement, the element being moved
     * @param draggingHtml, the element show in the dragging layer
     */
    startDrag(refElement?: HTMLElement, draggingHtml?: string): void;
    setData(data?: {
        [key: string]: any;
    }, scope?: any): void;
    getData(field: string, scope?: any): any;
    style: string;
    accept(style: string): void;
    moved(): void;
    dropped(): void;
}
export declare type DragHandler = (state: DragState) => void;
interface DragHandlers {
    onDragOver: DragHandler;
    onDragLeave: DragHandler;
    onDrop: DragHandler;
}
export declare function isDragging(): boolean;
export declare function addHandlers(element: HTMLElement, handlers: DragHandlers): void;
export declare function destroyDraggingElement(): void;
export {};
