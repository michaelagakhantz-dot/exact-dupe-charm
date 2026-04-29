import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

function ParticleSphere() {
  const ref = useRef<THREE.Points>(null);
  const matRef = useRef<THREE.ShaderMaterial>(null);

  const { positions, colors } = useMemo(() => {
    const N = 6000;
    const positions = new Float32Array(N * 3);
    const colors = new Float32Array(N * 3);
    const cPink = new THREE.Color("#ff6bd6");
    const cCyan = new THREE.Color("#5fd9ff");
    const cBlue = new THREE.Color("#7a8cff");
    for (let i = 0; i < N; i++) {
      // fibonacci sphere
      const phi = Math.acos(1 - (2 * (i + 0.5)) / N);
      const theta = Math.PI * (1 + Math.sqrt(5)) * i;
      const r = 1.4;
      const x = r * Math.cos(theta) * Math.sin(phi);
      const y = r * Math.sin(theta) * Math.sin(phi);
      const z = r * Math.cos(phi);
      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;
      const t = (x + 1.4) / 2.8;
      const c = cPink.clone().lerp(cCyan, t).lerp(cBlue, Math.random() * 0.3);
      colors[i * 3] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;
    }
    return { positions, colors };
  }, []);

  const uniforms = useMemo(
    () => ({ uTime: { value: 0 }, uSize: { value: 6.0 } }),
    []
  );

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * 0.15;
      ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.15;
    }
    if (matRef.current) matRef.current.uniforms.uTime.value = state.clock.elapsedTime;
  });

  const vertex = /* glsl */ `
    uniform float uTime;
    uniform float uSize;
    attribute vec3 color;
    varying vec3 vColor;
    // simple 3d noise
    float hash(vec3 p){ return fract(sin(dot(p,vec3(127.1,311.7,74.7)))*43758.5453); }
    void main() {
      vColor = color;
      vec3 pos = position;
      float n = sin(pos.x * 2.0 + uTime) * cos(pos.y * 2.0 + uTime * 0.7) * sin(pos.z * 2.0 + uTime * 0.5);
      pos += normal * n * 0.18;
      pos *= 1.0 + 0.06 * sin(uTime * 0.8);
      vec4 mv = modelViewMatrix * vec4(pos, 1.0);
      gl_Position = projectionMatrix * mv;
      gl_PointSize = uSize * (1.0 / -mv.z) * 80.0;
    }
  `;
  const fragment = /* glsl */ `
    varying vec3 vColor;
    void main() {
      vec2 c = gl_PointCoord - 0.5;
      float d = length(c);
      if (d > 0.5) discard;
      float a = smoothstep(0.5, 0.0, d);
      gl_FragColor = vec4(vColor, a * 0.9);
    }
  `;

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
        <bufferAttribute attach="attributes-normal" args={[positions, 3]} />
      </bufferGeometry>
      <shaderMaterial
        ref={matRef}
        uniforms={uniforms}
        vertexShader={vertex}
        fragmentShader={fragment}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        vertexColors
      />
    </points>
  );
}

export const AIBlob3D = () => {
  return (
    <Canvas
      camera={{ position: [0, 0, 4], fov: 45 }}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true }}
    >
      <ambientLight intensity={0.5} />
      <ParticleSphere />
    </Canvas>
  );
};
