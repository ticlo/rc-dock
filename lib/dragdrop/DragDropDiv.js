"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DragDropDiv = void 0;
const react_1 = __importStar(require("react"));
const DragManager = __importStar(require("./DragManager"));
// tslint:disable-next-line:no-duplicate-imports
const DragManager_1 = require("./DragManager");
const GestureManager_1 = require("./GestureManager");
const Constants_1 = require("../Constants");
const lodash_1 = __importDefault(require("lodash"));
const DockData_1 = require("../DockData");
const uuid_1 = require("uuid");
const react_dnd_1 = require("react-dnd");
class RcDragDropDiv extends react_1.default.PureComponent {
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
            let state = new GestureManager_1.GestureState(e, this);
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
        let state = new GestureManager_1.GestureState(event, this, true);
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
        return (react_1.default.createElement("div", Object.assign({ ref: this._getRef, className: className }, others, { onMouseDown: onMouseDown, onTouchStart: onTouchDown }), children));
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
class DndDragDropDiv extends react_1.default.PureComponent {
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
        if (prevProps.isOver && !this.props.isOver) {
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
        isOver, canDrop, connectDropTarget, isOverCurrent, itemType, 
        // external data props
        dndSpec, externalData } = _a, others = __rest(_a, ["getRef", "children", "className", "directDragT", "onDragStartT", "onDragMoveT", "onDragEndT", "onDragOverT", "onDragLeaveT", "onDropT", "onGestureStartT", "onGestureMoveT", "onGestureEndT", "useRightButtonDragT", "extraData", "isDragging", "connectDragSource", "isOver", "canDrop", "connectDropTarget", "isOverCurrent", "itemType", "dndSpec", "externalData"]);
        if (canDrag(this.props)) {
            if (className) {
                className = `${className} drag-initiator`;
            }
            else {
                className = 'drag-initiator';
            }
        }
        return (connectDragSource(connectDropTarget(react_1.default.createElement("div", Object.assign({ ref: this._getRef, className: className }, others), children))));
    }
}
DndDragDropDiv.contextType = DockData_1.DockContextType;
const dropSpec = {
    canDrop(props, monitor) {
        return true;
    },
    hover: lodash_1.default.throttle(((props, monitor, component) => {
        const state = createDragState(monitor, component);
        const dockId = component.context.getDockId();
        const tab = DragManager_1.getTabByDockId(dockId);
        const item = monitor.getItem();
        if (!tab && item.externalData.tab) {
            const tab = item.externalData.tab.id ?
                item.externalData.tab : Object.assign({ id: uuid_1.v4() }, item.externalData.tab);
            state.setData({
                tab,
                panelSize: [400, 300]
            }, dockId);
        }
        if (props.onDragOverT && monitor.isOver({ shallow: true })) {
            props.onDragOverT(state);
        }
    }), 1000 / 60),
    drop(props, monitor, component) {
        var _a, _b, _c, _d, _e, _f, _g, _h;
        this.hover.flush();
        if (monitor.didDrop()) {
            return;
        }
        const item = monitor.getItem();
        const currentDockId = (_c = (_b = (_a = component === null || component === void 0 ? void 0 : component.decoratedRef) === null || _a === void 0 ? void 0 : _a.current) === null || _b === void 0 ? void 0 : _b.context) === null || _c === void 0 ? void 0 : _c.getDockId();
        const externalDockId = (_e = (_d = item === null || item === void 0 ? void 0 : item.externalData) === null || _d === void 0 ? void 0 : _d.context) === null || _e === void 0 ? void 0 : _e.getDockId();
        const state = createDragState(monitor, component);
        if (currentDockId && externalDockId && currentDockId !== externalDockId) {
            const tab = (_f = item === null || item === void 0 ? void 0 : item.externalData) === null || _f === void 0 ? void 0 : _f.tab;
            if (!tab) {
                return;
            }
            if (props.onDropT) {
                externalDockId.dockMove(tab, null, 'remove');
            }
        }
        if (props.onDropT) {
            props.onDropT(state);
            if ((_h = (_g = props.dndSpec) === null || _g === void 0 ? void 0 : _g.dropTargetSpec) === null || _h === void 0 ? void 0 : _h.drop) {
                props.dndSpec.dropTargetSpec.drop(monitor, component);
            }
        }
        DragManager_1.dragEnd();
        const result = { state };
        if (props.externalData) {
            result.externalData = props.externalData;
        }
        return result;
    }
};
function createDragState(monitor, component) {
    const clientOffset = monitor.getClientOffset();
    const item = monitor.getItem();
    const state = new DragManager.DragState(undefined, component);
    if (!clientOffset) {
        return state;
    }
    state.clientX = clientOffset.x || 0;
    state.clientY = clientOffset.y || 0;
    state.pageX = clientOffset.x || 0;
    state.pageY = clientOffset.y || 0;
    state.dx = (state.pageX - item.baseX) * item.scaleX;
    state.dy = (state.pageY - item.baseY) * item.scaleY;
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
        DragManager_1.dragEnd();
        if (props.onDragStartT) {
            props.onDragStartT(state);
        }
        const dockId = component.context.getDockId();
        const tab = DragManager_1.getTabByDockId(dockId);
        const baseElement = component.element.parentElement;
        const rect = baseElement.getBoundingClientRect();
        const item = {
            baseX: clientOffset.x,
            baseY: clientOffset.y,
            element: component.element,
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
        var _a, _b;
        const dropResult = monitor.getDropResult();
        const item = monitor.getItem();
        const didDrop = monitor.didDrop();
        const state = didDrop && (dropResult === null || dropResult === void 0 ? void 0 : dropResult.state) ? dropResult.state : createDragState(monitor, component);
        if (props.onDragMoveT && didDrop) {
            props.onDragMoveT(state);
        }
        if (props.onDragEndT) {
            props.onDragEndT(state);
        }
        if (dropResult === null || dropResult === void 0 ? void 0 : dropResult.dropOutside) {
            const externalDockId = (_b = (_a = item === null || item === void 0 ? void 0 : item.externalData) === null || _a === void 0 ? void 0 : _a.context) === null || _b === void 0 ? void 0 : _b.getDockId();
            if (externalDockId) {
                const tab = item === null || item === void 0 ? void 0 : item.externalData.tab;
                externalDockId.dockMove(tab, null, 'remove');
            }
        }
        DragManager_1.dragEnd();
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
        const { props: { defaultDndSpec } } = react_1.useContext(DockData_1.DockContextType);
        return (react_1.default.createElement(WrappedComponent, Object.assign({ dndSpec: react_1.useMemo(() => defaultDndSpec, []) }, props)));
    };
};
const withExternalData = (WrappedComponent) => {
    return (props) => {
        // @ts-ignore
        const { props: { externalData } } = react_1.useContext(DockData_1.DockContextType);
        return (react_1.default.createElement(WrappedComponent, Object.assign({ externalData: externalData }, props)));
    };
};
const EnhancedDndDragDropDiv = withExternalData(withDndSpec(lodash_1.default.flow(react_dnd_1.DragSource(({ dndSpec }) => { var _a; return ((_a = dndSpec === null || dndSpec === void 0 ? void 0 : dndSpec.dragSourceSpec) === null || _a === void 0 ? void 0 : _a.itemType) ? dndSpec.dragSourceSpec.itemType : Constants_1.ITEM_TYPE_DEFAULT; }, dragSpec, dragCollect), react_dnd_1.DropTarget(({ dndSpec }) => { var _a; return ((_a = dndSpec === null || dndSpec === void 0 ? void 0 : dndSpec.dropTargetSpec) === null || _a === void 0 ? void 0 : _a.itemType) ? dndSpec.dropTargetSpec.itemType : Constants_1.ITEM_TYPE_DEFAULT; }, dropSpec, dropCollect))(DndDragDropDiv)));
exports.DragDropDiv = EnhancedDndDragDropDiv;
