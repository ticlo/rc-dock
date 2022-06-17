import React from "react";
import { BoxData, DockContext, DockContextType } from "./DockData";
import {DockPanel} from "./DockPanel";
import classNames from "classnames";

interface Props {
  boxData: BoxData;
}

export class FloatBox extends React.PureComponent<Props, any> {
  static contextType = DockContextType;

  context!: DockContext;

  render(): React.ReactNode {
    let {children} = this.props.boxData;

    let childrenRender: React.ReactNode[] = [];
    for (let child of children) {
      if ('tabs' in child) {
        childrenRender.push(<DockPanel size={child.size} panelData={child} key={child.id}/>);
      }
    }

    return (
      <div className={classNames("dock-box dock-fbox", this.context.getClassName())}>
        {childrenRender}
      </div>
    );
  }
}
