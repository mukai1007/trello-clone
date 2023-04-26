import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";

var config = {
  apiKey: "AIzaSyBpmn-RlJOh2w4xxUOze9AHJemt4FS_WGo",
  authDomain: "react-trello-app-a23b3.firebaseapp.com",
  projectId: "react-trello-app-a23b3",
  storageBucket: "react-trello-app-a23b3.appspot.com",
  messagingSenderId: "572997248170",
  appId: "1:572997248170:web:cb29ae7a4324ec28ae1cd3",
  databaseURL:
    "https://react-trello-app-a23b3-default-rtdb.europe-west1.firebasedatabase.app/",
};

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

const auth = firebase.auth();
const db = firebase.database();

export { auth, db };