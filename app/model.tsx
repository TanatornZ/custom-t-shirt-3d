// components/Model.js
"use client";
import { useGLTF, useScroll } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";

export default function Model(props) {
  const { scene } = useGLTF("/models/oversized_t-shirt/scene.gltf");
  const scroll = useScroll();
  useFrame(() => (scene.rotation.y = scroll.offset * Math.PI));

  return <primitive object={scene} {...props} />;
}

// You can also preload the model to reduce loading times.
useGLTF.preload("/models/oversized_t-shirt/scene.gltf");
