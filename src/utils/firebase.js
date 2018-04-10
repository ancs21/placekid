import firebase from 'firebase'

// Required for side-effects
require("firebase/firestore");
const config = {
  apiKey: "AIzaSyCAdZOvI2cbLL1vbO9cVwKCoPsBoJWbnTk",
  authDomain: "placekidsg.firebaseapp.com",
  databaseURL: "https://placekidsg.firebaseio.com",
  projectId: "placekidsg",
  storageBucket: "",
  messagingSenderId: "830648994537"
};
firebase.initializeApp(config);

export default firebase;
