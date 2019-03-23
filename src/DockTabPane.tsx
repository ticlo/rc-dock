import React from 'react';
import classnames from 'classnames';

interface DockTabPaneProps {
  className?: string;
  active?: boolean;
  style?: React.CSSProperties;
  destroyInactiveTabPane?: boolean;
  forceRender?: boolean;
  placeholder?: React.ReactNode;
  rootPrefixCls?: string;
  children?: React.ReactNode;
  tab: React.ReactNode;
  id?: string;
}

export default class DockTabPane extends React.PureComponent<DockTabPaneProps, any> {
  _isActived: boolean;

  render() {
    const {
      id, className, destroyInactiveTabPane, active, forceRender,
      rootPrefixCls, style, children, placeholder,
      ...restProps
    } = this.props;
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

    return (
      <div
        style={style}
        role="tabpanel"
        aria-hidden={active ? 'false' : 'true'}
        className={cls}
        id={id}
      >
        {shouldRender ? children : placeholder}
      </div>
    );
  }
}
