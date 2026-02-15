'use client';

import Link from 'next/link';
import { ThemeToggle } from '@/components/ThemeToggle';

export function Header() {
    return (
        <header className="h-20 flex-none flex items-center px-6 sm:px-8 max-w-7xl mx-auto w-full z-20">
            <div className="flex items-center gap-3">
                <Link href="/" className="flex items-center gap-3">
                    <div className="w-10 h-10 flex items-center justify-center text-stone-900 dark:text-white">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="w-8 h-8"
                        >
                            <circle cx="12" cy="12" r="10" />
                            <path d="M12 16v-4" />
                            <path d="M12 8h.01" />
                        </svg>
                    </div>
                    <h1 className="font-bold text-xl tracking-tighter text-stone-900 dark:text-white">
                        ResearchAgent
                    </h1>
                </Link>
            </div>
            <div className="flex items-center gap-6 ml-auto">
                <nav className="hidden sm:flex items-center gap-8 text-sm font-medium text-stone-600 dark:text-stone-400">
                    <Link href="/#features" className="hover:text-stone-900 dark:hover:text-white transition-colors">Features</Link>
                    <Link href="/how-it-works" className="hover:text-stone-900 dark:hover:text-white transition-colors">How it works</Link>
                    <Link href="https://github.com/SwayamSat/A-Multi-Agent-Research-Assistant-Using-AutoGen" target="_blank" className="hover:text-stone-900 dark:hover:text-white transition-colors">GitHub</Link>
                </nav>
                <div className="h-6 w-px bg-stone-200 dark:bg-stone-800 hidden sm:block"></div>
                <ThemeToggle />
                <Link
                    href="/research"
                    className="hidden sm:flex items-center gap-2 px-5 py-2.5 rounded-full bg-stone-900 dark:bg-white text-white dark:text-black font-medium text-sm hover:opacity-90 transition-opacity active:scale-95"
                >
                    Launch App
                </Link>
            </div>
        </header>
    );
}
