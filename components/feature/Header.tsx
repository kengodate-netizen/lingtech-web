'use client';
import { Sparkles, Menu } from 'lucide-react';
import Link from 'next/link';

export default function Header() {
    return (
        <header className="fixed top-0 left-0 right-0 z-50 glass-nav h-20 flex items-center justify-between px-6 md:px-12 transition-all duration-300 font-cormorant">
            <Link href="/" className="flex items-center gap-3 group cursor-pointer">
                <div className="relative w-12 h-12 flex items-center justify-center">
                    <img
                        src="/blue-bird.png"
                        alt="Lingtech Logo"
                        className="w-full h-full object-contain filter drop-shadow-[0_0_8px_rgba(56,189,248,0.5)]"
                    />
                </div>
                <span className="text-2xl font-bold tracking-tighter text-glow">
                    Lingtech
                </span>
            </Link>

            <nav className="hidden md:flex items-center gap-8 text-lg font-medium tracking-wide">
                {[
                    { label: 'Services', href: '/#services' },
                    { label: 'Philosophy', href: '/philosophy' },
                    { label: 'Profile', href: '/profile' },
                    { label: 'Contact', href: '/contact' },
                ].map((item) => (
                    <Link
                        key={item.label}
                        href={item.href}
                        className="relative text-gray-300 hover:text-[var(--color-cyber-blue)] transition-colors duration-300 group"
                    >
                        {item.label}
                        <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-[var(--color-cyber-blue)] shadow-[0_0_8px_var(--color-cyber-blue)] group-hover:w-full transition-all duration-300" />
                    </Link>
                ))}
            </nav>

            <button className="md:hidden text-white hover:text-[var(--color-cyber-blue)] transition-colors">
                <Menu className="w-6 h-6" />
            </button>
        </header>
    );
}
