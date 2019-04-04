
export class DragState {
  event: MouseEvent | TouchEvent;
  pageX: number;
  pageY: number;

  constructor(event: MouseEvent | TouchEvent) {
    this.event = event;
    if (event instanceof MouseEvent) {
      this.pageX = event.pageX;
      this.pageY = event.pageY;
    } else if (event instanceof TouchEvent && event.touches.length) {
      this.pageX = event.touches[0].pageX;
      this.pageY = event.touches[0].pageY;
    }
  }

  style: string;

  accept(style: string) {
    this.style = style;
  }
}

export type DragHandler = (state: DragState) => void;


let _scope: any;
let _draggingElement: HTMLElement;
let _data: {[key: string]: any};

let _dragEndListened = false;

interface DragHandlers {
  onDragOver: DragHandler;
  onDragLeave: DragHandler;
  onDrop: DragHandler;
}

let _dragListeners: WeakMap<HTMLElement, DragHandlers> = new WeakMap<HTMLElement, DragHandlers>();

export class DragManager {

  static addHandlers(element: HTMLElement, handlers: DragHandlers) {
    _dragListeners.set(element, handlers);
  }

  static dragStart(scope: any, data: {[key: string]: any}, event: DragEvent, element?: any, dragText: string = ' ') {
    _scope = scope;
    _data = data;
    if (element instanceof HTMLElement) {
      element.classList.add('dragging');
      _draggingElement = element;
    }

    // required in firefox
    event.dataTransfer.setData('text', dragText);

    if (!_dragEndListened) {
      document.addEventListener('dragend', DragManager.dragEnd);
      _dragEndListened = true;
    }
  }

  static getData(scope: any, field: string) {
    if (scope === _scope && _data) {
      return _data[field];
    }
    return null;
  }

  static dragEnd() {
    _scope = null;
    _data = null;
    if (_draggingElement) {
      _draggingElement.classList.remove('dragging');
      _draggingElement = null;
    }
  }
}


