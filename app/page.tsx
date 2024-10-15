"use client";

import { Canvas } from "@react-three/fiber";
import Model from "./model";
import { OrbitControls, ScrollControls } from "@react-three/drei";
import { Suspense } from "react";

export default function Home() {
  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Suspense fallback={<div>loading...</div>}>
        <Canvas camera={{ position: [0, 4, 10], zoom: 5 }}>
          <ambientLight />
          <pointLight position={[10, 10, 10]} />
          <mesh position={[-0, 1, 5.5]}>
            <Model key={"shirt"} />
          </mesh>
        </Canvas>
      </Suspense>
    </div>
  );
}
