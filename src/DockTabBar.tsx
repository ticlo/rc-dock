import React, {useContext} from "react";
import {DragDropDiv} from "./dragdrop/DragDropDiv";
import * as DragManager from "./dragdrop/DragManager";
import type {TabNavListProps} from "rc-tabs/lib/TabNavList";
import {DockContextType} from "./DockData";

/**
 * @return returns true if navigation is handled in local tab move, otherwise returns false
 */
function checkLocalTabMove(key: string, tabbar: HTMLDivElement, tabBtn: HTMLElement): boolean {
  if (key === 'ArrowLeft' || key === 'ArrowRight') {
    let tabs = Array.from(tabbar.querySelectorAll('.dock-tab-btn'));
    let i = tabs.indexOf(tabBtn);
    if (i >= 0) {
      if (key === 'ArrowLeft') {
        if (i > 0) {
          (tabs[i - 1] as HTMLElement).click();
          (tabs[i - 1] as HTMLElement).focus();
          return true;
        }
      } else {
        if (i < tabs.length - 1) {
          (tabs[i + 1] as HTMLElement).click();
          (tabs[i + 1] as HTMLElement).focus();
          return true;
        }
      }
    }
  }
  return false;
}


interface DockTabBarProps extends TabNavListProps {
  panelId: string,
  onDragStart?: DragManager.DragHandler;
  onDragMove?: DragManager.DragHandler;
  onDragEnd?: DragManager.DragHandler;
  TabNavList: React.ComponentType;
}

export function DockTabBar(props: DockTabBarProps) {
  const {
    panelId, onDragStart, onDragMove, onDragEnd, TabNavList,
    ...restProps
  } = props;

  const layout = React.useContext(DockContextType);

  const ref = React.useRef<HTMLDivElement>();
  const getRef = (div: HTMLDivElement) => {
    ref.current = div;
  };


  const onKeyDown = (e: React.KeyboardEvent) => {
    let tabBtn = e.target as HTMLElement;

    if (tabBtn.classList.contains('dock-tab-btn') && e.key.startsWith('Arrow')) {
      if (!checkLocalTabMove(e.key, ref.current, tabBtn)) {
        layout.navigateToPanel(tabBtn, e.key);
      }
      e.stopPropagation();
      e.preventDefault();
    }
  };

  return (
    <DragDropDiv onDragStartT={onDragStart}
                 onDragMoveT={onDragMove}
                 onDragEndT={onDragEnd}
                 role="tablist"
                 className="dock-bar"
                 onKeyDown={onKeyDown}
                 getRef={getRef}
    >
      <TabNavList {...restProps}/>
    </DragDropDiv>
  );
}
