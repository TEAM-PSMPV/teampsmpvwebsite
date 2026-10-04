"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useInView } from "motion/react";
import { useEffect, useRef, useState } from "react";
import type { Service } from "../data";
import { SystemCore, type CoreMode } from "./SystemCore";

const screenshots = [
  ["choose-language.jpg", "OfflineTTS language selection screen"],
  ["language-list.jpg", "OfflineTTS supported-language menu"],
  ["write-script.jpg", "OfflineTTS Hindi script entry screen"],
  ["choose-voice.jpg", "OfflineTTS voice model selection screen"],
  ["conversion-complete.jpg", "OfflineTTS completed audio conversion screen"],
] as const;

export function ServiceSystem({ services }: { services: Service[] }) {
  const [active, setActive] = useState(0);
  const observer = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const cards = document.querySelectorAll<HTMLElement>("[data-service-layer]");
    observer.current = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(Number((visible.target as HTMLElement).dataset.serviceLayer));
      },
      { rootMargin: "-28% 0px -48%", threshold: [0.2, 0.5, 0.8] },
    );
    cards.forEach((card) => observer.current?.observe(card));
    return () => observer.current?.disconnect();
  }, []);

  return (
    <div className="service-system-layout">
      <aside className="service-core-aside" aria-label="Seven connected system layers">
        <SystemCore mode="exploded" activeLayer={active} />
        <p className="mono-label">ACTIVE LAYER / 0{active + 1}</p>
        <strong>{services[active]?.title}</strong>
      </aside>
      <div className="home-service-grid">
        {services.map((service, index) => (
          <motion.article
            className="home-service"
            data-service-layer={index}
            key={service.id}
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.46, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="mono-label">/{service.number}</span>
            <h3>{service.title}</h3>
            <p>{service.positioning}</p>
            <Link href={`/services#${service.id}`} aria-label={`Read about ${service.title}`}>
              <span aria-hidden="true">↗</span>
            </Link>
          </motion.article>
        ))}
      </div>
    </div>
  );
}

export function DeliveryStory({
  phases,
}: {
  phases: Array<string[]>;
}) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const steps = document.querySelectorAll<HTMLElement>("[data-delivery-step]");
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(Number((visible.target as HTMLElement).dataset.deliveryStep));
      },
      { rootMargin: "-30% 0px -42%", threshold: [0.2, 0.55] },
    );
    steps.forEach((step) => observer.observe(step));
    return () => observer.disconnect();
  }, []);

  const modes: CoreMode[] = [
    "compact",
    "compact",
    "exploded",
    "assembled",
    "assembled",
    "quality",
    "product",
    "product",
  ];

  return (
    <div className="delivery-story">
      <div className="delivery-visual">
        <SystemCore mode={modes[active]} activeLayer={active < 7 ? active : -1} />
        <div className="delivery-progress" aria-hidden="true">
          <span style={{ transform: `scaleX(${(active + 1) / phases.length})` }} />
        </div>
        <p className="mono-label">GATE {phases[active]?.[0]} / {phases.length.toString().padStart(2, "0")}</p>
      </div>
      <div className="delivery-steps">
        {phases.map(([number, title, description], index) => (
          <article
            className={active === index ? "is-active" : ""}
            data-delivery-step={index}
            key={number}
          >
            <span className="mono-label">/{number}</span>
            <h3>{title}</h3>
            <p>{description}</p>
          </article>
        ))}
      </div>
    </div>
  );
}

export function MetricValue({ value }: { value: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const visible = useInView(ref, { once: true, amount: 0.65 });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!visible) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      const frame = requestAnimationFrame(() => setDisplay(value));
      return () => cancelAnimationFrame(frame);
    }
    const started = performance.now();
    let frame = 0;
    const update = (now: number) => {
      const progress = Math.min((now - started) / 720, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(value * eased));
      if (progress < 1) frame = requestAnimationFrame(update);
    };
    frame = requestAnimationFrame(update);
    return () => cancelAnimationFrame(frame);
  }, [value, visible]);

  return <span ref={ref}>{display.toString().padStart(2, "0")}</span>;
}

export function ProductScreens({ compact = false }: { compact?: boolean }) {
  const selected = compact ? screenshots.slice(2) : screenshots;
  return (
    <div className={`product-screens ${compact ? "is-compact" : ""}`}>
      <div className="product-core-transition">
        <SystemCore mode="product" />
      </div>
      <div className="device-row">
        {selected.map(([file, alt], index) => (
          <motion.figure
            className="device-frame"
            key={file}
            initial={{ opacity: 0, y: 24, rotateY: index % 2 ? 3 : -3 }}
            whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
            viewport={{ once: true, amount: 0.22 }}
            transition={{ duration: 0.56, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
          >
            <Image
              src={`/products/offlinetts/screenshots/${file}`}
              alt={alt}
              width={716}
              height={1600}
              sizes={compact ? "(max-width: 767px) 42vw, 220px" : "(max-width: 767px) 58vw, 230px"}
            />
          </motion.figure>
        ))}
      </div>
    </div>
  );
}
