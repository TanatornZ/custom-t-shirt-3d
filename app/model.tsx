// components/Model.js
"use client";
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { useDrag } from "react-use-gesture";

export default function Model(props: any) {
  const rotateY = useRef(0);
  const { scene } = useGLTF("/models/oversized_t-shirt/scene.gltf");
  const drag = useDrag(
    ({ offset: [x, y] }) => {
      const xAis = x / 100;

      rotateY.current = xAis;
    },
    { pointerEvents: true }
  );

  useFrame(() => (scene.rotation.y = rotateY.current));

  return <primitive object={scene} {...drag()} {...props} />;
}

// You can also preload the model to reduce loading times.
useGLTF.preload("/models/oversized_t-shirt/scene.gltf");
