"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class DragState {
    constructor(event, component, init = false) {
        this.pageX = 0;
        this.pageY = 0;
        this.clientX = 0;
        this.clientY = 0;
        this.dx = 0;
        this.dy = 0;
        this.event = event;
        this.component = component;
        this._init = init;
        if (event) {
            if (event instanceof MouseEvent) {
                this.pageX = event.pageX;
                this.pageY = event.pageY;
                this.clientX = event.clientX;
                this.clientY = event.clientY;
            }
            else if (event instanceof TouchEvent && event.touches.length) {
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
    startDrag(refElement, draggingHtml) {
        if (!this._init) {
            throw new Error('startDrag can only be used in onDragStart callback');
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
    static getData(field, scope) {
        if (scope === _scope && _data) {
            return _data[field];
        }
        return null;
    }
    accept(message) {
        this.acceptMessage = message;
    }
    reject() {
        this.rejected = true;
    }
    moved() {
        let searchElement = document.elementFromPoint(this.pageX, this.pageY);
        let droppingHandlers;
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
exports.DragState = DragState;
let _scope;
let _data;
let _draggingState;
// applying dragging style
let _refElement;
let _droppingHandlers;
function setDroppingHandler(handlers, state) {
    if (_droppingHandlers === handlers) {
        return;
    }
    if (_droppingHandlers && _droppingHandlers.onDragLeaveT) {
        _droppingHandlers.onDragLeaveT(state);
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
function removeHandlers(element) {
    _dragListeners.delete(element);
}
exports.removeHandlers = removeHandlers;
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
    if (state.rejected) {
        _draggingIcon.innerText = '🚫';
    }
    else if (state.acceptMessage != null) {
        _draggingIcon.innerText = state.acceptMessage;
    }
    else {
        _draggingIcon.innerText = '';
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