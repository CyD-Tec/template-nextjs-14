import { getApp, getApps, initializeApp } from "firebase/app";
// import firebase from 'firebase/app';
// import * as firebase from "./firebase/app"; // Ruta al archivo firebase.js
import "firebase/database";
import "firebase/auth";
import * as URLS from "../constants/urls";
import axios from "axios";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DB_URL,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

const firebase = !getApps().length ? initializeApp(firebaseConfig) : getApp();

export const auth = getAuth(firebase);

export function onAuthStateChange(callback) {
  console.log("CALL BACK", callback);
  onAuthStateChanged(auth, (user) => {
    console.log("USER ", user);
    // setTimeout(() => {
    // }, 5000);
    if (user) {
      console.log("login");
      callback({ loggedIn: true, email: user.email });
    } else {
      console.log("not login");
      callback({ loggedIn: false });
    }
  });
}
export async function onPermissionCheck() {
  var provider = new firebase.auth.GoogleAuthProvider();

  let currenToken = localStorage.getItem("csrfToken");
  provider.addScope("https://www.googleapis.com/auth/gmail.send");
  provider.addScope("https://www.googleapis.com/auth/gmail.compose");
  provider.addScope(" https://www.googleapis.com/auth/gmail.modify");
  provider.addScope(" https://mail.google.com");
  // let resultPermisos = await firebase.auth().signInWithPopup(provider);

  let resultToken = await axios.post(
    `${URLS.REDIRECT_BASE}/verifySessionCookie`,
    {},
    {
      withCredentials: true,
      crossDomain: true,
      params: {
        _csrf: currenToken,
      },
    }
  );
  // console.log(resultToken)
  // if (resultToken.data.token) {
  //   firebase.auth().signInWithCustomToken(resultToken.data.token);
  // }
  console.log(resultToken);
  console.log(firebase.auth().currentUser);
  resultToken["user"] = firebase.auth().currentUser;
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(resultToken);
    }, 1500);
  });
}