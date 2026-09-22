import * as React from 'react';
import {act} from 'react';
import {page} from 'vitest/browser';
import {DockLayout} from '../../src/DockLayout';
import type {LayoutBase, PanelData, TabData} from '../../src/DockData';
import {layout, tab} from '../fixtures';
import {render} from './render';

const style: React.CSSProperties = {position: 'absolute', inset: 0};

async function clickTab(container: HTMLElement, id: string) {
  const element = container.querySelector(`.dock-tab[data-node-key="${id}"] > .dock-tab-btn`);
  await act(async () => page.elementLocator(element).click());
}

describe('DockLayout examples', () => {
  it('switches tabs and closes an active tab (basic)', async () => {
    let dock: DockLayout;
    const changed = vi.fn();
    const container = await render(
      <DockLayout
        ref={(ref) => {
          dock = ref;
        }}
        defaultLayout={layout()}
        onLayoutChange={changed}
        style={style}
      />
    );
    await clickTab(container, 'b');
    expect((dock.find('left') as PanelData).activeId).toBe('b');
    expect(changed).toHaveBeenLastCalledWith(expect.any(Object), 'b', 'active');
    const close = container.querySelector('.dock-tab[data-node-key="b"] .dock-tab-close-btn');
    await act(async () => page.elementLocator(close).click());
    expect(dock.find('b')).toBeUndefined();
    expect((dock.find('left') as PanelData).activeId).toBe('a');
    expect(changed).toHaveBeenLastCalledWith(expect.any(Object), 'b', 'remove');
  });

  it('saves and restores layout after a tab is moved (save-layout)', async () => {
    let dock: DockLayout;
    await render(
      <DockLayout
        ref={(ref) => {
          dock = ref;
        }}
        defaultLayout={layout()}
        style={style}
      />
    );
    const saved = dock.saveLayout();
    await act(async () => dock.dockMove(dock.find('a') as TabData, 'right', 'middle'));
    expect((dock.find('a') as TabData).parent.id).toBe('right');
    await act(async () => dock.loadLayout(saved));
    expect((dock.find('a') as TabData).parent.id).toBe('left');
    expect(dock.saveLayout()).toEqual(saved);
  });

  it('updates tab content and selection through the public API (adv-tab-update)', async () => {
    let dock: DockLayout;
    const container = await render(
      <DockLayout
        ref={(ref) => {
          dock = ref;
        }}
        defaultLayout={layout()}
        style={style}
      />
    );
    await act(async () => {
      expect(dock.updateTab('b', tab('b', {content: <strong>Updated content</strong>}))).toBe(true);
    });
    expect((dock.find('left') as PanelData).activeId).toBe('b');
    expect(container.querySelector('#b').textContent).toBe('Updated content');
    expect(dock.updateTab('missing', tab('missing'))).toBe(false);
  });

  it.each([false, true])('lets a controlled owner accept or reject removal (accepted=%s)', async (accepted) => {
    let dock: DockLayout;
    const changed = vi.fn();
    function Controlled() {
      const [data, setData] = React.useState<LayoutBase>(() => ({dockbox: layout().dockbox}));
      return (
        <DockLayout
          ref={(ref) => {
            dock = ref;
          }}
          layout={data}
          loadTab={({id}) => tab(id)}
          onLayoutChange={(next, id, direction) => {
            changed(id, direction);
            if (accepted) setData(next);
          }}
          style={style}
        />
      );
    }
    await render(<Controlled />);
    await act(async () => dock.dockMove(dock.find('a') as TabData, null, 'remove'));
    expect(changed).toHaveBeenCalledWith('a', 'remove');
    expect(Boolean(dock.find('a'))).toBe(!accepted);
  });

  it('preserves cached component state when moving between panels (tab-cache)', async () => {
    let dock: DockLayout;
    function Counter() {
      const [count, setCount] = React.useState(0);
      return <button onClick={() => setCount(count + 1)}>Count {count}</button>;
    }
    const data = layout();
    const cachedTab = (data.dockbox.children[0] as PanelData).tabs[0];
    cachedTab.cached = true;
    cachedTab.content = <Counter />;
    const container = await render(
      <DockLayout
        ref={(ref) => {
          dock = ref;
        }}
        defaultLayout={data}
        style={style}
      />
    );
    await act(async () => page.elementLocator(container.querySelector('#a button')).click());
    await act(async () => dock.dockMove(dock.find('a') as TabData, 'right', 'middle'));
    expect(container.querySelector('#a button').textContent).toBe('Count 1');
    expect((dock.find('a') as TabData).parent.id).toBe('right');
  });
});
