import React, { CSSProperties } from "react";
import { DragInitHandler } from "./DragInitiator";
interface TabBarRootNodeProps {
    style?: CSSProperties;
    children: React.ReactElement;
    extraContent?: React.ReactElement;
    onKeyDown?: React.KeyboardEventHandler;
    saveRef: Function;
    onDragMoveInit?: DragInitHandler;
    onHtmlDrag?: React.DragEventHandler;
}
export declare class DockTabBarRootNode extends React.PureComponent<TabBarRootNodeProps, any> {
    render(): JSX.Element;
}
interface DockTabBarProps {
    onDragMoveInit?: DragInitHandler;
    onHtmlDrag?: React.DragEventHandler;
}
export declare class DockTabBar extends React.PureComponent<DockTabBarProps, any> {
    render(): JSX.Element;
}
export {};
