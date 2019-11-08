"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const DockData_1 = require("./DockData");
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
        tabs: new Map(),
    };
    if (defaultLayout) {
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
    }
    return cache;
}
exports.createLayoutCache = createLayoutCache;
function saveLayoutData(layout, saveTab, afterPanelSaved) {
    function saveTabData(tabData) {
        if (saveTab) {
            return saveTab(tabData);
        }
        return { id: tabData.id };
    }
    function savePanelData(panelData) {
        let tabs = [];
        for (let tab of panelData.tabs) {
            let savedTab = saveTabData(tab);
            if (savedTab) {
                tabs.push(savedTab);
            }
        }
        let { id, size, activeId } = panelData;
        let savedPanel;
        if (panelData.parent.mode === 'float') {
            let { x, y, z, w, h } = panelData;
            savedPanel = { id, size, tabs, activeId, x, y, z, w, h };
        }
        else {
            savedPanel = { id, size, tabs, activeId };
        }
        if (afterPanelSaved) {
            afterPanelSaved(savedPanel, panelData);
        }
        return savedPanel;
    }
    function saveBoxData(boxData) {
        let children = [];
        for (let child of boxData.children) {
            if ('tabs' in child) {
                children.push(savePanelData(child));
            }
            else if ('children' in child) {
                children.push(saveBoxData(child));
            }
        }
        let { id, size, mode } = boxData;
        return { id, size, mode, children };
    }
    return {
        dockbox: saveBoxData(layout.dockbox),
        floatbox: saveBoxData(layout.floatbox),
        maxbox: saveBoxData(layout.maxbox),
    };
}
exports.saveLayoutData = saveLayoutData;
function loadLayoutData(savedLayout, defaultLayout, loadTab, afterPanelLoaded) {
    if (!savedLayout.floatbox) {
        savedLayout.floatbox = { mode: 'float', children: [], size: 0 };
    }
    if (!savedLayout.maxbox) {
        savedLayout.maxbox = { mode: 'maximize', children: [], size: 1 };
    }
    let cache = createLayoutCache(defaultLayout);
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
        let { id, size, activeId, x, y, z, w, h } = savedPanel;
        let tabs = [];
        for (let savedTab of savedPanel.tabs) {
            let tabData = loadTabData(savedTab);
            if (tabData) {
                tabs.push(tabData);
            }
        }
        let panelData;
        if (w || h || x || y || z) {
            panelData = { id, size, activeId, x, y, z, w, h, tabs };
        }
        else {
            panelData = { id, size, activeId, tabs };
        }
        if (savedPanel.id === DockData_1.maximePlaceHolderId) {
            panelData.panelLock = {};
        }
        else if (afterPanelLoaded) {
            afterPanelLoaded(savedPanel, panelData);
        }
        else if (cache.panels.has(id)) {
            panelData = { ...cache.panels.get(id), ...panelData };
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
        floatbox: loadBoxData(savedLayout.floatbox),
        maxbox: loadBoxData(savedLayout.maxbox),
    };
}
exports.loadLayoutData = loadLayoutData;
