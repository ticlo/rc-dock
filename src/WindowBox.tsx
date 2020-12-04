import React from "react";
import {BoxData} from "./DockData";
import {WindowPanel} from "./WindowPanel";

interface Props {
  boxData: BoxData;
}

export class WindowBox extends React.PureComponent<Props, any> {

  static enabled = window.navigator.platform === 'Win32' || window.navigator.platform === 'MacIntel';

  render(): React.ReactNode {
    let {children} = this.props.boxData;

    let childrenRender: React.ReactNode[] = [];
    for (let child of children) {
      if ('tabs' in child) {
        childrenRender.push(
          <WindowPanel key={child.id} panelData={child}/>
        );
      }
    }

    return (
      <>
        {childrenRender}
      </>
    );
  }
}
