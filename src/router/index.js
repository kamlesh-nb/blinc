const Router = () => {
  let _onRouteChange;
  let routes;
  
  window.onpopstate = (event) => {
    pop(window.location.pathname);
  };

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

  const push = (path) => {
    const route = routes.filter((route) => match(route, path))[0];
    window.history.pushState({ path: path }, path, route.path);
    _onRouteChange({type: 'ROUTE_CHANGED', payload: route});
  };

  const pop = (path) => {
    const route = routes.filter((route) => match(route, path))[0];
    _onRouteChange({type: 'ROUTE_CHANGED', payload: route});
  };

  const onRouteChange = (func) => {
    _onRouteChange = func;
  };

  const Routes = (props = {}) => {
    routes = props || null;
    return routes[0]
  }

  return { Routes, push, onRouteChange };
};

export default Router;
