import * as React from 'react';
import { DockContext, TabPaneCache } from "./DockData";
import { TabPaneProps } from "rc-tabs";
interface DockTabPaneProps extends TabPaneProps {
    cacheId?: string;
    cached: boolean;
}
export default class DockTabPane extends React.PureComponent<DockTabPaneProps, any> {
    static contextType: React.Context<DockContext>;
    context: DockContext;
    _ref: HTMLDivElement;
    getRef: (r: HTMLDivElement) => void;
    updateCache(): void;
    visited: boolean;
    _cache: TabPaneCache;
    render(): JSX.Element;
    componentDidMount(): void;
    componentDidUpdate(prevProps: Readonly<DockTabPaneProps>, prevState: Readonly<any>, snapshot?: any): void;
    componentWillUnmount(): void;
}
export {};
