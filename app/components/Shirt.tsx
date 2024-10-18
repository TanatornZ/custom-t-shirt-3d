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
            <Decal
              position={[0, 0.9, 0.75]}
              rotation={[-0.4, Math.PI, 0]}
              scale={[0.9, 0.25, 1]}
            >
              <meshStandardMaterial
                roughness={1}
                transparent
                polygonOffset
                polygonOffsetFactor={-1}
              >
                <RenderTexture attach="map">
                  <color attach="background" args={["#242424"]} />
                  <ambientLight intensity={Math.PI} />
                  <directionalLight position={[10, 10, 5]} />
                  <Text rotation={[0, Math.PI, 0]} fontSize={4} color="white">
                    hello from drei
                  </Text>
                </RenderTexture>
              </meshStandardMaterial>
            </Decal>
          </mesh>
        </group>
      </group>
    </group>
  );
}

useGLTF.preload("/shirt.glb");
