import { Canvas, useFrame } from "@react-three/fiber";
import { useRef, useMemo } from "react";
import * as THREE from "three";

const data = [0.55, 0.65, 0.7, 0.6, 0.95, 0.72, 0.78];

function Bar({ x, h, highlight, t0 }: { x: number; h: number; highlight?: boolean; t0: number }) {
  const ref = useRef<THREE.Mesh>(null);
  const matRef = useRef<THREE.MeshStandardMaterial>(null);
  const targetH = h * 2.4;

  useFrame((state) => {
    if (!ref.current) return;
    const t = Math.min(1, Math.max(0, state.clock.elapsedTime - t0));
    const eased = 1 - Math.pow(1 - t, 3);
    const cur = targetH * eased;
    ref.current.scale.y = Math.max(0.001, cur);
    ref.current.position.y = cur / 2 - 1.2;
    if (highlight && matRef.current) {
      matRef.current.emissiveIntensity = 0.6 + Math.sin(state.clock.elapsedTime * 2) * 0.25;
    }
  });

  return (
    <mesh ref={ref} position={[x, 0, 0]} castShadow>
      <boxGeometry args={[0.45, 1, 0.45]} />
      <meshStandardMaterial
        ref={matRef}
        color={highlight ? "#9b7cff" : "#2a3050"}
        emissive={highlight ? "#7c5cff" : "#000000"}
        emissiveIntensity={highlight ? 0.6 : 0}
        roughness={0.35}
        metalness={0.4}
      />
    </mesh>
  );
}

function Floor() {
  return (
    <mesh rotation-x={-Math.PI / 2} position={[0, -1.2, 0]} receiveShadow>
      <planeGeometry args={[10, 6]} />
      <meshStandardMaterial color="#0a0e1f" roughness={1} />
    </mesh>
  );
}

function Scene() {
  const bars = useMemo(() => data.map((h, i) => ({ x: (i - 3) * 0.85, h, highlight: i === 4, t0: 0.1 + i * 0.08 })), []);
  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight position={[3, 5, 4]} intensity={1.1} castShadow />
      <pointLight position={[0, 1, 2]} intensity={1.2} color="#9b7cff" distance={6} />
      <Floor />
      {bars.map((b, i) => <Bar key={i} {...b} />)}
    </>
  );
}

export const Bars3D = () => (
  <Canvas
    shadows
    camera={{ position: [0, 1.6, 5.2], fov: 38 }}
    dpr={[1, 2]}
    gl={{ antialias: true, alpha: true }}
  >
    <Scene />
  </Canvas>
);
