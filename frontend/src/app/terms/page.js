import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

export default function TermsOfService() {
    return (
        <div className="flex min-h-screen w-full flex-col bg-white dark:bg-black font-sans text-stone-900 dark:text-stone-100 selection:bg-stone-200 dark:selection:bg-stone-800">
            <Header />

            <main className="flex-1 w-full max-w-4xl mx-auto px-6 sm:px-8 py-12 sm:py-24">
                <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-8">Terms of Service</h1>

                <div className="prose dark:prose-invert max-w-none space-y-8 text-stone-600 dark:text-stone-300 leading-relaxed">
                    <p className="text-lg">
                        Last updated: February 15, 2026
                    </p>

                    <section>
                        <h2 className="text-2xl font-semibold text-stone-900 dark:text-white mb-4">1. Acceptance of Terms</h2>
                        <p>
                            By accessing and using ResearchAgent ("we," "our," or "us"), you agree to be bound by these Terms of Service ("Terms"). If you do not agree to these Terms, please do not use our services.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-stone-900 dark:text-white mb-4">2. Description of Service</h2>
                        <p>
                            ResearchAgent provides AI-powered research assistant tools to help users gather, analyze, and synthesize information on various topics. Our services are provided "as is" and "as available."
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-stone-900 dark:text-white mb-4">3. User Accounts</h2>
                        <p className="mb-4">
                            To access certain features of our services, you may be required to create an account. You agree to:
                        </p>
                        <ul className="list-disc pl-6 space-y-2">
                            <li>Provide accurate, current, and complete information during the registration process.</li>
                            <li>Maintain the security of your password and accept all risks of unauthorized access to your account.</li>
                            <li>Notify us immediately if you discover or suspect any security breaches related to our services.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-stone-900 dark:text-white mb-4">4. Acceptable Use</h2>
                        <p className="mb-4">
                            You agree not to use our services for any unlawful or prohibited purpose. You may not:
                        </p>
                        <ul className="list-disc pl-6 space-y-2">
                            <li>Use the service to generate harmful, misleading, or illegal content.</li>
                            <li>Attempt to gain unauthorized access to any portion of our services or any other systems or networks connected to our services.</li>
                            <li>Interfere with or disrupt the integrity or performance of our services.</li>
                            <li>Use any robot, spider, or other automated means to access our services for any purpose without our express written permission.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-stone-900 dark:text-white mb-4">5. Intellectual Property</h2>
                        <p>
                            The content, features, and functionality of ResearchAgent, including but not limited to text, graphics, logos, and software, are and will remain the exclusive property of ResearchAgent and its licensors. Our trademarks and trade dress may not be used in connection with any product or service without the prior written consent of ResearchAgent.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-stone-900 dark:text-white mb-4">6. Limitation of Liability</h2>
                        <p>
                            In no event shall ResearchAgent, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from yours access to or use of or inability to access or use the service.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-stone-900 dark:text-white mb-4">7. Governing Law</h2>
                        <p>
                            These Terms shall be governed and construed in accordance with the laws of [Your Country/State], without regard to its conflict of law provisions.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-stone-900 dark:text-white mb-4">8. Changes to Terms</h2>
                        <p>
                            We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material we will try to provide at least 30 days notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-stone-900 dark:text-white mb-4">9. Contact Us</h2>
                        <p>
                            If you have any questions about these Terms, please contact us at <a href="mailto:swayam.satpathy24@gmail.com" className="text-blue-600 dark:text-blue-400 hover:underline">swayam.satpathy24@gmail.com</a>.
                        </p>
                    </section>
                </div>
            </main>

            <Footer />
        </div>
    );
}
