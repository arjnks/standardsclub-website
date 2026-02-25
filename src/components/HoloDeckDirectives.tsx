"use client";

import React, { useRef, useState } from "react";
import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import { Canvas, useFrame } from "@react-three/fiber";
import { Icosahedron, Box, Sphere, Torus, Octahedron, MeshDistortMaterial, Environment, Float } from "@react-three/drei";
import { cn } from "@/lib/utils";
import * as THREE from "three";

const directives = [
    {
        id: "01",
        title: "THE MISSION",
        subtitle: "BRIDGE // ACADEMIA // INDUSTRY",
        description:
            "To bridge the critical gap between academic curriculum and industry requirements. We actively create awareness about standardization, quality control, and certification processes among students.",
        shape: "icosahedron",
        color: "#FFD700", // Gold
    },
    {
        id: "02",
        title: "CONSUMER SAFETY",
        subtitle: "TRUST // RELIABILITY // MARK",
        description:
            "Ensuring products meet strict safety benchmarks. We advocate for the ISI mark as a symbol of trust and reliability for every Indian consumer.",
        shape: "sphere",
        color: "#00E0FF", // Cyan
    },
    {
        id: "03",
        title: "GLOBAL EXPORTS",
        subtitle: "ALIGNMENT // TRADE // GROWTH",
        description:
            "Aligning Indian standards with international norms. Standardization is the key to making 'Make in India' a global brand.",
        shape: "octahedron",
        color: "#00FF9D", // Neon Green
    },
    {
        id: "04",
        title: "STANDARDIZATION",
        subtitle: "INTEROPERABILITY // EFFICIENCY",
        description:
            "Control over proliferation of varieties to ensure interoperability and efficiency, reducing waste and optimizing resource utilization.",
        shape: "torus",
        color: "#FF0055", // Neon Red
    },
];

export function HoloDeckDirectives() {
    const [activeSection, setActiveSection] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);

    return (
        <section ref={containerRef} className="relative w-full bg-transparent text-white">
            {/* Scrollable Content Container */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2">

                    {/* Left Column: Text (Scrolls) */}
                    <div className="py-24 space-y-32 relative">
                        {/* Connecting Line */}
                        <div className="absolute left-8 top-0 bottom-0 w-px bg-white/10 hidden md:block" />
                        <div className="h-[20vh]" /> {/* Spacer at top */}

                        {directives.map((item, idx) => (
                            <Section
                                key={item.id}
                                item={item}
                                index={idx}
                                onInView={(index) => setActiveSection(index)}
                            />
                        ))}

                        <div className="h-[20vh]" /> {/* Spacer at bottom */}
                    </div>

                    {/* Right Column: 3D Holo-Deck (Sticky) */}
                    <div className="hidden lg:block h-screen sticky top-0 flex items-center justify-center pointer-events-none">
                        <div className="relative w-full h-[600px]">
                            {/* 3D Canvas */}
                            <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
                                <ambientLight intensity={0.5} />
                                <pointLight position={[10, 10, 10]} intensity={1} color="#ffffff" />
                                <pointLight position={[-10, -10, -10]} intensity={0.5} color="#4c4c4c" />

                                <HoloProjector activeIndex={activeSection} />

                                <Environment preset="city" />
                            </Canvas>

                            {/* HUD Overlay */}
                            <div className="absolute top-10 left-10 p-4 border-l-2 border-bis-gold/50 bg-black/20 backdrop-blur-sm rounded-r-lg">
                                <div className="text-[10px] font-mono text-bis-gold mb-1">HOLO-EMITTER // ACTIVE</div>
                                <div className="text-xl font-bold">{directives[activeSection].title}</div>
                                <div className="text-xs font-mono text-white/50">{directives[activeSection].subtitle}</div>
                            </div>

                            {/* Decorative Tech Rings */}
                            <div className="absolute inset-0 border border-white/5 rounded-full scale-75 animate-pulse" />
                            <div className="absolute inset-0 border border-white/5 rounded-full scale-90" />
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}

function Section({ item, index, onInView }: { item: typeof directives[0]; index: number; onInView: (index: number) => void }) {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start center", "end center"]
    });

    useMotionValueEvent(scrollYProgress, "change", (latest) => {
        if (latest > 0 && latest < 1) {
            onInView(index);
        }
    });

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0.2 }}
            whileInView={{ opacity: 1 }}
            viewport={{ margin: "-20% 0px -20% 0px" }}
            className="min-h-[50vh] flex flex-col justify-center"
        >
            <span className="font-mono text-bis-gold text-lg mb-4">//{item.id}</span>
            <h2 className="text-5xl font-bold mb-6">{item.title}</h2>
            <p className="text-xl text-neutral-400 max-w-lg leading-relaxed">{item.description}</p>
        </motion.div>
    )
}

function HoloProjector({ activeIndex }: { activeIndex: number }) {
    const meshRef = useRef<THREE.Mesh>(null);
    const color = directives[activeIndex].color;

    useFrame((state, delta) => {
        if (meshRef.current) {
            meshRef.current.rotation.x += delta * 0.2;
            meshRef.current.rotation.y += delta * 0.3;
        }
    });

    return (
        <Float speed={2} rotationIntensity={1} floatIntensity={1}>
            <group>
                {/* Morphing Geometry based on Index */}
                {activeIndex === 0 && (
                    <Icosahedron ref={meshRef} args={[1.5, 0]}>
                        <meshStandardMaterial color={color} wireframe />
                    </Icosahedron>
                )}
                {activeIndex === 1 && (
                    <Sphere ref={meshRef} args={[1.5, 32, 32]}>
                        <MeshDistortMaterial color={color} speed={2} distort={0.4} wireframe />
                    </Sphere>
                )}
                {activeIndex === 2 && (
                    <Octahedron ref={meshRef} args={[1.5, 0]}>
                        <meshStandardMaterial color={color} wireframe />
                    </Octahedron>
                )}
                {activeIndex === 3 && (
                    <Torus ref={meshRef} args={[1.2, 0.4, 16, 100]}>
                        <meshStandardMaterial color={color} wireframe />
                    </Torus>
                )}

                {/* Inner Core */}
                <Sphere args={[0.5, 16, 16]}>
                    <meshBasicMaterial color="white" transparent opacity={0.8} />
                </Sphere>
            </group>
        </Float>
    )
}
