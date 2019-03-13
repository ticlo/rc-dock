import React from "react";
import {TabPane} from 'rc-tabs';
import {TabData, TabGroup} from "./DockData";


export interface DockTabProps {
  title: string;
  content: React.ReactNode | (() => React.ReactNode);
  group: TabGroup;
}

export class DockTab {

  data: TabData;

  constructor(context) {

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
    let {title, group, content} = this.props;
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