"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const classnames_1 = __importDefault(require("classnames"));
const DockData_1 = require("./DockData");
class DockTabPane extends react_1.default.PureComponent {
    constructor() {
        super(...arguments);
        this.getRef = (r) => {
            this._ref = r;
        };
    }
    updateCache() {
        const { cached, children, cacheId } = this.props;
        if (this._cache) {
            if (!cached || cacheId !== this._cache.id) {
                this.context.removeTabCache(this._cache.id, this);
                this._cache = null;
            }
        }
        if (cached && this._ref) {
            this._cache = this.context.getTabCache(cacheId, this);
            if (!this._ref.contains(this._cache.div)) {
                this._ref.appendChild(this._cache.div);
            }
            this.context.updateTabCache(this._cache.id, children);
        }
    }
    render() {
        const { cacheId, cached, prefixCls, forceRender, className, style, id, active, animated, destroyInactiveTabPane, tabKey, children, } = this.props;
        if (active) {
            this.visited = true;
        }
        else if (destroyInactiveTabPane) {
            this.visited = false;
        }
        const mergedStyle = {};
        if (!active) {
            if (animated) {
                mergedStyle.visibility = 'hidden';
                mergedStyle.height = 0;
                mergedStyle.overflowY = 'hidden';
            }
            else {
                mergedStyle.display = 'none';
            }
        }
        // when cached == undefined, it will still cache the children inside tabs component, but not across whole dock layout
        // when cached == false, children are destroyed when not active
        const isRender = cached === false ? active : this.visited;
        let renderChildren = null;
        if (cached) {
            renderChildren = null;
        }
        else if (isRender || forceRender) {
            renderChildren = children;
        }
        let getRef = cached ? this.getRef : null;
        return (react_1.default.createElement("div", { ref: getRef, id: cacheId, role: "tabpanel", "aria-labelledby": id && `${id}-tab-${tabKey}`, "aria-hidden": !active, style: Object.assign(Object.assign({}, mergedStyle), style), className: classnames_1.default(`${prefixCls}-tabpane`, active && `${prefixCls}-tabpane-active`, className) }, (active || this.visited || forceRender) && renderChildren));
    }
    componentDidMount() {
        this.updateCache();
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        this.updateCache();
    }
    componentWillUnmount() {
        if (this._cache) {
            this.context.removeTabCache(this._cache.id, this);
        }
    }
}
exports.default = DockTabPane;
DockTabPane.contextType = DockData_1.DockContextType;
