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
              <span>VISYN / AUTH SURFACE</span>
              <span>LIVE SURFACE / 02</span>
            </div>
            <div className="proof-live-frame">
              <div className="proof-live-chrome" aria-hidden="true">
                <span /><span /><span />
                <b>visyn-console.teampsmpv.workers.dev</b>
              </div>
              <div className="proof-live-image-wrap">
                <Image
                  className="proof-live-image"
                  src="/images/visyn-auth-surface.png"
                  alt="Visyn sign-in surface"
                  width={1280}
                  height={720}
                  priority
                  sizes="(max-width: 767px) 92vw, 58vw"
                />
              </div>
            </div>
            <div className="proof-evidence">
              <span><small>SURFACE</small><strong>AUTH / LIVE</strong></span>
              <span><small>PATH</small><strong>SIGN IN → WORKSPACE</strong></span>
              <span><small>STATE</small><strong>READY TO OPEN</strong></span>
            </div>
            <div className="proof-feature-caption">
              <span>A real surface from the product system.</span>
              <a href={products[4].url} target="_blank" rel="noopener noreferrer">Open Visyn <span aria-hidden="true">↗</span></a>
            </div>
          </div>

          <div className="proof-list">
            <a
              className="proof-gallery-surface"
              href={products[3].url}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src="/images/template-gallery-surface.png"
                alt="Template Gallery homepage"
                fill
                priority
                sizes="(max-width: 767px) 92vw, 31vw"
              />
              <span>Template Gallery / SHIPPED SURFACE <b aria-hidden="true">↗</b></span>
            </a>
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
