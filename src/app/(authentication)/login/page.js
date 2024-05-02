"use client";
import { redirectToAccount } from "@/services/auth";
import { useEffect, useState } from "react";
// import LoadPage from "./page";
// import { useNavigate } from "react-router-dom";
import { auth } from "@/services/firebase";
import { signInWithCustomToken } from "firebase/auth";

import LoadPage from "@/components/LoadPage";
import * as URLS from "@/constants/urls";
// import { homePage } from "@/static";
import { HOME_PATH } from "@/config";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  // const navigate = useNavigate();
  const navigate = useRouter();

  const [loadPage, setLoadPage] = useState(false);

  const getQueryVariable = function (variable) {
    const query = window.location.search.substring(1);
    const vars = query.split("&");
    for (let i = 0; i < vars.length; i++) {
      let pair = vars[i].split("=");
      if (pair[0] === variable) {
        return pair[1];
      }
    }
    return false;
  };

  const login = async () => {
    let currenToken = getQueryVariable("csrfToken");
    if (!currenToken) {
      currenToken = localStorage.getItem("csrfToken");
    }
    localStorage.setItem("csrfToken", currenToken);
    if (currenToken && currenToken !== "null" && currenToken !== "undefined") {
      setLoadPage(true);
      axios
        .post(
          `${URLS.REDIRECT_BASE}/verifySessionCookie`,
          {},
          {
            withCredentials: true,
            crossDomain: true,
            params: {
              _csrf: currenToken,
            },
          }
        )
        .then((response) => {
          if (response.data.token) {
            //se vincula token de Login CyDocs a la plataforma
            signInWithCustomToken(auth, response.data.token).then(() => {
              setLoadPage(false);
              navigate.push(`${HOME_PATH}`);
            });
          }
        })
        .catch((error) => {
          console.log("Error", error);
          redirectToAccount();
        });
    } else {
      redirectToAccount();
    }
  };

  useEffect(() => {
    login();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <LoadPage label={loadPage && "Iniciando sesion"} />;
}
