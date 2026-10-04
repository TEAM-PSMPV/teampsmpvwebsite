import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PixelSignal, Reveal } from "../components/Interactive";
import { SystemCore } from "../components/SystemCore";
import { deliveryPhases } from "../data";

export const metadata: Metadata = {
  title: "Our Work",
  description:
    "How TEAM-PSMPV built Anand Hospital a dynamic website with an integrated AI chatbot and AppointFlow appointment system.",
  alternates: { canonical: "/case-study" },
};

export default function WorkPage() {
  return (
    <main id="main-content">
      <section className="page-hero page-hero-system content work-hero">
        <div>
          <p className="eyebrow"><PixelSignal /> /OUR WORK</p>
          <h1>DIGITAL CARE, BUILT AROUND THE PATIENT.</h1>
          <p className="page-lead">
            A dynamic healthcare website that connects information, assistance and
            appointment booking in one clear patient journey.
          </p>
        </div>
        <SystemCore mode="quality" activeLayer={5} />
      </section>

      <section className="content anand-case-section" aria-labelledby="anand-case-title">
        <Reveal className="anand-case-copy">
          <p className="mono-label">/ANAND HOSPITAL / HEALTHCARE PLATFORM</p>
          <h2 id="anand-case-title">ONE DYNAMIC SYSTEM FROM DISCOVERY TO APPOINTMENT.</h2>
          <p className="anand-case-lead">
            TEAM-PSMPV designed and engineered Anand Hospital&apos;s dynamic website around
            real patient tasks: finding care, getting immediate guidance and booking a
            visit without leaving the experience.
          </p>
          <div className="anand-capabilities">
            <article>
              <span className="mono-label">/01</span>
              <h3>Dynamic website</h3>
              <p>Responsive service, doctor and health information structured for fast navigation.</p>
            </article>
            <article>
              <span className="mono-label">/02</span>
              <h3>Integrated AI chatbot</h3>
              <p>On-site conversational assistance helps visitors reach relevant information quickly.</p>
            </article>
            <article>
              <span className="mono-label">/03</span>
              <h3>AppointFlow</h3>
              <p>An integrated appointment system carries intent directly into a booking workflow.</p>
            </article>
          </div>
          <a
            className="cut-button"
            href="https://www.anandhospitalmbd.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Visit Anand Hospital ↗
          </a>
        </Reveal>

        <Reveal className="anand-case-visual">
          <a
            className="anand-visual-link"
            href="https://www.anandhospitalmbd.org/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Visit the Anand Hospital website"
          >
            <span className="anand-shot-frame">
              <Image
                className="anand-desktop-shot"
                src="/images/work/anand-hospital-desktop.png"
                alt="Anand Hospital dynamic website on desktop"
                width={1908}
                height={913}
                sizes="(max-width: 767px) 1px, (max-width: 1100px) 92vw, 58vw"
                priority
                draggable={false}
              />
              <Image
                className="anand-mobile-shot"
                src="/images/work/anand-hospital-mobile.png"
                alt="Anand Hospital dynamic website on mobile"
                width={440}
                height={787}
                sizes="(max-width: 767px) 82vw, 1px"
                priority
                draggable={false}
              />
            </span>
            <span className="anand-visual-caption mono-label">LIVE WEBSITE / OPEN ↗</span>
          </a>
        </Reveal>
      </section>

      <section className="section work-method">
        <div className="content">
          <div className="section-intro split-intro">
            <div>
              <p className="mono-label">/HOW WE BUILT IT</p>
              <h2>ONE DELIVERY SYSTEM, FROM SCOPE TO RELEASE.</h2>
            </div>
            <p>
              The Anand Hospital platform was shaped through scope, architecture,
              implementation, quality gates and release as one connected process.
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
