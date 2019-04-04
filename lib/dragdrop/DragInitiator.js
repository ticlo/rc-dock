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
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const DragManager_1 = require("./DragManager");
class DragInitiator extends react_1.default.Component {
    constructor() {
        super(...arguments);
        this._getRef = (r) => {
            this._ref = r;
            let { getRef } = this.props;
            if (getRef) {
                getRef(r);
            }
            let { onDragOver, onDrop, onDragLeave } = this.props;
            if (onDragOver) {
                DragManager_1.DragManager.addHandlers(r, { onDragOver, onDragLeave, onDrop });
            }
        };
        this.dragging = false;
        this.isTouch = false;
        this.onPointerDown = (e) => {
            let { onDragInit, onDragStart } = this.props;
            if (onDragInit) {
                onDragInit(e.nativeEvent, (referenceElement, moveListener, endListener) => {
                    // simple drag move that doesn't use DragManager
                    if (this.dragging) {
                        this.onEnd();
                    }
                    this.baseX = e.pageX;
                    this.baseY = e.pageY;
                    if (!referenceElement) {
                        referenceElement = e.nativeEvent.target.parentElement;
                    }
                    let rect = referenceElement.getBoundingClientRect();
                    this.scaleX = referenceElement.offsetWidth / rect.width;
                    this.scaleY = referenceElement.offsetHeight / rect.height;
                    this.moveListener = moveListener;
                    this.endListener = endListener;
                    this.addListeners(e);
                });
            }
            if (onDragStart && !this.dragging) {
                this.waitingMove = true;
                this.addListeners(e);
            }
        };
        this.onMouseMove = (e) => {
            if (e && this.moveListener) {
                let { pageX, pageY } = e;
                this.moveListener(e, (pageX - this.baseX) * this.scaleX, (pageY - this.baseY) * this.scaleY, pageX, pageY);
            }
            e.preventDefault();
        };
        this.onMouseEnd = (e) => {
            if (e && this.endListener) {
                let { pageX, pageY } = e;
                this.endListener(e, (pageX - this.baseX) * this.scaleX, (pageY - this.baseY) * this.scaleY, pageX, pageY);
            }
            document.removeEventListener('mousemove', this.onMouseMove);
            document.removeEventListener('mouseup', this.onMouseEnd);
            this.moveListener = null;
            this.endListener = null;
            this.dragging = false;
        };
        this.onTouchMove = (e) => {
            if (e.touches.length !== 1) {
                this.onTouchEnd();
            }
            else if (this.moveListener) {
                let { pageX, pageY } = e.touches[0];
                this.moveListener(e, (pageX - this.baseX) * this.scaleX, (pageY - this.baseY) * this.scaleY, pageX, pageY);
            }
            e.preventDefault();
        };
        this.onTouchEnd = (e) => {
            if (this.endListener) {
                if (e) {
                    let { pageX, pageY } = e.changedTouches[0];
                    this.endListener(e, (pageX - this.baseX) * this.scaleX, (pageY - this.baseY) * this.scaleY, pageX, pageY);
                }
                else {
                    // canceled
                    this.endListener(null, 0, 0, 0, 0);
                }
            }
            document.removeEventListener('touchmove', this.onTouchMove);
            document.removeEventListener('touchend', this.onTouchEnd);
            this.dragging = false;
        };
    }
    addListeners(e) {
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
        this.dragging = true;
        e.stopPropagation();
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
        let _a = this.props, { children, onDragInit, onDragStart, onDragOver, onDragLeave, onDrop } = _a, others = __rest(_a, ["children", "onDragInit", "onDragStart", "onDragOver", "onDragLeave", "onDrop"]);
        let onPointerDown = this.onPointerDown;
        if (!(onDragInit || onDragStart)) {
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
exports.DragInitiator = DragInitiator;
//# sourceMappingURL=DragInitiator.js.map