import {BoxData, DropDirection, LayoutData, PanelData, TabData} from "./DockData";

export function addTabToTab(layout: LayoutData, tab: TabData, target: TabData, direction: DropDirection): LayoutData {

}

export function removeTab(layout: LayoutData, tab: TabData): LayoutData {
  if (tab.parent) {
    let pos = tab.parent.tabs.indexOf(tab);
    if (pos >= 0) {
      let newPanel = {...tab.parent};
      newPanel.tabs = newPanel.tabs.concat();
      newPanel.tabs.splice(pos, 1);
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