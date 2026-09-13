import { products } from "../data";
import Image from "next/image";

export function ProductProof() {
  const supportingProducts = products.slice(1, 4);

  return (
    <section className="proof-section" aria-labelledby="proof-title">
      <div className="content">
        <div className="proof-intro">
          <div>
            <p className="eyebrow"><span className="proof-marker" aria-hidden="true" /> /SHIPPING, NOT SIGNALING</p>
            <h2 id="proof-title">IDEAS ARE MORE CONVINCING WHEN THEY HAVE A SURFACE.</h2>
          </div>
          <p>
            The stack matters because it ends in something usable. These are working product
            surfaces from the same system: focused tools with a name, a workflow and a door.
          </p>
        </div>

        <div className="proof-stage">
          <div className="proof-feature">
            <div className="proof-feature-header">
              <span>LEADFORGE / AUTH SURFACE</span>
              <span>LIVE SURFACE / 02</span>
            </div>
            <div className="proof-live-frame">
              <div className="proof-live-chrome" aria-hidden="true">
                <span /><span /><span />
                <b>leadforge-crm.team-psmpv.workers.dev</b>
              </div>
              <div className="proof-live-image-wrap">
                <Image
                  className="proof-live-image"
                  src="/images/leadforge-auth-surface.png"
                  alt="LeadForge sign-in surface"
                  fill
                  sizes="(max-width: 767px) 92vw, 58vw"
                />
              </div>
            </div>
            <div className="proof-feature-caption">
              <span>A real surface from the product system.</span>
              <a href={products[2].url} target="_blank" rel="noopener noreferrer">Open LeadForge <span aria-hidden="true">↗</span></a>
            </div>
          </div>

          <div className="proof-list">
            {supportingProducts.map((product, index) => (
              <a
                className="proof-list-item"
                href={product.url}
                key={product.id}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="proof-list-number">0{index + 1}</span>
                <span>
                  <strong>{product.name}</strong>
                  <small>{product.positioning}</small>
                </span>
                <span className="proof-list-arrow" aria-hidden="true">↗</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
