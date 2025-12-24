'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
    Settings,
    MessageSquare,
    Palette,
    User,
    Film,
    Camera,
    Music,
    Clapperboard,
    FileText,
    Trophy
} from 'lucide-react';

// --- カリキュラムデータ ---
const VIDEO_PROGRAM_DATA = [
    {
        lesson: 1,
        title: '準備・セットアップとAIの基礎',
        description: 'アカウント作成やツールの初期設定から一緒に始め、制作環境を整えます。',
        header: '「知識ゼロ」でも大丈夫',
        icon: Settings,
        color: 'from-indigo-500 to-purple-500',
    },
    {
        lesson: 2,
        title: 'はじめてのプロンプト体験',
        description: '準備が整ったら、最初の言葉（プロンプト）を入力して、AIが絵を描き出す感動の瞬間を体験しましょう。',
        header: 'AIアートの感動体験',
        icon: MessageSquare,
        color: 'from-indigo-500 to-purple-500',
    },
    {
        lesson: 3,
        title: 'スタイル（画風）のコントロール',
        description: '「水彩画風」「3Dアニメ風」「サイバーパンク」など、指示出しによって画風（スタイル）を自在に操る技術を学びます。',
        header: '画風を自在に操る',
        icon: Palette,
        color: 'from-indigo-500 to-purple-500',
    },
    {
        lesson: 4,
        title: 'キャラクターデザインと一貫性',
        description: '自分だけのオリジナルキャラクターを設計し、別のシーンでも同じ顔・同じ服装で登場させる「一貫性」の保持を習得します。',
        header: '一貫性のあるキャラ作り',
        icon: User,
        color: 'from-indigo-500 to-purple-500',
    },
    {
        lesson: 5,
        title: '動画生成：静止画を動かす',
        description: '作成した静止画を動画AIに取り込み、命を吹き込みます。静止画が動き出す「Image to Video」の基礎を学びます。',
        header: '静止画に命を吹き込む',
        icon: Film,
        color: 'from-indigo-500 to-purple-500',
    },
    {
        lesson: 6,
        title: 'カメラワークの魔術',
        description: '「ズームイン」「カメラを左へ」といった、映画監督のような視点操作（カメラワーク）をAIで制御する方法を習得します。',
        header: '視点操作をマスター',
        icon: Camera,
        color: 'from-indigo-500 to-purple-500',
    },
    {
        lesson: 7,
        title: 'AIサウンド生成',
        description: '映像に欠かせない「音」。AIを使って、雰囲気に合ったオリジナルのBGMや効果音を一瞬で生成します。',
        header: 'オリジナルBGM生成',
        icon: Music,
        color: 'from-indigo-500 to-purple-500',
    },
    {
        lesson: 8,
        title: '映像演出と編集',
        description: '生成した映像と音を組み合わせ、見る人の心を動かすための演出テクニックと、基礎的な編集方法を学びます。',
        header: '心を動かす演出術',
        icon: Clapperboard,
        color: 'from-indigo-500 to-purple-500',
    },
    {
        lesson: 9,
        title: '卒業制作：企画とラフ制作',
        description: '1本のショートムービー（15〜30秒）を企画し、素材を生成してラフ（下書き）を作成します。',
        header: 'ショートムービー企画',
        icon: FileText,
        color: 'from-indigo-500 to-purple-500',
    },
    {
        lesson: 10,
        title: '卒業制作：完成と上映会',
        description: 'タイトル挿入や最終調整を行い作品を完成させます。最後はオンライン上映会で発表し、プロからのフィードバックを受けます。',
        header: '作品完成と上映会',
        icon: Trophy,
        color: 'from-indigo-500 to-purple-500',
    },
];

export default function VideoProductionList() {
    return (
        <section className="py-24 px-6 md:px-12 relative overflow-hidden">
            {/* 背景装飾 */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
                <div className="absolute top-20 right-10 w-96 h-96 bg-blue-500/10 rounded-full blur-[100px]" />
                <div className="absolute bottom-20 left-10 w-96 h-96 bg-indigo-500/10 rounded-full blur-[100px]" />
            </div>

            <div className="max-w-7xl mx-auto relative z-10">
                {/* ヘッダー */}
                <div className="text-center mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <p className="text-indigo-400 font-bold tracking-widest mb-3 uppercase drop-shadow-[0_0_10px_rgba(129,140,248,0.5)]">
                            Video Production Program
                        </p>
                        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                            映像作成プログラム（全１０回）
                        </h2>
                        <p className="text-blue-100/80 text-lg md:text-xl font-medium">
                            ゼロから始める、AIを使った映像制作のプロフェッショナルコース
                        </p>
                    </motion.div>
                </div>

                {/* カリキュラムグリッド */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {VIDEO_PROGRAM_DATA.map((item, index) => (
                        <motion.div
                            key={item.lesson}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="group relative h-full"
                        >
                            {/* カード本体 */}
                            <div className="h-full relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-8 transition-all duration-300 hover:bg-white/10 hover:-translate-y-1 hover:shadow-[0_10px_30px_-10px_rgba(0,0,0,0.5)]">

                                {/* ホバー時の光るグラデーション背景 */}
                                <div
                                    className={`absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 bg-gradient-to-br ${item.color}`}
                                />

                                {/* ヘッダー：Lessen番号とアイコン */}
                                <div className="flex justify-between items-start mb-6 relative z-10">
                                    <span className={`font-mono text-sm font-bold px-3 py-1 rounded-full bg-black/30 border border-white/10 text-white`}>
                                        LESSON {String(item.lesson).padStart(2, '0')}
                                    </span>
                                    <div className={`p-3 rounded-lg bg-gradient-to-br ${item.color} shadow-lg`}>
                                        <item.icon className="w-6 h-6 text-white" />
                                    </div>
                                </div>

                                {/* タイトルとコンテンツ */}
                                <div className="relative z-10">
                                    <h3 className="text-xl md:text-2xl font-bold text-white mb-4 group-hover:text-indigo-100 transition-colors">
                                        {item.title}
                                    </h3>

                                    <div className="space-y-4">
                                        <div>
                                            <p className="text-sm text-indigo-400 font-bold mb-1 flex items-center gap-2">
                                                <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
                                                {item.header}
                                            </p>
                                            <p className="text-gray-200 text-sm leading-relaxed">
                                                {item.description}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* 装飾用：右下の大きな薄い数字 */}
                                <div className="absolute -bottom-4 -right-4 text-9xl font-bold text-white/5 pointer-events-none select-none font-mono">
                                    {item.lesson}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
