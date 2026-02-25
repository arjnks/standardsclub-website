
"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Environment, ContactShadows } from "@react-three/drei";
import { useRef } from "react";
import { Group } from "three";

function IsoStack() {
  const group = useRef<Group>(null);

  useFrame((state) => {
    if (!group.current) return;
    const t = state.clock.getElapsedTime();
    // Gentle floating rotation
    group.current.rotation.y = Math.sin(t / 4) / 4;
    group.current.rotation.z = Math.sin(t / 4) / 8;
    group.current.position.y = Math.sin(t / 1.5) / 8;
  });

  return (
    <group ref={group} rotation={[0.5, -0.5, 0]}>
      {/* Base Plate (Technical Grey) */}
      <mesh position={[0, -0.2, 0]}>
        <boxGeometry args={[3.5, 0.05, 3.5]} />
        <meshStandardMaterial color="#1a1a1a" metalness={0.5} roughness={0.5} />
      </mesh>

      {/* Middle Plate (BIS Gold) */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[3, 0.1, 3]} />
        <meshStandardMaterial color="#ffd700" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* Top Plate (Tech Cyan Wireframe) */}
      <mesh position={[0, 0.2, 0]}>
        <boxGeometry args={[2.5, 0.05, 2.5]} />
        <meshStandardMaterial color="#ffd700" emissive="#ffd700" emissiveIntensity={0.5} wireframe />
      </mesh>
    </group>
  );
}

export function Hero3D() {
  return (
    <div className="absolute inset-0 z-0 opacity-60 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} color="#ffd700" />
        <pointLight position={[-10, -10, -10]} intensity={1} color="#ffd700" />
        
        <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
          <IsoStack />
        </Float>
        
        <ContactShadows position={[0, -2, 0]} opacity={0.5} scale={10} blur={2.5} far={4} color="#ffd700" />
        <Environment preset="city" />
      </Canvas>
    </div>
  );
}
