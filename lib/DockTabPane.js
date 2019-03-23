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
import classnames from 'classnames';
export default class DockTabPane extends React.PureComponent {
    render() {
        const _a = this.props, { id, className, destroyInactiveTabPane, active, forceRender, rootPrefixCls, style, children, placeholder } = _a, restProps = __rest(_a, ["id", "className", "destroyInactiveTabPane", "active", "forceRender", "rootPrefixCls", "style", "children", "placeholder"]);
        this._isActived = this._isActived || active;
        const prefixCls = `${rootPrefixCls}-tabpane`;
        const cls = classnames({
            [prefixCls]: 1,
            [`${prefixCls}-inactive`]: !active,
            [`${prefixCls}-active`]: active,
            [className]: className,
        });
        const isRender = destroyInactiveTabPane ? active : this._isActived;
        const shouldRender = isRender || forceRender;
        return (React.createElement("div", { style: style, role: "tabpanel", "aria-hidden": active ? 'false' : 'true', className: cls, id: id }, shouldRender ? children : placeholder));
    }
}
//# sourceMappingURL=DockTabPane.js.map