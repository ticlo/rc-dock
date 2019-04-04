import React, {CSSProperties} from "react";
import {DragHandler, DragManager} from "./DragManager";

export type AbstractPointerEvent = MouseEvent | TouchEvent;
type PointerEventHandler = (e: AbstractPointerEvent, dx: number, dy: number, pageX: number, pageY: number) => void;

export type DragInitFunction = (referenceElement: HTMLElement, moveListener?: PointerEventHandler, endListener?: PointerEventHandler) => void;
export type DragInitHandler = (event: PointerEvent, initFunction: DragInitFunction) => void;

interface DragInitiatorProps {
  className?: string;
  style?: CSSProperties;
  getRef?: (ref: HTMLDivElement) => void;
  onDragInit?: DragInitHandler;
  onDragStart?: DragHandler;
  onDragOver?: DragHandler;
  onDragLeave?: DragHandler;
  onDrop?: DragHandler;
}

export class DragInitiator extends React.Component<DragInitiatorProps, any> {

  _ref: HTMLDivElement;

  _getRef = (r: HTMLDivElement) => {
    this._ref = r;
    let {getRef} = this.props;
    if (getRef) {
      getRef(r);
    }
    let {onDragOver, onDrop, onDragLeave} = this.props;
    if (onDragOver) {
      DragManager.addHandlers(r, {onDragOver, onDragLeave, onDrop});
    }
  };

  moveListener?: PointerEventHandler;
  endListener?: PointerEventHandler;
  dragging: boolean = false;
  isTouch: boolean = false;
  baseX: number;
  baseY: number;
  scaleX: number;
  scaleY: number;
  waitingMove: boolean;
  onPointerDown = (e: React.PointerEvent) => {
    let {onDragInit, onDragStart} = this.props;
    if (onDragInit) {
      onDragInit(e.nativeEvent,
        (referenceElement?: HTMLElement, moveListener?: PointerEventHandler, endListener?: PointerEventHandler) => {
          // simple drag move that doesn't use DragManager
          if (this.dragging) {
            this.onEnd();
          }
          this.baseX = e.pageX;
          this.baseY = e.pageY;
          if (!referenceElement) {
            referenceElement = (e.nativeEvent.target as HTMLElement).parentElement;
          }
          let rect = referenceElement.getBoundingClientRect();
          this.scaleX = referenceElement.offsetWidth / rect.width;
          this.scaleY = referenceElement.offsetHeight / rect.height;

          this.moveListener = moveListener;
          this.endListener = endListener;
          this.addListeners(e);
        });
    }
    if (onDragStart && !this.dragging) {
      this.waitingMove = true;
      this.addListeners(e);
    }
  };

  addListeners(e: React.PointerEvent) {
    if (e.pointerType === 'touch') {
      this.isTouch = true;
      document.addEventListener('touchmove', this.onTouchMove);
      document.addEventListener('touchend', this.onTouchEnd);
    } else {
      this.isTouch = false;
      document.addEventListener('mousemove', this.onMouseMove);
      document.addEventListener('mouseup', this.onMouseEnd);
    }

    this.dragging = true;
    e.stopPropagation();
  }

  onMouseMove = (e: MouseEvent) => {
    if (e && this.moveListener) {
      let {pageX, pageY} = e;
      this.moveListener(e, (pageX - this.baseX) * this.scaleX, (pageY - this.baseY) * this.scaleY, pageX, pageY);
    }
    e.preventDefault();
  };

  onMouseEnd = (e?: MouseEvent) => {
    if (e && this.endListener) {
      let {pageX, pageY} = e;
      this.endListener(e, (pageX - this.baseX) * this.scaleX, (pageY - this.baseY) * this.scaleY, pageX, pageY);
    }

    document.removeEventListener('mousemove', this.onMouseMove);
    document.removeEventListener('mouseup', this.onMouseEnd);
    this.moveListener = null;
    this.endListener = null;
    this.dragging = false;
  };

  onTouchMove = (e: TouchEvent) => {
    if (e.touches.length !== 1) {
      this.onTouchEnd();
    } else if (this.moveListener) {
      let {pageX, pageY} = e.touches[0];
      this.moveListener(e, (pageX - this.baseX) * this.scaleX, (pageY - this.baseY) * this.scaleY, pageX, pageY);
    }
    e.preventDefault();
  };
  onTouchEnd = (e?: TouchEvent) => {
    if (this.endListener) {
      if (e) {
        let {pageX, pageY} = e.changedTouches[0];
        this.endListener(e, (pageX - this.baseX) * this.scaleX, (pageY - this.baseY) * this.scaleY, pageX, pageY);
      } else {
        // canceled
        this.endListener(null, 0, 0, 0, 0);
      }
    }
    document.removeEventListener('touchmove', this.onTouchMove);
    document.removeEventListener('touchend', this.onTouchEnd);
    this.dragging = false;
  };

  onEnd() {
    if (this.isTouch) {
      this.onTouchEnd();
    } else {
      this.onMouseEnd();
    }
  }

  render(): React.ReactNode {
    let {children, onDragInit, onDragStart, onDragOver, onDragLeave, onDrop, ...others} = this.props;
    let onPointerDown = this.onPointerDown;
    if (!(onDragInit || onDragStart)) {
      onPointerDown = null;
    }
    return (
      <div ref={this._getRef} {...others} onPointerDown={this.onPointerDown}>
        {children}
      </div>
    );
  }

  componentWillUnmount(): void {
    if (this.dragging) {
      this.onEnd();
    }
  }
}