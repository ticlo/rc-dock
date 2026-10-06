import * as React from 'react';
import {act} from 'react';
import {page} from 'vitest/browser';
import {DockLayout, type LayoutProps} from '../../src/DockLayout';
import type {LayoutBase, PanelBase, PanelData, TabData} from '../../src/DockData';
import {render} from './render';

const style: React.CSSProperties = {position: 'absolute', inset: 0};

function layout(): LayoutBase {
  return {
    dockbox: {mode: 'horizontal', children: [
      {id: 'left', tabs: [{id: 'a'}, {id: 'b'}], activeId: 'a'},
      {id: 'right', tabs: [{id: 'c'}]},
    ]},
  };
}

const tabs = Object.freeze({
  a: Object.freeze({title: 'A', content: <div>Content A</div>, closable: true}),
  b: Object.freeze({title: 'B', content: <div>Content B</div>, closable: true}),
  c: Object.freeze({title: 'C', content: <div>Content C</div>}),
});

describe('separate tab definitions', () => {
  it('loads, closes and reopens tabs by id without changing the registry or layout input', async () => {
    let dock: DockLayout;
    const initial = layout();
    const container = await render(
      <DockLayout ref={(ref) => { dock = ref; }} defaultLayout={initial} tabs={tabs} style={style} />
    );
    expect(container.querySelector('#a').textContent).toBe('Content A');
    const saved = dock.saveLayout();
    expect(JSON.stringify(saved)).not.toContain('Content A');
    await act(async () => dock.dockMove({id: 'a'}, null, 'remove'));
    expect(dock.find('a')).toBeUndefined();
    expect(tabs.a).not.toHaveProperty('parent');
    await act(async () => dock.dockMove({id: 'a'}, 'right', 'middle'));
    expect((dock.find('a') as TabData).parent.id).toBe('right');
    await act(async () => dock.loadLayout(saved));
    expect((dock.find('a') as TabData).parent.id).toBe('left');
    expect(dock.saveLayout()).toEqual(saved);
    expect(initial).toEqual(layout());
  });

  it.each([false, true])('updates registry content while preserving arrangement and cached state (controlled=%s)', async (controlled) => {
    let dock: DockLayout;
    let update: React.Dispatch<React.SetStateAction<number>>;
    const changed = vi.fn();
    function Counter({version}: {version: number}) {
      const [count, setCount] = React.useState(0);
      return <button onClick={() => setCount(count + 1)}>Version {version}, count {count}</button>;
    }
    function Owner() {
      const [data, setData] = React.useState(layout);
      const [version, setVersion] = React.useState(0);
      update = setVersion;
      const definitions = React.useMemo(() => ({
        ...tabs,
        a: {title: `A ${version}`, content: <Counter version={version} />},
      }), [version]);
      return (
        <DockLayout
          ref={(ref) => { dock = ref; }}
          {...(controlled ? {layout: data} : {defaultLayout: data})}
          tabs={definitions}
          onLayoutChange={(next, id, direction) => {
            changed(next, id, direction);
            if (controlled) setData(next);
          }}
          style={style}
        />
      );
    }
    const container = await render(<Owner />);
    await act(async () => page.elementLocator(container.querySelector('#a button')).click());
    await act(async () => dock.dockMove({id: 'a'}, 'right', 'middle'));
    const saved = dock.saveLayout();
    changed.mockClear();
    await act(async () => update(1));
    expect(container.querySelector('#a button').textContent).toBe('Version 1, count 1');
    expect(container.querySelector('.dock-tab[data-node-key="a"] .dock-tab-btn').textContent).toBe('A 1');
    expect(dock.saveLayout()).toEqual(saved);
    expect(changed).not.toHaveBeenCalled();
  });

  it('uses loadTab for missing definitions in layouts and imperative operations', async () => {
    let dock: DockLayout;
    const load = vi.fn(({id, value}) => id.startsWith('dynamic') ? {
      id, title: id, value, content: <div>Value {value as number}</div>,
    } : null);
    const initial = layout();
    (initial.dockbox.children[0] as PanelBase).tabs.push({id: 'dynamic', value: 42}, {id: 'missing'});
    const container = await render(
      <DockLayout ref={(ref) => { dock = ref; }} defaultLayout={initial} tabs={tabs} loadTab={load} style={style} />
    );
    expect(load.mock.calls.map(([data]) => data.id)).toEqual(['dynamic', 'missing']);
    expect(dock.find('missing')).toBeUndefined();
    expect((dock.find('dynamic') as TabData).value).toBe(42);
    await act(async () => dock.dockMove({id: 'dynamic-new', value: 5}, 'right', 'middle'));
    expect(container.querySelector('#dynamic-new').textContent).toBe('Value 5');
    await act(async () => expect(dock.updateTab('dynamic-new', {id: 'dynamic-new', value: 6})).toBe(true));
    expect(container.querySelector('#dynamic-new').textContent).toBe('Value 6');
    await act(async () => expect(dock.updateTab('dynamic-new', {id: 'missing'})).toBe(false));
    expect(dock.find('dynamic-new')).toBeDefined();
    await act(async () => dock.dockMove({id: 'missing'}, 'right', 'middle'));
    expect(dock.find('missing')).toBeUndefined();
  });

  it('resolves registry references in new panels and updateTab', async () => {
    let dock: DockLayout;
    let update: React.Dispatch<React.SetStateAction<LayoutProps['tabs']>>;
    function Owner() {
      const [definitions, setDefinitions] = React.useState<LayoutProps['tabs']>(tabs);
      update = setDefinitions;
      return <DockLayout ref={(ref) => { dock = ref; }} defaultLayout={layout()} tabs={definitions} style={style} />;
    }
    const container = await render(<Owner />);
    await act(async () => dock.dockMove({id: 'b'}, null, 'remove'));
    await act(async () => dock.dockMove({id: 'new-panel', tabs: [{id: 'b'}, {id: 'missing'}]}, 'right', 'right'));
    expect((dock.find('new-panel') as PanelData).tabs.map(({id}) => id)).toEqual(['b']);
    await act(async () => update({...tabs, b: {...tabs.b, title: 'Updated B', content: <div>Updated content</div>}}));
    await act(async () => expect(dock.updateTab('b', {id: 'b'})).toBe(true));
    expect(container.querySelector('#b').textContent).toBe('Updated content');
  });

  it('retains fallback tabs when registry definitions change', async () => {
    let dock: DockLayout;
    let update: React.Dispatch<React.SetStateAction<LayoutProps['tabs']>>;
    const load = vi.fn(({id}) => ({id, title: id, content: <div>Dynamic content</div>, value: 0}));
    const initial = layout();
    (initial.dockbox.children[0] as PanelBase).tabs.push({id: 'dynamic'});
    function Owner() {
      const [definitions, setDefinitions] = React.useState<LayoutProps['tabs']>(tabs);
      update = setDefinitions;
      return <DockLayout ref={(ref) => { dock = ref; }} defaultLayout={initial} tabs={definitions} loadTab={load} style={style} />;
    }
    await render(<Owner />);
    (dock.find('dynamic') as TabData).value = 42;
    await act(async () => update({...tabs, a: {...tabs.a, title: 'Updated A'}}));
    expect(load).toHaveBeenCalledExactlyOnceWith({id: 'dynamic'});
    expect((dock.find('dynamic') as TabData).value).toBe(42);
  });

  it('does not rerender unrelated panels or reevaluate content for unchanged definitions', async () => {
    let update: React.Dispatch<React.SetStateAction<LayoutProps['tabs']>>;
    const leftContent = vi.fn(() => <div>Left content</div>);
    const rightContent = vi.fn(() => <div>Right content</div>);
    const definitions = {...tabs, a: {...tabs.a, content: leftContent}, c: {...tabs.c, content: rightContent}};
    function Owner() {
      const [registry, setRegistry] = React.useState<LayoutProps['tabs']>(definitions);
      update = setRegistry;
      return <DockLayout defaultLayout={layout()} tabs={registry} style={style} />;
    }
    await render(<Owner />);
    leftContent.mockClear();
    rightContent.mockClear();
    await act(async () => update({...definitions}));
    expect(leftContent).not.toHaveBeenCalled();
    expect(rightContent).not.toHaveBeenCalled();
    await act(async () => update({...definitions, a: {...definitions.a, title: 'Updated A'}}));
    expect(leftContent).toHaveBeenCalled();
    expect(rightContent).not.toHaveBeenCalled();
  });

  it('keeps tab order and selection when updating or replacing a tab id', async () => {
    let dock: DockLayout;
    await render(<DockLayout ref={(ref) => { dock = ref; }} defaultLayout={layout()} tabs={tabs} style={style} />);
    await act(async () => expect(dock.updateTab('a', {id: 'renamed', title: 'Renamed', content: <div>Renamed content</div>}, false)).toBe(true));
    let panel = dock.find('left') as PanelData;
    expect(panel.tabs.map(({id}) => id)).toEqual(['renamed', 'b']);
    expect(panel.activeId).toBe('renamed');
    await act(async () => dock.updateTab('b', {id: 'b', title: 'Updated B', content: <div>B</div>}, false));
    expect((dock.find('left') as PanelData).activeId).toBe('renamed');
    await act(async () => dock.updateTab('b', null));
    expect((dock.find('left') as PanelData).activeId).toBe('b');
    await act(async () => dock.updateTab('b', {...tabs.b, id: 'b', minWidth: 450}));
    expect((dock.find('left') as PanelData).minWidth).toBe(450);
  });
});
