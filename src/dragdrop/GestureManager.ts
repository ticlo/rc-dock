import {DragType} from "./DragManager";

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

export class GestureState {
  _init: boolean;
  event: TouchEvent;
  component: GestureComponent;

  dx1 = 0;
  dy1 = 0;
  dx2 = 0;
  dy2 = 0;

  scale = 1;
  rotate = 0;
  dx = 0;
  dy = 0;

  moved() {
    return Math.max(Math.abs(this.dx1), Math.abs(this.dx2), Math.abs(this.dy1), Math.abs(this.dy2));
  }

  pageCenter(): [number, number] {
    let touch1 = this.event.touches[0];
    let touch2 = this.event.touches[1];
    return [(touch1.pageX + touch2.pageX) / 2, (touch1.pageY + touch2.pageY) / 2];
  }

  clientCenter(): [number, number] {
    let touch1 = this.event.touches[0];
    let touch2 = this.event.touches[1];
    return [(touch1.clientX + touch2.clientX) / 2, (touch1.clientY + touch2.clientY) / 2];
  }

  constructor(event: | TouchEvent, component: GestureComponent, init = false) {
    this.event = event;
    this.component = component;
    this._init = init;

    if (!event || event.touches.length !== 2) {
      return;
    }

    let touch1 = event.touches[0];
    let touch2 = event.touches[1];

    this.dx1 = (touch1.pageX - component.baseX) * component.scaleX;
    this.dy1 = (touch1.pageY - component.baseY) * component.scaleY;
    this.dx2 = (touch2.pageX - component.baseX2) * component.scaleX;
    this.dy2 = (touch2.pageY - component.baseY2) * component.scaleY;

    if (this.dx1 * this.dx2 >= 0) {
      this.dx = (this.dx1 + this.dx2) / 2;
    }
    if (this.dy1 * this.dy2 >= 0) {
      this.dy = (this.dy1 + this.dy2) / 2;
    }
    this.scale = Math.sqrt(Math.pow(touch2.pageX - touch1.pageX, 2) + Math.pow(touch2.pageY - touch1.pageY, 2)) / component.baseDis;
    this.rotate = Math.atan2(touch2.pageY - touch1.pageY, touch2.pageX - touch1.pageX) - component.baseAng;
    if (this.rotate > Math.PI) {
      this.rotate -= Math.PI * 2;
    } else if (this.rotate < -Math.PI) {
      this.rotate += Math.PI * 2;
    }
  }
}
