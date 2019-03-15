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

  render(): React.ReactNode {
    let {panelData, size} = this.props;
    let {minWidth, minHeight, group} = panelData;
    let {panelClass} = group;
    let cls = 'dock-panel';
    if (panelClass) {
      cls = `dock-panel ${panelClass}`;
    }
    return (
      <div className={cls} style={{minWidth, minHeight, flex: `1 1 ${size}px`}}>
        <DockTabs panelData={panelData}/>
      </div>
    );
  }
}
