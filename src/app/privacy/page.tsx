import type { Metadata } from "next";
import Link from "next/link";
import { BrutalistLayout } from "@/components/brutalist-layout";

export const metadata: Metadata = {
  title: "Privacy Policy | AdsX",
  description: "AdsX Privacy Policy - Learn how we collect, use, and protect your personal information.",
  alternates: {
    canonical: "https://www.adsx.com/privacy",
  },
};

export default function PrivacyPage() {
  return (
    <BrutalistLayout>
      {/* Header */}
      <div className="border-b-2 border-[#EAEAEA] p-8 md:p-16">
        <div
          className="text-xs tracking-widest text-[#888] mb-4"
          style={{ fontFamily: "var(--font-mono)" }}
        >
          <Link href="/" className="hover:text-[#EAEAEA]">HOME</Link>
          <span className="mx-2">/</span>
          <span className="text-[#10b981]">PRIVACY POLICY</span>
        </div>
        <h1
          className="uppercase"
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(32px, 6vw, 72px)",
            lineHeight: 0.9,
            letterSpacing: "-2px",
          }}
        >
          Privacy Policy
        </h1>
        <p className="mt-6 text-[#888]">Last updated: January 27, 2026</p>
      </div>

      {/* Content */}
      <div className="border-b border-[#333]">
        <div className="p-8 md:p-16 max-w-4xl">
          <section className="mb-12">
            <h2
              className="text-xl uppercase mb-4 text-[#10b981]"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Introduction
            </h2>
            <p className="text-[#ccc] leading-relaxed">
              AdsX (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website adsx.com or use our services.
            </p>
          </section>

          <section className="mb-12">
            <h2
              className="text-xl uppercase mb-4 text-[#10b981]"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Information We Collect
            </h2>

            <h3 className="text-lg mb-3 mt-6">Information You Provide</h3>
            <p className="text-[#ccc] leading-relaxed mb-4">
              We collect information you voluntarily provide when you:
            </p>
            <ul className="space-y-2 text-[#888]">
              <li className="flex items-start gap-2">
                <span className="h-1 w-1 bg-[#10b981] mt-2 flex-shrink-0" />
                Fill out our contact form (name, email, company, message)
              </li>
              <li className="flex items-start gap-2">
                <span className="h-1 w-1 bg-[#10b981] mt-2 flex-shrink-0" />
                Subscribe to our newsletter
              </li>
              <li className="flex items-start gap-2">
                <span className="h-1 w-1 bg-[#10b981] mt-2 flex-shrink-0" />
                Request a consultation or audit
              </li>
              <li className="flex items-start gap-2">
                <span className="h-1 w-1 bg-[#10b981] mt-2 flex-shrink-0" />
                Communicate with us via email or phone
              </li>
            </ul>

            <h3 className="text-lg mb-3 mt-6">Automatically Collected Information</h3>
            <p className="text-[#ccc] leading-relaxed mb-4">
              When you visit our website, we may automatically collect:
            </p>
            <ul className="space-y-2 text-[#888]">
              <li className="flex items-start gap-2">
                <span className="h-1 w-1 bg-[#10b981] mt-2 flex-shrink-0" />
                Device information (browser type, operating system)
              </li>
              <li className="flex items-start gap-2">
                <span className="h-1 w-1 bg-[#10b981] mt-2 flex-shrink-0" />
                IP address and approximate location
              </li>
              <li className="flex items-start gap-2">
                <span className="h-1 w-1 bg-[#10b981] mt-2 flex-shrink-0" />
                Pages visited and time spent on site
              </li>
              <li className="flex items-start gap-2">
                <span className="h-1 w-1 bg-[#10b981] mt-2 flex-shrink-0" />
                Referring website or source
              </li>
            </ul>
          </section>

          <section className="mb-12">
            <h2
              className="text-xl uppercase mb-4 text-[#10b981]"
              style={{ fontFamily: "var(--font-display)" }}
            >
              How We Use Your Information
            </h2>
            <p className="text-[#ccc] leading-relaxed mb-4">
              We use the information we collect to:
            </p>
            <ul className="space-y-2 text-[#888]">
              <li className="flex items-start gap-2">
                <span className="h-1 w-1 bg-[#10b981] mt-2 flex-shrink-0" />
                Respond to your inquiries and provide customer support
              </li>
              <li className="flex items-start gap-2">
                <span className="h-1 w-1 bg-[#10b981] mt-2 flex-shrink-0" />
                Send you marketing communications (with your consent)
              </li>
              <li className="flex items-start gap-2">
                <span className="h-1 w-1 bg-[#10b981] mt-2 flex-shrink-0" />
                Improve our website and services
              </li>
              <li className="flex items-start gap-2">
                <span className="h-1 w-1 bg-[#10b981] mt-2 flex-shrink-0" />
                Analyze website usage and trends
              </li>
              <li className="flex items-start gap-2">
                <span className="h-1 w-1 bg-[#10b981] mt-2 flex-shrink-0" />
                Comply with legal obligations
              </li>
            </ul>
          </section>

          <section className="mb-12">
            <h2
              className="text-xl uppercase mb-4 text-[#10b981]"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Information Sharing
            </h2>
            <p className="text-[#ccc] leading-relaxed mb-4">
              We do not sell your personal information. We may share your information with:
            </p>
            <ul className="space-y-2 text-[#888]">
              <li className="flex items-start gap-2">
                <span className="h-1 w-1 bg-[#10b981] mt-2 flex-shrink-0" />
                <span><strong className="text-[#EAEAEA]">Service providers:</strong> Companies that help us operate our business (hosting, analytics, email services)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="h-1 w-1 bg-[#10b981] mt-2 flex-shrink-0" />
                <span><strong className="text-[#EAEAEA]">Legal requirements:</strong> When required by law or to protect our rights</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="h-1 w-1 bg-[#10b981] mt-2 flex-shrink-0" />
                <span><strong className="text-[#EAEAEA]">Business transfers:</strong> In connection with a merger, acquisition, or sale of assets</span>
              </li>
            </ul>
          </section>

          <section className="mb-12">
            <h2
              className="text-xl uppercase mb-4 text-[#10b981]"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Cookies and Tracking
            </h2>
            <p className="text-[#ccc] leading-relaxed">
              We use cookies and similar technologies to enhance your experience. You can control cookies through your browser settings. Disabling cookies may affect some website functionality.
            </p>
          </section>

          <section className="mb-12">
            <h2
              className="text-xl uppercase mb-4 text-[#10b981]"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Data Security
            </h2>
            <p className="text-[#ccc] leading-relaxed">
              We implement appropriate technical and organizational measures to protect your personal information. However, no method of transmission over the internet is 100% secure.
            </p>
          </section>

          <section className="mb-12">
            <h2
              className="text-xl uppercase mb-4 text-[#10b981]"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Your Rights
            </h2>
            <p className="text-[#ccc] leading-relaxed mb-4">
              Depending on your location, you may have the right to:
            </p>
            <ul className="space-y-2 text-[#888]">
              <li className="flex items-start gap-2">
                <span className="h-1 w-1 bg-[#10b981] mt-2 flex-shrink-0" />
                Access the personal information we hold about you
              </li>
              <li className="flex items-start gap-2">
                <span className="h-1 w-1 bg-[#10b981] mt-2 flex-shrink-0" />
                Request correction of inaccurate information
              </li>
              <li className="flex items-start gap-2">
                <span className="h-1 w-1 bg-[#10b981] mt-2 flex-shrink-0" />
                Request deletion of your information
              </li>
              <li className="flex items-start gap-2">
                <span className="h-1 w-1 bg-[#10b981] mt-2 flex-shrink-0" />
                Opt out of marketing communications
              </li>
              <li className="flex items-start gap-2">
                <span className="h-1 w-1 bg-[#10b981] mt-2 flex-shrink-0" />
                Object to certain processing activities
              </li>
            </ul>
          </section>

          <section className="mb-12">
            <h2
              className="text-xl uppercase mb-4 text-[#10b981]"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Third-Party Links
            </h2>
            <p className="text-[#ccc] leading-relaxed">
              Our website may contain links to third-party websites. We are not responsible for the privacy practices of these external sites.
            </p>
          </section>

          <section className="mb-12">
            <h2
              className="text-xl uppercase mb-4 text-[#10b981]"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Children&apos;s Privacy
            </h2>
            <p className="text-[#ccc] leading-relaxed">
              Our services are not directed to individuals under 18. We do not knowingly collect personal information from children.
            </p>
          </section>

          <section className="mb-12">
            <h2
              className="text-xl uppercase mb-4 text-[#10b981]"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Changes to This Policy
            </h2>
            <p className="text-[#ccc] leading-relaxed">
              We may update this Privacy Policy from time to time. We will notify you of any material changes by posting the new policy on this page.
            </p>
          </section>

          <section>
            <h2
              className="text-xl uppercase mb-4 text-[#10b981]"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Contact Us
            </h2>
            <p className="text-[#ccc] leading-relaxed mb-4">
              If you have questions about this Privacy Policy, please contact us at:
            </p>
            <ul className="space-y-2 text-[#888]">
              <li className="flex items-start gap-2">
                <span className="h-1 w-1 bg-[#10b981] mt-2 flex-shrink-0" />
                Email: privacy@adsx.com
              </li>
              <li className="flex items-start gap-2">
                <span className="h-1 w-1 bg-[#10b981] mt-2 flex-shrink-0" />
                Website: <Link href="/contact" className="text-[#10b981] hover:underline">adsx.com/contact</Link>
              </li>
            </ul>
          </section>
        </div>
      </div>

      {/* CTA */}
      <div className="p-8 md:p-16 text-center bg-[#0c0c0c]">
        <h2
          className="text-2xl md:text-3xl uppercase mb-4"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Questions?
        </h2>
        <p className="text-[#888] mb-8 max-w-lg mx-auto">
          If you have any questions about our privacy practices, we&apos;re here to help.
        </p>
        <Link href="/contact" className="cta-btn cta-btn-primary">
          Contact Us
        </Link>
      </div>
    </BrutalistLayout>
  );
}
