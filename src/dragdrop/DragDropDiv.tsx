import React, {CSSProperties} from "react";
import * as DragManager from "./DragManager";

export type AbstractPointerEvent = MouseEvent | TouchEvent;

interface DragDropDivProps extends React.HTMLAttributes<HTMLDivElement> {
  getRef?: (ref: HTMLDivElement) => void;
  onDragStartT?: DragManager.DragHandler;
  onDragMoveT?: DragManager.DragHandler;
  onDragEndT?: DragManager.DragHandler;
  onDragOverT?: DragManager.DragHandler;
  onDragLeaveT?: DragManager.DragHandler;
  onDropT?: DragManager.DragHandler;
  /**
   * by default onDragStartT will be called on first drag move
   * but if directDragT is true, onDragStartT will be called as soon as mouse is down
   */
  directDragT?: boolean;
}

export class DragDropDiv extends React.Component<DragDropDivProps, any> {

  element: HTMLElement;

  _getRef = (r: HTMLDivElement) => {
    if (r === this.element) {
      return;
    }
    let {getRef, onDragOverT, onDropT, onDragLeaveT} = this.props;
    if (this.element && onDragOverT) {
      DragManager.removeHandlers(this.element);
    }
    this.element = r;
    if (getRef) {
      getRef(r);
    }
    if (r && onDragOverT) {
      DragManager.addHandlers(r, {onDragOverT, onDragLeaveT, onDropT});
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
    if (!DragManager.checkPointerDownEvent(e.nativeEvent)) {
      // same pointer event shouldn't trigger 2 drag start
      return;
    }
    this.baseX = e.pageX;
    this.baseY = e.pageY;

    let baseElement = this.element.parentElement;
    let rect = baseElement.getBoundingClientRect();
    this.scaleX = baseElement.offsetWidth / Math.round(rect.width);
    this.scaleY = baseElement.offsetHeight / Math.round(rect.height);
    this.addListeners(e);
    if (this.props.directDragT) {
      let state = new DragManager.DragState(e.nativeEvent, this, true);
      this.executeFirstMove(state);
    }
  };

  addListeners(e: React.PointerEvent) {
    let {onDragStartT} = this.props;

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
    document.body.classList.add('dock-dragging');

    this.waitingMove = true;
    this.dragging = true;
  }

  // return true for a valid move
  checkFirstMove(e: AbstractPointerEvent) {
    let state = new DragManager.DragState(e, this, true);
    if (Math.abs(state.dx) < 1 && Math.abs(state.dy) < 1) {
      // not a move
      return false;
    }
    return this.executeFirstMove(state);
  }

  executeFirstMove(state: DragManager.DragState): boolean {
    let {onDragStartT} = this.props;

    this.waitingMove = false;
    onDragStartT(state);
    if (!DragManager.isDragging()) {
      this.onEnd();
      return false;
    }
    state.moved();
    document.addEventListener('keydown', this.onKeyDown);
    return true;
  }


  onMouseMove = (e: MouseEvent) => {
    let {onDragMoveT} = this.props;
    if (this.waitingMove) {
      if (!this.checkFirstMove(e)) {
        return;
      }
    } else {
      let state = new DragManager.DragState(e, this);
      if (onDragMoveT) {
        onDragMoveT(state);
      }
      state.moved();
    }
    e.preventDefault();
  };

  onMouseEnd = (e?: MouseEvent) => {
    let {onDragEndT} = this.props;
    let state = new DragManager.DragState(e, this);
    if (onDragEndT && !this.waitingMove) {
      onDragEndT(state);
    }
    if (e) {
      state.dropped();
    }

    document.removeEventListener('mousemove', this.onMouseMove);
    document.removeEventListener('mouseup', this.onMouseEnd);
    this.cleanup();
  };

  onTouchMove = (e: TouchEvent) => {
    let {onDragMoveT} = this.props;
    if (this.waitingMove) {
      if (!this.checkFirstMove(e)) {
        return;
      }
    } else if (e.touches.length !== 1) {
      this.onTouchEnd();
    } else {
      let state = new DragManager.DragState(e, this);
      if (onDragMoveT) {
        onDragMoveT(state);
      }
      state.moved();
    }
    e.preventDefault();
  };
  onTouchEnd = (e?: TouchEvent) => {
    let {onDragEndT} = this.props;
    let state = new DragManager.DragState(e, this);
    if (onDragEndT && !this.waitingMove) {
      onDragEndT(state);
    }
    if (e) {
      state.dropped();
    }
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
    document.body.classList.remove('dock-dragging');
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
    let {
      getRef, children, className, onPointerDown,
      directDragT, onDragStartT, onDragMoveT, onDragEndT, onDragOverT, onDragLeaveT, onDropT,
      ...others
    } = this.props;
    if (!onPointerDown && onDragStartT) {
      onPointerDown = this.onPointerDown;
    }
    if (onDragStartT) {
      if (className) {
        className = `${className} drag-initiator`;
      } else {
        className = 'drag-initiator';
      }
    }

    return (
      <div ref={this._getRef} className={className} {...others} onPointerDown={onPointerDown}>
        {children}
      </div>
    );
  }

  componentWillUnmount(): void {
    let {onDragOverT} = this.props;
    if (this.element && onDragOverT) {
      DragManager.removeHandlers(this.element);
    }
    if (this.dragging) {
      this.onEnd();
    }
  }
}