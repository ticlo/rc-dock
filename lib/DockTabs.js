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
const rc_tabs_1 = __importDefault(require("rc-tabs"));
const TabContent_1 = __importDefault(require("rc-tabs/lib/TabContent"));
const DragManager_1 = require("./dragdrop/DragManager");
const DragDropDiv_1 = require("./dragdrop/DragDropDiv");
const DockTabBar_1 = require("./DockTabBar");
const DockTabPane_1 = __importStar(require("./DockTabPane"));
const Algorithm_1 = require("./Algorithm");
const KeyCode_1 = __importDefault(require("rc-util/lib/KeyCode"));
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
        this.onKeyDownCloseBtn = (evt) => {
            if (!KeyCode_1.default.isTextModifyingKeyEvent(evt.nativeEvent) || (evt.keyCode != KeyCode_1.default.ENTER && evt.keyCode != KeyCode_1.default.SPACE)) {
                return false;
            }
            this.context.dockMove(this.data, null, 'remove');
            evt.stopPropagation();
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
            let tab = DragManager_1.DragState.getData('tab', dockId);
            let panel = DragManager_1.DragState.getData('panel', dockId);
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
            let tab = DragManager_1.DragState.getData('tab', dockId);
            if (tab) {
                panel = tab.parent;
            }
            else {
                panel = DragManager_1.DragState.getData('panel', dockId);
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
        let { id, title, group, content, closable, cached, cacheContext } = this.data;
        let tabGroup = this.context.getGroup(group);
        if (typeof content === 'function') {
            content = content(this.data);
        }
        let tab = (react_1.default.createElement("div", { ref: this.getRef },
            title,
            react_1.default.createElement(DragDropDiv_1.DragDropDiv, { className: 'dock-tab-hit-area', getRef: this.getHitAreaRef, onDragStartT: this.onDragStart, onDragOverT: this.onDragOver, onDropT: this.onDrop, onDragLeaveT: this.onDragLeave }, closable ?
                react_1.default.createElement("div", { className: 'dock-tab-close-btn', onClick: this.onCloseClick, onKeyDown: this.onKeyDownCloseBtn, tabIndex: 0 })
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
class DockTabs extends react_1.default.PureComponent {
    constructor() {
        super(...arguments);
        this._cache = new Map();
        this.onMaximizeClick = () => {
            let { panelData } = this.props;
            this.context.dockMove(panelData, null, 'maximize');
        };
        this.onKeyDownMaximizeBtn = (evt) => {
            if (!KeyCode_1.default.isTextModifyingKeyEvent(evt.nativeEvent) || (evt.keyCode != KeyCode_1.default.ENTER && evt.keyCode != KeyCode_1.default.SPACE)) {
                return false;
            }
            evt.stopPropagation();
            let { panelData } = this.props;
            this.context.dockMove(panelData, null, 'maximize');
        };
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
            else if (group.maximizable) {
                panelExtraContent = (react_1.default.createElement("div", { className: 'dock-panel-max-btn', onClick: this.onMaximizeClick, onKeyDown: this.onKeyDownMaximizeBtn, tabIndex: 0 }));
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
            this.context.onSilentChange(activeId);
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
    render() {
        let { group, tabs, activeId } = this.props.panelData;
        this.updateTabs(tabs);
        let children = [];
        for (let [id, tab] of this._cache) {
            children.push(tab.content);
        }
        return (react_1.default.createElement(rc_tabs_1.default, { prefixCls: 'dock', renderTabBar: this.renderTabBar, renderTabContent: this.renderTabContent, activeKey: activeId, onChange: this.onTabChange }, children));
    }
}
exports.DockTabs = DockTabs;
DockTabs.contextType = DockData_1.DockContextType;
DockTabs.propKeys = ['group', 'tabs', 'activeId', 'onTabChange'];
