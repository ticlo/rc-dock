"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function addTabToTab(layout, tab, target, direction) {
}
exports.addTabToTab = addTabToTab;
function removeTab(layout, tab) {
    if (tab.parent) {
        let pos = tab.parent.tabs.indexOf(tab);
        if (pos >= 0) {
            let newPanel = Object.assign({}, tab.parent);
            newPanel.tabs = newPanel.tabs.concat();
            newPanel.tabs.splice(pos, 1);
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