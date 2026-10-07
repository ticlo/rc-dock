import * as React from 'react';
import {createRoot} from 'react-dom/client';
import {DockLayout, LayoutBase, SideColumns, TabDefinitions} from '../src';
import {tsxTab, htmlTab} from './prism-tabs';

const sideColumns: SideColumns = {
  left: {collapsible: true, accordion: true, padding: 10},
  right: {collapsible: true, accordion: true, padding: 10},
};

const tabs: TabDefinitions = {
  files: {title: 'Files', content: <div>Files</div>, closable: true},
  search: {title: 'Search', content: <div>Search</div>, closable: true},
  git: {title: 'Git', content: <div>Git</div>, closable: true},
  tasks: {title: 'Tasks', content: <div>Tasks</div>, closable: true},
  outline: {title: 'Outline', content: <div>Outline</div>, closable: true},
  details: {title: 'Details', content: <div>Details</div>, closable: true},
  history: {title: 'History', content: <div>History</div>, closable: true},
  help: {title: 'Help', content: <div>Help</div>, closable: true},
  main: {title: 'Side columns', content: <div style={{padding: 16}}>
    <p>Use « or » to collapse a column. Select a title in the rail to restore it.</p>
    <p>Use ^ to expand a panel. Select a tab or click a panel's header to expand it while accordion mode is active.</p>
    <p>Click ^ on the expanded panel to restore the column's original proportions.</p>
  </div>},
  tsxTab, htmlTab,
};

const layout: LayoutBase = {dockbox: {mode: 'horizontal', children: [
  {id: 'left', mode: 'vertical', size: 200, children: [
    {id: 'files-panel', tabs: [{id: 'files'}, {id: 'search'}]},
    {tabs: [{id: 'git'}]},
    {tabs: [{id: 'tasks'}]},
    {tabs: [{id: 'outline'}]},
  ]},
  {size: 600, tabs: [{id: 'main'}, {id: 'tsxTab'}, {id: 'htmlTab'}], panelLock: {panelStyle: 'main'}},
  {id: 'right', mode: 'vertical', size: 250, children: [
    {tabs: [{id: 'details'}, {id: 'history'}]},
    {tabs: [{id: 'help'}]},
  ]},
]}};

createRoot(document.getElementById('app')).render(<DockLayout defaultLayout={layout} tabs={tabs}
  sideColumns={sideColumns} style={{position: 'absolute', inset: '10px 0'}}/>);
