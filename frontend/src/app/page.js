'use client';

import Link from 'next/link';
import { ThemeToggle } from '@/components/ThemeToggle';
import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { ArrowRight, Sparkles, Brain, Zap, Globe, Share2, PlayCircle, Search, Terminal, FileText, AlertCircle, User, Send, Home } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="flex min-h-screen w-full flex-col bg-white dark:bg-black font-sans text-stone-900 dark:text-stone-100 overflow-x-hidden selection:bg-stone-200 dark:selection:bg-stone-800">


      {/* Navigation */}
      <Header />

      <main className="flex-1 w-full max-w-7xl mx-auto px-6 sm:px-8 flex flex-col">

        {/* Hero Section */}
        <section className="flex-1 flex flex-col items-center justify-center text-center py-24 sm:py-32 space-y-8 animate-in fade-in zoom-in duration-700 slide-in-from-bottom-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-stone-100 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-xs font-semibold uppercase tracking-widest text-stone-500 dark:text-stone-400">
            <Sparkles size={12} className="text-amber-500" />
            <span>v1.0 Now Available</span>
          </div>

          <h1 className="text-5xl sm:text-7xl md:text-8xl font-black tracking-tighter text-stone-900 dark:text-white max-w-4xl mx-auto leading-[0.9]">
            Deep research <br className="hidden sm:block" />
            <span className="text-stone-400 dark:text-stone-600">made autonomous.</span>
          </h1>

          <p className="text-lg sm:text-xl text-stone-600 dark:text-stone-400 max-w-2xl mx-auto leading-relaxed">
            Deploy a squad of AI agents to research any topic, analyze documents, and generate comprehensive reports in minutes, not hours.
          </p>

          <div className="flex flex-col items-center gap-4 pt-4">
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <Link
                href="/research"
                className="flex items-center gap-3 px-8 py-4 rounded-full bg-stone-900 dark:bg-white text-white dark:text-black font-semibold text-lg hover:opacity-90 transition-all hover:scale-105 active:scale-95 shadow-xl shadow-stone-200/50 dark:shadow-none"
              >
                Start Researching <ArrowRight size={20} />
              </Link>
              <Link
                href="https://github.com/SwayamSat/A-Multi-Agent-Research-Assistant-Using-AutoGen"
                target="_blank"
                className="flex items-center gap-3 px-8 py-4 rounded-full bg-white dark:bg-black border border-stone-200 dark:border-stone-800 text-stone-900 dark:text-white font-medium text-lg hover:bg-stone-50 dark:hover:bg-stone-900 transition-all active:scale-95"
              >
                View on GitHub
              </Link>
            </div>
            <Link
              href="/how-it-works"
              className="flex items-center gap-3 px-8 py-4 rounded-full bg-white dark:bg-black border border-stone-200 dark:border-stone-800 text-stone-900 dark:text-white font-medium text-lg hover:bg-stone-50 dark:hover:bg-stone-900 transition-all active:scale-95"
            >
              <PlayCircle size={20} />
              How it works
            </Link>
          </div>

          {/* Abstract UI Visual */}
          <div className="w-full max-w-5xl mt-16 sm:mt-24 relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-amber-500 to-stone-500 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
            <div className="relative aspect-[16/9] sm:aspect-[2/1] bg-stone-50 dark:bg-stone-900 rounded-xl border border-stone-200 dark:border-stone-800 overflow-hidden flex flex-col shadow-2xl">

              {/* App Header */}
              <div className="h-14 border-b border-stone-100 dark:border-stone-900 flex items-center px-4 sm:px-6 bg-white/80 dark:bg-black/80 backdrop-blur-md sticky top-0 z-20">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 flex items-center justify-center text-stone-900 dark:text-white">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="w-6 h-6"
                    >
                      <circle cx="12" cy="12" r="10" />
                      <path d="M12 16v-4" />
                      <path d="M12 8h.01" />
                    </svg>
                  </div>
                  <h1 className="font-medium text-lg tracking-tight text-stone-900 dark:text-white hidden sm:block">
                    ResearchAgent
                  </h1>
                </div>
                <div className="flex items-center gap-4 ml-auto">
                  <div className="flex items-center gap-2 text-stone-500 dark:text-stone-400">
                    <Home size={18} />
                    <span className="hidden sm:inline text-sm font-medium">Home</span>
                  </div>
                </div>
              </div>

              {/* Main Content Area (Chat Interface Simulation) */}
              <div className="flex-1 flex flex-col bg-white dark:bg-black relative overflow-hidden">
                {/* Messages Area */}
                <div className="flex-1 overflow-y-auto p-4 sm:p-8 space-y-6 scroll-smooth pb-32">

                  {/* User Message */}
                  <div className="flex w-full justify-end group">
                    <div className="flex max-w-[90%] sm:max-w-[75%] flex-row-reverse items-start gap-4">
                      <div className="flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center bg-stone-900 dark:bg-stone-100 text-white dark:text-black">
                        <User size={16} />
                      </div>
                      <div className="p-4 sm:p-6 shadow-sm bg-stone-900 text-stone-50 dark:bg-stone-100 dark:text-stone-900 rounded-2xl rounded-tr-sm">
                        <div className="text-sm sm:text-base leading-relaxed">
                          Analyze the impact of Generative AI on software engineering jobs in the next 5 years.
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Agent Message 1 (Coordinator) */}
                  <div className="flex w-full justify-start group">
                    <div className="flex max-w-[90%] sm:max-w-[75%] flex-row items-start gap-4">
                      <div className="flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center bg-stone-100 dark:bg-stone-900/50 text-stone-600 dark:text-stone-400">
                        <Brain size={16} />
                      </div>
                      <div className="p-4 sm:p-6 shadow-sm border border-stone-100 dark:border-stone-800 rounded-2xl rounded-tl-sm bg-white dark:bg-stone-900">
                        <div className="text-[10px] font-semibold uppercase tracking-widest mb-2 text-stone-400 dark:text-stone-500 flex items-center gap-1">
                          Supervisor
                        </div>
                        <div className="text-sm sm:text-base leading-relaxed text-stone-700 dark:text-stone-300">
                          I have initiated the research process. I'll break this down into:
                          <ul className="list-disc pl-4 mt-2 mb-2 space-y-1">
                            <li>Automation of coding tasks (Copilot, etc.)</li>
                            <li>Evolution of developer roles (from coder to architect)</li>
                            <li>Economic impact and labor market shifts</li>
                          </ul>
                          Assigning <span className="font-semibold text-amber-600 dark:text-amber-500">Paper Discoverer</span> to find recent studies...
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Agent Message 2 (Researcher) */}
                  <div className="flex w-full justify-start group">
                    <div className="flex max-w-[90%] sm:max-w-[75%] flex-row items-start gap-4">
                      <div className="flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center bg-stone-100 dark:bg-stone-900/50 text-stone-600 dark:text-stone-400">
                        <Search size={16} />
                      </div>
                      <div className="p-4 sm:p-6 shadow-sm border border-stone-100 dark:border-stone-800 rounded-2xl rounded-tl-sm bg-white dark:bg-stone-900">
                        <div className="text-[10px] font-semibold uppercase tracking-widest mb-2 text-stone-400 dark:text-stone-500 flex items-center gap-1">
                          Paper Discoverer
                        </div>
                        <div className="text-sm sm:text-base leading-relaxed text-stone-700 dark:text-stone-300">
                          Searching arXiv and IEEE Xplore for "Generative AI software engineering impact"...
                          <br />
                          <span className="text-xs text-stone-400 mt-2 block">Found 24 relevant papers. Initializing filtered download...</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Thinking Indicator */}
                  <div className="flex w-full flex-col justify-start pl-12 gap-2">
                    <div className="flex items-center gap-4 py-2 px-4 rounded-full bg-stone-50 dark:bg-stone-900/50 border border-stone-100 dark:border-stone-800 w-fit">
                      <div className="w-2 h-2 rounded-full bg-stone-400 animate-bounce delay-0" />
                      <div className="w-2 h-2 rounded-full bg-stone-400 animate-bounce delay-150" />
                      <div className="w-2 h-2 rounded-full bg-stone-400 animate-bounce delay-300" />
                      <span className="text-xs font-medium text-stone-400 uppercase tracking-widest ml-2">
                        Insight Synthesizer Thinking...
                      </span>
                    </div>
                  </div>

                </div>

                {/* Simulated Input Area */}
                <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 bg-gradient-to-t from-white via-white to-transparent dark:from-black dark:via-black dark:to-transparent pt-20">
                  <div className="max-w-3xl mx-auto relative flex items-center gap-3">
                    <div className="flex-1 relative">
                      <div className="w-full pl-6 pr-14 py-4 rounded-2xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900/80 backdrop-blur-sm text-stone-400 dark:text-stone-500 shadow-xl shadow-stone-200/50 dark:shadow-none text-base">
                        Type a research topic...
                      </div>
                      <div className="absolute right-2 top-2 bottom-2 p-2 bg-stone-200 dark:bg-stone-800 text-stone-400 dark:text-stone-600 rounded-xl flex items-center justify-center aspect-square">
                        <Send size={18} />
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section id="features" className="py-24 border-t border-stone-100 dark:border-stone-900">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard
              icon={<Brain size={24} />}
              title="Autonomous Agents"
              description="Specialized agents collaborate to find, read, and synthesize information autonomously."
            />
            <FeatureCard
              icon={<Globe size={24} />}
              title="Deep Web Search"
              description="Scours the internet for the latest and most relevant papers, articles, and documentation."
            />
            <FeatureCard
              icon={<Share2 size={24} />}
              title="Structured Reports"
              description="Synthesizes findings into comprehensive, readable markdown reports ready for use."
            />
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}

function FeatureCard({ icon, title, description }) {
  return (
    <div className="p-8 rounded-3xl bg-stone-50 dark:bg-stone-900/30 border border-stone-100 dark:border-stone-800/50 hover:border-stone-200 dark:hover:border-stone-700 transition-colors group">
      <div className="w-12 h-12 rounded-2xl bg-white dark:bg-stone-800 flex items-center justify-center text-stone-900 dark:text-white mb-6 shadow-sm border border-stone-100 dark:border-stone-700 group-hover:scale-110 transition-transform duration-300">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-stone-900 dark:text-white mb-3">{title}</h3>
      <p className="text-stone-500 dark:text-stone-400 leading-relaxed">
        {description}
      </p>
    </div>
  );
}
