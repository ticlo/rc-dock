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
    getData(field, scope) {
        if (!_data) {
            // todo: find drag string from event and convert it to _data if possible
            _data = {};
        }
        if (scope === _dataScope && _data) {
            return _data[field];
        }
        return null;
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
            let droppingHost;
            while (searchElement && searchElement !== ownerDocument.body) {
                if (_dragListeners.has(searchElement)) {
                    let host = _dragListeners.get(searchElement);
                    let handlers = host.getHandlers();
                    if (handlers.onDragOverT) {
                        handlers.onDragOverT(this);
                        if (this.acceptMessage != null) {
                            droppingHost = host;
                            break;
                        }
                    }
                }
                searchElement = searchElement.parentElement;
            }
            setDroppingHandler(droppingHost, this);
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
    getRect() {
        let x = this.clientX;
        let y = this.clientY;
        let w = this.dx;
        let h = this.dy;
        if (w < 0) {
            w = -w;
        }
        else {
            x -= w;
        }
        if (h < 0) {
            h = -h;
        }
        else {
            y -= h;
        }
        return new DOMRect(x, y, w, h);
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
let _droppingHost;
let _droppingHandlers;
function setDroppingHandler(host, state) {
    if (_droppingHost === host) {
        return;
    }
    if (_droppingHandlers && _droppingHandlers.onDragLeaveT) {
        _droppingHandlers.onDragLeaveT(state);
    }
    _droppingHost = host;
    _droppingHandlers = _droppingHost === null || _droppingHost === void 0 ? void 0 : _droppingHost.getHandlers();
}
let _dragListeners = new WeakMap();
function isDragging() {
    return _draggingState != null;
}
exports.isDragging = isDragging;
function addHandlers(element, handler) {
    _dragListeners.set(element, handler);
}
exports.addHandlers = addHandlers;
function removeHandlers(element) {
    let host = _dragListeners.get(element);
    if (host === _droppingHost) {
        _droppingHost = null;
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
    _draggingDiv.className = (0, classnames_1.default)((0, Utils_1.groupClassNames)(tabGroup), 'dragging-layer');
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
