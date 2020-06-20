# Blinc

Framework for building Functional Web UI based on ELM like program pattern. It uses pure functions to define web interfaces, and handles the side effects via commands and subscriptions, all in native JavaScript.

> It uses virtual dom that facilitates, the re-rendering of view when the state changes, thus complies to the principle; view = f(state)

# Getting Started

Blinc can be installed using npm as under...

```sh
npm i blinc
```

Blinc Web Interfaces, are easy to build using pure function composition, without the use of any markup whatsoever.

Following is a code for the simple Hello Application. Webpack can be used to bundle the application, refer the samples in the repository for the same.

# Basic Structure of the View 

Following is the basic structure of the view program in blinc.  

init, is an array containing initial state of the programm and the command that should be executed view is mounted on html document.

As the message gets dispatched, update function is called to retunr the updated state and can also call the required commands. 

view functions returns the virtual tree for the view that get rendered when the view is mounted on html document. view function is called everytime the state changes and diff is performed on the new and old virtual tree and only the physical nodes that are corresponding to the the changed state attrubutes gets updated.

suscription, is an array that contains all the subscriptions that the view needs to subscribe to. Each entry is and object that contains subscrobe and unsubscribe functions, which get called when the view is mounted on the html document. In a single page application, when the route changes the all the subscriptions that veiw has subscribed to gets unsubscribed.

```javascript

  const MyView = (props) => {
    let init = [ state, command ] //command is optional
    const update = (msg, state) => {}
    const view = (state, dispatch) => {}
    let subscriptions: [] //subscription is optional
    return { init, update, view, subscriptions}
  }
 
```

