import firebase from 'firebase'
import { db, auth } from '../../firebaseConfig'
import {refreshUsers} from '../../messages'
import appState from '../../globals/appState'

const listenChangesToUsers = () => {
  let collection = db.collection("users")
  let detach;

  const subscribe = (dispatch) => {
   detach = collection.onSnapshot((doc) => {
    let users = []
    doc.forEach((k) =>{
      users.push(k.data())
    })
    dispatch(refreshUsers(users))
   })
  }

  const unsubscribe = () => {
    detach()
  }
  return { subscribe, unsubscribe }
}


const listenToAuthStateChange = () => {
  let listen
  const subscribe = (dispatch) => {
    listen = appState.on(()=>{
      dispatch({type: 'AUTH_CHANGED', payload: appState.get()})
    })
  }

  const unsubscribe = () => {
    appState.off(listen)
  }
  return { subscribe, unsubscribe }
}
export { listenChangesToUsers, listenToAuthStateChange }


