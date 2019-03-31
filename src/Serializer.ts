import {BoxData, DockMode, DropDirection, LayoutData, nextId, PanelData, TabData, TabGroup} from "./DockData";

interface DefaultLayoutCache {
  panels: Map<string | number, PanelData>;
  tabs: Map<string, TabData>;
}

interface SavedTab {
  id: string;
  group: string;
}

interface SavedPanel {
  id: string | number;
  group: string;
  size: number;
  tabs: SavedTab[];
  activeId: string;

  // for float panel
  x?: number;
  y?: number;
  z?: number;
  w?: number;
  h?: number;
}

interface SavedBox {
  id: string | number;
  mode: DockMode;
  size: number;
  children: (SavedBox | SavedPanel)[];
}

export interface SavedLayout {
  dockbox: SavedBox;
  floatbox: SavedBox;
}

function addPanelToCache(panelData: PanelData, cache: DefaultLayoutCache) {
  cache.panels.set(panelData.id, panelData);
  for (let tab of panelData.tabs) {
    cache.tabs.set(tab.id, tab);
  }
}

function addBoxToCache(boxData: BoxData, cache: DefaultLayoutCache) {
  for (let child of boxData.children) {
    if ('tabs' in child) {
      addPanelToCache(child, cache);
    } else if ('children' in child) {
      addBoxToCache(child, cache);
    }
  }
}

export function createLayoutCache(defaultLayout: LayoutData | BoxData): DefaultLayoutCache {
  let cache: DefaultLayoutCache = {
    panels: new Map(),
    tabs: new Map(),
  };
  if ('children' in defaultLayout) {
    // BoxData
    addBoxToCache(defaultLayout, cache);
  } else {
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

export interface SaveModifier {
  modifySavedPanel?(savedPanel: SavedPanel, panelData: PanelData): void;

  modifySavedTab?(savedTab: SavedTab, tabData: TabData): void;
}

export interface LoadModifier {
  // should return a empty panel and ignore tabs
  modifyLoadedPanel?(savedPanel: SavedPanel, panelData: PanelData): void;

  loadTab?(savedTab: SavedTab): TabData;
}


export function saveLayoutData(layout: LayoutData, modifier: SaveModifier = {}): SavedLayout {
  const {modifySavedTab, modifySavedPanel} = modifier;

  function saveTab(tabData: TabData): SavedTab {
    let savedTab: SavedTab = {id: tabData.id, group: tabData.group};
    if (modifySavedTab) {
      modifySavedTab(savedTab, tabData);
    }
    return savedTab;
  }

  function savePanel(panelData: PanelData): SavedPanel {
    let tabs: SavedTab[] = [];
    for (let tab of panelData.tabs) {
      tabs.push(saveTab(tab));
    }
    let {id, size, activeId, group} = panelData;
    let savedPanel: SavedPanel;
    if (panelData.parent.mode === 'float') {
      let {x, y, z, w, h} = panelData;
      savedPanel = {id, size, tabs, activeId, group, x, y, z, w, h};
    } else {
      savedPanel = {id, size, tabs, activeId, group};
    }
    if (modifySavedPanel) {
      modifySavedPanel(savedPanel, panelData);
    }
    return savedPanel;
  }

  function saveBox(boxData: BoxData): SavedBox {
    let children: (SavedBox | SavedPanel)[] = [];
    for (let child of boxData.children) {
      if ('tabs' in child) {
        children.push(savePanel(child));
      } else if ('children' in child) {
        children.push(saveBox(child));
      }
    }
    let {id, size, mode} = boxData;
    return {id, size, mode, children};
  }

  return {
    dockbox: saveBox(layout.dockbox),
    floatbox: saveBox(layout.floatbox)
  };
}

export function loadLayoutData(savedLayout: SavedLayout, defaultLayout: LayoutData | BoxData, modifier: LoadModifier = {}): LayoutData {
  const {loadTab, modifyLoadedPanel} = modifier;

  if (!savedLayout.floatbox) {
    savedLayout.floatbox = {mode: 'float', children: [], size: 0} as SavedBox;
  }

  let cache = createLayoutCache(defaultLayout);

  function loadTabData(savedTab: SavedTab): TabData {
    if (loadTab) {
      return loadTab(savedTab);
    }
    let {id} = savedTab;
    if (cache.tabs.has(id)) {
      return cache.tabs.get(id);
    }
    return null;
  }

  function loadPanelData(savedPanel: SavedPanel): PanelData {
    let {id, group, size, activeId, x, y, z, w, h} = savedPanel;

    let tabs: TabData[] = [];
    for (let savedTab of savedPanel.tabs) {
      let tabData = loadTabData(savedTab);
      if (tabData) {
        tabs.push(tabData);
      }
    }
    let panelData: PanelData;
    if (w || h || x || y || z) {
      panelData = {id, size, activeId, x, y, z, w, h, tabs, group};
    } else {
      panelData = {id, size, activeId, tabs, group};
    }
    if (modifyLoadedPanel) {
      modifyLoadedPanel(savedPanel, panelData);
    } else if (cache.panels.has(id)) {
      panelData = {...cache.panels.get(id), ...panelData};
    }
    return panelData;
  }

  function loadBoxData(savedBox: SavedBox): BoxData {
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
    floatbox: loadBoxData(savedLayout.floatbox)
  };
}
