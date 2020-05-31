import { div, input, hr, button, table, tbody, tr, td, formFields } from '../../../../build/tags'
import listenChangesToUsers from '../effects/subscriptions'
import { addSub, removeSub, addUser } from '../messages'
import { cmdAddUser } from '../effects/commands'


let initialState = {
  isSubscribed: false,
  users: []
}

const {subscribe, unsubscribe} = listenChangesToUsers()

const Subscriptions = (props) => {
  let init = [initialState]

  const update = (msg, state) =>{
    switch (msg.type) {
      case 'ADD_USER':
        return [state, [cmdAddUser, msg.payload]]
      case 'SUBSCRIBE':
        return [Object.assign({}, state, msg.payload), [subscribe]]
      case 'UNSUBSCRIBE':
        return [Object.assign({}, state, msg.payload), [unsubscribe]]
      case 'REFRESH_DATA':
        return [Object.assign({}, state, { users: msg.payload })]
      default:
        break;
    }
  }

  const view = (state, dispatch) => {
    const {fields, setValue} = formFields({
      username: '',
      firstname: '',
      lastname: '',
      email: ''
    })

    return div({class: 'container'}, [
      div({class:'row'}, [
        div({class: 'col-2'}, [
          input({id: 'username', value: fields.username, placeholder: 'Enter User Name',onchange: setValue})
        ]),
        div({class: 'col-2'}, [
          input({id: 'firstname', value: fields.firstname, placeholder: 'Enter First Name',onchange: setValue})
        ]),
        div({class: 'col-2'}, [
          input({id: 'lastname', value: fields.lastname, placeholder: 'Enter Last Name',onchange: setValue})
        ]),
        div({class: 'col-2'}, [
          input({id: 'email', value: fields.email, placeholder: 'Enter EMail',onchange: setValue})
        ]),
        div({class: 'col-4'}, [
          button({class: 'btn',text: 'Add User', onclick: (e) => {  
            dispatch(addUser(fields))
          }})
        ]),
      ]),
      hr(),
      div({class: 'row'}, [
        div({class: 'col-6'}, [
          button({class: 'btn-success',text: 'Subscribe', onclick: (e) => { dispatch(addSub(true))  }})
        ]),
        div({class: 'col-6'}, [
          button({class: 'btn-danger',text: 'Unsubscribe', onclick: (e) => { dispatch(removeSub(false)) }})
        ])
      ]),
      table({}, [
        tbody({},
          state.users.map((user) => {
            return tr({}, [
              td({text: user.username}),
              td({text: user.firstname}),
              td({text: user.lastname}),
              td({text: user.email})
            ])
          })  
        )
      ])
    ])
  }

  return { init, update, view }
}

export default Subscriptions