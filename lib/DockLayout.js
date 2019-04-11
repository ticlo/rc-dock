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
const debounce_1 = __importDefault(require("lodash/debounce"));
const DockData_1 = require("./DockData");
const DockBox_1 = require("./DockBox");
const FloatBox_1 = require("./FloatBox");
const DockPanel_1 = require("./DockPanel");
const Algorithm = __importStar(require("./Algorithm"));
const Serializer = __importStar(require("./Serializer"));
const DragManager = __importStar(require("./dragdrop/DragManager"));
class DockLayout extends react_1.default.PureComponent {
    constructor(props) {
        super(props);
        /** @ignore */
        this.getRef = (r) => {
            this._ref = r;
        };
        /** @ignore */
        this.dragEnd = () => {
            DockPanel_1.DockPanel.droppingPanel = null;
            if (this.state.dropRect) {
                this.setState({ dropRect: null });
            }
        };
        this.onWindowResize = debounce_1.default(() => {
            let layout = this.state.layout;
            let newLayout = Algorithm.fixFloatPanelPos(layout, this._ref.offsetWidth, this._ref.offsetHeight);
            if (layout !== newLayout) {
                newLayout = Algorithm.fixLayoutData(newLayout); // panel parent might need a fix
                this.changeLayout(newLayout);
            }
        }, 200);
        let { layout, defaultLayout, loadTab } = props;
        let preparedLayout;
        if (defaultLayout) {
            preparedLayout = this.prepareInitData(props.defaultLayout);
        }
        else if (!loadTab) {
            throw new Error('DockLayout.loadTab and DockLayout.defaultLayout should not both be undefined.');
        }
        if (layout) {
            // controlled layout
            this.state = {
                loadedFrom: layout,
                layout: DockLayout.loadLayoutData(layout, props),
                dropRect: null
            };
        }
        else {
            this.state = {
                layout: preparedLayout,
                dropRect: null
            };
        }
        DragManager.addDragEndListener(this.dragEnd);
        window.addEventListener('resize', this.onWindowResize);
    }
    /** @ignore */
    prepareInitData(data) {
        let layout = Object.assign({}, data);
        Algorithm.fixLayoutData(layout, this.props.loadTab);
        return layout;
    }
    /** @inheritDoc */
    getGroup(name) {
        if (name) {
            let { groups } = this.props;
            if (groups && name in groups) {
                return groups[name];
            }
            if (name === DockData_1.placeHolderStyle) {
                return DockData_1.placeHolderGroup;
            }
        }
        return DockData_1.defaultGroup;
    }
    /**
     * @inheritDoc
     * @param source @inheritDoc
     * @param target @inheritDoc
     * @param direction @inheritDoc
     */
    dockMove(source, target, direction) {
        let { layout } = this.state;
        layout = Algorithm.removeFromLayout(layout, source);
        target = Algorithm.getUpdatedObject(target); // target might change during removeTab
        if (direction === 'float') {
            let newPanel = Algorithm.converToPanel(source);
            newPanel.z = Algorithm.nextZIndex(null);
            layout = Algorithm.floatPanel(layout, newPanel, this.state.dropRect);
        }
        else if (target) {
            if ('tabs' in target) {
                // pandel target
                if (direction === 'middle') {
                    layout = Algorithm.addTabToPanel(layout, source, target);
                }
                else {
                    let newPanel = Algorithm.converToPanel(source);
                    layout = Algorithm.dockPanelToPanel(layout, newPanel, target, direction);
                }
            }
            else if ('children' in target) {
                // box target
                let newPanel = Algorithm.converToPanel(source);
                layout = Algorithm.dockPanelToBox(layout, newPanel, target, direction);
            }
            else {
                // tab target
                layout = Algorithm.addNextToTab(layout, source, target, direction);
            }
        }
        if (layout !== this.state.layout) {
            layout = Algorithm.fixLayoutData(layout);
            this.changeLayout(layout);
        }
        this.dragEnd();
    }
    /** @inheritDoc */
    find(id) {
        return Algorithm.find(this.state.layout, id);
    }
    /** @ignore */
    getLayoutSize() {
        if (this._ref) {
            return { width: this._ref.offsetWidth, height: this._ref.offsetHeight };
        }
        return { width: 0, height: 0 };
    }
    /** @inheritDoc */
    updateTab(id, newTab) {
        let tab = this.find(id);
        if (tab && !('tabs' in tab)) {
            let panelData = tab.parent;
            let idx = panelData.tabs.indexOf(tab);
            if (idx >= 0) {
                let { loadTab } = this.props;
                if (loadTab && !('content' in newTab && 'title' in newTab)) {
                    newTab = loadTab(newTab);
                }
                let { layout } = this.state;
                layout = Algorithm.removeFromLayout(layout, tab); // remove old tab
                panelData = Algorithm.getUpdatedObject(panelData); // panelData might change during removeTab
                layout = Algorithm.addTabToPanel(layout, newTab, panelData, idx); // add new tab
                layout = Algorithm.fixLayoutData(layout);
                this.setState({ layout });
                return true;
            }
        }
        return false;
    }
    /** @ignore */
    useEdgeDrop() {
        return this.props.dropMode === 'edge';
    }
    /** @ignore */
    setDropRect(element, direction, source, event) {
        let { dropRect } = this.state;
        if (dropRect) {
            if (direction === 'remove') {
                if (dropRect.source === source) {
                    this.setState({ dropRect: null });
                }
                return;
            }
            else if (dropRect.element === element && dropRect.direction === direction && direction !== 'float') {
                // skip duplicated update except for float dragging
                return;
            }
        }
        if (!element) {
            this.setState({ dropRect: null });
            return;
        }
        let layoutRect = this._ref.getBoundingClientRect();
        let scaleX = this._ref.offsetWidth / layoutRect.width;
        let scaleY = this._ref.offsetHeight / layoutRect.height;
        let elemRect = element.getBoundingClientRect();
        let left = (elemRect.left - layoutRect.left) * scaleX;
        let top = (elemRect.top - layoutRect.top) * scaleY;
        let width = elemRect.width * scaleX;
        let height = elemRect.height * scaleY;
        let ratio = 0.5;
        if (element.classList.contains('dock-box')) {
            ratio = 0.3;
        }
        switch (direction) {
            case 'float': {
                let x = (event.clientX - layoutRect.left) * scaleX;
                let y = (event.clientY - layoutRect.top) * scaleY;
                left = x - 150;
                top = y - 15;
                width = 300;
                height = 300;
                break;
            }
            case 'right':
                left += width * (1 - ratio);
            case 'left': // tslint:disable-line no-switch-case-fall-through
                width *= ratio;
                break;
            case 'bottom':
                top += height * (1 - ratio);
            case 'top': // tslint:disable-line no-switch-case-fall-through
                height *= ratio;
                break;
            case 'after-tab':
                left += width - 15;
                width = 30;
                break;
            case 'before-tab':
                left -= 15;
                width = 30;
                break;
        }
        this.setState({ dropRect: { left, top, width, height, element, source, direction } });
    }
    /** @ignore */
    render() {
        let { style } = this.props;
        let { layout, dropRect } = this.state;
        let dropRectStyle;
        if (dropRect) {
            let { element, direction } = dropRect, rect = __rest(dropRect, ["element", "direction"]);
            dropRectStyle = Object.assign({}, rect, { display: 'block' });
            if (direction === 'float') {
                dropRectStyle.transition = 'none';
            }
        }
        return (react_1.default.createElement("div", { ref: this.getRef, className: 'dock-layout', style: style },
            react_1.default.createElement(DockData_1.DockContextProvider, { value: this },
                react_1.default.createElement(DockBox_1.DockBox, { size: 1, boxData: layout.dockbox }),
                react_1.default.createElement(FloatBox_1.FloatBox, { boxData: layout.floatbox })),
            react_1.default.createElement("div", { className: 'dock-drop-indicator', style: dropRectStyle })));
    }
    /** @ignore */
    componentWillUnmount() {
        window.removeEventListener('resize', this.onWindowResize);
        DragManager.removeDragEndListener(this.dragEnd);
        this.onWindowResize.cancel();
    }
    /** @ignore
     * change layout
     */
    changeLayout(layoutData) {
        let { layout, onLayoutChange } = this.props;
        let savedLayout;
        if (onLayoutChange) {
            savedLayout = Serializer.saveLayoutData(layoutData, this.props.saveTab, this.props.afterPanelSaved);
            onLayoutChange(savedLayout);
        }
        if (!layout) {
            // uncontrolled layout when Props.layout is null
            this.setState({ layout: layoutData, loadedFrom: savedLayout });
        }
    }
    // public api
    saveLayout() {
        return Serializer.saveLayoutData(this.state.layout, this.props.saveTab, this.props.afterPanelSaved);
    }
    /**
     * load layout
     * calling this api won't trigger the [[LayoutProps.onLayoutChange]] callback
     */
    loadLayout(savedLayout) {
        let { defaultLayout, loadTab, afterPanelLoaded } = this.props;
        this.setState({ layout: DockLayout.loadLayoutData(savedLayout, this.props, this._ref.offsetWidth, this._ref.offsetHeight) });
    }
    /** @ignore */
    static loadLayoutData(savedLayout, props, width = 0, height = 0) {
        let { defaultLayout, loadTab, afterPanelLoaded } = props;
        let layout = Serializer.loadLayoutData(savedLayout, defaultLayout, loadTab, afterPanelLoaded);
        layout = Algorithm.fixFloatPanelPos(layout, width, height);
        layout = Algorithm.fixLayoutData(layout);
        return layout;
    }
    static getDerivedStateFromProps(props, state) {
        let { layout } = props;
        let { loadedFrom } = state;
        if (layout && layout !== loadedFrom) {
            // auto reload on layout prop change
            return {
                layout: DockLayout.loadLayoutData(layout, props),
                loadedLayout: layout
            };
        }
        return null;
    }
}
exports.DockLayout = DockLayout;
//# sourceMappingURL=DockLayout.js.map