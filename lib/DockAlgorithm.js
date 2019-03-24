import { nextId } from "./DockData";
export const placeHolderGroup = {
    panelClass: 'dock-placeholder-panel',
    floatable: false,
};
let _watchObjectChange = new WeakMap();
export function getUpdatedObject(obj) {
    let result = _watchObjectChange.get(obj);
    if (result) {
        return getUpdatedObject(result);
    }
    return obj;
}
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
export function addTabToTab(layout, tab, target, direction) {
    let pos = target.parent.tabs.indexOf(target);
    if (pos >= 0) {
        if (direction === 'after-tab') {
            ++pos;
        }
        return addTabToPanel(layout, tab, target.parent, pos);
    }
    return layout;
}
export function addTabToPanel(layout, tab, panel, idx = -1) {
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
export function newPanelFromTab(tab) {
    let newPanel = { tabs: [tab], group: tab.group, activeId: tab.id };
    tab.parent = newPanel;
    return newPanel;
}
export function dockPanelToPanel(layout, newPanel, panel, direction) {
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
export function dockPanelToBox(layout, newPanel, box, direction) {
    let parentBox = box.parent;
    let dockMode;
    if (direction === 'root') {
        dockMode = box.mode;
    }
    else {
        dockMode = (direction === 'left' || direction === 'right') ? 'horizontal' : 'vertical';
    }
    let afterPanel = (direction === 'bottom' || direction === 'right');
    if (parentBox) {
        let pos = parentBox.children.indexOf(box);
        if (pos >= 0) {
            let newParentBox = clone(parentBox);
            if (dockMode === parentBox.mode) {
                if (afterPanel) {
                    ++pos;
                }
                newPanel.size = box.size * 0.3;
                box.size *= 0.7;
                newParentBox.children.splice(pos, 0, newPanel);
            }
            else {
                let newChildBox = { mode: dockMode, children: [] };
                newChildBox.size = box.size;
                if (afterPanel) {
                    newChildBox.children = [box, newPanel];
                }
                else {
                    newChildBox.children = [newPanel, box];
                }
                box.parent = newChildBox;
                box.size = 280;
                newPanel.parent = newChildBox;
                newPanel.size = 120;
                newParentBox.children[pos] = newChildBox;
                newChildBox.parent = newParentBox;
            }
            return invalidateBox(layout, parentBox, newParentBox);
        }
    }
    else if (box === layout.dockbox) {
        let newBox = clone(box);
        if (dockMode === box.mode) {
            let pos = 0;
            if (afterPanel) {
                pos = newBox.children.length;
            }
            newPanel.size = box.size * 0.3;
            box.size *= 0.7;
            newBox.children.splice(pos, 0, newPanel);
            return invalidateBox(layout, box, newBox);
        }
        else {
            // replace root dockbox
            let newDockBox = { mode: dockMode, children: [] };
            newDockBox.size = box.size;
            if (afterPanel) {
                newDockBox.children = [newBox, newPanel];
            }
            else {
                newDockBox.children = [newPanel, newBox];
            }
            newBox.parent = newDockBox;
            newBox.size = 280;
            newPanel.parent = newDockBox;
            newPanel.size = 120;
            return invalidateBox(layout, box, newDockBox);
        }
    }
    return layout;
}
export function floatPanel(layout, newPanel, rect) {
    let newBox = clone(layout.floatbox);
    newPanel.x = rect.left;
    newPanel.y = rect.top;
    newPanel.w = rect.width;
    newPanel.h = rect.height;
    newBox.children.push(newPanel);
    newPanel.parent = newBox;
    return invalidateBox(layout, layout.floatbox, newBox);
}
export function removeTab(layout, tab) {
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
export function fixLayoutData(layout) {
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
    if (layout.dockbox.children.length === 0) {
        let newPanel = { id: '+0', group: placeHolderGroup, panelLocked: true, size: 200, tabs: [] };
        newPanel.parent = layout.dockbox;
        layout.dockbox.children.push(newPanel);
    }
    else {
        while (layout.dockbox.children.length === 1 && 'children' in layout.dockbox.children[0]) {
            let newDockBox = clone(layout.dockbox.children[0]);
            layout.dockbox = newDockBox;
            for (let child of newDockBox.children) {
                child.parent = newDockBox;
            }
        }
    }
    layout.dockbox.parent = null;
    layout.floatbox.parent = null;
    return layout;
}
function fixpanelOrBox(d) {
    if (d.id == null) {
        d.id = nextId();
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
            if (child.tabs.length === 0) {
                // remove panel with no tab
                if (!child.panelLocked) {
                    box.children.splice(i, 1);
                    --i;
                }
                else if (child.group === placeHolderGroup && (box.children.length > 1 || box.parent)) {
                    // remove placeHolder Group
                    box.children.splice(i, 1);
                    --i;
                }
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
        if (box.id === layout.dockbox.id || box === layout.dockbox) {
            return Object.assign({}, layout, { dockbox: newBox });
        }
        else if (box.id === layout.floatbox.id || box === layout.floatbox) {
            return Object.assign({}, layout, { floatbox: newBox });
        }
    }
    return layout;
}
//# sourceMappingURL=DockAlgorithm.js.map