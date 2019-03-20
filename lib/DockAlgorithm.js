"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
function addTabToPanel(layout, tab, target, idx = -1) {
    if (idx === -1) {
        idx = target.tabs.length;
    }
    return layout;
}
exports.addTabToPanel = addTabToPanel;
function removeTab(layout, tab) {
    if (tab.parent) {
        let pos = tab.parent.tabs.indexOf(tab);
        if (pos >= 0) {
            let newPanel = Object.assign({}, tab.parent);
            newPanel.tabs = newPanel.tabs.concat();
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
function fixLayout(layout) {
    return layout;
}
exports.fixLayout = fixLayout;
function invalidatePanel(layout, panel, newPanel) {
    let box = panel.parent;
    if (box) {
        let pos = box.children.indexOf(panel);
        if (pos >= 0) {
            let newBox = Object.assign({}, box);
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
function invalidateBox(layout, box, newBox) {
    let parentBox = box.parent;
    if (parentBox) {
        let pos = parentBox.children.indexOf(box);
        if (pos >= 0) {
            let newParentBox = Object.assign({}, parentBox);
            newParentBox.children = newBox.children.concat();
            newParentBox.children[pos] = newBox;
            for (let child of newParentBox.children) {
                child.parent = newParentBox;
            }
            return invalidateBox(layout, parentBox, newParentBox);
        }
    }
    else {
        if (box === layout.dockbox) {
            return Object.assign({}, layout, { dockbox: newBox });
        }
        else if (box === layout.floatbox) {
            return Object.assign({}, layout, { floatbox: newBox });
        }
    }
    return layout;
}
//# sourceMappingURL=DockAlgorithm.js.map