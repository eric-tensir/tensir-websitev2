"use client";

import { createContext, useContext, useState } from "react";

// ————————————————————————————————————————————
// TENSIR — shared shell (nav, footer, buttons, mark, contact context)
// Dark theme: near-black, light ink, crimson accent only.
// ————————————————————————————————————————————

// Two-font system (loaded in layout.jsx via next/font): Space Grotesk for
// display and body, IBM Plex Mono for data/code accents (labels, kickers).
export const MONO = "var(--font-mono), ui-monospace, SFMono-Regular, Menlo, monospace";
export const SANS = "var(--font-display), ui-sans-serif, system-ui, sans-serif";
export const DISPLAY = "var(--font-display), ui-sans-serif, sans-serif";

export const BG = "#000000";
export const PANEL = "#0A0A0A";
export const INK_LIGHT = "#F2F1ED";

// Tensir mark — master geometry. Shard palette brightened for the dark bg;
// FRAG remains the site-wide crimson accent used outside the mark.
export const SHARD_DARK = "#8A2B22";
export const SHARD = "#E05548";
export const FRAG = "#CB433A";

// Cracks, gaps, and the center hole are cut out via mask (black = removed),
// so the site background shows through — nothing is painted white.
export function TensirMark({ size = 28, id = "m" }) {
  const mask = `tensir-${id}`;
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" aria-label="Tensir">
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
        <polygon points="22.9,83.3 3.6,100.0 0.0,100.0 0.0,67.1 13.2,64.0" fill={SHARD} />
        <polygon points="13.2,64.0 0.0,67.1 0.0,0.0 9.2,0.0 35.4,29.3" fill={SHARD} />
        <polygon points="35.4,29.3 9.2,0.0 67.9,0.0 64.3,17.9" fill={SHARD} />
        <polygon points="64.3,17.9 67.9,0.0 100.0,0.0 100.0,4.1 87.2,18.9" fill={SHARD} />
      </g>
    </svg>
  );
}

// Custom shard wordmark — invented letterforms (not a font).
// Same language as the mark: irregular facets, dual crimson, sharp cuts,
// no curves, slight crack notches. Mark SVG geometry is never altered.
export function TensirWordmark({ height = 52, className = "" }) {
  // Cap y≈8–12, base y≈90–92. ~56-wide cells, 12 gap. Total 396.
  const w = 396;
  const h = 100;
  return (
    <svg
      className={"tensir-wordmark select-none " + className}
      width={(height * w) / h}
      height={height}
      viewBox={`0 0 ${w} ${h}`}
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      role="img"
    >
      <title>Tensir</title>

      {/* —— T —— broken crystal bar; stem with facet plane */}
      <g>
        {/* body */}
        <polygon
          fill={SHARD_DARK}
          points="0,14 18,8 48,10 56,16 54,30 38,32 40,88 34,92 16,90 14,32 2,28"
        />
        {/* top plane */}
        <polygon fill={SHARD} points="0,14 18,8 48,10 56,16 52,24 4,26" />
        {/* stem face */}
        <polygon fill={SHARD} points="16,48 38,46 40,88 34,92 16,90" />
        {/* crack notch under bar (void to bg) */}
        <polygon fill="#000" points="22,28 32,26 30,36 24,36" />
      </g>

      {/* —— E —— open right; three shard bars; spine with cut */}
      <g transform="translate(68,0)">
        <polygon
          fill={SHARD_DARK}
          points="2,10 48,8 54,14 52,28 20,30 20,42 42,40 46,46 44,56 20,58 20,74 52,72 56,80 52,90 0,92 4,78 4,16"
        />
        <polygon fill={SHARD} points="2,10 48,8 54,14 50,22 4,24" />
        <polygon fill={SHARD} points="20,40 42,38 44,54 20,56" />
        <polygon fill={SHARD} points="4,74 52,72 56,80 52,90 0,92 4,84" />
        <polygon fill="#000" points="6,60 14,58 12,68 8,68" />
      </g>

      {/* —— N —— twin irregular pillars + diagonal fracture bridge */}
      <g transform="translate(136,0)">
        <polygon fill={SHARD_DARK} points="0,12 16,8 22,14 20,88 14,92 2,90" />
        <polygon fill={SHARD_DARK} points="38,10 54,8 58,14 54,90 40,92 36,86" />
        <polygon fill={SHARD} points="12,16 20,10 48,76 40,84" />
        <polygon fill={SHARD} points="0,12 16,8 22,14 18,28 2,30" />
        <polygon fill={SHARD} points="40,64 56,62 54,90 40,92" />
      </g>

      {/* —— S —— stepped fracture S; angular bowls, no curves */}
      <g transform="translate(208,0)">
        <polygon
          fill={SHARD_DARK}
          points="
            10,8 46,10 54,16 52,30 22,32 20,42
            48,40 56,48 54,86 46,92 8,90 2,82 4,70
            34,72 36,62 8,60 2,52 4,18 10,8
          "
        />
        <polygon fill={SHARD} points="10,8 46,10 54,16 50,24 8,22" />
        <polygon fill={SHARD} points="20,40 48,38 52,50 22,52" />
        <polygon fill={SHARD} points="4,70 34,72 34,84 8,90 2,82" />
      </g>

      {/* —— I —— single crystal column, beveled head/foot + mid crack */}
      <g transform="translate(278,0)">
        <polygon fill={SHARD_DARK} points="2,10 18,8 24,14 22,86 16,92 0,90 0,84 4,16" />
        <polygon fill={SHARD} points="2,10 18,8 24,14 20,26 4,28" />
        <polygon fill={SHARD} points="0,68 22,66 22,86 16,92 0,90" />
        <polygon fill="#000" points="8,46 18,44 16,54 10,54" />
      </g>

      {/* —— R —— spine + broken angular bowl + kick leg shard */}
      <g transform="translate(316,0)">
        <polygon fill={SHARD_DARK} points="0,10 16,8 22,14 20,90 4,92 2,86" />
        <polygon
          fill={SHARD_DARK}
          points="14,10 48,12 56,20 52,40 42,50 16,48"
        />
        <polygon fill={SHARD_DARK} points="26,48 44,52 58,88 50,92 36,90 24,62" />
        <polygon fill={SHARD} points="0,10 16,8 22,14 18,28 2,30" />
        <polygon fill={SHARD} points="14,10 48,12 54,20 50,24 16,22" />
        <polygon fill={SHARD} points="32,58 44,52 58,88 50,90" />
        <polygon fill="#000" points="26,40 34,38 32,48 24,48" />
      </g>
    </svg>
  );
}

// ————— Contact modal context (modal UI lands in the next pass) —————
const ContactCtx = createContext(() => {});
export const useContact = () => useContext(ContactCtx);

// ————— CTA button — mono, hairline border, crimson arrow, crimson fill on hover —————
export function Cta({ children, onClick, href }) {
  const cls =
    "group inline-flex items-center gap-2.5 rounded-md border border-white/25 px-4 py-2.5 " +
    "text-xs uppercase tracking-[0.15em] text-white whitespace-nowrap cursor-pointer " +
    "transition-colors duration-150 ease-out hover:border-[#CB433A] hover:bg-[#CB433A] hover:text-[#0B0F13]";
  const arrow = (
    <svg
      width="13"
      height="13"
      viewBox="0 0 16 16"
      fill="none"
      className="text-[#CB433A] group-hover:text-[#0B0F13] transition-colors duration-150"
    >
      <path d="M2 8 H13 M9 3.5 L13.5 8 L9 12.5" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  );
  if (href) {
    return (
      <a href={href} className={cls} style={{ fontFamily: MONO }}>
        {children}
        {arrow}
      </a>
    );
  }
  return (
    <button onClick={onClick} className={cls} style={{ fontFamily: MONO }}>
      {children}
      {arrow}
    </button>
  );
}

// Logo-only top bar — pure one-page scroll, no top navigation links.
function Nav() {
  return (
    <header
      className="sticky top-0 z-50 border-b border-white/10 backdrop-blur-md"
      style={{ backgroundColor: "rgba(0,0,0,0.88)" }}
    >
      <div className="flex items-center px-4 md:px-10 h-[76px]">
        <a href="/" className="flex items-center gap-4 md:gap-5" aria-label="Tensir home">
          <TensirMark size={64} id="nav" />
          <TensirWordmark height={52} />
        </a>
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer className="border-t border-white/10">
      <div className="px-4 md:px-10 py-12 flex flex-col md:flex-row md:items-center justify-between gap-10">
        <TensirMark size={36} id="footer" />
        <div className="flex items-center gap-6 text-[13px] text-white/60" style={{ fontFamily: MONO }}>
          <a
            href="https://www.linkedin.com/company/tensir"
            aria-label="Tensir on LinkedIn"
            className="hover:text-white transition-colors duration-150"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.36V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.55C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.72C24 .77 23.2 0 22.22 0z" />
            </svg>
          </a>
          {/* TODO(eric): confirm Instagram / X handles once the accounts exist. */}
          <a
            href="https://www.instagram.com/tensir"
            aria-label="Tensir on Instagram"
            className="hover:text-white transition-colors duration-150"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zm0 10.162a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
            </svg>
          </a>
          <a
            href="https://x.com/tensir"
            aria-label="Tensir on X"
            className="hover:text-white transition-colors duration-150"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
            </svg>
          </a>
        </div>
      </div>
      <div
        className="border-t border-white/10 px-4 md:px-10 py-4 text-[11px] text-white/35"
        style={{ fontFamily: MONO }}
      >
        © Tensir SASU. All rights reserved.
      </div>
    </footer>
  );
}

export function Shell({ children, heroOverlap = false }) {
  const [contactOpen, setContactOpen] = useState(false);

  return (
    <ContactCtx.Provider value={() => setContactOpen(true)}>
      <div className="min-h-screen antialiased" style={{ backgroundColor: BG, color: INK_LIGHT, fontFamily: SANS }}>
        <Nav />
        <main className={heroOverlap ? "-mt-[76px]" : ""}>{children}</main>
        <Footer />
        {/* Contact modal mounts here in the next pass; contactOpen: {String(contactOpen)} */}
      </div>
    </ContactCtx.Provider>
  );
}
