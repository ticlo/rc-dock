declare module 'rc-tabs' {
  import React from 'react';

  interface TabsProps extends React.HTMLAttributes<HTMLDivElement> {

  }

  export default class Tabs extends React.Component<TabsProps, any> {

  }

  interface TabsPaneProps extends React.HTMLAttributes<HTMLDivElement> {
    tab: React.ReactNode;
  }

  export class TabPane extends React.Component<TabsPaneProps, any> {

  }
}

