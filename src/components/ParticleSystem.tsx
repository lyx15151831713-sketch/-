import { useRef, useMemo, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const PARTICLE_COUNT = 30000;

// Mathematical curves functions
const getPointOnCurve = (t: number, type: string) => {
  let x = 0, y = 0, z = 0;
  const scale = 12; // Increased from 5 to 12 for larger area

  switch (type) {
    case 'heart':
      x = 16 * Math.pow(Math.sin(t), 3);
      y = 13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t);
      break;
    case 'butterfly':
      const exp = Math.exp(Math.cos(t)) - 2 * Math.cos(4 * t) - Math.pow(Math.sin(t / 12), 5);
      x = Math.sin(t) * exp * 2;
      y = Math.cos(t) * exp * 2;
      break;
    case 'spiral':
      const a = 1.2;
      x = a * t * Math.cos(t);
      y = a * t * Math.sin(t);
      break;
    case 'rose':
      const k = 4;
      x = Math.cos(k * t) * Math.cos(t) * 15;
      y = Math.cos(k * t) * Math.sin(t) * 15;
      break;
    case 'lemniscate':
      const a2 = 15;
      const den = 1 + Math.pow(Math.sin(t), 2);
      x = (a2 * Math.cos(t)) / den;
      y = (a2 * Math.sin(t) * Math.cos(t)) / den;
      break;
    case 'koch':
      // Simplified fractal-like star/koch approximation
      const r = 15 * (1 + 0.3 * Math.sin(6 * t));
      x = r * Math.cos(t);
      y = r * Math.sin(t);
      break;
    case 'catenary':
      x = t * 4;
      y = Math.cosh(t / 2) * 4 - 20;
      break;
    case 'vortex':
    default:
      const radius = t * 0.8;
      x = radius * Math.cos(t * 5);
      y = radius * Math.sin(t * 5);
      z = t * 0.5;
      break;
  }

  return new THREE.Vector3(x * (scale / 10), y * (scale / 10), z * (scale / 10));
};

const SHAPES = ['vortex', 'heart', 'butterfly', 'spiral', 'rose', 'lemniscate', 'koch', 'catenary'];

export const ParticleSystem = () => {
  const pointsRef = useRef<THREE.Points>(null!);
  const [shapeIndex, setShapeIndex] = useState(0);
  const transitionProgress = useRef(0);
  const targetShapeIndex = useRef(1);

  const particles = useMemo(() => {
    const positions = new Float32Array(PARTICLE_COUNT * 3);
    const colors = new Float32Array(PARTICLE_COUNT * 3);
    const sizes = new Float32Array(PARTICLE_COUNT);
    const velocities = new Float32Array(PARTICLE_COUNT); // For falling effect

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 40;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 40;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 40;

      const color = new THREE.Color();
      // Blue-purple-pink range
      const h = 0.6 + Math.random() * 0.2; // 0.6 (blue) to 0.8 (purple/pink)
      color.setHSL(h, 0.8, 0.6);
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;

      sizes[i] = Math.random() * 0.05 + 0.02;
      velocities[i] = Math.random() * 0.02 + 0.01; // Random falling speed
    }
    return { positions, colors, sizes, velocities };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setShapeIndex((prev) => (prev + 1) % SHAPES.length);
      targetShapeIndex.current = (shapeIndex + 1) % SHAPES.length;
      transitionProgress.current = 0;
    }, 5000);
    return () => clearInterval(interval);
  }, [shapeIndex]);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    const positions = pointsRef.current.geometry.attributes.position.array as Float32Array;
    
    transitionProgress.current = Math.min(transitionProgress.current + 0.005, 1);
    
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const t = (i / PARTICLE_COUNT) * Math.PI * 10 + time * 0.1;
      
      const currentShape = SHAPES[shapeIndex];
      const nextShape = SHAPES[(shapeIndex + 1) % SHAPES.length];
      
      const p1 = getPointOnCurve(t, currentShape);
      const p2 = getPointOnCurve(t, nextShape);
      
      // Interpolate between shapes
      const targetX = THREE.MathUtils.lerp(p1.x, p2.x, transitionProgress.current);
      const targetY = THREE.MathUtils.lerp(p1.y, p2.y, transitionProgress.current);
      const targetZ = THREE.MathUtils.lerp(p1.z, p2.z, transitionProgress.current);

      // Falling and scattering effect
      const fallingY = (Math.sin(time * particles.velocities[i] + i) * 0.5) - (time * particles.velocities[i] % 10);
      const scatteringX = Math.cos(time * 0.2 + i) * 0.2;
      const scatteringZ = Math.sin(time * 0.2 + i) * 0.2;

      positions[i * 3] += (targetX + scatteringX - positions[i * 3]) * 0.02;
      positions[i * 3 + 1] += (targetY + fallingY - positions[i * 3 + 1]) * 0.02;
      positions[i * 3 + 2] += (targetZ + scatteringZ - positions[i * 3 + 2]) * 0.02;
    }
    
    pointsRef.current.geometry.attributes.position.needsUpdate = true;
    pointsRef.current.rotation.y = time * 0.05;
    pointsRef.current.rotation.x = Math.sin(time * 0.1) * 0.1;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particles.positions.length / 3}
          array={particles.positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={particles.colors.length / 3}
          array={particles.colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.03}
        vertexColors
        transparent
        opacity={0.8}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
        sizeAttenuation={true}
      />
    </points>
  );
};
