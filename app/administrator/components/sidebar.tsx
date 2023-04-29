"use client";
import React, { useState, useEffect } from "react";
import MyLogo from "../../../public/images/myLogo.svg";
import Link from "next/link";
import { usePathname } from "next/navigation";
import axios from "axios";
import { useRouter } from "next/navigation";
import useAuth from "../useAuth";
import Modal from "./modal";

interface Props {
  children: any;
}

export const SidebarToggleExport = () => {
  const isLg = window.matchMedia("(min-width: 1024px)").matches;
  const [sidebarToggle, setSidebarToggle] = useState(isLg ? true : false);
  return { sidebarToggle, setSidebarToggle };
};

export default function sidebar({ children }: Props) {
  const { sidebarToggle, setSidebarToggle } = SidebarToggleExport();
  useAuth();
  const router = useRouter();
  const [isModalLogoutOpen, setIsModalLogoutOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const Logout = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      await axios.delete(`${process.env.NEXT_PUBLIC_MY_BACKEND_URL}logout`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        withCredentials: true,
      });
      localStorage.removeItem("accessToken");
      router.push("/administrator/login");
    } catch (error) {
      console.log(error);
    }
  };

  const pathname = usePathname();

  const sidebarMenu = [
    {
      menu: "Certificates",
      link: "/certificates",
      icon: "fa-solid fa-certificate",
    },
    {
      menu: "Projects",
      link: "/projects",
      icon: "fa-solid fa-bars-progress",
    },
    {
      menu: "Skills",
      link: "/skills",
      icon: "fa-solid fa-gears",
    },
  ];

  return (
    <>
      <div className="w-full h-auto min-h-screen bg-dark-background-2">
        <div className="z-50">
          <div
            className={`fixed top-0 bottom-0 lg:left-0 p-2 w-[270px] overflow-y-auto text-center bg-background-1 dark:bg-dark-background-1 z-50 shadow-[0px_0px_10px] dark:shadow-black/50 shadow-black/10 transition-all duration-100 ${
              sidebarToggle ? "w-[270px]" : "w-[60px]"
            }`}
          >
            <div className="text-gray-100 text-xl">
              <div
                className={`p-2.5 mt-1 flex items-center ${
                  sidebarToggle
                    ? "justify-between lg:justify-between"
                    : "justify-center lg:justify-center p-0"
                }`}
              >
                <div
                  className={`w-11 h-auto ${
                    sidebarToggle ? "block" : "hidden"
                  }`}
                >
                  <MyLogo />
                </div>
                <div
                  className={`font-bold text-gray-200 text-[18px] lg:ml-3 ml-0 ${
                    sidebarToggle ? "block" : "hidden"
                  }`}
                >
                  Administrator{sidebarToggle}
                </div>
                <button
                  onClick={() => setSidebarToggle((prev) => !prev)}
                  className="rounded-full p-2 aspect-square flex justify-center items-center text-[14px] text-accent-1 dark:text-dark-accent-1 bg-background-2 dark:bg-dark-background-2 dark:hover:bg-dark-background-2/60 hover:bg-background-2/60 focus:ring-4 focus:ring-background-2/30 dark:focus:ring-dark-background-2/30 shadow-[0px_0px_10px] shadow-[#d6d6d6] dark:shadow-dark-background-1"
                >
                  <i
                    className={`fa-solid fa-angles-${
                      sidebarToggle ? "left" : "right"
                    }`}
                  ></i>
                </button>
              </div>
              <div className="my-2 bg-gray-600 h-[1px]"></div>
            </div>
            <div className="text-accent-4 dark:text-dark-accent-4">
              <ul className="flex flex-col">
                {sidebarMenu &&
                  sidebarMenu.map((sidebar: any, index: any) => (
                    <li
                      key={index}
                      className={`flex flex-col hover:text-accent-1 hover:dark:text-dark-accent-1 transition-all duration-100  text-left text-[14px] ${
                        pathname.split("/")[2] == sidebar.link.split("/")[1]
                          ? "text-accent-1 dark:text-dark-accent-1"
                          : "text-accent-4 dark:text-dark-accent-4"
                      }`}
                    >
                      <Link
                        className={`rounded-lg flex items-center ${
                          sidebarToggle ? "p-3" : "p-0 py-3 justify-center"
                        }`}
                        href={"/administrator/" + sidebar.link}
                      >
                        <i
                          className={`${sidebar.icon} ${
                            sidebarToggle ? "mr-3" : "mr-0"
                          }`}
                        ></i>
                        <div
                          className={`${sidebarToggle ? "block" : "hidden"}`}
                        >
                          {sidebar.menu}
                        </div>
                      </Link>
                    </li>
                  ))}
                <li className="flex flex-col text-accent-4 dark:text-dark-accent-4 hover:text-accent-1 hover:dark:text-dark-accent-1 text-left text-[14px] justify-self-end">
                  <button
                    className={`rounded-lg flex items-center ${
                      sidebarToggle ? "p-3" : "p-0 py-3 justify-center"
                    }`}
                    onClick={() => setIsModalLogoutOpen(true)}
                  >
                    <i
                      className={`fa-solid fa-right-from-bracket ${
                        sidebarToggle ? "mr-3" : "mr-0"
                      }`}
                    ></i>
                    <div className={`${sidebarToggle ? "block" : "hidden"}`}>
                      Logout
                    </div>
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div
          className={`${
            sidebarToggle
              ? "bg-black/50 fixed w-full h-screen z-30 transition-all duration-100 lg:hidden"
              : ""
          }`}
        ></div>
        <div
          className={`lg:pl-[120px] transition-all duration-100 ${
            sidebarToggle ? "lg:pl-[320px]" : "lg:pl-[120px]"
          } pl-[80px] py-14 lg:pr-20 pr-4 z-10`}
        >
          {children}
        </div>
      </div>

      <Modal
        isOpen={isModalLogoutOpen}
        onClose={() => setIsModalLogoutOpen(false)}
      >
        <div className="flex flex-col min-w-[100px] min-h-[100px] lg:w-[500px] w-[350px] lg:h-[300px] h-[300px] bg-dark-background-1">
          <div className="p-4 w-full border-b flex justify-end border-accent-1">
            <button
              className="text-[1.5rem] text-dark-accent-1 hover:text-dark-accent-4"
              type="button"
              onClick={() => setIsModalLogoutOpen(false)}
            >
              <i className="fa-solid fa-x"></i>
            </button>
          </div>
          <div className="h-full flex justify-center items-center lg:text-[16px] text-[12px]">
            <p>Are you sure you want to logout ?</p>
          </div>
          <div className="p-4 w-full border-t flex justify-end border-accent-1">
            <button
              onClick={() => setIsModalLogoutOpen(false)}
              className="text-white lg:text-[16px] text-[12px] bg-gray-700 hover:bg-gray-800 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-3xl px-5 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Close
            </button>
            <button
              disabled={isLoading}
              onClick={Logout}
              className="text-white lg:text-[16px] text-[12px] bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-3xl px-5 py-2.5 text-center mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
            >
              {isLoading ? "Loading..." : "Logout"}
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
}
