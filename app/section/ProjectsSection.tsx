"use client";
import React, { useState } from "react";
import useSWR from "swr";
import axios from "axios";
import Image, { ImageLoader } from "next/image";
import Link from "next/link";
import _3lines from "@/public/images/_3lines.svg";
import LoadingData from "../loadingData";

const getProjects = async () => {
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_MY_BACKEND_URL}projects`
  );
  return res.data;
};

export default function ProjectsSection() {
  const { data } = useSWR("projects", getProjects);
  const [isRenderingImage, setIsRenderingImage] = useState(true);
  const renderItems = [];
  for (let i = 0; i < 2; i++) {
    renderItems.push(
      <div className="lg:w-6/12 w-full lg:p-7 p-4 h-[410px]" key={i}>
        <div className="w-full h-full lg:p-10 p-7 rounded-xl bg-background-1 dark:bg-dark-background-1 flex flex-col justify-center shadow-[0px_0px_5px] shadow-black/20 dark:shadow-black/50">
          <LoadingData />
        </div>
      </div>
    );
  }
  return (
    <div className="relative">
      <div className="max-w-7xl mx-auto h-full py-28 lg:px-0">
        <div className="mb-12 relative flex justify-center">
          <span className="mb-4 font-semibold text-[32px] text-center text-accent-1 dark:text-dark-accent-1">
            Projects
          </span>
          <div className="w-[220px] h-1 rounded-full bg-accent-1 dark:bg-dark-accent-1 shadow-[0px_0px_5px] dark:shadow-[0px_0px_10px] shadow-accent-1 dark:shadow-dark-accent-1 absolute bottom-0"></div>
        </div>
        <div className="flex relative lg:p-0 flex-wrap">
          {data ? (
            data?.map((project: any, index: any) => (
              <div key={index} className="lg:w-6/12 w-full h-full p-6">
                <div className="lg:p-6 p-5 rounded-lg bg-background-1 dark:bg-dark-background-1 flex flex-col justify-center shadow-[0px_0px_5px] shadow-black/20 dark:shadow-black/50">
                  <Link
                    href={`${project.imageUrl}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <div className="lg:mb-5 mb-4 hover:opacity-90 flex justify-center items-center">
                      {isRenderingImage && (
                        <div className="w-[400px] h-[300px] hover:opacity-90">
                          <LoadingData />
                        </div>
                      )}
                      <Image
                        src={project.imageUrl}
                        alt="projectImg"
                        width={500}
                        height={300}
                        className={`w-full h-auto ${
                          !isRenderingImage ? "block" : "hidden"
                        }`}
                        priority={true}
                        unoptimized={true}
                        onLoad={() => setIsRenderingImage(false)}
                      />
                    </div>
                  </Link>
                  <div className="flex">
                    <Link
                      href={project.project_link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white bg-gray-800 hover:bg-gray-900 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-[12px] lg:text-[12px] px-5 py-2.5 text-center"
                    >
                      Visit website
                      <i className="fa-solid fa-arrow-up-right-from-square ml-2"></i>
                    </Link>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <>{renderItems}</>
          )}
        </div>
      </div>
    </div>
  );
}
