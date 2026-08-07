import type { Metadata } from "next";
import Link from "next/link";
import { PixelSignal, ServiceFilter } from "../components/Interactive";
import { services } from "../data";

export const metadata: Metadata = {
  title: "IT Services in Moradabad & Varanasi",
  description:
    "TEAM-PSMPV provides website development, CRM, WhatsApp automation, AI, Android products and managed IT services from Moradabad to Varanasi and across India.",
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return (
    <main id="main-content">
      <section className="page-hero content">
        <p className="eyebrow"><PixelSignal /> /CAPABILITY SYSTEM</p>
        <h1>07 PILLARS OF PRACTICAL ENGINEERING.</h1>
        <p className="page-lead">
          A modular service portfolio designed to take a project from requirement
          discovery to implementation, secure release and long-term operation.
        </p>
      </section>
      <section className="content service-catalog section">
        <ServiceFilter services={services} />
      </section>
      <section className="content service-areas" aria-labelledby="service-areas-title">
        <p className="mono-label">/SERVICE AREAS</p>
        <h2 id="service-areas-title">IT DELIVERY FROM MORADABAD, ACROSS INDIA.</h2>
        <p>
          Based in Moradabad, TEAM-PSMPV works with organisations in Varanasi,
          Lucknow, Noida, Ghaziabad, Bareilly, Rampur, Amroha, Kanpur, Prayagraj,
          Delhi NCR and other Indian cities through a structured remote delivery model.
        </p>
      </section>
      <section className="final-cta">
        <div className="content final-cta-inner">
          <div>
            <p className="mono-label">/NOT SURE WHERE TO START?</p>
            <h2>BEGIN WITH A REQUIREMENT AND AUTOMATION AUDIT.</h2>
          </div>
          <Link className="cut-button inverse" href="/contact-us">
            Map the requirement <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </section>
    </main>
  );
}
