import React from "react";
import {BoxData, DockContext, DockContextType} from "./DockData";
import {Divider, DividerChild} from "./Divider";
import {DockPanel} from "./DockPanel";
import classNames from "classnames";

interface Props {
  size: number;
  boxData: BoxData;
  preferredWidth?: number;
  preferredHeight?: number;
}

export class DockBox extends React.PureComponent<Props, any> {
  static contextType = DockContextType;

  context!: DockContext;

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
          const child = children[i];
          if (mode === 'vertical') {
            dividerChildren.push({size: (nodes[i * 2] as HTMLElement).offsetHeight, minSize: child.minHeight, collapsed: child.collapsed});
          } else {
            dividerChildren.push({size: (nodes[i * 2] as HTMLElement).offsetWidth, minSize: child.minWidth, collapsed: child.collapsed});
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

  setIgnorePreferredSize = (idx: number) => {
    if (!this._ref) {
      return;
    }

    let {children} = this.props.boxData;
    let nodes = this._ref.childNodes;
    if (nodes.length === children.length * 2 - 1) {
      const leftChild = children[idx - 1];
      const rightChild = children[idx];

      leftChild.ignorePreferredSize = true;
      rightChild.ignorePreferredSize = true;
    }
  }

  changeSizes = (sizes: number[]) => {
    let {children} = this.props.boxData;
    if (children.length === sizes.length) {
      for (let i = 0; i < children.length; ++i) {
        if (!children[i].collapsed) {
          children[i].size = sizes[i];
        }
      }
      this.forceUpdate();
    }
  };

  onDragEnd = () => {
    this.context.onSilentChange(null, 'move');
  };

  getExpandedPanelsCount() {
    const {children} = this.props.boxData;

    return children.filter(panel => !panel.collapsed).length;
  }

  componentDidUpdate(prevProps: Readonly<Props>, prevState: Readonly<any>, snapshot?: any) {
    if (this.getExpandedPanelsCount() !== 0) {
      return;
    }

    const {children} = this.props.boxData;

    const lastChild = children[children.length - 1];
    if (!('tabs' in lastChild)) {
      return;
    }

    const firstTab = lastChild.tabs[0];
    firstTab.collapsed = false;
    this.context.updateTab(firstTab.id!, firstTab, false, 'configure-tab');
  }

  render(): React.ReactNode {
    let {boxData, preferredWidth, preferredHeight} = this.props;
    let {minWidth, minHeight, size, children, mode, id, widthFlex, heightFlex} = boxData;
    let isVertical = mode === 'vertical';
    let childrenRender: React.ReactNode[] = [];
    const isCollapseDisabled = this.getExpandedPanelsCount() === 1;
    for (let i = 0; i < children.length; ++i) {
      if (i > 0) {
        childrenRender.push(
          <Divider
            idx={i} key={i}
            isVertical={isVertical}
            onDragEnd={this.onDragEnd}
            getDividerData={this.getDividerData}
            changeSizes={this.changeSizes}
            setIgnorePreferredSize={this.setIgnorePreferredSize}
          />
        );
      }
      let child = children[i];
      if ('tabs' in child) {
        childrenRender.push(
          <DockPanel
            size={child.size}
            preferredWidth={!child.ignorePreferredSize ? child.preferredWidth : undefined}
            preferredHeight={!child.ignorePreferredSize ? child.preferredHeight : undefined}
            panelData={child}
            key={child.id}
            isCollapseDisabled={isCollapseDisabled}
          />
        );
        // render DockPanel
      } else if ('children' in child) {
        childrenRender.push(
          <DockBox
            size={child.size}
            preferredWidth={!child.ignorePreferredSize ? child.preferredWidth : undefined}
            preferredHeight={!child.ignorePreferredSize ? child.preferredHeight : undefined}
            boxData={child}
            key={child.id}
          />
        );
      }
    }
    let cls: string;
    let flex = 1;
    if (mode === 'vertical') {
      cls = 'dock-box dock-vbox';
      if (widthFlex != null) {
        flex = widthFlex;
      }
    } else {
      // since special boxes dont reuse this render function, this can only be horizontal box
      cls = 'dock-box dock-hbox';
      if (heightFlex != null) {
        flex = heightFlex;
      }
    }
    let flexGrow = flex * size * 1000000;
    let flexShrink = flex * 1000000;
    if (flexShrink < 1) {
      flexShrink = 1;
    }

    if (isVertical && preferredWidth != null) {
      flexGrow = 1;
      flexShrink = 1;
      size = preferredWidth;
    } else if (!isVertical && preferredHeight != null) {
      flexGrow = 1;
      flexShrink = 1;
      size = preferredHeight;
    }

    return (
      <div ref={this.getRef} className={classNames(cls, this.context.getClassName())} data-dockid={id}
           style={{minWidth, minHeight, flex: `${flexGrow} ${flexShrink} ${size}px`}}>
        {childrenRender}
      </div>
    );
  }
}
