import type { Metadata } from "next";
import { ContactForm, PixelSignal } from "../components/Interactive";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Start a requirements conversation with TEAM-PSMPV.",
  alternates: { canonical: "/contact-us" },
};

export default function ContactPage() {
  return (
    <main id="main-content">
      <section className="contact-section content">
        <div className="contact-story">
          <p className="eyebrow"><PixelSignal /> /START WITH THE PROBLEM</p>
          <h1>START THE MISSION.</h1>
          <p className="page-lead">
            Tell us what the current process looks like, where it breaks and what a useful
            outcome would change. We&apos;ll turn that into a structured first conversation.
          </p>
          <div className="contact-direct">
            <span className="mono-label">DIRECT CHANNELS</span>
            <a href="mailto:support@teampsmpv.com">support@teampsmpv.com</a>
            <a href="tel:+918218501002">+91 8218501002</a>
            <span>Moradabad, Uttar Pradesh, India</span>
          </div>
          <div className="contact-note">
            <span>01</span>
            <p>Requirement analysis before implementation.</p>
          </div>
          <div className="contact-note">
            <span>02</span>
            <p>Written scope, milestones and acceptance criteria.</p>
          </div>
        </div>
        <ContactForm />
      </section>
    </main>
  );
}
