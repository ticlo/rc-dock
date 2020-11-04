import React, {CSSProperties, ReactElement} from "react";
import {DragDropDiv} from "./dragdrop/DragDropDiv";
import * as DragManager from "./dragdrop/DragManager";
import TabNavList, {TabNavListProps} from "rc-tabs/lib/TabNavList";

interface DockTabBarProps  extends TabNavListProps {
  onDragStart?: DragManager.DragHandler;
  onDragMove?: DragManager.DragHandler;
  onDragEnd?: DragManager.DragHandler;
}

export function DockTabBar (props: DockTabBarProps){
  const {
    onDragStart, onDragMove, onDragEnd,
    ...restProps
  } = props;
  return (
    <DragDropDiv onDragStartT={onDragStart}
                 onDragMoveT={onDragMove}
                 onDragEndT={onDragEnd}
                 role="tablist"
                 className='dock-bar'
                 tabIndex={0}
    >
      <TabNavList {...restProps}/>
    </DragDropDiv>
  );
}
