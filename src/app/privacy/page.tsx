import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/marketing/header";
import { Footer } from "@/components/marketing/footer";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "AdsX Privacy Policy - How we collect, use, and protect your personal information.",
  alternates: {
    canonical: "https://adsx.com/privacy",
  },
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Header />

      <main className="relative pt-32 pb-24">
        <div className="absolute inset-0 dot-pattern opacity-20" />
        <div className="relative mx-auto max-w-3xl px-6 lg:px-8">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Privacy Policy
          </h1>
          <p className="mt-4 text-white/60">Last updated: January 27, 2026</p>

          <div className="mt-12 prose prose-invert prose-emerald max-w-none prose-headings:font-bold prose-headings:tracking-tight prose-a:text-emerald-400">
            <h2>Introduction</h2>
            <p>
              AdsX ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website adsx.com or use our services.
            </p>

            <h2>Information We Collect</h2>
            <h3>Information You Provide</h3>
            <p>We collect information you voluntarily provide when you:</p>
            <ul>
              <li>Fill out our contact form (name, email, company, message)</li>
              <li>Subscribe to our newsletter</li>
              <li>Request a consultation or audit</li>
              <li>Communicate with us via email or phone</li>
            </ul>

            <h3>Automatically Collected Information</h3>
            <p>When you visit our website, we may automatically collect:</p>
            <ul>
              <li>Device information (browser type, operating system)</li>
              <li>IP address and approximate location</li>
              <li>Pages visited and time spent on site</li>
              <li>Referring website or source</li>
            </ul>

            <h2>How We Use Your Information</h2>
            <p>We use the information we collect to:</p>
            <ul>
              <li>Respond to your inquiries and provide customer support</li>
              <li>Send you marketing communications (with your consent)</li>
              <li>Improve our website and services</li>
              <li>Analyze website usage and trends</li>
              <li>Comply with legal obligations</li>
            </ul>

            <h2>Information Sharing</h2>
            <p>We do not sell your personal information. We may share your information with:</p>
            <ul>
              <li><strong>Service providers:</strong> Companies that help us operate our business (hosting, analytics, email services)</li>
              <li><strong>Legal requirements:</strong> When required by law or to protect our rights</li>
              <li><strong>Business transfers:</strong> In connection with a merger, acquisition, or sale of assets</li>
            </ul>

            <h2>Cookies and Tracking</h2>
            <p>
              We use cookies and similar technologies to enhance your experience. You can control cookies through your browser settings. Disabling cookies may affect some website functionality.
            </p>

            <h2>Data Security</h2>
            <p>
              We implement appropriate technical and organizational measures to protect your personal information. However, no method of transmission over the internet is 100% secure.
            </p>

            <h2>Your Rights</h2>
            <p>Depending on your location, you may have the right to:</p>
            <ul>
              <li>Access the personal information we hold about you</li>
              <li>Request correction of inaccurate information</li>
              <li>Request deletion of your information</li>
              <li>Opt out of marketing communications</li>
              <li>Object to certain processing activities</li>
            </ul>

            <h2>Third-Party Links</h2>
            <p>
              Our website may contain links to third-party websites. We are not responsible for the privacy practices of these external sites.
            </p>

            <h2>Children's Privacy</h2>
            <p>
              Our services are not directed to individuals under 18. We do not knowingly collect personal information from children.
            </p>

            <h2>Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. We will notify you of any material changes by posting the new policy on this page.
            </p>

            <h2>Contact Us</h2>
            <p>
              If you have questions about this Privacy Policy, please contact us at:
            </p>
            <ul>
              <li>Email: privacy@adsx.com</li>
              <li>Website: <Link href="/contact">adsx.com/contact</Link></li>
            </ul>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
