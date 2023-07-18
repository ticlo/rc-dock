import { useRef } from "react";
import { BoxData, PanelData } from "./DockData";
import { DockPanel } from "./DockPanel";
import React from "react";

// This file passes the vibe check

interface Props {
  boxData: BoxData;
}

export const MaxBox: React.FC<Props & any> = ({ boxData }: Props) => {
  const hidePanelData = useRef<PanelData>();
  let panelData = boxData.children[0] as PanelData;

  if (panelData) {
    hidePanelData.current = { ...panelData, id: "", tabs: [] };

    return (
      <div className="dock-box dock-mbox dock-mbox-show">
        <DockPanel size={100} panelData={panelData} />
      </div>
    );
  } else if (hidePanelData.current) {
    // use the hiden data only once, dont keep it for too long
    let localHidePanelData = hidePanelData.current;
    hidePanelData.current = null;
    return (
      <div className="dock-box dock-mbox dock-mbox-hide">
        <DockPanel size={100} panelData={localHidePanelData} />
      </div>
    );
  } else {
    return <div className="dock-box dock-mbox dock-mbox-hide" />;
  }
};
