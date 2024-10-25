"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense, useState } from "react";
import { Center, Environment, OrbitControls } from "@react-three/drei";
import { Shirt } from "./components/Shirt";
import { BaseModal } from "./components/Modal";
import { useMedia } from "react-use";
import ColorPicker from "./components/ColorPicker";
import Image from "next/image";

export type IColorPicker = "#242424" | "#ffffff" | "#dc2626";

export default function Home() {
  const [shirtColor, setShirtColor] = useState<IColorPicker>("#ffffff");
  const [previewImage, setPreviewImage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const isMobile = useMedia("(max-width: 767px)", false);

  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        backgroundColor: "#cbd5e1",
      }}
    >
      <Suspense fallback={<div>loading...</div>}>
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

      <div className="absolute flex flex-col md:flex-row justify-center items-center bottom-10 md:bottom-20 gap-8">
        <div className="flex gap-8 self-center">
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
