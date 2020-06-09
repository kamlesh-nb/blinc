import axios from 'axios'
import {showUsers} from '../../messages'
import { db, auth } from '../../firebaseConfig'
import appState from '../../globals/appState'

const getUsers = (params, dispatch) => {
  axios.get(`https://reqres.in/api/users?page=${params.pageNo}`)
  .then(function (response) {
    dispatch(showUsers(response))
  })
  .catch(function (error) {
    console.log(error);
  })
}

const cmdAddUser = (doc) => {
  db.collection('users').add(doc).then((value) =>{
    console.log(value);
  }).catch((e)=>{
    console.log(e);
  })
}

const loginToApp = (user, dispatch) => {
  auth.signInWithEmailAndPassword(user.email, user.password).then((user) => {
    appState.set({isLoggedIn: true, user: user})
    dispatch({ type:'SIGN_IN_SUCCESS', payload: appState.get() })
  })
}

const logoutFromApp = (dispatch) => {
  auth.signOut().then(() => {
    appState.set({isLoggedIn: false, user: {}})
    dispatch({type:'SIGN_OUT_SUCCESS', payload: appState.get()})
  })
}

const signUpToApp = (user, dispatch) => {
  auth.createUserWithEmailAndPassword(user.email, user.password).then((user) => {
    appState.set({isLoggedIn: true, user: user})
    dispatch({ type:'SIGN_UP_SUCCESS', payload: appState.get() })
  })
}

export { getUsers, cmdAddUser, loginToApp, signUpToApp, logoutFromApp }