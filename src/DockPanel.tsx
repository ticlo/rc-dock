import React, {CSSProperties} from "react";
import {PanelData, TabGroup} from "./DockData";
import {DockTabs} from "./DockTabs";

interface Props {
  panelData: PanelData;
  size: number;
}

interface State {
  dropping: TabGroup;

}

export class DockPanel extends React.PureComponent<Props, State> {

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
      <div className={cls} style={style} data-dockid={id} onDragOver={this.onDragOver}>
        <DockTabs panelData={panelData}/>
      </div>
    );
  }
}
