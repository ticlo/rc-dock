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
const DockData_1 = require("./DockData");
const DockBox_1 = require("./DockBox");
const FloatBox_1 = require("./FloatBox");
class DockLayout extends react_1.default.PureComponent {
    constructor(props) {
        super(props);
        this.getRef = (r) => {
            this._ref = r;
        };
        this.dragEnd = () => {
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
    fixPanelData(panel) {
        panel.id = DockData_1.nextId();
        if (!(panel.size > 0)) {
            panel.size = 200;
        }
        for (let child of panel.tabs) {
            child.parent = panel;
        }
    }
    fixBoxData(box) {
        box.id = DockData_1.nextId();
        if (!(box.size > 0)) {
            box.size = 200;
        }
        for (let child of box.children) {
            child.parent = box;
            if ('children' in child) {
                // add box id
                this.fixBoxData(child);
            }
            else if ('tabs' in child) {
                // add panel id
                this.fixPanelData(child);
            }
        }
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
        if (!('dockbox' in layout)) {
            layout.dockbox = { mode: 'horizontal', children: [], size: 1 };
        }
        if (!('floatbox' in layout)) {
            layout.floatbox = { mode: 'float', children: [], size: 1 };
        }
        else {
            layout.floatbox.mode = 'float';
        }
        this.fixBoxData(layout.dockbox);
        this.fixBoxData(layout.floatbox);
        return layout;
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
            case 'R':
                left += width * 0.7;
            case 'L': // tslint:disable-line no-switch-case-fall-through
                width *= 0.3;
                break;
            case 'B':
                top += height * 0.7;
            case 'T': // tslint:disable-line no-switch-case-fall-through
                height *= 0.3;
                break;
            case 'AfterTab':
                left += width - 8;
                width = 40;
                break;
            case 'BeforeTab':
                left -= 40 - 8;
                width = 40;
                break;
        }
        this.setState({ dropRect: { left, top, width, height, element, direction } });
    }
    render() {
        let { style } = this.props;
        let { layout, dropRect } = this.state;
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