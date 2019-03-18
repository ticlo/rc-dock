import React, {CSSProperties} from "react";
import {BoxData, LayoutData, PanelData, DockContextProvider, nextId} from "./DockData";
import {DockBox} from "./DockBox";
import {FloatBox} from "./FloatBox";

interface Props {
  defaultLayout: LayoutData | BoxData | (BoxData | PanelData)[];
  style?: CSSProperties;
}

interface State {
  layout: LayoutData;
}

export class DockLayout extends React.PureComponent<Props, State> {

  fixPanelData(panel: PanelData) {
    panel.id = nextId();
    if (!(panel.size > 0)) {
      panel.size = 200;
    }
    for (let child of panel.tabs) {
      child.parent = panel;
    }
  }

  fixBoxData(box: BoxData) {
    box.id = nextId();
    if (!(box.size > 0)) {
      box.size = 200;
    }
    for (let child of box.children) {
      child.parent = box;
      if ('children' in child) {
        // add box id
        this.fixBoxData(child);
      } else if ('tabs' in child) {
        // add panel id
        this.fixPanelData(child);

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
    this.fixBoxData(layout.dockbox);
    this.fixBoxData(layout.floatbox);
    return layout;
  }

  constructor(props: Props) {
    super(props);
    this.state = {layout: this.prepareInitData(props.defaultLayout)};
  }

  render(): React.ReactNode {
    let {style} = this.props;
    let {layout} = this.state;
    return (
      <div className='dock-layout' style={style}>
        <DockContextProvider value={this}>
          <DockBox size={1} boxData={layout.dockbox}/>
          <FloatBox boxData={layout.floatbox}/>
        </DockContextProvider>
      </div>
    );
  }
}
