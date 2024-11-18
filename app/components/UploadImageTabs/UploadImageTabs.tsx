"use client";
import { cx } from "@emotion/css";
import Image from "next/image";
import React, { useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import useViewModel from "./useViewModel";
import { FaRegTrashAlt } from "react-icons/fa";
import { MdCancel } from "react-icons/md";

type Props = {
  isImageTabsOpen: boolean;
  setIsImageTabsOpen: (isOpen: boolean) => void;
  setShirtTexture: (shirtImage: string) => void;
};

function UploadImageTabs({
  isImageTabsOpen,
  setIsImageTabsOpen,
  setShirtTexture,
}: Props) {
  const {
    file,
    handleImageInputChange,
    loading,
    uploading,
    uploadingImage,
    setDeleteImageState,
    deleteImageState,
    handleDeleteImage,
  } = useViewModel();

  return (
    <div
      className={cx(
        "absolute top-1/2 transform -translate-y-1/2 left-0 lg:left-8 w-[340px] lg:w-[380px] lg:!translate-x-0 rounded-lg h-[95vh] bg-slate-200 z-20 transition-all duration-500",
        !isImageTabsOpen && "-translate-x-full"
      )}
    >
      <div
        className="absolute top-1/2 transform lg:hidden -translate-y-1/2 z-20 flex justify-center items-center -right-6 w-6 rounded-tr-lg rounded-br-lg bg-gray-500"
        onClick={() => setIsImageTabsOpen(!isImageTabsOpen)}
      >
        <div
          className={cx(
            "rotate-180 my-4 transition-transform duration-500",
            isImageTabsOpen && "!rotate-0"
          )}
        >
          <IoIosArrowBack />
        </div>
      </div>
      <div className="text-black h-full w-full relative flex flex-col justify-between">
        <div className="p-4 md:p-6 relative">
          <p className="text-center text-xl font-semibold">Drop Image</p>
          <div
            className="absolute top-4 right-4 md:top-6 md:right-6 cursor-pointer hover:text-red-500 transition-all"
            onClick={() => setDeleteImageState(!deleteImageState)}
          >
            {!deleteImageState ? (
              <FaRegTrashAlt size={24} />
            ) : (
              <MdCancel size={24} />
            )}
          </div>
        </div>
        <div className="h-full w-full px-4 overflow-auto">
          {loading ? (
            <div className="text-center h-full flex justify-center items-center">
              <div className="loader"></div>
            </div>
          ) : file && file.length > 0 ? (
            <div className="grid grid-cols-2 gap-4 lg:gap-8">
              {uploading && (
                <div className="w-full h-28 relative cursor-pointer animate-pulse">
                  <Image
                    src={uploadingImage}
                    alt={`uploadingImage`}
                    fill
                    className="object-contain"
                    loading="eager"
                  />
                  <div className="absolute bottom-2 w-full px-4">
                    <div className="w-full bg-gray-200 rounded-full h-1.5 dark:bg-gray-700">
                      <div
                        className="bg-blue-600 h-1.5 rounded-full dark:bg-blue-500 transition-all"
                        style={{ width: `${uploading}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              )}
              {file.map((texture, index) => (
                <div
                  className={cx("w-full h-28 relative cursor-pointer group ")}
                  onClick={() => {
                    if (!deleteImageState) {
                      setShirtTexture(texture.fileURL);
                    } else {
                      handleDeleteImage(texture);
                    }
                  }}
                  key={`texture ${texture.filePath}`}
                >
                  <Image
                    src={texture.fileURL}
                    alt={`texture ${index}`}
                    fill
                    className="object-contain"
                    loading="eager"
                  />

                  <div className="hidden w-full h-full  bg-gray-500/40 rounded-lg group-hover:flex text-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 items-center justify-center">
                    {deleteImageState ? (
                      <p className="bg-red-600 p-2 rounded-lg text-white font-semibold">
                        Delete Image
                      </p>
                    ) : (
                      <p className="bg-blue-600 p-2 rounded-lg text-white font-semibold">
                        Select Image
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center h-full flex justify-center items-center">
              <p className="text-gray-500 font-medium">
                Please upload file image
              </p>
            </div>
          )}
        </div>
        <div className="w-full p-4 md:p-6">
          <div className="p-4 w-full h-12 rounded-md bg-blue-500 relative hover:bg-blue-600 cursor-pointer flex justify-center items-center">
            <input
              className="w-full h-full absolute opacity-0 cursor-pointer"
              type="file"
              accept="image/png"
              onChange={handleImageInputChange}
            />
            <p className="text-center text-white font-semibold">Upload Image</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UploadImageTabs;
