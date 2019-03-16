import React from "react";
import {BoxData, LayoutData, PanelData} from "./DockData";
import {DockBox} from "./DockBox";

interface Props {
  defaultLayout: LayoutData;
}

interface State {
  layout: LayoutData;
}

export class DockLayout extends React.PureComponent<Props, State> {

  _idCount = 0;

  nextId() {
    ++this._idCount;
    if (this._idCount >= Number.MAX_SAFE_INTEGER) {
      this._idCount = -Number.MAX_SAFE_INTEGER;
    }
    return this._idCount;
  }

  addInitDataId(box: BoxData) {
    box.id = this.nextId();
    for (let child of box.children) {
      if ('children' in child) {
        // add box id
        this.addInitDataId(child);
      } else {
        // add panel id
        child.id = this.nextId();
      }
    }
  }

  prepareInitData(data: LayoutData | BoxData | (BoxData | PanelData)[]): LayoutData {
    let layout: LayoutData;
    if (Array.isArray(data)) {
      layout = {
        dockbox: {mode: 'horizontal', children: data, size: 1}
      };
    } else if ('dockbox' in data || 'floatbox' in data) {
      layout = data;
    } else if ('children' in data) {
      layout = {
        dockbox: data
      };
    }
    if (!('dockbox' in layout)) {
      layout.dockbox = {mode: 'horizontal', children: [], size: 1};
    }
    if (!('floatbox' in layout)) {
      layout.floatbox = {mode: 'float', children: [], size: 1};
    } else {
      layout.floatbox.mode = 'float';
    }
    this.addInitDataId(layout.dockbox);
    this.addInitDataId(layout.floatbox);
    return layout;
  }

  constructor(props: Props) {
    super(props);
    this.state = {layout: this.prepareInitData(props.defaultLayout)};
  }

  render(): React.ReactNode {
    let {layout} = this.state;
    return (
      <div className='dock-layout'>
        <DockBox size={1} boxData={layout.dockbox}/>
      </div>
    );
  }
}
