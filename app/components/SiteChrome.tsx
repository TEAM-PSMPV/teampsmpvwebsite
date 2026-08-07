"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { navigation } from "../data";

function IndiaTime() {
  const [time, setTime] = useState("--:--");

  useEffect(() => {
    const update = () => {
      setTime(
        new Intl.DateTimeFormat("en-IN", {
          timeZone: "Asia/Kolkata",
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        }).format(new Date()),
      );
    };
    update();
    const interval = window.setInterval(update, 60_000);
    return () => window.clearInterval(interval);
  }, []);

  return <time aria-label={`Current time in India: ${time}`}>{time} IST</time>;
}

export function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        menuButton.current?.focus();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <>
      <header className="site-header">
        <div className="header-inner">
          <Link className="brand-link" href="/" aria-label="TEAM-PSMPV home">
            <Image
              src="/brand/TEAM-PSMPV-WORDMARK-BLACK-OUTLINED.svg"
              alt="TEAM-PSMPV"
              width={292}
              height={52}
              priority
            />
          </Link>
          <nav className="desktop-nav" aria-label="Primary navigation">
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                aria-current={pathname === item.href ? "page" : undefined}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <Link className="cut-button header-cta" href="/contact-us">
            Get in touch <span aria-hidden="true">↗</span>
          </Link>
          <button
            ref={menuButton}
            className="menu-button"
            type="button"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((value) => !value)}
          >
            <span />
            <span />
          </button>
        </div>
      </header>

      <nav
        id="mobile-nav"
        className={`mobile-nav ${open ? "is-open" : ""}`}
        aria-label="Mobile navigation"
        aria-hidden={!open}
      >
        {navigation.map((item, index) => (
          <Link
            key={item.href}
            href={item.href}
            aria-current={pathname === item.href ? "page" : undefined}
            tabIndex={open ? undefined : -1}
            onClick={() => setOpen(false)}
          >
            <span>0{index + 1}</span>
            {item.label}
          </Link>
        ))}
        <Link
          href="/contact-us"
          tabIndex={open ? undefined : -1}
          onClick={() => setOpen(false)}
        >
          Start a conversation ↗
        </Link>
      </nav>

      {children}

      <footer className="site-footer">
        <div className="content footer-top">
          <div className="footer-brand">
            <Image
              src="/brand/TEAM-PSMPV-LOCKUP-BLACK-OUTLINED.svg"
              alt="TEAM-PSMPV, engineering the essential, Precision Systems for Modern Products & Vision"
              width={430}
              height={84}
            />
            <p className="footer-registration">
              Registered MSME | Udyam Reg. No: UDYAM-UP-59-0114903
            </p>
          </div>
          <div className="footer-col">
            <p className="mono-label">/NAVIGATION</p>
            {navigation.map((item) => (
              <Link key={item.href} href={item.href}>
                {item.label}
              </Link>
            ))}
            <Link href="/contact-us">Contact</Link>
          </div>
          <div className="footer-col">
            <p className="mono-label">/CONTACT</p>
            <a href="mailto:support@teampsmpv.com">support@teampsmpv.com</a>
            <a href="tel:+918218501002">+91 8218501002</a>
            <span>Moradabad, Uttar Pradesh, India</span>
          </div>
          <div className="footer-col">
            <p className="mono-label">/SOCIAL</p>
            <a
              href="https://www.linkedin.com/company/teampsmpv/"
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn ↗
            </a>
            <a
              href="https://www.instagram.com/teampsmpv/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Instagram ↗
            </a>
            <a
              href="https://x.com/teampsmpv"
              target="_blank"
              rel="noopener noreferrer"
            >
              X ↗
            </a>
          </div>
        </div>
        <div className="content footer-bottom">
          <span>© {new Date().getFullYear()} TEAM-PSMPV</span>
          <span>PRECISION SYSTEMS FOR MODERN PRODUCTS & VISION</span>
          <IndiaTime />
        </div>
      </footer>
    </>
  );
}
