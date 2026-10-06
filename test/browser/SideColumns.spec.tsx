import * as React from 'react';
import {act} from 'react';
import {page} from 'vitest/browser';
import {DockLayout} from '../../src/DockLayout';
import type {BoxBase, LayoutBase, PanelData, SideColumns, TabData} from '../../src/DockData';
import {columnLayout, columnTabs, sideOptions} from '../side-columns';
import {mouse, render} from './render';

const style: React.CSSProperties = {position: 'absolute', inset: 0};
const paddedOptions: SideColumns = {
  left: {...sideOptions.left, padding: 4},
  right: {...sideOptions.right, padding: 8},
};
async function click(element: Element) {
  await act(async () => page.elementLocator(element).click());
}
function panel(container: HTMLElement, id: string) {
  return container.querySelector<HTMLElement>(`[data-dockid="${id}"]`);
}

describe('side column controls', () => {
  it('removes each outer padding only while its column is collapsed and restores the original sizes', async () => {
    let dock: DockLayout;
    const container = await render(<DockLayout ref={(ref) => {dock = ref;}} defaultLayout={columnLayout()}
      tabs={columnTabs} sideColumns={paddedOptions} style={style}/>);
    const original = dock.saveLayout().dockbox;
    function check(left: number, right: number) {
      const bounds = dock.getRootElement().getBoundingClientRect();
      expect(panel(container, 'left-column').getBoundingClientRect().left).toBe(bounds.left + left);
      expect(panel(container, 'right-column').getBoundingClientRect().right).toBe(bounds.right - right);
    }
    check(4, 8);
    await click(container.querySelector('.dock-column-collapse-left'));
    check(0, 8);
    await click(container.querySelector('.dock-column-collapse-right'));
    check(0, 0);
    await click(container.querySelector('.dock-column-tab[data-tabid="a"]'));
    check(4, 0);
    await click(container.querySelector('.dock-column-tab[data-tabid="g"]'));
    check(4, 8);
    expect(dock.saveLayout().dockbox).toEqual(original);
  });

  it.each(['single', 'vertical', 'empty'])('keeps outer padding after side columns disappear (%s root)', async (shape) => {
    let dock: DockLayout;
    const container = await render(<DockLayout ref={(ref) => {dock = ref;}} defaultLayout={columnLayout()}
      tabs={columnTabs} sideColumns={paddedOptions} style={style}/>);
    await click(container.querySelector('.dock-column-collapse-left'));
    const data = columnLayout();
    if (shape === 'single') data.dockbox.children = [data.dockbox.children[1]];
    if (shape === 'vertical') data.dockbox.mode = 'vertical';
    if (shape === 'empty') data.dockbox.children = [];
    data.columns = {'left-column': {collapsed: true}};
    await act(async () => dock.loadLayout(data));
    const bounds = dock.getRootElement().getBoundingClientRect();
    const root = panel(container, 'root').getBoundingClientRect();
    expect(root.left).toBe(bounds.left + 4);
    expect(root.right).toBe(bounds.right - 8);
    expect(container.querySelector('.dock-column-rail')).toBeNull();
    expect(container.querySelector('.dock-column-collapse-btn')).toBeNull();
  });

  it('applies and updates padding without enabling column controls', async () => {
    let configure: React.Dispatch<React.SetStateAction<SideColumns>>;
    function Owner() {
      const [options, setOptions] = React.useState<SideColumns>();
      configure = setOptions;
      return <DockLayout defaultLayout={columnLayout()} tabs={columnTabs} sideColumns={options} style={style}/>;
    }
    const container = await render(<Owner/>);
    const bounds = container.getBoundingClientRect();
    function check(left: number, right: number) {
      const root = panel(container, 'root').getBoundingClientRect();
      expect(root.left).toBe(bounds.left + left);
      expect(root.right).toBe(bounds.right - right);
      expect(container.querySelector('.dock-column-collapse-btn')).toBeNull();
      expect(container.querySelector('.dock-column-accordion-btn')).toBeNull();
    }
    check(0, 0);
    await act(async () => configure({left: {padding: 4}, right: {padding: 8}}));
    check(4, 8);
    await act(async () => configure({right: {padding: 6}}));
    check(0, 6);
    await act(async () => configure({left: {padding: 0}, right: {padding: 0}}));
    check(0, 0);
    await act(async () => configure(undefined));
    check(0, 0);
  });

  it.each(['left', 'right'] as const)('collapses the %s column, groups rotated titles and restores the selected tab and sizes', async (side) => {
    let dock: DockLayout;
    const changed = vi.fn();
    const container = await render(<DockLayout ref={(ref) => {dock = ref;}} defaultLayout={columnLayout()}
      tabs={columnTabs} sideColumns={sideOptions} onLayoutChange={changed} style={style}/>);
    const column = panel(container, `${side}-column`);
    const originalBounds = column.getBoundingClientRect();
    const original = dock.saveLayout();
    const button = column.querySelector('.dock-column-collapse-btn');
    const nav = button.closest('.dock-nav');
    expect(nav.firstElementChild.classList.contains('dock-extra-content')).toBe(side === 'right');
    if (side === 'left') expect(button).toBe(nav.lastElementChild.lastElementChild);
    await click(button);
    const rail = column.querySelector('.dock-column-rail');
    expect(column.getBoundingClientRect().width).toBe(28);
    expect(rail.querySelectorAll('.dock-column-group')).toHaveLength(side === 'left' ? 4 : 2);
    expect(rail.querySelectorAll('.dock-column-tab')).toHaveLength(side === 'left' ? 6 : 3);
    expect(rail.querySelector('.dock-tab-close-btn')).toBeNull();
    const label = rail.querySelector('.dock-column-tab');
    expect(getComputedStyle(label).writingMode).toBe('vertical-rl');
    expect(getComputedStyle(label).transform).toBe(side === 'right' ? 'matrix(-1, 0, 0, -1, 0, 0)' : 'none');
    expect(getComputedStyle(rail.querySelectorAll('.dock-column-group')[1]).borderTopWidth).toBe('1px');
    const saved = JSON.parse(JSON.stringify(dock.saveLayout()));
    expect(saved.dockbox).toEqual(original.dockbox);
    expect(saved.columns[`${side}-column`]).toEqual({collapsed: true});
    expect(changed).toHaveBeenLastCalledWith(expect.any(Object), undefined, 'collapse');
    await act(async () => dock.loadLayout(saved));
    expect(panel(container, `${side}-column`).getBoundingClientRect().width).toBe(28);
    const selected = side === 'left' ? 'd' : 'h';
    await click(container.querySelector(`.dock-column-tab[data-tabid="${selected}"]`));
    expect((dock.find(selected) as TabData).parent.activeId).toBe(selected);
    expect(container.querySelector('.dock-column-rail')).toBeNull();
    const restored = panel(container, `${side}-column`).getBoundingClientRect();
    expect(restored.width).toBeCloseTo(originalBounds.width, 1);
    expect(restored.height).toBe(originalBounds.height);
    expect(dock.saveLayout().columns).toBeUndefined();
  });

  it.each([false, true])('keeps component state mounted while collapsed (cached=%s)', async (cached) => {
    let mounts = 0;
    function Counter() {
      const [count, setCount] = React.useState(0);
      React.useEffect(() => { mounts++; }, []);
      return <button onClick={() => setCount(count + 1)}>Count {count}</button>;
    }
    const container = await render(<DockLayout defaultLayout={columnLayout()} sideColumns={sideOptions}
      tabs={{...columnTabs, a: {...columnTabs.a, cached, content: <Counter/>}}} style={style}/>);
    await click(container.querySelector('#a button'));
    await click(container.querySelector('.dock-column-collapse-left'));
    await click(container.querySelector('.dock-column-tab[data-tabid="a"]'));
    expect(container.querySelector('#a button').textContent).toBe('Count 1');
    await click(panel(container, 'left-bottom').querySelector('.dock-column-accordion-btn'));
    await click(panel(container, 'left-top').querySelector('.dock-tab-active > .dock-tab-btn'));
    expect(container.querySelector('#a button').textContent).toBe('Count 1');
    expect(mounts).toBe(1);
  });

  it('keeps the rail width and saved column size during modifier-key divider resizing', async () => {
    let dock: DockLayout;
    const container = await render(<DockLayout ref={(ref) => {dock = ref;}} defaultLayout={columnLayout()}
      tabs={columnTabs} sideColumns={paddedOptions} style={style}/>);
    await click(container.querySelector('.dock-column-collapse-left'));
    const root = panel(container, 'root');
    const dividers = root.querySelectorAll<HTMLElement>(':scope > .dock-divider');
    expect(dividers[0].classList.contains('drag-initiator')).toBe(false);
    const rect = dividers[1].getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + 50;
    await mouse(dividers[1], 'mousedown', x, y);
    await mouse(document, 'mousemove', x + 5, y);
    await act(async () => document.dispatchEvent(new MouseEvent('mousemove', {
      clientX: x + 50, clientY: y, buttons: 1, shiftKey: true,
    })));
    await mouse(document, 'mouseup', x + 50, y);
    expect(panel(container, 'left-column').getBoundingClientRect().width).toBe(28);
    expect(dock.saveLayout().dockbox.children[0].size).toBe(240);
    expect(dock.saveLayout().dockbox.children[1].size).not.toBe(320);
  });

  it('expands panels through nested rows, responds to active and inactive tabs, and restores original proportions', async () => {
    let dock: DockLayout;
    const container = await render(<DockLayout ref={(ref) => {dock = ref;}} defaultLayout={columnLayout()}
      tabs={columnTabs} sideColumns={sideOptions} style={style}/>);
    const top = panel(container, 'left-top');
    const original = dock.saveLayout().dockbox;
    const originalHeight = top.getBoundingClientRect().height;
    const accordion = top.querySelector('.dock-column-accordion-btn');
    expect(accordion.nextElementSibling.className).toBe('dock-panel-max-btn');
    await click(accordion);
    expect(top.getBoundingClientRect().height).toBeGreaterThan(500);
    for (const id of ['left-row-first', 'left-row-last', 'left-bottom']) expect(panel(container, id).getBoundingClientRect().height).toBe(32);
    await click(panel(container, 'left-row-first').querySelector('.dock-tab-active > .dock-tab-btn'));
    expect(panel(container, 'left-row-first').getBoundingClientRect().height).toBeGreaterThan(500);
    for (const id of ['left-top', 'left-row-last', 'left-bottom']) expect(panel(container, id).getBoundingClientRect().height).toBe(32);
    await click(top.querySelector('.dock-tab[data-node-key="b"] > .dock-tab-btn'));
    expect((dock.find('left-top') as PanelData).activeId).toBe('b');
    expect(top.getBoundingClientRect().height).toBeGreaterThan(500);
    expect(dock.saveLayout().columns['left-column'].activePanelId).toBe('left-top');
    const saved = dock.saveLayout();
    await act(async () => dock.loadLayout(saved));
    expect(panel(container, 'left-top').getBoundingClientRect().height).toBeGreaterThan(500);
    await click(panel(container, 'left-top').querySelector('.dock-column-accordion-btn'));
    expect(panel(container, 'left-top').getBoundingClientRect().height).toBeCloseTo(originalHeight, 1);
    expect((dock.saveLayout().dockbox.children[0] as BoxBase).children.map((child) => child.size)).toEqual(
      (original.children[0] as BoxBase).children.map((child) => child.size));
    expect(dock.saveLayout().columns).toBeUndefined();
  });

  it('activates the selected panel when restoring an accordion column from its rail', async () => {
    let dock: DockLayout;
    const container = await render(<DockLayout ref={(ref) => {dock = ref;}} defaultLayout={columnLayout()}
      tabs={columnTabs} sideColumns={sideOptions} style={style}/>);
    await click(panel(container, 'left-top').querySelector('.dock-column-accordion-btn'));
    await click(container.querySelector('.dock-column-collapse-left'));
    await click(container.querySelector('.dock-column-tab[data-tabid="d"]'));
    expect(dock.saveLayout().columns['left-column']).toEqual({collapsed: false, activePanelId: 'left-row-first'});
    expect((dock.find('left-row-first') as PanelData).activeId).toBe('d');
    expect(panel(container, 'left-row-first').getBoundingClientRect().height).toBeGreaterThan(500);
    expect(panel(container, 'left-top').getBoundingClientRect().height).toBe(32);
  });

  it.each(['left', 'right'] as const)('expands the %s panel on a header click without changing its active tab or proportions', async (side) => {
    let dock: DockLayout;
    const changed = vi.fn();
    const container = await render(<DockLayout ref={(ref) => {dock = ref;}} defaultLayout={columnLayout()}
      tabs={columnTabs} sideColumns={sideOptions} onLayoutChange={changed} style={style}/>);
    const top = panel(container, `${side}-top`);
    const targetId = side === 'left' ? 'left-row-last' : 'right-bottom';
    const target = panel(container, targetId);
    const activeTab = (dock.find(targetId) as PanelData).activeId;
    const original = dock.saveLayout().dockbox;
    const clickHead = async (element: HTMLElement) => {
      await act(async () => element.querySelector<HTMLElement>('.dock-bar').click());
    };
    await clickHead(target);
    expect(dock.saveLayout().columns).toBeUndefined();
    await click(top.querySelector('.dock-column-accordion-btn'));
    expect(target.getBoundingClientRect().height).toBe(32);
    changed.mockClear();
    await clickHead(target);
    expect(target.getBoundingClientRect().height).toBeGreaterThan(500);
    expect(top.getBoundingClientRect().height).toBe(32);
    expect((dock.find(targetId) as PanelData).activeId).toBe(activeTab);
    expect(dock.saveLayout().dockbox).toEqual(original);
    expect(changed).toHaveBeenCalledExactlyOnceWith(expect.any(Object), activeTab, 'accordion');
    await clickHead(target);
    expect(changed).toHaveBeenCalledTimes(1);
    await click(target.querySelector('.dock-column-accordion-btn'));
    expect(dock.saveLayout().columns).toBeUndefined();
  });

  it('keeps header controls independent of accordion expansion', async () => {
    let dock: DockLayout;
    const extraClicked = vi.fn();
    const container = await render(<DockLayout ref={(ref) => {dock = ref;}} defaultLayout={columnLayout()}
      tabs={{...columnTabs, f: {...columnTabs.f, group: 'custom'}}} sideColumns={sideOptions}
      groups={{custom: {panelExtra: () => <button onClick={extraClicked}>Custom</button>}}} style={style}/>);
    await click(panel(container, 'left-row-last').querySelector('.dock-column-accordion-btn'));
    await click(panel(container, 'left-bottom').querySelector('.dock-extra-content button'));
    expect(extraClicked).toHaveBeenCalledOnce();
    expect(dock.saveLayout().columns['left-column'].activePanelId).toBe('left-row-last');
    await click(panel(container, 'left-top').querySelector('.dock-tab-close-btn'));
    expect(dock.find('a')).toBeUndefined();
    expect(dock.saveLayout().columns['left-column'].activePanelId).toBe('left-row-last');
    await click(panel(container, 'left-top').querySelector('.dock-panel-max-btn'));
    expect((dock.find('left-top') as PanelData).parent.mode).toBe('maximize');
    expect(dock.saveLayout().columns['left-column'].activePanelId).toBe('left-row-last');
    await act(async () => dock.dockMove(dock.find('left-top') as PanelData, null, 'maximize'));
    await click(container.querySelector('.dock-column-collapse-left'));
    expect(dock.saveLayout().columns['left-column']).toEqual({collapsed: true, activePanelId: 'left-row-last'});
  });

  it('does not expand after a header drag, but accepts the next ordinary header click', async () => {
    let dock: DockLayout;
    const container = await render(<DockLayout ref={(ref) => {dock = ref;}} defaultLayout={columnLayout()}
      tabs={columnTabs} sideColumns={sideOptions} style={style}/>);
    await click(panel(container, 'left-top').querySelector('.dock-column-accordion-btn'));
    const header = panel(container, 'left-bottom').querySelector<HTMLElement>('.dock-bar');
    const rect = header.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + 12;
    await mouse(header, 'mousedown', x, y);
    await mouse(document, 'mousemove', x + 5, y);
    expect(document.querySelector('.dragging-layer')).not.toBeNull();
    await mouse(document, 'mouseup', x + 5, y);
    await mouse(header, 'click', x + 5, y);
    expect(dock.saveLayout().columns['left-column'].activePanelId).toBe('left-top');
    await mouse(header, 'mousedown', x, y);
    await mouse(document, 'mouseup', x, y);
    await mouse(header, 'click', x, y);
    expect(dock.saveLayout().columns['left-column'].activePanelId).toBe('left-bottom');
  });

  it('hides collapse above a top row and shows it after the row becomes a single panel', async () => {
    let dock: DockLayout;
    const data = columnLayout();
    const column = data.dockbox.children[0] as BoxBase;
    column.children.shift();
    const container = await render(<DockLayout ref={(ref) => {dock = ref;}} defaultLayout={data}
      tabs={columnTabs} sideColumns={sideOptions} style={style}/>);
    expect(container.querySelector('.dock-column-collapse-left')).toBeNull();
    await act(async () => dock.dockMove(dock.find('left-row-last') as PanelData, null, 'remove'));
    expect(panel(container, 'left-row-first').querySelector('.dock-column-collapse-left')).not.toBeNull();
    await click(container.querySelector('.dock-column-collapse-left'));
    expect(panel(container, 'left-column').getBoundingClientRect().width).toBe(28);
  });

  it('collapses single panels without accordion controls, including custom panel extras', async () => {
    const data = columnLayout();
    data.dockbox.children.splice(0, 1);
    const container = await render(<DockLayout defaultLayout={data} tabs={{...columnTabs, m: {...columnTabs.m, group: 'custom'}}} sideColumns={paddedOptions}
      groups={{custom: {panelExtra: () => <span data-extra>Extra</span>}}} style={style}/>);
    const single = panel(container, 'center');
    expect(single.querySelector('[data-extra]')).not.toBeNull();
    expect(single.querySelector('.dock-column-accordion-btn')).toBeNull();
    await click(single.querySelector('.dock-column-collapse-left'));
    expect(single.getBoundingClientRect().width).toBe(28);
    await click(single.querySelector('.dock-column-tab'));
    expect(single.getBoundingClientRect().width).toBeGreaterThan(100);
  });

  it.each([false, true])('lets controlled owners accept or reject column changes (accepted=%s)', async (accepted) => {
    let dock: DockLayout;
    function Owner() {
      const [data, setData] = React.useState(columnLayout);
      return <DockLayout ref={(ref) => {dock = ref;}} layout={data} tabs={columnTabs}
        sideColumns={sideOptions} style={style} onLayoutChange={(next) => {if (accepted) setData(next);}}/>;
    }
    const container = await render(<Owner/>);
    await click(container.querySelector('.dock-column-collapse-left'));
    expect(!!container.querySelector('.dock-column-rail-left')).toBe(accepted);
    if (accepted) await click(container.querySelector('.dock-column-tab[data-tabid="b"]'));
    expect((dock.find('left-top') as PanelData).activeId).toBe(accepted ? 'b' : 'a');
    await click(panel(container, 'left-bottom').querySelector('.dock-column-accordion-btn'));
    expect(panel(container, 'left-top').getBoundingClientRect().height === 32).toBe(accepted);
  });

  it('updates controls when configuration changes and enforces docking boundaries before modifying the layout', async () => {
    let dock: DockLayout;
    let configure: React.Dispatch<React.SetStateAction<SideColumns>>;
    function Owner() {
      const [options, setOptions] = React.useState<SideColumns>();
      configure = setOptions;
      return <DockLayout ref={(ref) => {dock = ref;}} defaultLayout={columnLayout()} tabs={columnTabs}
        sideColumns={options} style={style}/>;
    }
    const container = await render(<Owner/>);
    expect(container.querySelector('.dock-column-collapse-btn')).toBeNull();
    await act(async () => configure(sideOptions));
    expect(container.querySelector('.dock-column-collapse-left')).not.toBeNull();
    await click(container.querySelector('.dock-column-collapse-left'));
    await act(async () => configure(undefined));
    expect(container.querySelector('.dock-column-rail')).toBeNull();
    await act(async () => configure(sideOptions));
    expect(panel(container, 'left-column').getBoundingClientRect().width).toBe(28);
    await click(container.querySelector('.dock-column-tab[data-tabid="a"]'));
    const saved = dock.saveLayout();
    const newTab = {id: 'new', title: 'New', content: <div/>};
    for (const source of [newTab, dock.find('right-bottom') as PanelData]) {
      for (const [target, direction] of [['root', 'top'], ['root', 'bottom'], ['left-column', 'left'], ['right-column', 'right'],
        ['left-top', 'left'], ['left-top', 'right'], ['left-row', 'left'], ['right-top', 'left'], ['right-top', 'right']] as const) {
        await act(async () => dock.dockMove(source, target, direction));
        expect(dock.saveLayout()).toEqual(saved);
      }
    }
    await act(async () => dock.dockMove(newTab, 'left-top', 'top'));
    expect(dock.find('new')).toBeDefined();
    for (const id of ['new', 'a', 'c', 'e', 'f']) {
      await act(async () => dock.dockMove((dock.find(id) as TabData).parent, null, 'remove'));
    }
    await act(async () => dock.dockMove(dock.find('center') as PanelData, null, 'remove'));
    expect(dock.saveLayout().dockbox.mode).toBe('vertical');
    expect(container.querySelector('.dock-column-collapse-btn')).toBeNull();
  });

  it.each([
    ['default', 'left', 'tab'], ['default', 'right', 'tab'],
    ['default', 'left', 'panel'], ['default', 'right', 'panel'],
    ['edge', 'left', 'tab'], ['edge', 'right', 'tab'],
    ['edge', 'left', 'panel'], ['edge', 'right', 'panel'],
  ] as const)('inserts and reorders panels in an existing row in %s mode on the %s column when dragging a %s', async (dropMode, side, sourceType) => {
    const viewport = {width: innerWidth, height: innerHeight};
    await page.viewport(1000, 700);
    try {
      let dock: DockLayout;
      const data = columnLayout();
      if (side === 'right') data.dockbox.children.reverse();
      const container = await render(<DockLayout ref={(ref) => {dock = ref;}} defaultLayout={data}
        tabs={columnTabs} sideColumns={sideOptions} dropMode={dropMode} style={style}/>);
      const source = panel(container, 'center').querySelector(sourceType === 'tab' ? '.dock-tab-btn' : '.dock-bar');
      const start = source.getBoundingClientRect();
      const targetPanel = panel(container, 'left-row-first');
      const target = targetPanel.getBoundingClientRect();
      const direction = side === 'left' ? 'right' : 'left';
      let x = direction === 'right' ? target.right - target.width * 0.2 : target.left + target.width * 0.2;
      let y = target.top + target.height / 2;
      await mouse(source, 'mousedown', start.left + 15, start.top + 12);
      await mouse(document, 'mousemove', start.left + 20, start.top + 12);
      await mouse(document, 'mousemove', x, y);
      await mouse(document, 'mousemove', x, y + 1);
      if (dropMode === 'default') {
        const arrow = targetPanel.querySelector(`.dock-drop-${direction}:not(.dock-drop-deep)`);
        expect(arrow).not.toBeNull();
        const bounds = arrow.getBoundingClientRect();
        expect(bounds.width).toBe(32);
        x = bounds.left + bounds.width / 2;
        y = bounds.top + bounds.height / 2;
        await mouse(document, 'mousemove', x, y);
      }
      expect(getComputedStyle(container.querySelector('.dock-drop-indicator')).display).toBe('block');
      await mouse(document, 'mouseup', x, y);
      const inserted = (dock.find('m') as TabData).parent;
      const row = inserted.parent;
      const order = direction === 'right' ? ['left-row-first', inserted.id, 'left-row-last'] : [inserted.id, 'left-row-first', 'left-row-last'];
      expect(row.id).toBe('left-row');
      expect(row.mode).toBe('horizontal');
      expect(row.children.map((child) => child.id)).toEqual(order);
      expect(row.children.every((child) => 'tabs' in child)).toBe(true);
      expect(row.parent.id).toBe('left-column');
      expect(row.parent.children.map((child) => child.id)).toEqual(['left-top', 'left-row', 'left-bottom']);
      expect(dock.saveLayout().dockbox.children.map((child) => child.id)).toEqual(
        side === 'left' ? ['left-column', 'right-column'] : ['right-column', 'left-column']);
      await act(async () => dock.dockMove(dock.find('left-row-last') as PanelData, 'left-row-first', 'left'));
      order.splice(order.indexOf('left-row-last'), 1);
      order.splice(order.indexOf('left-row-first'), 0, 'left-row-last');
      expect((dock.find('left-row-first') as PanelData).parent.children.map((child) => child.id)).toEqual(order);
    } finally {
      await act(async () => document.dispatchEvent(new KeyboardEvent('keydown', {key: 'Escape', bubbles: true})));
      await page.viewport(viewport.width, viewport.height);
    }
  });

  it.each([
    ['default', 'left', 'tab'], ['default', 'right', 'tab'],
    ['default', 'left', 'panel'], ['default', 'right', 'panel'],
    ['edge', 'left', 'tab'], ['edge', 'right', 'tab'],
    ['edge', 'left', 'panel'], ['edge', 'right', 'panel'],
  ] as const)('blocks horizontal splits in %s mode on the %s column when dragging a %s', async (dropMode, side, sourceType) => {
    const viewport = {width: innerWidth, height: innerHeight};
    await page.viewport(1000, 700);
    try {
      const container = await render(<DockLayout defaultLayout={columnLayout()} tabs={columnTabs}
        sideColumns={paddedOptions} dropMode={dropMode} style={style}/>);
      const source = panel(container, 'center').querySelector(sourceType === 'tab' ? '.dock-tab-btn' : '.dock-bar');
      const start = source.getBoundingClientRect();
      const targetPanel = panel(container, `${side}-top`);
      const target = targetPanel.getBoundingClientRect();
      const edge = side === 'left' ? target.left + 2 : target.right - 2;
      const middleY = target.top + target.height / 2;
      await mouse(source, 'mousedown', start.left + 15, start.top + 12);
      await mouse(document, 'mousemove', start.left + 20, start.top + 12);
      await mouse(document, 'mousemove', edge, middleY);
      await mouse(document, 'mousemove', edge, middleY + 1);
      if (dropMode === 'default') {
        const layer = targetPanel.querySelector('.dock-drop-layer');
        expect(layer).not.toBeNull();
        expect(layer.querySelector(`.dock-drop-${side}.dock-drop-deep`)).toBeNull();
        expect(layer.querySelector('.dock-drop-top.dock-drop-deep')).toBeNull();
        expect(layer.querySelector('.dock-drop-left:not(.dock-drop-deep)')).toBeNull();
        expect(layer.querySelector('.dock-drop-right:not(.dock-drop-deep)')).toBeNull();
        expect(layer.querySelector('.dock-drop-top:not(.dock-drop-deep)')).not.toBeNull();
        expect(layer.querySelector('.dock-drop-bottom:not(.dock-drop-deep)')).not.toBeNull();
        expect(layer.querySelector('.dock-drop-middle')).not.toBeNull();
        const inward = side === 'left' ? 'right' : 'left';
        const deep = layer.querySelector(`.dock-drop-${inward}.dock-drop-deep`).getBoundingClientRect();
        const middle = layer.querySelector('.dock-drop-middle').getBoundingClientRect();
        expect(deep.width).toBe(16);
        expect(side === 'left' ? deep.left : deep.right).toBe(side === 'left' ? middle.right : middle.left);
        await mouse(document, 'mousemove', side === 'left' ? deep.left + 8 : deep.right - 8, deep.top + deep.height / 2);
        expect(getComputedStyle(container.querySelector('.dock-drop-indicator')).display).toBe('block');
      } else {
        expect(getComputedStyle(container.querySelector('.dock-drop-indicator')).display).toBe('none');
        await mouse(document, 'mousemove', side === 'left' ? target.left + 40 : target.right - 40, middleY);
        expect(getComputedStyle(container.querySelector('.dock-drop-indicator')).display).toBe('none');
        await mouse(document, 'mousemove', target.left + target.width / 2, target.top + target.height * 0.3);
        expect(getComputedStyle(container.querySelector('.dock-drop-indicator')).display).toBe('block');
      }
    } finally {
      await act(async () => document.dispatchEvent(new KeyboardEvent('keydown', {key: 'Escape', bubbles: true})));
      await page.viewport(viewport.width, viewport.height);
    }
  });

  it.each([
    ['default', 'left'], ['default', 'right'], ['edge', 'left'], ['edge', 'right'],
  ] as const)('hides panel drop controls over minimized accordion panels in %s mode on the %s', async (dropMode, side) => {
    const viewport = {width: innerWidth, height: innerHeight};
    await page.viewport(1000, 700);
    try {
      let dock: DockLayout;
      const container = await render(<DockLayout ref={(ref) => {dock = ref;}} defaultLayout={columnLayout()}
        tabs={columnTabs} sideColumns={sideOptions} dropMode={dropMode} style={style}/>);
      await click(panel(container, `${side}-top`).querySelector('.dock-column-accordion-btn'));
      const targetId = `${side}-bottom`;
      const targetPanel = panel(container, targetId);
      const target = targetPanel.getBoundingClientRect();
      expect(target.height).toBe(32);
      const source = panel(container, 'center').querySelector('.dock-tab-btn');
      const start = source.getBoundingClientRect();
      await mouse(source, 'mousedown', start.left + 15, start.top + 12);
      await mouse(document, 'mousemove', start.left + 20, start.top + 12);
      await mouse(document, 'mousemove', target.left + target.width / 2, target.top + 16);
      await mouse(document, 'mousemove', target.left + target.width / 2 + 1, target.top + 16);
      expect(targetPanel.querySelector('.dock-drop-layer')).toBeNull();
      expect(targetPanel.querySelector('.dock-drop-edge')).toBeNull();
      // Tab insertion remains available on the minimized header.
      const tab = targetPanel.querySelector('.dock-tab-btn').getBoundingClientRect();
      await mouse(document, 'mousemove', tab.left + 10, tab.top + 12);
      expect(getComputedStyle(container.querySelector('.dock-drop-indicator')).display).toBe('block');
      await mouse(document, 'mouseup', tab.left + 10, tab.top + 12);
      expect((dock.find('m') as TabData).parent.id).toBe(targetId);
      expect(targetPanel.querySelector('.dock-drop-layer')).toBeNull();
      expect(targetPanel.querySelector('.dock-drop-edge')).toBeNull();
    } finally {
      await act(async () => document.dispatchEvent(new KeyboardEvent('keydown', {key: 'Escape', bubbles: true})));
      await page.viewport(viewport.width, viewport.height);
    }
  });
});
