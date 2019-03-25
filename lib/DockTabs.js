import React from "react";
import { DockContextType } from "./DockData";
import { compareChildKeys, compareKeys } from "./util/Compare";
import Tabs from 'rc-tabs';
import TabContent from 'rc-tabs/lib/TabContent';
import { DragStore } from "./DragStore";
import { DockTabBar } from "./DockTabBar";
import DockTabPane from "./DockTabPane";
export class TabCache {
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
            DragStore.dragStart(DockContextType, { tab: this.data }, this._hitAreaRef);
            e.stopPropagation();
        };
        this.onDragOver = (e) => {
            let tab = DragStore.getData(DockContextType, 'tab');
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
            let tab = DragStore.getData(DockContextType, 'tab');
            if (tab && tab !== this.data && tab.group === this.data.group) {
                let direction = this.getDropDirection(e);
                this.context.dockMove(tab, this.data, direction);
            }
        };
        this.context = context;
    }
    setData(data) {
        if (!compareKeys(data, this.data, TabCache.usedDataKeys)) {
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
        return (React.createElement(DockTabPane, { key: id, id: id, cached: cached, tab: React.createElement("div", { ref: this.getRef },
                title,
                React.createElement("div", { className: 'dock-tab-hit-area', ref: this.getHitAreaRef, draggable: !tabLocked, onDrag: this.onDragStart, onDragOver: this.onDragOver, onDrop: this.onDrop, onDragLeave: this.onDragLeave }, closable ?
                    React.createElement("a", { className: 'dock-tab-close-btn', onClick: this.onCloseClick }, "x")
                    : null)) }, content));
    }
    destroy() {
    }
}
TabCache.usedDataKeys = ['id', 'title', 'group', 'content'];
export class DockTabs extends React.Component {
    constructor(props, context) {
        super(props, context);
        this._cache = new Map();
        this.renderTabBar = () => (React.createElement(DockTabBar, { onDragMoveInit: this.props.onPanelHeaderDragInit, onHtmlDrag: this.props.onPanelHeaderHtmlDrag }));
        this.renderTabContent = () => {
            let { group } = this.props.panelData;
            let { animated } = group;
            return React.createElement(TabContent, { animated: animated });
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
        if (!compareChildKeys(tabs, this.props.panelData.tabs, TabCache.usedDataKeys)) {
            this.updateTabs(tabs);
            return true;
        }
        return !compareKeys(this.props, nextProps, DockTabs.propKeys);
    }
    render() {
        let { group, activeId } = this.props.panelData;
        let children = [];
        for (let [id, tab] of this._cache) {
            children.push(tab.content);
        }
        return (React.createElement(Tabs, { prefixCls: 'dock', renderTabBar: this.renderTabBar, renderTabContent: this.renderTabContent, activeKey: activeId, onChange: this.onTabChange }, children));
    }
}
DockTabs.contextType = DockContextType;
DockTabs.propKeys = ['group', 'tabs', 'activeId', 'onTabChange'];
//# sourceMappingURL=DockTabs.js.map