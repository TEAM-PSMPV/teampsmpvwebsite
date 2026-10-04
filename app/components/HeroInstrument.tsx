export function HeroInstrument() {
  return (
    <aside className="hero-instrument" aria-label="Live computing signal instrument">
      <div className="hero-instrument-top">
        <span>STACK / 01</span>
        <span>FIELD OBSERVER</span>
      </div>
      <div className="hero-instrument-screen">
        <div className="hero-instrument-screen-top">
          <span>INPUT / SOFTWARE</span>
          <span>CH 01</span>
        </div>
        <svg viewBox="0 0 520 260" role="img" aria-label="Analog and digital voltage traces on a graph">
          <g className="hero-chart-grid">
            <path d="M20 20H500 M20 65H500 M20 110H500 M20 155H500 M20 200H500 M20 245H500" />
            <path d="M20 20V245 M116 20V245 M212 20V245 M308 20V245 M404 20V245 M500 20V245" />
          </g>
          <path className="hero-chart-axis" d="M20 245H500 M20 20V245" />
          <path className="hero-trace hero-trace-analog" d="M20 132 C42 42 66 42 88 132 S134 222 156 132 S202 42 224 132 S270 222 292 132 S338 42 360 132 S406 222 428 132 S474 42 500 112" />
          <path className="hero-trace hero-trace-digital" d="M20 202 H64 V64 H114 V202 H168 V64 H220 V202 H276 V64 H326 V202 H382 V64 H434 V202 H500" />
          <circle className="hero-chart-dot" cx="326" cy="64" r="5" />
        </svg>
        <div className="hero-instrument-readout">
          <strong>01001011</strong>
          <span>3.3 V</span>
          <span>1.00 ms</span>
        </div>
      </div>
      <div className="hero-instrument-bottom">
        <span>DATA</span>
        <span className="hero-instrument-pulse" aria-hidden="true" />
        <span>SIGNAL</span>
        <span className="hero-instrument-pulse warm" aria-hidden="true" />
        <span>MATTER</span>
      </div>
    </aside>
  );
}
