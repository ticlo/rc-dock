import React from 'react';
import ReactDOM from 'react-dom';
import classnames from 'classnames';

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
  id?: string;
  cached: boolean;
  // proxy the context to children
  contextValue?: any;
  contextType?: React.Context<any>;
}

export default class DockTabPane extends React.PureComponent<DockTabPaneProps, any> {

  _ref: HTMLDivElement;
  getRef = (r: HTMLDivElement) => {
    this._ref = r;
  };

  updateCache() {
    const {cached, children, id, contextValue, contextType} = this.props;
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
        this._cache.update(
          <Provider value={contextValue}>
            {children}
          </Provider>
        );
      } else {
        this._cache.update(children as React.ReactElement);
      }
    }
  }

  _isActived: boolean;

  _cache: TabPaneCache;

  render() {
    const {
      id, className, active, forceRender,
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
           id={id}>
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
      TabPaneCache.remove(this._cache.id, this);
    }
  }
}

class TabPaneCache {
  static _caches: Map<string, TabPaneCache> = new Map();

  static remove(id: string, pane: DockTabPane) {
    let cache = TabPaneCache._caches.get(id);
    if (cache && cache.pane === pane) {
      cache.pane = null;
      if (!TabPaneCache._pending) {
        // it could be reused by another component, so let's wait
        TabPaneCache._pending = setTimeout(TabPaneCache.destroyRemovedPane, 1);
      }
    }
  }

  static create(id: string, pane: DockTabPane) {
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

  static _pending: any;

  static destroyRemovedPane() {
    TabPaneCache._pending = null;
    for (let [id, cache] of TabPaneCache._caches) {
      if (cache.pane == null) {
        cache.destroy();
        TabPaneCache._caches.delete(id);
      }
    }
  }


  id: string;
  div: HTMLDivElement;
  pane: DockTabPane;
  node: React.ReactElement;

  update(node: React.ReactElement) {
    if (node !== this.node) {
      this.node = node;
      ReactDOM.render(node, this.div);
    }
  }

  destroy() {
    ReactDOM.unmountComponentAtNode(this.div);
  }
}
