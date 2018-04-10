import firebase from 'firebase'

// Required for side-effects
require("firebase/firestore");
const config = {
  apiKey: "AIzaSyAkn4co0gBGOy0Ovxh88niGfdPaMgowe3Q",
  authDomain: "mamnonchobemap.firebaseapp.com",
  databaseURL: "https://mamnonchobemap.firebaseio.com",
  projectId: "mamnonchobemap",
};
firebase.initializeApp(config);

export default firebase;
