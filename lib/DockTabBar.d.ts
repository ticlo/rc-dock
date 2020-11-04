/// <reference types="react" />
import * as DragManager from "./dragdrop/DragManager";
import { TabNavListProps } from "rc-tabs/lib/TabNavList";
interface DockTabBarProps extends TabNavListProps {
    onDragStart?: DragManager.DragHandler;
    onDragMove?: DragManager.DragHandler;
    onDragEnd?: DragManager.DragHandler;
}
export declare function DockTabBar(props: DockTabBarProps): JSX.Element;
export {};
