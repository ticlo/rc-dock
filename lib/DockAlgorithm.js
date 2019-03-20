"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const DockData_1 = require("./DockData");
let _watchObjectChange = new Map();
function getUpdatedObject(obj) {
    let result = _watchObjectChange.get(obj);
    if (result) {
        return getUpdatedObject(result);
    }
    _watchObjectChange.clear();
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
function dockTabToPanel(layout, tab, panel, direction) {
    if (direction === 'middle') {
        return addTabToPanel(layout, tab, panel);
    }
    let newPanel = { tabs: [tab], group: tab.group, activeId: tab.id };
    tab.parent = newPanel;
    return dockPanelToPanel(layout, newPanel, panel, direction);
}
exports.dockTabToPanel = dockTabToPanel;
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
            if (afterPanel) {
                newChildBox.children = [panel, newPanel];
            }
            else {
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
exports.dockPanelToPanel = dockPanelToPanel;
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
function fixPanelData(panel) {
    if (panel.id == null) {
        panel.id = DockData_1.nextId();
    }
    if (!(panel.size > 0)) {
        panel.size = 200;
    }
    for (let child of panel.tabs) {
        child.parent = panel;
    }
    return panel;
}
function fixBoxData(box) {
    if (box.id == null) {
        box.id = DockData_1.nextId();
    }
    if (!(box.size > 0)) {
        box.size = 200;
    }
    for (let child of box.children) {
        child.parent = box;
        if ('children' in child) {
            fixBoxData(child);
        }
        else if ('tabs' in child) {
            fixPanelData(child);
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