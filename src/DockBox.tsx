import * as React from "react";
import {BoxData, DockContext, DockContextType, PanelData} from "./DockData";
import {ColumnRail, columnStyle, ColumnView, railWidth} from './SideColumns';
import {Divider, DividerChild} from "./Divider";
import {DockPanel} from "./DockPanel";

interface Props {
  size: number;
  boxData: BoxData;
  column?: ColumnView;
  columns?: Map<BoxData | PanelData, ColumnView>;
  paddingLeft?: number;
  paddingRight?: number;
}

export class DockBox extends React.PureComponent<Props, any> {
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
    let {children, mode} = this.props.boxData;
    const {columns} = this.props;
    let nodes = this._ref.childNodes;
    if (nodes.length !== children.length * 2 - 1) {
      return;
    }
    let dividerChildren: DividerChild[] = [];
    for (let i = 0; i < children.length; ++i) {
      if (mode === 'vertical') {
        dividerChildren.push({size: (nodes[i * 2] as HTMLElement).offsetHeight, minSize: children[i].minHeight});
      } else {
        const fixed = columns?.get(children[i])?.collapsed;
        dividerChildren.push({size: (nodes[i * 2] as HTMLElement).offsetWidth, minSize: fixed ? railWidth : children[i].minWidth, fixed});
      }
    }
    return {
      element: this._ref,
      beforeDivider: dividerChildren.slice(0, idx),
      afterDivider: dividerChildren.slice(idx)
    };
  };
  changeSizes = (sizes: number[]) => {
    let {children} = this.props.boxData;
    if (children.length !== sizes.length) {
      return;
    }
    for (let i = 0; i < children.length; ++i) {
      if (this.props.columns?.get(children[i])?.collapsed) continue;
      children[i].size = sizes[i];
    }
    this.forceUpdate();
  };

  onDragEnd = () => {
    this.context.onSilentChange(null, 'move');
  };

  render(): React.ReactNode {
    let {boxData, column, columns, paddingLeft, paddingRight} = this.props;
    let {minWidth, minHeight, size, children, mode, id, widthFlex, heightFlex} = boxData;
    let isVertical = mode === 'vertical';
    let childrenRender: React.ReactNode[] = [];
    const collapsed = column?.column === boxData && column.collapsed;
    for (let i = 0; i < children.length; ++i) {
      if (i > 0) {
        childrenRender.push(
          <Divider idx={i} key={i} isVertical={isVertical}
                   disabled={!!(isVertical && column?.activePanelId || columns?.get(children[i - 1])?.collapsed || columns?.get(children[i])?.collapsed)}
                   onDragEnd={this.onDragEnd}
                   getDividerData={this.getDividerData} changeSizes={this.changeSizes}/>
        );
      }
      let child = children[i];
      const childColumn = column || columns?.get(child);
      if ('tabs' in child) {
        childrenRender.push(<DockPanel size={child.size} panelData={child} column={childColumn} key={child.id}/>);
        // render DockPanel
      } else if ('children' in child) {
        childrenRender.push(<DockBox size={child.size} boxData={child} column={childColumn} key={child.id}/>);
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
    let flexGrow = flex * size;
    let flexShrink = flex * 1000000;
    if (flexShrink < 1) {
      flexShrink = 1;
    }
    if (collapsed) cls += ' dock-column-collapsed';
    if (columns?.size) {
      minWidth = children.reduce((sum, child) => sum + (columns.get(child)?.collapsed ? railWidth : child.minWidth || 0), 0) + (children.length - 1) * 4;
      minHeight = Math.max(...children.map((child) => {
        const view = columns.get(child);
        return view?.collapsed ? 0 : view?.heights.get(child) ?? child.minHeight ?? 0;
      }));
    }

    return (
      <div ref={this.getRef} className={cls} data-dockid={id}
           style={{minWidth, minHeight, flex: `${flexGrow} ${flexShrink} ${size}px`, ...columnStyle(boxData, column),
             ...(paddingLeft || paddingRight ? {left: paddingLeft || 0, right: paddingRight || 0, width: 'auto'} : undefined)}}>
        {childrenRender}
        {collapsed ? <ColumnRail view={column}/> : null}
      </div>
    );
  }
}
