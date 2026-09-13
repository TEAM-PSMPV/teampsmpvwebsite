"use client";

import { useEffect, useRef, useState } from "react";

const layers = [
  {
    code: "LAYER 01 / SOFTWARE",
    title: "The product you can touch.",
    description: "An app is the visible surface of a much deeper stack of instructions, states and signals.",
    glyph: "APP",
  },
  {
    code: "LAYER 02 / INTERFACE",
    title: "Meaning arranged for people.",
    description: "Buttons, screens and words turn machine capability into a sequence a person can understand.",
    glyph: "UI",
  },
  {
    code: "LAYER 03 / CODE",
    title: "Instructions with structure.",
    description: "Code describes decisions and operations precisely enough for another machine to execute them.",
    glyph: "</>",
  },
  {
    code: "LAYER 04 / DATA",
    title: "Meaning stored as states.",
    description: "Names, images, appointments and ideas become patterns that can be copied, compared and changed.",
    glyph: "0101",
  },
  {
    code: "LAYER 05 / SIGNAL",
    title: "A physical yes or no.",
    description: "The abstract pattern becomes timed electrical states moving through a very real material system.",
    glyph: "PULSE",
  },
  {
    code: "LAYER 06 / LOGIC",
    title: "Tiny decisions at speed.",
    description: "Logic gates combine simple states into the arithmetic, comparison and control behind every action.",
    glyph: "AND",
  },
  {
    code: "LAYER 07 / MEMORY",
    title: "A place for the present.",
    description: "Memory holds the signals a system needs now, while storage keeps them available for later.",
    glyph: "MEM",
  },
  {
    code: "LAYER 08 / SILICON",
    title: "Engineered crystal.",
    description: "Transistors are patterned into silicon so controlled electrical behaviour can happen at scale.",
    glyph: "Si",
  },
  {
    code: "LAYER 09 / SILICA",
    title: "The chemistry underneath.",
    description: "Silicon begins as part of silica, a compound found in quartz and many ordinary minerals.",
    glyph: "SiO2",
  },
  {
    code: "LAYER 10 / SAND",
    title: "The beginning is matter.",
    description: "The extraordinary loop ends where it began: common material refined until it can carry meaning.",
    glyph: "SiO2",
  },
];

export function AssemblyStory() {
  const [activeIndex, setActiveIndex] = useState(0);
  const stepRefs = useRef<Array<HTMLElement | null>>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => Math.abs(a.boundingClientRect.top) - Math.abs(b.boundingClientRect.top))[0];
        if (!visible) return;
        const index = Number((visible.target as HTMLElement).dataset.index);
        if (!Number.isNaN(index)) setActiveIndex(index);
      },
      { rootMargin: "-34% 0px -48% 0px", threshold: [0, 0.25, 0.75, 1] },
    );

    stepRefs.current.forEach((step) => step && observer.observe(step));
    return () => observer.disconnect();
  }, []);

  const activeLayer = layers[activeIndex];

  return (
    <section className="assembly-section" aria-labelledby="assembly-title">
      <div className="content">
        <div className="section-intro split-intro assembly-intro">
          <div>
            <p className="eyebrow"><span className="assembly-marker" aria-hidden="true" /> /THE STACK UNDER THE SCREEN</p>
            <h2 id="assembly-title">EVERY APP IS A CAREFULLY ARRANGED SIGNAL.</h2>
          </div>
          <p>
            Scroll through the layers. The polished product at the top is still connected to
            the same physical world at the bottom: instructions become data, data becomes
            signals, and signals become behaviour.
          </p>
        </div>

        <div className="assembly-layout">
          <aside className="assembly-display" aria-live="polite">
            <div className="assembly-display-header">
              <span className="mono-label">/LIVE STACK</span>
              <span className="assembly-display-status">ACTIVE 0{activeIndex + 1}</span>
            </div>
            <div className="assembly-stage" data-level={activeIndex} aria-hidden="true">
              <div className="assembly-stage-grid" />
              <div className="assembly-core">
                <span className="assembly-core-ring ring-one" />
                <span className="assembly-core-ring ring-two" />
                <span className="assembly-core-glyph">{activeLayer.glyph}</span>
              </div>
              <span className="assembly-stage-axis axis-x" />
              <span className="assembly-stage-axis axis-y" />
              <span className="assembly-stage-coordinate">X 04.18 / Y 09.26</span>
            </div>
            <div className="assembly-display-copy">
              <span className="mono-label">{activeLayer.code}</span>
              <strong>{activeLayer.title}</strong>
              <p>{activeLayer.description}</p>
            </div>
          </aside>

          <ol className="assembly-steps">
            {layers.map((layer, index) => (
              <li
                className={`assembly-step ${index === activeIndex ? "is-active" : ""}`}
                data-index={index}
                key={layer.code}
                ref={(element) => {
                  stepRefs.current[index] = element;
                }}
              >
                <span className="assembly-step-index">0{index + 1}</span>
                <div className="assembly-step-copy">
                  <p className="mono-label">{layer.code}</p>
                  <h3>{layer.title}</h3>
                  <p>{layer.description}</p>
                  <div className="assembly-step-line" aria-hidden="true">
                    <span />
                    <span />
                    <span />
                    <span />
                    <span />
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
