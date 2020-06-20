# Blinc

A Nano Framework for building Functional Web UI Applications based on ELM Architecture. It uses pure functions to define web interfaces, and handles the side effects via commands and subscriptions, all that you can write in native JavaScript.

It uses virtual dom to facilitate the re-rendering of the view as a result of the state changes. 

# Getting Started

Blinc can be installed using npm as under...

```sh
npm i blinc
```

Blinc Web Interfaces, are easy to build using pure function composition, without the use of any markup whatsoever.

Following is a code for the simple Hello Application. Application can be bundled using webpack, you can refer the samples in the repository for the same.

```javascript

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

```

Now we will see how the command that we have defined above can be used in the view and maintain it's purity.

```javascript
//commandDemo.js

```

Following is the implementation of the Subscription. This example uses a table in firebase FiresStore database, which has following simple structure; 

```javascript
{
  username: '',
  firstname: '',
  lastname: '',
  email: ''
}
```

In below example, we have ignored the firebase app initialization code, you can refer firebase documentation for the same.

```javascript 
//subscription.js

```

Now lets see how we can use the above Subscription in view.

```javascript

```

This is still a work in progress, you can still try it and let us know if you face any difficulty by raising an issue here.

