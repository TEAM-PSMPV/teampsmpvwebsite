import type { Metadata } from "next";
import Link from "next/link";
import { BulletList, NumberedList, VisynLegalHero, visynDetails } from "../content";

export const metadata: Metadata = {
  title: "Visyn Support",
  description: "Support, connection troubleshooting, security reporting, and data request information for Visyn.",
  alternates: { canonical: "/products/visyn/support" },
};

export default function VisynSupportPage() {
  return (
    <main id="main-content">
      <VisynLegalHero label="VISYN / SUPPORT" title="VISYN SUPPORT" lead="Contact support, troubleshoot WhatsApp connections, report security issues, and submit privacy requests." />
      <div className="content support-grid">
        <section className="technical-card support-card"><p className="mono-label">/CONTACT SUPPORT</p><h2>Help with Visyn, workspace operations, and connected messaging.</h2><div className="button-row"><a className="cut-button" href={`mailto:${visynDetails.email}?subject=Visyn%20Support`}>Email support ↗</a><a className="cut-button secondary" href="tel:+918218501002">Call support ↗</a></div><dl className="definition-list"><div><dt>Email</dt><dd><a href={`mailto:${visynDetails.email}`}>{visynDetails.email}</a></dd></div><div><dt>Support portal</dt><dd><Link href={visynDetails.supportUrl}>Visyn support</Link></dd></div><div><dt>Hours</dt><dd>{visynDetails.supportHours}</dd></div></dl></section>
        <section className="technical-card support-card"><p className="mono-label">/SECURITY</p><h2>Report suspected security vulnerabilities privately.</h2><p>Report suspected security vulnerabilities to <a href={`mailto:${visynDetails.email}?subject=Visyn%20Security%20Report`}>{visynDetails.email}</a>. Please do not publicly disclose a vulnerability before we have had a reasonable opportunity to investigate and fix it.</p></section>
        <section className="technical-card support-card"><p className="mono-label">/CONTACT CHECKLIST</p><h2>Include useful context. Keep secrets out.</h2><p>When contacting support, include:</p><BulletList items={["Your name and business name.", "Visyn workspace name.", "Approximate time of the issue.", "The page or feature affected.", "The error message or request ID.", "Screenshots without customer message content or secrets."]} /><p><strong>Never send us:</strong></p><BulletList items={["Meta App Secrets.", "WhatsApp access tokens.", "Cloudflare API tokens.", "Passwords.", "OTPs.", "Full customer message exports unless specifically requested through an approved secure process."]} /></section>
        <section className="technical-card support-card"><p className="mono-label">/WHATSAPP CONNECTION</p><h2>Connection troubleshooting</h2><p>If your WhatsApp connection is not working, check:</p><NumberedList items={["The Meta Business Portfolio is verified.", "You are an administrator of the Business Portfolio and WABA.", "The phone number is eligible for the selected onboarding path.", "The Embedded Signup configuration belongs to the VISYN app.", "The webhook URL and verify token are correct.", "The phone number has not been migrated or disconnected from another provider.", "The Meta app is not restricted or suspended."]} /></section>
        <section className="technical-card support-card full-span"><p className="mono-label">/DATA REQUESTS</p><h2>Privacy, access, correction, deletion, and export requests.</h2><p>For data requests, contact <a href={`mailto:${visynDetails.email}`}>{visynDetails.email}</a>. We may verify your identity and your authority to request information.</p><div className="button-row"><Link className="cut-button" href="/products/visyn/data-deletion">Request data deletion ↗</Link><Link className="cut-button secondary" href="/products/visyn/privacy-policy">Read privacy policy</Link></div></section>
      </div>
    </main>
  );
}
