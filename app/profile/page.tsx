'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Link from 'next/link';
import Image from 'next/image';

import SpaceBackground from '@/components/ui/SpaceBackground';

const ProfilePage = () => {
    const [ref, inView] = useInView({
        triggerOnce: true,
        threshold: 0.1,
    });

    return (
        <div className="min-h-screen relative">
            <SpaceBackground />

            <div className="relative z-10">
                <main>
                    {/* Hero Section */}
                    <section className="pt-32 pb-16 px-8">
                        <div className="max-w-6xl mx-auto">
                            <motion.div
                                ref={ref}
                                initial={{ opacity: 0, y: 30 }}
                                animate={inView ? { opacity: 1, y: 0 } : {}}
                                transition={{ duration: 0.8 }}
                                className="text-center"
                            >
                                <div className="mb-8">
                                    {/* Profile Image Placeholder */}
                                    <div className="w-48 h-48 rounded-full mx-auto border-4 border-white/20 shadow-2xl overflow-hidden relative">
                                        <Image
                                            src="/assets/kento-profile.jpg"
                                            alt="Kento"
                                            fill
                                            className="object-cover"
                                            sizes="(max-width: 768px) 192px, 192px"
                                        />
                                    </div>
                                </div>
                                <h1 className="text-5xl md:text-6xl font-cormorant font-bold text-white mb-4">
                                    Kento
                                </h1>

                            </motion.div>
                        </div>
                    </section>

                    {/* About Me Section */}
                    <section className="py-24 px-8">
                        <div className="max-w-6xl mx-auto">
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8 }}
                            >
                                <h2 className="text-4xl font-cormorant font-bold text-white mb-12 text-center text-neumorphic">About Me</h2>
                                <div className="neumorphic-card rounded-2xl p-8 md:p-12 border-0">
                                    <div className="space-y-12">

                                        {/* Background & Career */}
                                        <div>
                                            <h3 className="text-2xl font-cormorant font-bold text-white mb-6 border-b border-indigo-500/30 pb-2 inline-block">Background & Career</h3>
                                            <div className="space-y-4 text-white/90 text-lg font-cormorant">
                                                <div className="flex flex-col md:flex-row md:items-start gap-2">
                                                    <span className="font-bold min-w-[140px] text-indigo-300">学歴:</span>
                                                    <span>外国語学修士　修了</span>
                                                </div>
                                                <div className="flex flex-col md:flex-row md:items-start gap-2">
                                                    <span className="font-bold min-w-[140px] text-indigo-300">翻訳実務:</span>
                                                    <span>特許翻訳・技術翻訳（CATツール活用経験あり）</span>
                                                </div>
                                                <div className="flex flex-col md:flex-row md:items-start gap-2">
                                                    <span className="font-bold min-w-[140px] text-indigo-300">マネジメント:</span>
                                                    <span>APAC（アジア太平洋）地域における多国籍チームの統率および事業推進</span>
                                                </div>
                                                <div className="flex flex-col md:flex-row md:items-start gap-2">
                                                    <span className="font-bold min-w-[140px] text-indigo-300">現在:</span>
                                                    <span>企業内における生成AI導入、ワークフロー構築、プロンプトエンジニアリング</span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Certifications & Memberships */}
                                        <div>
                                            <h3 className="text-2xl font-cormorant font-bold text-white mb-6 border-b border-indigo-500/30 pb-2 inline-block">Certifications & Memberships</h3>
                                            <ul className="space-y-3 text-white/90 text-lg font-cormorant list-disc list-inside marker:text-indigo-400">
                                                <li>JAPAN MENSA 会員</li>
                                                <li>TOEIC L&R: 990 (Full Score)</li>
                                                <li>HSK (中国語検定): 6級 (最高級)</li>
                                                <li>知的財産管理技能検定: 2級</li>
                                                <li>知的財産翻訳検定1級（日英、英日）</li>
                                            </ul>
                                        </div>

                                        {/* Languages & Tools */}
                                        <div>
                                            <h3 className="text-2xl font-cormorant font-bold text-white mb-6 border-b border-indigo-500/30 pb-2 inline-block">Languages & Tools</h3>
                                            <div className="space-y-4 text-white/90 text-lg font-cormorant">
                                                <div className="flex flex-col md:flex-row md:items-start gap-2">
                                                    <span className="font-bold min-w-[140px] text-indigo-300">Languages:</span>
                                                    <span>日本語(Native)、英語(Fluent)、中国語(Fluent)、スペイン語(Advanced)、ポルトガル語(Intermediate)</span>
                                                </div>
                                                <div className="flex flex-col md:flex-row md:items-start gap-2">
                                                    <span className="font-bold min-w-[140px] text-indigo-300">AI Tools:</span>
                                                    <span>Sora, Veo, ChatGPT, Gemini, Antigravity, ReaddyAI, Genspark, Perplexity</span>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </section>

                    {/* Back Button */}
                    <div className="pb-24 text-center">
                        <Link href="/" className="inline-flex items-center text-white/60 hover:text-white transition-colors duration-300">
                            <span className="mr-2">←</span> Back to Home
                        </Link>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default ProfilePage;
