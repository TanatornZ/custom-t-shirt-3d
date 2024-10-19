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
          position={[0, 0.04, 0.15]}
          rotation={[0, 0, 0]}
          scale={0.15}
          map={texture}
        />
      </mesh>
    </group>
  );
}

useGLTF.preload("/models/shirt_baked_collapsed.glb");

/* 
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
          // chang shirt color 
          <meshStandardMaterial color="red" />
          <Decal
            debug
            position={[0, -0.1, 1.2]}
            rotation={[0, 0, 0]}
            scale={0.2}
            map={texture}
            material-depthTest={true}
          />
        </mesh>

        // TODO: display texture image 
        <mesh geometry={nodes.Object_0_1.geometry}>
          <meshBasicMaterial transparent opacity={0} />

          <Decal
            debug
            position={[0, -0.1, 1.2]}
            rotation={[0, 0, 0]}
            scale={0.2}
            map={texture}
            material-depthTest={true}
          />
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
*/
