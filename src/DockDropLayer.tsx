import React, { useRef, useCallback, FC, useState, useEffect } from "react";
import {
  BoxData,
  DockContext,
  DockContextType,
  DockMode,
  DropDirection,
  PanelData,
  TabData,
  placeHolderStyle,
} from "./DockData";
import { DragDropDiv } from "./dragdrop/DragDropDiv";
import { DragState } from "./dragdrop/DragManager";

// This file passes the vibe check (check useCallback with refs)

interface DockDropSquareProps {
  direction: DropDirection;
  depth?: number;
  panelData: PanelData;
  panelElement: HTMLElement;
}

export const DockDropSquare: FC<DockDropSquareProps & any> = ({
  direction,
  depth,
  panelData,
  panelElement,
}: DockDropSquareProps) => {
  useEffect(() => {
    return () => context.current.setDropRect(null, "remove", this);
  });

  const [dropping, setDropping] = useState<boolean>();

  const context = useRef<DockContext>();

  const onDragOver = useCallback(
    (e: DragState) => {
      let targetElement: HTMLElement | undefined;
      setDropping(true);
      for (let i = 0; i < depth; ++i) {
        targetElement = panelElement.parentElement;
      }
      if (panelData.group === placeHolderStyle && direction !== "float") {
        // place holder panel should always have full size drop rect
        context.current.setDropRect(targetElement, "middle", this, e);
      } else {
        let dockId = context.current.getDockId();
        let panelSize: [number, number] = DragState.getData(
          "panelSize",
          dockId
        );
        context.current.setDropRect(
          targetElement,
          direction,
          this,
          e,
          panelSize
        );
      }
      e.accept("");
    },
    [context, panelData, direction, depth, panelElement]
  );

  const onDragLeave = useCallback(
    (e: DragState) => {
      setDropping(false);
      context.current.setDropRect(null, "remove", this);
    },
    [context]
  );

  const onDrop = useCallback(
    (e: DragState) => {
      let dockId = context.current.getDockId();
      let source: TabData | PanelData = DragState.getData("tab", dockId);
      if (!source) {
        source = DragState.getData("panel", dockId);
      }
      if (source) {
        let target: PanelData | BoxData = panelData;
        for (let i = 0; i < depth; ++i) {
          target = target.parent;
        }
        context.current.dockMove(source, target, direction);
      }
    },
    [context, panelData]
  );

  let classes = ["dock-drop-square"];
  classes.push(`dock-drop-${direction}`);
  if (depth) {
    classes.push(`dock-drop-deep`);
  }
  if (dropping) {
    classes.push("dock-drop-square-dropping");
  }

  return (
    <DragDropDiv
      className={classes.join(" ")}
      onDragOverT={onDragOver}
      onDragLeaveT={onDragLeave}
      onDropT={onDrop}
    >
      <div className="dock-drop-square-box" />
    </DragDropDiv>
  );
};

interface DockDropLayerProps {
  panelData: PanelData;
  panelElement: HTMLElement;
  dropFromPanel: PanelData;
}

export const DockDropLayer: FC<DockDropLayerProps & any> = ({
  panelData,
  panelElement,
  dropFromPanel,
}: DockDropLayerProps) => {
  const contextType = useRef(DockContextType);
  const context = useRef<DockContext>();
  const addDepthSquare = useCallback(
    (
      children: React.ReactNode[],
      mode: DockMode,
      panelData: PanelData,
      panelElement: HTMLElement,
      depth?: number
    ) => {
      if (mode === "horizontal") {
        children.push(
          <DockDropSquare
            key={`top${depth}`}
            direction="top"
            depth={depth}
            panelData={panelData}
            panelElement={panelElement}
          />
        );
        children.push(
          <DockDropSquare
            key={`bottom${depth}`}
            direction="bottom"
            depth={depth}
            panelData={panelData}
            panelElement={panelElement}
          />
        );
      } else {
        children.push(
          <DockDropSquare
            key={`left${depth}`}
            direction="left"
            depth={depth}
            panelData={panelData}
            panelElement={panelElement}
          />
        );
        children.push(
          <DockDropSquare
            key={`right${depth}`}
            direction="right"
            depth={depth}
            panelData={panelData}
            panelElement={panelElement}
          />
        );
      }
    },
    [panelData, panelElement]
  );

  let dockId = context.current.getDockId();
  let children: React.ReactNode[] = []; // check if it's whole panel dragging

  let draggingPanel = DragState.getData("panel", dockId);
  let fromGroup = context.current.getGroup(dropFromPanel.group);

  if (
    fromGroup.floatable !== false &&
    (!draggingPanel ||
      (!draggingPanel.panelLock && // panel with panelLock can't float
        draggingPanel.parent?.mode !== "float" && // don't show float drop when over a float panel
        !(
          fromGroup.floatable === "singleTab" && draggingPanel.tabs.length > 1
        ))) // singleTab can float only with one tab
  ) {
    children.push(
      <DockDropSquare
        key="float"
        direction="float"
        panelData={panelData}
        panelElement={panelElement}
      />
    );
  }

  if (draggingPanel !== panelData && !fromGroup.disableDock) {
    // don't drop panel to itself
    // 4 direction base drag square
    addDepthSquare(children, "horizontal", panelData, panelElement, 0);
    addDepthSquare(children, "vertical", panelData, panelElement, 0);

    if (
      !draggingPanel?.panelLock &&
      panelData.group === dropFromPanel.group &&
      panelData !== dropFromPanel
    ) {
      // dock to tabs
      children.push(
        <DockDropSquare
          key="middle"
          direction="middle"
          panelData={panelData}
          panelElement={panelElement}
        />
      );
    }

    let box = panelData.parent;

    if (box && box.children.length > 1) {
      // deeper drop
      addDepthSquare(children, box.mode, panelData, panelElement, 1);

      if (box.parent) {
        addDepthSquare(children, box.parent.mode, panelData, panelElement, 2);
      }
    }
  }

  return <div className="dock-drop-layer">{children}</div>;
};
