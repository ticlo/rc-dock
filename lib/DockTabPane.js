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
            this._ref.appendChild(this._cache.div);
            this.context.updateTabCache(this._cache.id, children);
        }
    }
    render() {
        const { cacheId, className, active, forceRender, rootPrefixCls, style, children, placeholder, cached } = this.props;
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
        return (react_1.default.createElement("div", { ref: getRef, style: style, role: "tabpanel", "aria-hidden": active ? 'false' : 'true', className: cls, id: cacheId }, renderChildren));
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
