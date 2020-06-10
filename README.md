# Blinc

A Nano Framework for  building Web Applications based on ELM Architecture (Functional UI). It uses pure functions to define web interfaces, and handles the side effects via commands and subscriptions, all that you can write in pure JavaScript. 

# Getting Started

Blinc can be installed using npm as under...

```sh
npm i blinc
```

Blinc Web Interfaces, are easy to build using pure function composition, without the use of any markup whatsoever.

Following is a code for the simple Hello Application. Module bundlers like parcel and webpack can be used ti bundle the application, you can refer the examples in the repository for the same.

```code
//index.js

import {View} from 'blinc'
import {div, input, button, formFields} from 'blinc/tags'

let state = {
  greeting: ''
}
const Hello = (props) => {

  let init = [state]
  
  //pure function
  const update = (msg, state) => {
    switch (msg.type) {
      case 'GREET': 
        return [Object.assign({}, state, {greeting: `Hello ${msg.payload}`})]
      default:
        return [state]
    }
  }

  //pure function
  const view = (state, dispatch) => {
    const {fields, setValue} = formFields()
    return div({id: 'greet'}, [
      state.greeting,
      input({id: 'name', onchange: setValue})
      button({id: 'btn', onclick: (e) => { dispatch({type: 'GREET', payload: fields})}})
    ])
  }

  return { init, update, view }
}

let view = View(Hello());
let $node = document.body;
view.mount($node);

```

Above example explains how a basic web interface can be developed using blinc, but there's much more that is needed to build actual application. It is nearly impossible to build and useful application with pure functions as every application has to interact with the outside world (resource outside of the application) like databases, web sockets, web api's etc. 

## Commands & Subscriptions

Since binc is based on ELM Architecture, we picked the concept of Commands and Subscriptions that can be used to interact with the outside world.

### Commands
  - Send Http Request
  - Read/Write from/to localStorage

### Subscripts
  - Suscribing and Listening to WebSockets for messages
  - Subscribing to Real-Time Databases like firestore 


