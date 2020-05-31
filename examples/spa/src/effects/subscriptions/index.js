import firebase from 'firebase'
import db from '../../firebaseConfig'
import {refreshUsers} from '../../messages'

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

export default listenChangesToUsers


