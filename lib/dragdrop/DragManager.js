"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class DragState {
    constructor(event, component, init = false) {
        this.pageX = 0;
        this.pageY = 0;
        this.dx = 0;
        this.dy = 0;
        this.event = event;
        this.component = component;
        this._init = init;
        if (event) {
            if (event instanceof MouseEvent) {
                this.pageX = event.pageX;
                this.pageY = event.pageY;
            }
            else if (event instanceof TouchEvent && event.touches.length) {
                this.pageX = event.touches[0].pageX;
                this.pageY = event.touches[0].pageY;
            }
            if (init) {
                this.dx = 0;
                this.dy = 0;
            }
            else {
                this.dx = (this.pageX - component.baseX) * component.scaleX;
                this.dy = (this.pageY - component.baseY) * component.scaleY;
            }
        }
    }
    /**
     * @param refElement, the element being moved
     * @param draggingHtml, the element show in the dragging layer
     */
    startDrag(refElement, draggingHtml) {
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
    setData(data, scope) {
        if (!this._init) {
            throw new Error('setData can only be used in onDragStart callback');
        }
        _scope = scope;
        _data = data;
    }
    getData(field, scope) {
        if (scope === _scope && _data) {
            return _data[field];
        }
        return null;
    }
    accept(style) {
        this.style = style;
    }
    moved() {
        let searchElement = document.elementFromPoint(this.pageX, this.pageY);
        let droppingHandlers;
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
exports.DragState = DragState;
let _scope;
let _data;
let _draggingState;
// applying dragging style
let _refElement;
let _droppingHandlers;
function setDroppingHandler(handlers, state) {
    if (_droppingHandlers && _droppingHandlers.onDragLeave) {
        _droppingHandlers.onDragLeave(state);
    }
    _droppingHandlers = handlers;
}
let _dragListeners = new WeakMap();
function isDragging() {
    return _draggingState != null;
}
exports.isDragging = isDragging;
function addHandlers(element, handlers) {
    _dragListeners.set(element, handlers);
}
exports.addHandlers = addHandlers;
let _draggingDiv = document.createElement('div');
let _draggingIcon = document.createElement('div');
_draggingDiv.className = 'dragging-layer';
_draggingDiv.appendChild(document.createElement('div')); // place holder for dragging element
_draggingDiv.appendChild(_draggingIcon);
function createDraggingElement(state, refElement, draggingHtml) {
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
function moveDraggingElement(state) {
    _draggingDiv.style.left = `${state.pageX}px`;
    _draggingDiv.style.top = `${state.pageY}px`;
    if (state.style) {
        _draggingIcon.className = `dragging-icon-${state.style}`;
    }
    else {
        _draggingIcon.className = 'dragging-icon-not-allowed';
    }
}
function destroyDraggingElement() {
    if (_refElement) {
        _refElement.classList.remove('dragging');
        _refElement = null;
    }
    _draggingDiv.firstElementChild.outerHTML = '<div/>';
    _draggingDiv.remove();
    _draggingState = null;
    _droppingHandlers = null;
}
exports.destroyDraggingElement = destroyDraggingElement;
//# sourceMappingURL=DragManager.js.map