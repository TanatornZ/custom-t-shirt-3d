import { cx } from "@emotion/css";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { IoIosArrowBack } from "react-icons/io";

type Props = {
  isImageTabsOpen: boolean;
  setIsImageTabsOpen: (isOpen: boolean) => void;
};

function UploadImageTabs({ isImageTabsOpen, setIsImageTabsOpen }: Props) {
  const [file, setFile] = useState<string[]>([]);
  function handleImageInputChange(e: any) {
    setFile([...file, URL.createObjectURL(e.target.files[0])]);
  }

  useEffect(() => {
    console.log("file => ", file);
  }, [file]);
  return (
    <div
      className={cx(
        "absolute top-1/2 transform -translate-y-1/2 left-0 lg:left-8 w-[340px] lg:w-[380px] lg:!translate-x-0 rounded-lg h-[95vh] bg-slate-200 z-40 transition-all duration-500",
        !isImageTabsOpen && "-translate-x-full"
      )}
    >
      <div
        className="absolute top-1/2 transform lg:hidden -translate-y-1/2 z-50 flex justify-center items-center -right-6 w-6 rounded-tr-lg rounded-br-lg bg-gray-500"
        onClick={() => setIsImageTabsOpen(!isImageTabsOpen)}
      >
        <div
          className={cx(
            "rotate-180 my-4 transition-all duration-500",
            isImageTabsOpen && "rotate-0"
          )}
        >
          <IoIosArrowBack />
        </div>
      </div>
      <div className="text-black h-full w-full relative flex flex-col justify-between">
        <div className=" p-4 md:p-6">
          <p className="text-center text-xl font-semibold">Drop Image</p>
        </div>
        <div className="h-full w-full px-4">
          {file && file.length > 0 ? (
            <div className="grid grid-cols-2 gap-4 lg:gap-8">
              {file.map((file, index) => (
                <div className="w-full h-28 relative">
                  <Image
                    src={file}
                    alt={`texture ${index}`}
                    fill
                    className="object-contain"
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center h-full flex justify-center items-center">
              Please upload file image
            </div>
          )}
        </div>
        <div className="w-full p-4">
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
