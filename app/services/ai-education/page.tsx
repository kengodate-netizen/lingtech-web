'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import SpaceBackground from '@/components/ui/SpaceBackground';
import { motion } from 'framer-motion';
import VideoProductionList from '@/components/feature/VideoProductionList';
import AiSeminarList from '@/components/feature/AiSeminarList';

export default function AiEducationPage() {
    return (
        <div className="min-h-screen text-white selection:bg-indigo-500/30">

            {/* Space Background */}
            <SpaceBackground />

            {/* Hero Section */}
            <section className="relative h-screen flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/50 to-black z-10" />

                <div className="relative z-20 container mx-auto px-6 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight text-white">
                            AIセミナー
                        </h1>
                        <p className="text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
                            <span className="text-white font-bold">AIを味方にして 自由自在に使いこなす</span><br />
                            新時代のクリエイティブスキルを習得する
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.4, duration: 0.6 }}
                        className="mt-12"
                    >
                        <a
                            href="#curriculum"
                            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white font-bold hover:bg-white/20 hover:scale-105 transition-all duration-300 group shadow-[0_0_20px_rgba(79,70,229,0.3)] hover:shadow-[0_0_30px_rgba(79,70,229,0.5)]"
                        >
                            <span className="shine-effect"></span>
                            <span className="relative z-10 flex items-center gap-2">
                                View Curriculum
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </span>
                        </a>
                    </motion.div>
                </div>
            </section>

            {/* Video Production Program Section */}
            <div id="curriculum">
                <VideoProductionList />
            </div>

            {/* Generative AI Seminar Section */}
            <AiSeminarList />

            {/* CTA Section */}
            <section className="py-20 px-6 text-center relative z-10">
                <div className="max-w-4xl mx-auto bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-12 hover:bg-white/10 transition-colors duration-500">
                    <h2 className="text-3xl md:text-4xl font-bold mb-6">
                        未来のクリエイターへの第一歩
                    </h2>
                    <p className="text-gray-300 mb-8 text-lg">
                        AI技術は日々進化しています。今すぐ始めて、新しい可能性を切り拓きましょう。
                    </p>
                    <Link
                        href="/contact"
                        className="inline-flex items-center gap-2 group relative overflow-hidden px-10 py-4 rounded-full border border-white/20 bg-white/5 backdrop-blur-sm text-white hover:bg-white/10 hover:scale-105 transition-all duration-300 font-bold text-xl tracking-wide shadow-lg hover:shadow-indigo-500/20"
                    >
                        <span className="shine-effect"></span>
                        <span className="relative z-10 flex items-center gap-2">
                            体験レッスンに申し込む
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </span>
                    </Link>
                </div>
            </section>

        </div>
    );
}