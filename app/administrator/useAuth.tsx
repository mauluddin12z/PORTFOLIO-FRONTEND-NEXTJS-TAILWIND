"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import axios from "axios";

export default function useAuth() {
  const [isAuth, setIsAuth] = useState(false);
  const [msgToken, setMsgToken] = useState("");
  const [token, setToken] = useState("");
  const [expire, setExpire] = useState<number>(0);
  const [users1, setUsers1] = useState([]);
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
      const response = await axios.get(`${process.env.NEXT_PUBLIC_MY_BACKEND_URL}token`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        withCredentials: true,
      });
      setToken(response.data.accessToken);
      const decoded: any = jwt_decode(response.data.accessToken);
      setExpire(decoded.exp);
      setIsAuth(true)
    } catch (error: any) {
      if (error.response) {
        router.push("/administrator/login");
      }
    }
  };

  const axiosJWT = axios.create();

  axiosJWT.interceptors.request.use(
    async (config) => {
      const isExpired = Date.now() > expire * 1000;
      if (isExpired) {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_MY_BACKEND_URL}token`,{
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          withCredentials: true,
        });
        config.headers.Authorization = `Bearer ${response.data.accessToken}`;
        localStorage.setItem("accessToken", response.data.accessToken);
        setToken(response.data.accessToken);
        const decoded: any = jwt_decode(response.data.accessToken);
        setExpire(decoded.exp);
        setIsAuth(true)
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
  return { isAuth, msgToken, accessToken, axiosJWT, token };
}
