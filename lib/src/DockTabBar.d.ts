import React, { CSSProperties } from "react";
interface TabBarRootNodeProps {
    style?: CSSProperties;
    children: React.ReactElement;
    extraContent?: React.ReactElement;
    onKeyDown?: React.KeyboardEventHandler;
    saveRef: Function;
}
export declare class DockTabBarRootNode extends React.PureComponent<TabBarRootNodeProps, any> {
    render(): JSX.Element;
}
export declare class DockTabBar extends React.PureComponent<any, any> {
    render(): JSX.Element;
}
export {};
