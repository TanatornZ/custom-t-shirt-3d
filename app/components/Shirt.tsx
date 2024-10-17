import React from "react";
import { useGLTF, useTexture } from "@react-three/drei";

export function Shirt() {
  const texture = useTexture("/texture/tiger-head.png");
  const { nodes, materials } = useGLTF("/models/shirt.glb");

  return (
    <group dispose={null}>
      <group rotation={[-Math.PI / 2, 0, 0]}>
        <group position={[0.04, 0.02, -0.652]}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Object_0.geometry}
            material={materials["Material.001"]}
          />
          <mesh geometry={nodes.Object_0_1.geometry} material={texture}>
            {/* <meshBasicMaterial transparent opacity={0} />
            <Decal
            debug
            position={[0, 0.1, 1.2]}
            rotation={[0, 0, 0]}
            scale={[0.5, 0.5, 0.5]}
            map={texture}
            polygonOffsetFactor={-1}
        > */}
            {/* <meshBasicMaterial transparent map={texture} polygonOffset /> */}
            {/* </Decal> */}
          </mesh>
        </group>
      </group>
    </group>
  );
}

useGLTF.preload("/shirt.glb");
