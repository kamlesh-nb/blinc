# Blinc

A Framework for building Functional Web UI based on ELM like program pattern using Declarative API. **Blinc** can be used to develop single page application, a complete Composable UI that can be designed using pure javascript functions that corresponds to the predominantly used Html as well as SVG tags. There's no need to use any sort of markup language to define the UI. It is possible to define stateless as well as stateful Element using ***Blinc***. ***Blinc*** also has and in-built basic *history API* based router, that handles URL Parameter. 

> Blinc uses virtual dom that facilitates the re-rendering of view in response to the state changes and thus complies to the principle; ***(state) => view*** 

## Getting Started

Blinc can be installed using npm

```sh
npm i blinc
```

## Element

Element can be used to create basic building blocks for developing a Functional Web UI. Following is the structure for defining Element.

- The ***init*** is an array (optional), that contains initial state of the Element as well as the effects that should run when the Element are mounted to physical DOM. 

- The ***reducer*** is a pure function (optional), that is used to update the state of the Element in response to the messages that are dispatched, which subsequently triggers the re-rendering. This function returns an array that contains the updated state and can optionally return side-effects that is supposed to be executed.

- The ***render*** is a pure function, that is used to define the Virtual Tree for the **Element** which gets converted to physical Element and loaded in to the DOM. This function can have optionally have ***state*** and ***dispatch*** as arguments if state based rendering is requried. 

- The ***subscriptions*** is an array (optional) that contains the subscription of side-effects by the Element. ***Subscriptions*** can be used to *listen* to the **Events**, messages on **WebSockets** or the changes to the **Real-Time Databases** like firestore.

As you can see from the above, only ***render*** function is the only mandatory part of Element.

Following is an example of how Element can be define.

```javascript
//counter.js
import { Element, div, button } from 'blinc'

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
    return div([
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

Element(Counter()).mount(document.body)

```

### State Management

In ***Blinc***, you can have both stateless and stateful ***Element***. In case ***Element*** is hosting other ***Elements*** into it (i.e. ***single page application***), the state of the hosting ***Element*** can be shared with it's child ***Elements***. The Child ***Elements*** can dispatch messages to outermost ***i.e.*** the parent ***Element*** and change the state which subsequently causes the re-rendering of the entire ***Element*** tree both parent and the child.

The stateless ***Element*** can consume the state of parent ***Element***, 

Lets see an example how it all look...

```javascript
//myApp.js

import { Element, Link, Router, Routes, hr, br, div, nav, ul, li, button } from "blinc";

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

let initialState = { count: 0, isUserLoggedIn: false }

const myApp = () => {
  let init = [initialState];
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

Element(myApp()).mount(document.body);

```

As you can see from the above code example, the child ***Elements*** can disptach messages to the parent ***Element***, which subsequently triggers the re-rendering of entire ***Element*** tree. 

State can be defined by inidividual ***Element*** or one giant state at the parent ***Element*** level or both, i.e. shared state at parent ***Element*** level and individual state in it's own ***Element***.


## Samples

The samples folder in the repository contains samples that covers all the features in the framework. At the moment there's only basic example, as time permits, I will publish more examples that demonstrates how to implement side-effects using ***commands*** and ***subscriptions***.

## Note

This is an experimental project which is still work in pogress, feel free to try and raise issue if you find any. Anyone who likes to contribute to the project is most welcome.

## Licence

MIT