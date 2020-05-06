import React from 'react';
import { DockContext, TabPaneCache } from "./DockData";
interface DockTabPaneProps {
    className?: string;
    active?: boolean;
    style?: React.CSSProperties;
    destroyInactiveTabPane?: boolean;
    forceRender?: boolean;
    placeholder?: React.ReactNode;
    rootPrefixCls?: string;
    children?: React.ReactElement;
    tab: React.ReactNode;
    cacheId?: string;
    cached: boolean;
}
export default class DockTabPane extends React.PureComponent<DockTabPaneProps, any> {
    static contextType: React.Context<DockContext>;
    context: DockContext;
    _ref: HTMLDivElement;
    getRef: (r: HTMLDivElement) => void;
    updateCache(): void;
    _isActived: boolean;
    _cache: TabPaneCache;
    render(): JSX.Element;
    componentDidMount(): void;
    componentDidUpdate(prevProps: Readonly<DockTabPaneProps>, prevState: Readonly<any>, snapshot?: any): void;
    componentWillUnmount(): void;
}
export {};
