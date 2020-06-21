const renderElement = (vNode) => {
  if (typeof vNode === "string") {
    return document.createTextNode(vNode);
  }
  const $el = vNode.isSvg 
      ? document.createElementNS('http://www.w3.org/2000/svg', vNode.tag) 
      : document.createElement(vNode.tag);

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
    if(typeof kid === "number")
      throw new Error('Number cannot be used in the document, use String() instead...')
  
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

const runEffects = (effects, dispatch) => {
  effects.forEach((effect) => {
    if (effect[1]) {
      effect[0](effect[1], dispatch);
    } else {
      effect[0](dispatch);
    }
  });
};

const View = (props = {}) => {
  let vOldDom;
  let $viewNode;
  let oState = props.init[0] || null;
  let onMount = props.init[1] || null;
  const update = props.update;
  const view = props.view;
  const subscriptions = props.subscriptions || null;
  let subs = [];
  let unsubs = [];

  const applyState = (nState) => {
    var vNewDom = view(nState, dispatch);
    diffAndPatch(vOldDom, vNewDom);
    Object.assign(oState, nState);
  };

  const dispatch = (msg) => {
    const nState = update(msg, oState);
    const commands = nState[1];
    if (commands) {
      runEffects(commands, dispatch);
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
    if (onMount) {
      runEffects(onMount, dispatch);
    }
    if (subscriptions) {
      subscriptions.forEach((subscription) => {
        subs.push(subscription.subscribe);
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

const formFields = (props = {}) => {
  const fields = {};
  Object.assign(fields, props);
  const setValue = (event) => {
    fields[event.target.id] = event.target.value;
  };
  return { fields, setValue };
};

let $header, $main, $footer;
let appStateListeners = [];
let currentView;

const ChangeView = (payload, dispatch) => {
  let route = payload;
  let props = { ...payload, dispatch: dispatch };
  currentView.unMount();
  currentView = View(route.view(props));
  currentView.mount($main);
};

const AppStateChanged = (data, dispatch) => {
  appStateListeners.forEach((listener) => {
    listener({ type: "APP_STATE_CHANGED", payload: data });
  });
  dispatch({ type: "STATE_SHARED" });
};

const WatchAppState = (dispacth) => {
  appStateListeners.push(dispacth);
};

const App = (props = {}) => {
  let oState = props.init[0] || null;
  let onAppStart = props.init[1] || null;
  let update = props.update || null;
  let view = props.view || null;
  let globals;

  const dispatch = (msg) => {
    const nState = update(msg, oState);
    const commands = nState[1];
    if (commands) {
      runEffects(commands, dispatch);
    }
  };

  const run = () => {
    let doc = oState ? view(oState, dispatch) : view();
    if(doc.head){ 
      if(doc.head.meta){
        doc.head.meta.forEach((meta) => {
          var $meta = document.createElement('meta');
          $meta.name = meta.name
          $meta.setAttribute('content', meta.content)
          document.head.appendChild($meta)
        })
      }
      if(doc.head.title){
        document.title = doc.head.title
      }
      if(doc.head.cssRules){
        let $style = document.createElement('style')
        document.head.appendChild($style)
        let styleSheet = $style.sheet
        doc.head.cssRules.forEach((rule) => {
          styleSheet.insertRule(`${rule.name}${rule.value}`)
        })
      }
    }
    if(doc.body){
      if (doc.body.header) {
        $header = document.createElement("header");
        document.body.appendChild($header);
        globals = { state: oState, dispacth: dispatch };
        View(doc.body.header(globals)).mount($header);
      } else {
        throw new Error('header is mandatory in body of App');
      }
      if (doc.body.main) {
        $main = document.createElement("main");
        document.body.appendChild($main);
        let route = doc.body.main;
        globals = { params: route.params, state: oState, dispatch: dispatch };
        currentView = View(route.view(globals));
        currentView.mount($main);
      } else {
        throw new Error('main is mandatory in body of App');
      }
      if (doc.body.footer) {
        $footer = document.createElement("footer");
        document.body.appendChild($footer);
        globals = { state: oState, dispacth: dispatch };
        View(doc.body.footer(globals)).mount($footer);
      }
    } else {
      throw new Error('body is mandatory in App');
    }
    if (onAppStart) {
      runEffects(onAppStart, dispatch);
    }
  };
  run();
};

const pipe = (...fns) => fns.reduce((f, g) => (...args) => g(f(...args)));
const compose = (...fns) => fns.reduce((f, g) => (...args) => f(g(...args)));

export {
  View,
  App,
  formFields,
  ChangeView,
  AppStateChanged,
  WatchAppState,
  pipe,
  compose,
};