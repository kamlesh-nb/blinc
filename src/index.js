const  renderElement = async (vNode) => {
  if (typeof vNode === "string") {
    return document.createTextNode(vNode.toString());
  }
  const $el = vNode.isSvg
    ? document.createElementNS("http://www.w3.org/2000/svg", vNode.tag)
    : document.createElement(vNode.tag);
  vNode.elem = $el;
  for (var key in vNode.attrs) {
    if (typeof vNode.attrs[key] === "function") {
      $el.addEventListener(key.slice(2), vNode.attrs[key], true);
    } else {
      if (key === "text") {
        $el.textContent = vNode.attrs[key];
      } else if (key === "ref") {
        vNode.attrs[key].node = $el;
      } else {
        $el.setAttribute(key, vNode.attrs[key]);
      }
    }
  }

  for (var kid in vNode.children) {
    if (typeof vNode.children[kid] !== "string") {
      vNode.children[kid].key = kid;
    }
    var $child = await renderElement(vNode.children[kid]);
    $el.appendChild($child);
  }

  return $el;
};

const diffAttribs = async (oNode, nNode, patches) => {

  const set = (key) => {
    patches.attribs.push(async () => {
      if (typeof nNode.attrs[key] !== "function") {
        if (key === "text") {
          oNode.elem.textContent = nNode.attrs[key];
        } else if (key === "ref") {
          nNode.attrs[key].node = oNode.elem;
        } else if (key === "class") {
          oNode.elem.className = nNode.attrs[key];
        } else {
          oNode.elem.setAttribute(key, nNode.attrs[key]);
        }
      } else {
        oNode.elem.removeEventListener(key.slice(2), oNode.attrs[key], true);
        oNode.elem.addEventListener(key.slice(2), nNode.attrs[key], true);
      }
      oNode.attrs[key] = nNode.attrs[key];
    });
  };
 
  const remove = (key) => {
    if (!(key in nNode.attrs)) {
      patches.attribs.push(async () => {
        if(key == "class"){
          oNode.elem.className == "";
        } else {
          oNode.elem.removeAttribute(key);
        }
        delete oNode.attrs[key];
      });
    }
  };

  for (const key in nNode.attrs) {
    if (
      oNode.attrs[key] === undefined ||
      oNode.attrs[key] !== nNode.attrs[key]
    ) {
      set(key);
    }
  }
  for (const k in oNode.attrs) {
    remove(k);
  }
};

const diffKids = async (oNode, nNode, patches) => {
  const xLen = Object.keys(oNode.children).length;
  const yLen = Object.keys(nNode.children).length;
  const len = xLen > yLen ? xLen : yLen;

  const patch = async (i) => {
    if (oNode.children[i] === undefined) {
      patches.kids.push(async () => {
        const $el = await renderElement(nNode.children[i]);
        nNode.children[i].elem = $el;
        oNode.children[i] = {};
        Object.assign(oNode.children[i], nNode.children[i]);
        oNode.elem.appendChild($el);
      });
    } else if (nNode.children[i] === undefined) {
      patches.kids.push(async () => {
        oNode.elem.removeChild(oNode.children[i].elem);
        delete oNode.children[i];
      });
    } else {
      await diff(oNode, i, oNode.children[i], nNode.children[i], patches);
    }
  };

  for (let i = 0; i < len; i++) {
    patch(i);
  }
};

const diff = async (parent, index, vOldNode, vNewNode, patches) => {
  if (vOldNode !== null && vNewNode === undefined) {
  } else if (typeof vOldNode === "string" || typeof vNewNode === "string") {
    if (vOldNode !== vNewNode) {
      patches.nodes.push(async () => {
        const $node = await renderElement(vNewNode);
        parent.elem.childNodes[index].replaceWith($node);
        parent.children[index] = vNewNode;
      });
    }
    return;
  } else if (vOldNode.tag !== vNewNode.tag) {
    patches.nodes.push(async () => {
      const $parent = vOldNode.elem.parentNode;
      const $newNode = await renderElement(vNewNode);
      $parent.replaceChild($newNode, vOldNode.elem);
      Object.assign(vOldNode, vNewNode);
      vOldNode.elem = $newNode;
    });
  }

  await diffAttribs(vOldNode, vNewNode, patches);
  await diffKids(vOldNode, vNewNode, patches);
};

const diffAndPatch = async (vOldNode, vNewNode) => {
  const patches = { nodes: [], kids: [], attribs: [] };
  await diff({}, 0, vOldNode, vNewNode, patches);
  patches.nodes.forEach(async (patch) => {
    await patch();
  });
  patches.attribs.forEach(async (patch) => {
    await patch();
  });
  patches.kids.forEach(async (patch) => {
    await patch();
  });
};

const runEffects = (effects, dispatch) => {
  effects.forEach((effect) => {
    if (effect[1]) {
      effect[0](effect[1], dispatch);
    } else {
      effect[0](dispatch);
    }
  });
};

const Element = (props = {}) => {
  let vOldDom, $viewNode;
  let oState = props.init ? props.init[0] : null;
  let onMount = props.init ? props.init[1] : null;
  const reducer = props.reducer;
  const render = props.render;
  const subscriptions = props.subscriptions ? props.subscriptions : null;
  let subs = [],
    unsubs = [];

  const applyState = async (nState) => {
    var vNewDom = render(nState, dispatch);
    await diffAndPatch(vOldDom, vNewDom);
    Object.assign(oState, nState);
  };

  const dispatch = (msg) => {
    const nState = reducer(msg, oState);
    const commands = nState[1];
    if (commands) {
      runEffects(commands, dispatch);
    }
    applyState(nState[0]);
  };

  const mount = async ($node) => {
    vOldDom = oState ? render(oState, dispatch) : render();
    $viewNode = await renderElement(vOldDom);
    if ($node.childNodes.length > 0) {
      $node.replaceChild($viewNode, $node.childNodes[0]);
    } else {
      $node.appendChild($viewNode);
    }
    if (onMount) {
      runEffects(onMount, dispatch);
    }
    if (subscriptions) {
      subscriptions.forEach((subscription) => {
        subs.push([subscription.subscribe]);
        unsubs.push(subscription.unsubscribe);
      });
      runEffects(subs, dispatch);
    }
  };

  const unMount = () => {
    unsubs.forEach((unSub) => {
      unSub();
    });
  };

  return { mount, unMount };
};

const Push = (path) => {
  history.pushState({ path: path }, "", path);
};

const Routes = (props = {}) => {
  return props;
};

const Router = (state, dispatch, props = {}) => {
  let rootRef = { node: null }, routes, currElem = null;
  history.pushState = ((func) =>
    function pushState() {
      var retVal = func.apply(this, arguments);
      window.dispatchEvent(new Event("pushstate"));
      return retVal;
    })(history.pushState);

  window.addEventListener("popstate", (event) => {
    mount(rootRef.node, window.location.pathname);
  });

  window.addEventListener("pushstate", (event) => {
    mount(rootRef.node, window.location.pathname);
  });

  const match = (route, requestPath) => {
    const paramNames = [];
    const regexPath =
      route.path.replace(/([:*])(\w+)/g, (full, colon, name) => {
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
    route["params"] = params;
    return routeMatch;
  };

  const mount = async ($node, path) => {
    const route = routes.filter((route) => match(route, path))[0];
    if (!route) { throw new Error(`Route for path, ${ path } not defined...`);}
    if (currElem) { currElem.unMount(); }
    let props = { state, dispatch, params: route.params };
    currElem = Element(route.element(props));
    await currElem.mount($node);
  };

  document.addEventListener("readystatechange", async (event) => {
    if (event.target.readyState === "complete") {
      if(history.state !== null){
        let path = history.state.path;
        await mount(rootRef.node, path);
      } else {
        await mount(rootRef.node, '/');
      }
    }
  });

  if (props) {
    props.attrs.ref = rootRef;
    routes = props.children[0];
    props.children = {};
  }
  return props;
};

const App = async (props = {}) => {
  let e = Element(props);
  await e.mount(document.body);
};

export { App, Element, Push, Router, Routes };