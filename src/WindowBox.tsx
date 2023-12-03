import * as React from "react";
import {BoxData, PanelData} from "./DockData";
import {WindowPanel} from "./WindowPanel";

interface Props {
  boxData: BoxData;
  onWindowOpened?(panel: PanelData, window: Window): void;
  onWindowClosing?(panel: PanelData, window: Window): void;
}

export class WindowBox extends React.PureComponent<Props, any> {

  static enabled = typeof window === 'object' && (window?.navigator.platform === 'Win32' || window?.navigator.platform === 'MacIntel');

  render(): React.ReactNode {
    let {children} = this.props.boxData;
    let {onWindowOpened, onWindowClosing} = this.props;

    let childrenRender: React.ReactNode[] = [];
    for (let child of children) {
      if ('tabs' in child) {
        childrenRender.push(
          <WindowPanel key={child.id} panelData={child} onWindowOpened={onWindowOpened} onWindowClosing={onWindowClosing}/>
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
