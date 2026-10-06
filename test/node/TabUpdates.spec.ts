import {find, updateLayoutTabs} from '../../src/Algorithm';
import type {PanelData, TabData} from '../../src/DockData';
import {createTabCache, saveLayoutData} from '../../src/Serializer';
import {layout, tab} from '../fixtures';

describe('tab registry updates', () => {
  it('keeps the entire layout when definitions are unchanged or only closed tabs change', () => {
    const data = layout();
    const definitions = {a: tab('a'), b: tab('b'), c: tab('c')};
    const previous = createTabCache(definitions);
    expect(updateLayoutTabs(data, createTabCache({...definitions}), previous)).toBe(data);
    expect(updateLayoutTabs(data, createTabCache({...definitions, closed: tab('closed')}), previous)).toBe(data);
    expect(updateLayoutTabs(data, undefined, previous)).toBe(data);
  });

  it('updates one definition while retaining unrelated tabs, panels and layout state', () => {
    const data = layout();
    const saved = saveLayoutData(data);
    const left = find(data, 'left') as PanelData;
    const right = find(data, 'right') as PanelData;
    const previous = createTabCache({a: left.tabs[0], b: left.tabs[1], c: right.tabs[0]});
    const next = createTabCache({...previous, a: {...previous.a, title: 'Updated A'}});
    const updated = updateLayoutTabs(data, next, previous);
    const updatedLeft = find(updated, 'left') as PanelData;
    expect(updatedLeft.tabs[0].title).toBe('Updated A');
    expect(updatedLeft.tabs[0].parent).toBe(updatedLeft);
    expect(updatedLeft.tabs[1]).toBe(left.tabs[1]);
    expect(find(updated, 'right')).toBe(right);
    expect(right.parent).toBe(updated.dockbox);
    expect(updated.floatbox).toBe(data.floatbox);
    expect(saveLayoutData(updated)).toEqual(saved);
  });

  it('recalculates constraints when minimum sizes or the inferred tab group change', () => {
    const data = layout();
    const original = find(data, 'a') as TabData;
    const definition = Object.freeze({...original, minWidth: 700, minHeight: 500, group: 'tools'});
    const updated = updateLayoutTabs(data, createTabCache({a: definition}), createTabCache({a: original}), {tools: {widthFlex: 2}});
    const panel = (find(updated, 'a') as TabData).parent;
    expect(panel).toMatchObject({minWidth: 700, minHeight: 500, group: 'tools', widthFlex: 2});
    expect(updated.dockbox.minWidth).toBeGreaterThanOrEqual(700);
    expect(updated.dockbox.minHeight).toBe(500);
  });
});
