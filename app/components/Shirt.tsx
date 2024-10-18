import React, { useEffect } from "react";
import {
  Decal,
  RenderTexture,
  Text,
  useGLTF,
  useTexture,
} from "@react-three/drei";

export function Shirt() {
  const texture = useTexture("/texture/tiger-head.png");
  const { nodes, materials } = useGLTF("/models/shirt.glb");

  useEffect(() => {}, []);

  return (
    <group dispose={null}>
      <group rotation={[-Math.PI / 2, 0, 0]}>
        <group position={[0.04, 0.02, -0.652]}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Object_0.geometry}
            material={materials["Material.001"]}
          >
            {/* chang shirt color */}
            <meshStandardMaterial color="red" />
            {/* TODO: display texture image */}
            {/* <Decal position={[0, 0, 0]} rotation={[0, 0, 0]} scale={[1, 1, 1]}>
              <meshBasicMaterial map={texture} />
            </Decal> */}
          </mesh>
        </group>
      </group>
    </group>
  );
}

useGLTF.preload("/shirt.glb");
