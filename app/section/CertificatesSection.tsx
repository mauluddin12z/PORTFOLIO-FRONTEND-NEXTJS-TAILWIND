"use client";
import React, { useState } from "react";
import useSWR from "swr";
import axios from "axios";
import Image, { ImageLoader } from "next/image";
import Link from "next/link";
import Wave from "@/public/images/wave.svg";
import LoadingData from "../loadingData";
import Carousel from "../components/Carousel";

const getCertificates = async () => {
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_MY_BACKEND_URL}certificates`
  );
  return res.data;
};

export default function CertificateSection() {
  const { data } = useSWR("certificates", getCertificates);
  const [isRenderingImage, setIsRenderingImage] = useState(true);
  const renderItems = [];
  for (let i = 0; i < 9; i++) {
    renderItems.push(
      <div key={i} className="lg:w-4/12 w-full h-[280px] p-4 z-10 rounded-lg">
        <div className="rounded-lg bg-background-2 dark:bg-dark-background-2 flex flex-col shadow-[0px_0px_3px] shadow-background-1 dark:shadow-dark-background-1 h-full w-full overflow-hidden">
          <LoadingData />
        </div>
      </div>
    );
  }
  return (
    <div className="relative">
      <div className="absolute bottom-0 left-0 right-0 lg:block hidden">
        <Wave />
      </div>
      <div className="max-w-7xl mx-auto h-full py-28 overflow-hidden">
        <div className="mb-12 relative flex justify-center">
          <span className="mb-4 font-semibold text-[32px] text-center text-accent-1 dark:text-dark-accent-1">
            Certificates
          </span>
          <div className="w-[320px] h-1 rounded-full bg-accent-1 dark:bg-dark-accent-1 shadow-[0px_0px_5px] dark:shadow-[0px_0px_10px] shadow-accent-1 dark:shadow-dark-accent-1 absolute bottom-0"></div>
        </div>
        <div className="lg:flex hidden flex-wrap relative">
          <div className="border-[12px] border-accent-2 dark:border-dark-accent-2 w-[300px] h-[300px] rounded-full absolute top-[10%] left-[20%] shadow-[0px_0px_10px] shadow-accent-2 dark:shadow-dark-accent-2 lg:block hidden"></div>
          <div className="border-[12px] border-accent-1 dark:border-dark-accent-1 w-[100px] h-[100px] rounded-full absolute bottom-[300px] left-[500px] shadow-[0px_0px_10px] shadow-accent-1 dark:shadow-dark-accent-1 lg:block hidden"></div>
          <div className="border-[12px] border-accent-3 dark:border-dark-accent-3 w-[400px] h-[400px] rounded-full absolute bottom-[30%] left-[50%] shadow-[0px_0px_10px] shadow-accent-3 dark:shadow-dark-accent-3 hidden lg:block"></div>
          {data ? (
            data?.map((certif: any, index: number) => (
              <div
                key={index}
                className="lg:w-4/12 w-full min-h-[280px] h-auto p-4 z-10"
              >
                <div className="bg-background-2 dark:bg-dark-background-2 flex justify-center items-center flex-col shadow-[0px_0px_3px] shadow-[#d6d6d6] dark:shadow-dark-background-1 h-full w-full">
                  <div className="flex flex-col p-3 justify-center items-center">
                    <div className="flex hover:opacity-90">
                      <Link
                        href={`${certif.pdfUrl}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {isRenderingImage && (
                          <div className="w-[350px] h-[280px] hover:opacity-90">
                            <LoadingData />
                          </div>
                        )}
                        <Image
                          src={certif.imageUrl}
                          alt="certificate"
                          width={500}
                          height={500}
                          className={`w-full h-auto ${
                            !isRenderingImage ? "block" : "hidden"
                          }`}
                          priority={true}
                          unoptimized={true}
                          onLoad={() => setIsRenderingImage(false)}
                        />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <>{renderItems}</>
          )}
        </div>
        <div className="flex justify-center items-center lg:hidden">
          <Carousel />
        </div>
      </div>
    </div>
  );
}
