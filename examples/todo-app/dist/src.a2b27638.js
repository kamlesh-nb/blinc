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
})({"../../dist/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.View = exports.App = void 0;

function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }

  return arr2;
}

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

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

var Router = function Router() {
  var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var routes = config.routes;
  var mode = config.mode || null;
  var activeClass = config.activeClass || null;
  var links = [];
  var listener;

  if (mode === "history") {
    window.onpopstate = function (event) {
      routeTo(event.state.path);
    };
  } else {
    window.onhashchange = function (event) {
      routeTo();
    };
  }

  var match = function match(route, requestPath) {
    var paramNames = [];
    var regexPath = route.path.replace(/([:*])(\w+)/g, function (full, colon, name) {
      console.log("full: ".concat(full, ", color: ").concat(colon));
      paramNames.push(name);
      return "([^/]+)";
    }) + "(?:/|$)";
    var params = {};
    var routeMatch = requestPath.match(new RegExp(regexPath));

    if (routeMatch !== null) {
      params = routeMatch.slice(1, routeMatch.length).reduce(function (params, value, index) {
        if (params === null) params = {};
        params[paramNames[index]] = value;
        return params;
      }, null);
    }

    route["params"] = params;
    return routeMatch;
  };

  var routeTo = function routeTo(path) {
    var route = routes.filter(function (route) {
      return match(route, path);
    })[0];

    if (mode === "history") {
      window.history.pushState({
        path: path
      }, "name", route.path);
    } else {}

    listener(route);
  };

  var navigate = function navigate(e) {
    var path = e.target.attributes["path"].value;

    if (activeClass !== null) {
      links.forEach(function (key) {
        key.element.classList.remove(activeClass);
      });
    }

    e.target.classList.add(activeClass);
    routeTo(path);
  };

  var init = function init() {
    document.querySelectorAll("[path]").forEach(function (link) {
      link.addEventListener("click", navigate, false);
      links.push({
        path: link.attributes["path"],
        isActive: false,
        element: link
      });
    });
  };

  var onRouteChange = function onRouteChange(func) {
    listener = func;
  };

  return {
    init: init,
    onRouteChange: onRouteChange,
    routeTo: routeTo
  };
};

var renderElement = function renderElement(vNode) {
  if (typeof vNode === "string") {
    return document.createTextNode(vNode);
  }

  var $el = document.createElement(vNode.tag);
  vNode["elem"] = $el;

  for (var _i = 0, _Object$entries = Object.entries(vNode.attrs); _i < _Object$entries.length; _i++) {
    var _Object$entries$_i = _slicedToArray(_Object$entries[_i], 2),
        k = _Object$entries$_i[0],
        v = _Object$entries$_i[1];

    if (typeof v === "function") {
      $el.addEventListener(k.slice(2), v);
    } else {
      if (k === "text") {
        $el.textContent = v;
      } else {
        $el.setAttribute(k, v);
      }
    }
  }

  for (var _i2 = 0, _Object$entries2 = Object.entries(vNode.children); _i2 < _Object$entries2.length; _i2++) {
    var _Object$entries2$_i = _slicedToArray(_Object$entries2[_i2], 2),
        _k = _Object$entries2$_i[0],
        kid = _Object$entries2$_i[1];

    var $child = renderElement(kid);
    $el.appendChild($child);
  }

  return $el;
};

var diffAttribs = function diffAttribs(oNode, nNode, patches) {
  var _loop = function _loop() {
    var _Object$entries3$_i = _slicedToArray(_Object$entries3[_i3], 2),
        k = _Object$entries3$_i[0],
        v = _Object$entries3$_i[1];

    if (oNode.attrs[k] == undefined || oNode.attrs[k] !== v) {
      patches["attribs"].push(function () {
        if (typeof v !== "function") {
          if (k === "text") {
            oNode.elem.textContent = v;
          } else {
            oNode.elem.setAttribute(k, v);
          }
        } else {
          oNode.elem.removeEventListener(k.slice(2), oNode.attrs[k]);
          oNode.elem.addEventListener(k.slice(2), v);
        }

        oNode.attrs[k] = v;
      });
    }
  };

  for (var _i3 = 0, _Object$entries3 = Object.entries(nNode.attrs); _i3 < _Object$entries3.length; _i3++) {
    _loop();
  }

  var _loop2 = function _loop2(k) {
    if (!(k in nNode.attrs)) {
      patches["attribs"].push(function () {
        oNode.elem.removeAttribute(k);
        delete oNode.attrs[k];
      });
    }
  };

  for (var k in oNode.attrs) {
    _loop2(k);
  }
};

var diffKids = function diffKids(oNode, nNode, patches) {
  var xLen = Object.keys(oNode.children).length;
  var yLen = Object.keys(nNode.children).length;
  var len = xLen > yLen ? xLen : yLen;

  var _loop3 = function _loop3(i) {
    if (oNode.children[i] === undefined) {
      patches["kids"].push(function () {
        var $el = renderElement(nNode.children[i]);
        nNode.children[i]["elem"] = $el;
        oNode.children[i] = {};
        Object.assign(oNode.children[i], nNode.children[i]);
        oNode.elem.appendChild($el);
      });
    } else if (nNode.children[i] === undefined) {
      patches["kids"].push(function () {
        oNode.elem.removeChild(oNode.children[i].elem);
        delete oNode.children[i];
      });
    } else {
      diff(oNode, i, oNode.children[i], nNode.children[i], patches);
    }
  };

  for (var i = 0; i < len; i++) {
    _loop3(i);
  }
};

var diff = function diff(parent, index, vOldNode, vNewNode, patches) {
  if (vOldNode !== null && vNewNode === undefined) {} else if (typeof vOldNode === "string" || typeof vNewNode === "string") {
    if (vOldNode !== vNewNode) {
      patches["nodes"].push(function () {
        var $text = renderElement(vNewNode);
        parent.elem.childNodes[index].replaceWith($text);
      });
    }

    return;
  } else if (vOldNode.tag !== vNewNode.tag) {
    patches["nodes"].push(function () {
      var $parent = vOldNode.elem.parentNode;
      var $newNode = renderElement(vNewNode);
      $parent.replaceChild($newNode, vOldNode.elem);
      Object.assign(vOldNode, vNewNode);
      vOldNode.elem = $newNode;
    });
  }

  diffAttribs(vOldNode, vNewNode, patches);
  diffKids(vOldNode, vNewNode, patches);
};

var diffAndPatch = function diffAndPatch(vOldNode, vNewNode) {
  var patches = {
    nodes: [],
    kids: [],
    attribs: []
  };
  diff({}, 0, vOldNode, vNewNode, patches);
  patches["nodes"].forEach(function (patch) {
    patch();
  });
  patches["attribs"].forEach(function (patch) {
    patch();
  });
  patches["kids"].forEach(function (patch) {
    patch();
  });
};

var View = function View() {
  var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var vOldDom;
  var $viewNode;
  var update = props.update;
  var view = props.view;
  var oState = props.init ? props.init[0] : null;
  var effect = props.init ? props.init.length > 1 ? props.init[1] : null : null;

  var applyState = function applyState(nState) {
    var vNewDom = view(nState, dispatch);
    diffAndPatch(vOldDom, vNewDom);
    Object.assign(oState, nState);
  };

  var dispatch = function dispatch(msg) {
    var nState = update(msg, oState);
    var command = nState[1];

    if (command) {
      if (command[1]) {
        command[0](command[1], dispatch);
      } else {
        command[0](dispatch);
      }
    } else {
      applyState(nState[0]);
    }
  };

  var mount = function mount($node) {
    if (effect) {
      effect(dispatch);
    }

    vOldDom = oState ? view(oState, dispatch) : view();
    $viewNode = renderElement(vOldDom);

    if ($node.childNodes.length > 0) {
      $node.replaceChild($viewNode, $node.childNodes[0]);
    } else {
      $node.appendChild($viewNode);
    }
  };

  return {
    mount: mount
  };
};

exports.View = View;

var App = function App() {
  var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var state = props.state || null;
  var update = props.update || null;
  var navbar = props.navbar || null;
  var footer = props.footer || null;
  var main = props.main || null;
  var router = Router(main);

  var _initHeader = function _initHeader() {
    var $header = document.createElement("header");
    document.body.appendChild($header);
    View(navbar()).mount($header);
  };

  var _initMain = function _initMain() {
    var $main = document.createElement("main");
    document.body.appendChild($main);
    router.init();
    router.onRouteChange(function (route) {
      View(route.view()).mount($main);
    });
  };

  var _initFooter = function _initFooter() {
    var $footer = document.createElement("footer");
    document.body.appendChild($footer);
    View(footer()).mount($footer);
  };

  var run = function run() {
    if (navbar) _initHeader();

    _initMain();

    if (footer) _initFooter();
    router.routeTo("/");
  };

  return {
    run: run
  };
};

exports.App = App;
},{}],"../../dist/tags/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setFieldValues = setFieldValues;

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
        _defineProperty(target, key, source[key]);
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

var tags = "a,abbr,address,area,article,aside,audio,b,base,bdi,bdo,big,blockquote,body,br,button,canvas,caption,cite,code,col,colgroup,data,datalist,dd,del,details,dfn,dialog,div,dl,dt,em,embed,fieldset,figcaption,figure,footer,form,h1,h2,h3,h4,h5,h6,head,header,hgroup,hr,html,i,iframe,img,input,ins,kbd,keygen,label,legend,li,link,main,map,mark,marquee,menu,menuitem,meta,meter,nav,noscript,object,ol,optgroup,option,output,p,param,picture,pre,progress,q,rp,rt,ruby,s,samp,script,section,select,small,source,span,strong,style,sub,summary,sup,table,tbody,td,textarea,tfoot,th,thead,time,title,tr,track,u,ul,var,video,wbr,circle,clipPath,defs,ellipse,foreignObject,g,image,line,linearGradient,marker,mask,path,pattern,polygon,polyline,radialGradient,rect,stop,svg,text,tspan";
tags.split(',').forEach(function (tag) {
  exports[tag] = function (attrs, children) {
    var kids = children ? _objectSpread({}, children) : {};
    return {
      tag: tag,
      attrs: attrs || {},
      children: kids || {}
    };
  };
});

function setFieldValues() {
  var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var fields = props;

  var setValue = function setValue(event) {
    fields[event.target.id] = event.target.value;
  };

  return {
    fields: fields,
    setValue: setValue
  };
}
},{}],"src/messages/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.titleToUpper = exports.sendCmd = exports.removeTodo = exports.clearAll = exports.addTodo = void 0;

var addTodo = function addTodo(todo) {
  return {
    type: "ADD",
    payload: todo
  };
};

exports.addTodo = addTodo;

var clearAll = function clearAll() {
  return {
    type: "CLEAR"
  };
};

exports.clearAll = clearAll;

var removeTodo = function removeTodo(index) {
  return {
    type: "DEL",
    payload: index
  };
};

exports.removeTodo = removeTodo;

var sendCmd = function sendCmd(id) {
  return {
    type: "CMD",
    payload: {
      id: id
    }
  };
};

exports.sendCmd = sendCmd;

var titleToUpper = function titleToUpper(id) {
  return {
    type: "TO_UPPER",
    payload: {
      id: id
    }
  };
};

exports.titleToUpper = titleToUpper;
},{}],"src/effects/commands/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.testCmd = void 0;

var _messages = require("../../messages");

var testCmd = function testCmd(param, dispatch) {
  console.log("cmd called with param: ".concat(param));
  dispatch((0, _messages.titleToUpper)(param.id));
};

exports.testCmd = testCmd;
},{"../../messages":"src/messages/index.js"}],"src/index.js":[function(require,module,exports) {
"use strict";

var _dist = require("../../../dist/");

var _tags = require("../../../dist/tags");

var _messages = require("./messages");

var _commands = require("./effects/commands");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var initialState = {
  editText: "",
  uid: 0,
  todos: []
};

var Todo = function Todo(props) {
  var init = [initialState];

  var update = function update(msg, state) {
    switch (msg.type) {
      case "ADD":
        return [Object.assign({}, state, {
          uid: state.uid + 1,
          todos: state.todos.concat(_objectSpread({
            id: state.uid + 1
          }, msg.payload))
        })];

      case "CLEAR":
        return [Object.assign({}, state, {
          todos: []
        })];

      case "DEL":
        return [Object.assign({}, state, {
          todos: state.todos.filter(function (k) {
            return k.id !== msg.payload;
          })
        })];

      case 'CMD':
        return [state, [_commands.testCmd, msg.payload]];

      case 'TO_UPPER':
        return [Object.assign({}, state, {
          todos: state.todos.map(function (todo) {
            return todo.id == msg.payload.id ? {
              id: todo.id,
              title: todo.title.toUpperCase()
            } : todo;
          })
        })];

      default:
        return [state];
    }
  };

  var view = function view(state, dispatch) {
    var _setFieldValues = (0, _tags.setFieldValues)(),
        fields = _setFieldValues.fields,
        setValue = _setFieldValues.setValue;

    return (0, _tags.div)({
      class: "container"
    }, [(0, _tags.h2)({
      text: "Blinc To Do"
    }), state.todos.length == 0 ? (0, _tags.label)({
      text: "There's nothing you can do at the moment..."
    }) : (0, _tags.span)({
      text: "Total Todos: ".concat(state.todos.length)
    }), (0, _tags.hr)(), (0, _tags.div)({
      class: "row"
    }, [(0, _tags.div)({
      class: "col-md-10"
    }, [(0, _tags.input)({
      id: "title",
      class: "form-control",
      onchange: setValue
    })]), (0, _tags.div)({
      class: "col-md-1"
    }, [(0, _tags.button)({
      id: "add",
      class: "btn btn-primary",
      text: "Add",
      onclick: function onclick(e) {
        dispatch((0, _messages.addTodo)(fields));
      }
    })]), (0, _tags.div)({
      class: "col-md-1"
    }, [(0, _tags.button)({
      id: "clear",
      class: "btn btn-primary",
      text: "Clear",
      onclick: function onclick() {
        dispatch((0, _messages.clearAll)());
      }
    })])]), (0, _tags.hr)(), (0, _tags.ul)({
      class: "list-group",
      id: "list"
    }, state.todos.map(function (v, k) {
      return (0, _tags.li)({
        class: "list-group-item",
        key: v.id
      }, [(0, _tags.div)({
        class: "row"
      }, [(0, _tags.div)({
        class: "col-md-1"
      }, [(0, _tags.span)({
        text: v.id
      })]), (0, _tags.div)({
        class: "col-md-7"
      }, [(0, _tags.span)({
        text: v.title
      })]), (0, _tags.div)({
        class: "col-md-2"
      }, [(0, _tags.button)({
        class: "btn btn-danger",
        id: "del",
        onclick: function onclick(e) {
          dispatch((0, _messages.removeTodo)(v.id));
        },
        text: "Delete To Do   "
      }, [(0, _tags.i)({
        class: "far fa-trash-alt"
      })])]), (0, _tags.div)({
        class: "col-md-2"
      }, [(0, _tags.button)({
        class: "btn btn-success",
        id: "cmd",
        onclick: function onclick(e) {
          dispatch((0, _messages.sendCmd)(v.id));
        },
        text: "Cmd Test"
      }, [(0, _tags.i)({
        class: "far fa-trash"
      })])])])]);
    }))]);
  };

  return {
    init: init,
    update: update,
    view: view
  };
};

var view = (0, _dist.View)(Todo());
var $node = document.body;
view.mount($node);
},{"../../../dist/":"../../dist/index.js","../../../dist/tags":"../../dist/tags/index.js","./messages":"src/messages/index.js","./effects/commands":"src/effects/commands/index.js"}],"node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "56564" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["node_modules/parcel-bundler/src/builtins/hmr-runtime.js","src/index.js"], null)
//# sourceMappingURL=/src.a2b27638.js.map