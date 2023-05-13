"use client";
import React, { useEffect, useRef, useState } from "react";
import MyLogo from "@/public/images/myLogo.svg";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";
import useAuth from "../useAuth";
import LoadingForBtn from "@/app/loadingForBtn";


export default function page() {
  const router = useRouter();
  type Timeout = ReturnType<typeof setTimeout>;
  const { isAuth, msgToken } = useAuth();
  useEffect(() => {
    if (isAuth) {
      router.push("/administrator/certificates");
    }
    if (msgToken !== null) {
      setMsg(msgToken);
    }
  }, [isAuth, msgToken]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const timeoutRef = useRef<Timeout | null>(null);
  const formData = new FormData();
  formData.append("email", email);
  formData.append("password", password);
  const handleLogin = async (e: any) => {
    e.preventDefault();
    setIsLoading(true)
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_MY_BACKEND_URL}login`,
        formData,
        {
          withCredentials: true,
        }
      );
      localStorage.setItem("accessToken", response.data.accessToken);
      router.push("/administrator/certificates");
    } catch (error: any) {
      if (error.response) {
        setMsg(error.response.data.msg);
      }
    }
  };

  if (timeoutRef.current !== null) {
    clearTimeout(timeoutRef.current);
  }
  timeoutRef.current = setTimeout(() => {
    setMsg("");
  }, 5000);
  return (
    <div>
      <section className="bg-gray-50 dark:bg-gray-900 w-full h-screen flex justify-center items-center">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0 w-[500px] h-[500px] ">
          <div className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
            <MyLogo className="w-[40px] h-[40px] text-accent-2 dark:text-dark-accent-2 mr-2" />
            <span className="font-semibold text-[20px] text-accent-1 dark:text-dark-accent-1 lg:block hidden">
              MHM.
            </span>
          </div>
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <div className="text-center">
                <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white mb-3">
                  Sign in to your account
                </h1>
                <div className="text-[13px] text-red-700">{msg}</div>
              </div>
              <form className="space-y-4 md:space-y-6" onSubmit={handleLogin}>
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Your email
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="name@company.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  disabled={isLoading}
                >
                  {isLoading ? <LoadingForBtn /> : "Sign In"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
