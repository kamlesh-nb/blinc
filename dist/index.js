"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.View = exports.App = void 0;

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

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