import React from "react";
import debounce from 'lodash/debounce';
import NewWindow from "react-new-window";
import {DockContext, DockContextType, PanelData} from "./DockData";
import {DockPanel} from "./DockPanel";
import {Filter} from "./Algorithm";


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
    if (this.context.find(panelData.id, Filter.Panel | Filter.Windowed)) {
      let layoutRoot = this.context.getRootElement();
      let layoutRect = layoutRoot.getBoundingClientRect();
      panelData.w = this._window.innerWidth;
      panelData.h = this._window.innerHeight;

      let windowWidthDiff = (this._window.outerWidth - this._window.innerWidth) - (window.outerWidth - window.innerWidth);
      let windowHeightDiff = (this._window.outerHeight - this._window.innerHeight) - (window.outerHeight - window.innerHeight);
      if (windowWidthDiff > 0) {
        // when window has a border but main window has no border
        windowWidthDiff = Math.round(windowWidthDiff / 2);
        windowHeightDiff -= windowWidthDiff;
      } else {
        windowWidthDiff = 0;
      }

      panelData.x = this._window.screenX - window.screenX + windowWidthDiff - layoutRect.x;
      panelData.y = this._window.screenY - window.screenY + windowHeightDiff - layoutRect.y;
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
    // add/remove element on main document, force it to dispatch resize observer event on the popup window
    let div = document.createElement('div');
    document.body.append(div);
    div.remove();
    // TODO update resize event
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
                        width: panelData.w,
                        height: panelData.h,
                      }}>
      <div className='dock-wbox'>
        <DockPanel size={panelData.size} panelData={panelData} key={panelData.id}/>
      </div>
    </NewWindow>;
  }
}
