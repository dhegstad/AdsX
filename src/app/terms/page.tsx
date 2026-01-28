"use client";

import Link from "next/link";
import { Header } from "@/components/marketing/header";
import { Footer } from "@/components/marketing/footer";
import { useTheme } from "@/context/theme-context";
import { cn } from "@/lib/utils";

export default function TermsPage() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <div className={cn(
      "min-h-screen transition-colors duration-300",
      isDark ? "bg-black text-white" : "bg-white text-neutral-900"
    )}>
      <Header />

      <main className="relative pt-32 pb-24">
        <div className="absolute inset-0 dot-pattern opacity-20" />
        <div className="relative mx-auto max-w-3xl px-6 lg:px-8">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Terms of Service
          </h1>
          <p className={cn(
            "mt-4",
            isDark ? "text-white/60" : "text-neutral-600"
          )}>Last updated: January 27, 2026</p>

          <div className={cn(
            "mt-12 prose max-w-none",
            isDark
              ? "prose-invert prose-emerald prose-headings:text-white prose-p:text-white/70 prose-li:text-white/70 prose-strong:text-white prose-a:text-emerald-400"
              : "prose-neutral prose-headings:text-neutral-900 prose-p:text-neutral-600 prose-li:text-neutral-600 prose-strong:text-neutral-900 prose-a:text-emerald-600"
          )}>
            <h2>Agreement to Terms</h2>
            <p>
              By accessing or using the AdsX website (adsx.com) and services, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.
            </p>

            <h2>Description of Services</h2>
            <p>
              AdsX provides AI search advertising services, including but not limited to:
            </p>
            <ul>
              <li>AI visibility audits and analysis</li>
              <li>ChatGPT and AI platform advertising strategy</li>
              <li>Content optimization for AI search</li>
              <li>AI advertising campaign management</li>
              <li>Performance reporting and analytics</li>
            </ul>

            <h2>Use of Services</h2>
            <h3>Eligibility</h3>
            <p>
              You must be at least 18 years old and have the authority to enter into these terms on behalf of yourself or your organization.
            </p>

            <h3>Acceptable Use</h3>
            <p>You agree not to:</p>
            <ul>
              <li>Use our services for any unlawful purpose</li>
              <li>Attempt to gain unauthorized access to our systems</li>
              <li>Interfere with or disrupt the integrity of our services</li>
              <li>Transmit any malware, viruses, or harmful code</li>
              <li>Violate any applicable laws or regulations</li>
              <li>Infringe on the intellectual property rights of others</li>
            </ul>

            <h2>Intellectual Property</h2>
            <p>
              All content on the AdsX website, including text, graphics, logos, and software, is the property of AdsX or its content suppliers and is protected by intellectual property laws.
            </p>
            <p>
              You may not reproduce, distribute, modify, or create derivative works of our content without prior written consent.
            </p>

            <h2>Client Engagements</h2>
            <p>
              Specific services and deliverables will be outlined in separate service agreements or statements of work. These Terms of Service govern your general use of our website and initial inquiries.
            </p>

            <h2>Payment Terms</h2>
            <p>
              Payment terms for services will be specified in individual service agreements. Generally:
            </p>
            <ul>
              <li>Fees are due as specified in the service agreement</li>
              <li>Late payments may incur additional charges</li>
              <li>All fees are non-refundable unless otherwise stated</li>
            </ul>

            <h2>Disclaimers</h2>
            <h3>No Guarantee of Results</h3>
            <p>
              While we strive to deliver excellent results, we cannot guarantee specific outcomes. AI platform algorithms and policies are outside our control and subject to change.
            </p>

            <h3>Third-Party Platforms</h3>
            <p>
              Our services involve advertising on third-party AI platforms (ChatGPT, Perplexity, etc.). We are not responsible for changes to these platforms' policies, availability, or performance.
            </p>

            <h3>As-Is Basis</h3>
            <p>
              Our website and services are provided "as is" without warranties of any kind, either express or implied, including but not limited to warranties of merchantability, fitness for a particular purpose, or non-infringement.
            </p>

            <h2>Limitation of Liability</h2>
            <p>
              To the maximum extent permitted by law, AdsX shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including loss of profits, data, or goodwill, arising from your use of our services.
            </p>
            <p>
              Our total liability for any claim arising from these terms shall not exceed the fees paid by you to AdsX in the twelve months preceding the claim.
            </p>

            <h2>Indemnification</h2>
            <p>
              You agree to indemnify and hold harmless AdsX, its officers, directors, employees, and agents from any claims, damages, losses, or expenses arising from your violation of these terms or your use of our services.
            </p>

            <h2>Termination</h2>
            <p>
              We may terminate or suspend your access to our services at any time, without prior notice, for conduct that we believe violates these terms or is harmful to other users, us, or third parties.
            </p>

            <h2>Governing Law</h2>
            <p>
              These terms shall be governed by and construed in accordance with the laws of the State of Delaware, without regard to its conflict of law provisions.
            </p>

            <h2>Changes to Terms</h2>
            <p>
              We reserve the right to modify these terms at any time. We will notify you of any material changes by posting the new terms on this page. Your continued use of our services after such changes constitutes acceptance of the new terms.
            </p>

            <h2>Contact Information</h2>
            <p>
              If you have questions about these Terms of Service, please contact us:
            </p>
            <ul>
              <li>Email: legal@adsx.com</li>
              <li>Website: <Link href="/contact">adsx.com/contact</Link></li>
            </ul>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
