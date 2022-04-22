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
import React, { useContext, useMemo } from "react";
import * as DragManager from "./DragManager";
// tslint:disable-next-line:no-duplicate-imports
import { dragEnd, getTabByDockId } from "./DragManager";
import { GestureState } from "./GestureManager";
import { ITEM_TYPE_DEFAULT } from "../Constants";
import _ from "lodash";
import { DockContextType } from "../DockData";
import { v4 as uuid } from "uuid";
import { DragSource, DropTarget } from "react-dnd";
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
        let _a = this.props, { getRef, children, className, directDragT, onDragStartT, onDragMoveT, onDragEndT, onDragOverT, onDragLeaveT, onDropT, onGestureStartT, onGestureMoveT, onGestureEndT, useRightButtonDragT, tabData } = _a, others = __rest(_a, ["getRef", "children", "className", "directDragT", "onDragStartT", "onDragMoveT", "onDragEndT", "onDragOverT", "onDragLeaveT", "onDropT", "onGestureStartT", "onGestureMoveT", "onGestureEndT", "useRightButtonDragT", "tabData"]);
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
        this.dragType = "left";
        this.baseX = 0;
        this.baseY = 0;
        this.scaleX = 0;
        this.scaleY = 0;
        this._getRef = (r) => {
            let { getRef } = this.props;
            this.element = r;
            if (r) {
                this.ownerDocument = r.ownerDocument;
            }
            if (getRef) {
                getRef(r);
            }
        };
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.isOver && !this.props.isOver) {
            if (this.props.onDragLeaveT) {
                const state = new DragManager.DragState(undefined, this);
                this.props.onDragLeaveT(state);
            }
        }
    }
    render() {
        let _a = this.props, { getRef, children, className, directDragT, onDragStartT, onDragMoveT, onDragEndT, onDragOverT, onDragLeaveT, onDropT, onGestureStartT, onGestureMoveT, onGestureEndT, useRightButtonDragT, tabData, 
        // drag props
        isDragging, connectDragSource, 
        // drop props
        isOver, canDrop, connectDropTarget, isOverCurrent, itemType, 
        // external data props
        dndSpec, externalData } = _a, others = __rest(_a, ["getRef", "children", "className", "directDragT", "onDragStartT", "onDragMoveT", "onDragEndT", "onDragOverT", "onDragLeaveT", "onDropT", "onGestureStartT", "onGestureMoveT", "onGestureEndT", "useRightButtonDragT", "tabData", "isDragging", "connectDragSource", "isOver", "canDrop", "connectDropTarget", "isOverCurrent", "itemType", "dndSpec", "externalData"]);
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
function canDrop(monitor, component) {
    const item = monitor.getItem();
    return !item.checkParent(component.element);
}
const dropSpec = {
    canDrop(props, monitor) {
        return true;
    },
    hover: _.debounce(((props, monitor, component) => {
        var _a;
        const dockId = component.context.getDockId();
        const tab = getTabByDockId(dockId);
        const item = monitor.getItem();
        const externalTab = (_a = item === null || item === void 0 ? void 0 : item.externalData) === null || _a === void 0 ? void 0 : _a.tab;
        const clientOffset = monitor.getClientOffset();
        const state = createDragState(clientOffset, component);
        if (!tab && externalTab) {
            const tab = externalTab.id ?
                externalTab : Object.assign({ id: uuid() }, externalTab);
            state.setData({
                tab,
                panelSize: [400, 300]
            }, dockId);
        }
        if (props.onDragOverT && monitor.isOver({ shallow: true })) {
            if (!canDrop(monitor, component)) {
                return;
            }
            props.onDragOverT(state);
        }
    }), 1000 / 60 * 3),
    drop(props, monitor, component) {
        var _a, _b, _c, _d, _e, _f, _g, _h;
        this.hover.cancel();
        const item = monitor.getItem();
        if (monitor.didDrop()) {
            return;
        }
        const decoratedComponent = (_a = component === null || component === void 0 ? void 0 : component.decoratedRef) === null || _a === void 0 ? void 0 : _a.current;
        const clientOffset = ((_b = monitor.getDropResult()) === null || _b === void 0 ? void 0 : _b.clientOffset) || monitor.getClientOffset();
        if (!canDrop(monitor, decoratedComponent)) {
            return {
                clientOffset: clientOffset
            };
        }
        const tab = (_c = item === null || item === void 0 ? void 0 : item.externalData) === null || _c === void 0 ? void 0 : _c.tab;
        const currentDockId = (_d = decoratedComponent === null || decoratedComponent === void 0 ? void 0 : decoratedComponent.context) === null || _d === void 0 ? void 0 : _d.getDockId();
        const externalDockId = (_f = (_e = item === null || item === void 0 ? void 0 : item.externalData) === null || _e === void 0 ? void 0 : _e.context) === null || _f === void 0 ? void 0 : _f.getDockId();
        const state = createDragState(clientOffset, decoratedComponent);
        if (currentDockId && externalDockId && currentDockId !== externalDockId) {
            if (!tab) {
                return {
                    clientOffset: clientOffset
                };
            }
            if (props.onDropT) {
                externalDockId.dockMove(tab, null, 'remove');
            }
        }
        if (props.onDropT) {
            props.onDropT(state);
            const drop = (_h = (_g = props.dndSpec) === null || _g === void 0 ? void 0 : _g.dropTargetSpec) === null || _h === void 0 ? void 0 : _h.drop;
            if (drop) {
                drop(monitor, decoratedComponent);
            }
        }
        dragEnd();
        const result = {
            clientOffset: clientOffset
        };
        if (props.externalData) {
            result.externalData = props.externalData;
        }
        return result;
    }
};
function createDragState(clientOffset, component) {
    const state = new DragManager.DragState(undefined, component);
    state.clientX = (clientOffset === null || clientOffset === void 0 ? void 0 : clientOffset.x) || 0;
    state.clientY = (clientOffset === null || clientOffset === void 0 ? void 0 : clientOffset.y) || 0;
    state.pageX = (clientOffset === null || clientOffset === void 0 ? void 0 : clientOffset.x) || 0;
    state.pageY = (clientOffset === null || clientOffset === void 0 ? void 0 : clientOffset.y) || 0;
    return state;
}
function canDrag(props) {
    var _a, _b, _c, _d, _e, _f;
    if (props.role === "tab" &&
        ((_c = (_b = (_a = props.tabData) === null || _a === void 0 ? void 0 : _a.parent) === null || _b === void 0 ? void 0 : _b.parent) === null || _c === void 0 ? void 0 : _c.mode) === 'float' &&
        ((_f = (_e = (_d = props.tabData) === null || _d === void 0 ? void 0 : _d.parent) === null || _e === void 0 ? void 0 : _e.tabs) === null || _f === void 0 ? void 0 : _f.length) === 1) {
        return false;
    }
    return props.onDragStartT !== undefined || props.onGestureStartT !== undefined;
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
        const baseElement = component.element.parentElement;
        const rect = baseElement.getBoundingClientRect();
        const item = {
            baseX: clientOffset.x,
            baseY: clientOffset.y,
            element: component.element,
            checkParent(target) {
                const tabId = tab === null || tab === void 0 ? void 0 : tab.id;
                const closestParent = target.closest(`[data-tab-id=dock-${tabId}]`);
                if (!closestParent) {
                    return false;
                }
                return closestParent.id === tabId;
            },
            scaleX: baseElement.offsetWidth / Math.round(rect.width),
            scaleY: baseElement.offsetHeight / Math.round(rect.height),
            externalData: {
                context: component.context,
                extra: props.externalData,
                tab
            }
        };
        return item;
    },
    endDrag(props, monitor, component) {
        var _a, _b, _c;
        const dropResult = monitor.getDropResult();
        const item = monitor.getItem();
        const didDrop = monitor.didDrop();
        const clientOffset = ((_a = monitor.getDropResult()) === null || _a === void 0 ? void 0 : _a.clientOffset) || monitor.getClientOffset();
        const state = createDragState(clientOffset, component);
        state.dx = (state.pageX - item.baseX) * item.scaleX;
        state.dy = (state.pageY - item.baseY) * item.scaleY;
        if (props.onDragMoveT && didDrop) {
            props.onDragMoveT(state);
        }
        if (props.onDragEndT) {
            props.onDragEndT(state);
        }
        if (dropResult === null || dropResult === void 0 ? void 0 : dropResult.dropOutside) {
            const externalDockId = (_c = (_b = item === null || item === void 0 ? void 0 : item.externalData) === null || _b === void 0 ? void 0 : _b.context) === null || _c === void 0 ? void 0 : _c.getDockId();
            if (externalDockId) {
                const tab = item === null || item === void 0 ? void 0 : item.externalData.tab;
                externalDockId.dockMove(tab, null, 'remove');
            }
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
const withDndSpec = (WrappedComponent) => {
    return (props) => {
        // @ts-ignore
        const { props: { defaultDndSpec } } = useContext(DockContextType);
        return (React.createElement(WrappedComponent, Object.assign({ dndSpec: useMemo(() => defaultDndSpec, []) }, props)));
    };
};
const withExternalData = (WrappedComponent) => {
    return (props) => {
        // @ts-ignore
        const { props: { externalData } } = useContext(DockContextType);
        return (React.createElement(WrappedComponent, Object.assign({ externalData: externalData }, props)));
    };
};
const EnhancedDndDragDropDiv = withExternalData(withDndSpec(_.flow(DragSource(({ dndSpec }) => { var _a; return ((_a = dndSpec === null || dndSpec === void 0 ? void 0 : dndSpec.dragSourceSpec) === null || _a === void 0 ? void 0 : _a.itemType) ? dndSpec.dragSourceSpec.itemType : ITEM_TYPE_DEFAULT; }, dragSpec, dragCollect), DropTarget(({ dndSpec }) => { var _a; return ((_a = dndSpec === null || dndSpec === void 0 ? void 0 : dndSpec.dropTargetSpec) === null || _a === void 0 ? void 0 : _a.itemType) ? dndSpec.dropTargetSpec.itemType : ITEM_TYPE_DEFAULT; }, dropSpec, dropCollect))(DndDragDropDiv)));
export { EnhancedDndDragDropDiv as DragDropDiv };
