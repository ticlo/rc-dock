"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Algorithm_1 = require("./Algorithm");
function addPanelToCache(panelData, cache) {
    cache.panels.set(panelData.id, panelData);
    let group = panelData.group;
    if (!cache.groups.has(group.name)) {
        cache.groups.set(group.name, group);
    }
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
        tabs: new Map(),
        groups: new Map()
    };
    if ('children' in defaultLayout) {
        // BoxData
        addBoxToCache(defaultLayout, cache);
    }
    else {
        // LayoutData
        if ('dockbox' in defaultLayout) {
            addBoxToCache(defaultLayout.dockbox, cache);
        }
        if ('floatbox' in defaultLayout) {
            addBoxToCache(defaultLayout.floatbox, cache);
        }
    }
    return cache;
}
exports.createLayoutCache = createLayoutCache;
function saveLayoutData(layout, modifier = {}) {
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
exports.saveLayoutData = saveLayoutData;
function loadLayoutData(savedLayout, defaultLayout, modifier = {}) {
    const { loadTab, loadGroup, modifyLoadedPanel } = modifier;
    if (!savedLayout.floatbox) {
        savedLayout.floatbox = { mode: 'float', children: [], size: 0 };
    }
    let cache = createLayoutCache(defaultLayout);
    function loadTabGroup(groupName) {
        if (groupName === Algorithm_1.placeHolderGroup.name) {
            return Algorithm_1.placeHolderGroup;
        }
        let group;
        if (loadGroup) {
            group = loadGroup(groupName);
        }
        if (!group) {
            group = cache.groups.get(groupName);
        }
        return group;
    }
    function loadTabData(savedTab) {
        if (loadTab) {
            return loadTab(savedTab);
        }
        let { id } = savedTab;
        if (cache.tabs.has(id)) {
            return cache.tabs.get(id);
        }
        return null;
    }
    function loadPanelData(savedPanel) {
        let { id, groupName, size, activeId, x, y, z, w, h } = savedPanel;
        let tabs = [];
        for (let savedTab of savedPanel.tabs) {
            let tabData = loadTabData(savedTab);
            if (tabData) {
                tabs.push(tabData);
            }
        }
        let panelData;
        if (w || h || x || y || z) {
            panelData = { id, size, activeId, x, y, z, w, h, tabs, group: loadTabGroup(groupName) };
        }
        else {
            panelData = { id, size, activeId, tabs, group: loadTabGroup(groupName) };
        }
        if (modifyLoadedPanel) {
            modifyLoadedPanel(panelData, savedPanel);
        }
        else if (cache.panels.has(id)) {
            panelData = Object.assign({}, cache.panels.get(id), panelData);
        }
        return panelData;
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
exports.loadLayoutData = loadLayoutData;
//# sourceMappingURL=Serializer.js.map