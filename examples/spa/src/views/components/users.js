import { button, table, tbody, tr, td } from '../../../../../build/tags'

import {selectUser} from '../../messages';

const Users = (items, dispatch) => {
  return table({}, [
    tbody({},
      items.map((user) => {
        return tr({}, [
          td({text: user.username}),
          td({text: user.firstname}),
          td({text: user.lastname}),
          td({text: user.email}),
          td({}, [
            button({text: 'Select', class: 'btn', onclick: (e)=>{ dispatch(selectUser('user')) }})
          ])
        ])
      })  
    )
  ])
} 

export default Users