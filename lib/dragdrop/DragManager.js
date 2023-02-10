"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeDragStateListener = exports.addDragStateListener = exports.destroyDraggingElement = exports.removeHandlers = exports.addHandlers = exports.isDragging = exports.DragState = void 0;
const classnames_1 = __importDefault(require("classnames"));
const Utils_1 = require("../Utils");
class DragState {
    constructor(event, component, init = false) {
        this.pageX = 0;
        this.pageY = 0;
        this.clientX = 0;
        this.clientY = 0;
        this.dx = 0;
        this.dy = 0;
        this.dropped = false;
        this.event = event;
        this.component = component;
        this._init = init;
        if (event) {
            if (event.type.startsWith('touch')) {
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
            else if ('pageX' in event) {
                this.pageX = event.pageX;
                this.pageY = event.pageY;
                this.clientX = event.clientX;
                this.clientY = event.clientY;
            }
            this.dx = (this.pageX - component.baseX) * component.scaleX;
            this.dy = (this.pageY - component.baseY) * component.scaleY;
        }
    }
    moved() {
        return Math.abs(this.dx) >= 1 || Math.abs(this.dy) >= 1;
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
        this.component.ownerDocument.body.classList.add('dock-dragging');
    }
    setData(data, scope) {
        if (!this._init) {
            throw new Error('setData can only be used in onDragStart callback');
        }
        _dataScope = scope;
        _data = data;
    }
    static getData(field, scope) {
        if (scope === _dataScope && _data) {
            return _data[field];
        }
        return null;
    }
    get dragType() {
        return this.component.dragType;
    }
    accept(message = '') {
        this.acceptMessage = message;
        this.rejected = false;
    }
    reject() {
        this.rejected = true;
    }
    _onMove() {
        if (_data) {
            let ownerDocument = this.component.ownerDocument;
            let searchElement = ownerDocument.elementFromPoint(this.clientX, this.clientY);
            let droppingHandlers;
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
    _onDragEnd(canceled = false) {
        if (_droppingHandlers && _droppingHandlers.onDropT && !canceled) {
            this.dropped = _droppingHandlers.onDropT(this);
            if (this.component.dragType === 'right') {
                // prevent the next menu event if drop handler is called on right mouse button
                this.component.ownerDocument.addEventListener('contextmenu', preventDefault, true);
                setTimeout(() => {
                    this.component.ownerDocument.removeEventListener('contextmenu', preventDefault, true);
                }, 0);
            }
        }
        destroyDraggingElement(this);
        this.component.ownerDocument.body.classList.remove('dock-dragging');
    }
}
exports.DragState = DragState;
function preventDefault(e) {
    e.preventDefault();
    e.stopPropagation();
}
let _dataScope;
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
let _draggingDiv;
let _draggingIcon;
function _createDraggingDiv(doc) {
    _draggingDiv = doc.createElement('div');
    _draggingIcon = doc.createElement('div');
    const tabGroup = (_data && 'tabGroup' in _data ? _data['tabGroup'] : undefined);
    _draggingDiv.className = classnames_1.default(Utils_1.groupClassNames(tabGroup), 'dragging-layer');
    _draggingDiv.appendChild(document.createElement('div')); // place holder for dragging element
    _draggingDiv.appendChild(_draggingIcon);
}
function createDraggingElement(state, refElement, draggingHtml) {
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
    if (draggingHtml && 'outerHTML' in draggingHtml) {
        draggingWidth = draggingHtml.offsetWidth;
        draggingHeight = draggingHtml.offsetHeight;
        draggingHtml = draggingHtml.outerHTML;
    }
    if (draggingHtml) {
        _draggingDiv.firstElementChild.outerHTML = draggingHtml;
        if (window.getComputedStyle(_draggingDiv.firstElementChild).backgroundColor === 'rgba(0, 0, 0, 0)') {
            _draggingDiv.firstElementChild.style.backgroundColor
                = window.getComputedStyle(_draggingDiv).getPropertyValue('--default-background-color');
        }
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
    for (let callback of _dragStateListener) {
        if (_dataScope) {
            callback(_dataScope);
        }
        else {
            callback(true);
        }
    }
}
function moveDraggingElement(state) {
    _draggingDiv.style.left = `${state.pageX}px`;
    _draggingDiv.style.top = `${state.pageY}px`;
    if (state.rejected) {
        _draggingIcon.className = 'drag-accept-reject';
    }
    else if (state.acceptMessage) {
        _draggingIcon.className = state.acceptMessage;
    }
    else {
        _draggingIcon.className = '';
    }
}
function destroyDraggingElement(e) {
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
exports.destroyDraggingElement = destroyDraggingElement;
let _dragStateListener = new Set();
function addDragStateListener(callback) {
    _dragStateListener.add(callback);
}
exports.addDragStateListener = addDragStateListener;
function removeDragStateListener(callback) {
    _dragStateListener.delete(callback);
}
exports.removeDragStateListener = removeDragStateListener;
// work around for drag scroll issue on IOS
if (typeof window !== 'undefined' && window.navigator && window.navigator.platform && /iP(ad|hone|od)/.test(window.navigator.platform)) {
    document.addEventListener('touchmove', (e) => {
        if (e.touches.length === 1 && document.body.classList.contains('dock-dragging')) {
            e.preventDefault();
        }
    }, { passive: false });
}
