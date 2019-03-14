declare module 'rc-tabs' {
  import React from 'react';

  interface TabsProps {
    style?: React.CSSProperties;
    prefixCls?: string;
    renderTabBar?: () => React.ReactNode;
    renderTabContent?: () => React.ReactNode;
    activeKey?: string;
    onChange: (key: string) => void;
  }

  export default class Tabs extends React.Component<TabsProps, any> {

  }

  interface TabsPaneProps extends React.HTMLAttributes<HTMLDivElement> {
    tab: React.ReactNode;
  }

  export class TabPane extends React.Component<TabsPaneProps, any> {

  }
}

declare module 'rc-tabs/lib/TabContent' {
  import React from 'react';
  export default class TabContent extends React.Component <any, any> {
  }
}

declare module 'rc-tabs/lib/ScrollableInkTabBar' {
  import React from 'react';
  export default class ScrollableInkTabBar extends React.Component <any, any> {
  }
}