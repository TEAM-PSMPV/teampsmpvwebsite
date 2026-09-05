import Link from "next/link";

export const visynDetails = {
  legalEntity: "TEAM-PSMPV",
  address: "Moradabad, Uttar Pradesh, India",
  country: "India",
  email: "support@teampsmpv.com",
  supportUrl: "/products/visyn/support",
  supportHours: "Email support; response times vary by request and severity.",
  updated: "2026-09-05",
};

export function VisynLegalHero({ label, title, lead }: { label: string; title: string; lead: string }) {
  return (
    <section className="legal-hero content">
      <p className="mono-label">/{label}</p>
      <h1>{title}</h1>
      <p className="page-lead">{lead}</p>
    </section>
  );
}

export function VisynLegalActions() {
  return (
    <div className="legal-actions">
      <Link className="cut-button" href="/products/visyn/support">Contact support ↗</Link>
      <Link className="text-link" href="/products/visyn/privacy-policy">Privacy policy</Link>
      <Link className="text-link" href="/products/visyn/terms">Terms of service</Link>
    </div>
  );
}

export function VisynContactBlock({ privacy = false }: { privacy?: boolean }) {
  return (
    <>
      <p>
        {privacy ? "For privacy questions:" : "For questions about Visyn:"}
      </p>
      <p>
        <strong>{visynDetails.legalEntity}</strong><br />
        <a href={`mailto:${visynDetails.email}`}>{visynDetails.email}</a><br />
        {visynDetails.address}
      </p>
    </>
  );
}

export function BulletList({ items }: { items: string[] }) {
  return (
    <ul>
      {items.map((item) => <li key={item}>{item}</li>)}
    </ul>
  );
}

export function NumberedList({ items }: { items: string[] }) {
  return (
    <ol>
      {items.map((item) => <li key={item}>{item}</li>)}
    </ol>
  );
}
