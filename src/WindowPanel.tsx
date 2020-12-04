import React from "react";
import debounce from 'lodash/debounce';
import NewWindow from "react-new-window";
import {DockContext, DockContextType, PanelData} from "./DockData";
import {DockPanel} from "./DockPanel";


interface Props {
  panelData: PanelData;
}

export class WindowPanel extends React.PureComponent<Props, any> {
  static contextType = DockContextType;

  context!: DockContext;
  _window: Window;

  onOpen = (w: Window) => {
    if (!this._window && w) {
      window.addEventListener('beforeunload', this.onMainWindowUnload);
      w.addEventListener('resize', this.onNewWindowResize);
      this._window = w;
    }

  };
  onUnload = () => {
    let {panelData} = this.props;
    if (this.context.find(panelData.id)) {
      this.context.dockMove(panelData, null, 'float');
    }
  };

  onMainWindowUnload = () => {
    if (this._window) {
      this.onNewWindowResize.cancel();
      this._window.close();

    }
  };


  onNewWindowResize = debounce(() => {
    let {panelData} = this.props;
    panelData.w = this._window.innerWidth;
    panelData.h = this._window.innerHeight;
  }, 200);

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
                        width: panelData.w ,
                        height: panelData.h,
                        left: 0,
                        top: panelData.y,
                      }}>
      <div className='dock-wbox '>
        <DockPanel size={panelData.size} panelData={panelData} key={panelData.id}/>
      </div>
    </NewWindow>;
  }
}
