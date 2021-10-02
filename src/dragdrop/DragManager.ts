export type DragType = 'left' | 'right' | 'touch';

interface DragDropComponent {
  element: HTMLElement;
  ownerDocument: Document;
  dragType: DragType;
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
      if (event.type.startsWith('touch')) {
        let touch: Touch;
        if (event.type === 'touchend') {
          touch = (event as TouchEvent).changedTouches[0];
        } else {
          touch = (event as TouchEvent).touches[0];
        }

        this.pageX = touch.pageX;
        this.pageY = touch.pageY;
        this.clientX = touch.clientX;
        this.clientY = touch.clientY;
      } else if ('pageX' in event) {
        this.pageX = event.pageX;
        this.pageY = event.pageY;
        this.clientX = event.clientX;
        this.clientY = event.clientY;
      }
      this.dx = (this.pageX - component.baseX) * component.scaleX;
      this.dy = (this.pageY - component.baseY) * component.scaleY;
    }
  }

  moved(): boolean {
    return Math.abs(this.dx) >= 1 || Math.abs(this.dy) >= 1;
  }

  /**
   * @param refElement, the element being moved
   * @param draggingHtml, the element show in the dragging layer
   */
  startDrag(refElement?: HTMLElement, draggingHtml?: HTMLElement | string) {
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
    _dataScope = scope;
    _data = data;
  }

  static getData(field: string, scope?: any) {
    if (scope === _dataScope && _data) {
      return _data[field];
    }
    return null;
  }

  get dragType(): DragType {
    return this.component.dragType;
  }

  acceptMessage: string;
  rejected: boolean;

  accept(message: string = '') {
    this.acceptMessage = message;
    this.rejected = false;
  }

  reject() {
    this.rejected = true;
  }

  _onMove() {
    if (_data) {
      let ownerDocument = this.component.ownerDocument;
      let searchElement = ownerDocument.elementFromPoint(this.clientX, this.clientY) as HTMLElement;
      let droppingHandlers: DragHandlers;
      while (searchElement && searchElement !== ownerDocument.body) {
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
    }
    moveDraggingElement(this);
  }

  _onDragEnd() {
    if (_droppingHandlers && _droppingHandlers.onDropT) {
      _droppingHandlers.onDropT(this);
    }
    if (this.component.dragType === 'right') {
      // prevent the next menu event if drop handler is called on right mouse button
      this.component.ownerDocument.addEventListener('contextmenu', preventDefault, true);
      setTimeout(() => {
        this.component.ownerDocument.removeEventListener('contextmenu', preventDefault, true);
      }, 0);
    }
    destroyDraggingElement(this);
  }
}

function preventDefault(e: Event) {
  e.preventDefault();
  e.stopPropagation();
}


export type DragHandler = (state: DragState) => void;


let _dataScope: any;
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
  onDragOverT?: DragHandler;
  onDragLeaveT?: DragHandler;
  onDropT?: DragHandler;
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

let _draggingDiv: HTMLDivElement;
let _draggingIcon: HTMLDivElement;

function _createDraggingDiv(doc: Document) {
  _draggingDiv = doc.createElement('div');
  _draggingIcon = doc.createElement('div');
  _draggingDiv.className = 'dragging-layer';
  _draggingDiv.appendChild(document.createElement('div')); // place holder for dragging element
  _draggingDiv.appendChild(_draggingIcon);
}


function createDraggingElement(state: DragState, refElement: HTMLElement, draggingHtml?: HTMLElement | string) {
  _draggingState = state;
  if (refElement) {
    refElement.classList.add('dragging');
    _refElement = refElement;
  }
  _createDraggingDiv(state.component.ownerDocument);
  state.component.ownerDocument.body.appendChild(_draggingDiv);

  let draggingWidth = 0;
  let draggingHeight = 0;
  if (draggingHtml === undefined) {
    draggingHtml = state.component.element;
  }
  if (draggingHtml && 'outerHTML' in (draggingHtml as any)) {
    draggingWidth = (draggingHtml as HTMLElement).offsetWidth;
    draggingHeight = (draggingHtml as HTMLElement).offsetHeight;
    draggingHtml = (draggingHtml as HTMLElement).outerHTML;

  }
  if (draggingHtml) {
    _draggingDiv.firstElementChild.outerHTML = draggingHtml as string;
    if (window.getComputedStyle(_draggingDiv.firstElementChild).backgroundColor === 'rgba(0, 0, 0, 0)') {
      (_draggingDiv.firstElementChild as HTMLElement).style.backgroundColor
        = window.getComputedStyle(_draggingDiv).getPropertyValue('--default-background-color');
    }
    if (draggingWidth) {
      if (draggingWidth > 400) draggingWidth = 400;
      (_draggingDiv.firstElementChild as HTMLElement).style.width = `${draggingWidth}px`;
    }
    if (draggingHeight) {
      if (draggingHeight > 300) draggingHeight = 300;
      (_draggingDiv.firstElementChild as HTMLElement).style.height = `${draggingHeight}px`;
    }
  }

  for (let callback of _dragStateListener) {
    if (_dataScope) {
      callback(_dataScope);
    } else {
      callback(true);
    }
  }
}

function moveDraggingElement(state: DragState) {
  _draggingDiv.style.left = `${state.pageX}px`;
  _draggingDiv.style.top = `${state.pageY}px`;

  if (state.rejected) {
    _draggingIcon.className = 'drag-accept-reject';
  } else if (state.acceptMessage) {
    _draggingIcon.className = state.acceptMessage;
  } else {
    _draggingIcon.className = '';
  }
}


export function destroyDraggingElement(e: DragState) {
  if (_refElement) {
    _refElement.classList.remove('dragging');
    _refElement = null;
  }
  if (_draggingDiv) {
    _draggingDiv.remove();
    _draggingDiv = null;
  }


  _draggingState = null;
  setDroppingHandler(null, e);

  _dataScope = null;
  _data = null;

  for (let callback of _dragStateListener) {
    callback(null);
  }
}


let _dragStateListener: Set<(scope: any) => void> = new Set();

export function addDragStateListener(callback: (scope: any) => void) {
  _dragStateListener.add(callback);
}

export function removeDragStateListener(callback: (scope: any) => void) {
  _dragStateListener.delete(callback);
}

// work around for drag scroll issue on IOS
if (typeof window !== 'undefined' && window.navigator && window.navigator.platform && /iP(ad|hone|od)/.test(window.navigator.platform)) {
  document.addEventListener('touchmove', (e: TouchEvent) => {
    if (e.touches.length === 1 && document.body.classList.contains('dock-dragging')) {
      e.preventDefault();
    }
  }, {passive: false});
}
