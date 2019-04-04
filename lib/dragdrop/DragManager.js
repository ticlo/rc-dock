"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class DragState {
    constructor(event) {
        this.event = event;
        if (event instanceof MouseEvent) {
            this.pageX = event.pageX;
            this.pageY = event.pageY;
        }
        else if (event instanceof TouchEvent && event.touches.length) {
            this.pageX = event.touches[0].pageX;
            this.pageY = event.touches[0].pageY;
        }
    }
    accept(style) {
        this.style = style;
    }
}
exports.DragState = DragState;
let _scope;
let _draggingElement;
let _data;
let _dragEndListened = false;
let _dragListeners = new WeakMap();
class DragManager {
    static addHandlers(element, handlers) {
        _dragListeners.set(element, handlers);
    }
    static dragStart(scope, data, event, element, dragText = ' ') {
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
    static getData(scope, field) {
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
exports.DragManager = DragManager;
//# sourceMappingURL=DragManager.js.map