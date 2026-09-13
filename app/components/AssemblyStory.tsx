"use client";

import { useEffect, useRef, useState } from "react";

const layers = [
  {
    code: "LAYER 01 / SOFTWARE",
    title: "The product you can touch.",
    description: "An app is the visible surface of a deeper stack of instructions, states and signals.",
    glyph: "APP",
    material: "Intent",
    output: "Product",
  },
  {
    code: "LAYER 02 / CODE",
    title: "Instructions with structure.",
    description: "Code describes decisions and operations precisely enough for another machine to execute them.",
    glyph: "</>",
    material: "Product",
    output: "Instructions",
  },
  {
    code: "LAYER 03 / BINARY",
    title: "Meaning reduced to two states.",
    description: "Text, images and decisions become patterns of 0 and 1 that a machine can store and compare.",
    glyph: "01",
    material: "Instructions",
    output: "0 / 1",
  },
  {
    code: "LAYER 04 / SIGNAL",
    title: "Voltage moving through time.",
    description: "Binary becomes a physical change in voltage, measured as a trace moving across an oscilloscope.",
    glyph: "WAVE",
    material: "0 / 1",
    output: "Voltage",
  },
  {
    code: "LAYER 05 / SILICON",
    title: "Engineered crystal.",
    description: "Transistors are patterned into silicon so controlled electrical behaviour can happen at scale.",
    glyph: "Si",
    material: "Voltage",
    output: "Transistor",
  },
  {
    code: "LAYER 06 / SAND",
    title: "The beginning is matter.",
    description: "Silicon begins in silica, found in quartz and ordinary sand, then gets refined until it can carry meaning.",
    glyph: "SiO2",
    material: "Silicon",
    output: "Sand",
  },
];

export function AssemblyStory() {
  const [activeIndex, setActiveIndex] = useState(0);
  const stepRefs = useRef<Array<HTMLElement | null>>([]);
  const activeLayer = layers[activeIndex];

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

  return (
    <section className="assembly-section" aria-labelledby="assembly-title">
      <div className="content">
        <div className="section-intro split-intro assembly-intro">
          <div>
            <p className="eyebrow"><span className="assembly-marker" aria-hidden="true" /> /THE STACK UNDER THE SCREEN</p>
            <h2 id="assembly-title">EVERY APP IS A CAREFULLY ARRANGED SIGNAL.</h2>
          </div>
          <p>
            Scroll through the transformations. The polished product at the top is still
            connected to the same physical world at the bottom: instructions become bits,
            bits become voltage, and voltage becomes behaviour.
          </p>
        </div>

        <div className="assembly-layout">
          <aside className="assembly-display" aria-live="polite">
            <div className="assembly-display-header">
              <span className="mono-label">/LIVE STACK</span>
              <span className="assembly-display-status">ACTIVE 0{activeIndex + 1} / 06</span>
            </div>
            <div className="assembly-stage" data-level={activeIndex} aria-hidden="true">
              <div className="assembly-stage-grid" />

              <div className="assembly-visual assembly-visual-app">
                <div className="assembly-app-window">
                  <span className="assembly-app-window-bar" />
                  <span className="assembly-app-window-bar short" />
                  <div className="assembly-app-panel" />
                  <div className="assembly-app-panel wide" />
                  <div className="assembly-app-footer" />
                  <div className="assembly-app-scope">
                    <svg viewBox="0 0 220 42" aria-hidden="true">
                      <path d="M2 23 C16 5 27 5 40 23 S65 41 78 23 S103 5 116 23 S141 41 154 23 S179 5 192 23 S207 32 218 15" />
                    </svg>
                  </div>
                </div>
                <span className="assembly-visual-caption">A USEFUL SURFACE</span>
              </div>

              <div className="assembly-visual assembly-visual-code">
                <div className="assembly-code-block">
                  <span><b>const</b> signal = <i>read</i>();</span>
                  <span><b>if</b> (signal === <em>1</em>) &#123;</span>
                  <span>&nbsp;&nbsp;return <i>meaning</i>;</span>
                  <span>&#125;</span>
                </div>
                <span className="assembly-visual-caption">A PRECISE INSTRUCTION</span>
              </div>

              <div className="assembly-visual assembly-visual-binary">
                <div className="assembly-binary-stack">
                  <span>01001001 01001110</span>
                  <span>00110010 01010011</span>
                  <span>01010100 01000101</span>
                  <span>11000011 00010101</span>
                </div>
                <span className="assembly-visual-caption">TWO STATES / MANY MEANINGS</span>
              </div>

              <div className="assembly-visual assembly-visual-signal">
                <svg className="assembly-signal-chart" viewBox="0 0 480 260" role="img" aria-label="Oscilloscope chart showing analog and digital electrical signal traces">
                  <g className="signal-chart-grid">
                    <path d="M20 20H460 M20 64H460 M20 108H460 M20 152H460 M20 196H460 M20 240H460" />
                    <path d="M20 20V240 M108 20V240 M196 20V240 M284 20V240 M372 20V240 M460 20V240" />
                  </g>
                  <path className="signal-chart-axis" d="M20 240H460 M20 20V240" />
                  <path className="signal-trace signal-trace-analog" d="M20 134 C42 42 66 42 88 134 S134 226 156 134 S202 42 224 134 S270 226 292 134 S338 42 360 134 S406 226 428 134 S450 42 460 92" />
                  <path className="signal-trace signal-trace-digital" d="M20 206 H62 V62 H112 V206 H166 V62 H214 V206 H270 V62 H318 V206 H370 V62 H420 V206 H460" />
                  <circle className="signal-chart-dot" cx="318" cy="62" r="4" />
                </svg>
                <div className="signal-chart-readout"><span>3.3 V</span><span>1.00 ms</span><span>CH 01</span></div>
                <span className="assembly-visual-caption">VOLTAGE / TIME / OBSERVED</span>
              </div>

              <div className="assembly-visual assembly-visual-silicon">
                <div className="assembly-chip">
                  <span className="assembly-chip-pin pin-a" />
                  <span className="assembly-chip-pin pin-b" />
                  <span className="assembly-chip-pin pin-c" />
                  <span className="assembly-chip-pin pin-d" />
                  <div className="assembly-chip-core">Si</div>
                </div>
                <span className="assembly-visual-caption">PATTERNED CRYSTAL / CONTROLLED FLOW</span>
              </div>

              <div className="assembly-visual assembly-visual-sand">
                <div className="assembly-sand-window" />
                <span className="assembly-sand-label">SiO2</span>
                <span className="assembly-visual-caption">REFINED FROM THE ORDINARY</span>
              </div>
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
                  <div className="assembly-step-spec">
                    <span>{layer.material}</span>
                    <span aria-hidden="true">-&gt;</span>
                    <strong>{layer.output}</strong>
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
