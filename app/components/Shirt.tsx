// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import React, { useEffect, useState } from "react";
import { Decal, useGLTF } from "@react-three/drei";
import { TextureLoader } from "three";

export function Shirt({
  shirtColor,
  shirtTexture,
}: {
  shirtColor?: string;
  shirtTexture: string;
}) {
  const { nodes, materials } = useGLTF("/models/shirt_baked_collapsed.glb");
  const loader = new TextureLoader();

  const [texture, setTexture] = useState(
    loader.load("/texture/white-background.jpg")
  );

  useEffect(() => {
    if (shirtTexture) {
      const shirt = loader.load(shirtTexture);
      setTexture(shirt);
    }
  }, [shirtTexture]);

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
            map={texture}
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
