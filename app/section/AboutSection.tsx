import React from "react";
import Link from "next/link";

export default function AboutSection() {
  return (
    <div className="relative">
      <div className="max-w-7xl mx-auto h-full py-28">
        <div className="flex flex-col p-6">
          <div className="mb-12 relative flex justify-center">
            <span className="mb-4 font-semibold text-[32px] text-center text-accent-1 dark:text-dark-accent-1">
              About
            </span>
            <div className="w-[220px] h-1 rounded-full bg-accent-1 dark:bg-dark-accent-1 shadow-[0px_0px_5px] dark:shadow-[0px_0px_10px] shadow-accent-1 dark:shadow-accent-1 absolute bottom-0"></div>
          </div>
          <div className="flex flex-col">
            <div className="text-accent-4 dark:text-dark-accent-4 text-[16px] mb-7">
              I am a Bachelor of Information Systems at Sriwijaya University
              graduated on July 29 2022, and currently studying for a Masters in
              Computer Science at Sriwijaya University. Eager to apply my
              academic knowledge and practical skills. Familiar with Next Js,
              and React Js for front end web development. Fueled by a deep
              passion for technology, I am enthusiastic about channeling my
              academic expertise and practical skills into the realm of Front
              end Web Development. Proficient in Next Js, I am well-versed in
              crafting engaging and responsive user interfaces, and I am eager
              to contribute to innovative projects that push the boundaries of
              modern web development
            </div>
            <div className="flex flex-col">
              <div className="font-bold text-accent-1 dark:text-dark-accent-1 text-[24px] mb-2">
                Education
              </div>
              <div className="mb-5">
                <div className="font-semibold text-accent-1 dark:text-dark-accent-1 text-[16px]">
                  Master of Computer Science - Sriwijaya University, Faculty of
                  Computer Science (2023 - Present)
                </div>
                <div className="text-accent-4 dark:text-dark-accent-4 text-[16px] flex flex-col">
                  <span>Major: Computer Science</span>
                </div>
              </div>
              <div className="mb-5">
                <div className="font-semibold text-accent-1 dark:text-dark-accent-1 text-[16px]">
                  Bachelor of Information Systems - Sriwijaya University,
                  Faculty of Computer Science (2018 - 2022)
                </div>
                <div className="text-accent-4 dark:text-dark-accent-4 text-[16px] flex flex-col">
                  <span>Major: Information System</span>
                  <span>GPA: 3.66</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
