import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef, useState } from "react";
import * as THREE from "three";

function Arc({ pct }: { pct: number }) {
  const ref = useRef<THREE.Mesh>(null);
  const trackRef = useRef<THREE.Mesh>(null);
  const handleRef = useRef<THREE.Mesh>(null);
  const [progress, setProgress] = useState(0);

  // gradient texture for arc
  const gradTex = useMemo(() => {
    const c = document.createElement("canvas");
    c.width = 256; c.height = 1;
    const ctx = c.getContext("2d")!;
    const g = ctx.createLinearGradient(0, 0, 256, 0);
    g.addColorStop(0, "#5d8bff");
    g.addColorStop(0.5, "#9b7cff");
    g.addColorStop(1, "#f59cdb");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, 256, 1);
    const tex = new THREE.CanvasTexture(c);
    tex.needsUpdate = true;
    return tex;
  }, []);

  useFrame((state, delta) => {
    setProgress((p) => {
      const np = Math.min(pct, p + delta * 0.8);
      return np;
    });
    if (ref.current) {
      const arc = Math.PI * progress;
      ref.current.geometry.dispose();
      ref.current.geometry = new THREE.TorusGeometry(1.2, 0.14, 20, 96, arc);
    }
    if (handleRef.current) {
      const a = Math.PI - Math.PI * progress;
      handleRef.current.position.x = 1.2 * Math.cos(a);
      handleRef.current.position.y = 1.2 * Math.sin(a);
    }
    if (trackRef.current) {
      trackRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.4) * 0.02;
    }
  });

  return (
    <group rotation-z={Math.PI}>
      <mesh ref={trackRef}>
        <torusGeometry args={[1.2, 0.14, 20, 96, Math.PI]} />
        <meshStandardMaterial color="#1a1f3a" roughness={0.7} />
      </mesh>
      <mesh ref={ref}>
        <torusGeometry args={[1.2, 0.14, 20, 96, 0.001]} />
        <meshStandardMaterial map={gradTex} emissive="#7c5cff" emissiveIntensity={0.5} roughness={0.25} metalness={0.5} />
      </mesh>
      <mesh ref={handleRef}>
        <sphereGeometry args={[0.16, 24, 24]} />
        <meshStandardMaterial color="#ffffff" emissive="#9b7cff" emissiveIntensity={0.8} />
      </mesh>
    </group>
  );
}

export const Gauge3D = ({ pct = 0.803 }: { pct?: number }) => (
  <Canvas
    camera={{ position: [0, 0, 3.2], fov: 40 }}
    dpr={[1, 2]}
    gl={{ antialias: true, alpha: true }}
  >
    <ambientLight intensity={0.5} />
    <directionalLight position={[2, 2, 3]} intensity={0.9} />
    <pointLight position={[0, 1, 2]} intensity={1.5} color="#9b7cff" distance={5} />
    <Arc pct={pct} />
  </Canvas>
);
