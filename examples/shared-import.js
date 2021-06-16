// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"J4Nk":[function(require,module,exports) {
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/
'use strict';
/* eslint-disable no-unused-vars */

var getOwnPropertySymbols = Object.getOwnPropertySymbols;
var hasOwnProperty = Object.prototype.hasOwnProperty;
var propIsEnumerable = Object.prototype.propertyIsEnumerable;

function toObject(val) {
  if (val === null || val === undefined) {
    throw new TypeError('Object.assign cannot be called with null or undefined');
  }

  return Object(val);
}

function shouldUseNative() {
  try {
    if (!Object.assign) {
      return false;
    } // Detect buggy property enumeration order in older V8 versions.
    // https://bugs.chromium.org/p/v8/issues/detail?id=4118


    var test1 = new String('abc'); // eslint-disable-line no-new-wrappers

    test1[5] = 'de';

    if (Object.getOwnPropertyNames(test1)[0] === '5') {
      return false;
    } // https://bugs.chromium.org/p/v8/issues/detail?id=3056


    var test2 = {};

    for (var i = 0; i < 10; i++) {
      test2['_' + String.fromCharCode(i)] = i;
    }

    var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
      return test2[n];
    });

    if (order2.join('') !== '0123456789') {
      return false;
    } // https://bugs.chromium.org/p/v8/issues/detail?id=3056


    var test3 = {};
    'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
      test3[letter] = letter;
    });

    if (Object.keys(Object.assign({}, test3)).join('') !== 'abcdefghijklmnopqrst') {
      return false;
    }

    return true;
  } catch (err) {
    // We don't expect any of the above to throw, but better to be safe.
    return false;
  }
}

module.exports = shouldUseNative() ? Object.assign : function (target, source) {
  var from;
  var to = toObject(target);
  var symbols;

  for (var s = 1; s < arguments.length; s++) {
    from = Object(arguments[s]);

    for (var key in from) {
      if (hasOwnProperty.call(from, key)) {
        to[key] = from[key];
      }
    }

    if (getOwnPropertySymbols) {
      symbols = getOwnPropertySymbols(from);

      for (var i = 0; i < symbols.length; i++) {
        if (propIsEnumerable.call(from, symbols[i])) {
          to[symbols[i]] = from[symbols[i]];
        }
      }
    }
  }

  return to;
};
},{}],"awqi":[function(require,module,exports) {
/** @license React v17.0.1
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
'use strict';

var l = require("object-assign"),
    n = 60103,
    p = 60106;

exports.Fragment = 60107;
exports.StrictMode = 60108;
exports.Profiler = 60114;
var q = 60109,
    r = 60110,
    t = 60112;
exports.Suspense = 60113;
var u = 60115,
    v = 60116;

if ("function" === typeof Symbol && Symbol.for) {
  var w = Symbol.for;
  n = w("react.element");
  p = w("react.portal");
  exports.Fragment = w("react.fragment");
  exports.StrictMode = w("react.strict_mode");
  exports.Profiler = w("react.profiler");
  q = w("react.provider");
  r = w("react.context");
  t = w("react.forward_ref");
  exports.Suspense = w("react.suspense");
  u = w("react.memo");
  v = w("react.lazy");
}

var x = "function" === typeof Symbol && Symbol.iterator;

function y(a) {
  if (null === a || "object" !== typeof a) return null;
  a = x && a[x] || a["@@iterator"];
  return "function" === typeof a ? a : null;
}

function z(a) {
  for (var b = "https://reactjs.org/docs/error-decoder.html?invariant=" + a, c = 1; c < arguments.length; c++) b += "&args[]=" + encodeURIComponent(arguments[c]);

  return "Minified React error #" + a + "; visit " + b + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
}

var A = {
  isMounted: function () {
    return !1;
  },
  enqueueForceUpdate: function () {},
  enqueueReplaceState: function () {},
  enqueueSetState: function () {}
},
    B = {};

function C(a, b, c) {
  this.props = a;
  this.context = b;
  this.refs = B;
  this.updater = c || A;
}

C.prototype.isReactComponent = {};

C.prototype.setState = function (a, b) {
  if ("object" !== typeof a && "function" !== typeof a && null != a) throw Error(z(85));
  this.updater.enqueueSetState(this, a, b, "setState");
};

C.prototype.forceUpdate = function (a) {
  this.updater.enqueueForceUpdate(this, a, "forceUpdate");
};

function D() {}

D.prototype = C.prototype;

function E(a, b, c) {
  this.props = a;
  this.context = b;
  this.refs = B;
  this.updater = c || A;
}

var F = E.prototype = new D();
F.constructor = E;
l(F, C.prototype);
F.isPureReactComponent = !0;
var G = {
  current: null
},
    H = Object.prototype.hasOwnProperty,
    I = {
  key: !0,
  ref: !0,
  __self: !0,
  __source: !0
};

function J(a, b, c) {
  var e,
      d = {},
      k = null,
      h = null;
  if (null != b) for (e in void 0 !== b.ref && (h = b.ref), void 0 !== b.key && (k = "" + b.key), b) H.call(b, e) && !I.hasOwnProperty(e) && (d[e] = b[e]);
  var g = arguments.length - 2;
  if (1 === g) d.children = c;else if (1 < g) {
    for (var f = Array(g), m = 0; m < g; m++) f[m] = arguments[m + 2];

    d.children = f;
  }
  if (a && a.defaultProps) for (e in g = a.defaultProps, g) void 0 === d[e] && (d[e] = g[e]);
  return {
    $$typeof: n,
    type: a,
    key: k,
    ref: h,
    props: d,
    _owner: G.current
  };
}

function K(a, b) {
  return {
    $$typeof: n,
    type: a.type,
    key: b,
    ref: a.ref,
    props: a.props,
    _owner: a._owner
  };
}

function L(a) {
  return "object" === typeof a && null !== a && a.$$typeof === n;
}

function escape(a) {
  var b = {
    "=": "=0",
    ":": "=2"
  };
  return "$" + a.replace(/[=:]/g, function (a) {
    return b[a];
  });
}

var M = /\/+/g;

function N(a, b) {
  return "object" === typeof a && null !== a && null != a.key ? escape("" + a.key) : b.toString(36);
}

function O(a, b, c, e, d) {
  var k = typeof a;
  if ("undefined" === k || "boolean" === k) a = null;
  var h = !1;
  if (null === a) h = !0;else switch (k) {
    case "string":
    case "number":
      h = !0;
      break;

    case "object":
      switch (a.$$typeof) {
        case n:
        case p:
          h = !0;
      }

  }
  if (h) return h = a, d = d(h), a = "" === e ? "." + N(h, 0) : e, Array.isArray(d) ? (c = "", null != a && (c = a.replace(M, "$&/") + "/"), O(d, b, c, "", function (a) {
    return a;
  })) : null != d && (L(d) && (d = K(d, c + (!d.key || h && h.key === d.key ? "" : ("" + d.key).replace(M, "$&/") + "/") + a)), b.push(d)), 1;
  h = 0;
  e = "" === e ? "." : e + ":";
  if (Array.isArray(a)) for (var g = 0; g < a.length; g++) {
    k = a[g];
    var f = e + N(k, g);
    h += O(k, b, c, f, d);
  } else if (f = y(a), "function" === typeof f) for (a = f.call(a), g = 0; !(k = a.next()).done;) k = k.value, f = e + N(k, g++), h += O(k, b, c, f, d);else if ("object" === k) throw b = "" + a, Error(z(31, "[object Object]" === b ? "object with keys {" + Object.keys(a).join(", ") + "}" : b));
  return h;
}

function P(a, b, c) {
  if (null == a) return a;
  var e = [],
      d = 0;
  O(a, e, "", "", function (a) {
    return b.call(c, a, d++);
  });
  return e;
}

function Q(a) {
  if (-1 === a._status) {
    var b = a._result;
    b = b();
    a._status = 0;
    a._result = b;
    b.then(function (b) {
      0 === a._status && (b = b.default, a._status = 1, a._result = b);
    }, function (b) {
      0 === a._status && (a._status = 2, a._result = b);
    });
  }

  if (1 === a._status) return a._result;
  throw a._result;
}

var R = {
  current: null
};

function S() {
  var a = R.current;
  if (null === a) throw Error(z(321));
  return a;
}

var T = {
  ReactCurrentDispatcher: R,
  ReactCurrentBatchConfig: {
    transition: 0
  },
  ReactCurrentOwner: G,
  IsSomeRendererActing: {
    current: !1
  },
  assign: l
};
exports.Children = {
  map: P,
  forEach: function (a, b, c) {
    P(a, function () {
      b.apply(this, arguments);
    }, c);
  },
  count: function (a) {
    var b = 0;
    P(a, function () {
      b++;
    });
    return b;
  },
  toArray: function (a) {
    return P(a, function (a) {
      return a;
    }) || [];
  },
  only: function (a) {
    if (!L(a)) throw Error(z(143));
    return a;
  }
};
exports.Component = C;
exports.PureComponent = E;
exports.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = T;

exports.cloneElement = function (a, b, c) {
  if (null === a || void 0 === a) throw Error(z(267, a));
  var e = l({}, a.props),
      d = a.key,
      k = a.ref,
      h = a._owner;

  if (null != b) {
    void 0 !== b.ref && (k = b.ref, h = G.current);
    void 0 !== b.key && (d = "" + b.key);
    if (a.type && a.type.defaultProps) var g = a.type.defaultProps;

    for (f in b) H.call(b, f) && !I.hasOwnProperty(f) && (e[f] = void 0 === b[f] && void 0 !== g ? g[f] : b[f]);
  }

  var f = arguments.length - 2;
  if (1 === f) e.children = c;else if (1 < f) {
    g = Array(f);

    for (var m = 0; m < f; m++) g[m] = arguments[m + 2];

    e.children = g;
  }
  return {
    $$typeof: n,
    type: a.type,
    key: d,
    ref: k,
    props: e,
    _owner: h
  };
};

exports.createContext = function (a, b) {
  void 0 === b && (b = null);
  a = {
    $$typeof: r,
    _calculateChangedBits: b,
    _currentValue: a,
    _currentValue2: a,
    _threadCount: 0,
    Provider: null,
    Consumer: null
  };
  a.Provider = {
    $$typeof: q,
    _context: a
  };
  return a.Consumer = a;
};

exports.createElement = J;

exports.createFactory = function (a) {
  var b = J.bind(null, a);
  b.type = a;
  return b;
};

exports.createRef = function () {
  return {
    current: null
  };
};

exports.forwardRef = function (a) {
  return {
    $$typeof: t,
    render: a
  };
};

exports.isValidElement = L;

exports.lazy = function (a) {
  return {
    $$typeof: v,
    _payload: {
      _status: -1,
      _result: a
    },
    _init: Q
  };
};

exports.memo = function (a, b) {
  return {
    $$typeof: u,
    type: a,
    compare: void 0 === b ? null : b
  };
};

exports.useCallback = function (a, b) {
  return S().useCallback(a, b);
};

exports.useContext = function (a, b) {
  return S().useContext(a, b);
};

exports.useDebugValue = function () {};

exports.useEffect = function (a, b) {
  return S().useEffect(a, b);
};

exports.useImperativeHandle = function (a, b, c) {
  return S().useImperativeHandle(a, b, c);
};

exports.useLayoutEffect = function (a, b) {
  return S().useLayoutEffect(a, b);
};

exports.useMemo = function (a, b) {
  return S().useMemo(a, b);
};

exports.useReducer = function (a, b, c) {
  return S().useReducer(a, b, c);
};

exports.useRef = function (a) {
  return S().useRef(a);
};

exports.useState = function (a) {
  return S().useState(a);
};

exports.version = "17.0.1";
},{"object-assign":"J4Nk"}],"n8MK":[function(require,module,exports) {
'use strict';

if ("production" === 'production') {
  module.exports = require('./cjs/react.production.min.js');
} else {
  module.exports = require('./cjs/react.development.js');
}
},{"./cjs/react.production.min.js":"awqi"}],"zh3I":[function(require,module,exports) {
"use strict";

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DockContextConsumer = exports.DockContextProvider = exports.DockContextType = exports.placeHolderGroup = exports.maximePlaceHolderId = exports.placeHolderStyle = exports.defaultGroup = void 0;

const react_1 = __importDefault(require("react"));
/** @ignore */


exports.defaultGroup = {
  floatable: true,
  maximizable: true
};
/** @ignore */

exports.placeHolderStyle = 'place-holder';
/** @ignore */

exports.maximePlaceHolderId = '-maximized-placeholder-';
/** @ignore */

exports.placeHolderGroup = {
  floatable: false
};
/** @ignore */

exports.DockContextType = react_1.default.createContext(null);
/** @ignore */

exports.DockContextProvider = exports.DockContextType.Provider;
/** @ignore */

exports.DockContextConsumer = exports.DockContextType.Consumer;
},{"react":"n8MK"}],"SpjQ":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _extends;

function _extends() {
  exports.default = _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}
},{}],"gpd2":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _defineProperty;

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}
},{}],"EbiA":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _arrayWithHoles;

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}
},{}],"GS78":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _iterableToArrayLimit;

function _iterableToArrayLimit(arr, i) {
  if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;
  var _arr = [];
  var _n = true;
  var _d = false;
  var _e = undefined;

  try {
    for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}
},{}],"rI22":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _arrayLikeToArray;

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }

  return arr2;
}
},{}],"AOxl":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _unsupportedIterableToArray;

var _arrayLikeToArray = _interopRequireDefault(require("@babel/runtime/helpers/esm/arrayLikeToArray"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return (0, _arrayLikeToArray.default)(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return (0, _arrayLikeToArray.default)(o, minLen);
}
},{"@babel/runtime/helpers/esm/arrayLikeToArray":"rI22"}],"Kh3j":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _nonIterableRest;

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
},{}],"T12H":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _slicedToArray;

var _arrayWithHoles = _interopRequireDefault(require("@babel/runtime/helpers/esm/arrayWithHoles"));

var _iterableToArrayLimit = _interopRequireDefault(require("@babel/runtime/helpers/esm/iterableToArrayLimit"));

var _unsupportedIterableToArray = _interopRequireDefault(require("@babel/runtime/helpers/esm/unsupportedIterableToArray"));

var _nonIterableRest = _interopRequireDefault(require("@babel/runtime/helpers/esm/nonIterableRest"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _slicedToArray(arr, i) {
  return (0, _arrayWithHoles.default)(arr) || (0, _iterableToArrayLimit.default)(arr, i) || (0, _unsupportedIterableToArray.default)(arr, i) || (0, _nonIterableRest.default)();
}
},{"@babel/runtime/helpers/esm/arrayWithHoles":"EbiA","@babel/runtime/helpers/esm/iterableToArrayLimit":"GS78","@babel/runtime/helpers/esm/unsupportedIterableToArray":"AOxl","@babel/runtime/helpers/esm/nonIterableRest":"Kh3j"}],"xLw6":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _typeof;

function _typeof(obj) {
  "@babel/helpers - typeof";

  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    exports.default = _typeof = function _typeof(obj) {
      return typeof obj;
    };
  } else {
    exports.default = _typeof = function _typeof(obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }

  return _typeof(obj);
}
},{}],"Vabl":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _objectWithoutPropertiesLoose;

function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;

  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }

  return target;
}
},{}],"tuNH":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _objectWithoutProperties;

var _objectWithoutPropertiesLoose = _interopRequireDefault(require("@babel/runtime/helpers/esm/objectWithoutPropertiesLoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(source, excluded) {
  if (source == null) return {};
  var target = (0, _objectWithoutPropertiesLoose.default)(source, excluded);
  var key, i;

  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);

    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
      target[key] = source[key];
    }
  }

  return target;
}
},{"@babel/runtime/helpers/esm/objectWithoutPropertiesLoose":"Vabl"}],"UKeT":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _objectSpread2;

var _defineProperty = _interopRequireDefault(require("@babel/runtime/helpers/esm/defineProperty"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly) symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    });
    keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};

    if (i % 2) {
      ownKeys(Object(source), true).forEach(function (key) {
        (0, _defineProperty.default)(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }

  return target;
}
},{"@babel/runtime/helpers/esm/defineProperty":"gpd2"}],"qb7c":[function(require,module,exports) {
var define;
/*!
  Copyright (c) 2017 Jed Watson.
  Licensed under the MIT License (MIT), see
  http://jedwatson.github.io/classnames
*/
/* global define */

(function () {
	'use strict';

	var hasOwn = {}.hasOwnProperty;

	function classNames () {
		var classes = [];

		for (var i = 0; i < arguments.length; i++) {
			var arg = arguments[i];
			if (!arg) continue;

			var argType = typeof arg;

			if (argType === 'string' || argType === 'number') {
				classes.push(arg);
			} else if (Array.isArray(arg) && arg.length) {
				var inner = classNames.apply(null, arg);
				if (inner) {
					classes.push(inner);
				}
			} else if (argType === 'object') {
				for (var key in arg) {
					if (hasOwn.call(arg, key) && arg[key]) {
						classes.push(key);
					}
				}
			}
		}

		return classes.join(' ');
	}

	if (typeof module !== 'undefined' && module.exports) {
		classNames.default = classNames;
		module.exports = classNames;
	} else if (typeof define === 'function' && typeof define.amd === 'object' && define.amd) {
		// register as 'classnames', consistent with npm package name
		define('classnames', [], function () {
			return classNames;
		});
	} else {
		window.classNames = classNames;
	}
}());

},{}],"RsE0":[function(require,module,exports) {
/** @license React v16.13.1
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';var b="function"===typeof Symbol&&Symbol.for,c=b?Symbol.for("react.element"):60103,d=b?Symbol.for("react.portal"):60106,e=b?Symbol.for("react.fragment"):60107,f=b?Symbol.for("react.strict_mode"):60108,g=b?Symbol.for("react.profiler"):60114,h=b?Symbol.for("react.provider"):60109,k=b?Symbol.for("react.context"):60110,l=b?Symbol.for("react.async_mode"):60111,m=b?Symbol.for("react.concurrent_mode"):60111,n=b?Symbol.for("react.forward_ref"):60112,p=b?Symbol.for("react.suspense"):60113,q=b?
Symbol.for("react.suspense_list"):60120,r=b?Symbol.for("react.memo"):60115,t=b?Symbol.for("react.lazy"):60116,v=b?Symbol.for("react.block"):60121,w=b?Symbol.for("react.fundamental"):60117,x=b?Symbol.for("react.responder"):60118,y=b?Symbol.for("react.scope"):60119;
function z(a){if("object"===typeof a&&null!==a){var u=a.$$typeof;switch(u){case c:switch(a=a.type,a){case l:case m:case e:case g:case f:case p:return a;default:switch(a=a&&a.$$typeof,a){case k:case n:case t:case r:case h:return a;default:return u}}case d:return u}}}function A(a){return z(a)===m}exports.AsyncMode=l;exports.ConcurrentMode=m;exports.ContextConsumer=k;exports.ContextProvider=h;exports.Element=c;exports.ForwardRef=n;exports.Fragment=e;exports.Lazy=t;exports.Memo=r;exports.Portal=d;
exports.Profiler=g;exports.StrictMode=f;exports.Suspense=p;exports.isAsyncMode=function(a){return A(a)||z(a)===l};exports.isConcurrentMode=A;exports.isContextConsumer=function(a){return z(a)===k};exports.isContextProvider=function(a){return z(a)===h};exports.isElement=function(a){return"object"===typeof a&&null!==a&&a.$$typeof===c};exports.isForwardRef=function(a){return z(a)===n};exports.isFragment=function(a){return z(a)===e};exports.isLazy=function(a){return z(a)===t};
exports.isMemo=function(a){return z(a)===r};exports.isPortal=function(a){return z(a)===d};exports.isProfiler=function(a){return z(a)===g};exports.isStrictMode=function(a){return z(a)===f};exports.isSuspense=function(a){return z(a)===p};
exports.isValidElementType=function(a){return"string"===typeof a||"function"===typeof a||a===e||a===m||a===g||a===f||a===p||a===q||"object"===typeof a&&null!==a&&(a.$$typeof===t||a.$$typeof===r||a.$$typeof===h||a.$$typeof===k||a.$$typeof===n||a.$$typeof===w||a.$$typeof===x||a.$$typeof===y||a.$$typeof===v)};exports.typeOf=z;

},{}],"H1RQ":[function(require,module,exports) {
'use strict';

if ("production" === 'production') {
  module.exports = require('./cjs/react-is.production.min.js');
} else {
  module.exports = require('./cjs/react-is.development.js');
}
},{"./cjs/react-is.production.min.js":"RsE0"}],"artt":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = toArray;

var _react = _interopRequireDefault(require("react"));

var _reactIs = require("react-is");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function toArray(children) {
  var option = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var ret = [];

  _react.default.Children.forEach(children, function (child) {
    if ((child === undefined || child === null) && !option.keepEmpty) {
      return;
    }

    if (Array.isArray(child)) {
      ret = ret.concat(toArray(child));
    } else if ((0, _reactIs.isFragment)(child) && child.props) {
      ret = ret.concat(toArray(child.props.children, option));
    } else {
      ret.push(child);
    }
  });

  return ret;
}
},{"react":"n8MK","react-is":"H1RQ"}],"nb8J":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _default = function _default() {
  var agent = navigator.userAgent || navigator.vendor || window.opera;

  if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(agent) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw-(n|u)|c55\/|capi|ccwa|cdm-|cell|chtm|cldc|cmd-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc-s|devi|dica|dmob|do(c|p)o|ds(12|-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(-|_)|g1 u|g560|gene|gf-5|g-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd-(m|p|t)|hei-|hi(pt|ta)|hp( i|ip)|hs-c|ht(c(-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i-(20|go|ma)|i230|iac( |-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|-[a-w])|libw|lynx|m1-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|-([1-8]|c))|phil|pire|pl(ay|uc)|pn-2|po(ck|rt|se)|prox|psio|pt-g|qa-a|qc(07|12|21|32|60|-[2-7]|i-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h-|oo|p-)|sdk\/|se(c(-|0|1)|47|mc|nd|ri)|sgh-|shar|sie(-|m)|sk-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h-|v-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl-|tdg-|tel(i|m)|tim-|t-mo|to(pl|sh)|ts(70|m-|m3|m5)|tx-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas-|your|zeto|zte-/i.test(agent.substr(0, 4))) {
    return true;
  }

  return false;
};

exports.default = _default;
},{}],"zMpY":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = useControlledState;

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/esm/slicedToArray"));

var React = _interopRequireWildcard(require("react"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function useControlledState(defaultStateValue, option) {
  var _ref = option || {},
      defaultValue = _ref.defaultValue,
      value = _ref.value,
      onChange = _ref.onChange,
      postState = _ref.postState;

  var _React$useState = React.useState(function () {
    if (value !== undefined) {
      return value;
    }

    if (defaultValue !== undefined) {
      return typeof defaultValue === 'function' ? defaultValue() : defaultValue;
    }

    return typeof defaultStateValue === 'function' ? defaultStateValue() : defaultStateValue;
  }),
      _React$useState2 = (0, _slicedToArray2.default)(_React$useState, 2),
      innerValue = _React$useState2[0],
      setInnerValue = _React$useState2[1];

  var mergedValue = value !== undefined ? value : innerValue;

  if (postState) {
    mergedValue = postState(mergedValue);
  }

  function triggerChange(newValue) {
    setInnerValue(newValue);

    if (mergedValue !== newValue && onChange) {
      onChange(newValue, mergedValue);
    }
  } // Effect of reset value to `undefined`


  var firstRenderRef = React.useRef(true);
  React.useEffect(function () {
    if (firstRenderRef.current) {
      firstRenderRef.current = false;
      return;
    }

    if (value === undefined) {
      setInnerValue(value);
    }
  }, [value]);
  return [mergedValue, triggerChange];
}
},{"@babel/runtime/helpers/esm/slicedToArray":"T12H","react":"n8MK"}],"vw6u":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _arrayWithoutHoles;

var _arrayLikeToArray = _interopRequireDefault(require("@babel/runtime/helpers/esm/arrayLikeToArray"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return (0, _arrayLikeToArray.default)(arr);
}
},{"@babel/runtime/helpers/esm/arrayLikeToArray":"rI22"}],"bG0g":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _iterableToArray;

function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);
}
},{}],"gdEH":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _nonIterableSpread;

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
},{}],"Qv3s":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _toConsumableArray;

var _arrayWithoutHoles = _interopRequireDefault(require("@babel/runtime/helpers/esm/arrayWithoutHoles"));

var _iterableToArray = _interopRequireDefault(require("@babel/runtime/helpers/esm/iterableToArray"));

var _unsupportedIterableToArray = _interopRequireDefault(require("@babel/runtime/helpers/esm/unsupportedIterableToArray"));

var _nonIterableSpread = _interopRequireDefault(require("@babel/runtime/helpers/esm/nonIterableSpread"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) {
  return (0, _arrayWithoutHoles.default)(arr) || (0, _iterableToArray.default)(arr) || (0, _unsupportedIterableToArray.default)(arr) || (0, _nonIterableSpread.default)();
}
},{"@babel/runtime/helpers/esm/arrayWithoutHoles":"vw6u","@babel/runtime/helpers/esm/iterableToArray":"bG0g","@babel/runtime/helpers/esm/unsupportedIterableToArray":"AOxl","@babel/runtime/helpers/esm/nonIterableSpread":"gdEH"}],"adDJ":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = wrapperRaf;

var raf = function raf(callback) {
  return +setTimeout(callback, 16);
};

var caf = function caf(num) {
  return clearTimeout(num);
};

if (typeof window !== 'undefined' && 'requestAnimationFrame' in window) {
  raf = function raf(callback) {
    return window.requestAnimationFrame(callback);
  };

  caf = function caf(handle) {
    return window.cancelAnimationFrame(handle);
  };
}

function wrapperRaf(callback) {
  return raf(callback);
}

wrapperRaf.cancel = caf;
},{}],"VEjx":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _classCallCheck;

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
},{}],"l5p4":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _createClass;

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}
},{}],"hewo":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _setPrototypeOf;

function _setPrototypeOf(o, p) {
  exports.default = _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}
},{}],"NT06":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _inherits;

var _setPrototypeOf = _interopRequireDefault(require("@babel/runtime/helpers/esm/setPrototypeOf"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  if (superClass) (0, _setPrototypeOf.default)(subClass, superClass);
}
},{"@babel/runtime/helpers/esm/setPrototypeOf":"hewo"}],"QQCW":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _getPrototypeOf;

function _getPrototypeOf(o) {
  exports.default = _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}
},{}],"h1Zy":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _isNativeReflectConstruct;

function _isNativeReflectConstruct() {
  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === "function") return true;

  try {
    Date.prototype.toString.call(Reflect.construct(Date, [], function () {}));
    return true;
  } catch (e) {
    return false;
  }
}
},{}],"bk0i":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _assertThisInitialized;

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}
},{}],"aBEI":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _possibleConstructorReturn;

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/esm/typeof"));

var _assertThisInitialized = _interopRequireDefault(require("@babel/runtime/helpers/esm/assertThisInitialized"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _possibleConstructorReturn(self, call) {
  if (call && ((0, _typeof2.default)(call) === "object" || typeof call === "function")) {
    return call;
  }

  return (0, _assertThisInitialized.default)(self);
}
},{"@babel/runtime/helpers/esm/typeof":"xLw6","@babel/runtime/helpers/esm/assertThisInitialized":"bk0i"}],"m5aa":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _createSuper;

var _getPrototypeOf = _interopRequireDefault(require("@babel/runtime/helpers/esm/getPrototypeOf"));

var _isNativeReflectConstruct = _interopRequireDefault(require("@babel/runtime/helpers/esm/isNativeReflectConstruct"));

var _possibleConstructorReturn = _interopRequireDefault(require("@babel/runtime/helpers/esm/possibleConstructorReturn"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _createSuper(Derived) {
  var hasNativeReflectConstruct = (0, _isNativeReflectConstruct.default)();
  return function _createSuperInternal() {
    var Super = (0, _getPrototypeOf.default)(Derived),
        result;

    if (hasNativeReflectConstruct) {
      var NewTarget = (0, _getPrototypeOf.default)(this).constructor;
      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }

    return (0, _possibleConstructorReturn.default)(this, result);
  };
}
},{"@babel/runtime/helpers/esm/getPrototypeOf":"QQCW","@babel/runtime/helpers/esm/isNativeReflectConstruct":"h1Zy","@babel/runtime/helpers/esm/possibleConstructorReturn":"aBEI"}],"IvPb":[function(require,module,exports) {
/** @license React v0.20.1
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
'use strict';var f,g,h,k;if("object"===typeof performance&&"function"===typeof performance.now){var l=performance;exports.unstable_now=function(){return l.now()}}else{var p=Date,q=p.now();exports.unstable_now=function(){return p.now()-q}}
if("undefined"===typeof window||"function"!==typeof MessageChannel){var t=null,u=null,w=function(){if(null!==t)try{var a=exports.unstable_now();t(!0,a);t=null}catch(b){throw setTimeout(w,0),b;}};f=function(a){null!==t?setTimeout(f,0,a):(t=a,setTimeout(w,0))};g=function(a,b){u=setTimeout(a,b)};h=function(){clearTimeout(u)};exports.unstable_shouldYield=function(){return!1};k=exports.unstable_forceFrameRate=function(){}}else{var x=window.setTimeout,y=window.clearTimeout;if("undefined"!==typeof console){var z=
window.cancelAnimationFrame;"function"!==typeof window.requestAnimationFrame&&console.error("This browser doesn't support requestAnimationFrame. Make sure that you load a polyfill in older browsers. https://reactjs.org/link/react-polyfills");"function"!==typeof z&&console.error("This browser doesn't support cancelAnimationFrame. Make sure that you load a polyfill in older browsers. https://reactjs.org/link/react-polyfills")}var A=!1,B=null,C=-1,D=5,E=0;exports.unstable_shouldYield=function(){return exports.unstable_now()>=
E};k=function(){};exports.unstable_forceFrameRate=function(a){0>a||125<a?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):D=0<a?Math.floor(1E3/a):5};var F=new MessageChannel,G=F.port2;F.port1.onmessage=function(){if(null!==B){var a=exports.unstable_now();E=a+D;try{B(!0,a)?G.postMessage(null):(A=!1,B=null)}catch(b){throw G.postMessage(null),b;}}else A=!1};f=function(a){B=a;A||(A=!0,G.postMessage(null))};g=function(a,b){C=
x(function(){a(exports.unstable_now())},b)};h=function(){y(C);C=-1}}function H(a,b){var c=a.length;a.push(b);a:for(;;){var d=c-1>>>1,e=a[d];if(void 0!==e&&0<I(e,b))a[d]=b,a[c]=e,c=d;else break a}}function J(a){a=a[0];return void 0===a?null:a}
function K(a){var b=a[0];if(void 0!==b){var c=a.pop();if(c!==b){a[0]=c;a:for(var d=0,e=a.length;d<e;){var m=2*(d+1)-1,n=a[m],v=m+1,r=a[v];if(void 0!==n&&0>I(n,c))void 0!==r&&0>I(r,n)?(a[d]=r,a[v]=c,d=v):(a[d]=n,a[m]=c,d=m);else if(void 0!==r&&0>I(r,c))a[d]=r,a[v]=c,d=v;else break a}}return b}return null}function I(a,b){var c=a.sortIndex-b.sortIndex;return 0!==c?c:a.id-b.id}var L=[],M=[],N=1,O=null,P=3,Q=!1,R=!1,S=!1;
function T(a){for(var b=J(M);null!==b;){if(null===b.callback)K(M);else if(b.startTime<=a)K(M),b.sortIndex=b.expirationTime,H(L,b);else break;b=J(M)}}function U(a){S=!1;T(a);if(!R)if(null!==J(L))R=!0,f(V);else{var b=J(M);null!==b&&g(U,b.startTime-a)}}
function V(a,b){R=!1;S&&(S=!1,h());Q=!0;var c=P;try{T(b);for(O=J(L);null!==O&&(!(O.expirationTime>b)||a&&!exports.unstable_shouldYield());){var d=O.callback;if("function"===typeof d){O.callback=null;P=O.priorityLevel;var e=d(O.expirationTime<=b);b=exports.unstable_now();"function"===typeof e?O.callback=e:O===J(L)&&K(L);T(b)}else K(L);O=J(L)}if(null!==O)var m=!0;else{var n=J(M);null!==n&&g(U,n.startTime-b);m=!1}return m}finally{O=null,P=c,Q=!1}}var W=k;exports.unstable_IdlePriority=5;
exports.unstable_ImmediatePriority=1;exports.unstable_LowPriority=4;exports.unstable_NormalPriority=3;exports.unstable_Profiling=null;exports.unstable_UserBlockingPriority=2;exports.unstable_cancelCallback=function(a){a.callback=null};exports.unstable_continueExecution=function(){R||Q||(R=!0,f(V))};exports.unstable_getCurrentPriorityLevel=function(){return P};exports.unstable_getFirstCallbackNode=function(){return J(L)};
exports.unstable_next=function(a){switch(P){case 1:case 2:case 3:var b=3;break;default:b=P}var c=P;P=b;try{return a()}finally{P=c}};exports.unstable_pauseExecution=function(){};exports.unstable_requestPaint=W;exports.unstable_runWithPriority=function(a,b){switch(a){case 1:case 2:case 3:case 4:case 5:break;default:a=3}var c=P;P=a;try{return b()}finally{P=c}};
exports.unstable_scheduleCallback=function(a,b,c){var d=exports.unstable_now();"object"===typeof c&&null!==c?(c=c.delay,c="number"===typeof c&&0<c?d+c:d):c=d;switch(a){case 1:var e=-1;break;case 2:e=250;break;case 5:e=1073741823;break;case 4:e=1E4;break;default:e=5E3}e=c+e;a={id:N++,callback:b,priorityLevel:a,startTime:c,expirationTime:e,sortIndex:-1};c>d?(a.sortIndex=c,H(M,a),null===J(L)&&a===J(M)&&(S?h():S=!0,g(U,c-d))):(a.sortIndex=e,H(L,a),R||Q||(R=!0,f(V)));return a};
exports.unstable_wrapCallback=function(a){var b=P;return function(){var c=P;P=b;try{return a.apply(this,arguments)}finally{P=c}}};

},{}],"MDSO":[function(require,module,exports) {
'use strict';

if ("production" === 'production') {
  module.exports = require('./cjs/scheduler.production.min.js');
} else {
  module.exports = require('./cjs/scheduler.development.js');
}
},{"./cjs/scheduler.production.min.js":"IvPb"}],"i17t":[function(require,module,exports) {
/** @license React v17.0.1
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
/*
 Modernizr 3.0.0pre (Custom Build) | MIT
*/
'use strict';var aa=require("react"),m=require("object-assign"),r=require("scheduler");function y(a){for(var b="https://reactjs.org/docs/error-decoder.html?invariant="+a,c=1;c<arguments.length;c++)b+="&args[]="+encodeURIComponent(arguments[c]);return"Minified React error #"+a+"; visit "+b+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}if(!aa)throw Error(y(227));var ba=new Set,ca={};function da(a,b){ea(a,b);ea(a+"Capture",b)}
function ea(a,b){ca[a]=b;for(a=0;a<b.length;a++)ba.add(b[a])}
var fa=!("undefined"===typeof window||"undefined"===typeof window.document||"undefined"===typeof window.document.createElement),ha=/^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,ia=Object.prototype.hasOwnProperty,
ja={},ka={};function la(a){if(ia.call(ka,a))return!0;if(ia.call(ja,a))return!1;if(ha.test(a))return ka[a]=!0;ja[a]=!0;return!1}function ma(a,b,c,d){if(null!==c&&0===c.type)return!1;switch(typeof b){case "function":case "symbol":return!0;case "boolean":if(d)return!1;if(null!==c)return!c.acceptsBooleans;a=a.toLowerCase().slice(0,5);return"data-"!==a&&"aria-"!==a;default:return!1}}
function na(a,b,c,d){if(null===b||"undefined"===typeof b||ma(a,b,c,d))return!0;if(d)return!1;if(null!==c)switch(c.type){case 3:return!b;case 4:return!1===b;case 5:return isNaN(b);case 6:return isNaN(b)||1>b}return!1}function B(a,b,c,d,e,f,g){this.acceptsBooleans=2===b||3===b||4===b;this.attributeName=d;this.attributeNamespace=e;this.mustUseProperty=c;this.propertyName=a;this.type=b;this.sanitizeURL=f;this.removeEmptyString=g}var D={};
"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(a){D[a]=new B(a,0,!1,a,null,!1,!1)});[["acceptCharset","accept-charset"],["className","class"],["htmlFor","for"],["httpEquiv","http-equiv"]].forEach(function(a){var b=a[0];D[b]=new B(b,1,!1,a[1],null,!1,!1)});["contentEditable","draggable","spellCheck","value"].forEach(function(a){D[a]=new B(a,2,!1,a.toLowerCase(),null,!1,!1)});
["autoReverse","externalResourcesRequired","focusable","preserveAlpha"].forEach(function(a){D[a]=new B(a,2,!1,a,null,!1,!1)});"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(a){D[a]=new B(a,3,!1,a.toLowerCase(),null,!1,!1)});
["checked","multiple","muted","selected"].forEach(function(a){D[a]=new B(a,3,!0,a,null,!1,!1)});["capture","download"].forEach(function(a){D[a]=new B(a,4,!1,a,null,!1,!1)});["cols","rows","size","span"].forEach(function(a){D[a]=new B(a,6,!1,a,null,!1,!1)});["rowSpan","start"].forEach(function(a){D[a]=new B(a,5,!1,a.toLowerCase(),null,!1,!1)});var oa=/[\-:]([a-z])/g;function pa(a){return a[1].toUpperCase()}
"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(a){var b=a.replace(oa,
pa);D[b]=new B(b,1,!1,a,null,!1,!1)});"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(a){var b=a.replace(oa,pa);D[b]=new B(b,1,!1,a,"http://www.w3.org/1999/xlink",!1,!1)});["xml:base","xml:lang","xml:space"].forEach(function(a){var b=a.replace(oa,pa);D[b]=new B(b,1,!1,a,"http://www.w3.org/XML/1998/namespace",!1,!1)});["tabIndex","crossOrigin"].forEach(function(a){D[a]=new B(a,1,!1,a.toLowerCase(),null,!1,!1)});
D.xlinkHref=new B("xlinkHref",1,!1,"xlink:href","http://www.w3.org/1999/xlink",!0,!1);["src","href","action","formAction"].forEach(function(a){D[a]=new B(a,1,!1,a.toLowerCase(),null,!0,!0)});
function qa(a,b,c,d){var e=D.hasOwnProperty(b)?D[b]:null;var f=null!==e?0===e.type:d?!1:!(2<b.length)||"o"!==b[0]&&"O"!==b[0]||"n"!==b[1]&&"N"!==b[1]?!1:!0;f||(na(b,c,e,d)&&(c=null),d||null===e?la(b)&&(null===c?a.removeAttribute(b):a.setAttribute(b,""+c)):e.mustUseProperty?a[e.propertyName]=null===c?3===e.type?!1:"":c:(b=e.attributeName,d=e.attributeNamespace,null===c?a.removeAttribute(b):(e=e.type,c=3===e||4===e&&!0===c?"":""+c,d?a.setAttributeNS(d,b,c):a.setAttribute(b,c))))}
var ra=aa.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,sa=60103,ta=60106,ua=60107,wa=60108,xa=60114,ya=60109,za=60110,Aa=60112,Ba=60113,Ca=60120,Da=60115,Ea=60116,Fa=60121,Ga=60128,Ha=60129,Ia=60130,Ja=60131;
if("function"===typeof Symbol&&Symbol.for){var E=Symbol.for;sa=E("react.element");ta=E("react.portal");ua=E("react.fragment");wa=E("react.strict_mode");xa=E("react.profiler");ya=E("react.provider");za=E("react.context");Aa=E("react.forward_ref");Ba=E("react.suspense");Ca=E("react.suspense_list");Da=E("react.memo");Ea=E("react.lazy");Fa=E("react.block");E("react.scope");Ga=E("react.opaque.id");Ha=E("react.debug_trace_mode");Ia=E("react.offscreen");Ja=E("react.legacy_hidden")}
var Ka="function"===typeof Symbol&&Symbol.iterator;function La(a){if(null===a||"object"!==typeof a)return null;a=Ka&&a[Ka]||a["@@iterator"];return"function"===typeof a?a:null}var Ma;function Na(a){if(void 0===Ma)try{throw Error();}catch(c){var b=c.stack.trim().match(/\n( *(at )?)/);Ma=b&&b[1]||""}return"\n"+Ma+a}var Oa=!1;
function Pa(a,b){if(!a||Oa)return"";Oa=!0;var c=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{if(b)if(b=function(){throw Error();},Object.defineProperty(b.prototype,"props",{set:function(){throw Error();}}),"object"===typeof Reflect&&Reflect.construct){try{Reflect.construct(b,[])}catch(k){var d=k}Reflect.construct(a,[],b)}else{try{b.call()}catch(k){d=k}a.call(b.prototype)}else{try{throw Error();}catch(k){d=k}a()}}catch(k){if(k&&d&&"string"===typeof k.stack){for(var e=k.stack.split("\n"),
f=d.stack.split("\n"),g=e.length-1,h=f.length-1;1<=g&&0<=h&&e[g]!==f[h];)h--;for(;1<=g&&0<=h;g--,h--)if(e[g]!==f[h]){if(1!==g||1!==h){do if(g--,h--,0>h||e[g]!==f[h])return"\n"+e[g].replace(" at new "," at ");while(1<=g&&0<=h)}break}}}finally{Oa=!1,Error.prepareStackTrace=c}return(a=a?a.displayName||a.name:"")?Na(a):""}
function Qa(a){switch(a.tag){case 5:return Na(a.type);case 16:return Na("Lazy");case 13:return Na("Suspense");case 19:return Na("SuspenseList");case 0:case 2:case 15:return a=Pa(a.type,!1),a;case 11:return a=Pa(a.type.render,!1),a;case 22:return a=Pa(a.type._render,!1),a;case 1:return a=Pa(a.type,!0),a;default:return""}}
function Ra(a){if(null==a)return null;if("function"===typeof a)return a.displayName||a.name||null;if("string"===typeof a)return a;switch(a){case ua:return"Fragment";case ta:return"Portal";case xa:return"Profiler";case wa:return"StrictMode";case Ba:return"Suspense";case Ca:return"SuspenseList"}if("object"===typeof a)switch(a.$$typeof){case za:return(a.displayName||"Context")+".Consumer";case ya:return(a._context.displayName||"Context")+".Provider";case Aa:var b=a.render;b=b.displayName||b.name||"";
return a.displayName||(""!==b?"ForwardRef("+b+")":"ForwardRef");case Da:return Ra(a.type);case Fa:return Ra(a._render);case Ea:b=a._payload;a=a._init;try{return Ra(a(b))}catch(c){}}return null}function Sa(a){switch(typeof a){case "boolean":case "number":case "object":case "string":case "undefined":return a;default:return""}}function Ta(a){var b=a.type;return(a=a.nodeName)&&"input"===a.toLowerCase()&&("checkbox"===b||"radio"===b)}
function Ua(a){var b=Ta(a)?"checked":"value",c=Object.getOwnPropertyDescriptor(a.constructor.prototype,b),d=""+a[b];if(!a.hasOwnProperty(b)&&"undefined"!==typeof c&&"function"===typeof c.get&&"function"===typeof c.set){var e=c.get,f=c.set;Object.defineProperty(a,b,{configurable:!0,get:function(){return e.call(this)},set:function(a){d=""+a;f.call(this,a)}});Object.defineProperty(a,b,{enumerable:c.enumerable});return{getValue:function(){return d},setValue:function(a){d=""+a},stopTracking:function(){a._valueTracker=
null;delete a[b]}}}}function Va(a){a._valueTracker||(a._valueTracker=Ua(a))}function Wa(a){if(!a)return!1;var b=a._valueTracker;if(!b)return!0;var c=b.getValue();var d="";a&&(d=Ta(a)?a.checked?"true":"false":a.value);a=d;return a!==c?(b.setValue(a),!0):!1}function Xa(a){a=a||("undefined"!==typeof document?document:void 0);if("undefined"===typeof a)return null;try{return a.activeElement||a.body}catch(b){return a.body}}
function Ya(a,b){var c=b.checked;return m({},b,{defaultChecked:void 0,defaultValue:void 0,value:void 0,checked:null!=c?c:a._wrapperState.initialChecked})}function Za(a,b){var c=null==b.defaultValue?"":b.defaultValue,d=null!=b.checked?b.checked:b.defaultChecked;c=Sa(null!=b.value?b.value:c);a._wrapperState={initialChecked:d,initialValue:c,controlled:"checkbox"===b.type||"radio"===b.type?null!=b.checked:null!=b.value}}function $a(a,b){b=b.checked;null!=b&&qa(a,"checked",b,!1)}
function ab(a,b){$a(a,b);var c=Sa(b.value),d=b.type;if(null!=c)if("number"===d){if(0===c&&""===a.value||a.value!=c)a.value=""+c}else a.value!==""+c&&(a.value=""+c);else if("submit"===d||"reset"===d){a.removeAttribute("value");return}b.hasOwnProperty("value")?bb(a,b.type,c):b.hasOwnProperty("defaultValue")&&bb(a,b.type,Sa(b.defaultValue));null==b.checked&&null!=b.defaultChecked&&(a.defaultChecked=!!b.defaultChecked)}
function cb(a,b,c){if(b.hasOwnProperty("value")||b.hasOwnProperty("defaultValue")){var d=b.type;if(!("submit"!==d&&"reset"!==d||void 0!==b.value&&null!==b.value))return;b=""+a._wrapperState.initialValue;c||b===a.value||(a.value=b);a.defaultValue=b}c=a.name;""!==c&&(a.name="");a.defaultChecked=!!a._wrapperState.initialChecked;""!==c&&(a.name=c)}
function bb(a,b,c){if("number"!==b||Xa(a.ownerDocument)!==a)null==c?a.defaultValue=""+a._wrapperState.initialValue:a.defaultValue!==""+c&&(a.defaultValue=""+c)}function db(a){var b="";aa.Children.forEach(a,function(a){null!=a&&(b+=a)});return b}function eb(a,b){a=m({children:void 0},b);if(b=db(b.children))a.children=b;return a}
function fb(a,b,c,d){a=a.options;if(b){b={};for(var e=0;e<c.length;e++)b["$"+c[e]]=!0;for(c=0;c<a.length;c++)e=b.hasOwnProperty("$"+a[c].value),a[c].selected!==e&&(a[c].selected=e),e&&d&&(a[c].defaultSelected=!0)}else{c=""+Sa(c);b=null;for(e=0;e<a.length;e++){if(a[e].value===c){a[e].selected=!0;d&&(a[e].defaultSelected=!0);return}null!==b||a[e].disabled||(b=a[e])}null!==b&&(b.selected=!0)}}
function gb(a,b){if(null!=b.dangerouslySetInnerHTML)throw Error(y(91));return m({},b,{value:void 0,defaultValue:void 0,children:""+a._wrapperState.initialValue})}function hb(a,b){var c=b.value;if(null==c){c=b.children;b=b.defaultValue;if(null!=c){if(null!=b)throw Error(y(92));if(Array.isArray(c)){if(!(1>=c.length))throw Error(y(93));c=c[0]}b=c}null==b&&(b="");c=b}a._wrapperState={initialValue:Sa(c)}}
function ib(a,b){var c=Sa(b.value),d=Sa(b.defaultValue);null!=c&&(c=""+c,c!==a.value&&(a.value=c),null==b.defaultValue&&a.defaultValue!==c&&(a.defaultValue=c));null!=d&&(a.defaultValue=""+d)}function jb(a){var b=a.textContent;b===a._wrapperState.initialValue&&""!==b&&null!==b&&(a.value=b)}var kb={html:"http://www.w3.org/1999/xhtml",mathml:"http://www.w3.org/1998/Math/MathML",svg:"http://www.w3.org/2000/svg"};
function lb(a){switch(a){case "svg":return"http://www.w3.org/2000/svg";case "math":return"http://www.w3.org/1998/Math/MathML";default:return"http://www.w3.org/1999/xhtml"}}function mb(a,b){return null==a||"http://www.w3.org/1999/xhtml"===a?lb(b):"http://www.w3.org/2000/svg"===a&&"foreignObject"===b?"http://www.w3.org/1999/xhtml":a}
var nb,ob=function(a){return"undefined"!==typeof MSApp&&MSApp.execUnsafeLocalFunction?function(b,c,d,e){MSApp.execUnsafeLocalFunction(function(){return a(b,c,d,e)})}:a}(function(a,b){if(a.namespaceURI!==kb.svg||"innerHTML"in a)a.innerHTML=b;else{nb=nb||document.createElement("div");nb.innerHTML="<svg>"+b.valueOf().toString()+"</svg>";for(b=nb.firstChild;a.firstChild;)a.removeChild(a.firstChild);for(;b.firstChild;)a.appendChild(b.firstChild)}});
function pb(a,b){if(b){var c=a.firstChild;if(c&&c===a.lastChild&&3===c.nodeType){c.nodeValue=b;return}}a.textContent=b}
var qb={animationIterationCount:!0,borderImageOutset:!0,borderImageSlice:!0,borderImageWidth:!0,boxFlex:!0,boxFlexGroup:!0,boxOrdinalGroup:!0,columnCount:!0,columns:!0,flex:!0,flexGrow:!0,flexPositive:!0,flexShrink:!0,flexNegative:!0,flexOrder:!0,gridArea:!0,gridRow:!0,gridRowEnd:!0,gridRowSpan:!0,gridRowStart:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnSpan:!0,gridColumnStart:!0,fontWeight:!0,lineClamp:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,tabSize:!0,widows:!0,zIndex:!0,zoom:!0,fillOpacity:!0,
floodOpacity:!0,stopOpacity:!0,strokeDasharray:!0,strokeDashoffset:!0,strokeMiterlimit:!0,strokeOpacity:!0,strokeWidth:!0},rb=["Webkit","ms","Moz","O"];Object.keys(qb).forEach(function(a){rb.forEach(function(b){b=b+a.charAt(0).toUpperCase()+a.substring(1);qb[b]=qb[a]})});function sb(a,b,c){return null==b||"boolean"===typeof b||""===b?"":c||"number"!==typeof b||0===b||qb.hasOwnProperty(a)&&qb[a]?(""+b).trim():b+"px"}
function tb(a,b){a=a.style;for(var c in b)if(b.hasOwnProperty(c)){var d=0===c.indexOf("--"),e=sb(c,b[c],d);"float"===c&&(c="cssFloat");d?a.setProperty(c,e):a[c]=e}}var ub=m({menuitem:!0},{area:!0,base:!0,br:!0,col:!0,embed:!0,hr:!0,img:!0,input:!0,keygen:!0,link:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0});
function vb(a,b){if(b){if(ub[a]&&(null!=b.children||null!=b.dangerouslySetInnerHTML))throw Error(y(137,a));if(null!=b.dangerouslySetInnerHTML){if(null!=b.children)throw Error(y(60));if(!("object"===typeof b.dangerouslySetInnerHTML&&"__html"in b.dangerouslySetInnerHTML))throw Error(y(61));}if(null!=b.style&&"object"!==typeof b.style)throw Error(y(62));}}
function wb(a,b){if(-1===a.indexOf("-"))return"string"===typeof b.is;switch(a){case "annotation-xml":case "color-profile":case "font-face":case "font-face-src":case "font-face-uri":case "font-face-format":case "font-face-name":case "missing-glyph":return!1;default:return!0}}function xb(a){a=a.target||a.srcElement||window;a.correspondingUseElement&&(a=a.correspondingUseElement);return 3===a.nodeType?a.parentNode:a}var yb=null,zb=null,Ab=null;
function Bb(a){if(a=Cb(a)){if("function"!==typeof yb)throw Error(y(280));var b=a.stateNode;b&&(b=Db(b),yb(a.stateNode,a.type,b))}}function Eb(a){zb?Ab?Ab.push(a):Ab=[a]:zb=a}function Fb(){if(zb){var a=zb,b=Ab;Ab=zb=null;Bb(a);if(b)for(a=0;a<b.length;a++)Bb(b[a])}}function Gb(a,b){return a(b)}function Hb(a,b,c,d,e){return a(b,c,d,e)}function Ib(){}var Jb=Gb,Kb=!1,Lb=!1;function Mb(){if(null!==zb||null!==Ab)Ib(),Fb()}
function Nb(a,b,c){if(Lb)return a(b,c);Lb=!0;try{return Jb(a,b,c)}finally{Lb=!1,Mb()}}
function Ob(a,b){var c=a.stateNode;if(null===c)return null;var d=Db(c);if(null===d)return null;c=d[b];a:switch(b){case "onClick":case "onClickCapture":case "onDoubleClick":case "onDoubleClickCapture":case "onMouseDown":case "onMouseDownCapture":case "onMouseMove":case "onMouseMoveCapture":case "onMouseUp":case "onMouseUpCapture":case "onMouseEnter":(d=!d.disabled)||(a=a.type,d=!("button"===a||"input"===a||"select"===a||"textarea"===a));a=!d;break a;default:a=!1}if(a)return null;if(c&&"function"!==
typeof c)throw Error(y(231,b,typeof c));return c}var Pb=!1;if(fa)try{var Qb={};Object.defineProperty(Qb,"passive",{get:function(){Pb=!0}});window.addEventListener("test",Qb,Qb);window.removeEventListener("test",Qb,Qb)}catch(a){Pb=!1}function Rb(a,b,c,d,e,f,g,h,k){var l=Array.prototype.slice.call(arguments,3);try{b.apply(c,l)}catch(n){this.onError(n)}}var Sb=!1,Tb=null,Ub=!1,Vb=null,Wb={onError:function(a){Sb=!0;Tb=a}};function Xb(a,b,c,d,e,f,g,h,k){Sb=!1;Tb=null;Rb.apply(Wb,arguments)}
function Yb(a,b,c,d,e,f,g,h,k){Xb.apply(this,arguments);if(Sb){if(Sb){var l=Tb;Sb=!1;Tb=null}else throw Error(y(198));Ub||(Ub=!0,Vb=l)}}function Zb(a){var b=a,c=a;if(a.alternate)for(;b.return;)b=b.return;else{a=b;do b=a,0!==(b.flags&1026)&&(c=b.return),a=b.return;while(a)}return 3===b.tag?c:null}function $b(a){if(13===a.tag){var b=a.memoizedState;null===b&&(a=a.alternate,null!==a&&(b=a.memoizedState));if(null!==b)return b.dehydrated}return null}function ac(a){if(Zb(a)!==a)throw Error(y(188));}
function bc(a){var b=a.alternate;if(!b){b=Zb(a);if(null===b)throw Error(y(188));return b!==a?null:a}for(var c=a,d=b;;){var e=c.return;if(null===e)break;var f=e.alternate;if(null===f){d=e.return;if(null!==d){c=d;continue}break}if(e.child===f.child){for(f=e.child;f;){if(f===c)return ac(e),a;if(f===d)return ac(e),b;f=f.sibling}throw Error(y(188));}if(c.return!==d.return)c=e,d=f;else{for(var g=!1,h=e.child;h;){if(h===c){g=!0;c=e;d=f;break}if(h===d){g=!0;d=e;c=f;break}h=h.sibling}if(!g){for(h=f.child;h;){if(h===
c){g=!0;c=f;d=e;break}if(h===d){g=!0;d=f;c=e;break}h=h.sibling}if(!g)throw Error(y(189));}}if(c.alternate!==d)throw Error(y(190));}if(3!==c.tag)throw Error(y(188));return c.stateNode.current===c?a:b}function cc(a){a=bc(a);if(!a)return null;for(var b=a;;){if(5===b.tag||6===b.tag)return b;if(b.child)b.child.return=b,b=b.child;else{if(b===a)break;for(;!b.sibling;){if(!b.return||b.return===a)return null;b=b.return}b.sibling.return=b.return;b=b.sibling}}return null}
function dc(a,b){for(var c=a.alternate;null!==b;){if(b===a||b===c)return!0;b=b.return}return!1}var ec,fc,gc,hc,ic=!1,jc=[],kc=null,lc=null,mc=null,nc=new Map,oc=new Map,pc=[],qc="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");
function rc(a,b,c,d,e){return{blockedOn:a,domEventName:b,eventSystemFlags:c|16,nativeEvent:e,targetContainers:[d]}}function sc(a,b){switch(a){case "focusin":case "focusout":kc=null;break;case "dragenter":case "dragleave":lc=null;break;case "mouseover":case "mouseout":mc=null;break;case "pointerover":case "pointerout":nc.delete(b.pointerId);break;case "gotpointercapture":case "lostpointercapture":oc.delete(b.pointerId)}}
function tc(a,b,c,d,e,f){if(null===a||a.nativeEvent!==f)return a=rc(b,c,d,e,f),null!==b&&(b=Cb(b),null!==b&&fc(b)),a;a.eventSystemFlags|=d;b=a.targetContainers;null!==e&&-1===b.indexOf(e)&&b.push(e);return a}
function uc(a,b,c,d,e){switch(b){case "focusin":return kc=tc(kc,a,b,c,d,e),!0;case "dragenter":return lc=tc(lc,a,b,c,d,e),!0;case "mouseover":return mc=tc(mc,a,b,c,d,e),!0;case "pointerover":var f=e.pointerId;nc.set(f,tc(nc.get(f)||null,a,b,c,d,e));return!0;case "gotpointercapture":return f=e.pointerId,oc.set(f,tc(oc.get(f)||null,a,b,c,d,e)),!0}return!1}
function vc(a){var b=wc(a.target);if(null!==b){var c=Zb(b);if(null!==c)if(b=c.tag,13===b){if(b=$b(c),null!==b){a.blockedOn=b;hc(a.lanePriority,function(){r.unstable_runWithPriority(a.priority,function(){gc(c)})});return}}else if(3===b&&c.stateNode.hydrate){a.blockedOn=3===c.tag?c.stateNode.containerInfo:null;return}}a.blockedOn=null}
function xc(a){if(null!==a.blockedOn)return!1;for(var b=a.targetContainers;0<b.length;){var c=yc(a.domEventName,a.eventSystemFlags,b[0],a.nativeEvent);if(null!==c)return b=Cb(c),null!==b&&fc(b),a.blockedOn=c,!1;b.shift()}return!0}function zc(a,b,c){xc(a)&&c.delete(b)}
function Ac(){for(ic=!1;0<jc.length;){var a=jc[0];if(null!==a.blockedOn){a=Cb(a.blockedOn);null!==a&&ec(a);break}for(var b=a.targetContainers;0<b.length;){var c=yc(a.domEventName,a.eventSystemFlags,b[0],a.nativeEvent);if(null!==c){a.blockedOn=c;break}b.shift()}null===a.blockedOn&&jc.shift()}null!==kc&&xc(kc)&&(kc=null);null!==lc&&xc(lc)&&(lc=null);null!==mc&&xc(mc)&&(mc=null);nc.forEach(zc);oc.forEach(zc)}
function Bc(a,b){a.blockedOn===b&&(a.blockedOn=null,ic||(ic=!0,r.unstable_scheduleCallback(r.unstable_NormalPriority,Ac)))}
function Cc(a){function b(b){return Bc(b,a)}if(0<jc.length){Bc(jc[0],a);for(var c=1;c<jc.length;c++){var d=jc[c];d.blockedOn===a&&(d.blockedOn=null)}}null!==kc&&Bc(kc,a);null!==lc&&Bc(lc,a);null!==mc&&Bc(mc,a);nc.forEach(b);oc.forEach(b);for(c=0;c<pc.length;c++)d=pc[c],d.blockedOn===a&&(d.blockedOn=null);for(;0<pc.length&&(c=pc[0],null===c.blockedOn);)vc(c),null===c.blockedOn&&pc.shift()}
function Dc(a,b){var c={};c[a.toLowerCase()]=b.toLowerCase();c["Webkit"+a]="webkit"+b;c["Moz"+a]="moz"+b;return c}var Ec={animationend:Dc("Animation","AnimationEnd"),animationiteration:Dc("Animation","AnimationIteration"),animationstart:Dc("Animation","AnimationStart"),transitionend:Dc("Transition","TransitionEnd")},Fc={},Gc={};
fa&&(Gc=document.createElement("div").style,"AnimationEvent"in window||(delete Ec.animationend.animation,delete Ec.animationiteration.animation,delete Ec.animationstart.animation),"TransitionEvent"in window||delete Ec.transitionend.transition);function Hc(a){if(Fc[a])return Fc[a];if(!Ec[a])return a;var b=Ec[a],c;for(c in b)if(b.hasOwnProperty(c)&&c in Gc)return Fc[a]=b[c];return a}
var Ic=Hc("animationend"),Jc=Hc("animationiteration"),Kc=Hc("animationstart"),Lc=Hc("transitionend"),Mc=new Map,Nc=new Map,Oc=["abort","abort",Ic,"animationEnd",Jc,"animationIteration",Kc,"animationStart","canplay","canPlay","canplaythrough","canPlayThrough","durationchange","durationChange","emptied","emptied","encrypted","encrypted","ended","ended","error","error","gotpointercapture","gotPointerCapture","load","load","loadeddata","loadedData","loadedmetadata","loadedMetadata","loadstart","loadStart",
"lostpointercapture","lostPointerCapture","playing","playing","progress","progress","seeking","seeking","stalled","stalled","suspend","suspend","timeupdate","timeUpdate",Lc,"transitionEnd","waiting","waiting"];function Pc(a,b){for(var c=0;c<a.length;c+=2){var d=a[c],e=a[c+1];e="on"+(e[0].toUpperCase()+e.slice(1));Nc.set(d,b);Mc.set(d,e);da(e,[d])}}var Qc=r.unstable_now;Qc();var F=8;
function Rc(a){if(0!==(1&a))return F=15,1;if(0!==(2&a))return F=14,2;if(0!==(4&a))return F=13,4;var b=24&a;if(0!==b)return F=12,b;if(0!==(a&32))return F=11,32;b=192&a;if(0!==b)return F=10,b;if(0!==(a&256))return F=9,256;b=3584&a;if(0!==b)return F=8,b;if(0!==(a&4096))return F=7,4096;b=4186112&a;if(0!==b)return F=6,b;b=62914560&a;if(0!==b)return F=5,b;if(a&67108864)return F=4,67108864;if(0!==(a&134217728))return F=3,134217728;b=805306368&a;if(0!==b)return F=2,b;if(0!==(1073741824&a))return F=1,1073741824;
F=8;return a}function Sc(a){switch(a){case 99:return 15;case 98:return 10;case 97:case 96:return 8;case 95:return 2;default:return 0}}function Tc(a){switch(a){case 15:case 14:return 99;case 13:case 12:case 11:case 10:return 98;case 9:case 8:case 7:case 6:case 4:case 5:return 97;case 3:case 2:case 1:return 95;case 0:return 90;default:throw Error(y(358,a));}}
function Uc(a,b){var c=a.pendingLanes;if(0===c)return F=0;var d=0,e=0,f=a.expiredLanes,g=a.suspendedLanes,h=a.pingedLanes;if(0!==f)d=f,e=F=15;else if(f=c&134217727,0!==f){var k=f&~g;0!==k?(d=Rc(k),e=F):(h&=f,0!==h&&(d=Rc(h),e=F))}else f=c&~g,0!==f?(d=Rc(f),e=F):0!==h&&(d=Rc(h),e=F);if(0===d)return 0;d=31-Vc(d);d=c&((0>d?0:1<<d)<<1)-1;if(0!==b&&b!==d&&0===(b&g)){Rc(b);if(e<=F)return b;F=e}b=a.entangledLanes;if(0!==b)for(a=a.entanglements,b&=d;0<b;)c=31-Vc(b),e=1<<c,d|=a[c],b&=~e;return d}
function Wc(a){a=a.pendingLanes&-1073741825;return 0!==a?a:a&1073741824?1073741824:0}function Xc(a,b){switch(a){case 15:return 1;case 14:return 2;case 12:return a=Yc(24&~b),0===a?Xc(10,b):a;case 10:return a=Yc(192&~b),0===a?Xc(8,b):a;case 8:return a=Yc(3584&~b),0===a&&(a=Yc(4186112&~b),0===a&&(a=512)),a;case 2:return b=Yc(805306368&~b),0===b&&(b=268435456),b}throw Error(y(358,a));}function Yc(a){return a&-a}function Zc(a){for(var b=[],c=0;31>c;c++)b.push(a);return b}
function $c(a,b,c){a.pendingLanes|=b;var d=b-1;a.suspendedLanes&=d;a.pingedLanes&=d;a=a.eventTimes;b=31-Vc(b);a[b]=c}var Vc=Math.clz32?Math.clz32:ad,bd=Math.log,cd=Math.LN2;function ad(a){return 0===a?32:31-(bd(a)/cd|0)|0}var dd=r.unstable_UserBlockingPriority,ed=r.unstable_runWithPriority,fd=!0;function gd(a,b,c,d){Kb||Ib();var e=hd,f=Kb;Kb=!0;try{Hb(e,a,b,c,d)}finally{(Kb=f)||Mb()}}function id(a,b,c,d){ed(dd,hd.bind(null,a,b,c,d))}
function hd(a,b,c,d){if(fd){var e;if((e=0===(b&4))&&0<jc.length&&-1<qc.indexOf(a))a=rc(null,a,b,c,d),jc.push(a);else{var f=yc(a,b,c,d);if(null===f)e&&sc(a,d);else{if(e){if(-1<qc.indexOf(a)){a=rc(f,a,b,c,d);jc.push(a);return}if(uc(f,a,b,c,d))return;sc(a,d)}jd(a,b,d,null,c)}}}}
function yc(a,b,c,d){var e=xb(d);e=wc(e);if(null!==e){var f=Zb(e);if(null===f)e=null;else{var g=f.tag;if(13===g){e=$b(f);if(null!==e)return e;e=null}else if(3===g){if(f.stateNode.hydrate)return 3===f.tag?f.stateNode.containerInfo:null;e=null}else f!==e&&(e=null)}}jd(a,b,d,e,c);return null}var kd=null,ld=null,md=null;
function nd(){if(md)return md;var a,b=ld,c=b.length,d,e="value"in kd?kd.value:kd.textContent,f=e.length;for(a=0;a<c&&b[a]===e[a];a++);var g=c-a;for(d=1;d<=g&&b[c-d]===e[f-d];d++);return md=e.slice(a,1<d?1-d:void 0)}function od(a){var b=a.keyCode;"charCode"in a?(a=a.charCode,0===a&&13===b&&(a=13)):a=b;10===a&&(a=13);return 32<=a||13===a?a:0}function pd(){return!0}function qd(){return!1}
function rd(a){function b(b,d,e,f,g){this._reactName=b;this._targetInst=e;this.type=d;this.nativeEvent=f;this.target=g;this.currentTarget=null;for(var c in a)a.hasOwnProperty(c)&&(b=a[c],this[c]=b?b(f):f[c]);this.isDefaultPrevented=(null!=f.defaultPrevented?f.defaultPrevented:!1===f.returnValue)?pd:qd;this.isPropagationStopped=qd;return this}m(b.prototype,{preventDefault:function(){this.defaultPrevented=!0;var a=this.nativeEvent;a&&(a.preventDefault?a.preventDefault():"unknown"!==typeof a.returnValue&&
(a.returnValue=!1),this.isDefaultPrevented=pd)},stopPropagation:function(){var a=this.nativeEvent;a&&(a.stopPropagation?a.stopPropagation():"unknown"!==typeof a.cancelBubble&&(a.cancelBubble=!0),this.isPropagationStopped=pd)},persist:function(){},isPersistent:pd});return b}
var sd={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(a){return a.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},td=rd(sd),ud=m({},sd,{view:0,detail:0}),vd=rd(ud),wd,xd,yd,Ad=m({},ud,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:zd,button:0,buttons:0,relatedTarget:function(a){return void 0===a.relatedTarget?a.fromElement===a.srcElement?a.toElement:a.fromElement:a.relatedTarget},movementX:function(a){if("movementX"in
a)return a.movementX;a!==yd&&(yd&&"mousemove"===a.type?(wd=a.screenX-yd.screenX,xd=a.screenY-yd.screenY):xd=wd=0,yd=a);return wd},movementY:function(a){return"movementY"in a?a.movementY:xd}}),Bd=rd(Ad),Cd=m({},Ad,{dataTransfer:0}),Dd=rd(Cd),Ed=m({},ud,{relatedTarget:0}),Fd=rd(Ed),Gd=m({},sd,{animationName:0,elapsedTime:0,pseudoElement:0}),Hd=rd(Gd),Id=m({},sd,{clipboardData:function(a){return"clipboardData"in a?a.clipboardData:window.clipboardData}}),Jd=rd(Id),Kd=m({},sd,{data:0}),Ld=rd(Kd),Md={Esc:"Escape",
Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},Nd={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",
119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},Od={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function Pd(a){var b=this.nativeEvent;return b.getModifierState?b.getModifierState(a):(a=Od[a])?!!b[a]:!1}function zd(){return Pd}
var Qd=m({},ud,{key:function(a){if(a.key){var b=Md[a.key]||a.key;if("Unidentified"!==b)return b}return"keypress"===a.type?(a=od(a),13===a?"Enter":String.fromCharCode(a)):"keydown"===a.type||"keyup"===a.type?Nd[a.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:zd,charCode:function(a){return"keypress"===a.type?od(a):0},keyCode:function(a){return"keydown"===a.type||"keyup"===a.type?a.keyCode:0},which:function(a){return"keypress"===
a.type?od(a):"keydown"===a.type||"keyup"===a.type?a.keyCode:0}}),Rd=rd(Qd),Sd=m({},Ad,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),Td=rd(Sd),Ud=m({},ud,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:zd}),Vd=rd(Ud),Wd=m({},sd,{propertyName:0,elapsedTime:0,pseudoElement:0}),Xd=rd(Wd),Yd=m({},Ad,{deltaX:function(a){return"deltaX"in a?a.deltaX:"wheelDeltaX"in a?-a.wheelDeltaX:0},
deltaY:function(a){return"deltaY"in a?a.deltaY:"wheelDeltaY"in a?-a.wheelDeltaY:"wheelDelta"in a?-a.wheelDelta:0},deltaZ:0,deltaMode:0}),Zd=rd(Yd),$d=[9,13,27,32],ae=fa&&"CompositionEvent"in window,be=null;fa&&"documentMode"in document&&(be=document.documentMode);var ce=fa&&"TextEvent"in window&&!be,de=fa&&(!ae||be&&8<be&&11>=be),ee=String.fromCharCode(32),fe=!1;
function ge(a,b){switch(a){case "keyup":return-1!==$d.indexOf(b.keyCode);case "keydown":return 229!==b.keyCode;case "keypress":case "mousedown":case "focusout":return!0;default:return!1}}function he(a){a=a.detail;return"object"===typeof a&&"data"in a?a.data:null}var ie=!1;function je(a,b){switch(a){case "compositionend":return he(b);case "keypress":if(32!==b.which)return null;fe=!0;return ee;case "textInput":return a=b.data,a===ee&&fe?null:a;default:return null}}
function ke(a,b){if(ie)return"compositionend"===a||!ae&&ge(a,b)?(a=nd(),md=ld=kd=null,ie=!1,a):null;switch(a){case "paste":return null;case "keypress":if(!(b.ctrlKey||b.altKey||b.metaKey)||b.ctrlKey&&b.altKey){if(b.char&&1<b.char.length)return b.char;if(b.which)return String.fromCharCode(b.which)}return null;case "compositionend":return de&&"ko"!==b.locale?null:b.data;default:return null}}
var le={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function me(a){var b=a&&a.nodeName&&a.nodeName.toLowerCase();return"input"===b?!!le[a.type]:"textarea"===b?!0:!1}function ne(a,b,c,d){Eb(d);b=oe(b,"onChange");0<b.length&&(c=new td("onChange","change",null,c,d),a.push({event:c,listeners:b}))}var pe=null,qe=null;function re(a){se(a,0)}function te(a){var b=ue(a);if(Wa(b))return a}
function ve(a,b){if("change"===a)return b}var we=!1;if(fa){var xe;if(fa){var ye="oninput"in document;if(!ye){var ze=document.createElement("div");ze.setAttribute("oninput","return;");ye="function"===typeof ze.oninput}xe=ye}else xe=!1;we=xe&&(!document.documentMode||9<document.documentMode)}function Ae(){pe&&(pe.detachEvent("onpropertychange",Be),qe=pe=null)}function Be(a){if("value"===a.propertyName&&te(qe)){var b=[];ne(b,qe,a,xb(a));a=re;if(Kb)a(b);else{Kb=!0;try{Gb(a,b)}finally{Kb=!1,Mb()}}}}
function Ce(a,b,c){"focusin"===a?(Ae(),pe=b,qe=c,pe.attachEvent("onpropertychange",Be)):"focusout"===a&&Ae()}function De(a){if("selectionchange"===a||"keyup"===a||"keydown"===a)return te(qe)}function Ee(a,b){if("click"===a)return te(b)}function Fe(a,b){if("input"===a||"change"===a)return te(b)}function Ge(a,b){return a===b&&(0!==a||1/a===1/b)||a!==a&&b!==b}var He="function"===typeof Object.is?Object.is:Ge,Ie=Object.prototype.hasOwnProperty;
function Je(a,b){if(He(a,b))return!0;if("object"!==typeof a||null===a||"object"!==typeof b||null===b)return!1;var c=Object.keys(a),d=Object.keys(b);if(c.length!==d.length)return!1;for(d=0;d<c.length;d++)if(!Ie.call(b,c[d])||!He(a[c[d]],b[c[d]]))return!1;return!0}function Ke(a){for(;a&&a.firstChild;)a=a.firstChild;return a}
function Le(a,b){var c=Ke(a);a=0;for(var d;c;){if(3===c.nodeType){d=a+c.textContent.length;if(a<=b&&d>=b)return{node:c,offset:b-a};a=d}a:{for(;c;){if(c.nextSibling){c=c.nextSibling;break a}c=c.parentNode}c=void 0}c=Ke(c)}}function Me(a,b){return a&&b?a===b?!0:a&&3===a.nodeType?!1:b&&3===b.nodeType?Me(a,b.parentNode):"contains"in a?a.contains(b):a.compareDocumentPosition?!!(a.compareDocumentPosition(b)&16):!1:!1}
function Ne(){for(var a=window,b=Xa();b instanceof a.HTMLIFrameElement;){try{var c="string"===typeof b.contentWindow.location.href}catch(d){c=!1}if(c)a=b.contentWindow;else break;b=Xa(a.document)}return b}function Oe(a){var b=a&&a.nodeName&&a.nodeName.toLowerCase();return b&&("input"===b&&("text"===a.type||"search"===a.type||"tel"===a.type||"url"===a.type||"password"===a.type)||"textarea"===b||"true"===a.contentEditable)}
var Pe=fa&&"documentMode"in document&&11>=document.documentMode,Qe=null,Re=null,Se=null,Te=!1;
function Ue(a,b,c){var d=c.window===c?c.document:9===c.nodeType?c:c.ownerDocument;Te||null==Qe||Qe!==Xa(d)||(d=Qe,"selectionStart"in d&&Oe(d)?d={start:d.selectionStart,end:d.selectionEnd}:(d=(d.ownerDocument&&d.ownerDocument.defaultView||window).getSelection(),d={anchorNode:d.anchorNode,anchorOffset:d.anchorOffset,focusNode:d.focusNode,focusOffset:d.focusOffset}),Se&&Je(Se,d)||(Se=d,d=oe(Re,"onSelect"),0<d.length&&(b=new td("onSelect","select",null,b,c),a.push({event:b,listeners:d}),b.target=Qe)))}
Pc("cancel cancel click click close close contextmenu contextMenu copy copy cut cut auxclick auxClick dblclick doubleClick dragend dragEnd dragstart dragStart drop drop focusin focus focusout blur input input invalid invalid keydown keyDown keypress keyPress keyup keyUp mousedown mouseDown mouseup mouseUp paste paste pause pause play play pointercancel pointerCancel pointerdown pointerDown pointerup pointerUp ratechange rateChange reset reset seeked seeked submit submit touchcancel touchCancel touchend touchEnd touchstart touchStart volumechange volumeChange".split(" "),
0);Pc("drag drag dragenter dragEnter dragexit dragExit dragleave dragLeave dragover dragOver mousemove mouseMove mouseout mouseOut mouseover mouseOver pointermove pointerMove pointerout pointerOut pointerover pointerOver scroll scroll toggle toggle touchmove touchMove wheel wheel".split(" "),1);Pc(Oc,2);for(var Ve="change selectionchange textInput compositionstart compositionend compositionupdate".split(" "),We=0;We<Ve.length;We++)Nc.set(Ve[We],0);ea("onMouseEnter",["mouseout","mouseover"]);
ea("onMouseLeave",["mouseout","mouseover"]);ea("onPointerEnter",["pointerout","pointerover"]);ea("onPointerLeave",["pointerout","pointerover"]);da("onChange","change click focusin focusout input keydown keyup selectionchange".split(" "));da("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));da("onBeforeInput",["compositionend","keypress","textInput","paste"]);da("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" "));
da("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" "));da("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var Xe="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),Ye=new Set("cancel close invalid load scroll toggle".split(" ").concat(Xe));
function Ze(a,b,c){var d=a.type||"unknown-event";a.currentTarget=c;Yb(d,b,void 0,a);a.currentTarget=null}
function se(a,b){b=0!==(b&4);for(var c=0;c<a.length;c++){var d=a[c],e=d.event;d=d.listeners;a:{var f=void 0;if(b)for(var g=d.length-1;0<=g;g--){var h=d[g],k=h.instance,l=h.currentTarget;h=h.listener;if(k!==f&&e.isPropagationStopped())break a;Ze(e,h,l);f=k}else for(g=0;g<d.length;g++){h=d[g];k=h.instance;l=h.currentTarget;h=h.listener;if(k!==f&&e.isPropagationStopped())break a;Ze(e,h,l);f=k}}}if(Ub)throw a=Vb,Ub=!1,Vb=null,a;}
function G(a,b){var c=$e(b),d=a+"__bubble";c.has(d)||(af(b,a,2,!1),c.add(d))}var bf="_reactListening"+Math.random().toString(36).slice(2);function cf(a){a[bf]||(a[bf]=!0,ba.forEach(function(b){Ye.has(b)||df(b,!1,a,null);df(b,!0,a,null)}))}
function df(a,b,c,d){var e=4<arguments.length&&void 0!==arguments[4]?arguments[4]:0,f=c;"selectionchange"===a&&9!==c.nodeType&&(f=c.ownerDocument);if(null!==d&&!b&&Ye.has(a)){if("scroll"!==a)return;e|=2;f=d}var g=$e(f),h=a+"__"+(b?"capture":"bubble");g.has(h)||(b&&(e|=4),af(f,a,e,b),g.add(h))}
function af(a,b,c,d){var e=Nc.get(b);switch(void 0===e?2:e){case 0:e=gd;break;case 1:e=id;break;default:e=hd}c=e.bind(null,b,c,a);e=void 0;!Pb||"touchstart"!==b&&"touchmove"!==b&&"wheel"!==b||(e=!0);d?void 0!==e?a.addEventListener(b,c,{capture:!0,passive:e}):a.addEventListener(b,c,!0):void 0!==e?a.addEventListener(b,c,{passive:e}):a.addEventListener(b,c,!1)}
function jd(a,b,c,d,e){var f=d;if(0===(b&1)&&0===(b&2)&&null!==d)a:for(;;){if(null===d)return;var g=d.tag;if(3===g||4===g){var h=d.stateNode.containerInfo;if(h===e||8===h.nodeType&&h.parentNode===e)break;if(4===g)for(g=d.return;null!==g;){var k=g.tag;if(3===k||4===k)if(k=g.stateNode.containerInfo,k===e||8===k.nodeType&&k.parentNode===e)return;g=g.return}for(;null!==h;){g=wc(h);if(null===g)return;k=g.tag;if(5===k||6===k){d=f=g;continue a}h=h.parentNode}}d=d.return}Nb(function(){var d=f,e=xb(c),g=[];
a:{var h=Mc.get(a);if(void 0!==h){var k=td,x=a;switch(a){case "keypress":if(0===od(c))break a;case "keydown":case "keyup":k=Rd;break;case "focusin":x="focus";k=Fd;break;case "focusout":x="blur";k=Fd;break;case "beforeblur":case "afterblur":k=Fd;break;case "click":if(2===c.button)break a;case "auxclick":case "dblclick":case "mousedown":case "mousemove":case "mouseup":case "mouseout":case "mouseover":case "contextmenu":k=Bd;break;case "drag":case "dragend":case "dragenter":case "dragexit":case "dragleave":case "dragover":case "dragstart":case "drop":k=
Dd;break;case "touchcancel":case "touchend":case "touchmove":case "touchstart":k=Vd;break;case Ic:case Jc:case Kc:k=Hd;break;case Lc:k=Xd;break;case "scroll":k=vd;break;case "wheel":k=Zd;break;case "copy":case "cut":case "paste":k=Jd;break;case "gotpointercapture":case "lostpointercapture":case "pointercancel":case "pointerdown":case "pointermove":case "pointerout":case "pointerover":case "pointerup":k=Td}var w=0!==(b&4),z=!w&&"scroll"===a,u=w?null!==h?h+"Capture":null:h;w=[];for(var t=d,q;null!==
t;){q=t;var v=q.stateNode;5===q.tag&&null!==v&&(q=v,null!==u&&(v=Ob(t,u),null!=v&&w.push(ef(t,v,q))));if(z)break;t=t.return}0<w.length&&(h=new k(h,x,null,c,e),g.push({event:h,listeners:w}))}}if(0===(b&7)){a:{h="mouseover"===a||"pointerover"===a;k="mouseout"===a||"pointerout"===a;if(h&&0===(b&16)&&(x=c.relatedTarget||c.fromElement)&&(wc(x)||x[ff]))break a;if(k||h){h=e.window===e?e:(h=e.ownerDocument)?h.defaultView||h.parentWindow:window;if(k){if(x=c.relatedTarget||c.toElement,k=d,x=x?wc(x):null,null!==
x&&(z=Zb(x),x!==z||5!==x.tag&&6!==x.tag))x=null}else k=null,x=d;if(k!==x){w=Bd;v="onMouseLeave";u="onMouseEnter";t="mouse";if("pointerout"===a||"pointerover"===a)w=Td,v="onPointerLeave",u="onPointerEnter",t="pointer";z=null==k?h:ue(k);q=null==x?h:ue(x);h=new w(v,t+"leave",k,c,e);h.target=z;h.relatedTarget=q;v=null;wc(e)===d&&(w=new w(u,t+"enter",x,c,e),w.target=q,w.relatedTarget=z,v=w);z=v;if(k&&x)b:{w=k;u=x;t=0;for(q=w;q;q=gf(q))t++;q=0;for(v=u;v;v=gf(v))q++;for(;0<t-q;)w=gf(w),t--;for(;0<q-t;)u=
gf(u),q--;for(;t--;){if(w===u||null!==u&&w===u.alternate)break b;w=gf(w);u=gf(u)}w=null}else w=null;null!==k&&hf(g,h,k,w,!1);null!==x&&null!==z&&hf(g,z,x,w,!0)}}}a:{h=d?ue(d):window;k=h.nodeName&&h.nodeName.toLowerCase();if("select"===k||"input"===k&&"file"===h.type)var J=ve;else if(me(h))if(we)J=Fe;else{J=De;var K=Ce}else(k=h.nodeName)&&"input"===k.toLowerCase()&&("checkbox"===h.type||"radio"===h.type)&&(J=Ee);if(J&&(J=J(a,d))){ne(g,J,c,e);break a}K&&K(a,h,d);"focusout"===a&&(K=h._wrapperState)&&
K.controlled&&"number"===h.type&&bb(h,"number",h.value)}K=d?ue(d):window;switch(a){case "focusin":if(me(K)||"true"===K.contentEditable)Qe=K,Re=d,Se=null;break;case "focusout":Se=Re=Qe=null;break;case "mousedown":Te=!0;break;case "contextmenu":case "mouseup":case "dragend":Te=!1;Ue(g,c,e);break;case "selectionchange":if(Pe)break;case "keydown":case "keyup":Ue(g,c,e)}var Q;if(ae)b:{switch(a){case "compositionstart":var L="onCompositionStart";break b;case "compositionend":L="onCompositionEnd";break b;
case "compositionupdate":L="onCompositionUpdate";break b}L=void 0}else ie?ge(a,c)&&(L="onCompositionEnd"):"keydown"===a&&229===c.keyCode&&(L="onCompositionStart");L&&(de&&"ko"!==c.locale&&(ie||"onCompositionStart"!==L?"onCompositionEnd"===L&&ie&&(Q=nd()):(kd=e,ld="value"in kd?kd.value:kd.textContent,ie=!0)),K=oe(d,L),0<K.length&&(L=new Ld(L,a,null,c,e),g.push({event:L,listeners:K}),Q?L.data=Q:(Q=he(c),null!==Q&&(L.data=Q))));if(Q=ce?je(a,c):ke(a,c))d=oe(d,"onBeforeInput"),0<d.length&&(e=new Ld("onBeforeInput",
"beforeinput",null,c,e),g.push({event:e,listeners:d}),e.data=Q)}se(g,b)})}function ef(a,b,c){return{instance:a,listener:b,currentTarget:c}}function oe(a,b){for(var c=b+"Capture",d=[];null!==a;){var e=a,f=e.stateNode;5===e.tag&&null!==f&&(e=f,f=Ob(a,c),null!=f&&d.unshift(ef(a,f,e)),f=Ob(a,b),null!=f&&d.push(ef(a,f,e)));a=a.return}return d}function gf(a){if(null===a)return null;do a=a.return;while(a&&5!==a.tag);return a?a:null}
function hf(a,b,c,d,e){for(var f=b._reactName,g=[];null!==c&&c!==d;){var h=c,k=h.alternate,l=h.stateNode;if(null!==k&&k===d)break;5===h.tag&&null!==l&&(h=l,e?(k=Ob(c,f),null!=k&&g.unshift(ef(c,k,h))):e||(k=Ob(c,f),null!=k&&g.push(ef(c,k,h))));c=c.return}0!==g.length&&a.push({event:b,listeners:g})}function jf(){}var kf=null,lf=null;function mf(a,b){switch(a){case "button":case "input":case "select":case "textarea":return!!b.autoFocus}return!1}
function nf(a,b){return"textarea"===a||"option"===a||"noscript"===a||"string"===typeof b.children||"number"===typeof b.children||"object"===typeof b.dangerouslySetInnerHTML&&null!==b.dangerouslySetInnerHTML&&null!=b.dangerouslySetInnerHTML.__html}var of="function"===typeof setTimeout?setTimeout:void 0,pf="function"===typeof clearTimeout?clearTimeout:void 0;function qf(a){1===a.nodeType?a.textContent="":9===a.nodeType&&(a=a.body,null!=a&&(a.textContent=""))}
function rf(a){for(;null!=a;a=a.nextSibling){var b=a.nodeType;if(1===b||3===b)break}return a}function sf(a){a=a.previousSibling;for(var b=0;a;){if(8===a.nodeType){var c=a.data;if("$"===c||"$!"===c||"$?"===c){if(0===b)return a;b--}else"/$"===c&&b++}a=a.previousSibling}return null}var tf=0;function uf(a){return{$$typeof:Ga,toString:a,valueOf:a}}var vf=Math.random().toString(36).slice(2),wf="__reactFiber$"+vf,xf="__reactProps$"+vf,ff="__reactContainer$"+vf,yf="__reactEvents$"+vf;
function wc(a){var b=a[wf];if(b)return b;for(var c=a.parentNode;c;){if(b=c[ff]||c[wf]){c=b.alternate;if(null!==b.child||null!==c&&null!==c.child)for(a=sf(a);null!==a;){if(c=a[wf])return c;a=sf(a)}return b}a=c;c=a.parentNode}return null}function Cb(a){a=a[wf]||a[ff];return!a||5!==a.tag&&6!==a.tag&&13!==a.tag&&3!==a.tag?null:a}function ue(a){if(5===a.tag||6===a.tag)return a.stateNode;throw Error(y(33));}function Db(a){return a[xf]||null}
function $e(a){var b=a[yf];void 0===b&&(b=a[yf]=new Set);return b}var zf=[],Af=-1;function Bf(a){return{current:a}}function H(a){0>Af||(a.current=zf[Af],zf[Af]=null,Af--)}function I(a,b){Af++;zf[Af]=a.current;a.current=b}var Cf={},M=Bf(Cf),N=Bf(!1),Df=Cf;
function Ef(a,b){var c=a.type.contextTypes;if(!c)return Cf;var d=a.stateNode;if(d&&d.__reactInternalMemoizedUnmaskedChildContext===b)return d.__reactInternalMemoizedMaskedChildContext;var e={},f;for(f in c)e[f]=b[f];d&&(a=a.stateNode,a.__reactInternalMemoizedUnmaskedChildContext=b,a.__reactInternalMemoizedMaskedChildContext=e);return e}function Ff(a){a=a.childContextTypes;return null!==a&&void 0!==a}function Gf(){H(N);H(M)}function Hf(a,b,c){if(M.current!==Cf)throw Error(y(168));I(M,b);I(N,c)}
function If(a,b,c){var d=a.stateNode;a=b.childContextTypes;if("function"!==typeof d.getChildContext)return c;d=d.getChildContext();for(var e in d)if(!(e in a))throw Error(y(108,Ra(b)||"Unknown",e));return m({},c,d)}function Jf(a){a=(a=a.stateNode)&&a.__reactInternalMemoizedMergedChildContext||Cf;Df=M.current;I(M,a);I(N,N.current);return!0}function Kf(a,b,c){var d=a.stateNode;if(!d)throw Error(y(169));c?(a=If(a,b,Df),d.__reactInternalMemoizedMergedChildContext=a,H(N),H(M),I(M,a)):H(N);I(N,c)}
var Lf=null,Mf=null,Nf=r.unstable_runWithPriority,Of=r.unstable_scheduleCallback,Pf=r.unstable_cancelCallback,Qf=r.unstable_shouldYield,Rf=r.unstable_requestPaint,Sf=r.unstable_now,Tf=r.unstable_getCurrentPriorityLevel,Uf=r.unstable_ImmediatePriority,Vf=r.unstable_UserBlockingPriority,Wf=r.unstable_NormalPriority,Xf=r.unstable_LowPriority,Yf=r.unstable_IdlePriority,Zf={},$f=void 0!==Rf?Rf:function(){},ag=null,bg=null,cg=!1,dg=Sf(),O=1E4>dg?Sf:function(){return Sf()-dg};
function eg(){switch(Tf()){case Uf:return 99;case Vf:return 98;case Wf:return 97;case Xf:return 96;case Yf:return 95;default:throw Error(y(332));}}function fg(a){switch(a){case 99:return Uf;case 98:return Vf;case 97:return Wf;case 96:return Xf;case 95:return Yf;default:throw Error(y(332));}}function gg(a,b){a=fg(a);return Nf(a,b)}function hg(a,b,c){a=fg(a);return Of(a,b,c)}function ig(){if(null!==bg){var a=bg;bg=null;Pf(a)}jg()}
function jg(){if(!cg&&null!==ag){cg=!0;var a=0;try{var b=ag;gg(99,function(){for(;a<b.length;a++){var c=b[a];do c=c(!0);while(null!==c)}});ag=null}catch(c){throw null!==ag&&(ag=ag.slice(a+1)),Of(Uf,ig),c;}finally{cg=!1}}}var kg=ra.ReactCurrentBatchConfig;function lg(a,b){if(a&&a.defaultProps){b=m({},b);a=a.defaultProps;for(var c in a)void 0===b[c]&&(b[c]=a[c]);return b}return b}var mg=Bf(null),ng=null,og=null,pg=null;function qg(){pg=og=ng=null}
function rg(a){var b=mg.current;H(mg);a.type._context._currentValue=b}function sg(a,b){for(;null!==a;){var c=a.alternate;if((a.childLanes&b)===b)if(null===c||(c.childLanes&b)===b)break;else c.childLanes|=b;else a.childLanes|=b,null!==c&&(c.childLanes|=b);a=a.return}}function tg(a,b){ng=a;pg=og=null;a=a.dependencies;null!==a&&null!==a.firstContext&&(0!==(a.lanes&b)&&(ug=!0),a.firstContext=null)}
function vg(a,b){if(pg!==a&&!1!==b&&0!==b){if("number"!==typeof b||1073741823===b)pg=a,b=1073741823;b={context:a,observedBits:b,next:null};if(null===og){if(null===ng)throw Error(y(308));og=b;ng.dependencies={lanes:0,firstContext:b,responders:null}}else og=og.next=b}return a._currentValue}var wg=!1;function xg(a){a.updateQueue={baseState:a.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null},effects:null}}
function yg(a,b){a=a.updateQueue;b.updateQueue===a&&(b.updateQueue={baseState:a.baseState,firstBaseUpdate:a.firstBaseUpdate,lastBaseUpdate:a.lastBaseUpdate,shared:a.shared,effects:a.effects})}function zg(a,b){return{eventTime:a,lane:b,tag:0,payload:null,callback:null,next:null}}function Ag(a,b){a=a.updateQueue;if(null!==a){a=a.shared;var c=a.pending;null===c?b.next=b:(b.next=c.next,c.next=b);a.pending=b}}
function Bg(a,b){var c=a.updateQueue,d=a.alternate;if(null!==d&&(d=d.updateQueue,c===d)){var e=null,f=null;c=c.firstBaseUpdate;if(null!==c){do{var g={eventTime:c.eventTime,lane:c.lane,tag:c.tag,payload:c.payload,callback:c.callback,next:null};null===f?e=f=g:f=f.next=g;c=c.next}while(null!==c);null===f?e=f=b:f=f.next=b}else e=f=b;c={baseState:d.baseState,firstBaseUpdate:e,lastBaseUpdate:f,shared:d.shared,effects:d.effects};a.updateQueue=c;return}a=c.lastBaseUpdate;null===a?c.firstBaseUpdate=b:a.next=
b;c.lastBaseUpdate=b}
function Cg(a,b,c,d){var e=a.updateQueue;wg=!1;var f=e.firstBaseUpdate,g=e.lastBaseUpdate,h=e.shared.pending;if(null!==h){e.shared.pending=null;var k=h,l=k.next;k.next=null;null===g?f=l:g.next=l;g=k;var n=a.alternate;if(null!==n){n=n.updateQueue;var A=n.lastBaseUpdate;A!==g&&(null===A?n.firstBaseUpdate=l:A.next=l,n.lastBaseUpdate=k)}}if(null!==f){A=e.baseState;g=0;n=l=k=null;do{h=f.lane;var p=f.eventTime;if((d&h)===h){null!==n&&(n=n.next={eventTime:p,lane:0,tag:f.tag,payload:f.payload,callback:f.callback,
next:null});a:{var C=a,x=f;h=b;p=c;switch(x.tag){case 1:C=x.payload;if("function"===typeof C){A=C.call(p,A,h);break a}A=C;break a;case 3:C.flags=C.flags&-4097|64;case 0:C=x.payload;h="function"===typeof C?C.call(p,A,h):C;if(null===h||void 0===h)break a;A=m({},A,h);break a;case 2:wg=!0}}null!==f.callback&&(a.flags|=32,h=e.effects,null===h?e.effects=[f]:h.push(f))}else p={eventTime:p,lane:h,tag:f.tag,payload:f.payload,callback:f.callback,next:null},null===n?(l=n=p,k=A):n=n.next=p,g|=h;f=f.next;if(null===
f)if(h=e.shared.pending,null===h)break;else f=h.next,h.next=null,e.lastBaseUpdate=h,e.shared.pending=null}while(1);null===n&&(k=A);e.baseState=k;e.firstBaseUpdate=l;e.lastBaseUpdate=n;Dg|=g;a.lanes=g;a.memoizedState=A}}function Eg(a,b,c){a=b.effects;b.effects=null;if(null!==a)for(b=0;b<a.length;b++){var d=a[b],e=d.callback;if(null!==e){d.callback=null;d=c;if("function"!==typeof e)throw Error(y(191,e));e.call(d)}}}var Fg=(new aa.Component).refs;
function Gg(a,b,c,d){b=a.memoizedState;c=c(d,b);c=null===c||void 0===c?b:m({},b,c);a.memoizedState=c;0===a.lanes&&(a.updateQueue.baseState=c)}
var Kg={isMounted:function(a){return(a=a._reactInternals)?Zb(a)===a:!1},enqueueSetState:function(a,b,c){a=a._reactInternals;var d=Hg(),e=Ig(a),f=zg(d,e);f.payload=b;void 0!==c&&null!==c&&(f.callback=c);Ag(a,f);Jg(a,e,d)},enqueueReplaceState:function(a,b,c){a=a._reactInternals;var d=Hg(),e=Ig(a),f=zg(d,e);f.tag=1;f.payload=b;void 0!==c&&null!==c&&(f.callback=c);Ag(a,f);Jg(a,e,d)},enqueueForceUpdate:function(a,b){a=a._reactInternals;var c=Hg(),d=Ig(a),e=zg(c,d);e.tag=2;void 0!==b&&null!==b&&(e.callback=
b);Ag(a,e);Jg(a,d,c)}};function Lg(a,b,c,d,e,f,g){a=a.stateNode;return"function"===typeof a.shouldComponentUpdate?a.shouldComponentUpdate(d,f,g):b.prototype&&b.prototype.isPureReactComponent?!Je(c,d)||!Je(e,f):!0}
function Mg(a,b,c){var d=!1,e=Cf;var f=b.contextType;"object"===typeof f&&null!==f?f=vg(f):(e=Ff(b)?Df:M.current,d=b.contextTypes,f=(d=null!==d&&void 0!==d)?Ef(a,e):Cf);b=new b(c,f);a.memoizedState=null!==b.state&&void 0!==b.state?b.state:null;b.updater=Kg;a.stateNode=b;b._reactInternals=a;d&&(a=a.stateNode,a.__reactInternalMemoizedUnmaskedChildContext=e,a.__reactInternalMemoizedMaskedChildContext=f);return b}
function Ng(a,b,c,d){a=b.state;"function"===typeof b.componentWillReceiveProps&&b.componentWillReceiveProps(c,d);"function"===typeof b.UNSAFE_componentWillReceiveProps&&b.UNSAFE_componentWillReceiveProps(c,d);b.state!==a&&Kg.enqueueReplaceState(b,b.state,null)}
function Og(a,b,c,d){var e=a.stateNode;e.props=c;e.state=a.memoizedState;e.refs=Fg;xg(a);var f=b.contextType;"object"===typeof f&&null!==f?e.context=vg(f):(f=Ff(b)?Df:M.current,e.context=Ef(a,f));Cg(a,c,e,d);e.state=a.memoizedState;f=b.getDerivedStateFromProps;"function"===typeof f&&(Gg(a,b,f,c),e.state=a.memoizedState);"function"===typeof b.getDerivedStateFromProps||"function"===typeof e.getSnapshotBeforeUpdate||"function"!==typeof e.UNSAFE_componentWillMount&&"function"!==typeof e.componentWillMount||
(b=e.state,"function"===typeof e.componentWillMount&&e.componentWillMount(),"function"===typeof e.UNSAFE_componentWillMount&&e.UNSAFE_componentWillMount(),b!==e.state&&Kg.enqueueReplaceState(e,e.state,null),Cg(a,c,e,d),e.state=a.memoizedState);"function"===typeof e.componentDidMount&&(a.flags|=4)}var Pg=Array.isArray;
function Qg(a,b,c){a=c.ref;if(null!==a&&"function"!==typeof a&&"object"!==typeof a){if(c._owner){c=c._owner;if(c){if(1!==c.tag)throw Error(y(309));var d=c.stateNode}if(!d)throw Error(y(147,a));var e=""+a;if(null!==b&&null!==b.ref&&"function"===typeof b.ref&&b.ref._stringRef===e)return b.ref;b=function(a){var b=d.refs;b===Fg&&(b=d.refs={});null===a?delete b[e]:b[e]=a};b._stringRef=e;return b}if("string"!==typeof a)throw Error(y(284));if(!c._owner)throw Error(y(290,a));}return a}
function Rg(a,b){if("textarea"!==a.type)throw Error(y(31,"[object Object]"===Object.prototype.toString.call(b)?"object with keys {"+Object.keys(b).join(", ")+"}":b));}
function Sg(a){function b(b,c){if(a){var d=b.lastEffect;null!==d?(d.nextEffect=c,b.lastEffect=c):b.firstEffect=b.lastEffect=c;c.nextEffect=null;c.flags=8}}function c(c,d){if(!a)return null;for(;null!==d;)b(c,d),d=d.sibling;return null}function d(a,b){for(a=new Map;null!==b;)null!==b.key?a.set(b.key,b):a.set(b.index,b),b=b.sibling;return a}function e(a,b){a=Tg(a,b);a.index=0;a.sibling=null;return a}function f(b,c,d){b.index=d;if(!a)return c;d=b.alternate;if(null!==d)return d=d.index,d<c?(b.flags=2,
c):d;b.flags=2;return c}function g(b){a&&null===b.alternate&&(b.flags=2);return b}function h(a,b,c,d){if(null===b||6!==b.tag)return b=Ug(c,a.mode,d),b.return=a,b;b=e(b,c);b.return=a;return b}function k(a,b,c,d){if(null!==b&&b.elementType===c.type)return d=e(b,c.props),d.ref=Qg(a,b,c),d.return=a,d;d=Vg(c.type,c.key,c.props,null,a.mode,d);d.ref=Qg(a,b,c);d.return=a;return d}function l(a,b,c,d){if(null===b||4!==b.tag||b.stateNode.containerInfo!==c.containerInfo||b.stateNode.implementation!==c.implementation)return b=
Wg(c,a.mode,d),b.return=a,b;b=e(b,c.children||[]);b.return=a;return b}function n(a,b,c,d,f){if(null===b||7!==b.tag)return b=Xg(c,a.mode,d,f),b.return=a,b;b=e(b,c);b.return=a;return b}function A(a,b,c){if("string"===typeof b||"number"===typeof b)return b=Ug(""+b,a.mode,c),b.return=a,b;if("object"===typeof b&&null!==b){switch(b.$$typeof){case sa:return c=Vg(b.type,b.key,b.props,null,a.mode,c),c.ref=Qg(a,null,b),c.return=a,c;case ta:return b=Wg(b,a.mode,c),b.return=a,b}if(Pg(b)||La(b))return b=Xg(b,
a.mode,c,null),b.return=a,b;Rg(a,b)}return null}function p(a,b,c,d){var e=null!==b?b.key:null;if("string"===typeof c||"number"===typeof c)return null!==e?null:h(a,b,""+c,d);if("object"===typeof c&&null!==c){switch(c.$$typeof){case sa:return c.key===e?c.type===ua?n(a,b,c.props.children,d,e):k(a,b,c,d):null;case ta:return c.key===e?l(a,b,c,d):null}if(Pg(c)||La(c))return null!==e?null:n(a,b,c,d,null);Rg(a,c)}return null}function C(a,b,c,d,e){if("string"===typeof d||"number"===typeof d)return a=a.get(c)||
null,h(b,a,""+d,e);if("object"===typeof d&&null!==d){switch(d.$$typeof){case sa:return a=a.get(null===d.key?c:d.key)||null,d.type===ua?n(b,a,d.props.children,e,d.key):k(b,a,d,e);case ta:return a=a.get(null===d.key?c:d.key)||null,l(b,a,d,e)}if(Pg(d)||La(d))return a=a.get(c)||null,n(b,a,d,e,null);Rg(b,d)}return null}function x(e,g,h,k){for(var l=null,t=null,u=g,z=g=0,q=null;null!==u&&z<h.length;z++){u.index>z?(q=u,u=null):q=u.sibling;var n=p(e,u,h[z],k);if(null===n){null===u&&(u=q);break}a&&u&&null===
n.alternate&&b(e,u);g=f(n,g,z);null===t?l=n:t.sibling=n;t=n;u=q}if(z===h.length)return c(e,u),l;if(null===u){for(;z<h.length;z++)u=A(e,h[z],k),null!==u&&(g=f(u,g,z),null===t?l=u:t.sibling=u,t=u);return l}for(u=d(e,u);z<h.length;z++)q=C(u,e,z,h[z],k),null!==q&&(a&&null!==q.alternate&&u.delete(null===q.key?z:q.key),g=f(q,g,z),null===t?l=q:t.sibling=q,t=q);a&&u.forEach(function(a){return b(e,a)});return l}function w(e,g,h,k){var l=La(h);if("function"!==typeof l)throw Error(y(150));h=l.call(h);if(null==
h)throw Error(y(151));for(var t=l=null,u=g,z=g=0,q=null,n=h.next();null!==u&&!n.done;z++,n=h.next()){u.index>z?(q=u,u=null):q=u.sibling;var w=p(e,u,n.value,k);if(null===w){null===u&&(u=q);break}a&&u&&null===w.alternate&&b(e,u);g=f(w,g,z);null===t?l=w:t.sibling=w;t=w;u=q}if(n.done)return c(e,u),l;if(null===u){for(;!n.done;z++,n=h.next())n=A(e,n.value,k),null!==n&&(g=f(n,g,z),null===t?l=n:t.sibling=n,t=n);return l}for(u=d(e,u);!n.done;z++,n=h.next())n=C(u,e,z,n.value,k),null!==n&&(a&&null!==n.alternate&&
u.delete(null===n.key?z:n.key),g=f(n,g,z),null===t?l=n:t.sibling=n,t=n);a&&u.forEach(function(a){return b(e,a)});return l}return function(a,d,f,h){var k="object"===typeof f&&null!==f&&f.type===ua&&null===f.key;k&&(f=f.props.children);var l="object"===typeof f&&null!==f;if(l)switch(f.$$typeof){case sa:a:{l=f.key;for(k=d;null!==k;){if(k.key===l){switch(k.tag){case 7:if(f.type===ua){c(a,k.sibling);d=e(k,f.props.children);d.return=a;a=d;break a}break;default:if(k.elementType===f.type){c(a,k.sibling);
d=e(k,f.props);d.ref=Qg(a,k,f);d.return=a;a=d;break a}}c(a,k);break}else b(a,k);k=k.sibling}f.type===ua?(d=Xg(f.props.children,a.mode,h,f.key),d.return=a,a=d):(h=Vg(f.type,f.key,f.props,null,a.mode,h),h.ref=Qg(a,d,f),h.return=a,a=h)}return g(a);case ta:a:{for(k=f.key;null!==d;){if(d.key===k)if(4===d.tag&&d.stateNode.containerInfo===f.containerInfo&&d.stateNode.implementation===f.implementation){c(a,d.sibling);d=e(d,f.children||[]);d.return=a;a=d;break a}else{c(a,d);break}else b(a,d);d=d.sibling}d=
Wg(f,a.mode,h);d.return=a;a=d}return g(a)}if("string"===typeof f||"number"===typeof f)return f=""+f,null!==d&&6===d.tag?(c(a,d.sibling),d=e(d,f),d.return=a,a=d):(c(a,d),d=Ug(f,a.mode,h),d.return=a,a=d),g(a);if(Pg(f))return x(a,d,f,h);if(La(f))return w(a,d,f,h);l&&Rg(a,f);if("undefined"===typeof f&&!k)switch(a.tag){case 1:case 22:case 0:case 11:case 15:throw Error(y(152,Ra(a.type)||"Component"));}return c(a,d)}}var Yg=Sg(!0),Zg=Sg(!1),$g={},ah=Bf($g),bh=Bf($g),ch=Bf($g);
function dh(a){if(a===$g)throw Error(y(174));return a}function eh(a,b){I(ch,b);I(bh,a);I(ah,$g);a=b.nodeType;switch(a){case 9:case 11:b=(b=b.documentElement)?b.namespaceURI:mb(null,"");break;default:a=8===a?b.parentNode:b,b=a.namespaceURI||null,a=a.tagName,b=mb(b,a)}H(ah);I(ah,b)}function fh(){H(ah);H(bh);H(ch)}function gh(a){dh(ch.current);var b=dh(ah.current);var c=mb(b,a.type);b!==c&&(I(bh,a),I(ah,c))}function hh(a){bh.current===a&&(H(ah),H(bh))}var P=Bf(0);
function ih(a){for(var b=a;null!==b;){if(13===b.tag){var c=b.memoizedState;if(null!==c&&(c=c.dehydrated,null===c||"$?"===c.data||"$!"===c.data))return b}else if(19===b.tag&&void 0!==b.memoizedProps.revealOrder){if(0!==(b.flags&64))return b}else if(null!==b.child){b.child.return=b;b=b.child;continue}if(b===a)break;for(;null===b.sibling;){if(null===b.return||b.return===a)return null;b=b.return}b.sibling.return=b.return;b=b.sibling}return null}var jh=null,kh=null,lh=!1;
function mh(a,b){var c=nh(5,null,null,0);c.elementType="DELETED";c.type="DELETED";c.stateNode=b;c.return=a;c.flags=8;null!==a.lastEffect?(a.lastEffect.nextEffect=c,a.lastEffect=c):a.firstEffect=a.lastEffect=c}function oh(a,b){switch(a.tag){case 5:var c=a.type;b=1!==b.nodeType||c.toLowerCase()!==b.nodeName.toLowerCase()?null:b;return null!==b?(a.stateNode=b,!0):!1;case 6:return b=""===a.pendingProps||3!==b.nodeType?null:b,null!==b?(a.stateNode=b,!0):!1;case 13:return!1;default:return!1}}
function ph(a){if(lh){var b=kh;if(b){var c=b;if(!oh(a,b)){b=rf(c.nextSibling);if(!b||!oh(a,b)){a.flags=a.flags&-1025|2;lh=!1;jh=a;return}mh(jh,c)}jh=a;kh=rf(b.firstChild)}else a.flags=a.flags&-1025|2,lh=!1,jh=a}}function qh(a){for(a=a.return;null!==a&&5!==a.tag&&3!==a.tag&&13!==a.tag;)a=a.return;jh=a}
function rh(a){if(a!==jh)return!1;if(!lh)return qh(a),lh=!0,!1;var b=a.type;if(5!==a.tag||"head"!==b&&"body"!==b&&!nf(b,a.memoizedProps))for(b=kh;b;)mh(a,b),b=rf(b.nextSibling);qh(a);if(13===a.tag){a=a.memoizedState;a=null!==a?a.dehydrated:null;if(!a)throw Error(y(317));a:{a=a.nextSibling;for(b=0;a;){if(8===a.nodeType){var c=a.data;if("/$"===c){if(0===b){kh=rf(a.nextSibling);break a}b--}else"$"!==c&&"$!"!==c&&"$?"!==c||b++}a=a.nextSibling}kh=null}}else kh=jh?rf(a.stateNode.nextSibling):null;return!0}
function sh(){kh=jh=null;lh=!1}var th=[];function uh(){for(var a=0;a<th.length;a++)th[a]._workInProgressVersionPrimary=null;th.length=0}var vh=ra.ReactCurrentDispatcher,wh=ra.ReactCurrentBatchConfig,xh=0,R=null,S=null,T=null,yh=!1,zh=!1;function Ah(){throw Error(y(321));}function Bh(a,b){if(null===b)return!1;for(var c=0;c<b.length&&c<a.length;c++)if(!He(a[c],b[c]))return!1;return!0}
function Ch(a,b,c,d,e,f){xh=f;R=b;b.memoizedState=null;b.updateQueue=null;b.lanes=0;vh.current=null===a||null===a.memoizedState?Dh:Eh;a=c(d,e);if(zh){f=0;do{zh=!1;if(!(25>f))throw Error(y(301));f+=1;T=S=null;b.updateQueue=null;vh.current=Fh;a=c(d,e)}while(zh)}vh.current=Gh;b=null!==S&&null!==S.next;xh=0;T=S=R=null;yh=!1;if(b)throw Error(y(300));return a}function Hh(){var a={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};null===T?R.memoizedState=T=a:T=T.next=a;return T}
function Ih(){if(null===S){var a=R.alternate;a=null!==a?a.memoizedState:null}else a=S.next;var b=null===T?R.memoizedState:T.next;if(null!==b)T=b,S=a;else{if(null===a)throw Error(y(310));S=a;a={memoizedState:S.memoizedState,baseState:S.baseState,baseQueue:S.baseQueue,queue:S.queue,next:null};null===T?R.memoizedState=T=a:T=T.next=a}return T}function Jh(a,b){return"function"===typeof b?b(a):b}
function Kh(a){var b=Ih(),c=b.queue;if(null===c)throw Error(y(311));c.lastRenderedReducer=a;var d=S,e=d.baseQueue,f=c.pending;if(null!==f){if(null!==e){var g=e.next;e.next=f.next;f.next=g}d.baseQueue=e=f;c.pending=null}if(null!==e){e=e.next;d=d.baseState;var h=g=f=null,k=e;do{var l=k.lane;if((xh&l)===l)null!==h&&(h=h.next={lane:0,action:k.action,eagerReducer:k.eagerReducer,eagerState:k.eagerState,next:null}),d=k.eagerReducer===a?k.eagerState:a(d,k.action);else{var n={lane:l,action:k.action,eagerReducer:k.eagerReducer,
eagerState:k.eagerState,next:null};null===h?(g=h=n,f=d):h=h.next=n;R.lanes|=l;Dg|=l}k=k.next}while(null!==k&&k!==e);null===h?f=d:h.next=g;He(d,b.memoizedState)||(ug=!0);b.memoizedState=d;b.baseState=f;b.baseQueue=h;c.lastRenderedState=d}return[b.memoizedState,c.dispatch]}
function Lh(a){var b=Ih(),c=b.queue;if(null===c)throw Error(y(311));c.lastRenderedReducer=a;var d=c.dispatch,e=c.pending,f=b.memoizedState;if(null!==e){c.pending=null;var g=e=e.next;do f=a(f,g.action),g=g.next;while(g!==e);He(f,b.memoizedState)||(ug=!0);b.memoizedState=f;null===b.baseQueue&&(b.baseState=f);c.lastRenderedState=f}return[f,d]}
function Mh(a,b,c){var d=b._getVersion;d=d(b._source);var e=b._workInProgressVersionPrimary;if(null!==e)a=e===d;else if(a=a.mutableReadLanes,a=(xh&a)===a)b._workInProgressVersionPrimary=d,th.push(b);if(a)return c(b._source);th.push(b);throw Error(y(350));}
function Nh(a,b,c,d){var e=U;if(null===e)throw Error(y(349));var f=b._getVersion,g=f(b._source),h=vh.current,k=h.useState(function(){return Mh(e,b,c)}),l=k[1],n=k[0];k=T;var A=a.memoizedState,p=A.refs,C=p.getSnapshot,x=A.source;A=A.subscribe;var w=R;a.memoizedState={refs:p,source:b,subscribe:d};h.useEffect(function(){p.getSnapshot=c;p.setSnapshot=l;var a=f(b._source);if(!He(g,a)){a=c(b._source);He(n,a)||(l(a),a=Ig(w),e.mutableReadLanes|=a&e.pendingLanes);a=e.mutableReadLanes;e.entangledLanes|=a;for(var d=
e.entanglements,h=a;0<h;){var k=31-Vc(h),v=1<<k;d[k]|=a;h&=~v}}},[c,b,d]);h.useEffect(function(){return d(b._source,function(){var a=p.getSnapshot,c=p.setSnapshot;try{c(a(b._source));var d=Ig(w);e.mutableReadLanes|=d&e.pendingLanes}catch(q){c(function(){throw q;})}})},[b,d]);He(C,c)&&He(x,b)&&He(A,d)||(a={pending:null,dispatch:null,lastRenderedReducer:Jh,lastRenderedState:n},a.dispatch=l=Oh.bind(null,R,a),k.queue=a,k.baseQueue=null,n=Mh(e,b,c),k.memoizedState=k.baseState=n);return n}
function Ph(a,b,c){var d=Ih();return Nh(d,a,b,c)}function Qh(a){var b=Hh();"function"===typeof a&&(a=a());b.memoizedState=b.baseState=a;a=b.queue={pending:null,dispatch:null,lastRenderedReducer:Jh,lastRenderedState:a};a=a.dispatch=Oh.bind(null,R,a);return[b.memoizedState,a]}
function Rh(a,b,c,d){a={tag:a,create:b,destroy:c,deps:d,next:null};b=R.updateQueue;null===b?(b={lastEffect:null},R.updateQueue=b,b.lastEffect=a.next=a):(c=b.lastEffect,null===c?b.lastEffect=a.next=a:(d=c.next,c.next=a,a.next=d,b.lastEffect=a));return a}function Sh(a){var b=Hh();a={current:a};return b.memoizedState=a}function Th(){return Ih().memoizedState}function Uh(a,b,c,d){var e=Hh();R.flags|=a;e.memoizedState=Rh(1|b,c,void 0,void 0===d?null:d)}
function Vh(a,b,c,d){var e=Ih();d=void 0===d?null:d;var f=void 0;if(null!==S){var g=S.memoizedState;f=g.destroy;if(null!==d&&Bh(d,g.deps)){Rh(b,c,f,d);return}}R.flags|=a;e.memoizedState=Rh(1|b,c,f,d)}function Wh(a,b){return Uh(516,4,a,b)}function Xh(a,b){return Vh(516,4,a,b)}function Yh(a,b){return Vh(4,2,a,b)}function Zh(a,b){if("function"===typeof b)return a=a(),b(a),function(){b(null)};if(null!==b&&void 0!==b)return a=a(),b.current=a,function(){b.current=null}}
function $h(a,b,c){c=null!==c&&void 0!==c?c.concat([a]):null;return Vh(4,2,Zh.bind(null,b,a),c)}function ai(){}function bi(a,b){var c=Ih();b=void 0===b?null:b;var d=c.memoizedState;if(null!==d&&null!==b&&Bh(b,d[1]))return d[0];c.memoizedState=[a,b];return a}function ci(a,b){var c=Ih();b=void 0===b?null:b;var d=c.memoizedState;if(null!==d&&null!==b&&Bh(b,d[1]))return d[0];a=a();c.memoizedState=[a,b];return a}
function di(a,b){var c=eg();gg(98>c?98:c,function(){a(!0)});gg(97<c?97:c,function(){var c=wh.transition;wh.transition=1;try{a(!1),b()}finally{wh.transition=c}})}
function Oh(a,b,c){var d=Hg(),e=Ig(a),f={lane:e,action:c,eagerReducer:null,eagerState:null,next:null},g=b.pending;null===g?f.next=f:(f.next=g.next,g.next=f);b.pending=f;g=a.alternate;if(a===R||null!==g&&g===R)zh=yh=!0;else{if(0===a.lanes&&(null===g||0===g.lanes)&&(g=b.lastRenderedReducer,null!==g))try{var h=b.lastRenderedState,k=g(h,c);f.eagerReducer=g;f.eagerState=k;if(He(k,h))return}catch(l){}finally{}Jg(a,e,d)}}
var Gh={readContext:vg,useCallback:Ah,useContext:Ah,useEffect:Ah,useImperativeHandle:Ah,useLayoutEffect:Ah,useMemo:Ah,useReducer:Ah,useRef:Ah,useState:Ah,useDebugValue:Ah,useDeferredValue:Ah,useTransition:Ah,useMutableSource:Ah,useOpaqueIdentifier:Ah,unstable_isNewReconciler:!1},Dh={readContext:vg,useCallback:function(a,b){Hh().memoizedState=[a,void 0===b?null:b];return a},useContext:vg,useEffect:Wh,useImperativeHandle:function(a,b,c){c=null!==c&&void 0!==c?c.concat([a]):null;return Uh(4,2,Zh.bind(null,
b,a),c)},useLayoutEffect:function(a,b){return Uh(4,2,a,b)},useMemo:function(a,b){var c=Hh();b=void 0===b?null:b;a=a();c.memoizedState=[a,b];return a},useReducer:function(a,b,c){var d=Hh();b=void 0!==c?c(b):b;d.memoizedState=d.baseState=b;a=d.queue={pending:null,dispatch:null,lastRenderedReducer:a,lastRenderedState:b};a=a.dispatch=Oh.bind(null,R,a);return[d.memoizedState,a]},useRef:Sh,useState:Qh,useDebugValue:ai,useDeferredValue:function(a){var b=Qh(a),c=b[0],d=b[1];Wh(function(){var b=wh.transition;
wh.transition=1;try{d(a)}finally{wh.transition=b}},[a]);return c},useTransition:function(){var a=Qh(!1),b=a[0];a=di.bind(null,a[1]);Sh(a);return[a,b]},useMutableSource:function(a,b,c){var d=Hh();d.memoizedState={refs:{getSnapshot:b,setSnapshot:null},source:a,subscribe:c};return Nh(d,a,b,c)},useOpaqueIdentifier:function(){if(lh){var a=!1,b=uf(function(){a||(a=!0,c("r:"+(tf++).toString(36)));throw Error(y(355));}),c=Qh(b)[1];0===(R.mode&2)&&(R.flags|=516,Rh(5,function(){c("r:"+(tf++).toString(36))},
void 0,null));return b}b="r:"+(tf++).toString(36);Qh(b);return b},unstable_isNewReconciler:!1},Eh={readContext:vg,useCallback:bi,useContext:vg,useEffect:Xh,useImperativeHandle:$h,useLayoutEffect:Yh,useMemo:ci,useReducer:Kh,useRef:Th,useState:function(){return Kh(Jh)},useDebugValue:ai,useDeferredValue:function(a){var b=Kh(Jh),c=b[0],d=b[1];Xh(function(){var b=wh.transition;wh.transition=1;try{d(a)}finally{wh.transition=b}},[a]);return c},useTransition:function(){var a=Kh(Jh)[0];return[Th().current,
a]},useMutableSource:Ph,useOpaqueIdentifier:function(){return Kh(Jh)[0]},unstable_isNewReconciler:!1},Fh={readContext:vg,useCallback:bi,useContext:vg,useEffect:Xh,useImperativeHandle:$h,useLayoutEffect:Yh,useMemo:ci,useReducer:Lh,useRef:Th,useState:function(){return Lh(Jh)},useDebugValue:ai,useDeferredValue:function(a){var b=Lh(Jh),c=b[0],d=b[1];Xh(function(){var b=wh.transition;wh.transition=1;try{d(a)}finally{wh.transition=b}},[a]);return c},useTransition:function(){var a=Lh(Jh)[0];return[Th().current,
a]},useMutableSource:Ph,useOpaqueIdentifier:function(){return Lh(Jh)[0]},unstable_isNewReconciler:!1},ei=ra.ReactCurrentOwner,ug=!1;function fi(a,b,c,d){b.child=null===a?Zg(b,null,c,d):Yg(b,a.child,c,d)}function gi(a,b,c,d,e){c=c.render;var f=b.ref;tg(b,e);d=Ch(a,b,c,d,f,e);if(null!==a&&!ug)return b.updateQueue=a.updateQueue,b.flags&=-517,a.lanes&=~e,hi(a,b,e);b.flags|=1;fi(a,b,d,e);return b.child}
function ii(a,b,c,d,e,f){if(null===a){var g=c.type;if("function"===typeof g&&!ji(g)&&void 0===g.defaultProps&&null===c.compare&&void 0===c.defaultProps)return b.tag=15,b.type=g,ki(a,b,g,d,e,f);a=Vg(c.type,null,d,b,b.mode,f);a.ref=b.ref;a.return=b;return b.child=a}g=a.child;if(0===(e&f)&&(e=g.memoizedProps,c=c.compare,c=null!==c?c:Je,c(e,d)&&a.ref===b.ref))return hi(a,b,f);b.flags|=1;a=Tg(g,d);a.ref=b.ref;a.return=b;return b.child=a}
function ki(a,b,c,d,e,f){if(null!==a&&Je(a.memoizedProps,d)&&a.ref===b.ref)if(ug=!1,0!==(f&e))0!==(a.flags&16384)&&(ug=!0);else return b.lanes=a.lanes,hi(a,b,f);return li(a,b,c,d,f)}
function mi(a,b,c){var d=b.pendingProps,e=d.children,f=null!==a?a.memoizedState:null;if("hidden"===d.mode||"unstable-defer-without-hiding"===d.mode)if(0===(b.mode&4))b.memoizedState={baseLanes:0},ni(b,c);else if(0!==(c&1073741824))b.memoizedState={baseLanes:0},ni(b,null!==f?f.baseLanes:c);else return a=null!==f?f.baseLanes|c:c,b.lanes=b.childLanes=1073741824,b.memoizedState={baseLanes:a},ni(b,a),null;else null!==f?(d=f.baseLanes|c,b.memoizedState=null):d=c,ni(b,d);fi(a,b,e,c);return b.child}
function oi(a,b){var c=b.ref;if(null===a&&null!==c||null!==a&&a.ref!==c)b.flags|=128}function li(a,b,c,d,e){var f=Ff(c)?Df:M.current;f=Ef(b,f);tg(b,e);c=Ch(a,b,c,d,f,e);if(null!==a&&!ug)return b.updateQueue=a.updateQueue,b.flags&=-517,a.lanes&=~e,hi(a,b,e);b.flags|=1;fi(a,b,c,e);return b.child}
function pi(a,b,c,d,e){if(Ff(c)){var f=!0;Jf(b)}else f=!1;tg(b,e);if(null===b.stateNode)null!==a&&(a.alternate=null,b.alternate=null,b.flags|=2),Mg(b,c,d),Og(b,c,d,e),d=!0;else if(null===a){var g=b.stateNode,h=b.memoizedProps;g.props=h;var k=g.context,l=c.contextType;"object"===typeof l&&null!==l?l=vg(l):(l=Ff(c)?Df:M.current,l=Ef(b,l));var n=c.getDerivedStateFromProps,A="function"===typeof n||"function"===typeof g.getSnapshotBeforeUpdate;A||"function"!==typeof g.UNSAFE_componentWillReceiveProps&&
"function"!==typeof g.componentWillReceiveProps||(h!==d||k!==l)&&Ng(b,g,d,l);wg=!1;var p=b.memoizedState;g.state=p;Cg(b,d,g,e);k=b.memoizedState;h!==d||p!==k||N.current||wg?("function"===typeof n&&(Gg(b,c,n,d),k=b.memoizedState),(h=wg||Lg(b,c,h,d,p,k,l))?(A||"function"!==typeof g.UNSAFE_componentWillMount&&"function"!==typeof g.componentWillMount||("function"===typeof g.componentWillMount&&g.componentWillMount(),"function"===typeof g.UNSAFE_componentWillMount&&g.UNSAFE_componentWillMount()),"function"===
typeof g.componentDidMount&&(b.flags|=4)):("function"===typeof g.componentDidMount&&(b.flags|=4),b.memoizedProps=d,b.memoizedState=k),g.props=d,g.state=k,g.context=l,d=h):("function"===typeof g.componentDidMount&&(b.flags|=4),d=!1)}else{g=b.stateNode;yg(a,b);h=b.memoizedProps;l=b.type===b.elementType?h:lg(b.type,h);g.props=l;A=b.pendingProps;p=g.context;k=c.contextType;"object"===typeof k&&null!==k?k=vg(k):(k=Ff(c)?Df:M.current,k=Ef(b,k));var C=c.getDerivedStateFromProps;(n="function"===typeof C||
"function"===typeof g.getSnapshotBeforeUpdate)||"function"!==typeof g.UNSAFE_componentWillReceiveProps&&"function"!==typeof g.componentWillReceiveProps||(h!==A||p!==k)&&Ng(b,g,d,k);wg=!1;p=b.memoizedState;g.state=p;Cg(b,d,g,e);var x=b.memoizedState;h!==A||p!==x||N.current||wg?("function"===typeof C&&(Gg(b,c,C,d),x=b.memoizedState),(l=wg||Lg(b,c,l,d,p,x,k))?(n||"function"!==typeof g.UNSAFE_componentWillUpdate&&"function"!==typeof g.componentWillUpdate||("function"===typeof g.componentWillUpdate&&g.componentWillUpdate(d,
x,k),"function"===typeof g.UNSAFE_componentWillUpdate&&g.UNSAFE_componentWillUpdate(d,x,k)),"function"===typeof g.componentDidUpdate&&(b.flags|=4),"function"===typeof g.getSnapshotBeforeUpdate&&(b.flags|=256)):("function"!==typeof g.componentDidUpdate||h===a.memoizedProps&&p===a.memoizedState||(b.flags|=4),"function"!==typeof g.getSnapshotBeforeUpdate||h===a.memoizedProps&&p===a.memoizedState||(b.flags|=256),b.memoizedProps=d,b.memoizedState=x),g.props=d,g.state=x,g.context=k,d=l):("function"!==typeof g.componentDidUpdate||
h===a.memoizedProps&&p===a.memoizedState||(b.flags|=4),"function"!==typeof g.getSnapshotBeforeUpdate||h===a.memoizedProps&&p===a.memoizedState||(b.flags|=256),d=!1)}return qi(a,b,c,d,f,e)}
function qi(a,b,c,d,e,f){oi(a,b);var g=0!==(b.flags&64);if(!d&&!g)return e&&Kf(b,c,!1),hi(a,b,f);d=b.stateNode;ei.current=b;var h=g&&"function"!==typeof c.getDerivedStateFromError?null:d.render();b.flags|=1;null!==a&&g?(b.child=Yg(b,a.child,null,f),b.child=Yg(b,null,h,f)):fi(a,b,h,f);b.memoizedState=d.state;e&&Kf(b,c,!0);return b.child}function ri(a){var b=a.stateNode;b.pendingContext?Hf(a,b.pendingContext,b.pendingContext!==b.context):b.context&&Hf(a,b.context,!1);eh(a,b.containerInfo)}
var si={dehydrated:null,retryLane:0};
function ti(a,b,c){var d=b.pendingProps,e=P.current,f=!1,g;(g=0!==(b.flags&64))||(g=null!==a&&null===a.memoizedState?!1:0!==(e&2));g?(f=!0,b.flags&=-65):null!==a&&null===a.memoizedState||void 0===d.fallback||!0===d.unstable_avoidThisFallback||(e|=1);I(P,e&1);if(null===a){void 0!==d.fallback&&ph(b);a=d.children;e=d.fallback;if(f)return a=ui(b,a,e,c),b.child.memoizedState={baseLanes:c},b.memoizedState=si,a;if("number"===typeof d.unstable_expectedLoadTime)return a=ui(b,a,e,c),b.child.memoizedState={baseLanes:c},
b.memoizedState=si,b.lanes=33554432,a;c=vi({mode:"visible",children:a},b.mode,c,null);c.return=b;return b.child=c}if(null!==a.memoizedState){if(f)return d=wi(a,b,d.children,d.fallback,c),f=b.child,e=a.child.memoizedState,f.memoizedState=null===e?{baseLanes:c}:{baseLanes:e.baseLanes|c},f.childLanes=a.childLanes&~c,b.memoizedState=si,d;c=xi(a,b,d.children,c);b.memoizedState=null;return c}if(f)return d=wi(a,b,d.children,d.fallback,c),f=b.child,e=a.child.memoizedState,f.memoizedState=null===e?{baseLanes:c}:
{baseLanes:e.baseLanes|c},f.childLanes=a.childLanes&~c,b.memoizedState=si,d;c=xi(a,b,d.children,c);b.memoizedState=null;return c}function ui(a,b,c,d){var e=a.mode,f=a.child;b={mode:"hidden",children:b};0===(e&2)&&null!==f?(f.childLanes=0,f.pendingProps=b):f=vi(b,e,0,null);c=Xg(c,e,d,null);f.return=a;c.return=a;f.sibling=c;a.child=f;return c}
function xi(a,b,c,d){var e=a.child;a=e.sibling;c=Tg(e,{mode:"visible",children:c});0===(b.mode&2)&&(c.lanes=d);c.return=b;c.sibling=null;null!==a&&(a.nextEffect=null,a.flags=8,b.firstEffect=b.lastEffect=a);return b.child=c}
function wi(a,b,c,d,e){var f=b.mode,g=a.child;a=g.sibling;var h={mode:"hidden",children:c};0===(f&2)&&b.child!==g?(c=b.child,c.childLanes=0,c.pendingProps=h,g=c.lastEffect,null!==g?(b.firstEffect=c.firstEffect,b.lastEffect=g,g.nextEffect=null):b.firstEffect=b.lastEffect=null):c=Tg(g,h);null!==a?d=Tg(a,d):(d=Xg(d,f,e,null),d.flags|=2);d.return=b;c.return=b;c.sibling=d;b.child=c;return d}function yi(a,b){a.lanes|=b;var c=a.alternate;null!==c&&(c.lanes|=b);sg(a.return,b)}
function zi(a,b,c,d,e,f){var g=a.memoizedState;null===g?a.memoizedState={isBackwards:b,rendering:null,renderingStartTime:0,last:d,tail:c,tailMode:e,lastEffect:f}:(g.isBackwards=b,g.rendering=null,g.renderingStartTime=0,g.last=d,g.tail=c,g.tailMode=e,g.lastEffect=f)}
function Ai(a,b,c){var d=b.pendingProps,e=d.revealOrder,f=d.tail;fi(a,b,d.children,c);d=P.current;if(0!==(d&2))d=d&1|2,b.flags|=64;else{if(null!==a&&0!==(a.flags&64))a:for(a=b.child;null!==a;){if(13===a.tag)null!==a.memoizedState&&yi(a,c);else if(19===a.tag)yi(a,c);else if(null!==a.child){a.child.return=a;a=a.child;continue}if(a===b)break a;for(;null===a.sibling;){if(null===a.return||a.return===b)break a;a=a.return}a.sibling.return=a.return;a=a.sibling}d&=1}I(P,d);if(0===(b.mode&2))b.memoizedState=
null;else switch(e){case "forwards":c=b.child;for(e=null;null!==c;)a=c.alternate,null!==a&&null===ih(a)&&(e=c),c=c.sibling;c=e;null===c?(e=b.child,b.child=null):(e=c.sibling,c.sibling=null);zi(b,!1,e,c,f,b.lastEffect);break;case "backwards":c=null;e=b.child;for(b.child=null;null!==e;){a=e.alternate;if(null!==a&&null===ih(a)){b.child=e;break}a=e.sibling;e.sibling=c;c=e;e=a}zi(b,!0,c,null,f,b.lastEffect);break;case "together":zi(b,!1,null,null,void 0,b.lastEffect);break;default:b.memoizedState=null}return b.child}
function hi(a,b,c){null!==a&&(b.dependencies=a.dependencies);Dg|=b.lanes;if(0!==(c&b.childLanes)){if(null!==a&&b.child!==a.child)throw Error(y(153));if(null!==b.child){a=b.child;c=Tg(a,a.pendingProps);b.child=c;for(c.return=b;null!==a.sibling;)a=a.sibling,c=c.sibling=Tg(a,a.pendingProps),c.return=b;c.sibling=null}return b.child}return null}var Bi,Ci,Di,Ei;
Bi=function(a,b){for(var c=b.child;null!==c;){if(5===c.tag||6===c.tag)a.appendChild(c.stateNode);else if(4!==c.tag&&null!==c.child){c.child.return=c;c=c.child;continue}if(c===b)break;for(;null===c.sibling;){if(null===c.return||c.return===b)return;c=c.return}c.sibling.return=c.return;c=c.sibling}};Ci=function(){};
Di=function(a,b,c,d){var e=a.memoizedProps;if(e!==d){a=b.stateNode;dh(ah.current);var f=null;switch(c){case "input":e=Ya(a,e);d=Ya(a,d);f=[];break;case "option":e=eb(a,e);d=eb(a,d);f=[];break;case "select":e=m({},e,{value:void 0});d=m({},d,{value:void 0});f=[];break;case "textarea":e=gb(a,e);d=gb(a,d);f=[];break;default:"function"!==typeof e.onClick&&"function"===typeof d.onClick&&(a.onclick=jf)}vb(c,d);var g;c=null;for(l in e)if(!d.hasOwnProperty(l)&&e.hasOwnProperty(l)&&null!=e[l])if("style"===
l){var h=e[l];for(g in h)h.hasOwnProperty(g)&&(c||(c={}),c[g]="")}else"dangerouslySetInnerHTML"!==l&&"children"!==l&&"suppressContentEditableWarning"!==l&&"suppressHydrationWarning"!==l&&"autoFocus"!==l&&(ca.hasOwnProperty(l)?f||(f=[]):(f=f||[]).push(l,null));for(l in d){var k=d[l];h=null!=e?e[l]:void 0;if(d.hasOwnProperty(l)&&k!==h&&(null!=k||null!=h))if("style"===l)if(h){for(g in h)!h.hasOwnProperty(g)||k&&k.hasOwnProperty(g)||(c||(c={}),c[g]="");for(g in k)k.hasOwnProperty(g)&&h[g]!==k[g]&&(c||
(c={}),c[g]=k[g])}else c||(f||(f=[]),f.push(l,c)),c=k;else"dangerouslySetInnerHTML"===l?(k=k?k.__html:void 0,h=h?h.__html:void 0,null!=k&&h!==k&&(f=f||[]).push(l,k)):"children"===l?"string"!==typeof k&&"number"!==typeof k||(f=f||[]).push(l,""+k):"suppressContentEditableWarning"!==l&&"suppressHydrationWarning"!==l&&(ca.hasOwnProperty(l)?(null!=k&&"onScroll"===l&&G("scroll",a),f||h===k||(f=[])):"object"===typeof k&&null!==k&&k.$$typeof===Ga?k.toString():(f=f||[]).push(l,k))}c&&(f=f||[]).push("style",
c);var l=f;if(b.updateQueue=l)b.flags|=4}};Ei=function(a,b,c,d){c!==d&&(b.flags|=4)};function Fi(a,b){if(!lh)switch(a.tailMode){case "hidden":b=a.tail;for(var c=null;null!==b;)null!==b.alternate&&(c=b),b=b.sibling;null===c?a.tail=null:c.sibling=null;break;case "collapsed":c=a.tail;for(var d=null;null!==c;)null!==c.alternate&&(d=c),c=c.sibling;null===d?b||null===a.tail?a.tail=null:a.tail.sibling=null:d.sibling=null}}
function Gi(a,b,c){var d=b.pendingProps;switch(b.tag){case 2:case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return null;case 1:return Ff(b.type)&&Gf(),null;case 3:fh();H(N);H(M);uh();d=b.stateNode;d.pendingContext&&(d.context=d.pendingContext,d.pendingContext=null);if(null===a||null===a.child)rh(b)?b.flags|=4:d.hydrate||(b.flags|=256);Ci(b);return null;case 5:hh(b);var e=dh(ch.current);c=b.type;if(null!==a&&null!=b.stateNode)Di(a,b,c,d,e),a.ref!==b.ref&&(b.flags|=128);else{if(!d){if(null===
b.stateNode)throw Error(y(166));return null}a=dh(ah.current);if(rh(b)){d=b.stateNode;c=b.type;var f=b.memoizedProps;d[wf]=b;d[xf]=f;switch(c){case "dialog":G("cancel",d);G("close",d);break;case "iframe":case "object":case "embed":G("load",d);break;case "video":case "audio":for(a=0;a<Xe.length;a++)G(Xe[a],d);break;case "source":G("error",d);break;case "img":case "image":case "link":G("error",d);G("load",d);break;case "details":G("toggle",d);break;case "input":Za(d,f);G("invalid",d);break;case "select":d._wrapperState=
{wasMultiple:!!f.multiple};G("invalid",d);break;case "textarea":hb(d,f),G("invalid",d)}vb(c,f);a=null;for(var g in f)f.hasOwnProperty(g)&&(e=f[g],"children"===g?"string"===typeof e?d.textContent!==e&&(a=["children",e]):"number"===typeof e&&d.textContent!==""+e&&(a=["children",""+e]):ca.hasOwnProperty(g)&&null!=e&&"onScroll"===g&&G("scroll",d));switch(c){case "input":Va(d);cb(d,f,!0);break;case "textarea":Va(d);jb(d);break;case "select":case "option":break;default:"function"===typeof f.onClick&&(d.onclick=
jf)}d=a;b.updateQueue=d;null!==d&&(b.flags|=4)}else{g=9===e.nodeType?e:e.ownerDocument;a===kb.html&&(a=lb(c));a===kb.html?"script"===c?(a=g.createElement("div"),a.innerHTML="<script>\x3c/script>",a=a.removeChild(a.firstChild)):"string"===typeof d.is?a=g.createElement(c,{is:d.is}):(a=g.createElement(c),"select"===c&&(g=a,d.multiple?g.multiple=!0:d.size&&(g.size=d.size))):a=g.createElementNS(a,c);a[wf]=b;a[xf]=d;Bi(a,b,!1,!1);b.stateNode=a;g=wb(c,d);switch(c){case "dialog":G("cancel",a);G("close",a);
e=d;break;case "iframe":case "object":case "embed":G("load",a);e=d;break;case "video":case "audio":for(e=0;e<Xe.length;e++)G(Xe[e],a);e=d;break;case "source":G("error",a);e=d;break;case "img":case "image":case "link":G("error",a);G("load",a);e=d;break;case "details":G("toggle",a);e=d;break;case "input":Za(a,d);e=Ya(a,d);G("invalid",a);break;case "option":e=eb(a,d);break;case "select":a._wrapperState={wasMultiple:!!d.multiple};e=m({},d,{value:void 0});G("invalid",a);break;case "textarea":hb(a,d);e=
gb(a,d);G("invalid",a);break;default:e=d}vb(c,e);var h=e;for(f in h)if(h.hasOwnProperty(f)){var k=h[f];"style"===f?tb(a,k):"dangerouslySetInnerHTML"===f?(k=k?k.__html:void 0,null!=k&&ob(a,k)):"children"===f?"string"===typeof k?("textarea"!==c||""!==k)&&pb(a,k):"number"===typeof k&&pb(a,""+k):"suppressContentEditableWarning"!==f&&"suppressHydrationWarning"!==f&&"autoFocus"!==f&&(ca.hasOwnProperty(f)?null!=k&&"onScroll"===f&&G("scroll",a):null!=k&&qa(a,f,k,g))}switch(c){case "input":Va(a);cb(a,d,!1);
break;case "textarea":Va(a);jb(a);break;case "option":null!=d.value&&a.setAttribute("value",""+Sa(d.value));break;case "select":a.multiple=!!d.multiple;f=d.value;null!=f?fb(a,!!d.multiple,f,!1):null!=d.defaultValue&&fb(a,!!d.multiple,d.defaultValue,!0);break;default:"function"===typeof e.onClick&&(a.onclick=jf)}mf(c,d)&&(b.flags|=4)}null!==b.ref&&(b.flags|=128)}return null;case 6:if(a&&null!=b.stateNode)Ei(a,b,a.memoizedProps,d);else{if("string"!==typeof d&&null===b.stateNode)throw Error(y(166));
c=dh(ch.current);dh(ah.current);rh(b)?(d=b.stateNode,c=b.memoizedProps,d[wf]=b,d.nodeValue!==c&&(b.flags|=4)):(d=(9===c.nodeType?c:c.ownerDocument).createTextNode(d),d[wf]=b,b.stateNode=d)}return null;case 13:H(P);d=b.memoizedState;if(0!==(b.flags&64))return b.lanes=c,b;d=null!==d;c=!1;null===a?void 0!==b.memoizedProps.fallback&&rh(b):c=null!==a.memoizedState;if(d&&!c&&0!==(b.mode&2))if(null===a&&!0!==b.memoizedProps.unstable_avoidThisFallback||0!==(P.current&1))0===V&&(V=3);else{if(0===V||3===V)V=
4;null===U||0===(Dg&134217727)&&0===(Hi&134217727)||Ii(U,W)}if(d||c)b.flags|=4;return null;case 4:return fh(),Ci(b),null===a&&cf(b.stateNode.containerInfo),null;case 10:return rg(b),null;case 17:return Ff(b.type)&&Gf(),null;case 19:H(P);d=b.memoizedState;if(null===d)return null;f=0!==(b.flags&64);g=d.rendering;if(null===g)if(f)Fi(d,!1);else{if(0!==V||null!==a&&0!==(a.flags&64))for(a=b.child;null!==a;){g=ih(a);if(null!==g){b.flags|=64;Fi(d,!1);f=g.updateQueue;null!==f&&(b.updateQueue=f,b.flags|=4);
null===d.lastEffect&&(b.firstEffect=null);b.lastEffect=d.lastEffect;d=c;for(c=b.child;null!==c;)f=c,a=d,f.flags&=2,f.nextEffect=null,f.firstEffect=null,f.lastEffect=null,g=f.alternate,null===g?(f.childLanes=0,f.lanes=a,f.child=null,f.memoizedProps=null,f.memoizedState=null,f.updateQueue=null,f.dependencies=null,f.stateNode=null):(f.childLanes=g.childLanes,f.lanes=g.lanes,f.child=g.child,f.memoizedProps=g.memoizedProps,f.memoizedState=g.memoizedState,f.updateQueue=g.updateQueue,f.type=g.type,a=g.dependencies,
f.dependencies=null===a?null:{lanes:a.lanes,firstContext:a.firstContext}),c=c.sibling;I(P,P.current&1|2);return b.child}a=a.sibling}null!==d.tail&&O()>Ji&&(b.flags|=64,f=!0,Fi(d,!1),b.lanes=33554432)}else{if(!f)if(a=ih(g),null!==a){if(b.flags|=64,f=!0,c=a.updateQueue,null!==c&&(b.updateQueue=c,b.flags|=4),Fi(d,!0),null===d.tail&&"hidden"===d.tailMode&&!g.alternate&&!lh)return b=b.lastEffect=d.lastEffect,null!==b&&(b.nextEffect=null),null}else 2*O()-d.renderingStartTime>Ji&&1073741824!==c&&(b.flags|=
64,f=!0,Fi(d,!1),b.lanes=33554432);d.isBackwards?(g.sibling=b.child,b.child=g):(c=d.last,null!==c?c.sibling=g:b.child=g,d.last=g)}return null!==d.tail?(c=d.tail,d.rendering=c,d.tail=c.sibling,d.lastEffect=b.lastEffect,d.renderingStartTime=O(),c.sibling=null,b=P.current,I(P,f?b&1|2:b&1),c):null;case 23:case 24:return Ki(),null!==a&&null!==a.memoizedState!==(null!==b.memoizedState)&&"unstable-defer-without-hiding"!==d.mode&&(b.flags|=4),null}throw Error(y(156,b.tag));}
function Li(a){switch(a.tag){case 1:Ff(a.type)&&Gf();var b=a.flags;return b&4096?(a.flags=b&-4097|64,a):null;case 3:fh();H(N);H(M);uh();b=a.flags;if(0!==(b&64))throw Error(y(285));a.flags=b&-4097|64;return a;case 5:return hh(a),null;case 13:return H(P),b=a.flags,b&4096?(a.flags=b&-4097|64,a):null;case 19:return H(P),null;case 4:return fh(),null;case 10:return rg(a),null;case 23:case 24:return Ki(),null;default:return null}}
function Mi(a,b){try{var c="",d=b;do c+=Qa(d),d=d.return;while(d);var e=c}catch(f){e="\nError generating stack: "+f.message+"\n"+f.stack}return{value:a,source:b,stack:e}}function Ni(a,b){try{console.error(b.value)}catch(c){setTimeout(function(){throw c;})}}var Oi="function"===typeof WeakMap?WeakMap:Map;function Pi(a,b,c){c=zg(-1,c);c.tag=3;c.payload={element:null};var d=b.value;c.callback=function(){Qi||(Qi=!0,Ri=d);Ni(a,b)};return c}
function Si(a,b,c){c=zg(-1,c);c.tag=3;var d=a.type.getDerivedStateFromError;if("function"===typeof d){var e=b.value;c.payload=function(){Ni(a,b);return d(e)}}var f=a.stateNode;null!==f&&"function"===typeof f.componentDidCatch&&(c.callback=function(){"function"!==typeof d&&(null===Ti?Ti=new Set([this]):Ti.add(this),Ni(a,b));var c=b.stack;this.componentDidCatch(b.value,{componentStack:null!==c?c:""})});return c}var Ui="function"===typeof WeakSet?WeakSet:Set;
function Vi(a){var b=a.ref;if(null!==b)if("function"===typeof b)try{b(null)}catch(c){Wi(a,c)}else b.current=null}function Xi(a,b){switch(b.tag){case 0:case 11:case 15:case 22:return;case 1:if(b.flags&256&&null!==a){var c=a.memoizedProps,d=a.memoizedState;a=b.stateNode;b=a.getSnapshotBeforeUpdate(b.elementType===b.type?c:lg(b.type,c),d);a.__reactInternalSnapshotBeforeUpdate=b}return;case 3:b.flags&256&&qf(b.stateNode.containerInfo);return;case 5:case 6:case 4:case 17:return}throw Error(y(163));}
function Yi(a,b,c){switch(c.tag){case 0:case 11:case 15:case 22:b=c.updateQueue;b=null!==b?b.lastEffect:null;if(null!==b){a=b=b.next;do{if(3===(a.tag&3)){var d=a.create;a.destroy=d()}a=a.next}while(a!==b)}b=c.updateQueue;b=null!==b?b.lastEffect:null;if(null!==b){a=b=b.next;do{var e=a;d=e.next;e=e.tag;0!==(e&4)&&0!==(e&1)&&(Zi(c,a),$i(c,a));a=d}while(a!==b)}return;case 1:a=c.stateNode;c.flags&4&&(null===b?a.componentDidMount():(d=c.elementType===c.type?b.memoizedProps:lg(c.type,b.memoizedProps),a.componentDidUpdate(d,
b.memoizedState,a.__reactInternalSnapshotBeforeUpdate)));b=c.updateQueue;null!==b&&Eg(c,b,a);return;case 3:b=c.updateQueue;if(null!==b){a=null;if(null!==c.child)switch(c.child.tag){case 5:a=c.child.stateNode;break;case 1:a=c.child.stateNode}Eg(c,b,a)}return;case 5:a=c.stateNode;null===b&&c.flags&4&&mf(c.type,c.memoizedProps)&&a.focus();return;case 6:return;case 4:return;case 12:return;case 13:null===c.memoizedState&&(c=c.alternate,null!==c&&(c=c.memoizedState,null!==c&&(c=c.dehydrated,null!==c&&Cc(c))));
return;case 19:case 17:case 20:case 21:case 23:case 24:return}throw Error(y(163));}
function aj(a,b){for(var c=a;;){if(5===c.tag){var d=c.stateNode;if(b)d=d.style,"function"===typeof d.setProperty?d.setProperty("display","none","important"):d.display="none";else{d=c.stateNode;var e=c.memoizedProps.style;e=void 0!==e&&null!==e&&e.hasOwnProperty("display")?e.display:null;d.style.display=sb("display",e)}}else if(6===c.tag)c.stateNode.nodeValue=b?"":c.memoizedProps;else if((23!==c.tag&&24!==c.tag||null===c.memoizedState||c===a)&&null!==c.child){c.child.return=c;c=c.child;continue}if(c===
a)break;for(;null===c.sibling;){if(null===c.return||c.return===a)return;c=c.return}c.sibling.return=c.return;c=c.sibling}}
function bj(a,b){if(Mf&&"function"===typeof Mf.onCommitFiberUnmount)try{Mf.onCommitFiberUnmount(Lf,b)}catch(f){}switch(b.tag){case 0:case 11:case 14:case 15:case 22:a=b.updateQueue;if(null!==a&&(a=a.lastEffect,null!==a)){var c=a=a.next;do{var d=c,e=d.destroy;d=d.tag;if(void 0!==e)if(0!==(d&4))Zi(b,c);else{d=b;try{e()}catch(f){Wi(d,f)}}c=c.next}while(c!==a)}break;case 1:Vi(b);a=b.stateNode;if("function"===typeof a.componentWillUnmount)try{a.props=b.memoizedProps,a.state=b.memoizedState,a.componentWillUnmount()}catch(f){Wi(b,
f)}break;case 5:Vi(b);break;case 4:cj(a,b)}}function dj(a){a.alternate=null;a.child=null;a.dependencies=null;a.firstEffect=null;a.lastEffect=null;a.memoizedProps=null;a.memoizedState=null;a.pendingProps=null;a.return=null;a.updateQueue=null}function ej(a){return 5===a.tag||3===a.tag||4===a.tag}
function fj(a){a:{for(var b=a.return;null!==b;){if(ej(b))break a;b=b.return}throw Error(y(160));}var c=b;b=c.stateNode;switch(c.tag){case 5:var d=!1;break;case 3:b=b.containerInfo;d=!0;break;case 4:b=b.containerInfo;d=!0;break;default:throw Error(y(161));}c.flags&16&&(pb(b,""),c.flags&=-17);a:b:for(c=a;;){for(;null===c.sibling;){if(null===c.return||ej(c.return)){c=null;break a}c=c.return}c.sibling.return=c.return;for(c=c.sibling;5!==c.tag&&6!==c.tag&&18!==c.tag;){if(c.flags&2)continue b;if(null===
c.child||4===c.tag)continue b;else c.child.return=c,c=c.child}if(!(c.flags&2)){c=c.stateNode;break a}}d?gj(a,c,b):hj(a,c,b)}
function gj(a,b,c){var d=a.tag,e=5===d||6===d;if(e)a=e?a.stateNode:a.stateNode.instance,b?8===c.nodeType?c.parentNode.insertBefore(a,b):c.insertBefore(a,b):(8===c.nodeType?(b=c.parentNode,b.insertBefore(a,c)):(b=c,b.appendChild(a)),c=c._reactRootContainer,null!==c&&void 0!==c||null!==b.onclick||(b.onclick=jf));else if(4!==d&&(a=a.child,null!==a))for(gj(a,b,c),a=a.sibling;null!==a;)gj(a,b,c),a=a.sibling}
function hj(a,b,c){var d=a.tag,e=5===d||6===d;if(e)a=e?a.stateNode:a.stateNode.instance,b?c.insertBefore(a,b):c.appendChild(a);else if(4!==d&&(a=a.child,null!==a))for(hj(a,b,c),a=a.sibling;null!==a;)hj(a,b,c),a=a.sibling}
function cj(a,b){for(var c=b,d=!1,e,f;;){if(!d){d=c.return;a:for(;;){if(null===d)throw Error(y(160));e=d.stateNode;switch(d.tag){case 5:f=!1;break a;case 3:e=e.containerInfo;f=!0;break a;case 4:e=e.containerInfo;f=!0;break a}d=d.return}d=!0}if(5===c.tag||6===c.tag){a:for(var g=a,h=c,k=h;;)if(bj(g,k),null!==k.child&&4!==k.tag)k.child.return=k,k=k.child;else{if(k===h)break a;for(;null===k.sibling;){if(null===k.return||k.return===h)break a;k=k.return}k.sibling.return=k.return;k=k.sibling}f?(g=e,h=c.stateNode,
8===g.nodeType?g.parentNode.removeChild(h):g.removeChild(h)):e.removeChild(c.stateNode)}else if(4===c.tag){if(null!==c.child){e=c.stateNode.containerInfo;f=!0;c.child.return=c;c=c.child;continue}}else if(bj(a,c),null!==c.child){c.child.return=c;c=c.child;continue}if(c===b)break;for(;null===c.sibling;){if(null===c.return||c.return===b)return;c=c.return;4===c.tag&&(d=!1)}c.sibling.return=c.return;c=c.sibling}}
function ij(a,b){switch(b.tag){case 0:case 11:case 14:case 15:case 22:var c=b.updateQueue;c=null!==c?c.lastEffect:null;if(null!==c){var d=c=c.next;do 3===(d.tag&3)&&(a=d.destroy,d.destroy=void 0,void 0!==a&&a()),d=d.next;while(d!==c)}return;case 1:return;case 5:c=b.stateNode;if(null!=c){d=b.memoizedProps;var e=null!==a?a.memoizedProps:d;a=b.type;var f=b.updateQueue;b.updateQueue=null;if(null!==f){c[xf]=d;"input"===a&&"radio"===d.type&&null!=d.name&&$a(c,d);wb(a,e);b=wb(a,d);for(e=0;e<f.length;e+=
2){var g=f[e],h=f[e+1];"style"===g?tb(c,h):"dangerouslySetInnerHTML"===g?ob(c,h):"children"===g?pb(c,h):qa(c,g,h,b)}switch(a){case "input":ab(c,d);break;case "textarea":ib(c,d);break;case "select":a=c._wrapperState.wasMultiple,c._wrapperState.wasMultiple=!!d.multiple,f=d.value,null!=f?fb(c,!!d.multiple,f,!1):a!==!!d.multiple&&(null!=d.defaultValue?fb(c,!!d.multiple,d.defaultValue,!0):fb(c,!!d.multiple,d.multiple?[]:"",!1))}}}return;case 6:if(null===b.stateNode)throw Error(y(162));b.stateNode.nodeValue=
b.memoizedProps;return;case 3:c=b.stateNode;c.hydrate&&(c.hydrate=!1,Cc(c.containerInfo));return;case 12:return;case 13:null!==b.memoizedState&&(jj=O(),aj(b.child,!0));kj(b);return;case 19:kj(b);return;case 17:return;case 23:case 24:aj(b,null!==b.memoizedState);return}throw Error(y(163));}function kj(a){var b=a.updateQueue;if(null!==b){a.updateQueue=null;var c=a.stateNode;null===c&&(c=a.stateNode=new Ui);b.forEach(function(b){var d=lj.bind(null,a,b);c.has(b)||(c.add(b),b.then(d,d))})}}
function mj(a,b){return null!==a&&(a=a.memoizedState,null===a||null!==a.dehydrated)?(b=b.memoizedState,null!==b&&null===b.dehydrated):!1}var nj=Math.ceil,oj=ra.ReactCurrentDispatcher,pj=ra.ReactCurrentOwner,X=0,U=null,Y=null,W=0,qj=0,rj=Bf(0),V=0,sj=null,tj=0,Dg=0,Hi=0,uj=0,vj=null,jj=0,Ji=Infinity;function wj(){Ji=O()+500}var Z=null,Qi=!1,Ri=null,Ti=null,xj=!1,yj=null,zj=90,Aj=[],Bj=[],Cj=null,Dj=0,Ej=null,Fj=-1,Gj=0,Hj=0,Ij=null,Jj=!1;function Hg(){return 0!==(X&48)?O():-1!==Fj?Fj:Fj=O()}
function Ig(a){a=a.mode;if(0===(a&2))return 1;if(0===(a&4))return 99===eg()?1:2;0===Gj&&(Gj=tj);if(0!==kg.transition){0!==Hj&&(Hj=null!==vj?vj.pendingLanes:0);a=Gj;var b=4186112&~Hj;b&=-b;0===b&&(a=4186112&~a,b=a&-a,0===b&&(b=8192));return b}a=eg();0!==(X&4)&&98===a?a=Xc(12,Gj):(a=Sc(a),a=Xc(a,Gj));return a}
function Jg(a,b,c){if(50<Dj)throw Dj=0,Ej=null,Error(y(185));a=Kj(a,b);if(null===a)return null;$c(a,b,c);a===U&&(Hi|=b,4===V&&Ii(a,W));var d=eg();1===b?0!==(X&8)&&0===(X&48)?Lj(a):(Mj(a,c),0===X&&(wj(),ig())):(0===(X&4)||98!==d&&99!==d||(null===Cj?Cj=new Set([a]):Cj.add(a)),Mj(a,c));vj=a}function Kj(a,b){a.lanes|=b;var c=a.alternate;null!==c&&(c.lanes|=b);c=a;for(a=a.return;null!==a;)a.childLanes|=b,c=a.alternate,null!==c&&(c.childLanes|=b),c=a,a=a.return;return 3===c.tag?c.stateNode:null}
function Mj(a,b){for(var c=a.callbackNode,d=a.suspendedLanes,e=a.pingedLanes,f=a.expirationTimes,g=a.pendingLanes;0<g;){var h=31-Vc(g),k=1<<h,l=f[h];if(-1===l){if(0===(k&d)||0!==(k&e)){l=b;Rc(k);var n=F;f[h]=10<=n?l+250:6<=n?l+5E3:-1}}else l<=b&&(a.expiredLanes|=k);g&=~k}d=Uc(a,a===U?W:0);b=F;if(0===d)null!==c&&(c!==Zf&&Pf(c),a.callbackNode=null,a.callbackPriority=0);else{if(null!==c){if(a.callbackPriority===b)return;c!==Zf&&Pf(c)}15===b?(c=Lj.bind(null,a),null===ag?(ag=[c],bg=Of(Uf,jg)):ag.push(c),
c=Zf):14===b?c=hg(99,Lj.bind(null,a)):(c=Tc(b),c=hg(c,Nj.bind(null,a)));a.callbackPriority=b;a.callbackNode=c}}
function Nj(a){Fj=-1;Hj=Gj=0;if(0!==(X&48))throw Error(y(327));var b=a.callbackNode;if(Oj()&&a.callbackNode!==b)return null;var c=Uc(a,a===U?W:0);if(0===c)return null;var d=c;var e=X;X|=16;var f=Pj();if(U!==a||W!==d)wj(),Qj(a,d);do try{Rj();break}catch(h){Sj(a,h)}while(1);qg();oj.current=f;X=e;null!==Y?d=0:(U=null,W=0,d=V);if(0!==(tj&Hi))Qj(a,0);else if(0!==d){2===d&&(X|=64,a.hydrate&&(a.hydrate=!1,qf(a.containerInfo)),c=Wc(a),0!==c&&(d=Tj(a,c)));if(1===d)throw b=sj,Qj(a,0),Ii(a,c),Mj(a,O()),b;a.finishedWork=
a.current.alternate;a.finishedLanes=c;switch(d){case 0:case 1:throw Error(y(345));case 2:Uj(a);break;case 3:Ii(a,c);if((c&62914560)===c&&(d=jj+500-O(),10<d)){if(0!==Uc(a,0))break;e=a.suspendedLanes;if((e&c)!==c){Hg();a.pingedLanes|=a.suspendedLanes&e;break}a.timeoutHandle=of(Uj.bind(null,a),d);break}Uj(a);break;case 4:Ii(a,c);if((c&4186112)===c)break;d=a.eventTimes;for(e=-1;0<c;){var g=31-Vc(c);f=1<<g;g=d[g];g>e&&(e=g);c&=~f}c=e;c=O()-c;c=(120>c?120:480>c?480:1080>c?1080:1920>c?1920:3E3>c?3E3:4320>
c?4320:1960*nj(c/1960))-c;if(10<c){a.timeoutHandle=of(Uj.bind(null,a),c);break}Uj(a);break;case 5:Uj(a);break;default:throw Error(y(329));}}Mj(a,O());return a.callbackNode===b?Nj.bind(null,a):null}function Ii(a,b){b&=~uj;b&=~Hi;a.suspendedLanes|=b;a.pingedLanes&=~b;for(a=a.expirationTimes;0<b;){var c=31-Vc(b),d=1<<c;a[c]=-1;b&=~d}}
function Lj(a){if(0!==(X&48))throw Error(y(327));Oj();if(a===U&&0!==(a.expiredLanes&W)){var b=W;var c=Tj(a,b);0!==(tj&Hi)&&(b=Uc(a,b),c=Tj(a,b))}else b=Uc(a,0),c=Tj(a,b);0!==a.tag&&2===c&&(X|=64,a.hydrate&&(a.hydrate=!1,qf(a.containerInfo)),b=Wc(a),0!==b&&(c=Tj(a,b)));if(1===c)throw c=sj,Qj(a,0),Ii(a,b),Mj(a,O()),c;a.finishedWork=a.current.alternate;a.finishedLanes=b;Uj(a);Mj(a,O());return null}
function Vj(){if(null!==Cj){var a=Cj;Cj=null;a.forEach(function(a){a.expiredLanes|=24&a.pendingLanes;Mj(a,O())})}ig()}function Wj(a,b){var c=X;X|=1;try{return a(b)}finally{X=c,0===X&&(wj(),ig())}}function Xj(a,b){var c=X;X&=-2;X|=8;try{return a(b)}finally{X=c,0===X&&(wj(),ig())}}function ni(a,b){I(rj,qj);qj|=b;tj|=b}function Ki(){qj=rj.current;H(rj)}
function Qj(a,b){a.finishedWork=null;a.finishedLanes=0;var c=a.timeoutHandle;-1!==c&&(a.timeoutHandle=-1,pf(c));if(null!==Y)for(c=Y.return;null!==c;){var d=c;switch(d.tag){case 1:d=d.type.childContextTypes;null!==d&&void 0!==d&&Gf();break;case 3:fh();H(N);H(M);uh();break;case 5:hh(d);break;case 4:fh();break;case 13:H(P);break;case 19:H(P);break;case 10:rg(d);break;case 23:case 24:Ki()}c=c.return}U=a;Y=Tg(a.current,null);W=qj=tj=b;V=0;sj=null;uj=Hi=Dg=0}
function Sj(a,b){do{var c=Y;try{qg();vh.current=Gh;if(yh){for(var d=R.memoizedState;null!==d;){var e=d.queue;null!==e&&(e.pending=null);d=d.next}yh=!1}xh=0;T=S=R=null;zh=!1;pj.current=null;if(null===c||null===c.return){V=1;sj=b;Y=null;break}a:{var f=a,g=c.return,h=c,k=b;b=W;h.flags|=2048;h.firstEffect=h.lastEffect=null;if(null!==k&&"object"===typeof k&&"function"===typeof k.then){var l=k;if(0===(h.mode&2)){var n=h.alternate;n?(h.updateQueue=n.updateQueue,h.memoizedState=n.memoizedState,h.lanes=n.lanes):
(h.updateQueue=null,h.memoizedState=null)}var A=0!==(P.current&1),p=g;do{var C;if(C=13===p.tag){var x=p.memoizedState;if(null!==x)C=null!==x.dehydrated?!0:!1;else{var w=p.memoizedProps;C=void 0===w.fallback?!1:!0!==w.unstable_avoidThisFallback?!0:A?!1:!0}}if(C){var z=p.updateQueue;if(null===z){var u=new Set;u.add(l);p.updateQueue=u}else z.add(l);if(0===(p.mode&2)){p.flags|=64;h.flags|=16384;h.flags&=-2981;if(1===h.tag)if(null===h.alternate)h.tag=17;else{var t=zg(-1,1);t.tag=2;Ag(h,t)}h.lanes|=1;break a}k=
void 0;h=b;var q=f.pingCache;null===q?(q=f.pingCache=new Oi,k=new Set,q.set(l,k)):(k=q.get(l),void 0===k&&(k=new Set,q.set(l,k)));if(!k.has(h)){k.add(h);var v=Yj.bind(null,f,l,h);l.then(v,v)}p.flags|=4096;p.lanes=b;break a}p=p.return}while(null!==p);k=Error((Ra(h.type)||"A React component")+" suspended while rendering, but no fallback UI was specified.\n\nAdd a <Suspense fallback=...> component higher in the tree to provide a loading indicator or placeholder to display.")}5!==V&&(V=2);k=Mi(k,h);p=
g;do{switch(p.tag){case 3:f=k;p.flags|=4096;b&=-b;p.lanes|=b;var J=Pi(p,f,b);Bg(p,J);break a;case 1:f=k;var K=p.type,Q=p.stateNode;if(0===(p.flags&64)&&("function"===typeof K.getDerivedStateFromError||null!==Q&&"function"===typeof Q.componentDidCatch&&(null===Ti||!Ti.has(Q)))){p.flags|=4096;b&=-b;p.lanes|=b;var L=Si(p,f,b);Bg(p,L);break a}}p=p.return}while(null!==p)}Zj(c)}catch(va){b=va;Y===c&&null!==c&&(Y=c=c.return);continue}break}while(1)}
function Pj(){var a=oj.current;oj.current=Gh;return null===a?Gh:a}function Tj(a,b){var c=X;X|=16;var d=Pj();U===a&&W===b||Qj(a,b);do try{ak();break}catch(e){Sj(a,e)}while(1);qg();X=c;oj.current=d;if(null!==Y)throw Error(y(261));U=null;W=0;return V}function ak(){for(;null!==Y;)bk(Y)}function Rj(){for(;null!==Y&&!Qf();)bk(Y)}function bk(a){var b=ck(a.alternate,a,qj);a.memoizedProps=a.pendingProps;null===b?Zj(a):Y=b;pj.current=null}
function Zj(a){var b=a;do{var c=b.alternate;a=b.return;if(0===(b.flags&2048)){c=Gi(c,b,qj);if(null!==c){Y=c;return}c=b;if(24!==c.tag&&23!==c.tag||null===c.memoizedState||0!==(qj&1073741824)||0===(c.mode&4)){for(var d=0,e=c.child;null!==e;)d|=e.lanes|e.childLanes,e=e.sibling;c.childLanes=d}null!==a&&0===(a.flags&2048)&&(null===a.firstEffect&&(a.firstEffect=b.firstEffect),null!==b.lastEffect&&(null!==a.lastEffect&&(a.lastEffect.nextEffect=b.firstEffect),a.lastEffect=b.lastEffect),1<b.flags&&(null!==
a.lastEffect?a.lastEffect.nextEffect=b:a.firstEffect=b,a.lastEffect=b))}else{c=Li(b);if(null!==c){c.flags&=2047;Y=c;return}null!==a&&(a.firstEffect=a.lastEffect=null,a.flags|=2048)}b=b.sibling;if(null!==b){Y=b;return}Y=b=a}while(null!==b);0===V&&(V=5)}function Uj(a){var b=eg();gg(99,dk.bind(null,a,b));return null}
function dk(a,b){do Oj();while(null!==yj);if(0!==(X&48))throw Error(y(327));var c=a.finishedWork;if(null===c)return null;a.finishedWork=null;a.finishedLanes=0;if(c===a.current)throw Error(y(177));a.callbackNode=null;var d=c.lanes|c.childLanes,e=d,f=a.pendingLanes&~e;a.pendingLanes=e;a.suspendedLanes=0;a.pingedLanes=0;a.expiredLanes&=e;a.mutableReadLanes&=e;a.entangledLanes&=e;e=a.entanglements;for(var g=a.eventTimes,h=a.expirationTimes;0<f;){var k=31-Vc(f),l=1<<k;e[k]=0;g[k]=-1;h[k]=-1;f&=~l}null!==
Cj&&0===(d&24)&&Cj.has(a)&&Cj.delete(a);a===U&&(Y=U=null,W=0);1<c.flags?null!==c.lastEffect?(c.lastEffect.nextEffect=c,d=c.firstEffect):d=c:d=c.firstEffect;if(null!==d){e=X;X|=32;pj.current=null;kf=fd;g=Ne();if(Oe(g)){if("selectionStart"in g)h={start:g.selectionStart,end:g.selectionEnd};else a:if(h=(h=g.ownerDocument)&&h.defaultView||window,(l=h.getSelection&&h.getSelection())&&0!==l.rangeCount){h=l.anchorNode;f=l.anchorOffset;k=l.focusNode;l=l.focusOffset;try{h.nodeType,k.nodeType}catch(va){h=null;
break a}var n=0,A=-1,p=-1,C=0,x=0,w=g,z=null;b:for(;;){for(var u;;){w!==h||0!==f&&3!==w.nodeType||(A=n+f);w!==k||0!==l&&3!==w.nodeType||(p=n+l);3===w.nodeType&&(n+=w.nodeValue.length);if(null===(u=w.firstChild))break;z=w;w=u}for(;;){if(w===g)break b;z===h&&++C===f&&(A=n);z===k&&++x===l&&(p=n);if(null!==(u=w.nextSibling))break;w=z;z=w.parentNode}w=u}h=-1===A||-1===p?null:{start:A,end:p}}else h=null;h=h||{start:0,end:0}}else h=null;lf={focusedElem:g,selectionRange:h};fd=!1;Ij=null;Jj=!1;Z=d;do try{ek()}catch(va){if(null===
Z)throw Error(y(330));Wi(Z,va);Z=Z.nextEffect}while(null!==Z);Ij=null;Z=d;do try{for(g=a;null!==Z;){var t=Z.flags;t&16&&pb(Z.stateNode,"");if(t&128){var q=Z.alternate;if(null!==q){var v=q.ref;null!==v&&("function"===typeof v?v(null):v.current=null)}}switch(t&1038){case 2:fj(Z);Z.flags&=-3;break;case 6:fj(Z);Z.flags&=-3;ij(Z.alternate,Z);break;case 1024:Z.flags&=-1025;break;case 1028:Z.flags&=-1025;ij(Z.alternate,Z);break;case 4:ij(Z.alternate,Z);break;case 8:h=Z;cj(g,h);var J=h.alternate;dj(h);null!==
J&&dj(J)}Z=Z.nextEffect}}catch(va){if(null===Z)throw Error(y(330));Wi(Z,va);Z=Z.nextEffect}while(null!==Z);v=lf;q=Ne();t=v.focusedElem;g=v.selectionRange;if(q!==t&&t&&t.ownerDocument&&Me(t.ownerDocument.documentElement,t)){null!==g&&Oe(t)&&(q=g.start,v=g.end,void 0===v&&(v=q),"selectionStart"in t?(t.selectionStart=q,t.selectionEnd=Math.min(v,t.value.length)):(v=(q=t.ownerDocument||document)&&q.defaultView||window,v.getSelection&&(v=v.getSelection(),h=t.textContent.length,J=Math.min(g.start,h),g=void 0===
g.end?J:Math.min(g.end,h),!v.extend&&J>g&&(h=g,g=J,J=h),h=Le(t,J),f=Le(t,g),h&&f&&(1!==v.rangeCount||v.anchorNode!==h.node||v.anchorOffset!==h.offset||v.focusNode!==f.node||v.focusOffset!==f.offset)&&(q=q.createRange(),q.setStart(h.node,h.offset),v.removeAllRanges(),J>g?(v.addRange(q),v.extend(f.node,f.offset)):(q.setEnd(f.node,f.offset),v.addRange(q))))));q=[];for(v=t;v=v.parentNode;)1===v.nodeType&&q.push({element:v,left:v.scrollLeft,top:v.scrollTop});"function"===typeof t.focus&&t.focus();for(t=
0;t<q.length;t++)v=q[t],v.element.scrollLeft=v.left,v.element.scrollTop=v.top}fd=!!kf;lf=kf=null;a.current=c;Z=d;do try{for(t=a;null!==Z;){var K=Z.flags;K&36&&Yi(t,Z.alternate,Z);if(K&128){q=void 0;var Q=Z.ref;if(null!==Q){var L=Z.stateNode;switch(Z.tag){case 5:q=L;break;default:q=L}"function"===typeof Q?Q(q):Q.current=q}}Z=Z.nextEffect}}catch(va){if(null===Z)throw Error(y(330));Wi(Z,va);Z=Z.nextEffect}while(null!==Z);Z=null;$f();X=e}else a.current=c;if(xj)xj=!1,yj=a,zj=b;else for(Z=d;null!==Z;)b=
Z.nextEffect,Z.nextEffect=null,Z.flags&8&&(K=Z,K.sibling=null,K.stateNode=null),Z=b;d=a.pendingLanes;0===d&&(Ti=null);1===d?a===Ej?Dj++:(Dj=0,Ej=a):Dj=0;c=c.stateNode;if(Mf&&"function"===typeof Mf.onCommitFiberRoot)try{Mf.onCommitFiberRoot(Lf,c,void 0,64===(c.current.flags&64))}catch(va){}Mj(a,O());if(Qi)throw Qi=!1,a=Ri,Ri=null,a;if(0!==(X&8))return null;ig();return null}
function ek(){for(;null!==Z;){var a=Z.alternate;Jj||null===Ij||(0!==(Z.flags&8)?dc(Z,Ij)&&(Jj=!0):13===Z.tag&&mj(a,Z)&&dc(Z,Ij)&&(Jj=!0));var b=Z.flags;0!==(b&256)&&Xi(a,Z);0===(b&512)||xj||(xj=!0,hg(97,function(){Oj();return null}));Z=Z.nextEffect}}function Oj(){if(90!==zj){var a=97<zj?97:zj;zj=90;return gg(a,fk)}return!1}function $i(a,b){Aj.push(b,a);xj||(xj=!0,hg(97,function(){Oj();return null}))}function Zi(a,b){Bj.push(b,a);xj||(xj=!0,hg(97,function(){Oj();return null}))}
function fk(){if(null===yj)return!1;var a=yj;yj=null;if(0!==(X&48))throw Error(y(331));var b=X;X|=32;var c=Bj;Bj=[];for(var d=0;d<c.length;d+=2){var e=c[d],f=c[d+1],g=e.destroy;e.destroy=void 0;if("function"===typeof g)try{g()}catch(k){if(null===f)throw Error(y(330));Wi(f,k)}}c=Aj;Aj=[];for(d=0;d<c.length;d+=2){e=c[d];f=c[d+1];try{var h=e.create;e.destroy=h()}catch(k){if(null===f)throw Error(y(330));Wi(f,k)}}for(h=a.current.firstEffect;null!==h;)a=h.nextEffect,h.nextEffect=null,h.flags&8&&(h.sibling=
null,h.stateNode=null),h=a;X=b;ig();return!0}function gk(a,b,c){b=Mi(c,b);b=Pi(a,b,1);Ag(a,b);b=Hg();a=Kj(a,1);null!==a&&($c(a,1,b),Mj(a,b))}
function Wi(a,b){if(3===a.tag)gk(a,a,b);else for(var c=a.return;null!==c;){if(3===c.tag){gk(c,a,b);break}else if(1===c.tag){var d=c.stateNode;if("function"===typeof c.type.getDerivedStateFromError||"function"===typeof d.componentDidCatch&&(null===Ti||!Ti.has(d))){a=Mi(b,a);var e=Si(c,a,1);Ag(c,e);e=Hg();c=Kj(c,1);if(null!==c)$c(c,1,e),Mj(c,e);else if("function"===typeof d.componentDidCatch&&(null===Ti||!Ti.has(d)))try{d.componentDidCatch(b,a)}catch(f){}break}}c=c.return}}
function Yj(a,b,c){var d=a.pingCache;null!==d&&d.delete(b);b=Hg();a.pingedLanes|=a.suspendedLanes&c;U===a&&(W&c)===c&&(4===V||3===V&&(W&62914560)===W&&500>O()-jj?Qj(a,0):uj|=c);Mj(a,b)}function lj(a,b){var c=a.stateNode;null!==c&&c.delete(b);b=0;0===b&&(b=a.mode,0===(b&2)?b=1:0===(b&4)?b=99===eg()?1:2:(0===Gj&&(Gj=tj),b=Yc(62914560&~Gj),0===b&&(b=4194304)));c=Hg();a=Kj(a,b);null!==a&&($c(a,b,c),Mj(a,c))}var ck;
ck=function(a,b,c){var d=b.lanes;if(null!==a)if(a.memoizedProps!==b.pendingProps||N.current)ug=!0;else if(0!==(c&d))ug=0!==(a.flags&16384)?!0:!1;else{ug=!1;switch(b.tag){case 3:ri(b);sh();break;case 5:gh(b);break;case 1:Ff(b.type)&&Jf(b);break;case 4:eh(b,b.stateNode.containerInfo);break;case 10:d=b.memoizedProps.value;var e=b.type._context;I(mg,e._currentValue);e._currentValue=d;break;case 13:if(null!==b.memoizedState){if(0!==(c&b.child.childLanes))return ti(a,b,c);I(P,P.current&1);b=hi(a,b,c);return null!==
b?b.sibling:null}I(P,P.current&1);break;case 19:d=0!==(c&b.childLanes);if(0!==(a.flags&64)){if(d)return Ai(a,b,c);b.flags|=64}e=b.memoizedState;null!==e&&(e.rendering=null,e.tail=null,e.lastEffect=null);I(P,P.current);if(d)break;else return null;case 23:case 24:return b.lanes=0,mi(a,b,c)}return hi(a,b,c)}else ug=!1;b.lanes=0;switch(b.tag){case 2:d=b.type;null!==a&&(a.alternate=null,b.alternate=null,b.flags|=2);a=b.pendingProps;e=Ef(b,M.current);tg(b,c);e=Ch(null,b,d,a,e,c);b.flags|=1;if("object"===
typeof e&&null!==e&&"function"===typeof e.render&&void 0===e.$$typeof){b.tag=1;b.memoizedState=null;b.updateQueue=null;if(Ff(d)){var f=!0;Jf(b)}else f=!1;b.memoizedState=null!==e.state&&void 0!==e.state?e.state:null;xg(b);var g=d.getDerivedStateFromProps;"function"===typeof g&&Gg(b,d,g,a);e.updater=Kg;b.stateNode=e;e._reactInternals=b;Og(b,d,a,c);b=qi(null,b,d,!0,f,c)}else b.tag=0,fi(null,b,e,c),b=b.child;return b;case 16:e=b.elementType;a:{null!==a&&(a.alternate=null,b.alternate=null,b.flags|=2);
a=b.pendingProps;f=e._init;e=f(e._payload);b.type=e;f=b.tag=hk(e);a=lg(e,a);switch(f){case 0:b=li(null,b,e,a,c);break a;case 1:b=pi(null,b,e,a,c);break a;case 11:b=gi(null,b,e,a,c);break a;case 14:b=ii(null,b,e,lg(e.type,a),d,c);break a}throw Error(y(306,e,""));}return b;case 0:return d=b.type,e=b.pendingProps,e=b.elementType===d?e:lg(d,e),li(a,b,d,e,c);case 1:return d=b.type,e=b.pendingProps,e=b.elementType===d?e:lg(d,e),pi(a,b,d,e,c);case 3:ri(b);d=b.updateQueue;if(null===a||null===d)throw Error(y(282));
d=b.pendingProps;e=b.memoizedState;e=null!==e?e.element:null;yg(a,b);Cg(b,d,null,c);d=b.memoizedState.element;if(d===e)sh(),b=hi(a,b,c);else{e=b.stateNode;if(f=e.hydrate)kh=rf(b.stateNode.containerInfo.firstChild),jh=b,f=lh=!0;if(f){a=e.mutableSourceEagerHydrationData;if(null!=a)for(e=0;e<a.length;e+=2)f=a[e],f._workInProgressVersionPrimary=a[e+1],th.push(f);c=Zg(b,null,d,c);for(b.child=c;c;)c.flags=c.flags&-3|1024,c=c.sibling}else fi(a,b,d,c),sh();b=b.child}return b;case 5:return gh(b),null===a&&
ph(b),d=b.type,e=b.pendingProps,f=null!==a?a.memoizedProps:null,g=e.children,nf(d,e)?g=null:null!==f&&nf(d,f)&&(b.flags|=16),oi(a,b),fi(a,b,g,c),b.child;case 6:return null===a&&ph(b),null;case 13:return ti(a,b,c);case 4:return eh(b,b.stateNode.containerInfo),d=b.pendingProps,null===a?b.child=Yg(b,null,d,c):fi(a,b,d,c),b.child;case 11:return d=b.type,e=b.pendingProps,e=b.elementType===d?e:lg(d,e),gi(a,b,d,e,c);case 7:return fi(a,b,b.pendingProps,c),b.child;case 8:return fi(a,b,b.pendingProps.children,
c),b.child;case 12:return fi(a,b,b.pendingProps.children,c),b.child;case 10:a:{d=b.type._context;e=b.pendingProps;g=b.memoizedProps;f=e.value;var h=b.type._context;I(mg,h._currentValue);h._currentValue=f;if(null!==g)if(h=g.value,f=He(h,f)?0:("function"===typeof d._calculateChangedBits?d._calculateChangedBits(h,f):1073741823)|0,0===f){if(g.children===e.children&&!N.current){b=hi(a,b,c);break a}}else for(h=b.child,null!==h&&(h.return=b);null!==h;){var k=h.dependencies;if(null!==k){g=h.child;for(var l=
k.firstContext;null!==l;){if(l.context===d&&0!==(l.observedBits&f)){1===h.tag&&(l=zg(-1,c&-c),l.tag=2,Ag(h,l));h.lanes|=c;l=h.alternate;null!==l&&(l.lanes|=c);sg(h.return,c);k.lanes|=c;break}l=l.next}}else g=10===h.tag?h.type===b.type?null:h.child:h.child;if(null!==g)g.return=h;else for(g=h;null!==g;){if(g===b){g=null;break}h=g.sibling;if(null!==h){h.return=g.return;g=h;break}g=g.return}h=g}fi(a,b,e.children,c);b=b.child}return b;case 9:return e=b.type,f=b.pendingProps,d=f.children,tg(b,c),e=vg(e,
f.unstable_observedBits),d=d(e),b.flags|=1,fi(a,b,d,c),b.child;case 14:return e=b.type,f=lg(e,b.pendingProps),f=lg(e.type,f),ii(a,b,e,f,d,c);case 15:return ki(a,b,b.type,b.pendingProps,d,c);case 17:return d=b.type,e=b.pendingProps,e=b.elementType===d?e:lg(d,e),null!==a&&(a.alternate=null,b.alternate=null,b.flags|=2),b.tag=1,Ff(d)?(a=!0,Jf(b)):a=!1,tg(b,c),Mg(b,d,e),Og(b,d,e,c),qi(null,b,d,!0,a,c);case 19:return Ai(a,b,c);case 23:return mi(a,b,c);case 24:return mi(a,b,c)}throw Error(y(156,b.tag));
};function ik(a,b,c,d){this.tag=a;this.key=c;this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null;this.index=0;this.ref=null;this.pendingProps=b;this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null;this.mode=d;this.flags=0;this.lastEffect=this.firstEffect=this.nextEffect=null;this.childLanes=this.lanes=0;this.alternate=null}function nh(a,b,c,d){return new ik(a,b,c,d)}function ji(a){a=a.prototype;return!(!a||!a.isReactComponent)}
function hk(a){if("function"===typeof a)return ji(a)?1:0;if(void 0!==a&&null!==a){a=a.$$typeof;if(a===Aa)return 11;if(a===Da)return 14}return 2}
function Tg(a,b){var c=a.alternate;null===c?(c=nh(a.tag,b,a.key,a.mode),c.elementType=a.elementType,c.type=a.type,c.stateNode=a.stateNode,c.alternate=a,a.alternate=c):(c.pendingProps=b,c.type=a.type,c.flags=0,c.nextEffect=null,c.firstEffect=null,c.lastEffect=null);c.childLanes=a.childLanes;c.lanes=a.lanes;c.child=a.child;c.memoizedProps=a.memoizedProps;c.memoizedState=a.memoizedState;c.updateQueue=a.updateQueue;b=a.dependencies;c.dependencies=null===b?null:{lanes:b.lanes,firstContext:b.firstContext};
c.sibling=a.sibling;c.index=a.index;c.ref=a.ref;return c}
function Vg(a,b,c,d,e,f){var g=2;d=a;if("function"===typeof a)ji(a)&&(g=1);else if("string"===typeof a)g=5;else a:switch(a){case ua:return Xg(c.children,e,f,b);case Ha:g=8;e|=16;break;case wa:g=8;e|=1;break;case xa:return a=nh(12,c,b,e|8),a.elementType=xa,a.type=xa,a.lanes=f,a;case Ba:return a=nh(13,c,b,e),a.type=Ba,a.elementType=Ba,a.lanes=f,a;case Ca:return a=nh(19,c,b,e),a.elementType=Ca,a.lanes=f,a;case Ia:return vi(c,e,f,b);case Ja:return a=nh(24,c,b,e),a.elementType=Ja,a.lanes=f,a;default:if("object"===
typeof a&&null!==a)switch(a.$$typeof){case ya:g=10;break a;case za:g=9;break a;case Aa:g=11;break a;case Da:g=14;break a;case Ea:g=16;d=null;break a;case Fa:g=22;break a}throw Error(y(130,null==a?a:typeof a,""));}b=nh(g,c,b,e);b.elementType=a;b.type=d;b.lanes=f;return b}function Xg(a,b,c,d){a=nh(7,a,d,b);a.lanes=c;return a}function vi(a,b,c,d){a=nh(23,a,d,b);a.elementType=Ia;a.lanes=c;return a}function Ug(a,b,c){a=nh(6,a,null,b);a.lanes=c;return a}
function Wg(a,b,c){b=nh(4,null!==a.children?a.children:[],a.key,b);b.lanes=c;b.stateNode={containerInfo:a.containerInfo,pendingChildren:null,implementation:a.implementation};return b}
function jk(a,b,c){this.tag=b;this.containerInfo=a;this.finishedWork=this.pingCache=this.current=this.pendingChildren=null;this.timeoutHandle=-1;this.pendingContext=this.context=null;this.hydrate=c;this.callbackNode=null;this.callbackPriority=0;this.eventTimes=Zc(0);this.expirationTimes=Zc(-1);this.entangledLanes=this.finishedLanes=this.mutableReadLanes=this.expiredLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0;this.entanglements=Zc(0);this.mutableSourceEagerHydrationData=null}
function kk(a,b,c){var d=3<arguments.length&&void 0!==arguments[3]?arguments[3]:null;return{$$typeof:ta,key:null==d?null:""+d,children:a,containerInfo:b,implementation:c}}
function lk(a,b,c,d){var e=b.current,f=Hg(),g=Ig(e);a:if(c){c=c._reactInternals;b:{if(Zb(c)!==c||1!==c.tag)throw Error(y(170));var h=c;do{switch(h.tag){case 3:h=h.stateNode.context;break b;case 1:if(Ff(h.type)){h=h.stateNode.__reactInternalMemoizedMergedChildContext;break b}}h=h.return}while(null!==h);throw Error(y(171));}if(1===c.tag){var k=c.type;if(Ff(k)){c=If(c,k,h);break a}}c=h}else c=Cf;null===b.context?b.context=c:b.pendingContext=c;b=zg(f,g);b.payload={element:a};d=void 0===d?null:d;null!==
d&&(b.callback=d);Ag(e,b);Jg(e,g,f);return g}function mk(a){a=a.current;if(!a.child)return null;switch(a.child.tag){case 5:return a.child.stateNode;default:return a.child.stateNode}}function nk(a,b){a=a.memoizedState;if(null!==a&&null!==a.dehydrated){var c=a.retryLane;a.retryLane=0!==c&&c<b?c:b}}function ok(a,b){nk(a,b);(a=a.alternate)&&nk(a,b)}function pk(){return null}
function qk(a,b,c){var d=null!=c&&null!=c.hydrationOptions&&c.hydrationOptions.mutableSources||null;c=new jk(a,b,null!=c&&!0===c.hydrate);b=nh(3,null,null,2===b?7:1===b?3:0);c.current=b;b.stateNode=c;xg(b);a[ff]=c.current;cf(8===a.nodeType?a.parentNode:a);if(d)for(a=0;a<d.length;a++){b=d[a];var e=b._getVersion;e=e(b._source);null==c.mutableSourceEagerHydrationData?c.mutableSourceEagerHydrationData=[b,e]:c.mutableSourceEagerHydrationData.push(b,e)}this._internalRoot=c}
qk.prototype.render=function(a){lk(a,this._internalRoot,null,null)};qk.prototype.unmount=function(){var a=this._internalRoot,b=a.containerInfo;lk(null,a,null,function(){b[ff]=null})};function rk(a){return!(!a||1!==a.nodeType&&9!==a.nodeType&&11!==a.nodeType&&(8!==a.nodeType||" react-mount-point-unstable "!==a.nodeValue))}
function sk(a,b){b||(b=a?9===a.nodeType?a.documentElement:a.firstChild:null,b=!(!b||1!==b.nodeType||!b.hasAttribute("data-reactroot")));if(!b)for(var c;c=a.lastChild;)a.removeChild(c);return new qk(a,0,b?{hydrate:!0}:void 0)}
function tk(a,b,c,d,e){var f=c._reactRootContainer;if(f){var g=f._internalRoot;if("function"===typeof e){var h=e;e=function(){var a=mk(g);h.call(a)}}lk(b,g,a,e)}else{f=c._reactRootContainer=sk(c,d);g=f._internalRoot;if("function"===typeof e){var k=e;e=function(){var a=mk(g);k.call(a)}}Xj(function(){lk(b,g,a,e)})}return mk(g)}ec=function(a){if(13===a.tag){var b=Hg();Jg(a,4,b);ok(a,4)}};fc=function(a){if(13===a.tag){var b=Hg();Jg(a,67108864,b);ok(a,67108864)}};
gc=function(a){if(13===a.tag){var b=Hg(),c=Ig(a);Jg(a,c,b);ok(a,c)}};hc=function(a,b){return b()};
yb=function(a,b,c){switch(b){case "input":ab(a,c);b=c.name;if("radio"===c.type&&null!=b){for(c=a;c.parentNode;)c=c.parentNode;c=c.querySelectorAll("input[name="+JSON.stringify(""+b)+'][type="radio"]');for(b=0;b<c.length;b++){var d=c[b];if(d!==a&&d.form===a.form){var e=Db(d);if(!e)throw Error(y(90));Wa(d);ab(d,e)}}}break;case "textarea":ib(a,c);break;case "select":b=c.value,null!=b&&fb(a,!!c.multiple,b,!1)}};Gb=Wj;
Hb=function(a,b,c,d,e){var f=X;X|=4;try{return gg(98,a.bind(null,b,c,d,e))}finally{X=f,0===X&&(wj(),ig())}};Ib=function(){0===(X&49)&&(Vj(),Oj())};Jb=function(a,b){var c=X;X|=2;try{return a(b)}finally{X=c,0===X&&(wj(),ig())}};function uk(a,b){var c=2<arguments.length&&void 0!==arguments[2]?arguments[2]:null;if(!rk(b))throw Error(y(200));return kk(a,b,null,c)}var vk={Events:[Cb,ue,Db,Eb,Fb,Oj,{current:!1}]},wk={findFiberByHostInstance:wc,bundleType:0,version:"17.0.1",rendererPackageName:"react-dom"};
var xk={bundleType:wk.bundleType,version:wk.version,rendererPackageName:wk.rendererPackageName,rendererConfig:wk.rendererConfig,overrideHookState:null,overrideHookStateDeletePath:null,overrideHookStateRenamePath:null,overrideProps:null,overridePropsDeletePath:null,overridePropsRenamePath:null,setSuspenseHandler:null,scheduleUpdate:null,currentDispatcherRef:ra.ReactCurrentDispatcher,findHostInstanceByFiber:function(a){a=cc(a);return null===a?null:a.stateNode},findFiberByHostInstance:wk.findFiberByHostInstance||
pk,findHostInstancesForRefresh:null,scheduleRefresh:null,scheduleRoot:null,setRefreshHandler:null,getCurrentFiber:null};if("undefined"!==typeof __REACT_DEVTOOLS_GLOBAL_HOOK__){var yk=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!yk.isDisabled&&yk.supportsFiber)try{Lf=yk.inject(xk),Mf=yk}catch(a){}}exports.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=vk;exports.createPortal=uk;
exports.findDOMNode=function(a){if(null==a)return null;if(1===a.nodeType)return a;var b=a._reactInternals;if(void 0===b){if("function"===typeof a.render)throw Error(y(188));throw Error(y(268,Object.keys(a)));}a=cc(b);a=null===a?null:a.stateNode;return a};exports.flushSync=function(a,b){var c=X;if(0!==(c&48))return a(b);X|=1;try{if(a)return gg(99,a.bind(null,b))}finally{X=c,ig()}};exports.hydrate=function(a,b,c){if(!rk(b))throw Error(y(200));return tk(null,a,b,!0,c)};
exports.render=function(a,b,c){if(!rk(b))throw Error(y(200));return tk(null,a,b,!1,c)};exports.unmountComponentAtNode=function(a){if(!rk(a))throw Error(y(40));return a._reactRootContainer?(Xj(function(){tk(null,null,a,!1,function(){a._reactRootContainer=null;a[ff]=null})}),!0):!1};exports.unstable_batchedUpdates=Wj;exports.unstable_createPortal=function(a,b){return uk(a,b,2<arguments.length&&void 0!==arguments[2]?arguments[2]:null)};
exports.unstable_renderSubtreeIntoContainer=function(a,b,c,d){if(!rk(c))throw Error(y(200));if(null==a||void 0===a._reactInternals)throw Error(y(38));return tk(a,b,c,!1,d)};exports.version="17.0.1";

},{"react":"n8MK","object-assign":"J4Nk","scheduler":"MDSO"}],"NKHc":[function(require,module,exports) {
'use strict';

function checkDCE() {
  /* global __REACT_DEVTOOLS_GLOBAL_HOOK__ */
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ === 'undefined' || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE !== 'function') {
    return;
  }

  if ("production" !== 'production') {
    // This branch is unreachable because this function is only called
    // in production, but the condition is true only in development.
    // Therefore if the branch is still here, dead code elimination wasn't
    // properly applied.
    // Don't change the message. React DevTools relies on it. Also make sure
    // this message doesn't occur elsewhere in this function, or it will cause
    // a false positive.
    throw new Error('^_^');
  }

  try {
    // Verify that the code above has been dead code eliminated (DCE'd).
    __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(checkDCE);
  } catch (err) {
    // DevTools shouldn't crash React, no matter what.
    // We should still report in case we break this code.
    console.error(err);
  }
}

if ("production" === 'production') {
  // DCE check should happen before ReactDOM bundle executes so that
  // DevTools can report bad minification during injection.
  checkDCE();
  module.exports = require('./cjs/react-dom.production.min.js');
} else {
  module.exports = require('./cjs/react-dom.development.js');
}
},{"./cjs/react-dom.production.min.js":"i17t"}],"beML":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = findDOMNode;

var _reactDom = _interopRequireDefault(require("react-dom"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Return if a node is a DOM node. Else will return by `findDOMNode`
 */
function findDOMNode(node) {
  if (node instanceof HTMLElement) {
    return node;
  }

  return _reactDom.default.findDOMNode(node);
}
},{"react-dom":"NKHc"}],"YOfO":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.warning = warning;
exports.note = note;
exports.resetWarned = resetWarned;
exports.call = call;
exports.warningOnce = warningOnce;
exports.noteOnce = noteOnce;
exports.default = void 0;

/* eslint-disable no-console */
var warned = {};

function warning(valid, message) {
  // Support uglify
  if ("production" !== 'production' && !valid && console !== undefined) {
    console.error("Warning: ".concat(message));
  }
}

function note(valid, message) {
  // Support uglify
  if ("production" !== 'production' && !valid && console !== undefined) {
    console.warn("Note: ".concat(message));
  }
}

function resetWarned() {
  warned = {};
}

function call(method, valid, message) {
  if (!valid && !warned[message]) {
    method(false, message);
    warned[message] = true;
  }
}

function warningOnce(valid, message) {
  call(warning, valid, message);
}

function noteOnce(valid, message) {
  call(note, valid, message);
}

var _default = warningOnce;
/* eslint-enable */

exports.default = _default;
},{}],"AOnv":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fillRef = fillRef;
exports.composeRef = composeRef;
exports.supportRef = supportRef;

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/esm/typeof"));

var _reactIs = require("react-is");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function fillRef(ref, node) {
  if (typeof ref === 'function') {
    ref(node);
  } else if ((0, _typeof2.default)(ref) === 'object' && ref && 'current' in ref) {
    ref.current = node;
  }
}
/**
 * Merge refs into one ref function to support ref passing.
 */


function composeRef() {
  for (var _len = arguments.length, refs = new Array(_len), _key = 0; _key < _len; _key++) {
    refs[_key] = arguments[_key];
  }

  return function (node) {
    refs.forEach(function (ref) {
      fillRef(ref, node);
    });
  };
}

function supportRef(nodeOrComponent) {
  var _type$prototype, _nodeOrComponent$prot;

  var type = (0, _reactIs.isMemo)(nodeOrComponent) ? nodeOrComponent.type.type : nodeOrComponent.type; // Function component node

  if (typeof type === 'function' && !((_type$prototype = type.prototype) === null || _type$prototype === void 0 ? void 0 : _type$prototype.render)) {
    return false;
  } // Class component


  if (typeof nodeOrComponent === 'function' && !((_nodeOrComponent$prot = nodeOrComponent.prototype) === null || _nodeOrComponent$prot === void 0 ? void 0 : _nodeOrComponent$prot.render)) {
    return false;
  }

  return true;
}
/* eslint-enable */
},{"@babel/runtime/helpers/esm/typeof":"xLw6","react-is":"H1RQ"}],"C4qV":[function(require,module,exports) {
var global = arguments[3];
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

/**
 * A collection of shims that provide minimal functionality of the ES6 collections.
 *
 * These implementations are not meant to be used outside of the ResizeObserver
 * modules as they cover only a limited range of use cases.
 */

/* eslint-disable require-jsdoc, valid-jsdoc */
var MapShim = function () {
  if (typeof Map !== 'undefined') {
    return Map;
  }
  /**
   * Returns index in provided array that matches the specified key.
   *
   * @param {Array<Array>} arr
   * @param {*} key
   * @returns {number}
   */


  function getIndex(arr, key) {
    var result = -1;
    arr.some(function (entry, index) {
      if (entry[0] === key) {
        result = index;
        return true;
      }

      return false;
    });
    return result;
  }

  return (
    /** @class */
    function () {
      function class_1() {
        this.__entries__ = [];
      }

      Object.defineProperty(class_1.prototype, "size", {
        /**
         * @returns {boolean}
         */
        get: function () {
          return this.__entries__.length;
        },
        enumerable: true,
        configurable: true
      });
      /**
       * @param {*} key
       * @returns {*}
       */

      class_1.prototype.get = function (key) {
        var index = getIndex(this.__entries__, key);
        var entry = this.__entries__[index];
        return entry && entry[1];
      };
      /**
       * @param {*} key
       * @param {*} value
       * @returns {void}
       */


      class_1.prototype.set = function (key, value) {
        var index = getIndex(this.__entries__, key);

        if (~index) {
          this.__entries__[index][1] = value;
        } else {
          this.__entries__.push([key, value]);
        }
      };
      /**
       * @param {*} key
       * @returns {void}
       */


      class_1.prototype.delete = function (key) {
        var entries = this.__entries__;
        var index = getIndex(entries, key);

        if (~index) {
          entries.splice(index, 1);
        }
      };
      /**
       * @param {*} key
       * @returns {void}
       */


      class_1.prototype.has = function (key) {
        return !!~getIndex(this.__entries__, key);
      };
      /**
       * @returns {void}
       */


      class_1.prototype.clear = function () {
        this.__entries__.splice(0);
      };
      /**
       * @param {Function} callback
       * @param {*} [ctx=null]
       * @returns {void}
       */


      class_1.prototype.forEach = function (callback, ctx) {
        if (ctx === void 0) {
          ctx = null;
        }

        for (var _i = 0, _a = this.__entries__; _i < _a.length; _i++) {
          var entry = _a[_i];
          callback.call(ctx, entry[1], entry[0]);
        }
      };

      return class_1;
    }()
  );
}();
/**
 * Detects whether window and document objects are available in current environment.
 */


var isBrowser = typeof window !== 'undefined' && typeof document !== 'undefined' && window.document === document; // Returns global object of a current environment.

var global$1 = function () {
  if (typeof global !== 'undefined' && global.Math === Math) {
    return global;
  }

  if (typeof self !== 'undefined' && self.Math === Math) {
    return self;
  }

  if (typeof window !== 'undefined' && window.Math === Math) {
    return window;
  } // eslint-disable-next-line no-new-func


  return Function('return this')();
}();
/**
 * A shim for the requestAnimationFrame which falls back to the setTimeout if
 * first one is not supported.
 *
 * @returns {number} Requests' identifier.
 */


var requestAnimationFrame$1 = function () {
  if (typeof requestAnimationFrame === 'function') {
    // It's required to use a bounded function because IE sometimes throws
    // an "Invalid calling object" error if rAF is invoked without the global
    // object on the left hand side.
    return requestAnimationFrame.bind(global$1);
  }

  return function (callback) {
    return setTimeout(function () {
      return callback(Date.now());
    }, 1000 / 60);
  };
}(); // Defines minimum timeout before adding a trailing call.


var trailingTimeout = 2;
/**
 * Creates a wrapper function which ensures that provided callback will be
 * invoked only once during the specified delay period.
 *
 * @param {Function} callback - Function to be invoked after the delay period.
 * @param {number} delay - Delay after which to invoke callback.
 * @returns {Function}
 */

function throttle(callback, delay) {
  var leadingCall = false,
      trailingCall = false,
      lastCallTime = 0;
  /**
   * Invokes the original callback function and schedules new invocation if
   * the "proxy" was called during current request.
   *
   * @returns {void}
   */

  function resolvePending() {
    if (leadingCall) {
      leadingCall = false;
      callback();
    }

    if (trailingCall) {
      proxy();
    }
  }
  /**
   * Callback invoked after the specified delay. It will further postpone
   * invocation of the original function delegating it to the
   * requestAnimationFrame.
   *
   * @returns {void}
   */


  function timeoutCallback() {
    requestAnimationFrame$1(resolvePending);
  }
  /**
   * Schedules invocation of the original function.
   *
   * @returns {void}
   */


  function proxy() {
    var timeStamp = Date.now();

    if (leadingCall) {
      // Reject immediately following calls.
      if (timeStamp - lastCallTime < trailingTimeout) {
        return;
      } // Schedule new call to be in invoked when the pending one is resolved.
      // This is important for "transitions" which never actually start
      // immediately so there is a chance that we might miss one if change
      // happens amids the pending invocation.


      trailingCall = true;
    } else {
      leadingCall = true;
      trailingCall = false;
      setTimeout(timeoutCallback, delay);
    }

    lastCallTime = timeStamp;
  }

  return proxy;
} // Minimum delay before invoking the update of observers.


var REFRESH_DELAY = 20; // A list of substrings of CSS properties used to find transition events that
// might affect dimensions of observed elements.

var transitionKeys = ['top', 'right', 'bottom', 'left', 'width', 'height', 'size', 'weight']; // Check if MutationObserver is available.

var mutationObserverSupported = typeof MutationObserver !== 'undefined';
/**
 * Singleton controller class which handles updates of ResizeObserver instances.
 */

var ResizeObserverController =
/** @class */
function () {
  /**
   * Creates a new instance of ResizeObserverController.
   *
   * @private
   */
  function ResizeObserverController() {
    /**
     * Indicates whether DOM listeners have been added.
     *
     * @private {boolean}
     */
    this.connected_ = false;
    /**
     * Tells that controller has subscribed for Mutation Events.
     *
     * @private {boolean}
     */

    this.mutationEventsAdded_ = false;
    /**
     * Keeps reference to the instance of MutationObserver.
     *
     * @private {MutationObserver}
     */

    this.mutationsObserver_ = null;
    /**
     * A list of connected observers.
     *
     * @private {Array<ResizeObserverSPI>}
     */

    this.observers_ = [];
    this.onTransitionEnd_ = this.onTransitionEnd_.bind(this);
    this.refresh = throttle(this.refresh.bind(this), REFRESH_DELAY);
  }
  /**
   * Adds observer to observers list.
   *
   * @param {ResizeObserverSPI} observer - Observer to be added.
   * @returns {void}
   */


  ResizeObserverController.prototype.addObserver = function (observer) {
    if (!~this.observers_.indexOf(observer)) {
      this.observers_.push(observer);
    } // Add listeners if they haven't been added yet.


    if (!this.connected_) {
      this.connect_();
    }
  };
  /**
   * Removes observer from observers list.
   *
   * @param {ResizeObserverSPI} observer - Observer to be removed.
   * @returns {void}
   */


  ResizeObserverController.prototype.removeObserver = function (observer) {
    var observers = this.observers_;
    var index = observers.indexOf(observer); // Remove observer if it's present in registry.

    if (~index) {
      observers.splice(index, 1);
    } // Remove listeners if controller has no connected observers.


    if (!observers.length && this.connected_) {
      this.disconnect_();
    }
  };
  /**
   * Invokes the update of observers. It will continue running updates insofar
   * it detects changes.
   *
   * @returns {void}
   */


  ResizeObserverController.prototype.refresh = function () {
    var changesDetected = this.updateObservers_(); // Continue running updates if changes have been detected as there might
    // be future ones caused by CSS transitions.

    if (changesDetected) {
      this.refresh();
    }
  };
  /**
   * Updates every observer from observers list and notifies them of queued
   * entries.
   *
   * @private
   * @returns {boolean} Returns "true" if any observer has detected changes in
   *      dimensions of it's elements.
   */


  ResizeObserverController.prototype.updateObservers_ = function () {
    // Collect observers that have active observations.
    var activeObservers = this.observers_.filter(function (observer) {
      return observer.gatherActive(), observer.hasActive();
    }); // Deliver notifications in a separate cycle in order to avoid any
    // collisions between observers, e.g. when multiple instances of
    // ResizeObserver are tracking the same element and the callback of one
    // of them changes content dimensions of the observed target. Sometimes
    // this may result in notifications being blocked for the rest of observers.

    activeObservers.forEach(function (observer) {
      return observer.broadcastActive();
    });
    return activeObservers.length > 0;
  };
  /**
   * Initializes DOM listeners.
   *
   * @private
   * @returns {void}
   */


  ResizeObserverController.prototype.connect_ = function () {
    // Do nothing if running in a non-browser environment or if listeners
    // have been already added.
    if (!isBrowser || this.connected_) {
      return;
    } // Subscription to the "Transitionend" event is used as a workaround for
    // delayed transitions. This way it's possible to capture at least the
    // final state of an element.


    document.addEventListener('transitionend', this.onTransitionEnd_);
    window.addEventListener('resize', this.refresh);

    if (mutationObserverSupported) {
      this.mutationsObserver_ = new MutationObserver(this.refresh);
      this.mutationsObserver_.observe(document, {
        attributes: true,
        childList: true,
        characterData: true,
        subtree: true
      });
    } else {
      document.addEventListener('DOMSubtreeModified', this.refresh);
      this.mutationEventsAdded_ = true;
    }

    this.connected_ = true;
  };
  /**
   * Removes DOM listeners.
   *
   * @private
   * @returns {void}
   */


  ResizeObserverController.prototype.disconnect_ = function () {
    // Do nothing if running in a non-browser environment or if listeners
    // have been already removed.
    if (!isBrowser || !this.connected_) {
      return;
    }

    document.removeEventListener('transitionend', this.onTransitionEnd_);
    window.removeEventListener('resize', this.refresh);

    if (this.mutationsObserver_) {
      this.mutationsObserver_.disconnect();
    }

    if (this.mutationEventsAdded_) {
      document.removeEventListener('DOMSubtreeModified', this.refresh);
    }

    this.mutationsObserver_ = null;
    this.mutationEventsAdded_ = false;
    this.connected_ = false;
  };
  /**
   * "Transitionend" event handler.
   *
   * @private
   * @param {TransitionEvent} event
   * @returns {void}
   */


  ResizeObserverController.prototype.onTransitionEnd_ = function (_a) {
    var _b = _a.propertyName,
        propertyName = _b === void 0 ? '' : _b; // Detect whether transition may affect dimensions of an element.

    var isReflowProperty = transitionKeys.some(function (key) {
      return !!~propertyName.indexOf(key);
    });

    if (isReflowProperty) {
      this.refresh();
    }
  };
  /**
   * Returns instance of the ResizeObserverController.
   *
   * @returns {ResizeObserverController}
   */


  ResizeObserverController.getInstance = function () {
    if (!this.instance_) {
      this.instance_ = new ResizeObserverController();
    }

    return this.instance_;
  };
  /**
   * Holds reference to the controller's instance.
   *
   * @private {ResizeObserverController}
   */


  ResizeObserverController.instance_ = null;
  return ResizeObserverController;
}();
/**
 * Defines non-writable/enumerable properties of the provided target object.
 *
 * @param {Object} target - Object for which to define properties.
 * @param {Object} props - Properties to be defined.
 * @returns {Object} Target object.
 */


var defineConfigurable = function (target, props) {
  for (var _i = 0, _a = Object.keys(props); _i < _a.length; _i++) {
    var key = _a[_i];
    Object.defineProperty(target, key, {
      value: props[key],
      enumerable: false,
      writable: false,
      configurable: true
    });
  }

  return target;
};
/**
 * Returns the global object associated with provided element.
 *
 * @param {Object} target
 * @returns {Object}
 */


var getWindowOf = function (target) {
  // Assume that the element is an instance of Node, which means that it
  // has the "ownerDocument" property from which we can retrieve a
  // corresponding global object.
  var ownerGlobal = target && target.ownerDocument && target.ownerDocument.defaultView; // Return the local global object if it's not possible extract one from
  // provided element.

  return ownerGlobal || global$1;
}; // Placeholder of an empty content rectangle.


var emptyRect = createRectInit(0, 0, 0, 0);
/**
 * Converts provided string to a number.
 *
 * @param {number|string} value
 * @returns {number}
 */

function toFloat(value) {
  return parseFloat(value) || 0;
}
/**
 * Extracts borders size from provided styles.
 *
 * @param {CSSStyleDeclaration} styles
 * @param {...string} positions - Borders positions (top, right, ...)
 * @returns {number}
 */


function getBordersSize(styles) {
  var positions = [];

  for (var _i = 1; _i < arguments.length; _i++) {
    positions[_i - 1] = arguments[_i];
  }

  return positions.reduce(function (size, position) {
    var value = styles['border-' + position + '-width'];
    return size + toFloat(value);
  }, 0);
}
/**
 * Extracts paddings sizes from provided styles.
 *
 * @param {CSSStyleDeclaration} styles
 * @returns {Object} Paddings box.
 */


function getPaddings(styles) {
  var positions = ['top', 'right', 'bottom', 'left'];
  var paddings = {};

  for (var _i = 0, positions_1 = positions; _i < positions_1.length; _i++) {
    var position = positions_1[_i];
    var value = styles['padding-' + position];
    paddings[position] = toFloat(value);
  }

  return paddings;
}
/**
 * Calculates content rectangle of provided SVG element.
 *
 * @param {SVGGraphicsElement} target - Element content rectangle of which needs
 *      to be calculated.
 * @returns {DOMRectInit}
 */


function getSVGContentRect(target) {
  var bbox = target.getBBox();
  return createRectInit(0, 0, bbox.width, bbox.height);
}
/**
 * Calculates content rectangle of provided HTMLElement.
 *
 * @param {HTMLElement} target - Element for which to calculate the content rectangle.
 * @returns {DOMRectInit}
 */


function getHTMLElementContentRect(target) {
  // Client width & height properties can't be
  // used exclusively as they provide rounded values.
  var clientWidth = target.clientWidth,
      clientHeight = target.clientHeight; // By this condition we can catch all non-replaced inline, hidden and
  // detached elements. Though elements with width & height properties less
  // than 0.5 will be discarded as well.
  //
  // Without it we would need to implement separate methods for each of
  // those cases and it's not possible to perform a precise and performance
  // effective test for hidden elements. E.g. even jQuery's ':visible' filter
  // gives wrong results for elements with width & height less than 0.5.

  if (!clientWidth && !clientHeight) {
    return emptyRect;
  }

  var styles = getWindowOf(target).getComputedStyle(target);
  var paddings = getPaddings(styles);
  var horizPad = paddings.left + paddings.right;
  var vertPad = paddings.top + paddings.bottom; // Computed styles of width & height are being used because they are the
  // only dimensions available to JS that contain non-rounded values. It could
  // be possible to utilize the getBoundingClientRect if only it's data wasn't
  // affected by CSS transformations let alone paddings, borders and scroll bars.

  var width = toFloat(styles.width),
      height = toFloat(styles.height); // Width & height include paddings and borders when the 'border-box' box
  // model is applied (except for IE).

  if (styles.boxSizing === 'border-box') {
    // Following conditions are required to handle Internet Explorer which
    // doesn't include paddings and borders to computed CSS dimensions.
    //
    // We can say that if CSS dimensions + paddings are equal to the "client"
    // properties then it's either IE, and thus we don't need to subtract
    // anything, or an element merely doesn't have paddings/borders styles.
    if (Math.round(width + horizPad) !== clientWidth) {
      width -= getBordersSize(styles, 'left', 'right') + horizPad;
    }

    if (Math.round(height + vertPad) !== clientHeight) {
      height -= getBordersSize(styles, 'top', 'bottom') + vertPad;
    }
  } // Following steps can't be applied to the document's root element as its
  // client[Width/Height] properties represent viewport area of the window.
  // Besides, it's as well not necessary as the <html> itself neither has
  // rendered scroll bars nor it can be clipped.


  if (!isDocumentElement(target)) {
    // In some browsers (only in Firefox, actually) CSS width & height
    // include scroll bars size which can be removed at this step as scroll
    // bars are the only difference between rounded dimensions + paddings
    // and "client" properties, though that is not always true in Chrome.
    var vertScrollbar = Math.round(width + horizPad) - clientWidth;
    var horizScrollbar = Math.round(height + vertPad) - clientHeight; // Chrome has a rather weird rounding of "client" properties.
    // E.g. for an element with content width of 314.2px it sometimes gives
    // the client width of 315px and for the width of 314.7px it may give
    // 314px. And it doesn't happen all the time. So just ignore this delta
    // as a non-relevant.

    if (Math.abs(vertScrollbar) !== 1) {
      width -= vertScrollbar;
    }

    if (Math.abs(horizScrollbar) !== 1) {
      height -= horizScrollbar;
    }
  }

  return createRectInit(paddings.left, paddings.top, width, height);
}
/**
 * Checks whether provided element is an instance of the SVGGraphicsElement.
 *
 * @param {Element} target - Element to be checked.
 * @returns {boolean}
 */


var isSVGGraphicsElement = function () {
  // Some browsers, namely IE and Edge, don't have the SVGGraphicsElement
  // interface.
  if (typeof SVGGraphicsElement !== 'undefined') {
    return function (target) {
      return target instanceof getWindowOf(target).SVGGraphicsElement;
    };
  } // If it's so, then check that element is at least an instance of the
  // SVGElement and that it has the "getBBox" method.
  // eslint-disable-next-line no-extra-parens


  return function (target) {
    return target instanceof getWindowOf(target).SVGElement && typeof target.getBBox === 'function';
  };
}();
/**
 * Checks whether provided element is a document element (<html>).
 *
 * @param {Element} target - Element to be checked.
 * @returns {boolean}
 */


function isDocumentElement(target) {
  return target === getWindowOf(target).document.documentElement;
}
/**
 * Calculates an appropriate content rectangle for provided html or svg element.
 *
 * @param {Element} target - Element content rectangle of which needs to be calculated.
 * @returns {DOMRectInit}
 */


function getContentRect(target) {
  if (!isBrowser) {
    return emptyRect;
  }

  if (isSVGGraphicsElement(target)) {
    return getSVGContentRect(target);
  }

  return getHTMLElementContentRect(target);
}
/**
 * Creates rectangle with an interface of the DOMRectReadOnly.
 * Spec: https://drafts.fxtf.org/geometry/#domrectreadonly
 *
 * @param {DOMRectInit} rectInit - Object with rectangle's x/y coordinates and dimensions.
 * @returns {DOMRectReadOnly}
 */


function createReadOnlyRect(_a) {
  var x = _a.x,
      y = _a.y,
      width = _a.width,
      height = _a.height; // If DOMRectReadOnly is available use it as a prototype for the rectangle.

  var Constr = typeof DOMRectReadOnly !== 'undefined' ? DOMRectReadOnly : Object;
  var rect = Object.create(Constr.prototype); // Rectangle's properties are not writable and non-enumerable.

  defineConfigurable(rect, {
    x: x,
    y: y,
    width: width,
    height: height,
    top: y,
    right: x + width,
    bottom: height + y,
    left: x
  });
  return rect;
}
/**
 * Creates DOMRectInit object based on the provided dimensions and the x/y coordinates.
 * Spec: https://drafts.fxtf.org/geometry/#dictdef-domrectinit
 *
 * @param {number} x - X coordinate.
 * @param {number} y - Y coordinate.
 * @param {number} width - Rectangle's width.
 * @param {number} height - Rectangle's height.
 * @returns {DOMRectInit}
 */


function createRectInit(x, y, width, height) {
  return {
    x: x,
    y: y,
    width: width,
    height: height
  };
}
/**
 * Class that is responsible for computations of the content rectangle of
 * provided DOM element and for keeping track of it's changes.
 */


var ResizeObservation =
/** @class */
function () {
  /**
   * Creates an instance of ResizeObservation.
   *
   * @param {Element} target - Element to be observed.
   */
  function ResizeObservation(target) {
    /**
     * Broadcasted width of content rectangle.
     *
     * @type {number}
     */
    this.broadcastWidth = 0;
    /**
     * Broadcasted height of content rectangle.
     *
     * @type {number}
     */

    this.broadcastHeight = 0;
    /**
     * Reference to the last observed content rectangle.
     *
     * @private {DOMRectInit}
     */

    this.contentRect_ = createRectInit(0, 0, 0, 0);
    this.target = target;
  }
  /**
   * Updates content rectangle and tells whether it's width or height properties
   * have changed since the last broadcast.
   *
   * @returns {boolean}
   */


  ResizeObservation.prototype.isActive = function () {
    var rect = getContentRect(this.target);
    this.contentRect_ = rect;
    return rect.width !== this.broadcastWidth || rect.height !== this.broadcastHeight;
  };
  /**
   * Updates 'broadcastWidth' and 'broadcastHeight' properties with a data
   * from the corresponding properties of the last observed content rectangle.
   *
   * @returns {DOMRectInit} Last observed content rectangle.
   */


  ResizeObservation.prototype.broadcastRect = function () {
    var rect = this.contentRect_;
    this.broadcastWidth = rect.width;
    this.broadcastHeight = rect.height;
    return rect;
  };

  return ResizeObservation;
}();

var ResizeObserverEntry =
/** @class */
function () {
  /**
   * Creates an instance of ResizeObserverEntry.
   *
   * @param {Element} target - Element that is being observed.
   * @param {DOMRectInit} rectInit - Data of the element's content rectangle.
   */
  function ResizeObserverEntry(target, rectInit) {
    var contentRect = createReadOnlyRect(rectInit); // According to the specification following properties are not writable
    // and are also not enumerable in the native implementation.
    //
    // Property accessors are not being used as they'd require to define a
    // private WeakMap storage which may cause memory leaks in browsers that
    // don't support this type of collections.

    defineConfigurable(this, {
      target: target,
      contentRect: contentRect
    });
  }

  return ResizeObserverEntry;
}();

var ResizeObserverSPI =
/** @class */
function () {
  /**
   * Creates a new instance of ResizeObserver.
   *
   * @param {ResizeObserverCallback} callback - Callback function that is invoked
   *      when one of the observed elements changes it's content dimensions.
   * @param {ResizeObserverController} controller - Controller instance which
   *      is responsible for the updates of observer.
   * @param {ResizeObserver} callbackCtx - Reference to the public
   *      ResizeObserver instance which will be passed to callback function.
   */
  function ResizeObserverSPI(callback, controller, callbackCtx) {
    /**
     * Collection of resize observations that have detected changes in dimensions
     * of elements.
     *
     * @private {Array<ResizeObservation>}
     */
    this.activeObservations_ = [];
    /**
     * Registry of the ResizeObservation instances.
     *
     * @private {Map<Element, ResizeObservation>}
     */

    this.observations_ = new MapShim();

    if (typeof callback !== 'function') {
      throw new TypeError('The callback provided as parameter 1 is not a function.');
    }

    this.callback_ = callback;
    this.controller_ = controller;
    this.callbackCtx_ = callbackCtx;
  }
  /**
   * Starts observing provided element.
   *
   * @param {Element} target - Element to be observed.
   * @returns {void}
   */


  ResizeObserverSPI.prototype.observe = function (target) {
    if (!arguments.length) {
      throw new TypeError('1 argument required, but only 0 present.');
    } // Do nothing if current environment doesn't have the Element interface.


    if (typeof Element === 'undefined' || !(Element instanceof Object)) {
      return;
    }

    if (!(target instanceof getWindowOf(target).Element)) {
      throw new TypeError('parameter 1 is not of type "Element".');
    }

    var observations = this.observations_; // Do nothing if element is already being observed.

    if (observations.has(target)) {
      return;
    }

    observations.set(target, new ResizeObservation(target));
    this.controller_.addObserver(this); // Force the update of observations.

    this.controller_.refresh();
  };
  /**
   * Stops observing provided element.
   *
   * @param {Element} target - Element to stop observing.
   * @returns {void}
   */


  ResizeObserverSPI.prototype.unobserve = function (target) {
    if (!arguments.length) {
      throw new TypeError('1 argument required, but only 0 present.');
    } // Do nothing if current environment doesn't have the Element interface.


    if (typeof Element === 'undefined' || !(Element instanceof Object)) {
      return;
    }

    if (!(target instanceof getWindowOf(target).Element)) {
      throw new TypeError('parameter 1 is not of type "Element".');
    }

    var observations = this.observations_; // Do nothing if element is not being observed.

    if (!observations.has(target)) {
      return;
    }

    observations.delete(target);

    if (!observations.size) {
      this.controller_.removeObserver(this);
    }
  };
  /**
   * Stops observing all elements.
   *
   * @returns {void}
   */


  ResizeObserverSPI.prototype.disconnect = function () {
    this.clearActive();
    this.observations_.clear();
    this.controller_.removeObserver(this);
  };
  /**
   * Collects observation instances the associated element of which has changed
   * it's content rectangle.
   *
   * @returns {void}
   */


  ResizeObserverSPI.prototype.gatherActive = function () {
    var _this = this;

    this.clearActive();
    this.observations_.forEach(function (observation) {
      if (observation.isActive()) {
        _this.activeObservations_.push(observation);
      }
    });
  };
  /**
   * Invokes initial callback function with a list of ResizeObserverEntry
   * instances collected from active resize observations.
   *
   * @returns {void}
   */


  ResizeObserverSPI.prototype.broadcastActive = function () {
    // Do nothing if observer doesn't have active observations.
    if (!this.hasActive()) {
      return;
    }

    var ctx = this.callbackCtx_; // Create ResizeObserverEntry instance for every active observation.

    var entries = this.activeObservations_.map(function (observation) {
      return new ResizeObserverEntry(observation.target, observation.broadcastRect());
    });
    this.callback_.call(ctx, entries, ctx);
    this.clearActive();
  };
  /**
   * Clears the collection of active observations.
   *
   * @returns {void}
   */


  ResizeObserverSPI.prototype.clearActive = function () {
    this.activeObservations_.splice(0);
  };
  /**
   * Tells whether observer has active observations.
   *
   * @returns {boolean}
   */


  ResizeObserverSPI.prototype.hasActive = function () {
    return this.activeObservations_.length > 0;
  };

  return ResizeObserverSPI;
}(); // Registry of internal observers. If WeakMap is not available use current shim
// for the Map collection as it has all required methods and because WeakMap
// can't be fully polyfilled anyway.


var observers = typeof WeakMap !== 'undefined' ? new WeakMap() : new MapShim();
/**
 * ResizeObserver API. Encapsulates the ResizeObserver SPI implementation
 * exposing only those methods and properties that are defined in the spec.
 */

var ResizeObserver =
/** @class */
function () {
  /**
   * Creates a new instance of ResizeObserver.
   *
   * @param {ResizeObserverCallback} callback - Callback that is invoked when
   *      dimensions of the observed elements change.
   */
  function ResizeObserver(callback) {
    if (!(this instanceof ResizeObserver)) {
      throw new TypeError('Cannot call a class as a function.');
    }

    if (!arguments.length) {
      throw new TypeError('1 argument required, but only 0 present.');
    }

    var controller = ResizeObserverController.getInstance();
    var observer = new ResizeObserverSPI(callback, controller, this);
    observers.set(this, observer);
  }

  return ResizeObserver;
}(); // Expose public methods of ResizeObserver.


['observe', 'unobserve', 'disconnect'].forEach(function (method) {
  ResizeObserver.prototype[method] = function () {
    var _a;

    return (_a = observers.get(this))[method].apply(_a, arguments);
  };
});

var index = function () {
  // Export existing implementation if available.
  if (typeof global$1.ResizeObserver !== 'undefined') {
    return global$1.ResizeObserver;
  }

  return ResizeObserver;
}();

var _default = index;
exports.default = _default;
},{}],"q9L5":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/esm/objectSpread2"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/esm/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/esm/createClass"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/esm/inherits"));

var _createSuper2 = _interopRequireDefault(require("@babel/runtime/helpers/esm/createSuper"));

var React = _interopRequireWildcard(require("react"));

var _findDOMNode = _interopRequireDefault(require("rc-util/es/Dom/findDOMNode"));

var _toArray = _interopRequireDefault(require("rc-util/es/Children/toArray"));

var _warning = _interopRequireDefault(require("rc-util/es/warning"));

var _ref = require("rc-util/es/ref");

var _resizeObserverPolyfill = _interopRequireDefault(require("resize-observer-polyfill"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var INTERNAL_PREFIX_KEY = 'rc-observer-key'; // Still need to be compatible with React 15, we use class component here

var ReactResizeObserver = /*#__PURE__*/function (_React$Component) {
  (0, _inherits2.default)(ReactResizeObserver, _React$Component);

  var _super = (0, _createSuper2.default)(ReactResizeObserver);

  function ReactResizeObserver() {
    var _this;

    (0, _classCallCheck2.default)(this, ReactResizeObserver);
    _this = _super.apply(this, arguments);
    _this.resizeObserver = null;
    _this.childNode = null;
    _this.currentElement = null;
    _this.state = {
      width: 0,
      height: 0,
      offsetHeight: 0,
      offsetWidth: 0
    };

    _this.onResize = function (entries) {
      var onResize = _this.props.onResize;
      var target = entries[0].target;

      var _target$getBoundingCl = target.getBoundingClientRect(),
          width = _target$getBoundingCl.width,
          height = _target$getBoundingCl.height;

      var offsetWidth = target.offsetWidth,
          offsetHeight = target.offsetHeight;
      /**
       * Resize observer trigger when content size changed.
       * In most case we just care about element size,
       * let's use `boundary` instead of `contentRect` here to avoid shaking.
       */

      var fixedWidth = Math.floor(width);
      var fixedHeight = Math.floor(height);

      if (_this.state.width !== fixedWidth || _this.state.height !== fixedHeight || _this.state.offsetWidth !== offsetWidth || _this.state.offsetHeight !== offsetHeight) {
        var size = {
          width: fixedWidth,
          height: fixedHeight,
          offsetWidth: offsetWidth,
          offsetHeight: offsetHeight
        };

        _this.setState(size);

        if (onResize) {
          // defer the callback but not defer to next frame
          Promise.resolve().then(function () {
            onResize((0, _objectSpread2.default)((0, _objectSpread2.default)({}, size), {}, {
              offsetWidth: offsetWidth,
              offsetHeight: offsetHeight
            }), target);
          });
        }
      }
    };

    _this.setChildNode = function (node) {
      _this.childNode = node;
    };

    return _this;
  }

  (0, _createClass2.default)(ReactResizeObserver, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.onComponentUpdated();
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate() {
      this.onComponentUpdated();
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.destroyObserver();
    }
  }, {
    key: "onComponentUpdated",
    value: function onComponentUpdated() {
      var disabled = this.props.disabled; // Unregister if disabled

      if (disabled) {
        this.destroyObserver();
        return;
      } // Unregister if element changed


      var element = (0, _findDOMNode.default)(this.childNode || this);
      var elementChanged = element !== this.currentElement;

      if (elementChanged) {
        this.destroyObserver();
        this.currentElement = element;
      }

      if (!this.resizeObserver && element) {
        this.resizeObserver = new _resizeObserverPolyfill.default(this.onResize);
        this.resizeObserver.observe(element);
      }
    }
  }, {
    key: "destroyObserver",
    value: function destroyObserver() {
      if (this.resizeObserver) {
        this.resizeObserver.disconnect();
        this.resizeObserver = null;
      }
    }
  }, {
    key: "render",
    value: function render() {
      var children = this.props.children;
      var childNodes = (0, _toArray.default)(children);

      if (childNodes.length > 1) {
        (0, _warning.default)(false, 'Find more than one child node with `children` in ResizeObserver. Will only observe first one.');
      } else if (childNodes.length === 0) {
        (0, _warning.default)(false, '`children` of ResizeObserver is empty. Nothing is in observe.');
        return null;
      }

      var childNode = childNodes[0];

      if ( /*#__PURE__*/React.isValidElement(childNode) && (0, _ref.supportRef)(childNode)) {
        var ref = childNode.ref;
        childNodes[0] = /*#__PURE__*/React.cloneElement(childNode, {
          ref: (0, _ref.composeRef)(ref, this.setChildNode)
        });
      }

      return childNodes.length === 1 ? childNodes[0] : childNodes.map(function (node, index) {
        if (! /*#__PURE__*/React.isValidElement(node) || 'key' in node && node.key !== null) {
          return node;
        }

        return /*#__PURE__*/React.cloneElement(node, {
          key: "".concat(INTERNAL_PREFIX_KEY, "-").concat(index)
        });
      });
    }
  }]);
  return ReactResizeObserver;
}(React.Component);

ReactResizeObserver.displayName = 'ResizeObserver';
var _default = ReactResizeObserver;
exports.default = _default;
},{"@babel/runtime/helpers/esm/objectSpread2":"UKeT","@babel/runtime/helpers/esm/classCallCheck":"VEjx","@babel/runtime/helpers/esm/createClass":"l5p4","@babel/runtime/helpers/esm/inherits":"NT06","@babel/runtime/helpers/esm/createSuper":"m5aa","react":"n8MK","rc-util/es/Dom/findDOMNode":"beML","rc-util/es/Children/toArray":"artt","rc-util/es/warning":"YOfO","rc-util/es/ref":"AOnv","resize-observer-polyfill":"C4qV"}],"LCWf":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = useRaf;
exports.useRafState = useRafState;

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/esm/slicedToArray"));

var _react = require("react");

var _raf = _interopRequireDefault(require("rc-util/es/raf"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function useRaf(callback) {
  var rafRef = (0, _react.useRef)();
  var removedRef = (0, _react.useRef)(false);

  function trigger() {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    if (!removedRef.current) {
      _raf.default.cancel(rafRef.current);

      rafRef.current = (0, _raf.default)(function () {
        callback.apply(void 0, args);
      });
    }
  }

  (0, _react.useEffect)(function () {
    return function () {
      removedRef.current = true;

      _raf.default.cancel(rafRef.current);
    };
  }, []);
  return trigger;
}

function useRafState(defaultState) {
  var batchRef = (0, _react.useRef)([]);

  var _useState = (0, _react.useState)({}),
      _useState2 = (0, _slicedToArray2.default)(_useState, 2),
      forceUpdate = _useState2[1];

  var state = (0, _react.useRef)(typeof defaultState === 'function' ? defaultState() : defaultState);
  var flushUpdate = useRaf(function () {
    var current = state.current;
    batchRef.current.forEach(function (callback) {
      current = callback(current);
    });
    batchRef.current = [];
    state.current = current;
    forceUpdate({});
  });

  function updater(callback) {
    batchRef.current.push(callback);
    flushUpdate();
  }

  return [state.current, updater];
}
},{"@babel/runtime/helpers/esm/slicedToArray":"T12H","react":"n8MK","rc-util/es/raf":"adDJ"}],"Imvn":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

/**
 * @ignore
 * some key-codes definition and utils from closure-library
 * @author yiminghe@gmail.com
 */
var KeyCode = {
  /**
   * MAC_ENTER
   */
  MAC_ENTER: 3,

  /**
   * BACKSPACE
   */
  BACKSPACE: 8,

  /**
   * TAB
   */
  TAB: 9,

  /**
   * NUMLOCK on FF/Safari Mac
   */
  NUM_CENTER: 12,

  /**
   * ENTER
   */
  ENTER: 13,

  /**
   * SHIFT
   */
  SHIFT: 16,

  /**
   * CTRL
   */
  CTRL: 17,

  /**
   * ALT
   */
  ALT: 18,

  /**
   * PAUSE
   */
  PAUSE: 19,

  /**
   * CAPS_LOCK
   */
  CAPS_LOCK: 20,

  /**
   * ESC
   */
  ESC: 27,

  /**
   * SPACE
   */
  SPACE: 32,

  /**
   * PAGE_UP
   */
  PAGE_UP: 33,

  /**
   * PAGE_DOWN
   */
  PAGE_DOWN: 34,

  /**
   * END
   */
  END: 35,

  /**
   * HOME
   */
  HOME: 36,

  /**
   * LEFT
   */
  LEFT: 37,

  /**
   * UP
   */
  UP: 38,

  /**
   * RIGHT
   */
  RIGHT: 39,

  /**
   * DOWN
   */
  DOWN: 40,

  /**
   * PRINT_SCREEN
   */
  PRINT_SCREEN: 44,

  /**
   * INSERT
   */
  INSERT: 45,

  /**
   * DELETE
   */
  DELETE: 46,

  /**
   * ZERO
   */
  ZERO: 48,

  /**
   * ONE
   */
  ONE: 49,

  /**
   * TWO
   */
  TWO: 50,

  /**
   * THREE
   */
  THREE: 51,

  /**
   * FOUR
   */
  FOUR: 52,

  /**
   * FIVE
   */
  FIVE: 53,

  /**
   * SIX
   */
  SIX: 54,

  /**
   * SEVEN
   */
  SEVEN: 55,

  /**
   * EIGHT
   */
  EIGHT: 56,

  /**
   * NINE
   */
  NINE: 57,

  /**
   * QUESTION_MARK
   */
  QUESTION_MARK: 63,

  /**
   * A
   */
  A: 65,

  /**
   * B
   */
  B: 66,

  /**
   * C
   */
  C: 67,

  /**
   * D
   */
  D: 68,

  /**
   * E
   */
  E: 69,

  /**
   * F
   */
  F: 70,

  /**
   * G
   */
  G: 71,

  /**
   * H
   */
  H: 72,

  /**
   * I
   */
  I: 73,

  /**
   * J
   */
  J: 74,

  /**
   * K
   */
  K: 75,

  /**
   * L
   */
  L: 76,

  /**
   * M
   */
  M: 77,

  /**
   * N
   */
  N: 78,

  /**
   * O
   */
  O: 79,

  /**
   * P
   */
  P: 80,

  /**
   * Q
   */
  Q: 81,

  /**
   * R
   */
  R: 82,

  /**
   * S
   */
  S: 83,

  /**
   * T
   */
  T: 84,

  /**
   * U
   */
  U: 85,

  /**
   * V
   */
  V: 86,

  /**
   * W
   */
  W: 87,

  /**
   * X
   */
  X: 88,

  /**
   * Y
   */
  Y: 89,

  /**
   * Z
   */
  Z: 90,

  /**
   * META
   */
  META: 91,

  /**
   * WIN_KEY_RIGHT
   */
  WIN_KEY_RIGHT: 92,

  /**
   * CONTEXT_MENU
   */
  CONTEXT_MENU: 93,

  /**
   * NUM_ZERO
   */
  NUM_ZERO: 96,

  /**
   * NUM_ONE
   */
  NUM_ONE: 97,

  /**
   * NUM_TWO
   */
  NUM_TWO: 98,

  /**
   * NUM_THREE
   */
  NUM_THREE: 99,

  /**
   * NUM_FOUR
   */
  NUM_FOUR: 100,

  /**
   * NUM_FIVE
   */
  NUM_FIVE: 101,

  /**
   * NUM_SIX
   */
  NUM_SIX: 102,

  /**
   * NUM_SEVEN
   */
  NUM_SEVEN: 103,

  /**
   * NUM_EIGHT
   */
  NUM_EIGHT: 104,

  /**
   * NUM_NINE
   */
  NUM_NINE: 105,

  /**
   * NUM_MULTIPLY
   */
  NUM_MULTIPLY: 106,

  /**
   * NUM_PLUS
   */
  NUM_PLUS: 107,

  /**
   * NUM_MINUS
   */
  NUM_MINUS: 109,

  /**
   * NUM_PERIOD
   */
  NUM_PERIOD: 110,

  /**
   * NUM_DIVISION
   */
  NUM_DIVISION: 111,

  /**
   * F1
   */
  F1: 112,

  /**
   * F2
   */
  F2: 113,

  /**
   * F3
   */
  F3: 114,

  /**
   * F4
   */
  F4: 115,

  /**
   * F5
   */
  F5: 116,

  /**
   * F6
   */
  F6: 117,

  /**
   * F7
   */
  F7: 118,

  /**
   * F8
   */
  F8: 119,

  /**
   * F9
   */
  F9: 120,

  /**
   * F10
   */
  F10: 121,

  /**
   * F11
   */
  F11: 122,

  /**
   * F12
   */
  F12: 123,

  /**
   * NUMLOCK
   */
  NUMLOCK: 144,

  /**
   * SEMICOLON
   */
  SEMICOLON: 186,

  /**
   * DASH
   */
  DASH: 189,

  /**
   * EQUALS
   */
  EQUALS: 187,

  /**
   * COMMA
   */
  COMMA: 188,

  /**
   * PERIOD
   */
  PERIOD: 190,

  /**
   * SLASH
   */
  SLASH: 191,

  /**
   * APOSTROPHE
   */
  APOSTROPHE: 192,

  /**
   * SINGLE_QUOTE
   */
  SINGLE_QUOTE: 222,

  /**
   * OPEN_SQUARE_BRACKET
   */
  OPEN_SQUARE_BRACKET: 219,

  /**
   * BACKSLASH
   */
  BACKSLASH: 220,

  /**
   * CLOSE_SQUARE_BRACKET
   */
  CLOSE_SQUARE_BRACKET: 221,

  /**
   * WIN_KEY
   */
  WIN_KEY: 224,

  /**
   * MAC_FF_META
   */
  MAC_FF_META: 224,

  /**
   * WIN_IME
   */
  WIN_IME: 229,
  // ======================== Function ========================

  /**
   * whether text and modified key is entered at the same time.
   */
  isTextModifyingKeyEvent: function isTextModifyingKeyEvent(e) {
    var keyCode = e.keyCode;

    if (e.altKey && !e.ctrlKey || e.metaKey || // Function keys don't generate text
    keyCode >= KeyCode.F1 && keyCode <= KeyCode.F12) {
      return false;
    } // The following keys are quite harmless, even in combination with
    // CTRL, ALT or SHIFT.


    switch (keyCode) {
      case KeyCode.ALT:
      case KeyCode.CAPS_LOCK:
      case KeyCode.CONTEXT_MENU:
      case KeyCode.CTRL:
      case KeyCode.DOWN:
      case KeyCode.END:
      case KeyCode.ESC:
      case KeyCode.HOME:
      case KeyCode.INSERT:
      case KeyCode.LEFT:
      case KeyCode.MAC_FF_META:
      case KeyCode.META:
      case KeyCode.NUMLOCK:
      case KeyCode.NUM_CENTER:
      case KeyCode.PAGE_DOWN:
      case KeyCode.PAGE_UP:
      case KeyCode.PAUSE:
      case KeyCode.PRINT_SCREEN:
      case KeyCode.RIGHT:
      case KeyCode.SHIFT:
      case KeyCode.UP:
      case KeyCode.WIN_KEY:
      case KeyCode.WIN_KEY_RIGHT:
        return false;

      default:
        return true;
    }
  },

  /**
   * whether character is entered.
   */
  isCharacterKey: function isCharacterKey(keyCode) {
    if (keyCode >= KeyCode.ZERO && keyCode <= KeyCode.NINE) {
      return true;
    }

    if (keyCode >= KeyCode.NUM_ZERO && keyCode <= KeyCode.NUM_MULTIPLY) {
      return true;
    }

    if (keyCode >= KeyCode.A && keyCode <= KeyCode.Z) {
      return true;
    } // Safari sends zero key code for non-latin characters.


    if (window.navigator.userAgent.indexOf('WebKit') !== -1 && keyCode === 0) {
      return true;
    }

    switch (keyCode) {
      case KeyCode.SPACE:
      case KeyCode.QUESTION_MARK:
      case KeyCode.NUM_PLUS:
      case KeyCode.NUM_MINUS:
      case KeyCode.NUM_PERIOD:
      case KeyCode.NUM_DIVISION:
      case KeyCode.SEMICOLON:
      case KeyCode.DASH:
      case KeyCode.EQUALS:
      case KeyCode.COMMA:
      case KeyCode.PERIOD:
      case KeyCode.SLASH:
      case KeyCode.APOSTROPHE:
      case KeyCode.SINGLE_QUOTE:
      case KeyCode.OPEN_SQUARE_BRACKET:
      case KeyCode.BACKSLASH:
      case KeyCode.CLOSE_SQUARE_BRACKET:
        return true;

      default:
        return false;
    }
  }
};
var _default = KeyCode;
exports.default = _default;
},{}],"VleC":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/esm/defineProperty"));

var React = _interopRequireWildcard(require("react"));

var _classnames = _interopRequireDefault(require("classnames"));

var _KeyCode = _interopRequireDefault(require("rc-util/es/KeyCode"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function TabNode(_ref, ref) {
  var _classNames;

  var prefixCls = _ref.prefixCls,
      id = _ref.id,
      active = _ref.active,
      rtl = _ref.rtl,
      _ref$tab = _ref.tab,
      key = _ref$tab.key,
      tab = _ref$tab.tab,
      disabled = _ref$tab.disabled,
      closeIcon = _ref$tab.closeIcon,
      tabBarGutter = _ref.tabBarGutter,
      tabPosition = _ref.tabPosition,
      closable = _ref.closable,
      renderWrapper = _ref.renderWrapper,
      removeAriaLabel = _ref.removeAriaLabel,
      editable = _ref.editable,
      onClick = _ref.onClick,
      onRemove = _ref.onRemove,
      onFocus = _ref.onFocus;
  var tabPrefix = "".concat(prefixCls, "-tab");
  React.useEffect(function () {
    return onRemove;
  }, []);
  var nodeStyle = {};

  if (tabPosition === 'top' || tabPosition === 'bottom') {
    nodeStyle[rtl ? 'marginLeft' : 'marginRight'] = tabBarGutter;
  } else {
    nodeStyle.marginBottom = tabBarGutter;
  }

  var removable = editable && closable !== false && !disabled;

  function onInternalClick(e) {
    if (disabled) return;
    onClick(e);
  }

  function onRemoveTab(event) {
    event.preventDefault();
    event.stopPropagation();
    editable.onEdit('remove', {
      key: key,
      event: event
    });
  }

  var node = /*#__PURE__*/React.createElement("div", {
    key: key,
    ref: ref,
    className: (0, _classnames.default)(tabPrefix, (_classNames = {}, (0, _defineProperty2.default)(_classNames, "".concat(tabPrefix, "-with-remove"), removable), (0, _defineProperty2.default)(_classNames, "".concat(tabPrefix, "-active"), active), (0, _defineProperty2.default)(_classNames, "".concat(tabPrefix, "-disabled"), disabled), _classNames)),
    style: nodeStyle,
    onClick: onInternalClick
  }, /*#__PURE__*/React.createElement("div", {
    role: "tab",
    "aria-selected": active,
    id: id && "".concat(id, "-tab-").concat(key),
    className: "".concat(tabPrefix, "-btn"),
    "aria-controls": id && "".concat(id, "-panel-").concat(key),
    "aria-disabled": disabled,
    tabIndex: disabled ? null : 0,
    onClick: function onClick(e) {
      e.stopPropagation();
      onInternalClick(e);
    },
    onKeyDown: function onKeyDown(e) {
      if ([_KeyCode.default.SPACE, _KeyCode.default.ENTER].includes(e.which)) {
        e.preventDefault();
        onInternalClick(e);
      }
    },
    onFocus: onFocus
  }, tab), removable && /*#__PURE__*/React.createElement("button", {
    type: "button",
    "aria-label": removeAriaLabel || 'remove',
    tabIndex: 0,
    className: "".concat(tabPrefix, "-remove"),
    onClick: function onClick(e) {
      e.stopPropagation();
      onRemoveTab(e);
    }
  }, closeIcon || editable.removeIcon || '×'));

  if (renderWrapper) {
    node = renderWrapper(node);
  }

  return node;
}

var _default = /*#__PURE__*/React.forwardRef(TabNode);

exports.default = _default;
},{"@babel/runtime/helpers/esm/defineProperty":"gpd2","react":"n8MK","classnames":"qb7c","rc-util/es/KeyCode":"Imvn"}],"uhKO":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = useOffsets;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/esm/objectSpread2"));

var _react = require("react");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DEFAULT_SIZE = {
  width: 0,
  height: 0,
  left: 0,
  top: 0
};

function useOffsets(tabs, tabSizes, holderScrollWidth) {
  return (0, _react.useMemo)(function () {
    var _tabs$;

    var map = new Map();
    var lastOffset = tabSizes.get((_tabs$ = tabs[0]) === null || _tabs$ === void 0 ? void 0 : _tabs$.key) || DEFAULT_SIZE;
    var rightOffset = lastOffset.left + lastOffset.width;

    for (var i = 0; i < tabs.length; i += 1) {
      var key = tabs[i].key;
      var data = tabSizes.get(key); // Reuse last one when not exist yet

      if (!data) {
        var _tabs;

        data = tabSizes.get((_tabs = tabs[i - 1]) === null || _tabs === void 0 ? void 0 : _tabs.key) || DEFAULT_SIZE;
      }

      var entity = map.get(key) || (0, _objectSpread2.default)({}, data); // Right

      entity.right = rightOffset - entity.left - entity.width; // Update entity

      map.set(key, entity);
    }

    return map;
  }, [tabs.map(function (tab) {
    return tab.key;
  }).join('_'), tabSizes, holderScrollWidth]);
}
},{"@babel/runtime/helpers/esm/objectSpread2":"UKeT","react":"n8MK"}],"eQ4Y":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = useVisibleRange;

var _react = require("react");

var DEFAULT_SIZE = {
  width: 0,
  height: 0,
  left: 0,
  top: 0,
  right: 0
};

function useVisibleRange(tabOffsets, containerSize, tabContentNodeSize, addNodeSize, _ref) {
  var tabs = _ref.tabs,
      tabPosition = _ref.tabPosition,
      rtl = _ref.rtl;
  var unit;
  var position;
  var transformSize;

  if (['top', 'bottom'].includes(tabPosition)) {
    unit = 'width';
    position = rtl ? 'right' : 'left';
    transformSize = Math.abs(containerSize.left);
  } else {
    unit = 'height';
    position = 'top';
    transformSize = -containerSize.top;
  }

  var basicSize = containerSize[unit];
  var tabContentSize = tabContentNodeSize[unit];
  var addSize = addNodeSize[unit];
  var mergedBasicSize = basicSize;

  if (tabContentSize + addSize > basicSize) {
    mergedBasicSize = basicSize - addSize;
  }

  return (0, _react.useMemo)(function () {
    if (!tabs.length) {
      return [0, 0];
    }

    var len = tabs.length;
    var endIndex = len;

    for (var i = 0; i < len; i += 1) {
      var offset = tabOffsets.get(tabs[i].key) || DEFAULT_SIZE;

      if (offset[position] + offset[unit] > transformSize + mergedBasicSize) {
        endIndex = i - 1;
        break;
      }
    }

    var startIndex = 0;

    for (var _i = len - 1; _i >= 0; _i -= 1) {
      var _offset = tabOffsets.get(tabs[_i].key) || DEFAULT_SIZE;

      if (_offset[position] < transformSize) {
        startIndex = _i + 1;
        break;
      }
    }

    return [startIndex, endIndex];
  }, [tabOffsets, transformSize, mergedBasicSize, tabPosition, tabs.map(function (tab) {
    return tab.key;
  }).join('_'), rtl]);
}
},{"react":"n8MK"}],"uQ94":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Provider = exports.MiniStoreContext = void 0;

var React = _interopRequireWildcard(require("react"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var __extends = void 0 && (void 0).__extends || function () {
  var extendStatics = function (d, b) {
    extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    };

    return extendStatics(d, b);
  };

  return function (d, b) {
    extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();

var MiniStoreContext = React.createContext(null);
exports.MiniStoreContext = MiniStoreContext;

var Provider =
/** @class */
function (_super) {
  __extends(Provider, _super);

  function Provider() {
    return _super !== null && _super.apply(this, arguments) || this;
  }

  Provider.prototype.render = function () {
    return React.createElement(MiniStoreContext.Provider, {
      value: this.props.store
    }, this.props.children);
  };

  return Provider;
}(React.Component);

exports.Provider = Provider;
},{"react":"n8MK"}],"pz6A":[function(require,module,exports) {
//

module.exports = function shallowEqual(objA, objB, compare, compareContext) {
  var ret = compare ? compare.call(compareContext, objA, objB) : void 0;

  if (ret !== void 0) {
    return !!ret;
  }

  if (objA === objB) {
    return true;
  }

  if (typeof objA !== "object" || !objA || typeof objB !== "object" || !objB) {
    return false;
  }

  var keysA = Object.keys(objA);
  var keysB = Object.keys(objB);

  if (keysA.length !== keysB.length) {
    return false;
  }

  var bHasOwnProperty = Object.prototype.hasOwnProperty.bind(objB);

  // Test for A's keys different from B.
  for (var idx = 0; idx < keysA.length; idx++) {
    var key = keysA[idx];

    if (!bHasOwnProperty(key)) {
      return false;
    }

    var valueA = objA[key];
    var valueB = objB[key];

    ret = compare ? compare.call(compareContext, valueA, valueB, key) : void 0;

    if (ret === false || (ret === void 0 && valueA !== valueB)) {
      return false;
    }
  }

  return true;
};

},{}],"ElIr":[function(require,module,exports) {
'use strict';

var reactIs = require('react-is');

/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */
var REACT_STATICS = {
  childContextTypes: true,
  contextType: true,
  contextTypes: true,
  defaultProps: true,
  displayName: true,
  getDefaultProps: true,
  getDerivedStateFromError: true,
  getDerivedStateFromProps: true,
  mixins: true,
  propTypes: true,
  type: true
};
var KNOWN_STATICS = {
  name: true,
  length: true,
  prototype: true,
  caller: true,
  callee: true,
  arguments: true,
  arity: true
};
var FORWARD_REF_STATICS = {
  '$$typeof': true,
  render: true,
  defaultProps: true,
  displayName: true,
  propTypes: true
};
var MEMO_STATICS = {
  '$$typeof': true,
  compare: true,
  defaultProps: true,
  displayName: true,
  propTypes: true,
  type: true
};
var TYPE_STATICS = {};
TYPE_STATICS[reactIs.ForwardRef] = FORWARD_REF_STATICS;
TYPE_STATICS[reactIs.Memo] = MEMO_STATICS;

function getStatics(component) {
  // React v16.11 and below
  if (reactIs.isMemo(component)) {
    return MEMO_STATICS;
  } // React v16.12 and above


  return TYPE_STATICS[component['$$typeof']] || REACT_STATICS;
}

var defineProperty = Object.defineProperty;
var getOwnPropertyNames = Object.getOwnPropertyNames;
var getOwnPropertySymbols = Object.getOwnPropertySymbols;
var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
var getPrototypeOf = Object.getPrototypeOf;
var objectPrototype = Object.prototype;
function hoistNonReactStatics(targetComponent, sourceComponent, blacklist) {
  if (typeof sourceComponent !== 'string') {
    // don't hoist over string (html) components
    if (objectPrototype) {
      var inheritedComponent = getPrototypeOf(sourceComponent);

      if (inheritedComponent && inheritedComponent !== objectPrototype) {
        hoistNonReactStatics(targetComponent, inheritedComponent, blacklist);
      }
    }

    var keys = getOwnPropertyNames(sourceComponent);

    if (getOwnPropertySymbols) {
      keys = keys.concat(getOwnPropertySymbols(sourceComponent));
    }

    var targetStatics = getStatics(targetComponent);
    var sourceStatics = getStatics(sourceComponent);

    for (var i = 0; i < keys.length; ++i) {
      var key = keys[i];

      if (!KNOWN_STATICS[key] && !(blacklist && blacklist[key]) && !(sourceStatics && sourceStatics[key]) && !(targetStatics && targetStatics[key])) {
        var descriptor = getOwnPropertyDescriptor(sourceComponent, key);

        try {
          // Avoid failures from read-only properties
          defineProperty(targetComponent, key, descriptor);
        } catch (e) {}
      }
    }
  }

  return targetComponent;
}

module.exports = hoistNonReactStatics;

},{"react-is":"H1RQ"}],"fasM":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.connect = connect;

var React = _interopRequireWildcard(require("react"));

var _shallowequal = _interopRequireDefault(require("shallowequal"));

var _hoistNonReactStatics = _interopRequireDefault(require("hoist-non-react-statics"));

var _Provider = require("./Provider");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var __extends = void 0 && (void 0).__extends || function () {
  var extendStatics = function (d, b) {
    extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    };

    return extendStatics(d, b);
  };

  return function (d, b) {
    extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();

var __assign = void 0 && (void 0).__assign || function () {
  __assign = Object.assign || function (t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];

      for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
    }

    return t;
  };

  return __assign.apply(this, arguments);
};

function getDisplayName(WrappedComponent) {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}

var defaultMapStateToProps = function () {
  return {};
};

function connect(mapStateToProps, options) {
  if (options === void 0) {
    options = {};
  }

  var shouldSubscribe = !!mapStateToProps;
  var finalMapStateToProps = mapStateToProps || defaultMapStateToProps;
  return function wrapWithConnect(WrappedComponent) {
    var Connect =
    /** @class */
    function (_super) {
      __extends(Connect, _super);

      function Connect(props, context) {
        var _this = _super.call(this, props, context) || this;

        _this.unsubscribe = null;

        _this.handleChange = function () {
          if (!_this.unsubscribe) {
            return;
          }

          var nextState = finalMapStateToProps(_this.store.getState(), _this.props);

          _this.setState({
            subscribed: nextState
          });
        };

        _this.store = _this.context;
        _this.state = {
          subscribed: finalMapStateToProps(_this.store.getState(), props),
          store: _this.store,
          props: props
        };
        return _this;
      }

      Connect.getDerivedStateFromProps = function (props, prevState) {
        // using ownProps
        if (mapStateToProps && mapStateToProps.length === 2 && props !== prevState.props) {
          return {
            subscribed: finalMapStateToProps(prevState.store.getState(), props),
            props: props
          };
        }

        return {
          props: props
        };
      };

      Connect.prototype.componentDidMount = function () {
        this.trySubscribe();
      };

      Connect.prototype.componentWillUnmount = function () {
        this.tryUnsubscribe();
      };

      Connect.prototype.shouldComponentUpdate = function (nextProps, nextState) {
        return !(0, _shallowequal.default)(this.props, nextProps) || !(0, _shallowequal.default)(this.state.subscribed, nextState.subscribed);
      };

      Connect.prototype.trySubscribe = function () {
        if (shouldSubscribe) {
          this.unsubscribe = this.store.subscribe(this.handleChange);
          this.handleChange();
        }
      };

      Connect.prototype.tryUnsubscribe = function () {
        if (this.unsubscribe) {
          this.unsubscribe();
          this.unsubscribe = null;
        }
      };

      Connect.prototype.render = function () {
        var props = __assign(__assign(__assign({}, this.props), this.state.subscribed), {
          store: this.store
        });

        return React.createElement(WrappedComponent, __assign({}, props, {
          ref: this.props.miniStoreForwardedRef
        }));
      };

      Connect.displayName = "Connect(" + getDisplayName(WrappedComponent) + ")";
      Connect.contextType = _Provider.MiniStoreContext;
      return Connect;
    }(React.Component);

    if (options.forwardRef) {
      var forwarded = React.forwardRef(function (props, ref) {
        return React.createElement(Connect, __assign({}, props, {
          miniStoreForwardedRef: ref
        }));
      });
      return (0, _hoistNonReactStatics.default)(forwarded, WrappedComponent);
    }

    return (0, _hoistNonReactStatics.default)(Connect, WrappedComponent);
  };
}
},{"react":"n8MK","shallowequal":"pz6A","hoist-non-react-statics":"ElIr","./Provider":"uQ94"}],"MBcT":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.create = create;

var __assign = void 0 && (void 0).__assign || function () {
  __assign = Object.assign || function (t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];

      for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
    }

    return t;
  };

  return __assign.apply(this, arguments);
};

function create(initialState) {
  var state = initialState;
  var listeners = [];

  function setState(partial) {
    state = __assign(__assign({}, state), partial);

    for (var i = 0; i < listeners.length; i++) {
      listeners[i]();
    }
  }

  function getState() {
    return state;
  }

  function subscribe(listener) {
    listeners.push(listener);
    return function unsubscribe() {
      var index = listeners.indexOf(listener);
      listeners.splice(index, 1);
    };
  }

  return {
    setState: setState,
    getState: getState,
    subscribe: subscribe
  };
}
},{}],"vhHG":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "Provider", {
  enumerable: true,
  get: function () {
    return _Provider.Provider;
  }
});
Object.defineProperty(exports, "connect", {
  enumerable: true,
  get: function () {
    return _connect.connect;
  }
});
Object.defineProperty(exports, "create", {
  enumerable: true,
  get: function () {
    return _create.create;
  }
});

var _Provider = require("./Provider");

var _connect = require("./connect");

var _create = require("./create");
},{"./Provider":"uQ94","./connect":"fasM","./create":"MBcT"}],"P8ML":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = omit;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/esm/defineProperty"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly) symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    });
    keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};

    if (i % 2) {
      ownKeys(Object(source), true).forEach(function (key) {
        (0, _defineProperty2.default)(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }

  return target;
}

function omit(obj, fields) {
  var clone = _objectSpread({}, obj);

  if (Array.isArray(fields)) {
    fields.forEach(function (key) {
      delete clone[key];
    });
  }

  return clone;
}
},{"@babel/runtime/helpers/esm/defineProperty":"gpd2"}],"zyvd":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = createChainedFunction;

/**
 * Safe chained function
 *
 * Will only create a new function if needed,
 * otherwise will pass back existing functions or null.
 *
 * @returns {function|null}
 */
function createChainedFunction() {
  var args = [].slice.call(arguments, 0);

  if (args.length === 1) {
    return args[0];
  }

  return function chainedFunction() {
    for (var i = 0; i < args.length; i++) {
      if (args[i] && args[i].apply) {
        args[i].apply(this, arguments);
      }
    }
  };
}
},{}],"P6vN":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/esm/objectSpread2"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/esm/slicedToArray"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// MIT License from https://github.com/kaimallea/isMobile
var applePhone = /iPhone/i;
var appleIpod = /iPod/i;
var appleTablet = /iPad/i;
var androidPhone = /\bAndroid(?:.+)Mobile\b/i; // Match 'Android' AND 'Mobile'

var androidTablet = /Android/i;
var amazonPhone = /\bAndroid(?:.+)SD4930UR\b/i;
var amazonTablet = /\bAndroid(?:.+)(?:KF[A-Z]{2,4})\b/i;
var windowsPhone = /Windows Phone/i;
var windowsTablet = /\bWindows(?:.+)ARM\b/i; // Match 'Windows' AND 'ARM'

var otherBlackberry = /BlackBerry/i;
var otherBlackberry10 = /BB10/i;
var otherOpera = /Opera Mini/i;
var otherChrome = /\b(CriOS|Chrome)(?:.+)Mobile/i;
var otherFirefox = /Mobile(?:.+)Firefox\b/i; // Match 'Mobile' AND 'Firefox'

function match(regex, userAgent) {
  return regex.test(userAgent);
}

function isMobile(userAgent) {
  var ua = userAgent || (typeof navigator !== 'undefined' ? navigator.userAgent : ''); // Facebook mobile app's integrated browser adds a bunch of strings that
  // match everything. Strip it out if it exists.

  var tmp = ua.split('[FBAN');

  if (typeof tmp[1] !== 'undefined') {
    var _tmp = tmp;

    var _tmp2 = (0, _slicedToArray2.default)(_tmp, 1);

    ua = _tmp2[0];
  } // Twitter mobile app's integrated browser on iPad adds a "Twitter for
  // iPhone" string. Same probably happens on other tablet platforms.
  // This will confuse detection so strip it out if it exists.


  tmp = ua.split('Twitter');

  if (typeof tmp[1] !== 'undefined') {
    var _tmp3 = tmp;

    var _tmp4 = (0, _slicedToArray2.default)(_tmp3, 1);

    ua = _tmp4[0];
  }

  var result = {
    apple: {
      phone: match(applePhone, ua) && !match(windowsPhone, ua),
      ipod: match(appleIpod, ua),
      tablet: !match(applePhone, ua) && match(appleTablet, ua) && !match(windowsPhone, ua),
      device: (match(applePhone, ua) || match(appleIpod, ua) || match(appleTablet, ua)) && !match(windowsPhone, ua)
    },
    amazon: {
      phone: match(amazonPhone, ua),
      tablet: !match(amazonPhone, ua) && match(amazonTablet, ua),
      device: match(amazonPhone, ua) || match(amazonTablet, ua)
    },
    android: {
      phone: !match(windowsPhone, ua) && match(amazonPhone, ua) || !match(windowsPhone, ua) && match(androidPhone, ua),
      tablet: !match(windowsPhone, ua) && !match(amazonPhone, ua) && !match(androidPhone, ua) && (match(amazonTablet, ua) || match(androidTablet, ua)),
      device: !match(windowsPhone, ua) && (match(amazonPhone, ua) || match(amazonTablet, ua) || match(androidPhone, ua) || match(androidTablet, ua)) || match(/\bokhttp\b/i, ua)
    },
    windows: {
      phone: match(windowsPhone, ua),
      tablet: match(windowsTablet, ua),
      device: match(windowsPhone, ua) || match(windowsTablet, ua)
    },
    other: {
      blackberry: match(otherBlackberry, ua),
      blackberry10: match(otherBlackberry10, ua),
      opera: match(otherOpera, ua),
      firefox: match(otherFirefox, ua),
      chrome: match(otherChrome, ua),
      device: match(otherBlackberry, ua) || match(otherBlackberry10, ua) || match(otherOpera, ua) || match(otherFirefox, ua) || match(otherChrome, ua)
    },
    // Additional
    any: null,
    phone: null,
    tablet: null
  };
  result.any = result.apple.device || result.android.device || result.windows.device || result.other.device; // excludes 'other' devices and ipods, targeting touchscreen phones

  result.phone = result.apple.phone || result.android.phone || result.windows.phone;
  result.tablet = result.apple.tablet || result.android.tablet || result.windows.tablet;
  return result;
}

var defaultResult = (0, _objectSpread2.default)((0, _objectSpread2.default)({}, isMobile()), {}, {
  isMobile: isMobile
});
var _default = defaultResult;
exports.default = _default;
},{"@babel/runtime/helpers/esm/objectSpread2":"UKeT","@babel/runtime/helpers/esm/slicedToArray":"T12H"}],"OcqA":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.noop = noop;
exports.getKeyFromChildrenIndex = getKeyFromChildrenIndex;
exports.getMenuIdFromSubMenuEventKey = getMenuIdFromSubMenuEventKey;
exports.loopMenuItem = loopMenuItem;
exports.loopMenuItemRecursively = loopMenuItemRecursively;
exports.isMobileDevice = exports.setStyle = exports.getWidth = exports.menuAllProps = void 0;

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/esm/typeof"));

var React = _interopRequireWildcard(require("react"));

var _isMobile = _interopRequireDefault(require("./utils/isMobile"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function noop() {}

function getKeyFromChildrenIndex(child, menuEventKey, index) {
  var prefix = menuEventKey || '';
  return child.key || "".concat(prefix, "item_").concat(index);
}

function getMenuIdFromSubMenuEventKey(eventKey) {
  return "".concat(eventKey, "-menu-");
}

function loopMenuItem(children, cb) {
  var index = -1;
  React.Children.forEach(children, function (c) {
    index += 1;

    if (c && c.type && c.type.isMenuItemGroup) {
      React.Children.forEach(c.props.children, function (c2) {
        index += 1;
        cb(c2, index);
      });
    } else {
      cb(c, index);
    }
  });
}

function loopMenuItemRecursively(children, keys, ret) {
  /* istanbul ignore if */
  if (!children || ret.find) {
    return;
  }

  React.Children.forEach(children, function (c) {
    if (c) {
      var construct = c.type;

      if (!construct || !(construct.isSubMenu || construct.isMenuItem || construct.isMenuItemGroup)) {
        return;
      }

      if (keys.indexOf(c.key) !== -1) {
        // eslint-disable-next-line no-param-reassign
        ret.find = true;
      } else if (c.props.children) {
        loopMenuItemRecursively(c.props.children, keys, ret);
      }
    }
  });
}

var menuAllProps = ['defaultSelectedKeys', 'selectedKeys', 'defaultOpenKeys', 'openKeys', 'mode', 'getPopupContainer', 'onSelect', 'onDeselect', 'onDestroy', 'openTransitionName', 'openAnimation', 'subMenuOpenDelay', 'subMenuCloseDelay', 'forceSubMenuRender', 'triggerSubMenuAction', 'level', 'selectable', 'multiple', 'onOpenChange', 'visible', 'focusable', 'defaultActiveFirst', 'prefixCls', 'inlineIndent', 'parentMenu', 'title', 'rootPrefixCls', 'eventKey', 'active', 'onItemHover', 'onTitleMouseEnter', 'onTitleMouseLeave', 'onTitleClick', 'popupAlign', 'popupOffset', 'isOpen', 'renderMenuItem', 'manualRef', 'subMenuKey', 'disabled', 'index', 'isSelected', 'store', 'activeKey', 'builtinPlacements', 'overflowedIndicator', 'motion', // the following keys found need to be removed from test regression
'attribute', 'value', 'popupClassName', 'inlineCollapsed', 'menu', 'theme', 'itemIcon', 'expandIcon']; // ref: https://github.com/ant-design/ant-design/issues/14007
// ref: https://bugs.chromium.org/p/chromium/issues/detail?id=360889
// getBoundingClientRect return the full precision value, which is
// not the same behavior as on chrome. Set the precision to 6 to
// unify their behavior

exports.menuAllProps = menuAllProps;

var getWidth = function getWidth(elem) {
  var includeMargin = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  var width = elem && typeof elem.getBoundingClientRect === 'function' && elem.getBoundingClientRect().width;

  if (width) {
    if (includeMargin) {
      var _getComputedStyle = getComputedStyle(elem),
          marginLeft = _getComputedStyle.marginLeft,
          marginRight = _getComputedStyle.marginRight;

      width += +marginLeft.replace('px', '') + +marginRight.replace('px', '');
    }

    width = +width.toFixed(6);
  }

  return width || 0;
};

exports.getWidth = getWidth;

var setStyle = function setStyle(elem, styleProperty, value) {
  if (elem && (0, _typeof2.default)(elem.style) === 'object') {
    // eslint-disable-next-line no-param-reassign
    elem.style[styleProperty] = value;
  }
};

exports.setStyle = setStyle;

var isMobileDevice = function isMobileDevice() {
  return _isMobile.default.any;
};

exports.isMobileDevice = isMobileDevice;
},{"@babel/runtime/helpers/esm/typeof":"xLw6","react":"n8MK","./utils/isMobile":"P6vN"}],"asZT":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = contains;

function contains(root, n) {
  if (!root) {
    return false;
  }

  return root.contains(n);
}
},{}],"v9LT":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = addEventListenerWrap;

var _reactDom = _interopRequireDefault(require("react-dom"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function addEventListenerWrap(target, eventType, cb, option) {
  /* eslint camelcase: 2 */
  var callback = _reactDom.default.unstable_batchedUpdates ? function run(e) {
    _reactDom.default.unstable_batchedUpdates(cb, e);
  } : cb;

  if (target.addEventListener) {
    target.addEventListener(eventType, callback, option);
  }

  return {
    remove: function remove() {
      if (target.removeEventListener) {
        target.removeEventListener(eventType, callback);
      }
    }
  };
}
},{"react-dom":"NKHc"}],"VhF6":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = canUseDom;

function canUseDom() {
  return !!(typeof window !== 'undefined' && window.document && window.document.createElement);
}
},{}],"LoYh":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = require("react");

var _reactDom = _interopRequireDefault(require("react-dom"));

var _canUseDom = _interopRequireDefault(require("./Dom/canUseDom"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Portal = (0, _react.forwardRef)(function (props, ref) {
  var didUpdate = props.didUpdate,
      getContainer = props.getContainer,
      children = props.children;
  var containerRef = (0, _react.useRef)(); // Ref return nothing, only for wrapper check exist

  (0, _react.useImperativeHandle)(ref, function () {
    return {};
  }); // Create container in client side with sync to avoid useEffect not get ref

  var initRef = (0, _react.useRef)(false);

  if (!initRef.current && (0, _canUseDom.default)()) {
    containerRef.current = getContainer();
    initRef.current = true;
  } // [Legacy] Used by `rc-trigger`


  (0, _react.useEffect)(function () {
    didUpdate === null || didUpdate === void 0 ? void 0 : didUpdate(props);
  });
  (0, _react.useEffect)(function () {
    return function () {
      var _containerRef$current, _containerRef$current2; // [Legacy] This should not be handle by Portal but parent PortalWrapper instead.
      // Since some component use `Portal` directly, we have to keep the logic here.


      (_containerRef$current = containerRef.current) === null || _containerRef$current === void 0 ? void 0 : (_containerRef$current2 = _containerRef$current.parentNode) === null || _containerRef$current2 === void 0 ? void 0 : _containerRef$current2.removeChild(containerRef.current);
    };
  }, []);
  return containerRef.current ? _reactDom.default.createPortal(children, containerRef.current) : null;
});
var _default = Portal;
exports.default = _default;
},{"react":"n8MK","react-dom":"NKHc","./Dom/canUseDom":"VhF6"}],"Hyzp":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getAlignFromPlacement = getAlignFromPlacement;
exports.getAlignPopupClassName = getAlignPopupClassName;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/esm/objectSpread2"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function isPointsEq(a1, a2, isAlignPoint) {
  if (isAlignPoint) {
    return a1[0] === a2[0];
  }

  return a1[0] === a2[0] && a1[1] === a2[1];
}

function getAlignFromPlacement(builtinPlacements, placementStr, align) {
  var baseAlign = builtinPlacements[placementStr] || {};
  return (0, _objectSpread2.default)((0, _objectSpread2.default)({}, baseAlign), align);
}

function getAlignPopupClassName(builtinPlacements, prefixCls, align, isAlignPoint) {
  var points = align.points;
  var placements = Object.keys(builtinPlacements);

  for (var i = 0; i < placements.length; i += 1) {
    var placement = placements[i];

    if (isPointsEq(builtinPlacements[placement].points, points, isAlignPoint)) {
      return "".concat(prefixCls, "-placement-").concat(placement);
    }
  }

  return '';
}
},{"@babel/runtime/helpers/esm/objectSpread2":"UKeT"}],"m1Rl":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getVendorPrefixes = getVendorPrefixes;
exports.getVendorPrefixedEventName = getVendorPrefixedEventName;
exports.getTransitionName = getTransitionName;
exports.transitionEndName = exports.animationEndName = exports.supportTransition = void 0;

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/esm/typeof"));

var _canUseDom = _interopRequireDefault(require("rc-util/es/Dom/canUseDom"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// ================= Transition =================
// Event wrapper. Copy from react source code
function makePrefixMap(styleProp, eventName) {
  var prefixes = {};
  prefixes[styleProp.toLowerCase()] = eventName.toLowerCase();
  prefixes["Webkit".concat(styleProp)] = "webkit".concat(eventName);
  prefixes["Moz".concat(styleProp)] = "moz".concat(eventName);
  prefixes["ms".concat(styleProp)] = "MS".concat(eventName);
  prefixes["O".concat(styleProp)] = "o".concat(eventName.toLowerCase());
  return prefixes;
}

function getVendorPrefixes(domSupport, win) {
  var prefixes = {
    animationend: makePrefixMap('Animation', 'AnimationEnd'),
    transitionend: makePrefixMap('Transition', 'TransitionEnd')
  };

  if (domSupport) {
    if (!('AnimationEvent' in win)) {
      delete prefixes.animationend.animation;
    }

    if (!('TransitionEvent' in win)) {
      delete prefixes.transitionend.transition;
    }
  }

  return prefixes;
}

var vendorPrefixes = getVendorPrefixes((0, _canUseDom.default)(), typeof window !== 'undefined' ? window : {});
var style = {};

if ((0, _canUseDom.default)()) {
  var _document$createEleme = document.createElement('div');

  style = _document$createEleme.style;
}

var prefixedEventNames = {};

function getVendorPrefixedEventName(eventName) {
  if (prefixedEventNames[eventName]) {
    return prefixedEventNames[eventName];
  }

  var prefixMap = vendorPrefixes[eventName];

  if (prefixMap) {
    var stylePropList = Object.keys(prefixMap);
    var len = stylePropList.length;

    for (var i = 0; i < len; i += 1) {
      var styleProp = stylePropList[i];

      if (Object.prototype.hasOwnProperty.call(prefixMap, styleProp) && styleProp in style) {
        prefixedEventNames[eventName] = prefixMap[styleProp];
        return prefixedEventNames[eventName];
      }
    }
  }

  return '';
}

var internalAnimationEndName = getVendorPrefixedEventName('animationend');
var internalTransitionEndName = getVendorPrefixedEventName('transitionend');
var supportTransition = !!(internalAnimationEndName && internalTransitionEndName);
exports.supportTransition = supportTransition;
var animationEndName = internalAnimationEndName || 'animationend';
exports.animationEndName = animationEndName;
var transitionEndName = internalTransitionEndName || 'transitionend';
exports.transitionEndName = transitionEndName;

function getTransitionName(transitionName, transitionType) {
  if (!transitionName) return null;

  if ((0, _typeof2.default)(transitionName) === 'object') {
    var type = transitionType.replace(/-\w/g, function (match) {
      return match[1].toUpperCase();
    });
    return transitionName[type];
  }

  return "".concat(transitionName, "-").concat(transitionType);
}
},{"@babel/runtime/helpers/esm/typeof":"xLw6","rc-util/es/Dom/canUseDom":"VhF6"}],"JzRG":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.STEP_ACTIVATED = exports.STEP_ACTIVE = exports.STEP_START = exports.STEP_PREPARE = exports.STEP_NONE = exports.STATUS_LEAVE = exports.STATUS_ENTER = exports.STATUS_APPEAR = exports.STATUS_NONE = void 0;
var STATUS_NONE = 'none';
exports.STATUS_NONE = STATUS_NONE;
var STATUS_APPEAR = 'appear';
exports.STATUS_APPEAR = STATUS_APPEAR;
var STATUS_ENTER = 'enter';
exports.STATUS_ENTER = STATUS_ENTER;
var STATUS_LEAVE = 'leave';
exports.STATUS_LEAVE = STATUS_LEAVE;
var STEP_NONE = 'none';
exports.STEP_NONE = STEP_NONE;
var STEP_PREPARE = 'prepare';
exports.STEP_PREPARE = STEP_PREPARE;
var STEP_START = 'start';
exports.STEP_START = STEP_START;
var STEP_ACTIVE = 'active';
exports.STEP_ACTIVE = STEP_ACTIVE;
var STEP_ACTIVATED = 'end';
exports.STEP_ACTIVATED = STEP_ACTIVATED;
},{}],"q3ec":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = useMountStatus;

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/esm/slicedToArray"));

var _react = require("react");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function useMountStatus(defaultValue) {
  var destroyRef = (0, _react.useRef)(false);

  var _useState = (0, _react.useState)(defaultValue),
      _useState2 = (0, _slicedToArray2.default)(_useState, 2),
      val = _useState2[0],
      setVal = _useState2[1];

  function setValue(next) {
    if (!destroyRef.current) {
      setVal(next);
    }
  }

  (0, _react.useEffect)(function () {
    return function () {
      destroyRef.current = true;
    };
  }, []);
  return [val, setValue];
}
},{"@babel/runtime/helpers/esm/slicedToArray":"T12H","react":"n8MK"}],"szcY":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = require("react");

var _canUseDom = _interopRequireDefault(require("rc-util/es/Dom/canUseDom"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// It's safe to use `useLayoutEffect` but the warning is annoying
var useIsomorphicLayoutEffect = (0, _canUseDom.default)() ? _react.useLayoutEffect : _react.useEffect;
var _default = useIsomorphicLayoutEffect;
exports.default = _default;
},{"react":"n8MK","rc-util/es/Dom/canUseDom":"VhF6"}],"LIDo":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var React = _interopRequireWildcard(require("react"));

var _raf = _interopRequireDefault(require("rc-util/es/raf"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var _default = function _default() {
  var nextFrameRef = React.useRef(null);

  function cancelNextFrame() {
    _raf.default.cancel(nextFrameRef.current);
  }

  function nextFrame(callback) {
    var delay = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 2;
    cancelNextFrame();
    var nextFrameId = (0, _raf.default)(function () {
      if (delay <= 1) {
        callback({
          isCanceled: function isCanceled() {
            return nextFrameId !== nextFrameRef.current;
          }
        });
      } else {
        nextFrame(callback, delay - 1);
      }
    });
    nextFrameRef.current = nextFrameId;
  }

  React.useEffect(function () {
    return function () {
      cancelNextFrame();
    };
  }, []);
  return [nextFrame, cancelNextFrame];
};

exports.default = _default;
},{"react":"n8MK","rc-util/es/raf":"adDJ"}],"hnmF":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isActive = isActive;
exports.default = exports.DoStep = exports.SkipStep = void 0;

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/esm/slicedToArray"));

var React = _interopRequireWildcard(require("react"));

var _interface = require("../interface");

var _useIsomorphicLayoutEffect = _interopRequireDefault(require("./useIsomorphicLayoutEffect"));

var _useNextFrame3 = _interopRequireDefault(require("./useNextFrame"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var STEP_QUEUE = [_interface.STEP_PREPARE, _interface.STEP_START, _interface.STEP_ACTIVE, _interface.STEP_ACTIVATED];
/** Skip current step */

var SkipStep = false;
/** Current step should be update in */

exports.SkipStep = SkipStep;
var DoStep = true;
exports.DoStep = DoStep;

function isActive(step) {
  return step === _interface.STEP_ACTIVE || step === _interface.STEP_ACTIVATED;
}

var _default = function _default(status, callback) {
  var _React$useState = React.useState(_interface.STEP_NONE),
      _React$useState2 = (0, _slicedToArray2.default)(_React$useState, 2),
      step = _React$useState2[0],
      setStep = _React$useState2[1];

  var _useNextFrame = (0, _useNextFrame3.default)(),
      _useNextFrame2 = (0, _slicedToArray2.default)(_useNextFrame, 2),
      nextFrame = _useNextFrame2[0],
      cancelNextFrame = _useNextFrame2[1];

  function startQueue() {
    setStep(_interface.STEP_PREPARE);
  }

  (0, _useIsomorphicLayoutEffect.default)(function () {
    if (step !== _interface.STEP_NONE && step !== _interface.STEP_ACTIVATED) {
      var index = STEP_QUEUE.indexOf(step);
      var nextStep = STEP_QUEUE[index + 1];
      var result = callback(step);

      if (result === SkipStep) {
        // Skip when no needed
        setStep(nextStep);
      } else {
        // Do as frame for step update
        nextFrame(function (info) {
          function doNext() {
            // Skip since current queue is ood
            if (info.isCanceled()) return;
            setStep(nextStep);
          }

          if (result === true) {
            doNext();
          } else {
            // Only promise should be async
            Promise.resolve(result).then(doNext);
          }
        });
      }
    }
  }, [status, step]);
  React.useEffect(function () {
    return function () {
      cancelNextFrame();
    };
  }, []);
  return [startQueue, step];
};

exports.default = _default;
},{"@babel/runtime/helpers/esm/slicedToArray":"T12H","react":"n8MK","../interface":"JzRG","./useIsomorphicLayoutEffect":"szcY","./useNextFrame":"LIDo"}],"UjUO":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var React = _interopRequireWildcard(require("react"));

var _motion = require("../util/motion");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var _default = function _default(callback) {
  var cacheElementRef = (0, React.useRef)(); // Cache callback

  var callbackRef = (0, React.useRef)(callback);
  callbackRef.current = callback; // Internal motion event handler

  var onInternalMotionEnd = React.useCallback(function (event) {
    callbackRef.current(event);
  }, []); // Remove events

  function removeMotionEvents(element) {
    if (element) {
      element.removeEventListener(_motion.transitionEndName, onInternalMotionEnd);
      element.removeEventListener(_motion.animationEndName, onInternalMotionEnd);
    }
  } // Patch events


  function patchMotionEvents(element) {
    if (cacheElementRef.current && cacheElementRef.current !== element) {
      removeMotionEvents(cacheElementRef.current);
    }

    if (element && element !== cacheElementRef.current) {
      element.addEventListener(_motion.transitionEndName, onInternalMotionEnd);
      element.addEventListener(_motion.animationEndName, onInternalMotionEnd); // Save as cache in case dom removed trigger by `motionDeadline`

      cacheElementRef.current = element;
    }
  } // Clean up when removed


  React.useEffect(function () {
    return function () {
      removeMotionEvents(cacheElementRef.current);
    };
  }, []);
  return [patchMotionEvents, removeMotionEvents];
};

exports.default = _default;
},{"react":"n8MK","../util/motion":"m1Rl"}],"mvOU":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = useStatus;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/esm/objectSpread2"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/esm/defineProperty"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/esm/slicedToArray"));

var React = _interopRequireWildcard(require("react"));

var _interface = require("../interface");

var _useState7 = _interopRequireDefault(require("./useState"));

var _useIsomorphicLayoutEffect = _interopRequireDefault(require("./useIsomorphicLayoutEffect"));

var _useStepQueue3 = _interopRequireWildcard(require("./useStepQueue"));

var _useDomMotionEvents3 = _interopRequireDefault(require("./useDomMotionEvents"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function useStatus(supportMotion, visible, getElement, _ref) {
  var _ref$motionEnter = _ref.motionEnter,
      motionEnter = _ref$motionEnter === void 0 ? true : _ref$motionEnter,
      _ref$motionAppear = _ref.motionAppear,
      motionAppear = _ref$motionAppear === void 0 ? true : _ref$motionAppear,
      _ref$motionLeave = _ref.motionLeave,
      motionLeave = _ref$motionLeave === void 0 ? true : _ref$motionLeave,
      motionDeadline = _ref.motionDeadline,
      motionLeaveImmediately = _ref.motionLeaveImmediately,
      onAppearPrepare = _ref.onAppearPrepare,
      onEnterPrepare = _ref.onEnterPrepare,
      onLeavePrepare = _ref.onLeavePrepare,
      onAppearStart = _ref.onAppearStart,
      onEnterStart = _ref.onEnterStart,
      onLeaveStart = _ref.onLeaveStart,
      onAppearActive = _ref.onAppearActive,
      onEnterActive = _ref.onEnterActive,
      onLeaveActive = _ref.onLeaveActive,
      onAppearEnd = _ref.onAppearEnd,
      onEnterEnd = _ref.onEnterEnd,
      onLeaveEnd = _ref.onLeaveEnd,
      onVisibleChanged = _ref.onVisibleChanged; // Used for outer render usage to avoid `visible: false & status: none` to render nothing

  var _useState = (0, _useState7.default)(),
      _useState2 = (0, _slicedToArray2.default)(_useState, 2),
      asyncVisible = _useState2[0],
      setAsyncVisible = _useState2[1];

  var _useState3 = (0, _useState7.default)(_interface.STATUS_NONE),
      _useState4 = (0, _slicedToArray2.default)(_useState3, 2),
      status = _useState4[0],
      setStatus = _useState4[1];

  var _useState5 = (0, _useState7.default)(null),
      _useState6 = (0, _slicedToArray2.default)(_useState5, 2),
      style = _useState6[0],
      setStyle = _useState6[1];

  var mountedRef = (0, React.useRef)(false);
  var deadlineRef = (0, React.useRef)(null);
  var destroyedRef = (0, React.useRef)(false); // =========================== Dom Node ===========================

  var cacheElementRef = (0, React.useRef)(null);

  function getDomElement() {
    var element = getElement();
    return element || cacheElementRef.current;
  } // ========================== Motion End ==========================


  var activeRef = (0, React.useRef)(false);

  function onInternalMotionEnd(event) {
    var element = getDomElement();

    if (event && !event.deadline && event.target !== element) {
      // event exists
      // not initiated by deadline
      // transitionEnd not fired by inner elements
      return;
    }

    var canEnd;

    if (status === _interface.STATUS_APPEAR && activeRef.current) {
      canEnd = onAppearEnd === null || onAppearEnd === void 0 ? void 0 : onAppearEnd(element, event);
    } else if (status === _interface.STATUS_ENTER && activeRef.current) {
      canEnd = onEnterEnd === null || onEnterEnd === void 0 ? void 0 : onEnterEnd(element, event);
    } else if (status === _interface.STATUS_LEAVE && activeRef.current) {
      canEnd = onLeaveEnd === null || onLeaveEnd === void 0 ? void 0 : onLeaveEnd(element, event);
    } // Only update status when `canEnd` and not destroyed


    if (canEnd !== false && !destroyedRef.current) {
      setStatus(_interface.STATUS_NONE);
      setStyle(null);
    }
  }

  var _useDomMotionEvents = (0, _useDomMotionEvents3.default)(onInternalMotionEnd),
      _useDomMotionEvents2 = (0, _slicedToArray2.default)(_useDomMotionEvents, 1),
      patchMotionEvents = _useDomMotionEvents2[0]; // ============================= Step =============================


  var eventHandlers = React.useMemo(function () {
    var _ref2, _ref3, _ref4;

    switch (status) {
      case 'appear':
        return _ref2 = {}, (0, _defineProperty2.default)(_ref2, _interface.STEP_PREPARE, onAppearPrepare), (0, _defineProperty2.default)(_ref2, _interface.STEP_START, onAppearStart), (0, _defineProperty2.default)(_ref2, _interface.STEP_ACTIVE, onAppearActive), _ref2;

      case 'enter':
        return _ref3 = {}, (0, _defineProperty2.default)(_ref3, _interface.STEP_PREPARE, onEnterPrepare), (0, _defineProperty2.default)(_ref3, _interface.STEP_START, onEnterStart), (0, _defineProperty2.default)(_ref3, _interface.STEP_ACTIVE, onEnterActive), _ref3;

      case 'leave':
        return _ref4 = {}, (0, _defineProperty2.default)(_ref4, _interface.STEP_PREPARE, onLeavePrepare), (0, _defineProperty2.default)(_ref4, _interface.STEP_START, onLeaveStart), (0, _defineProperty2.default)(_ref4, _interface.STEP_ACTIVE, onLeaveActive), _ref4;

      default:
        return {};
    }
  }, [status]);

  var _useStepQueue = (0, _useStepQueue3.default)(status, function (newStep) {
    // Only prepare step can be skip
    if (newStep === _interface.STEP_PREPARE) {
      var onPrepare = eventHandlers[_interface.STEP_PREPARE];

      if (!onPrepare) {
        return _useStepQueue3.SkipStep;
      }

      return onPrepare(getDomElement());
    } // Rest step is sync update


    if (step in eventHandlers) {
      var _eventHandlers$step;

      setStyle(((_eventHandlers$step = eventHandlers[step]) === null || _eventHandlers$step === void 0 ? void 0 : _eventHandlers$step.call(eventHandlers, getDomElement(), null)) || null);
    }

    if (step === _interface.STEP_ACTIVE) {
      // Patch events when motion needed
      patchMotionEvents(getDomElement());

      if (motionDeadline > 0) {
        clearTimeout(deadlineRef.current);
        deadlineRef.current = setTimeout(function () {
          onInternalMotionEnd({
            deadline: true
          });
        }, motionDeadline);
      }
    }

    return _useStepQueue3.DoStep;
  }),
      _useStepQueue2 = (0, _slicedToArray2.default)(_useStepQueue, 2),
      startStep = _useStepQueue2[0],
      step = _useStepQueue2[1];

  var active = (0, _useStepQueue3.isActive)(step);
  activeRef.current = active; // ============================ Status ============================
  // Update with new status

  (0, _useIsomorphicLayoutEffect.default)(function () {
    setAsyncVisible(visible);

    if (!supportMotion) {
      return;
    }

    var isMounted = mountedRef.current;
    mountedRef.current = true;
    var nextStatus; // Appear

    if (!isMounted && visible && motionAppear) {
      nextStatus = _interface.STATUS_APPEAR;
    } // Enter


    if (isMounted && visible && motionEnter) {
      nextStatus = _interface.STATUS_ENTER;
    } // Leave


    if (isMounted && !visible && motionLeave || !isMounted && motionLeaveImmediately && !visible && motionLeave) {
      nextStatus = _interface.STATUS_LEAVE;
    } // Update to next status


    if (nextStatus) {
      setStatus(nextStatus);
      startStep();
    }
  }, [visible]); // ============================ Effect ============================
  // Reset when motion changed

  (0, React.useEffect)(function () {
    if ( // Cancel appear
    status === _interface.STATUS_APPEAR && !motionAppear || // Cancel enter
    status === _interface.STATUS_ENTER && !motionEnter || // Cancel leave
    status === _interface.STATUS_LEAVE && !motionLeave) {
      setStatus(_interface.STATUS_NONE);
    }
  }, [motionAppear, motionEnter, motionLeave]);
  (0, React.useEffect)(function () {
    return function () {
      clearTimeout(deadlineRef.current);
      destroyedRef.current = true;
    };
  }, []); // Trigger `onVisibleChanged`

  (0, React.useEffect)(function () {
    if (asyncVisible !== undefined && status === _interface.STATUS_NONE) {
      onVisibleChanged === null || onVisibleChanged === void 0 ? void 0 : onVisibleChanged(asyncVisible);
    }
  }, [asyncVisible, status]); // ============================ Styles ============================

  var mergedStyle = style;

  if (eventHandlers[_interface.STEP_PREPARE] && step === _interface.STEP_START) {
    mergedStyle = (0, _objectSpread2.default)({
      transition: 'none'
    }, mergedStyle);
  }

  return [status, step, mergedStyle, asyncVisible !== null && asyncVisible !== void 0 ? asyncVisible : visible];
}
},{"@babel/runtime/helpers/esm/objectSpread2":"UKeT","@babel/runtime/helpers/esm/defineProperty":"gpd2","@babel/runtime/helpers/esm/slicedToArray":"T12H","react":"n8MK","../interface":"JzRG","./useState":"q3ec","./useIsomorphicLayoutEffect":"szcY","./useStepQueue":"hnmF","./useDomMotionEvents":"UjUO"}],"FYGt":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/esm/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/esm/createClass"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/esm/inherits"));

var _createSuper2 = _interopRequireDefault(require("@babel/runtime/helpers/esm/createSuper"));

var React = _interopRequireWildcard(require("react"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DomWrapper = /*#__PURE__*/function (_React$Component) {
  (0, _inherits2.default)(DomWrapper, _React$Component);

  var _super = (0, _createSuper2.default)(DomWrapper);

  function DomWrapper() {
    (0, _classCallCheck2.default)(this, DomWrapper);
    return _super.apply(this, arguments);
  }

  (0, _createClass2.default)(DomWrapper, [{
    key: "render",
    value: function render() {
      return this.props.children;
    }
  }]);
  return DomWrapper;
}(React.Component);

var _default = DomWrapper;
exports.default = _default;
},{"@babel/runtime/helpers/esm/classCallCheck":"VEjx","@babel/runtime/helpers/esm/createClass":"l5p4","@babel/runtime/helpers/esm/inherits":"NT06","@babel/runtime/helpers/esm/createSuper":"m5aa","react":"n8MK"}],"LFCw":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.genCSSMotion = genCSSMotion;
exports.default = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/esm/defineProperty"));

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/esm/objectSpread2"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/esm/slicedToArray"));

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/esm/typeof"));

var React = _interopRequireWildcard(require("react"));

var _findDOMNode = _interopRequireDefault(require("rc-util/es/Dom/findDOMNode"));

var _ref = require("rc-util/es/ref");

var _classnames = _interopRequireDefault(require("classnames"));

var _motion = require("./util/motion");

var _interface = require("./interface");

var _useStatus3 = _interopRequireDefault(require("./hooks/useStatus"));

var _DomWrapper = _interopRequireDefault(require("./DomWrapper"));

var _useStepQueue = require("./hooks/useStepQueue");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable react/default-props-match-prop-types, react/no-multi-comp, react/prop-types */

/**
 * `transitionSupport` is used for none transition test case.
 * Default we use browser transition event support check.
 */
function genCSSMotion(config) {
  var transitionSupport = config;

  if ((0, _typeof2.default)(config) === 'object') {
    transitionSupport = config.transitionSupport;
  }

  function isSupportTransition(props) {
    return !!(props.motionName && transitionSupport);
  }

  var CSSMotion = /*#__PURE__*/React.forwardRef(function (props, ref) {
    var _props$visible = props.visible,
        visible = _props$visible === void 0 ? true : _props$visible,
        _props$removeOnLeave = props.removeOnLeave,
        removeOnLeave = _props$removeOnLeave === void 0 ? true : _props$removeOnLeave,
        forceRender = props.forceRender,
        children = props.children,
        motionName = props.motionName,
        leavedClassName = props.leavedClassName,
        eventProps = props.eventProps;
    var supportMotion = isSupportTransition(props); // Ref to the react node, it may be a HTMLElement

    var nodeRef = (0, React.useRef)(); // Ref to the dom wrapper in case ref can not pass to HTMLElement

    var wrapperNodeRef = (0, React.useRef)();

    function getDomElement() {
      try {
        return (0, _findDOMNode.default)(nodeRef.current || wrapperNodeRef.current);
      } catch (e) {
        // Only happen when `motionDeadline` trigger but element removed.
        return null;
      }
    }

    var _useStatus = (0, _useStatus3.default)(supportMotion, visible, getDomElement, props),
        _useStatus2 = (0, _slicedToArray2.default)(_useStatus, 4),
        status = _useStatus2[0],
        statusStep = _useStatus2[1],
        statusStyle = _useStatus2[2],
        mergedVisible = _useStatus2[3]; // ====================== Refs ======================


    var originRef = (0, React.useRef)(ref);
    originRef.current = ref;
    var setNodeRef = React.useCallback(function (node) {
      nodeRef.current = node;
      (0, _ref.fillRef)(originRef.current, node);
    }, []); // ===================== Render =====================

    var motionChildren;
    var mergedProps = (0, _objectSpread2.default)((0, _objectSpread2.default)({}, eventProps), {}, {
      visible: visible
    });

    if (!children) {
      // No children
      motionChildren = null;
    } else if (status === _interface.STATUS_NONE || !isSupportTransition(props)) {
      // Stable children
      if (mergedVisible) {
        motionChildren = children((0, _objectSpread2.default)({}, mergedProps), setNodeRef);
      } else if (!removeOnLeave) {
        motionChildren = children((0, _objectSpread2.default)((0, _objectSpread2.default)({}, mergedProps), {}, {
          className: leavedClassName
        }), setNodeRef);
      } else if (forceRender) {
        motionChildren = children((0, _objectSpread2.default)((0, _objectSpread2.default)({}, mergedProps), {}, {
          style: {
            display: 'none'
          }
        }), setNodeRef);
      } else {
        motionChildren = null;
      }
    } else {
      var _classNames; // In motion


      var statusSuffix;

      if (statusStep === _interface.STEP_PREPARE) {
        statusSuffix = 'prepare';
      } else if ((0, _useStepQueue.isActive)(statusStep)) {
        statusSuffix = 'active';
      } else if (statusStep === _interface.STEP_START) {
        statusSuffix = 'start';
      }

      motionChildren = children((0, _objectSpread2.default)((0, _objectSpread2.default)({}, mergedProps), {}, {
        className: (0, _classnames.default)((0, _motion.getTransitionName)(motionName, status), (_classNames = {}, (0, _defineProperty2.default)(_classNames, (0, _motion.getTransitionName)(motionName, "".concat(status, "-").concat(statusSuffix)), statusSuffix), (0, _defineProperty2.default)(_classNames, motionName, typeof motionName === 'string'), _classNames)),
        style: statusStyle
      }), setNodeRef);
    }

    return /*#__PURE__*/React.createElement(_DomWrapper.default, {
      ref: wrapperNodeRef
    }, motionChildren);
  });
  CSSMotion.displayName = 'CSSMotion';
  return CSSMotion;
}

var _default = genCSSMotion(_motion.supportTransition);

exports.default = _default;
},{"@babel/runtime/helpers/esm/defineProperty":"gpd2","@babel/runtime/helpers/esm/objectSpread2":"UKeT","@babel/runtime/helpers/esm/slicedToArray":"T12H","@babel/runtime/helpers/esm/typeof":"xLw6","react":"n8MK","rc-util/es/Dom/findDOMNode":"beML","rc-util/es/ref":"AOnv","classnames":"qb7c","./util/motion":"m1Rl","./interface":"JzRG","./hooks/useStatus":"mvOU","./DomWrapper":"FYGt","./hooks/useStepQueue":"hnmF"}],"cJs0":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.wrapKeyToObject = wrapKeyToObject;
exports.parseKeys = parseKeys;
exports.diffKeys = diffKeys;
exports.STATUS_REMOVED = exports.STATUS_REMOVE = exports.STATUS_KEEP = exports.STATUS_ADD = void 0;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/esm/objectSpread2"));

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/esm/typeof"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var STATUS_ADD = 'add';
exports.STATUS_ADD = STATUS_ADD;
var STATUS_KEEP = 'keep';
exports.STATUS_KEEP = STATUS_KEEP;
var STATUS_REMOVE = 'remove';
exports.STATUS_REMOVE = STATUS_REMOVE;
var STATUS_REMOVED = 'removed';
exports.STATUS_REMOVED = STATUS_REMOVED;

function wrapKeyToObject(key) {
  var keyObj;

  if (key && (0, _typeof2.default)(key) === 'object' && 'key' in key) {
    keyObj = key;
  } else {
    keyObj = {
      key: key
    };
  }

  return (0, _objectSpread2.default)((0, _objectSpread2.default)({}, keyObj), {}, {
    key: String(keyObj.key)
  });
}

function parseKeys() {
  var keys = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  return keys.map(wrapKeyToObject);
}

function diffKeys() {
  var prevKeys = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var currentKeys = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  var list = [];
  var currentIndex = 0;
  var currentLen = currentKeys.length;
  var prevKeyObjects = parseKeys(prevKeys);
  var currentKeyObjects = parseKeys(currentKeys); // Check prev keys to insert or keep

  prevKeyObjects.forEach(function (keyObj) {
    var hit = false;

    for (var i = currentIndex; i < currentLen; i += 1) {
      var currentKeyObj = currentKeyObjects[i];

      if (currentKeyObj.key === keyObj.key) {
        // New added keys should add before current key
        if (currentIndex < i) {
          list = list.concat(currentKeyObjects.slice(currentIndex, i).map(function (obj) {
            return (0, _objectSpread2.default)((0, _objectSpread2.default)({}, obj), {}, {
              status: STATUS_ADD
            });
          }));
          currentIndex = i;
        }

        list.push((0, _objectSpread2.default)((0, _objectSpread2.default)({}, currentKeyObj), {}, {
          status: STATUS_KEEP
        }));
        currentIndex += 1;
        hit = true;
        break;
      }
    } // If not hit, it means key is removed


    if (!hit) {
      list.push((0, _objectSpread2.default)((0, _objectSpread2.default)({}, keyObj), {}, {
        status: STATUS_REMOVE
      }));
    }
  }); // Add rest to the list

  if (currentIndex < currentLen) {
    list = list.concat(currentKeyObjects.slice(currentIndex).map(function (obj) {
      return (0, _objectSpread2.default)((0, _objectSpread2.default)({}, obj), {}, {
        status: STATUS_ADD
      });
    }));
  }
  /**
   * Merge same key when it remove and add again:
   *    [1 - add, 2 - keep, 1 - remove] -> [1 - keep, 2 - keep]
   */


  var keys = {};
  list.forEach(function (_ref) {
    var key = _ref.key;
    keys[key] = (keys[key] || 0) + 1;
  });
  var duplicatedKeys = Object.keys(keys).filter(function (key) {
    return keys[key] > 1;
  });
  duplicatedKeys.forEach(function (matchKey) {
    // Remove `STATUS_REMOVE` node.
    list = list.filter(function (_ref2) {
      var key = _ref2.key,
          status = _ref2.status;
      return key !== matchKey || status !== STATUS_REMOVE;
    }); // Update `STATUS_ADD` to `STATUS_KEEP`

    list.forEach(function (node) {
      if (node.key === matchKey) {
        // eslint-disable-next-line no-param-reassign
        node.status = STATUS_KEEP;
      }
    });
  });
  return list;
}
},{"@babel/runtime/helpers/esm/objectSpread2":"UKeT","@babel/runtime/helpers/esm/typeof":"xLw6"}],"sbm5":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.genCSSMotionList = genCSSMotionList;
exports.default = void 0;

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/esm/objectWithoutProperties"));

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/esm/objectSpread2"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/esm/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/esm/createClass"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/esm/inherits"));

var _createSuper2 = _interopRequireDefault(require("@babel/runtime/helpers/esm/createSuper"));

var React = _interopRequireWildcard(require("react"));

var _CSSMotion = _interopRequireDefault(require("./CSSMotion"));

var _motion = require("./util/motion");

var _diff = require("./util/diff");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint react/prop-types: 0 */
var MOTION_PROP_NAMES = ['eventProps', 'visible', 'children', 'motionName', 'motionAppear', 'motionEnter', 'motionLeave', 'motionLeaveImmediately', 'motionDeadline', 'removeOnLeave', 'leavedClassName', 'onAppearStart', 'onAppearActive', 'onAppearEnd', 'onEnterStart', 'onEnterActive', 'onEnterEnd', 'onLeaveStart', 'onLeaveActive', 'onLeaveEnd'];
/**
 * Generate a CSSMotionList component with config
 * @param transitionSupport No need since CSSMotionList no longer depends on transition support
 * @param CSSMotion CSSMotion component
 */

function genCSSMotionList(transitionSupport) {
  var CSSMotion = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _CSSMotion.default;

  var CSSMotionList = /*#__PURE__*/function (_React$Component) {
    (0, _inherits2.default)(CSSMotionList, _React$Component);

    var _super = (0, _createSuper2.default)(CSSMotionList);

    function CSSMotionList() {
      var _this;

      (0, _classCallCheck2.default)(this, CSSMotionList);
      _this = _super.apply(this, arguments);
      _this.state = {
        keyEntities: []
      };

      _this.removeKey = function (removeKey) {
        _this.setState(function (_ref) {
          var keyEntities = _ref.keyEntities;
          return {
            keyEntities: keyEntities.map(function (entity) {
              if (entity.key !== removeKey) return entity;
              return (0, _objectSpread2.default)((0, _objectSpread2.default)({}, entity), {}, {
                status: _diff.STATUS_REMOVED
              });
            })
          };
        });
      };

      return _this;
    }

    (0, _createClass2.default)(CSSMotionList, [{
      key: "render",
      value: function render() {
        var _this2 = this;

        var keyEntities = this.state.keyEntities;
        var _this$props = this.props,
            component = _this$props.component,
            children = _this$props.children,
            _onVisibleChanged = _this$props.onVisibleChanged,
            restProps = (0, _objectWithoutProperties2.default)(_this$props, ["component", "children", "onVisibleChanged"]);
        var Component = component || React.Fragment;
        var motionProps = {};
        MOTION_PROP_NAMES.forEach(function (prop) {
          motionProps[prop] = restProps[prop];
          delete restProps[prop];
        });
        delete restProps.keys;
        return /*#__PURE__*/React.createElement(Component, Object.assign({}, restProps), keyEntities.map(function (_ref2) {
          var status = _ref2.status,
              eventProps = (0, _objectWithoutProperties2.default)(_ref2, ["status"]);
          var visible = status === _diff.STATUS_ADD || status === _diff.STATUS_KEEP;
          return /*#__PURE__*/React.createElement(CSSMotion, Object.assign({}, motionProps, {
            key: eventProps.key,
            visible: visible,
            eventProps: eventProps,
            onVisibleChanged: function onVisibleChanged(changedVisible) {
              _onVisibleChanged === null || _onVisibleChanged === void 0 ? void 0 : _onVisibleChanged(changedVisible, {
                key: eventProps.key
              });

              if (!changedVisible) {
                _this2.removeKey(eventProps.key);
              }
            }
          }), children);
        }));
      }
    }], [{
      key: "getDerivedStateFromProps",
      value: function getDerivedStateFromProps(_ref3, _ref4) {
        var keys = _ref3.keys;
        var keyEntities = _ref4.keyEntities;
        var parsedKeyObjects = (0, _diff.parseKeys)(keys);
        var mixedKeyEntities = (0, _diff.diffKeys)(keyEntities, parsedKeyObjects);
        return {
          keyEntities: mixedKeyEntities.filter(function (entity) {
            var prevEntity = keyEntities.find(function (_ref5) {
              var key = _ref5.key;
              return entity.key === key;
            }); // Remove if already mark as removed

            if (prevEntity && prevEntity.status === _diff.STATUS_REMOVED && entity.status === _diff.STATUS_REMOVE) {
              return false;
            }

            return true;
          })
        };
      }
    }]);
    return CSSMotionList;
  }(React.Component);

  CSSMotionList.defaultProps = {
    component: 'div'
  };
  return CSSMotionList;
}

var _default = genCSSMotionList(_motion.supportTransition);

exports.default = _default;
},{"@babel/runtime/helpers/esm/objectWithoutProperties":"tuNH","@babel/runtime/helpers/esm/objectSpread2":"UKeT","@babel/runtime/helpers/esm/classCallCheck":"VEjx","@babel/runtime/helpers/esm/createClass":"l5p4","@babel/runtime/helpers/esm/inherits":"NT06","@babel/runtime/helpers/esm/createSuper":"m5aa","react":"n8MK","./CSSMotion":"LFCw","./util/motion":"m1Rl","./util/diff":"cJs0"}],"VTMl":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "CSSMotionList", {
  enumerable: true,
  get: function () {
    return _CSSMotionList.default;
  }
});
exports.default = void 0;

var _CSSMotion = _interopRequireDefault(require("./CSSMotion"));

var _CSSMotionList = _interopRequireDefault(require("./CSSMotionList"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = _CSSMotion.default;
exports.default = _default;
},{"./CSSMotion":"LFCw","./CSSMotionList":"sbm5"}],"uFoq":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getMotion = getMotion;

function getMotion(_ref) {
  var prefixCls = _ref.prefixCls,
      motion = _ref.motion,
      animation = _ref.animation,
      transitionName = _ref.transitionName;

  if (motion) {
    return motion;
  }

  if (animation) {
    return {
      motionName: "".concat(prefixCls, "-").concat(animation)
    };
  }

  if (transitionName) {
    return {
      motionName: transitionName
    };
  }

  return null;
}
},{}],"haQR":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Mask;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/esm/objectSpread2"));

var React = _interopRequireWildcard(require("react"));

var _classnames = _interopRequireDefault(require("classnames"));

var _rcMotion = _interopRequireDefault(require("rc-motion"));

var _legacyUtil = require("../utils/legacyUtil");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Mask(props) {
  var prefixCls = props.prefixCls,
      visible = props.visible,
      zIndex = props.zIndex,
      mask = props.mask,
      maskMotion = props.maskMotion,
      maskAnimation = props.maskAnimation,
      maskTransitionName = props.maskTransitionName;

  if (!mask) {
    return null;
  }

  var motion = {};

  if (maskMotion || maskTransitionName || maskAnimation) {
    motion = (0, _objectSpread2.default)({
      motionAppear: true
    }, (0, _legacyUtil.getMotion)({
      motion: maskMotion,
      prefixCls: prefixCls,
      transitionName: maskTransitionName,
      animation: maskAnimation
    }));
  }

  return /*#__PURE__*/React.createElement(_rcMotion.default, Object.assign({}, motion, {
    visible: visible,
    removeOnLeave: true
  }), function (_ref) {
    var className = _ref.className;
    return /*#__PURE__*/React.createElement("div", {
      style: {
        zIndex: zIndex
      },
      className: (0, _classnames.default)("".concat(prefixCls, "-mask"), className)
    });
  });
}
},{"@babel/runtime/helpers/esm/objectSpread2":"UKeT","react":"n8MK","classnames":"qb7c","rc-motion":"VTMl","../utils/legacyUtil":"uFoq"}],"dPHJ":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _default = function _default(element) {
  if (!element) {
    return false;
  }

  if (element.offsetParent) {
    return true;
  }

  if (element.getBBox) {
    var box = element.getBBox();

    if (box.width || box.height) {
      return true;
    }
  }

  if (element.getBoundingClientRect) {
    var _box = element.getBoundingClientRect();

    if (_box.width || _box.height) {
      return true;
    }
  }

  return false;
};

exports.default = _default;
},{}],"mIcA":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.alignElement = alignElement;
exports.alignPoint = alignPoint;
exports.default = void 0;

function _typeof(obj) {
  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function (obj) {
      return typeof obj;
    };
  } else {
    _typeof = function (obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }

  return _typeof(obj);
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly) symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    });
    keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};

    if (i % 2) {
      ownKeys(source, true).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(source).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }

  return target;
}

var vendorPrefix;
var jsCssMap = {
  Webkit: '-webkit-',
  Moz: '-moz-',
  // IE did it wrong again ...
  ms: '-ms-',
  O: '-o-'
};

function getVendorPrefix() {
  if (vendorPrefix !== undefined) {
    return vendorPrefix;
  }

  vendorPrefix = '';
  var style = document.createElement('p').style;
  var testProp = 'Transform';

  for (var key in jsCssMap) {
    if (key + testProp in style) {
      vendorPrefix = key;
    }
  }

  return vendorPrefix;
}

function getTransitionName() {
  return getVendorPrefix() ? "".concat(getVendorPrefix(), "TransitionProperty") : 'transitionProperty';
}

function getTransformName() {
  return getVendorPrefix() ? "".concat(getVendorPrefix(), "Transform") : 'transform';
}

function setTransitionProperty(node, value) {
  var name = getTransitionName();

  if (name) {
    node.style[name] = value;

    if (name !== 'transitionProperty') {
      node.style.transitionProperty = value;
    }
  }
}

function setTransform(node, value) {
  var name = getTransformName();

  if (name) {
    node.style[name] = value;

    if (name !== 'transform') {
      node.style.transform = value;
    }
  }
}

function getTransitionProperty(node) {
  return node.style.transitionProperty || node.style[getTransitionName()];
}

function getTransformXY(node) {
  var style = window.getComputedStyle(node, null);
  var transform = style.getPropertyValue('transform') || style.getPropertyValue(getTransformName());

  if (transform && transform !== 'none') {
    var matrix = transform.replace(/[^0-9\-.,]/g, '').split(',');
    return {
      x: parseFloat(matrix[12] || matrix[4], 0),
      y: parseFloat(matrix[13] || matrix[5], 0)
    };
  }

  return {
    x: 0,
    y: 0
  };
}

var matrix2d = /matrix\((.*)\)/;
var matrix3d = /matrix3d\((.*)\)/;

function setTransformXY(node, xy) {
  var style = window.getComputedStyle(node, null);
  var transform = style.getPropertyValue('transform') || style.getPropertyValue(getTransformName());

  if (transform && transform !== 'none') {
    var arr;
    var match2d = transform.match(matrix2d);

    if (match2d) {
      match2d = match2d[1];
      arr = match2d.split(',').map(function (item) {
        return parseFloat(item, 10);
      });
      arr[4] = xy.x;
      arr[5] = xy.y;
      setTransform(node, "matrix(".concat(arr.join(','), ")"));
    } else {
      var match3d = transform.match(matrix3d)[1];
      arr = match3d.split(',').map(function (item) {
        return parseFloat(item, 10);
      });
      arr[12] = xy.x;
      arr[13] = xy.y;
      setTransform(node, "matrix3d(".concat(arr.join(','), ")"));
    }
  } else {
    setTransform(node, "translateX(".concat(xy.x, "px) translateY(").concat(xy.y, "px) translateZ(0)"));
  }
}

var RE_NUM = /[\-+]?(?:\d*\.|)\d+(?:[eE][\-+]?\d+|)/.source;
var getComputedStyleX; // https://stackoverflow.com/a/3485654/3040605

function forceRelayout(elem) {
  var originalStyle = elem.style.display;
  elem.style.display = 'none';
  elem.offsetHeight; // eslint-disable-line

  elem.style.display = originalStyle;
}

function css(el, name, v) {
  var value = v;

  if (_typeof(name) === 'object') {
    for (var i in name) {
      if (name.hasOwnProperty(i)) {
        css(el, i, name[i]);
      }
    }

    return undefined;
  }

  if (typeof value !== 'undefined') {
    if (typeof value === 'number') {
      value = "".concat(value, "px");
    }

    el.style[name] = value;
    return undefined;
  }

  return getComputedStyleX(el, name);
}

function getClientPosition(elem) {
  var box;
  var x;
  var y;
  var doc = elem.ownerDocument;
  var body = doc.body;
  var docElem = doc && doc.documentElement; // 根据 GBS 最新数据，A-Grade Browsers 都已支持 getBoundingClientRect 方法，不用再考虑传统的实现方式

  box = elem.getBoundingClientRect(); // 注：jQuery 还考虑减去 docElem.clientLeft/clientTop
  // 但测试发现，这样反而会导致当 html 和 body 有边距/边框样式时，获取的值不正确
  // 此外，ie6 会忽略 html 的 margin 值，幸运地是没有谁会去设置 html 的 margin

  x = box.left;
  y = box.top; // In IE, most of the time, 2 extra pixels are added to the top and left
  // due to the implicit 2-pixel inset border.  In IE6/7 quirks mode and
  // IE6 standards mode, this border can be overridden by setting the
  // document element's border to zero -- thus, we cannot rely on the
  // offset always being 2 pixels.
  // In quirks mode, the offset can be determined by querying the body's
  // clientLeft/clientTop, but in standards mode, it is found by querying
  // the document element's clientLeft/clientTop.  Since we already called
  // getClientBoundingRect we have already forced a reflow, so it is not
  // too expensive just to query them all.
  // ie 下应该减去窗口的边框吧，毕竟默认 absolute 都是相对窗口定位的
  // 窗口边框标准是设 documentElement ,quirks 时设置 body
  // 最好禁止在 body 和 html 上边框 ，但 ie < 9 html 默认有 2px ，减去
  // 但是非 ie 不可能设置窗口边框，body html 也不是窗口 ,ie 可以通过 html,body 设置
  // 标准 ie 下 docElem.clientTop 就是 border-top
  // ie7 html 即窗口边框改变不了。永远为 2
  // 但标准 firefox/chrome/ie9 下 docElem.clientTop 是窗口边框，即使设了 border-top 也为 0

  x -= docElem.clientLeft || body.clientLeft || 0;
  y -= docElem.clientTop || body.clientTop || 0;
  return {
    left: x,
    top: y
  };
}

function getScroll(w, top) {
  var ret = w["page".concat(top ? 'Y' : 'X', "Offset")];
  var method = "scroll".concat(top ? 'Top' : 'Left');

  if (typeof ret !== 'number') {
    var d = w.document; // ie6,7,8 standard mode

    ret = d.documentElement[method];

    if (typeof ret !== 'number') {
      // quirks mode
      ret = d.body[method];
    }
  }

  return ret;
}

function getScrollLeft(w) {
  return getScroll(w);
}

function getScrollTop(w) {
  return getScroll(w, true);
}

function getOffset(el) {
  var pos = getClientPosition(el);
  var doc = el.ownerDocument;
  var w = doc.defaultView || doc.parentWindow;
  pos.left += getScrollLeft(w);
  pos.top += getScrollTop(w);
  return pos;
}
/**
 * A crude way of determining if an object is a window
 * @member util
 */


function isWindow(obj) {
  // must use == for ie8

  /* eslint eqeqeq:0 */
  return obj !== null && obj !== undefined && obj == obj.window;
}

function getDocument(node) {
  if (isWindow(node)) {
    return node.document;
  }

  if (node.nodeType === 9) {
    return node;
  }

  return node.ownerDocument;
}

function _getComputedStyle(elem, name, cs) {
  var computedStyle = cs;
  var val = '';
  var d = getDocument(elem);
  computedStyle = computedStyle || d.defaultView.getComputedStyle(elem, null); // https://github.com/kissyteam/kissy/issues/61

  if (computedStyle) {
    val = computedStyle.getPropertyValue(name) || computedStyle[name];
  }

  return val;
}

var _RE_NUM_NO_PX = new RegExp("^(".concat(RE_NUM, ")(?!px)[a-z%]+$"), 'i');

var RE_POS = /^(top|right|bottom|left)$/;
var CURRENT_STYLE = 'currentStyle';
var RUNTIME_STYLE = 'runtimeStyle';
var LEFT = 'left';
var PX = 'px';

function _getComputedStyleIE(elem, name) {
  // currentStyle maybe null
  // http://msdn.microsoft.com/en-us/library/ms535231.aspx
  var ret = elem[CURRENT_STYLE] && elem[CURRENT_STYLE][name]; // 当 width/height 设置为百分比时，通过 pixelLeft 方式转换的 width/height 值
  // 一开始就处理了! CUSTOM_STYLE.height,CUSTOM_STYLE.width ,cssHook 解决@2011-08-19
  // 在 ie 下不对，需要直接用 offset 方式
  // borderWidth 等值也有问题，但考虑到 borderWidth 设为百分比的概率很小，这里就不考虑了
  // From the awesome hack by Dean Edwards
  // http://erik.eae.net/archives/2007/07/27/18.54.15/#comment-102291
  // If we're not dealing with a regular pixel number
  // but a number that has a weird ending, we need to convert it to pixels
  // exclude left right for relativity

  if (_RE_NUM_NO_PX.test(ret) && !RE_POS.test(name)) {
    // Remember the original values
    var style = elem.style;
    var left = style[LEFT];
    var rsLeft = elem[RUNTIME_STYLE][LEFT]; // prevent flashing of content

    elem[RUNTIME_STYLE][LEFT] = elem[CURRENT_STYLE][LEFT]; // Put in the new values to get a computed value out

    style[LEFT] = name === 'fontSize' ? '1em' : ret || 0;
    ret = style.pixelLeft + PX; // Revert the changed values

    style[LEFT] = left;
    elem[RUNTIME_STYLE][LEFT] = rsLeft;
  }

  return ret === '' ? 'auto' : ret;
}

if (typeof window !== 'undefined') {
  getComputedStyleX = window.getComputedStyle ? _getComputedStyle : _getComputedStyleIE;
}

function getOffsetDirection(dir, option) {
  if (dir === 'left') {
    return option.useCssRight ? 'right' : dir;
  }

  return option.useCssBottom ? 'bottom' : dir;
}

function oppositeOffsetDirection(dir) {
  if (dir === 'left') {
    return 'right';
  } else if (dir === 'right') {
    return 'left';
  } else if (dir === 'top') {
    return 'bottom';
  } else if (dir === 'bottom') {
    return 'top';
  }
} // 设置 elem 相对 elem.ownerDocument 的坐标


function setLeftTop(elem, offset, option) {
  // set position first, in-case top/left are set even on static elem
  if (css(elem, 'position') === 'static') {
    elem.style.position = 'relative';
  }

  var presetH = -999;
  var presetV = -999;
  var horizontalProperty = getOffsetDirection('left', option);
  var verticalProperty = getOffsetDirection('top', option);
  var oppositeHorizontalProperty = oppositeOffsetDirection(horizontalProperty);
  var oppositeVerticalProperty = oppositeOffsetDirection(verticalProperty);

  if (horizontalProperty !== 'left') {
    presetH = 999;
  }

  if (verticalProperty !== 'top') {
    presetV = 999;
  }

  var originalTransition = '';
  var originalOffset = getOffset(elem);

  if ('left' in offset || 'top' in offset) {
    originalTransition = getTransitionProperty(elem) || '';
    setTransitionProperty(elem, 'none');
  }

  if ('left' in offset) {
    elem.style[oppositeHorizontalProperty] = '';
    elem.style[horizontalProperty] = "".concat(presetH, "px");
  }

  if ('top' in offset) {
    elem.style[oppositeVerticalProperty] = '';
    elem.style[verticalProperty] = "".concat(presetV, "px");
  } // force relayout


  forceRelayout(elem);
  var old = getOffset(elem);
  var originalStyle = {};

  for (var key in offset) {
    if (offset.hasOwnProperty(key)) {
      var dir = getOffsetDirection(key, option);
      var preset = key === 'left' ? presetH : presetV;
      var off = originalOffset[key] - old[key];

      if (dir === key) {
        originalStyle[dir] = preset + off;
      } else {
        originalStyle[dir] = preset - off;
      }
    }
  }

  css(elem, originalStyle); // force relayout

  forceRelayout(elem);

  if ('left' in offset || 'top' in offset) {
    setTransitionProperty(elem, originalTransition);
  }

  var ret = {};

  for (var _key in offset) {
    if (offset.hasOwnProperty(_key)) {
      var _dir = getOffsetDirection(_key, option);

      var _off = offset[_key] - originalOffset[_key];

      if (_key === _dir) {
        ret[_dir] = originalStyle[_dir] + _off;
      } else {
        ret[_dir] = originalStyle[_dir] - _off;
      }
    }
  }

  css(elem, ret);
}

function setTransform$1(elem, offset) {
  var originalOffset = getOffset(elem);
  var originalXY = getTransformXY(elem);
  var resultXY = {
    x: originalXY.x,
    y: originalXY.y
  };

  if ('left' in offset) {
    resultXY.x = originalXY.x + offset.left - originalOffset.left;
  }

  if ('top' in offset) {
    resultXY.y = originalXY.y + offset.top - originalOffset.top;
  }

  setTransformXY(elem, resultXY);
}

function setOffset(elem, offset, option) {
  if (option.ignoreShake) {
    var oriOffset = getOffset(elem);
    var oLeft = oriOffset.left.toFixed(0);
    var oTop = oriOffset.top.toFixed(0);
    var tLeft = offset.left.toFixed(0);
    var tTop = offset.top.toFixed(0);

    if (oLeft === tLeft && oTop === tTop) {
      return;
    }
  }

  if (option.useCssRight || option.useCssBottom) {
    setLeftTop(elem, offset, option);
  } else if (option.useCssTransform && getTransformName() in document.body.style) {
    setTransform$1(elem, offset);
  } else {
    setLeftTop(elem, offset, option);
  }
}

function each(arr, fn) {
  for (var i = 0; i < arr.length; i++) {
    fn(arr[i]);
  }
}

function isBorderBoxFn(elem) {
  return getComputedStyleX(elem, 'boxSizing') === 'border-box';
}

var BOX_MODELS = ['margin', 'border', 'padding'];
var CONTENT_INDEX = -1;
var PADDING_INDEX = 2;
var BORDER_INDEX = 1;
var MARGIN_INDEX = 0;

function swap(elem, options, callback) {
  var old = {};
  var style = elem.style;
  var name; // Remember the old values, and insert the new ones

  for (name in options) {
    if (options.hasOwnProperty(name)) {
      old[name] = style[name];
      style[name] = options[name];
    }
  }

  callback.call(elem); // Revert the old values

  for (name in options) {
    if (options.hasOwnProperty(name)) {
      style[name] = old[name];
    }
  }
}

function getPBMWidth(elem, props, which) {
  var value = 0;
  var prop;
  var j;
  var i;

  for (j = 0; j < props.length; j++) {
    prop = props[j];

    if (prop) {
      for (i = 0; i < which.length; i++) {
        var cssProp = void 0;

        if (prop === 'border') {
          cssProp = "".concat(prop).concat(which[i], "Width");
        } else {
          cssProp = prop + which[i];
        }

        value += parseFloat(getComputedStyleX(elem, cssProp)) || 0;
      }
    }
  }

  return value;
}

var domUtils = {
  getParent: function getParent(element) {
    var parent = element;

    do {
      if (parent.nodeType === 11 && parent.host) {
        parent = parent.host;
      } else {
        parent = parent.parentNode;
      }
    } while (parent && parent.nodeType !== 1 && parent.nodeType !== 9);

    return parent;
  }
};
each(['Width', 'Height'], function (name) {
  domUtils["doc".concat(name)] = function (refWin) {
    var d = refWin.document;
    return Math.max( // firefox chrome documentElement.scrollHeight< body.scrollHeight
    // ie standard mode : documentElement.scrollHeight> body.scrollHeight
    d.documentElement["scroll".concat(name)], // quirks : documentElement.scrollHeight 最大等于可视窗口多一点？
    d.body["scroll".concat(name)], domUtils["viewport".concat(name)](d));
  };

  domUtils["viewport".concat(name)] = function (win) {
    // pc browser includes scrollbar in window.innerWidth
    var prop = "client".concat(name);
    var doc = win.document;
    var body = doc.body;
    var documentElement = doc.documentElement;
    var documentElementProp = documentElement[prop]; // 标准模式取 documentElement
    // backcompat 取 body

    return doc.compatMode === 'CSS1Compat' && documentElementProp || body && body[prop] || documentElementProp;
  };
});
/*
 得到元素的大小信息
 @param elem
 @param name
 @param {String} [extra]  'padding' : (css width) + padding
 'border' : (css width) + padding + border
 'margin' : (css width) + padding + border + margin
 */

function getWH(elem, name, ex) {
  var extra = ex;

  if (isWindow(elem)) {
    return name === 'width' ? domUtils.viewportWidth(elem) : domUtils.viewportHeight(elem);
  } else if (elem.nodeType === 9) {
    return name === 'width' ? domUtils.docWidth(elem) : domUtils.docHeight(elem);
  }

  var which = name === 'width' ? ['Left', 'Right'] : ['Top', 'Bottom'];
  var borderBoxValue = name === 'width' ? elem.getBoundingClientRect().width : elem.getBoundingClientRect().height;
  var computedStyle = getComputedStyleX(elem);
  var isBorderBox = isBorderBoxFn(elem);
  var cssBoxValue = 0;

  if (borderBoxValue === null || borderBoxValue === undefined || borderBoxValue <= 0) {
    borderBoxValue = undefined; // Fall back to computed then un computed css if necessary

    cssBoxValue = getComputedStyleX(elem, name);

    if (cssBoxValue === null || cssBoxValue === undefined || Number(cssBoxValue) < 0) {
      cssBoxValue = elem.style[name] || 0;
    } // Normalize '', auto, and prepare for extra


    cssBoxValue = parseFloat(cssBoxValue) || 0;
  }

  if (extra === undefined) {
    extra = isBorderBox ? BORDER_INDEX : CONTENT_INDEX;
  }

  var borderBoxValueOrIsBorderBox = borderBoxValue !== undefined || isBorderBox;
  var val = borderBoxValue || cssBoxValue;

  if (extra === CONTENT_INDEX) {
    if (borderBoxValueOrIsBorderBox) {
      return val - getPBMWidth(elem, ['border', 'padding'], which);
    }

    return cssBoxValue;
  } else if (borderBoxValueOrIsBorderBox) {
    if (extra === BORDER_INDEX) {
      return val;
    }

    return val + (extra === PADDING_INDEX ? -getPBMWidth(elem, ['border'], which) : getPBMWidth(elem, ['margin'], which));
  }

  return cssBoxValue + getPBMWidth(elem, BOX_MODELS.slice(extra), which);
}

var cssShow = {
  position: 'absolute',
  visibility: 'hidden',
  display: 'block'
}; // fix #119 : https://github.com/kissyteam/kissy/issues/119

function getWHIgnoreDisplay() {
  for (var _len = arguments.length, args = new Array(_len), _key2 = 0; _key2 < _len; _key2++) {
    args[_key2] = arguments[_key2];
  }

  var val;
  var elem = args[0]; // in case elem is window
  // elem.offsetWidth === undefined

  if (elem.offsetWidth !== 0) {
    val = getWH.apply(undefined, args);
  } else {
    swap(elem, cssShow, function () {
      val = getWH.apply(undefined, args);
    });
  }

  return val;
}

each(['width', 'height'], function (name) {
  var first = name.charAt(0).toUpperCase() + name.slice(1);

  domUtils["outer".concat(first)] = function (el, includeMargin) {
    return el && getWHIgnoreDisplay(el, name, includeMargin ? MARGIN_INDEX : BORDER_INDEX);
  };

  var which = name === 'width' ? ['Left', 'Right'] : ['Top', 'Bottom'];

  domUtils[name] = function (elem, v) {
    var val = v;

    if (val !== undefined) {
      if (elem) {
        var computedStyle = getComputedStyleX(elem);
        var isBorderBox = isBorderBoxFn(elem);

        if (isBorderBox) {
          val += getPBMWidth(elem, ['padding', 'border'], which);
        }

        return css(elem, name, val);
      }

      return undefined;
    }

    return elem && getWHIgnoreDisplay(elem, name, CONTENT_INDEX);
  };
});

function mix(to, from) {
  for (var i in from) {
    if (from.hasOwnProperty(i)) {
      to[i] = from[i];
    }
  }

  return to;
}

var utils = {
  getWindow: function getWindow(node) {
    if (node && node.document && node.setTimeout) {
      return node;
    }

    var doc = node.ownerDocument || node;
    return doc.defaultView || doc.parentWindow;
  },
  getDocument: getDocument,
  offset: function offset(el, value, option) {
    if (typeof value !== 'undefined') {
      setOffset(el, value, option || {});
    } else {
      return getOffset(el);
    }
  },
  isWindow: isWindow,
  each: each,
  css: css,
  clone: function clone(obj) {
    var i;
    var ret = {};

    for (i in obj) {
      if (obj.hasOwnProperty(i)) {
        ret[i] = obj[i];
      }
    }

    var overflow = obj.overflow;

    if (overflow) {
      for (i in obj) {
        if (obj.hasOwnProperty(i)) {
          ret.overflow[i] = obj.overflow[i];
        }
      }
    }

    return ret;
  },
  mix: mix,
  getWindowScrollLeft: function getWindowScrollLeft(w) {
    return getScrollLeft(w);
  },
  getWindowScrollTop: function getWindowScrollTop(w) {
    return getScrollTop(w);
  },
  merge: function merge() {
    var ret = {};

    for (var i = 0; i < arguments.length; i++) {
      utils.mix(ret, i < 0 || arguments.length <= i ? undefined : arguments[i]);
    }

    return ret;
  },
  viewportWidth: 0,
  viewportHeight: 0
};
mix(utils, domUtils);
/**
 * 得到会导致元素显示不全的祖先元素
 */

var getParent = utils.getParent;

function getOffsetParent(element) {
  if (utils.isWindow(element) || element.nodeType === 9) {
    return null;
  } // ie 这个也不是完全可行

  /*
   <div style="width: 50px;height: 100px;overflow: hidden">
   <div style="width: 50px;height: 100px;position: relative;" id="d6">
   元素 6 高 100px 宽 50px<br/>
   </div>
   </div>
   */
  // element.offsetParent does the right thing in ie7 and below. Return parent with layout!
  //  In other browsers it only includes elements with position absolute, relative or
  // fixed, not elements with overflow set to auto or scroll.
  //        if (UA.ie && ieMode < 8) {
  //            return element.offsetParent;
  //        }
  // 统一的 offsetParent 方法


  var doc = utils.getDocument(element);
  var body = doc.body;
  var parent;
  var positionStyle = utils.css(element, 'position');
  var skipStatic = positionStyle === 'fixed' || positionStyle === 'absolute';

  if (!skipStatic) {
    return element.nodeName.toLowerCase() === 'html' ? null : getParent(element);
  }

  for (parent = getParent(element); parent && parent !== body && parent.nodeType !== 9; parent = getParent(parent)) {
    positionStyle = utils.css(parent, 'position');

    if (positionStyle !== 'static') {
      return parent;
    }
  }

  return null;
}

var getParent$1 = utils.getParent;

function isAncestorFixed(element) {
  if (utils.isWindow(element) || element.nodeType === 9) {
    return false;
  }

  var doc = utils.getDocument(element);
  var body = doc.body;
  var parent = null;

  for (parent = getParent$1(element); parent && parent !== body; parent = getParent$1(parent)) {
    var positionStyle = utils.css(parent, 'position');

    if (positionStyle === 'fixed') {
      return true;
    }
  }

  return false;
}
/**
 * 获得元素的显示部分的区域
 */


function getVisibleRectForElement(element, alwaysByViewport) {
  var visibleRect = {
    left: 0,
    right: Infinity,
    top: 0,
    bottom: Infinity
  };
  var el = getOffsetParent(element);
  var doc = utils.getDocument(element);
  var win = doc.defaultView || doc.parentWindow;
  var body = doc.body;
  var documentElement = doc.documentElement; // Determine the size of the visible rect by climbing the dom accounting for
  // all scrollable containers.

  while (el) {
    // clientWidth is zero for inline block elements in ie.
    if ((navigator.userAgent.indexOf('MSIE') === -1 || el.clientWidth !== 0) && // body may have overflow set on it, yet we still get the entire
    // viewport. In some browsers, el.offsetParent may be
    // document.documentElement, so check for that too.
    el !== body && el !== documentElement && utils.css(el, 'overflow') !== 'visible') {
      var pos = utils.offset(el); // add border

      pos.left += el.clientLeft;
      pos.top += el.clientTop;
      visibleRect.top = Math.max(visibleRect.top, pos.top);
      visibleRect.right = Math.min(visibleRect.right, // consider area without scrollBar
      pos.left + el.clientWidth);
      visibleRect.bottom = Math.min(visibleRect.bottom, pos.top + el.clientHeight);
      visibleRect.left = Math.max(visibleRect.left, pos.left);
    } else if (el === body || el === documentElement) {
      break;
    }

    el = getOffsetParent(el);
  } // Set element position to fixed
  // make sure absolute element itself don't affect it's visible area
  // https://github.com/ant-design/ant-design/issues/7601


  var originalPosition = null;

  if (!utils.isWindow(element) && element.nodeType !== 9) {
    originalPosition = element.style.position;
    var position = utils.css(element, 'position');

    if (position === 'absolute') {
      element.style.position = 'fixed';
    }
  }

  var scrollX = utils.getWindowScrollLeft(win);
  var scrollY = utils.getWindowScrollTop(win);
  var viewportWidth = utils.viewportWidth(win);
  var viewportHeight = utils.viewportHeight(win);
  var documentWidth = documentElement.scrollWidth;
  var documentHeight = documentElement.scrollHeight; // scrollXXX on html is sync with body which means overflow: hidden on body gets wrong scrollXXX.
  // We should cut this ourself.

  var bodyStyle = window.getComputedStyle(body);

  if (bodyStyle.overflowX === 'hidden') {
    documentWidth = win.innerWidth;
  }

  if (bodyStyle.overflowY === 'hidden') {
    documentHeight = win.innerHeight;
  } // Reset element position after calculate the visible area


  if (element.style) {
    element.style.position = originalPosition;
  }

  if (alwaysByViewport || isAncestorFixed(element)) {
    // Clip by viewport's size.
    visibleRect.left = Math.max(visibleRect.left, scrollX);
    visibleRect.top = Math.max(visibleRect.top, scrollY);
    visibleRect.right = Math.min(visibleRect.right, scrollX + viewportWidth);
    visibleRect.bottom = Math.min(visibleRect.bottom, scrollY + viewportHeight);
  } else {
    // Clip by document's size.
    var maxVisibleWidth = Math.max(documentWidth, scrollX + viewportWidth);
    visibleRect.right = Math.min(visibleRect.right, maxVisibleWidth);
    var maxVisibleHeight = Math.max(documentHeight, scrollY + viewportHeight);
    visibleRect.bottom = Math.min(visibleRect.bottom, maxVisibleHeight);
  }

  return visibleRect.top >= 0 && visibleRect.left >= 0 && visibleRect.bottom > visibleRect.top && visibleRect.right > visibleRect.left ? visibleRect : null;
}

function adjustForViewport(elFuturePos, elRegion, visibleRect, overflow) {
  var pos = utils.clone(elFuturePos);
  var size = {
    width: elRegion.width,
    height: elRegion.height
  };

  if (overflow.adjustX && pos.left < visibleRect.left) {
    pos.left = visibleRect.left;
  } // Left edge inside and right edge outside viewport, try to resize it.


  if (overflow.resizeWidth && pos.left >= visibleRect.left && pos.left + size.width > visibleRect.right) {
    size.width -= pos.left + size.width - visibleRect.right;
  } // Right edge outside viewport, try to move it.


  if (overflow.adjustX && pos.left + size.width > visibleRect.right) {
    // 保证左边界和可视区域左边界对齐
    pos.left = Math.max(visibleRect.right - size.width, visibleRect.left);
  } // Top edge outside viewport, try to move it.


  if (overflow.adjustY && pos.top < visibleRect.top) {
    pos.top = visibleRect.top;
  } // Top edge inside and bottom edge outside viewport, try to resize it.


  if (overflow.resizeHeight && pos.top >= visibleRect.top && pos.top + size.height > visibleRect.bottom) {
    size.height -= pos.top + size.height - visibleRect.bottom;
  } // Bottom edge outside viewport, try to move it.


  if (overflow.adjustY && pos.top + size.height > visibleRect.bottom) {
    // 保证上边界和可视区域上边界对齐
    pos.top = Math.max(visibleRect.bottom - size.height, visibleRect.top);
  }

  return utils.mix(pos, size);
}

function getRegion(node) {
  var offset;
  var w;
  var h;

  if (!utils.isWindow(node) && node.nodeType !== 9) {
    offset = utils.offset(node);
    w = utils.outerWidth(node);
    h = utils.outerHeight(node);
  } else {
    var win = utils.getWindow(node);
    offset = {
      left: utils.getWindowScrollLeft(win),
      top: utils.getWindowScrollTop(win)
    };
    w = utils.viewportWidth(win);
    h = utils.viewportHeight(win);
  }

  offset.width = w;
  offset.height = h;
  return offset;
}
/**
 * 获取 node 上的 align 对齐点 相对于页面的坐标
 */


function getAlignOffset(region, align) {
  var V = align.charAt(0);
  var H = align.charAt(1);
  var w = region.width;
  var h = region.height;
  var x = region.left;
  var y = region.top;

  if (V === 'c') {
    y += h / 2;
  } else if (V === 'b') {
    y += h;
  }

  if (H === 'c') {
    x += w / 2;
  } else if (H === 'r') {
    x += w;
  }

  return {
    left: x,
    top: y
  };
}

function getElFuturePos(elRegion, refNodeRegion, points, offset, targetOffset) {
  var p1 = getAlignOffset(refNodeRegion, points[1]);
  var p2 = getAlignOffset(elRegion, points[0]);
  var diff = [p2.left - p1.left, p2.top - p1.top];
  return {
    left: Math.round(elRegion.left - diff[0] + offset[0] - targetOffset[0]),
    top: Math.round(elRegion.top - diff[1] + offset[1] - targetOffset[1])
  };
}
/**
 * align dom node flexibly
 * @author yiminghe@gmail.com
 */


function isFailX(elFuturePos, elRegion, visibleRect) {
  return elFuturePos.left < visibleRect.left || elFuturePos.left + elRegion.width > visibleRect.right;
}

function isFailY(elFuturePos, elRegion, visibleRect) {
  return elFuturePos.top < visibleRect.top || elFuturePos.top + elRegion.height > visibleRect.bottom;
}

function isCompleteFailX(elFuturePos, elRegion, visibleRect) {
  return elFuturePos.left > visibleRect.right || elFuturePos.left + elRegion.width < visibleRect.left;
}

function isCompleteFailY(elFuturePos, elRegion, visibleRect) {
  return elFuturePos.top > visibleRect.bottom || elFuturePos.top + elRegion.height < visibleRect.top;
}

function flip(points, reg, map) {
  var ret = [];
  utils.each(points, function (p) {
    ret.push(p.replace(reg, function (m) {
      return map[m];
    }));
  });
  return ret;
}

function flipOffset(offset, index) {
  offset[index] = -offset[index];
  return offset;
}

function convertOffset(str, offsetLen) {
  var n;

  if (/%$/.test(str)) {
    n = parseInt(str.substring(0, str.length - 1), 10) / 100 * offsetLen;
  } else {
    n = parseInt(str, 10);
  }

  return n || 0;
}

function normalizeOffset(offset, el) {
  offset[0] = convertOffset(offset[0], el.width);
  offset[1] = convertOffset(offset[1], el.height);
}
/**
 * @param el
 * @param tgtRegion 参照节点所占的区域: { left, top, width, height }
 * @param align
 */


function doAlign(el, tgtRegion, align, isTgtRegionVisible) {
  var points = align.points;
  var offset = align.offset || [0, 0];
  var targetOffset = align.targetOffset || [0, 0];
  var overflow = align.overflow;
  var source = align.source || el;
  offset = [].concat(offset);
  targetOffset = [].concat(targetOffset);
  overflow = overflow || {};
  var newOverflowCfg = {};
  var fail = 0;
  var alwaysByViewport = !!(overflow && overflow.alwaysByViewport); // 当前节点可以被放置的显示区域

  var visibleRect = getVisibleRectForElement(source, alwaysByViewport); // 当前节点所占的区域, left/top/width/height

  var elRegion = getRegion(source); // 将 offset 转换成数值，支持百分比

  normalizeOffset(offset, elRegion);
  normalizeOffset(targetOffset, tgtRegion); // 当前节点将要被放置的位置

  var elFuturePos = getElFuturePos(elRegion, tgtRegion, points, offset, targetOffset); // 当前节点将要所处的区域

  var newElRegion = utils.merge(elRegion, elFuturePos); // 如果可视区域不能完全放置当前节点时允许调整

  if (visibleRect && (overflow.adjustX || overflow.adjustY) && isTgtRegionVisible) {
    if (overflow.adjustX) {
      // 如果横向不能放下
      if (isFailX(elFuturePos, elRegion, visibleRect)) {
        // 对齐位置反下
        var newPoints = flip(points, /[lr]/gi, {
          l: 'r',
          r: 'l'
        }); // 偏移量也反下

        var newOffset = flipOffset(offset, 0);
        var newTargetOffset = flipOffset(targetOffset, 0);
        var newElFuturePos = getElFuturePos(elRegion, tgtRegion, newPoints, newOffset, newTargetOffset);

        if (!isCompleteFailX(newElFuturePos, elRegion, visibleRect)) {
          fail = 1;
          points = newPoints;
          offset = newOffset;
          targetOffset = newTargetOffset;
        }
      }
    }

    if (overflow.adjustY) {
      // 如果纵向不能放下
      if (isFailY(elFuturePos, elRegion, visibleRect)) {
        // 对齐位置反下
        var _newPoints = flip(points, /[tb]/gi, {
          t: 'b',
          b: 't'
        }); // 偏移量也反下


        var _newOffset = flipOffset(offset, 1);

        var _newTargetOffset = flipOffset(targetOffset, 1);

        var _newElFuturePos = getElFuturePos(elRegion, tgtRegion, _newPoints, _newOffset, _newTargetOffset);

        if (!isCompleteFailY(_newElFuturePos, elRegion, visibleRect)) {
          fail = 1;
          points = _newPoints;
          offset = _newOffset;
          targetOffset = _newTargetOffset;
        }
      }
    } // 如果失败，重新计算当前节点将要被放置的位置


    if (fail) {
      elFuturePos = getElFuturePos(elRegion, tgtRegion, points, offset, targetOffset);
      utils.mix(newElRegion, elFuturePos);
    }

    var isStillFailX = isFailX(elFuturePos, elRegion, visibleRect);
    var isStillFailY = isFailY(elFuturePos, elRegion, visibleRect); // 检查反下后的位置是否可以放下了，如果仍然放不下：
    // 1. 复原修改过的定位参数

    if (isStillFailX || isStillFailY) {
      var _newPoints2 = points; // 重置对应部分的翻转逻辑

      if (isStillFailX) {
        _newPoints2 = flip(points, /[lr]/gi, {
          l: 'r',
          r: 'l'
        });
      }

      if (isStillFailY) {
        _newPoints2 = flip(points, /[tb]/gi, {
          t: 'b',
          b: 't'
        });
      }

      points = _newPoints2;
      offset = align.offset || [0, 0];
      targetOffset = align.targetOffset || [0, 0];
    } // 2. 只有指定了可以调整当前方向才调整


    newOverflowCfg.adjustX = overflow.adjustX && isStillFailX;
    newOverflowCfg.adjustY = overflow.adjustY && isStillFailY; // 确实要调整，甚至可能会调整高度宽度

    if (newOverflowCfg.adjustX || newOverflowCfg.adjustY) {
      newElRegion = adjustForViewport(elFuturePos, elRegion, visibleRect, newOverflowCfg);
    }
  } // need judge to in case set fixed with in css on height auto element


  if (newElRegion.width !== elRegion.width) {
    utils.css(source, 'width', utils.width(source) + newElRegion.width - elRegion.width);
  }

  if (newElRegion.height !== elRegion.height) {
    utils.css(source, 'height', utils.height(source) + newElRegion.height - elRegion.height);
  } // https://github.com/kissyteam/kissy/issues/190
  // 相对于屏幕位置没变，而 left/top 变了
  // 例如 <div 'relative'><el absolute></div>


  utils.offset(source, {
    left: newElRegion.left,
    top: newElRegion.top
  }, {
    useCssRight: align.useCssRight,
    useCssBottom: align.useCssBottom,
    useCssTransform: align.useCssTransform,
    ignoreShake: align.ignoreShake
  });
  return {
    points: points,
    offset: offset,
    targetOffset: targetOffset,
    overflow: newOverflowCfg
  };
}
/**
 *  2012-04-26 yiminghe@gmail.com
 *   - 优化智能对齐算法
 *   - 慎用 resizeXX
 *
 *  2011-07-13 yiminghe@gmail.com note:
 *   - 增加智能对齐，以及大小调整选项
 **/


function isOutOfVisibleRect(target, alwaysByViewport) {
  var visibleRect = getVisibleRectForElement(target, alwaysByViewport);
  var targetRegion = getRegion(target);
  return !visibleRect || targetRegion.left + targetRegion.width <= visibleRect.left || targetRegion.top + targetRegion.height <= visibleRect.top || targetRegion.left >= visibleRect.right || targetRegion.top >= visibleRect.bottom;
}

function alignElement(el, refNode, align) {
  var target = align.target || refNode;
  var refNodeRegion = getRegion(target);
  var isTargetNotOutOfVisible = !isOutOfVisibleRect(target, align.overflow && align.overflow.alwaysByViewport);
  return doAlign(el, refNodeRegion, align, isTargetNotOutOfVisible);
}

alignElement.__getOffsetParent = getOffsetParent;
alignElement.__getVisibleRectForElement = getVisibleRectForElement;
/**
 * `tgtPoint`: { pageX, pageY } or { clientX, clientY }.
 * If client position provided, will internal convert to page position.
 */

function alignPoint(el, tgtPoint, align) {
  var pageX;
  var pageY;
  var doc = utils.getDocument(el);
  var win = doc.defaultView || doc.parentWindow;
  var scrollX = utils.getWindowScrollLeft(win);
  var scrollY = utils.getWindowScrollTop(win);
  var viewportWidth = utils.viewportWidth(win);
  var viewportHeight = utils.viewportHeight(win);

  if ('pageX' in tgtPoint) {
    pageX = tgtPoint.pageX;
  } else {
    pageX = scrollX + tgtPoint.clientX;
  }

  if ('pageY' in tgtPoint) {
    pageY = tgtPoint.pageY;
  } else {
    pageY = scrollY + tgtPoint.clientY;
  }

  var tgtRegion = {
    left: pageX,
    top: pageY,
    width: 0,
    height: 0
  };
  var pointInView = pageX >= 0 && pageX <= scrollX + viewportWidth && pageY >= 0 && pageY <= scrollY + viewportHeight; // Provide default target point

  var points = [align.points[0], 'cc'];
  return doAlign(el, tgtRegion, _objectSpread2({}, align, {
    points: points
  }), pointInView);
}

var _default = alignElement;
exports.default = _default;
},{}],"dMsq":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isSamePoint = isSamePoint;
exports.restoreFocus = restoreFocus;
exports.monitorResize = monitorResize;

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/esm/slicedToArray"));

var _resizeObserverPolyfill = _interopRequireDefault(require("resize-observer-polyfill"));

var _contains = _interopRequireDefault(require("rc-util/es/Dom/contains"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function isSamePoint(prev, next) {
  if (prev === next) return true;
  if (!prev || !next) return false;

  if ('pageX' in next && 'pageY' in next) {
    return prev.pageX === next.pageX && prev.pageY === next.pageY;
  }

  if ('clientX' in next && 'clientY' in next) {
    return prev.clientX === next.clientX && prev.clientY === next.clientY;
  }

  return false;
}

function restoreFocus(activeElement, container) {
  // Focus back if is in the container
  if (activeElement !== document.activeElement && (0, _contains.default)(container, activeElement) && typeof activeElement.focus === 'function') {
    activeElement.focus();
  }
}

function monitorResize(element, callback) {
  var prevWidth = null;
  var prevHeight = null;

  function onResize(_ref) {
    var _ref2 = (0, _slicedToArray2.default)(_ref, 1),
        target = _ref2[0].target;

    if (!document.documentElement.contains(target)) return;

    var _target$getBoundingCl = target.getBoundingClientRect(),
        width = _target$getBoundingCl.width,
        height = _target$getBoundingCl.height;

    var fixedWidth = Math.floor(width);
    var fixedHeight = Math.floor(height);

    if (prevWidth !== fixedWidth || prevHeight !== fixedHeight) {
      // https://webkit.org/blog/9997/resizeobserver-in-webkit/
      Promise.resolve().then(function () {
        callback({
          width: fixedWidth,
          height: fixedHeight
        });
      });
    }

    prevWidth = fixedWidth;
    prevHeight = fixedHeight;
  }

  var resizeObserver = new _resizeObserverPolyfill.default(onResize);

  if (element) {
    resizeObserver.observe(element);
  }

  return function () {
    resizeObserver.disconnect();
  };
}
},{"@babel/runtime/helpers/esm/slicedToArray":"T12H","resize-observer-polyfill":"C4qV","rc-util/es/Dom/contains":"asZT"}],"K6AB":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = function _default(callback, buffer) {
  var calledRef = _react.default.useRef(false);

  var timeoutRef = _react.default.useRef(null);

  function cancelTrigger() {
    window.clearTimeout(timeoutRef.current);
  }

  function trigger(force) {
    if (!calledRef.current || force === true) {
      if (callback() === false) {
        // Not delay since callback cancelled self
        return;
      }

      calledRef.current = true;
      cancelTrigger();
      timeoutRef.current = window.setTimeout(function () {
        calledRef.current = false;
      }, buffer);
    } else {
      cancelTrigger();
      timeoutRef.current = window.setTimeout(function () {
        calledRef.current = false;
        trigger();
      }, buffer);
    }
  }

  return [trigger, function () {
    calledRef.current = false;
    cancelTrigger();
  }];
};

exports.default = _default;
},{"react":"n8MK"}],"He3b":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/esm/slicedToArray"));

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/esm/typeof"));

var _react = _interopRequireDefault(require("react"));

var _ref2 = require("rc-util/es/ref");

var _isVisible = _interopRequireDefault(require("rc-util/es/Dom/isVisible"));

var _domAlign = require("dom-align");

var _addEventListener = _interopRequireDefault(require("rc-util/es/Dom/addEventListener"));

var _util = require("./util");

var _useBuffer3 = _interopRequireDefault(require("./hooks/useBuffer"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Removed props:
 *  - childrenProps
 */
function getElement(func) {
  if (typeof func !== 'function') return null;
  return func();
}

function getPoint(point) {
  if ((0, _typeof2.default)(point) !== 'object' || !point) return null;
  return point;
}

var Align = function Align(_ref, ref) {
  var children = _ref.children,
      disabled = _ref.disabled,
      target = _ref.target,
      align = _ref.align,
      onAlign = _ref.onAlign,
      monitorWindowResize = _ref.monitorWindowResize,
      _ref$monitorBufferTim = _ref.monitorBufferTime,
      monitorBufferTime = _ref$monitorBufferTim === void 0 ? 0 : _ref$monitorBufferTim;

  var cacheRef = _react.default.useRef({});

  var nodeRef = _react.default.useRef();

  var childNode = _react.default.Children.only(children); // ===================== Align ======================
  // We save the props here to avoid closure makes props ood


  var forceAlignPropsRef = _react.default.useRef({});

  forceAlignPropsRef.current.disabled = disabled;
  forceAlignPropsRef.current.target = target;
  forceAlignPropsRef.current.onAlign = onAlign;

  var _useBuffer = (0, _useBuffer3.default)(function () {
    var _forceAlignPropsRef$c = forceAlignPropsRef.current,
        latestDisabled = _forceAlignPropsRef$c.disabled,
        latestTarget = _forceAlignPropsRef$c.target,
        latestOnAlign = _forceAlignPropsRef$c.onAlign;

    if (!latestDisabled && latestTarget) {
      var source = nodeRef.current;
      var result;
      var element = getElement(latestTarget);
      var point = getPoint(latestTarget);
      cacheRef.current.element = element;
      cacheRef.current.point = point; // IE lose focus after element realign
      // We should record activeElement and restore later

      var _document = document,
          activeElement = _document.activeElement; // We only align when element is visible

      if (element && (0, _isVisible.default)(element)) {
        result = (0, _domAlign.alignElement)(source, element, align);
      } else if (point) {
        result = (0, _domAlign.alignPoint)(source, point, align);
      }

      (0, _util.restoreFocus)(activeElement, source);

      if (latestOnAlign && result) {
        latestOnAlign(source, result);
      }

      return true;
    }

    return false;
  }, monitorBufferTime),
      _useBuffer2 = (0, _slicedToArray2.default)(_useBuffer, 2),
      _forceAlign = _useBuffer2[0],
      cancelForceAlign = _useBuffer2[1]; // ===================== Effect =====================
  // Listen for target updated


  var resizeMonitor = _react.default.useRef({
    cancel: function cancel() {}
  }); // Listen for source updated


  var sourceResizeMonitor = _react.default.useRef({
    cancel: function cancel() {}
  });

  _react.default.useEffect(function () {
    var element = getElement(target);
    var point = getPoint(target);

    if (nodeRef.current !== sourceResizeMonitor.current.element) {
      sourceResizeMonitor.current.cancel();
      sourceResizeMonitor.current.element = nodeRef.current;
      sourceResizeMonitor.current.cancel = (0, _util.monitorResize)(nodeRef.current, _forceAlign);
    }

    if (cacheRef.current.element !== element || !(0, _util.isSamePoint)(cacheRef.current.point, point)) {
      _forceAlign(); // Add resize observer


      if (resizeMonitor.current.element !== element) {
        resizeMonitor.current.cancel();
        resizeMonitor.current.element = element;
        resizeMonitor.current.cancel = (0, _util.monitorResize)(element, _forceAlign);
      }
    }
  }); // Listen for disabled change


  _react.default.useEffect(function () {
    if (!disabled) {
      _forceAlign();
    } else {
      cancelForceAlign();
    }
  }, [disabled]); // Listen for window resize


  var winResizeRef = _react.default.useRef(null);

  _react.default.useEffect(function () {
    if (monitorWindowResize) {
      if (!winResizeRef.current) {
        winResizeRef.current = (0, _addEventListener.default)(window, 'resize', _forceAlign);
      }
    } else if (winResizeRef.current) {
      winResizeRef.current.remove();
      winResizeRef.current = null;
    }
  }, [monitorWindowResize]); // Clear all if unmount


  _react.default.useEffect(function () {
    return function () {
      resizeMonitor.current.cancel();
      sourceResizeMonitor.current.cancel();
      if (winResizeRef.current) winResizeRef.current.remove();
      cancelForceAlign();
    };
  }, []); // ====================== Ref =======================


  _react.default.useImperativeHandle(ref, function () {
    return {
      forceAlign: function forceAlign() {
        return _forceAlign(true);
      }
    };
  }); // ===================== Render =====================


  if (_react.default.isValidElement(childNode)) {
    childNode = _react.default.cloneElement(childNode, {
      ref: (0, _ref2.composeRef)(childNode.ref, nodeRef)
    });
  }

  return childNode;
};

var RefAlign = _react.default.forwardRef(Align);

RefAlign.displayName = 'Align';
var _default = RefAlign;
exports.default = _default;
},{"@babel/runtime/helpers/esm/slicedToArray":"T12H","@babel/runtime/helpers/esm/typeof":"xLw6","react":"n8MK","rc-util/es/ref":"AOnv","rc-util/es/Dom/isVisible":"dPHJ","dom-align":"mIcA","rc-util/es/Dom/addEventListener":"v9LT","./util":"dMsq","./hooks/useBuffer":"K6AB"}],"AVA2":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Align = _interopRequireDefault(require("./Align"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// export this package's api
var _default = _Align.default;
exports.default = _default;
},{"./Align":"He3b"}],"QVnC":[function(require,module,exports) {
var define;
/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var runtime = (function (exports) {
  "use strict";

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined; // More compressible than void 0.
  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  function define(obj, key, value) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
    return obj[key];
  }
  try {
    // IE 8 has a broken Object.defineProperty that only works on DOM objects.
    define({}, "");
  } catch (err) {
    define = function(obj, key, value) {
      return obj[key] = value;
    };
  }

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []);

    // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.
    generator._invoke = makeInvokeMethod(innerFn, self, context);

    return generator;
  }
  exports.wrap = wrap;

  // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.
  function tryCatch(fn, obj, arg) {
    try {
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";

  // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel = {};

  // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}

  // This is a polyfill for %IteratorPrototype% for environments that
  // don't natively support it.
  var IteratorPrototype = {};
  IteratorPrototype[iteratorSymbol] = function () {
    return this;
  };

  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  if (NativeIteratorPrototype &&
      NativeIteratorPrototype !== Op &&
      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype =
    Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
  GeneratorFunctionPrototype.constructor = GeneratorFunction;
  GeneratorFunction.displayName = define(
    GeneratorFunctionPrototype,
    toStringTagSymbol,
    "GeneratorFunction"
  );

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function(method) {
      define(prototype, method, function(arg) {
        return this._invoke(method, arg);
      });
    });
  }

  exports.isGeneratorFunction = function(genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor
      ? ctor === GeneratorFunction ||
        // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction"
      : false;
  };

  exports.mark = function(genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      define(genFun, toStringTagSymbol, "GeneratorFunction");
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.
  exports.awrap = function(arg) {
    return { __await: arg };
  };

  function AsyncIterator(generator, PromiseImpl) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;
        if (value &&
            typeof value === "object" &&
            hasOwn.call(value, "__await")) {
          return PromiseImpl.resolve(value.__await).then(function(value) {
            invoke("next", value, resolve, reject);
          }, function(err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return PromiseImpl.resolve(value).then(function(unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration.
          result.value = unwrapped;
          resolve(result);
        }, function(error) {
          // If a rejected Promise was yielded, throw the rejection back
          // into the async generator function so it can be handled there.
          return invoke("throw", error, resolve, reject);
        });
      }
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new PromiseImpl(function(resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise =
        // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise ? previousPromise.then(
          callInvokeWithMethodAndArg,
          // Avoid propagating failures to Promises returned by later
          // invocations of the iterator.
          callInvokeWithMethodAndArg
        ) : callInvokeWithMethodAndArg();
    }

    // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).
    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);
  AsyncIterator.prototype[asyncIteratorSymbol] = function () {
    return this;
  };
  exports.AsyncIterator = AsyncIterator;

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  exports.async = function(innerFn, outerFn, self, tryLocsList, PromiseImpl) {
    if (PromiseImpl === void 0) PromiseImpl = Promise;

    var iter = new AsyncIterator(
      wrap(innerFn, outerFn, self, tryLocsList),
      PromiseImpl
    );

    return exports.isGeneratorFunction(outerFn)
      ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function(result) {
          return result.done ? result.value : iter.next();
        });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;

    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        }

        // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
        return doneResult();
      }

      context.method = method;
      context.arg = arg;

      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }

        if (context.method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = context.arg;

        } else if (context.method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw context.arg;
          }

          context.dispatchException(context.arg);

        } else if (context.method === "return") {
          context.abrupt("return", context.arg);
        }

        state = GenStateExecuting;

        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done
            ? GenStateCompleted
            : GenStateSuspendedYield;

          if (record.arg === ContinueSentinel) {
            continue;
          }

          return {
            value: record.arg,
            done: context.done
          };

        } else if (record.type === "throw") {
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(context.arg) call above.
          context.method = "throw";
          context.arg = record.arg;
        }
      }
    };
  }

  // Call delegate.iterator[context.method](context.arg) and handle the
  // result, either by returning a { value, done } result from the
  // delegate iterator, or by modifying context.method and context.arg,
  // setting context.delegate to null, and returning the ContinueSentinel.
  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];
    if (method === undefined) {
      // A .throw or .return when the delegate iterator has no .throw
      // method always terminates the yield* loop.
      context.delegate = null;

      if (context.method === "throw") {
        // Note: ["return"] must be used for ES3 parsing compatibility.
        if (delegate.iterator["return"]) {
          // If the delegate iterator has a return method, give it a
          // chance to clean up.
          context.method = "return";
          context.arg = undefined;
          maybeInvokeDelegate(delegate, context);

          if (context.method === "throw") {
            // If maybeInvokeDelegate(context) changed context.method from
            // "return" to "throw", let that override the TypeError below.
            return ContinueSentinel;
          }
        }

        context.method = "throw";
        context.arg = new TypeError(
          "The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);

    if (record.type === "throw") {
      context.method = "throw";
      context.arg = record.arg;
      context.delegate = null;
      return ContinueSentinel;
    }

    var info = record.arg;

    if (! info) {
      context.method = "throw";
      context.arg = new TypeError("iterator result is not an object");
      context.delegate = null;
      return ContinueSentinel;
    }

    if (info.done) {
      // Assign the result of the finished delegate to the temporary
      // variable specified by delegate.resultName (see delegateYield).
      context[delegate.resultName] = info.value;

      // Resume execution at the desired location (see delegateYield).
      context.next = delegate.nextLoc;

      // If context.method was "throw" but the delegate handled the
      // exception, let the outer generator proceed normally. If
      // context.method was "next", forget context.arg since it has been
      // "consumed" by the delegate iterator. If context.method was
      // "return", allow the original .return call to continue in the
      // outer generator.
      if (context.method !== "return") {
        context.method = "next";
        context.arg = undefined;
      }

    } else {
      // Re-yield the result returned by the delegate method.
      return info;
    }

    // The delegate iterator is finished, so forget it and continue with
    // the outer generator.
    context.delegate = null;
    return ContinueSentinel;
  }

  // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.
  defineIteratorMethods(Gp);

  define(Gp, toStringTagSymbol, "Generator");

  // A Generator should always return itself as the iterator object when the
  // @@iterator function is called on it. Some browsers' implementations of the
  // iterator prototype chain incorrectly implement this, causing the Generator
  // object to not be returned from this call. This ensures that doesn't happen.
  // See https://github.com/facebook/regenerator/issues/274 for more details.
  Gp[iteratorSymbol] = function() {
    return this;
  };

  Gp.toString = function() {
    return "[object Generator]";
  };

  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{ tryLoc: "root" }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  exports.keys = function(object) {
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();

    // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.
    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.
      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1, next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined;
          next.done = true;

          return next;
        };

        return next.next = next;
      }
    }

    // Return an iterator with no values.
    return { next: doneResult };
  }
  exports.values = values;

  function doneResult() {
    return { value: undefined, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.
      this.sent = this._sent = undefined;
      this.done = false;
      this.delegate = null;

      this.method = "next";
      this.arg = undefined;

      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" &&
              hasOwn.call(this, name) &&
              !isNaN(+name.slice(1))) {
            this[name] = undefined;
          }
        }
      }
    },

    stop: function() {
      this.done = true;

      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;
      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;

        if (caught) {
          // If the dispatched exception was caught by a catch block,
          // then let that catch block handle the exception normally.
          context.method = "next";
          context.arg = undefined;
        }

        return !! caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }

          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },

    abrupt: function(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev &&
            hasOwn.call(entry, "finallyLoc") &&
            this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry &&
          (type === "break" ||
           type === "continue") &&
          finallyEntry.tryLoc <= arg &&
          arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.method = "next";
        this.next = finallyEntry.finallyLoc;
        return ContinueSentinel;
      }

      return this.complete(record);
    },

    complete: function(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" ||
          record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = this.arg = record.arg;
        this.method = "return";
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }

      return ContinueSentinel;
    },

    finish: function(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },

    "catch": function(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }

      // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.
      throw new Error("illegal catch attempt");
    },

    delegateYield: function(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      if (this.method === "next") {
        // Deliberately forget the last sent value so that we don't
        // accidentally pass it on to the delegate.
        this.arg = undefined;
      }

      return ContinueSentinel;
    }
  };

  // Regardless of whether this script is executing as a CommonJS module
  // or not, return the runtime object so that we can declare the variable
  // regeneratorRuntime in the outer scope, which allows this module to be
  // injected easily by `bin/regenerator --include-runtime script.js`.
  return exports;

}(
  // If this script is executing as a CommonJS module, use module.exports
  // as the regeneratorRuntime namespace. Otherwise create a new empty
  // object. Either way, the resulting object will be used to initialize
  // the regeneratorRuntime variable at the top of this file.
  typeof module === "object" ? module.exports : {}
));

try {
  regeneratorRuntime = runtime;
} catch (accidentalStrictMode) {
  // This module should not be running in strict mode, so the above
  // assignment should always work unless something is misconfigured. Just
  // in case runtime.js accidentally runs in strict mode, we can escape
  // strict mode using a global Function call. This could conceivably fail
  // if a Content Security Policy forbids using Function, but in that case
  // the proper solution is to fix the accidental strict mode problem. If
  // you've misconfigured your bundler to force strict mode and applied a
  // CSP to forbid Function, and you're not willing to fix either of those
  // problems, please detail your unique predicament in a GitHub issue.
  Function("r", "regeneratorRuntime = r")(runtime);
}

},{}],"PMvg":[function(require,module,exports) {
module.exports = require("regenerator-runtime");

},{"regenerator-runtime":"QVnC"}],"vCa3":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _asyncToGenerator;

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }

  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}

function _asyncToGenerator(fn) {
  return function () {
    var self = this,
        args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);

      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }

      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }

      _next(undefined);
    });
  };
}
},{}],"rCyv":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/esm/asyncToGenerator"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/esm/slicedToArray"));

var _react = require("react");

var _raf = _interopRequireDefault(require("rc-util/es/raf"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var StatusQueue = ['measure', 'align', null, 'motion'];

var _default = function _default(visible, doMeasure) {
  var _useState = (0, _react.useState)(null),
      _useState2 = (0, _slicedToArray2.default)(_useState, 2),
      status = _useState2[0],
      setStatus = _useState2[1];

  var rafRef = (0, _react.useRef)();

  function cancelRaf() {
    _raf.default.cancel(rafRef.current);
  }

  function goNextStatus(callback) {
    cancelRaf();
    rafRef.current = (0, _raf.default)(function () {
      // Only align should be manually trigger
      setStatus(function (prev) {
        switch (status) {
          case 'align':
            return 'motion';

          case 'motion':
            return 'stable';
        }

        return prev;
      });
      callback === null || callback === void 0 ? void 0 : callback();
    });
  } // Init status


  (0, _react.useEffect)(function () {
    setStatus('measure');
  }, [visible]); // Go next status

  (0, _react.useEffect)(function () {
    switch (status) {
      case 'measure':
        doMeasure();
        break;
    }

    if (status) {
      rafRef.current = (0, _raf.default)( /*#__PURE__*/(0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee() {
        var index, nextStatus;
        return _regenerator.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                index = StatusQueue.indexOf(status);
                nextStatus = StatusQueue[index + 1];

                if (nextStatus && index !== -1) {
                  setStatus(nextStatus);
                }

              case 3:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      })));
    }
  }, [status]);
  (0, _react.useEffect)(function () {
    return function () {
      cancelRaf();
    };
  }, []);
  return [status, goNextStatus];
};

exports.default = _default;
},{"@babel/runtime/regenerator":"PMvg","@babel/runtime/helpers/esm/asyncToGenerator":"vCa3","@babel/runtime/helpers/esm/slicedToArray":"T12H","react":"n8MK","rc-util/es/raf":"adDJ"}],"sDvT":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/esm/slicedToArray"));

var React = _interopRequireWildcard(require("react"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = function _default(stretch) {
  var _React$useState = React.useState({
    width: 0,
    height: 0
  }),
      _React$useState2 = (0, _slicedToArray2.default)(_React$useState, 2),
      targetSize = _React$useState2[0],
      setTargetSize = _React$useState2[1];

  function measureStretch(element) {
    setTargetSize({
      width: element.offsetWidth,
      height: element.offsetHeight
    });
  } // Merge stretch style


  var style = React.useMemo(function () {
    var sizeStyle = {};

    if (stretch) {
      var width = targetSize.width,
          height = targetSize.height; // Stretch with target

      if (stretch.indexOf('height') !== -1 && height) {
        sizeStyle.height = height;
      } else if (stretch.indexOf('minHeight') !== -1 && height) {
        sizeStyle.minHeight = height;
      }

      if (stretch.indexOf('width') !== -1 && width) {
        sizeStyle.width = width;
      } else if (stretch.indexOf('minWidth') !== -1 && width) {
        sizeStyle.minWidth = width;
      }
    }

    return sizeStyle;
  }, [stretch, targetSize]);
  return [style, measureStretch];
};

exports.default = _default;
},{"@babel/runtime/helpers/esm/slicedToArray":"T12H","react":"n8MK"}],"r56U":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/esm/objectSpread2"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/esm/slicedToArray"));

var React = _interopRequireWildcard(require("react"));

var _rcAlign = _interopRequireDefault(require("rc-align"));

var _rcMotion = _interopRequireDefault(require("rc-motion"));

var _classnames = _interopRequireDefault(require("classnames"));

var _useVisibleStatus3 = _interopRequireDefault(require("./useVisibleStatus"));

var _legacyUtil = require("../utils/legacyUtil");

var _useStretchStyle3 = _interopRequireDefault(require("./useStretchStyle"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PopupInner = /*#__PURE__*/React.forwardRef(function (props, ref) {
  var visible = props.visible,
      prefixCls = props.prefixCls,
      className = props.className,
      style = props.style,
      children = props.children,
      zIndex = props.zIndex,
      stretch = props.stretch,
      destroyPopupOnHide = props.destroyPopupOnHide,
      align = props.align,
      point = props.point,
      getRootDomNode = props.getRootDomNode,
      getClassNameFromAlign = props.getClassNameFromAlign,
      onAlign = props.onAlign,
      onMouseEnter = props.onMouseEnter,
      onMouseLeave = props.onMouseLeave,
      onMouseDown = props.onMouseDown,
      onTouchStart = props.onTouchStart;
  var alignRef = (0, React.useRef)();
  var elementRef = (0, React.useRef)();

  var _useState = (0, React.useState)(),
      _useState2 = (0, _slicedToArray2.default)(_useState, 2),
      alignedClassName = _useState2[0],
      setAlignedClassName = _useState2[1]; // ======================= Measure ========================


  var _useStretchStyle = (0, _useStretchStyle3.default)(stretch),
      _useStretchStyle2 = (0, _slicedToArray2.default)(_useStretchStyle, 2),
      stretchStyle = _useStretchStyle2[0],
      measureStretchStyle = _useStretchStyle2[1];

  function doMeasure() {
    if (stretch) {
      measureStretchStyle(getRootDomNode());
    }
  } // ======================== Status ========================


  var _useVisibleStatus = (0, _useVisibleStatus3.default)(visible, doMeasure),
      _useVisibleStatus2 = (0, _slicedToArray2.default)(_useVisibleStatus, 2),
      status = _useVisibleStatus2[0],
      goNextStatus = _useVisibleStatus2[1]; // ======================== Aligns ========================


  var prepareResolveRef = (0, React.useRef)(); // `target` on `rc-align` can accept as a function to get the bind element or a point.
  // ref: https://www.npmjs.com/package/rc-align

  function getAlignTarget() {
    if (point) {
      return point;
    }

    return getRootDomNode;
  }

  function forceAlign() {
    var _alignRef$current;

    (_alignRef$current = alignRef.current) === null || _alignRef$current === void 0 ? void 0 : _alignRef$current.forceAlign();
  }

  function onInternalAlign(popupDomNode, matchAlign) {
    if (status === 'align') {
      var nextAlignedClassName = getClassNameFromAlign(matchAlign);
      setAlignedClassName(nextAlignedClassName); // Repeat until not more align needed

      if (alignedClassName !== nextAlignedClassName) {
        Promise.resolve().then(function () {
          forceAlign();
        });
      } else {
        goNextStatus(function () {
          var _prepareResolveRef$cu;

          (_prepareResolveRef$cu = prepareResolveRef.current) === null || _prepareResolveRef$cu === void 0 ? void 0 : _prepareResolveRef$cu.call(prepareResolveRef);
        });
      }

      onAlign === null || onAlign === void 0 ? void 0 : onAlign(popupDomNode, matchAlign);
    }
  } // ======================== Motion ========================


  var motion = (0, _objectSpread2.default)({}, (0, _legacyUtil.getMotion)(props));
  ['onAppearEnd', 'onEnterEnd', 'onLeaveEnd'].forEach(function (eventName) {
    var originHandler = motion[eventName];

    motion[eventName] = function (element, event) {
      goNextStatus();
      return originHandler === null || originHandler === void 0 ? void 0 : originHandler(element, event);
    };
  });

  function onShowPrepare() {
    return new Promise(function (resolve) {
      prepareResolveRef.current = resolve;
    });
  } // Go to stable directly when motion not provided


  React.useEffect(function () {
    if (!motion.motionName && status === 'motion') {
      goNextStatus();
    }
  }, [motion.motionName, status]); // ========================= Refs =========================

  React.useImperativeHandle(ref, function () {
    return {
      forceAlign: forceAlign,
      getElement: function getElement() {
        return elementRef.current;
      }
    };
  }); // ======================== Render ========================

  var mergedStyle = (0, _objectSpread2.default)((0, _objectSpread2.default)((0, _objectSpread2.default)({}, stretchStyle), {}, {
    zIndex: zIndex
  }, style), {}, {
    opacity: status === 'motion' || status === 'stable' || !visible ? undefined : 0,
    pointerEvents: status === 'stable' ? undefined : 'none'
  }); // Align status

  var alignDisabled = true;

  if ((align === null || align === void 0 ? void 0 : align.points) && (status === 'align' || status === 'stable')) {
    alignDisabled = false;
  }

  var childNode = children; // Wrapper when multiple children

  if (React.Children.count(children) > 1) {
    childNode = /*#__PURE__*/React.createElement("div", {
      className: "".concat(prefixCls, "-content")
    }, children);
  }

  return /*#__PURE__*/React.createElement(_rcMotion.default, Object.assign({
    visible: visible,
    ref: elementRef,
    leavedClassName: "".concat(prefixCls, "-hidden")
  }, motion, {
    onAppearPrepare: onShowPrepare,
    onEnterPrepare: onShowPrepare,
    removeOnLeave: destroyPopupOnHide
  }), function (_ref, motionRef) {
    var motionClassName = _ref.className,
        motionStyle = _ref.style;
    var mergedClassName = (0, _classnames.default)(prefixCls, className, alignedClassName, motionClassName);
    return /*#__PURE__*/React.createElement(_rcAlign.default, {
      target: getAlignTarget(),
      key: "popup",
      ref: alignRef,
      monitorWindowResize: true,
      disabled: alignDisabled,
      align: align,
      onAlign: onInternalAlign
    }, /*#__PURE__*/React.createElement("div", {
      ref: motionRef,
      className: mergedClassName,
      onMouseEnter: onMouseEnter,
      onMouseLeave: onMouseLeave,
      onMouseDown: onMouseDown,
      onTouchStart: onTouchStart,
      style: (0, _objectSpread2.default)((0, _objectSpread2.default)({}, motionStyle), mergedStyle)
    }, childNode));
  });
});
PopupInner.displayName = 'PopupInner';
var _default = PopupInner;
exports.default = _default;
},{"@babel/runtime/helpers/esm/objectSpread2":"UKeT","@babel/runtime/helpers/esm/slicedToArray":"T12H","react":"n8MK","rc-align":"AVA2","rc-motion":"VTMl","classnames":"qb7c","./useVisibleStatus":"rCyv","../utils/legacyUtil":"uFoq","./useStretchStyle":"sDvT"}],"NMjy":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/esm/objectSpread2"));

var React = _interopRequireWildcard(require("react"));

var _rcMotion = _interopRequireDefault(require("rc-motion"));

var _classnames = _interopRequireDefault(require("classnames"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MobilePopupInner = /*#__PURE__*/React.forwardRef(function (props, ref) {
  var prefixCls = props.prefixCls,
      visible = props.visible,
      zIndex = props.zIndex,
      children = props.children,
      _props$mobile = props.mobile;
  _props$mobile = _props$mobile === void 0 ? {} : _props$mobile;
  var popupClassName = _props$mobile.popupClassName,
      popupStyle = _props$mobile.popupStyle,
      _props$mobile$popupMo = _props$mobile.popupMotion,
      popupMotion = _props$mobile$popupMo === void 0 ? {} : _props$mobile$popupMo,
      popupRender = _props$mobile.popupRender;
  var elementRef = React.useRef(); // ========================= Refs =========================

  React.useImperativeHandle(ref, function () {
    return {
      forceAlign: function forceAlign() {},
      getElement: function getElement() {
        return elementRef.current;
      }
    };
  }); // ======================== Render ========================

  var mergedStyle = (0, _objectSpread2.default)({
    zIndex: zIndex
  }, popupStyle);
  var childNode = children; // Wrapper when multiple children

  if (React.Children.count(children) > 1) {
    childNode = /*#__PURE__*/React.createElement("div", {
      className: "".concat(prefixCls, "-content")
    }, children);
  } // Mobile support additional render


  if (popupRender) {
    childNode = popupRender(childNode);
  }

  return /*#__PURE__*/React.createElement(_rcMotion.default, Object.assign({
    visible: visible,
    ref: elementRef,
    removeOnLeave: true
  }, popupMotion), function (_ref, motionRef) {
    var motionClassName = _ref.className,
        motionStyle = _ref.style;
    var mergedClassName = (0, _classnames.default)(prefixCls, popupClassName, motionClassName);
    return /*#__PURE__*/React.createElement("div", {
      ref: motionRef,
      className: mergedClassName,
      style: (0, _objectSpread2.default)((0, _objectSpread2.default)({}, motionStyle), mergedStyle)
    }, childNode);
  });
});
MobilePopupInner.displayName = 'MobilePopupInner';
var _default = MobilePopupInner;
exports.default = _default;
},{"@babel/runtime/helpers/esm/objectSpread2":"UKeT","react":"n8MK","rc-motion":"VTMl","classnames":"qb7c"}],"Pprj":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/esm/objectSpread2"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/esm/slicedToArray"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/esm/objectWithoutProperties"));

var React = _interopRequireWildcard(require("react"));

var _isMobile = _interopRequireDefault(require("rc-util/es/isMobile"));

var _Mask = _interopRequireDefault(require("./Mask"));

var _PopupInner = _interopRequireDefault(require("./PopupInner"));

var _MobilePopupInner = _interopRequireDefault(require("./MobilePopupInner"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Popup = /*#__PURE__*/React.forwardRef(function (_ref, ref) {
  var visible = _ref.visible,
      mobile = _ref.mobile,
      props = (0, _objectWithoutProperties2.default)(_ref, ["visible", "mobile"]);

  var _useState = (0, React.useState)(visible),
      _useState2 = (0, _slicedToArray2.default)(_useState, 2),
      innerVisible = _useState2[0],
      serInnerVisible = _useState2[1];

  var _useState3 = (0, React.useState)(false),
      _useState4 = (0, _slicedToArray2.default)(_useState3, 2),
      inMobile = _useState4[0],
      setInMobile = _useState4[1];

  var cloneProps = (0, _objectSpread2.default)((0, _objectSpread2.default)({}, props), {}, {
    visible: innerVisible
  }); // We check mobile in visible changed here.
  // And this also delay set `innerVisible` to avoid popup component render flash

  (0, React.useEffect)(function () {
    serInnerVisible(visible);

    if (visible && mobile) {
      setInMobile((0, _isMobile.default)());
    }
  }, [visible, !!mobile]);
  var popupNode = inMobile ? /*#__PURE__*/React.createElement(_MobilePopupInner.default, Object.assign({}, cloneProps, {
    mobile: mobile,
    ref: ref
  })) : /*#__PURE__*/React.createElement(_PopupInner.default, Object.assign({}, cloneProps, {
    ref: ref
  })); // We can use fragment directly but this may failed some selector usage. Keep as origin logic

  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(_Mask.default, Object.assign({}, cloneProps)), popupNode);
});
Popup.displayName = 'Popup';
var _default = Popup;
exports.default = _default;
},{"@babel/runtime/helpers/esm/objectSpread2":"UKeT","@babel/runtime/helpers/esm/slicedToArray":"T12H","@babel/runtime/helpers/esm/objectWithoutProperties":"tuNH","react":"n8MK","rc-util/es/isMobile":"nb8J","./Mask":"haQR","./PopupInner":"r56U","./MobilePopupInner":"NMjy"}],"f2pu":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var React = _interopRequireWildcard(require("react"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var TriggerContext = /*#__PURE__*/React.createContext(null);
var _default = TriggerContext;
exports.default = _default;
},{"react":"n8MK"}],"PZMl":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.generateTrigger = generateTrigger;
exports.default = void 0;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/esm/objectSpread2"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/esm/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/esm/createClass"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/esm/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/esm/inherits"));

var _createSuper2 = _interopRequireDefault(require("@babel/runtime/helpers/esm/createSuper"));

var React = _interopRequireWildcard(require("react"));

var _reactDom = _interopRequireDefault(require("react-dom"));

var _raf = _interopRequireDefault(require("rc-util/es/raf"));

var _contains = _interopRequireDefault(require("rc-util/es/Dom/contains"));

var _findDOMNode = _interopRequireDefault(require("rc-util/es/Dom/findDOMNode"));

var _ref2 = require("rc-util/es/ref");

var _addEventListener = _interopRequireDefault(require("rc-util/es/Dom/addEventListener"));

var _Portal = _interopRequireDefault(require("rc-util/es/Portal"));

var _classnames = _interopRequireDefault(require("classnames"));

var _alignUtil = require("./utils/alignUtil");

var _Popup = _interopRequireDefault(require("./Popup"));

var _context = _interopRequireDefault(require("./context"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function noop() {}

function returnEmptyString() {
  return '';
}

function returnDocument(element) {
  if (element) {
    return element.ownerDocument;
  }

  return window.document;
}

var ALL_HANDLERS = ['onClick', 'onMouseDown', 'onTouchStart', 'onMouseEnter', 'onMouseLeave', 'onFocus', 'onBlur', 'onContextMenu'];
/**
 * Internal usage. Do not use in your code since this will be removed.
 */

function generateTrigger(PortalComponent) {
  var Trigger = /*#__PURE__*/function (_React$Component) {
    (0, _inherits2.default)(Trigger, _React$Component);

    var _super = (0, _createSuper2.default)(Trigger);

    function Trigger(props) {
      var _this;

      (0, _classCallCheck2.default)(this, Trigger);
      _this = _super.call(this, props);
      _this.popupRef = /*#__PURE__*/React.createRef();
      _this.triggerRef = /*#__PURE__*/React.createRef();

      _this.onMouseEnter = function (e) {
        var mouseEnterDelay = _this.props.mouseEnterDelay;

        _this.fireEvents('onMouseEnter', e);

        _this.delaySetPopupVisible(true, mouseEnterDelay, mouseEnterDelay ? null : e);
      };

      _this.onMouseMove = function (e) {
        _this.fireEvents('onMouseMove', e);

        _this.setPoint(e);
      };

      _this.onMouseLeave = function (e) {
        _this.fireEvents('onMouseLeave', e);

        _this.delaySetPopupVisible(false, _this.props.mouseLeaveDelay);
      };

      _this.onPopupMouseEnter = function () {
        _this.clearDelayTimer();
      };

      _this.onPopupMouseLeave = function (e) {
        var _this$popupRef$curren; // https://github.com/react-component/trigger/pull/13
        // react bug?


        if (e.relatedTarget && !e.relatedTarget.setTimeout && (0, _contains.default)((_this$popupRef$curren = _this.popupRef.current) === null || _this$popupRef$curren === void 0 ? void 0 : _this$popupRef$curren.getElement(), e.relatedTarget)) {
          return;
        }

        _this.delaySetPopupVisible(false, _this.props.mouseLeaveDelay);
      };

      _this.onFocus = function (e) {
        _this.fireEvents('onFocus', e); // incase focusin and focusout


        _this.clearDelayTimer();

        if (_this.isFocusToShow()) {
          _this.focusTime = Date.now();

          _this.delaySetPopupVisible(true, _this.props.focusDelay);
        }
      };

      _this.onMouseDown = function (e) {
        _this.fireEvents('onMouseDown', e);

        _this.preClickTime = Date.now();
      };

      _this.onTouchStart = function (e) {
        _this.fireEvents('onTouchStart', e);

        _this.preTouchTime = Date.now();
      };

      _this.onBlur = function (e) {
        _this.fireEvents('onBlur', e);

        _this.clearDelayTimer();

        if (_this.isBlurToHide()) {
          _this.delaySetPopupVisible(false, _this.props.blurDelay);
        }
      };

      _this.onContextMenu = function (e) {
        e.preventDefault();

        _this.fireEvents('onContextMenu', e);

        _this.setPopupVisible(true, e);
      };

      _this.onContextMenuClose = function () {
        if (_this.isContextMenuToShow()) {
          _this.close();
        }
      };

      _this.onClick = function (event) {
        _this.fireEvents('onClick', event); // focus will trigger click


        if (_this.focusTime) {
          var preTime;

          if (_this.preClickTime && _this.preTouchTime) {
            preTime = Math.min(_this.preClickTime, _this.preTouchTime);
          } else if (_this.preClickTime) {
            preTime = _this.preClickTime;
          } else if (_this.preTouchTime) {
            preTime = _this.preTouchTime;
          }

          if (Math.abs(preTime - _this.focusTime) < 20) {
            return;
          }

          _this.focusTime = 0;
        }

        _this.preClickTime = 0;
        _this.preTouchTime = 0; // Only prevent default when all the action is click.
        // https://github.com/ant-design/ant-design/issues/17043
        // https://github.com/ant-design/ant-design/issues/17291

        if (_this.isClickToShow() && (_this.isClickToHide() || _this.isBlurToHide()) && event && event.preventDefault) {
          event.preventDefault();
        }

        var nextVisible = !_this.state.popupVisible;

        if (_this.isClickToHide() && !nextVisible || nextVisible && _this.isClickToShow()) {
          _this.setPopupVisible(!_this.state.popupVisible, event);
        }
      };

      _this.onPopupMouseDown = function () {
        _this.hasPopupMouseDown = true;
        clearTimeout(_this.mouseDownTimeout);
        _this.mouseDownTimeout = window.setTimeout(function () {
          _this.hasPopupMouseDown = false;
        }, 0);

        if (_this.context) {
          var _this$context;

          (_this$context = _this.context).onPopupMouseDown.apply(_this$context, arguments);
        }
      };

      _this.onDocumentClick = function (event) {
        if (_this.props.mask && !_this.props.maskClosable) {
          return;
        }

        var target = event.target;

        var root = _this.getRootDomNode();

        var popupNode = _this.getPopupDomNode();

        if (!(0, _contains.default)(root, target) && !(0, _contains.default)(popupNode, target) && !_this.hasPopupMouseDown) {
          _this.close();
        }
      };

      _this.getRootDomNode = function () {
        var getTriggerDOMNode = _this.props.getTriggerDOMNode;

        if (getTriggerDOMNode) {
          return getTriggerDOMNode(_this.triggerRef.current);
        }

        try {
          var domNode = (0, _findDOMNode.default)(_this.triggerRef.current);

          if (domNode) {
            return domNode;
          }
        } catch (err) {// Do nothing
        }

        return _reactDom.default.findDOMNode((0, _assertThisInitialized2.default)(_this));
      };

      _this.getPopupClassNameFromAlign = function (align) {
        var className = [];
        var _this$props = _this.props,
            popupPlacement = _this$props.popupPlacement,
            builtinPlacements = _this$props.builtinPlacements,
            prefixCls = _this$props.prefixCls,
            alignPoint = _this$props.alignPoint,
            getPopupClassNameFromAlign = _this$props.getPopupClassNameFromAlign;

        if (popupPlacement && builtinPlacements) {
          className.push((0, _alignUtil.getAlignPopupClassName)(builtinPlacements, prefixCls, align, alignPoint));
        }

        if (getPopupClassNameFromAlign) {
          className.push(getPopupClassNameFromAlign(align));
        }

        return className.join(' ');
      };

      _this.getComponent = function () {
        var _this$props2 = _this.props,
            prefixCls = _this$props2.prefixCls,
            destroyPopupOnHide = _this$props2.destroyPopupOnHide,
            popupClassName = _this$props2.popupClassName,
            onPopupAlign = _this$props2.onPopupAlign,
            popupMotion = _this$props2.popupMotion,
            popupAnimation = _this$props2.popupAnimation,
            popupTransitionName = _this$props2.popupTransitionName,
            popupStyle = _this$props2.popupStyle,
            mask = _this$props2.mask,
            maskAnimation = _this$props2.maskAnimation,
            maskTransitionName = _this$props2.maskTransitionName,
            maskMotion = _this$props2.maskMotion,
            zIndex = _this$props2.zIndex,
            popup = _this$props2.popup,
            stretch = _this$props2.stretch,
            alignPoint = _this$props2.alignPoint,
            mobile = _this$props2.mobile;
        var _this$state = _this.state,
            popupVisible = _this$state.popupVisible,
            point = _this$state.point;

        var align = _this.getPopupAlign();

        var mouseProps = {};

        if (_this.isMouseEnterToShow()) {
          mouseProps.onMouseEnter = _this.onPopupMouseEnter;
        }

        if (_this.isMouseLeaveToHide()) {
          mouseProps.onMouseLeave = _this.onPopupMouseLeave;
        }

        mouseProps.onMouseDown = _this.onPopupMouseDown;
        mouseProps.onTouchStart = _this.onPopupMouseDown;
        return /*#__PURE__*/React.createElement(_Popup.default, Object.assign({
          prefixCls: prefixCls,
          destroyPopupOnHide: destroyPopupOnHide,
          visible: popupVisible,
          point: alignPoint && point,
          className: popupClassName,
          align: align,
          onAlign: onPopupAlign,
          animation: popupAnimation,
          getClassNameFromAlign: _this.getPopupClassNameFromAlign
        }, mouseProps, {
          stretch: stretch,
          getRootDomNode: _this.getRootDomNode,
          style: popupStyle,
          mask: mask,
          zIndex: zIndex,
          transitionName: popupTransitionName,
          maskAnimation: maskAnimation,
          maskTransitionName: maskTransitionName,
          maskMotion: maskMotion,
          ref: _this.popupRef,
          motion: popupMotion,
          mobile: mobile
        }), typeof popup === 'function' ? popup() : popup);
      };

      _this.attachParent = function (popupContainer) {
        _raf.default.cancel(_this.attachId);

        var _this$props3 = _this.props,
            getPopupContainer = _this$props3.getPopupContainer,
            getDocument = _this$props3.getDocument;

        var domNode = _this.getRootDomNode();

        var mountNode;

        if (!getPopupContainer) {
          mountNode = getDocument(_this.getRootDomNode()).body;
        } else if (domNode || getPopupContainer.length === 0) {
          // Compatible for legacy getPopupContainer with domNode argument.
          // If no need `domNode` argument, will call directly.
          // https://codesandbox.io/s/eloquent-mclean-ss93m?file=/src/App.js
          mountNode = getPopupContainer(domNode);
        }

        if (mountNode) {
          mountNode.appendChild(popupContainer);
        } else {
          // Retry after frame render in case parent not ready
          _this.attachId = (0, _raf.default)(function () {
            _this.attachParent(popupContainer);
          });
        }
      };

      _this.getContainer = function () {
        var getDocument = _this.props.getDocument;
        var popupContainer = getDocument(_this.getRootDomNode()).createElement('div'); // Make sure default popup container will never cause scrollbar appearing
        // https://github.com/react-component/trigger/issues/41

        popupContainer.style.position = 'absolute';
        popupContainer.style.top = '0';
        popupContainer.style.left = '0';
        popupContainer.style.width = '100%';

        _this.attachParent(popupContainer);

        return popupContainer;
      };

      _this.setPoint = function (point) {
        var alignPoint = _this.props.alignPoint;
        if (!alignPoint || !point) return;

        _this.setState({
          point: {
            pageX: point.pageX,
            pageY: point.pageY
          }
        });
      };

      _this.handlePortalUpdate = function () {
        if (_this.state.prevPopupVisible !== _this.state.popupVisible) {
          _this.props.afterPopupVisibleChange(_this.state.popupVisible);
        }
      };

      var popupVisible;

      if ('popupVisible' in props) {
        popupVisible = !!props.popupVisible;
      } else {
        popupVisible = !!props.defaultPopupVisible;
      }

      _this.state = {
        prevPopupVisible: popupVisible,
        popupVisible: popupVisible
      };
      ALL_HANDLERS.forEach(function (h) {
        _this["fire".concat(h)] = function (e) {
          _this.fireEvents(h, e);
        };
      });
      return _this;
    }

    (0, _createClass2.default)(Trigger, [{
      key: "componentDidMount",
      value: function componentDidMount() {
        this.componentDidUpdate();
      }
    }, {
      key: "componentDidUpdate",
      value: function componentDidUpdate() {
        var props = this.props;
        var state = this.state; // We must listen to `mousedown` or `touchstart`, edge case:
        // https://github.com/ant-design/ant-design/issues/5804
        // https://github.com/react-component/calendar/issues/250
        // https://github.com/react-component/trigger/issues/50

        if (state.popupVisible) {
          var currentDocument;

          if (!this.clickOutsideHandler && (this.isClickToHide() || this.isContextMenuToShow())) {
            currentDocument = props.getDocument(this.getRootDomNode());
            this.clickOutsideHandler = (0, _addEventListener.default)(currentDocument, 'mousedown', this.onDocumentClick);
          } // always hide on mobile


          if (!this.touchOutsideHandler) {
            currentDocument = currentDocument || props.getDocument(this.getRootDomNode());
            this.touchOutsideHandler = (0, _addEventListener.default)(currentDocument, 'touchstart', this.onDocumentClick);
          } // close popup when trigger type contains 'onContextMenu' and document is scrolling.


          if (!this.contextMenuOutsideHandler1 && this.isContextMenuToShow()) {
            currentDocument = currentDocument || props.getDocument(this.getRootDomNode());
            this.contextMenuOutsideHandler1 = (0, _addEventListener.default)(currentDocument, 'scroll', this.onContextMenuClose);
          } // close popup when trigger type contains 'onContextMenu' and window is blur.


          if (!this.contextMenuOutsideHandler2 && this.isContextMenuToShow()) {
            this.contextMenuOutsideHandler2 = (0, _addEventListener.default)(window, 'blur', this.onContextMenuClose);
          }

          return;
        }

        this.clearOutsideHandler();
      }
    }, {
      key: "componentWillUnmount",
      value: function componentWillUnmount() {
        this.clearDelayTimer();
        this.clearOutsideHandler();
        clearTimeout(this.mouseDownTimeout);

        _raf.default.cancel(this.attachId);
      }
    }, {
      key: "getPopupDomNode",
      value: function getPopupDomNode() {
        var _this$popupRef$curren2; // for test


        return ((_this$popupRef$curren2 = this.popupRef.current) === null || _this$popupRef$curren2 === void 0 ? void 0 : _this$popupRef$curren2.getElement()) || null;
      }
    }, {
      key: "getPopupAlign",
      value: function getPopupAlign() {
        var props = this.props;
        var popupPlacement = props.popupPlacement,
            popupAlign = props.popupAlign,
            builtinPlacements = props.builtinPlacements;

        if (popupPlacement && builtinPlacements) {
          return (0, _alignUtil.getAlignFromPlacement)(builtinPlacements, popupPlacement, popupAlign);
        }

        return popupAlign;
      }
      /**
       * @param popupVisible    Show or not the popup element
       * @param event           SyntheticEvent, used for `pointAlign`
       */

    }, {
      key: "setPopupVisible",
      value: function setPopupVisible(popupVisible, event) {
        var alignPoint = this.props.alignPoint;
        var prevPopupVisible = this.state.popupVisible;
        this.clearDelayTimer();

        if (prevPopupVisible !== popupVisible) {
          if (!('popupVisible' in this.props)) {
            this.setState({
              popupVisible: popupVisible,
              prevPopupVisible: prevPopupVisible
            });
          }

          this.props.onPopupVisibleChange(popupVisible);
        } // Always record the point position since mouseEnterDelay will delay the show


        if (alignPoint && event && popupVisible) {
          this.setPoint(event);
        }
      }
    }, {
      key: "delaySetPopupVisible",
      value: function delaySetPopupVisible(visible, delayS, event) {
        var _this2 = this;

        var delay = delayS * 1000;
        this.clearDelayTimer();

        if (delay) {
          var point = event ? {
            pageX: event.pageX,
            pageY: event.pageY
          } : null;
          this.delayTimer = window.setTimeout(function () {
            _this2.setPopupVisible(visible, point);

            _this2.clearDelayTimer();
          }, delay);
        } else {
          this.setPopupVisible(visible, event);
        }
      }
    }, {
      key: "clearDelayTimer",
      value: function clearDelayTimer() {
        if (this.delayTimer) {
          clearTimeout(this.delayTimer);
          this.delayTimer = null;
        }
      }
    }, {
      key: "clearOutsideHandler",
      value: function clearOutsideHandler() {
        if (this.clickOutsideHandler) {
          this.clickOutsideHandler.remove();
          this.clickOutsideHandler = null;
        }

        if (this.contextMenuOutsideHandler1) {
          this.contextMenuOutsideHandler1.remove();
          this.contextMenuOutsideHandler1 = null;
        }

        if (this.contextMenuOutsideHandler2) {
          this.contextMenuOutsideHandler2.remove();
          this.contextMenuOutsideHandler2 = null;
        }

        if (this.touchOutsideHandler) {
          this.touchOutsideHandler.remove();
          this.touchOutsideHandler = null;
        }
      }
    }, {
      key: "createTwoChains",
      value: function createTwoChains(event) {
        var childPros = this.props.children.props;
        var props = this.props;

        if (childPros[event] && props[event]) {
          return this["fire".concat(event)];
        }

        return childPros[event] || props[event];
      }
    }, {
      key: "isClickToShow",
      value: function isClickToShow() {
        var _this$props4 = this.props,
            action = _this$props4.action,
            showAction = _this$props4.showAction;
        return action.indexOf('click') !== -1 || showAction.indexOf('click') !== -1;
      }
    }, {
      key: "isContextMenuToShow",
      value: function isContextMenuToShow() {
        var _this$props5 = this.props,
            action = _this$props5.action,
            showAction = _this$props5.showAction;
        return action.indexOf('contextMenu') !== -1 || showAction.indexOf('contextMenu') !== -1;
      }
    }, {
      key: "isClickToHide",
      value: function isClickToHide() {
        var _this$props6 = this.props,
            action = _this$props6.action,
            hideAction = _this$props6.hideAction;
        return action.indexOf('click') !== -1 || hideAction.indexOf('click') !== -1;
      }
    }, {
      key: "isMouseEnterToShow",
      value: function isMouseEnterToShow() {
        var _this$props7 = this.props,
            action = _this$props7.action,
            showAction = _this$props7.showAction;
        return action.indexOf('hover') !== -1 || showAction.indexOf('mouseEnter') !== -1;
      }
    }, {
      key: "isMouseLeaveToHide",
      value: function isMouseLeaveToHide() {
        var _this$props8 = this.props,
            action = _this$props8.action,
            hideAction = _this$props8.hideAction;
        return action.indexOf('hover') !== -1 || hideAction.indexOf('mouseLeave') !== -1;
      }
    }, {
      key: "isFocusToShow",
      value: function isFocusToShow() {
        var _this$props9 = this.props,
            action = _this$props9.action,
            showAction = _this$props9.showAction;
        return action.indexOf('focus') !== -1 || showAction.indexOf('focus') !== -1;
      }
    }, {
      key: "isBlurToHide",
      value: function isBlurToHide() {
        var _this$props10 = this.props,
            action = _this$props10.action,
            hideAction = _this$props10.hideAction;
        return action.indexOf('focus') !== -1 || hideAction.indexOf('blur') !== -1;
      }
    }, {
      key: "forcePopupAlign",
      value: function forcePopupAlign() {
        if (this.state.popupVisible) {
          var _this$popupRef$curren3;

          (_this$popupRef$curren3 = this.popupRef.current) === null || _this$popupRef$curren3 === void 0 ? void 0 : _this$popupRef$curren3.forceAlign();
        }
      }
    }, {
      key: "fireEvents",
      value: function fireEvents(type, e) {
        var childCallback = this.props.children.props[type];

        if (childCallback) {
          childCallback(e);
        }

        var callback = this.props[type];

        if (callback) {
          callback(e);
        }
      }
    }, {
      key: "close",
      value: function close() {
        this.setPopupVisible(false);
      }
    }, {
      key: "render",
      value: function render() {
        var popupVisible = this.state.popupVisible;
        var _this$props11 = this.props,
            children = _this$props11.children,
            forceRender = _this$props11.forceRender,
            alignPoint = _this$props11.alignPoint,
            className = _this$props11.className,
            autoDestroy = _this$props11.autoDestroy;
        var child = React.Children.only(children);
        var newChildProps = {
          key: 'trigger'
        }; // ============================== Visible Handlers ==============================
        // >>> ContextMenu

        if (this.isContextMenuToShow()) {
          newChildProps.onContextMenu = this.onContextMenu;
        } else {
          newChildProps.onContextMenu = this.createTwoChains('onContextMenu');
        } // >>> Click


        if (this.isClickToHide() || this.isClickToShow()) {
          newChildProps.onClick = this.onClick;
          newChildProps.onMouseDown = this.onMouseDown;
          newChildProps.onTouchStart = this.onTouchStart;
        } else {
          newChildProps.onClick = this.createTwoChains('onClick');
          newChildProps.onMouseDown = this.createTwoChains('onMouseDown');
          newChildProps.onTouchStart = this.createTwoChains('onTouchStart');
        } // >>> Hover(enter)


        if (this.isMouseEnterToShow()) {
          newChildProps.onMouseEnter = this.onMouseEnter; // Point align

          if (alignPoint) {
            newChildProps.onMouseMove = this.onMouseMove;
          }
        } else {
          newChildProps.onMouseEnter = this.createTwoChains('onMouseEnter');
        } // >>> Hover(leave)


        if (this.isMouseLeaveToHide()) {
          newChildProps.onMouseLeave = this.onMouseLeave;
        } else {
          newChildProps.onMouseLeave = this.createTwoChains('onMouseLeave');
        } // >>> Focus


        if (this.isFocusToShow() || this.isBlurToHide()) {
          newChildProps.onFocus = this.onFocus;
          newChildProps.onBlur = this.onBlur;
        } else {
          newChildProps.onFocus = this.createTwoChains('onFocus');
          newChildProps.onBlur = this.createTwoChains('onBlur');
        } // =================================== Render ===================================


        var childrenClassName = (0, _classnames.default)(child && child.props && child.props.className, className);

        if (childrenClassName) {
          newChildProps.className = childrenClassName;
        }

        var cloneProps = (0, _objectSpread2.default)({}, newChildProps);

        if ((0, _ref2.supportRef)(child)) {
          cloneProps.ref = (0, _ref2.composeRef)(this.triggerRef, child.ref);
        }

        var trigger = /*#__PURE__*/React.cloneElement(child, cloneProps);
        var portal; // prevent unmounting after it's rendered

        if (popupVisible || this.popupRef.current || forceRender) {
          portal = /*#__PURE__*/React.createElement(PortalComponent, {
            key: "portal",
            getContainer: this.getContainer,
            didUpdate: this.handlePortalUpdate
          }, this.getComponent());
        }

        if (!popupVisible && autoDestroy) {
          portal = null;
        }

        return /*#__PURE__*/React.createElement(_context.default.Provider, {
          value: {
            onPopupMouseDown: this.onPopupMouseDown
          }
        }, trigger, portal);
      }
    }], [{
      key: "getDerivedStateFromProps",
      value: function getDerivedStateFromProps(_ref, prevState) {
        var popupVisible = _ref.popupVisible;
        var newState = {};

        if (popupVisible !== undefined && prevState.popupVisible !== popupVisible) {
          newState.popupVisible = popupVisible;
          newState.prevPopupVisible = prevState.popupVisible;
        }

        return newState;
      }
    }]);
    return Trigger;
  }(React.Component);

  Trigger.contextType = _context.default;
  Trigger.defaultProps = {
    prefixCls: 'rc-trigger-popup',
    getPopupClassNameFromAlign: returnEmptyString,
    getDocument: returnDocument,
    onPopupVisibleChange: noop,
    afterPopupVisibleChange: noop,
    onPopupAlign: noop,
    popupClassName: '',
    mouseEnterDelay: 0,
    mouseLeaveDelay: 0.1,
    focusDelay: 0,
    blurDelay: 0.15,
    popupStyle: {},
    destroyPopupOnHide: false,
    popupAlign: {},
    defaultPopupVisible: false,
    mask: false,
    maskClosable: true,
    action: [],
    showAction: [],
    hideAction: [],
    autoDestroy: false
  };
  return Trigger;
}

var _default = generateTrigger(_Portal.default);

exports.default = _default;
},{"@babel/runtime/helpers/esm/objectSpread2":"UKeT","@babel/runtime/helpers/esm/classCallCheck":"VEjx","@babel/runtime/helpers/esm/createClass":"l5p4","@babel/runtime/helpers/esm/assertThisInitialized":"bk0i","@babel/runtime/helpers/esm/inherits":"NT06","@babel/runtime/helpers/esm/createSuper":"m5aa","react":"n8MK","react-dom":"NKHc","rc-util/es/raf":"adDJ","rc-util/es/Dom/contains":"asZT","rc-util/es/Dom/findDOMNode":"beML","rc-util/es/ref":"AOnv","rc-util/es/Dom/addEventListener":"v9LT","rc-util/es/Portal":"LoYh","classnames":"qb7c","./utils/alignUtil":"Hyzp","./Popup":"Pprj","./context":"f2pu"}],"OUxT":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.placementsRtl = exports.placements = void 0;
var autoAdjustOverflow = {
  adjustX: 1,
  adjustY: 1
};
var placements = {
  topLeft: {
    points: ['bl', 'tl'],
    overflow: autoAdjustOverflow,
    offset: [0, -7]
  },
  bottomLeft: {
    points: ['tl', 'bl'],
    overflow: autoAdjustOverflow,
    offset: [0, 7]
  },
  leftTop: {
    points: ['tr', 'tl'],
    overflow: autoAdjustOverflow,
    offset: [-4, 0]
  },
  rightTop: {
    points: ['tl', 'tr'],
    overflow: autoAdjustOverflow,
    offset: [4, 0]
  }
};
exports.placements = placements;
var placementsRtl = {
  topLeft: {
    points: ['bl', 'tl'],
    overflow: autoAdjustOverflow,
    offset: [0, -7]
  },
  bottomLeft: {
    points: ['tl', 'bl'],
    overflow: autoAdjustOverflow,
    offset: [0, 7]
  },
  rightTop: {
    points: ['tr', 'tl'],
    overflow: autoAdjustOverflow,
    offset: [-4, 0]
  },
  leftTop: {
    points: ['tl', 'tr'],
    overflow: autoAdjustOverflow,
    offset: [4, 0]
  }
};
exports.placementsRtl = placementsRtl;
var _default = placements;
exports.default = _default;
},{}],"gPV8":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.SubMenu = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/esm/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/esm/createClass"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/esm/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/esm/inherits"));

var _createSuper2 = _interopRequireDefault(require("@babel/runtime/helpers/esm/createSuper"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/esm/defineProperty"));

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/esm/objectSpread2"));

var React = _interopRequireWildcard(require("react"));

var ReactDOM = _interopRequireWildcard(require("react-dom"));

var _rcTrigger = _interopRequireDefault(require("rc-trigger"));

var _raf = _interopRequireDefault(require("rc-util/es/raf"));

var _KeyCode = _interopRequireDefault(require("rc-util/es/KeyCode"));

var _rcMotion = _interopRequireDefault(require("rc-motion"));

var _classnames = _interopRequireDefault(require("classnames"));

var _miniStore = require("mini-store");

var _SubPopupMenu = _interopRequireDefault(require("./SubPopupMenu"));

var _placements = require("./placements");

var _util = require("./util");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var guid = 0;
var popupPlacementMap = {
  horizontal: 'bottomLeft',
  vertical: 'rightTop',
  'vertical-left': 'rightTop',
  'vertical-right': 'leftTop'
};

var updateDefaultActiveFirst = function updateDefaultActiveFirst(store, eventKey, defaultActiveFirst) {
  var menuId = (0, _util.getMenuIdFromSubMenuEventKey)(eventKey);
  var state = store.getState();
  store.setState({
    defaultActiveFirst: (0, _objectSpread2.default)((0, _objectSpread2.default)({}, state.defaultActiveFirst), {}, (0, _defineProperty2.default)({}, menuId, defaultActiveFirst))
  });
};

var SubMenu = /*#__PURE__*/function (_React$Component) {
  (0, _inherits2.default)(SubMenu, _React$Component);

  var _super = (0, _createSuper2.default)(SubMenu);

  function SubMenu(props) {
    var _this;

    (0, _classCallCheck2.default)(this, SubMenu);
    _this = _super.call(this, props);

    _this.onDestroy = function (key) {
      _this.props.onDestroy(key);
    };
    /**
     * note:
     *  This legacy code that `onKeyDown` is called by parent instead of dom self.
     *  which need return code to check if this event is handled
     */


    _this.onKeyDown = function (e) {
      var keyCode = e.keyCode;
      var menu = _this.menuInstance;
      var store = _this.props.store;

      var visible = _this.getVisible();

      if (keyCode === _KeyCode.default.ENTER) {
        _this.onTitleClick(e);

        updateDefaultActiveFirst(store, _this.props.eventKey, true);
        return true;
      }

      if (keyCode === _KeyCode.default.RIGHT) {
        if (visible) {
          menu.onKeyDown(e);
        } else {
          _this.triggerOpenChange(true); // need to update current menu's defaultActiveFirst value


          updateDefaultActiveFirst(store, _this.props.eventKey, true);
        }

        return true;
      }

      if (keyCode === _KeyCode.default.LEFT) {
        var handled;

        if (visible) {
          handled = menu.onKeyDown(e);
        } else {
          return undefined;
        }

        if (!handled) {
          _this.triggerOpenChange(false);

          handled = true;
        }

        return handled;
      }

      if (visible && (keyCode === _KeyCode.default.UP || keyCode === _KeyCode.default.DOWN)) {
        return menu.onKeyDown(e);
      }

      return undefined;
    };

    _this.onOpenChange = function (e) {
      _this.props.onOpenChange(e);
    };

    _this.onPopupVisibleChange = function (visible) {
      _this.triggerOpenChange(visible, visible ? 'mouseenter' : 'mouseleave');
    };

    _this.onMouseEnter = function (e) {
      var _this$props = _this.props,
          key = _this$props.eventKey,
          onMouseEnter = _this$props.onMouseEnter,
          store = _this$props.store;
      updateDefaultActiveFirst(store, _this.props.eventKey, false);
      onMouseEnter({
        key: key,
        domEvent: e
      });
    };

    _this.onMouseLeave = function (e) {
      var _this$props2 = _this.props,
          parentMenu = _this$props2.parentMenu,
          eventKey = _this$props2.eventKey,
          onMouseLeave = _this$props2.onMouseLeave;
      parentMenu.subMenuInstance = (0, _assertThisInitialized2.default)(_this);
      onMouseLeave({
        key: eventKey,
        domEvent: e
      });
    };

    _this.onTitleMouseEnter = function (domEvent) {
      var _this$props3 = _this.props,
          key = _this$props3.eventKey,
          onItemHover = _this$props3.onItemHover,
          onTitleMouseEnter = _this$props3.onTitleMouseEnter;
      onItemHover({
        key: key,
        hover: true
      });
      onTitleMouseEnter({
        key: key,
        domEvent: domEvent
      });
    };

    _this.onTitleMouseLeave = function (e) {
      var _this$props4 = _this.props,
          parentMenu = _this$props4.parentMenu,
          eventKey = _this$props4.eventKey,
          onItemHover = _this$props4.onItemHover,
          onTitleMouseLeave = _this$props4.onTitleMouseLeave;
      parentMenu.subMenuInstance = (0, _assertThisInitialized2.default)(_this);
      onItemHover({
        key: eventKey,
        hover: false
      });
      onTitleMouseLeave({
        key: eventKey,
        domEvent: e
      });
    };

    _this.onTitleClick = function (e) {
      var _assertThisInitialize = (0, _assertThisInitialized2.default)(_this),
          props = _assertThisInitialize.props;

      props.onTitleClick({
        key: props.eventKey,
        domEvent: e
      });

      if (props.triggerSubMenuAction === 'hover') {
        return;
      }

      _this.triggerOpenChange(!_this.getVisible(), 'click');

      updateDefaultActiveFirst(props.store, _this.props.eventKey, false);
    };

    _this.onSubMenuClick = function (info) {
      // in the case of overflowed submenu
      // onClick is not copied over
      if (typeof _this.props.onClick === 'function') {
        _this.props.onClick(_this.addKeyPath(info));
      }
    };

    _this.onSelect = function (info) {
      _this.props.onSelect(info);
    };

    _this.onDeselect = function (info) {
      _this.props.onDeselect(info);
    };

    _this.getPrefixCls = function () {
      return "".concat(_this.props.rootPrefixCls, "-submenu");
    };

    _this.getActiveClassName = function () {
      return "".concat(_this.getPrefixCls(), "-active");
    };

    _this.getDisabledClassName = function () {
      return "".concat(_this.getPrefixCls(), "-disabled");
    };

    _this.getSelectedClassName = function () {
      return "".concat(_this.getPrefixCls(), "-selected");
    };

    _this.getOpenClassName = function () {
      return "".concat(_this.props.rootPrefixCls, "-submenu-open");
    };

    _this.getVisible = function () {
      return _this.state.isOpen;
    };

    _this.getMode = function () {
      return _this.state.mode;
    };

    _this.saveMenuInstance = function (c) {
      // children menu instance
      _this.menuInstance = c;
    };

    _this.addKeyPath = function (info) {
      return (0, _objectSpread2.default)((0, _objectSpread2.default)({}, info), {}, {
        keyPath: (info.keyPath || []).concat(_this.props.eventKey)
      });
    };

    _this.triggerOpenChange = function (open, type) {
      var key = _this.props.eventKey;

      var openChange = function openChange() {
        _this.onOpenChange({
          key: key,
          item: (0, _assertThisInitialized2.default)(_this),
          trigger: type,
          open: open
        });
      };

      if (type === 'mouseenter') {
        // make sure mouseenter happen after other menu item's mouseleave
        _this.mouseenterTimeout = setTimeout(function () {
          openChange();
        }, 0);
      } else {
        openChange();
      }
    };

    _this.isChildrenSelected = function () {
      var ret = {
        find: false
      };
      (0, _util.loopMenuItemRecursively)(_this.props.children, _this.props.selectedKeys, ret);
      return ret.find;
    };

    _this.isInlineMode = function () {
      return _this.getMode() === 'inline';
    };

    _this.adjustWidth = function () {
      /* istanbul ignore if */
      if (!_this.subMenuTitle || !_this.menuInstance) {
        return;
      }

      var popupMenu = ReactDOM.findDOMNode(_this.menuInstance);

      if (popupMenu.offsetWidth >= _this.subMenuTitle.offsetWidth) {
        return;
      }
      /* istanbul ignore next */


      popupMenu.style.minWidth = "".concat(_this.subMenuTitle.offsetWidth, "px");
    };

    _this.saveSubMenuTitle = function (subMenuTitle) {
      _this.subMenuTitle = subMenuTitle;
    };

    _this.getBaseProps = function () {
      var _assertThisInitialize2 = (0, _assertThisInitialized2.default)(_this),
          props = _assertThisInitialize2.props;

      var mergedMode = _this.getMode();

      return {
        mode: mergedMode === 'horizontal' ? 'vertical' : mergedMode,
        visible: _this.getVisible(),
        level: props.level + 1,
        inlineIndent: props.inlineIndent,
        focusable: false,
        onClick: _this.onSubMenuClick,
        onSelect: _this.onSelect,
        onDeselect: _this.onDeselect,
        onDestroy: _this.onDestroy,
        selectedKeys: props.selectedKeys,
        eventKey: "".concat(props.eventKey, "-menu-"),
        openKeys: props.openKeys,
        motion: props.motion,
        onOpenChange: _this.onOpenChange,
        subMenuOpenDelay: props.subMenuOpenDelay,
        parentMenu: (0, _assertThisInitialized2.default)(_this),
        subMenuCloseDelay: props.subMenuCloseDelay,
        forceSubMenuRender: props.forceSubMenuRender,
        triggerSubMenuAction: props.triggerSubMenuAction,
        builtinPlacements: props.builtinPlacements,
        defaultActiveFirst: props.store.getState().defaultActiveFirst[(0, _util.getMenuIdFromSubMenuEventKey)(props.eventKey)],
        multiple: props.multiple,
        prefixCls: props.rootPrefixCls,
        id: _this.internalMenuId,
        manualRef: _this.saveMenuInstance,
        itemIcon: props.itemIcon,
        expandIcon: props.expandIcon,
        direction: props.direction
      };
    };

    _this.getMotion = function (mode, visible) {
      var _assertThisInitialize3 = (0, _assertThisInitialized2.default)(_this),
          haveRendered = _assertThisInitialize3.haveRendered;

      var _this$props5 = _this.props,
          motion = _this$props5.motion,
          rootPrefixCls = _this$props5.rootPrefixCls; // don't show transition on first rendering (no animation for opened menu)
      // show appear transition if it's not visible (not sure why)
      // show appear transition if it's not inline mode

      var mergedMotion = (0, _objectSpread2.default)((0, _objectSpread2.default)({}, motion), {}, {
        leavedClassName: "".concat(rootPrefixCls, "-hidden"),
        removeOnLeave: false,
        motionAppear: haveRendered || !visible || mode !== 'inline'
      });
      return mergedMotion;
    };

    var store = props.store,
        eventKey = props.eventKey;

    var _store$getState = store.getState(),
        defaultActiveFirst = _store$getState.defaultActiveFirst;

    _this.isRootMenu = false;
    var value = false;

    if (defaultActiveFirst) {
      value = defaultActiveFirst[eventKey];
    }

    updateDefaultActiveFirst(store, eventKey, value);
    _this.state = {
      mode: props.mode,
      isOpen: props.isOpen
    };
    return _this;
  }

  (0, _createClass2.default)(SubMenu, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.componentDidUpdate();
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate() {
      var _this2 = this;

      var _this$props6 = this.props,
          mode = _this$props6.mode,
          parentMenu = _this$props6.parentMenu,
          manualRef = _this$props6.manualRef,
          isOpen = _this$props6.isOpen;

      var updateState = function updateState() {
        _this2.setState({
          mode: mode,
          isOpen: isOpen
        });
      }; // Delay sync when mode changed in case openKeys change not sync


      var isOpenChanged = isOpen !== this.state.isOpen;
      var isModeChanged = mode !== this.state.mode;

      if (isModeChanged || isOpenChanged) {
        _raf.default.cancel(this.updateStateRaf);

        if (isModeChanged) {
          this.updateStateRaf = (0, _raf.default)(updateState);
        } else {
          updateState();
        }
      } // invoke customized ref to expose component to mixin


      if (manualRef) {
        manualRef(this);
      }

      if (mode !== 'horizontal' || !(parentMenu === null || parentMenu === void 0 ? void 0 : parentMenu.isRootMenu) || !isOpen) {
        return;
      }

      this.minWidthTimeout = setTimeout(function () {
        return _this2.adjustWidth();
      }, 0);
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      var _this$props7 = this.props,
          onDestroy = _this$props7.onDestroy,
          eventKey = _this$props7.eventKey;

      if (onDestroy) {
        onDestroy(eventKey);
      }
      /* istanbul ignore if */


      if (this.minWidthTimeout) {
        clearTimeout(this.minWidthTimeout);
      }
      /* istanbul ignore if */


      if (this.mouseenterTimeout) {
        clearTimeout(this.mouseenterTimeout);
      }

      _raf.default.cancel(this.updateStateRaf);
    }
  }, {
    key: "renderPopupMenu",
    value: function renderPopupMenu(className, style) {
      var baseProps = this.getBaseProps();
      /**
       * zombiej: Why SubPopupMenu here?
       * Seems whatever popup or inline mode both will render SubPopupMenu.
       * It's controlled by Trigger for popup or not.
       */

      return /*#__PURE__*/React.createElement(_SubPopupMenu.default, Object.assign({}, baseProps, {
        id: this.internalMenuId,
        className: className,
        style: style
      }), this.props.children);
    }
  }, {
    key: "renderChildren",
    value: function renderChildren() {
      var _this3 = this;

      var baseProps = this.getBaseProps();
      var mode = baseProps.mode,
          visible = baseProps.visible,
          forceSubMenuRender = baseProps.forceSubMenuRender,
          direction = baseProps.direction; // [Legacy] getMotion must be called before `haveRendered`

      var mergedMotion = this.getMotion(mode, visible);
      this.haveRendered = true;
      this.haveOpened = this.haveOpened || visible || forceSubMenuRender; // never rendered not planning to, don't render

      if (!this.haveOpened) {
        return /*#__PURE__*/React.createElement("div", null);
      }

      var sharedClassName = (0, _classnames.default)("".concat(baseProps.prefixCls, "-sub"), (0, _defineProperty2.default)({}, "".concat(baseProps.prefixCls, "-rtl"), direction === 'rtl'));

      if (!this.isInlineMode()) {
        return this.renderPopupMenu(sharedClassName);
      }

      return /*#__PURE__*/React.createElement(_rcMotion.default, Object.assign({
        visible: baseProps.visible
      }, mergedMotion), function (_ref) {
        var className = _ref.className,
            style = _ref.style;
        var mergedClassName = (0, _classnames.default)(sharedClassName, className);
        return _this3.renderPopupMenu(mergedClassName, style);
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _classNames2, _props$parentMenu, _classNames3;

      var props = (0, _objectSpread2.default)({}, this.props);
      var visible = this.getVisible();
      var prefixCls = this.getPrefixCls();
      var inline = this.isInlineMode();
      var mergedMode = this.getMode();
      var className = (0, _classnames.default)(prefixCls, "".concat(prefixCls, "-").concat(mergedMode), (_classNames2 = {}, (0, _defineProperty2.default)(_classNames2, props.className, !!props.className), (0, _defineProperty2.default)(_classNames2, this.getOpenClassName(), visible), (0, _defineProperty2.default)(_classNames2, this.getActiveClassName(), props.active || visible && !inline), (0, _defineProperty2.default)(_classNames2, this.getDisabledClassName(), props.disabled), (0, _defineProperty2.default)(_classNames2, this.getSelectedClassName(), this.isChildrenSelected()), _classNames2));

      if (!this.internalMenuId) {
        if (props.eventKey) {
          this.internalMenuId = "".concat(props.eventKey, "$Menu");
        } else {
          guid += 1;
          this.internalMenuId = "$__$".concat(guid, "$Menu");
        }
      }

      var mouseEvents = {};
      var titleClickEvents = {};
      var titleMouseEvents = {};

      if (!props.disabled) {
        mouseEvents = {
          onMouseLeave: this.onMouseLeave,
          onMouseEnter: this.onMouseEnter
        }; // only works in title, not outer li

        titleClickEvents = {
          onClick: this.onTitleClick
        };
        titleMouseEvents = {
          onMouseEnter: this.onTitleMouseEnter,
          onMouseLeave: this.onTitleMouseLeave
        };
      }

      var style = {};
      var direction = props.direction;
      var isRTL = direction === 'rtl';

      if (inline) {
        if (isRTL) {
          style.paddingRight = props.inlineIndent * props.level;
        } else {
          style.paddingLeft = props.inlineIndent * props.level;
        }
      }

      var ariaOwns = {}; // only set aria-owns when menu is open
      // otherwise it would be an invalid aria-owns value
      // since corresponding node cannot be found

      if (this.getVisible()) {
        ariaOwns = {
          'aria-owns': this.internalMenuId
        };
      } // expand custom icon should NOT be displayed in menu with horizontal mode.


      var icon = null;

      if (mergedMode !== 'horizontal') {
        icon = this.props.expandIcon; // ReactNode

        if (typeof this.props.expandIcon === 'function') {
          icon = /*#__PURE__*/React.createElement(this.props.expandIcon, (0, _objectSpread2.default)({}, this.props));
        }
      }

      var title = /*#__PURE__*/React.createElement("div", Object.assign({
        ref: this.saveSubMenuTitle,
        style: style,
        className: "".concat(prefixCls, "-title"),
        role: "button"
      }, titleMouseEvents, titleClickEvents, {
        "aria-expanded": visible
      }, ariaOwns, {
        "aria-haspopup": "true",
        title: typeof props.title === 'string' ? props.title : undefined
      }), props.title, icon || /*#__PURE__*/React.createElement("i", {
        className: "".concat(prefixCls, "-arrow")
      }));
      var children = this.renderChildren();
      var getPopupContainer = ((_props$parentMenu = props.parentMenu) === null || _props$parentMenu === void 0 ? void 0 : _props$parentMenu.isRootMenu) ? props.parentMenu.props.getPopupContainer : function (triggerNode) {
        return triggerNode.parentNode;
      };
      var popupPlacement = popupPlacementMap[mergedMode];
      var popupAlign = props.popupOffset ? {
        offset: props.popupOffset
      } : {};
      var popupClassName = (0, _classnames.default)((_classNames3 = {}, (0, _defineProperty2.default)(_classNames3, props.popupClassName, props.popupClassName && !inline), (0, _defineProperty2.default)(_classNames3, "".concat(prefixCls, "-rtl"), isRTL), _classNames3));
      var disabled = props.disabled,
          triggerSubMenuAction = props.triggerSubMenuAction,
          subMenuOpenDelay = props.subMenuOpenDelay,
          forceSubMenuRender = props.forceSubMenuRender,
          subMenuCloseDelay = props.subMenuCloseDelay,
          builtinPlacements = props.builtinPlacements;

      _util.menuAllProps.forEach(function (key) {
        return delete props[key];
      }); // Set onClick to null, to ignore propagated onClick event


      delete props.onClick;
      var placement = isRTL ? Object.assign({}, _placements.placementsRtl, builtinPlacements) : Object.assign({}, _placements.placements, builtinPlacements);
      delete props.direction; // [Legacy] It's a fast fix,
      // but we should check if we can refactor this to make code more easy to understand

      var baseProps = this.getBaseProps();
      var mergedMotion = inline ? null : this.getMotion(baseProps.mode, baseProps.visible);
      return /*#__PURE__*/React.createElement("li", Object.assign({}, props, mouseEvents, {
        className: className,
        role: "menuitem"
      }), /*#__PURE__*/React.createElement(_rcTrigger.default, {
        prefixCls: prefixCls,
        popupClassName: (0, _classnames.default)("".concat(prefixCls, "-popup"), popupClassName),
        getPopupContainer: getPopupContainer,
        builtinPlacements: placement,
        popupPlacement: popupPlacement,
        popupVisible: inline ? false : visible,
        popupAlign: popupAlign,
        popup: inline ? null : children,
        action: disabled || inline ? [] : [triggerSubMenuAction],
        mouseEnterDelay: subMenuOpenDelay,
        mouseLeaveDelay: subMenuCloseDelay,
        onPopupVisibleChange: this.onPopupVisibleChange,
        forceRender: forceSubMenuRender,
        popupMotion: mergedMotion
      }, title), inline ? children : null);
    }
  }]);
  return SubMenu;
}(React.Component);

exports.SubMenu = SubMenu;
SubMenu.defaultProps = {
  onMouseEnter: _util.noop,
  onMouseLeave: _util.noop,
  onTitleMouseEnter: _util.noop,
  onTitleMouseLeave: _util.noop,
  onTitleClick: _util.noop,
  manualRef: _util.noop,
  mode: 'vertical',
  title: ''
};
var connected = (0, _miniStore.connect)(function (_ref2, _ref3) {
  var openKeys = _ref2.openKeys,
      activeKey = _ref2.activeKey,
      selectedKeys = _ref2.selectedKeys;
  var eventKey = _ref3.eventKey,
      subMenuKey = _ref3.subMenuKey;
  return {
    isOpen: openKeys.indexOf(eventKey) > -1,
    active: activeKey[subMenuKey] === eventKey,
    selectedKeys: selectedKeys
  };
})(SubMenu);
connected.isSubMenu = true;
var _default = connected;
exports.default = _default;
},{"@babel/runtime/helpers/esm/classCallCheck":"VEjx","@babel/runtime/helpers/esm/createClass":"l5p4","@babel/runtime/helpers/esm/assertThisInitialized":"bk0i","@babel/runtime/helpers/esm/inherits":"NT06","@babel/runtime/helpers/esm/createSuper":"m5aa","@babel/runtime/helpers/esm/defineProperty":"gpd2","@babel/runtime/helpers/esm/objectSpread2":"UKeT","react":"n8MK","react-dom":"NKHc","rc-trigger":"PZMl","rc-util/es/raf":"adDJ","rc-util/es/KeyCode":"Imvn","rc-motion":"VTMl","classnames":"qb7c","mini-store":"vhHG","./SubPopupMenu":"uihZ","./placements":"OUxT","./util":"OcqA"}],"Bmg6":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/esm/toConsumableArray"));

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/esm/objectSpread2"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/esm/objectWithoutProperties"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/esm/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/esm/createClass"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/esm/inherits"));

var _createSuper2 = _interopRequireDefault(require("@babel/runtime/helpers/esm/createSuper"));

var React = _interopRequireWildcard(require("react"));

var _resizeObserverPolyfill = _interopRequireDefault(require("resize-observer-polyfill"));

var _SubMenu = _interopRequireDefault(require("./SubMenu"));

var _util = require("./util");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MENUITEM_OVERFLOWED_CLASSNAME = 'menuitem-overflowed';
var FLOAT_PRECISION_ADJUST = 0.5;

var DOMWrap = /*#__PURE__*/function (_React$Component) {
  (0, _inherits2.default)(DOMWrap, _React$Component);

  var _super = (0, _createSuper2.default)(DOMWrap);

  function DOMWrap() {
    var _this;

    (0, _classCallCheck2.default)(this, DOMWrap);
    _this = _super.apply(this, arguments);
    _this.resizeObserver = null;
    _this.mutationObserver = null; // original scroll size of the list

    _this.originalTotalWidth = 0; // copy of overflowed items

    _this.overflowedItems = []; // cache item of the original items (so we can track the size and order)

    _this.menuItemSizes = [];
    _this.cancelFrameId = null;
    _this.state = {
      lastVisibleIndex: undefined
    };
    _this.childRef = /*#__PURE__*/React.createRef(); // get all valid menuItem nodes

    _this.getMenuItemNodes = function () {
      var prefixCls = _this.props.prefixCls;
      var ul = _this.childRef.current;

      if (!ul) {
        return [];
      } // filter out all overflowed indicator placeholder


      return [].slice.call(ul.children).filter(function (node) {
        return node.className.split(' ').indexOf("".concat(prefixCls, "-overflowed-submenu")) < 0;
      });
    };

    _this.getOverflowedSubMenuItem = function (keyPrefix, overflowedItems, renderPlaceholder) {
      var _this$props = _this.props,
          overflowedIndicator = _this$props.overflowedIndicator,
          level = _this$props.level,
          mode = _this$props.mode,
          prefixCls = _this$props.prefixCls,
          theme = _this$props.theme;

      if (level !== 1 || mode !== 'horizontal') {
        return null;
      } // put all the overflowed item inside a submenu
      // with a title of overflow indicator ('...')


      var copy = _this.props.children[0];
      var _copy$props = copy.props,
          throwAway = _copy$props.children,
          title = _copy$props.title,
          propStyle = _copy$props.style,
          rest = (0, _objectWithoutProperties2.default)(_copy$props, ["children", "title", "style"]);
      var style = (0, _objectSpread2.default)({}, propStyle);
      var key = "".concat(keyPrefix, "-overflowed-indicator");
      var eventKey = "".concat(keyPrefix, "-overflowed-indicator");

      if (overflowedItems.length === 0 && renderPlaceholder !== true) {
        style = (0, _objectSpread2.default)((0, _objectSpread2.default)({}, style), {}, {
          display: 'none'
        });
      } else if (renderPlaceholder) {
        style = (0, _objectSpread2.default)((0, _objectSpread2.default)({}, style), {}, {
          visibility: 'hidden',
          // prevent from taking normal dom space
          position: 'absolute'
        });
        key = "".concat(key, "-placeholder");
        eventKey = "".concat(eventKey, "-placeholder");
      }

      var popupClassName = theme ? "".concat(prefixCls, "-").concat(theme) : '';
      var props = {};

      _util.menuAllProps.forEach(function (k) {
        if (rest[k] !== undefined) {
          props[k] = rest[k];
        }
      });

      return /*#__PURE__*/React.createElement(_SubMenu.default, Object.assign({
        title: overflowedIndicator,
        className: "".concat(prefixCls, "-overflowed-submenu"),
        popupClassName: popupClassName
      }, props, {
        key: key,
        eventKey: eventKey,
        disabled: false,
        style: style
      }), overflowedItems);
    }; // memorize rendered menuSize


    _this.setChildrenWidthAndResize = function () {
      if (_this.props.mode !== 'horizontal') {
        return;
      }

      var ul = _this.childRef.current;

      if (!ul) {
        return;
      }

      var ulChildrenNodes = ul.children;

      if (!ulChildrenNodes || ulChildrenNodes.length === 0) {
        return;
      }

      var lastOverflowedIndicatorPlaceholder = ul.children[ulChildrenNodes.length - 1]; // need last overflowed indicator for calculating length;

      (0, _util.setStyle)(lastOverflowedIndicatorPlaceholder, 'display', 'inline-block');

      var menuItemNodes = _this.getMenuItemNodes(); // reset display attribute for all hidden elements caused by overflow to calculate updated width
      // and then reset to original state after width calculation


      var overflowedItems = menuItemNodes.filter(function (c) {
        return c.className.split(' ').indexOf(MENUITEM_OVERFLOWED_CLASSNAME) >= 0;
      });
      overflowedItems.forEach(function (c) {
        (0, _util.setStyle)(c, 'display', 'inline-block');
      });
      _this.menuItemSizes = menuItemNodes.map(function (c) {
        return (0, _util.getWidth)(c, true);
      });
      overflowedItems.forEach(function (c) {
        (0, _util.setStyle)(c, 'display', 'none');
      });
      _this.overflowedIndicatorWidth = (0, _util.getWidth)(ul.children[ul.children.length - 1], true);
      _this.originalTotalWidth = _this.menuItemSizes.reduce(function (acc, cur) {
        return acc + cur;
      }, 0);

      _this.handleResize(); // prevent the overflowed indicator from taking space;


      (0, _util.setStyle)(lastOverflowedIndicatorPlaceholder, 'display', 'none');
    };

    _this.handleResize = function () {
      if (_this.props.mode !== 'horizontal') {
        return;
      }

      var ul = _this.childRef.current;

      if (!ul) {
        return;
      }

      var width = (0, _util.getWidth)(ul);
      _this.overflowedItems = [];
      var currentSumWidth = 0; // index for last visible child in horizontal mode

      var lastVisibleIndex; // float number comparison could be problematic
      // e.g. 0.1 + 0.2 > 0.3 =====> true
      // thus using FLOAT_PRECISION_ADJUST as buffer to help the situation

      if (_this.originalTotalWidth > width + FLOAT_PRECISION_ADJUST) {
        lastVisibleIndex = -1;

        _this.menuItemSizes.forEach(function (liWidth) {
          currentSumWidth += liWidth;

          if (currentSumWidth + _this.overflowedIndicatorWidth <= width) {
            lastVisibleIndex += 1;
          }
        });
      }

      _this.setState({
        lastVisibleIndex: lastVisibleIndex
      });
    };

    return _this;
  }

  (0, _createClass2.default)(DOMWrap, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      this.setChildrenWidthAndResize();

      if (this.props.level === 1 && this.props.mode === 'horizontal') {
        var menuUl = this.childRef.current;

        if (!menuUl) {
          return;
        }

        this.resizeObserver = new _resizeObserverPolyfill.default(function (entries) {
          entries.forEach(function () {
            var cancelFrameId = _this2.cancelFrameId;
            cancelAnimationFrame(cancelFrameId);
            _this2.cancelFrameId = requestAnimationFrame(_this2.setChildrenWidthAndResize);
          });
        });
        [].slice.call(menuUl.children).concat(menuUl).forEach(function (el) {
          _this2.resizeObserver.observe(el);
        });

        if (typeof MutationObserver !== 'undefined') {
          this.mutationObserver = new MutationObserver(function () {
            _this2.resizeObserver.disconnect();

            [].slice.call(menuUl.children).concat(menuUl).forEach(function (el) {
              _this2.resizeObserver.observe(el);
            });

            _this2.setChildrenWidthAndResize();
          });
          this.mutationObserver.observe(menuUl, {
            attributes: false,
            childList: true,
            subTree: false
          });
        }
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      if (this.resizeObserver) {
        this.resizeObserver.disconnect();
      }

      if (this.mutationObserver) {
        this.mutationObserver.disconnect();
      }

      cancelAnimationFrame(this.cancelFrameId);
    }
  }, {
    key: "renderChildren",
    value: function renderChildren(children) {
      var _this3 = this; // need to take care of overflowed items in horizontal mode


      var lastVisibleIndex = this.state.lastVisibleIndex;
      return (children || []).reduce(function (acc, childNode, index) {
        var item = childNode;

        if (_this3.props.mode === 'horizontal') {
          var overflowed = _this3.getOverflowedSubMenuItem(childNode.props.eventKey, []);

          if (lastVisibleIndex !== undefined && _this3.props.className.indexOf("".concat(_this3.props.prefixCls, "-root")) !== -1) {
            if (index > lastVisibleIndex) {
              item = /*#__PURE__*/React.cloneElement(childNode, // 这里修改 eventKey 是为了防止隐藏状态下还会触发 openkeys 事件
              {
                style: {
                  display: 'none'
                },
                eventKey: "".concat(childNode.props.eventKey, "-hidden"),

                /**
                 * Legacy code. Here `className` never used:
                 * https://github.com/react-component/menu/commit/4cd6b49fce9d116726f4ea00dda85325d6f26500#diff-e2fa48f75c2dd2318295cde428556a76R240
                 */
                className: "".concat(MENUITEM_OVERFLOWED_CLASSNAME)
              });
            }

            if (index === lastVisibleIndex + 1) {
              _this3.overflowedItems = children.slice(lastVisibleIndex + 1).map(function (c) {
                return /*#__PURE__*/React.cloneElement(c, // children[index].key will become '.$key' in clone by default,
                // we have to overwrite with the correct key explicitly
                {
                  key: c.props.eventKey,
                  mode: 'vertical-left'
                });
              });
              overflowed = _this3.getOverflowedSubMenuItem(childNode.props.eventKey, _this3.overflowedItems);
            }
          }

          var ret = [].concat((0, _toConsumableArray2.default)(acc), [overflowed, item]);

          if (index === children.length - 1) {
            // need a placeholder for calculating overflowed indicator width
            ret.push(_this3.getOverflowedSubMenuItem(childNode.props.eventKey, [], true));
          }

          return ret;
        }

        return [].concat((0, _toConsumableArray2.default)(acc), [item]);
      }, []);
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props2 = this.props,
          visible = _this$props2.visible,
          prefixCls = _this$props2.prefixCls,
          overflowedIndicator = _this$props2.overflowedIndicator,
          mode = _this$props2.mode,
          level = _this$props2.level,
          tag = _this$props2.tag,
          children = _this$props2.children,
          theme = _this$props2.theme,
          rest = (0, _objectWithoutProperties2.default)(_this$props2, ["visible", "prefixCls", "overflowedIndicator", "mode", "level", "tag", "children", "theme"]);
      var Tag = tag;
      return /*#__PURE__*/React.createElement(Tag, Object.assign({
        ref: this.childRef
      }, rest), this.renderChildren(children));
    }
  }]);
  return DOMWrap;
}(React.Component);

DOMWrap.defaultProps = {
  tag: 'div',
  className: ''
};
var _default = DOMWrap;
exports.default = _default;
},{"@babel/runtime/helpers/esm/toConsumableArray":"Qv3s","@babel/runtime/helpers/esm/objectSpread2":"UKeT","@babel/runtime/helpers/esm/objectWithoutProperties":"tuNH","@babel/runtime/helpers/esm/classCallCheck":"VEjx","@babel/runtime/helpers/esm/createClass":"l5p4","@babel/runtime/helpers/esm/inherits":"NT06","@babel/runtime/helpers/esm/createSuper":"m5aa","react":"n8MK","resize-observer-polyfill":"C4qV","./SubMenu":"gPV8","./util":"OcqA"}],"uihZ":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getActiveKey = getActiveKey;
exports.saveRef = saveRef;
exports.default = exports.SubPopupMenu = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/esm/extends"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/esm/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/esm/createClass"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/esm/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/esm/inherits"));

var _createSuper2 = _interopRequireDefault(require("@babel/runtime/helpers/esm/createSuper"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/esm/defineProperty"));

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/esm/objectSpread2"));

var React = _interopRequireWildcard(require("react"));

var _miniStore = require("mini-store");

var _KeyCode = _interopRequireDefault(require("rc-util/es/KeyCode"));

var _createChainedFunction = _interopRequireDefault(require("rc-util/es/createChainedFunction"));

var _toArray = _interopRequireDefault(require("rc-util/es/Children/toArray"));

var _shallowequal = _interopRequireDefault(require("shallowequal"));

var _classnames = _interopRequireDefault(require("classnames"));

var _util = require("./util");

var _DOMWrap = _interopRequireDefault(require("./DOMWrap"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function allDisabled(arr) {
  if (!arr.length) {
    return true;
  }

  return arr.every(function (c) {
    return !!c.props.disabled;
  });
}

function updateActiveKey(store, menuId, activeKey) {
  var state = store.getState();
  store.setState({
    activeKey: (0, _objectSpread2.default)((0, _objectSpread2.default)({}, state.activeKey), {}, (0, _defineProperty2.default)({}, menuId, activeKey))
  });
}

function getEventKey(props) {
  // when eventKey not available ,it's menu and return menu id '0-menu-'
  return props.eventKey || '0-menu-';
}

function getActiveKey(props, originalActiveKey) {
  var activeKey = originalActiveKey;
  var children = props.children,
      eventKey = props.eventKey;

  if (activeKey) {
    var found;
    (0, _util.loopMenuItem)(children, function (c, i) {
      if (c && c.props && !c.props.disabled && activeKey === (0, _util.getKeyFromChildrenIndex)(c, eventKey, i)) {
        found = true;
      }
    });

    if (found) {
      return activeKey;
    }
  }

  activeKey = null;

  if (props.defaultActiveFirst) {
    (0, _util.loopMenuItem)(children, function (c, i) {
      if (!activeKey && c && !c.props.disabled) {
        activeKey = (0, _util.getKeyFromChildrenIndex)(c, eventKey, i);
      }
    });
    return activeKey;
  }

  return activeKey;
}

function saveRef(c) {
  if (c) {
    var index = this.instanceArray.indexOf(c);

    if (index !== -1) {
      // update component if it's already inside instanceArray
      this.instanceArray[index] = c;
    } else {
      // add component if it's not in instanceArray yet;
      this.instanceArray.push(c);
    }
  }
}

var SubPopupMenu = /*#__PURE__*/function (_React$Component) {
  (0, _inherits2.default)(SubPopupMenu, _React$Component);

  var _super = (0, _createSuper2.default)(SubPopupMenu);

  function SubPopupMenu(props) {
    var _this;

    (0, _classCallCheck2.default)(this, SubPopupMenu);
    _this = _super.call(this, props);
    /**
     * all keyboard events callbacks run from here at first
     *
     * note:
     *  This legacy code that `onKeyDown` is called by parent instead of dom self.
     *  which need return code to check if this event is handled
     */

    _this.onKeyDown = function (e, callback) {
      var keyCode = e.keyCode;
      var handled;

      _this.getFlatInstanceArray().forEach(function (obj) {
        if (obj && obj.props.active && obj.onKeyDown) {
          handled = obj.onKeyDown(e);
        }
      });

      if (handled) {
        return 1;
      }

      var activeItem = null;

      if (keyCode === _KeyCode.default.UP || keyCode === _KeyCode.default.DOWN) {
        activeItem = _this.step(keyCode === _KeyCode.default.UP ? -1 : 1);
      }

      if (activeItem) {
        e.preventDefault();
        updateActiveKey(_this.props.store, getEventKey(_this.props), activeItem.props.eventKey);

        if (typeof callback === 'function') {
          callback(activeItem);
        }

        return 1;
      }

      return undefined;
    };

    _this.onItemHover = function (e) {
      var key = e.key,
          hover = e.hover;
      updateActiveKey(_this.props.store, getEventKey(_this.props), hover ? key : null);
    };

    _this.onDeselect = function (selectInfo) {
      _this.props.onDeselect(selectInfo);
    };

    _this.onSelect = function (selectInfo) {
      _this.props.onSelect(selectInfo);
    };

    _this.onClick = function (e) {
      _this.props.onClick(e);
    };

    _this.onOpenChange = function (e) {
      _this.props.onOpenChange(e);
    };

    _this.onDestroy = function (key) {
      /* istanbul ignore next */
      _this.props.onDestroy(key);
    };

    _this.getFlatInstanceArray = function () {
      return _this.instanceArray;
    };

    _this.step = function (direction) {
      var children = _this.getFlatInstanceArray();

      var activeKey = _this.props.store.getState().activeKey[getEventKey(_this.props)];

      var len = children.length;

      if (!len) {
        return null;
      }

      if (direction < 0) {
        children = children.concat().reverse();
      } // find current activeIndex


      var activeIndex = -1;
      children.every(function (c, ci) {
        if (c && c.props.eventKey === activeKey) {
          activeIndex = ci;
          return false;
        }

        return true;
      });

      if (!_this.props.defaultActiveFirst && activeIndex !== -1 && allDisabled(children.slice(activeIndex, len - 1))) {
        return undefined;
      }

      var start = (activeIndex + 1) % len;
      var i = start;

      do {
        var child = children[i];

        if (!child || child.props.disabled) {
          i = (i + 1) % len;
        } else {
          return child;
        }
      } while (i !== start);

      return null;
    };

    _this.renderCommonMenuItem = function (child, i, extraProps) {
      var state = _this.props.store.getState();

      var _assertThisInitialize = (0, _assertThisInitialized2.default)(_this),
          props = _assertThisInitialize.props;

      var key = (0, _util.getKeyFromChildrenIndex)(child, props.eventKey, i);
      var childProps = child.props; // https://github.com/ant-design/ant-design/issues/11517#issuecomment-477403055

      if (!childProps || typeof child.type === 'string') {
        return child;
      }

      var isActive = key === state.activeKey;
      var newChildProps = (0, _objectSpread2.default)((0, _objectSpread2.default)({
        mode: childProps.mode || props.mode,
        level: props.level,
        inlineIndent: props.inlineIndent,
        renderMenuItem: _this.renderMenuItem,
        rootPrefixCls: props.prefixCls,
        index: i,
        parentMenu: props.parentMenu,
        // customized ref function, need to be invoked manually in child's componentDidMount
        manualRef: childProps.disabled ? undefined : (0, _createChainedFunction.default)(child.ref, saveRef.bind((0, _assertThisInitialized2.default)(_this))),
        eventKey: key,
        active: !childProps.disabled && isActive,
        multiple: props.multiple,
        onClick: function onClick(e) {
          (childProps.onClick || _util.noop)(e);

          _this.onClick(e);
        },
        onItemHover: _this.onItemHover,
        motion: props.motion,
        subMenuOpenDelay: props.subMenuOpenDelay,
        subMenuCloseDelay: props.subMenuCloseDelay,
        forceSubMenuRender: props.forceSubMenuRender,
        onOpenChange: _this.onOpenChange,
        onDeselect: _this.onDeselect,
        onSelect: _this.onSelect,
        builtinPlacements: props.builtinPlacements,
        itemIcon: childProps.itemIcon || _this.props.itemIcon,
        expandIcon: childProps.expandIcon || _this.props.expandIcon
      }, extraProps), {}, {
        direction: props.direction
      }); // ref: https://github.com/ant-design/ant-design/issues/13943

      if (props.mode === 'inline' || (0, _util.isMobileDevice)()) {
        newChildProps.triggerSubMenuAction = 'click';
      }

      return /*#__PURE__*/React.cloneElement(child, (0, _objectSpread2.default)((0, _objectSpread2.default)({}, newChildProps), {}, {
        key: key || i
      }));
    };

    _this.renderMenuItem = function (c, i, subMenuKey) {
      /* istanbul ignore if */
      if (!c) {
        return null;
      }

      var state = _this.props.store.getState();

      var extraProps = {
        openKeys: state.openKeys,
        selectedKeys: state.selectedKeys,
        triggerSubMenuAction: _this.props.triggerSubMenuAction,
        subMenuKey: subMenuKey
      };
      return _this.renderCommonMenuItem(c, i, extraProps);
    };

    props.store.setState({
      activeKey: (0, _objectSpread2.default)((0, _objectSpread2.default)({}, props.store.getState().activeKey), {}, (0, _defineProperty2.default)({}, props.eventKey, getActiveKey(props, props.activeKey)))
    });
    _this.instanceArray = [];
    return _this;
  }

  (0, _createClass2.default)(SubPopupMenu, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      // invoke customized ref to expose component to mixin
      if (this.props.manualRef) {
        this.props.manualRef(this);
      }
    }
  }, {
    key: "shouldComponentUpdate",
    value: function shouldComponentUpdate(nextProps) {
      return this.props.visible || nextProps.visible || this.props.className !== nextProps.className || !(0, _shallowequal.default)(this.props.style, nextProps.style);
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      var props = this.props;
      var originalActiveKey = 'activeKey' in props ? props.activeKey : props.store.getState().activeKey[getEventKey(props)];
      var activeKey = getActiveKey(props, originalActiveKey);

      if (activeKey !== originalActiveKey) {
        updateActiveKey(props.store, getEventKey(props), activeKey);
      } else if ('activeKey' in prevProps) {
        // If prev activeKey is not same as current activeKey,
        // we should set it.
        var prevActiveKey = getActiveKey(prevProps, prevProps.activeKey);

        if (activeKey !== prevActiveKey) {
          updateActiveKey(props.store, getEventKey(props), activeKey);
        }
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var props = (0, _extends2.default)({}, this.props);
      this.instanceArray = [];
      var className = (0, _classnames.default)(props.prefixCls, props.className, "".concat(props.prefixCls, "-").concat(props.mode));
      var domProps = {
        className: className,
        // role could be 'select' and by default set to menu
        role: props.role || 'menu'
      };

      if (props.id) {
        domProps.id = props.id;
      }

      if (props.focusable) {
        domProps.tabIndex = 0;
        domProps.onKeyDown = this.onKeyDown;
      }

      var prefixCls = props.prefixCls,
          eventKey = props.eventKey,
          visible = props.visible,
          level = props.level,
          mode = props.mode,
          overflowedIndicator = props.overflowedIndicator,
          theme = props.theme;

      _util.menuAllProps.forEach(function (key) {
        return delete props[key];
      }); // Otherwise, the propagated click event will trigger another onClick


      delete props.onClick;
      return /*#__PURE__*/React.createElement(_DOMWrap.default, Object.assign({}, props, {
        prefixCls: prefixCls,
        mode: mode,
        tag: "ul",
        level: level,
        theme: theme,
        visible: visible,
        overflowedIndicator: overflowedIndicator
      }, domProps), (0, _toArray.default)(props.children).map(function (c, i) {
        return _this2.renderMenuItem(c, i, eventKey || '0-menu-');
      }));
    }
  }]);
  return SubPopupMenu;
}(React.Component);

exports.SubPopupMenu = SubPopupMenu;
SubPopupMenu.defaultProps = {
  prefixCls: 'rc-menu',
  className: '',
  mode: 'vertical',
  level: 1,
  inlineIndent: 24,
  visible: true,
  focusable: true,
  style: {},
  manualRef: _util.noop
};
var connected = (0, _miniStore.connect)()(SubPopupMenu);
var _default = connected;
exports.default = _default;
},{"@babel/runtime/helpers/esm/extends":"SpjQ","@babel/runtime/helpers/esm/classCallCheck":"VEjx","@babel/runtime/helpers/esm/createClass":"l5p4","@babel/runtime/helpers/esm/assertThisInitialized":"bk0i","@babel/runtime/helpers/esm/inherits":"NT06","@babel/runtime/helpers/esm/createSuper":"m5aa","@babel/runtime/helpers/esm/defineProperty":"gpd2","@babel/runtime/helpers/esm/objectSpread2":"UKeT","react":"n8MK","mini-store":"vhHG","rc-util/es/KeyCode":"Imvn","rc-util/es/createChainedFunction":"zyvd","rc-util/es/Children/toArray":"artt","shallowequal":"pz6A","classnames":"qb7c","./util":"OcqA","./DOMWrap":"Bmg6"}],"db11":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getMotion = getMotion;

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/esm/typeof"));

var _warning = _interopRequireDefault(require("rc-util/es/warning"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getMotion(_ref, _ref2, menuMode) {
  var prefixCls = _ref.prefixCls,
      motion = _ref.motion,
      _ref$defaultMotions = _ref.defaultMotions,
      defaultMotions = _ref$defaultMotions === void 0 ? {} : _ref$defaultMotions,
      openAnimation = _ref.openAnimation,
      openTransitionName = _ref.openTransitionName;
  var switchingModeFromInline = _ref2.switchingModeFromInline;

  if (motion) {
    return motion;
  }

  if ((0, _typeof2.default)(openAnimation) === 'object' && openAnimation) {
    (0, _warning.default)(false, 'Object type of `openAnimation` is removed. Please use `motion` instead.');
  } else if (typeof openAnimation === 'string') {
    return {
      motionName: "".concat(prefixCls, "-open-").concat(openAnimation)
    };
  }

  if (openTransitionName) {
    return {
      motionName: openTransitionName
    };
  } // Default logic


  var defaultMotion = defaultMotions[menuMode];

  if (defaultMotion) {
    return defaultMotion;
  } // When mode switch from inline
  // submenu should hide without animation


  return switchingModeFromInline ? null : defaultMotions.other;
}
},{"@babel/runtime/helpers/esm/typeof":"xLw6","rc-util/es/warning":"YOfO"}],"JLqT":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/esm/objectSpread2"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/esm/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/esm/createClass"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/esm/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/esm/inherits"));

var _createSuper2 = _interopRequireDefault(require("@babel/runtime/helpers/esm/createSuper"));

var React = _interopRequireWildcard(require("react"));

var _miniStore = require("mini-store");

var _omit = _interopRequireDefault(require("rc-util/es/omit"));

var _SubPopupMenu = _interopRequireWildcard(require("./SubPopupMenu"));

var _util = require("./util");

var _legacyUtil = require("./utils/legacyUtil");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Menu = /*#__PURE__*/function (_React$Component) {
  (0, _inherits2.default)(Menu, _React$Component);

  var _super = (0, _createSuper2.default)(Menu);

  function Menu(props) {
    var _this;

    (0, _classCallCheck2.default)(this, Menu);
    _this = _super.call(this, props);

    _this.onSelect = function (selectInfo) {
      var _assertThisInitialize = (0, _assertThisInitialized2.default)(_this),
          props = _assertThisInitialize.props;

      if (props.selectable) {
        // root menu
        var _this$store$getState = _this.store.getState(),
            _selectedKeys = _this$store$getState.selectedKeys;

        var selectedKey = selectInfo.key;

        if (props.multiple) {
          _selectedKeys = _selectedKeys.concat([selectedKey]);
        } else {
          _selectedKeys = [selectedKey];
        }

        if (!('selectedKeys' in props)) {
          _this.store.setState({
            selectedKeys: _selectedKeys
          });
        }

        props.onSelect((0, _objectSpread2.default)((0, _objectSpread2.default)({}, selectInfo), {}, {
          selectedKeys: _selectedKeys
        }));
      }
    };

    _this.onClick = function (e) {
      var mode = _this.getRealMenuMode();

      var _assertThisInitialize2 = (0, _assertThisInitialized2.default)(_this),
          store = _assertThisInitialize2.store,
          onOpenChange = _assertThisInitialize2.props.onOpenChange;

      if (mode !== 'inline' && !('openKeys' in _this.props)) {
        // closing vertical popup submenu after click it
        store.setState({
          openKeys: []
        });
        onOpenChange([]);
      }

      _this.props.onClick(e);
    }; // onKeyDown needs to be exposed as a instance method
    // e.g., in rc-select, we need to navigate menu item while
    // current active item is rc-select input box rather than the menu itself


    _this.onKeyDown = function (e, callback) {
      _this.innerMenu.getWrappedInstance().onKeyDown(e, callback);
    };

    _this.onOpenChange = function (event) {
      var _assertThisInitialize3 = (0, _assertThisInitialized2.default)(_this),
          props = _assertThisInitialize3.props;

      var openKeys = _this.store.getState().openKeys.concat();

      var changed = false;

      var processSingle = function processSingle(e) {
        var oneChanged = false;

        if (e.open) {
          oneChanged = openKeys.indexOf(e.key) === -1;

          if (oneChanged) {
            openKeys.push(e.key);
          }
        } else {
          var index = openKeys.indexOf(e.key);
          oneChanged = index !== -1;

          if (oneChanged) {
            openKeys.splice(index, 1);
          }
        }

        changed = changed || oneChanged;
      };

      if (Array.isArray(event)) {
        // batch change call
        event.forEach(processSingle);
      } else {
        processSingle(event);
      }

      if (changed) {
        if (!('openKeys' in _this.props)) {
          _this.store.setState({
            openKeys: openKeys
          });
        }

        props.onOpenChange(openKeys);
      }
    };

    _this.onDeselect = function (selectInfo) {
      var _assertThisInitialize4 = (0, _assertThisInitialized2.default)(_this),
          props = _assertThisInitialize4.props;

      if (props.selectable) {
        var _selectedKeys2 = _this.store.getState().selectedKeys.concat();

        var selectedKey = selectInfo.key;

        var index = _selectedKeys2.indexOf(selectedKey);

        if (index !== -1) {
          _selectedKeys2.splice(index, 1);
        }

        if (!('selectedKeys' in props)) {
          _this.store.setState({
            selectedKeys: _selectedKeys2
          });
        }

        props.onDeselect((0, _objectSpread2.default)((0, _objectSpread2.default)({}, selectInfo), {}, {
          selectedKeys: _selectedKeys2
        }));
      }
    }; // Restore vertical mode when menu is collapsed responsively when mounted
    // https://github.com/ant-design/ant-design/issues/13104
    // TODO: not a perfect solution,
    // looking a new way to avoid setting switchingModeFromInline in this situation


    _this.onMouseEnter = function (e) {
      _this.restoreModeVerticalFromInline();

      var onMouseEnter = _this.props.onMouseEnter;

      if (onMouseEnter) {
        onMouseEnter(e);
      }
    };

    _this.onTransitionEnd = function (e) {
      // when inlineCollapsed menu width animation finished
      // https://github.com/ant-design/ant-design/issues/12864
      var widthCollapsed = e.propertyName === 'width' && e.target === e.currentTarget; // Fix SVGElement e.target.className.indexOf is not a function
      // https://github.com/ant-design/ant-design/issues/15699

      var className = e.target.className; // SVGAnimatedString.animVal should be identical to SVGAnimatedString.baseVal,
      // unless during an animation.

      var classNameValue = Object.prototype.toString.call(className) === '[object SVGAnimatedString]' ? className.animVal : className; // Fix for <Menu style={{ width: '100%' }} />,
      // the width transition won't trigger when menu is collapsed
      // https://github.com/ant-design/ant-design-pro/issues/2783

      var iconScaled = e.propertyName === 'font-size' && classNameValue.indexOf('anticon') >= 0;

      if (widthCollapsed || iconScaled) {
        _this.restoreModeVerticalFromInline();
      }
    };

    _this.setInnerMenu = function (node) {
      _this.innerMenu = node;
    };

    _this.isRootMenu = true;
    var selectedKeys = props.defaultSelectedKeys;
    var openKeys = props.defaultOpenKeys;

    if ('selectedKeys' in props) {
      selectedKeys = props.selectedKeys || [];
    }

    if ('openKeys' in props) {
      openKeys = props.openKeys || [];
    }

    _this.store = (0, _miniStore.create)({
      selectedKeys: selectedKeys,
      openKeys: openKeys,
      activeKey: {
        '0-menu-': (0, _SubPopupMenu.getActiveKey)(props, props.activeKey)
      }
    });
    _this.state = {
      switchingModeFromInline: false,
      prevProps: props,
      inlineOpenKeys: [],
      store: _this.store
    };
    return _this;
  }

  (0, _createClass2.default)(Menu, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.updateMiniStore();
      this.updateMenuDisplay();
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      var _this$props = this.props,
          siderCollapsed = _this$props.siderCollapsed,
          inlineCollapsed = _this$props.inlineCollapsed,
          onOpenChange = _this$props.onOpenChange;

      if (!prevProps.inlineCollapsed && inlineCollapsed || !prevProps.siderCollapsed && siderCollapsed) {
        onOpenChange([]);
      }

      this.updateMiniStore();
      this.updateMenuDisplay();
    }
  }, {
    key: "updateMenuDisplay",
    value: function updateMenuDisplay() {
      var collapsedWidth = this.props.collapsedWidth,
          store = this.store,
          prevOpenKeys = this.prevOpenKeys; // https://github.com/ant-design/ant-design/issues/8587

      var hideMenu = this.getInlineCollapsed() && (collapsedWidth === 0 || collapsedWidth === '0' || collapsedWidth === '0px');

      if (hideMenu) {
        this.prevOpenKeys = store.getState().openKeys.concat();
        this.store.setState({
          openKeys: []
        });
      } else if (prevOpenKeys) {
        this.store.setState({
          openKeys: prevOpenKeys
        });
        this.prevOpenKeys = null;
      }
    }
  }, {
    key: "getRealMenuMode",
    value: function getRealMenuMode() {
      var mode = this.props.mode;
      var switchingModeFromInline = this.state.switchingModeFromInline;
      var inlineCollapsed = this.getInlineCollapsed();

      if (switchingModeFromInline && inlineCollapsed) {
        return 'inline';
      }

      return inlineCollapsed ? 'vertical' : mode;
    }
  }, {
    key: "getInlineCollapsed",
    value: function getInlineCollapsed() {
      var _this$props2 = this.props,
          inlineCollapsed = _this$props2.inlineCollapsed,
          siderCollapsed = _this$props2.siderCollapsed;

      if (siderCollapsed !== undefined) {
        return siderCollapsed;
      }

      return inlineCollapsed;
    }
  }, {
    key: "restoreModeVerticalFromInline",
    value: function restoreModeVerticalFromInline() {
      var switchingModeFromInline = this.state.switchingModeFromInline;

      if (switchingModeFromInline) {
        this.setState({
          switchingModeFromInline: false
        });
      }
    }
  }, {
    key: "updateMiniStore",
    value: function updateMiniStore() {
      if ('selectedKeys' in this.props) {
        this.store.setState({
          selectedKeys: this.props.selectedKeys || []
        });
      }

      if ('openKeys' in this.props) {
        this.store.setState({
          openKeys: this.props.openKeys || []
        });
      }
    }
  }, {
    key: "render",
    value: function render() {
      var props = (0, _objectSpread2.default)({}, (0, _omit.default)(this.props, ['collapsedWidth', 'siderCollapsed', 'defaultMotions']));
      var mode = this.getRealMenuMode();
      props.className += " ".concat(props.prefixCls, "-root");

      if (props.direction === 'rtl') {
        props.className += " ".concat(props.prefixCls, "-rtl");
      }

      props = (0, _objectSpread2.default)((0, _objectSpread2.default)({}, props), {}, {
        mode: mode,
        onClick: this.onClick,
        onOpenChange: this.onOpenChange,
        onDeselect: this.onDeselect,
        onSelect: this.onSelect,
        onMouseEnter: this.onMouseEnter,
        onTransitionEnd: this.onTransitionEnd,
        parentMenu: this,
        motion: (0, _legacyUtil.getMotion)(this.props, this.state, mode)
      });
      delete props.openAnimation;
      delete props.openTransitionName;
      return /*#__PURE__*/React.createElement(_miniStore.Provider, {
        store: this.store
      }, /*#__PURE__*/React.createElement(_SubPopupMenu.default, Object.assign({}, props, {
        ref: this.setInnerMenu
      }), this.props.children));
    }
  }], [{
    key: "getDerivedStateFromProps",
    value: function getDerivedStateFromProps(nextProps, prevState) {
      var prevProps = prevState.prevProps,
          store = prevState.store;
      var prevStoreState = store.getState();
      var newStoreState = {};
      var newState = {
        prevProps: nextProps
      };

      if (prevProps.mode === 'inline' && nextProps.mode !== 'inline') {
        newState.switchingModeFromInline = true;
      }

      if ('openKeys' in nextProps) {
        newStoreState.openKeys = nextProps.openKeys || [];
      } else {
        // [Legacy] Old code will return after `openKeys` changed.
        // Not sure the reason, we should keep this logic still.
        if (nextProps.inlineCollapsed && !prevProps.inlineCollapsed || nextProps.siderCollapsed && !prevProps.siderCollapsed) {
          newState.switchingModeFromInline = true;
          newState.inlineOpenKeys = prevStoreState.openKeys;
          newStoreState.openKeys = [];
        }

        if (!nextProps.inlineCollapsed && prevProps.inlineCollapsed || !nextProps.siderCollapsed && prevProps.siderCollapsed) {
          newStoreState.openKeys = prevState.inlineOpenKeys;
          newState.inlineOpenKeys = [];
        }
      }

      if (Object.keys(newStoreState).length) {
        store.setState(newStoreState);
      }

      return newState;
    }
  }]);
  return Menu;
}(React.Component);

Menu.defaultProps = {
  selectable: true,
  onClick: _util.noop,
  onSelect: _util.noop,
  onOpenChange: _util.noop,
  onDeselect: _util.noop,
  defaultSelectedKeys: [],
  defaultOpenKeys: [],
  subMenuOpenDelay: 0.1,
  subMenuCloseDelay: 0.1,
  triggerSubMenuAction: 'hover',
  prefixCls: 'rc-menu',
  className: '',
  mode: 'vertical',
  style: {},
  builtinPlacements: {},
  overflowedIndicator: /*#__PURE__*/React.createElement("span", null, "\xB7\xB7\xB7")
};
var _default = Menu;
exports.default = _default;
},{"@babel/runtime/helpers/esm/objectSpread2":"UKeT","@babel/runtime/helpers/esm/classCallCheck":"VEjx","@babel/runtime/helpers/esm/createClass":"l5p4","@babel/runtime/helpers/esm/assertThisInitialized":"bk0i","@babel/runtime/helpers/esm/inherits":"NT06","@babel/runtime/helpers/esm/createSuper":"m5aa","react":"n8MK","mini-store":"vhHG","rc-util/es/omit":"P8ML","./SubPopupMenu":"uihZ","./util":"OcqA","./utils/legacyUtil":"db11"}],"NeBp":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.MenuItem = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/esm/defineProperty"));

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/esm/objectSpread2"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/esm/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/esm/createClass"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/esm/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/esm/inherits"));

var _createSuper2 = _interopRequireDefault(require("@babel/runtime/helpers/esm/createSuper"));

var React = _interopRequireWildcard(require("react"));

var _KeyCode = _interopRequireDefault(require("rc-util/es/KeyCode"));

var _classnames = _interopRequireDefault(require("classnames"));

var _omit = _interopRequireDefault(require("rc-util/es/omit"));

var _miniStore = require("mini-store");

var _util = require("./util");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MenuItem = /*#__PURE__*/function (_React$Component) {
  (0, _inherits2.default)(MenuItem, _React$Component);

  var _super = (0, _createSuper2.default)(MenuItem);

  function MenuItem() {
    var _this;

    (0, _classCallCheck2.default)(this, MenuItem);
    _this = _super.apply(this, arguments);

    _this.onKeyDown = function (e) {
      var keyCode = e.keyCode;

      if (keyCode === _KeyCode.default.ENTER) {
        _this.onClick(e);

        return true;
      }

      return undefined;
    };

    _this.onMouseLeave = function (e) {
      var _this$props = _this.props,
          eventKey = _this$props.eventKey,
          onItemHover = _this$props.onItemHover,
          onMouseLeave = _this$props.onMouseLeave;
      onItemHover({
        key: eventKey,
        hover: false
      });
      onMouseLeave({
        key: eventKey,
        domEvent: e
      });
    };

    _this.onMouseEnter = function (e) {
      var _this$props2 = _this.props,
          eventKey = _this$props2.eventKey,
          onItemHover = _this$props2.onItemHover,
          onMouseEnter = _this$props2.onMouseEnter;
      onItemHover({
        key: eventKey,
        hover: true
      });
      onMouseEnter({
        key: eventKey,
        domEvent: e
      });
    };

    _this.onClick = function (e) {
      var _this$props3 = _this.props,
          eventKey = _this$props3.eventKey,
          multiple = _this$props3.multiple,
          onClick = _this$props3.onClick,
          onSelect = _this$props3.onSelect,
          onDeselect = _this$props3.onDeselect,
          isSelected = _this$props3.isSelected;
      var info = {
        key: eventKey,
        keyPath: [eventKey],
        item: (0, _assertThisInitialized2.default)(_this),
        domEvent: e
      };
      onClick(info);

      if (multiple) {
        if (isSelected) {
          onDeselect(info);
        } else {
          onSelect(info);
        }
      } else if (!isSelected) {
        onSelect(info);
      }
    };

    _this.saveNode = function (node) {
      _this.node = node;
    };

    return _this;
  }

  (0, _createClass2.default)(MenuItem, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      // invoke customized ref to expose component to mixin
      this.callRef();
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate() {
      this.callRef();
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      var props = this.props;

      if (props.onDestroy) {
        props.onDestroy(props.eventKey);
      }
    }
  }, {
    key: "getPrefixCls",
    value: function getPrefixCls() {
      return "".concat(this.props.rootPrefixCls, "-item");
    }
  }, {
    key: "getActiveClassName",
    value: function getActiveClassName() {
      return "".concat(this.getPrefixCls(), "-active");
    }
  }, {
    key: "getSelectedClassName",
    value: function getSelectedClassName() {
      return "".concat(this.getPrefixCls(), "-selected");
    }
  }, {
    key: "getDisabledClassName",
    value: function getDisabledClassName() {
      return "".concat(this.getPrefixCls(), "-disabled");
    }
  }, {
    key: "callRef",
    value: function callRef() {
      if (this.props.manualRef) {
        this.props.manualRef(this);
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _classNames;

      var props = (0, _objectSpread2.default)({}, this.props);
      var className = (0, _classnames.default)(this.getPrefixCls(), props.className, (_classNames = {}, (0, _defineProperty2.default)(_classNames, this.getActiveClassName(), !props.disabled && props.active), (0, _defineProperty2.default)(_classNames, this.getSelectedClassName(), props.isSelected), (0, _defineProperty2.default)(_classNames, this.getDisabledClassName(), props.disabled), _classNames));
      var attrs = (0, _objectSpread2.default)((0, _objectSpread2.default)({}, props.attribute), {}, {
        title: typeof props.title === 'string' ? props.title : undefined,
        className: className,
        // set to menuitem by default
        role: props.role || 'menuitem',
        'aria-disabled': props.disabled
      });

      if (props.role === 'option') {
        // overwrite to option
        attrs = (0, _objectSpread2.default)((0, _objectSpread2.default)({}, attrs), {}, {
          role: 'option',
          'aria-selected': props.isSelected
        });
      } else if (props.role === null || props.role === 'none') {
        // sometimes we want to specify role inside <li/> element
        // <li><a role='menuitem'>Link</a></li> would be a good example
        // in this case the role on <li/> should be "none" to
        // remove the implied listitem role.
        // https://www.w3.org/TR/wai-aria-practices-1.1/examples/menubar/menubar-1/menubar-1.html
        attrs.role = 'none';
      } // In case that onClick/onMouseLeave/onMouseEnter is passed down from owner


      var mouseEvent = {
        onClick: props.disabled ? null : this.onClick,
        onMouseLeave: props.disabled ? null : this.onMouseLeave,
        onMouseEnter: props.disabled ? null : this.onMouseEnter
      };
      var style = (0, _objectSpread2.default)({}, props.style);

      if (props.mode === 'inline') {
        if (props.direction === 'rtl') {
          style.paddingRight = props.inlineIndent * props.level;
        } else {
          style.paddingLeft = props.inlineIndent * props.level;
        }
      }

      _util.menuAllProps.forEach(function (key) {
        return delete props[key];
      });

      delete props.direction;
      var icon = this.props.itemIcon;

      if (typeof this.props.itemIcon === 'function') {
        // TODO: This is a bug which should fixed after TS refactor
        icon = /*#__PURE__*/React.createElement(this.props.itemIcon, this.props);
      }

      return /*#__PURE__*/React.createElement("li", Object.assign({}, (0, _omit.default)(props, ['onClick', 'onMouseEnter', 'onMouseLeave', 'onSelect']), attrs, mouseEvent, {
        style: style,
        ref: this.saveNode
      }), props.children, icon);
    }
  }]);
  return MenuItem;
}(React.Component);

exports.MenuItem = MenuItem;
MenuItem.isMenuItem = true;
MenuItem.defaultProps = {
  onSelect: _util.noop,
  onMouseEnter: _util.noop,
  onMouseLeave: _util.noop,
  manualRef: _util.noop
};
var connected = (0, _miniStore.connect)(function (_ref, _ref2) {
  var activeKey = _ref.activeKey,
      selectedKeys = _ref.selectedKeys;
  var eventKey = _ref2.eventKey,
      subMenuKey = _ref2.subMenuKey;
  return {
    active: activeKey[subMenuKey] === eventKey,
    isSelected: selectedKeys.indexOf(eventKey) !== -1
  };
})(MenuItem);
var _default = connected;
exports.default = _default;
},{"@babel/runtime/helpers/esm/defineProperty":"gpd2","@babel/runtime/helpers/esm/objectSpread2":"UKeT","@babel/runtime/helpers/esm/classCallCheck":"VEjx","@babel/runtime/helpers/esm/createClass":"l5p4","@babel/runtime/helpers/esm/assertThisInitialized":"bk0i","@babel/runtime/helpers/esm/inherits":"NT06","@babel/runtime/helpers/esm/createSuper":"m5aa","react":"n8MK","rc-util/es/KeyCode":"Imvn","classnames":"qb7c","rc-util/es/omit":"P8ML","mini-store":"vhHG","./util":"OcqA"}],"vrf4":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/esm/extends"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/esm/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/esm/createClass"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/esm/inherits"));

var _createSuper2 = _interopRequireDefault(require("@babel/runtime/helpers/esm/createSuper"));

var React = _interopRequireWildcard(require("react"));

var _util = require("./util");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MenuItemGroup = /*#__PURE__*/function (_React$Component) {
  (0, _inherits2.default)(MenuItemGroup, _React$Component);

  var _super = (0, _createSuper2.default)(MenuItemGroup);

  function MenuItemGroup() {
    var _this;

    (0, _classCallCheck2.default)(this, MenuItemGroup);
    _this = _super.apply(this, arguments);

    _this.renderInnerMenuItem = function (item) {
      var _this$props = _this.props,
          renderMenuItem = _this$props.renderMenuItem,
          index = _this$props.index;
      return renderMenuItem(item, index, _this.props.subMenuKey);
    };

    return _this;
  }

  (0, _createClass2.default)(MenuItemGroup, [{
    key: "render",
    value: function render() {
      var props = (0, _extends2.default)({}, this.props);
      var _props$className = props.className,
          className = _props$className === void 0 ? '' : _props$className,
          rootPrefixCls = props.rootPrefixCls;
      var titleClassName = "".concat(rootPrefixCls, "-item-group-title");
      var listClassName = "".concat(rootPrefixCls, "-item-group-list");
      var title = props.title,
          children = props.children;

      _util.menuAllProps.forEach(function (key) {
        return delete props[key];
      }); // Set onClick to null, to ignore propagated onClick event


      delete props.onClick;
      delete props.direction;
      return /*#__PURE__*/React.createElement("li", Object.assign({}, props, {
        className: "".concat(className, " ").concat(rootPrefixCls, "-item-group")
      }), /*#__PURE__*/React.createElement("div", {
        className: titleClassName,
        title: typeof title === 'string' ? title : undefined
      }, title), /*#__PURE__*/React.createElement("ul", {
        className: listClassName
      }, React.Children.map(children, this.renderInnerMenuItem)));
    }
  }]);
  return MenuItemGroup;
}(React.Component);

MenuItemGroup.isMenuItemGroup = true;
MenuItemGroup.defaultProps = {
  disabled: true
};
var _default = MenuItemGroup;
exports.default = _default;
},{"@babel/runtime/helpers/esm/extends":"SpjQ","@babel/runtime/helpers/esm/classCallCheck":"VEjx","@babel/runtime/helpers/esm/createClass":"l5p4","@babel/runtime/helpers/esm/inherits":"NT06","@babel/runtime/helpers/esm/createSuper":"m5aa","react":"n8MK","./util":"OcqA"}],"hlbq":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var React = _interopRequireWildcard(require("react"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var Divider = function Divider(_ref) {
  var className = _ref.className,
      rootPrefixCls = _ref.rootPrefixCls,
      style = _ref.style;
  return /*#__PURE__*/React.createElement("li", {
    className: "".concat(className, " ").concat(rootPrefixCls, "-item-divider"),
    style: style
  });
};

Divider.defaultProps = {
  // To fix keyboard UX.
  disabled: true,
  className: '',
  style: {}
};
var _default = Divider;
exports.default = _default;
},{"react":"n8MK"}],"VH7R":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "SubMenu", {
  enumerable: true,
  get: function () {
    return _SubMenu.default;
  }
});
Object.defineProperty(exports, "Item", {
  enumerable: true,
  get: function () {
    return _MenuItem.default;
  }
});
Object.defineProperty(exports, "MenuItem", {
  enumerable: true,
  get: function () {
    return _MenuItem.default;
  }
});
Object.defineProperty(exports, "MenuItemGroup", {
  enumerable: true,
  get: function () {
    return _MenuItemGroup.default;
  }
});
Object.defineProperty(exports, "ItemGroup", {
  enumerable: true,
  get: function () {
    return _MenuItemGroup.default;
  }
});
Object.defineProperty(exports, "Divider", {
  enumerable: true,
  get: function () {
    return _Divider.default;
  }
});
exports.default = void 0;

var _Menu = _interopRequireDefault(require("./Menu"));

var _SubMenu = _interopRequireDefault(require("./SubMenu"));

var _MenuItem = _interopRequireDefault(require("./MenuItem"));

var _MenuItemGroup = _interopRequireDefault(require("./MenuItemGroup"));

var _Divider = _interopRequireDefault(require("./Divider"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = _Menu.default;
exports.default = _default;
},{"./Menu":"JLqT","./SubMenu":"gPV8","./MenuItem":"NeBp","./MenuItemGroup":"vrf4","./Divider":"hlbq"}],"GgDZ":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var autoAdjustOverflow = {
  adjustX: 1,
  adjustY: 1
};
var targetOffset = [0, 0];
var placements = {
  topLeft: {
    points: ['bl', 'tl'],
    overflow: autoAdjustOverflow,
    offset: [0, -4],
    targetOffset: targetOffset
  },
  topCenter: {
    points: ['bc', 'tc'],
    overflow: autoAdjustOverflow,
    offset: [0, -4],
    targetOffset: targetOffset
  },
  topRight: {
    points: ['br', 'tr'],
    overflow: autoAdjustOverflow,
    offset: [0, -4],
    targetOffset: targetOffset
  },
  bottomLeft: {
    points: ['tl', 'bl'],
    overflow: autoAdjustOverflow,
    offset: [0, 4],
    targetOffset: targetOffset
  },
  bottomCenter: {
    points: ['tc', 'bc'],
    overflow: autoAdjustOverflow,
    offset: [0, 4],
    targetOffset: targetOffset
  },
  bottomRight: {
    points: ['tr', 'br'],
    overflow: autoAdjustOverflow,
    offset: [0, 4],
    targetOffset: targetOffset
  }
};
var _default = placements;
exports.default = _default;
},{}],"rgdw":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/esm/defineProperty"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/esm/slicedToArray"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/esm/objectWithoutProperties"));

var React = _interopRequireWildcard(require("react"));

var _rcTrigger = _interopRequireDefault(require("rc-trigger"));

var _classnames = _interopRequireDefault(require("classnames"));

var _placements = _interopRequireDefault(require("./placements"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Dropdown(props, ref) {
  var _props$arrow = props.arrow,
      arrow = _props$arrow === void 0 ? false : _props$arrow,
      _props$prefixCls = props.prefixCls,
      prefixCls = _props$prefixCls === void 0 ? 'rc-dropdown' : _props$prefixCls,
      transitionName = props.transitionName,
      animation = props.animation,
      align = props.align,
      _props$placement = props.placement,
      placement = _props$placement === void 0 ? 'bottomLeft' : _props$placement,
      _props$placements = props.placements,
      placements = _props$placements === void 0 ? _placements.default : _props$placements,
      getPopupContainer = props.getPopupContainer,
      showAction = props.showAction,
      hideAction = props.hideAction,
      overlayClassName = props.overlayClassName,
      overlayStyle = props.overlayStyle,
      visible = props.visible,
      _props$trigger = props.trigger,
      trigger = _props$trigger === void 0 ? ['hover'] : _props$trigger,
      otherProps = (0, _objectWithoutProperties2.default)(props, ["arrow", "prefixCls", "transitionName", "animation", "align", "placement", "placements", "getPopupContainer", "showAction", "hideAction", "overlayClassName", "overlayStyle", "visible", "trigger"]);

  var _React$useState = React.useState(),
      _React$useState2 = (0, _slicedToArray2.default)(_React$useState, 2),
      triggerVisible = _React$useState2[0],
      setTriggerVisible = _React$useState2[1];

  var mergedVisible = 'visible' in props ? visible : triggerVisible;
  var triggerRef = React.useRef(null);
  React.useImperativeHandle(ref, function () {
    return triggerRef.current;
  });

  var getOverlayElement = function getOverlayElement() {
    var overlay = props.overlay;
    var overlayElement;

    if (typeof overlay === 'function') {
      overlayElement = overlay();
    } else {
      overlayElement = overlay;
    }

    return overlayElement;
  };

  var onClick = function onClick(e) {
    var onOverlayClick = props.onOverlayClick;
    var overlayProps = getOverlayElement().props;
    setTriggerVisible(false);

    if (onOverlayClick) {
      onOverlayClick(e);
    }

    if (overlayProps.onClick) {
      overlayProps.onClick(e);
    }
  };

  var onVisibleChange = function onVisibleChange(visible) {
    var onVisibleChange = props.onVisibleChange;
    setTriggerVisible(visible);

    if (typeof onVisibleChange === 'function') {
      onVisibleChange(visible);
    }
  };

  var getMenuElement = function getMenuElement() {
    var overlayElement = getOverlayElement();
    var extraOverlayProps = {
      prefixCls: "".concat(prefixCls, "-menu"),
      onClick: onClick
    };

    if (typeof overlayElement.type === 'string') {
      delete extraOverlayProps.prefixCls;
    }

    return React.createElement(React.Fragment, null, arrow && React.createElement("div", {
      className: "".concat(prefixCls, "-arrow")
    }), React.cloneElement(overlayElement, extraOverlayProps));
  };

  var getMenuElementOrLambda = function getMenuElementOrLambda() {
    var overlay = props.overlay;

    if (typeof overlay === 'function') {
      return getMenuElement;
    }

    return getMenuElement();
  };

  var getMinOverlayWidthMatchTrigger = function getMinOverlayWidthMatchTrigger() {
    var minOverlayWidthMatchTrigger = props.minOverlayWidthMatchTrigger,
        alignPoint = props.alignPoint;

    if ('minOverlayWidthMatchTrigger' in props) {
      return minOverlayWidthMatchTrigger;
    }

    return !alignPoint;
  };

  var getOpenClassName = function getOpenClassName() {
    var openClassName = props.openClassName;

    if (openClassName !== undefined) {
      return openClassName;
    }

    return "".concat(prefixCls, "-open");
  };

  var renderChildren = function renderChildren() {
    var children = props.children;
    var childrenProps = children.props ? children.props : {};
    var childClassName = (0, _classnames.default)(childrenProps.className, getOpenClassName());
    return triggerVisible && children ? React.cloneElement(children, {
      className: childClassName
    }) : children;
  };

  var triggerHideAction = hideAction;

  if (!triggerHideAction && trigger.indexOf('contextMenu') !== -1) {
    triggerHideAction = ['click'];
  }

  return React.createElement(_rcTrigger.default, Object.assign({}, otherProps, {
    prefixCls: prefixCls,
    ref: triggerRef,
    popupClassName: (0, _classnames.default)(overlayClassName, (0, _defineProperty2.default)({}, "".concat(prefixCls, "-show-arrow"), arrow)),
    popupStyle: overlayStyle,
    builtinPlacements: placements,
    action: trigger,
    showAction: showAction,
    hideAction: triggerHideAction || [],
    popupPlacement: placement,
    popupAlign: align,
    popupTransitionName: transitionName,
    popupAnimation: animation,
    popupVisible: mergedVisible,
    stretch: getMinOverlayWidthMatchTrigger() ? 'minWidth' : '',
    popup: getMenuElementOrLambda(),
    onPopupVisibleChange: onVisibleChange,
    getPopupContainer: getPopupContainer
  }), renderChildren());
}

var _default = React.forwardRef(Dropdown);

exports.default = _default;
},{"@babel/runtime/helpers/esm/defineProperty":"gpd2","@babel/runtime/helpers/esm/slicedToArray":"T12H","@babel/runtime/helpers/esm/objectWithoutProperties":"tuNH","react":"n8MK","rc-trigger":"PZMl","classnames":"qb7c","./placements":"GgDZ"}],"SyQB":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Dropdown = _interopRequireDefault(require("./Dropdown"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = _Dropdown.default;
exports.default = _default;
},{"./Dropdown":"rgdw"}],"kT7Q":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var React = _interopRequireWildcard(require("react"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function AddButton(_ref, ref) {
  var prefixCls = _ref.prefixCls,
      editable = _ref.editable,
      locale = _ref.locale,
      style = _ref.style;

  if (!editable || editable.showAdd === false) {
    return null;
  }

  return /*#__PURE__*/React.createElement("button", {
    ref: ref,
    type: "button",
    className: "".concat(prefixCls, "-nav-add"),
    style: style,
    "aria-label": (locale === null || locale === void 0 ? void 0 : locale.addAriaLabel) || 'Add tab',
    onClick: function onClick(event) {
      editable.onEdit('add', {
        event: event
      });
    }
  }, editable.addIcon || '+');
}

var _default = /*#__PURE__*/React.forwardRef(AddButton);

exports.default = _default;
},{"react":"n8MK"}],"MhTA":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/esm/defineProperty"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/esm/slicedToArray"));

var React = _interopRequireWildcard(require("react"));

var _classnames = _interopRequireDefault(require("classnames"));

var _KeyCode = _interopRequireDefault(require("rc-util/es/KeyCode"));

var _rcMenu = _interopRequireWildcard(require("rc-menu"));

var _rcDropdown = _interopRequireDefault(require("rc-dropdown"));

var _AddButton = _interopRequireDefault(require("./AddButton"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function OperationNode(_ref, ref) {
  var prefixCls = _ref.prefixCls,
      id = _ref.id,
      tabs = _ref.tabs,
      locale = _ref.locale,
      mobile = _ref.mobile,
      _ref$moreIcon = _ref.moreIcon,
      moreIcon = _ref$moreIcon === void 0 ? 'More' : _ref$moreIcon,
      moreTransitionName = _ref.moreTransitionName,
      style = _ref.style,
      className = _ref.className,
      editable = _ref.editable,
      tabBarGutter = _ref.tabBarGutter,
      rtl = _ref.rtl,
      onTabClick = _ref.onTabClick; // ======================== Dropdown ========================

  var _useState = (0, React.useState)(false),
      _useState2 = (0, _slicedToArray2.default)(_useState, 2),
      open = _useState2[0],
      setOpen = _useState2[1];

  var _useState3 = (0, React.useState)(null),
      _useState4 = (0, _slicedToArray2.default)(_useState3, 2),
      selectedKey = _useState4[0],
      setSelectedKey = _useState4[1];

  var popupId = "".concat(id, "-more-popup");
  var dropdownPrefix = "".concat(prefixCls, "-dropdown");
  var selectedItemId = selectedKey !== null ? "".concat(popupId, "-").concat(selectedKey) : null;
  var dropdownAriaLabel = locale === null || locale === void 0 ? void 0 : locale.dropdownAriaLabel;
  var menu = /*#__PURE__*/React.createElement(_rcMenu.default, {
    onClick: function onClick(_ref2) {
      var key = _ref2.key,
          domEvent = _ref2.domEvent;
      onTabClick(key, domEvent);
      setOpen(false);
    },
    id: popupId,
    tabIndex: -1,
    role: "listbox",
    "aria-activedescendant": selectedItemId,
    selectedKeys: [selectedKey],
    "aria-label": dropdownAriaLabel !== undefined ? dropdownAriaLabel : 'expanded dropdown'
  }, tabs.map(function (tab) {
    return /*#__PURE__*/React.createElement(_rcMenu.MenuItem, {
      key: tab.key,
      id: "".concat(popupId, "-").concat(tab.key),
      role: "option",
      "aria-controls": id && "".concat(id, "-panel-").concat(tab.key),
      disabled: tab.disabled
    }, tab.tab);
  }));

  function selectOffset(offset) {
    var enabledTabs = tabs.filter(function (tab) {
      return !tab.disabled;
    });
    var selectedIndex = enabledTabs.findIndex(function (tab) {
      return tab.key === selectedKey;
    }) || 0;
    var len = enabledTabs.length;

    for (var i = 0; i < len; i += 1) {
      selectedIndex = (selectedIndex + offset + len) % len;
      var tab = enabledTabs[selectedIndex];

      if (!tab.disabled) {
        setSelectedKey(tab.key);
        return;
      }
    }
  }

  function onKeyDown(e) {
    var which = e.which;

    if (!open) {
      if ([_KeyCode.default.DOWN, _KeyCode.default.SPACE, _KeyCode.default.ENTER].includes(which)) {
        setOpen(true);
        e.preventDefault();
      }

      return;
    }

    switch (which) {
      case _KeyCode.default.UP:
        selectOffset(-1);
        e.preventDefault();
        break;

      case _KeyCode.default.DOWN:
        selectOffset(1);
        e.preventDefault();
        break;

      case _KeyCode.default.ESC:
        setOpen(false);
        break;

      case _KeyCode.default.SPACE:
      case _KeyCode.default.ENTER:
        if (selectedKey !== null) onTabClick(selectedKey, e);
        break;
    }
  } // ========================= Effect =========================


  (0, React.useEffect)(function () {
    // We use query element here to avoid React strict warning
    var ele = document.getElementById(selectedItemId);

    if (ele && ele.scrollIntoView) {
      ele.scrollIntoView(false);
    }
  }, [selectedKey]);
  (0, React.useEffect)(function () {
    if (!open) {
      setSelectedKey(null);
    }
  }, [open]); // ========================= Render =========================

  var moreStyle = (0, _defineProperty2.default)({}, rtl ? 'marginLeft' : 'marginRight', tabBarGutter);

  if (!tabs.length) {
    moreStyle.visibility = 'hidden';
    moreStyle.order = 1;
  }

  var overlayClassName = (0, _classnames.default)((0, _defineProperty2.default)({}, "".concat(dropdownPrefix, "-rtl"), rtl));
  var moreNode = mobile ? null : /*#__PURE__*/React.createElement(_rcDropdown.default, {
    prefixCls: dropdownPrefix,
    overlay: menu,
    trigger: ['hover'],
    visible: open,
    transitionName: moreTransitionName,
    onVisibleChange: setOpen,
    overlayClassName: overlayClassName,
    mouseEnterDelay: 0.1,
    mouseLeaveDelay: 0.1
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "".concat(prefixCls, "-nav-more"),
    style: moreStyle,
    tabIndex: -1,
    "aria-hidden": "true",
    "aria-haspopup": "listbox",
    "aria-controls": popupId,
    id: "".concat(id, "-more"),
    "aria-expanded": open,
    onKeyDown: onKeyDown
  }, moreIcon));
  return /*#__PURE__*/React.createElement("div", {
    className: (0, _classnames.default)("".concat(prefixCls, "-nav-operations"), className),
    style: style,
    ref: ref
  }, moreNode, /*#__PURE__*/React.createElement(_AddButton.default, {
    prefixCls: prefixCls,
    locale: locale,
    editable: editable
  }));
}

var _default = /*#__PURE__*/React.forwardRef(OperationNode);

exports.default = _default;
},{"@babel/runtime/helpers/esm/defineProperty":"gpd2","@babel/runtime/helpers/esm/slicedToArray":"T12H","react":"n8MK","classnames":"qb7c","rc-util/es/KeyCode":"Imvn","rc-menu":"VH7R","rc-dropdown":"SyQB","./AddButton":"kT7Q"}],"vHWa":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = require("react");

var _default = /*#__PURE__*/(0, _react.createContext)(null);

exports.default = _default;
},{"react":"n8MK"}],"MZjt":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = useTouchMove;

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/esm/slicedToArray"));

var React = _interopRequireWildcard(require("react"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MIN_SWIPE_DISTANCE = 0.1;
var STOP_SWIPE_DISTANCE = 0.01;
var REFRESH_INTERVAL = 20;
var SPEED_OFF_MULTIPLE = Math.pow(0.995, REFRESH_INTERVAL); // ================================= Hook =================================

function useTouchMove(ref, onOffset) {
  var _useState = (0, React.useState)(),
      _useState2 = (0, _slicedToArray2.default)(_useState, 2),
      touchPosition = _useState2[0],
      setTouchPosition = _useState2[1];

  var _useState3 = (0, React.useState)(0),
      _useState4 = (0, _slicedToArray2.default)(_useState3, 2),
      lastTimestamp = _useState4[0],
      setLastTimestamp = _useState4[1];

  var _useState5 = (0, React.useState)(0),
      _useState6 = (0, _slicedToArray2.default)(_useState5, 2),
      lastTimeDiff = _useState6[0],
      setLastTimeDiff = _useState6[1];

  var _useState7 = (0, React.useState)(),
      _useState8 = (0, _slicedToArray2.default)(_useState7, 2),
      lastOffset = _useState8[0],
      setLastOffset = _useState8[1];

  var motionRef = (0, React.useRef)(); // ========================= Events =========================
  // >>> Touch events

  function onTouchStart(e) {
    var _e$touches$ = e.touches[0],
        screenX = _e$touches$.screenX,
        screenY = _e$touches$.screenY;
    setTouchPosition({
      x: screenX,
      y: screenY
    });
    window.clearInterval(motionRef.current);
  }

  function onTouchMove(e) {
    if (!touchPosition) return;
    e.preventDefault();
    var _e$touches$2 = e.touches[0],
        screenX = _e$touches$2.screenX,
        screenY = _e$touches$2.screenY;
    setTouchPosition({
      x: screenX,
      y: screenY
    });
    var offsetX = screenX - touchPosition.x;
    var offsetY = screenY - touchPosition.y;
    onOffset(offsetX, offsetY);
    var now = Date.now();
    setLastTimestamp(now);
    setLastTimeDiff(now - lastTimestamp);
    setLastOffset({
      x: offsetX,
      y: offsetY
    });
  }

  function onTouchEnd() {
    if (!touchPosition) return;
    setTouchPosition(null);
    setLastOffset(null); // Swipe if needed

    if (lastOffset) {
      var distanceX = lastOffset.x / lastTimeDiff;
      var distanceY = lastOffset.y / lastTimeDiff;
      var absX = Math.abs(distanceX);
      var absY = Math.abs(distanceY); // Skip swipe if low distance

      if (Math.max(absX, absY) < MIN_SWIPE_DISTANCE) return;
      var currentX = distanceX;
      var currentY = distanceY;
      motionRef.current = window.setInterval(function () {
        if (Math.abs(currentX) < STOP_SWIPE_DISTANCE && Math.abs(currentY) < STOP_SWIPE_DISTANCE) {
          window.clearInterval(motionRef.current);
          return;
        }

        currentX *= SPEED_OFF_MULTIPLE;
        currentY *= SPEED_OFF_MULTIPLE;
        onOffset(currentX * REFRESH_INTERVAL, currentY * REFRESH_INTERVAL);
      }, REFRESH_INTERVAL);
    }
  } // >>> Wheel event


  var lastWheelDirectionRef = (0, React.useRef)();

  function onWheel(e) {
    var deltaX = e.deltaX,
        deltaY = e.deltaY; // Convert both to x & y since wheel only happened on PC

    var mixed = 0;
    var absX = Math.abs(deltaX);
    var absY = Math.abs(deltaY);

    if (absX === absY) {
      mixed = lastWheelDirectionRef.current === 'x' ? deltaX : deltaY;
    } else if (absX > absY) {
      mixed = deltaX;
      lastWheelDirectionRef.current = 'x';
    } else {
      mixed = deltaY;
      lastWheelDirectionRef.current = 'y';
    }

    if (onOffset(-mixed, -mixed)) {
      e.preventDefault();
    }
  } // ========================= Effect =========================


  var touchEventsRef = (0, React.useRef)(null);
  touchEventsRef.current = {
    onTouchStart: onTouchStart,
    onTouchMove: onTouchMove,
    onTouchEnd: onTouchEnd,
    onWheel: onWheel
  };
  React.useEffect(function () {
    function onProxyTouchStart(e) {
      touchEventsRef.current.onTouchStart(e);
    }

    function onProxyTouchMove(e) {
      touchEventsRef.current.onTouchMove(e);
    }

    function onProxyTouchEnd(e) {
      touchEventsRef.current.onTouchEnd(e);
    }

    function onProxyWheel(e) {
      touchEventsRef.current.onWheel(e);
    }

    document.addEventListener('touchmove', onProxyTouchMove, {
      passive: false
    });
    document.addEventListener('touchend', onProxyTouchEnd, {
      passive: false
    }); // No need to clean up since element removed

    ref.current.addEventListener('touchstart', onProxyTouchStart, {
      passive: false
    });
    ref.current.addEventListener('wheel', onProxyWheel);
    return function () {
      document.removeEventListener('touchmove', onProxyTouchMove);
      document.removeEventListener('touchend', onProxyTouchEnd);
    };
  }, []);
}
},{"@babel/runtime/helpers/esm/slicedToArray":"T12H","react":"n8MK"}],"Sb61":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = useRefs;

var React = _interopRequireWildcard(require("react"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function useRefs() {
  var cacheRefs = (0, React.useRef)(new Map());

  function getRef(key) {
    if (!cacheRefs.current.has(key)) {
      cacheRefs.current.set(key, /*#__PURE__*/React.createRef());
    }

    return cacheRefs.current.get(key);
  }

  function removeRef(key) {
    cacheRefs.current.delete(key);
  }

  return [getRef, removeRef];
}
},{"react":"n8MK"}],"AAQN":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = useSyncState;

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/esm/slicedToArray"));

var React = _interopRequireWildcard(require("react"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function useSyncState(defaultState, onChange) {
  var stateRef = React.useRef(defaultState);

  var _React$useState = React.useState({}),
      _React$useState2 = (0, _slicedToArray2.default)(_React$useState, 2),
      forceUpdate = _React$useState2[1];

  function setState(updater) {
    var newValue = typeof updater === 'function' ? updater(stateRef.current) : updater;

    if (newValue !== stateRef.current) {
      onChange(newValue, stateRef.current);
    }

    stateRef.current = newValue;
    forceUpdate({});
  }

  return [stateRef.current, setState];
}
},{"@babel/runtime/helpers/esm/slicedToArray":"T12H","react":"n8MK"}],"Piyq":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/esm/extends"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/esm/defineProperty"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/esm/toConsumableArray"));

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/esm/objectSpread2"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/esm/slicedToArray"));

var React = _interopRequireWildcard(require("react"));

var _classnames = _interopRequireDefault(require("classnames"));

var _raf = _interopRequireDefault(require("rc-util/es/raf"));

var _rcResizeObserver = _interopRequireDefault(require("rc-resize-observer"));

var _useRaf = _interopRequireWildcard(require("../hooks/useRaf"));

var _TabNode = _interopRequireDefault(require("./TabNode"));

var _useOffsets = _interopRequireDefault(require("../hooks/useOffsets"));

var _useVisibleRange3 = _interopRequireDefault(require("../hooks/useVisibleRange"));

var _OperationNode = _interopRequireDefault(require("./OperationNode"));

var _TabContext = _interopRequireDefault(require("../TabContext"));

var _useTouchMove = _interopRequireDefault(require("../hooks/useTouchMove"));

var _useRefs3 = _interopRequireDefault(require("../hooks/useRefs"));

var _AddButton = _interopRequireDefault(require("./AddButton"));

var _useSyncState5 = _interopRequireDefault(require("../hooks/useSyncState"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ExtraContent = function ExtraContent(_ref) {
  var position = _ref.position,
      prefixCls = _ref.prefixCls,
      extra = _ref.extra;
  if (!extra) return null;
  var content;
  var assertExtra = extra;

  if (position === 'right') {
    content = assertExtra.right || !assertExtra.left && assertExtra || null;
  }

  if (position === 'left') {
    content = assertExtra.left || null;
  }

  return content ? /*#__PURE__*/React.createElement("div", {
    className: "".concat(prefixCls, "-extra-content")
  }, content) : null;
};

function TabNavList(props, ref) {
  var _classNames;

  var _React$useContext = React.useContext(_TabContext.default),
      prefixCls = _React$useContext.prefixCls,
      tabs = _React$useContext.tabs;

  var className = props.className,
      style = props.style,
      id = props.id,
      animated = props.animated,
      activeKey = props.activeKey,
      rtl = props.rtl,
      extra = props.extra,
      editable = props.editable,
      locale = props.locale,
      tabPosition = props.tabPosition,
      tabBarGutter = props.tabBarGutter,
      children = props.children,
      onTabClick = props.onTabClick,
      onTabScroll = props.onTabScroll;
  var tabsWrapperRef = (0, React.useRef)();
  var tabListRef = (0, React.useRef)();
  var operationsRef = (0, React.useRef)();
  var innerAddButtonRef = (0, React.useRef)();

  var _useRefs = (0, _useRefs3.default)(),
      _useRefs2 = (0, _slicedToArray2.default)(_useRefs, 2),
      getBtnRef = _useRefs2[0],
      removeBtnRef = _useRefs2[1];

  var tabPositionTopOrBottom = tabPosition === 'top' || tabPosition === 'bottom';

  var _useSyncState = (0, _useSyncState5.default)(0, function (next, prev) {
    if (tabPositionTopOrBottom && onTabScroll) {
      onTabScroll({
        direction: next > prev ? 'left' : 'right'
      });
    }
  }),
      _useSyncState2 = (0, _slicedToArray2.default)(_useSyncState, 2),
      transformLeft = _useSyncState2[0],
      setTransformLeft = _useSyncState2[1];

  var _useSyncState3 = (0, _useSyncState5.default)(0, function (next, prev) {
    if (!tabPositionTopOrBottom && onTabScroll) {
      onTabScroll({
        direction: next > prev ? 'top' : 'bottom'
      });
    }
  }),
      _useSyncState4 = (0, _slicedToArray2.default)(_useSyncState3, 2),
      transformTop = _useSyncState4[0],
      setTransformTop = _useSyncState4[1];

  var _useState = (0, React.useState)(0),
      _useState2 = (0, _slicedToArray2.default)(_useState, 2),
      wrapperScrollWidth = _useState2[0],
      setWrapperScrollWidth = _useState2[1];

  var _useState3 = (0, React.useState)(0),
      _useState4 = (0, _slicedToArray2.default)(_useState3, 2),
      wrapperScrollHeight = _useState4[0],
      setWrapperScrollHeight = _useState4[1];

  var _useState5 = (0, React.useState)(0),
      _useState6 = (0, _slicedToArray2.default)(_useState5, 2),
      wrapperContentWidth = _useState6[0],
      setWrapperContentWidth = _useState6[1];

  var _useState7 = (0, React.useState)(0),
      _useState8 = (0, _slicedToArray2.default)(_useState7, 2),
      wrapperContentHeight = _useState8[0],
      setWrapperContentHeight = _useState8[1];

  var _useState9 = (0, React.useState)(null),
      _useState10 = (0, _slicedToArray2.default)(_useState9, 2),
      wrapperWidth = _useState10[0],
      setWrapperWidth = _useState10[1];

  var _useState11 = (0, React.useState)(null),
      _useState12 = (0, _slicedToArray2.default)(_useState11, 2),
      wrapperHeight = _useState12[0],
      setWrapperHeight = _useState12[1];

  var _useState13 = (0, React.useState)(0),
      _useState14 = (0, _slicedToArray2.default)(_useState13, 2),
      addWidth = _useState14[0],
      setAddWidth = _useState14[1];

  var _useState15 = (0, React.useState)(0),
      _useState16 = (0, _slicedToArray2.default)(_useState15, 2),
      addHeight = _useState16[0],
      setAddHeight = _useState16[1];

  var _useRafState = (0, _useRaf.useRafState)(new Map()),
      _useRafState2 = (0, _slicedToArray2.default)(_useRafState, 2),
      tabSizes = _useRafState2[0],
      setTabSizes = _useRafState2[1];

  var tabOffsets = (0, _useOffsets.default)(tabs, tabSizes, wrapperScrollWidth); // ========================== Util =========================

  var operationsHiddenClassName = "".concat(prefixCls, "-nav-operations-hidden");
  var transformMin = 0;
  var transformMax = 0;

  if (!tabPositionTopOrBottom) {
    transformMin = Math.min(0, wrapperHeight - wrapperScrollHeight);
    transformMax = 0;
  } else if (rtl) {
    transformMin = 0;
    transformMax = Math.max(0, wrapperScrollWidth - wrapperWidth);
  } else {
    transformMin = Math.min(0, wrapperWidth - wrapperScrollWidth);
    transformMax = 0;
  }

  function alignInRange(value) {
    if (value < transformMin) {
      return transformMin;
    }

    if (value > transformMax) {
      return transformMax;
    }

    return value;
  } // ========================= Mobile ========================


  var touchMovingRef = (0, React.useRef)();

  var _useState17 = (0, React.useState)(),
      _useState18 = (0, _slicedToArray2.default)(_useState17, 2),
      lockAnimation = _useState18[0],
      setLockAnimation = _useState18[1];

  function doLockAnimation() {
    setLockAnimation(Date.now());
  }

  function clearTouchMoving() {
    window.clearTimeout(touchMovingRef.current);
  }

  (0, _useTouchMove.default)(tabsWrapperRef, function (offsetX, offsetY) {
    function doMove(setState, offset) {
      setState(function (value) {
        var newValue = alignInRange(value + offset);
        return newValue;
      });
    }

    if (tabPositionTopOrBottom) {
      // Skip scroll if place is enough
      if (wrapperWidth >= wrapperScrollWidth) {
        return false;
      }

      doMove(setTransformLeft, offsetX);
    } else {
      if (wrapperHeight >= wrapperScrollHeight) {
        return false;
      }

      doMove(setTransformTop, offsetY);
    }

    clearTouchMoving();
    doLockAnimation();
    return true;
  });
  (0, React.useEffect)(function () {
    clearTouchMoving();

    if (lockAnimation) {
      touchMovingRef.current = window.setTimeout(function () {
        setLockAnimation(0);
      }, 100);
    }

    return clearTouchMoving;
  }, [lockAnimation]); // ========================= Scroll ========================

  function scrollToTab() {
    var key = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : activeKey;
    var tabOffset = tabOffsets.get(key) || {
      width: 0,
      height: 0,
      left: 0,
      right: 0,
      top: 0
    };

    if (tabPositionTopOrBottom) {
      // ============ Align with top & bottom ============
      var newTransform = transformLeft; // RTL

      if (rtl) {
        if (tabOffset.right < transformLeft) {
          newTransform = tabOffset.right;
        } else if (tabOffset.right + tabOffset.width > transformLeft + wrapperWidth) {
          newTransform = tabOffset.right + tabOffset.width - wrapperWidth;
        }
      } // LTR
      else if (tabOffset.left < -transformLeft) {
          newTransform = -tabOffset.left;
        } else if (tabOffset.left + tabOffset.width > -transformLeft + wrapperWidth) {
          newTransform = -(tabOffset.left + tabOffset.width - wrapperWidth);
        }

      setTransformTop(0);
      setTransformLeft(alignInRange(newTransform));
    } else {
      // ============ Align with left & right ============
      var _newTransform = transformTop;

      if (tabOffset.top < -transformTop) {
        _newTransform = -tabOffset.top;
      } else if (tabOffset.top + tabOffset.height > -transformTop + wrapperHeight) {
        _newTransform = -(tabOffset.top + tabOffset.height - wrapperHeight);
      }

      setTransformLeft(0);
      setTransformTop(alignInRange(_newTransform));
    }
  } // ========================== Tab ==========================
  // Render tab node & collect tab offset


  var _useVisibleRange = (0, _useVisibleRange3.default)(tabOffsets, {
    width: wrapperWidth,
    height: wrapperHeight,
    left: transformLeft,
    top: transformTop
  }, {
    width: wrapperContentWidth,
    height: wrapperContentHeight
  }, {
    width: addWidth,
    height: addHeight
  }, (0, _objectSpread2.default)((0, _objectSpread2.default)({}, props), {}, {
    tabs: tabs
  })),
      _useVisibleRange2 = (0, _slicedToArray2.default)(_useVisibleRange, 2),
      visibleStart = _useVisibleRange2[0],
      visibleEnd = _useVisibleRange2[1];

  var tabNodes = tabs.map(function (tab) {
    var key = tab.key;
    return /*#__PURE__*/React.createElement(_TabNode.default, {
      id: id,
      prefixCls: prefixCls,
      key: key,
      rtl: rtl,
      tab: tab,
      closable: tab.closable,
      editable: editable,
      active: key === activeKey,
      tabPosition: tabPosition,
      tabBarGutter: tabBarGutter,
      renderWrapper: children,
      removeAriaLabel: locale === null || locale === void 0 ? void 0 : locale.removeAriaLabel,
      ref: getBtnRef(key),
      onClick: function onClick(e) {
        onTabClick(key, e);
      },
      onRemove: function onRemove() {
        removeBtnRef(key);
      },
      onFocus: function onFocus() {
        scrollToTab(key);
        doLockAnimation(); // Focus element will make scrollLeft change which we should reset back

        if (!rtl) {
          tabsWrapperRef.current.scrollLeft = 0;
        }

        tabsWrapperRef.current.scrollTop = 0;
      }
    });
  });
  var onListHolderResize = (0, _useRaf.default)(function () {
    var _tabsWrapperRef$curre, _tabsWrapperRef$curre2, _innerAddButtonRef$cu, _innerAddButtonRef$cu2, _operationsRef$curren, _operationsRef$curren2, _tabListRef$current, _tabListRef$current2, _operationsRef$curren3; // Update wrapper records


    var offsetWidth = ((_tabsWrapperRef$curre = tabsWrapperRef.current) === null || _tabsWrapperRef$curre === void 0 ? void 0 : _tabsWrapperRef$curre.offsetWidth) || 0;
    var offsetHeight = ((_tabsWrapperRef$curre2 = tabsWrapperRef.current) === null || _tabsWrapperRef$curre2 === void 0 ? void 0 : _tabsWrapperRef$curre2.offsetHeight) || 0;
    var newAddWidth = ((_innerAddButtonRef$cu = innerAddButtonRef.current) === null || _innerAddButtonRef$cu === void 0 ? void 0 : _innerAddButtonRef$cu.offsetWidth) || 0;
    var newAddHeight = ((_innerAddButtonRef$cu2 = innerAddButtonRef.current) === null || _innerAddButtonRef$cu2 === void 0 ? void 0 : _innerAddButtonRef$cu2.offsetHeight) || 0;
    var newOperationWidth = ((_operationsRef$curren = operationsRef.current) === null || _operationsRef$curren === void 0 ? void 0 : _operationsRef$curren.offsetWidth) || 0;
    var newOperationHeight = ((_operationsRef$curren2 = operationsRef.current) === null || _operationsRef$curren2 === void 0 ? void 0 : _operationsRef$curren2.offsetHeight) || 0;
    setWrapperWidth(offsetWidth);
    setWrapperHeight(offsetHeight);
    setAddWidth(newAddWidth);
    setAddHeight(newAddHeight);
    var newWrapperScrollWidth = (((_tabListRef$current = tabListRef.current) === null || _tabListRef$current === void 0 ? void 0 : _tabListRef$current.offsetWidth) || 0) - newAddWidth;
    var newWrapperScrollHeight = (((_tabListRef$current2 = tabListRef.current) === null || _tabListRef$current2 === void 0 ? void 0 : _tabListRef$current2.offsetHeight) || 0) - newAddHeight;
    setWrapperScrollWidth(newWrapperScrollWidth);
    setWrapperScrollHeight(newWrapperScrollHeight);
    var isOperationHidden = (_operationsRef$curren3 = operationsRef.current) === null || _operationsRef$curren3 === void 0 ? void 0 : _operationsRef$curren3.className.includes(operationsHiddenClassName);
    setWrapperContentWidth(newWrapperScrollWidth - (isOperationHidden ? 0 : newOperationWidth));
    setWrapperContentHeight(newWrapperScrollHeight - (isOperationHidden ? 0 : newOperationHeight)); // Update buttons records

    setTabSizes(function () {
      var newSizes = new Map();
      tabs.forEach(function (_ref2) {
        var key = _ref2.key;
        var btnNode = getBtnRef(key).current;

        if (btnNode) {
          newSizes.set(key, {
            width: btnNode.offsetWidth,
            height: btnNode.offsetHeight,
            left: btnNode.offsetLeft,
            top: btnNode.offsetTop
          });
        }
      });
      return newSizes;
    });
  }); // ======================== Dropdown =======================

  var startHiddenTabs = tabs.slice(0, visibleStart);
  var endHiddenTabs = tabs.slice(visibleEnd + 1);
  var hiddenTabs = [].concat((0, _toConsumableArray2.default)(startHiddenTabs), (0, _toConsumableArray2.default)(endHiddenTabs)); // =================== Link & Operations ===================

  var _useState19 = (0, React.useState)(),
      _useState20 = (0, _slicedToArray2.default)(_useState19, 2),
      inkStyle = _useState20[0],
      setInkStyle = _useState20[1];

  var activeTabOffset = tabOffsets.get(activeKey); // Delay set ink style to avoid remove tab blink

  var inkBarRafRef = (0, React.useRef)();

  function cleanInkBarRaf() {
    _raf.default.cancel(inkBarRafRef.current);
  }

  (0, React.useEffect)(function () {
    var newInkStyle = {};

    if (activeTabOffset) {
      if (tabPositionTopOrBottom) {
        if (rtl) {
          newInkStyle.right = activeTabOffset.right;
        } else {
          newInkStyle.left = activeTabOffset.left;
        }

        newInkStyle.width = activeTabOffset.width;
      } else {
        newInkStyle.top = activeTabOffset.top;
        newInkStyle.height = activeTabOffset.height;
      }
    }

    cleanInkBarRaf();
    inkBarRafRef.current = (0, _raf.default)(function () {
      setInkStyle(newInkStyle);
    });
    return cleanInkBarRaf;
  }, [activeTabOffset, tabPositionTopOrBottom, rtl]); // ========================= Effect ========================

  (0, React.useEffect)(function () {
    scrollToTab();
  }, [activeKey, activeTabOffset, tabOffsets, tabPositionTopOrBottom]); // Should recalculate when rtl changed

  (0, React.useEffect)(function () {
    onListHolderResize();
  }, [rtl, tabBarGutter, activeKey, tabs.map(function (tab) {
    return tab.key;
  }).join('_')]); // ========================= Render ========================

  var hasDropdown = !!hiddenTabs.length;
  var wrapPrefix = "".concat(prefixCls, "-nav-wrap");
  var pingLeft;
  var pingRight;
  var pingTop;
  var pingBottom;

  if (tabPositionTopOrBottom) {
    if (rtl) {
      pingRight = transformLeft > 0;
      pingLeft = transformLeft + wrapperWidth < wrapperScrollWidth;
    } else {
      pingLeft = transformLeft < 0;
      pingRight = -transformLeft + wrapperWidth < wrapperScrollWidth;
    }
  } else {
    pingTop = transformTop < 0;
    pingBottom = -transformTop + wrapperHeight < wrapperScrollHeight;
  }

  return /*#__PURE__*/React.createElement("div", {
    ref: ref,
    role: "tablist",
    className: (0, _classnames.default)("".concat(prefixCls, "-nav"), className),
    style: style,
    onKeyDown: function onKeyDown() {
      // No need animation when use keyboard
      doLockAnimation();
    }
  }, /*#__PURE__*/React.createElement(ExtraContent, {
    position: "left",
    extra: extra,
    prefixCls: prefixCls
  }), /*#__PURE__*/React.createElement(_rcResizeObserver.default, {
    onResize: onListHolderResize
  }, /*#__PURE__*/React.createElement("div", {
    className: (0, _classnames.default)(wrapPrefix, (_classNames = {}, (0, _defineProperty2.default)(_classNames, "".concat(wrapPrefix, "-ping-left"), pingLeft), (0, _defineProperty2.default)(_classNames, "".concat(wrapPrefix, "-ping-right"), pingRight), (0, _defineProperty2.default)(_classNames, "".concat(wrapPrefix, "-ping-top"), pingTop), (0, _defineProperty2.default)(_classNames, "".concat(wrapPrefix, "-ping-bottom"), pingBottom), _classNames)),
    ref: tabsWrapperRef
  }, /*#__PURE__*/React.createElement(_rcResizeObserver.default, {
    onResize: onListHolderResize
  }, /*#__PURE__*/React.createElement("div", {
    ref: tabListRef,
    className: "".concat(prefixCls, "-nav-list"),
    style: {
      transform: "translate(".concat(transformLeft, "px, ").concat(transformTop, "px)"),
      transition: lockAnimation ? 'none' : undefined
    }
  }, tabNodes, /*#__PURE__*/React.createElement(_AddButton.default, {
    ref: innerAddButtonRef,
    prefixCls: prefixCls,
    locale: locale,
    editable: editable,
    style: {
      visibility: hasDropdown ? 'hidden' : null
    }
  }), /*#__PURE__*/React.createElement("div", {
    className: (0, _classnames.default)("".concat(prefixCls, "-ink-bar"), (0, _defineProperty2.default)({}, "".concat(prefixCls, "-ink-bar-animated"), animated.inkBar)),
    style: inkStyle
  }))))), /*#__PURE__*/React.createElement(_OperationNode.default, (0, _extends2.default)({}, props, {
    ref: operationsRef,
    prefixCls: prefixCls,
    tabs: hiddenTabs,
    className: !hasDropdown && operationsHiddenClassName
  })), /*#__PURE__*/React.createElement(ExtraContent, {
    position: "right",
    extra: extra,
    prefixCls: prefixCls
  }));
  /* eslint-enable */
}

var _default = /*#__PURE__*/React.forwardRef(TabNavList);

exports.default = _default;
},{"@babel/runtime/helpers/esm/extends":"SpjQ","@babel/runtime/helpers/esm/defineProperty":"gpd2","@babel/runtime/helpers/esm/toConsumableArray":"Qv3s","@babel/runtime/helpers/esm/objectSpread2":"UKeT","@babel/runtime/helpers/esm/slicedToArray":"T12H","react":"n8MK","classnames":"qb7c","rc-util/es/raf":"adDJ","rc-resize-observer":"q9L5","../hooks/useRaf":"LCWf","./TabNode":"VleC","../hooks/useOffsets":"uhKO","../hooks/useVisibleRange":"eQ4Y","./OperationNode":"MhTA","../TabContext":"vHWa","../hooks/useTouchMove":"MZjt","../hooks/useRefs":"Sb61","./AddButton":"kT7Q","../hooks/useSyncState":"AAQN"}],"om2l":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = TabPanelList;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/esm/defineProperty"));

var React = _interopRequireWildcard(require("react"));

var _classnames = _interopRequireDefault(require("classnames"));

var _TabContext = _interopRequireDefault(require("../TabContext"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function TabPanelList(_ref) {
  var id = _ref.id,
      activeKey = _ref.activeKey,
      animated = _ref.animated,
      tabPosition = _ref.tabPosition,
      rtl = _ref.rtl,
      destroyInactiveTabPane = _ref.destroyInactiveTabPane;

  var _React$useContext = React.useContext(_TabContext.default),
      prefixCls = _React$useContext.prefixCls,
      tabs = _React$useContext.tabs;

  var tabPaneAnimated = animated.tabPane;
  var activeIndex = tabs.findIndex(function (tab) {
    return tab.key === activeKey;
  });
  return /*#__PURE__*/React.createElement("div", {
    className: (0, _classnames.default)("".concat(prefixCls, "-content-holder"))
  }, /*#__PURE__*/React.createElement("div", {
    className: (0, _classnames.default)("".concat(prefixCls, "-content"), "".concat(prefixCls, "-content-").concat(tabPosition), (0, _defineProperty2.default)({}, "".concat(prefixCls, "-content-animated"), tabPaneAnimated)),
    style: activeIndex && tabPaneAnimated ? (0, _defineProperty2.default)({}, rtl ? 'marginRight' : 'marginLeft', "-".concat(activeIndex, "00%")) : null
  }, tabs.map(function (tab) {
    return /*#__PURE__*/React.cloneElement(tab.node, {
      key: tab.key,
      prefixCls: prefixCls,
      tabKey: tab.key,
      id: id,
      animated: tabPaneAnimated,
      active: tab.key === activeKey,
      destroyInactiveTabPane: destroyInactiveTabPane
    });
  })));
}
},{"@babel/runtime/helpers/esm/defineProperty":"gpd2","react":"n8MK","classnames":"qb7c","../TabContext":"vHWa"}],"Fb5J":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = TabPane;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/esm/objectSpread2"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/esm/slicedToArray"));

var React = _interopRequireWildcard(require("react"));

var _classnames = _interopRequireDefault(require("classnames"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function TabPane(_ref) {
  var prefixCls = _ref.prefixCls,
      forceRender = _ref.forceRender,
      className = _ref.className,
      style = _ref.style,
      id = _ref.id,
      active = _ref.active,
      animated = _ref.animated,
      destroyInactiveTabPane = _ref.destroyInactiveTabPane,
      tabKey = _ref.tabKey,
      children = _ref.children;

  var _React$useState = React.useState(forceRender),
      _React$useState2 = (0, _slicedToArray2.default)(_React$useState, 2),
      visited = _React$useState2[0],
      setVisited = _React$useState2[1];

  React.useEffect(function () {
    if (active) {
      setVisited(true);
    } else if (destroyInactiveTabPane) {
      setVisited(false);
    }
  }, [active, destroyInactiveTabPane]);
  var mergedStyle = {};

  if (!active) {
    if (animated) {
      mergedStyle.visibility = 'hidden';
      mergedStyle.height = 0;
      mergedStyle.overflowY = 'hidden';
    } else {
      mergedStyle.display = 'none';
    }
  }

  return /*#__PURE__*/React.createElement("div", {
    id: id && "".concat(id, "-panel-").concat(tabKey),
    role: "tabpanel",
    tabIndex: active ? 0 : -1,
    "aria-labelledby": id && "".concat(id, "-tab-").concat(tabKey),
    "aria-hidden": !active,
    style: (0, _objectSpread2.default)((0, _objectSpread2.default)({}, mergedStyle), style),
    className: (0, _classnames.default)("".concat(prefixCls, "-tabpane"), active && "".concat(prefixCls, "-tabpane-active"), className)
  }, (active || visited || forceRender) && children);
}
},{"@babel/runtime/helpers/esm/objectSpread2":"UKeT","@babel/runtime/helpers/esm/slicedToArray":"T12H","react":"n8MK","classnames":"qb7c"}],"zJYA":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/esm/extends"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/esm/defineProperty"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/esm/slicedToArray"));

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/esm/typeof"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/esm/objectWithoutProperties"));

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/esm/objectSpread2"));

var React = _interopRequireWildcard(require("react"));

var _classnames = _interopRequireDefault(require("classnames"));

var _toArray = _interopRequireDefault(require("rc-util/es/Children/toArray"));

var _isMobile = _interopRequireDefault(require("rc-util/es/isMobile"));

var _useMergedState5 = _interopRequireDefault(require("rc-util/es/hooks/useMergedState"));

var _TabNavList = _interopRequireDefault(require("./TabNavList"));

var _TabPanelList = _interopRequireDefault(require("./TabPanelList"));

var _TabPane = _interopRequireDefault(require("./TabPanelList/TabPane"));

var _TabContext = _interopRequireDefault(require("./TabContext"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Accessibility https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/Tab_Role

/**
 * Should added antd:
 * - type
 *
 * Removed:
 * - onNextClick
 * - onPrevClick
 * - keyboard
 */
// Used for accessibility
var uuid = 0;

function parseTabList(children) {
  return (0, _toArray.default)(children).map(function (node) {
    if ( /*#__PURE__*/React.isValidElement(node)) {
      var key = node.key !== undefined ? String(node.key) : undefined;
      return (0, _objectSpread2.default)((0, _objectSpread2.default)({
        key: key
      }, node.props), {}, {
        node: node
      });
    }

    return null;
  }).filter(function (tab) {
    return tab;
  });
}

function Tabs(_ref, ref) {
  var _classNames;

  var id = _ref.id,
      _ref$prefixCls = _ref.prefixCls,
      prefixCls = _ref$prefixCls === void 0 ? 'rc-tabs' : _ref$prefixCls,
      className = _ref.className,
      children = _ref.children,
      direction = _ref.direction,
      activeKey = _ref.activeKey,
      defaultActiveKey = _ref.defaultActiveKey,
      editable = _ref.editable,
      _ref$animated = _ref.animated,
      animated = _ref$animated === void 0 ? {
    inkBar: true,
    tabPane: false
  } : _ref$animated,
      _ref$tabPosition = _ref.tabPosition,
      tabPosition = _ref$tabPosition === void 0 ? 'top' : _ref$tabPosition,
      tabBarGutter = _ref.tabBarGutter,
      tabBarStyle = _ref.tabBarStyle,
      tabBarExtraContent = _ref.tabBarExtraContent,
      locale = _ref.locale,
      moreIcon = _ref.moreIcon,
      moreTransitionName = _ref.moreTransitionName,
      destroyInactiveTabPane = _ref.destroyInactiveTabPane,
      renderTabBar = _ref.renderTabBar,
      onChange = _ref.onChange,
      onTabClick = _ref.onTabClick,
      onTabScroll = _ref.onTabScroll,
      restProps = (0, _objectWithoutProperties2.default)(_ref, ["id", "prefixCls", "className", "children", "direction", "activeKey", "defaultActiveKey", "editable", "animated", "tabPosition", "tabBarGutter", "tabBarStyle", "tabBarExtraContent", "locale", "moreIcon", "moreTransitionName", "destroyInactiveTabPane", "renderTabBar", "onChange", "onTabClick", "onTabScroll"]);
  var tabs = parseTabList(children);
  var rtl = direction === 'rtl';
  var mergedAnimated;

  if (animated === false) {
    mergedAnimated = {
      inkBar: false,
      tabPane: false
    };
  } else if (animated === true) {
    mergedAnimated = {
      inkBar: true,
      tabPane: true
    };
  } else {
    mergedAnimated = (0, _objectSpread2.default)({
      inkBar: true,
      tabPane: false
    }, (0, _typeof2.default)(animated) === 'object' ? animated : {});
  } // ======================== Mobile ========================


  var _useState = (0, React.useState)(false),
      _useState2 = (0, _slicedToArray2.default)(_useState, 2),
      mobile = _useState2[0],
      setMobile = _useState2[1];

  (0, React.useEffect)(function () {
    // Only update on the client side
    setMobile((0, _isMobile.default)());
  }, []); // ====================== Active Key ======================

  var _useMergedState = (0, _useMergedState5.default)(function () {
    var _tabs$;

    return (_tabs$ = tabs[0]) === null || _tabs$ === void 0 ? void 0 : _tabs$.key;
  }, {
    value: activeKey,
    defaultValue: defaultActiveKey
  }),
      _useMergedState2 = (0, _slicedToArray2.default)(_useMergedState, 2),
      mergedActiveKey = _useMergedState2[0],
      setMergedActiveKey = _useMergedState2[1];

  var _useState3 = (0, React.useState)(function () {
    return tabs.findIndex(function (tab) {
      return tab.key === mergedActiveKey;
    });
  }),
      _useState4 = (0, _slicedToArray2.default)(_useState3, 2),
      activeIndex = _useState4[0],
      setActiveIndex = _useState4[1]; // Reset active key if not exist anymore


  (0, React.useEffect)(function () {
    var newActiveIndex = tabs.findIndex(function (tab) {
      return tab.key === mergedActiveKey;
    });

    if (newActiveIndex === -1) {
      var _tabs$newActiveIndex;

      newActiveIndex = Math.max(0, Math.min(activeIndex, tabs.length - 1));
      setMergedActiveKey((_tabs$newActiveIndex = tabs[newActiveIndex]) === null || _tabs$newActiveIndex === void 0 ? void 0 : _tabs$newActiveIndex.key);
    }

    setActiveIndex(newActiveIndex);
  }, [tabs.map(function (tab) {
    return tab.key;
  }).join('_'), mergedActiveKey, activeIndex]); // ===================== Accessibility ====================

  var _useMergedState3 = (0, _useMergedState5.default)(null, {
    value: id
  }),
      _useMergedState4 = (0, _slicedToArray2.default)(_useMergedState3, 2),
      mergedId = _useMergedState4[0],
      setMergedId = _useMergedState4[1];

  var mergedTabPosition = tabPosition;

  if (mobile && !['left', 'right'].includes(tabPosition)) {
    mergedTabPosition = 'top';
  } // Async generate id to avoid ssr mapping failed


  (0, React.useEffect)(function () {
    if (!id) {
      setMergedId("rc-tabs-".concat("production" === 'test' ? 'test' : uuid));
      uuid += 1;
    }
  }, []); // ======================== Events ========================

  function onInternalTabClick(key, e) {
    onTabClick === null || onTabClick === void 0 ? void 0 : onTabClick(key, e);
    setMergedActiveKey(key);
    onChange === null || onChange === void 0 ? void 0 : onChange(key);
  } // ======================== Render ========================


  var sharedProps = {
    id: mergedId,
    activeKey: mergedActiveKey,
    animated: mergedAnimated,
    tabPosition: mergedTabPosition,
    rtl: rtl,
    mobile: mobile
  };
  var tabNavBar;
  var tabNavBarProps = (0, _objectSpread2.default)((0, _objectSpread2.default)({}, sharedProps), {}, {
    editable: editable,
    locale: locale,
    moreIcon: moreIcon,
    moreTransitionName: moreTransitionName,
    tabBarGutter: tabBarGutter,
    onTabClick: onInternalTabClick,
    onTabScroll: onTabScroll,
    extra: tabBarExtraContent,
    style: tabBarStyle,
    panes: children
  });

  if (renderTabBar) {
    tabNavBar = renderTabBar(tabNavBarProps, _TabNavList.default);
  } else {
    tabNavBar = /*#__PURE__*/React.createElement(_TabNavList.default, tabNavBarProps);
  }

  return /*#__PURE__*/React.createElement(_TabContext.default.Provider, {
    value: {
      tabs: tabs,
      prefixCls: prefixCls
    }
  }, /*#__PURE__*/React.createElement("div", (0, _extends2.default)({
    ref: ref,
    id: id,
    className: (0, _classnames.default)(prefixCls, "".concat(prefixCls, "-").concat(mergedTabPosition), (_classNames = {}, (0, _defineProperty2.default)(_classNames, "".concat(prefixCls, "-mobile"), mobile), (0, _defineProperty2.default)(_classNames, "".concat(prefixCls, "-editable"), editable), (0, _defineProperty2.default)(_classNames, "".concat(prefixCls, "-rtl"), rtl), _classNames), className)
  }, restProps), tabNavBar, /*#__PURE__*/React.createElement(_TabPanelList.default, (0, _extends2.default)({
    destroyInactiveTabPane: destroyInactiveTabPane
  }, sharedProps, {
    animated: mergedAnimated
  }))));
}

var ForwardTabs = /*#__PURE__*/React.forwardRef(Tabs);
ForwardTabs.TabPane = _TabPane.default;
var _default = ForwardTabs;
exports.default = _default;
},{"@babel/runtime/helpers/esm/extends":"SpjQ","@babel/runtime/helpers/esm/defineProperty":"gpd2","@babel/runtime/helpers/esm/slicedToArray":"T12H","@babel/runtime/helpers/esm/typeof":"xLw6","@babel/runtime/helpers/esm/objectWithoutProperties":"tuNH","@babel/runtime/helpers/esm/objectSpread2":"UKeT","react":"n8MK","classnames":"qb7c","rc-util/es/Children/toArray":"artt","rc-util/es/isMobile":"nb8J","rc-util/es/hooks/useMergedState":"zMpY","./TabNavList":"Piyq","./TabPanelList":"om2l","./TabPanelList/TabPane":"Fb5J","./TabContext":"vHWa"}],"FgVr":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "TabPane", {
  enumerable: true,
  get: function () {
    return _TabPane.default;
  }
});
exports.default = void 0;

var _Tabs = _interopRequireDefault(require("./Tabs"));

var _TabPane = _interopRequireDefault(require("./TabPanelList/TabPane"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = _Tabs.default;
exports.default = _default;
},{"./Tabs":"zJYA","./TabPanelList/TabPane":"Fb5J"}],"EJTb":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.checkPointerDownEvent = exports.removeDragStateListener = exports.addDragStateListener = exports.destroyDraggingElement = exports.removeHandlers = exports.addHandlers = exports.isDragging = exports.DragState = void 0;

class DragState {
  constructor(event, component, init = false) {
    this.pageX = 0;
    this.pageY = 0;
    this.clientX = 0;
    this.clientY = 0;
    this.dx = 0;
    this.dy = 0;
    this.event = event;
    this.component = component;
    this._init = init;

    if (event) {
      if (event.type.startsWith('touch')) {
        let touch;

        if (event.type === 'touchend') {
          touch = event.changedTouches[0];
        } else {
          touch = event.touches[0];
        }

        this.pageX = touch.pageX;
        this.pageY = touch.pageY;
        this.clientX = touch.clientX;
        this.clientY = touch.clientY;
      } else if ('pageX' in event) {
        this.pageX = event.pageX;
        this.pageY = event.pageY;
        this.clientX = event.clientX;
        this.clientY = event.clientY;
      }

      this.dx = (this.pageX - component.baseX) * component.scaleX;
      this.dy = (this.pageY - component.baseY) * component.scaleY;
    }
  }

  moved() {
    return Math.abs(this.dx) >= 1 || Math.abs(this.dy) >= 1;
  }
  /**
   * @param refElement, the element being moved
   * @param draggingHtml, the element show in the dragging layer
   */


  startDrag(refElement, draggingHtml) {
    if (!this._init) {
      throw new Error('startDrag can only be used in onDragStart callback');
    }

    if (refElement === undefined) {
      refElement = this.component.element;
    }

    createDraggingElement(this, refElement, draggingHtml);
  }

  setData(data, scope) {
    if (!this._init) {
      throw new Error('setData can only be used in onDragStart callback');
    }

    _dataScope = scope;
    _data = data;
  }

  static getData(field, scope) {
    if (scope === _dataScope && _data) {
      return _data[field];
    }

    return null;
  }

  get dragType() {
    return this.component.dragType;
  }

  accept(message = '') {
    this.acceptMessage = message;
    this.rejected = false;
  }

  reject() {
    this.rejected = true;
  }

  _onMove() {
    if (_data) {
      let ownerDocument = this.component.ownerDocument;
      let searchElement = ownerDocument.elementFromPoint(this.clientX, this.clientY);
      let droppingHandlers;

      while (searchElement && searchElement !== ownerDocument.body) {
        if (_dragListeners.has(searchElement)) {
          let handlers = _dragListeners.get(searchElement);

          if (handlers.onDragOverT) {
            handlers.onDragOverT(this);

            if (this.acceptMessage != null) {
              droppingHandlers = handlers;
              break;
            }
          }
        }

        searchElement = searchElement.parentElement;
      }

      setDroppingHandler(droppingHandlers, this);
    }

    moveDraggingElement(this);
  }

  _onDragEnd() {
    if (_droppingHandlers && _droppingHandlers.onDropT) {
      _droppingHandlers.onDropT(this);
    }

    if (this.component.dragType === 'right') {
      // prevent the next menu event if drop handler is called on right mouse button
      this.component.ownerDocument.addEventListener('contextmenu', preventDefault, true);
      setTimeout(() => {
        this.component.ownerDocument.removeEventListener('contextmenu', preventDefault, true);
      }, 0);
    }
  }

}

exports.DragState = DragState;

function preventDefault(e) {
  e.preventDefault();
  e.stopPropagation();
}

let _dataScope;

let _data;

let _draggingState; // applying dragging style


let _refElement;

let _droppingHandlers;

function setDroppingHandler(handlers, state) {
  if (_droppingHandlers === handlers) {
    return;
  }

  if (_droppingHandlers && _droppingHandlers.onDragLeaveT) {
    _droppingHandlers.onDragLeaveT(state);
  }

  _droppingHandlers = handlers;
}

let _dragListeners = new WeakMap();

function isDragging() {
  return _draggingState != null;
}

exports.isDragging = isDragging;

function addHandlers(element, handlers) {
  _dragListeners.set(element, handlers);
}

exports.addHandlers = addHandlers;

function removeHandlers(element) {
  let handlers = _dragListeners.get(element);

  if (handlers === _droppingHandlers) {
    _droppingHandlers = null;
  }

  _dragListeners.delete(element);
}

exports.removeHandlers = removeHandlers;

let _draggingDiv;

let _draggingIcon;

function _createDraggingDiv(doc) {
  _draggingDiv = doc.createElement('div');
  _draggingIcon = doc.createElement('div');
  _draggingDiv.className = 'dragging-layer';

  _draggingDiv.appendChild(document.createElement('div')); // place holder for dragging element


  _draggingDiv.appendChild(_draggingIcon);
}

function createDraggingElement(state, refElement, draggingHtml) {
  _draggingState = state;

  if (refElement) {
    refElement.classList.add('dragging');
    _refElement = refElement;
  }

  _createDraggingDiv(state.component.ownerDocument);

  state.component.ownerDocument.body.appendChild(_draggingDiv);
  let draggingWidth = 0;
  let draggingHeight = 0;

  if (draggingHtml === undefined) {
    draggingHtml = state.component.element;
  }

  if (draggingHtml && 'outerHTML' in draggingHtml) {
    draggingWidth = draggingHtml.offsetWidth;
    draggingHeight = draggingHtml.offsetHeight;
    draggingHtml = draggingHtml.outerHTML;
  }

  if (draggingHtml) {
    _draggingDiv.firstElementChild.outerHTML = draggingHtml;

    if (window.getComputedStyle(_draggingDiv.firstElementChild).backgroundColor === 'rgba(0, 0, 0, 0)') {
      _draggingDiv.firstElementChild.style.backgroundColor = window.getComputedStyle(_draggingDiv).getPropertyValue('--default-background-color');
    }

    if (draggingWidth) {
      if (draggingWidth > 400) draggingWidth = 400;
      _draggingDiv.firstElementChild.style.width = `${draggingWidth}px`;
    }

    if (draggingHeight) {
      if (draggingHeight > 300) draggingHeight = 300;
      _draggingDiv.firstElementChild.style.height = `${draggingHeight}px`;
    }
  }

  for (let callback of _dragStateListener) {
    if (_dataScope) {
      callback(_dataScope);
    } else {
      callback(true);
    }
  }
}

function moveDraggingElement(state) {
  _draggingDiv.style.left = `${state.pageX}px`;
  _draggingDiv.style.top = `${state.pageY}px`;

  if (state.rejected) {
    _draggingIcon.className = 'drag-accept-reject';
  } else if (state.acceptMessage) {
    _draggingIcon.className = state.acceptMessage;
  } else {
    _draggingIcon.className = '';
  }
}

function destroyDraggingElement(e) {
  if (_refElement) {
    _refElement.classList.remove('dragging');

    _refElement = null;
  }

  if (_draggingDiv) {
    _draggingDiv.remove();

    _draggingDiv = null;
  }

  _draggingState = null;
  setDroppingHandler(null, e);
  _dataScope = null;
  _data = null;

  for (let callback of _dragStateListener) {
    callback(null);
  }
}

exports.destroyDraggingElement = destroyDraggingElement;

let _dragStateListener = new Set();

function addDragStateListener(callback) {
  _dragStateListener.add(callback);
}

exports.addDragStateListener = addDragStateListener;

function removeDragStateListener(callback) {
  _dragStateListener.delete(callback);
}

exports.removeDragStateListener = removeDragStateListener;

let _lastPointerDownEvent;

function checkPointerDownEvent(e) {
  if (e instanceof MouseEvent && e.button !== 0 && e.button !== 2) {
    // only allows left right button drag
    return false;
  }

  if (e !== _lastPointerDownEvent) {
    // same event can't trigger drag twice
    _lastPointerDownEvent = e;
    return true;
  }

  return false;
}

exports.checkPointerDownEvent = checkPointerDownEvent; // work around for drag scroll issue on IOS

if (typeof window !== 'undefined' && window.navigator && window.navigator.platform && /iP(ad|hone|od)/.test(window.navigator.platform)) {
  document.addEventListener('touchmove', e => {
    if (e.touches.length === 1 && document.body.classList.contains('dock-dragging')) {
      e.preventDefault();
    }
  }, {
    passive: false
  });
}
},{}],"cItD":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GestureState = void 0;

class GestureState {
  constructor(event, component, init = false) {
    this.dx1 = 0;
    this.dy1 = 0;
    this.dx2 = 0;
    this.dy2 = 0;
    this.scale = 1;
    this.rotate = 0;
    this.dx = 0;
    this.dy = 0;
    this.event = event;
    this.component = component;
    this._init = init;

    if (event) {
      if (event.touches.length === 2) {
        let touch1 = event.touches[0];
        let touch2 = event.touches[1];
        this.dx1 = (touch1.pageX - component.baseX) * component.scaleX;
        this.dy1 = (touch1.pageY - component.baseY) * component.scaleY;
        this.dx2 = (touch2.pageX - component.baseX2) * component.scaleX;
        this.dy2 = (touch2.pageY - component.baseY2) * component.scaleY;

        if (this.dx1 * this.dx2 >= 0) {
          this.dx = (this.dx1 + this.dx2) / 2;
        }

        if (this.dy1 * this.dy2 >= 0) {
          this.dy = (this.dy1 + this.dy2) / 2;
        }

        this.scale = Math.sqrt(Math.pow(touch2.pageX - touch1.pageX, 2) + Math.pow(touch2.pageY - touch1.pageY, 2)) / component.baseDis;
        this.rotate = Math.atan2(touch2.pageY - touch1.pageY, touch2.pageX - touch1.pageX) - component.baseAng;

        if (this.rotate > Math.PI) {
          this.rotate -= Math.PI * 2;
        } else if (this.rotate < -Math.PI) {
          this.rotate += Math.PI * 2;
        }
      }
    }
  }

  moved() {
    return Math.max(Math.abs(this.dx1), Math.abs(this.dx2), Math.abs(this.dy1), Math.abs(this.dy2));
  }

  pageCenter() {
    let touch1 = this.event.touches[0];
    let touch2 = this.event.touches[1];
    return [(touch1.pageX + touch2.pageX) / 2, (touch1.pageY + touch2.pageY) / 2];
  }

  clientCenter() {
    let touch1 = this.event.touches[0];
    let touch2 = this.event.touches[1];
    return [(touch1.clientX + touch2.clientX) / 2, (touch1.clientY + touch2.clientY) / 2];
  }

}

exports.GestureState = GestureState;
},{}],"HyIX":[function(require,module,exports) {
"use strict";

var __createBinding = this && this.__createBinding || (Object.create ? function (o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  Object.defineProperty(o, k2, {
    enumerable: true,
    get: function () {
      return m[k];
    }
  });
} : function (o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  o[k2] = m[k];
});

var __setModuleDefault = this && this.__setModuleDefault || (Object.create ? function (o, v) {
  Object.defineProperty(o, "default", {
    enumerable: true,
    value: v
  });
} : function (o, v) {
  o["default"] = v;
});

var __importStar = this && this.__importStar || function (mod) {
  if (mod && mod.__esModule) return mod;
  var result = {};
  if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);

  __setModuleDefault(result, mod);

  return result;
};

var __rest = this && this.__rest || function (s, e) {
  var t = {};

  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];

  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DragDropDiv = void 0;

const react_1 = __importDefault(require("react"));

const DragManager = __importStar(require("./DragManager"));

const GestureManager_1 = require("./GestureManager");

class DragDropDiv extends react_1.default.PureComponent {
  constructor() {
    super(...arguments);

    this._getRef = r => {
      if (r === this.element) {
        return;
      }

      let {
        getRef,
        onDragOverT
      } = this.props;

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

    this.onPointerDown = e => {
      let nativeTarget = e.nativeEvent.target;

      if (nativeTarget instanceof HTMLInputElement || nativeTarget instanceof HTMLTextAreaElement || nativeTarget.classList.contains('drag-ignore')) {
        // ignore drag from input element
        return;
      }

      let {
        onDragStartT,
        onGestureStartT,
        onGestureMoveT,
        useRightButtonDragT
      } = this.props;
      let event = e.nativeEvent;
      this.cancel();

      if (event.type === 'touchstart') {
        // check single or double fingure touch
        if (event.touches.length === 1) {
          if (onDragStartT) {
            this.onDragStart(event);
          }
        } else if (event.touches.length === 2) {
          if (onGestureStartT && onGestureMoveT) {
            this.onGestureStart(event);
          }
        }
      } else if (onDragStartT) {
        if (event.button === 2 && !useRightButtonDragT) {
          return;
        }

        this.onDragStart(event);
      }
    };

    this.onMouseMove = e => {
      let {
        onDragMoveT
      } = this.props;

      if (this.waitingMove) {
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

    this.onTouchMove = e => {
      let {
        onDragMoveT
      } = this.props;

      if (this.waitingMove) {
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

    this.onDragEnd = e => {
      let {
        onDragEndT
      } = this.props;
      let state = new DragManager.DragState(e, this);
      this.removeListeners();

      if (!this.waitingMove) {
        if (e) {
          // e=null means drag is canceled
          state._onDragEnd();
        }

        if (onDragEndT) {
          onDragEndT(state);
        }
      }

      this.cleanupDrag(state);
    };

    this.onGestureMove = e => {
      let {
        onGestureMoveT,
        gestureSensitivity
      } = this.props;
      let state = new GestureManager_1.GestureState(e, this);

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

    this.onGestureEnd = e => {
      let {
        onGestureEndT
      } = this.props;
      let state = new DragManager.DragState(e, this);
      this.removeListeners();

      if (onGestureEndT) {
        onGestureEndT();
      }
    };

    this.onKeyDown = e => {
      if (e.key === 'Escape') {
        this.cancel();
      }
    };
  }

  onDragStart(event) {
    if (!DragManager.checkPointerDownEvent(event)) {
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
    let {
      onDragStartT
    } = this.props;

    if (event.type === 'touchstart') {
      this.ownerDocument.addEventListener('touchmove', this.onTouchMove);
      this.ownerDocument.addEventListener('touchend', this.onDragEnd);
      this.dragType = 'touch';
    } else {
      this.ownerDocument.addEventListener('mousemove', this.onMouseMove);
      this.ownerDocument.addEventListener('mouseup', this.onDragEnd);

      if (event.button === 2) {
        this.dragType = 'right';
      } else {
        this.dragType = 'left';
      }
    }

    this.ownerDocument.body.classList.add('dock-dragging');
    this.waitingMove = true;
    this.listening = true;
  } // return true for a valid move


  checkFirstMove(e) {
    let state = new DragManager.DragState(e, this, true);

    if (!state.moved()) {
      // not a move
      return false;
    }

    return this.executeFirstMove(state);
  }

  executeFirstMove(state) {
    let {
      onDragStartT
    } = this.props;
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
    this.ownerDocument.body.classList.add('dock-dragging');
    this.gesturing = true;
    this.waitingMove = true;
  }

  onGestureStart(event) {
    if (!DragManager.checkPointerDownEvent(event)) {
      // same pointer event shouldn't trigger 2 drag start
      return;
    }

    let {
      onGestureStartT
    } = this.props;
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
    } else if (this.listening) {
      if (this.dragType === 'touch') {
        this.ownerDocument.removeEventListener('touchmove', this.onTouchMove);
        this.ownerDocument.removeEventListener('touchend', this.onDragEnd);
      } else {
        this.ownerDocument.removeEventListener('mousemove', this.onMouseMove);
        this.ownerDocument.removeEventListener('mouseup', this.onDragEnd);
      }
    }

    this.ownerDocument.body.classList.remove('dock-dragging');
    this.ownerDocument.removeEventListener('keydown', this.onKeyDown);
    this.listening = false;
    this.gesturing = false;
  }

  cleanupDrag(state) {
    this.dragType = null;
    this.waitingMove = false;
    DragManager.destroyDraggingElement(state);
  }

  render() {
    let _a = this.props,
        {
      getRef,
      children,
      className,
      directDragT,
      onDragStartT,
      onDragMoveT,
      onDragEndT,
      onDragOverT,
      onDragLeaveT,
      onDropT,
      onGestureStartT,
      onGestureMoveT,
      onGestureEndT,
      useRightButtonDragT
    } = _a,
        others = __rest(_a, ["getRef", "children", "className", "directDragT", "onDragStartT", "onDragMoveT", "onDragEndT", "onDragOverT", "onDragLeaveT", "onDropT", "onGestureStartT", "onGestureMoveT", "onGestureEndT", "useRightButtonDragT"]);

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

    return react_1.default.createElement("div", Object.assign({
      ref: this._getRef,
      className: className
    }, others, {
      onMouseDown: onMouseDown,
      onTouchStart: onTouchDown
    }), children);
  }

  componentDidUpdate(prevProps) {
    let {
      onDragOverT,
      onDragEndT,
      onDragLeaveT
    } = this.props;

    if (this.element && (prevProps.onDragOverT !== onDragOverT || prevProps.onDragLeaveT !== onDragLeaveT || prevProps.onDragEndT !== onDragEndT)) {
      if (onDragOverT) {
        DragManager.addHandlers(this.element, this.props);
      } else {
        DragManager.removeHandlers(this.element);
      }
    }
  }

  componentWillUnmount() {
    let {
      onDragOverT
    } = this.props;

    if (this.element && onDragOverT) {
      DragManager.removeHandlers(this.element);
    }

    this.cancel();
  }

}

exports.DragDropDiv = DragDropDiv;
},{"react":"n8MK","./DragManager":"EJTb","./GestureManager":"cItD"}],"Ec16":[function(require,module,exports) {
"use strict";

var __rest = this && this.__rest || function (s, e) {
  var t = {};

  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];

  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DockTabBar = void 0;

const react_1 = __importDefault(require("react"));

const DragDropDiv_1 = require("./dragdrop/DragDropDiv");

const DockData_1 = require("./DockData");
/**
 * @return returns true if navigation is handled in local tab move, otherwise returns false
 */


function checkLocalTabMove(key, tabbar) {
  if (key === 'ArrowLeft' || key === 'ArrowRight') {
    let tabs = Array.from(tabbar.querySelectorAll('.dock-tab-btn'));
    let activeTab = tabbar.querySelector('.dock-tab-active>.dock-tab-btn');
    let i = tabs.indexOf(activeTab);

    if (i >= 0) {
      if (key === 'ArrowLeft') {
        if (i > 0) {
          tabs[i - 1].click();
          tabs[i - 1].focus();
          return true;
        }
      } else {
        if (i < tabs.length - 1) {
          tabs[i + 1].click();
          tabs[i + 1].focus();
          return true;
        }
      }
    }
  }

  return false;
}

function DockTabBar(props) {
  const {
    onDragStart,
    onDragMove,
    onDragEnd,
    TabNavList,
    isMaximized
  } = props,
        restProps = __rest(props, ["onDragStart", "onDragMove", "onDragEnd", "TabNavList", "isMaximized"]);

  const layout = react_1.default.useContext(DockData_1.DockContextType);
  const ref = react_1.default.useRef();

  const getRef = div => {
    ref.current = div;
  };

  const onKeyDown = e => {
    if (e.key.startsWith('Arrow')) {
      if (!checkLocalTabMove(e.key, ref.current) && !isMaximized) {
        layout.navigateToPanel(ref.current, e.key);
      }

      e.stopPropagation();
      e.preventDefault();
    }
  };

  return react_1.default.createElement(DragDropDiv_1.DragDropDiv, {
    onDragStartT: onDragStart,
    onDragMoveT: onDragMove,
    onDragEndT: onDragEnd,
    role: "tablist",
    className: "dock-bar",
    onKeyDown: onKeyDown,
    getRef: getRef,
    tabIndex: -1
  }, react_1.default.createElement(TabNavList, Object.assign({}, restProps)));
}

exports.DockTabBar = DockTabBar;
},{"react":"n8MK","./dragdrop/DragDropDiv":"HyIX","./DockData":"zh3I"}],"ZavB":[function(require,module,exports) {
"use strict";

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

const react_1 = __importDefault(require("react"));

const classnames_1 = __importDefault(require("classnames"));

const DockData_1 = require("./DockData");

class DockTabPane extends react_1.default.PureComponent {
  constructor() {
    super(...arguments);

    this.getRef = r => {
      this._ref = r;
    };
  }

  updateCache() {
    const {
      cached,
      children,
      cacheId
    } = this.props;

    if (this._cache) {
      if (!cached || cacheId !== this._cache.id) {
        this.context.removeTabCache(this._cache.id, this);
        this._cache = null;
      }
    }

    if (cached && this._ref) {
      this._cache = this.context.getTabCache(cacheId, this);

      this._ref.appendChild(this._cache.div);

      this.context.updateTabCache(this._cache.id, children);
    }
  }

  render() {
    const {
      cacheId,
      cached,
      prefixCls,
      forceRender,
      className,
      style,
      id,
      active,
      animated,
      destroyInactiveTabPane,
      tabKey,
      children
    } = this.props;

    if (active) {
      this.visited = true;
    } else if (destroyInactiveTabPane) {
      this.visited = false;
    }

    const mergedStyle = {};

    if (!active) {
      if (animated) {
        mergedStyle.visibility = 'hidden';
        mergedStyle.height = 0;
        mergedStyle.overflowY = 'hidden';
      } else {
        mergedStyle.display = 'none';
      }
    } // when cached == undefined, it will still cache the children inside tabs component, but not across whole dock layout
    // when cached == false, children are destroyed when not active


    const isRender = cached === false ? active : this.visited;
    let renderChildren = null;

    if (cached) {
      renderChildren = null;
    } else if (isRender || forceRender) {
      renderChildren = children;
    }

    let getRef = cached ? this.getRef : null;
    return react_1.default.createElement("div", {
      ref: getRef,
      id: cacheId,
      role: "tabpanel",
      "aria-labelledby": id && `${id}-tab-${tabKey}`,
      "aria-hidden": !active,
      style: Object.assign(Object.assign({}, mergedStyle), style),
      className: classnames_1.default(`${prefixCls}-tabpane`, active && `${prefixCls}-tabpane-active`, className)
    }, (active || this.visited || forceRender) && renderChildren);
  }

  componentDidMount() {
    this.updateCache();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    this.updateCache();
  }

  componentWillUnmount() {
    if (this._cache) {
      this.context.removeTabCache(this._cache.id, this);
    }
  }

}

exports.default = DockTabPane;
DockTabPane.contextType = DockData_1.DockContextType;
},{"react":"n8MK","classnames":"qb7c","./DockData":"zh3I"}],"wqok":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.findNearestPanel = exports.getFloatPanelSize = exports.fixLayoutData = exports.fixFloatPanelPos = exports.maximize = exports.moveToFront = exports.removeFromLayout = exports.panelToWindow = exports.floatPanel = exports.dockPanelToBox = exports.dockPanelToPanel = exports.converToPanel = exports.addTabToPanel = exports.addNextToTab = exports.find = exports.Filter = exports.nextZIndex = exports.nextId = exports.getUpdatedObject = void 0;

const DockData_1 = require("./DockData");

let _watchObjectChange = new WeakMap();

function getUpdatedObject(obj) {
  let result = _watchObjectChange.get(obj);

  if (result) {
    return getUpdatedObject(result);
  }

  return obj;
}

exports.getUpdatedObject = getUpdatedObject;

function clearObjectCache() {
  _watchObjectChange = new WeakMap();
}

function clone(value, extra) {
  let newValue = Object.assign(Object.assign({}, value), extra);

  if (Array.isArray(newValue.tabs)) {
    newValue.tabs = newValue.tabs.concat();
  }

  if (Array.isArray(newValue.children)) {
    newValue.children = newValue.children.concat();
  }

  _watchObjectChange.set(value, newValue);

  return newValue;
}

let _idCount = 0;

function nextId() {
  ++_idCount;
  return `+${_idCount}`;
}

exports.nextId = nextId;
let _zCount = 0;

function nextZIndex(current) {
  if (current === _zCount) {
    // already the top
    return current;
  }

  return ++_zCount;
}

exports.nextZIndex = nextZIndex;

function findInPanel(panel, id, filter) {
  if (panel.id === id && filter & Filter.Panel) {
    return panel;
  }

  if (filter & Filter.Tab) {
    for (let tab of panel.tabs) {
      if (tab.id === id) {
        return tab;
      }
    }
  }

  return null;
}

function findInBox(box, id, filter) {
  let result;

  for (let child of box.children) {
    if ('children' in child) {
      if (result = findInBox(child, id, filter)) {
        break;
      }
    } else if ('tabs' in child) {
      if (result = findInPanel(child, id, filter)) {
        break;
      }
    }
  }

  return result;
}

var Filter;

(function (Filter) {
  Filter[Filter["Tab"] = 1] = "Tab";
  Filter[Filter["Panel"] = 2] = "Panel";
  Filter[Filter["Docked"] = 4] = "Docked";
  Filter[Filter["Floated"] = 8] = "Floated";
  Filter[Filter["Windowed"] = 16] = "Windowed";
  Filter[Filter["Max"] = 32] = "Max";
  Filter[Filter["EveryWhere"] = 60] = "EveryWhere";
  Filter[Filter["AnyTab"] = 61] = "AnyTab";
  Filter[Filter["AnyPanel"] = 62] = "AnyPanel";
  Filter[Filter["All"] = 63] = "All";
})(Filter = exports.Filter || (exports.Filter = {}));

function find(layout, id, filter = Filter.All) {
  let result;

  if (filter & Filter.Docked) {
    result = findInBox(layout.dockbox, id, filter);
  }

  if (result) return result;

  if (filter & Filter.Floated) {
    result = findInBox(layout.floatbox, id, filter);
  }

  if (result) return result;

  if (filter & Filter.Windowed) {
    result = findInBox(layout.windowbox, id, filter);
  }

  if (result) return result;

  if (filter & Filter.Max) {
    result = findInBox(layout.maxbox, id, filter);
  }

  return result;
}

exports.find = find;

function addNextToTab(layout, source, target, direction) {
  let pos = target.parent.tabs.indexOf(target);

  if (pos >= 0) {
    if (direction === 'after-tab') {
      ++pos;
    }

    return addTabToPanel(layout, source, target.parent, pos);
  }

  return layout;
}

exports.addNextToTab = addNextToTab;

function addTabToPanel(layout, source, panel, idx = -1) {
  if (idx === -1) {
    idx = panel.tabs.length;
  }

  let tabs;
  let activeId;

  if ('tabs' in source) {
    // source is PanelData
    tabs = source.tabs;
    activeId = source.activeId;
  } else {
    // source is TabData
    tabs = [source];
  }

  if (tabs.length) {
    let newPanel = clone(panel);
    newPanel.tabs.splice(idx, 0, ...tabs);
    newPanel.activeId = tabs[tabs.length - 1].id;

    for (let tab of tabs) {
      tab.parent = newPanel;
    }

    if (activeId) {
      newPanel.activeId = activeId;
    }

    layout = replacePanel(layout, panel, newPanel);
  }

  return layout;
}

exports.addTabToPanel = addTabToPanel;

function converToPanel(source) {
  if ('tabs' in source) {
    // source is already PanelData
    return source;
  } else {
    let newPanel = {
      tabs: [source],
      group: source.group,
      activeId: source.id
    };
    source.parent = newPanel;
    return newPanel;
  }
}

exports.converToPanel = converToPanel;

function dockPanelToPanel(layout, newPanel, panel, direction) {
  let box = panel.parent;
  let dockMode = direction === 'left' || direction === 'right' ? 'horizontal' : 'vertical';
  let afterPanel = direction === 'bottom' || direction === 'right';
  let pos = box.children.indexOf(panel);

  if (pos >= 0) {
    let newBox = clone(box);

    if (dockMode === box.mode) {
      if (afterPanel) {
        ++pos;
      }

      panel.size *= 0.5;
      newPanel.size = panel.size;
      newBox.children.splice(pos, 0, newPanel);
    } else {
      let newChildBox = {
        mode: dockMode,
        children: []
      };
      newChildBox.size = panel.size;

      if (afterPanel) {
        newChildBox.children = [panel, newPanel];
      } else {
        newChildBox.children = [newPanel, panel];
      }

      panel.parent = newChildBox;
      panel.size = 200;
      newPanel.parent = newChildBox;
      newPanel.size = 200;
      newBox.children[pos] = newChildBox;
      newChildBox.parent = newBox;
    }

    return replaceBox(layout, box, newBox);
  }

  return layout;
}

exports.dockPanelToPanel = dockPanelToPanel;

function dockPanelToBox(layout, newPanel, box, direction) {
  let parentBox = box.parent;
  let dockMode = direction === 'left' || direction === 'right' ? 'horizontal' : 'vertical';
  let afterPanel = direction === 'bottom' || direction === 'right';

  if (parentBox) {
    let pos = parentBox.children.indexOf(box);

    if (pos >= 0) {
      let newParentBox = clone(parentBox);

      if (dockMode === parentBox.mode) {
        if (afterPanel) {
          ++pos;
        }

        newPanel.size = box.size * 0.3;
        box.size *= 0.7;
        newParentBox.children.splice(pos, 0, newPanel);
      } else {
        let newChildBox = {
          mode: dockMode,
          children: []
        };
        newChildBox.size = box.size;

        if (afterPanel) {
          newChildBox.children = [box, newPanel];
        } else {
          newChildBox.children = [newPanel, box];
        }

        box.parent = newChildBox;
        box.size = 280;
        newPanel.parent = newChildBox;
        newPanel.size = 120;
        newParentBox.children[pos] = newChildBox;
      }

      return replaceBox(layout, parentBox, newParentBox);
    }
  } else if (box === layout.dockbox) {
    let newBox = clone(box);

    if (dockMode === box.mode) {
      let pos = 0;

      if (afterPanel) {
        pos = newBox.children.length;
      }

      newPanel.size = box.size * 0.3;
      box.size *= 0.7;
      newBox.children.splice(pos, 0, newPanel);
      return replaceBox(layout, box, newBox);
    } else {
      // replace root dockbox
      let newDockBox = {
        mode: dockMode,
        children: []
      };
      newDockBox.size = box.size;

      if (afterPanel) {
        newDockBox.children = [newBox, newPanel];
      } else {
        newDockBox.children = [newPanel, newBox];
      }

      newBox.size = 280;
      newPanel.size = 120;
      return replaceBox(layout, box, newDockBox);
    }
  } else if (box === layout.maxbox) {
    let newBox = clone(box);
    newBox.children.push(newPanel);
    return replaceBox(layout, box, newBox);
  }

  return layout;
}

exports.dockPanelToBox = dockPanelToBox;

function floatPanel(layout, newPanel, rect) {
  let newBox = clone(layout.floatbox);

  if (rect) {
    newPanel.x = rect.left;
    newPanel.y = rect.top;
    newPanel.w = rect.width;
    newPanel.h = rect.height;
  }

  newBox.children.push(newPanel);
  return replaceBox(layout, layout.floatbox, newBox);
}

exports.floatPanel = floatPanel;

function panelToWindow(layout, newPanel) {
  let newBox = clone(layout.windowbox);
  newBox.children.push(newPanel);
  return replaceBox(layout, layout.windowbox, newBox);
}

exports.panelToWindow = panelToWindow;

function removeFromLayout(layout, source) {
  if (source) {
    let panelData;

    if ('tabs' in source) {
      panelData = source;
      layout = removePanel(layout, panelData);
    } else {
      panelData = source.parent;
      layout = removeTab(layout, source);
    }

    if (panelData && panelData.parent && panelData.parent.mode === 'maximize') {
      let newPanel = layout.maxbox.children[0];

      if (!newPanel || newPanel.tabs.length === 0 && !newPanel.panelLock) {
        // max panel is gone, remove the place holder
        let placeHolder = find(layout, DockData_1.maximePlaceHolderId);

        if (placeHolder) {
          return removePanel(layout, placeHolder);
        }
      }
    }
  }

  return layout;
}

exports.removeFromLayout = removeFromLayout;

function removePanel(layout, panel) {
  let box = panel.parent;

  if (box) {
    let pos = box.children.indexOf(panel);

    if (pos >= 0) {
      let newBox = clone(box);
      newBox.children.splice(pos, 1);
      return replaceBox(layout, box, newBox);
    }
  }

  return layout;
}

function removeTab(layout, tab) {
  let panel = tab.parent;

  if (panel) {
    let pos = panel.tabs.indexOf(tab);

    if (pos >= 0) {
      let newPanel = clone(panel);
      newPanel.tabs.splice(pos, 1);

      if (newPanel.activeId === tab.id) {
        // update selection id
        if (newPanel.tabs.length > pos) {
          newPanel.activeId = newPanel.tabs[pos].id;
        } else if (newPanel.tabs.length) {
          newPanel.activeId = newPanel.tabs[0].id;
        }
      }

      return replacePanel(layout, panel, newPanel);
    }
  }

  return layout;
}

function moveToFront(layout, source) {
  if (source) {
    let panelData;
    let needUpdate = false;
    let changes = {};

    if ('tabs' in source) {
      panelData = source;
    } else {
      panelData = source.parent;

      if (panelData.activeId !== source.id) {
        // move tab to front
        changes.activeId = source.id;
        needUpdate = true;
      }
    }

    if (panelData && panelData.parent && panelData.parent.mode === 'float') {
      // move float panel to front
      let newZ = nextZIndex(panelData.z);

      if (newZ !== panelData.z) {
        changes.z = newZ;
        needUpdate = true;
      }
    }

    if (needUpdate) {
      layout = replacePanel(layout, panelData, clone(panelData, changes));
    }
  }

  return layout;
}

exports.moveToFront = moveToFront; // maximize or restore the panel

function maximize(layout, source) {
  if (source) {
    if ('tabs' in source) {
      if (source.parent.mode === 'maximize') {
        return restorePanel(layout, source);
      } else {
        return maximizePanel(layout, source);
      }
    } else {
      return maximizeTab(layout, source);
    }
  }

  return layout;
}

exports.maximize = maximize;

function maximizePanel(layout, panel) {
  let maxbox = layout.maxbox;

  if (maxbox.children.length) {
    // invalid maximize
    return layout;
  }

  let placeHodlerPanel = Object.assign(Object.assign({}, panel), {
    id: DockData_1.maximePlaceHolderId,
    tabs: [],
    panelLock: {}
  });
  layout = replacePanel(layout, panel, placeHodlerPanel);
  layout = dockPanelToBox(layout, panel, layout.maxbox, 'middle');
  return layout;
}

function restorePanel(layout, panel) {
  layout = removePanel(layout, panel);
  let placeHolder = find(layout, DockData_1.maximePlaceHolderId);

  if (placeHolder) {
    let {
      x,
      y,
      z,
      w,
      h
    } = placeHolder;
    panel = Object.assign(Object.assign({}, panel), {
      x,
      y,
      z,
      w,
      h
    });
    return replacePanel(layout, placeHolder, panel);
  } else {
    return dockPanelToBox(layout, panel, layout.dockbox, 'right');
  }
}

function maximizeTab(layout, tab) {
  // TODO to be implemented
  return layout;
} // move float panel into the screen


function fixFloatPanelPos(layout, layoutWidth, layoutHeight) {
  let layoutChanged = false;

  if (layout && layout.floatbox && layoutWidth > 200 && layoutHeight > 200) {
    let newFloatChildren = layout.floatbox.children.concat();

    for (let i = 0; i < newFloatChildren.length; ++i) {
      let panel = newFloatChildren[i];
      let panelChange = {};

      if (panel.w > layoutWidth) {
        panelChange.w = layoutWidth;
      }

      if (panel.h > layoutHeight) {
        panelChange.h = layoutHeight;
      }

      if (panel.y > layoutHeight - 16) {
        panelChange.y = Math.max(layoutHeight - 16 - (panel.h >> 1), 0);
      } else if (panel.y < 0) {
        panelChange.y = 0;
      }

      if (panel.x + panel.w < 16) {
        panelChange.x = 16 - (panel.w >> 1);
      } else if (panel.x > layoutWidth - 16) {
        panelChange.x = layoutWidth - 16 - (panel.w >> 1);
      }

      if (Object.keys(panelChange).length) {
        newFloatChildren[i] = clone(panel, panelChange);
        layoutChanged = true;
      }
    }

    if (layoutChanged) {
      let newBox = clone(layout.floatbox);
      newBox.children = newFloatChildren;
      return replaceBox(layout, layout.floatbox, newBox);
    }
  }

  return layout;
}

exports.fixFloatPanelPos = fixFloatPanelPos;

function fixLayoutData(layout, loadTab) {
  function fixpanelOrBox(d) {
    if (d.id == null) {
      d.id = nextId();
    } else if (d.id.startsWith('+')) {
      let idnum = Number(d.id);

      if (idnum > _idCount) {
        // make sure generated id is unique
        _idCount = idnum;
      }
    }

    if (!(d.size >= 0)) {
      d.size = 200;
    }

    d.minWidth = 0;
    d.minHeight = 0;
  }

  function fixPanelData(panel) {
    fixpanelOrBox(panel);
    let findActiveId = false;

    if (loadTab) {
      for (let i = 0; i < panel.tabs.length; ++i) {
        panel.tabs[i] = loadTab(panel.tabs[i]);
      }
    }

    for (let child of panel.tabs) {
      child.parent = panel;

      if (child.id === panel.activeId) {
        findActiveId = true;
      }

      if (child.minWidth > panel.minWidth) panel.minWidth = child.minWidth;
      if (child.minHeight > panel.minHeight) panel.minHeight = child.minHeight;
    }

    if (!findActiveId && panel.tabs.length) {
      panel.activeId = panel.tabs[0].id;
    }

    if (panel.minWidth <= 0) {
      panel.minWidth = 1;
    }

    if (panel.minHeight <= 0) {
      panel.minHeight = 1;
    }

    if (panel.panelLock) {
      if (panel.minWidth < panel.panelLock.minWidth) {
        panel.minWidth = panel.panelLock.minWidth;
      }

      if (panel.minHeight < panel.panelLock.minHeight) {
        panel.minHeight = panel.panelLock.minHeight;
      }
    }

    if (panel.group == null && panel.tabs.length) {
      panel.group = panel.tabs[0].group;
    }

    if (panel.z > _zCount) {
      // make sure next zIndex is on top
      _zCount = panel.z;
    }

    return panel;
  }

  function fixBoxData(box) {
    fixpanelOrBox(box);

    for (let i = 0; i < box.children.length; ++i) {
      let child = box.children[i];
      child.parent = box;

      if ('children' in child) {
        fixBoxData(child);

        if (child.children.length === 0) {
          // remove box with no child
          box.children.splice(i, 1);
          --i;
        } else if (child.children.length === 1) {
          // box with one child should be merged back to parent box
          let subChild = child.children[0];

          if (subChild.mode === box.mode) {
            // sub child is another box that can be merged into current box
            let totalSubSize = 0;

            for (let subsubChild of subChild.children) {
              totalSubSize += subsubChild.size;
            }

            let sizeScale = child.size / totalSubSize;

            for (let subsubChild of subChild.children) {
              subsubChild.size *= sizeScale;
            } // merge children up


            box.children.splice(i, 1, ...subChild.children);
          } else {
            // sub child can be moved up one layer
            subChild.size = child.size;
            box.children[i] = subChild;
          }

          --i;
        }
      } else if ('tabs' in child) {
        fixPanelData(child);

        if (child.tabs.length === 0) {
          // remove panel with no tab
          if (!child.panelLock) {
            box.children.splice(i, 1);
            --i;
          } else if (child.group === DockData_1.placeHolderStyle && (box.children.length > 1 || box.parent)) {
            // remove placeHolder Group
            box.children.splice(i, 1);
            --i;
          }
        }
      } // merge min size


      switch (box.mode) {
        case 'horizontal':
          if (child.minWidth > 0) box.minWidth += child.minWidth;
          if (child.minHeight > box.minHeight) box.minHeight = child.minHeight;
          break;

        case 'vertical':
          if (child.minWidth > box.minWidth) box.minWidth = child.minWidth;
          if (child.minHeight > 0) box.minHeight += child.minHeight;
          break;
      }
    } // add divider size


    if (box.children.length > 1) {
      switch (box.mode) {
        case 'horizontal':
          box.minWidth += (box.children.length - 1) * 4;
          break;

        case 'vertical':
          box.minHeight += (box.children.length - 1) * 4;
          break;
      }
    }

    return box;
  }

  if (layout.floatbox) {
    layout.floatbox.mode = 'float';
  } else {
    layout.floatbox = {
      mode: 'float',
      children: [],
      size: 1
    };
  }

  if (layout.windowbox) {
    layout.windowbox.mode = 'window';
  } else {
    layout.windowbox = {
      mode: 'window',
      children: [],
      size: 1
    };
  }

  if (layout.maxbox) {
    layout.maxbox.mode = 'maximize';
  } else {
    layout.maxbox = {
      mode: 'maximize',
      children: [],
      size: 1
    };
  }

  fixBoxData(layout.dockbox);
  fixBoxData(layout.floatbox);
  fixBoxData(layout.windowbox);
  fixBoxData(layout.maxbox);

  if (layout.dockbox.children.length === 0) {
    // add place holder panel when root box is empty
    let newPanel = {
      id: '+0',
      group: DockData_1.placeHolderStyle,
      panelLock: {},
      size: 200,
      tabs: []
    };
    newPanel.parent = layout.dockbox;
    layout.dockbox.children.push(newPanel);
  } else {
    // merge and replace root box when box has only one child
    while (layout.dockbox.children.length === 1 && 'children' in layout.dockbox.children[0]) {
      let newDockBox = clone(layout.dockbox.children[0]);
      layout.dockbox = newDockBox;

      for (let child of newDockBox.children) {
        child.parent = newDockBox;
      }
    }
  }

  layout.dockbox.parent = null;
  layout.floatbox.parent = null;
  layout.windowbox.parent = null;
  layout.maxbox.parent = null;
  clearObjectCache();
  return layout;
}

exports.fixLayoutData = fixLayoutData;

function replacePanel(layout, panel, newPanel) {
  for (let tab of newPanel.tabs) {
    tab.parent = newPanel;
  }

  let box = panel.parent;

  if (box) {
    let pos = box.children.indexOf(panel);

    if (pos >= 0) {
      let newBox = clone(box);
      newBox.children[pos] = newPanel;
      return replaceBox(layout, box, newBox);
    }
  }

  return layout;
}

function replaceBox(layout, box, newBox) {
  for (let child of newBox.children) {
    child.parent = newBox;
  }

  let parentBox = box.parent;

  if (parentBox) {
    let pos = parentBox.children.indexOf(box);

    if (pos >= 0) {
      let newParentBox = clone(parentBox);
      newParentBox.children[pos] = newBox;
      return replaceBox(layout, parentBox, newParentBox);
    }
  } else {
    if (box.id === layout.dockbox.id || box === layout.dockbox) {
      return Object.assign(Object.assign({}, layout), {
        dockbox: newBox
      });
    } else if (box.id === layout.floatbox.id || box === layout.floatbox) {
      return Object.assign(Object.assign({}, layout), {
        floatbox: newBox
      });
    } else if (box.id === layout.windowbox.id || box === layout.windowbox) {
      return Object.assign(Object.assign({}, layout), {
        windowbox: newBox
      });
    } else if (box.id === layout.maxbox.id || box === layout.maxbox) {
      return Object.assign(Object.assign({}, layout), {
        maxbox: newBox
      });
    }
  }

  return layout;
}

function getFloatPanelSize(panel, tabGroup) {
  if (!panel) {
    return [300, 300];
  }

  let panelWidth = panel.offsetWidth;
  let panelHeight = panel.offsetHeight;
  let [minWidth, maxWidth] = tabGroup.preferredFloatWidth || [100, 600];
  let [minHeight, maxHeight] = tabGroup.preferredFloatHeight || [50, 500];

  if (!(panelWidth >= minWidth)) {
    panelWidth = minWidth;
  } else if (!(panelWidth <= maxWidth)) {
    panelWidth = maxWidth;
  }

  if (!(panelHeight >= minHeight)) {
    panelHeight = minHeight;
  } else if (!(panelHeight <= maxHeight)) {
    panelHeight = maxHeight;
  }

  return [panelWidth, panelHeight];
}

exports.getFloatPanelSize = getFloatPanelSize;

function findNearestPanel(rectFrom, rectTo, direction) {
  let distance = -1;
  let overlap = -1;
  let alignment = 0;

  switch (direction) {
    case 'ArrowUp':
      {
        distance = rectFrom.top - rectTo.bottom + rectFrom.height;
        overlap = Math.min(rectFrom.right, rectTo.right) - Math.max(rectFrom.left, rectTo.left);
        break;
      }

    case 'ArrowDown':
      {
        distance = rectTo.top - rectFrom.bottom + rectFrom.height;
        overlap = Math.min(rectFrom.right, rectTo.right) - Math.max(rectFrom.left, rectTo.left);
        break;
      }

    case 'ArrowLeft':
      {
        distance = rectFrom.left - rectTo.right + rectFrom.width;
        overlap = Math.min(rectFrom.bottom, rectTo.bottom) - Math.max(rectFrom.top, rectTo.top);
        alignment = Math.abs(rectFrom.top - rectTo.top);
        break;
      }

    case 'ArrowRight':
      {
        distance = rectTo.left - rectFrom.right + rectFrom.width;
        overlap = Math.min(rectFrom.bottom, rectTo.bottom) - Math.max(rectFrom.top, rectTo.top);
        alignment = Math.abs(rectFrom.top - rectTo.top);
        break;
      }
  }

  if (distance < 0 || overlap <= 0) {
    return -1;
  }

  return distance * (alignment + 1) - overlap * 0.001;
}

exports.findNearestPanel = findNearestPanel;
},{"./DockData":"zh3I"}],"u9vI":[function(require,module,exports) {
/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */
function isObject(value) {
  var type = typeof value;
  return value != null && (type == 'object' || type == 'function');
}

module.exports = isObject;

},{}],"j3D9":[function(require,module,exports) {
var global = arguments[3];
/** Detect free variable `global` from Node.js. */
var freeGlobal = typeof global == 'object' && global && global.Object === Object && global;

module.exports = freeGlobal;

},{}],"MIhM":[function(require,module,exports) {
var freeGlobal = require('./_freeGlobal');

/** Detect free variable `self`. */
var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root = freeGlobal || freeSelf || Function('return this')();

module.exports = root;

},{"./_freeGlobal":"j3D9"}],"pJf5":[function(require,module,exports) {
var root = require('./_root');

/**
 * Gets the timestamp of the number of milliseconds that have elapsed since
 * the Unix epoch (1 January 1970 00:00:00 UTC).
 *
 * @static
 * @memberOf _
 * @since 2.4.0
 * @category Date
 * @returns {number} Returns the timestamp.
 * @example
 *
 * _.defer(function(stamp) {
 *   console.log(_.now() - stamp);
 * }, _.now());
 * // => Logs the number of milliseconds it took for the deferred invocation.
 */
var now = function() {
  return root.Date.now();
};

module.exports = now;

},{"./_root":"MIhM"}],"x2wq":[function(require,module,exports) {
/** Used to match a single whitespace character. */
var reWhitespace = /\s/;

/**
 * Used by `_.trim` and `_.trimEnd` to get the index of the last non-whitespace
 * character of `string`.
 *
 * @private
 * @param {string} string The string to inspect.
 * @returns {number} Returns the index of the last non-whitespace character.
 */
function trimmedEndIndex(string) {
  var index = string.length;

  while (index-- && reWhitespace.test(string.charAt(index))) {}
  return index;
}

module.exports = trimmedEndIndex;

},{}],"SK01":[function(require,module,exports) {
var trimmedEndIndex = require('./_trimmedEndIndex');

/** Used to match leading whitespace. */
var reTrimStart = /^\s+/;

/**
 * The base implementation of `_.trim`.
 *
 * @private
 * @param {string} string The string to trim.
 * @returns {string} Returns the trimmed string.
 */
function baseTrim(string) {
  return string
    ? string.slice(0, trimmedEndIndex(string) + 1).replace(reTrimStart, '')
    : string;
}

module.exports = baseTrim;

},{"./_trimmedEndIndex":"x2wq"}],"wppe":[function(require,module,exports) {
var root = require('./_root');

/** Built-in value references. */
var Symbol = root.Symbol;

module.exports = Symbol;

},{"./_root":"MIhM"}],"uiOY":[function(require,module,exports) {
var Symbol = require('./_Symbol');

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString = objectProto.toString;

/** Built-in value references. */
var symToStringTag = Symbol ? Symbol.toStringTag : undefined;

/**
 * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the raw `toStringTag`.
 */
function getRawTag(value) {
  var isOwn = hasOwnProperty.call(value, symToStringTag),
      tag = value[symToStringTag];

  try {
    value[symToStringTag] = undefined;
    var unmasked = true;
  } catch (e) {}

  var result = nativeObjectToString.call(value);
  if (unmasked) {
    if (isOwn) {
      value[symToStringTag] = tag;
    } else {
      delete value[symToStringTag];
    }
  }
  return result;
}

module.exports = getRawTag;

},{"./_Symbol":"wppe"}],"lPmd":[function(require,module,exports) {
/** Used for built-in method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString = objectProto.toString;

/**
 * Converts `value` to a string using `Object.prototype.toString`.
 *
 * @private
 * @param {*} value The value to convert.
 * @returns {string} Returns the converted string.
 */
function objectToString(value) {
  return nativeObjectToString.call(value);
}

module.exports = objectToString;

},{}],"e5TX":[function(require,module,exports) {
var Symbol = require('./_Symbol'),
    getRawTag = require('./_getRawTag'),
    objectToString = require('./_objectToString');

/** `Object#toString` result references. */
var nullTag = '[object Null]',
    undefinedTag = '[object Undefined]';

/** Built-in value references. */
var symToStringTag = Symbol ? Symbol.toStringTag : undefined;

/**
 * The base implementation of `getTag` without fallbacks for buggy environments.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
function baseGetTag(value) {
  if (value == null) {
    return value === undefined ? undefinedTag : nullTag;
  }
  return (symToStringTag && symToStringTag in Object(value))
    ? getRawTag(value)
    : objectToString(value);
}

module.exports = baseGetTag;

},{"./_Symbol":"wppe","./_getRawTag":"uiOY","./_objectToString":"lPmd"}],"OuyB":[function(require,module,exports) {
/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return value != null && typeof value == 'object';
}

module.exports = isObjectLike;

},{}],"bgO7":[function(require,module,exports) {
var baseGetTag = require('./_baseGetTag'),
    isObjectLike = require('./isObjectLike');

/** `Object#toString` result references. */
var symbolTag = '[object Symbol]';

/**
 * Checks if `value` is classified as a `Symbol` primitive or object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
 * @example
 *
 * _.isSymbol(Symbol.iterator);
 * // => true
 *
 * _.isSymbol('abc');
 * // => false
 */
function isSymbol(value) {
  return typeof value == 'symbol' ||
    (isObjectLike(value) && baseGetTag(value) == symbolTag);
}

module.exports = isSymbol;

},{"./_baseGetTag":"e5TX","./isObjectLike":"OuyB"}],"iS0Z":[function(require,module,exports) {
var baseTrim = require('./_baseTrim'),
    isObject = require('./isObject'),
    isSymbol = require('./isSymbol');

/** Used as references for various `Number` constants. */
var NAN = 0 / 0;

/** Used to detect bad signed hexadecimal string values. */
var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;

/** Used to detect binary string values. */
var reIsBinary = /^0b[01]+$/i;

/** Used to detect octal string values. */
var reIsOctal = /^0o[0-7]+$/i;

/** Built-in method references without a dependency on `root`. */
var freeParseInt = parseInt;

/**
 * Converts `value` to a number.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to process.
 * @returns {number} Returns the number.
 * @example
 *
 * _.toNumber(3.2);
 * // => 3.2
 *
 * _.toNumber(Number.MIN_VALUE);
 * // => 5e-324
 *
 * _.toNumber(Infinity);
 * // => Infinity
 *
 * _.toNumber('3.2');
 * // => 3.2
 */
function toNumber(value) {
  if (typeof value == 'number') {
    return value;
  }
  if (isSymbol(value)) {
    return NAN;
  }
  if (isObject(value)) {
    var other = typeof value.valueOf == 'function' ? value.valueOf() : value;
    value = isObject(other) ? (other + '') : other;
  }
  if (typeof value != 'string') {
    return value === 0 ? value : +value;
  }
  value = baseTrim(value);
  var isBinary = reIsBinary.test(value);
  return (isBinary || reIsOctal.test(value))
    ? freeParseInt(value.slice(2), isBinary ? 2 : 8)
    : (reIsBadHex.test(value) ? NAN : +value);
}

module.exports = toNumber;

},{"./_baseTrim":"SK01","./isObject":"u9vI","./isSymbol":"bgO7"}],"CXfR":[function(require,module,exports) {
var isObject = require('./isObject'),
    now = require('./now'),
    toNumber = require('./toNumber');

/** Error message constants. */
var FUNC_ERROR_TEXT = 'Expected a function';

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeMax = Math.max,
    nativeMin = Math.min;

/**
 * Creates a debounced function that delays invoking `func` until after `wait`
 * milliseconds have elapsed since the last time the debounced function was
 * invoked. The debounced function comes with a `cancel` method to cancel
 * delayed `func` invocations and a `flush` method to immediately invoke them.
 * Provide `options` to indicate whether `func` should be invoked on the
 * leading and/or trailing edge of the `wait` timeout. The `func` is invoked
 * with the last arguments provided to the debounced function. Subsequent
 * calls to the debounced function return the result of the last `func`
 * invocation.
 *
 * **Note:** If `leading` and `trailing` options are `true`, `func` is
 * invoked on the trailing edge of the timeout only if the debounced function
 * is invoked more than once during the `wait` timeout.
 *
 * If `wait` is `0` and `leading` is `false`, `func` invocation is deferred
 * until to the next tick, similar to `setTimeout` with a timeout of `0`.
 *
 * See [David Corbacho's article](https://css-tricks.com/debouncing-throttling-explained-examples/)
 * for details over the differences between `_.debounce` and `_.throttle`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Function
 * @param {Function} func The function to debounce.
 * @param {number} [wait=0] The number of milliseconds to delay.
 * @param {Object} [options={}] The options object.
 * @param {boolean} [options.leading=false]
 *  Specify invoking on the leading edge of the timeout.
 * @param {number} [options.maxWait]
 *  The maximum time `func` is allowed to be delayed before it's invoked.
 * @param {boolean} [options.trailing=true]
 *  Specify invoking on the trailing edge of the timeout.
 * @returns {Function} Returns the new debounced function.
 * @example
 *
 * // Avoid costly calculations while the window size is in flux.
 * jQuery(window).on('resize', _.debounce(calculateLayout, 150));
 *
 * // Invoke `sendMail` when clicked, debouncing subsequent calls.
 * jQuery(element).on('click', _.debounce(sendMail, 300, {
 *   'leading': true,
 *   'trailing': false
 * }));
 *
 * // Ensure `batchLog` is invoked once after 1 second of debounced calls.
 * var debounced = _.debounce(batchLog, 250, { 'maxWait': 1000 });
 * var source = new EventSource('/stream');
 * jQuery(source).on('message', debounced);
 *
 * // Cancel the trailing debounced invocation.
 * jQuery(window).on('popstate', debounced.cancel);
 */
function debounce(func, wait, options) {
  var lastArgs,
      lastThis,
      maxWait,
      result,
      timerId,
      lastCallTime,
      lastInvokeTime = 0,
      leading = false,
      maxing = false,
      trailing = true;

  if (typeof func != 'function') {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  wait = toNumber(wait) || 0;
  if (isObject(options)) {
    leading = !!options.leading;
    maxing = 'maxWait' in options;
    maxWait = maxing ? nativeMax(toNumber(options.maxWait) || 0, wait) : maxWait;
    trailing = 'trailing' in options ? !!options.trailing : trailing;
  }

  function invokeFunc(time) {
    var args = lastArgs,
        thisArg = lastThis;

    lastArgs = lastThis = undefined;
    lastInvokeTime = time;
    result = func.apply(thisArg, args);
    return result;
  }

  function leadingEdge(time) {
    // Reset any `maxWait` timer.
    lastInvokeTime = time;
    // Start the timer for the trailing edge.
    timerId = setTimeout(timerExpired, wait);
    // Invoke the leading edge.
    return leading ? invokeFunc(time) : result;
  }

  function remainingWait(time) {
    var timeSinceLastCall = time - lastCallTime,
        timeSinceLastInvoke = time - lastInvokeTime,
        timeWaiting = wait - timeSinceLastCall;

    return maxing
      ? nativeMin(timeWaiting, maxWait - timeSinceLastInvoke)
      : timeWaiting;
  }

  function shouldInvoke(time) {
    var timeSinceLastCall = time - lastCallTime,
        timeSinceLastInvoke = time - lastInvokeTime;

    // Either this is the first call, activity has stopped and we're at the
    // trailing edge, the system time has gone backwards and we're treating
    // it as the trailing edge, or we've hit the `maxWait` limit.
    return (lastCallTime === undefined || (timeSinceLastCall >= wait) ||
      (timeSinceLastCall < 0) || (maxing && timeSinceLastInvoke >= maxWait));
  }

  function timerExpired() {
    var time = now();
    if (shouldInvoke(time)) {
      return trailingEdge(time);
    }
    // Restart the timer.
    timerId = setTimeout(timerExpired, remainingWait(time));
  }

  function trailingEdge(time) {
    timerId = undefined;

    // Only invoke if we have `lastArgs` which means `func` has been
    // debounced at least once.
    if (trailing && lastArgs) {
      return invokeFunc(time);
    }
    lastArgs = lastThis = undefined;
    return result;
  }

  function cancel() {
    if (timerId !== undefined) {
      clearTimeout(timerId);
    }
    lastInvokeTime = 0;
    lastArgs = lastCallTime = lastThis = timerId = undefined;
  }

  function flush() {
    return timerId === undefined ? result : trailingEdge(now());
  }

  function debounced() {
    var time = now(),
        isInvoking = shouldInvoke(time);

    lastArgs = arguments;
    lastThis = this;
    lastCallTime = time;

    if (isInvoking) {
      if (timerId === undefined) {
        return leadingEdge(lastCallTime);
      }
      if (maxing) {
        // Handle invocations in a tight loop.
        clearTimeout(timerId);
        timerId = setTimeout(timerExpired, wait);
        return invokeFunc(lastCallTime);
      }
    }
    if (timerId === undefined) {
      timerId = setTimeout(timerExpired, wait);
    }
    return result;
  }
  debounced.cancel = cancel;
  debounced.flush = flush;
  return debounced;
}

module.exports = debounce;

},{"./isObject":"u9vI","./now":"pJf5","./toNumber":"iS0Z"}],"fIh9":[function(require,module,exports) {
var define;
!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports.bowser=t():e.bowser=t()}(this,(function(){return function(e){var t={};function r(n){if(t[n])return t[n].exports;var i=t[n]={i:n,l:!1,exports:{}};return e[n].call(i.exports,i,i.exports,r),i.l=!0,i.exports}return r.m=e,r.c=t,r.d=function(e,t,n){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var i in e)r.d(n,i,function(t){return e[t]}.bind(null,i));return n},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="",r(r.s=90)}({17:function(e,t,r){"use strict";t.__esModule=!0,t.default=void 0;var n=r(18),i=function(){function e(){}return e.getFirstMatch=function(e,t){var r=t.match(e);return r&&r.length>0&&r[1]||""},e.getSecondMatch=function(e,t){var r=t.match(e);return r&&r.length>1&&r[2]||""},e.matchAndReturnConst=function(e,t,r){if(e.test(t))return r},e.getWindowsVersionName=function(e){switch(e){case"NT":return"NT";case"XP":return"XP";case"NT 5.0":return"2000";case"NT 5.1":return"XP";case"NT 5.2":return"2003";case"NT 6.0":return"Vista";case"NT 6.1":return"7";case"NT 6.2":return"8";case"NT 6.3":return"8.1";case"NT 10.0":return"10";default:return}},e.getMacOSVersionName=function(e){var t=e.split(".").splice(0,2).map((function(e){return parseInt(e,10)||0}));if(t.push(0),10===t[0])switch(t[1]){case 5:return"Leopard";case 6:return"Snow Leopard";case 7:return"Lion";case 8:return"Mountain Lion";case 9:return"Mavericks";case 10:return"Yosemite";case 11:return"El Capitan";case 12:return"Sierra";case 13:return"High Sierra";case 14:return"Mojave";case 15:return"Catalina";default:return}},e.getAndroidVersionName=function(e){var t=e.split(".").splice(0,2).map((function(e){return parseInt(e,10)||0}));if(t.push(0),!(1===t[0]&&t[1]<5))return 1===t[0]&&t[1]<6?"Cupcake":1===t[0]&&t[1]>=6?"Donut":2===t[0]&&t[1]<2?"Eclair":2===t[0]&&2===t[1]?"Froyo":2===t[0]&&t[1]>2?"Gingerbread":3===t[0]?"Honeycomb":4===t[0]&&t[1]<1?"Ice Cream Sandwich":4===t[0]&&t[1]<4?"Jelly Bean":4===t[0]&&t[1]>=4?"KitKat":5===t[0]?"Lollipop":6===t[0]?"Marshmallow":7===t[0]?"Nougat":8===t[0]?"Oreo":9===t[0]?"Pie":void 0},e.getVersionPrecision=function(e){return e.split(".").length},e.compareVersions=function(t,r,n){void 0===n&&(n=!1);var i=e.getVersionPrecision(t),s=e.getVersionPrecision(r),a=Math.max(i,s),o=0,u=e.map([t,r],(function(t){var r=a-e.getVersionPrecision(t),n=t+new Array(r+1).join(".0");return e.map(n.split("."),(function(e){return new Array(20-e.length).join("0")+e})).reverse()}));for(n&&(o=a-Math.min(i,s)),a-=1;a>=o;){if(u[0][a]>u[1][a])return 1;if(u[0][a]===u[1][a]){if(a===o)return 0;a-=1}else if(u[0][a]<u[1][a])return-1}},e.map=function(e,t){var r,n=[];if(Array.prototype.map)return Array.prototype.map.call(e,t);for(r=0;r<e.length;r+=1)n.push(t(e[r]));return n},e.find=function(e,t){var r,n;if(Array.prototype.find)return Array.prototype.find.call(e,t);for(r=0,n=e.length;r<n;r+=1){var i=e[r];if(t(i,r))return i}},e.assign=function(e){for(var t,r,n=e,i=arguments.length,s=new Array(i>1?i-1:0),a=1;a<i;a++)s[a-1]=arguments[a];if(Object.assign)return Object.assign.apply(Object,[e].concat(s));var o=function(){var e=s[t];"object"==typeof e&&null!==e&&Object.keys(e).forEach((function(t){n[t]=e[t]}))};for(t=0,r=s.length;t<r;t+=1)o();return e},e.getBrowserAlias=function(e){return n.BROWSER_ALIASES_MAP[e]},e.getBrowserTypeByAlias=function(e){return n.BROWSER_MAP[e]||""},e}();t.default=i,e.exports=t.default},18:function(e,t,r){"use strict";t.__esModule=!0,t.ENGINE_MAP=t.OS_MAP=t.PLATFORMS_MAP=t.BROWSER_MAP=t.BROWSER_ALIASES_MAP=void 0;t.BROWSER_ALIASES_MAP={"Amazon Silk":"amazon_silk","Android Browser":"android",Bada:"bada",BlackBerry:"blackberry",Chrome:"chrome",Chromium:"chromium",Electron:"electron",Epiphany:"epiphany",Firefox:"firefox",Focus:"focus",Generic:"generic","Google Search":"google_search",Googlebot:"googlebot","Internet Explorer":"ie","K-Meleon":"k_meleon",Maxthon:"maxthon","Microsoft Edge":"edge","MZ Browser":"mz","NAVER Whale Browser":"naver",Opera:"opera","Opera Coast":"opera_coast",PhantomJS:"phantomjs",Puffin:"puffin",QupZilla:"qupzilla",QQ:"qq",QQLite:"qqlite",Safari:"safari",Sailfish:"sailfish","Samsung Internet for Android":"samsung_internet",SeaMonkey:"seamonkey",Sleipnir:"sleipnir",Swing:"swing",Tizen:"tizen","UC Browser":"uc",Vivaldi:"vivaldi","WebOS Browser":"webos",WeChat:"wechat","Yandex Browser":"yandex",Roku:"roku"};t.BROWSER_MAP={amazon_silk:"Amazon Silk",android:"Android Browser",bada:"Bada",blackberry:"BlackBerry",chrome:"Chrome",chromium:"Chromium",electron:"Electron",epiphany:"Epiphany",firefox:"Firefox",focus:"Focus",generic:"Generic",googlebot:"Googlebot",google_search:"Google Search",ie:"Internet Explorer",k_meleon:"K-Meleon",maxthon:"Maxthon",edge:"Microsoft Edge",mz:"MZ Browser",naver:"NAVER Whale Browser",opera:"Opera",opera_coast:"Opera Coast",phantomjs:"PhantomJS",puffin:"Puffin",qupzilla:"QupZilla",qq:"QQ Browser",qqlite:"QQ Browser Lite",safari:"Safari",sailfish:"Sailfish",samsung_internet:"Samsung Internet for Android",seamonkey:"SeaMonkey",sleipnir:"Sleipnir",swing:"Swing",tizen:"Tizen",uc:"UC Browser",vivaldi:"Vivaldi",webos:"WebOS Browser",wechat:"WeChat",yandex:"Yandex Browser"};t.PLATFORMS_MAP={tablet:"tablet",mobile:"mobile",desktop:"desktop",tv:"tv"};t.OS_MAP={WindowsPhone:"Windows Phone",Windows:"Windows",MacOS:"macOS",iOS:"iOS",Android:"Android",WebOS:"WebOS",BlackBerry:"BlackBerry",Bada:"Bada",Tizen:"Tizen",Linux:"Linux",ChromeOS:"Chrome OS",PlayStation4:"PlayStation 4",Roku:"Roku"};t.ENGINE_MAP={EdgeHTML:"EdgeHTML",Blink:"Blink",Trident:"Trident",Presto:"Presto",Gecko:"Gecko",WebKit:"WebKit"}},90:function(e,t,r){"use strict";t.__esModule=!0,t.default=void 0;var n,i=(n=r(91))&&n.__esModule?n:{default:n},s=r(18);function a(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}var o=function(){function e(){}var t,r,n;return e.getParser=function(e,t){if(void 0===t&&(t=!1),"string"!=typeof e)throw new Error("UserAgent should be a string");return new i.default(e,t)},e.parse=function(e){return new i.default(e).getResult()},t=e,n=[{key:"BROWSER_MAP",get:function(){return s.BROWSER_MAP}},{key:"ENGINE_MAP",get:function(){return s.ENGINE_MAP}},{key:"OS_MAP",get:function(){return s.OS_MAP}},{key:"PLATFORMS_MAP",get:function(){return s.PLATFORMS_MAP}}],(r=null)&&a(t.prototype,r),n&&a(t,n),e}();t.default=o,e.exports=t.default},91:function(e,t,r){"use strict";t.__esModule=!0,t.default=void 0;var n=u(r(92)),i=u(r(93)),s=u(r(94)),a=u(r(95)),o=u(r(17));function u(e){return e&&e.__esModule?e:{default:e}}var d=function(){function e(e,t){if(void 0===t&&(t=!1),null==e||""===e)throw new Error("UserAgent parameter can't be empty");this._ua=e,this.parsedResult={},!0!==t&&this.parse()}var t=e.prototype;return t.getUA=function(){return this._ua},t.test=function(e){return e.test(this._ua)},t.parseBrowser=function(){var e=this;this.parsedResult.browser={};var t=o.default.find(n.default,(function(t){if("function"==typeof t.test)return t.test(e);if(t.test instanceof Array)return t.test.some((function(t){return e.test(t)}));throw new Error("Browser's test function is not valid")}));return t&&(this.parsedResult.browser=t.describe(this.getUA())),this.parsedResult.browser},t.getBrowser=function(){return this.parsedResult.browser?this.parsedResult.browser:this.parseBrowser()},t.getBrowserName=function(e){return e?String(this.getBrowser().name).toLowerCase()||"":this.getBrowser().name||""},t.getBrowserVersion=function(){return this.getBrowser().version},t.getOS=function(){return this.parsedResult.os?this.parsedResult.os:this.parseOS()},t.parseOS=function(){var e=this;this.parsedResult.os={};var t=o.default.find(i.default,(function(t){if("function"==typeof t.test)return t.test(e);if(t.test instanceof Array)return t.test.some((function(t){return e.test(t)}));throw new Error("Browser's test function is not valid")}));return t&&(this.parsedResult.os=t.describe(this.getUA())),this.parsedResult.os},t.getOSName=function(e){var t=this.getOS().name;return e?String(t).toLowerCase()||"":t||""},t.getOSVersion=function(){return this.getOS().version},t.getPlatform=function(){return this.parsedResult.platform?this.parsedResult.platform:this.parsePlatform()},t.getPlatformType=function(e){void 0===e&&(e=!1);var t=this.getPlatform().type;return e?String(t).toLowerCase()||"":t||""},t.parsePlatform=function(){var e=this;this.parsedResult.platform={};var t=o.default.find(s.default,(function(t){if("function"==typeof t.test)return t.test(e);if(t.test instanceof Array)return t.test.some((function(t){return e.test(t)}));throw new Error("Browser's test function is not valid")}));return t&&(this.parsedResult.platform=t.describe(this.getUA())),this.parsedResult.platform},t.getEngine=function(){return this.parsedResult.engine?this.parsedResult.engine:this.parseEngine()},t.getEngineName=function(e){return e?String(this.getEngine().name).toLowerCase()||"":this.getEngine().name||""},t.parseEngine=function(){var e=this;this.parsedResult.engine={};var t=o.default.find(a.default,(function(t){if("function"==typeof t.test)return t.test(e);if(t.test instanceof Array)return t.test.some((function(t){return e.test(t)}));throw new Error("Browser's test function is not valid")}));return t&&(this.parsedResult.engine=t.describe(this.getUA())),this.parsedResult.engine},t.parse=function(){return this.parseBrowser(),this.parseOS(),this.parsePlatform(),this.parseEngine(),this},t.getResult=function(){return o.default.assign({},this.parsedResult)},t.satisfies=function(e){var t=this,r={},n=0,i={},s=0;if(Object.keys(e).forEach((function(t){var a=e[t];"string"==typeof a?(i[t]=a,s+=1):"object"==typeof a&&(r[t]=a,n+=1)})),n>0){var a=Object.keys(r),u=o.default.find(a,(function(e){return t.isOS(e)}));if(u){var d=this.satisfies(r[u]);if(void 0!==d)return d}var c=o.default.find(a,(function(e){return t.isPlatform(e)}));if(c){var f=this.satisfies(r[c]);if(void 0!==f)return f}}if(s>0){var l=Object.keys(i),h=o.default.find(l,(function(e){return t.isBrowser(e,!0)}));if(void 0!==h)return this.compareVersion(i[h])}},t.isBrowser=function(e,t){void 0===t&&(t=!1);var r=this.getBrowserName().toLowerCase(),n=e.toLowerCase(),i=o.default.getBrowserTypeByAlias(n);return t&&i&&(n=i.toLowerCase()),n===r},t.compareVersion=function(e){var t=[0],r=e,n=!1,i=this.getBrowserVersion();if("string"==typeof i)return">"===e[0]||"<"===e[0]?(r=e.substr(1),"="===e[1]?(n=!0,r=e.substr(2)):t=[],">"===e[0]?t.push(1):t.push(-1)):"="===e[0]?r=e.substr(1):"~"===e[0]&&(n=!0,r=e.substr(1)),t.indexOf(o.default.compareVersions(i,r,n))>-1},t.isOS=function(e){return this.getOSName(!0)===String(e).toLowerCase()},t.isPlatform=function(e){return this.getPlatformType(!0)===String(e).toLowerCase()},t.isEngine=function(e){return this.getEngineName(!0)===String(e).toLowerCase()},t.is=function(e,t){return void 0===t&&(t=!1),this.isBrowser(e,t)||this.isOS(e)||this.isPlatform(e)},t.some=function(e){var t=this;return void 0===e&&(e=[]),e.some((function(e){return t.is(e)}))},e}();t.default=d,e.exports=t.default},92:function(e,t,r){"use strict";t.__esModule=!0,t.default=void 0;var n,i=(n=r(17))&&n.__esModule?n:{default:n};var s=/version\/(\d+(\.?_?\d+)+)/i,a=[{test:[/googlebot/i],describe:function(e){var t={name:"Googlebot"},r=i.default.getFirstMatch(/googlebot\/(\d+(\.\d+))/i,e)||i.default.getFirstMatch(s,e);return r&&(t.version=r),t}},{test:[/opera/i],describe:function(e){var t={name:"Opera"},r=i.default.getFirstMatch(s,e)||i.default.getFirstMatch(/(?:opera)[\s/](\d+(\.?_?\d+)+)/i,e);return r&&(t.version=r),t}},{test:[/opr\/|opios/i],describe:function(e){var t={name:"Opera"},r=i.default.getFirstMatch(/(?:opr|opios)[\s/](\S+)/i,e)||i.default.getFirstMatch(s,e);return r&&(t.version=r),t}},{test:[/SamsungBrowser/i],describe:function(e){var t={name:"Samsung Internet for Android"},r=i.default.getFirstMatch(s,e)||i.default.getFirstMatch(/(?:SamsungBrowser)[\s/](\d+(\.?_?\d+)+)/i,e);return r&&(t.version=r),t}},{test:[/Whale/i],describe:function(e){var t={name:"NAVER Whale Browser"},r=i.default.getFirstMatch(s,e)||i.default.getFirstMatch(/(?:whale)[\s/](\d+(?:\.\d+)+)/i,e);return r&&(t.version=r),t}},{test:[/MZBrowser/i],describe:function(e){var t={name:"MZ Browser"},r=i.default.getFirstMatch(/(?:MZBrowser)[\s/](\d+(?:\.\d+)+)/i,e)||i.default.getFirstMatch(s,e);return r&&(t.version=r),t}},{test:[/focus/i],describe:function(e){var t={name:"Focus"},r=i.default.getFirstMatch(/(?:focus)[\s/](\d+(?:\.\d+)+)/i,e)||i.default.getFirstMatch(s,e);return r&&(t.version=r),t}},{test:[/swing/i],describe:function(e){var t={name:"Swing"},r=i.default.getFirstMatch(/(?:swing)[\s/](\d+(?:\.\d+)+)/i,e)||i.default.getFirstMatch(s,e);return r&&(t.version=r),t}},{test:[/coast/i],describe:function(e){var t={name:"Opera Coast"},r=i.default.getFirstMatch(s,e)||i.default.getFirstMatch(/(?:coast)[\s/](\d+(\.?_?\d+)+)/i,e);return r&&(t.version=r),t}},{test:[/opt\/\d+(?:.?_?\d+)+/i],describe:function(e){var t={name:"Opera Touch"},r=i.default.getFirstMatch(/(?:opt)[\s/](\d+(\.?_?\d+)+)/i,e)||i.default.getFirstMatch(s,e);return r&&(t.version=r),t}},{test:[/yabrowser/i],describe:function(e){var t={name:"Yandex Browser"},r=i.default.getFirstMatch(/(?:yabrowser)[\s/](\d+(\.?_?\d+)+)/i,e)||i.default.getFirstMatch(s,e);return r&&(t.version=r),t}},{test:[/ucbrowser/i],describe:function(e){var t={name:"UC Browser"},r=i.default.getFirstMatch(s,e)||i.default.getFirstMatch(/(?:ucbrowser)[\s/](\d+(\.?_?\d+)+)/i,e);return r&&(t.version=r),t}},{test:[/Maxthon|mxios/i],describe:function(e){var t={name:"Maxthon"},r=i.default.getFirstMatch(s,e)||i.default.getFirstMatch(/(?:Maxthon|mxios)[\s/](\d+(\.?_?\d+)+)/i,e);return r&&(t.version=r),t}},{test:[/epiphany/i],describe:function(e){var t={name:"Epiphany"},r=i.default.getFirstMatch(s,e)||i.default.getFirstMatch(/(?:epiphany)[\s/](\d+(\.?_?\d+)+)/i,e);return r&&(t.version=r),t}},{test:[/puffin/i],describe:function(e){var t={name:"Puffin"},r=i.default.getFirstMatch(s,e)||i.default.getFirstMatch(/(?:puffin)[\s/](\d+(\.?_?\d+)+)/i,e);return r&&(t.version=r),t}},{test:[/sleipnir/i],describe:function(e){var t={name:"Sleipnir"},r=i.default.getFirstMatch(s,e)||i.default.getFirstMatch(/(?:sleipnir)[\s/](\d+(\.?_?\d+)+)/i,e);return r&&(t.version=r),t}},{test:[/k-meleon/i],describe:function(e){var t={name:"K-Meleon"},r=i.default.getFirstMatch(s,e)||i.default.getFirstMatch(/(?:k-meleon)[\s/](\d+(\.?_?\d+)+)/i,e);return r&&(t.version=r),t}},{test:[/micromessenger/i],describe:function(e){var t={name:"WeChat"},r=i.default.getFirstMatch(/(?:micromessenger)[\s/](\d+(\.?_?\d+)+)/i,e)||i.default.getFirstMatch(s,e);return r&&(t.version=r),t}},{test:[/qqbrowser/i],describe:function(e){var t={name:/qqbrowserlite/i.test(e)?"QQ Browser Lite":"QQ Browser"},r=i.default.getFirstMatch(/(?:qqbrowserlite|qqbrowser)[/](\d+(\.?_?\d+)+)/i,e)||i.default.getFirstMatch(s,e);return r&&(t.version=r),t}},{test:[/msie|trident/i],describe:function(e){var t={name:"Internet Explorer"},r=i.default.getFirstMatch(/(?:msie |rv:)(\d+(\.?_?\d+)+)/i,e);return r&&(t.version=r),t}},{test:[/\sedg\//i],describe:function(e){var t={name:"Microsoft Edge"},r=i.default.getFirstMatch(/\sedg\/(\d+(\.?_?\d+)+)/i,e);return r&&(t.version=r),t}},{test:[/edg([ea]|ios)/i],describe:function(e){var t={name:"Microsoft Edge"},r=i.default.getSecondMatch(/edg([ea]|ios)\/(\d+(\.?_?\d+)+)/i,e);return r&&(t.version=r),t}},{test:[/vivaldi/i],describe:function(e){var t={name:"Vivaldi"},r=i.default.getFirstMatch(/vivaldi\/(\d+(\.?_?\d+)+)/i,e);return r&&(t.version=r),t}},{test:[/seamonkey/i],describe:function(e){var t={name:"SeaMonkey"},r=i.default.getFirstMatch(/seamonkey\/(\d+(\.?_?\d+)+)/i,e);return r&&(t.version=r),t}},{test:[/sailfish/i],describe:function(e){var t={name:"Sailfish"},r=i.default.getFirstMatch(/sailfish\s?browser\/(\d+(\.\d+)?)/i,e);return r&&(t.version=r),t}},{test:[/silk/i],describe:function(e){var t={name:"Amazon Silk"},r=i.default.getFirstMatch(/silk\/(\d+(\.?_?\d+)+)/i,e);return r&&(t.version=r),t}},{test:[/phantom/i],describe:function(e){var t={name:"PhantomJS"},r=i.default.getFirstMatch(/phantomjs\/(\d+(\.?_?\d+)+)/i,e);return r&&(t.version=r),t}},{test:[/slimerjs/i],describe:function(e){var t={name:"SlimerJS"},r=i.default.getFirstMatch(/slimerjs\/(\d+(\.?_?\d+)+)/i,e);return r&&(t.version=r),t}},{test:[/blackberry|\bbb\d+/i,/rim\stablet/i],describe:function(e){var t={name:"BlackBerry"},r=i.default.getFirstMatch(s,e)||i.default.getFirstMatch(/blackberry[\d]+\/(\d+(\.?_?\d+)+)/i,e);return r&&(t.version=r),t}},{test:[/(web|hpw)[o0]s/i],describe:function(e){var t={name:"WebOS Browser"},r=i.default.getFirstMatch(s,e)||i.default.getFirstMatch(/w(?:eb)?[o0]sbrowser\/(\d+(\.?_?\d+)+)/i,e);return r&&(t.version=r),t}},{test:[/bada/i],describe:function(e){var t={name:"Bada"},r=i.default.getFirstMatch(/dolfin\/(\d+(\.?_?\d+)+)/i,e);return r&&(t.version=r),t}},{test:[/tizen/i],describe:function(e){var t={name:"Tizen"},r=i.default.getFirstMatch(/(?:tizen\s?)?browser\/(\d+(\.?_?\d+)+)/i,e)||i.default.getFirstMatch(s,e);return r&&(t.version=r),t}},{test:[/qupzilla/i],describe:function(e){var t={name:"QupZilla"},r=i.default.getFirstMatch(/(?:qupzilla)[\s/](\d+(\.?_?\d+)+)/i,e)||i.default.getFirstMatch(s,e);return r&&(t.version=r),t}},{test:[/firefox|iceweasel|fxios/i],describe:function(e){var t={name:"Firefox"},r=i.default.getFirstMatch(/(?:firefox|iceweasel|fxios)[\s/](\d+(\.?_?\d+)+)/i,e);return r&&(t.version=r),t}},{test:[/electron/i],describe:function(e){var t={name:"Electron"},r=i.default.getFirstMatch(/(?:electron)\/(\d+(\.?_?\d+)+)/i,e);return r&&(t.version=r),t}},{test:[/MiuiBrowser/i],describe:function(e){var t={name:"Miui"},r=i.default.getFirstMatch(/(?:MiuiBrowser)[\s/](\d+(\.?_?\d+)+)/i,e);return r&&(t.version=r),t}},{test:[/chromium/i],describe:function(e){var t={name:"Chromium"},r=i.default.getFirstMatch(/(?:chromium)[\s/](\d+(\.?_?\d+)+)/i,e)||i.default.getFirstMatch(s,e);return r&&(t.version=r),t}},{test:[/chrome|crios|crmo/i],describe:function(e){var t={name:"Chrome"},r=i.default.getFirstMatch(/(?:chrome|crios|crmo)\/(\d+(\.?_?\d+)+)/i,e);return r&&(t.version=r),t}},{test:[/GSA/i],describe:function(e){var t={name:"Google Search"},r=i.default.getFirstMatch(/(?:GSA)\/(\d+(\.?_?\d+)+)/i,e);return r&&(t.version=r),t}},{test:function(e){var t=!e.test(/like android/i),r=e.test(/android/i);return t&&r},describe:function(e){var t={name:"Android Browser"},r=i.default.getFirstMatch(s,e);return r&&(t.version=r),t}},{test:[/playstation 4/i],describe:function(e){var t={name:"PlayStation 4"},r=i.default.getFirstMatch(s,e);return r&&(t.version=r),t}},{test:[/safari|applewebkit/i],describe:function(e){var t={name:"Safari"},r=i.default.getFirstMatch(s,e);return r&&(t.version=r),t}},{test:[/.*/i],describe:function(e){var t=-1!==e.search("\\(")?/^(.*)\/(.*)[ \t]\((.*)/:/^(.*)\/(.*) /;return{name:i.default.getFirstMatch(t,e),version:i.default.getSecondMatch(t,e)}}}];t.default=a,e.exports=t.default},93:function(e,t,r){"use strict";t.__esModule=!0,t.default=void 0;var n,i=(n=r(17))&&n.__esModule?n:{default:n},s=r(18);var a=[{test:[/Roku\/DVP/],describe:function(e){var t=i.default.getFirstMatch(/Roku\/DVP-(\d+\.\d+)/i,e);return{name:s.OS_MAP.Roku,version:t}}},{test:[/windows phone/i],describe:function(e){var t=i.default.getFirstMatch(/windows phone (?:os)?\s?(\d+(\.\d+)*)/i,e);return{name:s.OS_MAP.WindowsPhone,version:t}}},{test:[/windows /i],describe:function(e){var t=i.default.getFirstMatch(/Windows ((NT|XP)( \d\d?.\d)?)/i,e),r=i.default.getWindowsVersionName(t);return{name:s.OS_MAP.Windows,version:t,versionName:r}}},{test:[/Macintosh(.*?) FxiOS(.*?)\//],describe:function(e){var t={name:s.OS_MAP.iOS},r=i.default.getSecondMatch(/(Version\/)(\d[\d.]+)/,e);return r&&(t.version=r),t}},{test:[/macintosh/i],describe:function(e){var t=i.default.getFirstMatch(/mac os x (\d+(\.?_?\d+)+)/i,e).replace(/[_\s]/g,"."),r=i.default.getMacOSVersionName(t),n={name:s.OS_MAP.MacOS,version:t};return r&&(n.versionName=r),n}},{test:[/(ipod|iphone|ipad)/i],describe:function(e){var t=i.default.getFirstMatch(/os (\d+([_\s]\d+)*) like mac os x/i,e).replace(/[_\s]/g,".");return{name:s.OS_MAP.iOS,version:t}}},{test:function(e){var t=!e.test(/like android/i),r=e.test(/android/i);return t&&r},describe:function(e){var t=i.default.getFirstMatch(/android[\s/-](\d+(\.\d+)*)/i,e),r=i.default.getAndroidVersionName(t),n={name:s.OS_MAP.Android,version:t};return r&&(n.versionName=r),n}},{test:[/(web|hpw)[o0]s/i],describe:function(e){var t=i.default.getFirstMatch(/(?:web|hpw)[o0]s\/(\d+(\.\d+)*)/i,e),r={name:s.OS_MAP.WebOS};return t&&t.length&&(r.version=t),r}},{test:[/blackberry|\bbb\d+/i,/rim\stablet/i],describe:function(e){var t=i.default.getFirstMatch(/rim\stablet\sos\s(\d+(\.\d+)*)/i,e)||i.default.getFirstMatch(/blackberry\d+\/(\d+([_\s]\d+)*)/i,e)||i.default.getFirstMatch(/\bbb(\d+)/i,e);return{name:s.OS_MAP.BlackBerry,version:t}}},{test:[/bada/i],describe:function(e){var t=i.default.getFirstMatch(/bada\/(\d+(\.\d+)*)/i,e);return{name:s.OS_MAP.Bada,version:t}}},{test:[/tizen/i],describe:function(e){var t=i.default.getFirstMatch(/tizen[/\s](\d+(\.\d+)*)/i,e);return{name:s.OS_MAP.Tizen,version:t}}},{test:[/linux/i],describe:function(){return{name:s.OS_MAP.Linux}}},{test:[/CrOS/],describe:function(){return{name:s.OS_MAP.ChromeOS}}},{test:[/PlayStation 4/],describe:function(e){var t=i.default.getFirstMatch(/PlayStation 4[/\s](\d+(\.\d+)*)/i,e);return{name:s.OS_MAP.PlayStation4,version:t}}}];t.default=a,e.exports=t.default},94:function(e,t,r){"use strict";t.__esModule=!0,t.default=void 0;var n,i=(n=r(17))&&n.__esModule?n:{default:n},s=r(18);var a=[{test:[/googlebot/i],describe:function(){return{type:"bot",vendor:"Google"}}},{test:[/huawei/i],describe:function(e){var t=i.default.getFirstMatch(/(can-l01)/i,e)&&"Nova",r={type:s.PLATFORMS_MAP.mobile,vendor:"Huawei"};return t&&(r.model=t),r}},{test:[/nexus\s*(?:7|8|9|10).*/i],describe:function(){return{type:s.PLATFORMS_MAP.tablet,vendor:"Nexus"}}},{test:[/ipad/i],describe:function(){return{type:s.PLATFORMS_MAP.tablet,vendor:"Apple",model:"iPad"}}},{test:[/Macintosh(.*?) FxiOS(.*?)\//],describe:function(){return{type:s.PLATFORMS_MAP.tablet,vendor:"Apple",model:"iPad"}}},{test:[/kftt build/i],describe:function(){return{type:s.PLATFORMS_MAP.tablet,vendor:"Amazon",model:"Kindle Fire HD 7"}}},{test:[/silk/i],describe:function(){return{type:s.PLATFORMS_MAP.tablet,vendor:"Amazon"}}},{test:[/tablet(?! pc)/i],describe:function(){return{type:s.PLATFORMS_MAP.tablet}}},{test:function(e){var t=e.test(/ipod|iphone/i),r=e.test(/like (ipod|iphone)/i);return t&&!r},describe:function(e){var t=i.default.getFirstMatch(/(ipod|iphone)/i,e);return{type:s.PLATFORMS_MAP.mobile,vendor:"Apple",model:t}}},{test:[/nexus\s*[0-6].*/i,/galaxy nexus/i],describe:function(){return{type:s.PLATFORMS_MAP.mobile,vendor:"Nexus"}}},{test:[/[^-]mobi/i],describe:function(){return{type:s.PLATFORMS_MAP.mobile}}},{test:function(e){return"blackberry"===e.getBrowserName(!0)},describe:function(){return{type:s.PLATFORMS_MAP.mobile,vendor:"BlackBerry"}}},{test:function(e){return"bada"===e.getBrowserName(!0)},describe:function(){return{type:s.PLATFORMS_MAP.mobile}}},{test:function(e){return"windows phone"===e.getBrowserName()},describe:function(){return{type:s.PLATFORMS_MAP.mobile,vendor:"Microsoft"}}},{test:function(e){var t=Number(String(e.getOSVersion()).split(".")[0]);return"android"===e.getOSName(!0)&&t>=3},describe:function(){return{type:s.PLATFORMS_MAP.tablet}}},{test:function(e){return"android"===e.getOSName(!0)},describe:function(){return{type:s.PLATFORMS_MAP.mobile}}},{test:function(e){return"macos"===e.getOSName(!0)},describe:function(){return{type:s.PLATFORMS_MAP.desktop,vendor:"Apple"}}},{test:function(e){return"windows"===e.getOSName(!0)},describe:function(){return{type:s.PLATFORMS_MAP.desktop}}},{test:function(e){return"linux"===e.getOSName(!0)},describe:function(){return{type:s.PLATFORMS_MAP.desktop}}},{test:function(e){return"playstation 4"===e.getOSName(!0)},describe:function(){return{type:s.PLATFORMS_MAP.tv}}},{test:function(e){return"roku"===e.getOSName(!0)},describe:function(){return{type:s.PLATFORMS_MAP.tv}}}];t.default=a,e.exports=t.default},95:function(e,t,r){"use strict";t.__esModule=!0,t.default=void 0;var n,i=(n=r(17))&&n.__esModule?n:{default:n},s=r(18);var a=[{test:function(e){return"microsoft edge"===e.getBrowserName(!0)},describe:function(e){if(/\sedg\//i.test(e))return{name:s.ENGINE_MAP.Blink};var t=i.default.getFirstMatch(/edge\/(\d+(\.?_?\d+)+)/i,e);return{name:s.ENGINE_MAP.EdgeHTML,version:t}}},{test:[/trident/i],describe:function(e){var t={name:s.ENGINE_MAP.Trident},r=i.default.getFirstMatch(/trident\/(\d+(\.?_?\d+)+)/i,e);return r&&(t.version=r),t}},{test:function(e){return e.test(/presto/i)},describe:function(e){var t={name:s.ENGINE_MAP.Presto},r=i.default.getFirstMatch(/presto\/(\d+(\.?_?\d+)+)/i,e);return r&&(t.version=r),t}},{test:function(e){var t=e.test(/gecko/i),r=e.test(/like gecko/i);return t&&!r},describe:function(e){var t={name:s.ENGINE_MAP.Gecko},r=i.default.getFirstMatch(/gecko\/(\d+(\.?_?\d+)+)/i,e);return r&&(t.version=r),t}},{test:[/(apple)?webkit\/537\.36/i],describe:function(){return{name:s.ENGINE_MAP.Blink}}},{test:[/(apple)?webkit/i],describe:function(e){var t={name:s.ENGINE_MAP.WebKit},r=i.default.getFirstMatch(/webkit\/(\d+(\.?_?\d+)+)/i,e);return r&&(t.version=r),t}}];t.default=a,e.exports=t.default}})}));
},{}],"iRst":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.gerWindowBorder = gerWindowBorder;
exports.popupWindowBorder = exports.popupSupported = exports.isSafari = void 0;

var _bowser = _interopRequireDefault(require("bowser"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const browser = _bowser.default.getParser(window.navigator.userAgent);

function gerWindowBorder() {
  switch (browser.getOSName(true)) {
    case 'windows':
      {
        let result;

        switch (browser.getBrowserName(true)) {
          case 'firefox':
            result = [68, 8, 8];
            break;

          case 'microsoft edge':
            result = [62, 8, 8];
            break;
          //case 'chrome':

          default:
            result = [60, 8, 8];
        }

        if (window.devicePixelRatio > 1) {
          result[0] -= 2;
          result[1] -= 1;
          result[2] -= 1;
        }

        return result;
      }

    case 'macos':
      {
        switch (browser.getBrowserName(true)) {
          case 'safari':
            return [22, 0, 0];

          case 'firefox':
            return [59, 0, 0];
          //case 'chrome':

          default:
            return [51, 0, 0];
        }
      }
  }

  return [60, 8, 8];
}

const isSafari = browser.getBrowserName(true) === 'safari';
exports.isSafari = isSafari;
const popupSupported = browser.getPlatformType() === 'desktop';
exports.popupSupported = popupSupported;
const popupWindowBorder = gerWindowBorder();
exports.popupWindowBorder = popupWindowBorder;
},{"bowser":"fIh9"}],"K3Y8":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactDom = _interopRequireDefault(require("react-dom"));

var _debounce = _interopRequireDefault(require("lodash/debounce"));

var _BrowserPopupWindow = require("./BrowserPopupWindow");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const onNewWindowResize = (0, _debounce.default)(() => {
  // add/remove element on main document, force it to dispatch resize observer event on the popup window
  let div = document.createElement('div');
  document.body.append(div);
  div.remove(); // TODO update resize event
}, 200);
/**
 * The NewWindow class object.
 * @public
 */

class NewWindow extends _react.default.PureComponent {
  /**
   * The NewWindow function constructor.
   * @param {Object} props
   */
  constructor(props) {
    super(props);
    this.released = false;
    this.container = document.createElement('div');
    this.state = {
      mounted: false
    };

    this.onMainWindowUnload = () => {
      if (this.window) {
        this.window.close();
      }
    };
    /**
     * Release the new window and anything that was bound to it.
     */


    this.release = event => {
      // This method can be called once.
      if (this.released) {
        return;
      }

      this.released = true;

      if (this.windowCheckerInterval) {
        clearInterval(this.windowCheckerInterval);
        this.windowCheckerInterval = null;
      }

      window.removeEventListener('beforeunload', this.onMainWindowUnload);
      this.window.removeEventListener('beforeunload', this.release);

      if (event) {
        // Call any function bound to the `onUnload` prop.
        const {
          onClose
        } = this.props;

        if (typeof onClose === 'function') {
          onClose();
        }
      }
    };
  }
  /**
   * Render the NewWindow component.
   */


  render() {
    if (!this.state.mounted) return null;
    return _reactDom.default.createPortal(this.props.children, this.container);
  }

  componentDidMount() {
    this.openChild();
    this.setState({
      mounted: true
    });
  }
  /**
   * Create the new window when NewWindow component mount.
   */


  openChild() {
    const {
      url,
      title,
      name,
      width,
      height,
      initPopupInnerRect,
      initPopupOuterRect,
      onBlock,
      onOpen,
      onClose
    } = this.props;
    let features = {
      width,
      height
    };

    if (initPopupOuterRect) {
      features = initPopupOuterRect();
      const [topBorder, sideBorder, bottomBorder] = _BrowserPopupWindow.popupWindowBorder;

      if (!_BrowserPopupWindow.isSafari) {
        features.width -= sideBorder * 2;
        features.height -= topBorder + bottomBorder;
      }
    } else if (initPopupInnerRect) {
      features = initPopupInnerRect();
      const [topBorder, sideBorder] = _BrowserPopupWindow.popupWindowBorder;
      features.left -= sideBorder;
      features.top -= topBorder;

      if (_BrowserPopupWindow.isSafari) {
        features.height += topBorder;
      }
    } else {
      features.left = window.top.outerWidth / 2 + window.top.screenX - width / 2;
      features.top = window.top.outerHeight / 2 + window.top.screenY - height / 2;
    } // Open a new window.


    this.window = window.open(url, name, toWindowFeatures(features)); // Check if the new window was successfully opened.

    if (this.window) {
      window.addEventListener('beforeunload', this.onMainWindowUnload);
      this.window.addEventListener('resize', onNewWindowResize);
      this.window.document.title = title || document.title;
      this.window.document.body.appendChild(this.container); // If specified, copy styles from parent window's document.

      if (this.props.copyStyles) {
        setTimeout(() => copyStyles(document, this.window.document), 0);
      }

      if (typeof onOpen === 'function') {
        onOpen(this.window);
      }

      if (url && onClose) {
        this.windowCheckerInterval = setInterval(() => {
          if (!this.window || this.window.closed) {
            this.release(true);
          }
        }, 50);
      } // Release anything bound to this component before the new window unload.


      this.window.addEventListener('beforeunload', this.release);
    } else {
      // Handle error on opening of new window.
      if (typeof onBlock === 'function') {
        onBlock();
      } else {
        console.warn('A new window could not be opened. Maybe it was blocked.');
      }
    }
  }
  /**
   * Close the opened window (if any) when NewWindow will unmount.
   */


  componentWillUnmount() {
    if (this.window) {
      this.release();
      this.window.close();
    }
  }

}

NewWindow.supported = _BrowserPopupWindow.popupSupported;
/**
 * NewWindow default props.
 */

NewWindow.defaultProps = {
  url: '',
  name: '',
  width: 640,
  height: 480,
  copyStyles: true
};
/**
 * Utility functions.
 * @private
 */

/**
 * Copy styles from a source document to a target.
 * @param {Object} source
 * @param {Object} target
 * @private
 */

function copyStyles(source, target) {
  Array.from(source.styleSheets).forEach(styleSheet => {
    // For <style> elements
    let rules;

    if (styleSheet.href) {
      // for <link> elements loading CSS from a URL
      const newLinkEl = source.createElement('link');
      newLinkEl.rel = 'stylesheet';
      newLinkEl.href = styleSheet.href;
      target.head.appendChild(newLinkEl);
    } else {
      try {
        rules = styleSheet.cssRules;
      } catch (err) {// can't access crossdomain rules
      }

      if (rules) {
        const newStyleEl = source.createElement('style'); // Write the text of each rule into the body of the style element

        Array.from(styleSheet.cssRules).forEach(cssRule => {
          const {
            cssText,
            type
          } = cssRule;
          let returnText = cssText; // Check if the cssRule type is CSSImportRule (3) or CSSFontFaceRule (5) to handle local imports on a about:blank page
          // '/custom.css' turns to 'http://my-site.com/custom.css'

          if ([3, 5].includes(type)) {
            returnText = cssText.split('url(').map(line => {
              if (line[1] === '/') {
                return `${line.slice(0, 1)}${window.location.origin}${line.slice(1)}`;
              }

              return line;
            }).join('url(');
          }

          newStyleEl.appendChild(source.createTextNode(returnText));
        });
        target.head.appendChild(newStyleEl);
      }
    }
  });
}
/**
 * Convert features props to window features format (name=value,other=value).
 * @param {Object} obj
 * @return {String}
 * @private
 */


function toWindowFeatures(obj) {
  return Object.keys(obj).reduce((features, name) => {
    const value = obj[name];

    if (typeof value === 'boolean') {
      features.push(`${name}=${value ? 'yes' : 'no'}`);
    } else {
      features.push(`${name}=${value}`);
    }

    return features;
  }, []).join(',');
}
/**
 * Component export.
 * @private
 */


var _default = NewWindow;
exports.default = _default;
},{"react":"n8MK","react-dom":"NKHc","lodash/debounce":"CXfR","./BrowserPopupWindow":"iRst"}],"YpI8":[function(require,module,exports) {
"use strict";

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DockDropLayer = exports.DockDropSquare = void 0;

const react_1 = __importDefault(require("react"));

const DockData_1 = require("./DockData");

const DragDropDiv_1 = require("./dragdrop/DragDropDiv");

const DragManager_1 = require("./dragdrop/DragManager");

class DockDropSquare extends react_1.default.PureComponent {
  constructor() {
    super(...arguments);
    this.state = {
      dropping: false
    };

    this.onDragOver = e => {
      let {
        panelElement: targetElement,
        direction,
        depth,
        panelData
      } = this.props;
      this.setState({
        dropping: true
      });

      for (let i = 0; i < depth; ++i) {
        targetElement = targetElement.parentElement;
      }

      if (panelData.group === DockData_1.placeHolderStyle && direction !== 'float') {
        // place holder panel should always have full size drop rect
        this.context.setDropRect(targetElement, 'middle', this, e);
      } else {
        let dockId = this.context.getDockId();
        let panelSize = DragManager_1.DragState.getData('panelSize', dockId);
        this.context.setDropRect(targetElement, direction, this, e, panelSize);
      }

      e.accept('');
    };

    this.onDragLeave = e => {
      let {
        panelElement,
        direction
      } = this.props;
      this.setState({
        dropping: false
      });
      this.context.setDropRect(null, 'remove', this);
    };

    this.onDrop = e => {
      let dockId = this.context.getDockId();
      let source = DragManager_1.DragState.getData('tab', dockId);

      if (!source) {
        source = DragManager_1.DragState.getData('panel', dockId);
      }

      if (source) {
        let {
          panelData,
          direction,
          depth
        } = this.props;
        let target = panelData;

        for (let i = 0; i < depth; ++i) {
          target = target.parent;
        }

        this.context.dockMove(source, target, direction);
      }
    };
  }

  render() {
    let {
      direction,
      depth
    } = this.props;
    let {
      dropping
    } = this.state;
    let classes = ['dock-drop-square'];
    classes.push(`dock-drop-${direction}`);

    if (depth) {
      classes.push(`dock-drop-deep`);
    }

    if (dropping) {
      classes.push('dock-drop-square-dropping');
    }

    return react_1.default.createElement(DragDropDiv_1.DragDropDiv, {
      className: classes.join(' '),
      onDragOverT: this.onDragOver,
      onDragLeaveT: this.onDragLeave,
      onDropT: this.onDrop
    }, react_1.default.createElement("div", {
      className: 'dock-drop-square-box'
    }));
  }

  componentWillUnmount() {
    this.context.setDropRect(null, 'remove', this);
  }

}

exports.DockDropSquare = DockDropSquare;
DockDropSquare.contextType = DockData_1.DockContextType;

class DockDropLayer extends react_1.default.PureComponent {
  static addDepthSquare(children, mode, panelData, panelElement, depth) {
    if (mode === 'horizontal') {
      children.push(react_1.default.createElement(DockDropSquare, {
        key: `top${depth}`,
        direction: 'top',
        depth: depth,
        panelData: panelData,
        panelElement: panelElement
      }));
      children.push(react_1.default.createElement(DockDropSquare, {
        key: `bottom${depth}`,
        direction: 'bottom',
        depth: depth,
        panelData: panelData,
        panelElement: panelElement
      }));
    } else {
      children.push(react_1.default.createElement(DockDropSquare, {
        key: `left${depth}`,
        direction: 'left',
        depth: depth,
        panelData: panelData,
        panelElement: panelElement
      }));
      children.push(react_1.default.createElement(DockDropSquare, {
        key: `right${depth}`,
        direction: 'right',
        depth: depth,
        panelData: panelData,
        panelElement: panelElement
      }));
    }
  }

  render() {
    let {
      panelData,
      panelElement,
      dropFromPanel
    } = this.props;
    let dockId = this.context.getDockId();
    let children = []; // check if it's whole panel dragging

    let draggingPanel = DragManager_1.DragState.getData('panel', dockId);
    let fromGroup = this.context.getGroup(dropFromPanel.group);

    if (fromGroup.floatable !== false && (!draggingPanel || !draggingPanel.panelLock && draggingPanel.parent.mode !== 'float')) {
      children.push(react_1.default.createElement(DockDropSquare, {
        key: 'float',
        direction: 'float',
        panelData: panelData,
        panelElement: panelElement
      }));
    }

    if (draggingPanel !== panelData && !fromGroup.disableDock) {
      // don't drop panel to itself
      // 4 direction base drag square
      DockDropLayer.addDepthSquare(children, 'horizontal', panelData, panelElement, 0);
      DockDropLayer.addDepthSquare(children, 'vertical', panelData, panelElement, 0);

      if (panelData.group === dropFromPanel.group && panelData !== dropFromPanel) {
        // dock to tabs
        children.push(react_1.default.createElement(DockDropSquare, {
          key: 'middle',
          direction: 'middle',
          panelData: panelData,
          panelElement: panelElement
        }));
      }

      let box = panelData.parent;

      if (box && box.children.length > 1) {
        // deeper drop
        DockDropLayer.addDepthSquare(children, box.mode, panelData, panelElement, 1);

        if (box.parent) {
          DockDropLayer.addDepthSquare(children, box.parent.mode, panelData, panelElement, 2);
        }
      }
    }

    return react_1.default.createElement("div", {
      className: 'dock-drop-layer'
    }, children);
  }

}

exports.DockDropLayer = DockDropLayer;
DockDropLayer.contextType = DockData_1.DockContextType;
},{"react":"n8MK","./DockData":"zh3I","./dragdrop/DragDropDiv":"HyIX","./dragdrop/DragManager":"EJTb"}],"QpCJ":[function(require,module,exports) {
"use strict";

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DockDropEdge = void 0;

const react_1 = __importDefault(require("react"));

const DockData_1 = require("./DockData");

const DragDropDiv_1 = require("./dragdrop/DragDropDiv");

const DragManager_1 = require("./dragdrop/DragManager");

class DockDropEdge extends react_1.default.PureComponent {
  constructor() {
    super(...arguments);

    this.getRef = r => {
      this._ref = r;
    };

    this.onDragOver = e => {
      let {
        panelData,
        panelElement,
        dropFromPanel
      } = this.props;
      let dockId = this.context.getDockId();
      let draggingPanel = DragManager_1.DragState.getData('panel', dockId);
      let fromGroup = this.context.getGroup(dropFromPanel.group);

      if (draggingPanel && draggingPanel.parent.mode === 'float') {
        // ignore float panel in edge mode
        return;
      }

      let {
        direction,
        mode,
        depth
      } = this.getDirection(e, fromGroup, draggingPanel === panelData);
      depth = this.getActualDepth(depth, mode, direction);

      if (!direction || direction === 'float' && dropFromPanel.panelLock) {
        this.context.setDropRect(null, 'remove', this);
        return;
      }

      let targetElement = panelElement;

      for (let i = 0; i < depth; ++i) {
        targetElement = targetElement.parentElement;
      }

      let panelSize = DragManager_1.DragState.getData('panelSize', dockId);
      this.context.setDropRect(targetElement, direction, this, e, panelSize);
      e.accept('');
    };

    this.onDragLeave = e => {
      this.context.setDropRect(null, 'remove', this);
    };

    this.onDrop = e => {
      let {
        panelData,
        dropFromPanel
      } = this.props;
      let dockId = this.context.getDockId();
      let fromGroup = this.context.getGroup(dropFromPanel.group);
      let source = DragManager_1.DragState.getData('tab', dockId);
      let draggingPanel = DragManager_1.DragState.getData('panel', dockId);

      if (!source) {
        source = draggingPanel;
      }

      if (source) {
        let {
          direction,
          mode,
          depth
        } = this.getDirection(e, fromGroup, draggingPanel === panelData);
        depth = this.getActualDepth(depth, mode, direction);

        if (!direction) {
          return;
        }

        let target = panelData;

        for (let i = 0; i < depth; ++i) {
          target = target.parent;
        }

        this.context.dockMove(source, target, direction);
      }
    };
  }

  getDirection(e, group, samePanel) {
    let rect = this._ref.getBoundingClientRect();

    let widthRate = Math.min(rect.width, 500);
    let heightRate = Math.min(rect.height, 500);
    let left = (e.clientX - rect.left) / widthRate;
    let right = (rect.right - e.clientX) / widthRate;
    let top = (e.clientY - rect.top) / heightRate;
    let bottom = (rect.bottom - e.clientY) / heightRate;
    let min = Math.min(left, right, top, bottom);
    let depth = 0;

    if (group.disableDock || samePanel) {
      // use an impossible min value to disable dock drop
      min = 1;
    }

    if (min < 0) {
      return {
        direction: null,
        depth: 0
      };
    } else if (min < 0.075) {
      depth = 3; // depth 3 or 4
    } else if (min < 0.15) {
      depth = 1; // depth 1 or 2
    } else if (min < 0.3) {// default
    } else if (group.floatable) {
      return {
        direction: 'float',
        mode: 'float',
        depth: 0
      };
    }

    switch (min) {
      case left:
        {
          return {
            direction: 'left',
            mode: 'horizontal',
            depth
          };
        }

      case right:
        {
          return {
            direction: 'right',
            mode: 'horizontal',
            depth
          };
        }

      case top:
        {
          return {
            direction: 'top',
            mode: 'vertical',
            depth
          };
        }

      case bottom:
        {
          return {
            direction: 'bottom',
            mode: 'vertical',
            depth
          };
        }
    } // probably a invalid input causing everything to be NaN?


    return {
      direction: null,
      depth: 0
    };
  }

  getActualDepth(depth, mode, direction) {
    let afterPanel = direction === 'bottom' || direction === 'right';

    if (!depth) {
      return depth;
    }

    let {
      panelData
    } = this.props;
    let previousTarget = panelData;
    let targetBox = panelData.parent;
    let lastDepth = 0;

    if (panelData.parent.mode === mode) {
      ++depth;
    }

    while (targetBox && lastDepth < depth) {
      if (targetBox.mode === mode) {
        if (afterPanel) {
          if (targetBox.children[targetBox.children.length - 1] !== previousTarget) {
            // dont go deeper if current target is on different side of the box
            break;
          }
        } else {
          if (targetBox.children[0] !== previousTarget) {
            // dont go deeper if current target is on different side of the box
            break;
          }
        }
      }

      previousTarget = targetBox;
      targetBox = targetBox.parent;
      ++lastDepth;
    }

    while (depth > lastDepth) {
      depth -= 2;
    }

    return depth;
  }

  render() {
    return react_1.default.createElement(DragDropDiv_1.DragDropDiv, {
      getRef: this.getRef,
      className: 'dock-drop-edge',
      onDragOverT: this.onDragOver,
      onDragLeaveT: this.onDragLeave,
      onDropT: this.onDrop
    });
  }

  componentWillUnmount() {
    this.context.setDropRect(null, 'remove', this);
  }

}

exports.DockDropEdge = DockDropEdge;
DockDropEdge.contextType = DockData_1.DockContextType;
},{"react":"n8MK","./DockData":"zh3I","./dragdrop/DragDropDiv":"HyIX","./dragdrop/DragManager":"EJTb"}],"ohUB":[function(require,module,exports) {
"use strict";

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DockPanel = void 0;

const react_1 = __importDefault(require("react"));

const DockData_1 = require("./DockData");

const DockTabs_1 = require("./DockTabs");

const DragDropDiv_1 = require("./dragdrop/DragDropDiv");

const DragManager_1 = require("./dragdrop/DragManager");

const DockDropLayer_1 = require("./DockDropLayer");

const Algorithm_1 = require("./Algorithm");

const DockDropEdge_1 = require("./DockDropEdge");

class DockPanel extends react_1.default.PureComponent {
  constructor() {
    super(...arguments);

    this.getRef = r => {
      this._ref = r;
    };

    this.state = {
      dropFromPanel: null,
      draggingHeader: false
    };

    this.onDragOver = e => {
      if (DockPanel._droppingPanel === this) {
        return;
      }

      let {
        panelData
      } = this.props;
      let dockId = this.context.getDockId();
      let tab = DragManager_1.DragState.getData('tab', dockId);
      let panel = DragManager_1.DragState.getData('panel', dockId);

      if (tab || panel) {
        DockPanel.droppingPanel = this;
      }

      if (tab) {
        if (tab.parent) {
          this.setState({
            dropFromPanel: tab.parent
          });
        } else {
          // add a fake panel
          this.setState({
            dropFromPanel: {
              activeId: '',
              tabs: [],
              group: tab.group
            }
          });
        }
      } else if (panel) {
        this.setState({
          dropFromPanel: panel
        });
      }
    }; // drop to move in float mode


    this.onPanelHeaderDragStart = event => {
      let {
        panelData
      } = this.props;
      let {
        parent,
        x,
        y,
        z
      } = panelData;
      let dockId = this.context.getDockId();

      if (parent && parent.mode === 'float') {
        this._movingX = x;
        this._movingY = y; // hide the panel, but not create drag layer element

        event.setData({
          panel: this.props.panelData
        }, dockId);
        event.startDrag(null, null);
        this.onFloatPointerDown();
      } else {
        let tabGroup = this.context.getGroup(panelData.group);
        let [panelWidth, panelHeight] = Algorithm_1.getFloatPanelSize(this._ref, tabGroup);
        event.setData({
          panel: panelData,
          panelSize: [panelWidth, panelHeight]
        }, dockId);
        event.startDrag(null);
      }

      this.setState({
        draggingHeader: true
      });
    };

    this.onPanelHeaderDragMove = e => {
      let {
        width,
        height
      } = this.context.getLayoutSize();
      let {
        panelData
      } = this.props;
      panelData.x = this._movingX + e.dx;
      panelData.y = this._movingY + e.dy;

      if (width > 200 && height > 200) {
        if (panelData.y < 0) {
          panelData.y = 0;
        } else if (panelData.y > height - 16) {
          panelData.y = height - 16;
        }

        if (panelData.x + panelData.w < 16) {
          panelData.x = 16 - panelData.w;
        } else if (panelData.x > width - 16) {
          panelData.x = width - 16;
        }
      }

      this.forceUpdate();
    };

    this.onPanelHeaderDragEnd = e => {
      if (!this._unmounted) {
        this.setState({
          draggingHeader: false
        });
        this.context.onSilentChange(this.props.panelData.activeId, 'move');
      }
    };

    this.onPanelCornerDragTL = e => {
      this.onPanelCornerDrag(e, 'tl');
    };

    this.onPanelCornerDragTR = e => {
      this.onPanelCornerDrag(e, 'tr');
    };

    this.onPanelCornerDragBL = e => {
      this.onPanelCornerDrag(e, 'bl');
    };

    this.onPanelCornerDragBR = e => {
      this.onPanelCornerDrag(e, 'br');
    };

    this.onPanelCornerDragMove = e => {
      let {
        panelData
      } = this.props;
      let {
        dx,
        dy
      } = e;

      if (this._movingCorner.startsWith('t')) {
        // when moving top corners, dont let it move header out of screen
        let {
          width,
          height
        } = this.context.getLayoutSize();

        if (this._movingY + dy < 0) {
          dy = -this._movingY;
        } else if (this._movingY + dy > height - 16) {
          dy = height - 16 - this._movingY;
        }
      }

      switch (this._movingCorner) {
        case 'tl':
          {
            panelData.x = this._movingX + dx;
            panelData.w = this._movingW - dx;
            panelData.y = this._movingY + dy;
            panelData.h = this._movingH - dy;
            break;
          }

        case 'tr':
          {
            panelData.w = this._movingW + dx;
            panelData.y = this._movingY + dy;
            panelData.h = this._movingH - dy;
            break;
          }

        case 'bl':
          {
            panelData.x = this._movingX + dx;
            panelData.w = this._movingW - dx;
            panelData.h = this._movingH + dy;
            break;
          }

        case 'br':
          {
            panelData.w = this._movingW + dx;
            panelData.h = this._movingH + dy;
            break;
          }
      }

      this.forceUpdate();
    };

    this.onPanelCornerDragEnd = e => {
      this.context.onSilentChange(this.props.panelData.activeId, 'move');
    };

    this.onFloatPointerDown = () => {
      let {
        panelData
      } = this.props;
      let {
        z
      } = panelData;
      let newZ = Algorithm_1.nextZIndex(z);

      if (newZ !== z) {
        panelData.z = newZ;
        this.forceUpdate();
      }
    };

    this.onPanelClicked = () => {
      if (!this._ref.contains(this._ref.ownerDocument.activeElement)) {
        this._ref.querySelector('.dock-bar').focus();
      }
    };

    this._unmounted = false;
  }

  static set droppingPanel(panel) {
    if (DockPanel._droppingPanel === panel) {
      return;
    }

    if (DockPanel._droppingPanel) {
      DockPanel._droppingPanel.onDragOverOtherPanel();
    }

    DockPanel._droppingPanel = panel;
  }

  onDragOverOtherPanel() {
    if (this.state.dropFromPanel) {
      this.setState({
        dropFromPanel: null
      });
    }
  }

  onPanelCornerDrag(e, corner) {
    let {
      parent,
      x,
      y,
      w,
      h
    } = this.props.panelData;

    if (parent && parent.mode === 'float') {
      this._movingCorner = corner;
      this._movingX = x;
      this._movingY = y;
      this._movingW = w;
      this._movingH = h;
      e.startDrag(null, null);
    }
  }

  render() {
    let {
      dropFromPanel,
      draggingHeader
    } = this.state;
    let {
      panelData,
      size
    } = this.props;
    let {
      minWidth,
      minHeight,
      group: styleName,
      id,
      parent,
      panelLock
    } = panelData;

    if (panelLock) {
      if (panelLock.panelStyle) {
        styleName = panelLock.panelStyle;
      }
    }

    let panelClass;

    if (styleName) {
      panelClass = styleName.split(' ').map(name => `dock-style-${name}`).join(' ');
    }

    let isMax = parent && parent.mode === 'maximize';
    let isFloat = parent && parent.mode === 'float';
    let pointerDownCallback = this.onFloatPointerDown;
    let onPanelHeaderDragStart = this.onPanelHeaderDragStart;

    if (!isFloat || isMax) {
      pointerDownCallback = null;
    }

    if (isMax) {
      dropFromPanel = null;
      onPanelHeaderDragStart = null;
    }

    let cls = `dock-panel ${panelClass ? panelClass : ''}${dropFromPanel ? ' dock-panel-dropping' : ''}${draggingHeader ? ' dragging' : ''}`;
    let style = {
      minWidth,
      minHeight,
      flex: `${size} 1 ${size}px`
    };

    if (isFloat) {
      style.left = panelData.x;
      style.top = panelData.y;
      style.width = panelData.w;
      style.height = panelData.h;
      style.zIndex = panelData.z;
    }

    let droppingLayer;

    if (dropFromPanel) {
      let tabGroup = this.context.getGroup(dropFromPanel.group);
      let dockId = this.context.getDockId();

      if (!tabGroup.tabLocked || DragManager_1.DragState.getData('tab', dockId) == null) {
        // not allowed locked tab to create new panel
        let DockDropClass = this.context.useEdgeDrop() ? DockDropEdge_1.DockDropEdge : DockDropLayer_1.DockDropLayer;
        droppingLayer = react_1.default.createElement(DockDropClass, {
          panelData: panelData,
          panelElement: this._ref,
          dropFromPanel: dropFromPanel
        });
      }
    }

    return react_1.default.createElement(DragDropDiv_1.DragDropDiv, {
      getRef: this.getRef,
      className: cls,
      style: style,
      "data-dockid": id,
      onMouseDownCapture: pointerDownCallback,
      onTouchStartCapture: pointerDownCallback,
      onDragOverT: isFloat ? null : this.onDragOver,
      onClick: this.onPanelClicked
    }, react_1.default.createElement(DockTabs_1.DockTabs, {
      panelData: panelData,
      onPanelDragStart: onPanelHeaderDragStart,
      onPanelDragMove: this.onPanelHeaderDragMove,
      onPanelDragEnd: this.onPanelHeaderDragEnd
    }), isFloat ? [react_1.default.createElement(DragDropDiv_1.DragDropDiv, {
      key: "drag-size-t-l",
      className: "dock-panel-drag-size dock-panel-drag-size-t-l",
      onDragStartT: this.onPanelCornerDragTL,
      onDragMoveT: this.onPanelCornerDragMove,
      onDragEndT: this.onPanelCornerDragEnd
    }), react_1.default.createElement(DragDropDiv_1.DragDropDiv, {
      key: "drag-size-t-r",
      className: "dock-panel-drag-size dock-panel-drag-size-t-r",
      onDragStartT: this.onPanelCornerDragTR,
      onDragMoveT: this.onPanelCornerDragMove,
      onDragEndT: this.onPanelCornerDragEnd
    }), react_1.default.createElement(DragDropDiv_1.DragDropDiv, {
      key: "drag-size-b-l",
      className: "dock-panel-drag-size dock-panel-drag-size-b-l",
      onDragStartT: this.onPanelCornerDragBL,
      onDragMoveT: this.onPanelCornerDragMove,
      onDragEndT: this.onPanelCornerDragEnd
    }), react_1.default.createElement(DragDropDiv_1.DragDropDiv, {
      key: "drag-size-b-r",
      className: "dock-panel-drag-size dock-panel-drag-size-b-r",
      onDragStartT: this.onPanelCornerDragBR,
      onDragMoveT: this.onPanelCornerDragMove,
      onDragEndT: this.onPanelCornerDragEnd
    })] : null, droppingLayer);
  }

  componentWillUnmount() {
    if (DockPanel._droppingPanel === this) {
      DockPanel.droppingPanel = null;
    }

    this._unmounted = true;
  }

}

exports.DockPanel = DockPanel;
DockPanel.contextType = DockData_1.DockContextType;
},{"react":"n8MK","./DockData":"zh3I","./DockTabs":"nskJ","./dragdrop/DragDropDiv":"HyIX","./dragdrop/DragManager":"EJTb","./DockDropLayer":"YpI8","./Algorithm":"wqok","./DockDropEdge":"QpCJ"}],"LPFX":[function(require,module,exports) {
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.popupWindowBorder = exports.popupSupported = exports.isSafari = exports.gerWindowBorder = void 0;
const bowser_1 = __importDefault(require("bowser"));
const browser = bowser_1.default.getParser(window.navigator.userAgent);
function gerWindowBorder() {
    switch (browser.getOSName(true)) {
        case 'windows': {
            let result;
            switch (browser.getBrowserName(true)) {
                case 'firefox':
                    result = [68, 8, 8];
                    break;
                case 'microsoft edge':
                    result = [62, 8, 8];
                    break;
                //case 'chrome':
                default:
                    result = [60, 8, 8];
            }
            if (window.devicePixelRatio > 1) {
                result[0] -= 2;
                result[1] -= 1;
                result[2] -= 1;
            }
            return result;
        }
        case 'macos': {
            switch (browser.getBrowserName(true)) {
                case 'safari':
                    return [22, 0, 0];
                case 'firefox':
                    return [59, 0, 0];
                //case 'chrome':
                default:
                    return [51, 0, 0];
            }
        }
    }
    return [60, 8, 8];
}
exports.gerWindowBorder = gerWindowBorder;
exports.isSafari = browser.getBrowserName(true) === 'safari';
exports.popupSupported = browser.getPlatformType() === 'desktop';
exports.popupWindowBorder = gerWindowBorder();

},{"bowser":"fIh9"}],"js5E":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapWindowToElement = exports.mapElementToScreenRect = exports.estimateWindowBorder = exports.estimateBrowserZoom = void 0;
const BrowserPopupWindow_1 = require("./BrowserPopupWindow");
function estimateBrowserZoom(_window) {
    // one of them might be off by a lot due to developer console or other browser plugin
    let [topBorder, sideBorder, bottomBorder] = BrowserPopupWindow_1.gerWindowBorder();
    if (_window.outerWidth === _window.screen.availWidth) {
        sideBorder = 0;
        bottomBorder = 0;
    }
    let xRatio = (_window.outerWidth - sideBorder * 2) / _window.innerWidth;
    let yRatio = (_window.outerHeight - topBorder - bottomBorder) / _window.innerHeight;
    let zoomRatio = Math.min(yRatio, xRatio);
    if (zoomRatio > 1.8) {
        zoomRatio = Math.round(zoomRatio);
    }
    else if (zoomRatio > 0.73) {
        zoomRatio = Math.round(zoomRatio * 20) / 20;
    }
    else {
        zoomRatio = 2 / Math.round(2 / zoomRatio);
    }
    return zoomRatio;
}
exports.estimateBrowserZoom = estimateBrowserZoom;
function estimateWindowBorder(_window, addBorder = false) {
    let zoom = _window ? estimateBrowserZoom(_window) : 1;
    let xBorder = (_window.outerWidth - _window.innerWidth * zoom) >> 1;
    let yBorder = Math.round(_window.outerHeight - _window.innerHeight * zoom);
    if (xBorder > 32) {
        // probably because of debugger console, assume it's in the right side
        xBorder = 8;
    }
    else {
        yBorder -= xBorder;
    }
    return [xBorder, yBorder, zoom];
}
exports.estimateWindowBorder = estimateWindowBorder;
class MapRect2D {
    init(x1, y1, w1, h1, x2, y2, w2, h2) {
        this.scaleX = w2 / w1;
        this.scaleY = h2 / h1;
        this.offsetX = x2 - x1 * this.scaleX;
        this.offsetY = y2 - y1 * this.scaleY;
    }
    map(pt) {
        return { x: pt.x * this.scaleX + this.offsetX, y: pt.y * this.scaleY + this.offsetY };
    }
    revertMap(pt) {
        return { x: (pt.x - this.offsetX) / this.scaleX, y: (pt.y - this.offsetY) / this.scaleY };
    }
}
function mapElementToScreenRect(element, rect) {
    if (!element) {
        return null;
    }
    let clientRect = element.getBoundingClientRect();
    let mapRect = new MapRect2D();
    mapRect.init(0, 0, element.offsetWidth, element.offsetHeight, clientRect.x, clientRect.y, clientRect.width, clientRect.height);
    let mappedRect;
    if (rect) {
        let { x, y } = mapRect.map({ x: rect.left, y: rect.top });
        let { x: x2, y: y2 } = mapRect.map({ x: rect.left + rect.width, y: rect.top + rect.height });
        mappedRect = { left: x, top: y, width: x2 - x, height: y2 - y };
    }
    else {
        mappedRect = {
            left: clientRect.left,
            top: clientRect.top,
            width: clientRect.width,
            height: clientRect.height,
        };
    }
    let _document = element.ownerDocument;
    let _window = _document.defaultView;
    if (!_window) {
        return clientRect;
    }
    // recursively get rect if it's an iframe
    if (_window.frameElement) {
        return mapElementToScreenRect(_window.frameElement, mappedRect);
    }
    let [xBorder, yBorder, zoom] = estimateWindowBorder(_window);
    if (zoom !== 1) {
        mappedRect.left *= zoom;
        mappedRect.top *= zoom;
        mappedRect.width *= zoom;
        mappedRect.height *= zoom;
    }
    mappedRect.left += _window.screenX + xBorder;
    mappedRect.top += _window.screenY + yBorder;
    return mappedRect;
}
exports.mapElementToScreenRect = mapElementToScreenRect;
function mapWindowToElement(targetElement, fromWindow, fromRect, removeBorder = true) {
    if (!targetElement) {
        return null;
    }
    if (fromWindow) {
        fromRect = {
            left: fromWindow.screenX,
            top: fromWindow.screenY,
            width: fromWindow.outerWidth,
            height: fromWindow.outerHeight,
        };
        if (removeBorder) {
            const [topBorder, sideBorder, bottomBorder] = BrowserPopupWindow_1.popupWindowBorder;
            fromRect.left += sideBorder;
            fromRect.top += topBorder;
            fromRect.width -= sideBorder * 2;
            fromRect.height -= topBorder + bottomBorder;
        }
    }
    else if (!fromRect) {
        return null;
    }
    let _document = targetElement.ownerDocument;
    let _window = _document.defaultView;
    if (!_window) {
        return fromRect;
    }
    // recursively get rect if it's an iframe
    if (_window.frameElement) {
        fromRect = mapWindowToElement(_window.frameElement, null, fromRect);
    }
    else {
        let [xBorder, yBorder, zoom] = estimateWindowBorder(_window);
        fromRect.left -= _window.screenX + xBorder;
        fromRect.top -= _window.screenY + yBorder;
        if (zoom !== 1) {
            fromRect.left /= zoom;
            fromRect.top /= zoom;
            fromRect.width /= zoom;
            fromRect.height /= zoom;
        }
    }
    let clientRect = targetElement.getBoundingClientRect();
    let mapRect = new MapRect2D();
    mapRect.init(0, 0, targetElement.offsetWidth, targetElement.offsetHeight, clientRect.x, clientRect.y, clientRect.width, clientRect.height);
    let mappedRect;
    let { x, y } = mapRect.revertMap({ x: fromRect.left, y: fromRect.top });
    let { x: x2, y: y2 } = mapRect.revertMap({
        x: fromRect.left + fromRect.width,
        y: fromRect.top + fromRect.height,
    });
    mappedRect = { left: x, top: y, width: x2 - x, height: y2 - y };
    return mappedRect;
}
exports.mapWindowToElement = mapWindowToElement;

},{"./BrowserPopupWindow":"LPFX"}],"IpWq":[function(require,module,exports) {
"use strict";

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WindowPanel = void 0;

const react_1 = __importDefault(require("react"));

const rc_new_window_1 = __importDefault(require("rc-new-window"));

const DockData_1 = require("./DockData");

const DockPanel_1 = require("./DockPanel");

const ScreenPosition_1 = require("rc-new-window/lib/ScreenPosition");

class WindowPanel extends react_1.default.PureComponent {
  constructor() {
    super(...arguments);

    this.onOpen = w => {
      if (!this._window && w) {
        this._window = w;
      }
    };

    this.onUnload = () => {
      let {
        panelData
      } = this.props;
      let layoutRoot = this.context.getRootElement();
      const rect = ScreenPosition_1.mapWindowToElement(layoutRoot, this._window);

      if (rect.width > 0 && rect.height > 0) {
        panelData.x = rect.left;
        panelData.y = rect.top;
        panelData.w = rect.width;
        panelData.h = rect.height;
      }

      this.context.dockMove(panelData, null, 'float');
    };

    this.initPopupInnerRect = () => {
      let {
        panelData
      } = this.props;
      return ScreenPosition_1.mapElementToScreenRect(this.context.getRootElement(), {
        left: panelData.x,
        top: panelData.y,
        width: panelData.w,
        height: panelData.h
      });
    };
  }

  render() {
    let {
      panelData
    } = this.props;
    let {
      x,
      y,
      w,
      h
    } = panelData;
    return react_1.default.createElement(rc_new_window_1.default, {
      copyStyles: true,
      onOpen: this.onOpen,
      onClose: this.onUnload,
      onBlock: this.onUnload,
      initPopupInnerRect: this.initPopupInnerRect,
      width: w,
      height: h
    }, react_1.default.createElement("div", {
      className: 'dock-wbox'
    }, react_1.default.createElement(DockPanel_1.DockPanel, {
      size: panelData.size,
      panelData: panelData,
      key: panelData.id
    })));
  }

}

exports.WindowPanel = WindowPanel;
WindowPanel.contextType = DockData_1.DockContextType;
},{"react":"n8MK","rc-new-window":"K3Y8","./DockData":"zh3I","./DockPanel":"ohUB","rc-new-window/lib/ScreenPosition":"js5E"}],"ObQG":[function(require,module,exports) {
"use strict";

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WindowBox = void 0;

const react_1 = __importDefault(require("react"));

const WindowPanel_1 = require("./WindowPanel");

class WindowBox extends react_1.default.PureComponent {
  render() {
    let {
      children
    } = this.props.boxData;
    let childrenRender = [];

    for (let child of children) {
      if ('tabs' in child) {
        childrenRender.push(react_1.default.createElement(WindowPanel_1.WindowPanel, {
          key: child.id,
          panelData: child
        }));
      }
    }

    return react_1.default.createElement(react_1.default.Fragment, null, childrenRender);
  }

}

exports.WindowBox = WindowBox;
WindowBox.enabled = window.navigator.platform === 'Win32' || window.navigator.platform === 'MacIntel';
},{"react":"n8MK","./WindowPanel":"IpWq"}],"nskJ":[function(require,module,exports) {
"use strict";

var __createBinding = this && this.__createBinding || (Object.create ? function (o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  Object.defineProperty(o, k2, {
    enumerable: true,
    get: function () {
      return m[k];
    }
  });
} : function (o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  o[k2] = m[k];
});

var __setModuleDefault = this && this.__setModuleDefault || (Object.create ? function (o, v) {
  Object.defineProperty(o, "default", {
    enumerable: true,
    value: v
  });
} : function (o, v) {
  o["default"] = v;
});

var __importStar = this && this.__importStar || function (mod) {
  if (mod && mod.__esModule) return mod;
  var result = {};
  if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);

  __setModuleDefault(result, mod);

  return result;
};

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DockTabs = exports.TabCache = void 0;

const react_1 = __importDefault(require("react"));

const DockData_1 = require("./DockData");

const rc_tabs_1 = __importDefault(require("rc-tabs"));

const rc_menu_1 = __importStar(require("rc-menu"));

const rc_dropdown_1 = __importDefault(require("rc-dropdown"));

const DragManager = __importStar(require("./dragdrop/DragManager"));

const DragDropDiv_1 = require("./dragdrop/DragDropDiv");

const DockTabBar_1 = require("./DockTabBar");

const DockTabPane_1 = __importDefault(require("./DockTabPane"));

const Algorithm_1 = require("./Algorithm");

const WindowBox_1 = require("./WindowBox");

function findParentPanel(element) {
  for (let i = 0; i < 10; ++i) {
    if (!element) {
      return null;
    }

    if (element.classList.contains('dock-panel')) {
      return element;
    }

    element = element.parentElement;
  }

  return null;
}

function isPopupDiv(r) {
  var _a, _b;

  return r == null || ((_a = r.parentElement) === null || _a === void 0 ? void 0 : _a.tagName) === 'LI' || ((_b = r.parentElement) === null || _b === void 0 ? void 0 : _b.parentElement.tagName) === 'LI';
}

class TabCache {
  constructor(context) {
    this.getRef = r => {
      if (isPopupDiv(r)) {
        return;
      }

      this._ref = r;
    };

    this.getHitAreaRef = r => {
      if (isPopupDiv(r)) {
        return;
      }

      this._hitAreaRef = r;
    };

    this.onCloseClick = e => {
      this.context.dockMove(this.data, null, 'remove');
      e.stopPropagation();
    };

    this.onDragStart = e => {
      let panel = findParentPanel(this._ref);
      let tabGroup = this.context.getGroup(this.data.group);
      let [panelWidth, panelHeight] = Algorithm_1.getFloatPanelSize(panel, tabGroup);
      e.setData({
        tab: this.data,
        panelSize: [panelWidth, panelHeight]
      }, this.context.getDockId());
      e.startDrag(this._ref.parentElement, this._ref.parentElement);
    };

    this.onDragOver = e => {
      let dockId = this.context.getDockId();
      let tab = DragManager.DragState.getData('tab', dockId);
      let panel = DragManager.DragState.getData('panel', dockId);

      if (tab) {
        panel = tab.parent;
      } else if (!panel) {
        return;
      }

      if (panel.group !== this.data.group) {
        e.reject();
      } else if (tab && tab !== this.data) {
        let direction = this.getDropDirection(e);
        this.context.setDropRect(this._hitAreaRef, direction, this);
        e.accept('');
      } else if (panel && panel !== this.data.parent) {
        let direction = this.getDropDirection(e);
        this.context.setDropRect(this._hitAreaRef, direction, this);
        e.accept('');
      }
    };

    this.onDragLeave = e => {
      this.context.setDropRect(null, 'remove', this);
    };

    this.onDrop = e => {
      let dockId = this.context.getDockId();
      let panel;
      let tab = DragManager.DragState.getData('tab', dockId);

      if (tab) {
        panel = tab.parent;
      } else {
        panel = DragManager.DragState.getData('panel', dockId);
      }

      if (tab && tab !== this.data) {
        let direction = this.getDropDirection(e);
        this.context.dockMove(tab, this.data, direction);
      } else if (panel && panel !== this.data.parent) {
        let direction = this.getDropDirection(e);
        this.context.dockMove(panel, this.data, direction);
      }
    };

    this.context = context;
  }

  setData(data) {
    if (data !== this.data) {
      this.data = data;
      this.content = this.render();
      return true;
    }

    return false;
  }

  getDropDirection(e) {
    let rect = this._hitAreaRef.getBoundingClientRect();

    let midx = rect.left + rect.width * 0.5;
    return e.clientX > midx ? 'after-tab' : 'before-tab';
  }

  render() {
    let {
      id,
      title,
      group,
      content,
      closable,
      cached,
      parent
    } = this.data;
    let {
      onDragStart,
      onDragOver,
      onDrop,
      onDragLeave
    } = this;

    if (parent.parent.mode === 'window') {
      onDragStart = null;
      onDragOver = null;
      onDrop = null;
      onDragLeave = null;
    }

    let tabGroup = this.context.getGroup(group);

    if (typeof content === 'function') {
      content = content(this.data);
    }

    let tab = react_1.default.createElement(DragDropDiv_1.DragDropDiv, {
      getRef: this.getRef,
      onDragStartT: onDragStart,
      onDragOverT: onDragOver,
      onDropT: onDrop,
      onDragLeaveT: onDragLeave
    }, title, closable ? react_1.default.createElement("div", {
      className: "dock-tab-close-btn",
      onClick: this.onCloseClick
    }) : null, react_1.default.createElement("div", {
      className: "dock-tab-hit-area",
      ref: this.getHitAreaRef
    }));
    return react_1.default.createElement(DockTabPane_1.default, {
      key: id,
      cacheId: id,
      cached: cached,
      tab: tab
    }, content);
  }

  destroy() {// place holder
  }

}

exports.TabCache = TabCache;

class DockTabs extends react_1.default.PureComponent {
  constructor() {
    super(...arguments);
    this._cache = new Map();

    this.onMaximizeClick = e => {
      let {
        panelData
      } = this.props;
      this.context.dockMove(panelData, null, 'maximize'); // prevent the focus change logic

      e.stopPropagation();
    };

    this.onNewWindowClick = () => {
      let {
        panelData
      } = this.props;
      this.context.dockMove(panelData, null, 'new-window');
    };

    this.renderTabBar = (props, TabNavList) => {
      let {
        panelData,
        onPanelDragStart,
        onPanelDragMove,
        onPanelDragEnd
      } = this.props;
      let {
        group: groupName,
        panelLock
      } = panelData;
      let group = this.context.getGroup(groupName);
      let {
        panelExtra
      } = group;
      let maximizable = group.maximizable;

      if (panelData.parent.mode === 'window') {
        onPanelDragStart = null;
        maximizable = false;
      }

      if (panelLock) {
        if (panelLock.panelExtra) {
          panelExtra = panelLock.panelExtra;
        }
      }

      let showNewWindowButton = group.newWindow && WindowBox_1.WindowBox.enabled && panelData.parent.mode === 'float';
      let panelExtraContent;

      if (panelExtra) {
        panelExtraContent = panelExtra(panelData, this.context);
      } else if (maximizable || showNewWindowButton) {
        panelExtraContent = react_1.default.createElement("div", {
          className: "dock-panel-max-btn",
          onClick: maximizable ? this.onMaximizeClick : null
        });

        if (showNewWindowButton) {
          panelExtraContent = this.addNewWindowMenu(panelExtraContent, !maximizable);
        }
      }

      return react_1.default.createElement(DockTabBar_1.DockTabBar, Object.assign({
        onDragStart: onPanelDragStart,
        onDragMove: onPanelDragMove,
        onDragEnd: onPanelDragEnd,
        TabNavList: TabNavList,
        isMaximized: panelData.parent.mode === 'maximize'
      }, props, {
        extra: panelExtraContent
      }));
    };

    this.onTabChange = activeId => {
      this.props.panelData.activeId = activeId;
      this.context.onSilentChange(activeId, 'active');
      this.forceUpdate();
    };
  }

  updateTabs(tabs) {
    if (tabs === this.cachedTabs) {
      return;
    }

    this.cachedTabs = tabs;
    let newCache = new Map();
    let reused = 0;

    for (let tabData of tabs) {
      let {
        id
      } = tabData;

      if (this._cache.has(id)) {
        let tab = this._cache.get(id);

        newCache.set(id, tab);
        tab.setData(tabData);
        ++reused;
      } else {
        let tab = new TabCache(this.context);
        newCache.set(id, tab);
        tab.setData(tabData);
      }
    }

    if (reused !== this._cache.size) {
      for (let [id, tab] of this._cache) {
        if (!newCache.has(id)) {
          tab.destroy();
        }
      }
    }

    this._cache = newCache;
  }

  addNewWindowMenu(element, showWithLeftClick) {
    const nativeMenu = react_1.default.createElement(rc_menu_1.default, {
      onClick: this.onNewWindowClick
    }, react_1.default.createElement(rc_menu_1.MenuItem, null, "New Window"));
    let trigger = showWithLeftClick ? ['contextMenu', 'click'] : ['contextMenu'];
    return react_1.default.createElement(rc_dropdown_1.default, {
      prefixCls: "dock-dropdown",
      overlay: nativeMenu,
      trigger: trigger,
      mouseEnterDelay: 0.1,
      mouseLeaveDelay: 0.1
    }, element);
  }

  render() {
    let {
      group,
      tabs,
      activeId
    } = this.props.panelData;
    let tabGroup = this.context.getGroup(group);
    let {
      animated
    } = tabGroup;

    if (animated == null) {
      animated = true;
    }

    this.updateTabs(tabs);
    let children = [];

    for (let [id, tab] of this._cache) {
      children.push(tab.content);
    }

    return react_1.default.createElement(rc_tabs_1.default, {
      prefixCls: "dock",
      moreIcon: "...",
      animated: animated,
      renderTabBar: this.renderTabBar,
      activeKey: activeId,
      onChange: this.onTabChange
    }, children);
  }

}

exports.DockTabs = DockTabs;
DockTabs.contextType = DockData_1.DockContextType;
DockTabs.propKeys = ['group', 'tabs', 'activeId', 'onTabChange'];
},{"react":"n8MK","./DockData":"zh3I","rc-tabs":"FgVr","rc-menu":"VH7R","rc-dropdown":"SyQB","./dragdrop/DragManager":"EJTb","./dragdrop/DragDropDiv":"HyIX","./DockTabBar":"Ec16","./DockTabPane":"ZavB","./Algorithm":"wqok","./WindowBox":"ObQG"}],"Lzzn":[function(require,module,exports) {
"use strict";

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Divider = void 0;

const react_1 = __importDefault(require("react"));

const DragDropDiv_1 = require("./dragdrop/DragDropDiv");

class BoxDataCache {
  constructor(data) {
    this.beforeSize = 0;
    this.beforeMinSize = 0;
    this.afterSize = 0;
    this.afterMinSize = 0;
    this.element = data.element;
    this.beforeDivider = data.beforeDivider;
    this.afterDivider = data.afterDivider;

    for (let child of this.beforeDivider) {
      this.beforeSize += child.size;

      if (child.minSize > 0) {
        this.beforeMinSize += child.minSize;
      }
    }

    for (let child of this.afterDivider) {
      this.afterSize += child.size;

      if (child.minSize > 0) {
        this.afterMinSize += child.minSize;
      }
    }
  }

} // split size among children


function spiltSize(newSize, oldSize, children) {
  let reservedSize = -1;
  let sizes = [];
  let requiredMinSize = 0;

  while (requiredMinSize !== reservedSize) {
    reservedSize = requiredMinSize;
    requiredMinSize = 0;
    let ratio = (newSize - reservedSize) / (oldSize - reservedSize);

    if (!(ratio >= 0)) {
      // invalid input
      break;
    }

    for (let i = 0; i < children.length; ++i) {
      let size = children[i].size * ratio;

      if (size < children[i].minSize) {
        size = children[i].minSize;
        requiredMinSize += size;
      }

      sizes[i] = size;
    }
  }

  return sizes;
}

class Divider extends react_1.default.PureComponent {
  constructor() {
    super(...arguments);

    this.startDrag = e => {
      this.boxData = new BoxDataCache(this.props.getDividerData(this.props.idx));
      e.startDrag(this.boxData.element, null);
    };

    this.dragMove = e => {
      if (e.event.shiftKey || e.event.ctrlKey || e.event.altKey) {
        this.dragMoveAll(e, e.dx, e.dy);
      } else {
        this.dragMove2(e, e.dx, e.dy);
      }
    };

    this.dragEnd = e => {
      let {
        onDragEnd
      } = this.props;
      this.boxData = null;

      if (onDragEnd) {
        onDragEnd();
      }
    };
  }

  dragMove2(e, dx, dy) {
    let {
      isVertical,
      changeSizes
    } = this.props;
    let {
      beforeDivider,
      afterDivider
    } = this.boxData;

    if (!(beforeDivider.length && afterDivider.length)) {
      // invalid input
      return;
    }

    let d = isVertical ? dy : dx;
    let leftChild = beforeDivider[beforeDivider.length - 1];
    let rightCild = afterDivider[0];
    let leftSize = leftChild.size + d;
    let rightSize = rightCild.size - d; // check min size

    if (d > 0) {
      if (rightSize < rightCild.minSize) {
        rightSize = rightCild.minSize;
        leftSize = leftChild.size + rightCild.size - rightSize;
      }
    } else if (leftSize < leftChild.minSize) {
      leftSize = leftChild.minSize;
      rightSize = leftChild.size + rightCild.size - leftSize;
    }

    let sizes = beforeDivider.concat(afterDivider).map(child => child.size);
    sizes[beforeDivider.length - 1] = leftSize;
    sizes[beforeDivider.length] = rightSize;
    changeSizes(sizes);
  }

  dragMoveAll(e, dx, dy) {
    let {
      isVertical,
      changeSizes
    } = this.props;
    let {
      beforeSize,
      beforeMinSize,
      afterSize,
      afterMinSize,
      beforeDivider,
      afterDivider
    } = this.boxData;
    let d = isVertical ? dy : dx;
    let newBeforeSize = beforeSize + d;
    let newAfterSize = afterSize - d; // check total min size

    if (d > 0) {
      if (newAfterSize < afterMinSize) {
        newAfterSize = afterMinSize;
        newBeforeSize = beforeSize + afterSize - afterMinSize;
      }
    } else if (newBeforeSize < beforeMinSize) {
      newBeforeSize = beforeMinSize;
      newAfterSize = beforeSize + afterSize - beforeMinSize;
    }

    changeSizes(spiltSize(newBeforeSize, beforeSize, beforeDivider).concat(spiltSize(newAfterSize, afterSize, afterDivider)));
  }

  render() {
    let {
      className
    } = this.props;

    if (!className) {
      className = 'dock-divider';
    }

    return react_1.default.createElement(DragDropDiv_1.DragDropDiv, {
      className: className,
      onDragStartT: this.startDrag,
      onDragMoveT: this.dragMove,
      onDragEndT: this.dragEnd
    });
  }

}

exports.Divider = Divider;
},{"react":"n8MK","./dragdrop/DragDropDiv":"HyIX"}],"GMUE":[function(require,module,exports) {
"use strict";

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DockBox = void 0;

const react_1 = __importDefault(require("react"));

const DockData_1 = require("./DockData");

const Divider_1 = require("./Divider");

const DockPanel_1 = require("./DockPanel");

class DockBox extends react_1.default.PureComponent {
  constructor() {
    super(...arguments);

    this.getRef = r => {
      this._ref = r;
    };

    this.getDividerData = idx => {
      if (this._ref) {
        let {
          children,
          mode
        } = this.props.boxData;
        let nodes = this._ref.childNodes;

        if (nodes.length === children.length * 2 - 1) {
          let dividerChildren = [];

          for (let i = 0; i < children.length; ++i) {
            if (mode === 'vertical') {
              dividerChildren.push({
                size: nodes[i * 2].offsetHeight,
                minSize: children[i].minHeight
              });
            } else {
              dividerChildren.push({
                size: nodes[i * 2].offsetWidth,
                minSize: children[i].minWidth
              });
            }
          }

          return {
            element: this._ref,
            beforeDivider: dividerChildren.slice(0, idx),
            afterDivider: dividerChildren.slice(idx)
          };
        }
      }

      return null;
    };

    this.changeSizes = sizes => {
      let {
        children
      } = this.props.boxData;

      if (children.length === sizes.length) {
        for (let i = 0; i < children.length; ++i) {
          children[i].size = sizes[i];
        }

        this.forceUpdate();
      }
    };

    this.onDragEnd = () => {
      this.context.onSilentChange(null, 'move');
    };
  }

  render() {
    let {
      boxData
    } = this.props;
    let {
      minWidth,
      minHeight,
      size,
      children,
      mode,
      id
    } = boxData;
    let isVertical = mode === 'vertical';
    let childrenRender = [];

    for (let i = 0; i < children.length; ++i) {
      if (i > 0) {
        childrenRender.push(react_1.default.createElement(Divider_1.Divider, {
          idx: i,
          key: i,
          isVertical: isVertical,
          onDragEnd: this.onDragEnd,
          getDividerData: this.getDividerData,
          changeSizes: this.changeSizes
        }));
      }

      let child = children[i];

      if ('tabs' in child) {
        childrenRender.push(react_1.default.createElement(DockPanel_1.DockPanel, {
          size: child.size,
          panelData: child,
          key: child.id
        })); // render DockPanel
      } else if ('children' in child) {
        childrenRender.push(react_1.default.createElement(DockBox, {
          size: child.size,
          boxData: child,
          key: child.id
        }));
      }
    }

    let cls;

    if (mode === 'vertical') {
      cls = 'dock-box dock-vbox';
    } else {
      cls = 'dock-box dock-hbox';
    }

    return react_1.default.createElement("div", {
      ref: this.getRef,
      className: cls,
      "data-dockid": id,
      style: {
        minWidth,
        minHeight,
        flex: `${size} 1 ${size}px`
      }
    }, childrenRender);
  }

}

exports.DockBox = DockBox;
DockBox.contextType = DockData_1.DockContextType;
},{"react":"n8MK","./DockData":"zh3I","./Divider":"Lzzn","./DockPanel":"ohUB"}],"tXcC":[function(require,module,exports) {
"use strict";

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FloatBox = void 0;

const react_1 = __importDefault(require("react"));

const DockPanel_1 = require("./DockPanel");

class FloatBox extends react_1.default.PureComponent {
  render() {
    let {
      children
    } = this.props.boxData;
    let childrenRender = [];

    for (let child of children) {
      if ('tabs' in child) {
        childrenRender.push(react_1.default.createElement(DockPanel_1.DockPanel, {
          size: child.size,
          panelData: child,
          key: child.id
        }));
      }
    }

    return react_1.default.createElement("div", {
      className: 'dock-box dock-fbox'
    }, childrenRender);
  }

}

exports.FloatBox = FloatBox;
},{"react":"n8MK","./DockPanel":"ohUB"}],"EWaN":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.loadLayoutData = exports.saveLayoutData = exports.createLayoutCache = void 0;

const DockData_1 = require("./DockData");

function addPanelToCache(panelData, cache) {
  cache.panels.set(panelData.id, panelData);

  for (let tab of panelData.tabs) {
    cache.tabs.set(tab.id, tab);
  }
}

function addBoxToCache(boxData, cache) {
  for (let child of boxData.children) {
    if ('tabs' in child) {
      addPanelToCache(child, cache);
    } else if ('children' in child) {
      addBoxToCache(child, cache);
    }
  }
}

function createLayoutCache(defaultLayout) {
  let cache = {
    panels: new Map(),
    tabs: new Map()
  };

  if (defaultLayout) {
    if ('children' in defaultLayout) {
      // BoxData
      addBoxToCache(defaultLayout, cache);
    } else {
      // LayoutData
      if ('dockbox' in defaultLayout) {
        addBoxToCache(defaultLayout.dockbox, cache);
      }

      if ('floatbox' in defaultLayout) {
        addBoxToCache(defaultLayout.floatbox, cache);
      }
    }
  }

  return cache;
}

exports.createLayoutCache = createLayoutCache;

function saveLayoutData(layout, saveTab, afterPanelSaved) {
  function saveTabData(tabData) {
    if (saveTab) {
      return saveTab(tabData);
    }

    return {
      id: tabData.id
    };
  }

  function savePanelData(panelData) {
    let tabs = [];

    for (let tab of panelData.tabs) {
      let savedTab = saveTabData(tab);

      if (savedTab) {
        tabs.push(savedTab);
      }
    }

    let {
      id,
      size,
      activeId
    } = panelData;
    let savedPanel;

    if (panelData.parent.mode === 'float' || panelData.parent.mode === 'window') {
      let {
        x,
        y,
        z,
        w,
        h
      } = panelData;
      savedPanel = {
        id,
        size,
        tabs,
        activeId,
        x,
        y,
        z,
        w,
        h
      };
    } else {
      savedPanel = {
        id,
        size,
        tabs,
        activeId
      };
    }

    if (afterPanelSaved) {
      afterPanelSaved(savedPanel, panelData);
    }

    return savedPanel;
  }

  function saveBoxData(boxData) {
    let children = [];

    for (let child of boxData.children) {
      if ('tabs' in child) {
        children.push(savePanelData(child));
      } else if ('children' in child) {
        children.push(saveBoxData(child));
      }
    }

    let {
      id,
      size,
      mode
    } = boxData;
    return {
      id,
      size,
      mode,
      children
    };
  }

  return {
    dockbox: saveBoxData(layout.dockbox),
    floatbox: saveBoxData(layout.floatbox),
    windowbox: saveBoxData(layout.windowbox),
    maxbox: saveBoxData(layout.maxbox)
  };
}

exports.saveLayoutData = saveLayoutData;

function loadLayoutData(savedLayout, defaultLayout, loadTab, afterPanelLoaded) {
  var _a, _b, _c;

  let cache = createLayoutCache(defaultLayout);

  function loadTabData(savedTab) {
    if (loadTab) {
      return loadTab(savedTab);
    }

    let {
      id
    } = savedTab;

    if (cache.tabs.has(id)) {
      return cache.tabs.get(id);
    }

    return null;
  }

  function loadPanelData(savedPanel) {
    let {
      id,
      size,
      activeId,
      x,
      y,
      z,
      w,
      h
    } = savedPanel;
    let tabs = [];

    for (let savedTab of savedPanel.tabs) {
      let tabData = loadTabData(savedTab);

      if (tabData) {
        tabs.push(tabData);
      }
    }

    let panelData;

    if (w || h || x || y || z) {
      panelData = {
        id,
        size,
        activeId,
        x,
        y,
        z,
        w,
        h,
        tabs
      };
    } else {
      panelData = {
        id,
        size,
        activeId,
        tabs
      };
    }

    if (savedPanel.id === DockData_1.maximePlaceHolderId) {
      panelData.panelLock = {};
    } else if (afterPanelLoaded) {
      afterPanelLoaded(savedPanel, panelData);
    } else if (cache.panels.has(id)) {
      panelData = Object.assign(Object.assign({}, cache.panels.get(id)), panelData);
    }

    return panelData;
  }

  function loadBoxData(savedBox) {
    if (!savedBox) {
      return null;
    }

    let children = [];

    for (let child of savedBox.children) {
      if ('tabs' in child) {
        children.push(loadPanelData(child));
      } else if ('children' in child) {
        children.push(loadBoxData(child));
      }
    }

    let {
      id,
      size,
      mode
    } = savedBox;
    return {
      id,
      size,
      mode,
      children
    };
  }

  return {
    dockbox: loadBoxData(savedLayout.dockbox),
    floatbox: loadBoxData((_a = savedLayout.floatbox) !== null && _a !== void 0 ? _a : {
      mode: 'float',
      children: [],
      size: 0
    }),
    windowbox: loadBoxData((_b = savedLayout.windowbox) !== null && _b !== void 0 ? _b : {
      mode: 'window',
      children: [],
      size: 0
    }),
    maxbox: loadBoxData((_c = savedLayout.maxbox) !== null && _c !== void 0 ? _c : {
      mode: 'maximize',
      children: [],
      size: 1
    })
  };
}

exports.loadLayoutData = loadLayoutData;
},{"./DockData":"zh3I"}],"Lojd":[function(require,module,exports) {
"use strict";

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MaxBox = void 0;

const react_1 = __importDefault(require("react"));

const DockPanel_1 = require("./DockPanel");

class MaxBox extends react_1.default.PureComponent {
  render() {
    let panelData = this.props.boxData.children[0];

    if (panelData) {
      this.hidePanelData = Object.assign(Object.assign({}, panelData), {
        id: '',
        tabs: []
      });
      return react_1.default.createElement("div", {
        className: "dock-box dock-mbox dock-mbox-show"
      }, react_1.default.createElement(DockPanel_1.DockPanel, {
        size: 100,
        panelData: panelData
      }));
    } else if (this.hidePanelData) {
      // use the hiden data only once, dont keep it for too long
      let hidePanelData = this.hidePanelData;
      this.hidePanelData = null;
      return react_1.default.createElement("div", {
        className: "dock-box dock-mbox dock-mbox-hide"
      }, react_1.default.createElement(DockPanel_1.DockPanel, {
        size: 100,
        panelData: hidePanelData
      }));
    } else {
      return react_1.default.createElement("div", {
        className: "dock-box dock-mbox dock-mbox-hide"
      });
    }
  }

}

exports.MaxBox = MaxBox;
},{"react":"n8MK","./DockPanel":"ohUB"}],"iJyS":[function(require,module,exports) {
"use strict";

var __createBinding = this && this.__createBinding || (Object.create ? function (o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  Object.defineProperty(o, k2, {
    enumerable: true,
    get: function () {
      return m[k];
    }
  });
} : function (o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  o[k2] = m[k];
});

var __setModuleDefault = this && this.__setModuleDefault || (Object.create ? function (o, v) {
  Object.defineProperty(o, "default", {
    enumerable: true,
    value: v
  });
} : function (o, v) {
  o["default"] = v;
});

var __importStar = this && this.__importStar || function (mod) {
  if (mod && mod.__esModule) return mod;
  var result = {};
  if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);

  __setModuleDefault(result, mod);

  return result;
};

var __rest = this && this.__rest || function (s, e) {
  var t = {};

  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];

  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DockLayout = void 0;

const react_1 = __importDefault(require("react"));

const react_dom_1 = __importDefault(require("react-dom"));

const debounce_1 = __importDefault(require("lodash/debounce"));

const DockData_1 = require("./DockData");

const DockBox_1 = require("./DockBox");

const FloatBox_1 = require("./FloatBox");

const DockPanel_1 = require("./DockPanel");

const Algorithm = __importStar(require("./Algorithm"));

const Serializer = __importStar(require("./Serializer"));

const DragManager = __importStar(require("./dragdrop/DragManager"));

const MaxBox_1 = require("./MaxBox");

const WindowBox_1 = require("./WindowBox");

class DockPortalManager extends react_1.default.PureComponent {
  constructor() {
    super(...arguments);
    /** @ignore */

    this._caches = new Map();

    this.destroyRemovedPane = () => {
      this._pendingDestroy = null;
      let cacheRemoved = false;

      for (let [id, cache] of this._caches) {
        if (cache.owner == null) {
          this._caches.delete(id);

          cacheRemoved = true;
        }
      }

      if (cacheRemoved) {
        this.forceUpdate();
      }
    };
  }
  /** @ignore */


  getTabCache(id, owner) {
    let cache = this._caches.get(id);

    if (!cache) {
      let div = document.createElement('div');
      div.className = 'dock-pane-cache';
      cache = {
        div,
        id,
        owner
      };

      this._caches.set(id, cache);
    } else {
      cache.owner = owner;
    }

    return cache;
  }
  /** @ignore */


  removeTabCache(id, owner) {
    let cache = this._caches.get(id);

    if (cache && cache.owner === owner) {
      cache.owner = null;

      if (!this._pendingDestroy) {
        // it could be reused by another component, so let's wait
        this._pendingDestroy = setTimeout(this.destroyRemovedPane, 1);
      }
    }
  }
  /** @ignore */


  updateTabCache(id, children) {
    let cache = this._caches.get(id);

    if (cache) {
      cache.portal = react_dom_1.default.createPortal(children, cache.div, cache.id);
      this.forceUpdate();
    }
  }

}

class DockLayout extends DockPortalManager {
  constructor(props) {
    super(props);
    /** @ignore */

    this.getRef = r => {
      this._ref = r;
    };
    /** @ignore */


    this.onDragStateChange = draggingScope => {
      if (draggingScope == null) {
        DockPanel_1.DockPanel.droppingPanel = null;

        if (this.state.dropRect) {
          this.setState({
            dropRect: null
          });
        }
      }
    };

    this._onWindowResize = debounce_1.default(() => {
      let layout = this.getLayout();

      if (this._ref) {
        let newLayout = Algorithm.fixFloatPanelPos(layout, this._ref.offsetWidth, this._ref.offsetHeight);

        if (layout !== newLayout) {
          newLayout = Algorithm.fixLayoutData(newLayout); // panel parent might need a fix

          this.changeLayout(newLayout, null, 'move');
        }
      }
    }, 200);
    let {
      layout,
      defaultLayout,
      loadTab
    } = props;
    let preparedLayout;

    if (defaultLayout) {
      preparedLayout = this.prepareInitData(props.defaultLayout);
    } else if (!loadTab) {
      throw new Error('DockLayout.loadTab and DockLayout.defaultLayout should not both be undefined.');
    }

    if (layout) {
      // controlled layout
      this.state = {
        layout: DockLayout.loadLayoutData(layout, props),
        dropRect: null
      };
    } else {
      this.state = {
        layout: preparedLayout,
        dropRect: null
      };
    }

    DragManager.addDragStateListener(this.onDragStateChange);
    window.addEventListener('resize', this._onWindowResize);
  }
  /** @ignore */


  getRootElement() {
    return this._ref;
  }
  /** @ignore */


  prepareInitData(data) {
    let layout = Object.assign({}, data);
    Algorithm.fixLayoutData(layout, this.props.loadTab);
    return layout;
  }
  /** @ignore */


  getDockId() {
    return this.props.dockId || this;
  }
  /** @inheritDoc */


  getGroup(name) {
    if (name) {
      let {
        groups
      } = this.props;

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
    let layout = this.getLayout();

    if (direction === 'maximize') {
      layout = Algorithm.maximize(layout, source);
      this.panelToFocus = source.id;
    } else if (direction === 'front') {
      layout = Algorithm.moveToFront(layout, source);
    } else {
      layout = Algorithm.removeFromLayout(layout, source);
    }

    if (typeof target === 'string') {
      target = this.find(target);
    } else {
      target = Algorithm.getUpdatedObject(target); // target might change during removeTab
    }

    if (direction === 'float') {
      let newPanel = Algorithm.converToPanel(source);
      newPanel.z = Algorithm.nextZIndex(null);

      if (this.state.dropRect) {
        layout = Algorithm.floatPanel(layout, newPanel, this.state.dropRect);
      } else {
        layout = Algorithm.floatPanel(layout, newPanel);

        if (this._ref) {
          layout = Algorithm.fixFloatPanelPos(layout, this._ref.offsetWidth, this._ref.offsetHeight);
        }
      }
    } else if (direction === 'new-window') {
      let newPanel = Algorithm.converToPanel(source);
      layout = Algorithm.panelToWindow(layout, newPanel);
    } else if (target) {
      if ('tabs' in target) {
        // pandel target
        if (direction === 'middle') {
          layout = Algorithm.addTabToPanel(layout, source, target);
        } else {
          let newPanel = Algorithm.converToPanel(source);
          layout = Algorithm.dockPanelToPanel(layout, newPanel, target, direction);
        }
      } else if ('children' in target) {
        // box target
        let newPanel = Algorithm.converToPanel(source);
        layout = Algorithm.dockPanelToBox(layout, newPanel, target, direction);
      } else {
        // tab target
        layout = Algorithm.addNextToTab(layout, source, target, direction);
      }
    }

    if (layout !== this.getLayout()) {
      layout = Algorithm.fixLayoutData(layout);
      let currentTabId = null;

      if (source.hasOwnProperty('tabs')) {
        currentTabId = source.activeId;
      } else {
        // when source is tab
        currentTabId = source.id;
      }

      this.changeLayout(layout, currentTabId, direction);
    }

    this.onDragStateChange(false);
  }
  /** @inheritDoc */


  find(id, filter) {
    return Algorithm.find(this.getLayout(), id, filter);
  }
  /** @ignore */


  getLayoutSize() {
    if (this._ref) {
      return {
        width: this._ref.offsetWidth,
        height: this._ref.offsetHeight
      };
    }

    return {
      width: 0,
      height: 0
    };
  }
  /** @inheritDoc */


  updateTab(id, newTab, makeActive = true) {
    let tab = this.find(id, Algorithm.Filter.AnyTab);

    if (tab && !('tabs' in tab)) {
      let panelData = tab.parent;
      let idx = panelData.tabs.indexOf(tab);

      if (idx >= 0) {
        let {
          loadTab
        } = this.props;
        let layout = this.getLayout();
        let activeId = panelData.activeId;

        if (newTab) {
          if (loadTab && !('content' in newTab && 'title' in newTab)) {
            newTab = loadTab(newTab);
          }

          layout = Algorithm.removeFromLayout(layout, tab); // remove old tab

          panelData = Algorithm.getUpdatedObject(panelData); // panelData might change during removeTab

          layout = Algorithm.addTabToPanel(layout, newTab, panelData, idx); // add new tab

          panelData = Algorithm.getUpdatedObject(panelData); // panelData might change during addTabToPanel
        }

        if (!makeActive) {
          panelData.activeId = activeId;
          this.panelToFocus = panelData.id;
        }

        layout = Algorithm.fixLayoutData(layout);
        this.changeLayout(layout, newTab.id, 'update');
        return true;
      }
    }

    return false;
  }
  /** @inheritDoc */


  navigateToPanel(fromElement, direction) {
    if (!direction) {
      if (!fromElement) {
        fromElement = this._ref.querySelector('.dock-tab-active>.dock-tab-btn');
      }

      fromElement.focus();
      return;
    }

    let targetTab; // use panel rect when move left/right, and use tabbar rect for up/down

    let selector = direction === 'ArrowUp' || direction === 'ArrowDown' ? '.dock>.dock-bar' : '.dock-box>.dock-panel';
    let panels = Array.from(this._ref.querySelectorAll(selector));
    let currentPanel = panels.find(panel => panel.contains(fromElement));
    let currentRect = currentPanel.getBoundingClientRect();
    let matches = [];

    for (let panel of panels) {
      if (panel !== currentPanel) {
        let rect = panel.getBoundingClientRect();
        let distance = Algorithm.findNearestPanel(currentRect, rect, direction);

        if (distance >= 0) {
          matches.push({
            panel,
            rect,
            distance
          });
        }
      }
    }

    matches.sort((a, b) => a.distance - b.distance);

    for (let match of matches) {
      targetTab = match.panel.querySelector('.dock-tab-active>.dock-tab-btn');

      if (targetTab) {
        break;
      }
    }

    if (targetTab) {
      targetTab.focus();
    }
  }
  /** @ignore */


  useEdgeDrop() {
    return this.props.dropMode === 'edge';
  }
  /** @ignore */


  setDropRect(element, direction, source, event, panelSize = [300, 300]) {
    let {
      dropRect
    } = this.state;

    if (dropRect) {
      if (direction === 'remove') {
        if (dropRect.source === source) {
          this.setState({
            dropRect: null
          });
        }

        return;
      } else if (dropRect.element === element && dropRect.direction === direction && direction !== 'float') {
        // skip duplicated update except for float dragging
        return;
      }
    }

    if (!element) {
      this.setState({
        dropRect: null
      });
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
      case 'float':
        {
          let x = (event.clientX - layoutRect.left) * scaleX;
          let y = (event.clientY - layoutRect.top) * scaleY;
          top = y - 15;
          width = panelSize[0];
          height = panelSize[1];
          left = x - (width >> 1);
          break;
        }

      case 'right':
        left += width * (1 - ratio);

      case 'left':
        // tslint:disable-line no-switch-case-fall-through
        width *= ratio;
        break;

      case 'bottom':
        top += height * (1 - ratio);

      case 'top':
        // tslint:disable-line no-switch-case-fall-through
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

    this.setState({
      dropRect: {
        left,
        top,
        width,
        height,
        element,
        source,
        direction
      }
    });
  }
  /** @ignore */


  render() {
    // clear tempLayout
    this.tempLayout = null;
    let {
      style,
      maximizeTo
    } = this.props;
    let {
      layout,
      dropRect
    } = this.state;
    let dropRectStyle;

    if (dropRect) {
      let {
        element,
        direction
      } = dropRect,
          rect = __rest(dropRect, ["element", "direction"]);

      dropRectStyle = Object.assign(Object.assign({}, rect), {
        display: 'block'
      });

      if (direction === 'float') {
        dropRectStyle.transition = 'none';
      }
    }

    let maximize; // if (layout.maxbox && layout.maxbox.children.length === 1) {

    if (maximizeTo) {
      if (typeof maximizeTo === 'string') {
        maximizeTo = document.getElementById(maximizeTo);
      }

      maximize = react_dom_1.default.createPortal(react_1.default.createElement(MaxBox_1.MaxBox, {
        boxData: layout.maxbox
      }), maximizeTo);
    } else {
      maximize = react_1.default.createElement(MaxBox_1.MaxBox, {
        boxData: layout.maxbox
      });
    } // }


    let portals = [];

    for (let [key, cache] of this._caches) {
      if (cache.portal) {
        portals.push(cache.portal);
      }
    }

    return react_1.default.createElement("div", {
      ref: this.getRef,
      className: "dock-layout",
      style: style
    }, react_1.default.createElement(DockData_1.DockContextProvider, {
      value: this
    }, react_1.default.createElement(DockBox_1.DockBox, {
      size: 1,
      boxData: layout.dockbox
    }), react_1.default.createElement(FloatBox_1.FloatBox, {
      boxData: layout.floatbox
    }), react_1.default.createElement(WindowBox_1.WindowBox, {
      boxData: layout.windowbox
    }), maximize, portals), react_1.default.createElement("div", {
      className: "dock-drop-indicator",
      style: dropRectStyle
    }));
  }
  /** @ignore
   * move focus to panelToFocus
   */


  componentDidUpdate(prevProps, prevState, snapshot) {
    var _a;

    if (this.panelToFocus) {
      let panel = this._ref.querySelector(`.dock-panel[data-dockid="${this.panelToFocus}"]`);

      if (panel && !panel.contains(this._ref.ownerDocument.activeElement)) {
        (_a = panel.querySelector('.dock-bar')) === null || _a === void 0 ? void 0 : _a.focus();
      }

      this.panelToFocus = null;
    }
  }
  /** @ignore */


  componentWillUnmount() {
    window.removeEventListener('resize', this._onWindowResize);
    DragManager.removeDragStateListener(this.onDragStateChange);

    this._onWindowResize.cancel();
  }

  setLayout(layout) {
    this.tempLayout = layout;
    this.setState({
      layout
    });
  }

  getLayout() {
    return this.tempLayout || this.state.layout;
  }
  /** @ignore
   * change layout
   */


  changeLayout(layoutData, currentTabId, direction, silent = false) {
    let {
      layout,
      onLayoutChange
    } = this.props;
    let savedLayout;

    if (onLayoutChange) {
      savedLayout = Serializer.saveLayoutData(layoutData, this.props.saveTab, this.props.afterPanelSaved);
      layoutData.loadedFrom = savedLayout;
      onLayoutChange(savedLayout, currentTabId, direction);

      if (layout) {
        // if layout prop is defined, we need to force an update to make sure it's either updated or reverted back
        this.forceUpdate();
      }
    }

    if (!layout && !silent) {
      // uncontrolled layout when Props.layout is not defined
      this.setLayout(layoutData);
    }
  }
  /** @ignore
   * some layout change were handled by component silently
   * but they should still call this function to trigger onLayoutChange
   */


  onSilentChange(currentTabId = null, direction) {
    let {
      onLayoutChange
    } = this.props;

    if (onLayoutChange) {
      let layout = this.getLayout();
      this.changeLayout(layout, currentTabId, direction, true);
    }
  } // public api


  saveLayout() {
    return Serializer.saveLayoutData(this.getLayout(), this.props.saveTab, this.props.afterPanelSaved);
  }
  /**
   * load layout
   * calling this api won't trigger the [[LayoutProps.onLayoutChange]] callback
   */


  loadLayout(savedLayout) {
    this.setLayout(DockLayout.loadLayoutData(savedLayout, this.props, this._ref.offsetWidth, this._ref.offsetHeight));
  }
  /** @ignore */


  static loadLayoutData(savedLayout, props, width = 0, height = 0) {
    let {
      defaultLayout,
      loadTab,
      afterPanelLoaded
    } = props;
    let layout = Serializer.loadLayoutData(savedLayout, defaultLayout, loadTab, afterPanelLoaded);
    layout = Algorithm.fixFloatPanelPos(layout, width, height);
    layout = Algorithm.fixLayoutData(layout);
    layout.loadedFrom = savedLayout;
    return layout;
  }

  static getDerivedStateFromProps(props, state) {
    let {
      layout: layoutToLoad
    } = props;
    let {
      layout: currentLayout
    } = state;

    if (layoutToLoad && layoutToLoad !== currentLayout.loadedFrom) {
      // auto reload on layout prop change
      return {
        layout: DockLayout.loadLayoutData(layoutToLoad, props)
      };
    }

    return null;
  }

}

exports.DockLayout = DockLayout;
},{"react":"n8MK","react-dom":"NKHc","lodash/debounce":"CXfR","./DockData":"zh3I","./DockBox":"GMUE","./FloatBox":"tXcC","./DockPanel":"ohUB","./Algorithm":"wqok","./Serializer":"EWaN","./dragdrop/DragManager":"EJTb","./MaxBox":"Lojd","./WindowBox":"ObQG"}],"yQx6":[function(require,module,exports) {
"use strict";

var __rest = this && this.__rest || function (s, e) {
  var t = {};

  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];

  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DividerBox = void 0;

const react_1 = __importDefault(require("react"));

const DockData_1 = require("./DockData");

const Divider_1 = require("./Divider");

class DividerBox extends react_1.default.PureComponent {
  constructor() {
    super(...arguments);

    this.getRef = r => {
      this._ref = r;
    };

    this.getDividerData = idx => {
      if (this._ref) {
        let {
          children,
          mode
        } = this.props;
        let nodes = this._ref.childNodes;
        let length = 1;

        if (Array.isArray(children)) {
          length = children.length;
        }

        if (nodes.length === length * 2 - 1) {
          let dividerChildren = [];

          for (let i = 0; i < length; ++i) {
            if (mode === 'vertical') {
              dividerChildren.push({
                size: nodes[i * 2].offsetHeight
              });
            } else {
              dividerChildren.push({
                size: nodes[i * 2].offsetWidth
              });
            }
          }

          return {
            element: this._ref,
            beforeDivider: dividerChildren.slice(0, idx),
            afterDivider: dividerChildren.slice(idx)
          };
        }
      }

      return null;
    };

    this.changeSizes = sizes => {
      let {
        mode
      } = this.props;
      let nodes = this._ref.childNodes;

      if (nodes.length === sizes.length * 2 - 1) {
        for (let i = 0; i < sizes.length; ++i) {
          if (mode === 'vertical') {
            nodes[i * 2].style.height = `${sizes[i]}px`;
          } else {
            nodes[i * 2].style.width = `${sizes[i]}px`;
          }
        }

        this.forceUpdate();
      }
    };
  }

  render() {
    let _a = this.props,
        {
      children,
      mode,
      className
    } = _a,
        others = __rest(_a, ["children", "mode", "className"]);

    let isVertical = mode === 'vertical';
    let childrenRender = [];

    if (Array.isArray(children)) {
      for (let i = 0; i < children.length; ++i) {
        if (i > 0) {
          childrenRender.push(react_1.default.createElement(Divider_1.Divider, {
            idx: i,
            key: i,
            isVertical: isVertical,
            getDividerData: this.getDividerData,
            changeSizes: this.changeSizes
          }));
        }

        childrenRender.push(children[i]);
      }
    } else {
      childrenRender = children;
    }

    let cls;

    if (mode === 'vertical') {
      cls = 'divider-box dock-vbox';
    } else {
      cls = 'divider-box dock-hbox';
    }

    if (className) {
      cls = `${cls} ${className}`;
    }

    return react_1.default.createElement("div", Object.assign({
      ref: this.getRef,
      className: cls
    }, others), childrenRender);
  }

}

exports.DividerBox = DividerBox;
DividerBox.contextType = DockData_1.DockContextType;
},{"react":"n8MK","./DockData":"zh3I","./Divider":"Lzzn"}],"VNNP":[function(require,module,exports) {
"use strict";

var __createBinding = this && this.__createBinding || (Object.create ? function (o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  Object.defineProperty(o, k2, {
    enumerable: true,
    get: function () {
      return m[k];
    }
  });
} : function (o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  o[k2] = m[k];
});

var __exportStar = this && this.__exportStar || function (m, exports) {
  for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

__exportStar(require("./DockTabs"), exports);

__exportStar(require("./DockData"), exports);

__exportStar(require("./DockPanel"), exports);

__exportStar(require("./DockBox"), exports);

__exportStar(require("./DockLayout"), exports);

__exportStar(require("./dragdrop/DragManager"), exports);

__exportStar(require("./dragdrop/GestureManager"), exports);

__exportStar(require("./dragdrop/DragDropDiv"), exports);

__exportStar(require("./Divider"), exports);

__exportStar(require("./DividerBox"), exports);

const DockLayout_1 = require("./DockLayout");

exports.default = DockLayout_1.DockLayout;
},{"./DockTabs":"nskJ","./DockData":"zh3I","./DockPanel":"ohUB","./DockBox":"GMUE","./DockLayout":"iJyS","./dragdrop/DragManager":"EJTb","./dragdrop/GestureManager":"cItD","./dragdrop/DragDropDiv":"HyIX","./Divider":"Lzzn","./DividerBox":"yQx6"}],"a1rF":[function(require,module,exports) {
"use strict";

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.htmlTab = exports.jsxTab = void 0;

const react_1 = __importDefault(require("react"));

let name = window.location.pathname.split('/').pop();
name = name.substr(0, name.length - 5);
exports.jsxTab = {
  id: 'jsxTab',
  title: 'jsx',
  closable: true,
  content: react_1.default.createElement("iframe", {
    src: `./${name}.jsx.html`
  })
};
exports.htmlTab = {
  id: 'htmlTab',
  title: 'html',
  closable: true,
  content: react_1.default.createElement("iframe", {
    src: `./${name}.html.html`
  })
};
},{"react":"n8MK"}],"FeNK":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  React: true,
  ReactDOM: true
};
exports.ReactDOM = exports.React = void 0;

var _lib = require("../lib");

Object.keys(_lib).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _lib[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _lib[key];
    }
  });
});

var _prismTabs = require("./prism-tabs");

Object.keys(_prismTabs).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _prismTabs[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _prismTabs[key];
    }
  });
});

var _react = _interopRequireDefault(require("react"));

var _reactDom = _interopRequireDefault(require("react-dom"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const React = _react.default;
exports.React = React;
const ReactDOM = _reactDom.default;
exports.ReactDOM = ReactDOM;
},{"../lib":"VNNP","./prism-tabs":"a1rF","react":"n8MK","react-dom":"NKHc"}]},{},["FeNK"], null)