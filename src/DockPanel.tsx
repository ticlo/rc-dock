import React from "react";
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
    let {minWidth, minHeight, group} = panelData;
    let {panelClass} = group;

    let cls = `dock-panel ${panelClass ? panelClass : ''} ${dropping ? 'dock-panel-dropping' : ''}`;

    let droppingLayer: React.ReactNode;
    if (dropping) {

    }

    return (
      <div className={cls} style={{minWidth, minHeight, flex: `1 1 ${size}px`}} onDragOver={this.onDragOver}>
        <DockTabs panelData={panelData}/>
      </div>
    );
  }
}
