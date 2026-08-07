import type { Metadata } from "next";
import Image from "next/image";
import { PixelSignal, Reveal } from "../components/Interactive";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "TEAM-PSMPV means Precision Systems for Modern Products & Vision, a lean engineering and digital operations company founded by Shishir Mishra.",
  alternates: { canonical: "/about-us" },
};

const acronym = [
  ["P", "PRECISION", "Clear requirements, controlled quality and deliberate execution."],
  ["S", "SYSTEMS", "Connected software, workflows, data and operations, not isolated features."],
  ["M", "MODERN", "Current tools selected for maintainability, security and real business fit."],
  ["P", "PRODUCTS", "Usable digital products engineered around people and measurable outcomes."],
  ["V", "& VISION", "A long-term view that connects today&apos;s delivery with tomorrow&apos;s scale."],
];

const teamLeads = [
  {
    name: "Smriti Asthana",
    role: "UI/UX/SWE/Cloud/R&D Team Lead",
    image: "/images/smriti-asthana.png",
    profile: "https://www.linkedin.com/in/smriti-asthana-3518bb315/",
    summary:
      "Leads the connected product-delivery practice across interface design, software engineering, cloud implementation and applied research.",
    focus: ["Product experience & UI/UX", "Software & cloud delivery", "Applied R&D"],
  },
  {
    name: "Shashank Kumar",
    role: "Marketing/Sales/Automations/Maintenance Team Lead",
    image: "/images/shashank-kumar.png",
    profile: "https://www.linkedin.com/in/shashank-kumar-32aa38255/",
    summary:
      "Leads go-to-market and operational continuity across marketing, sales enablement, workflow automation and ongoing product maintenance.",
    focus: ["Marketing & sales systems", "Workflow automation", "Maintenance operations"],
  },
];

export default function AboutPage() {
  return (
    <main id="main-content">
      <section className="page-hero content about-opening">
        <p className="eyebrow"><PixelSignal /> /ABOUT TEAM-PSMPV</p>
        <h1>A REBELLION AGAINST FRAGMENTED DELIVERY.</h1>
        <p className="page-lead">
          TEAM-PSMPV brings consulting, interface design, software engineering,
          automation, security, testing and support into one accountable operating model.
        </p>
      </section>

      <section className="acronym-section">
        <div className="content">
          <div className="acronym-heading">
            <p className="mono-label">/THE NAME IS THE OPERATING PROMISE</p>
            <h2>PRECISION SYSTEMS FOR MODERN PRODUCTS &amp; VISION</h2>
          </div>
          <div className="acronym-list">
            {acronym.map(([letter, word, description], index) => (
              <Reveal className="acronym-row" key={`${word}-${index}`}>
                <span className="mono-label">0{index + 1}</span>
                <strong>{letter}</strong>
                <h3>{word}</h3>
                <p dangerouslySetInnerHTML={{ __html: description }} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section content founder-section">
        <div className="section-intro split-intro">
          <div>
            <p className="mono-label">/THE TEAM BEHIND THE SYSTEM</p>
            <h2>LEAN SENIOR TECH TEAM</h2>
          </div>
          <p>
            A founder-led core team with clear ownership across engineering,
            experience, growth, automation and long-term product operations.
          </p>
        </div>

        <div className="leadership-grid">
          <article className="founder-card technical-card">
            <div className="founder-photo">
              <Image
                src="/images/founder-shishir-mishra.jpg"
                alt="Shishir Mishra, Founder of TEAM-PSMPV"
                width={1024}
                height={967}
                sizes="(max-width: 767px) 100vw, 33vw"
                unoptimized
              />
            </div>
            <div className="founder-content">
              <p className="mono-label">01 / FOUNDER</p>
              <h2>Shishir Mishra</h2>
              <p className="lead-small">
                A Computer Science and Engineering (AI) graduate building across applied AI,
                multimodal systems and production-oriented digital products.
              </p>

              <div className="founder-block">
                <h3>Education</h3>
                <p>
                  B.Tech. in Computer Science and Engineering (AI), with Minors in Robotics,
                  Galgotias College of Engineering and Technology.
                </p>
              </div>

              <div className="founder-block">
                <h3>Selected projects</h3>
                <div className="project-mini">
                  <span>01</span>
                  <div>
                    <h4>BharatFloodSAR</h4>
                    <p>
                      An India-specific bitemporal Sentinel-1 SAR benchmark and
                      multi-architecture deep-learning system for flood detection, covering
                      20 major flood events across 12 states and seven terrain types.
                    </p>
                  </div>
                </div>
                <div className="project-mini">
                  <span>02</span>
                  <div>
                    <h4>SENTIENT</h4>
                    <p>
                      A locally deployed multimodal AI chatbot for text, images, PDFs and
                      audio, integrating LLaMA 2, Whisper and LLaVA through LangChain for
                      modular, context-aware understanding.
                    </p>
                  </div>
                </div>
              </div>

              <div className="founder-block">
                <h3>Certifications</h3>
                <ul className="technical-list">
                  <li>Artificial Intelligence: Search Methods for Problem Solving, IIT Madras NPTEL</li>
                  <li>Programming in Java: Elite certification, IIT Kharagpur NPTEL</li>
                </ul>
              </div>
            </div>
          </article>

          {teamLeads.map((member, index) => (
            <Reveal className="team-lead-card technical-card" key={member.name}>
              <div className="team-lead-photo">
                <Image
                  src={member.image}
                  alt={`${member.name}, ${member.role} at TEAM-PSMPV`}
                  width={1254}
                  height={1254}
                  sizes="(max-width: 767px) 100vw, 33vw"
                  unoptimized
                />
              </div>
              <div className="team-lead-content">
                <p className="mono-label">0{index + 2} / TEAM LEAD</p>
                <h2>{member.name}</h2>
                <p className="team-role">{member.role}</p>
                <p className="lead-small">{member.summary}</p>

                <div className="founder-block">
                  <h3>Selected remit</h3>
                  <ul className="technical-list team-focus-list">
                    {member.focus.map((item) => <li key={item}>{item}</li>)}
                  </ul>
                </div>

                <a
                  className="text-link"
                  href={member.profile}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`View ${member.name}'s LinkedIn profile`}
                >
                  LinkedIn profile ↗
                </a>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
    </main>
  );
}
