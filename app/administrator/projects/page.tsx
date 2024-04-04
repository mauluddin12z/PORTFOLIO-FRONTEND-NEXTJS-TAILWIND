"use client";
import React, { useEffect, useState } from "react";
import Sidebar from "../components/sidebar";
import useAuth from "../useAuth";
import Loading from "@/app/loading";
import axios from "axios";
import useSWR, { useSWRConfig } from "swr";
import Image, { ImageLoader } from "next/image";
import Modal from "../components/modal";
import Alerts from "../components/alerts";
import Link from "next/link";
import driveUrlConverter from "@/app/utils/driveUrlConverter";

const getProjects = async () => {
   const res = await axios.get(
      `${process.env.NEXT_PUBLIC_MY_BACKEND_URL}projects`
   );
   return res.data;
};

export default function page() {
   const { axiosJWT, token } = useAuth();
   const { mutate } = useSWRConfig();

   const [isModalCreateOpen, setIsModalCreateOpen] = useState(false);
   const [isModalUpdateOpen, setIsModalUpdateOpen] = useState(false);
   const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);
   const [isLoading, setIsLoading] = useState(false);
   const [isRenderingImage, setIsRenderingImage] = useState(true);
   const [showAlert, setShowAlert] = useState(false);
   const [selectedId, setSelectedId] = useState<number>();
   const [alert, setAlert] = useState({
      message: "",
      textColor: "",
      bgColor: "",
      bgColorHover: "",
   });

   const [preview, setPreview] = useState("");
   const loadImage = (e: any) => {
      const image = e.target.files[0];
      setImage(e.target.files[0]);
      if (image instanceof Blob || image instanceof File) {
         setImage(e.target.files[0]);
         setPreview(URL.createObjectURL(image));
      }
   };

   const [projectName, setProjectName] = useState("");
   const [projectLink, setProjectLink] = useState("");
   const [image, setImage] = useState("");

   const getProjectById = async (id: any) => {
      const res = await axios.get(
         `${process.env.NEXT_PUBLIC_MY_BACKEND_URL}projects/${id}`
      );
      return res.data;
   };

   const handleSubmit = async (e: any) => {
      e.preventDefault();
      const formData = new FormData();
      formData.append("project_name", projectName);
      formData.append("project_link", projectLink);
      formData.append("image", image);
      setIsLoading(true);
      try {
         await axiosJWT.post(
            `${process.env.NEXT_PUBLIC_MY_BACKEND_URL}projects`,
            formData,
            {
               headers: {
                  Authorization: `Bearer ${token}`,
                  "Content-type": "multipart/form-data",
               },
            }
         );
         setIsModalCreateOpen(false);
         setPreview("");
         window.scrollTo(0, 0);
         setAlert({
            message: "Data submitted successfully!",
            textColor: "text-white",
            bgColor: "bg-green-700",
            bgColorHover: "hover:bg-green-800",
         });
         setShowAlert(false);
         setTimeout(() => {
            setShowAlert(true);
         }, 10);
      } catch (error) {
         setShowAlert(false);
         setTimeout(() => {
            setShowAlert(true);
         }, 10);
         setAlert({
            message: "Error submitting data. Please try again later.",
            textColor: "text-white",
            bgColor: "bg-red-700",
            bgColorHover: "hover:bg-red-800",
         });
      }

      setIsLoading(false);
      mutate("Projects");
   };

   const handleUpdate = async (e: any) => {
      e.preventDefault();
      const formData = new FormData();
      formData.append("project_name", projectName);
      formData.append("project_link", projectLink);
      formData.append("image", image);
      setIsLoading(true);
      try {
         await axiosJWT.patch(
            `${process.env.NEXT_PUBLIC_MY_BACKEND_URL}projects/${selectedId}`,
            formData,
            {
               headers: {
                  Authorization: `Bearer ${token}`,
                  "Content-type": "multipart/form-data",
               },
            }
         );
         setIsModalUpdateOpen(false);
         setPreview("");
         window.scrollTo(0, 0);
         setShowAlert(false);
         setTimeout(() => {
            setShowAlert(true);
         });
         setAlert({
            message: "Data updated successfully!",
            textColor: "text-white",
            bgColor: "bg-green-700",
            bgColorHover: "hover:bg-green-800",
         });
      } catch (error) {
         setShowAlert(false);
         setTimeout(() => {
            setShowAlert(true);
         });
         setAlert({
            message: "Error updated data. Please try again later.",
            textColor: "text-white",
            bgColor: "bg-red-700",
            bgColorHover: "hover:bg-red-800",
         });
      }
      setIsLoading(false);
      mutate("Projects");
   };

   const handleDelete = async (selectedId: number) => {
      setIsLoading(true);
      try {
         await axiosJWT.delete(
            `${process.env.NEXT_PUBLIC_MY_BACKEND_URL}projects/${selectedId}`,
            {
               headers: {
                  Authorization: `Bearer ${token}`,
               },
            }
         );
         setIsModalDeleteOpen(false);
         window.scrollTo(0, 0);
         setShowAlert(false);
         setTimeout(() => {
            setShowAlert(true);
         });
         setAlert({
            message: "Data deleted successfully!",
            textColor: "text-white",
            bgColor: "bg-green-700",
            bgColorHover: "hover:bg-green-800",
         });
      } catch (error) {
         setShowAlert(false);
         setTimeout(() => {
            setShowAlert(true);
         });
         setAlert({
            message: "Error deleted data. Please try again later.",
            textColor: "text-white",
            bgColor: "bg-red-700",
            bgColorHover: "hover:bg-red-800",
         });
      }
      setIsLoading(false);
      mutate("Projects");
   };
   const { data } = useSWR("Projects", getProjects);
   const dataById = useSWR(
      selectedId ? ["ProjectById", selectedId] : null,
      () => getProjectById(selectedId)
   );

   useEffect(() => {
      if (dataById.data) {
         setProjectName(dataById.data.project_name);
         setProjectLink(dataById.data.project_link);
      }
   }, [dataById.data]);

   return (
      <>
         <Sidebar>
            <div className="flex flex-col">
               <div className="font-bold text-[28px] text-accent-1 dark:text-dark-accent-1 mb-14">
                  Projects
               </div>
               <div className="flex flex-col mb-2">
                  <div className="w-full">
                     <button
                        type="button"
                        onClick={() => setIsModalCreateOpen(true)}
                        className="float-right text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                     >
                        Create
                     </button>
                  </div>
                  <div className="w-full">
                     <Alerts
                        showAlert={showAlert}
                        message={alert.message}
                        textColor={alert.textColor}
                        bgColor={alert.bgColor}
                        bgColorHover={alert.bgColorHover}
                     />
                  </div>
               </div>
               <div className="relative overflow-x-auto shadow-md rounded-md">
                  <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                     <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-accent-4 dark:text-gray-100">
                        <tr>
                           <th scope="col" className="px-6 py-3">
                              Project
                           </th>
                           <th scope="col" className="px-6 py-3">
                              Project link
                           </th>
                           <th scope="col" className="px-6 py-3">
                              Image
                           </th>
                           <th scope="col" className="px-6 py-3">
                              Action
                           </th>
                        </tr>
                     </thead>
                     <tbody>
                        {data?.map((project: any, index: any) => (
                           <tr
                              key={index}
                              className="bg-white border-b dark:bg-dark-background-1 hover:dark:bg-gray-900 dark:border-dark-background-2 transition-all duration-100"
                           >
                              <th
                                 scope="row"
                                 className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                              >
                                 {project.project_name}
                              </th>
                              <td
                                 scope="row"
                                 className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                              >
                                 <Link
                                    className="hover:text-blue-600"
                                    href={project.project_link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                 >
                                    {project.project_link}
                                 </Link>
                              </td>
                              <td className="px-6 py-4">
                                 <Link
                                    href={project.imageUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                 >
                                    {isRenderingImage && (
                                       <div className="w-[200px] aspect-square hover:opacity-90">
                                          <Loading />
                                       </div>
                                    )}
                                    <Image
                                       src={
                                          driveUrlConverter(project?.imageUrl)!
                                       }
                                       alt="skillImg"
                                       width={500}
                                       height={500}
                                       className={`w-[200px] h-auto hover:opacity-90 ${
                                          !isRenderingImage ? "block" : "hidden"
                                       }`}
                                       priority={true}
                                       unoptimized={true}
                                       onLoadingComplete={() =>
                                          setIsRenderingImage(false)
                                       }
                                    />
                                 </Link>
                              </td>
                              <td className="px-6 py-4 gap-x-6">
                                 <div className="flex flex-wrap">
                                    <button
                                       type="button"
                                       onClick={() => {
                                          setSelectedId(project.id);
                                          setIsModalUpdateOpen(true);
                                       }}
                                       className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full lg:text-sm text-[10px] px-5 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                    >
                                       Update
                                    </button>
                                    <button
                                       type="button"
                                       onClick={() => {
                                          setSelectedId(project.id);
                                          setIsModalDeleteOpen(true);
                                       }}
                                       className="text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                                    >
                                       Delete
                                    </button>
                                 </div>
                              </td>
                           </tr>
                        ))}
                     </tbody>
                  </table>
               </div>
            </div>
         </Sidebar>

         <Modal
            isOpen={isModalCreateOpen}
            onClose={() => setIsModalCreateOpen(false)}
         >
            <div className="flex flex-col min-w-[100px] lg:w-[800px] w-[300px] lg:min-h-[600px] min-h-[400px] bg-dark-background-1">
               <div className="p-4 w-full border-b flex justify-end border-accent-1">
                  <button
                     className="text-[1.5rem] text-dark-accent-1 hover:text-dark-accent-4"
                     type="button"
                     onClick={() => {
                        setIsModalCreateOpen(false), setPreview("");
                     }}
                  >
                     <i className="fa-solid fa-x"></i>
                  </button>
               </div>
               <form onSubmit={handleSubmit}>
                  <div className="flex flex-col justify-between h-full items-center lg:min-h-[600px] min-h-[400px]">
                     <div className="w-10/12 py-10">
                        <div className="mb-6">
                           <label
                              htmlFor="project"
                              className="w-full block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                           >
                              Project
                           </label>
                           <input
                              type="text"
                              id="project"
                              className="Sbg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                              placeholder="Project"
                              onChange={(e) => setProjectName(e.target.value)}
                              required
                           />
                        </div>
                        <div className="mb-6">
                           <label
                              htmlFor="projectLink"
                              className="w-full block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                           >
                              Project Link
                           </label>
                           <input
                              type="url"
                              id="projectLink"
                              className="Sbg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                              placeholder="Project Link"
                              onChange={(e) => setProjectLink(e.target.value)}
                              required
                           />
                        </div>
                        <div className="mb-6">
                           <label
                              htmlFor="image"
                              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                           >
                              Image
                           </label>
                           <input
                              type="file"
                              id="image"
                              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                              onChange={loadImage}
                              accept="image/*"
                              required
                           />
                        </div>
                        {preview ? (
                           <figure>
                              <Image
                                 width={100}
                                 height={100}
                                 src={preview}
                                 alt="Preview Image"
                                 className="w-[200px] h-auto"
                              />
                           </figure>
                        ) : (
                           ""
                        )}
                     </div>
                     <div className="p-4 w-full border-t flex justify-end border-accent-1">
                        <button
                           onClick={() => {
                              setIsModalCreateOpen(false), setPreview("");
                           }}
                           className="text-white bg-gray-700 hover:bg-gray-800 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-3xl text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
                        >
                           Close
                        </button>
                        <button
                           disabled={isLoading}
                           type="submit"
                           className="text-white bg-gray-700 hover:bg-gray-800 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-3xl text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                        >
                           {isLoading ? "Loading..." : "Submit"}
                        </button>
                     </div>
                  </div>
               </form>
            </div>
         </Modal>

         <Modal
            isOpen={isModalUpdateOpen}
            onClose={() => setIsModalUpdateOpen(false)}
         >
            <div className="flex flex-col min-w-[100px] lg:w-[800px] w-[300px] lg:min-h-[600px] min-h-[400px] bg-dark-background-1">
               <div className="p-4 w-full border-b flex justify-end border-accent-1">
                  <button
                     className="text-[1.5rem] text-dark-accent-1 hover:text-dark-accent-4"
                     type="button"
                     onClick={() => {
                        setIsModalUpdateOpen(false), setPreview("");
                     }}
                  >
                     <i className="fa-solid fa-x"></i>
                  </button>
               </div>
               <form onSubmit={handleUpdate}>
                  <div className="flex flex-col justify-between h-full items-center lg:min-h-[600px] min-h-[400px]">
                     <div className="w-10/12 py-10">
                        <div className="mb-6">
                           <label
                              htmlFor="project"
                              className="w-full block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                           >
                              Project
                           </label>
                           <input
                              type="text"
                              id="project"
                              className="Sbg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                              placeholder="project"
                              value={projectName}
                              onChange={(e) => setProjectName(e.target.value)}
                           />
                        </div>
                        <div className="mb-6">
                           <label
                              htmlFor="projectLink"
                              className="w-full block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                           >
                              Project Link
                           </label>
                           <input
                              type="url"
                              id="projectLink"
                              className="Sbg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                              placeholder="Project Link"
                              value={projectLink}
                              onChange={(e) => setProjectLink(e.target.value)}
                           />
                        </div>
                        <div className="mb-6">
                           <label
                              htmlFor="image"
                              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                           >
                              Image
                           </label>
                           <input
                              type="file"
                              id="image"
                              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                              onChange={loadImage}
                              accept="image/*"
                           />
                        </div>
                        {preview ? (
                           <figure>
                              <Image
                                 width={100}
                                 height={100}
                                 src={preview}
                                 alt="Preview Image"
                                 className="w-[200px] h-auto"
                              />
                           </figure>
                        ) : dataById.data?.image && !preview ? (
                           <figure>
                              {isRenderingImage && (
                                 <div className="w-[100px] aspect-square hover:opacity-90">
                                    <Loading />
                                 </div>
                              )}
                              <Image
                                 width={100}
                                 height={100}
                                 src={
                                    driveUrlConverter(dataById.data?.imageUrl)!
                                 }
                                 alt="Preview Image"
                                 className={`w-[200px] h-auto hover:opacity-90 ${
                                    !isRenderingImage ? "block" : "hidden"
                                 }`}
                                 priority={true}
                                 unoptimized={true}
                                 onLoadingComplete={() =>
                                    setIsRenderingImage(false)
                                 }
                              />
                           </figure>
                        ) : (
                           ""
                        )}
                     </div>
                     <div className="p-4 w-full border-t flex justify-end border-accent-1">
                        <button
                           onClick={() => {
                              setIsModalUpdateOpen(false), setPreview("");
                           }}
                           className="text-white bg-gray-700 hover:bg-gray-800 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-3xl text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
                        >
                           Close
                        </button>
                        <button
                           disabled={isLoading}
                           type="submit"
                           className="text-white bg-gray-700 hover:bg-gray-800 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-3xl text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        >
                           {isLoading ? "Loading..." : "Update"}
                        </button>
                     </div>
                  </div>
               </form>
            </div>
         </Modal>

         <Modal
            isOpen={isModalDeleteOpen}
            onClose={() => setIsModalDeleteOpen(false)}
         >
            <div className="flex flex-col min-w-[100px] min-h-[100px] lg:w-[500px] w-[300px] h-[300px] bg-dark-background-1">
               <div className="p-4 w-full border-b flex justify-end border-accent-1">
                  <button
                     className="text-[1.5rem] text-dark-accent-1 hover:text-dark-accent-4"
                     type="button"
                     onClick={() => setIsModalDeleteOpen(false)}
                  >
                     <i className="fa-solid fa-x"></i>
                  </button>
               </div>
               <div className="h-full flex justify-center items-center lg:text-[16px] text-[12px]">
                  Are you sure you want to delete this data ?
               </div>
               <div className="p-4 w-full border-t flex justify-end border-accent-1">
                  <button
                     onClick={() => setIsModalDeleteOpen(false)}
                     className="text-white bg-gray-700 hover:bg-gray-800 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-3xl text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
                  >
                     Close
                  </button>
                  <button
                     disabled={isLoading}
                     onClick={async () => {
                        await handleDelete(selectedId || 0);
                     }}
                     className="text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-3xl text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                  >
                     {isLoading ? "Loading..." : "Delete"}
                  </button>
               </div>
            </div>
         </Modal>
      </>
   );
}
