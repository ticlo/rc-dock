import React, { useContext, useMemo } from "react";
import * as DragManager from "./DragManager";
// tslint:disable-next-line:no-duplicate-imports
import { dragEnd, getTabByDockId } from "./DragManager";
import { GestureState } from "./GestureManager";
import { ITEM_TYPE_DEFAULT } from "../Constants";
import _, { DebouncedFunc } from "lodash";
import { DndSpec, DockContext, DockContextType, TabData } from "../DockData";
import { v4 as uuid } from "uuid";
import {
  ConnectDragSource,
  ConnectDropTarget,
  DragSource,
  DragSourceConnector,
  DragSourceMonitor,
  DragSourceSpec,
  DropTarget,
  DropTargetConnector,
  DropTargetMonitor,
  DropTargetSpec,
  XYCoord,
  ConnectDragPreview
} from "react-dnd";
import classNames from "classnames";

export type AbstractPointerEvent = MouseEvent | TouchEvent;

interface DragDropDivProps extends React.HTMLAttributes<HTMLDivElement> {
  getRef?: (ref: HTMLDivElement) => void;
  onDragStartT?: DragManager.DragHandler;
  onDragMoveT?: DragManager.DragHandler;
  onDragEndT?: DragManager.DragHandler;
  onDragOverT?: DragManager.DragHandler;
  onDragLeaveT?: DragManager.DragHandler;
  onDropT?: DragManager.DragHandler;
  /**
   * by default onDragStartT will be called on first drag move
   * but if directDragT is true, onDragStartT will be called as soon as mouse is down
   */
  directDragT?: boolean;
  useRightButtonDragT?: boolean;

  onGestureStartT?: (state: GestureState) => boolean;
  onGestureMoveT?: (state: GestureState) => void;
  onGestureEndT?: () => void;

  gestureSensitivity?: number;

  tabData?: TabData;
}

interface DndSpecProps {
  dndSpec?: DndSpec;
}

interface ExternalDataProps {
  externalData?: any;
}

interface DndDragDropDivProps extends DragDropDivProps, DndSpecProps, ExternalDataProps {
  isOver: boolean;
  isOverCurrent: boolean;
  isDragging: boolean;
  canDrop: boolean;
  itemType: string;
  connectDragSource: ConnectDragSource;
  connectDropTarget: ConnectDropTarget;
  connectDragPreview: ConnectDragPreview;
}

class RcDragDropDiv extends React.PureComponent<DragDropDivProps, any> {
  element: HTMLElement;
  ownerDocument: Document;
  _getRef = (r: HTMLDivElement) => {
    if (r === this.element) {
      return;
    }
    let {getRef, onDragOverT} = this.props;
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

  dragType: DragManager.DragType = null;
  baseX: number;
  baseY: number;
  scaleX: number;
  scaleY: number;
  waitingMove = false;
  listening = false;

  gesturing = false;
  baseX2: number;
  baseY2: number;
  baseDis: number;
  baseAng: number;

  static contextType = DockContextType;

  context!: DockContext;

  onPointerDown = (e: React.MouseEvent | React.TouchEvent) => {
    let nativeTarget = e.nativeEvent.target as HTMLElement;
    if (nativeTarget instanceof HTMLInputElement || nativeTarget instanceof HTMLTextAreaElement || nativeTarget.classList.contains('drag-ignore')) {
      // ignore drag from input element
      return;
    }

    let {onDragStartT, onGestureStartT, onGestureMoveT, useRightButtonDragT} = this.props;
    let event = e.nativeEvent;
    this.cancel();
    if (event.type === 'touchstart') {
      // check single or double fingure touch
      if ((event as TouchEvent).touches.length === 1) {
        if (onDragStartT) {
          this.onDragStart(event);
        }
      } else if ((event as TouchEvent).touches.length === 2) {
        if (onGestureStartT && onGestureMoveT) {
          this.onGestureStart(event as TouchEvent);
        }
      }
    } else if (onDragStartT) {
      if ((event as MouseEvent).button === 2 && !useRightButtonDragT) {
        return;
      }
      this.onDragStart(event);
    }
  };

  onDragStart(event: MouseEvent | TouchEvent) {
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

  addDragListeners(event: MouseEvent | TouchEvent) {
    let {onDragStartT} = this.props;

    if (event.type === 'touchstart') {
      this.ownerDocument.addEventListener('touchmove', this.onTouchMove);
      this.ownerDocument.addEventListener('touchend', this.onDragEnd);
      this.dragType = 'touch';
    } else {
      this.ownerDocument.addEventListener('mousemove', this.onMouseMove);
      this.ownerDocument.addEventListener('mouseup', this.onDragEnd);
      if ((event as MouseEvent).button === 2) {
        this.dragType = 'right';
      } else {
        this.dragType = 'left';
      }
    }
    this.waitingMove = true;
    this.listening = true;
  }

  // return true for a valid move
  checkFirstMove(e: AbstractPointerEvent) {
    let state = new DragManager.DragState(e, this, true);
    if (!state.moved()) {
      // not a move
      return false;
    }
    return this.executeFirstMove(state);
  }

  executeFirstMove(state: DragManager.DragState): boolean {
    let {onDragStartT} = this.props;

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


  onMouseMove = (e: MouseEvent) => {
    let {onDragMoveT} = this.props;
    if (this.waitingMove) {
      if (DragManager.isDragging()) {
        this.onDragEnd();
        return;
      }
      if (!this.checkFirstMove(e)) {
        return;
      }
    } else {
      let state = new DragManager.DragState(e, this);
      state._onMove();
      if (onDragMoveT) {
        onDragMoveT(state);
      }
    }
    e.preventDefault();
  };

  onTouchMove = (e: TouchEvent) => {
    let {onDragMoveT} = this.props;
    if (this.waitingMove) {
      if (DragManager.isDragging()) {
        this.onDragEnd();
        return;
      }
      if (!this.checkFirstMove(e)) {
        return;
      }
    } else if (e.touches.length !== 1) {
      this.onDragEnd();
    } else {
      let state = new DragManager.DragState(e, this);
      state._onMove();
      if (onDragMoveT) {
        onDragMoveT(state);
      }
    }
    e.preventDefault();
  };

  onDragEnd = (e?: TouchEvent | MouseEvent) => {
    let {onDragEndT} = this.props;
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

  addGestureListeners(event: TouchEvent) {
    this.ownerDocument.addEventListener('touchmove', this.onGestureMove);
    this.ownerDocument.addEventListener('touchend', this.onGestureEnd);
    this.ownerDocument.addEventListener('keydown', this.onKeyDown);
    this.gesturing = true;
    this.waitingMove = true;
  }

  onGestureStart(event: TouchEvent) {
    if (!DragManager.isDragging()) {
      // same pointer event shouldn't trigger 2 drag start
      return;
    }
    let {onGestureStartT} = this.props;


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

  onGestureMove = (e: TouchEvent) => {
    let {onGestureMoveT, gestureSensitivity} = this.props;
    let state = new GestureState(e, this);
    if (this.waitingMove) {
      if (!(gestureSensitivity > 0)) {
        gestureSensitivity = 10; // default sensitivity
      }
      if (state.moved() > gestureSensitivity) {
        this.waitingMove = false;
      } else {
        return;
      }
    }
    if (onGestureMoveT) {
      onGestureMoveT(state);
    }
  };
  onGestureEnd = (e?: TouchEvent) => {
    let {onGestureEndT} = this.props;
    let state = new DragManager.DragState(e, this);

    this.removeListeners();
    if (onGestureEndT) {
      onGestureEndT();
    }
  };
  onKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      this.cancel();
    }
  };

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
    } else if (this.listening) {
      if (this.dragType === 'touch') {
        this.ownerDocument.removeEventListener('touchmove', this.onTouchMove);
        this.ownerDocument.removeEventListener('touchend', this.onDragEnd);
      } else {
        this.ownerDocument.removeEventListener('mousemove', this.onMouseMove);
        this.ownerDocument.removeEventListener('mouseup', this.onDragEnd);
      }
    }

    this.ownerDocument.removeEventListener('keydown', this.onKeyDown);
    this.listening = false;
    this.gesturing = false;
  }

  cleanupDrag(state: DragManager.DragState) {
    this.dragType = null;
    this.waitingMove = false;
  }

  render(): React.ReactNode {
    let {
      getRef, children, className,
      directDragT, onDragStartT, onDragMoveT, onDragEndT, onDragOverT, onDragLeaveT, onDropT,
      onGestureStartT, onGestureMoveT, onGestureEndT, useRightButtonDragT, tabData,
      ...others
    } = this.props;
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
      } else {
        className = 'drag-initiator';
      }
    }

    return (
      <div ref={this._getRef} className={classNames("dnd-wrapper", className, this.context.getClassName())} {...others} onMouseDown={onMouseDown}
           onTouchStart={onTouchDown}>
        {children}
      </div>
    );
  }

  componentDidUpdate(prevProps: DragDropDivProps) {
    let {onDragOverT, onDragEndT, onDragLeaveT} = this.props;
    if (this.element
      && (
        prevProps.onDragOverT !== onDragOverT
        || prevProps.onDragLeaveT !== onDragLeaveT
        || prevProps.onDragEndT !== onDragEndT
      )
    ) {
      if (onDragOverT) {
        DragManager.addHandlers(this.element, this.props);
      } else {
        DragManager.removeHandlers(this.element);
      }
    }
  }

  componentWillUnmount(): void {
    let {onDragOverT} = this.props;
    if (this.element && onDragOverT) {
      DragManager.removeHandlers(this.element);
    }
    this.cancel();
  }
}

class DndDragDropDiv extends React.PureComponent<DndDragDropDivProps, any> {
  element: HTMLElement;
  ownerDocument: Document;
  dragType: DragManager.DragType = "left";
  baseX: number = 0;
  baseY: number = 0;
  scaleX: number = 0;
  scaleY: number = 0;

  static contextType = DockContextType;

  context!: DockContext;

  _getRef = (r: HTMLDivElement) => {
    let {getRef} = this.props;
    this.element = r;

    if (r) {
      this.ownerDocument = r.ownerDocument;
    }

    if (getRef) {
      getRef(r);
    }
  };

  componentDidMount() {
    const { connectDragPreview, dndSpec } = this.props;
    const preview = dndSpec?.dragSourceSpec?.preview;

    if (preview) {
      connectDragPreview(preview.elementOrNode, preview.options);
    }
  }

  componentDidUpdate(prevProps: Readonly<DndDragDropDivProps>, prevState: Readonly<any>, snapshot?: any) {
    if (prevProps.isOver && !this.props.isOver) {
      if (this.props.onDragLeaveT) {
        const state = new DragManager.DragState(undefined, this as any);
        this.props.onDragLeaveT(state);
      }
    }
  }

  render(): React.ReactNode {
    let {
      getRef, children, className,
      directDragT, onDragStartT, onDragMoveT, onDragEndT, onDragOverT, onDragLeaveT, onDropT,
      onGestureStartT, onGestureMoveT, onGestureEndT, useRightButtonDragT, tabData,
      // drag props
      isDragging, connectDragSource, connectDragPreview,
      // drop props
      isOver, canDrop, connectDropTarget, isOverCurrent, itemType,
      // external data props
      dndSpec,
      externalData,
      ...others
    } = this.props;

    if (canDrag(this.props)) {
      if (className) {
        className = `${className} drag-initiator`;
      } else {
        className = 'drag-initiator';
      }
    }

    return (
      connectDragSource(
        connectDropTarget(
          <div ref={this._getRef} className={classNames("dnd-wrapper", className, this.context.getClassName())} {...others}>
            {children}
          </div>
        )
      )
    );
  }
}

interface DragObject {
  baseX: number;
  baseY: number;
  element: HTMLElement;
  scaleX: number;
  scaleY: number;
  checkParent(targetRef: HTMLElement): boolean;
  externalData?: any;
}

interface DropResult {
  clientOffset: XYCoord;
  externalData?: any;
  dropOutside?: boolean;
}

type HoverFunc = Exclude<DropTargetSpec<DndDragDropDivProps, DragObject, DropResult>["hover"], undefined>;

const dropSpec: DropTargetSpec<DndDragDropDivProps, DragObject, DropResult> = {
  canDrop(props, monitor) {
    return true;
  },

  hover: _.debounce<HoverFunc>(((props, monitor, component) => {
    const dockId = component.context.getDockId();
    const tab: TabData | null = getTabByDockId(dockId);
    const item = monitor.getItem();
    const externalTab = item?.externalData?.tab;
    const clientOffset = monitor.getClientOffset();
    const state = createDragState(clientOffset, component);

    if (!tab && externalTab) {
      const tab = externalTab.id ?
        externalTab :
        {id: uuid(), ...externalTab};
      state.setData({
        tab,
        panelSize: [400, 300]
      }, dockId);
    }

    if (props.onDragOverT && monitor.isOver({ shallow: true })) {
      const canDrop = props.dndSpec?.dropTargetSpec?.canDrop;

      if (canDrop && !canDrop(monitor, component)) {
        return;
      }

      props.onDragOverT(state);
    }
  }), 1000 / 60 * 3),

  drop(props, monitor, component) {
    (this.hover as DebouncedFunc<HoverFunc>).cancel();

    const item = monitor.getItem();
    const clientOffset = monitor.getClientOffset();
    const dropResult = monitor.getDropResult() || {} as DropResult;

    if (!dropResult.clientOffset) {
      dropResult.clientOffset = clientOffset!;
    }

    if (monitor.didDrop()) {
      return dropResult;
    }

    const decoratedComponent = component?.decoratedRef?.current;

    const canDrop = props.dndSpec?.dropTargetSpec?.canDrop;

    if (canDrop && !canDrop(monitor, decoratedComponent)) {
      return dropResult;
    }

    const tab = item?.externalData?.tab;
    const currentDockId = decoratedComponent?.context?.getDockId();
    const externalDockId = item?.externalData?.context?.getDockId();

    if (currentDockId && externalDockId && currentDockId !== externalDockId) {
      if (!tab) {
        return dropResult;
      }
      if (props.onDropT) {
        externalDockId.dockMove(tab, null, 'remove');
      }
    }

    const state = createDragState(clientOffset, decoratedComponent);

    if (props.onDropT) {
      props.onDropT(state);

      const drop = props.dndSpec?.dropTargetSpec?.drop;

      if (drop) {
        drop(monitor, decoratedComponent);
      }
    }

    dragEnd();
    state._onDragEnd();

    if (props.externalData) {
      dropResult.externalData = props.externalData;
    }

    return dropResult;
  }
};

function createDragState(clientOffset: XYCoord | null, component: any): DragManager.DragState {
  const state = new DragManager.DragState(undefined, component);

  state.clientX = clientOffset?.x || 0;
  state.clientY = clientOffset?.y || 0;
  state.pageX = clientOffset?.x || 0;
  state.pageY = clientOffset?.y || 0;

  return state;
}

function canDrag(props: DndDragDropDivProps): boolean {
  if (props.role === "tab" &&
    props.tabData?.parent?.parent?.mode === 'float' &&
    props.tabData?.parent?.tabs?.length === 1
  ) {
    return false;
  }

  return props.onDragStartT !== undefined || props.onGestureStartT !== undefined;
}

function dropCollect(connect: DropTargetConnector, monitor: DropTargetMonitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    isOverCurrent: monitor.isOver({shallow: true}),
    canDrop: monitor.canDrop(),
    itemType: monitor.getItemType()
  };
}

const dragSpec: DragSourceSpec<DndDragDropDivProps, DragObject, DropResult> = {
  canDrag(props) {
    return canDrag(props);
  },

  isDragging(props, monitor) {
    return true;
  },

  beginDrag(props, monitor, component) {
    const clientOffset = monitor.getClientOffset()!;
    const state = new DragManager.DragState(undefined, component);

    if (props.onDragEndT) {
      props.onDragEndT(state);
    }

    dragEnd();

    if (props.onDragStartT) {
      props.onDragStartT(state);
    }

    const dockId = component.context.getDockId();
    const tab: TabData | null = getTabByDockId(dockId);
    const baseElement = component.element.parentElement;
    const rect = baseElement.getBoundingClientRect();

    const item: DragObject = {
      baseX: clientOffset.x,
      baseY: clientOffset.y,
      element: component.element,
      checkParent(target: any): boolean {
        const tabId = tab?.id;
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
    const dropResult = monitor.getDropResult();
    const item = monitor.getItem();
    const didDrop = monitor.didDrop();
    const clientOffset = monitor.getDropResult()?.clientOffset || monitor.getClientOffset();
    const state = createDragState(clientOffset, component);

    if (clientOffset) {
      state.dx = (state.pageX - item.baseX) * item.scaleX;
      state.dy = (state.pageY - item.baseY) * item.scaleY;
    }

    if (props.onDragMoveT && didDrop) {
      props.onDragMoveT(state);
    }

    if (props.onDragEndT) {
      props.onDragEndT(state);
    }

    if (dropResult?.dropOutside) {
      const externalDockId = item?.externalData?.context?.getDockId();

      if (externalDockId) {
        const tab = item?.externalData.tab;
        externalDockId.dockMove(tab, null, 'remove');
      }
    }

    dragEnd();
  }
};

function dragCollect(connect: DragSourceConnector, monitor: DragSourceMonitor) {
  return {
    connectDragSource: connect.dragSource(),
    connectDragPreview: connect.dragPreview(),
    isDragging: monitor.isDragging()
  };
}

const withDefaultDndSpec = <P extends {}>(WrappedComponent: React.ComponentType<P>) => {
  return (props: P & DndSpecProps) => {
    const context = useContext(DockContextType);
    const defaultDndSpec = context.getDefaultDndSpec();

    return (
      <WrappedComponent
        dndSpec={useMemo(() => defaultDndSpec, [])}
        {...props}
      />
    );
  };
};

const withExternalData = <P extends {}>(WrappedComponent: React.ComponentType<P>) => {
  return (props: P & ExternalDataProps) => {
    const context = useContext(DockContextType);
    const externalData = context.getExternalData();

    return (
      <WrappedComponent
        externalData={externalData}
        {...props}
      />
    );
  };
};

const EnhancedDndDragDropDiv = withExternalData<DragDropDivProps>(withDefaultDndSpec(
  _.flow(
    DragSource(
      ({dndSpec}) => dndSpec?.dragSourceSpec?.itemType ? dndSpec.dragSourceSpec.itemType : ITEM_TYPE_DEFAULT,
      dragSpec,
      dragCollect
    ),
    DropTarget(
      ({dndSpec}) => dndSpec?.dropTargetSpec?.itemType ? dndSpec.dropTargetSpec.itemType : ITEM_TYPE_DEFAULT,
      dropSpec,
      dropCollect
    )
  )(DndDragDropDiv)
));

export { EnhancedDndDragDropDiv as DragDropDiv };
