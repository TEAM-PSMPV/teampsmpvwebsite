import Link from "next/link";
import {
  FaqAccordion,
  HeroItem,
  HeroReveal,
  PixelSignal,
  Reveal,
} from "./components/Interactive";
import {
  DeliveryStory,
  MetricValue,
  ProductScreens,
  ServiceSystem,
} from "./components/PrecisionMotion";
import { HeroModel } from "./components/HeroModel";
import { deliveryPhases, faqs, services } from "./data";

export default function HomePage() {
  return (
    <main id="main-content">
      <section className="hero content">
        <div className="hero-copy">
          <HeroReveal>
            <HeroItem>
              <div className="eyebrow">
                <PixelSignal />
                <span>/PRECISION IN MOTION</span>
              </div>
            </HeroItem>
            <HeroItem>
              <h1>
                ENGINEERING THE
                <br />
                ESSENTIAL.
              </h1>
            </HeroItem>
            <HeroItem>
              <p className="hero-lead">
                TEAM-PSMPV takes practical ownership of the systems businesses rely on,
                from the first interface to the workflow, automation, release and support
                behind it.
              </p>
            </HeroItem>
            <HeroItem>
              <div className="button-row">
                <Link className="cut-button" href="/contact-us">
                  Consult with us <span aria-hidden="true">↗</span>
                </Link>
                <Link className="cut-button secondary" href="/case-study">
                  View our work <span aria-hidden="true">→</span>
                </Link>
              </div>
              <div className="hero-quick-contact" aria-label="Quick contact">
                <a href="tel:+918218501002" aria-label="Call TEAM-PSMPV">
                  Call <span aria-hidden="true">↗</span>
                </a>
                <a
                  href="https://wa.me/918218501002?text=Hi%20TEAM-PSMPV%2C%20I%20want%20to%20discuss%20a%20project."
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Message TEAM-PSMPV on WhatsApp"
                >
                  WhatsApp <span aria-hidden="true">↗</span>
                </a>
              </div>
            </HeroItem>
          </HeroReveal>
        </div>
        <HeroModel />
      </section>

      <div className="signal-strip">
        <div className="content signal-grid">
          <span>INDIA-FIRST DELIVERY</span>
          <span>CONSULTING BEFORE CODING</span>
          <span>SECURITY BY DEFAULT</span>
          <span>SUPPORT AFTER LAUNCH</span>
        </div>
      </div>

      <section className="section content ownership-section">
        <Reveal className="section-intro split-intro">
          <div>
            <p className="eyebrow"><PixelSignal /> /OWNED AT EVERY LAYER</p>
            <h2>PRECISION SYSTEMS. PRACTICAL OUTCOMES.</h2>
          </div>
          <div className="intro-support">
            <p>
              One accountable delivery model for product thinking, software engineering,
              automation, security, release quality and managed operations.
            </p>
            <Link className="text-link" href="/services">
              Explore every service <span aria-hidden="true">↗</span>
            </Link>
          </div>
        </Reveal>

        <ServiceSystem services={services} />
      </section>

      <section className="section dark-section">
        <div className="content">
          <Reveal className="section-intro split-intro light">
            <div>
              <p className="eyebrow"><PixelSignal /> /DELIVERY SYSTEM</p>
              <h2>FROM DISCOVERY TO DAILY OPERATIONS.</h2>
            </div>
            <p>
              Every engagement moves through visible quality gates. The aim is simple:
              fewer assumptions, controlled change and systems that remain supportable.
            </p>
          </Reveal>
          <DeliveryStory phases={deliveryPhases} />
        </div>
      </section>

      <section className="metrics-section">
        <div className="content">
          <p className="mono-label">/OPERATING MODEL</p>
          <h2>STRUCTURED TO SCALE. LEAN ENOUGH TO MOVE.</h2>
          <div className="metrics-grid">
            <div><strong><MetricValue value={12} /></strong><span>Functional teams</span></div>
            <div><strong><MetricValue value={7} /></strong><span>Productised services</span></div>
            <div><strong><MetricValue value={8} /></strong><span>Delivery gates</span></div>
            <div><strong><MetricValue value={1} /></strong><span>Accountable partner</span></div>
          </div>
        </div>
      </section>

      <section className="section content product-feature">
        <Reveal className="product-feature-copy">
          <p className="eyebrow"><PixelSignal /> /INTERNAL INNOVATION</p>
          <h2>OFFLINETTS</h2>
          <p className="large-copy">Uncensored. No internet. No limits. Just voice.</p>
          <p>
            An Android text-to-speech product that processes user text on-device after
            selected voice models are installed.
          </p>
          <div className="button-row">
            <Link className="cut-button" href="/products/offlinetts">
              View product <span aria-hidden="true">↗</span>
            </Link>
            <Link className="text-link" href="/products/offlinetts/privacy-policy">
              Privacy policy
            </Link>
          </div>
        </Reveal>
        <Reveal className="product-visual">
          <ProductScreens compact />
          <div className="product-meta">
            <span>ANDROID</span>
            <span>ON-DEVICE</span>
            <span>PRIVACY-FIRST</span>
          </div>
        </Reveal>
      </section>

      <section className="section faq-section">
        <div className="content faq-layout">
          <div>
            <p className="mono-label">/CLEAR ANSWERS</p>
            <h2>WHAT OWNERSHIP LOOKS LIKE.</h2>
          </div>
          <FaqAccordion items={faqs} />
        </div>
      </section>

      <section className="final-cta">
        <div className="content final-cta-inner">
          <div>
            <p className="mono-label">/START WITH CLARITY</p>
            <h2>BRING THE PROBLEM. WE&apos;LL MAP THE SYSTEM.</h2>
          </div>
          <Link className="cut-button inverse" href="/contact-us">
            Start a conversation <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </section>
    </main>
  );
}
