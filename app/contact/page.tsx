'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';

import SpaceBackground from '@/components/ui/SpaceBackground';

const ContactPage = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: '',
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (formData.message.length > 500) {
            alert('メッセージは500文字以内で入力してください。');
            return;
        }

        setIsSubmitting(true);
        setSubmitStatus('idle');

        try {
            const formBody = new URLSearchParams({
                name: formData.name,
                email: formData.email,
                subject: formData.subject,
                message: formData.message,
            }).toString();

            const response = await fetch('https://readdy.ai/api/public/form/submit/1737622088476x562086076088811500', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: formBody,
            });

            if (response.ok) {
                setSubmitStatus('success');
                setFormData({ name: '', email: '', subject: '', message: '' });
            } else {
                setSubmitStatus('error');
            }
        } catch (error) {
            console.error('Form submission error:', error);
            setSubmitStatus('error');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen relative">
            <SpaceBackground />

            <div className="relative z-10 pt-32 pb-20 px-8">
                <div className="max-w-3xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-12"
                    >
                        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">お問い合わせ</h1>
                        <p className="text-lg text-gray-300">Contact Us</p>
                    </motion.div>

                    <motion.form
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        onSubmit={handleSubmit}
                        className="rounded-2xl p-8 md:p-12 shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] relative overflow-hidden backdrop-blur-md bg-indigo-500/10 border border-indigo-200/20"
                        data-readdy-form
                        id="contact-form"
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none opacity-50"></div>
                        <div className="absolute -top-24 -left-24 w-48 h-48 bg-indigo-400/10 rounded-full blur-[60px] pointer-events-none"></div>
                        <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-cyan-400/10 rounded-full blur-[60px] pointer-events-none"></div>
                        <div className="space-y-6">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-200 mb-2">
                                    お名前 <span className="text-red-400">*</span>
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-3 bg-transparent neumorphic-inset rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all text-sm"
                                    placeholder="山田太郎"
                                />
                            </div>

                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-200 mb-2">
                                    メールアドレス <span className="text-red-400">*</span>
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-3 bg-transparent neumorphic-inset rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all text-sm"
                                    placeholder="example@email.com"
                                />
                            </div>

                            <div>
                                <label htmlFor="subject" className="block text-sm font-medium text-gray-200 mb-2">
                                    件名 <span className="text-red-400">*</span>
                                </label>
                                <input
                                    type="text"
                                    id="subject"
                                    name="subject"
                                    value={formData.subject}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-3 bg-transparent neumorphic-inset rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all text-sm"
                                    placeholder="お問い合わせ内容"
                                />
                            </div>

                            <div>
                                <label htmlFor="message" className="block text-sm font-medium text-gray-200 mb-2">
                                    メッセージ <span className="text-red-400">*</span>
                                    <span className="text-xs text-gray-400 ml-2">(500文字以内)</span>
                                </label>
                                <textarea
                                    id="message"
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                    maxLength={500}
                                    rows={6}
                                    className="w-full px-4 py-3 bg-transparent neumorphic-inset rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all resize-none text-sm"
                                    placeholder="お問い合わせ内容をご記入ください"
                                />
                                <div className="text-right text-xs text-gray-400 mt-1">
                                    {formData.message.length}/500
                                </div>
                            </div>

                            {submitStatus === 'success' && (
                                <div className="bg-green-500/20 border border-green-500/50 text-green-200 px-4 py-3 rounded-lg text-sm">
                                    お問い合わせを受け付けました。ありがとうございます。
                                </div>
                            )}

                            {submitStatus === 'error' && (
                                <div className="bg-red-500/20 border border-red-500/50 text-red-200 px-4 py-3 rounded-lg text-sm">
                                    送信に失敗しました。もう一度お試しください。
                                </div>
                            )}

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full neumorphic-btn text-white font-semibold py-4 px-8 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap text-glow"
                            >
                                {isSubmitting ? '送信中...' : '送信する'}
                            </button>
                        </div>
                    </motion.form>
                </div>
            </div>
        </div>
    );
};

export default ContactPage;
