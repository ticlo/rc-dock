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
            if ('pageX' in event) {
                this.pageX = event.pageX;
                this.pageY = event.pageY;
                this.clientX = event.clientX;
                this.clientY = event.clientY;
            }
            else if (event instanceof TouchEvent) {
                let touch;
                if (event.type === 'touchend') {
                    touch = event.changedTouches[0];
                }
                else {
                    touch = event.touches[0];
                }
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
        createDraggingElement(this, refElement, draggingHtml);
    }
    setData(data, scope) {
        if (!this._init) {
            throw new Error('setData can only be used in onDragStart callback');
        }
        _dataCcope = scope;
        _data = data;
    }
    static getData(field, scope) {
        if (scope === _dataCcope && _data) {
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
let _dataCcope;
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
    let handlers = _dragListeners.get(element);
    if (handlers === _droppingHandlers) {
        _droppingHandlers = null;
    }
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
    let draggingWidth = 0;
    let draggingHeight = 0;
    if (draggingHtml === undefined) {
        draggingHtml = state.component.element;
    }
    if (draggingHtml instanceof HTMLElement) {
        draggingWidth = draggingHtml.offsetWidth;
        draggingHeight = draggingHtml.offsetHeight;
        draggingHtml = draggingHtml.outerHTML;
    }
    if (draggingHtml) {
        _draggingDiv.firstElementChild.outerHTML = draggingHtml;
        if (draggingWidth) {
            if (draggingWidth > 400)
                draggingWidth = 400;
            _draggingDiv.firstElementChild.style.width = `${draggingWidth}px`;
        }
        if (draggingHeight) {
            if (draggingHeight > 300)
                draggingHeight = 300;
            _draggingDiv.firstElementChild.style.height = `${draggingHeight}px`;
        }
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
    _dataCcope = null;
    _data = null;
    for (let callback of _dragEndListener) {
        callback();
    }
}
exports.destroyDraggingElement = destroyDraggingElement;
let _dragEndListener = new Set();
function addDragEndListener(callback) {
    _dragEndListener.add(callback);
}
exports.addDragEndListener = addDragEndListener;
function removeDragEndListener(callback) {
    _dragEndListener.delete(callback);
}
exports.removeDragEndListener = removeDragEndListener;
let _lastPointerDownEvent;
function checkPointerDownEvent(e) {
    if (e !== _lastPointerDownEvent) {
        _lastPointerDownEvent = e;
        return true;
    }
    return false;
}
exports.checkPointerDownEvent = checkPointerDownEvent;
//# sourceMappingURL=DragManager.js.map