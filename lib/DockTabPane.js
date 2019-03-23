var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};
import React from 'react';
import ReactDOM from 'react-dom';
import classnames from 'classnames';
export default class DockTabPane extends React.PureComponent {
    constructor() {
        super(...arguments);
        this.getRef = (r) => {
            this._ref = r;
        };
    }
    updateCache() {
        const { cached, children, id } = this.props;
        if (this._cache) {
            if (!cached || id !== this._cache.id) {
                TabPaneCache.remove(this._cache.id, this);
                this._cache = null;
            }
        }
        if (cached && this._ref) {
            this._cache = TabPaneCache.create(id, this);
            this._ref.appendChild(this._cache.div);
            this._cache.update(children);
        }
    }
    render() {
        const _a = this.props, { id, className, destroyInactiveTabPane, active, forceRender, rootPrefixCls, style, children, placeholder, cached } = _a, restProps = __rest(_a, ["id", "className", "destroyInactiveTabPane", "active", "forceRender", "rootPrefixCls", "style", "children", "placeholder", "cached"]);
        this._isActived = this._isActived || active;
        const prefixCls = `${rootPrefixCls}-tabpane`;
        const cls = classnames({
            [prefixCls]: 1,
            [`${prefixCls}-inactive`]: !active,
            [`${prefixCls}-active`]: active,
            [className]: className,
        });
        const isRender = destroyInactiveTabPane ? active : this._isActived;
        let renderChildren = placeholder;
        if (cached) {
            renderChildren = null;
        }
        else if (isRender || forceRender) {
            renderChildren = children;
        }
        let getRef = cached ? this.getRef : null;
        return (React.createElement("div", { ref: getRef, style: style, role: "tabpanel", "aria-hidden": active ? 'false' : 'true', className: cls, id: id }, renderChildren));
    }
    componentDidMount() {
        this.updateCache();
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        this.updateCache();
    }
    componentWillUnmount() {
        if (this._cache) {
            TabPaneCache.remove(this._cache.id, this);
        }
    }
}
class TabPaneCache {
    static remove(id, pane) {
        let cache = TabPaneCache._caches.get(id);
        if (cache && cache.pane === pane) {
            cache.pane = null;
            if (!TabPaneCache._pending) {
                // it could be reused by another component, so let's wait
                TabPaneCache._pending = setTimeout(TabPaneCache.destroyRemovedPane, 1);
            }
        }
    }
    static create(id, pane) {
        let cache = TabPaneCache._caches.get(id);
        if (!cache) {
            cache = new TabPaneCache();
            cache.id = id;
            cache.div = document.createElement('div');
            cache.div.className = 'dock-tabs-pane-cache';
            TabPaneCache._caches.set(id, cache);
        }
        cache.pane = pane;
        return cache;
    }
    static destroyRemovedPane() {
        TabPaneCache._pending = null;
        for (let [id, cache] of TabPaneCache._caches) {
            if (cache.pane == null) {
                cache.destroy();
                TabPaneCache._caches.delete(id);
            }
        }
    }
    update(node) {
        if (node !== this.node) {
            this.node = node;
            ReactDOM.render(node, this.div);
        }
    }
    destroy() {
        ReactDOM.unmountComponentAtNode(this.div);
    }
}
TabPaneCache._caches = new Map();
//# sourceMappingURL=DockTabPane.js.map