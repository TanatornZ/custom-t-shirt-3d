// components/Model.js
"use client";
import { useGLTF } from "@react-three/drei";

export default function Model() {
  const { scene } = useGLTF("/models/oversized_t-shirt/scene.gltf");
  return <primitive object={scene} />;
}

// You can also preload the model to reduce loading times.
useGLTF.preload("/models/oversized_t-shirt/scene.gltf");
