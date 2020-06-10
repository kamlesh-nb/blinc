# Blinc

A Nano Framework for  building Functional Web UI Applications based on ELM Architecture. It uses pure functions to define web interfaces, and handles the side effects via commands and subscriptions, all that you can write in pure JavaScript. 

> It uses virtual dom to facilitate, re-rendering of the view when the state changes, thus complies to the principle
 view = f(state)

# Getting Started

Blinc can be installed using npm as under...

```sh
npm i blinc
```

Blinc Web Interfaces, are easy to build using pure function composition, without the use of any markup whatsoever.

Following is a code for the simple Hello Application. Module bundlers like parcel and webpack can be used ti bundle the application, you can refer the examples in the repository for the same.

```javascript
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
      input({id: 'name', onchange: setValue}),
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

### Subscriptions
  - Suscribing and Listening to WebSockets for messages
  - Subscribing to Real-Time Databases like firestore 

Let's see some examples, how we can implement side effects using Commands and Subscriptions.

Following is the implementation of the Command...

```javascript
//command.js
import axios from 'axios'

const getUsers = (params, dispatch) => {
  axios.get(`https://reqres.in/api/users?page=${params.pageNo}`)
  .then(function (response) {
    dispatch({ type: "SHOW_USERS", payload: data })
  })
  .catch(function (error) {
    console.log(error);
  })
}

export default getUsers

```

Now we will see how the command that we have defined above can be used in the view and maintain it's purity.

```javascript
//commandDemo.js

import {View} from 'blinc'
import {
  div,
  button,
  table,
  tbody,
  tr,
  td,
  input,
  formFields,
} from "blinc/tags";

import { getUsers } from ".command";

let initialState = {
  page: 2,
  per_page: 6,
  total: 12,
  total_pages: 2,
  data: {
    data: [],
  },
};

const CommandDemo = (props) => {
  
  let init = [initialState];

  const update = (msg, state) => {
    switch (msg.type) {
      case "LOAD_USERS":
        /*
          we've added one more element to the array that we return
          the element that we added is an array that contains the first element as
          the command and the second element as paramenter to the command
        */
        return [state, [getUsers, msg.payload]];
      case "SHOW_USERS":
        return [Object.assign(state, msg.payload)];
      default:
        return state;
    }
  };

  const view = (state, dispatch) => {
    const { fields, setValue } = formFields();

    return div({ class: "container" }, [
      div({ class: "row" }, [
        div({ class: "col-6" }, [
          input({
            id: "pageNo",
            placeholder: "Enter page no.",
            onchange: setValue,
          }),
        ]),
        div({ class: "col-6" }, [
          button({
            class: "btn",
            text: "Load Users",
            onclick: (e) => {
              dispatch({type: 'LOAD_USERS', payload: fields});
            },
          }),
        ]),
      ]),
      table({}, [
        tbody(
          {},
          state.data.data.map((item) => {
            return tr({}, [
              td({ text: item.id }),
              td({ text: item.email }),
              td({ text: item.first_name }),
              td({ text: item.last_name }),
              td({}, [img({ src: item.avatar })]),
            ]);
          })
        ),
      ]),
    ]);
  };

  return { init, update, view };
};

let view = View(CommandDemo());
let $node = document.body;
view.mount($node);

```

Following is the implementation of the Subscription...

```javascript
//subscription.js

/**
 * This example uses a table in firebase FiresStore database, which has following simple   structure;
 * {
 *  username: '',
 *  firstname: '',
 *  lastname: '',
 *  email: ''
 * }
 * 
 * in below example, we have ignore the firebase app initialization code, you can refer firebase documentation for the same
*/

const UsersStateChange = () => {

  let collection = db.collection("users")
  let detach;

  const subscribe = (dispatch) => {
   detach = collection.onSnapshot((doc) => {
    let users = []
    doc.forEach((k) =>{
      users.push(k.data())
    })
    dispatch({ type: "REFRESH_DATA", payload: users })
   })
  }

  const unsubscribe = () => {
    detach()
  }
  return { subscribe, unsubscribe }
}

export default UsersStateChange

```

Now lets see how we can use the above Subscription in view.

```javascript
//subscriptionDemo.js

import { div, input, hr, button, formFields } from "blinc/tags";
import UsersStateChange from "./subscriptions";

let initialState = {
  isSubscribed: false,
  users: [],
};

const { subscribe, unsubscribe } = listenChangesToUsers();

const SubscriptionDemo = (props) => {
  let init = [initialState];

  const update = (msg, state) => {
    switch (msg.type) {
      case "SUBSCRIBE":
        return [Object.assign({}, state, msg.payload), [subscribe]];
      case "UNSUBSCRIBE":
        return [Object.assign({}, state, msg.payload), [unsubscribe]];
      case "REFRESH_DATA":
        return [Object.assign({}, state, { users: msg.payload })];
      default:
        return [state];
    }
  };

  const view = (state, dispatch) => {
    return div({ class: "container" }, [
     NewUser(dispatch),
      hr(),
      div({ class: "row" }, [
        div({ class: "col-6" }, [
          button({
            class: "btn-success",
            text: "Subscribe",
            onclick: (e) => {
              dispatch({ type: "SUBSCRIBE", payload: { isSubscribed: isSubscribed } });
            },
          }),
        ]),
        div({ class: "col-6" }, [
          button({
            class: "btn-danger",
            text: "Unsubscribe",
            onclick: (e) => {
              dispatch({ type: "UNSUBSCRIBE", payload: { isSubscribed: isSubscribed } });
            },
          }),
        ]),
      ]),
      Users(state.users, dispatch),
    ]);
  };

  return { init, update, view };
}

let view = View(SubscriptionDemo());
let $node = document.body;
view.mount($node);

```

It is still a work in progress, you can still try it and let us know if you face any difficulty by raising an issue here.

# License