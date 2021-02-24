var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import React from "react";
import ReactDOM from "react-dom";
import debounce from 'lodash/debounce';
import { defaultGroup, DockContextProvider, placeHolderGroup, placeHolderStyle } from "./DockData";
import { DockBox } from "./DockBox";
import { FloatBox } from "./FloatBox";
import { DockPanel } from "./DockPanel";
import * as Algorithm from "./Algorithm";
import * as Serializer from "./Serializer";
import * as DragManager from "./dragdrop/DragManager";
import { MaxBox } from "./MaxBox";
import { WindowBox } from "./WindowBox";
class DockPortalManager extends React.PureComponent {
    constructor() {
        super(...arguments);
        /** @ignore */
        this._caches = new Map();
        this.destroyRemovedPane = () => {
            this._pendingDestroy = null;
            let cacheRemoved = false;
            for (let [id, cache] of this._caches) {
                if (cache.owner == null) {
                    this._caches.delete(id);
                    cacheRemoved = true;
                }
            }
            if (cacheRemoved) {
                this.forceUpdate();
            }
        };
    }
    /** @ignore */
    getTabCache(id, owner) {
        let cache = this._caches.get(id);
        if (!cache) {
            let div = document.createElement('div');
            div.className = 'dock-pane-cache';
            cache = { div, id, owner };
            this._caches.set(id, cache);
        }
        else {
            cache.owner = owner;
        }
        return cache;
    }
    /** @ignore */
    removeTabCache(id, owner) {
        let cache = this._caches.get(id);
        if (cache && cache.owner === owner) {
            cache.owner = null;
            if (!this._pendingDestroy) {
                // it could be reused by another component, so let's wait
                this._pendingDestroy = setTimeout(this.destroyRemovedPane, 1);
            }
        }
    }
    /** @ignore */
    updateTabCache(id, children) {
        let cache = this._caches.get(id);
        if (cache) {
            cache.portal = ReactDOM.createPortal(children, cache.div, cache.id);
            this.forceUpdate();
        }
    }
}
export class DockLayout extends DockPortalManager {
    constructor(props) {
        super(props);
        /** @ignore */
        this.getRef = (r) => {
            this._ref = r;
        };
        /** @ignore */
        this.onDragStateChange = (draggingScope) => {
            if (draggingScope == null) {
                DockPanel.droppingPanel = null;
                if (this.state.dropRect) {
                    this.setState({ dropRect: null });
                }
            }
        };
        this._onWindowResize = debounce(() => {
            let layout = this.tempLayout || this.state.layout;
            if (this._ref) {
                let newLayout = Algorithm.fixFloatPanelPos(layout, this._ref.offsetWidth, this._ref.offsetHeight);
                if (layout !== newLayout) {
                    newLayout = Algorithm.fixLayoutData(newLayout); // panel parent might need a fix
                    this.changeLayout(newLayout, null);
                }
            }
        }, 200);
        let { layout, defaultLayout, loadTab } = props;
        let preparedLayout;
        if (defaultLayout) {
            preparedLayout = this.prepareInitData(props.defaultLayout);
        }
        else if (!loadTab) {
            throw new Error('DockLayout.loadTab and DockLayout.defaultLayout should not both be undefined.');
        }
        if (layout) {
            // controlled layout
            this.state = {
                layout: DockLayout.loadLayoutData(layout, props),
                dropRect: null,
            };
        }
        else {
            this.state = {
                layout: preparedLayout,
                dropRect: null,
            };
        }
        DragManager.addDragStateListener(this.onDragStateChange);
        window.addEventListener('resize', this._onWindowResize);
    }
    /** @ignore */
    getRootElement() {
        return this._ref;
    }
    /** @ignore */
    prepareInitData(data) {
        let layout = Object.assign({}, data);
        Algorithm.fixLayoutData(layout, this.props.loadTab);
        return layout;
    }
    /** @ignore */
    getDockId() {
        return this.props.dockId || this;
    }
    /** @inheritDoc */
    getGroup(name) {
        if (name) {
            let { groups } = this.props;
            if (groups && name in groups) {
                return groups[name];
            }
            if (name === placeHolderStyle) {
                return placeHolderGroup;
            }
        }
        return defaultGroup;
    }
    /**
     * @inheritDoc
     * @param source @inheritDoc
     * @param target @inheritDoc
     * @param direction @inheritDoc
     */
    dockMove(source, target, direction) {
        let layout = this.tempLayout || this.state.layout;
        if (direction === 'maximize') {
            layout = Algorithm.maximize(layout, source);
        }
        else if (direction === 'front') {
            layout = Algorithm.moveToFront(layout, source);
        }
        else {
            layout = Algorithm.removeFromLayout(layout, source);
        }
        if (typeof target === 'string') {
            target = this.find(target);
        }
        else {
            target = Algorithm.getUpdatedObject(target); // target might change during removeTab
        }
        if (direction === 'float') {
            let newPanel = Algorithm.converToPanel(source);
            newPanel.z = Algorithm.nextZIndex(null);
            if (this.state.dropRect) {
                layout = Algorithm.floatPanel(layout, newPanel, this.state.dropRect);
            }
            else {
                layout = Algorithm.floatPanel(layout, newPanel);
                if (this._ref) {
                    layout = Algorithm.fixFloatPanelPos(layout, this._ref.offsetWidth, this._ref.offsetHeight);
                }
            }
        }
        else if (direction === 'new-window') {
            let newPanel = Algorithm.converToPanel(source);
            layout = Algorithm.panelToWindow(layout, newPanel);
        }
        else if (target) {
            if ('tabs' in target) {
                // pandel target
                if (direction === 'middle') {
                    layout = Algorithm.addTabToPanel(layout, source, target);
                }
                else {
                    let newPanel = Algorithm.converToPanel(source);
                    layout = Algorithm.dockPanelToPanel(layout, newPanel, target, direction);
                }
            }
            else if ('children' in target) {
                // box target
                let newPanel = Algorithm.converToPanel(source);
                layout = Algorithm.dockPanelToBox(layout, newPanel, target, direction);
            }
            else {
                // tab target
                layout = Algorithm.addNextToTab(layout, source, target, direction);
            }
        }
        if (layout !== this.state.layout) {
            layout = Algorithm.fixLayoutData(layout);
            let currentTabId = null;
            if (direction !== 'remove') {
                if (source.hasOwnProperty('tabs')) {
                    currentTabId = source.activeId;
                }
                else {
                    // when source is tab
                    currentTabId = source.id;
                }
            }
            this.changeLayout(layout, currentTabId);
        }
        this.onDragStateChange(false);
    }
    /** @inheritDoc */
    find(id, filter) {
        return Algorithm.find(this.tempLayout || this.state.layout, id, filter);
    }
    /** @ignore */
    getLayoutSize() {
        if (this._ref) {
            return { width: this._ref.offsetWidth, height: this._ref.offsetHeight };
        }
        return { width: 0, height: 0 };
    }
    /** @inheritDoc */
    updateTab(id, newTab) {
        let tab = this.find(id, Algorithm.Filter.AnyTab);
        if (tab && !('tabs' in tab)) {
            let panelData = tab.parent;
            let idx = panelData.tabs.indexOf(tab);
            if (idx >= 0) {
                let { loadTab } = this.props;
                if (loadTab && !('content' in newTab && 'title' in newTab)) {
                    newTab = loadTab(newTab);
                }
                let { layout } = this.state;
                layout = Algorithm.removeFromLayout(layout, tab); // remove old tab
                panelData = Algorithm.getUpdatedObject(panelData); // panelData might change during removeTab
                layout = Algorithm.addTabToPanel(layout, newTab, panelData, idx); // add new tab
                layout = Algorithm.fixLayoutData(layout);
                this.setState({ layout });
                return true;
            }
        }
        return false;
    }
    /** @ignore */
    useEdgeDrop() {
        return this.props.dropMode === 'edge';
    }
    /** @ignore */
    setDropRect(element, direction, source, event, panelSize = [300, 300]) {
        let { dropRect } = this.state;
        if (dropRect) {
            if (direction === 'remove') {
                if (dropRect.source === source) {
                    this.setState({ dropRect: null });
                }
                return;
            }
            else if (dropRect.element === element && dropRect.direction === direction && direction !== 'float') {
                // skip duplicated update except for float dragging
                return;
            }
        }
        if (!element) {
            this.setState({ dropRect: null });
            return;
        }
        let layoutRect = this._ref.getBoundingClientRect();
        let scaleX = this._ref.offsetWidth / layoutRect.width;
        let scaleY = this._ref.offsetHeight / layoutRect.height;
        let elemRect = element.getBoundingClientRect();
        let left = (elemRect.left - layoutRect.left) * scaleX;
        let top = (elemRect.top - layoutRect.top) * scaleY;
        let width = elemRect.width * scaleX;
        let height = elemRect.height * scaleY;
        let ratio = 0.5;
        if (element.classList.contains('dock-box')) {
            ratio = 0.3;
        }
        switch (direction) {
            case 'float': {
                let x = (event.clientX - layoutRect.left) * scaleX;
                let y = (event.clientY - layoutRect.top) * scaleY;
                top = y - 15;
                width = panelSize[0];
                height = panelSize[1];
                left = x - (width >> 1);
                break;
            }
            case 'right':
                left += width * (1 - ratio);
            case 'left': // tslint:disable-line no-switch-case-fall-through
                width *= ratio;
                break;
            case 'bottom':
                top += height * (1 - ratio);
            case 'top': // tslint:disable-line no-switch-case-fall-through
                height *= ratio;
                break;
            case 'after-tab':
                left += width - 15;
                width = 30;
                break;
            case 'before-tab':
                left -= 15;
                width = 30;
                break;
        }
        this.setState({ dropRect: { left, top, width, height, element, source, direction } });
    }
    /** @ignore */
    render() {
        // clear tempLayout
        this.tempLayout = null;
        let { style, maximizeTo } = this.props;
        let { layout, dropRect } = this.state;
        let dropRectStyle;
        if (dropRect) {
            let { element, direction } = dropRect, rect = __rest(dropRect, ["element", "direction"]);
            dropRectStyle = Object.assign(Object.assign({}, rect), { display: 'block' });
            if (direction === 'float') {
                dropRectStyle.transition = 'none';
            }
        }
        let maximize;
        // if (layout.maxbox && layout.maxbox.children.length === 1) {
        if (maximizeTo) {
            if (typeof maximizeTo === 'string') {
                maximizeTo = document.getElementById(maximizeTo);
            }
            maximize = ReactDOM.createPortal(React.createElement(MaxBox, { boxData: layout.maxbox }), maximizeTo);
        }
        else {
            maximize = React.createElement(MaxBox, { boxData: layout.maxbox });
        }
        // }
        let portals = [];
        for (let [key, cache] of this._caches) {
            if (cache.portal) {
                portals.push(cache.portal);
            }
        }
        return (React.createElement("div", { ref: this.getRef, className: 'dock-layout', style: style },
            React.createElement(DockContextProvider, { value: this },
                React.createElement(DockBox, { size: 1, boxData: layout.dockbox }),
                React.createElement(FloatBox, { boxData: layout.floatbox }),
                React.createElement(WindowBox, { boxData: layout.windowbox }),
                maximize,
                portals),
            React.createElement("div", { className: 'dock-drop-indicator', style: dropRectStyle })));
    }
    /** @ignore */
    componentWillUnmount() {
        window.removeEventListener('resize', this._onWindowResize);
        DragManager.removeDragStateListener(this.onDragStateChange);
        this._onWindowResize.cancel();
    }
    /** @ignore
     * change layout
     */
    changeLayout(layoutData, currentTabId) {
        let { layout, onLayoutChange } = this.props;
        let savedLayout;
        if (onLayoutChange) {
            savedLayout = Serializer.saveLayoutData(layoutData, this.props.saveTab, this.props.afterPanelSaved);
            layoutData.loadedFrom = savedLayout;
            onLayoutChange(savedLayout, currentTabId);
        }
        if (!layout) {
            // uncontrolled layout when Props.layout is not defined
            this.tempLayout = layoutData;
            this.setState({ layout: layoutData });
        }
    }
    /** @ignore
     * some layout change were handled by component silently
     * but they should still call this function to trigger onLayoutChange
     */
    onSilentChange(currentTabId = null) {
        let { onLayoutChange } = this.props;
        if (onLayoutChange) {
            let layout = this.tempLayout || this.state.layout;
            let savedLayout = Serializer.saveLayoutData(layout, this.props.saveTab, this.props.afterPanelSaved);
            layout.loadedFrom = savedLayout;
            onLayoutChange(savedLayout, currentTabId);
        }
    }
    // public api
    saveLayout() {
        return Serializer.saveLayoutData(this.tempLayout || this.state.layout, this.props.saveTab, this.props.afterPanelSaved);
    }
    /**
     * load layout
     * calling this api won't trigger the [[LayoutProps.onLayoutChange]] callback
     */
    loadLayout(savedLayout) {
        let { defaultLayout, loadTab, afterPanelLoaded } = this.props;
        this.setState({ layout: DockLayout.loadLayoutData(savedLayout, this.props, this._ref.offsetWidth, this._ref.offsetHeight) });
    }
    /** @ignore */
    static loadLayoutData(savedLayout, props, width = 0, height = 0) {
        let { defaultLayout, loadTab, afterPanelLoaded } = props;
        let layout = Serializer.loadLayoutData(savedLayout, defaultLayout, loadTab, afterPanelLoaded);
        layout = Algorithm.fixFloatPanelPos(layout, width, height);
        layout = Algorithm.fixLayoutData(layout);
        layout.loadedFrom = savedLayout;
        return layout;
    }
    static getDerivedStateFromProps(props, state) {
        let { layout: layoutToLoad } = props;
        let { layout: currentLayout } = state;
        if (layoutToLoad && layoutToLoad !== currentLayout.loadedFrom) {
            // auto reload on layout prop change
            return {
                layout: DockLayout.loadLayoutData(layoutToLoad, props),
            };
        }
        return null;
    }
}
