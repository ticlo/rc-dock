import React from "react";
import {TabPane} from 'rc-tabs';
import {DockContext, TabData, TabGroup} from "./DockData";
import {compareKeys} from "./util/Compare";


export class DockTab {

  data: TabData;
  context: DockContext;
  content: React.ReactNode;

  constructor(context: DockContext) {
    this.context = context;
  }

  setData(data: TabData) {
    if (!compareKeys(data, this.data, ['id', 'title', 'group', 'content'])) {
      this.data = data;
      this.content = this.render();
    }
  }

  onCloseClick = (e: React.MouseEvent) => {

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
        ${content}
      </TabPane>
    );
  }
}

export interface DockTabsProps {
  tabs: TabData[];
  group: TabGroup;
}

export class DockTabs extends React.PureComponent<DockTabsProps, any> {
  render(): React.ReactNode {
    let {tabs, group} = this.data;
    let {closable, tabLocked} = group;
    if (typeof content === 'function') {
      content = content();
    }
    return (
      <TabPane tab={
        <span draggable={!tabLocked} onDrag={this.onDragStart} onDragOver={this.onDragOver} onDrop={this.onDrop}>
          {title}
          {closable ?
            <a className='dock-tabs-tab-close-btn' onClick={this.onCloseClick}>x</a>
            : null}

        </span>
      }>
        ${content}
      </TabPane>
    );
  }
}