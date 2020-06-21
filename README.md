# Blinc

Framework for building Functional Web UI based on ELM like program pattern. Two type of programs can be defined in blinc, View & App which are explained further in this document. 

> Blinc uses virtual dom that facilitates the re-rendering of view in response to the state changes and thus complies to the principle; **(state) => view** 

# Getting Started

Blinc can be installed using npm

```sh
npm i blinc
```

# View

View can be defined usig pure function in JavaScript without the use of any markup whatsoever. Most of the commonly used html tags have corresponding functions defined in tags module and can be used to design UI. There are also functions to design SVG. 

All the required side effects like calling **REST API**, interacting with **databases**, **localStorage**, subscribing to **Events**, **Web Socket** messages can be implemented as commands and subscriptions separately. 

Following is the structure of the view.

```javascript
//counter.js

import { View } from "blinc";
import { div, button } from "blinc/tags";

let initialState = {
  count: 0,
};
const Counter = () => {
  let init = [initialState];

  const update = (msg, state) => {
    switch (msg.type) {
      case "INCREMENT":
        return [Object.assign(state, { count: state.count + 1 })];
      case "DECREMENT":
        return [Object.assign(state, { count: state.count - 1 })];
      default:
        return [state];
    }
  };

  const view = (state, dispatch) => {
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
  return { init, update, view };
};

let counter = View(Counter());
counter.mount(document.body);

```

The **init** array contains initial state of the View and the command that should be executed when the **view** is mounted on html document.

The **update** pure function is called whenever the message gets dispatched. It returns the updated **state** and can also call the required **commands**.

The **view** pure function returns the virtual dom for the view that get rendered when the view is mounted on html document. view function is called everytime the state changes and diff is performed on the new and old virtual dom and only the physical nodes that are corresponding to the the changed state attrubutes gets updated.

**suscription**, is an array that contains all the subscriptions that the view needs to subscribe to. Each entry is and object that contains subscribe and unsubscribe functions, which gets called when the view is mounted on the html document. In a single page application, when the route changes, all the subscriptions that veiw has subscribed to gets unsubscribed, before mounting another view on html document.

Commands & Subscriptions communicate back with the View by dispatching messages. These messages gets intercepted in **update** function of the view, which updates the state and the view gets re-rendered.

# App

App has to be used for developing single page applications. It handles the routing and the shared application state for all the views that are defined in the application. It communicates with the child views by dispatching messages to it and same way child can also communicate with App in case it update the shared state.

Pre-defined message type **APP_STATE_CHANGED** is dispatched with the payload as changed state is sent from the App to its child views that are watching the app state changes by subscribing to **WatchAppState** event. App has to subscribe to the **onRouteChange** event of the Router module to change the view in the Html Document. **onRouteChange** event dispatches the message of type **ROUTE_CHANGED** to the App with route details in the payload. When the **update** functions intercepts the message of type **ROUTE_CHANGE** it returns the state as well as command **ChangeView** to change the vie win Html Document.

Following is the structure of App.

```javascript
//myApp.js

import { App, ChangeView } from 'blinc'
import { css } from 'blinc/css'
import style from './style'

let initialState = {
  isUserLoggedIn: false,
  userProfile: userData,
};
const { addRules, getRules } = css()

//add css rules defined as plain javascript object
addRules(style) 

const MyApp = () => {

  let init = [initialState];

  const update = (msg, state) => {
     switch (msg.type) {
      case "ROUTE_CHANGED": return [state, [[ChangeView, msg.payload]]]
      default: return [state]
     }
  };

  const view = (state, dispatch) => {
    return {
      head: {
        meta: [{ name: "", content: "" }],
        title: "",
        //get all the css rules defined in javascript object and
        //insert it to styleSheet
        cssRules: getRules(), 
      },
      body: {
        header: Navbar,
        main: Routes([
          { path: "/", view: Home },
          { path: "/contact/:id", view: Contact },
          { path: "/about", view: About },
          { path: "/signin", view: SignIn },
        ]),
        footer: Footer
      },
    };
  };

  let subscriptions = [];
};

App(MyApp())

```

## Watching App State

Refer below sample implementation of Navbar, which changes the links based on the authentication status. It starts watching for shared app state changes by subscribing to AppStateChanged event using WatchAppState command.

```javascript
//navbar.js

const Navbar = (props) => {
  let init = [Object.assign({}, props.appState), [[WatchAppState]]];
  const update = (msg, state) => {
    switch (msg.type) {
      case "APP_STATE_CHANGED":
        return [Object.assign(state, msg.payload)];
      default:
        return [state];
    }
  };
  const view = (state, dispatch) => {
    return div({}, [
      div({ class: "logo" }, ["Blinc SPA"]),
      nav({}, [
        ul({}, [
          li({}, [Link({ text: "Home", href: "/" })]),
          li({}, [Link({ text: "Contact", href: "/contact/90" })]),
          li({}, [Link({ text: "About", href: "/about" })]),
          state.isLoggedIn
            ? li({}, [Link({ text: "Sign Out" })])
            : li({}, [Link({ text: "Sign In", href: "/signin" })]),
        ]),
      ]),
      div({ class: "menu-toggle" }, [
        svg({ height: "24", viewBox: "0 0 24 23", width: "24" }, [
          path({ d: "M0 0h24v24H0z", fill: "none" }),
          path({ d: "M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" }),
        ]),
      ]),
    ]);
  };
  return { init, update, view };
}


```

All the attributes of the App are very much similar to View except the **view** function which return a JavaScropt object that defines the Html Document attributes like head, meta, title, header, body & footer. Additionally it also has an attribute that can be assigned with an array of css rules, in case css file is not to be used.

## Samples

The samples folder in the repository contains samples that covers all the features in the framework. 

## Note

This is an experimental project which is still work in pogress, feel free to to try and raise issue if you find any. Anyone who likes to contribute to the project is most welcome.

## Licence

MIT