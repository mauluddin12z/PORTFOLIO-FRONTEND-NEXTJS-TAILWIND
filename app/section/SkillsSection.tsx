"use client";
import React, { useState } from "react";
import Image from "next/image";
import useSWR from "swr";
import axios from "axios";
import LoadingData from "../loadingData";
import driveUrlConverter from "../utils/driveUrlConverter";

const getSkills = async () => {
   const res = await axios.get(
      `${process.env.NEXT_PUBLIC_MY_BACKEND_URL}skills`
   );
   return res.data;
};

export default function SkillsSection() {
   const { data } = useSWR("skills", getSkills);
   const [isRenderingImage, setIsRenderingImage] = useState(true);
   const [hoveredIndex, setHoveredIndex] = useState(null);
   const renderItems = [];
   for (let i = 0; i < 4; i++) {
      renderItems.push(
         <div key={i} className="w-28 h-28 p-1">
            <div className="bg-background-1/50 dark:bg-dark-background-1/50 rounded-2xl w-full h-full flex justify-center items-center overflow-hidden">
               <LoadingData />
            </div>
         </div>
      );
   }
   return (
      <div className="relative">
         <div className="max-w-2xl mx-auto h-full py-28">
            <div className="flex flex-col p-6">
               <div className="mb-12 relative flex justify-center">
                  <span className="mb-4 font-semibold text-[32px] text-center text-accent-1 dark:text-dark-accent-1">
                     Skills
                  </span>
                  <div className="w-[140px] h-1 rounded-full bg-accent-1 dark:bg-dark-accent-1 shadow-[0px_0px_5px] dark:shadow-[0px_0px_10px] shadow-accent-1 dark:shadow-dark-accent-1 absolute bottom-0"></div>
               </div>
               <div className="flex flex-wrap justify-center items-center">
                  {data ? (
                     data?.map((skill: any, index: any) => (
                        <div
                           data-aos="fade-up"
                           data-aos-duration="500"
                           data-aos-easing="ease-in-out"
                           key={index}
                           className="w-4/12 lg:w-2/12 aspect-square p-1"
                        >
                           <div className="bg-background-1/50 dark:bg-dark-background-1/50 rounded-2xl w-full h-full flex justify-center items-center relative">
                              {isRenderingImage && (
                                 <div className="w-[400px] h-[300px] hover:opacity-90">
                                    <LoadingData />
                                 </div>
                              )}
                              <div
                                 className={`absolute transition-all duration-300 top-0 ${
                                    hoveredIndex === index
                                       ? "opacity-100 -translate-y-8"
                                       : "opacity-0"
                                 }`}
                              >
                                 <div className="bg-gray-100/95 rounded-lg  px-6 py-1 text-black text-xs">
                                    {skill.skill}
                                 </div>
                              </div>
                              <Image
                                 src={driveUrlConverter(skill.imageUrl)!}
                                 width={500}
                                 height={500}
                                 alt="skills"
                                 onMouseEnter={() => setHoveredIndex(index)}
                                 onMouseLeave={() => setHoveredIndex(null)}
                                 className={`w-full h-auto rounded-2xl my-animate-bounce p-5 ${
                                    !isRenderingImage ? "block" : "hidden"
                                 }`}
                                 priority={true}
                                 unoptimized={true}
                                 onLoad={() => setIsRenderingImage(false)}
                              />
                           </div>
                        </div>
                     ))
                  ) : (
                     <>{renderItems}</>
                  )}
               </div>
            </div>
         </div>
      </div>
   );
}
