import { useCallback, useRef, FC } from "react";
import { DockContext, DockContextType } from "./DockData";
import { Divider, DividerChild } from "./Divider";
import React from "react";

// This file passes the vibe check (check useCallback with refs)

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  mode?: "horizontal" | "vertical";
}

export const DividerBox: FC<Props & any> = ({
  mode,
  children,
  className,
  ...rest
}: Props) => {
  const context = useRef<DockContext>();

  const ref = useRef<HTMLDivElement>();

  const getRef = useCallback((r: HTMLDivElement) => {
    ref.current = r;
  }, []);

  const getDividerData = useCallback(
    (idx: number) => {
      if (!ref.current) {
        return null;
      }

      let length = 1;

      if (Array.isArray(children)) {
        length = children.length;
      }

      if (ref.current.childNodes.length !== length * 2 - 1) {
        return;
      }

      let dividerChildren: DividerChild[] = [];

      for (let i = 0; i < length; ++i) {
        if (mode === "vertical") {
          dividerChildren.push({
            size: (ref.current.childNodes[i * 2] as HTMLElement).offsetHeight,
          });
        } else {
          dividerChildren.push({
            size: (ref.current.childNodes[i * 2] as HTMLElement).offsetWidth,
          });
        }
      }

      return {
        element: ref.current,
        beforeDivider: dividerChildren.slice(0, idx),
        afterDivider: dividerChildren.slice(idx),
      };
    },
    [ref, ref.current, mode, children]
  );

  const changeSizes = useCallback(
    (sizes: number[]) => {
      if (ref.current.childNodes.length === sizes.length * 2 - 1) {
        for (let i = 0; i < sizes.length; ++i) {
          if (mode === "vertical") {
            (
              ref.current.childNodes[i * 2] as HTMLElement
            ).style.height = `${sizes[i]}px`;
          } else {
            (
              ref.current.childNodes[i * 2] as HTMLElement
            ).style.width = `${sizes[i]}px`;
          }
        }
      }
    },
    [ref.current, mode]
  );

  let isVertical = mode === "vertical";
  let childrenRender: React.ReactNode = [];

  if (Array.isArray(children)) {
    for (let i = 0; i < children.length; ++i) {
      if (i > 0) {
        (childrenRender as any[]).push(
          <Divider
            idx={i}
            key={i}
            isVertical={isVertical}
            getDividerData={getDividerData}
            changeSizes={changeSizes}
          />
        );
      }

      (childrenRender as any[]).push(children[i]);
    }
  } else {
    childrenRender = children;
  }

  let cls: string;

  if (mode === "vertical") {
    cls = "divider-box dock-vbox";
  } else {
    cls = "divider-box dock-hbox";
  }

  if (className) {
    cls = `${cls} ${className}`;
  }

  return (
    <div ref={getRef} className={cls} {...rest}>
      {childrenRender}
    </div>
  );
};
