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
        this.dragging = false;
        this.isTouch = false;
        this.onPointerDown = (e) => {
            if (!DragManager.checkPointerDownEvent(e.nativeEvent)) {
                // same pointer event shouldn't trigger 2 drag start
                return;
            }
            this.baseX = e.pageX;
            this.baseY = e.pageY;
            let baseElement = this.element.parentElement;
            let rect = baseElement.getBoundingClientRect();
            this.scaleX = baseElement.offsetWidth / rect.width;
            this.scaleY = baseElement.offsetHeight / rect.height;
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
                if (onDragMoveT) {
                    onDragMoveT(state);
                }
                state.moved();
            }
            e.preventDefault();
        };
        this.onMouseEnd = (e) => {
            let { onDragEndT } = this.props;
            let state = new DragManager.DragState(e, this);
            if (onDragEndT) {
                onDragEndT(state);
            }
            if (e) {
                state.dropped();
            }
            document.removeEventListener('mousemove', this.onMouseMove);
            document.removeEventListener('mouseup', this.onMouseEnd);
            this.cleanup();
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
                if (onDragMoveT) {
                    onDragMoveT(state);
                }
                state.moved();
            }
            e.preventDefault();
        };
        this.onTouchEnd = (e) => {
            let { onDragEndT } = this.props;
            let state = new DragManager.DragState(e, this);
            if (onDragEndT) {
                onDragEndT(state);
            }
            if (e) {
                state.dropped();
            }
            document.removeEventListener('touchmove', this.onTouchMove);
            document.removeEventListener('touchend', this.onTouchEnd);
            this.cleanup();
        };
        this.onKeyDown = (e) => {
            if (e.key === 'Escape') {
                this.onEnd();
            }
        };
    }
    addListeners(e) {
        let { onDragStartT } = this.props;
        if (this.dragging) {
            this.onEnd();
        }
        if (e.pointerType === 'touch') {
            this.isTouch = true;
            document.addEventListener('touchmove', this.onTouchMove);
            document.addEventListener('touchend', this.onTouchEnd);
        }
        else {
            this.isTouch = false;
            document.addEventListener('mousemove', this.onMouseMove);
            document.addEventListener('mouseup', this.onMouseEnd);
        }
        this.waitingMove = true;
        this.dragging = true;
    }
    // return true for a valid move
    checkFirstMove(e) {
        let state = new DragManager.DragState(e, this, true);
        if (state.dx === 0 && state.dy === 0) {
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
        state.moved();
        document.addEventListener('keydown', this.onKeyDown);
        return true;
    }
    cleanup() {
        this.dragging = false;
        this.waitingMove = false;
        document.removeEventListener('keydown', this.onKeyDown);
        DragManager.destroyDraggingElement();
    }
    onEnd() {
        if (this.isTouch) {
            this.onTouchEnd();
        }
        else {
            this.onMouseEnd();
        }
    }
    render() {
        let _a = this.props, { getRef, children, onDragStartT, onDragMoveT, onDragEndT, onDragOverT, onDragLeaveT, onDropT, className, onPointerDown } = _a, others = __rest(_a, ["getRef", "children", "onDragStartT", "onDragMoveT", "onDragEndT", "onDragOverT", "onDragLeaveT", "onDropT", "className", "onPointerDown"]);
        if (!onPointerDown && onDragStartT) {
            onPointerDown = this.onPointerDown;
        }
        if (onDragStartT) {
            if (className) {
                className = `${className} drag-initiator`;
            }
            else {
                className = 'drag-initiator';
            }
        }
        return (react_1.default.createElement("div", Object.assign({ ref: this._getRef, className: className }, others, { onPointerDown: onPointerDown }), children));
    }
    componentWillUnmount() {
        let { onDragOverT } = this.props;
        if (this.element && onDragOverT) {
            DragManager.removeHandlers(this.element);
        }
        if (this.dragging) {
            this.onEnd();
        }
    }
}
exports.DragDropDiv = DragDropDiv;
//# sourceMappingURL=DragDropDiv.js.map