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
})({"CSru":[function(require,module,exports) {
var bundleURL = null;

function getBundleURLCached() {
  if (!bundleURL) {
    bundleURL = getBundleURL();
  }

  return bundleURL;
}

function getBundleURL() {
  // Attempt to find the URL of the current script and use that as the base URL
  try {
    throw new Error();
  } catch (err) {
    var matches = ('' + err.stack).match(/(https?|file|ftp|chrome-extension|moz-extension):\/\/[^)\n]+/g);

    if (matches) {
      return getBaseURL(matches[0]);
    }
  }

  return '/';
}

function getBaseURL(url) {
  return ('' + url).replace(/^((?:https?|file|ftp|chrome-extension|moz-extension):\/\/.+)\/[^/]+$/, '$1') + '/';
}

exports.getBundleURL = getBundleURLCached;
exports.getBaseURL = getBaseURL;
},{}],"Cm3W":[function(require,module,exports) {
var getBundleURL = require('./bundle-url').getBundleURL;

function loadBundlesLazy(bundles) {
  if (!Array.isArray(bundles)) {
    bundles = [bundles];
  }

  var id = bundles[bundles.length - 1];

  try {
    return Promise.resolve(require(id));
  } catch (err) {
    if (err.code === 'MODULE_NOT_FOUND') {
      return new LazyPromise(function (resolve, reject) {
        loadBundles(bundles.slice(0, -1)).then(function () {
          return require(id);
        }).then(resolve, reject);
      });
    }

    throw err;
  }
}

function loadBundles(bundles) {
  return Promise.all(bundles.map(loadBundle));
}

var bundleLoaders = {};

function registerBundleLoader(type, loader) {
  bundleLoaders[type] = loader;
}

module.exports = exports = loadBundlesLazy;
exports.load = loadBundles;
exports.register = registerBundleLoader;
var bundles = {};

function loadBundle(bundle) {
  var id;

  if (Array.isArray(bundle)) {
    id = bundle[1];
    bundle = bundle[0];
  }

  if (bundles[bundle]) {
    return bundles[bundle];
  }

  var type = (bundle.substring(bundle.lastIndexOf('.') + 1, bundle.length) || bundle).toLowerCase();
  var bundleLoader = bundleLoaders[type];

  if (bundleLoader) {
    return bundles[bundle] = bundleLoader(getBundleURL() + bundle).then(function (resolved) {
      if (resolved) {
        module.bundle.register(id, resolved);
      }

      return resolved;
    }).catch(function (e) {
      delete bundles[bundle];
      throw e;
    });
  }
}

function LazyPromise(executor) {
  this.executor = executor;
  this.promise = null;
}

LazyPromise.prototype.then = function (onSuccess, onError) {
  if (this.promise === null) this.promise = new Promise(this.executor);
  return this.promise.then(onSuccess, onError);
};

LazyPromise.prototype.catch = function (onError) {
  if (this.promise === null) this.promise = new Promise(this.executor);
  return this.promise.catch(onError);
};
},{"./bundle-url":"CSru"}],"vjXQ":[function(require,module,exports) {
require("_bundle_loader")(require.resolve('./shared-import')).then(({
  React,
  ReactDOM,
  jsxTab,
  htmlTab,
  DockLayout
}) => {
  let groups = {
    allowWindow: {
      floatable: true,
      newWindow: true,
      maximizable: true
    }
  };

  class InputTab extends React.PureComponent {
    onChange = e => {
      this.props.tabData.inputValue = e.target.value;
      this.forceUpdate();
    };

    render() {
      return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", null, "input value will be saved"), /*#__PURE__*/React.createElement("input", {
        style: {
          width: '100%'
        },
        onChange: this.onChange,
        value: this.props.tabData.inputValue
      }));
    }

    static create(tabData) {
      return /*#__PURE__*/React.createElement(InputTab, {
        tabData: tabData
      });
    }

  }

  let tab0 = {
    id: 'tab0',
    title: 'tab0',
    content: /*#__PURE__*/React.createElement("div", null, "This tab will be added back to main panel every time you load layout.")
  };

  class Demo extends React.Component {
    getRef = r => {
      this.dockLayout = r;
    };
    state = {
      saved: null
    };
    defaultLayout = {
      dockbox: {
        mode: 'horizontal',
        children: [{
          size: 200,
          tabs: [{
            id: 'tab1'
          }, {
            id: 'tab2'
          }]
        }, {
          id: 'main-panel',
          size: 400,
          tabs: [{
            id: 'tab0'
          }, {
            id: 'jsxTab'
          }, {
            id: 'htmlTab'
          }],
          panelLock: {
            panelStyle: 'main'
          }
        }, {
          size: 200,
          tabs: [{
            id: 'tab5'
          }, {
            id: 'tab6'
          }]
        }]
      }
    };
    saveTab = tabData => {
      let {
        id,
        inputValue
      } = tabData; // add inputValue from saved data;

      if (id === 'tab0') {
        return null;
      }

      return {
        id,
        inputValue
      };
    };
    loadTab = savedTab => {
      let id = savedTab.id;

      switch (id) {
        case 'tab0':
          return tab0;

        case 'jsxTab':
          return jsxTab;

        case 'htmlTab':
          return htmlTab;

        default:
          return {
            id,
            title: id,
            content: InputTab.create,
            inputValue: savedTab.inputValue,
            group: 'allowWindow'
          };
      }
    }; // add tab0 to the main panel

    afterPanelLoaded = (savedPanel, panelData) => {
      let id = savedPanel.id;

      if (id === 'main-panel') {
        panelData.panelLock = {
          panelStyle: 'main'
        };
        panelData.tabs.unshift({ ...tab0
        });
      }
    };

    render() {
      return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(DockLayout, {
        ref: this.getRef,
        defaultLayout: this.defaultLayout,
        groups: groups,
        saveTab: this.saveTab,
        loadTab: this.loadTab,
        afterPanelLoaded: this.afterPanelLoaded,
        style: {
          position: 'absolute',
          left: 10,
          top: 60,
          right: 10,
          bottom: 10
        }
      }), /*#__PURE__*/React.createElement("div", {
        className: "top-panel"
      }, /*#__PURE__*/React.createElement("button", {
        className: "btn",
        style: {
          marginRight: 20
        },
        onClick: () => this.setState({
          saved: this.dockLayout.saveLayout()
        })
      }, "Save Layout"), /*#__PURE__*/React.createElement("button", {
        className: "btn",
        disabled: this.state.saved == null,
        onClick: () => this.dockLayout.loadLayout(this.state.saved)
      }, "Load Layout")));
    }

  }

  ReactDOM.render( /*#__PURE__*/React.createElement(Demo, null), document.getElementById('app'));
});
},{"_bundle_loader":"Cm3W","./shared-import":[["shared-import.js","FeNK"],"FeNK"]}],"W28G":[function(require,module,exports) {
module.exports = function loadJSBundle(bundle) {
  return new Promise(function (resolve, reject) {
    var script = document.createElement('script');
    script.async = true;
    script.type = 'text/javascript';
    script.charset = 'utf-8';
    script.src = bundle;

    script.onerror = function (e) {
      script.onerror = script.onload = null;
      reject(e);
    };

    script.onload = function () {
      script.onerror = script.onload = null;
      resolve();
    };

    document.getElementsByTagName('head')[0].appendChild(script);
  });
};
},{}],0:[function(require,module,exports) {
var b=require("Cm3W");b.register("js",require("W28G"));
},{}]},{},[0,"vjXQ"], null)