"use client"
import LoadPage from "@/components/LoadPage";
import { cerrarSesion } from "@/services/auth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function LoginPage() {
  const navigate = useRouter();

  const logout = async () => {
    await cerrarSesion();
    navigate.push("/login");
  };

  useEffect(() => {
    logout();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <LoadPage label={"Cerrando sesion"} />;
}
