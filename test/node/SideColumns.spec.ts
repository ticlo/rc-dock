import {find, fixLayoutData} from '../../src/Algorithm';
import {canDock, getColumnViews} from '../../src/SideColumns';
import {createTabCache, loadLayoutData, saveLayoutData} from '../../src/Serializer';
import type {BoxData, LayoutData, PanelData} from '../../src/DockData';
import {columnLayout, columnTabs, sideOptions} from '../side-columns';

function layout(): LayoutData {
  return fixLayoutData(loadLayoutData(columnLayout(), null, undefined, undefined, createTabCache(columnTabs)));
}

describe('side columns', () => {
  it('collects every panel and only exposes collapse on a single top panel', () => {
    const data = layout();
    let view = getColumnViews(data, sideOptions).get(data.dockbox.children[0]);
    expect(view.panels.map((panel) => panel.id)).toEqual(['left-top', 'left-row-first', 'left-row-last', 'left-bottom']);
    expect(view.topPanel.id).toBe('left-top');
    const column = data.dockbox.children[0] as BoxData;
    column.children.reverse();
    column.children.shift();
    view = getColumnViews(data, sideOptions).get(column);
    expect(view.topPanel).toBeUndefined();
    expect(view.collapsible).toBe(true);
    column.children.shift();
    expect(getColumnViews(data, sideOptions).get(column).topPanel.id).toBe('left-top');
  });

  it('expands the selected path through rows and minimizes all other panels', () => {
    const data = layout();
    data.columns = {'left-column': {activePanelId: 'left-row-first'}};
    const column = data.dockbox.children[0];
    const view = getColumnViews(data, sideOptions).get(column);
    expect([...view.expanded].map((item) => item.id)).toEqual(['left-row-first', 'left-row', 'left-column']);
    expect(view.heights.get(column)).toBe(104);
    expect(view.heights.get(find(data, 'left-row') as BoxData)).toBe(32);
    expect((find(data, 'left-top') as PanelData).size).toBe(180);
    data.columns['left-column'].activePanelId = 'removed-panel';
    expect(getColumnViews(data, sideOptions).get(column).activePanelId).toBeUndefined();
  });

  it('supports collapsing single panels without accordion controls and ignores vertical roots', () => {
    const data = layout();
    data.dockbox.children.splice(0, 1);
    const view = getColumnViews(data, sideOptions).get(data.dockbox.children[0]);
    expect(view.collapsible).toBe(true);
    expect(view.accordion).toBe(false);
    data.dockbox.mode = 'vertical';
    expect(getColumnViews(data, sideOptions)).toBeUndefined();
  });

  it('reuses unchanged column views and discards saved state for removed columns', () => {
    const data = layout();
    const first = getColumnViews(data, sideOptions);
    data.columns = {'left-column': {collapsed: true}, removed: {collapsed: true}};
    const second = getColumnViews(data, sideOptions, first);
    expect(second.get(data.dockbox.children.at(-1))).toBe(first.get(data.dockbox.children.at(-1)));
    expect(second.get(data.dockbox.children[0])).not.toBe(first.get(data.dockbox.children[0]));
    expect(saveLayoutData(data).columns).toEqual({'left-column': {collapsed: true}});
  });

  it('protects root orientation and outer column positions while allowing drops inside columns', () => {
    const data = layout();
    const left = data.dockbox.children[0];
    const right = data.dockbox.children.at(-1);
    for (const direction of ['top', 'bottom', 'left', 'right'] as const) expect(canDock(data, sideOptions, data.dockbox, direction)).toBe(false);
    expect(canDock(data, sideOptions, left, 'left')).toBe(false);
    expect(canDock(data, sideOptions, right, 'right')).toBe(false);
    expect(canDock(data, sideOptions, left, 'right')).toBe(true);
    expect(canDock(data, sideOptions, find(data, 'left-top'), 'left')).toBe(false);
    expect(canDock(data, sideOptions, find(data, 'center'), 'top')).toBe(true);
    expect(canDock(data, {left: {accordion: true}}, right, 'right')).toBe(true);
    expect(canDock(data, {right: {collapsible: true}}, left, 'left')).toBe(true);
    expect(canDock(data, undefined, data.dockbox, 'top')).toBe(true);
    data.dockbox.mode = 'vertical';
    expect(canDock(data, sideOptions, data.dockbox, 'top')).toBe(true);
  });

  it.each(['collapsible', 'accordion'] as const)('prevents new rows inside each %s side column while allowing existing rows, vertical and tab drops', (feature) => {
    const data = layout();
    const options = {left: {[feature]: true}, right: {[feature]: true}};
    for (const id of ['left-top', 'left-row', 'left-bottom', 'a', 'right-top', 'right-bottom', 'g']) {
      const target = find(data, id);
      for (const direction of ['left', 'right'] as const) expect(canDock(data, options, target, direction)).toBe(false);
      for (const direction of ['top', 'bottom', 'middle', 'before-tab', 'after-tab'] as const) expect(canDock(data, options, target, direction)).toBe(true);
    }
    for (let side = 0; side < 2; ++side) {
      for (const id of ['left-row-first', 'left-row-last', 'c', 'd', 'e']) {
        for (const direction of ['left', 'right'] as const) expect(canDock(data, options, find(data, id), direction)).toBe(true);
      }
      expect(canDock(data, options, find(data, 'left-row'), 'left')).toBe(false);
      data.dockbox.children.reverse();
    }
    for (const direction of ['left', 'right'] as const) {
      expect(canDock(data, options, find(data, 'center'), direction)).toBe(true);
      expect(canDock(data, {left: {[feature]: true}}, find(data, 'right-top'), direction)).toBe(true);
      expect(canDock(data, {right: {[feature]: true}}, find(data, 'left-top'), direction)).toBe(true);
      expect(canDock(data, {left: {padding: 4}, right: {padding: 4}}, find(data, 'left-top'), direction)).toBe(true);
    }
    // Dropping beside the entire column toward the center still creates a root column.
    expect(canDock(data, options, data.dockbox.children[0], 'right')).toBe(true);
    expect(canDock(data, options, data.dockbox.children.at(-1), 'left')).toBe(true);
    data.dockbox.children.splice(0, 1);
    expect(canDock(data, options, find(data, 'center'), 'left')).toBe(false);
    expect(canDock(data, options, find(data, 'center'), 'right')).toBe(true);
  });

  it('round-trips column state independently of original sizes and tab content', () => {
    const data = layout();
    data.columns = {'left-column': {collapsed: true, activePanelId: 'left-bottom'}, 'right-column': {activePanelId: 'right-top'}};
    const saved = JSON.parse(JSON.stringify(saveLayoutData(data)));
    const restored = fixLayoutData(loadLayoutData(saved, null, undefined, undefined, createTabCache(columnTabs)));
    expect(saveLayoutData(restored)).toEqual(saved);
    expect((find(restored, 'left-top') as PanelData).size).toBe(180);
    restored.columns['left-column'].collapsed = false;
    expect(saved.columns['left-column'].collapsed).toBe(true);
    expect(JSON.stringify(saved)).not.toContain('Content');
  });
});
