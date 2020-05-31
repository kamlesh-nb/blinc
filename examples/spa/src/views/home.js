import { div, p, ul, li, br, pre, code, formFields } from '../../../../build/tags'

const Home = (props) => {
  let init = [0]
  const update = (msg, state) =>{

  }
  const view = (state, dispatch) => {
    const {fields, setValue} = formFields()
    
    return div({class: "container"},[
     p({},[
       "Side effects are the way through which programs interact with the outside world. \
       as per wikipedia, an operation, function or expression is said to have a side effect if it \
       modifies some state variable value(s) outside its local environment, that is to say has an \
       observable effect besides returning a value (the main effect) to the invoker of \
       the operation. State data updated \"outside\" of the operation may be maintained \
       \"inside\" a stateful object or a wider stateful system within which the operation \
       is performed." 
     ]),

     p({},[
      "Commands and Subscriptions can be used to handle side effects, in blinc;" 
    ]),
    ul({},[
      li({},[
        "Commands",
        ul({},[
          li({}, [
            "Storing and retrieving data from the Database Servers",
          ]),
          li({},[
            "Storeing and retriving data from the localStorage",
          ]),
          li({},[
            "Communicating with external world by sending Http requests",
          ])
        ])
      ]),
      br(),
      li({},[
        "Subscriptions",
        ul({},[
          li({}, [
            "Subscribing and listening to WebSocket messages",
          ]),
          li({}, [
            "Listening to Geo Location changes",
          ])
        ])
      ])
    ])

    ])
  }

  return { init, update, view }
}

export default Home