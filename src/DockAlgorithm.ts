import {BoxData, DropDirection, LayoutData, PanelData, TabData} from "./DockData";

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

export function addTabToPanel(layout: LayoutData, tab: TabData, target: PanelData, idx = -1): LayoutData {
  if (idx === -1) {
    idx = target.tabs.length;
  }

  return layout;
}


export function removeTab(layout: LayoutData, tab: TabData): LayoutData {
  if (tab.parent) {
    let pos = tab.parent.tabs.indexOf(tab);
    if (pos >= 0) {
      let newPanel = {...tab.parent};
      newPanel.tabs = newPanel.tabs.concat();
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

export function fixLayout(layout: LayoutData): LayoutData {
  return layout;
}

function invalidatePanel(layout: LayoutData, panel: PanelData, newPanel: PanelData): LayoutData {
  let box = panel.parent;
  if (box) {
    let pos = box.children.indexOf(panel);
    if (pos >= 0) {
      let newBox = {...box};
      newBox.children = newBox.children.concat();
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
      let newParentBox = {...parentBox};
      newParentBox.children = newBox.children.concat();
      newParentBox.children[pos] = newBox;
      for (let child of newParentBox.children) {
        child.parent = newParentBox;
      }
      return invalidateBox(layout, parentBox, newParentBox);
    }
  } else {
    if (box === layout.dockbox) {
      return {...layout, dockbox: newBox};
    } else if (box === layout.floatbox) {
      return {...layout, floatbox: newBox};
    }
  }
  return layout;
}