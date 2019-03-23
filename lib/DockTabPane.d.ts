import React from 'react';
interface DockTabPaneProps {
    className?: string;
    active?: boolean;
    style?: React.CSSProperties;
    destroyInactiveTabPane?: boolean;
    forceRender?: boolean;
    placeholder?: React.ReactNode;
    rootPrefixCls?: string;
    children?: React.ReactNode;
    tab: React.ReactNode;
    id?: string;
}
export default class DockTabPane extends React.PureComponent<DockTabPaneProps, any> {
    _isActived: boolean;
    render(): JSX.Element;
}
export {};
