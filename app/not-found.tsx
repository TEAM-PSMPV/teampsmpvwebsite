import Link from "next/link";

export default function NotFound() {
  return (
    <main id="main-content" className="not-found content">
      <p className="mono-label">/404</p>
      <h1>THIS ROUTE ISN&apos;T PART OF THE SYSTEM.</h1>
      <Link className="cut-button" href="/">Return home ↗</Link>
    </main>
  );
}
