let _scope: any;
let _draggingElement: HTMLElement;
let _data: {[key: string]: any};

let _dragEndListened = false;

export class DragStore {
  static dragStart(scope: any, data: {[key: string]: any}, element?: any) {
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

  static getData(scope: any, field: string) {
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
