import React from 'react';
import ReactDOM from 'react-dom';
import classnames from 'classnames';
import {DockContext, DockContextType, TabPaneCache} from "./DockData";

interface DockTabPaneProps {
  className?: string;
  active?: boolean;
  style?: React.CSSProperties;
  destroyInactiveTabPane?: boolean;
  forceRender?: boolean;
  placeholder?: React.ReactNode;
  rootPrefixCls?: string;
  children?: React.ReactElement;
  tab: React.ReactNode;
  cacheId?: string;
  cached: boolean;

}

export default class DockTabPane extends React.PureComponent<DockTabPaneProps, any> {
  static contextType = DockContextType;

  context!: DockContext;

  _ref: HTMLDivElement;
  getRef = (r: HTMLDivElement) => {
    this._ref = r;
  };

  updateCache() {
    const {cached, children, cacheId} = this.props;
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

  _isActived: boolean;

  _cache: TabPaneCache;

  render() {
    const {
      cacheId, className, active, forceRender,
      rootPrefixCls, style, children, placeholder, cached
    } = this.props;
    this._isActived = this._isActived || active;
    const prefixCls = `${rootPrefixCls}-tabpane`;
    const cls = classnames({
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
    } else if (isRender || forceRender) {
      renderChildren = children;
    }

    let getRef = cached ? this.getRef : null;
    return (
      <div ref={getRef}
           style={style}
           role="tabpanel"
           aria-hidden={active ? 'false' : 'true'}
           className={cls}
           id={cacheId}>
        {renderChildren}
      </div>
    );
  }

  componentDidMount(): void {
    this.updateCache();
  }

  componentDidUpdate(prevProps: Readonly<DockTabPaneProps>, prevState: Readonly<any>, snapshot?: any): void {
    this.updateCache();
  }

  componentWillUnmount(): void {
    if (this._cache) {
      this.context.removeTabCache(this._cache.id, this);
    }
  }
}
