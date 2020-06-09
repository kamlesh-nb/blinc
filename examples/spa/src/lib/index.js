const pipe = (...fns) => fns.reduce((f, g) => (...args) => g(f(...args)));
const compose =  (...fns) => fns.reduce((f, g) => (...args) => f(g(...args)));

const Router = (config = {}) => {
  const routes = config.routes;
  const mode = config.mode || null;
  const activeClass = config.activeClass || null;
  const links = [];
  let listener;

  if (mode === "history") {
    window.onpopstate = (event) => {
      const path = window.location.pathname;
      popState(path)
    };
  } else {
    window.onhashchange = (event) => {
      routeTo(event.target.location.hash.slice(1));
    };
  }

  const match = (route, requestPath) => {
    const paramNames = [];
    const regexPath =
      route.path.replace(/([:*])(\w+)/g, (full, colon, name) => {
        console.log(`full: ${full}, color: ${colon}`);
        paramNames.push(name);
        return "([^/]+)";
      }) + "(?:/|$)";

    let params = {};

    const routeMatch = requestPath.match(new RegExp(regexPath));
    if (routeMatch !== null) {
      params = routeMatch
        .slice(1, routeMatch.length)
        .reduce((params, value, index) => {
          if (params === null) params = {};
          params[paramNames[index]] = value;
          return params;
        }, null);
    }
    Object.defineProperty(route, "params", {
      value: params,
      writable: true,
      enumerable: true,
      configurable: true
    });

    return routeMatch;
  };

  const routeTo = (path) => {
    const route = routes.filter((route) => match(route, path))[0];
    if (mode === "history") {
      window.history.pushState({ path: path }, path, route.path);
    }
    listener(route);
  };

  const popState = (path) => {
    const route = routes.filter((route) => match(route, path))[0];
    listener(route);
  }

  const navigate = (e) => {
    var path = e.target.attributes.getNamedItem("path").value;
    if (activeClass !== null) {
      links.forEach((key) => {
        key.element.classList.remove(activeClass);
      });
    }
    e.target.classList.add(activeClass);
    routeTo(path);
  };

  const init = () => {
    if (mode === "history") {
      window.history.replaceState({}, null, "");
      document.querySelectorAll("[path]").forEach((link) => {
        // link.addEventListener("click", navigate, false);
        // console.log(link.id);
        links.push({
          path: link.attributes.getNamedItem("path"),
          isActive: false,
          element: link
        });
      });
    }
  };

  const onRouteChange = (func) => {
    listener = func;
  };

  return { init, onRouteChange, routeTo, navigate };
};

const renderElement = (vNode) => {
  if (typeof vNode === "string") {
    return document.createTextNode(vNode);
  }

  const $el = document.createElement(vNode.tag);
  vNode.elem = $el;

  for (const [k, v] of Object.entries(vNode.attrs)) {
    if (typeof v === "function") {
      $el.addEventListener(k.slice(2), v, true);
    } else {
      if (k === "text") {
        $el.textContent = v;
      } else {
        $el.setAttribute(k, v);
      }
    }
  }

  for (const [k, kid] of Object.entries(vNode.children)) {
    if (typeof kid !== "string") {
      kid.key = k;
    }
    var $child = renderElement(kid);
    $el.appendChild($child);
  }
  return $el;
};

const diffAttribs = (oNode, nNode, patches) => {
  for (const [k, v] of Object.entries(nNode.attrs)) {
    if (oNode.attrs[k] === undefined || oNode.attrs[k] !== v) {
      patches.attribs.push(() => {
        if (typeof v !== "function") {
          if (k === "text") {
            oNode.elem.textContent = v;
          } else {
            oNode.elem.setAttribute(k, v);
          }
        } else {
          oNode.elem.removeEventListener(k.slice(2), oNode.attrs[k], true);
          oNode.elem.addEventListener(k.slice(2), v, true);
        }
        oNode.attrs[k] = v;
      });
    }
  }

  for (const k in oNode.attrs) {
    if (!(k in nNode.attrs)) {
      patches.attribs.push(() => {
        oNode.elem.removeAttribute(k);
        delete oNode.attrs[k];
      });
    }
  }
};

const diffKids = (oNode, nNode, patches) => {
  const xLen = Object.keys(oNode.children).length;
  const yLen = Object.keys(nNode.children).length;

  const len = xLen > yLen ? xLen : yLen;

  for (let i = 0; i < len; i++) {
    if (oNode.children[i] === undefined) {
      patches.kids.push(() => {
        const $el = renderElement(nNode.children[i]);
        nNode.children[i].elem = $el;
        oNode.children[i] = {};
        Object.assign(oNode.children[i], nNode.children[i]);
        oNode.elem.appendChild($el);
      });
    } else if (nNode.children[i] === undefined) {
      patches.kids.push(() => {
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
      patches.nodes.push(() => {
        const $node = renderElement(vNewNode);
        parent.elem.childNodes[index].replaceWith($node);
        parent.children[index] = vNewNode;
      });
    }
    return;
  } else if (vOldNode.tag !== vNewNode.tag) {
    patches.nodes.push(() => {
      const $parent = vOldNode.elem.parentNode;
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
  const patches = { nodes: [], kids: [], attribs: [] };
  diff({}, 0, vOldNode, vNewNode, patches);
  patches.nodes.forEach((patch) => {
    patch();
  });
  patches.attribs.forEach((patch) => {
    patch();
  });
  patches.kids.forEach((patch) => {
    patch();
  });
};

const View = (props = {}) => {
  let vOldDom;
  let $viewNode;
  const update = props.update;
  const view = props.view;
  let oState = props.init ? props.init[0] : null;
  let command = props.init
    ? props.init.length > 1
      ? props.init[1]
      : null
    : null;

  const applyState = (nState) => {
    var vNewDom = view(nState, dispatch);
    diffAndPatch(vOldDom, vNewDom);
    Object.assign(oState, nState);
  };

  const dispatch = (msg) => {
    const nState = update(msg, oState);
    const command = nState[1];
    if (command) {
      if (command[1]) {
        command[0](command[1], dispatch);
      } else {
        command[0](dispatch);
      }
    }
    applyState(nState[0]);
  };

  const mount = ($node) => {
    vOldDom = oState ? view(oState, dispatch) : view();
    $viewNode = renderElement(vOldDom);
    if ($node.childNodes.length > 0) {
      $node.replaceChild($viewNode, $node.childNodes[0]);
    } else {
      $node.appendChild($viewNode);
    }
    if (command) {
      if (command[1]) {
        command[0](command[1], dispatch);
      } else {
        command[0](dispatch);
      }
    }
  };

  return { mount };
};

const changeNotifier = (state) => {
  let oState = state
  let listeners = []
  const on = (listener) => {
    listeners.push(listener) 
    return listener
  }
  const off = (listener) => {
    listeners = listeners.filter(function (h) {
      return h !== listener;
    });
  }
  const get = () => oState
  const set = (nState) => {
    Object.assign(oState, { ...nState })
    listeners.forEach((listener) => {
      return listener(oState);
    });
  }
  return { on, off, set, get }
}

const App = (props = {}) => {
  const navbar = props.navbar || null;
  const footer = props.footer || null;
  const body = props.body || null;
  const router = Router(body);

  const _initHeader = () => {
    const $header = document.createElement("header");
    document.body.appendChild($header);
    View(navbar({
      router: { 
        push: router.routeTo,
        navigate: router.navigate
      }
    })).mount($header);
  };

  const _initMain = () => {
    const $main = document.createElement("main");
    document.body.appendChild($main);
    router.init();
    router.onRouteChange((route) => {
      View(route.view({
        params: route.params || null,
        router: { 
          push: router.routeTo,
          navigate: router.navigate
        }
      })).mount($main);
    });
  };

  const _initFooter = () => {
    const $footer = document.createElement("footer");
    document.body.appendChild($footer);
    View(footer({
      router: { 
        push: router.routeTo,
        navigate: router.navigate
      }
    })).mount($footer);
  };

  const run = () => {
    if (navbar) _initHeader();
    _initMain();
    if (footer) _initFooter();
    router.routeTo("/");
  };

  return { run };
};

export { App, View, pipe, compose, changeNotifier };
