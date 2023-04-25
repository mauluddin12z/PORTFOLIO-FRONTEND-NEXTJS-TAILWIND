"use client";
import React, { useCallback, useEffect, useState } from "react";
import { useTheme } from "next-themes";
import Link from "next/link";
import MyLogo from "@/public/images/myLogo.svg";
export default function HeaderSection() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  const [menu, setMenu] = useState(false);
  const toggleMenu = useCallback(() => {
    setMenu((prev) => !prev);
  }, [setMenu]);
  const navLink = [
    {
      name: "Home",
      link: "#",
    },
    {
      name: "Certificates",
      link: "#certificates",
    },
    {
      name: "Projects",
      link: "#projects",
    },
    {
      name: "Skills",
      link: "#skills",
    },
    {
      name: "About",
      link: "#about",
    },
  ];

  const socialMedia = [
    {
      icon: "facebook",
      link: "https://www.facebook.com/hidayat.mauludin",
    },
    {
      icon: "instagram",
      link: "https://www.instagram.com/dayatmauluddin/",
    },
    {
      icon: "linkedin",
      link: "https://www.linkedin.com/in/dayat-mauludin-15726b15b/",
    },
  ];

  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      const position = window.pageYOffset;
      const threshold = 10;
      setScrolled(position > threshold);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  if (!mounted) {
    return null;
  }
  return (
    <div
      className={`top-0 right-0 left-0 z-20 transition-all ${
        scrolled
          ? "bg-background-1 dark:bg-dark-background-1 shadow-[0px_0px_10px] dark:shadow-black/50 shadow-black/10 fixed"
          : "absolute"
      }`}
    >
      <div className="max-w-7xl p-4 mx-auto flex justify-between lg:items-center">
        <a href={"#"} className="flex items-center gap-x-3">
          <MyLogo className="w-[40px] h-[40px] text-accent-2 dark:text-dark-accent-2" />
          <span className="font-semibold text-[20px] text-accent-1 dark:text-dark-accent-1 lg:block hidden">
            MHM.
          </span>
        </a>
        <div
          className={[
            "lg:flex lg:h-auto w-auto z-40",
            menu
              ? "fixed bg-background-1 inset-0 text-accent-1 dark:text-dark-accent-1 w-full h-screen flex justify-center text-center"
              : "hidden",
          ].join(" ")}
        >
          <ul className="flex lg:flex-row flex-col lg:gap-[40px] gap-[30px] lg:mt-0 mt-40">
            {navLink?.map((navLink, index) => (
              <li key={index}>
                <a
                  href={navLink.link}
                  className="block text-accent-4 dark:text-dark-accent-4 hover:text-accent-1 dark:hover:text-dark-accent-1 text-[16px] font-medium"
                  aria-current="page"
                  onClick={() => setMenu(false)}
                >
                  {navLink.name}
                </a>
              </li>
            ))}
            <li className="flex flex-row justify-center items-center gap-x-4 mt-10 lg:hidden">
              {socialMedia?.map((socialMedia: any, index: any) => (
                <Link
                  key={index}
                  href={socialMedia.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent-4 dark:text-dark-accent-4 hover:text-accent-1 dark:hover:text-dark-accent-1 text-[24px]"
                >
                  <i className={`fa-brands fa-${socialMedia.icon}`}></i>
                </Link>
              ))}
            </li>
          </ul>
        </div>
        <div className="flex">
          <label
            htmlFor="modeToggle"
            className="rounded-lg hover:bg-background-2 dark:hover:bg-dark-background-2 flex justify-center items-center text-accent-1 dark:text-dark-accent-1 hover:text-accent-1/80 dark:hover:text-dark-accent-1 dark:hover:text-dark-accent-1/80  text-[18px] w-10 h-auto aspect-square cursor-pointer"
          >
            <i
              className={`fa-solid ${theme == "dark" ? "fa-moon" : "fa-sun"}`}
            ></i>
          </label>
          <input
            type="checkbox"
            id="modeToggle"
            onChange={(e) =>
              e.target.checked && theme === "dark"
                ? setTheme("light")
                : e.target.checked || theme === "light"
                ? setTheme("dark")
                : setTheme("light")
            }
            hidden
          />
        </div>
        <button
          onClick={toggleMenu}
          className={[
            "w-auto flex items-center justify-center lg:hidden p-2 z-50 text-accent-1 dark:text-dark-accent-1",
            menu ? "fixed right-4 top-4" : "",
          ].join(" ")}
        >
          <i className={["fa-solid", menu ? "fa-x" : "fa-bars"].join(" ")}></i>
        </button>
      </div>
    </div>
  );
}
