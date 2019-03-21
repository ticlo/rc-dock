"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const DockData_1 = require("./DockData");
let _watchObjectChange = new WeakMap();
function getUpdatedObject(obj) {
    let result = _watchObjectChange.get(obj);
    if (result) {
        return getUpdatedObject(result);
    }
    return obj;
}
exports.getUpdatedObject = getUpdatedObject;
function clone(value) {
    let newValue = Object.assign({}, value);
    if (Array.isArray(newValue.tabs)) {
        newValue.tabs = newValue.tabs.concat();
    }
    if (Array.isArray(newValue.children)) {
        newValue.children = newValue.children.concat();
    }
    _watchObjectChange.set(value, newValue);
    return newValue;
}
function addTabToTab(layout, tab, target, direction) {
    let pos = target.parent.tabs.indexOf(target);
    if (pos >= 0) {
        if (direction === 'after-tab') {
            ++pos;
        }
        return addTabToPanel(layout, tab, target.parent, pos);
    }
    return layout;
}
exports.addTabToTab = addTabToTab;
function addTabToPanel(layout, tab, panel, idx = -1) {
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
exports.addTabToPanel = addTabToPanel;
function newPanelFromTab(tab) {
    let newPanel = { tabs: [tab], group: tab.group, activeId: tab.id };
    tab.parent = newPanel;
    return newPanel;
}
exports.newPanelFromTab = newPanelFromTab;
function dockPanelToPanel(layout, newPanel, panel, direction) {
    let box = panel.parent;
    let dockMode = (direction === 'left' || direction === 'right') ? 'horizontal' : 'vertical';
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
        }
        else {
            let newChildBox = { mode: dockMode, children: [] };
            newChildBox.size = panel.size;
            if (afterPanel) {
                newChildBox.children = [panel, newPanel];
            }
            else {
                newChildBox.children = [newPanel, panel];
            }
            panel.parent = newChildBox;
            panel.size = 200;
            newPanel.parent = newChildBox;
            newPanel.size = 200;
            newBox.children[pos] = newChildBox;
            newChildBox.parent = newBox;
        }
        return invalidateBox(layout, box, newBox);
    }
    return layout;
}
exports.dockPanelToPanel = dockPanelToPanel;
function floatPanel(layout, newPanel, rect) {
    console.log(123);
    let newBox = clone(layout.floatbox);
    newPanel.x = rect.left;
    newPanel.y = rect.top;
    newPanel.w = rect.width;
    newPanel.h = rect.height;
    if (newPanel.h < 200) {
        newPanel.h = 200;
    }
    if (newPanel.w < 200) {
        newPanel.x -= (200 - newPanel.w) * 0.5;
        newPanel.w = 200;
    }
    newBox.children.push(newPanel);
    newPanel.parent = newBox;
    return invalidateBox(layout, layout.floatbox, newBox);
}
exports.floatPanel = floatPanel;
function removeTab(layout, tab) {
    if (tab.parent) {
        let pos = tab.parent.tabs.indexOf(tab);
        if (pos >= 0) {
            let newPanel = clone(tab.parent);
            newPanel.tabs.splice(pos, 1);
            if (newPanel.activeId === tab.id) {
                // update selection id
                if (newPanel.tabs.length > pos) {
                    newPanel.activeId = newPanel.tabs[pos].id;
                }
                else if (newPanel.tabs.length) {
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
exports.removeTab = removeTab;
function fixLayoutData(layout) {
    if (!('dockbox' in layout)) {
        layout.dockbox = { mode: 'horizontal', children: [], size: 1 };
    }
    if (!('floatbox' in layout)) {
        layout.floatbox = { mode: 'float', children: [], size: 1 };
    }
    else {
        layout.floatbox.mode = 'float';
    }
    fixBoxData(layout.dockbox);
    fixBoxData(layout.floatbox);
    return layout;
}
exports.fixLayoutData = fixLayoutData;
function fixpanelOrBox(d) {
    if (d.id == null) {
        d.id = DockData_1.nextId();
    }
    if (!(d.size >= 0)) {
        d.size = 200;
    }
    if (!(d.minWidth >= 0)) {
        d.minWidth = 0;
    }
    if (!(d.minHeight >= 0)) {
        d.minHeight = 0;
    }
}
function fixPanelData(panel) {
    fixpanelOrBox(panel);
    for (let child of panel.tabs) {
        child.parent = panel;
    }
    return panel;
}
function fixBoxData(box) {
    fixpanelOrBox(box);
    for (let i = 0; i < box.children.length; ++i) {
        let child = box.children[i];
        child.parent = box;
        if ('children' in child) {
            fixBoxData(child);
            if (child.children.length === 0) {
                // remove box with no child
                box.children.splice(i, 1);
                --i;
            }
            else if (child.children.length === 1) {
                // box with one child should be merged back to parent box
                let subChild = child.children[0];
                if (subChild.mode === box.mode) {
                    // sub child is another box that can be merged into current box
                    let totalSubSize = 0;
                    for (let subsubChild of subChild.children) {
                        totalSubSize += subsubChild.size;
                    }
                    let sizeScale = child.size / totalSubSize;
                    for (let subsubChild of subChild.children) {
                        subsubChild.size *= sizeScale;
                    }
                    // merge children up
                    box.children.splice(i, 1, ...subChild.children);
                }
                else {
                    // sub child can be moved up one layer
                    subChild.size = child.size;
                    box.children[i] = subChild;
                }
                --i;
            }
        }
        else if ('tabs' in child) {
            fixPanelData(child);
            if (child.tabs.length === 0 && !child.panelLocked) {
                // remove panel with no tab
                box.children.splice(i, 1);
                --i;
            }
        }
    }
    return box;
}
function invalidatePanel(layout, panel, newPanel) {
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
function invalidateBox(layout, box, newBox) {
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
    }
    else {
        if (box.id === layout.dockbox.id) {
            return Object.assign({}, layout, { dockbox: newBox });
        }
        else if (box.id === layout.floatbox.id) {
            return Object.assign({}, layout, { floatbox: newBox });
        }
    }
    return layout;
}
//# sourceMappingURL=DockAlgorithm.js.map