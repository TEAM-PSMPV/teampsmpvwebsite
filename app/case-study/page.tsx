import type { Metadata } from "next";
import Link from "next/link";
import { PixelSignal } from "../components/Interactive";
import { deliveryPhases } from "../data";

export const metadata: Metadata = {
  title: "Our Work",
  description:
    "TEAM-PSMPV is currently working with Anand Hospital and other clients. Verified case studies will be published after completion and approval.",
  alternates: { canonical: "/case-study" },
};

export default function WorkPage() {
  return (
    <main id="main-content">
      <section className="page-hero content work-hero">
        <p className="eyebrow"><PixelSignal /> /OUR WORK</p>
        <h1>PROOF IS BUILT BEFORE IT IS PUBLISHED.</h1>
        <p className="page-lead">
          We will share client stories only when the work is complete, the outcomes are
          verifiable and publication is approved.
        </p>
      </section>

      <section className="content work-status-section">
        <div className="work-status technical-card">
          <div className="status-orbit" aria-hidden="true"><span /></div>
          <p className="mono-label">/STATUS: ACTIVE DEVELOPMENT</p>
          <h2>UNDER DEVELOPMENT</h2>
          <p>
            Currently Working with{" "}
            <a
              href="https://share.google/73ViVVhkDLabNDXLq"
              target="_blank"
              rel="noopener noreferrer"
            >
              Anand Hospital
            </a>{" "}
            and a few other clients
          </p>
          <div className="status-line"><span /></div>
        </div>
      </section>

      <section className="section work-method">
        <div className="content">
          <div className="section-intro split-intro">
            <div>
              <p className="mono-label">/UNTIL THE CASE STUDIES ARRIVE</p>
              <h2>THE DELIVERY SYSTEM IS ALREADY DEFINED.</h2>
            </div>
            <p>
              Every future case study will be grounded in scope, architecture,
              implementation, quality gates, release and measurable operational value.
            </p>
          </div>
          <div className="phase-grid light-phases">
            {deliveryPhases.slice(0, 6).map(([number, title, description]) => (
              <article key={number}>
                <span className="mono-label">/{number}</span>
                <h3>{title}</h3>
                <p>{description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="final-cta">
        <div className="content final-cta-inner">
          <div>
            <p className="mono-label">/BUILD THE NEXT STORY</p>
            <h2>START WITH A REAL BUSINESS PROBLEM.</h2>
          </div>
          <Link className="cut-button inverse" href="/contact-us">Talk to the founder ↗</Link>
        </div>
      </section>
    </main>
  );
}
