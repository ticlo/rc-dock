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
const classnames_1 = __importDefault(require("classnames"));
const Utils_1 = require("./Utils");
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
    var _a, _b, _c;
    return (r == null || ((_a = r.parentElement) === null || _a === void 0 ? void 0 : _a.tagName) === 'LI' || ((_c = (_b = r.parentElement) === null || _b === void 0 ? void 0 : _b.parentElement) === null || _c === void 0 ? void 0 : _c.tagName) === 'LI');
}
class DockTabTitle extends react_1.default.PureComponent {
    constructor(props) {
        super(props);
        this.ref = react_1.default.createRef();
        this.handleMouseWheelClick = this.handleMouseWheelClick.bind(this);
    }
    handleMouseWheelClick(e) {
        if (e.button === 1) {
            this.props.onMouseWheelClick(e);
        }
    }
    componentDidMount() {
        const tabElement = this.ref.current.parentElement.parentElement.parentElement;
        tabElement.addEventListener("mouseup", this.handleMouseWheelClick);
    }
    componentWillUnmount() {
        const tabElement = this.ref.current.parentElement.parentElement.parentElement;
        tabElement.removeEventListener("mouseup", this.handleMouseWheelClick);
    }
    render() {
        const { title } = this.props;
        return react_1.default.createElement("div", { ref: this.ref, className: "dock-tab-title" }, title);
    }
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
            this.removeTab();
            e.stopPropagation();
        };
        this.onDragStart = (e) => {
            let panel = this.data.parent;
            if (panel.parent.mode === 'float' && panel.tabs.length === 1) {
                // when it's the only tab in a float panel, skip this drag, let parent tab bar handle it
                return;
            }
            let panelElement = findParentPanel(this._ref);
            let tabGroup = Utils_1.mergeTabGroups(this.context.getGroup(this.data.group), this.data.localGroup);
            let [panelWidth, panelHeight] = Algorithm_1.getFloatPanelSize(panelElement, tabGroup);
            e.setData({
                tab: this.data,
                panelSize: [panelWidth, panelHeight],
                tabGroup: this.data.group
            }, this.context.getDockId());
            e.startDrag(this._ref.parentElement, this._ref.parentElement);
        };
        this.onDragOver = (e) => {
            var _a, _b;
            let dockId = this.context.getDockId();
            let tab = DragManager.DragState.getData('tab', dockId);
            let panel = DragManager.DragState.getData('panel', dockId);
            let group;
            let localGroup;
            if (tab) {
                panel = tab.parent;
                group = tab.group;
                localGroup = tab.localGroup;
            }
            else {
                // drag whole panel
                if (!panel) {
                    return;
                }
                if (panel === null || panel === void 0 ? void 0 : panel.panelLock) {
                    e.reject();
                    return;
                }
                group = panel.group;
                localGroup = panel.localGroup;
            }
            let tabGroup = Utils_1.mergeTabGroups(this.context.getGroup(group), localGroup);
            if (group !== this.data.group) {
                e.reject();
            }
            else if ((tabGroup === null || tabGroup === void 0 ? void 0 : tabGroup.floatable) === 'singleTab' && ((_b = (_a = this.data.parent) === null || _a === void 0 ? void 0 : _a.parent) === null || _b === void 0 ? void 0 : _b.mode) === 'float') {
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
        this.handleMouseWheelClick = this.handleMouseWheelClick.bind(this);
    }
    setData(data) {
        if (data !== this.data) {
            this.data = data;
            this.content = this.render();
            return true;
        }
        return false;
    }
    removeTab() {
        this.context.dockMove(this.data, null, 'remove');
    }
    getDropDirection(e) {
        let rect = this._hitAreaRef.getBoundingClientRect();
        if (["left", "right"].includes(Algorithm_1.getPanelTabPosition(this.data.parent))) {
            let midy = rect.top + rect.height * 0.5;
            return e.clientY > midy ? 'under-tab' : 'above-tab';
        }
        let midx = rect.left + rect.width * 0.5;
        return e.clientX > midx ? 'after-tab' : 'before-tab';
    }
    handleMouseWheelClick(e) {
        if (this.isTabClosable()) {
            this.removeTab();
            e.stopPropagation();
        }
    }
    isTabClosable() {
        const { parent, closable } = this.data;
        return closable && parent.tabs.length > 1;
    }
    render() {
        let { id, title, group, content, closable, cached, parent, localGroup, handleTabActiveChange } = this.data;
        let { onDragStart, onDragOver, onDrop, onDragLeave } = this;
        if (parent.parent.mode === 'window') {
            onDragStart = null;
            onDragOver = null;
            onDrop = null;
            onDragLeave = null;
        }
        let tabGroup = Utils_1.mergeTabGroups(this.context.getGroup(group), localGroup);
        if (typeof content === 'function') {
            content = content(this.data);
        }
        const tabClosable = closable && parent.tabs.length > 1;
        let tab = (react_1.default.createElement(DragDropDiv_1.DragDropDiv, { getRef: this.getRef, onDragStartT: onDragStart, role: "tab", "aria-selected": parent.activeId === id, onDragOverT: onDragOver, onDropT: onDrop, onDragLeaveT: onDragLeave, tabData: this.data },
            react_1.default.createElement(DockTabTitle, { title: title, onMouseWheelClick: this.handleMouseWheelClick }),
            tabClosable ?
                react_1.default.createElement("div", { className: "dock-tab-close-btn", onClick: this.onCloseClick })
                : null,
            react_1.default.createElement("div", { className: "dock-tab-hit-area", ref: this.getHitAreaRef })));
        return (react_1.default.createElement(DockTabPane_1.default, { key: id, cacheId: id, cached: cached, tab: tab, onTabActiveChange: handleTabActiveChange },
            react_1.default.createElement(DockData_1.DockTabIdContext.Provider, { value: id }, content)));
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
        this.animationDisabled = false;
        this.handleMaximizeClick = (e) => {
            let { panelData } = this.props;
            this.context.dockMove(panelData, null, 'maximize');
            // prevent the focus change logic
            e.stopPropagation();
        };
        this.handleCollapseExpandClick = (e) => {
            const { panelData } = this.props;
            const firstTab = panelData.tabs[0];
            firstTab.collapsed = !(panelData === null || panelData === void 0 ? void 0 : panelData.collapsed);
            this.context.updateTab(firstTab.id, firstTab, false);
            this.animationDisabled = true;
            const navElement = document.querySelector(`[data-dockid="${panelData.id}"] .dock-nav`);
            navElement.classList.add('animation-disabled');
            setTimeout(() => {
                navElement.classList.remove('animation-disabled');
            });
            // prevent the focus change logic
            e.stopPropagation();
        };
        this.handleToggleFloatingClick = (e) => {
            const { panelData } = this.props;
            if (panelData.parent.mode === 'float') {
                let targetParent;
                for (let dockParent = panelData.dockParent; dockParent && !targetParent; dockParent = dockParent.parent) {
                    const dockParentId = dockParent === null || dockParent === void 0 ? void 0 : dockParent.id;
                    targetParent = dockParentId ?
                        Algorithm_1.find(this.context.getLayout(), dockParentId, Algorithm_1.Filter.Panel | Algorithm_1.Filter.Box | Algorithm_1.Filter.EveryWhere) :
                        null;
                }
                let target;
                let direction;
                let mode;
                if (panelData.dockParent) {
                    mode = 'tabs' in panelData.dockParent ? panelData.dockParent.parent.mode : panelData.dockParent.mode;
                }
                else {
                    mode = "horizontal";
                }
                if (!targetParent) {
                    targetParent = this.context.getLayout().dockbox;
                    const lastChild = panelData.panelIndex !== 0;
                    if (mode === "horizontal") {
                        direction = lastChild ? "right" : "left";
                    }
                    else {
                        direction = lastChild ? "bottom" : "top";
                    }
                    target = targetParent;
                }
                else if ('tabs' in targetParent) {
                    const lastChild = panelData.tabIndex > targetParent.tabs.length - 1;
                    const childIndex = lastChild ? targetParent.tabs.length - 1 : panelData.tabIndex;
                    if (targetParent.tabPosition === "top" || targetParent.tabPosition === "bottom") {
                        direction = lastChild ? "after-tab" : "before-tab";
                    }
                    else {
                        direction = lastChild ? "above-tab" : "under-tab";
                    }
                    target = targetParent.tabs[childIndex];
                }
                else if (targetParent.children.length !== 0) {
                    const lastChild = panelData.panelIndex > targetParent.children.length - 1;
                    const childIndex = lastChild ? targetParent.children.length - 1 : panelData.panelIndex;
                    if (mode === "horizontal") {
                        direction = lastChild ? "right" : "left";
                    }
                    else {
                        direction = lastChild ? "bottom" : "top";
                    }
                    target = targetParent.children[childIndex];
                }
                else {
                    targetParent.children.push(panelData);
                    target = targetParent.children[0];
                    direction = "right";
                }
                panelData.needSetSize = true;
                this.context.dockMove(panelData, target, direction);
            }
            else {
                const floatingSize = { width: 400, height: 300 };
                const { x, y } = Utils_1.getFloatingCoordinatesBySize(floatingSize, this.context.getLayoutSize());
                Object.assign(panelData, {
                    x: panelData.x || x,
                    y: panelData.y || y,
                    w: panelData.w || floatingSize.width,
                    h: panelData.h || floatingSize.height
                });
                this.context.dockMove(panelData, null, 'float');
            }
            e.stopPropagation();
        };
        this.handleNewWindowClick = () => {
            let { panelData } = this.props;
            this.context.dockMove(panelData, null, 'new-window');
        };
        this.handlePanelCloseClick = (e) => {
            let { panelData } = this.props;
            this.context.dockMove(panelData.tabs[0], null, 'remove');
            e.stopPropagation();
        };
        this.renderTabBar = (props, TabNavList) => {
            let { panelData, onPanelDragStart, onPanelDragMove, onPanelDragEnd, isCollapseDisabled } = this.props;
            let { group: groupName, panelLock, localGroup, toggleFloatingDisabled } = panelData;
            let group = Utils_1.mergeTabGroups(this.context.getGroup(groupName), localGroup);
            let { panelExtra } = group;
            let { maximizable, collapsible, floatable } = group;
            if (panelData.parent.mode === 'window') {
                onPanelDragStart = null;
                maximizable = false;
            }
            if (['float', 'window', 'maximize'].includes(panelData.parent.mode)) {
                collapsible = false;
            }
            if (panelLock) {
                if (panelLock.panelExtra) {
                    panelExtra = panelLock.panelExtra;
                }
            }
            let showNewWindowButton = group.newWindow && WindowBox_1.WindowBox.enabled && panelData.parent.mode === 'float';
            let panelDefaultContent;
            let panelExtraContent;
            if (panelExtra) {
                panelExtraContent = panelExtra(panelData, this.context);
            }
            if (maximizable || showNewWindowButton) {
                panelDefaultContent = react_1.default.createElement("div", { className: panelData.parent.mode === 'maximize' ? "dock-panel-min-btn" : "dock-panel-max-btn", onClick: maximizable ? this.handleMaximizeClick : null });
                if (showNewWindowButton) {
                    panelDefaultContent = this.addNewWindowMenu(panelDefaultContent, !maximizable);
                }
            }
            const renderCollapseExpandBtn = () => {
                if (panelData.collapsed) {
                    return (react_1.default.createElement("div", { className: 'dock-panel-expand-btn', onClick: this.handleCollapseExpandClick }));
                }
                if (isCollapseDisabled) {
                    return (react_1.default.createElement("div", { className: 'dock-panel-collapse-btn dock-panel-collapse-btn-disabled' }));
                }
                return (react_1.default.createElement("div", { className: 'dock-panel-collapse-btn', onClick: this.handleCollapseExpandClick }));
            };
            const renderToggleFloatingBtn = () => {
                return (react_1.default.createElement("div", { className: panelData.parent.mode === 'float' ? 'dock-panel-restore-floating-btn' : 'dock-panel-make-floating-btn', onClick: this.handleToggleFloatingClick }));
            };
            panelExtraContent = react_1.default.createElement(react_1.default.Fragment, null,
                panelExtraContent,
                collapsible ? renderCollapseExpandBtn() : null,
                (!toggleFloatingDisabled && floatable && !panelLock) ? renderToggleFloatingBtn() : null,
                panelDefaultContent,
                panelData.tabs.length === 1 && panelData.tabs[0].closable && react_1.default.createElement("div", { className: "dock-panel-close-btn", onClick: this.handlePanelCloseClick }));
            return (react_1.default.createElement(DockTabBar_1.DockTabBar, Object.assign({ onDragStart: onPanelDragStart, onDragMove: onPanelDragMove, onDragEnd: onPanelDragEnd, TabNavList: TabNavList, isMaximized: panelData.parent.mode === 'maximize' }, props, { extra: panelExtraContent, panelData: panelData })));
        };
        this.onTabChange = (activeId) => {
            this.props.panelData.activeId = activeId;
            this.context.onSilentChange(activeId, 'active');
            this.context.updatePanelLocalGroup(this.props.panelData);
            this.forceUpdate();
        };
        this.draggingObserver = new MutationObserver(this.draggingCallback.bind(this));
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
        const nativeMenu = (react_1.default.createElement(rc_menu_1.default, { onClick: this.handleNewWindowClick },
            react_1.default.createElement(rc_menu_1.MenuItem, null, "New Window")));
        let trigger = showWithLeftClick ? ['contextMenu', 'click'] : ['contextMenu'];
        return (react_1.default.createElement(rc_dropdown_1.default, { prefixCls: "dock-dropdown", overlay: nativeMenu, trigger: trigger, mouseEnterDelay: 0.1, mouseLeaveDelay: 0.1 }, element));
    }
    componentDidMount() {
        this.draggingObserver.observe(document.body, {
            attributes: true
        });
    }
    componentWillUnmount() {
        this.draggingObserver.disconnect();
    }
    draggingCallback(mutationList) {
        const navElement = document.querySelector(`[data-dockid="${this.props.panelData.id}"] .dock-nav`);
        mutationList.forEach((mutation) => {
            if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                const dragging = mutation.target.classList.contains("dock-dragging");
                if (dragging) {
                    this.animationDisabled = true;
                    navElement.classList.add('animation-disabled');
                    return;
                }
                setTimeout(() => {
                    navElement === null || navElement === void 0 ? void 0 : navElement.classList.remove('animation-disabled');
                });
            }
        });
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (!this.animationDisabled) {
            return;
        }
        setTimeout(() => {
            this.animationDisabled = false;
        });
    }
    render() {
        const panelData = this.props.panelData;
        let { group, tabs, activeId, localGroup } = panelData;
        let tabGroup = Utils_1.mergeTabGroups(this.context.getGroup(group), localGroup);
        let { animated, moreIcon } = tabGroup;
        if (animated == null) {
            animated = true;
        }
        if (!moreIcon) {
            moreIcon = "...";
        }
        if (this.animationDisabled) {
            animated = false;
        }
        this.updateTabs(tabs);
        let children = [];
        for (let [id, tab] of this._cache) {
            children.push(tab.content);
        }
        const tabPosition = Algorithm_1.getPanelTabPosition(panelData);
        return (react_1.default.createElement(rc_tabs_1.default, { prefixCls: classnames_1.default(this.context.getClassName(), "dock"), moreIcon: moreIcon, animated: animated, renderTabBar: this.renderTabBar, activeKey: activeId, tabPosition: tabPosition, onChange: this.onTabChange }, children));
    }
}
exports.DockTabs = DockTabs;
DockTabs.contextType = DockData_1.DockContextType;
DockTabs.propKeys = ['group', 'tabs', 'activeId', 'onTabChange'];
