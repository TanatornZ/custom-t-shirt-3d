"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Suspense, useRef, useState } from "react";
import { Center, Environment, OrbitControls } from "@react-three/drei";
import { Shirt } from "./components/Shirt";
import ColorPicker from "./components/colorPicker";

export type IColorPicker = "#242424" | "#ffffff" | "#dc2626";

export default function Home() {
  const [shirtColor, setShirtColor] = useState<IColorPicker>("#ffffff");
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

      <div className="absolute flex items-end bottom-10 md:bottom-20 gap-8">
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
    </div>
  );
}
