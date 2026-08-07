import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PixelSignal, Reveal } from "../components/Interactive";

export const metadata: Metadata = {
  title: "Products",
  description: "Real products built by TEAM-PSMPV, including OfflineTTS for Android.",
  alternates: { canonical: "/products" },
};

export default function ProductsPage() {
  return (
    <main id="main-content">
      <section className="page-hero content">
        <p className="eyebrow"><PixelSignal /> /INTERNAL INNOVATION</p>
        <h1>REAL PRODUCTS BUILT BY TEAM-PSMPV.</h1>
        <p className="page-lead">Only active product information is shown.</p>
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

        <Reveal className="reveal-soon technical-card">
          <p className="mono-label">/NEXT</p>
          <h2>OTHER PRODUCTS TO BE REVEALED SOON...</h2>
          <p>
            New products will appear here only when their public information, support
            channel and privacy documentation are ready.
          </p>
        </Reveal>
      </section>
    </main>
  );
}
