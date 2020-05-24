/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "../../dist/index.js":
/*!******************************************!*\
  !*** /Users/kamlesh/blinc/dist/index.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: !0\n}), exports.View = exports.App = void 0;\n\nfunction _slicedToArray(a, b) {\n  return _arrayWithHoles(a) || _iterableToArrayLimit(a, b) || _unsupportedIterableToArray(a, b) || _nonIterableRest();\n}\n\nfunction _nonIterableRest() {\n  throw new TypeError(\"Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.\");\n}\n\nfunction _unsupportedIterableToArray(a, b) {\n  if (a) {\n    if (\"string\" == typeof a) return _arrayLikeToArray(a, b);\n    var c = Object.prototype.toString.call(a).slice(8, -1);\n    return \"Object\" === c && a.constructor && (c = a.constructor.name), \"Map\" === c || \"Set\" === c ? Array.from(a) : \"Arguments\" === c || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(c) ? _arrayLikeToArray(a, b) : void 0;\n  }\n}\n\nfunction _arrayLikeToArray(a, b) {\n  (null == b || b > a.length) && (b = a.length);\n\n  for (var c = 0, d = Array(b); c < b; c++) d[c] = a[c];\n\n  return d;\n}\n\nfunction _iterableToArrayLimit(a, b) {\n  if (\"undefined\" != typeof Symbol && Symbol.iterator in Object(a)) {\n    var c = [],\n        d = !0,\n        e = !1,\n        f = void 0;\n\n    try {\n      for (var g, h = a[Symbol.iterator](); !(d = (g = h.next()).done) && (c.push(g.value), !(b && c.length === b)); d = !0);\n    } catch (a) {\n      e = !0, f = a;\n    } finally {\n      try {\n        d || null == h[\"return\"] || h[\"return\"]();\n      } finally {\n        if (e) throw f;\n      }\n    }\n\n    return c;\n  }\n}\n\nfunction _arrayWithHoles(a) {\n  if (Array.isArray(a)) return a;\n}\n\nvar Router = function () {\n  var a,\n      b = 0 < arguments.length && arguments[0] !== void 0 ? arguments[0] : {},\n      c = b.routes,\n      d = b.mode || null,\n      f = b.activeClass || null,\n      g = [];\n  \"history\" === d ? window.onpopstate = function (a) {\n    i(a.state.path);\n  } : window.onhashchange = function () {\n    i();\n  };\n\n  var h = function (a, b) {\n    var c = [],\n        d = a.path.replace(/([:*])(\\w+)/g, function (a, b, d) {\n      return console.log(\"full: \".concat(a, \", color: \").concat(b)), c.push(d), \"([^/]+)\";\n    }) + \"(?:/|$)\",\n        e = {},\n        f = b.match(new RegExp(d));\n    return null !== f && (e = f.slice(1, f.length).reduce(function (a, b, d) {\n      return null === a && (a = {}), a[c[d]] = b, a;\n    }, null)), a.params = e, f;\n  },\n      i = function (b) {\n    var e = c.filter(function (a) {\n      return h(a, b);\n    })[0];\n    \"history\" === d && window.history.pushState({\n      path: b\n    }, \"name\", e.path), a(e);\n  },\n      j = function (a) {\n    var b = a.target.attributes.path.value;\n    null !== f && g.forEach(function (a) {\n      a.element.classList.remove(f);\n    }), a.target.classList.add(f), i(b);\n  };\n\n  return {\n    init: function init() {\n      document.querySelectorAll(\"[path]\").forEach(function (a) {\n        a.addEventListener(\"click\", j, !1), g.push({\n          path: a.attributes.path,\n          isActive: !1,\n          element: a\n        });\n      });\n    },\n    onRouteChange: function onRouteChange(b) {\n      a = b;\n    },\n    routeTo: i\n  };\n},\n    renderElement = function (a) {\n  if (\"string\" == typeof a) return document.createTextNode(a);\n  var b = document.createElement(a.tag);\n  a.elem = b;\n\n  for (var c = 0, d = Object.entries(a.attrs); c < d.length; c++) {\n    var e = _slicedToArray(d[c], 2),\n        f = e[0],\n        g = e[1];\n\n    \"function\" == typeof g ? b.addEventListener(f.slice(2).toLowerCase(), g) : \"text\" === f ? b.textContent = g : b.setAttribute(f, g);\n  }\n\n  for (var h = 0, i = Object.entries(a.children); h < i.length; h++) {\n    var j = _slicedToArray(i[h], 2),\n        k = j[0],\n        l = j[1],\n        m = renderElement(l);\n\n    b.appendChild(m);\n  }\n\n  return b;\n},\n    diffAttribs = function (a, b, c) {\n  for (var d = function () {\n    var b = _slicedToArray(f[e], 2),\n        d = b[0],\n        g = b[1];\n\n    (a.attrs[d] == null || a.attrs[d] !== g) && c.attribs.push(function () {\n      \"function\" == typeof g ? (a.elem.removeEventListener(d.slice(2).toLowerCase(), a.attrs[d]), a.elem.addEventListener(d.slice(2).toLowerCase(), g)) : \"text\" === d ? a.elem.textContent = g : a.elem.setAttribute(d, g), a.attrs[d] = g;\n    });\n  }, e = 0, f = Object.entries(b.attrs); e < f.length; e++) d();\n\n  var g = function (d) {\n    d in b.attrs || c.attribs.push(function () {\n      a.elem.removeAttribute(d), delete a.attrs[d];\n    });\n  };\n\n  for (var h in a.attrs) g(h);\n},\n    diffKids = function (a, b, c) {\n  for (var d = Object.keys(a.children).length, e = Object.keys(b.children).length, f = d > e ? d : e, g = function (d) {\n    a.children[d] === void 0 ? c.kids.push(function () {\n      var c = renderElement(b.children[d]);\n      b.children[d].elem = c, a.children[d] = {}, Object.assign(a.children[d], b.children[d]), a.elem.appendChild(c);\n    }) : b.children[d] === void 0 ? c.kids.push(function () {\n      a.elem.removeChild(a.children[d].elem), delete a.children[d];\n    }) : diff(a, d, a.children[d], b.children[d], c);\n  }, h = 0; h < f; h++) g(h);\n},\n    diff = function (a, b, c, d, e) {\n  try {\n    if (null !== c && d === void 0) ;else {\n      if (\"string\" == typeof c || \"string\" == typeof d) return void (c !== d && e.nodes.push(function () {\n        var c = renderElement(d);\n        a.elem.childNodes[b].replaceWith(c);\n      }));\n      c.tag !== d.tag && e.nodes.push(function () {\n        var a = c.elem.parentNode,\n            b = renderElement(d);\n        a.replaceChild(b, c.elem), Object.assign(c, d), c.elem = b;\n      });\n    }\n    diffAttribs(c, d, e), diffKids(c, d, e);\n  } catch (a) {\n    console.log(a);\n  }\n},\n    diffAndPatch = function (a, b) {\n  var c = {\n    nodes: [],\n    kids: [],\n    attribs: []\n  };\n  diff({}, 0, a, b, c), c.nodes.forEach(function (a) {\n    a();\n  }), c.attribs.forEach(function (a) {\n    a();\n  }), c.kids.forEach(function (a) {\n    a();\n  });\n},\n    View = function () {\n  var a,\n      b,\n      c = 0 < arguments.length && arguments[0] !== void 0 ? arguments[0] : {},\n      d = c.update,\n      e = c.view,\n      f = c.init ? c.init[0] : null,\n      g = c.init ? 1 < c.init.length ? c.init[1] : null : null,\n      h = function (b) {\n    var c = e(b, i);\n    Object.assign(f, b), diffAndPatch(a, c);\n  },\n      i = function (a) {\n    var b = d(a, f),\n        c = b[1];\n    c && c(i), h(b[0]);\n  },\n      j = function (c) {\n    g && g(i), a = f ? e(f, i) : e(), b = renderElement(a), 0 < c.childNodes.length ? c.replaceChild(b, c.childNodes[0]) : c.appendChild(b);\n  };\n\n  return {\n    mount: j\n  };\n};\n\nexports.View = View;\n\nvar App = function () {\n  var a = 0 < arguments.length && arguments[0] !== void 0 ? arguments[0] : {},\n      b = a.state || null,\n      c = a.reducer || null,\n      d = a.navbar || null,\n      e = a.footer || null,\n      f = a.main || null,\n      g = Router(f),\n      h = function () {\n    var a = document.createElement(\"header\");\n    document.body.appendChild(a), View(d()).mount(a);\n  },\n      i = function () {\n    var a = document.createElement(\"main\");\n    document.body.appendChild(a), g.init(), g.onRouteChange(function (b) {\n      View(b.view()).mount(a);\n    });\n  },\n      j = function () {\n    var a = document.createElement(\"footer\");\n    document.body.appendChild(a), View(e()).mount(a);\n  };\n\n  return {\n    run: function run() {\n      d && h(), i(), e && j(), g.routeTo(\"/\");\n    }\n  };\n};\n\nexports.App = App;\n\n//# sourceURL=webpack:////Users/kamlesh/blinc/dist/index.js?");

/***/ }),

/***/ "../../dist/tags/index.js":
/*!***********************************************!*\
  !*** /Users/kamlesh/blinc/dist/tags/index.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: !0\n}), exports.setFieldValues = setFieldValues;\n\nfunction ownKeys(a, b) {\n  var c = Object.keys(a);\n\n  if (Object.getOwnPropertySymbols) {\n    var d = Object.getOwnPropertySymbols(a);\n    b && (d = d.filter(function (b) {\n      return Object.getOwnPropertyDescriptor(a, b).enumerable;\n    })), c.push.apply(c, d);\n  }\n\n  return c;\n}\n\nfunction _objectSpread(a) {\n  for (var b, c = 1; c < arguments.length; c++) b = null == arguments[c] ? {} : arguments[c], c % 2 ? ownKeys(Object(b), !0).forEach(function (c) {\n    _defineProperty(a, c, b[c]);\n  }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(a, Object.getOwnPropertyDescriptors(b)) : ownKeys(Object(b)).forEach(function (c) {\n    Object.defineProperty(a, c, Object.getOwnPropertyDescriptor(b, c));\n  });\n\n  return a;\n}\n\nfunction _defineProperty(a, b, c) {\n  return b in a ? Object.defineProperty(a, b, {\n    value: c,\n    enumerable: !0,\n    configurable: !0,\n    writable: !0\n  }) : a[b] = c, a;\n}\n\nvar tags = \"a,abbr,address,area,article,aside,audio,b,base,bdi,bdo,big,blockquote,body,br,button,canvas,caption,cite,code,col,colgroup,data,datalist,dd,del,details,dfn,dialog,div,dl,dt,em,embed,fieldset,figcaption,figure,footer,form,h1,h2,h3,h4,h5,h6,head,header,hgroup,hr,html,i,iframe,img,input,ins,kbd,keygen,label,legend,li,link,main,map,mark,marquee,menu,menuitem,meta,meter,nav,noscript,object,ol,optgroup,option,output,p,param,picture,pre,progress,q,rp,rt,ruby,s,samp,script,section,select,small,source,span,strong,style,sub,summary,sup,table,tbody,td,textarea,tfoot,th,thead,time,title,tr,track,u,ul,var,video,wbr,circle,clipPath,defs,ellipse,foreignObject,g,image,line,linearGradient,marker,mask,path,pattern,polygon,polyline,radialGradient,rect,stop,svg,text,tspan\";\n\"a,abbr,address,area,article,aside,audio,b,base,bdi,bdo,big,blockquote,body,br,button,canvas,caption,cite,code,col,colgroup,data,datalist,dd,del,details,dfn,dialog,div,dl,dt,em,embed,fieldset,figcaption,figure,footer,form,h1,h2,h3,h4,h5,h6,head,header,hgroup,hr,html,i,iframe,img,input,ins,kbd,keygen,label,legend,li,link,main,map,mark,marquee,menu,menuitem,meta,meter,nav,noscript,object,ol,optgroup,option,output,p,param,picture,pre,progress,q,rp,rt,ruby,s,samp,script,section,select,small,source,span,strong,style,sub,summary,sup,table,tbody,td,textarea,tfoot,th,thead,time,title,tr,track,u,ul,var,video,wbr,circle,clipPath,defs,ellipse,foreignObject,g,image,line,linearGradient,marker,mask,path,pattern,polygon,polyline,radialGradient,rect,stop,svg,text,tspan\".split(\",\").forEach(function (a) {\n  exports[a] = function (b, c) {\n    var d = c ? _objectSpread({}, c) : {};\n    return {\n      tag: a,\n      attrs: b || {},\n      children: d || {}\n    };\n  };\n});\n\nfunction setFieldValues() {\n  var a = 0 < arguments.length && arguments[0] !== void 0 ? arguments[0] : {},\n      b = a;\n  return {\n    fields: b,\n    setValue: function setValue() {\n      b[event.target.id] = event.target.value;\n    }\n  };\n}\n\n//# sourceURL=webpack:////Users/kamlesh/blinc/dist/tags/index.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _dist___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../dist/ */ \"../../dist/index.js\");\n/* harmony import */ var _dist___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_dist___WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _dist_tags__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../dist/tags */ \"../../dist/tags/index.js\");\n/* harmony import */ var _dist_tags__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_dist_tags__WEBPACK_IMPORTED_MODULE_1__);\n\n\n\nconst Todo = () => {\n  let init = [0];\n\n  const update = () => {};\n\n  const view = (state, dispatch) => {\n    return Object(_dist_tags__WEBPACK_IMPORTED_MODULE_1__[\"div\"])({}, [Object(_dist_tags__WEBPACK_IMPORTED_MODULE_1__[\"label\"])({\n      text: 'Hello World!!'\n    })]);\n  };\n\n  return {\n    init,\n    update,\n    view\n  };\n};\n\nlet view = Object(_dist___WEBPACK_IMPORTED_MODULE_0__[\"View\"])(Todo());\nlet $node = document.body;\nview.mount($node);\nvar d = Object(_dist_tags__WEBPACK_IMPORTED_MODULE_1__[\"label\"])({\n  text: 'Hello   Universe !!'\n});\nconsole.log(d);\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ })

/******/ });