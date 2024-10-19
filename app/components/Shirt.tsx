import React, { useEffect } from "react";
import {
  Decal,
  RenderTexture,
  Text,
  useAspect,
  useGLTF,
  useTexture,
} from "@react-three/drei";

export function Shirt() {
  const texture = useTexture("/texture/basketball.png");
  const { nodes, materials } = useGLTF("/models/shirt.glb");

  const scale = useAspect(
    512, // Pixel-width
    512, // Pixel-height
    1 // Optional scaling factor
  );

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
          </mesh>

          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Object_0_1.geometry}
            material={materials["printable.001"]}
          >
            {/* TODO: display texture image */}
            <meshBasicMaterial transparent opacity={0} />
            <Decal
              debug
              position={[0, -0.1, 1.2]}
              rotation={[0, 0, 0]}
              scale={0.2}
            >
              <meshBasicMaterial
                transparent
                toneMapped={false}
                map={texture}
                polygonOffset
                polygonOffsetFactor={-1}
              />
            </Decal>
          </mesh>
        </group>
      </group>
    </group>
  );
}

useGLTF.preload("/shirt.glb");
