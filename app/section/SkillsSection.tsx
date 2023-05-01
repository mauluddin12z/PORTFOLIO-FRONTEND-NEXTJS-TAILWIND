import React from "react";
import Image, { ImageLoader } from "next/image";
import Link from "next/link";
import _3lines from "@/public/images/_3lines.svg";
import useSWR from "swr";
import axios from "axios";
import LoadingData from "../loadingData";

const getSkills = async () => {
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_MY_BACKEND_URL}skills`
  );
  return res.data;
};

export default function SkillsSection() {
  const { data } = useSWR("skills", getSkills);
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
                <div key={index} className="w-4/12 lg:w-2/12 aspect-square p-1">
                  <div className="bg-background-1/50 dark:bg-dark-background-1/50 rounded-2xl w-full h-full flex justify-center items-center">
                    <Image
                      src={skill.imageUrl}
                      width={500}
                      height={500}
                      className="full h-auto rounded-2xl my-animate-bounce p-5"
                      alt="skills"
                      unoptimized={true}
                      priority={true}
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
