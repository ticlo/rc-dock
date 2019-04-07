interface DragDropComponent {
  element: HTMLElement;
  baseX: number;
  baseY: number;
  scaleX: number;
  scaleY: number;
}

export class DragState {
  _init: boolean;
  event: MouseEvent | TouchEvent;
  component: DragDropComponent;
  pageX = 0;
  pageY = 0;
  clientX = 0;
  clientY = 0;
  dx = 0;
  dy = 0;

  constructor(event: MouseEvent | TouchEvent, component: DragDropComponent, init = false) {
    this.event = event;
    this.component = component;
    this._init = init;
    if (event) {
      if ('pageX' in event) {
        this.pageX = event.pageX;
        this.pageY = event.pageY;
        this.clientX = event.clientX;
        this.clientY = event.clientY;
      } else if (event instanceof TouchEvent && event.touches.length) {
        let touch = event.touches[0];
        this.pageX = touch.pageX;
        this.pageY = touch.pageY;
        this.clientX = touch.clientX;
        this.clientY = touch.clientY;
      }
      this.dx = (this.pageX - component.baseX) * component.scaleX;
      this.dy = (this.pageY - component.baseY) * component.scaleY;
    }
  }

  /**
   * @param refElement, the element being moved
   * @param draggingHtml, the element show in the dragging layer
   */
  startDrag(refElement?: HTMLElement, draggingHtml?: string) {
    if (!this._init) {
      throw new Error('startDrag can only be used in onDragStart callback');
    }
    if (refElement === undefined) {
      refElement = this.component.element;
    }

    createDraggingElement(this, refElement, draggingHtml);
  }

  setData(data?: {[key: string]: any}, scope?: any) {
    if (!this._init) {
      throw new Error('setData can only be used in onDragStart callback');
    }
    _scope = scope;
    _data = data;
  }

  static getData(field: string, scope?: any) {
    if (scope === _scope && _data) {
      return _data[field];
    }
    return null;
  }

  acceptMessage: string;
  rejected: boolean;

  accept(message: string) {
    this.acceptMessage = message;
  }

  reject() {
    this.rejected = true;
  }

  moved() {
    let searchElement = document.elementFromPoint(this.pageX, this.pageY) as HTMLElement;
    let droppingHandlers: DragHandlers;
    while (searchElement && searchElement !== document.body) {
      if (_dragListeners.has(searchElement)) {
        let handlers = _dragListeners.get(searchElement);
        if (handlers.onDragOverT) {
          handlers.onDragOverT(this);
          if (this.acceptMessage != null) {
            droppingHandlers = handlers;
            break;
          }
        }
      }
      searchElement = searchElement.parentElement;
    }
    setDroppingHandler(droppingHandlers, this);
    moveDraggingElement(this);
  }

  dropped() {
    if (_droppingHandlers && _droppingHandlers.onDropT) {
      _droppingHandlers.onDropT(this);
    }
  }
}

export type DragHandler = (state: DragState) => void;


let _scope: any;
let _data: {[key: string]: any};

let _draggingState: DragState;
// applying dragging style
let _refElement: HTMLElement;
let _droppingHandlers: DragHandlers;

function setDroppingHandler(handlers: DragHandlers, state: DragState) {
  if (_droppingHandlers === handlers) {
    return;
  }
  if (_droppingHandlers && _droppingHandlers.onDragLeaveT) {
    _droppingHandlers.onDragLeaveT(state);
  }
  _droppingHandlers = handlers;
}

interface DragHandlers {
  onDragOverT: DragHandler;
  onDragLeaveT: DragHandler;
  onDropT: DragHandler;
}

let _dragListeners: WeakMap<HTMLElement, DragHandlers> = new WeakMap<HTMLElement, DragHandlers>();

export function isDragging() {
  return _draggingState != null;
}

export function addHandlers(element: HTMLElement, handlers: DragHandlers) {
  _dragListeners.set(element, handlers);
}

export function removeHandlers(element: HTMLElement) {
  let handlers = _dragListeners.get(element);
  if (handlers === _droppingHandlers) {
    _droppingHandlers = null;
  }
  _dragListeners.delete(element);
}

let _draggingDiv: HTMLDivElement = document.createElement('div');
let _draggingIcon: HTMLDivElement = document.createElement('div');
_draggingDiv.className = 'dragging-layer';
_draggingDiv.appendChild(document.createElement('div')); // place holder for dragging element
_draggingDiv.appendChild(_draggingIcon);

function createDraggingElement(state: DragState, refElement: HTMLElement, draggingHtml?: string) {
  _draggingState = state;
  if (refElement) {
    refElement.classList.add('dragging');
    _refElement = refElement;
  }

  document.body.appendChild(_draggingDiv);

  let draggingWidth = 0;
  let draggingHeight = 0;
  if (draggingHtml === undefined && refElement != null) {
    draggingHtml = refElement.outerHTML;
    draggingWidth = refElement.offsetWidth;
    draggingHeight = refElement.offsetHeight;
  }
  if (draggingHtml) {
    _draggingDiv.firstElementChild.outerHTML = draggingHtml;
    if (draggingWidth) {
      if (draggingWidth > 400) draggingWidth = 400;
      (_draggingDiv.firstElementChild as HTMLElement).style.width = `${draggingWidth}px`;
    }
    if (draggingHeight) {
      if (draggingHeight > 300) draggingHeight = 300;
      (_draggingDiv.firstElementChild as HTMLElement).style.height = `${draggingHeight}px`;
    }
  }
}

function moveDraggingElement(state: DragState) {
  _draggingDiv.style.left = `${state.pageX}px`;
  _draggingDiv.style.top = `${state.pageY}px`;

  if (state.rejected) {
    _draggingIcon.innerText = '🚫';
  } else if (state.acceptMessage != null) {
    _draggingIcon.innerText = state.acceptMessage;
  } else {
    _draggingIcon.innerText = '';
  }
}


export function destroyDraggingElement() {
  if (_refElement) {
    _refElement.classList.remove('dragging');
    _refElement = null;
  }

  _draggingDiv.firstElementChild.outerHTML = '<div/>';
  _draggingDiv.remove();

  _draggingState = null;
  _droppingHandlers = null;

  for (let callback of _dragEndListener) {
    callback();
  }
}


let _dragEndListener: Set<Function> = new Set<Function>();

export function addDragEndListener(callback: Function) {
  _dragEndListener.add(callback);
}

export function removeDragEndListener(callback: Function) {
  _dragEndListener.delete(callback);
}

let _lastPointerDownEvent: any;

export function checkPointerDownEvent(e: any) {
  if (e !== _lastPointerDownEvent) {
    _lastPointerDownEvent = e;
    return true;
  }
  return false;
}