import * as React from 'react';
import {Divider} from '../../src/Divider';
import {mouse, render} from './render';

describe('divider resizing (standalone-divider example)', () => {
  it.each([50, -500, 500])('resizes adjacent panes by %s while respecting minimums', async (delta) => {
    const changed = vi.fn();
    const ended = vi.fn();
    let element: HTMLDivElement;
    const container = await render(
      <div
        ref={(ref) => {
          element = ref;
        }}
        style={{width: 400, height: 200}}
      >
        <Divider
          idx={0}
          changeSizes={changed}
          onDragEnd={ended}
          getDividerData={() => ({
            element,
            beforeDivider: [{size: 200, minSize: 100}],
            afterDivider: [{size: 200, minSize: 80}],
          })}
        />
      </div>
    );
    const handle = container.querySelector('.drag-initiator');
    const rect = element.getBoundingClientRect();
    await mouse(handle, 'mousedown', rect.x + 200, rect.y + 20);
    // The first movement starts the drag; subsequent movement resizes panes.
    await mouse(document, 'mousemove', rect.x + 201, rect.y + 20);
    await mouse(document, 'mousemove', rect.x + 200 + delta, rect.y + 20);
    await mouse(document, 'mouseup', rect.x + 200 + delta, rect.y + 20);
    const sizes = changed.mock.lastCall[0];
    expect(sizes[0] + sizes[1]).toBeCloseTo(400);
    expect(sizes[0]).toBeGreaterThanOrEqual(100);
    expect(sizes[1]).toBeGreaterThanOrEqual(80);
    if (delta === 50) expect(sizes).toEqual([250, 150]);
    if (delta < 0) expect(sizes[0]).toBe(100);
    if (delta === 500) expect(sizes[1]).toBe(80);
    expect(ended).toHaveBeenCalledOnce();
    expect(document.querySelector('.dragging-layer')).toBeNull();
  });
});
