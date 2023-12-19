"use client";

import HeaderSection from "./section/HeaderSection";
import OpeningSection from "./section/OpeningSection";
import CertificatesSection from "./section/CertificatesSection";
import ProjectsSection from "./section/ProjectsSection";
import AboutSection from "./section/AboutSection";
import SkillsSection from "./section/SkillsSection";
import FooterSection from "./section/FooterSection";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    AOS.init();
  }, []);
  return (
    <>
      <div className="fixed bottom-0 right-0 z-20">
        <div className="lg:w-28 lg:h-28 w-14 h-14">
          <a
            aria-label="backtotop"
            href="#"
            className="flex justify-center items-center w-10 h-10 rounded-full text-accent-1 dark:text-dark-accent-1 bg-background-2 dark:bg-dark-background-2 dark:hover:bg-dark-background-2/60 hover:bg-background-2/60 focus:ring-4 focus:ring-background-2/30 dark:focus:ring-dark-background-2/30 shadow-[0px_0px_10px] shadow-[#d6d6d6] dark:shadow-dark-background-1 my-animate-bounce"
          >
            <i className="fa-solid fa-angles-up"></i>
          </a>
        </div>
      </div>
      <section
        id="home"
        className="dark:bg-dark-background-1 bg-background-1 bg w-full"
      >
        <HeaderSection />
        <OpeningSection />
      </section>
      <section
        id="certificates"
        className="bg-background-2 dark:bg-dark-background-2 w-full scroll-mt-10"
      >
        <CertificatesSection />
      </section>
      <section
        id="projects"
        className="dark:bg-dark-background-1 bg-background-1 w-full scroll-mt-10"
      >
        <ProjectsSection />
      </section>
      <section
        id="skills"
        className="bg-background-2 dark:bg-dark-background-2 w-full scroll-mt-16"
      >
        <SkillsSection />
      </section>
      <section
        id="about"
        className="dark:bg-dark-background-1 bg-background-1 w-full"
      >
        <AboutSection />
      </section>
      <section className="dark:bg-dark-background-2 bg-background-2 w-full">
        <FooterSection />
      </section>
    </>
  );
}
