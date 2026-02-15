import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

export default function PrivacyPolicy() {
    return (
        <div className="flex min-h-screen w-full flex-col bg-white dark:bg-black font-sans text-stone-900 dark:text-stone-100 selection:bg-stone-200 dark:selection:bg-stone-800">
            <Header />

            <main className="flex-1 w-full max-w-4xl mx-auto px-6 sm:px-8 py-12 sm:py-24">
                <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-8">Privacy Policy</h1>

                <div className="prose dark:prose-invert max-w-none space-y-8 text-stone-600 dark:text-stone-300 leading-relaxed">
                    <p className="text-lg">
                        Last updated: February 15, 2026
                    </p>

                    <section>
                        <h2 className="text-2xl font-semibold text-stone-900 dark:text-white mb-4">1. Introduction</h2>
                        <p>
                            Welcome to ResearchAgent ("we," "our," or "us"). We are committed to protecting your privacy and ensuring you have a positive experience on our website and in using our multi-agent research tools. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our application.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-stone-900 dark:text-white mb-4">2. Information We Collect</h2>
                        <p className="mb-4">We collect information that you provide directly to us when you:</p>
                        <ul className="list-disc pl-6 space-y-2">
                            <li>Create an account or sign up for our services.</li>
                            <li>Input research queries or topics into our agents.</li>
                            <li>Contact our support team or communicate with us.</li>
                            <li>Participate in surveys or promotions.</li>
                        </ul>
                        <p className="mt-4">
                            The types of information we may collect include your name, email address, usage data, and the content of your research queries.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-stone-900 dark:text-white mb-4">3. How We Use Your Information</h2>
                        <p className="mb-4">We use the information we collect to:</p>
                        <ul className="list-disc pl-6 space-y-2">
                            <li>Provide, maintain, and improve our services.</li>
                            <li>Process your research requests and generate reports.</li>
                            <li>Understand and analyze how you use our services to improve functionality.</li>
                            <li>Communicate with you, including sending updates, security alerts, and support messages.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-stone-900 dark:text-white mb-4">4. Data Security</h2>
                        <p>
                            We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, please be aware that no method of transmission over the internet or method of electronic storage is 100% secure.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-stone-900 dark:text-white mb-4">5. Third-Party Services</h2>
                        <p>
                            Our research agents may interact with third-party APIs and sources to gather information. We are not responsible for the privacy practices or content of these third-party services. We encourage you to review the privacy policies of any third-party sites or services you interact with.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-stone-900 dark:text-white mb-4">6. Changes to This Privacy Policy</h2>
                        <p>
                            We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date using the effective date.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-stone-900 dark:text-white mb-4">7. Contact Us</h2>
                        <p>
                            If you have any questions about this Privacy Policy, please contact us at <a href="mailto:swayam.satpathy24@gmail.com" className="text-blue-600 dark:text-blue-400 hover:underline">swayam.satpathy24@gmail.com</a>.
                        </p>
                    </section>
                </div>
            </main>

            <Footer />
        </div>
    );
}
