"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DockTabs = exports.TabCache = void 0;
const react_1 = __importDefault(require("react"));
const DockData_1 = require("./DockData");
const rc_tabs_1 = __importDefault(require("rc-tabs"));
const rc_menu_1 = __importStar(require("rc-menu"));
const rc_dropdown_1 = __importDefault(require("rc-dropdown"));
const DragManager = __importStar(require("./dragdrop/DragManager"));
const DragDropDiv_1 = require("./dragdrop/DragDropDiv");
const DockTabBar_1 = require("./DockTabBar");
const DockTabPane_1 = __importDefault(require("./DockTabPane"));
const Algorithm_1 = require("./Algorithm");
const WindowBox_1 = require("./WindowBox");
function findParentPanel(element) {
    for (let i = 0; i < 10; ++i) {
        if (!element) {
            return null;
        }
        if (element.classList.contains('dock-panel')) {
            return element;
        }
        element = element.parentElement;
    }
    return null;
}
function isPopupDiv(r) {
    var _a, _b;
    return (r == null || ((_a = r.parentElement) === null || _a === void 0 ? void 0 : _a.tagName) === 'LI' || ((_b = r.parentElement) === null || _b === void 0 ? void 0 : _b.parentElement.tagName) === 'LI');
}
class TabCache {
    constructor(context) {
        this.getRef = (r) => {
            if (isPopupDiv(r)) {
                return;
            }
            this._ref = r;
        };
        this.getHitAreaRef = (r) => {
            if (isPopupDiv(r)) {
                return;
            }
            this._hitAreaRef = r;
        };
        this.onCloseClick = (e) => {
            this.context.dockMove(this.data, null, 'remove');
            e.stopPropagation();
        };
        this.onDragStart = (e) => {
            let panel = findParentPanel(this._ref);
            let tabGroup = this.context.getGroup(this.data.group);
            let [panelWidth, panelHeight] = Algorithm_1.getFloatPanelSize(panel, tabGroup);
            e.setData({ tab: this.data, panelSize: [panelWidth, panelHeight] }, this.context.getDockId());
            e.startDrag(this._ref.parentElement, this._ref.parentElement);
        };
        this.onDragOver = (e) => {
            let dockId = this.context.getDockId();
            let tab = DragManager.DragState.getData('tab', dockId);
            let panel = DragManager.DragState.getData('panel', dockId);
            if (tab) {
                panel = tab.parent;
            }
            else if (!panel) {
                return;
            }
            if (panel.group !== this.data.group) {
                e.reject();
            }
            else if (tab && tab !== this.data) {
                let direction = this.getDropDirection(e);
                this.context.setDropRect(this._hitAreaRef, direction, this);
                e.accept('');
            }
            else if (panel && panel !== this.data.parent) {
                let direction = this.getDropDirection(e);
                this.context.setDropRect(this._hitAreaRef, direction, this);
                e.accept('');
            }
        };
        this.onDragLeave = (e) => {
            this.context.setDropRect(null, 'remove', this);
        };
        this.onDrop = (e) => {
            let dockId = this.context.getDockId();
            let panel;
            let tab = DragManager.DragState.getData('tab', dockId);
            if (tab) {
                panel = tab.parent;
            }
            else {
                panel = DragManager.DragState.getData('panel', dockId);
            }
            if (tab && tab !== this.data) {
                let direction = this.getDropDirection(e);
                this.context.dockMove(tab, this.data, direction);
            }
            else if (panel && panel !== this.data.parent) {
                let direction = this.getDropDirection(e);
                this.context.dockMove(panel, this.data, direction);
            }
        };
        this.context = context;
    }
    setData(data) {
        if (data !== this.data) {
            this.data = data;
            this.content = this.render();
            return true;
        }
        return false;
    }
    getDropDirection(e) {
        let rect = this._hitAreaRef.getBoundingClientRect();
        let midx = rect.left + rect.width * 0.5;
        return e.clientX > midx ? 'after-tab' : 'before-tab';
    }
    render() {
        let { id, title, group, content, closable, cached, parent } = this.data;
        let { onDragStart, onDragOver, onDrop, onDragLeave } = this;
        if (parent.parent.mode === 'window') {
            onDragStart = null;
            onDragOver = null;
            onDrop = null;
            onDragLeave = null;
        }
        let tabGroup = this.context.getGroup(group);
        if (typeof content === 'function') {
            content = content(this.data);
        }
        let tab = (react_1.default.createElement(DragDropDiv_1.DragDropDiv, { getRef: this.getRef, onDragStartT: onDragStart, onDragOverT: onDragOver, onDropT: onDrop, onDragLeaveT: onDragLeave },
            react_1.default.createElement("div", { className: "dock-tab-hit-area", ref: this.getHitAreaRef }),
            title,
            closable ?
                react_1.default.createElement("div", { className: "dock-tab-close-btn", onClick: this.onCloseClick })
                : null));
        return (react_1.default.createElement(DockTabPane_1.default, { key: id, cacheId: id, cached: cached, tab: tab }, content));
    }
    destroy() {
        // place holder
    }
}
exports.TabCache = TabCache;
class DockTabs extends react_1.default.PureComponent {
    constructor() {
        super(...arguments);
        this._cache = new Map();
        this.onMaximizeClick = (e) => {
            let { panelData } = this.props;
            this.context.dockMove(panelData, null, 'maximize');
            // prevent the focus change logic
            e.stopPropagation();
        };
        this.onNewWindowClick = () => {
            let { panelData } = this.props;
            this.context.dockMove(panelData, null, 'new-window');
        };
        this.renderTabBar = (props, TabNavList) => {
            let { panelData, onPanelDragStart, onPanelDragMove, onPanelDragEnd } = this.props;
            let { group: groupName, panelLock } = panelData;
            let group = this.context.getGroup(groupName);
            let { panelExtra } = group;
            let maximizable = group.maximizable;
            if (panelData.parent.mode === 'window') {
                onPanelDragStart = null;
                maximizable = false;
            }
            if (panelLock) {
                if (panelLock.panelExtra) {
                    panelExtra = panelLock.panelExtra;
                }
            }
            let showNewWindowButton = group.newWindow && WindowBox_1.WindowBox.enabled && panelData.parent.mode === 'float';
            let panelExtraContent;
            if (panelExtra) {
                panelExtraContent = panelExtra(panelData, this.context);
            }
            else if (maximizable || showNewWindowButton) {
                panelExtraContent = react_1.default.createElement("div", { className: "dock-panel-max-btn", onClick: maximizable ? this.onMaximizeClick : null });
                if (showNewWindowButton) {
                    panelExtraContent = this.addNewWindowMenu(panelExtraContent, !maximizable);
                }
            }
            return (react_1.default.createElement(DockTabBar_1.DockTabBar, Object.assign({ onDragStart: onPanelDragStart, onDragMove: onPanelDragMove, onDragEnd: onPanelDragEnd, TabNavList: TabNavList, isMaximized: panelData.parent.mode === 'maximize' }, props, { extra: panelExtraContent })));
        };
        this.onTabChange = (activeId) => {
            this.props.panelData.activeId = activeId;
            this.context.onSilentChange(activeId, 'active');
            this.forceUpdate();
        };
    }
    updateTabs(tabs) {
        if (tabs === this.cachedTabs) {
            return;
        }
        this.cachedTabs = tabs;
        let newCache = new Map();
        let reused = 0;
        for (let tabData of tabs) {
            let { id } = tabData;
            if (this._cache.has(id)) {
                let tab = this._cache.get(id);
                newCache.set(id, tab);
                tab.setData(tabData);
                ++reused;
            }
            else {
                let tab = new TabCache(this.context);
                newCache.set(id, tab);
                tab.setData(tabData);
            }
        }
        if (reused !== this._cache.size) {
            for (let [id, tab] of this._cache) {
                if (!newCache.has(id)) {
                    tab.destroy();
                }
            }
        }
        this._cache = newCache;
    }
    addNewWindowMenu(element, showWithLeftClick) {
        const nativeMenu = (react_1.default.createElement(rc_menu_1.default, { onClick: this.onNewWindowClick },
            react_1.default.createElement(rc_menu_1.MenuItem, null, "New Window")));
        let trigger = showWithLeftClick ? ['contextMenu', 'click'] : ['contextMenu'];
        return (react_1.default.createElement(rc_dropdown_1.default, { prefixCls: "dock-dropdown", overlay: nativeMenu, trigger: trigger, mouseEnterDelay: 0.1, mouseLeaveDelay: 0.1 }, element));
    }
    render() {
        let { group, tabs, activeId } = this.props.panelData;
        let tabGroup = this.context.getGroup(group);
        let { animated } = tabGroup;
        if (animated == null) {
            animated = true;
        }
        this.updateTabs(tabs);
        let children = [];
        for (let [id, tab] of this._cache) {
            children.push(tab.content);
        }
        return (react_1.default.createElement(rc_tabs_1.default, { prefixCls: "dock", moreIcon: "...", animated: animated, renderTabBar: this.renderTabBar, activeKey: activeId, onChange: this.onTabChange }, children));
    }
}
exports.DockTabs = DockTabs;
DockTabs.contextType = DockData_1.DockContextType;
DockTabs.propKeys = ['group', 'tabs', 'activeId', 'onTabChange'];
