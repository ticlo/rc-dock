import * as React from 'react';
import {BoxData, ColumnState, DockContextType, DropDirection, LayoutData, maximePlaceHolderId, PanelData, SideColumnOptions, SideColumns, TabData} from './DockData';

type Column = BoxData | PanelData;
export const headerSize = 32;
export const railWidth = 28;

/** @ignore */
export interface ColumnView {
  side: 'left' | 'right';
  column: Column;
  panels: PanelData[];
  topPanel?: PanelData;
  collapsible: boolean;
  accordion: boolean;
  collapsed: boolean;
  activePanelId?: string;
  heights: Map<Column, number>;
  expanded: Set<Column>;
  options: SideColumnOptions;
  state?: ColumnState;
}

/** @ignore */
export function getColumnViews(layout: LayoutData, options?: SideColumns, previous?: Map<Column, ColumnView>): Map<Column, ColumnView> | undefined {
  const {dockbox: root} = layout;
  if (!options || root.mode !== 'horizontal' || root.children.length < 2) return;
  const views = new Map<Column, ColumnView>();
  for (const side of ['left', 'right'] as const) {
    const option = options[side];
    if (!option?.collapsible && !option?.accordion) continue;
    const column = side === 'left' ? root.children[0] : root.children.at(-1);
    const state = layout.columns?.[column.id];
    const cached = previous?.get(column);
    if (cached?.options === option && cached.state === state && cached.side === side) {
      views.set(column, cached);
      continue;
    }
    const panels: PanelData[] = [];
    function collect(node: Column) {
      if ('tabs' in node) {
        if (node.id !== maximePlaceHolderId) panels.push(node);
      } else node.children.forEach(collect);
    }
    collect(column);
    let top: Column = column;
    while ('children' in top && top.mode === 'vertical' && top.children.length) top = top.children[0];
    const view: ColumnView = {
      side, column, panels, topPanel: 'tabs' in top && top.id !== maximePlaceHolderId ? top : undefined,
      collapsible: !!option.collapsible,
      accordion: !!option.accordion && panels.length > 1,
      collapsed: !!option.collapsible && !!state?.collapsed,
      activePanelId: option.accordion && panels.length > 1 && panels.some((panel) => panel.id === state?.activePanelId)
        ? state.activePanelId : undefined,
      heights: new Map(), expanded: new Set(),
      options: option, state,
    };
    if (view.activePanelId) {
      function measure(node: Column): number {
        let height = headerSize;
        if ('tabs' in node) {
          if (node.id === view.activePanelId) view.expanded.add(node);
        } else {
          const heights = node.children.map(measure);
          height = node.mode === 'vertical'
            ? heights.reduce((sum, value) => sum + value, 0) + (heights.length - 1) * 4
            : Math.max(...heights);
          if (node.children.some((child) => view.expanded.has(child))) view.expanded.add(node);
        }
        view.heights.set(node, height);
        return height;
      }
      measure(column);
    }
    views.set(column, view);
  }
  return views;
}

/** @ignore */
export function columnStyle(node: Column, view?: ColumnView): React.CSSProperties | undefined {
  if (!view) return;
  if (node === view.column && view.collapsed) return {minWidth: railWidth, minHeight: 0, flex: `0 0 ${railWidth}px`};
  if (!view.activePanelId) return;
  const height = view.heights.get(node);
  const expanded = view.expanded.has(node);
  if (node === view.column) return {minHeight: height};
  if (node.parent.mode === 'vertical') return {minHeight: height, flex: expanded ? '1 1 0px' : `0 0 ${height}px`};
  return expanded ? {minHeight: height} : {minHeight: height, height, alignSelf: 'flex-start'};
}

/** @ignore */
export function canDock(layout: LayoutData, options: SideColumns | undefined, target: TabData | PanelData | BoxData, direction: DropDirection): boolean {
  const root = layout.dockbox;
  const left = options?.left?.collapsible || options?.left?.accordion;
  const right = options?.right?.collapsible || options?.right?.accordion;
  if ((!left && !right) || root.mode !== 'horizontal' || root.children.length < 2 || !target) return true;
  if (!('tabs' in target) && !('children' in target)) target = target.parent;
  if (target === root) {
    if (direction === 'top' || direction === 'bottom') return false;
    if (direction === 'left' && left || direction === 'right' && right) return false;
  }
  const parent = target.parent as BoxData;
  if (parent === root) {
    if (direction === 'left' && left && target === root.children[0]) return false;
    if (direction === 'right' && right && target === root.children.at(-1)) return false;
  } else if ((direction === 'left' || direction === 'right') && parent?.mode !== 'horizontal') {
    let column = parent;
    while (column && column.parent !== root) column = column.parent;
    if (left && column === root.children[0] || right && column === root.children.at(-1)) return false;
  }
  return true;
}

/** @ignore */
export function ColumnRail({view}: {view: ColumnView}) {
  const context = React.useContext(DockContextType);
  return <div className={`dock-column-rail dock-column-rail-${view.side}`}>
    {view.panels.map((panel) => <div className="dock-column-group" key={panel.id}>
      {panel.tabs.map((tab) => <div className={`dock-column-tab${panel.activeId === tab.id ? ' dock-column-tab-active' : ''}`}
        key={tab.id} data-tabid={tab.id} onClick={() => {
          const state: ColumnState = {collapsed: false};
          if (view.activePanelId) state.activePanelId = panel.id;
          context.onColumnChange(view.column.id, state, tab);
        }}>{tab.title}</div>)}
    </div>)}
  </div>;
}
