const Router = (config = {}) => {
  let routes = config.routes;
  let mode = config.mode || null;
  let activeClass = config.activeClass || null;
  let links = [];
  let listener;

  if (mode === "history") {
    window.onpopstate = (event) => {
      routeTo(event.state.path);
    };
  } else {
    window.onhashchange = (event) => {
      routeTo();
    };
  }

  const match = (route, requestPath) => {
    let paramNames = [];
    let regexPath =
      route.path.replace(/([:*])(\w+)/g, (full, colon, name) => {
        console.log(`full: ${full}, color: ${colon}`);
        paramNames.push(name);
        return "([^/]+)";
      }) + "(?:/|$)";

    let params = {};

    let routeMatch = requestPath.match(new RegExp(regexPath));
    if (routeMatch !== null) {
      params = routeMatch
        .slice(1, routeMatch.length)
        .reduce((params, value, index) => {
          if (params === null) params = {};
          params[paramNames[index]] = value;
          return params;
        }, null);
    }
    route["params"] = params;
    return routeMatch;
  };

  const routeTo = (path) => {
    const route = routes.filter((route) => match(route, path))[0];
    if (mode === "history") {
      window.history.pushState({ path: path }, "name", route.path);
    } else {
    }
    listener(route);
  };

  const navigate = (e) => {
    var path = e.target.attributes["path"].value;
    if (activeClass !== null) {
      links.forEach((key) => {
        key.element.classList.remove(activeClass);
      });
    }
    e.target.classList.add(activeClass);
    routeTo(path);
  };

  const init = () => {
    document.querySelectorAll("[path]").forEach((link) => {
      link.addEventListener("click", navigate, false);
      links.push({
        path: link.attributes["path"],
        isActive: false,
        element: link,
      });
    });
  };

  const onRouteChange = (func) => {
    listener = func;
  };

  return { init, onRouteChange, routeTo };
};

const renderElement = (vNode) => {
  if (typeof vNode === "string") {
    return document.createTextNode(vNode);
  }

  const $el = document.createElement(vNode.tag);
  vNode["elem"] = $el;

  for (const [k, v] of Object.entries(vNode.attrs)) {
    if (typeof v === "function") {
      $el.addEventListener(k.slice(2).toLowerCase(), v);
    } else {
      if (k === "text") {
        $el.textContent = v;
      } else {
        $el.setAttribute(k, v);
      }
    }
  }

  for (const [k, kid] of Object.entries(vNode.children)) {
    var $child = renderElement(kid);
    $el.appendChild($child);
  }
  return $el;
};

const diffAttribs = (oNode, nNode, patches) => {
  for (const [k, v] of Object.entries(nNode.attrs)) {
    if (oNode.attrs[k] == undefined || oNode.attrs[k] !== v) {
      patches["attribs"].push(() => {
        if (typeof v !== "function") {
          if (k === "text") {
            oNode.elem.textContent = v;
          } else {
            oNode.elem.setAttribute(k, v);
          }
        } else {
          oNode.elem.removeEventListener(
            k.slice(2).toLowerCase(),
            oNode.attrs[k]
          );
          oNode.elem.addEventListener(k.slice(2).toLowerCase(), v);
        }
        oNode.attrs[k] = v;
      });
    }
  }

  for (const k in oNode.attrs) {
    if (!(k in nNode.attrs)) {
      patches["attribs"].push(() => {
        oNode.elem.removeAttribute(k);
        delete oNode.attrs[k];
      });
    }
  }
};

const diffKids = (oNode, nNode, patches) => {
  let xLen = Object.keys(oNode.children).length;
  let yLen = Object.keys(nNode.children).length;

  let len = xLen > yLen ? xLen : yLen;

  for (let i = 0; i < len; i++) {
    if (oNode.children[i] === undefined) {
      patches["kids"].push(() => {
        let $el = renderElement(nNode.children[i]);
        nNode.children[i]["elem"] = $el;
        oNode.children[i] = {};
        Object.assign(oNode.children[i], nNode.children[i]);
        oNode.elem.appendChild($el);
      });
    } else if (nNode.children[i] === undefined) {
      patches["kids"].push(() => {
        oNode.elem.removeChild(oNode.children[i].elem);
        delete oNode.children[i];
      });
    } else {
      diff(oNode, i, oNode.children[i], nNode.children[i], patches);
    }
  }
};

const diff = (parent, index, vOldNode, vNewNode, patches) => {
  if (vOldNode !== null && vNewNode === undefined) {
  } else if (typeof vOldNode === "string" || typeof vNewNode === "string") {
    if (vOldNode !== vNewNode) {
      patches["nodes"].push(() => {
        let $text = renderElement(vNewNode);
        parent.elem.childNodes[index].replaceWith($text);
      });
    }
    return;
  } else if (vOldNode.tag !== vNewNode.tag) {
    patches["nodes"].push(() => {
      let $parent = vOldNode.elem.parentNode;
      const $newNode = renderElement(vNewNode);
      $parent.replaceChild($newNode, vOldNode.elem);
      Object.assign(vOldNode, vNewNode);
      vOldNode.elem = $newNode;
    });
  }

  diffAttribs(vOldNode, vNewNode, patches);
  diffKids(vOldNode, vNewNode, patches);
};

const diffAndPatch = (vOldNode, vNewNode) => {
  let patches = { nodes: [], kids: [], attribs: [] };
  diff({}, 0, vOldNode, vNewNode, patches);
  patches["nodes"].forEach((patch) => {
    patch();
  });
  patches["attribs"].forEach((patch) => {
    patch();
  });
  patches["kids"].forEach((patch) => {
    patch();
  });
};

const View = (props = {}) => {
  var vOldDom;
  let $viewNode;
  var update = props.update;
  var view = props.view;
  var oState = props.init ? props.init[0] : null;
  var effect = props.init
    ? props.init.length > 1
      ? props.init[1]
      : null
    : null;

  const applyState = (nState) => {
    var vNewDom = view(nState, dispatch);
    Object.assign(oState, nState);
    diffAndPatch(vOldDom, vNewDom);
  };

  const dispatch = (msg) => {
    const nState = update(msg, oState);
    let cmd = nState[1];
    if (cmd) {
      cmd(dispatch);
    }
    applyState(nState[0]);
  };

  const mount = ($node) => {
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

  return { mount };
};

const App = (props = {}) => {
  let state = props.state || null;
  let update = props.update || null;
  let navbar = props.navbar || null;
  let footer = props.footer || null;
  let main = props.main || null;

  const router = Router(main);

  const _initHeader = () => {
    let $header = document.createElement("header");
    document.body.appendChild($header);
    View(navbar()).mount($header);
  };

  const _initMain = () => {
    let $main = document.createElement("main");
    document.body.appendChild($main);
    router.init();
    router.onRouteChange((route) => {
      View(route.view()).mount($main);
    });
  };

  const _initFooter = () => {
    let $footer = document.createElement("footer");
    document.body.appendChild($footer);
    View(footer()).mount($footer);
  };

  const run = () => {
    if (navbar) _initHeader();
    _initMain();
    if (footer) _initFooter();
    router.routeTo("/");
  };

  return { run };
};

export { App, View };
