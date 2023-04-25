"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import axios from "axios";

export default function useAuth() {
  const [isAuth, setIsAuth] = useState(false);
  const [msgToken, setMsgToken] = useState("");
  const router = useRouter();
  const accessToken: any =
    typeof localStorage !== "undefined"
      ? localStorage.getItem("accessToken")
      : "";

  useEffect(() => {
    refreshToken();
  }, []);
  const refreshToken = async () => {
    try {
      const decoded: any = jwt_decode(accessToken);

      const expirationTime = decoded.exp * 1000;
      const isExpired = Date.now() > expirationTime;

      const getToken = async () => {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_MY_BACKEND_URL}token`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
            withCredentials: true,
          }
        );
        return response;
      };
      if (isExpired) {
        const response = await getToken();
        const newAccessToken = response.data.accessToken;
        localStorage.setItem("accessToken", newAccessToken);
        setIsAuth(true);
        setMsgToken(response.data.msg);
      } else {
        const response = await getToken();
        setIsAuth(true);
        setMsgToken(response.data.msg);
      }
    } catch (error: any) {
      router.push("/administrator/login");
      setMsgToken(error.response?.data.msg);
    }
  };
  return { isAuth, msgToken, accessToken };
}
