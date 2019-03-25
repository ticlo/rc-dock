"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const DockData_1 = require("./DockData");
const Compare_1 = require("./util/Compare");
const rc_tabs_1 = __importDefault(require("rc-tabs"));
const TabContent_1 = __importDefault(require("rc-tabs/lib/TabContent"));
const DragStore_1 = require("./DragStore");
const DockTabBar_1 = require("./DockTabBar");
const DockTabPane_1 = __importDefault(require("./DockTabPane"));
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
            DragStore_1.DragStore.dragStart(DockData_1.DockContextType, { tab: this.data }, this._hitAreaRef);
            e.stopPropagation();
        };
        this.onDragOver = (e) => {
            let tab = DragStore_1.DragStore.getData(DockData_1.DockContextType, 'tab');
            if (tab && tab !== this.data && tab.group === this.data.group) {
                let direction = this.getDropDirection(e);
                this.context.setDropRect(this._hitAreaRef, direction, this);
                e.dataTransfer.dropEffect = 'move';
                e.preventDefault();
                e.stopPropagation();
            }
        };
        this.onDragLeave = (e) => {
            this.context.setDropRect(null, 'remove', this);
        };
        this.onDrop = (e) => {
            let tab = DragStore_1.DragStore.getData(DockData_1.DockContextType, 'tab');
            if (tab && tab !== this.data && tab.group === this.data.group) {
                let direction = this.getDropDirection(e);
                this.context.dockMove(tab, this.data, direction);
            }
        };
        this.context = context;
    }
    setData(data) {
        if (!Compare_1.compareKeys(data, this.data, TabCache.usedDataKeys)) {
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
        let { id, title, group, content, closable, cached } = this.data;
        let { tabLocked } = group;
        if (typeof content === 'function') {
            content = content();
        }
        return (react_1.default.createElement(DockTabPane_1.default, { key: id, id: id, cached: cached, tab: react_1.default.createElement("div", { ref: this.getRef },
                title,
                react_1.default.createElement("div", { className: 'dock-tab-hit-area', ref: this.getHitAreaRef, draggable: !tabLocked, onDrag: this.onDragStart, onDragOver: this.onDragOver, onDrop: this.onDrop, onDragLeave: this.onDragLeave }, closable ?
                    react_1.default.createElement("a", { className: 'dock-tab-close-btn', onClick: this.onCloseClick }, "x")
                    : null)) }, content));
    }
    destroy() {
    }
}
TabCache.usedDataKeys = ['id', 'title', 'group', 'content'];
exports.TabCache = TabCache;
class DockTabs extends react_1.default.Component {
    constructor(props, context) {
        super(props, context);
        this._cache = new Map();
        this.renderTabBar = () => (react_1.default.createElement(DockTabBar_1.DockTabBar, { onDragMoveInit: this.props.onPanelHeaderDragInit, onHtmlDrag: this.props.onPanelHeaderHtmlDrag }));
        this.renderTabContent = () => {
            let { group } = this.props.panelData;
            let { animated } = group;
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
        if (!Compare_1.compareChildKeys(tabs, this.props.panelData.tabs, TabCache.usedDataKeys)) {
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