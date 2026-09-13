import * as React from 'react';
import {DragDropDiv} from '../../src/dragdrop/DragDropDiv';
import {DragState} from '../../src/dragdrop/DragManager';
import {mouse, render, unmount} from './render';

describe('drag and drop (drag-new-tab example)', () => {
  it.each([
    {input: 'mouse', rejected: false},
    {input: 'mouse', rejected: true},
    {input: 'touch', rejected: false},
    {input: 'touch', rejected: true},
  ])('positions $input feedback and only drops on an accepting target (rejected=$rejected)', async ({input, rejected}) => {
    const scope = {};
    const drop = vi.fn(() => 'dropped');
    const end = vi.fn();
    const container = await render(
      <>
        <style>{'.test-drag-accept::after { content: "+"; }'}</style>
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
          style={{position: 'absolute', left: 200, top: 100, width: 100, height: 80}}
          onDragOverT={(event) => {
            expect(DragState.getData('tab', scope)).toBe('new');
            if (rejected) event.reject();
            else event.accept('test-drag-accept');
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
    async function pointer(phase: 'start' | 'move' | 'end', x: number, y: number) {
      if (input === 'mouse') {
        await mouse(phase === 'start' ? source : document,
          {start: 'mousedown', move: 'mousemove', end: 'mouseup'}[phase], x, y);
      } else {
        const touch = new Touch({identifier: 1, target: source, clientX: x, clientY: y, pageX: x, pageY: y});
        await React.act(async () => {
          source.dispatchEvent(new TouchEvent(`touch${phase}`, {
            bubbles: true, cancelable: true,
            touches: phase === 'end' ? [] : [touch],
            targetTouches: phase === 'end' ? [] : [touch], changedTouches: [touch],
          }));
        });
      }
    }
    await pointer('start', rect.x + 10, rect.y + 10);
    expect(document.querySelector('.dragging-layer')).toBeNull();
    await pointer('move', target.x + 30, target.y + 20);
    expect(document.querySelector('.dragging-layer')).not.toBeNull();
    expect(Boolean(document.querySelector('.drag-accept-reject'))).toBe(rejected);
    // Check subsequent moves too, with hit testing still at the actual pointer.
    const x = target.x + 40;
    const y = target.y + 30;
    await pointer('move', x, y);
    const icon = document.querySelector<HTMLElement>('.dragging-layer > :last-child');
    expect(getComputedStyle(icon, '::after').content).toBe(rejected ? '"🚫"' : '"+"');
    expect(icon.getBoundingClientRect().width).toBeGreaterThan(0);
    expect(icon.getBoundingClientRect().x).toBe(x + 12);
    expect(icon.getBoundingClientRect().y).toBe(y + (input === 'touch' ? -48 : 12));
    // Applications such as Ticlo can customize the icon's top offset.
    icon.style.top = '14px';
    expect(icon.getBoundingClientRect().y).toBe(y + (input === 'touch' ? -46 : 14));
    const preview = document.querySelector('.dragging-layer > :first-child').getBoundingClientRect();
    expect(preview.x + preview.width / 2).toBeCloseTo(x);
    expect(preview.y + preview.height / 2).toBeCloseTo(y);
    await pointer('end', x, y);
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
