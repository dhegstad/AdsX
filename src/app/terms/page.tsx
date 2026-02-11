import type { Metadata } from "next";
import Link from "next/link";
import { BrutalistLayout } from "@/components/brutalist-layout";

export const metadata: Metadata = {
  title: "Terms of Service | AdsX",
  description: "AdsX Terms of Service - Read our terms and conditions for using our AI search advertising services.",
  alternates: {
    canonical: "https://www.adsx.com/terms",
  },
};

export default function TermsPage() {
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
          <span className="text-[#10b981]">TERMS OF SERVICE</span>
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
          Terms of Service
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
              Agreement to Terms
            </h2>
            <p className="text-[#ccc] leading-relaxed">
              By accessing or using the AdsX website (adsx.com) and services, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.
            </p>
          </section>

          <section className="mb-12">
            <h2
              className="text-xl uppercase mb-4 text-[#10b981]"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Description of Services
            </h2>
            <p className="text-[#ccc] leading-relaxed mb-4">
              AdsX provides AI search advertising services, including but not limited to:
            </p>
            <ul className="space-y-2 text-[#888]">
              <li className="flex items-start gap-2">
                <span className="h-1 w-1 bg-[#10b981] mt-2 flex-shrink-0" />
                AI visibility audits and analysis
              </li>
              <li className="flex items-start gap-2">
                <span className="h-1 w-1 bg-[#10b981] mt-2 flex-shrink-0" />
                ChatGPT and AI platform advertising strategy
              </li>
              <li className="flex items-start gap-2">
                <span className="h-1 w-1 bg-[#10b981] mt-2 flex-shrink-0" />
                Content optimization for AI search
              </li>
              <li className="flex items-start gap-2">
                <span className="h-1 w-1 bg-[#10b981] mt-2 flex-shrink-0" />
                AI advertising campaign management
              </li>
              <li className="flex items-start gap-2">
                <span className="h-1 w-1 bg-[#10b981] mt-2 flex-shrink-0" />
                Performance reporting and analytics
              </li>
            </ul>
          </section>

          <section className="mb-12">
            <h2
              className="text-xl uppercase mb-4 text-[#10b981]"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Use of Services
            </h2>

            <h3 className="text-lg mb-3 mt-6">Eligibility</h3>
            <p className="text-[#ccc] leading-relaxed">
              You must be at least 18 years old and have the authority to enter into these terms on behalf of yourself or your organization.
            </p>

            <h3 className="text-lg mb-3 mt-6">Acceptable Use</h3>
            <p className="text-[#ccc] leading-relaxed mb-4">
              You agree not to:
            </p>
            <ul className="space-y-2 text-[#888]">
              <li className="flex items-start gap-2">
                <span className="h-1 w-1 bg-[#10b981] mt-2 flex-shrink-0" />
                Use our services for any unlawful purpose
              </li>
              <li className="flex items-start gap-2">
                <span className="h-1 w-1 bg-[#10b981] mt-2 flex-shrink-0" />
                Attempt to gain unauthorized access to our systems
              </li>
              <li className="flex items-start gap-2">
                <span className="h-1 w-1 bg-[#10b981] mt-2 flex-shrink-0" />
                Interfere with or disrupt the integrity of our services
              </li>
              <li className="flex items-start gap-2">
                <span className="h-1 w-1 bg-[#10b981] mt-2 flex-shrink-0" />
                Transmit any malware, viruses, or harmful code
              </li>
              <li className="flex items-start gap-2">
                <span className="h-1 w-1 bg-[#10b981] mt-2 flex-shrink-0" />
                Violate any applicable laws or regulations
              </li>
              <li className="flex items-start gap-2">
                <span className="h-1 w-1 bg-[#10b981] mt-2 flex-shrink-0" />
                Infringe on the intellectual property rights of others
              </li>
            </ul>
          </section>

          <section className="mb-12">
            <h2
              className="text-xl uppercase mb-4 text-[#10b981]"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Intellectual Property
            </h2>
            <p className="text-[#ccc] leading-relaxed mb-4">
              All content on the AdsX website, including text, graphics, logos, and software, is the property of AdsX or its content suppliers and is protected by intellectual property laws.
            </p>
            <p className="text-[#ccc] leading-relaxed">
              You may not reproduce, distribute, modify, or create derivative works of our content without prior written consent.
            </p>
          </section>

          <section className="mb-12">
            <h2
              className="text-xl uppercase mb-4 text-[#10b981]"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Client Engagements
            </h2>
            <p className="text-[#ccc] leading-relaxed">
              Specific services and deliverables will be outlined in separate service agreements or statements of work. These Terms of Service govern your general use of our website and initial inquiries.
            </p>
          </section>

          <section className="mb-12">
            <h2
              className="text-xl uppercase mb-4 text-[#10b981]"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Payment Terms
            </h2>
            <p className="text-[#ccc] leading-relaxed mb-4">
              Payment terms for services will be specified in individual service agreements. Generally:
            </p>
            <ul className="space-y-2 text-[#888]">
              <li className="flex items-start gap-2">
                <span className="h-1 w-1 bg-[#10b981] mt-2 flex-shrink-0" />
                Fees are due as specified in the service agreement
              </li>
              <li className="flex items-start gap-2">
                <span className="h-1 w-1 bg-[#10b981] mt-2 flex-shrink-0" />
                Late payments may incur additional charges
              </li>
              <li className="flex items-start gap-2">
                <span className="h-1 w-1 bg-[#10b981] mt-2 flex-shrink-0" />
                All fees are non-refundable unless otherwise stated
              </li>
            </ul>
          </section>

          <section className="mb-12">
            <h2
              className="text-xl uppercase mb-4 text-[#10b981]"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Disclaimers
            </h2>

            <h3 className="text-lg mb-3 mt-6">No Guarantee of Results</h3>
            <p className="text-[#ccc] leading-relaxed">
              While we strive to deliver excellent results, we cannot guarantee specific outcomes. AI platform algorithms and policies are outside our control and subject to change.
            </p>

            <h3 className="text-lg mb-3 mt-6">Third-Party Platforms</h3>
            <p className="text-[#ccc] leading-relaxed">
              Our services involve advertising on third-party AI platforms (ChatGPT, Perplexity, etc.). We are not responsible for changes to these platforms&apos; policies, availability, or performance.
            </p>

            <h3 className="text-lg mb-3 mt-6">As-Is Basis</h3>
            <p className="text-[#ccc] leading-relaxed">
              Our website and services are provided &quot;as is&quot; without warranties of any kind, either express or implied, including but not limited to warranties of merchantability, fitness for a particular purpose, or non-infringement.
            </p>
          </section>

          <section className="mb-12">
            <h2
              className="text-xl uppercase mb-4 text-[#10b981]"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Limitation of Liability
            </h2>
            <p className="text-[#ccc] leading-relaxed mb-4">
              To the maximum extent permitted by law, AdsX shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including loss of profits, data, or goodwill, arising from your use of our services.
            </p>
            <p className="text-[#ccc] leading-relaxed">
              Our total liability for any claim arising from these terms shall not exceed the fees paid by you to AdsX in the twelve months preceding the claim.
            </p>
          </section>

          <section className="mb-12">
            <h2
              className="text-xl uppercase mb-4 text-[#10b981]"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Indemnification
            </h2>
            <p className="text-[#ccc] leading-relaxed">
              You agree to indemnify and hold harmless AdsX, its officers, directors, employees, and agents from any claims, damages, losses, or expenses arising from your violation of these terms or your use of our services.
            </p>
          </section>

          <section className="mb-12">
            <h2
              className="text-xl uppercase mb-4 text-[#10b981]"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Termination
            </h2>
            <p className="text-[#ccc] leading-relaxed">
              We may terminate or suspend your access to our services at any time, without prior notice, for conduct that we believe violates these terms or is harmful to other users, us, or third parties.
            </p>
          </section>

          <section className="mb-12">
            <h2
              className="text-xl uppercase mb-4 text-[#10b981]"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Governing Law
            </h2>
            <p className="text-[#ccc] leading-relaxed">
              These terms shall be governed by and construed in accordance with the laws of the State of Delaware, without regard to its conflict of law provisions.
            </p>
          </section>

          <section className="mb-12">
            <h2
              className="text-xl uppercase mb-4 text-[#10b981]"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Changes to Terms
            </h2>
            <p className="text-[#ccc] leading-relaxed">
              We reserve the right to modify these terms at any time. We will notify you of any material changes by posting the new terms on this page. Your continued use of our services after such changes constitutes acceptance of the new terms.
            </p>
          </section>

          <section>
            <h2
              className="text-xl uppercase mb-4 text-[#10b981]"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Contact Information
            </h2>
            <p className="text-[#ccc] leading-relaxed mb-4">
              If you have questions about these Terms of Service, please contact us:
            </p>
            <ul className="space-y-2 text-[#888]">
              <li className="flex items-start gap-2">
                <span className="h-1 w-1 bg-[#10b981] mt-2 flex-shrink-0" />
                Email: legal@adsx.com
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
          If you have any questions about our terms, we&apos;re here to help.
        </p>
        <Link href="/contact" className="cta-btn cta-btn-primary">
          Contact Us
        </Link>
      </div>
    </BrutalistLayout>
  );
}
