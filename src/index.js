const types = [
  {isSvg: false, tagNames: "a,abbr,address,area,article,aside,audio,b,base,bdi,bdo,big,blockquote,body,br,button,canvas,caption,cite,code,col,colgroup,data,datalist,dd,del,details,dfn,dialog,div,dl,dt,em,embed,fieldset,figcaption,figure,footer,form,h1,h2,h3,h4,h5,h6,head,header,hgroup,hr,html,i,iframe,img,input,ins,kbd,keygen,label,legend,li,link,main,map,mark,marquee,menu,menuitem,meta,meter,nav,noscript,object,ol,optgroup,option,output,p,param,picture,pre,progress,q,rp,rt,ruby,s,samp,script,section,select,small,source,span,strong,style,sub,summary,sup,table,tbody,td,textarea,tfoot,th,thead,time,title,tr,track,u,ul,var,video,wbr"},
  {isSvg: true, tagNames: "circle,clipPath,defs,ellipse,foreignObject,g,image,line,linearGradient,marker,mask,path,pattern,polygon,polyline,radialGradient,rect,stop,svg,text,tspan"},
];
const spreadKids = (kids) => {
  let _kids = {};
  for (let i = 0; i < kids.length; i++) { _kids[i] = kids[i];}
  return _kids;
};
types.forEach((t) => {
  t.tagNames.split(",").forEach((tag) => {
    exports[tag] = (...args) => {
      let kids,
        attrs,
        elem,
        key,
        isSvg = t.isSvg;
      Array.isArray(args[0])
        ? (kids = spreadKids(args[0]))
        : typeof args[0] === "object"
        ? (attrs = args[0])
        : null;
      Array.isArray(args[1])
        ? (kids = spreadKids(args[1]))
        : typeof args[1] === "object"
        ? (attrs = args[1])
        : null;
      return { tag, attrs: attrs || {}, children: kids || {}, elem, key, isSvg };
    };
  });
})

const renderElement = (vNode) => {
  if (typeof vNode === "string") {
    return document.createTextNode(vNode);
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
    if (typeof vNode.children[kid] === "number")
      throw new Error(
        "Number cannot be used in the document, use String() instead..."
      );

    if (typeof vNode.children[kid] !== "string") {
      vNode.children[kid].key = kid;
    }
    var $child = renderElement(vNode.children[kid]);
    $el.appendChild($child);
  }

  return $el;
};

const diffAttribs = (oNode, nNode, patches) => {
  const patch = (key) => {
    patches.attribs.push(() => {
      if (typeof nNode.attrs[key] !== "function") {
        if (key === "text") {
          oNode.elem.textContent = nNode.attrs[key];
        } else if (key === "ref") {
          nNode.attrs[key].node = oNode.elem;
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
  for (const key in nNode.attrs) {
    if (
      oNode.attrs[key] === undefined ||
      oNode.attrs[key] !== nNode.attrs[key]
    ) {
      patch(key);
    }
  }
  const remove = (key) => {
    if (!(key in nNode.attrs)) {
      patches.attribs.push(() => {
        oNode.elem.removeAttribute(key);
        delete oNode.attrs[key];
      });
    }
  };
  for (const k in oNode.attrs) {
    remove(k);
  }
};

const diffKids = (oNode, nNode, patches) => {
  const xLen = Object.keys(oNode.children).length;
  const yLen = Object.keys(nNode.children).length;
  const len = xLen > yLen ? xLen : yLen;

  const patch = (i) => {
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
  };

  for (let i = 0; i < len; i++) {
    patch(i);
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

exports.Element = (props = {}) => {
  let vOldDom, $viewNode;
  let oState = props.init ? props.init[0] : null;
  let onMount = props.init ? props.init[1] : null;
  const reducer = props.reducer;
  const render = props.render;
  const subscriptions = props.subscriptions ? props.subscriptions : null;
  let subs = [],
    unsubs = [];

  const applyState = (nState) => {
    var vNewDom = render(nState, dispatch);
    diffAndPatch(vOldDom, vNewDom);
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

  const mount = ($node) => {
    vOldDom = oState ? render(oState, dispatch) : render();
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

exports.push = (path) => {
  history.pushState({ path: path }, "", path);
};

let activeLink;
exports.Link = (props = {}) => {
  return exports.a({
    ...props,
    onclick: (e) => {
      if (activeLink) activeLink.classList.remove("active");
      activeLink = e.target;
      activeLink.classList.add("active");
      e.preventDefault();
      exports.push(e.target.pathname);
    },
  });
};

exports.Routes = (props = {}) => {
  return props;
};

exports.Router = (state, dispatch, props = {}) => {
  let rootRef = { node: null }, routes, currElem = null;
  history.pushState = ((f) =>
    function pushState() {
      var retVal = f.apply(this, arguments);
      window.dispatchEvent(new Event("pushstate"));
      return retVal;
    })(history.pushState);

  window.addEventListener("popstate", (event) => {
    pop(window.location.pathname);
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

  const pop = (path) => {mount(rootRef.node, path);};

  const mount = ($node, path) => {
    const route = routes.filter((route) => match(route, path))[0];
    if (currElem) { currElem.unMount();}
    let props = { state, dispatch, params: route.params };
    currElem = this.Element(route.element(props));
    currElem.mount($node);
  };

  document.addEventListener("readystatechange", (event) => {
    if (event.target.readyState === "complete") {
      let path = "/";
      mount(rootRef.node, path);
    }
  });

  if (props) {
    props.attrs.ref = rootRef;
    routes = props.children[0];
    props.children = {};
  }
  return props;
};