import { TabData } from "../DockData";
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
export declare type DragHandler = (state: DragState) => void;
interface DragHandlers {
    onDragOverT?: DragHandler;
    onDragLeaveT?: DragHandler;
    onDropT?: DragHandler;
}
export declare function isDragging(): boolean;
export declare function addHandlers(element: HTMLElement, handlers: DragHandlers): void;
export declare function removeHandlers(element: HTMLElement): void;
export declare function addDragStateListener(callback: (scope: any) => void): void;
export declare function removeDragStateListener(callback: (scope: any) => void): void;
declare class DndDragState {
    event: MouseEvent | TouchEvent | undefined;
    component: DragDropComponent;
    pageX: number;
    pageY: number;
    clientX: number;
    clientY: number;
    dx: number;
    dy: number;
    acceptMessage: string;
    rejected: boolean;
    constructor(event: MouseEvent | TouchEvent | undefined, component: DragDropComponent, init?: boolean);
    startDrag(refElement?: HTMLElement, draggingHtml?: HTMLElement | string): void;
    setData(data?: {
        [key: string]: any;
    }, scope?: any): void;
    static getData(field: string, scope?: any): any;
    accept(message?: string): void;
    reject(): void;
    moved(): boolean;
    _onDragEnd(canceled?: boolean): void;
    _onMove(): void;
}
export declare function dragEnd(): void;
export declare function getTabByDockId(dockId: any): TabData;
declare const DragStateImpl: typeof DndDragState;
export declare class DragState extends DragStateImpl {
}
export {};
