"use client";

import { Canvas } from "@react-three/fiber";
import Model from "./model";

export default function Home() {
  return (
    <div style={{ height: "100vh", width: "100vw" }}>
      <Canvas>
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        <Model />
      </Canvas>
    </div>
  );
}
