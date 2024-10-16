"use client";

import { Canvas } from "@react-three/fiber";
import Model from "./model";
import { RiPlayReverseLargeFill } from "react-icons/ri";
import { Suspense, useRef } from "react";

export default function Home() {
  const rotateY = useRef(0);

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
        <Canvas
          camera={{ position: [0, 4, 10], zoom: 5 }}
          style={{ height: 500 }}
        >
          <ambientLight />
          <pointLight position={[10, 10, 10]} />
          <mesh position={[-0, 1, 5.5]}>
            <Model key={"shirt"} rotateY={rotateY} />
          </mesh>
        </Canvas>
        <div className="flex gap-6 -mt-5">
          <RiPlayReverseLargeFill
            size={32}
            className="cursor-pointer hover:fill-red-500 active:fill-red-600"
            onClick={() => (rotateY.current += 1)}
          />
          <RiPlayReverseLargeFill
            size={32}
            onClick={() => (rotateY.current -= 1)}
            className="rotate-180 cursor-pointer hover:fill-red-500 active:fill-red-600"
          />
        </div>
      </Suspense>
    </div>
  );
}
