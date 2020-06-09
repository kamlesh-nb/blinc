import firebase from 'firebase'

const firebaseConfig = {
  apiKey: "AIzaSyBdv4zaLrUcAIvjV39OI4vU9qpTI14CUQE",
  authDomain: "blinc-demo.firebaseapp.com",
  databaseURL: "https://blinc-demo.firebaseio.com",
  projectId: "blinc-demo",
  storageBucket: "blinc-demo.appspot.com",
  messagingSenderId: "917564745815",
  appId: "1:917564745815:web:6e084b7d56b585ceba9b12",
  measurementId: "G-KBS7XZX95Z",
};

const app = firebase.initializeApp(firebaseConfig)
let db = firebase.firestore(app)
let auth = firebase.auth(app)
export { db, auth }