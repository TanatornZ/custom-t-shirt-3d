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
  const [decalScale, setDecalScale] = useState([0.2, 0.2, 1]);

  const [texture, setTexture] = useState(
    loader.load("/texture/white-background.jpg")
  );

  useEffect(() => {
    if (shirtTexture) {
      const shirt = loader.load(shirtTexture, (imageData) => {
        let original_height = imageData.source.data.height;
        let default_scale = 0.25;
        let original_width = imageData.source.data.width;

        if (original_height > original_width) {
          let scaling_factor = default_scale / original_height;

          let new_width = original_width * scaling_factor;

          setDecalScale([new_width, default_scale, 1]);
        } else {
          let scaling_factor = default_scale / original_width;

          let new_height = original_height * scaling_factor;

          setDecalScale([default_scale, new_height, 1]);
        }
      });
      setTexture(shirt);
    }
  }, [shirtTexture]);

  useEffect(() => {
    if (materials.lambert1) {
      materials.lambert1.color.set(shirtColor);
    }
  }, [shirtColor, materials.lambert1]);

  3600;
  8200;

  return (
    <group dispose={null}>
      <mesh
        castShadow
        dispose={null}
        geometry={nodes.T_Shirt_male.geometry}
        material={materials.lambert1}
      >
        <Decal
          position={[0, 0.05, 0.1]}
          rotation={[0, 0, 0]}
          scale={decalScale}
        >
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
