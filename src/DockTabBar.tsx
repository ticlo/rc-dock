import React, {CSSProperties, ReactElement} from "react";
import SaveRef from 'rc-tabs/lib/SaveRef';
import ScrollableTabBarNode from 'rc-tabs/lib/ScrollableTabBarNode';
import TabBarTabsNode from 'rc-tabs/lib/TabBarTabsNode';
import InkTabBarNode from 'rc-tabs/lib/InkTabBarNode';
import {DragDropDiv} from "./dragdrop/DragDropDiv";
import * as DragManager from "./dragdrop/DragManager";


interface TabBarRootNodeProps {
  style?: CSSProperties;
  children: React.ReactElement;
  extraContent?: React.ReactElement;
  onKeyDown?: React.KeyboardEventHandler;
  saveRef: Function;
  onDragStart?: DragManager.DragHandler;
  onDragMove?: DragManager.DragHandler;
}

class DockTabBarRootNode extends React.PureComponent<TabBarRootNodeProps, any> {
  render() {
    const {
      onKeyDown, extraContent, style, children, onDragStart, onDragMove,
      ...restProps
    } = this.props;


    const tabBarExtraContentStyle = {float: 'right'};
    const extraContentStyle = (extraContent && extraContent.props) ? extraContent.props.style : {};
    let newChildren: React.ReactNode = children;
    if (extraContent) {
      newChildren = [
        React.cloneElement(extraContent, {
          key: 'extra',
          style: {
            ...tabBarExtraContentStyle,
            ...extraContentStyle,
          },
        }),
        React.cloneElement(children, {key: 'content'}),
      ];

    }
    return (
      <DragDropDiv onDragStartT={onDragStart}
                   onDragMoveT={onDragMove}
                   role="tablist"
                   className='dock-bar'
                   tabIndex={0}
                   getRef={this.props.saveRef('root')}
                   onKeyDown={onKeyDown}
                   style={style}
      >
        {newChildren}
      </DragDropDiv>
    );
  }
}

interface DockTabBarProps {
  onDragStart?: DragManager.DragHandler;
  onDragMove?: DragManager.DragHandler;
  extraContent?: React.ReactElement;
}

export class DockTabBar extends React.PureComponent<DockTabBarProps, any> {
  render() {
    const {children: renderTabBarNode, onDragStart, onDragMove, extraContent, ...restProps} = this.props;

    return (
      <SaveRef>
        {(saveRef: Function, getRef: Function) => (
          <DockTabBarRootNode saveRef={saveRef} onDragStart={onDragStart} onDragMove={onDragMove}
                              extraContent={extraContent} {...restProps}>
            <ScrollableTabBarNode saveRef={saveRef} getRef={getRef} {...restProps}>
              <TabBarTabsNode saveRef={saveRef} renderTabBarNode={renderTabBarNode} {...restProps} />
              <InkTabBarNode saveRef={saveRef} getRef={getRef} {...restProps} />
            </ScrollableTabBarNode>
          </DockTabBarRootNode>
        )}
      </SaveRef>
    );
  }
}