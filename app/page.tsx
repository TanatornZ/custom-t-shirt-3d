"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense, useRef } from "react";
import { Environment, OrbitControls } from "@react-three/drei";
import { Shirt } from "./components/Shirt";

export default function Home() {
  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <Suspense fallback={<div>loading...</div>}>
        <Canvas camera={{ position: [0, 4, 24], zoom: 6 }}>
          <OrbitControls />
          <Shirt />
          <Environment preset="city" />
        </Canvas>
      </Suspense>
    </div>
  );
}
