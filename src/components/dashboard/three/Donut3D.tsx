import { Canvas, useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

function Ring({ color, start, len, radius, t0 }: { color: string; start: number; len: number; radius: number; t0: number }) {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!ref.current) return;
    const t = Math.min(1, Math.max(0, (state.clock.elapsedTime - t0) / 1.2));
    const eased = 1 - Math.pow(1 - t, 3);
    const geo = ref.current.geometry as THREE.TorusGeometry;
    // recreate torus with arc length
    const arc = len * Math.PI * 2 * eased;
    if ((ref.current as any).__arc !== arc) {
      (ref.current as any).__arc = arc;
      geo.dispose();
      ref.current.geometry = new THREE.TorusGeometry(radius, 0.18, 24, 64, arc);
    }
    ref.current.rotation.z = -start * Math.PI * 2 + Math.PI / 2;
  });

  return (
    <mesh ref={ref} rotation-x={-Math.PI / 2.3}>
      <torusGeometry args={[radius, 0.18, 24, 64, 0.001]} />
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.4} roughness={0.3} metalness={0.6} />
    </mesh>
  );
}

function Donut() {
  const group = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (group.current) {
      group.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.4) * 0.3;
      group.current.position.y = Math.sin(state.clock.elapsedTime * 0.8) * 0.05;
    }
  });
  return (
    <group ref={group}>
      {/* track */}
      <mesh rotation-x={-Math.PI / 2.3}>
        <torusGeometry args={[1.1, 0.18, 24, 96]} />
        <meshStandardMaterial color="#1a1f3a" roughness={0.8} />
      </mesh>
      <Ring color="#b48cff" start={0} len={0.32} radius={1.1} t0={0.1} />
      <Ring color="#7aa6ff" start={0.32} len={0.26} radius={1.1} t0={0.25} />
      <Ring color="#7fd9ff" start={0.58} len={0.22} radius={1.1} t0={0.4} />
      <Ring color="#f59cdb" start={0.80} len={0.20} radius={1.1} t0={0.55} />
    </group>
  );
}

export const Donut3D = () => (
  <Canvas
    camera={{ position: [0, 1.4, 2.6], fov: 45 }}
    dpr={[1, 2]}
    gl={{ antialias: true, alpha: true }}
  >
    <ambientLight intensity={0.5} />
    <directionalLight position={[2, 3, 2]} intensity={0.8} />
    <pointLight position={[0, 0, 2]} intensity={1.2} color="#9b7cff" distance={5} />
    <Donut />
  </Canvas>
);
