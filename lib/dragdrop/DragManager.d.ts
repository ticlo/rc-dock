export declare class DragState {
    event: MouseEvent | TouchEvent;
    pageX: number;
    pageY: number;
    constructor(event: MouseEvent | TouchEvent);
    style: string;
    accept(style: string): void;
}
export declare type DragHandler = (state: DragState) => void;
interface DragHandlers {
    onDragOver: DragHandler;
    onDragLeave: DragHandler;
    onDrop: DragHandler;
}
export declare class DragManager {
    static addHandlers(element: HTMLElement, handlers: DragHandlers): void;
    static dragStart(scope: any, data: {
        [key: string]: any;
    }, event: DragEvent, element?: any, dragText?: string): void;
    static getData(scope: any, field: string): any;
    static dragEnd(): void;
}
export {};
