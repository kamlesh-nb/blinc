# Blinc

Framework for building Functional Web UI based on ELM like program pattern. Two type of programs can be defined in blinc, View & App which are explained further in this document. 

> Blinc uses virtual dom that facilitates the re-rendering of view in response to the state changes and thus complies to the principle; **(state) => view** 

# Getting Started

Blinc can be installed using npm

```sh
npm i blinc
```

# View

View can be defined usig pure function in JavaScript without the use of any markup whatsoever. All the required side effects like calling **REST API**, interacting with **databases**, **localStorage**, subscribing to **Events**, **Web Socket** messages can be implemented as commands and subscriptions separately. 

Following is the structure of the view.

```javascript
const MyView = (props) => {
  let init = [state, command]; //command is optional
  const update = (msg, state) => {};
  const view = (state, dispatch) => {
    return div({id: 'container},[
      'Hello World'
    ])
  };
  let subscriptions: []; //subscription is optional
  return { init, update, view, subscriptions };
};
```

## Let's see what each of the attribute of View means

The **init** array contains initial state of the View and the command that should be executed when the **view** is mounted on html document.

The **update** pure function is called whenever the message gets dispatched. It returns the updated **state** and can also call the required **commands**.

The **view** pure function returns the virtual dom for the view that get rendered when the view is mounted on html document. view function is called everytime the state changes and diff is performed on the new and old virtual dom and only the physical nodes that are corresponding to the the changed state attrubutes gets updated.

**suscription**, is an array that contains all the subscriptions that the view needs to subscribe to. Each entry is and object that contains subscribe and unsubscribe functions, which gets called when the view is mounted on the html document. In a single page application, when the route changes, all the subscriptions that veiw has subscribed to gets unsubscribed, before mounting another view on html document.

Commands & Subscriptions communicate back to the Web Interfaces by dispatching messages. These messages gets intercepted in **update** function of the view, which updates the state and the view gets re-rendered.

# App

App has to be used for developing single page applications. It handles the routing and the shared application state for all the views that are defined in the application. It communicates with the child views by dispatching messages to it and same way child can also communicate with App in case it update the shared state.

Pre-defined message type **APP_STATE_CHANGED** is dispatched with the payload as changed state is sent from the App to its child views that are watching the app state changes by subscribing to **WatchAppState** event. App has to subscribe to the **onRouteChange** event of the Router module to change the view in the Html Document. **onRouteChange** event dispatches the message of type **ROUTE_CHANGED** to the App with route details in the payload.

Following is the structure of App.

```javascript
let initialState = {
  isUserLoggedIn: false,
  userProfile: userData,
};
const MyApp = () => {
  let init = [initialState];

  const update = (msg, state) => {};
  const view = (state, dispatch) => {
    return {
      head: {
        meta: [{ name: "", content: "" }],
        title: "",
        cssRules: css.GetRules(),
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
```

## Let's see what each of the attribute of App means

All the attributes of the App are very much similar to View except the **view** function which return a JavaScropt object that defines the Html Document attributes like head, meta, title, header, body & footer. Additionally it also has an attribute that can be assigned with an array of css rules, in case css file is not to be used.

## Samples

The samples folder in the repository contains samples that covers all the features in the framework. 

## Note

This is an experimental project which is still work in pogress, feel free to to try and raise issue if you find any. Anyone who likes to contribute to the project is most welcome.

## Licence

MIT

