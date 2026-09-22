import * as Algorithm from '../../src/Algorithm';
import {maximePlaceHolderId} from '../../src/DockData';
import type {PanelData, TabData} from '../../src/DockData';
import {layout, tab} from '../fixtures';

describe('layout operations (basic, tab-min-size and panel-extra examples)', () => {
  it('normalizes parent links, active tabs and missing layout boxes', () => {
    const data = layout();
    const panel = Algorithm.find(data, 'right') as PanelData;
    expect(panel.activeId).toBe('c');
    expect(panel.parent).toBe(data.dockbox);
    expect(panel.tabs[0].parent).toBe(panel);
    expect(data.floatbox.children).toEqual([]);
    expect(data.windowbox.children).toEqual([]);
    expect(data.maxbox.children).toEqual([]);
  });

  it('honors tab and panel minimum sizes', () => {
    const data = Algorithm.fixLayoutData({
      dockbox: {
        mode: 'horizontal',
        children: [
          {
            id: 'sized',
            panelLock: {minHeight: 240},
            tabs: [tab('a', {minWidth: 150, minHeight: 100}), tab('b', {minWidth: 200})],
          },
        ],
      },
    });
    const panel = Algorithm.find(data, 'sized') as PanelData;
    expect(panel.minWidth).toBe(200);
    expect(panel.minHeight).toBe(240);
    expect(data.dockbox.minWidth).toBeGreaterThanOrEqual(200);
  });

  it.each(['before-tab', 'after-tab'] as const)('inserts a new tab %s', (direction) => {
    const data = layout();
    const target = Algorithm.find(data, 'b') as TabData;
    const changed = Algorithm.fixLayoutData(Algorithm.addNextToTab(data, tab('new'), target, direction));
    const panel = Algorithm.find(changed, 'left') as PanelData;
    expect(panel.tabs.map(({id}) => id)).toEqual(direction === 'before-tab' ? ['a', 'new', 'b'] : ['a', 'b', 'new']);
    expect(panel.activeId).toBe('new');
    expect((Algorithm.find(data, 'left') as PanelData).tabs.map(({id}) => id)).toEqual(['a', 'b']);
  });

  it('moves a tab between panels without leaving a duplicate', () => {
    let data = layout();
    const source = Algorithm.find(data, 'a') as TabData;
    data = Algorithm.removeFromLayout(data, source);
    data = Algorithm.addTabToPanel(data, source, Algorithm.find(data, 'right') as PanelData);
    data = Algorithm.fixLayoutData(data);
    expect((Algorithm.find(data, 'left') as PanelData).tabs.map(({id}) => id)).toEqual(['b']);
    expect((Algorithm.find(data, 'right') as PanelData).tabs.map(({id}) => id)).toEqual(['c', 'a']);
    expect((Algorithm.find(data, 'a') as TabData).parent.activeId).toBe('a');
  });

  it('selects another tab when the active tab is removed', () => {
    let data = layout();
    data = Algorithm.fixLayoutData(Algorithm.removeFromLayout(data, Algorithm.find(data, 'a') as TabData));
    expect(Algorithm.find(data, 'a')).toBeUndefined();
    expect((Algorithm.find(data, 'left') as PanelData).activeId).toBe('b');
  });

  it.each([false, true])('handles the last tab in a panel with panelLock=%s', (locked) => {
    let data = layout();
    const panel = Algorithm.find(data, 'right') as PanelData;
    if (locked) panel.panelLock = {};
    data = Algorithm.fixLayoutData(Algorithm.removeFromLayout(data, panel.tabs[0]));
    expect(Boolean(Algorithm.find(data, 'right'))).toBe(locked);
    expect(Algorithm.find(data, 'c')).toBeUndefined();
  });

  it('floats a panel with the requested bounds and separates docked searches', () => {
    let data = layout();
    const panel = Algorithm.find(data, 'right') as PanelData;
    data = Algorithm.removeFromLayout(data, panel);
    data = Algorithm.fixLayoutData(Algorithm.floatPanel(data, panel, {left: 50, top: 60, width: 300, height: 200}));
    expect(Algorithm.find(data, 'c', Algorithm.Filter.Tab | Algorithm.Filter.Docked)).toBeUndefined();
    expect(Algorithm.find(data, 'right', Algorithm.Filter.Panel | Algorithm.Filter.Floated)).toMatchObject({
      x: 50,
      y: 60,
      w: 300,
      h: 200,
    });
  });

  it('maximizes and restores a panel in its original position', () => {
    let data = layout();
    data = Algorithm.fixLayoutData(Algorithm.maximize(data, Algorithm.find(data, 'left') as PanelData));
    expect(data.maxbox.children[0].id).toBe('left');
    expect(Algorithm.find(data, maximePlaceHolderId)).toBeDefined();
    data = Algorithm.fixLayoutData(Algorithm.maximize(data, Algorithm.find(data, 'left') as PanelData));
    expect(data.maxbox.children).toEqual([]);
    expect(data.dockbox.children.map(({id}) => id)).toEqual(['left', 'right']);
    expect(Algorithm.find(data, maximePlaceHolderId)).toBeUndefined();
  });
});
