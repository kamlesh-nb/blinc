import firebase from 'firebase'

const firebaseConfig = {

};

const app = firebase.initializeApp(firebaseConfig)
let db = firebase.firestore(app)
export default db