"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const DockData_1 = require("./DockData");
const Compare_1 = require("./util/Compare");
const rc_tabs_1 = __importDefault(require("rc-tabs"));
const TabContent_1 = __importDefault(require("rc-tabs/lib/TabContent"));
const DragManager_1 = require("./dragdrop/DragManager");
const DragDropDiv_1 = require("./dragdrop/DragDropDiv");
const DockTabBar_1 = require("./DockTabBar");
const DockTabPane_1 = __importStar(require("./DockTabPane"));
class TabCache {
    constructor(context) {
        this.getRef = (r) => {
            this._ref = r;
        };
        this.getHitAreaRef = (r) => {
            this._hitAreaRef = r;
        };
        this.onCloseClick = (e) => {
            this.context.dockMove(this.data, null, 'remove');
            e.stopPropagation();
        };
        this.onDragStart = (e) => {
            e.startDrag(this._ref.parentElement, this._ref.parentElement);
            e.setData({ tab: this.data }, DockData_1.DockContextType);
        };
        this.onDragOver = (e) => {
            let tab = DragManager_1.DragState.getData('tab', DockData_1.DockContextType);
            if (tab.group !== this.data.group) {
                e.reject();
            }
            else if (tab && tab !== this.data) {
                let direction = this.getDropDirection(e);
                this.context.setDropRect(this._hitAreaRef, direction, this);
                e.accept('');
            }
        };
        this.onDragLeave = (e) => {
            this.context.setDropRect(null, 'remove', this);
        };
        this.onDrop = (e) => {
            let tab = DragManager_1.DragState.getData('tab', DockData_1.DockContextType);
            if (tab && tab !== this.data && tab.group === this.data.group) {
                let direction = this.getDropDirection(e);
                this.context.dockMove(tab, this.data, direction);
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
        let { id, title, group, content, closable, cached, cacheContext } = this.data;
        let tabGroup = this.context.getGroup(group);
        let { tabLocked } = tabGroup;
        if (typeof content === 'function') {
            content = content(this.data);
        }
        let onDragStart = tabLocked ? null : this.onDragStart;
        let tab = (react_1.default.createElement("div", { ref: this.getRef },
            title,
            react_1.default.createElement(DragDropDiv_1.DragDropDiv, { className: 'dock-tab-hit-area', getRef: this.getHitAreaRef, onDragStartT: onDragStart, onDragOverT: this.onDragOver, onDropT: this.onDrop, onDragLeaveT: this.onDragLeave }, closable ?
                react_1.default.createElement("a", { className: 'dock-tab-close-btn', onClick: this.onCloseClick }, "x")
                : null)));
        if (cacheContext) {
            // allow DockTabPane to receive context
            let DockTabPaneClass = DockTabPane_1.getContextPaneClass(cacheContext);
            return (react_1.default.createElement(DockTabPaneClass, { key: id, id: id, cached: cached, tab: tab }, content));
        }
        else {
            return (react_1.default.createElement(DockTabPane_1.default, { key: id, id: id, cached: cached, tab: tab }, content));
        }
    }
    destroy() {
        // place holder
    }
}
exports.TabCache = TabCache;
class DockTabs extends react_1.default.Component {
    constructor(props, context) {
        super(props, context);
        this._cache = new Map();
        this.renderTabBar = () => {
            let { panelData, onPanelDragStart, onPanelDragMove, onPanelDragEnd } = this.props;
            let { group: groupName, panelLock } = panelData;
            let group = this.context.getGroup(groupName);
            let { panelExtra } = group;
            if (panelLock) {
                if (panelLock.panelExtra) {
                    panelExtra = panelLock.panelExtra;
                }
            }
            let panelExtraContent;
            if (panelExtra) {
                panelExtraContent = panelExtra(panelData, this.context);
            }
            return (react_1.default.createElement(DockTabBar_1.DockTabBar, { extraContent: panelExtraContent, onDragStart: onPanelDragStart, onDragMove: onPanelDragMove, onDragEnd: onPanelDragEnd }));
        };
        this.renderTabContent = () => {
            let { group } = this.props.panelData;
            let tabGroup = this.context.getGroup(group);
            let { animated } = tabGroup;
            return react_1.default.createElement(TabContent_1.default, { animated: animated });
        };
        this.onTabChange = (activeId) => {
            this.props.panelData.activeId = activeId;
            this.forceUpdate();
        };
        this.updateTabs(props.panelData.tabs);
    }
    updateTabs(tabs) {
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
    shouldComponentUpdate(nextProps, nextState, nextContext) {
        let { tabs } = nextProps.panelData;
        // update tab cache
        if (!Compare_1.compareArray(tabs, this.props.panelData.tabs)) {
            this.updateTabs(tabs);
            return true;
        }
        return !Compare_1.compareKeys(this.props, nextProps, DockTabs.propKeys);
    }
    render() {
        let { group, activeId } = this.props.panelData;
        let children = [];
        for (let [id, tab] of this._cache) {
            children.push(tab.content);
        }
        return (react_1.default.createElement(rc_tabs_1.default, { prefixCls: 'dock', renderTabBar: this.renderTabBar, renderTabContent: this.renderTabContent, activeKey: activeId, onChange: this.onTabChange }, children));
    }
}
DockTabs.contextType = DockData_1.DockContextType;
DockTabs.propKeys = ['group', 'tabs', 'activeId', 'onTabChange'];
exports.DockTabs = DockTabs;
//# sourceMappingURL=DockTabs.js.map