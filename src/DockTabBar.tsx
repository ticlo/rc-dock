import React, {CSSProperties, ReactElement} from "react";
import {DragDropDiv} from "./dragdrop/DragDropDiv";
import * as DragManager from "./dragdrop/DragManager";
import type {TabNavListProps} from "rc-tabs/lib/TabNavList";

interface DockTabBarProps  extends TabNavListProps {
  onDragStart?: DragManager.DragHandler;
  onDragMove?: DragManager.DragHandler;
  onDragEnd?: DragManager.DragHandler;
  TabNavList: React.ComponentType;
}

export function DockTabBar (props: DockTabBarProps) {
  const {
    onDragStart, onDragMove, onDragEnd, TabNavList,
    ...restProps
  } = props;
  return (
    <DragDropDiv onDragStartT={onDragStart}
                 onDragMoveT={onDragMove}
                 onDragEndT={onDragEnd}
                 role="tablist"
                 className='dock-bar'
    >
      <TabNavList {...restProps}/>
    </DragDropDiv>
  );
}
