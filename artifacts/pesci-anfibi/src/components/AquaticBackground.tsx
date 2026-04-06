import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';
// Simple random float generator
const randFloat = (min: number, max: number) => Math.random() * (max - min) + min;

interface AquaticBackgroundProps {
  environment: 'ocean' | 'swamp' | 'deep';
}

function ParticleField({ environment }: { environment: string }) {
  const ref = useRef<THREE.Points>(null);
  
  // Generate random particles
  const [positions, sizes] = React.useMemo(() => {
    const count = window.innerWidth < 768 ? 50 : 150;
    const pos = new Float32Array(count * 3);
    const size = new Float32Array(count);
    
    for (let i = 0; i < count; i++) {
      pos[i * 3] = randFloat(-10, 10);
      pos[i * 3 + 1] = randFloat(-10, 10);
      pos[i * 3 + 2] = randFloat(-5, 5);
      size[i] = randFloat(0.02, 0.08);
    }
    
    return [pos, size];
  }, []);

  useFrame((state) => {
    if (!ref.current) return;
    const time = state.clock.getElapsedTime();
    
    ref.current.rotation.y = Math.sin(time / 10) * 0.1;
    ref.current.rotation.x = Math.cos(time / 15) * 0.1;
    
    // Slowly move particles upward
    const positions = ref.current.geometry.attributes.position.array as Float32Array;
    for (let i = 0; i < positions.length / 3; i++) {
      positions[i * 3 + 1] += 0.01;
      if (positions[i * 3 + 1] > 10) {
        positions[i * 3 + 1] = -10;
      }
    }
    ref.current.geometry.attributes.position.needsUpdate = true;
  });

  const color = environment === 'swamp' ? '#88cc88' : '#88ffff';

  return (
    <Points ref={ref} positions={positions}>
      <PointMaterial
        transparent
        color={color}
        size={0.05}
        sizeAttenuation={true}
        depthWrite={false}
        opacity={0.6}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  );
}

export function AquaticBackground({ environment }: AquaticBackgroundProps) {
  // Map environment to CSS background gradient
  const bgClass = 
    environment === 'ocean' ? 'from-[#020b16] via-[#051833] to-[#041022]' :
    environment === 'swamp' ? 'from-[#0a1208] via-[#122410] to-[#0a140b]' :
    'from-[#010408] via-[#020b16] to-[#000000]';

  return (
    <div className={`absolute inset-0 w-full h-full transition-colors duration-2000 bg-gradient-to-b ${bgClass}`}>
      {/* Light rays overlay */}
      <div className="absolute inset-0 opacity-30 mix-blend-overlay pointer-events-none"
           style={{
             background: 'linear-gradient(to bottom, rgba(255,255,255,0.1) 0%, transparent 100%)',
             backgroundImage: 'repeating-linear-gradient(175deg, transparent, transparent 40px, rgba(100,200,255,0.05) 40px, rgba(100,200,255,0.05) 80px)'
           }}
      />
      
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 5], fov: 60 }} dpr={[1, 2]}>
          <ambientLight intensity={0.5} />
          <ParticleField environment={environment} />
        </Canvas>
      </div>
    </div>
  );
}
