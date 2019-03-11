let _scope: any;
let _draggingElement: HTMLElement;
let _data: {[key: string]: any};

export class DragStore {
  static dragStart(scope: any, element: HTMLElement, data: {[key: string]: any}) {
    _scope = scope;
    _data = data;
    element.classList.add('dragging');
    document.addEventListener('dragend', DragStore.dragEnd);
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
    _draggingElement.classList.remove('dragging');
  }
}
