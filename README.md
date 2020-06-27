# Blinc

A Framework for building Functional Web UI based on ELM like program pattern. 

> Blinc uses virtual dom that facilitates the re-rendering of view in response to the state changes and thus complies to the principle; **(state) => view** 

# Getting Started

Blinc can be installed using npm

```sh
npm i blinc
```

# Elements

Elements can be used to create basic building blocks for developing a Functional UI. Following is the structure for defining Elements.

- **init** is an array (optional), that contains initial state of the Elements as well as the effects that should run when the Elements are mounted to physical DOM. 

- **reducer** is a pure function (optional), that is used to update the state of the Elements in response to the messages that are dispatched, which subsequently triggers the re-rendering. This function returns an array that contains the updated state and can optionally return side-effects that is supposed to be executed.

- **render** is a pure function, that is used to define the Virtual Tree for the **Elements** which gets converted to physical elements and loaded in to the DOM. This function can have optionally have *state* and *dispatch* as arguments if state based rendering is requried. 

- **subscriptions** is an array (optional) that contains the subscription of side-effects by the Elements.

As you can see from the above, only **render** function is the only mandatory part of Elements.

Following is an example of how Elements can be define.

```javascript
//counter.js
import { Elements, div, button } from 'blinc'

let initialState = {
  count: 0,
};

const Counter = (props) => {
  let init = [initialState]
  const reducer = (msg, state) => {
    switch (msg.type) {
      case "INCREMENT": return [Object.assign({}, state, { count: state.count + 1 })];
      case "DECREMENT": return [Object.assign({}, state, { count: state.count - 1 })];
      default: return [state];
    }
  }
  const render = (state, dispatch) => {
    return div({}, [
      button({
        text: "+",
        onclick: (e) => {
          dispatch({ type: "INCREMENT" });
        },
      }),
      String(state.count),
      button({
        text: "-",
        onclick: (e) => {
          dispatch({ type: "DECREMENT" });
        },
      }),
    ]);
  };
  return { init, reducer, render };
}

Elements(Counter()).mount(document.body)

```

### State Management

In blinc, you can have both stateless and statefull Elements. In case Elements are hosting other Elements into it (single page application), the state of the outermost Elements can be shared with the inner Elements. Inner Elements can dispatch messages to outermost Elements and change the state that causes the re-rendering of the entire tree of Elements both inner and outer.

Lets see an example how it all look...

```javascript
//myApp.js

import { View, Link, Router, Routes, hr, br, div, nav, ul, li, button } from "blinc";

const Home = (props) => {
  const render = () => {
    return div(["Home", br(), props ? String(props.state.count) : "No State"]);
  };
  return { render };
};
const Contact = (props) => {
  const render = () => {
    return div(["Contact"]);
  };
  return { render };
};
const About = (props) => {
  const render = () => {
    return div(["About"]);
  };
  return { render };
};

const SignIn = (props) => {
  const render = () => {
    return div([
    button({text: "Sign In", onclick: (e) => {
      props.dispatch({type: 'LOGGED_IN', payload: {isUserLoggedIn: true}})
    }})
  ]);
  };
  return { render };
};

const SignOut = (props) => {
  const render = () => {
    return div([
    button({text: "Sign Out", onclick: (e) => {
      props.dispatch({type: 'LOGGED_OUT', payload: {isUserLoggedIn: false}})
    }})
  ]);
  };
  return { render };
};

const myApp = () => {
  let init = [{ count: 0, isUserLoggedIn: false }];
  const reducer = (msg, state) => {
    switch (msg.type) {
      case "LOGGED_IN":
        return [Object.assign({}, state, msg.payload)];
      case "LOGGED_OUT":
        return [Object.assign({}, state, msg.payload)];
      default:
        return [state];
    }
  };
  const render = (state, dispatch) => {
    return div({ id: "root" }, [
      nav([
        ul([
          li([Link({ text: "Home", href: "/" })]),
          li([Link({ text: "Contact", href: "/contact" })]),
          li([Link({ text: "About", href: "/about" })]),
          state.isUserLoggedIn
            ? li([Link({ text: "Sign Out", href: "/signout" })])
            : li([Link({ text: "Sign In", href: "/signin" })])
        ]),
      ]),
      hr(),
      Router(state, dispatch,
        div([
          Routes([
            { path: "/", view: Home },
            { path: "/contact", view: Contact },
            { path: "/about", view: About },
            { path: "/signin", view: SignIn },
            { path: "/signout", view: SignOut },
          ]),
        ])
      ),
    ]);
  };
  return { init, reducer, render };
};

Elements(myApp()).mount(document.body);

```

As you can see from the above code example, the inner Elements can disptach messages to the outermost Elements, which subsequently trigger the re-render for entire tree.


## Samples

The samples folder in the repository contains samples that covers all the features in the framework. 

## Note

This is an experimental project which is still work in pogress, feel free to try and raise issue if you find any. Anyone who likes to contribute to the project is most welcome.

## Licence

MIT