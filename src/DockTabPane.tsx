import * as React from 'react';
import * as ReactDOM from 'react-dom';
import classNames from 'classnames';
import {DockContext, DockContextType, TabPaneCache} from "./DockData";
import {TabPaneProps} from "rc-tabs";

interface DockTabPaneProps extends TabPaneProps {

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
      if (!this._ref.contains(this._cache.div)) {
        this._ref.appendChild(this._cache.div);
      }
      this.context.updateTabCache(this._cache.id, children);
    }
  }

  visited: boolean;

  _cache: TabPaneCache;

  render() {
    const {
      cacheId,
      cached,
      prefixCls,
      forceRender,
      className,
      style,
      id,
      active,
      animated,
      destroyInactiveTabPane,
      tabKey,
      children,
    } = this.props;
    if (active) {
      this.visited = true;
    } else if (destroyInactiveTabPane) {
      this.visited = false;
    }
    const mergedStyle: React.CSSProperties = {};
    if (!active) {
      if (animated) {
        mergedStyle.visibility = 'hidden';
        mergedStyle.height = 0;
        mergedStyle.overflowY = 'hidden';
      } else {
        mergedStyle.display = 'none';
      }
    }


    // when cached == undefined, it will still cache the children inside tabs component, but not across whole dock layout
    // when cached == false, children are destroyed when not active
    const isRender = cached === false ? active : this.visited;

    let renderChildren: React.ReactNode = null;
    if (cached) {
      renderChildren = null;
    } else if (isRender || forceRender) {
      renderChildren = children;
    }

    let getRef = cached ? this.getRef : null;
    return (
      <div ref={getRef}
           id={cacheId}
           role="tabpanel"
           aria-labelledby={id && `${id}-tab-${tabKey}`}
           aria-hidden={!active}
           style={{...mergedStyle, ...style}}
           className={classNames(
             `${prefixCls}-tabpane`,
             active && `${prefixCls}-tabpane-active`,
             className,
           )}
      >
        {(active || this.visited || forceRender) && renderChildren}
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

