import React from "react";
import * as DragManager from "./dragdrop/DragManager";
interface DockTabBarProps {
    onDragStart?: DragManager.DragHandler;
    onDragMove?: DragManager.DragHandler;
    extraContent?: React.ReactElement;
}
export declare class DockTabBar extends React.PureComponent<DockTabBarProps, any> {
    render(): JSX.Element;
}
export {};
