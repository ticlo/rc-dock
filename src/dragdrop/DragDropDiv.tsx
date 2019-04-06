import React, {CSSProperties} from "react";
import * as DragManager from "./DragManager";

export type AbstractPointerEvent = MouseEvent | TouchEvent;

interface DragDropDivProps {
  className?: string;
  style?: CSSProperties;
  getRef?: (ref: HTMLDivElement) => void;
  onDragStart?: DragManager.DragHandler;
  onDragMove?: DragManager.DragHandler;
  onDragEnd?: DragManager.DragHandler;
  onDragOver?: DragManager.DragHandler;
  onDragLeave?: DragManager.DragHandler;
  onDrop?: DragManager.DragHandler;
}

export class DragDropDiv extends React.Component<DragDropDivProps, any> {

  element: HTMLElement;

  _getRef = (r: HTMLDivElement) => {
    this.element = r;
    let {getRef} = this.props;
    if (getRef) {
      getRef(r);
    }
    let {onDragOver, onDrop, onDragLeave} = this.props;
    if (onDragOver) {
      DragManager.addHandlers(r, {onDragOver, onDragLeave, onDrop});
    }
  };

  dragging: boolean = false;
  isTouch: boolean = false;
  baseX: number;
  baseY: number;
  scaleX: number;
  scaleY: number;
  waitingMove: boolean;
  onPointerDown = (e: React.PointerEvent) => {
    this.addListeners(e);
  };

  startDrag(element: HTMLElement, state: DragManager.DragState) {
    if (!element) {
      element = this.element;
    }

    this.baseX = state.pageX;
    this.baseY = state.pageY;

    let rect = element.getBoundingClientRect();
    this.scaleX = element.offsetWidth / rect.width;
    this.scaleY = element.offsetHeight / rect.height;
  }

  addListeners(e: React.PointerEvent) {
    let {onDragStart} = this.props;

    if (this.dragging) {
      this.onEnd();
    }
    if (e.pointerType === 'touch') {
      this.isTouch = true;
      document.addEventListener('touchmove', this.onTouchMove);
      document.addEventListener('touchend', this.onTouchEnd);
    } else {
      this.isTouch = false;
      document.addEventListener('mousemove', this.onMouseMove);
      document.addEventListener('mouseup', this.onMouseEnd);
    }

    this.waitingMove = true;
    this.dragging = true;
    e.stopPropagation();
  }

  // return true
  checkFirstMove(e: AbstractPointerEvent) {
    let {onDragStart} = this.props;
    this.waitingMove = false;
    let state = new DragManager.DragState(e, this, true);
    onDragStart(state);
    if (!DragManager.isDragging()) {
      this.onEnd();
      return false;
    }
    state.moved();
    document.addEventListener('keydown', this.onKeyDown);
    return true;
  }

  onMouseMove = (e: MouseEvent) => {
    let {onDragMove} = this.props;
    if (this.waitingMove) {
      if (!this.checkFirstMove(e)) {
        return;
      }
    } else {
      let state = new DragManager.DragState(e, this);
      if (onDragMove) {
        onDragMove(state);
      }
      state.moved();
    }
    e.preventDefault();
  };

  onMouseEnd = (e?: MouseEvent) => {
    let {onDragEnd} = this.props;
    let state = new DragManager.DragState(e, this);
    if (onDragEnd) {
      onDragEnd(state);
    }
    state.dropped();

    document.removeEventListener('mousemove', this.onMouseMove);
    document.removeEventListener('mouseup', this.onMouseEnd);
    this.cleanup();
  };

  onTouchMove = (e: TouchEvent) => {
    let {onDragMove} = this.props;
    if (this.waitingMove) {
      if (!this.checkFirstMove(e)) {
        return;
      }
    } else if (e.touches.length !== 1) {
      this.onTouchEnd();
    } else {
      let state = new DragManager.DragState(e, this);
      if (onDragMove) {
        onDragMove(state);
      }
      state.moved();
    }
    e.preventDefault();
  };
  onTouchEnd = (e?: TouchEvent) => {
    let {onDragEnd} = this.props;
    let state = new DragManager.DragState(e, this);
    if (onDragEnd) {
      onDragEnd(state);
    }
    state.dropped();
    document.removeEventListener('touchmove', this.onTouchMove);
    document.removeEventListener('touchend', this.onTouchEnd);
    this.cleanup();

  };

  onKeyDown = (e?: KeyboardEvent) => {
    if (e.key === 'Escape') {
      this.onEnd();
    }
  };

  cleanup() {
    this.dragging = false;
    this.waitingMove = false;
    document.removeEventListener('keydown', this.onKeyDown);
    DragManager.destroyDraggingElement();
  }

  onEnd() {
    if (this.isTouch) {
      this.onTouchEnd();
    } else {
      this.onMouseEnd();
    }
  }

  render(): React.ReactNode {
    let {children, onDragStart, onDragMove, onDragEnd, onDragOver, onDragLeave, onDrop, ...others} = this.props;
    let onPointerDown = this.onPointerDown;
    if (!onDragStart) {
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