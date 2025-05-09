import { maximePlaceHolderId, placeHolderStyle } from "./DockData";
let _watchObjectChange = new WeakMap();
export function getUpdatedObject(obj) {
    let result = _watchObjectChange.get(obj);
    if (result) {
        return getUpdatedObject(result);
    }
    return obj;
}
function clearObjectCache() {
    _watchObjectChange = new WeakMap();
}
function clone(value, extra) {
    let newValue = Object.assign(Object.assign({}, value), extra);
    if (Array.isArray(newValue.tabs)) {
        newValue.tabs = newValue.tabs.concat();
    }
    if (Array.isArray(newValue.children)) {
        newValue.children = newValue.children.concat();
    }
    _watchObjectChange.set(value, newValue);
    return newValue;
}
function maxFlex(currentFlex, newFlex) {
    if (currentFlex == null) {
        return newFlex;
    }
    return Math.max(currentFlex, newFlex);
}
function mergeFlex(currentFlex, newFlex) {
    if (currentFlex == null) {
        return newFlex;
    }
    if (currentFlex === newFlex) {
        return newFlex;
    }
    if (currentFlex >= 1) {
        if (newFlex <= 1) {
            return 1;
        }
        return Math.min(currentFlex, newFlex);
    }
    else {
        if (newFlex >= 1) {
            return 1;
        }
        return Math.max(currentFlex, newFlex);
    }
}
let _idCount = 0;
export function nextId() {
    ++_idCount;
    return `+${_idCount}`;
}
let _zCount = 0;
export function nextZIndex(current) {
    if (current === _zCount) {
        // already the top
        return current;
    }
    return ++_zCount;
}
function compareFindId(item, id) {
    return item && (typeof id === 'function' ? id(item) : item.id === id);
}
function findInPanel(panel, id, filter) {
    if (compareFindId(panel, id) && (filter & Filter.Panel)) {
        return panel;
    }
    if (filter & Filter.Tab) {
        for (let tab of panel.tabs) {
            if (compareFindId(tab, id)) {
                return tab;
            }
        }
    }
    return undefined;
}
function findInBox(box, id, filter) {
    let result;
    if ((filter | Filter.Box) && compareFindId(box, id)) {
        return box;
    }
    if (!(box === null || box === void 0 ? void 0 : box.children)) {
        return undefined;
    }
    for (let child of box.children) {
        if ('children' in child) {
            if (result = findInBox(child, id, filter)) {
                break;
            }
        }
        else if ('tabs' in child) {
            if (result = findInPanel(child, id, filter)) {
                break;
            }
        }
    }
    return result;
}
export var Filter;
(function (Filter) {
    Filter[Filter["Tab"] = 1] = "Tab";
    Filter[Filter["Panel"] = 2] = "Panel";
    Filter[Filter["Box"] = 4] = "Box";
    Filter[Filter["Docked"] = 8] = "Docked";
    Filter[Filter["Floated"] = 16] = "Floated";
    Filter[Filter["Windowed"] = 32] = "Windowed";
    Filter[Filter["Max"] = 64] = "Max";
    Filter[Filter["EveryWhere"] = 120] = "EveryWhere";
    Filter[Filter["AnyTab"] = 121] = "AnyTab";
    Filter[Filter["AnyPanel"] = 122] = "AnyPanel";
    Filter[Filter["AnyTabPanel"] = 123] = "AnyTabPanel";
    Filter[Filter["All"] = 127] = "All";
})(Filter || (Filter = {}));
export function find(layout, id, filter = Filter.AnyTabPanel) {
    let result;
    if (filter & Filter.Docked) {
        result = findInBox(layout.dockbox, id, filter);
    }
    if (result)
        return result;
    if (filter & Filter.Floated) {
        result = findInBox(layout.floatbox, id, filter);
    }
    if (result)
        return result;
    if (filter & Filter.Windowed) {
        result = findInBox(layout.windowbox, id, filter);
    }
    if (result)
        return result;
    if (filter & Filter.Max) {
        result = findInBox(layout.maxbox, id, filter);
    }
    return result;
}
export function addNextToTab(layout, source, target, direction) {
    let pos = target.parent.tabs.indexOf(target);
    if (pos >= 0) {
        if (direction === 'after-tab') {
            ++pos;
        }
        return addTabToPanel(layout, source, target.parent, pos);
    }
    return layout;
}
export function addTabToPanel(layout, source, panel, idx = -1) {
    if (idx === -1) {
        idx = panel.tabs.length;
    }
    let tabs;
    let activeId;
    if ('tabs' in source) {
        // source is PanelData
        tabs = source.tabs;
        activeId = source.activeId;
    }
    else {
        // source is TabData
        tabs = [source];
    }
    if (tabs.length) {
        let newPanel = clone(panel);
        newPanel.tabs.splice(idx, 0, ...tabs);
        newPanel.activeId = tabs.at(-1).id;
        for (let tab of tabs) {
            tab.parent = newPanel;
        }
        if (activeId) {
            newPanel.activeId = activeId;
        }
        layout = replacePanel(layout, panel, newPanel);
    }
    return layout;
}
export function converToPanel(source) {
    if ('tabs' in source) {
        // source is already PanelData
        return source;
    }
    else {
        let newPanel = { tabs: [source], group: source.group, activeId: source.id };
        source.parent = newPanel;
        return newPanel;
    }
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
            // HINT: The size remains the same, preventing flex-grow less than 1
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
        return replaceBox(layout, box, newBox);
    }
    return layout;
}
export function dockPanelToBox(layout, newPanel, box, direction) {
    let parentBox = box.parent;
    let dockMode = (direction === 'left' || direction === 'right') ? 'horizontal' : 'vertical';
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
            }
            return replaceBox(layout, parentBox, newParentBox);
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
            return replaceBox(layout, box, newBox);
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
            newBox.size = 280;
            newPanel.size = 120;
            return replaceBox(layout, box, newDockBox);
        }
    }
    else if (box === layout.maxbox) {
        let newBox = clone(box);
        newBox.children.push(newPanel);
        return replaceBox(layout, box, newBox);
    }
    return layout;
}
export function floatPanel(layout, newPanel, rect) {
    let newBox = clone(layout.floatbox);
    if (rect) {
        newPanel.x = rect.left;
        newPanel.y = rect.top;
        newPanel.w = rect.width;
        newPanel.h = rect.height;
    }
    newBox.children.push(newPanel);
    return replaceBox(layout, layout.floatbox, newBox);
}
export function panelToWindow(layout, newPanel) {
    let newBox = clone(layout.windowbox);
    newBox.children.push(newPanel);
    return replaceBox(layout, layout.windowbox, newBox);
}
export function removeFromLayout(layout, source) {
    if (source) {
        let panelData;
        if ('tabs' in source) {
            panelData = source;
            layout = removePanel(layout, panelData);
        }
        else {
            panelData = source.parent;
            layout = removeTab(layout, source);
        }
        if (panelData && panelData.parent && panelData.parent.mode === 'maximize') {
            let newPanel = layout.maxbox.children[0];
            if (!newPanel || (newPanel.tabs.length === 0 && !newPanel.panelLock)) {
                // max panel is gone, remove the place holder
                let placeHolder = find(layout, maximePlaceHolderId);
                if (placeHolder) {
                    return removePanel(layout, placeHolder);
                }
            }
        }
    }
    return layout;
}
function removePanel(layout, panel) {
    let box = panel.parent;
    if (box) {
        let pos = box.children.indexOf(panel);
        if (pos >= 0) {
            let newBox = clone(box);
            newBox.children.splice(pos, 1);
            return replaceBox(layout, box, newBox);
        }
    }
    return layout;
}
function removeTab(layout, tab) {
    let panel = tab.parent;
    if (panel) {
        let pos = panel.tabs.indexOf(tab);
        if (pos >= 0) {
            let newPanel = clone(panel);
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
            return replacePanel(layout, panel, newPanel);
        }
    }
    return layout;
}
export function moveToFront(layout, source) {
    if (source) {
        let panelData;
        let needUpdate = false;
        let changes = {};
        if ('tabs' in source) {
            panelData = source;
        }
        else {
            panelData = source.parent;
            if (panelData.activeId !== source.id) {
                // move tab to front
                changes.activeId = source.id;
                needUpdate = true;
            }
        }
        if (panelData && panelData.parent && panelData.parent.mode === 'float') {
            // move float panel to front
            let newZ = nextZIndex(panelData.z);
            if (newZ !== panelData.z) {
                changes.z = newZ;
                needUpdate = true;
            }
        }
        if (needUpdate) {
            layout = replacePanel(layout, panelData, clone(panelData, changes));
        }
    }
    return layout;
}
// maximize or restore the panel
export function maximize(layout, source) {
    if (source) {
        if ('tabs' in source) {
            if (source.parent.mode === 'maximize') {
                return restorePanel(layout, source);
            }
            else {
                return maximizePanel(layout, source);
            }
        }
        else {
            return maximizeTab(layout, source);
        }
    }
    return layout;
}
function maximizePanel(layout, panel) {
    let maxbox = layout.maxbox;
    if (maxbox.children.length) {
        // invalid maximize
        return layout;
    }
    let placeHodlerPanel = Object.assign(Object.assign({}, panel), { id: maximePlaceHolderId, tabs: [], panelLock: {} });
    layout = replacePanel(layout, panel, placeHodlerPanel);
    layout = dockPanelToBox(layout, panel, layout.maxbox, 'middle');
    return layout;
}
function restorePanel(layout, panel) {
    layout = removePanel(layout, panel);
    let placeHolder = find(layout, maximePlaceHolderId);
    if (placeHolder) {
        let { x, y, z, w, h } = placeHolder;
        panel = Object.assign(Object.assign({}, panel), { x, y, z, w, h });
        return replacePanel(layout, placeHolder, panel);
    }
    else {
        return dockPanelToBox(layout, panel, layout.dockbox, 'right');
    }
}
function maximizeTab(layout, tab) {
    // TODO to be implemented
    return layout;
}
// move float panel into the screen
export function fixFloatPanelPos(layout, layoutWidth, layoutHeight) {
    let layoutChanged = false;
    if (layout && layout.floatbox && layoutWidth > 200 && layoutHeight > 200) {
        let newFloatChildren = layout.floatbox.children.concat();
        for (let i = 0; i < newFloatChildren.length; ++i) {
            let panel = newFloatChildren[i];
            let panelChange = {};
            if (!(panel.w > 0)) {
                panelChange.w = Math.round(layoutWidth / 3);
            }
            else if (panel.w > layoutWidth) {
                panelChange.w = layoutWidth;
            }
            if (!(panel.h > 0)) {
                panelChange.h = Math.round(layoutHeight / 3);
            }
            else if (panel.h > layoutHeight) {
                panelChange.h = layoutHeight;
            }
            if (typeof panel.y !== 'number') {
                panelChange.y = (layoutHeight - (panelChange.h || panel.h)) >> 1;
            }
            else if (panel.y > layoutHeight - 16) {
                panelChange.y = Math.max(layoutHeight - 16 - (panel.h >> 1), 0);
            }
            else if (!(panel.y >= 0)) {
                panelChange.y = 0;
            }
            if (typeof panel.x !== 'number') {
                panelChange.x = (layoutWidth - (panelChange.w || panel.w)) >> 1;
            }
            else if (panel.x + panel.w < 16) {
                panelChange.x = 16 - (panel.w >> 1);
            }
            else if (panel.x > layoutWidth - 16) {
                panelChange.x = layoutWidth - 16 - (panel.w >> 1);
            }
            if (Object.keys(panelChange).length) {
                newFloatChildren[i] = clone(panel, panelChange);
                layoutChanged = true;
            }
        }
        if (layoutChanged) {
            let newBox = clone(layout.floatbox);
            newBox.children = newFloatChildren;
            return replaceBox(layout, layout.floatbox, newBox);
        }
    }
    return layout;
}
export function fixLayoutData(layout, groups, loadTab) {
    function fixPanelOrBox(d) {
        if (d.id == null) {
            d.id = nextId();
        }
        else if (d.id.startsWith('+')) {
            let idnum = Number(d.id);
            if (idnum > _idCount) {
                // make sure generated id is unique
                _idCount = idnum;
            }
        }
        if (!(d.size >= 0)) {
            d.size = 200;
        }
        d.minWidth = 0;
        d.minHeight = 0;
        d.widthFlex = null;
        d.heightFlex = null;
    }
    function fixPanelData(panel) {
        fixPanelOrBox(panel);
        let findActiveId = false;
        if (loadTab) {
            for (let i = 0; i < panel.tabs.length; ++i) {
                panel.tabs[i] = loadTab(panel.tabs[i]);
            }
        }
        if (panel.group == null && panel.tabs.length) {
            panel.group = panel.tabs[0].group;
        }
        let tabGroup = groups === null || groups === void 0 ? void 0 : groups[panel.group];
        if (tabGroup) {
            if (tabGroup.widthFlex != null) {
                panel.widthFlex = tabGroup.widthFlex;
            }
            if (tabGroup.heightFlex != null) {
                panel.heightFlex = tabGroup.heightFlex;
            }
        }
        for (let child of panel.tabs) {
            child.parent = panel;
            if (child.id === panel.activeId) {
                findActiveId = true;
            }
            if (child.minWidth > panel.minWidth)
                panel.minWidth = child.minWidth;
            if (child.minHeight > panel.minHeight)
                panel.minHeight = child.minHeight;
        }
        if (!findActiveId && panel.tabs.length) {
            panel.activeId = panel.tabs[0].id;
        }
        if (panel.minWidth <= 0) {
            panel.minWidth = 1;
        }
        if (panel.minHeight <= 0) {
            panel.minHeight = 1;
        }
        let { panelLock } = panel;
        if (panelLock) {
            if (panel.minWidth < panelLock.minWidth) {
                panel.minWidth = panelLock.minWidth;
            }
            if (panel.minHeight < panelLock.minHeight) {
                panel.minHeight = panelLock.minHeight;
            }
            if (panel.panelLock.widthFlex != null) {
                panel.widthFlex = panelLock.widthFlex;
            }
            if (panel.panelLock.heightFlex != null) {
                panel.heightFlex = panelLock.heightFlex;
            }
        }
        if (panel.z > _zCount) {
            // make sure next zIndex is on top
            _zCount = panel.z;
        }
        return panel;
    }
    function fixBoxData(box) {
        fixPanelOrBox(box);
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
                    if (!child.panelLock) {
                        box.children.splice(i, 1);
                        --i;
                    }
                    else if (child.group === placeHolderStyle && (box.children.length > 1 || box.parent)) {
                        // remove placeHolder Group
                        box.children.splice(i, 1);
                        --i;
                    }
                }
            }
            // merge min size
            switch (box.mode) {
                case 'horizontal':
                    if (child.minWidth > 0)
                        box.minWidth += child.minWidth;
                    if (child.minHeight > box.minHeight)
                        box.minHeight = child.minHeight;
                    if (child.widthFlex != null) {
                        box.widthFlex = maxFlex(box.widthFlex, child.widthFlex);
                    }
                    if (child.heightFlex != null) {
                        box.heightFlex = mergeFlex(box.heightFlex, child.heightFlex);
                    }
                    break;
                case 'vertical':
                    if (child.minWidth > box.minWidth)
                        box.minWidth = child.minWidth;
                    if (child.minHeight > 0)
                        box.minHeight += child.minHeight;
                    if (child.heightFlex != null) {
                        box.heightFlex = maxFlex(box.heightFlex, child.heightFlex);
                    }
                    if (child.widthFlex != null) {
                        box.widthFlex = mergeFlex(box.widthFlex, child.widthFlex);
                    }
                    break;
            }
        }
        // add divider size
        if (box.children.length > 1) {
            switch (box.mode) {
                case 'horizontal':
                    box.minWidth += (box.children.length - 1) * 4;
                    break;
                case 'vertical':
                    box.minHeight += (box.children.length - 1) * 4;
                    break;
            }
        }
        return box;
    }
    if (layout.floatbox) {
        layout.floatbox.mode = 'float';
    }
    else {
        layout.floatbox = { mode: 'float', children: [], size: 1 };
    }
    if (layout.windowbox) {
        layout.windowbox.mode = 'window';
    }
    else {
        layout.windowbox = { mode: 'window', children: [], size: 1 };
    }
    if (layout.maxbox) {
        layout.maxbox.mode = 'maximize';
    }
    else {
        layout.maxbox = { mode: 'maximize', children: [], size: 1 };
    }
    fixBoxData(layout.dockbox);
    fixBoxData(layout.floatbox);
    fixBoxData(layout.windowbox);
    fixBoxData(layout.maxbox);
    if (layout.dockbox.children.length === 0) {
        // add place holder panel when root box is empty
        let newPanel = { id: '+0', group: placeHolderStyle, panelLock: {}, size: 200, tabs: [] };
        newPanel.parent = layout.dockbox;
        layout.dockbox.children.push(newPanel);
    }
    else {
        // merge and replace root box when box has only one child
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
    layout.windowbox.parent = null;
    layout.maxbox.parent = null;
    clearObjectCache();
    return layout;
}
export function replacePanel(layout, panel, newPanel) {
    for (let tab of newPanel.tabs) {
        tab.parent = newPanel;
    }
    let box = panel.parent;
    if (box) {
        let pos = box.children.indexOf(panel);
        if (pos >= 0) {
            let newBox = clone(box);
            newBox.children[pos] = newPanel;
            return replaceBox(layout, box, newBox);
        }
    }
    return layout;
}
function replaceBox(layout, box, newBox) {
    for (let child of newBox.children) {
        child.parent = newBox;
    }
    let parentBox = box.parent;
    if (parentBox) {
        let pos = parentBox.children.indexOf(box);
        if (pos >= 0) {
            let newParentBox = clone(parentBox);
            newParentBox.children[pos] = newBox;
            return replaceBox(layout, parentBox, newParentBox);
        }
    }
    else {
        if (box.id === layout.dockbox.id || box === layout.dockbox) {
            return Object.assign(Object.assign({}, layout), { dockbox: newBox });
        }
        else if (box.id === layout.floatbox.id || box === layout.floatbox) {
            return Object.assign(Object.assign({}, layout), { floatbox: newBox });
        }
        else if (box.id === layout.windowbox.id || box === layout.windowbox) {
            return Object.assign(Object.assign({}, layout), { windowbox: newBox });
        }
        else if (box.id === layout.maxbox.id || box === layout.maxbox) {
            return Object.assign(Object.assign({}, layout), { maxbox: newBox });
        }
    }
    return layout;
}
export function getFloatPanelSize(panel, tabGroup) {
    if (!panel) {
        return [300, 300];
    }
    let panelWidth = panel.offsetWidth;
    let panelHeight = panel.offsetHeight;
    let [minWidth, maxWidth] = tabGroup.preferredFloatWidth || [100, 600];
    let [minHeight, maxHeight] = tabGroup.preferredFloatHeight || [50, 500];
    if (!(panelWidth >= minWidth)) {
        panelWidth = minWidth;
    }
    else if (!(panelWidth <= maxWidth)) {
        panelWidth = maxWidth;
    }
    if (!(panelHeight >= minHeight)) {
        panelHeight = minHeight;
    }
    else if (!(panelHeight <= maxHeight)) {
        panelHeight = maxHeight;
    }
    return [panelWidth, panelHeight];
}
export function findNearestPanel(rectFrom, rectTo, direction) {
    let distance = -1;
    let overlap = -1;
    let alignment = 0;
    switch (direction) {
        case 'ArrowUp': {
            distance = rectFrom.top - rectTo.bottom + rectFrom.height;
            overlap = Math.min(rectFrom.right, rectTo.right) - Math.max(rectFrom.left, rectTo.left);
            break;
        }
        case 'ArrowDown': {
            distance = rectTo.top - rectFrom.bottom + rectFrom.height;
            overlap = Math.min(rectFrom.right, rectTo.right) - Math.max(rectFrom.left, rectTo.left);
            break;
        }
        case 'ArrowLeft': {
            distance = rectFrom.left - rectTo.right + rectFrom.width;
            overlap = Math.min(rectFrom.bottom, rectTo.bottom) - Math.max(rectFrom.top, rectTo.top);
            alignment = Math.abs(rectFrom.top - rectTo.top);
            break;
        }
        case 'ArrowRight': {
            distance = rectTo.left - rectFrom.right + rectFrom.width;
            overlap = Math.min(rectFrom.bottom, rectTo.bottom) - Math.max(rectFrom.top, rectTo.top);
            alignment = Math.abs(rectFrom.top - rectTo.top);
            break;
        }
    }
    if (distance < 0 || overlap <= 0) {
        return -1;
    }
    return distance * (alignment + 1) - overlap * 0.001;
}
