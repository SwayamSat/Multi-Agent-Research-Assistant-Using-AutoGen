import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Search, PenTool, FileText, CheckCircle, Brain, Target, RefreshCw } from 'lucide-react';

export default function HowItWorks() {
    return (
        <div className="flex min-h-screen w-full flex-col bg-white dark:bg-black font-sans text-stone-900 dark:text-stone-100 selection:bg-stone-200 dark:selection:bg-stone-800">
            <Header />

            <main className="flex-1 w-full max-w-7xl mx-auto px-6 sm:px-8 py-12 sm:py-24">

                {/* Intro */}
                <section className="text-center max-w-3xl mx-auto mb-20 animate-in fade-in zoom-in duration-500">
                    <h1 className="text-4xl sm:text-6xl font-black tracking-tight mb-6 text-stone-900 dark:text-white">
                        Transforming Research with <br className="hidden sm:block" />
                        <span className="text-amber-600 dark:text-amber-500">Intelligent Agents</span>
                    </h1>
                    <p className="text-lg sm:text-xl text-stone-600 dark:text-stone-400 leading-relaxed">
                        ResearchAgent orchestrates a team of specialized AI agents to autonomously conduct deep research, analyze data, and synthesize comprehensive reports.
                    </p>
                </section>

                {/* Workflow Steps */}
                <section className="space-y-24">

                    <WorkflowStep
                        number="01"
                        title="Topic Analysis & Planning"
                        description="When you submit a research query, our Coordinator Agent analyzes the topic, identifies key areas of investigation, and formulates a strategic research plan."
                        icon={<Target size={32} />}
                        align="left"
                    />

                    <WorkflowStep
                        number="02"
                        title="Autonomous Web Search"
                        description="Specialized Search Agents scour the internet, academic databases, and credible sources to gather relevant information, filtering out noise and verify sources."
                        icon={<Search size={32} />}
                        align="right"
                    />

                    <WorkflowStep
                        number="03"
                        title="Information Extraction & Synthesis"
                        description="The Research Agents read and comprehend the gathered materials, extracting key insights, data points, and context relevant to your original query."
                        icon={<Brain size={32} />}
                        align="left"
                    />

                    <WorkflowStep
                        number="04"
                        title="Writer & Critic Loop"
                        description="A Writer Agent drafts sections of the report while a Critic Agent reviews the content for accuracy, coherence, and flow, ensuring a high-quality output through iterative refinement."
                        icon={<RefreshCw size={32} />}
                        align="right"
                    />

                    <WorkflowStep
                        number="05"
                        title="Final Report Generation"
                        description="The system compiles all findings into a structured, citation-backed markdown report, ready for you to download, share, or publish."
                        icon={<FileText size={32} />}
                        align="left"
                    />

                </section>

                {/* Call to Action */}
                <section className="mt-32 text-center bg-stone-50 dark:bg-stone-900 rounded-3xl p-12 border border-stone-100 dark:border-stone-800">
                    <h2 className="text-3xl font-bold mb-4">Ready to accelerate your research?</h2>
                    <p className="text-stone-600 dark:text-stone-400 mb-8 max-w-xl mx-auto">
                        Experience the power of autonomous multi-agent research today.
                    </p>
                    <a
                        href="/research"
                        className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-stone-900 dark:bg-white text-white dark:text-black font-semibold text-lg hover:opacity-90 transition-all hover:scale-105 active:scale-95 shadow-xl shadow-stone-200/50 dark:shadow-none"
                    >
                        Start Researching <CheckCircle size={20} />
                    </a>
                </section>

            </main>

            <Footer />
        </div>
    );
}

function WorkflowStep({ number, title, description, icon, align }) {
    const isLeft = align === 'left';
    return (
        <div className={`flex flex-col md:flex-row items-center gap-8 md:gap-16 ${isLeft ? '' : 'md:flex-row-reverse'}`}>

            {/* Visual Side */}
            <div className="flex-1 w-full">
                <div className="relative aspect-video rounded-2xl bg-stone-100 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 flex items-center justify-center overflow-hidden group">
                    <div className="absolute inset-0 bg-stone-200/50 dark:bg-stone-800/50 opacity-0 group-hover:opacity-100 transition duration-500"></div>
                    <div className="w-24 h-24 rounded-full bg-white dark:bg-stone-800 flex items-center justify-center text-stone-900 dark:text-white shadow-lg border border-stone-100 dark:border-stone-700 z-10 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-12">
                        {icon}
                    </div>
                </div>
            </div>

            {/* Content Side */}
            <div className="flex-1 text-center md:text-left">
                <div className="inline-block text-5xl font-black text-stone-200 dark:text-stone-800 mb-2">{number}</div>
                <h3 className="text-3xl font-bold text-stone-900 dark:text-white mb-4">{title}</h3>
                <p className="text-lg text-stone-600 dark:text-stone-400 leading-relaxed">
                    {description}
                </p>
            </div>

        </div>
    );
}
