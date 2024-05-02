import axios from "axios";
import * as URLS from "../constants/urls";
import { auth } from "./firebase.js";

export const redirectToAccount = () => {
  let scopes =
    "&scope=https://www.googleapis.com/auth/gmail.send,https://www.googleapis.com/auth/gmail.compose,https://www.googleapis.com/auth/gmail.modify,https://www.googleapis.com/auth/gmail.addons.current.action.compose,https://mail.google.com/";
  window.location.href = `${URLS.LOGIN}/?origin=${
    window.location.href.split("?")[0]
  }${scopes}`;
};

export const checkSession = async () => {
  let currenToken = localStorage.getItem("csrfToken");
  try {
    await axios.post(
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
  } catch (err) {
    return new Promise((_, reject) => {
      reject(err);
    });
  }
};

export const getCurrentUser = async () => {
  return auth.currentUser.getIdTokenResult();
};

export const cerrarSesion = async () => {
  var token = "";
  localStorage.setItem("csrfToken", "");
  if (auth.currentUser) {
    return auth.currentUser
      .getIdToken(true)
      .then((id_token) => {
        token = id_token;
        return axios.get(`${URLS.REDIRECT_BASE}/getCSRFToken`, {
          credentials: "include",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      })
      .then((res) => res.data)
      .then((res) => {
        return axios.post(
          `${URLS.REDIRECT_BASE}/sessionLogout?_csrf=${res.csrfToken}`,
          {},
          {
            credentials: "include",
          }
        );
      })
      .then((res) => auth.signOut())
      .catch((err) => console.log(err));
  } else {
    return null;
  }
};
