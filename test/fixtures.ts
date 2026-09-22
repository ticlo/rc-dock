import {createElement} from 'react';
import {fixLayoutData} from '../src/Algorithm';
import type {LayoutData, TabData} from '../src/DockData';

export function tab(id: string, extra: Partial<TabData> = {}): TabData {
  return {id, title: `Tab ${id}`, content: createElement('div', null, `Content ${id}`), closable: true, ...extra};
}

export function layout(): LayoutData {
  return fixLayoutData({
    dockbox: {
      id: 'root',
      mode: 'horizontal',
      children: [
        {id: 'left', tabs: [tab('a'), tab('b')], activeId: 'a'},
        {id: 'right', tabs: [tab('c')]},
      ],
    },
  });
}
