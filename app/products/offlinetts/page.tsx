import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PixelSignal } from "../../components/Interactive";

const playStoreUrl =
  "https://play.google.com/store/apps/details?id=com.psmpv.offlinetts";

export const metadata: Metadata = {
  title: "OfflineTTS",
  description:
    "OfflineTTS converts text into speech on-device after selected voice models are installed.",
  alternates: { canonical: "/products/offlinetts" },
};

export default function OfflineTTSPage() {
  return (
    <main id="main-content">
      <section className="page-hero content product-detail-hero">
        <p className="eyebrow"><PixelSignal /> /OFFLINETTS</p>
        <h1>UNCENSORED. NO INTERNET. NO LIMITS. JUST VOICE.</h1>
        <p className="page-lead">
          OfflineTTS converts text into speech on-device after selected voice models are installed.
        </p>
        <div className="button-row">
          <a className="cut-button" href={playStoreUrl} target="_blank" rel="noopener noreferrer">
            Get it on Google Play <span aria-hidden="true">↗</span>
          </a>
          <Link className="cut-button secondary" href="/products/offlinetts/privacy-policy">Privacy policy</Link>
        </div>
      </section>

      <section className="content offlinetts-download-section">
        <div className="offlinetts-download technical-card">
          <div className="offlinetts-download-copy">
            <Image
              className="offlinetts-app-icon"
              src="/products/offlinetts/app-icon-white-1024.png"
              alt="OfflineTTS app icon"
              width={1024}
              height={1024}
              unoptimized
            />
            <div>
              <p className="mono-label">/OFFLINETTS FOR ANDROID</p>
              <h2>NOW AVAILABLE ON GOOGLE PLAY STORE</h2>
              <p>Download OfflineTTS for private, on-device text-to-speech on Android.</p>
              <a className="cut-button" href={playStoreUrl} target="_blank" rel="noopener noreferrer">
                Download on Google Play <span aria-hidden="true">↗</span>
              </a>
            </div>
          </div>
          <a
            className="offlinetts-qr-link"
            href={playStoreUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Scan or open the QR code to download OfflineTTS from Google Play"
          >
            <Image
              src="/products/offlinetts/google-play-qr.png"
              alt="QR code to download OfflineTTS from Google Play"
              width={1000}
              height={1000}
              unoptimized
            />
            <span>SCAN TO DOWNLOAD</span>
          </a>
        </div>
      </section>

      <section className="content product-detail-grid section">
        <article className="technical-card">
          <p className="mono-label">/RELEASE STATUS</p>
          <h2>Android app for Google Play.</h2>
          <dl className="definition-list">
            <div><dt>Platform</dt><dd>Android</dd></div>
            <div><dt>Category</dt><dd>Utility / Productivity</dd></div>
            <div>
              <dt>Play Store link</dt>
              <dd>
                <a className="text-link" href={playStoreUrl} target="_blank" rel="noopener noreferrer">
                  Available now ↗
                </a>
              </dd>
            </div>
          </dl>
        </article>
        <article className="technical-card">
          <p className="mono-label">/FEATURES</p>
          <ul className="technical-list feature-list">
            <li>Offline text-to-speech after model setup.</li>
            <li>Install only the voices you need.</li>
            <li>On-device conversion for user text.</li>
            <li>Long-script support.</li>
            <li>No account required.</li>
          </ul>
        </article>
      </section>

      <section className="public-links dark-section compact-dark">
        <div className="content public-links-inner">
          <div>
            <p className="mono-label">/PUBLIC LINKS</p>
            <h2>LISTING, SUPPORT AND POLICY ACCESS.</h2>
          </div>
          <div className="public-link-list">
            <a href={playStoreUrl} target="_blank" rel="noopener noreferrer">
              Google Play Store <span>↗</span>
            </a>
            <Link href="/products/offlinetts/privacy-policy">Privacy Policy <span>↗</span></Link>
            <Link href="/products/offlinetts/support">Support Page <span>↗</span></Link>
            <a href="mailto:support@teampsmpv.com?subject=OfflineTTS%20Support">Email Support <span>↗</span></a>
          </div>
        </div>
      </section>
    </main>
  );
}
