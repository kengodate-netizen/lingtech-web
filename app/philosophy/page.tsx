'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

import SpaceBackground from '@/components/ui/SpaceBackground';


export default function PhilosophyPage() {
    return (
        <div className="min-h-screen relative">
            <SpaceBackground />

            <div className="relative z-10">

                <main>
                    {/* Hero Section */}
                    <section className="pt-32 pb-16 px-8">
                        <div className="max-w-6xl mx-auto">
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8 }}
                                className="text-center"
                            >
                                <h1 className="text-2xl md:text-3xl font-cormorant font-bold text-white mb-4">
                                    「AI共生時代」の新しい地図を、その手に。
                                </h1>
                                <p className="text-lg md:text-xl text-white/80 font-light tracking-wider font-cormorant">
                                    Navigating the New Era of AI Synergy
                                </p>
                            </motion.div>
                        </div>
                    </section>

                    {/* Main Content Section */}
                    <section className="py-24 px-8 pb-32">
                        <div className="max-w-6xl mx-auto">
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, amount: 0.1 }}
                                transition={{ duration: 0.8 }}
                            >
                                <div className="neumorphic-card rounded-2xl p-8 md:p-12 border-0">
                                    <div className="space-y-8">
                                        {/* Section 1: The Rule Change */}
                                        <div>
                                            <div className="text-white/90 leading-relaxed text-lg space-y-6">
                                                <p>
                                                    2023年、世界のルールは書き換えられました。<br />
                                                    ChatGPTの誕生は、単なるツールの進化ではなく、人類史上最大の「ゲームチェンジ」です。学歴や過去のキャリアの優位性は一度リセットされ、私たちは今、<span className="font-bold font-cormorant" style={{ color: '#38bdf8' }}>「生成AIをいかに使いこなすか」</span>という全く新しいステージのスタート地点に、<span className="font-bold" style={{ color: '#38bdf8' }}>全員等しく立たされています。</span>
                                                </p>
                                                <p>
                                                    人間が丸一日を費やす仕事を、AIはわずか5分で完遂します。<br />
                                                    私たちが今取り組むべきは、AIが代替できる領域に労力を投じることではありません。AIという圧倒的な力を使いこなし、人間だけが到達できる「新しい次元」へ自分をアップデートすることです。
                                                </p>
                                            </div>
                                        </div>

                                        {/* Section 2: The Value of Language */}
                                        <div>
                                            <div className="text-white/90 leading-relaxed text-lg space-y-6">
                                                <p>
                                                    しかし、テクノロジーが進化するほど、浮き彫りになるものがあります。<br />
                                                    自動翻訳がどれほど精度を高めても、生身の人間同士が自然言語で直接語り合うことでしか生まれない信頼、熱量、そして心のつながり。その価値は、変わるどころか、グローバル化が隅々まで浸透する世界において、これまで以上に重要性を増しています。
                                                </p>
                                                <p className="text-lg md:text-xl font-semibold" style={{ color: '#38bdf8' }}>
                                                    「AIという翼」で効率を極め、「自然言語という魂」で世界と深く繋がる。
                                                </p>
                                                <p>
                                                    この二つの力を手にすることこそが、人生の可能性を最大化（Maximize）する唯一の道であると、Lingtechは確信しています。
                                                </p>
                                            </div>
                                        </div>

                                        {/* Section 3: Mission Statement */}
                                        <div>
                                            <h2 className="text-2xl md:text-3xl font-cormorant font-bold text-white mb-6">
                                                Empowering your Future.
                                            </h2>
                                            <div className="text-white/90 leading-relaxed text-lg space-y-6">
                                                <p>
                                                    私たちは、次世代を担う子供たち、そして最前線で戦うビジネスパーソンへ、この「二つの力」を授けます。<br />
                                                    AIを味方につけ、世界を舞台に縦横無尽に羽ばたける、真に自由な個人の育成。それがLingtechの使命です。
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </section>


                    <div className="pb-24 text-center">
                        <Link href="/" className="inline-flex items-center text-white/60 hover:text-white transition-colors duration-300">
                            <span className="mr-2">←</span> Back to Home
                        </Link>
                    </div>
                </main>

            </div>
        </div >
    );
}
