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

// split size among children
function spiltSize(newSize: number, oldSize: number, children: BoxChild[]): number[] {
  let reservedSize = -1;
  let sizes: number[] = [];
  let requiredMinSize = 0;
  while (requiredMinSize !== reservedSize) {
    reservedSize = requiredMinSize;
    requiredMinSize = 0;
    let ratio = (newSize - reservedSize) / (oldSize - reservedSize);
    if (!(ratio >= 0)) {
      // invalid input
      break;
    }
    for (let i = 0; i < children.length; ++i) {
      let size = children[i].size * ratio;
      if (size < children[i].minSize) {
        size = children[i].minSize;
        requiredMinSize += size;
      }
      sizes[i] = size;
    }
  }
  return sizes;
}

export class Divider extends React.PureComponent<DividerProps, any> {

  boxData: BoxDataCache;

  startDrag = (e: PointerEvent, initFunction: DragInitFunction) => {
    this.boxData = new BoxDataCache(this.props.getBoxData(this.props.idx));
    if (e.shiftKey || e.ctrlKey) {
      initFunction(this.boxData.element, this.dragMoveAll, this.dragEnd);
    } else {
      initFunction(this.boxData.element, this.dragMove2, this.dragEnd);
    }

  };
  dragMove2 = (e: AbstractPointerEvent, dx: number, dy: number) => {
    let {isVertical, changeSizes} = this.props;
    let {beforeDivider, afterDivider} = this.boxData;
    if (!(beforeDivider.length && afterDivider.length)) {
      // invalid input
      return;
    }
    let d = isVertical ? dy : dx;
    let leftChild = beforeDivider[beforeDivider.length - 1];
    let rightCild = afterDivider[0];
    let leftSize = leftChild.size + d;
    let rightSize = rightCild.size - d;
    // check min size
    if (d > 0) {
      if (rightSize < rightCild.minSize) {
        rightSize = rightCild.minSize;
        leftSize = leftChild.size + rightCild.size - rightSize;
      }
    } else if (leftSize < leftChild.minSize) {
      leftSize = leftChild.minSize;
      rightSize = leftChild.size + rightCild.size - leftSize;
    }
    let sizes = beforeDivider.concat(afterDivider).map((child) => child.size);
    sizes[beforeDivider.length - 1] = leftSize;
    sizes[beforeDivider.length] = rightSize;
    changeSizes(sizes);
  };
  dragMoveAll = (e: AbstractPointerEvent, dx: number, dy: number) => {
    let {isVertical, changeSizes} = this.props;
    let {beforeSize, beforeMinSize, afterSize, afterMinSize, beforeDivider, afterDivider} = this.boxData;
    let d = isVertical ? dy : dx;
    let newBeforeSize = beforeSize + d;
    let newAfterSize = afterSize - d;
    // check total min size
    if (d > 0) {
      if (newAfterSize < afterMinSize) {
        newAfterSize = afterMinSize;
        newBeforeSize = beforeSize + afterSize - afterMinSize;
      }
    } else if (newBeforeSize < beforeMinSize) {
      newBeforeSize = beforeMinSize;
      newAfterSize = beforeSize + afterSize - beforeMinSize;
    }

    changeSizes(spiltSize(newBeforeSize, beforeSize, beforeDivider).concat(spiltSize(newAfterSize, afterSize, afterDivider)));
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