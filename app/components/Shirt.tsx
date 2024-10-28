// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import React, { useEffect } from "react";
import { Decal, useGLTF, useTexture } from "@react-three/drei";
import { useControls } from "leva";

export function Shirt({ shirtColor }: { shirtColor?: string }) {
  const { nodes, materials } = useGLTF("/models/shirt_baked_collapsed.glb");
  const image = "/texture/basketball.png";
  // const { image } = useControls({
  //   image: { image: "/texture/basketball.png" },
  // });

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
        <Decal position={[0, 0.04, 0.1]} rotation={[0, 0, 0]} scale={0.2}>
          <meshBasicMaterial
            map={useTexture(image || "/texture/white-background.jpg")}
            transparent
            polygonOffset
            polygonOffsetFactor={-1}
          />
        </Decal>
      </mesh>
    </group>
  );
}

useGLTF.preload("/models/shirt_baked_collapsed.glb");
