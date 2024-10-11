"use client";

import { Canvas } from "@react-three/fiber";
import Model from "./model";
import { OrbitControls } from "@react-three/drei";

export default function Home() {
  return (
    <div style={{ height: "100vh", width: "100vw" }}>
      <Canvas camera={{ position: [0, 4, 10] }}>
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        <Model key={"shirt"} />
        <OrbitControls position={[10, 10, 10]} />
      </Canvas>
    </div>
  );
}
