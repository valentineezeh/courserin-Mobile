import * as firebase from 'firebase';

// initialize firebase
const firebaseConfig = {
  apiKey: "AIzaSyB1RFUW6IMARrpm6ERUt8qTt88pNmjPHfQ",
  authDomain: "manager-6ad12.firebaseapp.com",
  databaseURL: "https://manager-6ad12.firebaseio.com",
  projectId: "manager-6ad12",
  storageBucket: "manager-6ad12.appspot.com",
  messagingSenderId: "827525195476",
  appId: "1:827525195476:web:6c4bb22e433404f6"
};


firebase.initializeApp(firebaseConfig);

export default firebase;