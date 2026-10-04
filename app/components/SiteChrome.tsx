"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
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

function ProductCollection({
  className,
  tabIndex,
}: {
  className: string;
  tabIndex?: number;
}) {
  return (
    <div className={className}>
      <button
        className="product-link product-link-kala product-link-coming"
        type="button"
        title="Kala product link coming soon"
        aria-label="Kala by TEAM-PSMPV, link coming soon"
        tabIndex={tabIndex}
      >
        <Image src="/products/kala-black.png" alt="" width={512} height={225} loading="eager" unoptimized />
        <span>By TEAM-PSMPV</span>
      </button>
      <a
        className="product-link product-link-offlinetts"
        href="https://play.google.com/store/apps/details?id=com.psmpv.offlinetts"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="OfflineTTS on Google Play"
        tabIndex={tabIndex}
      >
        <Image src="/products/offlinetts-white.png" alt="" width={1024} height={1024} loading="eager" unoptimized />
        <span>OfflineTTS</span>
      </a>
      <a
        className="product-link product-link-leadforge"
        href="https://leadforge-crm.team-psmpv.workers.dev/login"
        target="_blank"
        rel="noopener noreferrer"
        tabIndex={tabIndex}
      >
        LeadForge
      </a>
      <a
        className="product-link product-link-appointflow"
        href="https://appointflow.teampsmpv.com/"
        target="_blank"
        rel="noopener noreferrer"
        tabIndex={tabIndex}
      >
        <Image src="/products/appointflow-mark.png" alt="" width={512} height={512} loading="eager" unoptimized />
        <span>AppointFlow</span>
      </a>
      <a
        className="product-link product-link-wordmark"
        href="https://visyn-console.teampsmpv.workers.dev/auth"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Visyn"
        tabIndex={tabIndex}
      >
        <Image src="/products/visyn-black.png" alt="Visyn" width={2400} height={998} loading="eager" unoptimized />
      </a>
      <button
        className="product-link product-link-wordmark product-link-coming"
        type="button"
        title="Precisyn product link coming soon"
        aria-label="Precisyn, link coming soon"
        tabIndex={tabIndex}
      >
        <Image src="/products/precisyn-black.png" alt="Precisyn" width={2400} height={860} loading="eager" unoptimized />
      </button>
      <a
        className="product-link product-link-template"
        href="https://team-psmpv-template-gallery.teampsmpv.workers.dev/"
        target="_blank"
        rel="noopener noreferrer"
        tabIndex={tabIndex}
      >
        <Image
          src="/brand/TEAM-PSMPV-MONOGRAM-BLACK.svg"
          alt=""
          width={44}
          height={44}
          loading="eager"
          unoptimized
        />
        <span>TemplateGallery</span>
      </a>
    </div>
  );
}

export function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);
  const mobileNav = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const isProtectedMedia = (target: EventTarget | null) =>
      target instanceof Element && Boolean(target.closest("img, picture, canvas, video"));
    const preventMediaAction = (event: Event) => {
      if (isProtectedMedia(event.target)) event.preventDefault();
    };

    document.addEventListener("contextmenu", preventMediaAction, true);
    document.addEventListener("dragstart", preventMediaAction, true);
    return () => {
      document.removeEventListener("contextmenu", preventMediaAction, true);
      document.removeEventListener("dragstart", preventMediaAction, true);
    };
  }, []);

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const focusable = Array.from(
      mobileNav.current?.querySelectorAll<HTMLElement>("a[href], button:not([disabled])") ?? [],
    );
    window.setTimeout(() => focusable[0]?.focus(), 80);
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        menuButton.current?.focus();
      }
      if (event.key === "Tab" && focusable.length) {
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          menuButton.current?.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          menuButton.current?.focus();
        } else if (event.shiftKey && document.activeElement === menuButton.current) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === menuButton.current) {
          event.preventDefault();
          first.focus();
        }
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
      <header className={`site-header ${scrolled ? "is-scrolled" : ""}`}>
        <nav className="product-rail" aria-label="TEAM-PSMPV products">
          <ProductCollection className="product-rail-scroll" />
        </nav>

        <div className="primary-header">
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
                  {pathname === item.href && (
                    <motion.span
                      className="nav-active-indicator"
                      layoutId="primary-nav-active"
                      transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                    />
                  )}
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
        </div>
      </header>

      <nav
        ref={mobileNav}
        id="mobile-nav"
        className={`mobile-nav ${open ? "is-open" : ""}`}
        aria-label="Mobile navigation"
        aria-hidden={!open}
      >
        <div className="mobile-nav-primary">
          {navigation.map((item, index) => (
            <motion.div
              className="mobile-nav-item"
              key={item.href}
              initial={false}
              animate={open ? { opacity: 1, x: 0 } : { opacity: 0, x: -14 }}
              transition={{ duration: 0.28, delay: open ? index * 0.045 : 0 }}
            >
              <Link
                href={item.href}
                aria-current={pathname === item.href ? "page" : undefined}
                tabIndex={open ? undefined : -1}
                onClick={() => setOpen(false)}
              >
                <span>0{index + 1}</span>
                {item.label}
              </Link>
            </motion.div>
          ))}
          <motion.div
            className="mobile-nav-item"
            initial={false}
            animate={open ? { opacity: 1, x: 0 } : { opacity: 0, x: -14 }}
            transition={{ duration: 0.28, delay: open ? navigation.length * 0.045 : 0 }}
          >
            <Link
              href="/contact-us"
              tabIndex={open ? undefined : -1}
              onClick={() => setOpen(false)}
            >
              Start a conversation ↗
            </Link>
          </motion.div>
        </div>
        <section className="mobile-product-panel" aria-label="TEAM-PSMPV products">
          <ProductCollection
            className="mobile-product-grid"
            tabIndex={open ? undefined : -1}
          />
        </section>
      </nav>

      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          className="route-shell"
          key={pathname}
          initial={reduceMotion ? false : { opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduceMotion ? undefined : { opacity: 0, y: -5 }}
          transition={{ duration: 0.26, ease: [0.22, 1, 0.36, 1] }}
        >
          {children}
        </motion.div>
      </AnimatePresence>

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
