"use client";

import PropTypes from "prop-types";
import { createContext, useEffect, useReducer } from "react";

// third-party
import firebase from "firebase/compat/app";
import "firebase/compat/auth";

// action - state management
import accountReducer from "@/store/accountReducer";
import { LOGIN, LOGOUT } from "@/store/actions";

const config = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DB_URL,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// firebase initialize
if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

// ==============================|| FIREBASE CONTEXT & PROVIDER ||============================== //

const FirebaseContext = createContext(null);

export const FirebaseProvider = ({ children }) => {
  const [state, dispatch] = useReducer(accountReducer);

  useEffect(
    () => {
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          dispatch({
            type: LOGIN,
            payload: {
              isLoggedIn: true,
              user: {
                id: user.uid,
                email: user.email,
                name: user.displayName || "John Doe",
                photoURL: user.photoURL,
              },
            },
          });
        } else {
          dispatch({
            type: LOGOUT,
          });
        }
      });
    },

    // eslint-disable-next-line react-hooks/exhaustive-deps
    [dispatch]
  );

  const firebaseGoogleSignIn = () => {
    const provider = new firebase.auth.GoogleAuthProvider();

    return firebase.auth().signInWithPopup(provider);
  };

  const logout = () => firebase.auth().signOut();

  return (
    <FirebaseContext.Provider
      value={{
        ...state,
        login: () => {},
        firebaseGoogleSignIn,
        logout,
      }}
    >
      {children}
    </FirebaseContext.Provider>
  );
};

FirebaseProvider.propTypes = {
  children: PropTypes.node,
};

export default FirebaseContext;
