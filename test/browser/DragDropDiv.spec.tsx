import * as React from 'react';
import {DragDropDiv} from '../../src/dragdrop/DragDropDiv';
import {DragState} from '../../src/dragdrop/DragManager';
import {mouse, render, unmount} from './render';

describe('drag and drop (drag-new-tab example)', () => {
  it.each([false, true])('only drops on an accepting target (rejected=%s)', async (rejected) => {
    const scope = {};
    const drop = vi.fn(() => 'dropped');
    const end = vi.fn();
    const container = await render(
      <>
        <DragDropDiv
          data-testid="source"
          style={{position: 'absolute', left: 0, top: 0, width: 80, height: 40}}
          onDragStartT={(event) => {
            event.setData({tab: 'new'}, scope);
            event.startDrag();
          }}
          onDragEndT={end}
        >
          Drag me
        </DragDropDiv>
        <DragDropDiv
          data-testid="target"
          style={{position: 'absolute', left: 200, top: 0, width: 100, height: 80}}
          onDragOverT={(event) => {
            expect(DragState.getData('tab', scope)).toBe('new');
            if (rejected) event.reject();
            else event.accept();
          }}
          onDropT={drop}
        >
          Drop here
        </DragDropDiv>
      </>
    );
    const source = container.querySelector<HTMLElement>('[data-testid="source"]');
    const target = container.querySelector<HTMLElement>('[data-testid="target"]').getBoundingClientRect();
    const rect = source.getBoundingClientRect();
    await mouse(source, 'mousedown', rect.x + 10, rect.y + 10);
    expect(document.querySelector('.dragging-layer')).toBeNull();
    await mouse(document, 'mousemove', target.x + 30, target.y + 20);
    expect(document.querySelector('.dragging-layer')).not.toBeNull();
    expect(Boolean(document.querySelector('.drag-accept-reject'))).toBe(rejected);
    await mouse(document, 'mouseup', target.x + 30, target.y + 20);
    expect(drop).toHaveBeenCalledTimes(rejected ? 0 : 1);
    expect(end).toHaveBeenCalledOnce();
    expect(end.mock.calls[0][0].dropped).toBe(rejected ? false : 'dropped');
    expect(document.querySelector('.dragging-layer')).toBeNull();
    expect(document.body.classList.contains('dock-dragging')).toBe(false);
  });

  it.each(['unmount', 'Escape'])('cancels an active drag on %s', async (action) => {
    const end = vi.fn();
    const container = await render(
      <DragDropDiv directDragT onDragStartT={(event) => event.startDrag()} onDragEndT={end}>
        Drag me
      </DragDropDiv>
    );
    await mouse(container.firstElementChild, 'mousedown', 10, 10);
    expect(document.querySelector('.dragging-layer')).not.toBeNull();
    if (action === 'unmount') {
      await unmount();
    } else {
      await React.act(async () => {
        document.dispatchEvent(new KeyboardEvent('keydown', {key: 'Escape', bubbles: true}));
      });
    }
    expect(end).toHaveBeenCalledOnce();
    expect(document.querySelector('.dragging-layer')).toBeNull();
    expect(document.body.classList.contains('dock-dragging')).toBe(false);
  });
});
