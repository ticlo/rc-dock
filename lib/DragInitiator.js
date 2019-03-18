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
class DragInitiator extends react_1.default.Component {
    constructor() {
        super(...arguments);
        this.dragging = false;
        this.isTouch = false;
        this.onPointerDown = (e) => {
            let { onDragInit } = this.props;
            if (onDragInit) {
                onDragInit(e.nativeEvent, (referenceElement, moveListener, endListener) => {
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
                });
            }
        };
        this.onMouseMove = (e) => {
            if (e && this.moveListener) {
                this.moveListener(e, (e.pageX - this.baseX) * this.scaleX, (e.pageY - this.baseY) * this.scaleY);
            }
            e.preventDefault();
        };
        this.onMouseEnd = (e) => {
            if (e && this.endListener) {
                this.endListener(e, (e.pageX - this.baseX) * this.scaleX, (e.pageY - this.baseY) * this.scaleY);
            }
            document.removeEventListener('mousemove', this.onMouseMove);
            document.removeEventListener('mouseup', this.onMouseEnd);
            this.dragging = false;
        };
        this.onTouchMove = (e) => {
            if (e.touches.length !== 1) {
                this.onTouchEnd();
            }
            else if (this.moveListener) {
                this.moveListener(e, (e.touches[0].pageX - this.baseX) * this.scaleX, (e.touches[0].pageY - this.baseY) * this.scaleY);
            }
            e.preventDefault();
        };
        this.onTouchEnd = (e) => {
            if (this.endListener) {
                if (e) {
                    this.endListener(e, (e.changedTouches[0].pageX - this.baseX) * this.scaleX, (e.changedTouches[0].pageY - this.baseY) * this.scaleY);
                }
                else {
                    // canceled
                    this.endListener(null, 0, 0);
                }
            }
            document.removeEventListener('touchmove', this.onTouchMove);
            document.removeEventListener('touchend', this.onTouchEnd);
            this.dragging = false;
        };
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
        let _a = this.props, { getRef, children, onDragInit, onPointerDown } = _a, others = __rest(_a, ["getRef", "children", "onDragInit", "onPointerDown"]);
        return (react_1.default.createElement("div", Object.assign({ ref: getRef }, others, { onPointerDown: this.onPointerDown }), children));
    }
    componentWillUnmount() {
        if (this.dragging) {
            this.onEnd();
        }
    }
}
exports.DragInitiator = DragInitiator;
//# sourceMappingURL=DragInitiator.js.map