"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense, useState } from "react";
import { Center, Environment, OrbitControls } from "@react-three/drei";
import { Shirt } from "./components/Shirt";
import { BaseModal } from "./components/Modal";
import { useMedia } from "react-use";
import ColorPicker from "./components/ColorPicker";
import Image from "next/image";
import { IoIosArrowBack } from "react-icons/io";
import { cx } from "@emotion/css";

export type IColorPicker = "#242424" | "#ffffff" | "#dc2626";

export default function Home() {
  const [shirtColor, setShirtColor] = useState<IColorPicker>("#ffffff");
  const [previewImage, setPreviewImage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const isMobile = useMedia("(max-width: 767px)", false);
  const [isImageTabsOpen, setIsImageTabsOpen] = useState(false);

  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        backgroundColor: "#cbd5e1",
        padding: isMobile ? "16px" : "32px",
        position: "relative",
      }}
    >
      <h1 className="text-2xl md:text-3xl font-bold text-black">
        Custom your shirt
      </h1>
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
        <div className="text-black h-full w-full relative">
          <div className=" p-4 md:p-6">
            <p className="text-center text-xl font-semibold">Drop Image</p>
          </div>
          <div className="absolute bottom-0 w-full p-4">
            <div className="p-4 w-full h-12 rounded-md bg-blue-500 hover:bg-blue-600 cursor-pointer">
              <p className="text-center text-white font-semibold">
                Upload Image
              </p>
            </div>
          </div>
        </div>
      </div>
      <Suspense fallback={<div className="grow self-center">loading...</div>}>
        <Canvas
          shadows
          camera={{ position: [0, 4, 24], zoom: 15 }}
          gl={{ preserveDrawingBuffer: true }}
          eventPrefix="client"
        >
          <OrbitControls />
          <Center>
            <Shirt shirtColor={shirtColor} />
            <Environment preset="city" />
          </Center>
        </Canvas>
      </Suspense>

      <div className="absolute flex flex-col md:flex-row justify-center items-center bottom-4 md:bottom-8 gap-8">
        <div className="flex gap-8">
          <ColorPicker
            setShirtColor={setShirtColor}
            color={"#ffffff"}
            shirtColor={shirtColor}
          />
          <ColorPicker
            setShirtColor={setShirtColor}
            color={"#242424"}
            shirtColor={shirtColor}
          />
          <ColorPicker
            setShirtColor={setShirtColor}
            color={"#dc2626"}
            shirtColor={shirtColor}
          />
        </div>
        <div
          onClick={() => {
            const shirtImage = document.querySelector("canvas");
            if (shirtImage) {
              setPreviewImage(shirtImage.toDataURL("image/png"));
            }
            setIsModalOpen(true);
          }}
          className="px-4 mx-auto self-end py-3 bg-blue-500 rounded-lg cursor-pointer hover:bg-blue-600 active:ring-1 active:ring-blue-600"
        >
          Preview
        </div>
      </div>

      <BaseModal
        title="Preview"
        titleClassName="text-black text-xl"
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
        }}
        className="m-4 mx-auto flex h-fit justify-center rounded-md bg-white p-2 md:max-w-[640px] md:p-4 xl:max-w-[1080px]"
        borderRadius=""
        padding=""
        margin={isMobile ? "16px" : "auto"}
        overlay={{ backdropFilter: "blur(8px)" }}
        closeButtonClassName="hidden"
      >
        <div className="w-full  flex flex-col">
          <div className="w-full h-[400px] relative z-20">
            <Image
              src={previewImage}
              alt="preview-custom-3D-shirt"
              fill
              className="object-contain scale-[2]"
            />
          </div>

          <div
            onClick={(e) => {
              e.stopPropagation();
              const link = document.createElement("a");
              if (previewImage) {
                link.setAttribute("download", "canvas.png");
                link.setAttribute(
                  "href",
                  previewImage.replace("image/png", "image/octet-stream")
                );
              }
              link.click();
            }}
            className="px-4 mt-2 w-fit mx-auto z-50 self-end py-3 bg-blue-500 rounded-lg cursor-pointer hover:bg-blue-600 active:ring-1 active:ring-blue-600"
          >
            Download
          </div>
        </div>
      </BaseModal>
    </div>
  );
}
