"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_dom_1 = __importDefault(require("react-dom"));
const classnames_1 = __importDefault(require("classnames"));
class DockTabPane extends react_1.default.PureComponent {
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
        const { id, className, active, forceRender, rootPrefixCls, style, children, placeholder, cached } = this.props;
        this._isActived = this._isActived || active;
        const prefixCls = `${rootPrefixCls}-tabpane`;
        const cls = classnames_1.default({
            [prefixCls]: 1,
            [`${prefixCls}-inactive`]: !active,
            [`${prefixCls}-active`]: active,
            [className]: className,
        });
        // when cached == undefined, it will still cache the children inside tabs component, but not across whole dock layout
        // when cached == false, children are destroyed when not active
        const isRender = cached === false ? active : this._isActived;
        let renderChildren = placeholder;
        if (cached) {
            renderChildren = null;
        }
        else if (isRender || forceRender) {
            renderChildren = children;
        }
        let getRef = cached ? this.getRef : null;
        return (react_1.default.createElement("div", { ref: getRef, style: style, role: "tabpanel", "aria-hidden": active ? 'false' : 'true', className: cls, id: id }, renderChildren));
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
exports.default = DockTabPane;
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
            cache.div.className = 'dock-pane-cache';
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
            react_dom_1.default.render(node, this.div);
        }
    }
    destroy() {
        react_dom_1.default.unmountComponentAtNode(this.div);
    }
}
TabPaneCache._caches = new Map();
let _paneClassCache = new WeakMap();
function getContextPaneClass(contextType) {
    if (_paneClassCache.has(contextType)) {
        return _paneClassCache.get(contextType);
    }
    class NewClass extends DockTabPane {
        get context() {
            return this._context;
        }
        set context(ctx) {
            if (!Object.is(ctx, this._context)) {
                this._context = ctx;
                if (this._cache) {
                    this.updateCache();
                }
            }
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
                if (contextType) {
                    let Provider = contextType.Provider;
                    this._cache.update(react_1.default.createElement(Provider, { value: this._context }, children));
                }
                else {
                    this._cache.update(children);
                }
            }
        }
    }
    NewClass.contextType = contextType;
    _paneClassCache.set(contextType, NewClass);
    return NewClass;
}
exports.getContextPaneClass = getContextPaneClass;
