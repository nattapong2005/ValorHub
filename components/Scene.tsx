"use client";

import { useRef, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { PerspectiveCamera, useTexture, Float, Torus, Octahedron, Stars } from "@react-three/drei";
import * as THREE from "three";

const AgentMesh = () => {
  const meshRef = useRef<THREE.Group>(null!);
  
  // Jett Full Portrait from Valorant API
  const texture = useTexture('https://media.valorant-api.com/agents/add6443a-41bd-e414-f6ad-e58d267f4e95/fullportrait.png');
  texture.colorSpace = THREE.SRGBColorSpace;

  useFrame((state, delta) => {
    if (meshRef.current) {
        // Slow sway based on time
        meshRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.2 - 0.5;
        meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    }
  });

  return (
    <group ref={meshRef}>
      <mesh position={[-0.8, -0.2, 0]}>
        <planeGeometry args={[7, 7]} />
        <meshBasicMaterial map={texture} transparent={true} opacity={0.95} side={THREE.DoubleSide} depthWrite={false} />
      </mesh>
    </group>
  );
};

const BackgroundElements = () => {
  const torusRef = useRef<THREE.Mesh>(null!);
  const octaRef = useRef<THREE.Mesh>(null!);

  useFrame((state, delta) => {
    if (torusRef.current) {
      torusRef.current.rotation.x += delta * 0.2;
      torusRef.current.rotation.y += delta * 0.3;
    }
    if (octaRef.current) {
      octaRef.current.rotation.y -= delta * 0.4;
      octaRef.current.rotation.z += delta * 0.2;
    }
  });

  return (
    <>
      <Torus ref={torusRef} args={[3.5, 0.05, 16, 100]} position={[0, -0.5, -2]}>
        <meshStandardMaterial color={"#ff4655"} emissive={"#ff4655"} emissiveIntensity={0.5} roughness={0.2} metalness={0.8} transparent opacity={0.6}/>
      </Torus>
      <Octahedron ref={octaRef} args={[0.5]} position={[-3, 2, -1]}>
        <meshStandardMaterial color={"#ff4655"} wireframe transparent opacity={0.3} />
      </Octahedron>
      <Octahedron args={[0.3]} position={[3, -2, 1]}>
        <meshStandardMaterial color={"#ece8e1"} wireframe transparent opacity={0.3} />
      </Octahedron>
    </>
  );
}

const Scene = () => {
  return (
    <Canvas>
      <PerspectiveCamera makeDefault position={[0, 0, 5]} fov={75} />
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1.5} color={"#ff4655"} />
      <pointLight position={[-10, -10, -10]} intensity={1} color={"#ffffff"} />
      
      <Suspense fallback={null}>
        <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
          <AgentMesh />
        </Float>
        <BackgroundElements />
      </Suspense>
    </Canvas>
  );
};

export default Scene;
