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
              Saya Muhammad Hidayat Mauluddin, Lulusan Sistem Informasi S1
              Universitas Sriwijaya. Saya seorang Fullstack Web Developer dengan
              pengalaman dalam membangun aplikasi web yang kompleks dan dinamis,
              menggunakan teknologi-teknologi terkini dalam industri seperti
              HTML, CSS, JavaScript, Node.js, dan React.
            </div>
            <div className="flex flex-col">
              <div className="font-bold text-accent-1 dark:text-dark-accent-1 text-[24px] mb-2">
                Education
              </div>
              <div className="mb-5">
                <div className="font-semibold text-accent-1 dark:text-dark-accent-1 text-[16px]">
                  Universitas Sriwijaya Fakultas Ilmu Komputer (2018 - 2022)
                </div>
                <div className="text-accent-4 dark:text-dark-accent-4 text-[16px] flex flex-col">
                  <span>Jurusan: Sistem Informasi</span>
                  <span>IPK: 3.66</span>
                </div>
              </div>
              <div className="mb-5">
                <div className="font-semibold text-accent-1 dark:text-dark-accent-1 text-[16px]">
                  SMA Negeri 3 Palembang (2015 - 2018)
                </div>
                <div className=" text-accent-4 dark:text-dark-accent-4 text-[16px]">
                  <span>Jurusan: IPA</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
