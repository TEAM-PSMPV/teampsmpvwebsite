import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "OfflineTTS Privacy Policy",
  description: "Privacy Policy for OfflineTTS, effective 30 June 2026.",
  alternates: { canonical: "/products/offlinetts/privacy-policy" },
};

const sections = [
  [
    "Information Collection",
    "OfflineTTS does not collect, store, transmit, sell, or share personal information, user-entered text, generated audio, or user files with the developer.",
  ],
  [
    "Text Processing",
    "Text entered by the user is processed locally on the user's device for text-to-speech conversion. The developer does not receive, view, or access the text entered into the app.",
  ],
  [
    "Generated Audio",
    "Generated audio files may be saved locally on the user's device. These files remain under the user's control and are not uploaded to the developer.",
  ],
  [
    "Voice Model Downloads",
    "OfflineTTS may use the internet to download selected voice model packs through Google Play Asset Delivery. These downloads are handled by Google Play. After selected voice models are installed, supported text-to-speech conversion can work offline.",
  ],
  [
    "Permissions",
    "OfflineTTS does not require account login, location access, contacts access, microphone access, camera access, or advertising tracking.",
  ],
  ["Data Sharing", "OfflineTTS does not share user data with third parties."],
  [
    "Children's Privacy",
    "OfflineTTS is not designed to collect personal information from children. The app does not knowingly collect personal information from children.",
  ],
  [
    "Security",
    "Since OfflineTTS does not transmit user text or generated audio to the developer, user content remains on the user's device.",
  ],
  [
    "Changes to This Privacy Policy",
    "This privacy policy may be updated from time to time. Any changes will be posted on this page.",
  ],
];

export default function PrivacyPage() {
  return (
    <main id="main-content">
      <section className="legal-hero content">
        <p className="mono-label">/PRIVACY POLICY</p>
        <h1>PRIVACY POLICY FOR OFFLINETTS</h1>
        <p className="page-lead">Effective date: 2026-06-30. OfflineTTS is developed by team-psmpv.</p>
      </section>
      <article className="content legal-document">
        <p>
          <strong>Effective Date: 2026-06-30</strong>
        </p>
        <p>
          OfflineTTS is developed by team-psmpv. OfflineTTS is an offline text-to-speech
          app that converts user-provided text into speech on the user&apos;s device.
        </p>
        {sections.map(([heading, copy]) => (
          <section key={heading}>
            <h2>{heading}</h2>
            <p>{copy}</p>
          </section>
        ))}
        <section>
          <h2>Contact</h2>
          <p>
            For questions about this privacy policy, contact:{" "}
            <a href="mailto:support@teampsmpv.com">support@teampsmpv.com</a>
          </p>
        </section>
        <div className="legal-actions">
          <Link className="cut-button" href="/products/offlinetts/support">Contact support ↗</Link>
          <Link className="text-link" href="/products/offlinetts">Back to OfflineTTS</Link>
        </div>
      </article>
    </main>
  );
}
