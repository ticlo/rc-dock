interface DragDropComponent {
  element: HTMLElement;

  baseX: number;
  baseY: number;
  scaleX: number;
  scaleY: number;

  startDrag(element: HTMLElement, state: DragState): void;
}

export class DragState {
  _init: boolean;
  event: MouseEvent | TouchEvent;
  component: DragDropComponent;
  pageX = 0;
  pageY = 0;
  dx = 0;
  dy = 0;

  constructor(event: MouseEvent | TouchEvent, component: DragDropComponent, init = false) {
    this.event = event;
    this.component = component;
    this._init = init;
    if (event) {
      if (event instanceof MouseEvent) {
        this.pageX = event.pageX;
        this.pageY = event.pageY;
      } else if (event instanceof TouchEvent && event.touches.length) {
        this.pageX = event.touches[0].pageX;
        this.pageY = event.touches[0].pageY;
      }
      if (init) {
        this.dx = 0;
        this.dy = 0;
      } else {
        this.dx = (this.pageX - component.baseX) * component.scaleX;
        this.dy = (this.pageY - component.baseY) * component.scaleY;
      }
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
    if (this.component) {
      this.component.startDrag(refElement, this);
    }
    if (refElement === undefined) {
      refElement = this.component.element;
    }

    if (draggingHtml === undefined && refElement != null) {
      draggingHtml = refElement.outerHTML;
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

  getData(field: string, scope?: any) {
    if (scope === _scope && _data) {
      return _data[field];
    }
    return null;
  }

  style: string;

  accept(style: string) {
    this.style = style;
  }

  moved() {
    let searchElement = document.elementFromPoint(this.pageX, this.pageY) as HTMLElement;
    let droppingHandlers: DragHandlers;
    while (searchElement && searchElement !== document.body) {
      if (_dragListeners.has(searchElement)) {
        let handlers = _dragListeners.get(searchElement);
        if (handlers.onDragOver) {
          handlers.onDragOver(this);
          if (this.style != null) {
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
    if (_droppingHandlers && _droppingHandlers.onDrop) {
      _droppingHandlers.onDrop(this);
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
  if (_droppingHandlers && _droppingHandlers.onDragLeave) {
    _droppingHandlers.onDragLeave(state);
  }
  _droppingHandlers = handlers;
}

interface DragHandlers {
  onDragOver: DragHandler;
  onDragLeave: DragHandler;
  onDrop: DragHandler;
}

let _dragListeners: WeakMap<HTMLElement, DragHandlers> = new WeakMap<HTMLElement, DragHandlers>();

export function isDragging() {
  return _draggingState != null;
}

export function addHandlers(element: HTMLElement, handlers: DragHandlers) {
  _dragListeners.set(element, handlers);
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
  if (draggingHtml) {
    _draggingDiv.firstElementChild.outerHTML = draggingHtml;
  }
}

function moveDraggingElement(state: DragState) {
  _draggingDiv.style.left = `${state.pageX}px`;
  _draggingDiv.style.top = `${state.pageY}px`;
  if (state.style) {
    _draggingIcon.className = `dragging-icon-${state.style}`;
  } else {
    _draggingIcon.className = 'dragging-icon-not-allowed';
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

}


