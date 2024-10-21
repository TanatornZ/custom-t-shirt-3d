import React from "react";
import { Decal, useGLTF, useTexture } from "@react-three/drei";

export function Shirt() {
  const texture = useTexture("/texture/basketball.png");
  const { nodes, materials } = useGLTF("/models/shirt_baked_collapsed.glb");

  return (
    <group dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.T_Shirt_male.geometry}
        material={materials.lambert1}
      >
        <Decal
          debug
          position={[0, 0.04, 0.1]}
          rotation={[0, 0, 0]}
          scale={0.2}
          map={texture}
        />
      </mesh>
    </group>
  );
}

useGLTF.preload("/models/shirt_baked_collapsed.glb");
