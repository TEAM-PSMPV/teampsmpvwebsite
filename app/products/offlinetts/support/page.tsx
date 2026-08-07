import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "OfflineTTS Support",
  description: "Official support and troubleshooting information for OfflineTTS.",
  alternates: { canonical: "/products/offlinetts/support" },
};

export default function SupportPage() {
  return (
    <main id="main-content">
      <section className="legal-hero content">
        <p className="mono-label">/SUPPORT</p>
        <h1>OFFLINETTS SUPPORT</h1>
        <p className="page-lead">
          Use this page for Google Play support details, user questions, privacy policy
          access and troubleshooting information.
        </p>
      </section>
      <div className="content support-grid">
        <section className="technical-card support-card">
          <p className="mono-label">/CONTACT SUPPORT</p>
          <h2>Email is the official support channel for app-store review and user support.</h2>
          <div className="button-row">
            <a className="cut-button" href="mailto:support@teampsmpv.com?subject=OfflineTTS%20Support">Email support ↗</a>
            <a className="cut-button secondary" href="https://wa.me/918218501002">WhatsApp ↗</a>
          </div>
          <dl className="definition-list">
            <div><dt>Email</dt><dd><a href="mailto:support@teampsmpv.com">support@teampsmpv.com</a></dd></div>
            <div><dt>Phone / WhatsApp</dt><dd><a href="tel:+918218501002">+91 8218501002</a></dd></div>
          </dl>
        </section>
        <section className="technical-card support-card">
          <p className="mono-label">/QUICK HELP</p>
          <ul className="technical-list feature-list">
            <li>Install or update the app from Google Play when available.</li>
            <li>Download or install the required voice model before offline conversion.</li>
            <li>Keep enough free storage for generated audio files.</li>
            <li>If conversion fails, restart the app and try a shorter test script first.</li>
          </ul>
        </section>
        <section className="technical-card support-card full-span">
          <p className="mono-label">/PRIVACY AND DATA</p>
          <h2>Local processing by design.</h2>
          <p>
            OfflineTTS processes user-entered text locally as described in the privacy
            policy. Generated audio is saved locally and is not uploaded to team-psmpv.
          </p>
          <Link className="text-link" href="/products/offlinetts/privacy-policy">Read privacy policy ↗</Link>
        </section>
      </div>
    </main>
  );
}
