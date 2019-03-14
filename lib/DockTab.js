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
const Compare_1 = require("./util/Compare");
const rc_tabs_1 = __importStar(require("rc-tabs"));
const TabContent_1 = __importDefault(require("rc-tabs/lib/TabContent"));
const ScrollableInkTabBar_1 = __importDefault(require("rc-tabs/lib/ScrollableInkTabBar"));
class DockTab {
    constructor(context) {
        this.onCloseClick = (e) => {
            e.stopPropagation();
        };
        this.onDragStart = (e) => {
        };
        this.onDragOver = (e) => {
        };
        this.onDrop = (e) => {
        };
        this.context = context;
    }
    setData(data) {
        if (!Compare_1.compareKeys(data, this.data, DockTab.usedDataKeys)) {
            this.data = data;
            this.content = this.render();
            return true;
        }
        return false;
    }
    render() {
        let { id, title, group, content } = this.data;
        let { closable, tabLocked } = group;
        if (typeof content === 'function') {
            content = content();
        }
        return (react_1.default.createElement(rc_tabs_1.TabPane, { key: id, tab: react_1.default.createElement("span", { draggable: !tabLocked, onDrag: this.onDragStart, onDragOver: this.onDragOver, onDrop: this.onDrop },
                title,
                closable ?
                    react_1.default.createElement("a", { className: 'dock-tabs-tab-close-btn', onClick: this.onCloseClick }, "x")
                    : null) }, content));
    }
    destroy() {
    }
}
DockTab.usedDataKeys = ['id', 'title', 'group', 'content'];
exports.DockTab = DockTab;
class DockTabs extends react_1.default.Component {
    constructor(props) {
        super(props);
        this._cache = new Map();
        this.renderTabBar = () => (react_1.default.createElement(ScrollableInkTabBar_1.default
        // extraContent={
        //   <button onClick={this.add}>+添加</button>
        // }
        , null));
        this.renderTabContent = () => react_1.default.createElement(TabContent_1.default, null);
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
                let tab = new DockTab(this.context);
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
        if (!Compare_1.compareChildKeys(tabs, this.props.panelData.tabs, DockTab.usedDataKeys)) {
            this.updateTabs(tabs);
            return true;
        }
        return !Compare_1.compareKeys(this.props, nextProps, DockTabs.propKeys);
    }
    render() {
        let { group, activeId, minWidth, minHeight, size } = this.props.panelData;
        let { closable, tabLocked } = group;
        let children = [];
        for (let [id, tab] of this._cache) {
            children.push(tab.content);
        }
        return (react_1.default.createElement(rc_tabs_1.default, { prefixCls: 'dock-tabs', style: { minWidth, minHeight, flex: `1 1 ${size}px` }, renderTabBar: this.renderTabBar, renderTabContent: this.renderTabContent, activeKey: activeId, onChange: this.onTabChange }, children));
    }
}
DockTabs.propKeys = ['group', 'activeId', 'onTabChange'];
exports.DockTabs = DockTabs;
//# sourceMappingURL=DockTab.js.map