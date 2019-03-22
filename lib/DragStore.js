let _scope;
let _draggingElement;
let _data;
let _dragEndListened = false;
export class DragStore {
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
//# sourceMappingURL=DragStore.js.map