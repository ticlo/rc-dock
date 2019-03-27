"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function addPanelToCache(panelData, cache) {
    cache.panels.set(panelData.id, panelData);
    for (let tab of panelData.tabs) {
        cache.tabs.set(tab.id, tab);
    }
}
function addBoxToCache(boxData, cache) {
    for (let child of boxData.children) {
        if ('tabs' in child) {
            addPanelToCache(child, cache);
        }
        else if ('children' in child) {
            addBoxToCache(child, cache);
        }
    }
}
function createLayoutCache(defaultLayout) {
    let cache = {
        panels: new Map(),
        tabs: new Map()
    };
    addBoxToCache(defaultLayout.dockbox, cache);
    addBoxToCache(defaultLayout.floatbox, cache);
    return cache;
}
exports.createLayoutCache = createLayoutCache;
function saveLayout(layout, modifier = {}) {
    const { modifySavedTab, modifySavedPanel } = modifier;
    function saveTab(tabData) {
        let savedTab = { id: tabData.id, groupName: tabData.group.name };
        if (modifySavedTab) {
            modifySavedTab(savedTab, tabData);
        }
        return savedTab;
    }
    function savePanel(panelData) {
        let tabs = [];
        for (let tab of panelData.tabs) {
            tabs.push(saveTab(tab));
        }
        let { id, size, activeId, group } = panelData;
        let savedPanel;
        if (panelData.parent.mode === 'float') {
            let { x, y, z, w, h } = panelData;
            savedPanel = { id, size, tabs, activeId, groupName: group.name, x, y, z, w, h };
        }
        else {
            savedPanel = { id, size, tabs, activeId, groupName: group.name };
        }
        if (modifySavedPanel) {
            modifySavedPanel(savedPanel, panelData);
        }
        return savedPanel;
    }
    function saveBox(boxData) {
        let children = [];
        for (let child of boxData.children) {
            if ('tabs' in child) {
                children.push(savePanel(child));
            }
            else if ('children' in child) {
                children.push(saveBox(child));
            }
        }
        let { id, size, mode } = boxData;
        return { id, size, mode, children };
    }
    return {
        dockbox: saveBox(layout.dockbox),
        floatbox: saveBox(layout.floatbox)
    };
}
exports.saveLayout = saveLayout;
function loadLayout(savedLayout, defaultLayout, modifier = {}) {
    const { loadTab, loadPanel } = modifier;
    let cache = createLayoutCache(defaultLayout);
    function loadTabData(savedTab) {
    }
    function loadPanelData(savedPanel) {
        let tabs = [];
        for (let savedTab of savedPanel.tabs) {
            tabs.push(loadTabData(savedTab));
        }
        let panelData;
        if (loadPanel) {
            panelData = loadPanel(savedPanel);
        }
    }
    function loadBoxData(savedBox) {
        let children = [];
        for (let child of savedBox.children) {
            if ('tabs' in child) {
                children.push(loadPanelData(child));
            }
            else if ('children' in child) {
                children.push(loadBoxData(child));
            }
        }
        let { id, size, mode } = savedBox;
        return { id, size, mode, children };
    }
    return {
        dockbox: loadBoxData(savedLayout.dockbox),
        floatbox: loadBoxData(savedLayout.floatbox)
    };
}
exports.loadLayout = loadLayout;
//# sourceMappingURL=Serializer.js.map