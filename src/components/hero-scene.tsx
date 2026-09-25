"use client";

import { Suspense, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, Sphere, Sparkles, Environment, Lightformer } from "@react-three/drei";
import * as THREE from "three";

const CAM_Z = 5.4;
const CAM_Y = 0.3;
const FOV = 42;

// A glossy chocolate praline dome — the hero centrepiece.
function Praline() {
  const group = useRef<THREE.Group>(null);
  const { size } = useThree();
  const aspect = size.width / Math.max(1, size.height);
  // Keep the same visual weight on narrow and wide desktop columns.
  const scale = Math.min(1, Math.max(0.8, aspect / 0.935));
  useFrame((_, delta) => {
    if (group.current) group.current.rotation.y += delta * 0.25;
  });
  return (
    <group ref={group} scale={scale}>
      {/* dome body */}
      <mesh position={[0, -0.15, 0]} scale={[1, 0.78, 1]}>
        <sphereGeometry args={[1.35, 64, 64, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshStandardMaterial color="#3a2318" roughness={0.28} metalness={0.15} />
      </mesh>
      {/* base disc */}
      <mesh position={[0, -0.16, 0]}>
        <cylinderGeometry args={[1.35, 1.42, 0.18, 64]} />
        <meshStandardMaterial color="#2b1a13" roughness={0.4} metalness={0.1} />
      </mesh>
      {/* glossy gold drizzle on top */}
      <mesh position={[0, 0.5, 0]} rotation={[0.3, 0, 0.2]}>
        <torusKnotGeometry args={[0.4, 0.07, 128, 16, 2, 3]} />
        <meshStandardMaterial color="#c9a24b" roughness={0.15} metalness={0.85} />
      </mesh>
      {/* gold leaf embedded into the dome surface */}
      <mesh position={[0.46, 0.44, 0.7]} rotation={[0.4, 0.5, 0.3]}>
        <planeGeometry args={[0.2, 0.2]} />
        <meshStandardMaterial color="#e6cf94" roughness={0.2} metalness={1} side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
}

function Truffle({ position, color, size = 0.3 }: { position: [number, number, number]; color: string; size?: number }) {
  return (
    <Float speed={1.5} rotationIntensity={0.35} floatIntensity={0.55}>
      <Sphere args={[size, 48, 48]} position={position}>
        <meshStandardMaterial color={color} roughness={0.35} metalness={0.15} />
      </Sphere>
    </Float>
  );
}

function CacaoBean({ position, rotation, color }: { position: [number, number, number]; rotation: [number, number, number]; color: string }) {
  return (
    <Float speed={1.3} rotationIntensity={0.35} floatIntensity={0.3}>
      <mesh position={position} rotation={rotation} scale={[0.3, 0.3, 0.52]}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial color={color} roughness={0.45} metalness={0.1} />
      </mesh>
    </Float>
  );
}

/**
 * Decor placement that adapts to the canvas aspect ratio.
 *
 * Positions are expressed as fractions of the visible frustum at the object's
 * depth, so on a narrow desktop column (1024px) and a wide one (1920px) the
 * composition keeps the exact same margins: nothing ever crowds the praline or
 * gets clipped at the canvas edge.
 */
function ResponsiveDecor() {
  const { size } = useThree();
  const aspect = size.width / Math.max(1, size.height);
  const tan = Math.tan((FOV * Math.PI) / 180 / 2);

  // horizontal half-extent at a given z distance
  const halfWAt = (z: number) => tan * (CAM_Z - z) * aspect;
  const halfHAt = (z: number) => tan * (CAM_Z - z);

  // Objects sit at z ≈ -0.4 (behind the praline plane)
  const z = -0.4;
  const hw = halfWAt(z);
  const hh = halfHAt(z);

  return (
    <>
      <CacaoBean
        position={[-hw * 0.58, hh * 0.58, z]}
        rotation={[0.4, 0.2, 0.8]}
        color="#4a2e1f"
      />
      <CacaoBean
        position={[hw * 0.62, hh * 0.44, z - 0.1]}
        rotation={[0.8, 0.5, 0.2]}
        color="#3f281c"
      />
      <Truffle position={[hw * 0.52, -hh * 0.55, 0.2]} color="#4a2e1f" size={0.34} />
      <Truffle position={[-hw * 0.5, -hh * 0.62, 0.2]} color="#c9a24b" size={0.22} />
      <Truffle position={[hw * 0.4, hh * 0.58, 0.1]} color="#c46a5a" size={0.2} />
    </>
  );
}

/**
 * Self-contained studio lighting. We deliberately avoid `Environment preset=...`
 * because presets download an HDR from an external CDN at runtime; if that
 * request fails the promise rejects inside Suspense and takes the page down.
 * Instead we build a tiny procedural "room" out of Lightformers so the
 * metallic gold and glossy chocolate still get soft reflections offline.
 */
function StudioLights() {
  return (
    <>
      <ambientLight intensity={0.55} />
      <directionalLight position={[4, 6, 3]} intensity={1.6} color="#fff4da" />
      <pointLight position={[-4, -2, -3]} intensity={0.8} color="#c9a24b" />
      <pointLight position={[3, -3, 2]} intensity={0.4} color="#c46a5a" />
      <Environment resolution={128} frames={1}>
        <Lightformer form="rect" intensity={2.2} color="#fff4da" position={[0, 4, -4]} scale={[8, 4, 1]} />
        <Lightformer form="rect" intensity={1.4} color="#e6cf94" position={[-5, 1, 2]} rotation={[0, Math.PI / 2, 0]} scale={[6, 3, 1]} />
        <Lightformer form="rect" intensity={0.9} color="#c9a24b" position={[5, -1, 1]} rotation={[0, -Math.PI / 2, 0]} scale={[6, 3, 1]} />
        <Lightformer form="circle" intensity={0.8} color="#faf3e7" position={[0, -4, 3]} scale={5} />
      </Environment>
    </>
  );
}

function Scene() {
  return (
    <>
      <StudioLights />

      <Float speed={0.8} rotationIntensity={0} floatIntensity={0.45}>
        <Praline />
      </Float>

      <ResponsiveDecor />

      <Sparkles count={50} scale={[6, 4, 4]} size={2.4} speed={0.3} color="#e6cf94" opacity={0.55} />
    </>
  );
}

export default function HeroScene() {
  return (
    <Canvas
      camera={{ position: [0, CAM_Y, CAM_Z], fov: FOV }}
      dpr={[1, 1.6]}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance", failIfMajorPerformanceCaveat: false }}
    >
      <Suspense fallback={null}>
        <Scene />
      </Suspense>
    </Canvas>
  );
}
