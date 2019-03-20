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
const DockData_1 = require("./DockData");
const DockBox_1 = require("./DockBox");
const FloatBox_1 = require("./FloatBox");
const DockPanel_1 = require("./DockPanel");
const Algorithm = __importStar(require("./DockAlgorithm"));
class DockLayout extends react_1.default.PureComponent {
    constructor(props) {
        super(props);
        this.getRef = (r) => {
            this._ref = r;
        };
        this.dragEnd = () => {
            DockPanel_1.DockPanel.droppingPanel = null;
            if (this.state.dropRect) {
                this.setState({ dropRect: null });
            }
        };
        this.state = {
            layout: this.prepareInitData(props.defaultLayout),
            dropRect: null
        };
        document.addEventListener('dragend', this.dragEnd);
    }
    prepareInitData(data) {
        let layout;
        if (Array.isArray(data)) {
            layout = {
                dockbox: { mode: 'horizontal', children: data, size: 1 }
            };
        }
        else if ('dockbox' in data || 'floatbox' in data) {
            layout = data;
        }
        else if ('children' in data) {
            layout = {
                dockbox: data
            };
        }
        Algorithm.fixLayoutData(layout);
        return layout;
    }
    moveTab(tab, target, direction) {
        let { layout } = this.state;
        Algorithm.setWatchObject(target);
        layout = Algorithm.removeTab(layout, tab);
        if (target) {
            if ('tabs' in target) {
                // is panel
            }
            else {
                layout = Algorithm.addTabToTab(layout, tab, Algorithm.getWatchObject(target), direction);
            }
        }
        layout = Algorithm.fixLayoutData(layout);
        this.setState({ layout });
        this.dragEnd();
        Algorithm.clearWatchObj();
    }
    movePanel(panel, target, direction) {
        this.dragEnd();
    }
    setDropRect(element, direction) {
        let { dropRect } = this.state;
        if (dropRect && dropRect.element === element && dropRect.direction === direction) {
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
        switch (direction) {
            case 'right':
                left += width * 0.5;
            case 'left': // tslint:disable-line no-switch-case-fall-through
                width *= 0.5;
                break;
            case 'bottom':
                top += height * 0.5;
            case 'top': // tslint:disable-line no-switch-case-fall-through
                height *= 0.5;
                break;
            case 'after-tab':
                left += width - 10;
                width = 30;
                break;
            case 'before-tab':
                left -= 30 - 10;
                width = 30;
                break;
        }
        this.setState({ dropRect: { left, top, width, height, element, direction } });
    }
    render() {
        let { style } = this.props;
        let { layout, dropRect } = this.state;
        console.log(`layout render `);
        let dropRectStyle;
        if (dropRect) {
            let { element, direction } = dropRect, rect = __rest(dropRect, ["element", "direction"]);
            dropRectStyle = Object.assign({}, rect, { display: 'block' });
        }
        return (react_1.default.createElement("div", { ref: this.getRef, className: 'dock-layout', style: style },
            react_1.default.createElement(DockData_1.DockContextProvider, { value: this },
                react_1.default.createElement(DockBox_1.DockBox, { size: 1, boxData: layout.dockbox }),
                react_1.default.createElement(FloatBox_1.FloatBox, { boxData: layout.floatbox })),
            react_1.default.createElement("div", { className: 'dock-drop-indicator', style: dropRectStyle })));
    }
    componentWillUnmount() {
        document.removeEventListener('dragend', this.dragEnd);
    }
}
exports.DockLayout = DockLayout;
//# sourceMappingURL=DockLayout.js.map