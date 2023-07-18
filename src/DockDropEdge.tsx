import React, { useRef, useCallback, FC, useEffect } from "react";
import {
  BoxData,
  DockContext,
  DockContextType,
  DockMode,
  DropDirection,
  PanelData,
  TabData,
  TabGroup,
} from "./DockData";
import { DragDropDiv } from "./dragdrop/DragDropDiv";
import { DragState } from "./dragdrop/DragManager";

// This file passes the vibe check (check useCallback with refs)

interface DockDropEdgeProps {
  panelData: PanelData;
  panelElement: HTMLElement;
  dropFromPanel: PanelData;
}

export const DockDropEdge: FC<DockDropEdgeProps & any> = ({
  panelData,
  panelElement,
  dropFromPanel,
}: DockDropEdgeProps) => {
  const context = useRef<DockContext>();

  const ref = useRef<HTMLDivElement>();

  useEffect(() => {
    return () => {
      context.current.setDropRect(null, "remove", this);
    };
  }, [context.current]);

  const getRef = useCallback(
    (r: HTMLDivElement) => {
      ref.current = r;
    },
    [ref]
  );

  const getDirection = useCallback(
    (e: DragState, group: TabGroup, samePanel: boolean, tabLength: number) => {
      let rect = ref.current.getBoundingClientRect();

      let widthRate = Math.min(rect.width, 500);
      let heightRate = Math.min(rect.height, 500);
      let left = (e.clientX - rect.left) / widthRate;
      let right = (rect.right - e.clientX) / widthRate;
      let top = (e.clientY - rect.top) / heightRate;
      let bottom = (rect.bottom - e.clientY) / heightRate;
      let min = Math.min(left, right, top, bottom);
      let depth = 0;

      if (group.disableDock || samePanel) {
        // use an impossible min value to disable dock drop
        min = 1;
      }

      if (min < 0) {
        return {
          direction: null,
          depth: 0,
        };
      } else if (min < 0.075) {
        depth = 3; // depth 3 or 4
      } else if (min < 0.15) {
        depth = 1; // depth 1 or 2
      } else if (min < 0.3) {
        // default
      } else if (group.floatable) {
        if (group.floatable === "singleTab") {
          if (tabLength === 1) {
            // singleTab can float only with one tab
            return {
              direction: "float",
              mode: "float",
              depth: 0,
            };
          }
        } else {
          return {
            direction: "float",
            mode: "float",
            depth: 0,
          };
        }
      }

      switch (min) {
        case left: {
          return {
            direction: "left",
            mode: "horizontal",
            depth,
          };
        }

        case right: {
          return {
            direction: "right",
            mode: "horizontal",
            depth,
          };
        }

        case top: {
          return {
            direction: "top",
            mode: "vertical",
            depth,
          };
        }

        case bottom: {
          return {
            direction: "bottom",
            mode: "vertical",
            depth,
          };
        }
      } // probably a invalid input causing everything to be NaN?

      return {
        direction: null,
        depth: 0,
      };
    },
    [ref]
  );

  const getActualDepth = useCallback(
    (depth: number, mode: DockMode, direction: DropDirection) => {
      let afterPanel = direction === "bottom" || direction === "right";

      if (!depth) {
        return depth;
      }

      let previousTarget: BoxData | PanelData = panelData;
      let targetBox: BoxData = panelData.parent;
      let lastDepth = 0;

      if (panelData.parent.mode === mode) {
        ++depth;
      }

      while (targetBox && lastDepth < depth) {
        if (targetBox.mode === mode) {
          if (afterPanel) {
            if (targetBox.children.at(-1) !== previousTarget) {
              // dont go deeper if current target is on different side of the box
              break;
            }
          } else {
            if (targetBox.children[0] !== previousTarget) {
              // dont go deeper if current target is on different side of the box
              break;
            }
          }
        }

        previousTarget = targetBox;
        targetBox = targetBox.parent;
        ++lastDepth;
      }

      while (depth > lastDepth) {
        depth -= 2;
      }

      return depth;
    },
    [panelData]
  );

  const onDragOver = useCallback(
    (e: DragState) => {
      let dockId = context.current.getDockId();
      let draggingPanel = DragState.getData("panel", dockId);
      let fromGroup = context.current.getGroup(dropFromPanel.group);

      if (draggingPanel && draggingPanel.parent?.mode === "float") {
        // ignore float panel in edge mode
        return;
      }

      let { direction, mode, depth } = getDirection(
        e,
        fromGroup,
        draggingPanel === panelData,
        draggingPanel?.tabs?.length ?? 1
      );
      depth = getActualDepth(depth, mode as DockMode, direction);

      if (!direction || (direction === "float" && dropFromPanel.panelLock)) {
        context.current.setDropRect(null, "remove", this);
        return;
      }

      let targetElement = panelElement;

      for (let i = 0; i < depth; ++i) {
        targetElement = targetElement.parentElement;
      }

      let panelSize: [number, number] = DragState.getData("panelSize", dockId);
      context.current.setDropRect(targetElement, direction, this, e, panelSize);
      e.accept("");
    },
    [context, panelData, panelElement]
  );

  const onDragLeave = useCallback(
    (e: DragState) => {
      context.current.setDropRect(null, "remove", this);
    },
    [context]
  );

  const onDrop = useCallback(
    (e: DragState) => {
      let dockId = context.current.getDockId();
      let fromGroup = context.current.getGroup(dropFromPanel.group);
      let source: TabData | PanelData = DragState.getData("tab", dockId);
      let draggingPanel = DragState.getData("panel", dockId);

      if (!source) {
        source = draggingPanel;
      }

      if (source) {
        let { direction, mode, depth } = getDirection(
          e,
          fromGroup,
          draggingPanel === panelData,
          draggingPanel?.tabs?.length ?? 1
        );
        depth = getActualDepth(depth, mode as DockMode, direction);

        if (!direction) {
          return;
        }

        let target: PanelData | BoxData = panelData;

        for (let i = 0; i < depth; ++i) {
          target = target.parent;
        }

        context.current.dockMove(source, target, direction);
      }
    },
    [context, dropFromPanel, panelData]
  );

  return (
    <DragDropDiv
      getRef={getRef}
      className="dock-drop-edge"
      onDragOverT={onDragOver}
      onDragLeaveT={onDragLeave}
      onDropT={onDrop}
    />
  );
};
