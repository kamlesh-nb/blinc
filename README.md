# Blinc

A Framework for building Functional Web UI based on ELM like program pattern using Declarative API. **Blinc** can be used to develop single page application, a complete Composable UI that can be designed using pure javascript functions that corresponds to the predominantly used Html as well as SVG tags. There's no need to use any sort of markup language to define the UI. It is possible to define stateless as well as stateful Element using **_blinc_**. **_Blinc_** also has an in-built basic **_history API_** based router, that handles routing of the hosted **_Elements_** and can also capture URL Parameter.

> Blinc uses virtual dom that facilitates the re-rendering of view in response to the state changes and thus complies to the principle; **_(state) => view_**

## Getting Started

Blinc can be installed using npm

```sh
npm i blinc
```

## Element

Element is the basic building block for developing a Functional Web UI. Element hosts all the required Html to design the UI and can also host other Elements. Following is the structure for defining Element.

- The **_init_** is an array (optional), that contains initial state of the Element as well as the effects that should run when the Element are mounted to physical DOM.

- The **_reducer_** is a pure function (optional), that is used to update the state of the Element in response to the messages that are dispatched, which subsequently triggers the re-rendering. This function returns an array that contains the updated state and can optionally return side-effects that is supposed to be executed.

- The **_render_** is an only mandatory pure function, that is used to define the Virtual Tree for the **Element** which gets converted to physical Element and loaded in to the DOM. This function can have optionally have **_state_** and **_dispatch_** as arguments if state based rendering is requried.

- The **_subscriptions_** is an array (optional) that contains the subscription of side-effects by the Element. **_Subscriptions_** can be used to _listen_ to the **Events**, messages on **WebSockets** or the changes to the **Real-Time Databases** like firestore.

Following is an example of how Element can be define.

```javascript
//counter.js
import { Element, div, button } from "blinc";

let initialState = {
  count: 0,
};

const Counter = (props) => {
  let init = [initialState];
  const reducer = (msg, state) => {
    switch (msg.type) {
      case "INCREMENT":
        return [Object.assign({}, state, { count: state.count + 1 })];
      case "DECREMENT":
        return [Object.assign({}, state, { count: state.count - 1 })];
      default:
        return [state];
    }
  };
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
};

Element(Counter()).mount(document.body);
```

### State Management

In **_Blinc_**, you can have both stateless and stateful **_Element_**. In case **_Element_** is hosting other **_Elements_** into it (i.e. **_single page application_**), the state of the hosting **_Element_** can be shared with it's child **_Elements_**. The Child **_Elements_** can dispatch messages to outermost **_i.e._** the parent **_Element_** and change the state which subsequently causes the re-rendering of the entire **_Element_** tree both parent and the child.

The stateless **_Element_** can consume the state of parent **_Element_**,

Lets see an example how it all look...

```javascript
//myApp.js

import {
  App,
  Link,
  Router,
  Routes,
  hr,
  br,
  div,
  nav,
  ul,
  li,
  button,
} from "blinc";

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
      button({
        text: "Sign In",
        onclick: (e) => {
          props.dispatch({
            type: "LOGGED_IN",
            payload: { isUserLoggedIn: true },
          });
        },
      }),
    ]);
  };
  return { render };
};

const SignOut = (props) => {
  const render = () => {
    return div([
      button({
        text: "Sign Out",
        onclick: (e) => {
          props.dispatch({
            type: "LOGGED_OUT",
            payload: { isUserLoggedIn: false },
          });
        },
      }),
    ]);
  };
  return { render };
};

let initialState = { count: 0, isUserLoggedIn: false };

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
            : li([Link({ text: "Sign In", href: "/signin" })]),
        ]),
      ]),
      hr(),
      Router(
        state,
        dispatch,
        div([
          Routes([
            { path: "/", element: Home },
            { path: "/contact", element: Contact },
            { path: "/about", element: About },
            { path: "/signin", element: SignIn },
            { path: "/signout", element: SignOut },
          ]),
        ])
      ),
    ]);
  };
  return { init, reducer, render };
};

App(myApp()).mount(document.body);
```

As you can see from the above code example, the child **_Elements_** can disptach messages to the parent **_Element_**, which subsequently triggers the re-rendering of entire **_Element_** tree.

State can be defined by inidividual **_Element_** or one giant state at the parent **_Element_** level or both, i.e. shared state at parent **_Element_** level and individual state in it's own **_Element_**.

## Samples

The samples folder in the repository contains samples that covers all the features in the framework. At the moment there's only basic example, as time permits, I will publish more examples that demonstrates how to implement side-effects using **_commands_** and **_subscriptions_**.

## Note

This is an experimental project which is still work in pogress, feel free to try and raise issue if you find any. Anyone who likes to contribute to the project is most welcome.

## Licence

MIT
