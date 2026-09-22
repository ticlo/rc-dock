import {DragState, destroyDraggingElement} from '../../src/dragdrop/DragManager';

describe('drag previews', () => {
  let source: HTMLDivElement;
  let state: DragState;

  beforeEach(() => {
    source = document.createElement('div');
    source.style.cssText = 'width: 40px; height: 30px; background: rgb(20, 80, 120)';
    document.body.appendChild(source);
    state = new DragState(
      null,
      {
        element: source,
        ownerDocument: document,
        dragType: 'left',
        baseX: 0,
        baseY: 0,
        scaleX: 1,
        scaleY: 1,
      },
      true
    );
  });

  afterEach(() => {
    state._onDragEnd(true);
    source.remove();
  });

  it.each([undefined, 0, 0.25, 1])('uses opacity %s with a CSS default', (opacity) => {
    state.startDrag(source, source, opacity === undefined ? undefined : {opacity});
    const layer = document.querySelector<HTMLElement>('body > .dragging-layer');
    expect(getComputedStyle(layer).opacity).toBe(String(opacity ?? 0.6));
    expect(layer.style.opacity).toBe(opacity === undefined ? '' : String(opacity));
  });

  it('does not carry an opacity override into the next drag', () => {
    state.startDrag(source, source, {opacity: 0});
    destroyDraggingElement(state);
    state.startDrag(source, source, {});
    expect(getComputedStyle(document.querySelector('.dragging-layer')).opacity).toBe('0.6');
  });

  it('copies a detached custom preview and positions its center at the pointer', () => {
    const preview = document.createElement('div');
    preview.style.cssText = 'width: 14px; height: 14px; border-radius: 0 6px; background: rgb(20, 80, 120)';
    state.startDrag(source, preview, {opacity: 1});
    state.pageX = state.clientX = 200;
    state.pageY = state.clientY = 150;
    state._onMove();
    const clone = document.querySelector<HTMLElement>('.dragging-layer > :first-child');
    expect(clone).not.toBe(preview);
    expect(preview.isConnected).toBe(false);
    expect(getComputedStyle(clone).backgroundColor).toBe('rgb(20, 80, 120)');
    const rect = clone.getBoundingClientRect();
    expect(rect.width).toBe(14);
    expect(rect.height).toBe(14);
    expect(rect.x + rect.width / 2).toBeCloseTo(200);
    expect(rect.y + rect.height / 2).toBeCloseTo(150);
  });

  it('scopes drag data and clears the preview, source marker and data on cancel', () => {
    const scope = {};
    state.setData({tab: 'a'}, scope);
    state.startDrag();
    expect(DragState.getData('tab', scope)).toBe('a');
    expect(DragState.getData('tab', {})).toBeNull();
    expect(source.classList.contains('dragging')).toBe(true);
    expect(document.body.classList.contains('dock-dragging')).toBe(true);
    state._onDragEnd(true);
    expect(document.querySelector('.dragging-layer')).toBeNull();
    expect(source.classList.contains('dragging')).toBe(false);
    expect(document.body.classList.contains('dock-dragging')).toBe(false);
    expect(DragState.getData('tab', scope)).toBeNull();
  });
});
