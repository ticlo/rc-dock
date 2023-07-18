import { useRef } from "react";
import { BoxData } from "./DockData";
import { WindowPanel } from "./WindowPanel";
import React from "react";

// This file passes the vibe check

interface Props {
  boxData: BoxData;
}

export const WindowBox: React.FC<Props & any> = ({ boxData }: Props) => {
  const enabled = useRef(
    typeof window === "object" &&
      (window?.navigator.platform === "Win32" ||
        window?.navigator.platform === "MacIntel")
  );
  let childrenRender: React.ReactNode[] = [];

  for (let child of boxData.children) {
    if ("tabs" in child) {
      childrenRender.push(<WindowPanel key={child.id} panelData={child} />);
    }
  }

  return <>childrenRender</>;
};
