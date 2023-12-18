import React from "react";
import Image from "next/image";
import PasFoto from "@/public/images/pasfoto.png";
import RectangleDotFill from "@/public/images/rectangleDotFill.svg";
import StripeCircle from "@/public/images/stripeCircle.svg";
import PlusSymbol from "@/public/images/plusSymbol.svg";
import Link from "next/link";

export default function OpeningSection() {
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
    <div className="max-w-7xl mx-auto h-full flex justify-center items-center">
      <div className="absolute top-[70px] right-[70px]">
        <div className="w-[400px] h-[400px] bg-background-2 dark:bg-dark-background-2 rounded-full blur-3xl hidden lg:block"></div>
      </div>
      <div className="absolute -top-[200px] -left-[200px]">
        <div className="w-[400px] h-[400px] bg-accent-2/20 dark:bg-dark-accent-2/20  rounded-full blur-3xl hidden lg:block"></div>
      </div>
      <div className="absolute w-[300px] h-[300px] bg-background-2/50 dark:bg-dark-background-2/30 z-10 top-48 left-56 rounded-full shadow-[0px_0px_4px] shadow-background-1/50 dark:shadow-dark-background-1/50 lg:block hidden"></div>
      <div className="flex flex-col lg:flex-row z-10 w-full h-full lg:py-36 py-10 lg:mt-10 p-6">
        <div className="flex lg:w-6/12 w-full items-center relative p-6 lg:p-0 order-2 lg:order-1">
          <div className="absolute w-[90px] h-[90px] border-accent-1 dark:border-dark-accent-1 border-2 top-6 left-6 shadow-[0px_0px_4px] shadow-accent-1 dark:shadow-dark-accent-1 lg:block hidden"></div>
          <div className="absolute w-[90px] h-[90px] border-accent-2 dark:border-dark-accent-2 border-2 top-10 left-10 shadow-[0px_0px_4px] shadow-accent-2 dark:shadow-dark-accent-2 lg:block hidden"></div>
          <div className="absolute w-[90px] h-[90px] border-accent-3 dark:border-dark-accent-3 border-2 top-28 right-10 rounded-full border-dashed lg:block hidden"></div>
          <div className="flex flex-col leading-tight">
            <div className="font-semibold lg:text-[58px] text-[42px] text-accent-1 dark:text-dark-accent-1 mb-5">
              Halo, saya
              <br />
              <div className="text-accent-2 dark:text-dark-accent-2">
                Hidayat Mauluddin
              </div>
            </div>
            <div className="text-[16px] text-accent-4 dark:text-dark-accent-4 z-20 lg:w-10/12 w-full mb-10 text-justify">
              I am a Fullstack Web Developer with experience in building complex
              and dynamic web applications, utilizing cutting-edge technologies
              in the industry such as HTML, CSS, JavaScript, Node.js, and React.
              If you are in need of a Full Stack Developer or someone in a
              similar field, please feel free to contact me.
            </div>
            <div className="flex gap-x-6 items-center">
              <Link
                href={"https://wa.me/6281369982678"}
                target="_blank"
                className="w-[120px] h-[40px] flex justify-center items-center text-white bg-accent-2 dark:bg-dark-accent-2 hover:bg-accent-2/70 dark:hover:bg-dark-accent-2/70 focus:ring-4 focus:ring-accent-2/30 dark:focus:ring-dark-accent-2/30  font-medium rounded-lg text-sm shadow-[0px_0px_12px] shadow-accent-2/50 dark:shadow-dark-accent-2/50 transition-all duration-100"
              >
                Contact Me
              </Link>
              <div className="flex gap-x-3">
                {socialMedia?.map((socialMedia: any, index: any) => (
                  <div key={index}>
                    <Link
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
            </div>
          </div>
        </div>
        <div className="flex lg:w-6/12 w-full items-center justify-center order-1 lg:order-2">
          <div className="w-full h-full p-10">
            <div className="w-full h-auto aspect-square flex items-center justify-center bg-background-2 dark:bg-dark-background-2 shadow-[0px_0px_10px] shadow-background-1 dark:shadow-dark-background-1 rounded-full relative">
              <Image
                src={PasFoto}
                alt="pasfoto"
                className="h-full w-auto z-10"
                priority={true}
              />
              <div className="absolute lg:bottom-32 lg:left lg:w-[150px] bottom-16 left-0 w-[100px] h-auto">
                <RectangleDotFill />
              </div>
              <div className="absolute lg:top-24 lg:right-24 lg:w-[180px] top-11 right-11 w-[100px] h-auto">
                <StripeCircle />
              </div>
              <div className="absolute lg:top-24 lg:left-14 lg:w-[25px] top-10 left-14 w-[15px] h-auto">
                <PlusSymbol />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
