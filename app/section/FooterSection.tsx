"use client";
import React, { useCallback, useState } from "react";
import Link from "next/link";

export default function FooterSection() {
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
  return (
    <div className="max-w-7xl mx-auto flex lg:items-center">
      <div className="flex flex-col justify-between p-20 gap-8 w-full items-center">
        <ul className="flex lg:flex-row flex-col lg:gap-[40px] gap-[30px]">
          {navLink?.map((navLink, index) => (
            <li key={index}>
              <a
                href={navLink.link}
                className="block text-accent-4 text-center dark:text-dark-accent-4 hover:text-accent-1 dark:hover:text-dark-accent-1 text-[16px] font-medium"
                aria-current="page"
                onClick={() => setMenu(false)}
              >
                {navLink.name}
              </a>
            </li>
          ))}
        </ul>
        <div className="flex gap-x-3">
          {socialMedia?.map((socialMedia: any, index: any) => (
            <div key={index}>
              <Link
                aria-label={socialMedia.link}
                href={socialMedia.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent-4 dark:text-dark-accent-4 hover:text-accent-1 dark:hover:text-dark-accent-1 transition-all duration-100 text-[28px]"
              >
                <i className={`fa-brands fa-${socialMedia.icon}`}></i>
              </Link>
            </div>
          ))}
        </div>
        <div className="text-accent-4 text-center dark:text-dark-accent-4 text-[14px]">
          © Copyright {new Date().getFullYear()} by Hidayat Mauluddin
        </div>
      </div>
    </div>
  );
}
