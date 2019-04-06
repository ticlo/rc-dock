import React from "react";
import {DockContext, DockContextType, DropDirection, PanelData, TabData, TabGroup} from "./DockData";
import {compareArray, compareKeys} from "./util/Compare";
import Tabs from 'rc-tabs';
import TabContent from 'rc-tabs/lib/TabContent';
import ScrollableInkTabBar from 'rc-tabs/lib/ScrollableInkTabBar';
import {DragManager} from "./dragdrop/DragManager";
import {DragInitFunction, DragInitHandler, DragDropDiv} from "./dragdrop/DragDropDiv";
import {DockTabBar} from "./DockTabBar";
import DockTabPane, {getContextPaneClass} from "./DockTabPane";

export class TabCache {

  _ref: HTMLDivElement;
  getRef = (r: HTMLDivElement) => {
    this._ref = r;
  };

  _hitAreaRef: HTMLDivElement;
  getHitAreaRef = (r: HTMLDivElement) => {
    this._hitAreaRef = r;
  };

  data: TabData;
  context: DockContext;
  content: React.ReactElement;

  constructor(context: DockContext) {
    this.context = context;
  }

  setData(data: TabData) {
    if (data !== this.data) {
      this.data = data;
      this.content = this.render();
      return true;
    }
    return false;
  }

  onCloseClick = (e: React.MouseEvent) => {
    this.context.dockMove(this.data, null, 'remove');
    e.stopPropagation();
  };
  onDragStart = (e: React.DragEvent) => {
    DragManager.dragStart(DockContextType, {tab: this.data}, e.nativeEvent, this._hitAreaRef);
    e.stopPropagation();
  };
  onDragOver = (e: React.DragEvent) => {
    let tab: TabData = DragManager.getData(DockContextType, 'tab');
    if (tab && tab !== this.data && tab.group === this.data.group) {
      let direction = this.getDropDirection(e);
      this.context.setDropRect(this._hitAreaRef, direction, this);
      e.dataTransfer.dropEffect = 'move';
      e.preventDefault();
      e.stopPropagation();
    }
  };
  onDragLeave = (e: React.DragEvent) => {
    this.context.setDropRect(null, 'remove', this);
  };
  onDrop = (e: React.DragEvent) => {
    let tab: TabData = DragManager.getData(DockContextType, 'tab');
    if (tab && tab !== this.data && tab.group === this.data.group) {
      let direction = this.getDropDirection(e);
      this.context.dockMove(tab, this.data, direction);
    }
  };

  getDropDirection(e: React.DragEvent): DropDirection {
    let rect = this._hitAreaRef.getBoundingClientRect();
    let midx = rect.left + rect.width * 0.5;
    return e.clientX > midx ? 'after-tab' : 'before-tab';
  }

  render(): React.ReactElement {
    let {id, title, group, content, closable, cached, cacheContext} = this.data;
    let tabGroup = this.context.getGroup(group);
    let {tabLocked} = tabGroup;
    if (typeof content === 'function') {
      content = content(this.data);
    }
    let tab = (
      <div ref={this.getRef}>
        {title}
        <div className='dock-tab-hit-area' ref={this.getHitAreaRef} draggable={!tabLocked}
             onDragStart={this.onDragStart}
             onDragOver={this.onDragOver} onDrop={this.onDrop} onDragLeave={this.onDragLeave}>
          {closable ?
            <a className='dock-tab-close-btn' onClick={this.onCloseClick}>x</a>
            : null
          }
        </div>
      </div>
    );
    if (cacheContext) {
      // allow DockTabPane to receive context
      let DockTabPaneClass = getContextPaneClass(cacheContext);
      return (
        <DockTabPaneClass key={id} id={id} cached={cached} tab={tab}>
          {content}
        </DockTabPaneClass>
      );
    } else {
      return (
        <DockTabPane key={id} id={id} cached={cached} tab={tab}>
          {content}
        </DockTabPane>
      );
    }
  }

  destroy() {
    // place holder
  }
}

interface Props {
  panelData: PanelData;
  onPanelHeaderDragInit: DragInitHandler;
  onPanelHeaderHtmlDrag: React.DragEventHandler;
}

interface State {

}

export class DockTabs extends React.Component<Props, any> {
  static contextType = DockContextType;

  static readonly propKeys = ['group', 'tabs', 'activeId', 'onTabChange'];

  context!: DockContext;
  _cache: Map<string, TabCache> = new Map();

  constructor(props: Props, context: any) {
    super(props, context);
    this.updateTabs(props.panelData.tabs);
  }

  updateTabs(tabs: TabData[]) {
    let newCache = new Map<string, TabCache>();
    let reused = 0;
    for (let tabData of tabs) {
      let {id} = tabData;
      if (this._cache.has(id)) {
        let tab = this._cache.get(id);
        newCache.set(id, tab);
        tab.setData(tabData);
        ++reused;
      } else {
        let tab = new TabCache(this.context);
        newCache.set(id, tab);
        tab.setData(tabData);
      }
    }
    if (reused !== this._cache.size) {
      for (let [id, tab] of this._cache) {
        if (!newCache.has(id)) {
          tab.destroy();
        }
      }
    }
    this._cache = newCache;
  }

  shouldComponentUpdate(nextProps: Readonly<Props>, nextState: Readonly<any>, nextContext: any): boolean {
    let {tabs} = nextProps.panelData;

    // update tab cache
    if (!compareArray(tabs, this.props.panelData.tabs)) {
      this.updateTabs(tabs);
      return true;
    }
    return !compareKeys(this.props, nextProps, DockTabs.propKeys);
  }

  renderTabBar = () => {
    let {panelData} = this.props;
    let {group: groupName, panelLock} = panelData;
    let group = this.context.getGroup(groupName);
    let {panelExtra} = group;

    if (panelLock) {
      if (panelLock.panelExtra) {
        panelExtra = panelLock.panelExtra;
      }
    }

    let panelExtraContent: React.ReactElement;
    if (panelExtra) {
      panelExtraContent = panelExtra(panelData, this.context);
    }
    return (
      <DockTabBar extraContent={panelExtraContent}
                  onDragMoveInit={this.props.onPanelHeaderDragInit} onHtmlDrag={this.props.onPanelHeaderHtmlDrag}/>
    );
  };

  renderTabContent = () => {
    let {group} = this.props.panelData;
    let tabGroup = this.context.getGroup(group);
    let {animated} = tabGroup;
    return <TabContent animated={animated}/>;
  };

  onTabChange = (activeId: string) => {
    this.props.panelData.activeId = activeId;
    this.forceUpdate();
  };

  render(): React.ReactNode {
    let {group, activeId} = this.props.panelData;

    let children: React.ReactNode[] = [];
    for (let [id, tab] of this._cache) {
      children.push(tab.content);
    }

    return (
      <Tabs prefixCls='dock'
            renderTabBar={this.renderTabBar}
            renderTabContent={this.renderTabContent}
            activeKey={activeId}
            onChange={this.onTabChange}
      >
        {children}
      </Tabs>
    );
  }
}