import React from 'react';
import {AbstractPointerEvent, DragInitFunction, DragInitiator} from "./DragInitiator";

export interface BoxChild {
  size: number;
  minSize?: number;
}

export interface BoxData {
  element: HTMLElement;
  beforeDivider: BoxChild[];
  afterDivider: BoxChild[];
}

interface DividerProps {
  idx: number;
  className?: string;
  isVertical?: boolean;

  getBoxData(idx: number): BoxData;

  changeSizes(sizes: number[]): void;
}

class BoxDataCache implements BoxData {
  element: HTMLElement;
  beforeDivider: BoxChild[];
  afterDivider: BoxChild[];

  beforeSize = 0;
  beforeMinSize = 0;
  afterSize = 0;
  afterMinSize = 0;

  constructor(data: BoxData) {
    this.element = data.element;
    this.beforeDivider = data.beforeDivider;
    this.afterDivider = data.afterDivider;
    for (let child of this.beforeDivider) {
      this.beforeSize += child.size;
      if (child.minSize > 0) {
        this.beforeMinSize += child.minSize;
      }
    }
    for (let child of this.afterDivider) {
      this.afterSize += child.size;
      if (child.minSize > 0) {
        this.afterMinSize += child.minSize;
      }
    }
  }
}

export class Divider extends React.PureComponent<DividerProps, any> {

  boxData: BoxDataCache;

  startDrag = (e: PointerEvent, initFunction: DragInitFunction) => {
    this.boxData = new BoxDataCache(this.props.getBoxData(this.props.idx));
    initFunction(this.boxData.element, this.dragMove, this.dragEnd);
  };

  dragMove = (e: AbstractPointerEvent, dx: number, dy: number) => {
    let {isVertical, changeSizes} = this.props;
    let {beforeSize, beforeMinSize, afterSize, afterMinSize, beforeDivider, afterDivider} = this.boxData;
    let d = isVertical ? dy : dx;
    let newBeforeSize = beforeSize + d;
    let newAfterSize = afterSize - d;
    if (d > 0) {
      if (newAfterSize < afterMinSize) {
        newAfterSize = afterMinSize;
        newBeforeSize = beforeSize + afterSize - afterMinSize;
      }
    } else if (newBeforeSize < beforeMinSize) {
      newBeforeSize = beforeMinSize;
      newAfterSize = beforeSize + afterSize - beforeMinSize;
    }
    let beforeRatio = newBeforeSize / beforeSize;
    let afterRatio = newAfterSize / afterSize;
    let result: number[] = [];
    for (let child of beforeDivider) {
      result.push(child.size * beforeRatio);
    }
    for (let child of afterDivider) {
      result.push(child.size * afterRatio);
    }
    changeSizes(result);
  };

  dragEnd = (e: AbstractPointerEvent, dx: number, dy: number) => {
    this.boxData = null;
  };

  render(): React.ReactNode {
    let {className} = this.props;
    if (!className) {
      className = 'dock-divider';
    }
    return <DragInitiator className={className} onDragInit={this.startDrag}/>;
  }
}