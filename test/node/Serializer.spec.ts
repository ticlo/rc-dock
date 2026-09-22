import {find, fixLayoutData} from '../../src/Algorithm';
import {loadLayoutData, saveLayoutData} from '../../src/Serializer';
import type {PanelData, TabData} from '../../src/DockData';
import {layout, tab} from '../fixtures';

describe('layout persistence (save-layout and adv-save-layout examples)', () => {
  it('saves JSON without content or circular parent references and restores tab content', () => {
    const original = layout();
    const saved = JSON.parse(JSON.stringify(saveLayoutData(original)));
    expect(saved.dockbox.children[0].tabs).toEqual([{id: 'a'}, {id: 'b'}]);
    const restored = fixLayoutData(loadLayoutData(saved, original));
    expect(saveLayoutData(restored)).toEqual(saved);
    expect((find(restored, 'a') as TabData).content).toBe((find(original, 'a') as TabData).content);
  });

  it('round-trips floating panel bounds', () => {
    const data = layout();
    data.floatbox.children.push({id: 'floating', x: 20, y: 30, z: 5, w: 320, h: 240, tabs: [tab('float')]});
    fixLayoutData(data);
    const restored = fixLayoutData(loadLayoutData(saveLayoutData(data), data));
    expect(find(restored, 'floating')).toMatchObject({x: 20, y: 30, z: 5, w: 320, h: 240});
    expect((find(restored, 'float') as TabData).content).toBe((find(data, 'float') as TabData).content);
  });

  it('uses save/load callbacks to persist custom tab data', () => {
    const data = layout();
    (find(data, 'a') as TabData).value = 42;
    const saved = saveLayoutData(data, ({id, value}) => ({id, value}));
    const restored = fixLayoutData(loadLayoutData(saved, null, ({id, value}) => tab(id, {value})));
    expect((find(restored, 'a') as TabData).value).toBe(42);
    expect((find(restored, 'b') as TabData).content).toMatchObject({props: {children: 'Content b'}});
  });

  it('filters tabs which the loader can no longer restore', () => {
    const restored = fixLayoutData(
      loadLayoutData(saveLayoutData(layout()), null, ({id}) => (id === 'a' ? null : tab(id)))
    );
    expect(find(restored, 'a')).toBeUndefined();
    expect((find(restored, 'left') as PanelData).activeId).toBe('b');
  });

  it('loads older saved layouts without floating, window or maximized boxes', () => {
    const original = layout();
    const restored = fixLayoutData(loadLayoutData({dockbox: saveLayoutData(original).dockbox}, original));
    expect(restored.floatbox.children).toEqual([]);
    expect(restored.windowbox.children).toEqual([]);
    expect(restored.maxbox.children).toEqual([]);
  });
});
