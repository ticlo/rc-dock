import {BoxData, DockMode, DropDirection, LayoutData, nextId, PanelData, TabData} from "./DockData";

let _watchObjectChange: Map<any, any> = new Map();


export function getUpdatedObject(obj: any): any {
  let result = _watchObjectChange.get(obj);
  if (result) {
    return getUpdatedObject(result);
  }
  _watchObjectChange.clear();
  return obj;
}

function clone<T>(value: T): T {
  let newValue: any = {...value};
  if (Array.isArray(newValue.tabs)) {
    newValue.tabs = newValue.tabs.concat();
  }
  if (Array.isArray(newValue.children)) {
    newValue.children = newValue.children.concat();
  }
  _watchObjectChange.set(value, newValue);
  return newValue;
}

export function addTabToTab(layout: LayoutData, tab: TabData, target: TabData, direction: DropDirection): LayoutData {
  let pos = target.parent.tabs.indexOf(target);
  if (pos >= 0) {
    if (direction === 'after-tab') {
      ++pos;
    }
    return addTabToPanel(layout, tab, target.parent, pos);
  }
  return layout;
}

export function addTabToPanel(layout: LayoutData, tab: TabData, panel: PanelData, idx = -1): LayoutData {
  if (idx === -1) {
    idx = panel.tabs.length;
  }
  let newPanel = clone(panel);
  newPanel.tabs.splice(idx, 0, tab);
  newPanel.activeId = tab.id;
  tab.parent = newPanel;

  layout = invalidatePanel(layout, panel, newPanel);
  return layout;
}

export function dockTabToPanel(layout: LayoutData, tab: TabData, panel: PanelData, direction: DropDirection): LayoutData {
  if (direction === 'middle') {
    return addTabToPanel(layout, tab, panel);
  }
  let newPanel: PanelData = {tabs: [tab], group: tab.group, activeId: tab.id};
  tab.parent = newPanel;
  return dockPanelToPanel(layout, newPanel, panel, direction);
}

export function dockPanelToPanel(layout: LayoutData, newPanel: PanelData, panel: PanelData, direction: DropDirection): LayoutData {
  let box = panel.parent;
  let dockMode: DockMode = (direction === 'left' || direction === 'right') ? 'horizontal' : 'vertical';
  let afterPanel = (direction === 'bottom' || direction === 'right');

  let pos = box.children.indexOf(panel);
  if (pos >= 0) {
    let newBox = clone(box);
    if (dockMode === box.mode) {
      if (afterPanel) {
        ++pos;
      }
      panel.size *= 0.5;
      newPanel.size = panel.size;
      newBox.children.splice(pos, 0, newPanel);
    } else {
      let newChildBox: BoxData = {mode: dockMode, children: []};
      if (afterPanel) {
        newChildBox.children = [panel, newPanel];
      } else {
        newChildBox.children = [newPanel, panel];
      }
      panel.parent = newChildBox;
      newPanel.parent = newChildBox;
      newBox.children[pos] = newChildBox;
      newChildBox.parent = newBox;
    }
    return invalidateBox(layout, box, newBox);
  }
  return layout;
}

export function removeTab(layout: LayoutData, tab: TabData): LayoutData {
  if (tab.parent) {
    let pos = tab.parent.tabs.indexOf(tab);
    if (pos >= 0) {
      let newPanel = clone(tab.parent);
      newPanel.tabs.splice(pos, 1);
      if (newPanel.activeId === tab.id) {
        // update selection id
        if (newPanel.tabs.length > pos) {
          newPanel.activeId = newPanel.tabs[pos].id;
        } else if (newPanel.tabs.length) {
          newPanel.activeId = newPanel.tabs[0].id;
        }
      }
      for (let tab of newPanel.tabs) {
        tab.parent = newPanel;
      }
      return invalidatePanel(layout, tab.parent, newPanel);
    }
  }
  return layout;
}

export function fixLayoutData(layout: LayoutData): LayoutData {
  if (!('dockbox' in layout)) {
    layout.dockbox = {mode: 'horizontal', children: [], size: 1};
  }
  if (!('floatbox' in layout)) {
    layout.floatbox = {mode: 'float', children: [], size: 1};
  } else {
    layout.floatbox.mode = 'float';
  }
  fixBoxData(layout.dockbox);
  fixBoxData(layout.floatbox);
  return layout;
}

function fixPanelData(panel: PanelData): PanelData {
  if (panel.id == null) {
    panel.id = nextId();
  }
  if (!(panel.size > 0)) {
    panel.size = 200;
  }
  for (let child of panel.tabs) {
    child.parent = panel;
  }
  return panel;
}

function fixBoxData(box: BoxData): BoxData {
  if (box.id == null) {
    box.id = nextId();
  }

  if (!(box.size > 0)) {
    box.size = 200;
  }
  for (let child of box.children) {
    child.parent = box;
    if ('children' in child) {
      fixBoxData(child);
    } else if ('tabs' in child) {
      fixPanelData(child);
    }
  }
  return box;
}

function invalidatePanel(layout: LayoutData, panel: PanelData, newPanel: PanelData): LayoutData {
  let box = panel.parent;
  if (box) {
    let pos = box.children.indexOf(panel);
    if (pos >= 0) {
      let newBox = clone(box);
      newBox.children[pos] = newPanel;
      for (let child of newBox.children) {
        child.parent = newBox;
      }
      return invalidateBox(layout, box, newBox);
    }
  }
  return layout;
}

function invalidateBox(layout: LayoutData, box: BoxData, newBox: BoxData): LayoutData {
  let parentBox = box.parent;
  if (parentBox) {
    let pos = parentBox.children.indexOf(box);
    if (pos >= 0) {
      let newParentBox = clone(parentBox);
      newParentBox.children[pos] = newBox;
      for (let child of newParentBox.children) {
        child.parent = newParentBox;
      }
      return invalidateBox(layout, parentBox, newParentBox);
    }
  } else {
    if (box.id === layout.dockbox.id) {
      return {...layout, dockbox: newBox};
    } else if (box.id === layout.floatbox.id) {
      return {...layout, floatbox: newBox};
    }
  }
  return layout;
}