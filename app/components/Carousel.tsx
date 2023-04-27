"use client";
import React, { useEffect, useState } from "react";
import useSWR from "swr";
import axios from "axios";
import Image, { ImageLoader } from "next/image";
import Link from "next/link";
import Loading from "../loading";

const getCertificates = async () => {
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_MY_BACKEND_URL}certificates`
  );
  return res.data;
};

export default function CertificateSection() {
  const myLoader: ImageLoader = ({ src }) => {
    return `${process.env.NEXT_PUBLIC_MY_BACKEND_URL}uploads/certificates/images/${src}`;
  };
  const { data } = useSWR("certificates", getCertificates);

  const dataLength = data ? data.length - 1 : 0;

  const [index, setIndex] = useState(0);
  const nextSlide = () => {
    clearTimeout(autoSlider);
    setIndex(index == dataLength ? 0 : index + 1);
  };
  const prevSlide = () => {
    clearTimeout(autoSlider);
    setIndex(index == 0 ? dataLength : index - 1);
  };

  const autoSlider = setTimeout(() => {
    nextSlide();
  }, 5000);

  useEffect(() => {
    clearTimeout(autoSlider);
  }, []);

  const renderItems = [];
  for (let i = 0; i < 9; i++) {
    renderItems.push(
      <div key={i} className="w-96 h-auto lg:p-4 p-5">
        <div className="h-full w-auto flex flex-col rounded-lg bg-background-2 dark:bg-dark-background-2 shadow-[0px_0px_3px] shadow-[#d6d6d6] dark:shadow-dark-background-1 overflow-hidden p-2 justify-between">
          <Loading />
        </div>
      </div>
    );
  }
  return (
    <>
      <div className="relative flex justify-center items-center h-fit w-fit">
        <div
          className={`lg:w-384 w-96 flex items-center overflow-hidden relative`}
          style={{ minHeight: "250px" }}
        >
          <div
            className="w-auto h-full flex items-center transition-transform duration-500"
            style={{ transform: `translateX(-${index * 384}px)` }}
          >
            {data ? (
              data?.map((img: any, index: any) => (
                <div key={index} className="w-96 h-auto lg:p-4 p-5">
                  <div className="h-full w-auto flex flex-col rounded-lg bg-background-2 dark:bg-dark-background-2 shadow-[0px_0px_3px] shadow-[#d6d6d6] dark:shadow-dark-background-1 overflow-hidden p-2 justify-between">
                    <div className="flex hover:opacity-90">
                      <Link
                        href={`${process.env.NEXT_PUBLIC_MY_BACKEND_URL}uploads/certificates/images/${img.image}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Image
                          src={img.image}
                          loader={myLoader}
                          width={500}
                          height={500}
                          alt="test"
                          className="w-full h-auto"
                          priority={true}
                        />
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
        <button
          className={`flex absolute z-10 w-10 h-10 justify-center items-center rounded-full bg-black/80 hover:bg-black/60 shadow-[0px_0px_3px] shadow-background-1 dark:shadow-dark-background-1 text-white right-[10px] focus:ring-4 focus:ring-black/30`}
          onClick={nextSlide}
        >
          <i className="fa-solid fa-chevron-right"></i>
        </button>
        <button
          className={`flex absolute z-10 w-10 h-10 justify-center items-center rounded-full bg-black/80  hover:bg-black/60 shadow-[0px_0px_3px] shadow-background-1 dark:shadow-dark-background-1 text-white left-[10px] focus:ring-4 focus:ring-black/30`}
          onClick={prevSlide}
        >
          <i className="fa-solid fa-chevron-left"></i>
        </button>
      </div>
    </>
  );
}
