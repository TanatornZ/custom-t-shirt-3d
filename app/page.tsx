"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense, useState } from "react";
import { Center, Environment, OrbitControls } from "@react-three/drei";
import { Shirt } from "./components/Shirt";
import { useMedia } from "react-use";
import UploadImageTabs from "./components/UploadImageTabs/UploadImageTabs";
import ColorShirtPicker from "./components/ColorShirtPicker";
import PreviewModal from "./components/PreviewModal";

export type IColorPicker = "#242424" | "#ffffff" | "#dc2626";

export default function Home() {
  const [shirtColor, setShirtColor] = useState<IColorPicker>("#ffffff");
  const [previewImage, setPreviewImage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const isMobile = useMedia("(max-width: 767px)", false);
  const [isImageTabsOpen, setIsImageTabsOpen] = useState(false);
  const [shirtTexture, setShirtTexture] = useState("");

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
      <UploadImageTabs
        setShirtTexture={setShirtTexture}
        isImageTabsOpen={isImageTabsOpen}
        setIsImageTabsOpen={setIsImageTabsOpen}
      />
      <Suspense fallback={<div className="grow self-center">loading...</div>}>
        <Canvas
          shadows
          camera={{ position: [0, 4, 24], zoom: 15 }}
          gl={{ preserveDrawingBuffer: true }}
          eventPrefix="client"
        >
          <OrbitControls />
          <Center>
            <Shirt shirtColor={shirtColor} shirtTexture={shirtTexture} />
            <Environment preset="city" />
          </Center>
        </Canvas>
      </Suspense>
      <div className="absolute flex flex-col md:flex-row justify-center items-center bottom-4 md:bottom-8 gap-8">
        <div className="flex gap-8">
          <ColorShirtPicker
            setShirtColor={setShirtColor}
            color={"#ffffff"}
            shirtColor={shirtColor}
          />
          <ColorShirtPicker
            setShirtColor={setShirtColor}
            color={"#242424"}
            shirtColor={shirtColor}
          />
          <ColorShirtPicker
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
      <PreviewModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        previewImage={previewImage}
      />
    </div>
  );
}
