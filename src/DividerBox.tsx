import * as React from "react";
import {DockContext, DockContextType} from "./DockData";
import {Divider, DividerChild} from "./Divider";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  mode?: 'horizontal' | 'vertical';
}

export class DividerBox extends React.PureComponent<Props, any> {
  static contextType = DockContextType;

  context!: DockContext;

  _ref: HTMLDivElement;
  getRef = (r: HTMLDivElement) => {
    this._ref = r;
  };

  getDividerData = (idx: number) => {
    if (!this._ref) {
      return null;
    }
    let {children, mode} = this.props;
    let nodes = this._ref.childNodes;
    let length = 1;
    if (Array.isArray(children)) {
      length = children.length;
    }
    if (nodes.length !== length * 2 - 1) {
      return;
    }
    let dividerChildren: DividerChild[] = [];
    for (let i = 0; i < length; ++i) {
      if (mode === 'vertical') {
        dividerChildren.push({size: (nodes[i * 2] as HTMLElement).offsetHeight});
      } else {
        dividerChildren.push({size: (nodes[i * 2] as HTMLElement).offsetWidth});
      }
    }
    return {
      element: this._ref,
      beforeDivider: dividerChildren.slice(0, idx),
      afterDivider: dividerChildren.slice(idx)
    };
  };
  changeSizes = (sizes: number[]) => {
    let {mode} = this.props;
    let nodes = this._ref.childNodes;
    if (nodes.length === sizes.length * 2 - 1) {
      for (let i = 0; i < sizes.length; ++i) {
        if (mode === 'vertical') {
          (nodes[i * 2] as HTMLElement).style.height = `${sizes[i]}px`;
        } else {
          (nodes[i * 2] as HTMLElement).style.width = `${sizes[i]}px`;
        }
      }
      this.forceUpdate();
    }
  };


  render(): React.ReactNode {
    let {children, mode, className, ...others} = this.props;
    let isVertical = mode === 'vertical';
    let childrenRender: React.ReactNode = [];
    if (Array.isArray((children))) {
      for (let i = 0; i < children.length; ++i) {
        if (i > 0) {
          (childrenRender as any[]).push(
            <Divider idx={i} key={i} isVertical={isVertical}
                     getDividerData={this.getDividerData} changeSizes={this.changeSizes}/>
          );
        }
        (childrenRender as any[]).push(children[i]);
      }
    } else {
      childrenRender = children;
    }

    let cls: string;
    if (mode === 'vertical') {
      cls = 'divider-box dock-vbox';
    } else {
      cls = 'divider-box dock-hbox';
    }
    if (className) {
      cls = `${cls} ${className}`;
    }
    return (
      <div ref={this.getRef} className={cls} {...others}>
        {childrenRender}
      </div>
    );
  }
}