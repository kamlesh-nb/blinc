import axios from 'axios'
import {showUsers} from '../../messages'
import db from '../../firebaseConfig'

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

export { getUsers, cmdAddUser }