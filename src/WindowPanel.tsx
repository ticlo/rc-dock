import React from "react";
import {DockContext, DockContextType, PanelData} from "./DockData";
import {DockPanel} from "./DockPanel";
import NewWindow from "react-new-window";

interface Props {
  panelData: PanelData;
}

export class WindowPanel extends React.PureComponent<Props, any> {
  static contextType = DockContextType;

  context!: DockContext;
  _window: Window;

  onOpen = (w: Window) => {
    if (!this._window) {
      window.addEventListener('beforeunload', this.onMainWindowUnload);
    }
    this._window = w;
    console.log(w);
  };
  onUnload = () => {
    let {panelData} = this.props;
    this.context.dockMove(panelData, null, 'float');
  };

  onMainWindowUnload = () => {
    if (this._window) {
      this._window.close();
    }
  };

  componentWillUnmount() {
    if (this._window) {
      window.removeEventListener('beforeunload', this.onMainWindowUnload);
      this._window = null;
    }
  }

  render(): React.ReactNode {
    let {panelData} = this.props;

    return <NewWindow copyStyles={true}
                      title={document.title}
                      onOpen={this.onOpen}
                      onUnload={this.onUnload}
                      onBlock={this.onUnload}
                      features={{
                        width: panelData.w + 16,
                        height: panelData.h + 40,
                        left: 0,
                        top: panelData.y - 32,
                      }}>
      <div className='dock-wbox '>
        <DockPanel size={panelData.size} panelData={panelData} key={panelData.id}/>
      </div>
    </NewWindow>;
  }
}
