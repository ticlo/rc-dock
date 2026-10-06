import {
  BoxData,
  LayoutData,
  PanelData, BoxBase, LayoutBase, PanelBase, TabBase,
  TabData,
  TabDefinitions,
  maximePlaceHolderId
} from "./DockData";

interface DefaultLayoutCache {
  panels: Map<string, PanelBase>;
  tabs: Map<string, TabBase>;
}

function addPanelToCache(panelData: PanelBase, cache: DefaultLayoutCache) {
  cache.panels.set(panelData.id, panelData);
  for (let tab of panelData.tabs) {
    cache.tabs.set(tab.id, tab);
  }
}

function addBoxToCache(boxData: BoxBase, cache: DefaultLayoutCache) {
  for (let child of boxData.children) {
    if ('tabs' in child) {
      addPanelToCache(child, cache);
    } else if ('children' in child) {
      addBoxToCache(child, cache);
    }
  }
}


export function createLayoutCache(defaultLayout: LayoutBase | BoxBase): DefaultLayoutCache {
  let cache: DefaultLayoutCache = {
    panels: new Map(),
    tabs: new Map(),
  };
  if (defaultLayout) {
    if ('children' in defaultLayout) {
      // BoxData
      addBoxToCache(defaultLayout, cache);
    } else {
      // LayoutData
      if ('dockbox' in defaultLayout) {
        addBoxToCache(defaultLayout.dockbox, cache);
      }
      if (defaultLayout.floatbox) {
        addBoxToCache(defaultLayout.floatbox, cache);
      }
      if (defaultLayout.windowbox) {
        addBoxToCache(defaultLayout.windowbox, cache);
      }
      if (defaultLayout.maxbox) {
        addBoxToCache(defaultLayout.maxbox, cache);
      }
    }
  }

  return cache;
}

/** @ignore */
export function createTabCache(tabs?: TabDefinitions): TabDefinitions | undefined {
  // A dictionary avoids inherited keys and slow lookups on large spread objects.
  return tabs ? Object.assign(Object.create(null), tabs) : undefined;
}

/** @ignore */
export function loadTabData(
  savedTab: TabBase,
  tabs?: TabDefinitions,
  loadTab?: (tab: TabBase) => TabData | null,
  defaultTab?: TabBase
): TabData | null {
  let definition = tabs?.[savedTab.id];
  if (definition) {
    let tab = Object.assign({}, savedTab, definition);
    tab.id = savedTab.id;
    return tab;
  }
  if (loadTab) {
    return loadTab(savedTab);
  }
  let tab = 'title' in savedTab && 'content' in savedTab ? savedTab : defaultTab;
  return tab && 'title' in tab && 'content' in tab ? tab as TabData : null;
}

export function saveLayoutData(
  layout: LayoutData,
  saveTab?: (tab: TabData) => TabBase,
  afterPanelSaved?: (savedPanel: PanelBase, panel: PanelData) => void
): LayoutBase {
  function saveTabData(tabData: TabData): TabBase {
    return saveTab ? saveTab(tabData) : {id: tabData.id};
  }

  function savePanelData(panelData: PanelData): PanelBase {
    let tabs: TabBase[] = [];
    for (let tab of panelData.tabs) {
      let savedTab = saveTabData(tab);
      if (savedTab) {
        tabs.push(savedTab);
      }
    }
    let {id, size, activeId, group, panelLock} = panelData;
    let savedPanel: PanelBase;
    if (panelData.parent.mode === 'float' || panelData.parent.mode === 'window') {
      let {x, y, z, w, h} = panelData;
      savedPanel = {id, size, tabs, group, activeId, panelLock, x, y, z, w, h};
      if (panelData.floatAnchor) {
        savedPanel.floatAnchor = {...panelData.floatAnchor};
      }
    } else {
      savedPanel = {id, size, tabs, group, activeId, panelLock};
    }
    if (afterPanelSaved) {
      afterPanelSaved(savedPanel, panelData);
    }
    return savedPanel;
  }

  function saveBoxData(boxData: BoxData): BoxBase {
    let children: (BoxBase | PanelBase)[] = [];
    for (let child of boxData.children) {
      if ('tabs' in child) {
        children.push(savePanelData(child));
      } else if ('children' in child) {
        children.push(saveBoxData(child));
      }
    }
    let {id, size, mode} = boxData;
    return {id, size, mode, children};
  }

  const columnEntries = layout.columns && Object.entries(layout.columns)
    .filter(([id]) => layout.dockbox.children.some((child) => child.id === id))
    .map(([id, state]) => [id, {...state}]);

  return {
    dockbox: saveBoxData(layout.dockbox),
    floatbox: saveBoxData(layout.floatbox),
    windowbox: saveBoxData(layout.windowbox),
    maxbox: saveBoxData(layout.maxbox),
    ...(columnEntries?.length ? {columns: Object.fromEntries(columnEntries)} : {}),
  };
}

export function loadLayoutData(
  savedLayout: LayoutBase,
  defaultLayout: LayoutBase,
  loadTab?: (savedTab: TabBase) => TabData | null,
  afterPanelLoaded?: (savedPanel: PanelBase, panel: PanelData) => void,
  tabDefinitions?: TabDefinitions
): LayoutData {
  let cache: DefaultLayoutCache;
  function getCache() {
    return cache || (cache = createLayoutCache(defaultLayout));
  }

  function loadPanelData(savedPanel: PanelBase): PanelData {
    let {id, size, activeId, x, y, z, w, h, group, panelLock, floatAnchor} = savedPanel;

    let tabs: TabData[] = [];
    for (let savedTab of savedPanel.tabs) {
      let tabData = loadTabData(savedTab, tabDefinitions, loadTab);
      if (!tabData && !loadTab && defaultLayout && defaultLayout !== savedLayout) {
        tabData = loadTabData(savedTab, undefined, undefined, getCache().tabs.get(savedTab.id));
      }
      if (tabData) {
        tabs.push(tabData);
      }
    }
    let panelData: PanelData;
    if (w || h || x || y || z) {
      panelData = {id, size, activeId, group, x, y, z, w, h, tabs, panelLock};
      panelData.floatAnchor = floatAnchor ? {...floatAnchor} : undefined;
    } else {
      panelData = {id, size, activeId, group, tabs, panelLock};
    }
    if (savedPanel.id === maximePlaceHolderId) {
      panelData.panelLock = {};
    } else if (afterPanelLoaded) {
      afterPanelLoaded(savedPanel, panelData);
    } else if (defaultLayout === savedLayout) {
      panelData = {...savedPanel, ...panelData};
    } else if (defaultLayout && getCache().panels.has(id)) {
      panelData = {...getCache().panels.get(id), ...panelData};
    }
    return panelData;
  }

  function loadBoxData(savedBox: BoxBase): BoxData {
    if (!savedBox) {
      return null;
    }
    let children: (BoxData | PanelData)[] = [];
    for (let child of savedBox.children) {
      if ('tabs' in child) {
        children.push(loadPanelData(child));
      } else if ('children' in child) {
        children.push(loadBoxData(child));
      }
    }
    let {id, size, mode} = savedBox;
    return {id, size, mode, children};
  }

  return {
    dockbox: loadBoxData(savedLayout.dockbox),
    floatbox: loadBoxData(savedLayout.floatbox ?? {mode: 'float', children: [], size: 0}),
    windowbox: loadBoxData(savedLayout.windowbox ?? {mode: 'window', children: [], size: 0}),
    maxbox: loadBoxData(savedLayout.maxbox ?? {mode: 'maximize', children: [], size: 1}),
    ...(savedLayout.columns ? {columns: Object.fromEntries(Object.entries(savedLayout.columns).map(([id, state]) => [id, {...state}]))} : {}),
  };
}
