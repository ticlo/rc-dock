import React from "react";
import { DragInitHandler } from "./dragdrop/DragInitiator";
interface DockTabBarProps {
    onDragMoveInit?: DragInitHandler;
    onHtmlDrag?: React.DragEventHandler;
    extraContent?: React.ReactElement;
}
export declare class DockTabBar extends React.PureComponent<DockTabBarProps, any> {
    render(): JSX.Element;
}
export {};
