import * as React from 'react';
import {act} from 'react';
import {page} from 'vitest/browser';
import {DockLayout} from '../../src/DockLayout';
import type {PanelData} from '../../src/DockData';
import {layout} from '../fixtures';
import {render} from './render';

async function renderDock() {
  let dock: DockLayout;
  const container = await render(
    <DockLayout
      ref={(ref) => { dock = ref; }}
      defaultLayout={layout()}
      dropMode="edge"
      style={{position: 'absolute', inset: 0}}
    />
  );
  const panel = container.querySelector<HTMLElement>('.dock-panel');
  const indicator = container.querySelector<HTMLElement>('.dock-drop-indicator');
  return {dock, container, panel, indicator};
}

describe('drop indicator updates', () => {
  it('handles two removals batched before the first removal is rendered', async () => {
    const {dock, container, panel, indicator} = await renderDock();
    const source = {};
    await act(async () => dock.setDropRect(panel, 'left', source));
    expect(indicator.style.display).toBe('block');

    // Edge drag-over and drag-leave can both remove the same indicator in one update.
    await act(async () => {
      dock.setDropRect(null, 'remove', source);
      dock.setDropRect(null, 'remove', source);
    });

    expect(dock.state.dropRect).toBeNull();
    expect(indicator.style.display).toBe('');
    const tab = container.querySelector('.dock-tab[data-node-key="b"] > .dock-tab-btn');
    await act(async () => page.elementLocator(tab).click());
    expect((dock.find('left') as PanelData).activeId).toBe('b');
  });

  it('preserves a new source indicator when an old source removal is queued after it', async () => {
    const {dock, panel, indicator} = await renderDock();
    const previousSource = {};
    const nextSource = {};
    await act(async () => dock.setDropRect(panel, 'left', previousSource));

    await act(async () => {
      dock.setDropRect(null, 'remove', previousSource);
      dock.setDropRect(panel, 'right', nextSource);
      dock.setDropRect(null, 'remove', previousSource);
    });

    expect(dock.state.dropRect.source).toBe(nextSource);
    expect(dock.state.dropRect.direction).toBe('right');
    expect(indicator.style.display).toBe('block');
  });
});
