import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PixelSignal, Reveal } from "../components/Interactive";
import { ProductScreens } from "../components/PrecisionMotion";
import { SystemCore } from "../components/SystemCore";

export const metadata: Metadata = {
  title: "Products",
  description: "Real products built by TEAM-PSMPV, including OfflineTTS for Android.",
  alternates: { canonical: "/products" },
};

const publicProducts = [
  {
    name: "LeadForge",
    description: "A focused CRM workspace for lead and customer workflows.",
    href: "https://leadforge-crm.team-psmpv.workers.dev/login",
    className: "ecosystem-product-leadforge",
  },
  {
    name: "AppointFlow",
    description: "Appointment operations and booking workflows in one system.",
    href: "https://appointflow.teampsmpv.com/",
    image: "/products/appointflow-mark.png",
    className: "ecosystem-product-appointflow",
  },
  {
    name: "Visyn",
    description: "A visual console for connected product workflows.",
    href: "https://visyn-console.teampsmpv.workers.dev/auth",
    image: "/products/visyn-black.png",
    className: "ecosystem-product-visyn",
  },
  {
    name: "TemplateGallery",
    description: "A curated library of reusable digital templates.",
    href: "https://team-psmpv-template-gallery.teampsmpv.workers.dev/",
    image: "/brand/TEAM-PSMPV-MONOGRAM-BLACK.svg",
    className: "ecosystem-product-template",
  },
];

export default function ProductsPage() {
  return (
    <main id="main-content">
      <section className="page-hero page-hero-system content">
        <div>
          <p className="eyebrow"><PixelSignal /> /INTERNAL INNOVATION</p>
          <h1>REAL PRODUCTS BUILT BY TEAM-PSMPV.</h1>
          <p className="page-lead">Only active product information is shown.</p>
        </div>
        <SystemCore mode="product" />
      </section>

      <section className="section content product-catalog">
        <Reveal className="product-card technical-card">
          <div className="product-card-top">
            <p className="mono-label">/ANDROID • UTILITY / PRODUCTIVITY</p>
            <span className="product-mark">
              <Image
                src="/products/offlinetts/app-icon-white-1024.png"
                alt="OfflineTTS app icon"
                width={1024}
                height={1024}
                unoptimized
              />
            </span>
          </div>
          <div className="product-card-body">
            <h2>OfflineTTS</h2>
            <p className="lead-small">Private offline text-to-speech App for Android.</p>
            <ul className="technical-list">
              <li>No SignUp Required.</li>
              <li>Works offline after model setup.</li>
              <li>No ads. Completely Free.</li>
              <li>No Characters limit.</li>
              <li>Multiple Languages</li>
            </ul>
            <ProductScreens compact />
          </div>
          <div className="product-card-links">
            <a
              className="cut-button"
              href="https://play.google.com/store/apps/details?id=com.psmpv.offlinetts"
              target="_blank"
              rel="noopener noreferrer"
            >
              Google Play Store ↗
            </a>
            <Link className="cut-button" href="/products/offlinetts">Product page ↗</Link>
            <Link className="text-link" href="/products/offlinetts/privacy-policy">Privacy policy</Link>
            <Link className="text-link" href="/products/offlinetts/support">Support</Link>
          </div>
        </Reveal>

        <section className="product-directory" aria-labelledby="product-directory-title">
          <Reveal className="product-directory-heading">
            <p className="mono-label">/PRODUCT ECOSYSTEM</p>
            <h2 id="product-directory-title">EXPLORE THE SYSTEMS.</h2>
            <p>Public TEAM-PSMPV products, ready to open in their live environments.</p>
          </Reveal>
          <div className="product-directory-grid">
            {publicProducts.map((product) => (
              <Reveal className={`ecosystem-product ${product.className}`} key={product.name}>
                <a href={product.href} target="_blank" rel="noopener noreferrer">
                  <div className="ecosystem-product-mark" aria-hidden="true">
                    {product.image ? (
                      <Image
                        src={product.image}
                        alt=""
                        width={512}
                        height={512}
                        unoptimized
                        draggable={false}
                      />
                    ) : (
                      <strong>{product.name}</strong>
                    )}
                  </div>
                  <div>
                    <h3>{product.name}</h3>
                    <p>{product.description}</p>
                  </div>
                  <span className="ecosystem-product-action">Open product ↗</span>
                </a>
              </Reveal>
            ))}
          </div>
        </section>
      </section>
    </main>
  );
}
