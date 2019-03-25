import React, {CSSProperties, ReactElement} from "react";
import SaveRef from 'rc-tabs/lib/SaveRef';
import ScrollableTabBarNode from 'rc-tabs/lib/ScrollableTabBarNode';
import TabBarTabsNode from 'rc-tabs/lib/TabBarTabsNode';
import InkTabBarNode from 'rc-tabs/lib/InkTabBarNode';
import {DragInitHandler, DragInitiator} from "./DragInitiator";


interface TabBarRootNodeProps {
  style?: CSSProperties;
  children: React.ReactElement;
  extraContent?: React.ReactElement;
  onKeyDown?: React.KeyboardEventHandler;
  saveRef: Function;
  onDragMoveInit?: DragInitHandler;
  onHtmlDrag?: React.DragEventHandler;
}

export class DockTabBarRootNode extends React.PureComponent<TabBarRootNodeProps, any> {
  render() {
    const {
      onKeyDown, extraContent, style, children, onDragMoveInit, onHtmlDrag,
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
      <DragInitiator onDragInit={onDragMoveInit}
                     onDrag={onHtmlDrag} draggable={onHtmlDrag != null}
                     role="tablist"
                     className='dock-bar'
                     tabIndex={0}
                     ref={this.props.saveRef('root')}
                     onKeyDown={onKeyDown}
                     style={style}
      >
        {newChildren}
      </DragInitiator>
    );
  }
}

interface DockTabBarProps {
  onDragMoveInit?: DragInitHandler;
  onHtmlDrag?: React.DragEventHandler;
}

export class DockTabBar extends React.PureComponent<DockTabBarProps, any> {
  render() {
    const {children: renderTabBarNode, onDragMoveInit, onHtmlDrag, ...restProps} = this.props;

    return (
      <SaveRef>
        {(saveRef: Function, getRef: Function) => (
          <DockTabBarRootNode saveRef={saveRef} onDragMoveInit={onDragMoveInit} onHtmlDrag={onHtmlDrag} {...restProps}>
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