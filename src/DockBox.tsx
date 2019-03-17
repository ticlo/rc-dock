import React from "react";
import {BoxData, PanelData, TabGroup} from "./DockData";
import {DockTabs} from "./DockTabs";
import {Divider, DividerChild} from "./Divider";
import {DockPanel} from "./DockPanel";

interface Props {
  size: number;
  boxData: BoxData;
}

export class DockBox extends React.PureComponent<Props, any> {
  _ref: HTMLDivElement;
  getRef = (r: HTMLDivElement) => {
    this._ref = r;
  };

  getDividerData = (idx: number) => {
    if (this._ref) {
      let {children, mode} = this.props.boxData;
      let nodes = this._ref.childNodes;
      if (nodes.length === children.length * 2 - 1) {
        let dividerChildren: DividerChild[] = [];
        for (let i = 0; i < children.length; ++i) {
          if (mode === 'vertical') {
            dividerChildren.push({size: (nodes[i * 2] as HTMLElement).offsetHeight, minSize: children[i].minHeight});
          } else {
            dividerChildren.push({size: (nodes[i * 2] as HTMLElement).offsetWidth, minSize: children[i].minWidth});
          }
        }
        return {
          element: this._ref,
          beforeDivider: dividerChildren.slice(0, idx),
          afterDivider: dividerChildren.slice(idx)
        };
      }
    }
    return null;
  };
  changeSizes = (sizes: number[]) => {
    let {children} = this.props.boxData;
    if (children.length === sizes.length) {
      for (let i = 0; i < children.length; ++i) {
        children[i].size = sizes[i];
      }
      this.forceUpdate();
    }
  };

  render(): React.ReactNode {
    let {boxData} = this.props;
    let {minWidth, minHeight, size, children, mode, id} = boxData;

    let childrenRender: React.ReactNode[] = [];
    for (let i = 0; i < children.length; ++i) {
      if (i > 0) {
        childrenRender.push(
          <Divider idx={i} key={i} getDividerData={this.getDividerData} changeSizes={this.changeSizes}/>
        );
      }
      let child = children[i];
      if ('tabs' in child) {
        childrenRender.push(<DockPanel size={child.size} panelData={child} key={child.id}/>);
        // render DockPanel
      } else if ('children' in child) {
        childrenRender.push(<DockBox size={child.size} boxData={child} key={child.id}/>);
      }
    }
    let cls: string;
    if (mode === 'vertical') {
      cls = 'dock-box dock-vbox';
    } else {
      cls = 'dock-box dock-hbox';
    }
    return (
      <div ref={this.getRef} className={cls} data-dockid={id}
           style={{minWidth, minHeight, flex: `1 1 ${size}px`}}>
        {childrenRender}
      </div>
    );
  }
}