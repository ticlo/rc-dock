import React from 'react';
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
    id?: string;
    cached: boolean;
}
export default class DockTabPane extends React.PureComponent<DockTabPaneProps, any> {
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
declare class TabPaneCache {
    static _caches: Map<string, TabPaneCache>;
    static remove(id: string, pane: DockTabPane): void;
    static create(id: string, pane: DockTabPane): TabPaneCache;
    static _pending: any;
    static destroyRemovedPane(): void;
    id: string;
    div: HTMLDivElement;
    pane: DockTabPane;
    node: React.ReactElement;
    update(node: React.ReactElement): void;
    destroy(): void;
}
export {};
