import { DragType } from "./DragManager";
interface GestureComponent {
    element: HTMLElement;
    dragType: DragType;
    baseX: number;
    baseY: number;
    baseX2: number;
    baseY2: number;
    scaleX: number;
    scaleY: number;
    baseDis: number;
    baseAng: number;
}
export declare class GestureState {
    _init: boolean;
    event: TouchEvent;
    component: GestureComponent;
    dx1: number;
    dy1: number;
    dx2: number;
    dy2: number;
    scale: number;
    rotate: number;
    dx: number;
    dy: number;
    moved(): number;
    pageCenter(): [number, number];
    clientCenter(): [number, number];
    constructor(event: TouchEvent, component: GestureComponent, init?: boolean);
}
export {};
