import React, {CSSProperties} from "react";
import {PanelData, TabGroup} from "./DockData";
import {DockTabs} from "./DockTabs";
import {AbstractPointerEvent, DragInitFunction} from "./DragInitiator";

interface Props {
  panelData: PanelData;
  size: number;
}

interface State {
  dropping: TabGroup;

}

export class DockPanel extends React.PureComponent<Props, State> {

  _ref: HTMLDivElement;
  getRef = (r: HTMLDivElement) => {
    this._ref = r;
  };


  static _droppingPanel: DockPanel;
  static set droppingPanel(panel: DockPanel) {
    if (DockPanel._droppingPanel === panel) {
      return;
    }
    if (DockPanel._droppingPanel) {
      DockPanel._droppingPanel.onDragLeave();
    }
  }

  state: State = {dropping: null};

  onDragOver = () => {
    DockPanel.droppingPanel = this;
    this.setState({dropping: null});
  };

  onDragLeave() {
    this.setState({dropping: null});
  }

  _movingX: number;
  _movingY: number;
  onPanelHeaderDrag = (event: PointerEvent, initFunction: DragInitFunction) => {
    let {parent, x, y} = this.props.panelData;
    if (parent && parent.mode === 'float') {
      this._movingX = x;
      this._movingY = y;
      initFunction(this._ref.parentElement, this.onPanelHeaderDragMove);
    }
  };
  onPanelHeaderDragMove = (e: AbstractPointerEvent, dx: number, dy: number) => {
    let {panelData} = this.props;
    panelData.x = this._movingX + dx;
    panelData.y = this._movingY + dy;
    this.forceUpdate();
  };

  render(): React.ReactNode {
    let {dropping} = this.state;
    let {panelData, size} = this.props;
    let {minWidth, minHeight, group, id} = panelData;
    let {panelClass} = group;

    let cls = `dock-panel ${panelClass ? panelClass : ''} ${dropping ? 'dock-panel-dropping' : ''}`;
    let style: React.CSSProperties = {minWidth, minHeight, flex: `1 1 ${size}px`};
    if (panelData.parent.mode === 'float') {
      style.left = panelData.x;
      style.top = panelData.y;
      style.width = panelData.w;
      style.height = panelData.h;
    }
    let droppingLayer: React.ReactNode;
    if (dropping) {

    }

    return (
      <div ref={this.getRef} className={cls} style={style} data-dockid={id} onDragOver={this.onDragOver}>
        <DockTabs panelData={panelData} onPanelHeaderDrag={this.onPanelHeaderDrag}/>
      </div>
    );
  }
}
