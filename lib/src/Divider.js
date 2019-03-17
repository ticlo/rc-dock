"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const DragInitiator_1 = require("./DragInitiator");
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
class Divider extends react_1.default.PureComponent {
    constructor() {
        super(...arguments);
        this.startDrag = (e, initFunction) => {
            this.boxData = new BoxDataCache(this.props.getDividerData(this.props.idx));
            if (e.shiftKey || e.ctrlKey) {
                initFunction(this.boxData.element, this.dragMoveAll, this.dragEnd);
            }
            else {
                initFunction(this.boxData.element, this.dragMove2, this.dragEnd);
            }
        };
        this.dragMove2 = (e, dx, dy) => {
            let { isVertical, changeSizes } = this.props;
            let { beforeDivider, afterDivider } = this.boxData;
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
            }
            else if (leftSize < leftChild.minSize) {
                leftSize = leftChild.minSize;
                rightSize = leftChild.size + rightCild.size - leftSize;
            }
            let sizes = beforeDivider.concat(afterDivider).map((child) => child.size);
            sizes[beforeDivider.length - 1] = leftSize;
            sizes[beforeDivider.length] = rightSize;
            changeSizes(sizes);
        };
        this.dragMoveAll = (e, dx, dy) => {
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
        };
        this.dragEnd = (e, dx, dy) => {
            this.boxData = null;
        };
    }
    render() {
        let { className } = this.props;
        if (!className) {
            className = 'dock-divider';
        }
        return react_1.default.createElement(DragInitiator_1.DragInitiator, { className: className, onDragInit: this.startDrag });
    }
}
exports.Divider = Divider;
//# sourceMappingURL=Divider.js.map