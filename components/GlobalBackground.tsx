"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Stars, Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";

function RotatingParticles() {
  const ref = useRef<THREE.Points>(null!);
  
  // Create random positions for particles
  const positions = useMemo(() => {
    const pos = new Float32Array(2000 * 3);
    for (let i = 0; i < 2000; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 10;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 10;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 10;
    }
    return pos;
  }, []);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * 0.05;
      ref.current.rotation.x = state.clock.elapsedTime * 0.02;
    }
  });

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#ff4655"
        size={0.015}
        sizeAttenuation={true}
        depthWrite={false}
        opacity={0.4}
      />
    </Points>
  );
}

export default function GlobalBackground() {
  return (
    <div className="fixed inset-0 -z-50 pointer-events-none overflow-hidden">
      {/* 3D Particle Field / Stars */}
      <div className="absolute inset-0 opacity-60">
        <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
          <Stars 
            radius={100} 
            depth={50} 
            count={1000} 
            factor={2} 
            saturation={0} 
            fade 
            speed={0.5} 
          />
          <RotatingParticles />
        </Canvas>
      </div>

      {/* Persistent Decorative Glows */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[60vw] h-[60vw] bg-accent/5 blur-[120px] rounded-full mix-blend-screen opacity-60" />
      <div className="absolute top-0 right-[-10vw] w-[50vw] h-[50vw] bg-accent/5 blur-[150px] rounded-full mix-blend-screen opacity-40" />
      <div className="absolute bottom-[-10vh] left-[-10vw] w-[40vw] h-[40vw] bg-accent/5 blur-[100px] rounded-full mix-blend-screen opacity-30" />
      
      {/* Grainy Noise Overlay for Texture */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay"
        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}
      />
    </div>
  );
}
