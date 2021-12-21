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
import React from "react";
import * as DragManager from "./DragManager";
import { GestureState } from "./GestureManager";
import { DragSource, DropTarget } from "react-dnd";
import { ITEM_TYPE_COMPONENT } from "../Constants";
// tslint:disable-next-line:no-duplicate-imports
import { dragEnd, DragState } from "./DragManager";
import _ from "lodash";
import { DockContextType } from "../DockData";
import { v4 as uuid } from "uuid";
class RcDragDropDiv extends React.PureComponent {
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
        let _a = this.props, { getRef, children, className, directDragT, onDragStartT, onDragMoveT, onDragEndT, onDragOverT, onDragLeaveT, onDropT, onGestureStartT, onGestureMoveT, onGestureEndT, useRightButtonDragT, extraData } = _a, others = __rest(_a, ["getRef", "children", "className", "directDragT", "onDragStartT", "onDragMoveT", "onDragEndT", "onDragOverT", "onDragLeaveT", "onDropT", "onGestureStartT", "onGestureMoveT", "onGestureEndT", "useRightButtonDragT", "extraData"]);
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
class DndDragDropDiv extends React.PureComponent {
    constructor() {
        super(...arguments);
        this._getRef = (r) => {
            let { getRef } = this.props;
            this.element = r;
            if (getRef) {
                getRef(r);
            }
        };
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.isOver === true && this.props.isOver === false) {
            if (this.props.onDragLeaveT) {
                const state = new DragManager.DragState(undefined, this);
                this.props.onDragLeaveT(state);
            }
        }
    }
    render() {
        let _a = this.props, { getRef, children, className, directDragT, onDragStartT, onDragMoveT, onDragEndT, onDragOverT, onDragLeaveT, onDropT, onGestureStartT, onGestureMoveT, onGestureEndT, useRightButtonDragT, extraData, 
        // drag props
        isDragging, connectDragSource, 
        // drop props
        isOver, canDrop, connectDropTarget, isOverCurrent, itemType } = _a, others = __rest(_a, ["getRef", "children", "className", "directDragT", "onDragStartT", "onDragMoveT", "onDragEndT", "onDragOverT", "onDragLeaveT", "onDropT", "onGestureStartT", "onGestureMoveT", "onGestureEndT", "useRightButtonDragT", "extraData", "isDragging", "connectDragSource", "isOver", "canDrop", "connectDropTarget", "isOverCurrent", "itemType"]);
        if (canDrag(this.props)) {
            if (className) {
                className = `${className} drag-initiator`;
            }
            else {
                className = 'drag-initiator';
            }
        }
        return (connectDragSource(connectDropTarget(React.createElement("div", Object.assign({ ref: this._getRef, className: className }, others), children))));
    }
}
DndDragDropDiv.contextType = DockContextType;
const dropSpec = {
    canDrop(props, monitor) {
        return true;
    },
    hover(props, monitor, component) {
        const state = createDragState(monitor, component);
        const dockId = component.context.getDockId();
        const tab = getTabByDockId(dockId);
        if (!tab && monitor.getItem().externalData) {
            const tab = monitor.getItem().externalData.tab.id ?
                monitor.getItem().externalData.tab : Object.assign({ id: uuid() }, monitor.getItem().externalData.tab);
            state.setData({
                tab,
                panelSize: [400, 300]
            }, dockId);
        }
        if (props.onDragOverT) {
            props.onDragOverT(state);
        }
    },
    drop(props, monitor, component) {
        var _a, _b, _c, _d, _e, _f;
        if (monitor.didDrop()) {
            return;
        }
        const currentDockId = (_c = (_b = (_a = component === null || component === void 0 ? void 0 : component.decoratedRef) === null || _a === void 0 ? void 0 : _a.current) === null || _b === void 0 ? void 0 : _b.context) === null || _c === void 0 ? void 0 : _c.getDockId();
        const externalDockId = (_f = (_e = (_d = monitor === null || monitor === void 0 ? void 0 : monitor.getItem()) === null || _d === void 0 ? void 0 : _d.externalData) === null || _e === void 0 ? void 0 : _e.context) === null || _f === void 0 ? void 0 : _f.getDockId();
        if (currentDockId && externalDockId && currentDockId !== externalDockId && props.onDropT) {
            const tab = DragManager.DragState.getData('tab', currentDockId);
            externalDockId.dockMove(tab, null, 'remove');
        }
        const state = createDragState(monitor, component);
        let didDrop = false;
        if (props.onDropT) {
            props.onDropT(state);
            didDrop = true;
        }
        if (props.onDragEndT) {
            props.onDragEndT(state);
        }
        dragEnd();
        return { state, didDrop };
    }
};
function createDragState(monitor, component) {
    const clientOffset = monitor.getClientOffset();
    const state = new DragManager.DragState(undefined, component);
    if (!clientOffset) {
        return state;
    }
    state.clientX = clientOffset.x;
    state.clientY = clientOffset.y;
    state.pageX = clientOffset.x;
    state.pageY = clientOffset.y;
    state.dx = (state.pageX - monitor.getItem().baseX) * monitor.getItem().scaleX;
    state.dy = (state.pageY - monitor.getItem().baseY) * monitor.getItem().scaleY;
    return state;
}
function canDrag(props) {
    var _a, _b, _c, _d, _e, _f;
    if (props.role === "tab" &&
        ((_c = (_b = (_a = props.extraData) === null || _a === void 0 ? void 0 : _a.parent) === null || _b === void 0 ? void 0 : _b.parent) === null || _c === void 0 ? void 0 : _c.mode) === 'float' &&
        ((_f = (_e = (_d = props.extraData) === null || _d === void 0 ? void 0 : _d.parent) === null || _e === void 0 ? void 0 : _e.tabs) === null || _f === void 0 ? void 0 : _f.length) === 1) {
        return false;
    }
    return props.onDragStartT !== undefined || props.onGestureStartT !== undefined;
}
function getTabByDockId(dockId) {
    var _a;
    const tab = DragState.getData('tab', dockId);
    const panel = DragState.getData('panel', dockId);
    if (tab) {
        return tab;
    }
    if (((_a = panel === null || panel === void 0 ? void 0 : panel.tabs) === null || _a === void 0 ? void 0 : _a.length) === 1) {
        return panel.tabs[0];
    }
    return null;
}
function dropCollect(connect, monitor) {
    return {
        connectDropTarget: connect.dropTarget(),
        isOver: monitor.isOver(),
        isOverCurrent: monitor.isOver({ shallow: true }),
        canDrop: monitor.canDrop(),
        itemType: monitor.getItemType()
    };
}
const dragSpec = {
    canDrag(props) {
        return canDrag(props);
    },
    isDragging(props, monitor) {
        return true;
    },
    beginDrag(props, monitor, component) {
        const clientOffset = monitor.getClientOffset();
        const state = new DragManager.DragState(undefined, component);
        if (props.onDragEndT) {
            props.onDragEndT(state);
        }
        dragEnd();
        if (props.onDragStartT) {
            props.onDragStartT(state);
        }
        const dockId = component.context.getDockId();
        const tab = getTabByDockId(dockId);
        let baseElement = component.element.parentElement;
        let rect = baseElement.getBoundingClientRect();
        const item = {
            baseX: clientOffset.x,
            baseY: clientOffset.y,
            element: component.element,
            scaleX: baseElement.offsetWidth / Math.round(rect.width),
            scaleY: baseElement.offsetHeight / Math.round(rect.height),
        };
        if (tab) {
            item.externalData = {
                tab,
                context: component.context
            };
        }
        return item;
    },
    endDrag(props, monitor, component) {
        if (!monitor.didDrop()) {
            const state = createDragState(monitor, component);
            if (props.onDragEndT) {
                props.onDragEndT(state);
            }
            dragEnd();
            return;
        }
        const { state } = monitor.getDropResult();
        if (props.onDragMoveT) {
            props.onDragMoveT(state);
        }
        if (props.onDragEndT) {
            props.onDragEndT(state);
        }
        dragEnd();
    }
};
function dragCollect(connect, monitor) {
    return {
        connectDragSource: connect.dragSource(),
        isDragging: monitor.isDragging()
    };
}
const EnhancedDndDragDropDiv = _.flow(DragSource(ITEM_TYPE_COMPONENT, dragSpec, dragCollect), DropTarget(ITEM_TYPE_COMPONENT, dropSpec, dropCollect))(DndDragDropDiv);
export { EnhancedDndDragDropDiv as DragDropDiv };
