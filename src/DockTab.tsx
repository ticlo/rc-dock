import React from "react";
import {DockContext, PanelData, TabData, TabGroup} from "./DockData";
import {compareChildKeys, compareKeys} from "./util/Compare";
import Tabs, {TabPane} from 'rc-tabs';
import TabContent from 'rc-tabs/lib/TabContent';
import ScrollableInkTabBar from 'rc-tabs/lib/ScrollableInkTabBar';

export class DockTab {

  static readonly usedDataKeys = ['id', 'title', 'group', 'content'];
  data: TabData;
  context: DockContext;
  content: React.ReactNode;

  constructor(context: DockContext) {
    this.context = context;
  }

  setData(data: TabData) {
    if (!compareKeys(data, this.data, DockTab.usedDataKeys)) {
      this.data = data;
      this.content = this.render();
      return true;
    }
    return false;
  }

  onCloseClick = (e: React.MouseEvent) => {
    e.stopPropagation();

  };
  onDragStart = (e: React.DragEvent) => {

  };
  onDragOver = (e: React.DragEvent) => {

  };
  onDrop = (e: React.DragEvent) => {

  };

  render(): React.ReactNode {
    let {id, title, group, content} = this.data;
    let {closable, tabLocked} = group;
    if (typeof content === 'function') {
      content = content();
    }
    return (
      <TabPane key={id} tab={
        <span draggable={!tabLocked} onDrag={this.onDragStart} onDragOver={this.onDragOver} onDrop={this.onDrop}>
          {title}
          {closable ?
            <a className='dock-tabs-tab-close-btn' onClick={this.onCloseClick}>x</a>
            : null}

        </span>
      }>
        {content}
      </TabPane>
    );
  }

  destroy() {

  }
}

interface DockTabsProps {
  panelData: PanelData;
}

export class DockTabs extends React.Component<DockTabsProps, any> {
  static readonly propKeys = ['group', 'activeId', 'onTabChange'];

  context!: DockContext;
  _cache: Map<string, DockTab> = new Map();

  constructor(props: DockTabsProps) {
    super(props);
    this.updateTabs(props.panelData.tabs);
  }

  updateTabs(tabs: TabData[]) {
    let newCache = new Map<string, DockTab>();
    let reused = 0;
    for (let tabData of tabs) {
      let {id} = tabData;
      if (this._cache.has(id)) {
        let tab = this._cache.get(id);
        newCache.set(id, tab);
        tab.setData(tabData);
        ++reused;
      } else {
        let tab = new DockTab(this.context);
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

  shouldComponentUpdate(nextProps: Readonly<DockTabsProps>, nextState: Readonly<any>, nextContext: any): boolean {
    let {tabs} = nextProps.panelData;

    // update tab cache
    if (!compareChildKeys(tabs, this.props.panelData.tabs, DockTab.usedDataKeys)) {
      this.updateTabs(tabs);
      return true;
    }
    return !compareKeys(this.props, nextProps, DockTabs.propKeys);
  }

  renderTabBar = () => (
    <ScrollableInkTabBar
      // extraContent={
      //   <button onClick={this.add}>+添加</button>
      // }
    />
  );
  renderTabContent = () => <TabContent/>;

  onTabChange = (activeId: string) => {
    this.props.panelData.activeId = activeId;
    this.forceUpdate();
  };

  render(): React.ReactNode {
    let {group, activeId, minWidth, minHeight, size} = this.props.panelData;
    let {closable, tabLocked} = group;

    let children: React.ReactNode[] = [];
    for (let [id, tab] of this._cache) {
      children.push(tab.content);
    }

    return (
      <Tabs prefixCls='dock-tabs' style={{minWidth, minHeight, flex: `1 1 ${size}px`}}
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