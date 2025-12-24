'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
    Bot,
    MessageSquare,
    PenTool,
    Search,
    Lightbulb,
    Table,
    Command,
    Palette,
    Sparkles,
    Rocket
} from 'lucide-react';

// --- カリキュラムデータ ---
const SEMINAR_DATA = [
    {
        lesson: 1,
        title: 'AIと友達になろう',
        description: '基本操作、スマホ/音声入力、セキュリティ設定',
        issue: '「何から始めたらいいかわからない」',
        icon: Bot,
        color: 'from-cyan-400 to-blue-500',
    },
    {
        lesson: 2,
        title: '聞き方の基本（魔法の言葉）',
        description: '役割設定、条件指定、レシピ提案ワーク',
        issue: '「回答が長すぎて読みづらい」',
        icon: MessageSquare,
        color: 'from-cyan-400 to-blue-500',
    },
    {
        lesson: 3,
        title: '文章作成と要約の達人',
        description: 'レポート構成、案内文作成、長文要約',
        issue: '「文章を書くのが苦手」',
        icon: PenTool,
        color: 'from-cyan-400 to-blue-500',
    },
    {
        lesson: 4,
        title: '検索とリサーチ革命',
        description: '旅行プラン作成、動画要約、ファクトチェック',
        issue: '「リサーチに時間がかかる」',
        icon: Search,
        color: 'from-cyan-400 to-blue-500',
    },
    {
        lesson: 5,
        title: '悩み相談とアイデア出し',
        description: 'プレゼント選び、壁打ち、イベント企画',
        issue: '「良いアイデアが浮かばない」',
        icon: Lightbulb,
        color: 'from-cyan-400 to-blue-500',
    },
    {
        lesson: 6,
        title: '整理整頓と表づくり',
        description: 'メモの表データ化、スケジュール作成、数式生成',
        issue: '「計画倒れになる・Excelが苦手」',
        icon: Table,
        color: 'from-cyan-400 to-blue-500',
    },
    {
        lesson: 7,
        title: '【応用】AIに指示を作らせよう',
        description: 'メタプロンプト、逆質問テクニック',
        issue: '「どう指示すればいいか言葉が出ない」',
        icon: Command,
        color: 'from-cyan-400 to-blue-500',
    },
    {
        lesson: 8,
        title: 'お絵描きAIで遊ぼう',
        description: '画像生成体験、年賀状・カード作成',
        issue: '「絵心がない・オリジナル画像が欲しい」',
        icon: Palette,
        color: 'from-cyan-400 to-blue-500',
    },
    {
        lesson: 9,
        title: '【応用】あなた好みに育てる',
        description: 'カスタム指示、メモリ機能、自分専用アドバイザー',
        issue: '「毎回説明するのが面倒」',
        icon: Sparkles,
        color: 'from-cyan-400 to-blue-500',
    },
    {
        lesson: 10,
        title: '未来の暮らしとAI',
        description: '最新トレンド、著作権・倫理、卒業制作発表',
        issue: '「将来どうなるの？正しく付き合いたい」',
        icon: Rocket,
        color: 'from-cyan-400 to-blue-500',
    },
];

export default function AiSeminarList() {
    return (
        <section className="py-24 px-6 md:px-12 relative overflow-hidden">
            {/* 背景装飾 */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
                <div className="absolute top-20 left-10 w-96 h-96 bg-purple-500/10 rounded-full blur-[100px]" />
                <div className="absolute bottom-20 right-10 w-96 h-96 bg-cyan-500/10 rounded-full blur-[100px]" />
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
                        <p className="text-cyan-400 font-bold tracking-widest mb-3 uppercase drop-shadow-[0_0_10px_rgba(34,211,238,0.5)]">
                            Generative AI Seminar
                        </p>
                        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                            はじめての生成AI活用セミナー（全10回）
                        </h2>
                        <p className="text-blue-100/80 text-lg md:text-xl font-medium">
                            家事・課題の時短から、自分だけのAIパートナー育成まで
                        </p>
                    </motion.div>
                </div>

                {/* カリキュラムグリッド */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {SEMINAR_DATA.map((item, index) => (
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
                                    <h3 className="text-xl md:text-2xl font-bold text-white mb-4 group-hover:text-cyan-100 transition-colors">
                                        {item.title}
                                    </h3>

                                    <div className="space-y-4">
                                        <div>
                                            <p className="text-sm text-cyan-400 font-bold mb-1 flex items-center gap-2">
                                                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                                                解決する悩み
                                            </p>
                                            <p className="text-gray-300 text-sm italic border-l-2 border-white/10 pl-3">
                                                {item.issue}
                                            </p>
                                        </div>

                                        <div>
                                            <p className="text-sm text-purple-400 font-bold mb-1 flex items-center gap-2">
                                                <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
                                                学ぶこと
                                            </p>
                                            <p className="text-gray-200">
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
