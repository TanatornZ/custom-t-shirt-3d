// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import React, { useEffect } from "react";
import { Decal, useGLTF, useTexture } from "@react-three/drei";

export function Shirt({ shirtColor }: { shirtColor?: string }) {
  const texture = useTexture("/texture/tiger-head.png");
  const { nodes, materials } = useGLTF("/models/shirt_baked_collapsed.glb");

  useEffect(() => {
    if (materials.lambert1) {
      materials.lambert1.color.set(shirtColor);
    }
  }, [shirtColor, materials.lambert1]);

  return (
    <group dispose={null}>
      <mesh
        castShadow
        dispose={null}
        geometry={nodes.T_Shirt_male.geometry}
        material={materials.lambert1}
      >
        <Decal
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
