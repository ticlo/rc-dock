import {createElement} from 'react';
import type {LayoutBase, SideColumns, TabDefinitions} from '../src/DockData';

export const sideOptions: SideColumns = {
  left: {collapsible: true, accordion: true},
  right: {collapsible: true, accordion: true},
};

export function columnLayout(): LayoutBase {
  return {dockbox: {id: 'root', mode: 'horizontal', children: [
    {id: 'left-column', mode: 'vertical', size: 240, children: [
      {id: 'left-top', size: 180, tabs: [{id: 'a'}, {id: 'b'}]},
      {id: 'left-row', mode: 'horizontal', size: 120, children: [
        {id: 'left-row-first', tabs: [{id: 'c'}, {id: 'd'}]},
        {id: 'left-row-last', tabs: [{id: 'e'}]},
      ]},
      {id: 'left-bottom', size: 90, tabs: [{id: 'f'}]},
    ]},
    {id: 'center', size: 320, tabs: [{id: 'm'}]},
    {id: 'right-column', mode: 'vertical', size: 240, children: [
      {id: 'right-top', size: 200, tabs: [{id: 'g'}, {id: 'h'}]},
      {id: 'right-bottom', size: 100, tabs: [{id: 'i'}]},
    ]},
  ]}};
}

export const columnTabs: TabDefinitions = Object.fromEntries('abcdefghim'.split('').map((id) => [id, {
  title: id.toUpperCase(), content: createElement('div', null, `Content ${id}`), closable: true,
  minHeight: 100,
}]));
