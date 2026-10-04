"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { FormEvent, useState } from "react";
import type { Service } from "../data";

export function PixelSignal() {
  return (
    <span className="pixel-signal" aria-hidden="true">
      <i />
      <i />
      <i />
      <i />
    </span>
  );
}

export function HeroReveal({ children }: { children: React.ReactNode }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className="hero-reveal"
      initial={reduce ? false : "hidden"}
      animate="show"
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: 0.08 } },
      }}
    >
      {children}
    </motion.div>
  );
}

export function HeroItem({ children }: { children: React.ReactNode }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, x: reduce ? 0 : -30 },
        show: { opacity: 1, x: 0, transition: { duration: 0.56, ease: [0.22, 1, 0.36, 1] } },
      }}
    >
      {children}
    </motion.div>
  );
}

export function Reveal({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.18 }}
      transition={{ duration: 0.52, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function ServiceFilter({ services }: { services: Service[] }) {
  const [active, setActive] = useState("all");
  const selected = active === "all" ? services : services.filter((service) => service.id === active);

  return (
    <>
      <div className="filter-row" aria-label="Filter services">
        <button type="button" aria-pressed={active === "all"} onClick={() => setActive("all")}>
          All
        </button>
        {services.map((service) => (
          <button
            key={service.id}
            type="button"
            aria-pressed={active === service.id}
            onClick={() => setActive(service.id)}
          >
            {service.title}
          </button>
        ))}
      </div>
      <motion.div className="service-list" layout aria-live="polite">
        <AnimatePresence mode="popLayout" initial={false}>
          {selected.map((service) => (
            <motion.article
              className="technical-card service-detail"
              key={service.id}
              layout
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.24 }}
            >
              <div className="service-index mono-label">/{service.number}</div>
              <div className="service-copy">
                <h2>{service.title}</h2>
                <p className="lead-small">{service.positioning}</p>
                <ul className="technical-list">
                  {service.deliverables.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
                <div className="workflow-line">
                  <span className="mono-label">DELIVERY FLOW</span>
                  <p>{service.workflow}</p>
                </div>
              </div>
            </motion.article>
          ))}
        </AnimatePresence>
      </motion.div>
    </>
  );
}

export function FaqAccordion({ items }: { items: Array<{ question: string; answer: string }> }) {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="faq-list">
      {items.map((item, index) => {
        const expanded = open === index;
        return (
          <article className="faq-item" key={item.question}>
            <button
              type="button"
              aria-expanded={expanded}
              aria-controls={`faq-panel-${index}`}
              onClick={() => setOpen(expanded ? null : index)}
            >
              <span className="mono-label">0{index + 1}</span>
              <strong>{item.question}</strong>
              <span aria-hidden="true">{expanded ? "−" : "+"}</span>
            </button>
            <AnimatePresence initial={false}>
              {expanded && (
                <motion.div
                  id={`faq-panel-${index}`}
                  className="faq-answer"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.24 }}
                >
                  <p>{item.answer}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </article>
        );
      })}
    </div>
  );
}

type FormStatus = { kind: "idle" | "working" | "error" | "ready"; message: string };

export function ContactForm() {
  const [status, setStatus] = useState<FormStatus>({ kind: "idle", message: "" });

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus({ kind: "working", message: "Validating your project brief…" });
    const form = event.currentTarget;
    const values = Object.fromEntries(new FormData(form).entries());
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const result = (await response.json()) as { ok?: boolean; mailto?: string; error?: string };
      if (!response.ok || !result.ok || !result.mailto) {
        throw new Error(result.error || "Please check the form and try again.");
      }
      setStatus({
        kind: "ready",
        message: "Your brief is ready. Your email app is opening so you can review and send it.",
      });
      window.location.href = result.mailto;
    } catch (error) {
      setStatus({
        kind: "error",
        message: error instanceof Error ? error.message : "Unable to prepare the message.",
      });
    }
  }

  return (
    <form className="contact-form technical-card" onSubmit={submit} noValidate>
      <input className="honeypot" type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" hidden />
      <label>
        <span>Name</span>
        <input name="name" type="text" placeholder="Jane Smith" required minLength={2} />
      </label>
      <label>
        <span>Email</span>
        <input name="email" type="email" placeholder="you@company.com" required />
      </label>
      <label>
        <span>Company</span>
        <input name="company" type="text" placeholder="Company or organisation" required minLength={2} />
      </label>
      <label>
        <span>The challenge</span>
        <textarea name="challenge" placeholder="What are we solving?" required minLength={20} rows={5} />
      </label>
      <label>
        <span>Budget range</span>
        <input name="budgetRange" type="text" placeholder="₹50,000–₹1,00,000" required />
      </label>
      <button className="cut-button form-submit" type="submit" disabled={status.kind === "working"}>
        {status.kind === "working" ? "Preparing…" : "Prepare email brief"} <span aria-hidden="true">↗</span>
      </button>
      <p className={`form-status ${status.kind}`} role="status" aria-live="polite">
        {status.message || "Your details stay in your email app until you choose to send them."}
      </p>
    </form>
  );
}
