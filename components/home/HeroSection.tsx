'use client';

import { Canvas, useFrame, useLoader, useThree } from '@react-three/fiber';
import { OrbitControls, Stars, Sparkles, useTexture, Float, Preload } from '@react-three/drei';
import { Suspense, useRef, useState, useEffect, useMemo } from 'react';
import * as THREE from 'three';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import { TextureLoader } from 'three';
import { ArrowRight } from 'lucide-react';
import ShootingStars from '@/components/ui/ShootingStars';

// --- 1. 太陽 ---
function Sun() {
  return (
    <mesh position={[500, 100, -1000]}>
      <sphereGeometry args={[10, 32, 32]} />
      <meshBasicMaterial color={[30, 30, 30]} toneMapped={false} />
    </mesh>
  );
}

// --- 2. 地球 ---
function Earth() {
  const texture = useLoader(TextureLoader, '/earth.jpg');
  const earthRef = useRef<THREE.Mesh>(null);

  useFrame(() => {
    if (earthRef.current) {
      earthRef.current.rotation.y += 0.0005;
    }
  });

  return (
    <Float speed={1} rotationIntensity={0.5} floatIntensity={1} position={[0, -3, 0]}>
      <mesh ref={earthRef} rotation={[0, 0, 0.4]}>
        <sphereGeometry args={[8, 64, 64]} />
        <meshStandardMaterial
          map={texture}
          metalness={0.4}
          roughness={0.6}
          transparent={false}
          depthWrite={true}
          side={THREE.FrontSide}
        />
        <pointLight position={[-20, 10, -10]} intensity={3} color="#4488ff" distance={50} />
      </mesh>
    </Float>
  );
}

// --- 3. 月 ---
function Moon() {
  const texture = useLoader(TextureLoader, '/moon.jpg');
  const moonRef = useRef<THREE.Mesh>(null);

  useFrame(() => {
    if (moonRef.current) {
      moonRef.current.rotation.y += 0.002;
    }
  });

  return (
    <Float speed={0.5} rotationIntensity={0.2} floatIntensity={0.5} position={[-22, 5, -5]}>
      <mesh ref={moonRef}>
        <sphereGeometry args={[2, 32, 32]} />
        <meshStandardMaterial map={texture} roughness={0.8} />
      </mesh>
    </Float>
  );
}

// --- 4. 金星 ---
function Venus() {
  const texture = useLoader(TextureLoader, '/venus.jpg');
  const venusRef = useRef<THREE.Mesh>(null);

  useFrame(() => {
    if (venusRef.current) {
      venusRef.current.rotation.y += 0.0008;
    }
  });

  return (
    <Float speed={1.2} rotationIntensity={0.4} floatIntensity={0.8} position={[-200, 100, -900]}>
      <group>
        <mesh ref={venusRef} rotation={[0, 0, 0.1]}>
          <sphereGeometry args={[4.5, 64, 64]} />
          <meshStandardMaterial
            map={texture}
            metalness={0.8}
            roughness={0.1}
            toneMapped={false}
          />
        </mesh>
        {/* 金星専用ライト */}
        <pointLight position={[8, 2, 5]} intensity={200} distance={50} color="#ffffff" />
      </group>
    </Float>
  );
}

// --- 5. 火星 ---
function Mars() {
  const texture = useLoader(TextureLoader, '/mars.jpg');
  const marsRef = useRef<THREE.Mesh>(null);

  useFrame(() => {
    if (marsRef.current) {
      marsRef.current.rotation.y += 0.0004;
    }
  });

  return (
    <Float speed={0.8} rotationIntensity={0.3} floatIntensity={1.2} position={[150, -60, 300]}>
      <group>
        <mesh ref={marsRef} rotation={[0, 0, 0.2]}>
          <sphereGeometry args={[3.5, 64, 64]} />
          <meshStandardMaterial
            map={texture}
            metalness={0.2}
            roughness={0.7}
          />
        </mesh>
        <pointLight position={[-15, 5, 20]} intensity={10} distance={100} color="#ffaa88" />
      </group>
    </Float>
  );
}

// --- 制御用コンポーネント (カメラアニメーション) ---
// --- 制御用コンポーネント (カメラアニメーション) ---
function CameraRig({
  userInteraction,
  onZoomOutComplete
}: {
  userInteraction: React.MutableRefObject<boolean>;
  onZoomOutComplete: (isComplete: boolean) => void;
}) {
  const { camera } = useThree();
  // 通知済みかどうかを追跡して、不要な再レンダリングを防ぐ
  const hasNotifiedRef = useRef(false);

  useFrame((state) => {
    // ユーザーが操作中はアニメーションを停止（手動操作を優先）
    if (userInteraction.current) return;

    const time = state.clock.getElapsedTime();
    let targetDist = 60; // Initial distance (close-up)
    const finalDist = 3500; // Increased distance to see full star field

    // Check for zoom out completion (Phase 3 start: > 50s)
    // Phase 4 starts at 80s, so between 50 and 80 is the "Hold Wide" phase
    if (time > 50 && time < 80) {
      if (!hasNotifiedRef.current) {
        onZoomOutComplete(true);
        hasNotifiedRef.current = true;
      }
    } else {
      // Reset if outside the window (e.g. loops back or starts over)
      if (hasNotifiedRef.current) {
        onZoomOutComplete(false);
        hasNotifiedRef.current = false;
      }
    }

    // Phase 1: 0s - 20s (Hold)
    if (time <= 20) {
      targetDist = 60;
    }
    // Phase 2: 20s - 50s (Zoom out - 30s duration)
    else if (time > 20 && time <= 50) {
      const rawProgress = (time - 20) / 30; // 0.0 to 1.0
      // Use EaseOutCubic for fast start and smooth stop
      // 1 - (1 - x)^3
      const easedProgress = 1 - Math.pow(1 - rawProgress, 3);
      targetDist = THREE.MathUtils.lerp(60, finalDist, easedProgress);
    }
    // Phase 3: 50s - 80s (Hold Wide - 30s duration)
    else if (time > 50 && time <= 80) {
      targetDist = finalDist;
    }
    // Phase 4: 80s - 110s (Zoom in - 30s duration)
    else if (time > 80 && time <= 110) {
      const progress = (time - 80) / 30; // 0.0 to 1.0
      targetDist = THREE.MathUtils.lerp(finalDist, 60, progress); // Zoom back to 60
    }
    // Phase 5: 110s+ (Hold Initial)
    else {
      targetDist = 60;
    }

    camera.position.setLength(targetDist);
  });

  return null;
}

// --- 6. StarCluster (Instanced Spheres for Solid, Sharp Stars) ---
function StarCluster({ count, color, size, area = 800 }: { count: number, color: string, size: number, area?: number }) {
  const meshRef = useRef<THREE.InstancedMesh>(null);

  // Create base THREE.Color object for calculations
  const baseColorObj = useMemo(() => new THREE.Color(color), [color]);
  const tempColor = useMemo(() => new THREE.Color(), []);

  const { particles, dummy } = useMemo(() => {
    const dummy = new THREE.Object3D();
    const particles = Array.from({ length: count }, () => ({
      position: [
        (Math.random() - 0.5) * area,
        (Math.random() - 0.5) * area,
        (Math.random() - 0.5) * area
      ] as [number, number, number],
      offset: Math.random() * 100,
      speed: 0.5 + Math.random() * 1.5, // slightly faster speed variance for flicker
      baseScale: size * (0.8 + Math.random() * 0.4) // random size variation
    }));
    return { particles, dummy };
  }, [count, area, size]);

  // Initial setup for static position/scale
  useEffect(() => {
    if (!meshRef.current) return;
    particles.forEach((p, i) => {
      dummy.position.set(p.position[0], p.position[1], p.position[2]);
      dummy.scale.set(p.baseScale, p.baseScale, p.baseScale);
      dummy.updateMatrix();
      meshRef.current!.setMatrixAt(i, dummy.matrix);
    });
    meshRef.current.instanceMatrix.needsUpdate = true;
  }, [particles, dummy]);

  useFrame((state) => {
    if (!meshRef.current) return;
    const time = state.clock.getElapsedTime();

    // Only update colors in useFrame loop
    particles.forEach((p: { baseScale: number; speed: number; offset: number; position: [number, number, number] }, i: number) => {
      // COLOR ANIMATION (Flicker)
      // Fluctuate brightness instead of size
      // Mix multiple sine waves for organic "candle-like" flicker
      const noise = Math.sin(time * p.speed * 4 + p.offset) * 0.5 + Math.sin(time * p.speed * 10) * 0.3;
      // Map noise to intensity range approx 0.5 to 1.3 (allowing over-bright bloom)
      const intensity = 0.9 + noise * 0.4;

      tempColor.copy(baseColorObj).multiplyScalar(intensity);
      meshRef.current!.setColorAt(i, tempColor);
    });

    if (meshRef.current.instanceColor) meshRef.current.instanceColor.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]} frustumCulled={false}>
      <sphereGeometry args={[1, 16, 16]} />
      {/* Set base material color to white so instance colors control the look */}
      <meshBasicMaterial color="#ffffff" toneMapped={false} />
    </instancedMesh>
  );
}

// --- メインコンポーネント ---
export default function HeroSection() {
  const [mounted, setMounted] = useState(false);
  const [isZoomedOut, setIsZoomedOut] = useState(false);
  const userInteraction = useRef(false); // ユーザー操作追跡用

  useEffect(() => setMounted(true), []);

  const handleScroll = () => {
    const nextSection = document.getElementById('services');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative w-full h-screen bg-black overflow-hidden">

      <ShootingStars />

      <div className="absolute inset-0 z-10">
        <Canvas
          gl={{ alpha: false, antialias: true }}
          camera={{ position: [0, 0, 60], fov: 40, far: 5000 }}
        >
          <color attach="background" args={['#000000']} />
          <fog attach="fog" args={['#000000', 500, 2000]} />

          <ambientLight intensity={0.1} />
          <directionalLight position={[500, 100, -1000]} intensity={2.0} color="#ffffff" />

          <Suspense fallback={null}>
            {/* ▼▼▼ 星空のレイヤー表現（ここを変更） ▼▼▼ */}

            {/* レイヤー1: 遠景の無数の暗い星屑 */}
            <Stars radius={400} depth={100} count={15000} factor={2} saturation={0} fade speed={0.5} />

            {/* レイヤー2: 中間の明るさの星 */}
            <Stars radius={300} depth={80} count={4000} factor={5} saturation={0} fade speed={0.8} frustumCulled={false} />

            {/* レイヤー3: 手前の明るく輝く大きな星（白）- 数を減らして色付きとバランスを取る */}
            <Stars radius={200} depth={50} count={150} factor={10} saturation={0} speed={1} frustumCulled={false} />

            {/* ▲▲▲ 星空レイヤー終了 ▲▲▲ */}

            {/* 赤い星（金星・火星のような自然な暖色） - Sphere Mesh */}
            <StarCluster count={300} size={0.2} color="#ffccaa" />

            {/* 青い星（シリウスのような青白さ） - Sphere Mesh */}
            <StarCluster count={300} size={0.2} color="#d4ebff" />

            {/* 赤い大きな星（アクセント） - Sphere Mesh - サイズ調整 */}
            <StarCluster count={40} size={0.45} color="#ffccaa" />

            {/* 青い大きな星（アクセント） - Sphere Mesh - サイズ調整 */}
            <StarCluster count={40} size={0.45} color="#d4ebff" />

            <Sparkles count={300} scale={60} size={2} speed={0.2} opacity={0.3} color="#ffffff" frustumCulled={false} />

            <Sun />
            <Venus />
            <Earth />
            <Moon />
            <Mars />

            <EffectComposer disableNormalPass>
              <Bloom
                luminanceThreshold={0.2}
                mipmapBlur
                intensity={2.0}
                radius={0.9}
              />
            </EffectComposer>

          </Suspense>

          <CameraRig
            userInteraction={userInteraction}
            onZoomOutComplete={setIsZoomedOut}
          />

          <OrbitControls
            enableZoom={true} // アニメーション中は競合する可能性がありますが、手動操作も残す設定
            enablePan={true}
            autoRotate
            autoRotateSpeed={0.5}
            onStart={() => { userInteraction.current = true; }} // 操作開始時にフラグを立てる
          />

          <Preload all />
        </Canvas>
      </div>

      <div className="relative z-20 flex flex-col items-center justify-center h-full pointer-events-none text-center px-4">
        <h1
          className={`text-5xl md:text-7xl font-cormorant tracking-tighter mb-6 transition-all duration-1000 ${isZoomedOut
            ? 'text-transparent bg-clip-text bg-gradient-to-r from-[#38bdf8] via-white to-[#38bdf8] bg-[length:200%_auto] animate-[text-shimmer_3s_linear_infinite]'
            : 'text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]'
            }`}
          style={isZoomedOut ? {
            textShadow: '0 0 10px rgba(56, 189, 248, 0.5), 0 0 20px rgba(56, 189, 248, 0.3)'
          } : undefined}
        >
          LingTech
        </h1>
        <p className="text-xl md:text-2xl text-gray-200 drop-shadow-md mb-12 tracking-wide">
          AI × 語学で、世界をもっと近くに。
        </p>

        {/* ボタン部分（変更なし） */}
        <button
          onClick={handleScroll}
          className="pointer-events-auto relative overflow-hidden px-8 py-3 rounded-full border border-white/20 bg-white/5 backdrop-blur-sm text-white hover:bg-white/10 hover:scale-105 transition-all duration-300 group"
        >
          <span className="shine-effect"></span>

          <span className="relative z-10 flex items-center gap-2">
            Explore the Future
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </span>
        </button>

      </div>
    </div>
  );
}