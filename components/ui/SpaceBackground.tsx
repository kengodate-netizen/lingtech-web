'use client';

import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars, Sparkles } from '@react-three/drei';
import { Suspense } from 'react';
import ShootingStars from '@/components/ui/ShootingStars';

export default function SpaceBackground() {
    return (
        // fixed inset-0 -z-10 で「画面全体に固定」かつ「最背面」に配置
        <div className="fixed inset-0 -z-10 bg-black pointer-events-none">

            {/* 流星群コンポーネント */}
            <ShootingStars />

            <div className="absolute inset-0 w-full h-full">
                <Canvas
                    gl={{ alpha: false, antialias: true }}
                    camera={{ position: [0, 0, 100], fov: 40, far: 5000 }}
                >
                    <color attach="background" args={['#000000']} />
                    <fog attach="fog" args={['#000000', 500, 2000]} />

                    <Suspense fallback={null}>
                        {/* ▼▼▼ 移植した3層の星空 ▼▼▼ */}

                        {/* レイヤー1: 遠景の無数の暗い星屑 */}
                        <Stars radius={400} depth={100} count={15000} factor={2} saturation={0} fade speed={0.5} />

                        {/* レイヤー2: 中間の明るさの星 */}
                        <Stars radius={300} depth={80} count={4000} factor={5} saturation={0} fade speed={0.8} />

                        {/* レイヤー3: 手前の明るく輝く大きな星 */}
                        <Stars radius={200} depth={50} count={250} factor={10} saturation={0} speed={1} />

                        {/* キラキラのエフェクト */}
                        <Sparkles count={200} scale={100} size={2} speed={0.2} opacity={0.3} color="#ffffff" />

                    </Suspense>

                    {/* ゆっくり回る動き（ユーザー操作は無効化して背景に徹する） */}
                    <OrbitControls
                        enableZoom={false}
                        enablePan={false}
                        enableRotate={false}
                        autoRotate
                        autoRotateSpeed={0.5}
                    />
                </Canvas>
            </div>
        </div>
    );
}