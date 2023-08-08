"use client";
import React, { useEffect, useState } from "react";
import Sidebar, { SidebarToggleExport } from "../components/sidebar";
import useAuth from "../useAuth";
import Loading from "@/app/loading";
import axios from "axios";
import useSWR, { useSWRConfig } from "swr";
import Image, { ImageLoader } from "next/image";
import Modal from "../components/modal";
import Alerts from "../components/alerts";
import Link from "next/link";

const getCertificates = async () => {
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_MY_BACKEND_URL}certificates`
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

  const loadPdf = (e: any) => {
    setPdf(e.target.files[0]);
  };
  const [certificate, setCertificate] = useState("");
  const [image, setImage] = useState("");
  const [pdf, setPdf] = useState("");
  const [selectedId, setSelectedId] = useState<number>();

  const getCertificateById = async (id: any) => {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_MY_BACKEND_URL}certificates/${id}`
    );
    return res.data;
  };

  console.log(token);
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("certificate", certificate);
    formData.append("image", image);
    formData.append("pdf", pdf);
    setIsLoading(true);
    try {
      await axiosJWT.post(
        `${process.env.NEXT_PUBLIC_MY_BACKEND_URL}certificates`,
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
    mutate("Certificates");
  };

  const handleUpdate = async (e: any) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("certificate", certificate);
    formData.append("image", image);
    formData.append("pdf", pdf);
    setIsLoading(true);
    try {
      await axiosJWT.patch(
        `${process.env.NEXT_PUBLIC_MY_BACKEND_URL}certificates/${selectedId}`,
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
    mutate("Certificates");
  };

  const handleDelete = async (selectedId: number) => {
    setIsLoading(true);
    try {
      await axiosJWT.delete(
        `${process.env.NEXT_PUBLIC_MY_BACKEND_URL}certificates/${selectedId}`,
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
    mutate("Certificates");
  };

  const { data } = useSWR("Certificates", getCertificates);
  const dataById = useSWR(
    selectedId ? ["CertificateById", selectedId] : null,
    () => getCertificateById(selectedId)
  );

  useEffect(() => {
    if (dataById.data) {
      setCertificate(dataById.data.certificate);
    }
  }, [dataById.data]);

  return (
    <>
      <Sidebar>
        <div className="flex flex-col">
          <div className="font-bold text-[28px] text-accent-1 dark:text-dark-accent-1 mb-14">
            Certificates
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
            <table className="w-full lg:text-sm text-[10px] text-left text-gray-500 dark:text-gray-400">
              <thead className="lg:text-xs text-[10px] text-gray-700 uppercase bg-gray-50 dark:bg-accent-4 dark:text-gray-100">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Certificates
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Image
                  </th>
                  <th scope="col" className="px-6 py-3">
                    PDF
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {data &&
                  data?.map((certif: any, index: any) => (
                    <tr
                      key={index}
                      className="bg-white border-b dark:bg-dark-background-1 hover:dark:bg-gray-900 dark:border-dark-background-2 transition-all duration-100"
                    >
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        {certif.certificate}
                      </th>
                      <td className="px-6 py-4">
                        <Link
                          href={`${certif.imageUrl}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {isRenderingImage && (
                            <div className="w-[300px] aspect-square hover:opacity-90">
                              <Loading />
                            </div>
                          )}
                          <Image
                            src={certif.imageUrl}
                            alt="certificate"
                            width={500}
                            height={500}
                            className={`w-[300px] h-auto hover:opacity-90 ${
                              !isRenderingImage ? "block" : "hidden"
                            }`}
                            priority={true}
                            unoptimized={true}
                            onLoadingComplete={() => setIsRenderingImage(false)}
                          />
                        </Link>
                      </td>
                      <td className="px-6 py-4">
                        <Link
                          className="hover:text-blue-600"
                          href={`${certif.pdfUrl}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {certif.pdf}
                        </Link>
                      </td>
                      <td className="px-6 py-4 gap-x-6">
                        <div className="flex flex-wrap">
                          <button
                            type="button"
                            onClick={() => {
                              setSelectedId(certif.id);
                              setIsModalUpdateOpen(true);
                            }}
                            className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full lg:text-sm text-[10px] px-5 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                          >
                            Update
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              setSelectedId(certif.id);
                              setIsModalDeleteOpen(true);
                            }}
                            className="text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full lg:text-sm text-[10px] px-5 py-2.5 text-center mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
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
            <div className="flex flex-col justify-between h-full items-center lg:min-h-[600px] min-h-[400px] overflow-y-auto">
              <div className="w-10/12 py-10">
                <div className="mb-6">
                  <label
                    htmlFor="certificate"
                    className="w-full block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Certificate
                  </label>
                  <input
                    type="text"
                    id="certificate"
                    className="Sbg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Certificate"
                    onChange={(e) => setCertificate(e.target.value)}
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
                  <figure className="image is-128x128 mb-6">
                    <Image
                      width={100}
                      height={100}
                      src={preview}
                      alt="Preview Image"
                      className="w-[300px] h-auto"
                    />
                  </figure>
                ) : (
                  ""
                )}
                <div className="mb-6">
                  <label
                    htmlFor="pdf"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    PDF
                  </label>
                  <input
                    type="file"
                    id="pdf"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    onChange={loadPdf}
                    accept="application/pdf"
                    required
                  />
                </div>
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
            <div className="flex flex-col justify-between h-full items-center min-h-[600px]">
              <div className="w-10/12 py-10">
                <div className="mb-6">
                  <label
                    htmlFor="certificate"
                    className="w-full block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Certificate
                  </label>
                  <input
                    type="text"
                    id="certificate"
                    className="Sbg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Certificate"
                    value={certificate}
                    onChange={(e) => setCertificate(e.target.value)}
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
                    accept="image/*"
                    onChange={loadImage}
                  />
                </div>
                {preview ? (
                  <figure>
                    <Image
                      width={300}
                      height={300}
                      src={preview}
                      alt="Preview Image"
                    />
                  </figure>
                ) : dataById.data?.image && !preview ? (
                  <figure>
                    <Image
                      width={300}
                      height={300}
                      src={dataById.data?.imageUrl}
                      alt="Preview Image"
                      className={`${!isRenderingImage ? "block" : "hidden"}`}
                      priority={true}
                      unoptimized={true}
                      onLoadingComplete={() => setIsRenderingImage(false)}
                    />
                  </figure>
                ) : (
                  ""
                )}
                <div className="mb-6">
                  <label
                    htmlFor="pdf"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    PDF
                  </label>
                  <input
                    type="file"
                    id="pdf"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    onChange={loadPdf}
                    accept="application/pdf"
                  />
                </div>
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
