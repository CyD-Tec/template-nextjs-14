"use client";
import PropTypes from "prop-types";
import { useEffect } from "react";
// import { useNavigate } from 'react-router-dom';

// project imports
import useAuth from "@/hooks/useAuth";
import { usePathname, useRouter } from "next/navigation";
import LoginPage from "@/app/(authentication)/login/page";
import { checkSession } from "@/services/auth";

// ==============================|| AUTH GUARD ||============================== //

/**
 * Authentication guard for routes
 * @param {PropTypes.node} children children element/node
 */
// @ts-ignore
const AuthGuard = ({ children }) => {
  const { isLoggedIn } = useAuth();
  const pathname = usePathname();
  const router = useRouter();
  const fixPath = pathname.replace("/", "");
  const excludeList = ["login", "logout"];
  useEffect(() => {
    if (!isLoggedIn) {
      //Revisa si es que se tienen una credencial valida guadada en el navegador, en caso de que no se tengan
      //y se este inrgesando a una vista que no sea login o logout se redirigira a login
      //pd: logout se agrego porque en dicha vista se desvincula la credencial
      checkSession().catch((err) => {
        if (!excludeList.includes(fixPath)) {
          router.push("/login");
        }
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return children;
};

AuthGuard.propTypes = {
  children: PropTypes.node,
};

export default AuthGuard;
