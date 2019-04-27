"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const DragManager = __importStar(require("./DragManager"));
class DragDropDiv extends react_1.default.Component {
    constructor() {
        super(...arguments);
        this._getRef = (r) => {
            if (r === this.element) {
                return;
            }
            let { getRef, onDragOverT, onDropT, onDragLeaveT } = this.props;
            if (this.element && onDragOverT) {
                DragManager.removeHandlers(this.element);
            }
            this.element = r;
            if (getRef) {
                getRef(r);
            }
            if (r && onDragOverT) {
                DragManager.addHandlers(r, { onDragOverT, onDragLeaveT, onDropT });
            }
        };
        this.dragType = null;
        this.onPointerDown = (e) => {
            if (!DragManager.checkPointerDownEvent(e.nativeEvent)) {
                // same pointer event shouldn't trigger 2 drag start
                return;
            }
            let state = new DragManager.DragState(e.nativeEvent, this, true);
            this.baseX = state.pageX;
            this.baseY = state.pageY;
            let baseElement = this.element.parentElement;
            let rect = baseElement.getBoundingClientRect();
            this.scaleX = baseElement.offsetWidth / Math.round(rect.width);
            this.scaleY = baseElement.offsetHeight / Math.round(rect.height);
            this.addListeners(e);
            if (this.props.directDragT) {
                let state = new DragManager.DragState(e.nativeEvent, this, true);
                this.executeFirstMove(state);
            }
        };
        this.onMouseMove = (e) => {
            let { onDragMoveT } = this.props;
            if (this.waitingMove) {
                if (!this.checkFirstMove(e)) {
                    return;
                }
            }
            else {
                let state = new DragManager.DragState(e, this);
                state.onMove();
                if (onDragMoveT) {
                    onDragMoveT(state);
                }
            }
            e.preventDefault();
        };
        this.onMouseEnd = (e) => {
            let { onDragEndT } = this.props;
            let state = new DragManager.DragState(e, this);
            document.removeEventListener('mousemove', this.onMouseMove);
            document.removeEventListener('mouseup', this.onMouseEnd);
            this.cleanup(state);
            if (!this.waitingMove) {
                if (e) {
                    state.onDrop();
                }
                if (onDragEndT) {
                    onDragEndT(state);
                }
            }
            DragManager.destroyDraggingElement(state);
        };
        this.onTouchMove = (e) => {
            let { onDragMoveT } = this.props;
            if (this.waitingMove) {
                if (!this.checkFirstMove(e)) {
                    return;
                }
            }
            else if (e.touches.length !== 1) {
                this.onTouchEnd();
            }
            else {
                let state = new DragManager.DragState(e, this);
                state.onMove();
                if (onDragMoveT) {
                    onDragMoveT(state);
                }
            }
            e.preventDefault();
        };
        this.onTouchEnd = (e) => {
            let { onDragEndT } = this.props;
            let state = new DragManager.DragState(e, this);
            document.removeEventListener('touchmove', this.onTouchMove);
            document.removeEventListener('touchend', this.onTouchEnd);
            this.cleanup(state);
            if (!this.waitingMove) {
                if (e) {
                    state.onDrop();
                }
                if (onDragEndT) {
                    onDragEndT(state);
                }
            }
            DragManager.destroyDraggingElement(state);
        };
        this.onKeyDown = (e) => {
            if (e.key === 'Escape') {
                this.onEnd();
            }
        };
    }
    addListeners(e) {
        let { onDragStartT } = this.props;
        if (this.dragType) {
            this.onEnd();
        }
        if (e.nativeEvent.type === 'touchstart') {
            document.addEventListener('touchmove', this.onTouchMove);
            document.addEventListener('touchend', this.onTouchEnd);
            this.dragType = 'touch';
        }
        else {
            document.addEventListener('mousemove', this.onMouseMove);
            document.addEventListener('mouseup', this.onMouseEnd);
            if (e.nativeEvent.button === 2) {
                this.dragType = 'right';
            }
            else {
                this.dragType = 'left';
            }
        }
        document.body.classList.add('dock-dragging');
        this.waitingMove = true;
    }
    // return true for a valid move
    checkFirstMove(e) {
        let state = new DragManager.DragState(e, this, true);
        if (!state.moved()) {
            // not a move
            return false;
        }
        return this.executeFirstMove(state);
    }
    executeFirstMove(state) {
        let { onDragStartT } = this.props;
        this.waitingMove = false;
        onDragStartT(state);
        if (!DragManager.isDragging()) {
            this.onEnd();
            return false;
        }
        state.onMove();
        document.addEventListener('keydown', this.onKeyDown);
        return true;
    }
    cleanup(e) {
        this.dragType = null;
        this.waitingMove = false;
        document.body.classList.remove('dock-dragging');
        document.removeEventListener('keydown', this.onKeyDown);
    }
    onEnd() {
        if (this.dragType === 'touch') {
            this.onTouchEnd();
        }
        else {
            this.onMouseEnd();
        }
    }
    render() {
        let _a = this.props, { getRef, children, className, directDragT, onDragStartT, onDragMoveT, onDragEndT, onDragOverT, onDragLeaveT, onDropT } = _a, others = __rest(_a, ["getRef", "children", "className", "directDragT", "onDragStartT", "onDragMoveT", "onDragEndT", "onDragOverT", "onDragLeaveT", "onDropT"]);
        let onPointerDown = this.onPointerDown;
        if (!onDragStartT) {
            onPointerDown = null;
        }
        if (onDragStartT) {
            if (className) {
                className = `${className} drag-initiator`;
            }
            else {
                className = 'drag-initiator';
            }
        }
        return (react_1.default.createElement("div", Object.assign({ ref: this._getRef, className: className }, others, { onMouseDown: onPointerDown, onTouchStart: onPointerDown }), children));
    }
    componentWillUnmount() {
        let { onDragOverT } = this.props;
        if (this.element && onDragOverT) {
            DragManager.removeHandlers(this.element);
        }
        if (this.dragType) {
            this.onEnd();
        }
    }
}
exports.DragDropDiv = DragDropDiv;
//# sourceMappingURL=DragDropDiv.js.map