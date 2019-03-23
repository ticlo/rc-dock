declare module 'rc-tabs' {
  import React from 'react';

  interface TabsProps {
    style?: React.CSSProperties;
    prefixCls?: string;
    renderTabBar?: () => React.ReactNode;
    renderTabContent?: () => React.ReactNode;
    activeKey?: string;
    destroyInactiveTabPane?: boolean;
    onChange: (key: string) => void;
  }

  export default class Tabs extends React.Component<TabsProps, any> {

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

declare module 'rc-tabs/lib/SaveRef' {
  import React from 'react';
  export default class SaveRef extends React.Component <any, any> {
  }
}

declare module 'rc-tabs/lib/ScrollableTabBarNode' {
  import React from 'react';
  export default class ScrollableTabBarNode extends React.Component <any, any> {
  }
}
declare module 'rc-tabs/lib/TabBarTabsNode' {
  import React from 'react';
  export default class TabBarTabsNode extends React.Component <any, any> {
  }
}
declare module 'rc-tabs/lib/InkTabBarNode' {
  import React from 'react';
  export default class InkTabBarNode extends React.Component <any, any> {
  }
}
