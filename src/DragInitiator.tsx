import React from "react";

export type AbstractPointerEvent = MouseEvent | TouchEvent;
type PointerEventHandler = (e: AbstractPointerEvent, dx: number, dy: number) => void;

export type DragInitFunction = (referenceElement: HTMLElement, moveListener?: PointerEventHandler, endListener?: PointerEventHandler) => void;
export type DragInitHandler = (event: PointerEvent, initFunction: DragInitFunction) => void;

interface DragInitiatorProps extends React.HTMLAttributes<HTMLDivElement> {
  getRef?: React.Ref<HTMLDivElement>;
  onDragInit?: DragInitHandler;
}

export class DragInitiator extends React.Component<DragInitiatorProps, any> {

  moveListener?: PointerEventHandler;
  endListener?: PointerEventHandler;
  dragging: boolean = false;
  isTouch: boolean = false;
  baseX: number;
  baseY: number;
  scaleX: number;
  scaleY: number;
  onPointerDown = (e: React.PointerEvent) => {
    let {onDragInit} = this.props;
    if (onDragInit) {
      onDragInit(e.nativeEvent,
        (referenceElement?: HTMLElement, moveListener?: PointerEventHandler, endListener?: PointerEventHandler) => {
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
        });
    }
  };
  onMouseMove = (e: MouseEvent) => {
    if (e && this.moveListener) {
      this.moveListener(e, (e.pageX - this.baseX) * this.scaleX, (e.pageY - this.baseY) * this.scaleY);
    }
    e.preventDefault();
  };

  onMouseEnd = (e?: MouseEvent) => {
    if (e && this.endListener) {
      this.endListener(e, (e.pageX - this.baseX) * this.scaleX, (e.pageY - this.baseY) * this.scaleY);
    }

    document.removeEventListener('mousemove', this.onMouseMove);
    document.removeEventListener('mouseup', this.onMouseEnd);
    this.dragging = false;
  };

  onTouchMove = (e: TouchEvent) => {
    if (e.touches.length !== 1) {
      this.onTouchEnd();
    } else if (this.moveListener) {
      this.moveListener(e, (e.touches[0].pageX - this.baseX) * this.scaleX, (e.touches[0].pageY - this.baseY) * this.scaleY);
    }
    e.preventDefault();
  };
  onTouchEnd = (e?: TouchEvent) => {
    if (this.endListener) {
      if (e) {
        this.endListener(e, (e.changedTouches[0].pageX - this.baseX) * this.scaleX, (e.changedTouches[0].pageY - this.baseY) * this.scaleY);
      } else {
        // canceled
        this.endListener(null, 0, 0);
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
    let {getRef, children, onDragInit, onPointerDown, ...others} = this.props;
    return (
      <div ref={getRef} {...others} onPointerDown={this.onPointerDown}>
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