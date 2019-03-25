"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let _scope;
let _draggingElement;
let _data;
let _dragEndListened = false;
class DragStore {
    static dragStart(scope, data, element) {
        _scope = scope;
        _data = data;
        if (element instanceof HTMLElement) {
            element.classList.add('dragging');
            _draggingElement = element;
        }
        if (!_dragEndListened) {
            document.addEventListener('dragend', DragStore.dragEnd);
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
exports.DragStore = DragStore;
//# sourceMappingURL=DragStore.js.map