import * as React from "react";
import * as DragManager from "./dragdrop/DragManager";
import type { TabNavListProps } from "@rc-component/tabs/lib/TabNavList";
interface DockTabBarProps extends TabNavListProps {
    isMaximized: boolean;
    onDragStart?: DragManager.DragHandler;
    onDragMove?: DragManager.DragHandler;
    onDragEnd?: DragManager.DragHandler;
    TabNavList: React.ComponentType<TabNavListProps>;
}
export declare function DockTabBar(props: DockTabBarProps): React.JSX.Element;
export {};
