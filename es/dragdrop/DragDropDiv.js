var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import * as React from "react";
import * as DragManager from "./DragManager";
import { GestureState } from "./GestureManager";
export class DragDropDiv extends React.PureComponent {
    constructor() {
        super(...arguments);
        this._getRef = (r) => {
            if (r === this.element) {
                return;
            }
            let { getRef, onDragOverT } = this.props;
            if (this.element && onDragOverT) {
                DragManager.removeHandlers(this.element);
            }
            this.element = r;
            if (r) {
                this.ownerDocument = r.ownerDocument;
            }
            if (getRef) {
                getRef(r);
            }
            if (r && onDragOverT) {
                DragManager.addHandlers(r, this.props);
            }
        };
        this.dragType = null;
        this.waitingMove = false;
        this.listening = false;
        this.gesturing = false;
        this.onPointerDown = (e) => {
            let nativeTarget = e.nativeEvent.target;
            if (nativeTarget instanceof HTMLInputElement || nativeTarget instanceof HTMLTextAreaElement || nativeTarget.classList.contains('drag-ignore')) {
                // ignore drag from input element
                return;
            }
            let { onDragStartT, onGestureStartT, onGestureMoveT, useRightButtonDragT } = this.props;
            let event = e.nativeEvent;
            this.cancel();
            if (event.type === 'touchstart') {
                // check single or double fingure touch
                if (event.touches.length === 1) {
                    if (onDragStartT) {
                        this.onDragStart(event);
                    }
                }
                else if (event.touches.length === 2) {
                    if (onGestureStartT && onGestureMoveT) {
                        this.onGestureStart(event);
                    }
                }
            }
            else if (onDragStartT) {
                if (event.button === 2 && !useRightButtonDragT) {
                    return;
                }
                this.onDragStart(event);
            }
        };
        this.onMouseMove = (e) => {
            let { onDragMoveT } = this.props;
            if (this.waitingMove) {
                if (DragManager.isDragging()) {
                    this.onDragEnd();
                    return;
                }
                if (!this.checkFirstMove(e)) {
                    return;
                }
            }
            else {
                let state = new DragManager.DragState(e, this);
                state._onMove();
                if (onDragMoveT) {
                    onDragMoveT(state);
                }
            }
            e.preventDefault();
        };
        this.onTouchMove = (e) => {
            let { onDragMoveT } = this.props;
            if (this.waitingMove) {
                if (DragManager.isDragging()) {
                    this.onDragEnd();
                    return;
                }
                if (!this.checkFirstMove(e)) {
                    return;
                }
            }
            else if (e.touches.length !== 1) {
                this.onDragEnd();
            }
            else {
                let state = new DragManager.DragState(e, this);
                state._onMove();
                if (onDragMoveT) {
                    onDragMoveT(state);
                }
            }
            e.preventDefault();
        };
        this.onDragEnd = (e) => {
            let { onDragEndT } = this.props;
            let state = new DragManager.DragState(e, this);
            this.removeListeners();
            if (!this.waitingMove) {
                // e=null means drag is canceled
                state._onDragEnd(e == null);
                if (onDragEndT) {
                    onDragEndT(state);
                }
            }
            this.cleanupDrag(state);
        };
        this.onGestureMove = (e) => {
            let { onGestureMoveT, gestureSensitivity } = this.props;
            let state = new GestureState(e, this);
            if (this.waitingMove) {
                if (!(gestureSensitivity > 0)) {
                    gestureSensitivity = 10; // default sensitivity
                }
                if (state.moved() > gestureSensitivity) {
                    this.waitingMove = false;
                }
                else {
                    return;
                }
            }
            if (onGestureMoveT) {
                onGestureMoveT(state);
            }
        };
        this.onGestureEnd = (e) => {
            let { onGestureEndT } = this.props;
            let state = new DragManager.DragState(e, this);
            this.removeListeners();
            if (onGestureEndT) {
                onGestureEndT();
            }
        };
        this.onKeyDown = (e) => {
            if (e.key === 'Escape') {
                this.cancel();
            }
        };
    }
    onDragStart(event) {
        if (DragManager.isDragging()) {
            // same pointer event shouldn't trigger 2 drag start
            return;
        }
        let state = new DragManager.DragState(event, this, true);
        this.baseX = state.pageX;
        this.baseY = state.pageY;
        let baseElement = this.element.parentElement;
        let rect = baseElement.getBoundingClientRect();
        this.scaleX = baseElement.offsetWidth / Math.round(rect.width);
        this.scaleY = baseElement.offsetHeight / Math.round(rect.height);
        this.addDragListeners(event);
        if (this.props.directDragT) {
            this.executeFirstMove(state);
        }
    }
    addDragListeners(event) {
        let { onDragStartT } = this.props;
        if (event.type === 'touchstart') {
            this.ownerDocument.addEventListener('touchmove', this.onTouchMove);
            this.ownerDocument.addEventListener('touchend', this.onDragEnd);
            this.dragType = 'touch';
        }
        else {
            this.ownerDocument.addEventListener('mousemove', this.onMouseMove);
            this.ownerDocument.addEventListener('mouseup', this.onDragEnd);
            if (event.button === 2) {
                this.dragType = 'right';
            }
            else {
                this.dragType = 'left';
            }
        }
        this.waitingMove = true;
        this.listening = true;
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
            this.onDragEnd();
            return false;
        }
        state._onMove();
        this.ownerDocument.addEventListener('keydown', this.onKeyDown);
        return true;
    }
    addGestureListeners(event) {
        this.ownerDocument.addEventListener('touchmove', this.onGestureMove);
        this.ownerDocument.addEventListener('touchend', this.onGestureEnd);
        this.ownerDocument.addEventListener('keydown', this.onKeyDown);
        this.gesturing = true;
        this.waitingMove = true;
    }
    onGestureStart(event) {
        if (!DragManager.isDragging()) {
            // same pointer event shouldn't trigger 2 drag start
            return;
        }
        let { onGestureStartT } = this.props;
        this.baseX = event.touches[0].pageX;
        this.baseY = event.touches[0].pageY;
        this.baseX2 = event.touches[1].pageX;
        this.baseY2 = event.touches[1].pageY;
        let baseElement = this.element.parentElement;
        let rect = baseElement.getBoundingClientRect();
        this.scaleX = baseElement.offsetWidth / Math.round(rect.width);
        this.scaleY = baseElement.offsetHeight / Math.round(rect.height);
        this.baseDis = Math.sqrt(Math.pow(this.baseX - this.baseX2, 2) + Math.pow(this.baseY - this.baseY2, 2));
        this.baseAng = Math.atan2(this.baseY2 - this.baseY, this.baseX2 - this.baseX);
        let state = new GestureState(event, this, true);
        if (onGestureStartT(state)) {
            this.addGestureListeners(event);
            event.preventDefault();
        }
    }
    cancel() {
        if (this.listening) {
            this.onDragEnd();
        }
        if (this.gesturing) {
            this.onGestureEnd();
        }
    }
    removeListeners() {
        if (this.gesturing) {
            this.ownerDocument.removeEventListener('touchmove', this.onGestureMove);
            this.ownerDocument.removeEventListener('touchend', this.onGestureEnd);
        }
        else if (this.listening) {
            if (this.dragType === 'touch') {
                this.ownerDocument.removeEventListener('touchmove', this.onTouchMove);
                this.ownerDocument.removeEventListener('touchend', this.onDragEnd);
            }
            else {
                this.ownerDocument.removeEventListener('mousemove', this.onMouseMove);
                this.ownerDocument.removeEventListener('mouseup', this.onDragEnd);
            }
        }
        this.ownerDocument.removeEventListener('keydown', this.onKeyDown);
        this.listening = false;
        this.gesturing = false;
    }
    cleanupDrag(state) {
        this.dragType = null;
        this.waitingMove = false;
    }
    render() {
        let _a = this.props, { getRef, children, className, directDragT, onDragStartT, onDragMoveT, onDragEndT, onDragOverT, onDragLeaveT, onDropT, onGestureStartT, onGestureMoveT, onGestureEndT, useRightButtonDragT } = _a, others = __rest(_a, ["getRef", "children", "className", "directDragT", "onDragStartT", "onDragMoveT", "onDragEndT", "onDragOverT", "onDragLeaveT", "onDropT", "onGestureStartT", "onGestureMoveT", "onGestureEndT", "useRightButtonDragT"]);
        let onTouchDown = this.onPointerDown;
        let onMouseDown = this.onPointerDown;
        if (!onDragStartT) {
            onMouseDown = null;
            if (!onGestureStartT) {
                onTouchDown = null;
            }
        }
        if (onDragStartT || onGestureStartT) {
            if (className) {
                className = `${className} drag-initiator`;
            }
            else {
                className = 'drag-initiator';
            }
        }
        return (React.createElement("div", Object.assign({ ref: this._getRef, className: className }, others, { onMouseDown: onMouseDown, onTouchStart: onTouchDown }), children));
    }
    componentDidUpdate(prevProps) {
        let { onDragOverT, onDragEndT, onDragLeaveT } = this.props;
        if (this.element
            && (prevProps.onDragOverT !== onDragOverT
                || prevProps.onDragLeaveT !== onDragLeaveT
                || prevProps.onDragEndT !== onDragEndT)) {
            if (onDragOverT) {
                DragManager.addHandlers(this.element, this.props);
            }
            else {
                DragManager.removeHandlers(this.element);
            }
        }
    }
    componentWillUnmount() {
        let { onDragOverT } = this.props;
        if (this.element && onDragOverT) {
            DragManager.removeHandlers(this.element);
        }
        this.cancel();
    }
}
