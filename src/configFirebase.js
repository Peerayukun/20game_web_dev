import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'

const firebaseConfig = firebase.initializeApp({
    apiKey: "",
    authDomain: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: "",
    appId: ""
  });

 export default firebaseConfig
