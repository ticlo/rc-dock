import * as React from "react";
import {DragDropDiv} from "./dragdrop/DragDropDiv";
import * as DragManager from "./dragdrop/DragManager";
import type {TabNavListProps} from "@rc-component/tabs/lib/TabNavList";
import {DockContextType} from "./DockData";

/**
 * @return returns true if navigation is handled in local tab move, otherwise returns false
 */
function checkLocalTabMove(key: string, tabbar: HTMLDivElement): boolean {
  if (key === 'ArrowLeft' || key === 'ArrowRight') {
    let tabs = Array.from(tabbar.querySelectorAll('.dock-tab-btn'));
    let activeTab = tabbar.querySelector('.dock-tab-active>.dock-tab-btn');
    let i = tabs.indexOf(activeTab);
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
  isMaximized: boolean;
  onDragStart?: DragManager.DragHandler;
  onDragMove?: DragManager.DragHandler;
  onDragEnd?: DragManager.DragHandler;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
  TabNavList: React.ComponentType<TabNavListProps>;
}

export function DockTabBar(props: DockTabBarProps) {
  const {
    onDragStart, onDragMove, onDragEnd, onClick, TabNavList, isMaximized,
    ...restProps
  } = props;

  const layout = React.useContext(DockContextType);

  const ref = React.useRef<HTMLDivElement>();
  const dragged = React.useRef(false);
  const getRef = (div: HTMLDivElement) => {
    ref.current = div;
  };

  const resetDrag = () => { dragged.current = false; };
  const onHeaderDragStart: DragManager.DragHandler = (event) => {
    dragged.current = true;
    onDragStart(event);
  };
  const onHeaderClick: React.MouseEventHandler<HTMLDivElement> = (event) => {
    if (!dragged.current) onClick(event);
  };


  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key.startsWith('Arrow')) {
      if (!checkLocalTabMove(e.key, ref.current) && !isMaximized) {
        layout.navigateToPanel(ref.current, e.key);
      }
      e.stopPropagation();
      e.preventDefault();
    }
  };

  return (
    <DragDropDiv onDragStartT={onClick && onDragStart ? onHeaderDragStart : onDragStart}
                 onDragMoveT={onDragMove}
                 onDragEndT={onDragEnd}
                 onMouseDownCapture={onClick ? resetDrag : undefined}
                 onTouchStartCapture={onClick ? resetDrag : undefined}
                 onClick={onClick ? onHeaderClick : undefined}
                 role="tablist"
                 className="dock-bar"
                 onKeyDown={onKeyDown}
                 getRef={getRef}
                 tabIndex={-1}
    >
      <TabNavList {...restProps}/>
    </DragDropDiv>
  );
}
