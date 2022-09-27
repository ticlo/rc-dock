import * as React from "react";
import debounce from 'lodash/debounce';
import NewWindow from "rc-new-window";
import {DockContext, DockContextType, PanelData} from "./DockData";
import {DockPanel} from "./DockPanel";
import {mapElementToScreenRect, mapWindowToElement} from "rc-new-window/lib/ScreenPosition";


interface Props {
  panelData: PanelData;
}

export class WindowPanel extends React.PureComponent<Props, any> {
  static contextType = DockContextType;

  context!: DockContext;
  _window: Window;

  onOpen = (w: Window) => {
    if (!this._window && w) {
      this._window = w;
    }
  };
  onUnload = () => {
    let {panelData} = this.props;
    let layoutRoot = this.context.getRootElement();
    const rect = mapWindowToElement(layoutRoot, this._window);
    if (rect.width > 0 && rect.height > 0) {
      panelData.x = rect.left;
      panelData.y = rect.top;
      panelData.w = rect.width;
      panelData.h = rect.height;
    }
    this.context.dockMove(panelData, null, 'float');
  };

  initPopupInnerRect = () => {
    let {panelData} = this.props;
    return mapElementToScreenRect(this.context.getRootElement(), {
      left: panelData.x,
      top: panelData.y,
      width: panelData.w,
      height: panelData.h
    }) as any;
  };


  render(): React.ReactNode {
    let {panelData} = this.props;

    let {x, y, w, h} = panelData;

    return <NewWindow copyStyles={true}
                      onOpen={this.onOpen}
                      onClose={this.onUnload}
                      onBlock={this.onUnload}
                      initPopupInnerRect={this.initPopupInnerRect}
                      width={w}
                      height={h}
    >
      <div className='dock-wbox'>
        <DockPanel size={panelData.size} panelData={panelData} key={panelData.id}/>
      </div>
    </NewWindow>;
  }
}
