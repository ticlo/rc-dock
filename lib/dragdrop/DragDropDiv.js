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
            this.element = r;
            let { getRef } = this.props;
            if (getRef) {
                getRef(r);
            }
            let { onDragOver, onDrop, onDragLeave } = this.props;
            if (onDragOver) {
                DragManager.addHandlers(r, { onDragOver, onDragLeave, onDrop });
            }
        };
        this.dragging = false;
        this.isTouch = false;
        this.onPointerDown = (e) => {
            this.addListeners(e);
        };
        this.onMouseMove = (e) => {
            let { onDragMove } = this.props;
            if (this.waitingMove) {
                if (!this.checkFirstMove(e)) {
                    return;
                }
            }
            else {
                let state = new DragManager.DragState(e, this);
                if (onDragMove) {
                    onDragMove(state);
                }
                state.moved();
            }
            e.preventDefault();
        };
        this.onMouseEnd = (e) => {
            let { onDragEnd } = this.props;
            let state = new DragManager.DragState(e, this);
            if (onDragEnd) {
                onDragEnd(state);
            }
            state.dropped();
            document.removeEventListener('mousemove', this.onMouseMove);
            document.removeEventListener('mouseup', this.onMouseEnd);
            this.cleanup();
        };
        this.onTouchMove = (e) => {
            let { onDragMove } = this.props;
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
                if (onDragMove) {
                    onDragMove(state);
                }
                state.moved();
            }
            e.preventDefault();
        };
        this.onTouchEnd = (e) => {
            let { onDragEnd } = this.props;
            let state = new DragManager.DragState(e, this);
            if (onDragEnd) {
                onDragEnd(state);
            }
            state.dropped();
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
    startDrag(element, state) {
        if (!element) {
            element = this.element;
        }
        this.baseX = state.pageX;
        this.baseY = state.pageY;
        let rect = element.getBoundingClientRect();
        this.scaleX = element.offsetWidth / rect.width;
        this.scaleY = element.offsetHeight / rect.height;
    }
    addListeners(e) {
        let { onDragStart } = this.props;
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
        e.stopPropagation();
    }
    // return true
    checkFirstMove(e) {
        let { onDragStart } = this.props;
        this.waitingMove = false;
        let state = new DragManager.DragState(e, this, true);
        onDragStart(state);
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
        let _a = this.props, { children, onDragStart, onDragMove, onDragEnd, onDragOver, onDragLeave, onDrop } = _a, others = __rest(_a, ["children", "onDragStart", "onDragMove", "onDragEnd", "onDragOver", "onDragLeave", "onDrop"]);
        let onPointerDown = this.onPointerDown;
        if (!onDragStart) {
            onPointerDown = null;
        }
        return (react_1.default.createElement("div", Object.assign({ ref: this._getRef }, others, { onPointerDown: this.onPointerDown }), children));
    }
    componentWillUnmount() {
        if (this.dragging) {
            this.onEnd();
        }
    }
}
exports.DragDropDiv = DragDropDiv;
//# sourceMappingURL=DragDropDiv.js.map