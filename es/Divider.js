import React from 'react';
import { DragDropDiv } from "./dragdrop/DragDropDiv";
class BoxDataCache {
    constructor(data) {
        this.beforeSize = 0;
        this.beforeMinSize = 0;
        this.afterSize = 0;
        this.afterMinSize = 0;
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
function spiltSize(newSize, oldSize, children) {
    let reservedSize = -1;
    let sizes = [];
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
export class Divider extends React.PureComponent {
    constructor() {
        super(...arguments);
        this.startDrag = (e) => {
            var _a, _b;
            (_b = (_a = this.props).setIgnorePreferredSize) === null || _b === void 0 ? void 0 : _b.call(_a, this.props.idx);
            this.boxData = new BoxDataCache(this.props.getDividerData(this.props.idx));
            e.startDrag(this.boxData.element, null);
        };
        this.dragMove = (e) => {
            var _a, _b, _c;
            if (((_a = e.event) === null || _a === void 0 ? void 0 : _a.shiftKey) || ((_b = e.event) === null || _b === void 0 ? void 0 : _b.ctrlKey) || ((_c = e.event) === null || _c === void 0 ? void 0 : _c.altKey)) {
                this.dragMoveAll(e.dx, e.dy);
            }
            else {
                this.dragMove2(e.dx, e.dy);
            }
        };
        this.dragEnd = (e) => {
            let { onDragEnd } = this.props;
            this.boxData = null;
            if (onDragEnd) {
                onDragEnd();
            }
        };
    }
    dragMove2(dx, dy) {
        let { isVertical, changeSizes } = this.props;
        if (!this.boxData) {
            return;
        }
        let { beforeDivider, afterDivider } = this.boxData;
        if (!(beforeDivider.length && afterDivider.length)) {
            // invalid input
            return;
        }
        let d = isVertical ? dy : dx;
        let leftChildIdx = -1;
        for (let i = beforeDivider.length - 1; i >= 0; i--) {
            if (!beforeDivider[i].collapsed) {
                leftChildIdx = i;
                break;
            }
        }
        let rightChildIdx = -1;
        for (let i = 0; i <= afterDivider.length - 1; i++) {
            if (!afterDivider[i].collapsed) {
                rightChildIdx = i;
                break;
            }
        }
        if (leftChildIdx === -1 || rightChildIdx === -1) {
            return;
        }
        const leftChild = beforeDivider[leftChildIdx];
        const rightChild = afterDivider[rightChildIdx];
        let leftSize = leftChild.size + d;
        let rightSize = rightChild.size - d;
        // check min size
        if (d > 0) {
            if (rightSize < rightChild.minSize) {
                rightSize = rightChild.minSize;
                leftSize = leftChild.size + rightChild.size - rightSize;
            }
        }
        else if (leftSize < leftChild.minSize) {
            leftSize = leftChild.minSize;
            rightSize = leftChild.size + rightChild.size - leftSize;
        }
        let sizes = beforeDivider.concat(afterDivider).map((child) => child.size);
        sizes[leftChildIdx] = leftSize;
        sizes[beforeDivider.length + rightChildIdx] = rightSize;
        changeSizes(sizes);
    }
    dragMoveAll(dx, dy) {
        let { isVertical, changeSizes } = this.props;
        let { beforeSize, beforeMinSize, afterSize, afterMinSize, beforeDivider, afterDivider } = this.boxData;
        let d = isVertical ? dy : dx;
        let newBeforeSize = beforeSize + d;
        let newAfterSize = afterSize - d;
        // check total min size
        if (d > 0) {
            if (newAfterSize < afterMinSize) {
                newAfterSize = afterMinSize;
                newBeforeSize = beforeSize + afterSize - afterMinSize;
            }
        }
        else if (newBeforeSize < beforeMinSize) {
            newBeforeSize = beforeMinSize;
            newAfterSize = beforeSize + afterSize - beforeMinSize;
        }
        changeSizes(spiltSize(newBeforeSize, beforeSize, beforeDivider).concat(spiltSize(newAfterSize, afterSize, afterDivider)));
    }
    render() {
        let { className } = this.props;
        if (!className) {
            className = 'dock-divider';
        }
        return (React.createElement(DragDropDiv, { className: className, onDragStartT: this.startDrag, onDragMoveT: this.dragMove, onDragEndT: this.dragEnd }));
    }
}
