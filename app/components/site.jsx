"use client";

import { createContext, useContext, useEffect, useState } from "react";

// ————————————————————————————————————————————
// TENSIR — shared shell (nav, footer, buttons, mark, contact context)
// Light theme: white ground, black ink, moon-gray / blue-purple cool accents.
// ————————————————————————————————————————————

// Fonts (layout.jsx via next/font): Space Grotesk body/display, Onest wordmark,
// IBM Plex Mono data accents.
export const MONO = "var(--font-mono), ui-monospace, SFMono-Regular, Menlo, monospace";
export const SANS = "var(--font-display), ui-sans-serif, system-ui, sans-serif";
export const DISPLAY = "var(--font-display), ui-sans-serif, sans-serif";
export const WORDMARK = "var(--font-wordmark), ui-sans-serif, system-ui, sans-serif";

export const BG = "#FFFFFF";
export const PANEL = "#F4F5F7";
// Site ink: dark primary for contrast on white; muted stays secondary.
export const INK_LIGHT = "#0B0B12";
export const INK_MUTED = "#5C6275";
export const INK_ON_ACCENT = "#FFFFFF";

// Tensir mark.
// Stone is all black. Wordmark: all black.
export const SHARD_DARK = "#000000";
export const SHARD = "#9BA3B8";
export const SHARD_BLACK = "#000000";
export const SHARD_WHITE = "#FFFFFF";

// Soft site accent (borders / quote bar); not used inside the mark.
export const FRAG = "#9A9EB0";

// Cracks, gaps, and the center hole are cut out via mask (black = removed),
// so the site background shows through.
export function TensirMark({ size = 28, id = "m" }) {
  const mask = `tensir-${id}`;
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Tensir"
    >
      <mask id={mask}>
        <rect width="100" height="100" fill="#fff" />
        <polygon points="90.1,57.1 78.7,71.6 66.6,84.7 22.9,83.3 13.2,64.0 35.4,29.3 64.3,17.9 87.2,18.9" fill="#000" />
        <polygon points="84.7,61.0 105.5,63.3 106.4,54.3 85.6,52.1" fill="#000" />
        <polygon points="72.0,71.8 101.7,96.7 107.5,89.8 77.7,64.9" fill="#000" />
        <polygon points="60.8,81.2 68.7,107.0 77.3,104.4 69.5,78.6" fill="#000" />
        <polygon points="23.7,76.6 -3.8,100.5 2.0,107.3 29.6,83.4" fill="#000" />
        <polygon points="17.0,58.5 -6.9,64.1 -4.8,72.9 19.1,67.2" fill="#000" />
        <polygon points="42.1,30.0 8.5,-7.5 1.8,-1.5 35.4,36.0" fill="#000" />
        <polygon points="67.7,23.7 73.5,-5.0 64.6,-6.8 58.9,21.9" fill="#000" />
        <polygon points="87.3,25.6 107.3,2.5 100.5,-3.4 80.5,19.7" fill="#000" />
      </mask>
      <g mask={`url(#${mask})`}>
        <rect width="100" height="100" fill={SHARD_DARK} />
      </g>
    </svg>
  );
}

// ————— Contact modal context (modal UI lands in the next pass) —————
const ContactCtx = createContext(() => {});
export const useContact = () => useContext(ContactCtx);

// ————— CTA button — mono, moon-gray fill on hover —————
export function Cta({ children, onClick, href, className = "" }) {
  const cls =
    "group inline-flex items-center gap-2.5 rounded-md border border-black/15 px-4 py-2.5 " +
    "text-xs uppercase tracking-[0.15em] whitespace-nowrap cursor-pointer " +
    "transition-[background-color,border-color,color] duration-150 ease-out " +
    "hover:border-[#9A9EB0] hover:bg-[#9A9EB0] hover:text-[#0B0B12] " +
    className;
  const arrow = (
    <svg
      width="13"
      height="13"
      viewBox="0 0 16 16"
      fill="none"
      className="text-[#9A9EB0] group-hover:text-[#0B0B12] transition-colors duration-150"
    >
      <path d="M2 8 H13 M9 3.5 L13.5 8 L9 12.5" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  );
  if (href) {
    return (
      <a href={href} className={cls.trim()} style={{ fontFamily: MONO, color: INK_LIGHT }}>
        {children}
        {arrow}
      </a>
    );
  }
  return (
    <button onClick={onClick} className={cls.trim()} style={{ fontFamily: MONO, color: INK_LIGHT }}>
      {children}
      {arrow}
    </button>
  );
}

// Compact header: logo + wordmark left, Get started right.
// On scroll, frosted fill + blur across the bar.
function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div
        className="flex items-center justify-between gap-4 pl-4 md:pl-10 pr-4 md:pr-10 pt-4 md:pt-5 pb-3 md:pb-4"
        style={{
          backgroundColor: scrolled ? "rgba(255,255,255,0.72)" : "transparent",
          backdropFilter: scrolled ? "blur(16px) saturate(1.1)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(16px) saturate(1.1)" : "none",
          transition:
            "background-color 280ms ease, backdrop-filter 280ms ease, -webkit-backdrop-filter 280ms ease",
        }}
      >
        <a href="/" className="flex items-center gap-3 md:gap-4 min-w-0">
          <span className="hidden sm:block"><TensirMark size={56} id="nav" /></span>
          <span
            className="text-3xl sm:text-4xl md:text-5xl font-semibold leading-none tracking-tight"
            style={{ fontFamily: WORDMARK, color: SHARD_BLACK }}
            aria-label="Tensir"
          >
            Tensir
          </span>
        </a>

        <Cta href="/#contact" className="shrink-0">
          Request a Demo
        </Cta>
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer className="border-t border-black/10">
      <div className="px-4 md:px-10 py-12 flex flex-col md:flex-row md:items-center justify-between gap-10">
        <TensirMark size={36} id="footer" />
        <nav
          className="flex flex-wrap items-center gap-6 text-[13px]"
          aria-label="Footer"
          style={{ fontFamily: MONO, color: "rgba(11,11,18,0.55)" }}
        >
          <a href="/mission" className="hover:opacity-100 opacity-90 transition-opacity duration-150" style={{ color: INK_LIGHT }}>
            Company
          </a>
          <a href="/#contact" className="hover:opacity-100 opacity-90 transition-opacity duration-150" style={{ color: INK_LIGHT }}>
            Contact
          </a>
          <a href="/careers" className="hover:opacity-100 opacity-90 transition-opacity duration-150" style={{ color: INK_LIGHT }}>
            Careers
          </a>
          <a href="/privacy" className="hover:opacity-100 opacity-90 transition-opacity duration-150" style={{ color: INK_LIGHT }}>
            Privacy
          </a>
        </nav>
        <div className="flex items-center gap-6 text-[13px]" style={{ fontFamily: MONO, color: "rgba(11,11,18,0.55)" }}>
          <a
            href="https://www.linkedin.com/company/tensir"
            aria-label="Tensir on LinkedIn"
            className="hover:opacity-100 opacity-90 transition-opacity duration-150"
            style={{ color: INK_LIGHT }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.36V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.55C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.72C24 .77 23.2 0 22.22 0z" />
            </svg>
          </a>
          <a
            href="https://x.com/TensirTech"
            aria-label="Tensir on X"
            className="hover:opacity-100 opacity-90 transition-opacity duration-150"
            style={{ color: INK_LIGHT }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
            </svg>
          </a>
        </div>
      </div>
      <div
        className="border-t border-black/10 px-4 md:px-10 py-4 text-[11px]"
        style={{ fontFamily: MONO, color: "rgba(11,11,18,0.4)" }}
      >
        © Tensir SASU. All rights reserved.
      </div>
    </footer>
  );
}

export function Shell({ children }) {
  const [contactOpen, setContactOpen] = useState(false);

  return (
    <ContactCtx.Provider value={() => setContactOpen(true)}>
      <div className="min-h-screen antialiased" style={{ backgroundColor: BG, color: INK_LIGHT, fontFamily: SANS }}>
        <Nav />
        <main>{children}</main>
        <Footer />
        {/* Contact modal mounts here in the next pass; contactOpen: {String(contactOpen)} */}
      </div>
    </ContactCtx.Provider>
  );
}
