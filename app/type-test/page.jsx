import { TensirMark } from "../components/site";

// Temporary wordmark type bake-off. Pick a number / name; we'll lock it in.
// Faces loaded in ./layout.jsx via Google Fonts CSS.

const FACES = [
  { id: 1, name: "Exo 2", family: "'Exo 2', sans-serif", note: "tech geometric (current nav)" },
  { id: 2, name: "Saira", family: "'Saira', sans-serif", note: "modern product / enterprise" },
  { id: 3, name: "Saira Condensed", family: "'Saira Condensed', sans-serif", note: "tighter lockup" },
  { id: 4, name: "Titillium Web", family: "'Titillium Web', sans-serif", note: "clean tech corporate" },
  { id: 5, name: "Barlow", family: "'Barlow', sans-serif", note: "industrial grotesk" },
  { id: 6, name: "Barlow Condensed", family: "'Barlow Condensed', sans-serif", note: "compact industrial" },
  { id: 7, name: "Rajdhani", family: "'Rajdhani', sans-serif", note: "sharp geometric tech" },
  { id: 8, name: "Chakra Petch", family: "'Chakra Petch', sans-serif", note: "angular terminals" },
  { id: 9, name: "Orbitron", family: "'Orbitron', sans-serif", note: "square sci-fi" },
  { id: 10, name: "Oxanium", family: "'Oxanium', sans-serif", note: "gaming / compute" },
  { id: 11, name: "Audiowide", family: "'Audiowide', sans-serif", note: "wide display tech" },
  { id: 12, name: "Michroma", family: "'Michroma', sans-serif", note: "microgramma-like" },
  { id: 13, name: "Quantico", family: "'Quantico', sans-serif", note: "military angular" },
  { id: 14, name: "Syncopate", family: "'Syncopate', sans-serif", note: "ultra geometric wide" },
  { id: 15, name: "Unbounded", family: "'Unbounded', sans-serif", note: "bold contemporary" },
  { id: 16, name: "Syne", family: "'Syne', sans-serif", note: "distinctive display" },
  { id: 17, name: "Outfit", family: "'Outfit', sans-serif", note: "soft geometric" },
  { id: 18, name: "Manrope", family: "'Manrope', sans-serif", note: "refined modern" },
  { id: 19, name: "Space Grotesk", family: "'Space Grotesk', sans-serif", note: "site body face" },
  { id: 20, name: "IBM Plex Sans", family: "'IBM Plex Sans', sans-serif", note: "enterprise system" },
  { id: 21, name: "Inter", family: "'Inter', sans-serif", note: "neutral UI default" },
  { id: 22, name: "Montserrat", family: "'Montserrat', sans-serif", note: "geometric gotham-ish" },
  { id: 23, name: "Bebas Neue", family: "'Bebas Neue', sans-serif", note: "tall condensed display" },
  { id: 24, name: "Teko", family: "'Teko', sans-serif", note: "condensed tech" },
  { id: 25, name: "Russo One", family: "'Russo One', sans-serif", note: "blocky industrial" },
  { id: 26, name: "Bai Jamjuree", family: "'Bai Jamjuree', sans-serif", note: "clean geometric" },
  { id: 27, name: "Jura", family: "'Jura', sans-serif", note: "eurostile-adjacent" },
  { id: 28, name: "Turret Road", family: "'Turret Road', sans-serif", note: "angular mono-ish" },
  { id: 29, name: "Aldrich", family: "'Aldrich', sans-serif", note: "cut geometric" },
  { id: 30, name: "Onest", family: "'Onest', sans-serif", note: "contemporary grotesque" },
];

export const metadata = {
  title: "Tensir — type test",
  description: "Pick a wordmark face for Tensir.",
};

export default function TypeTestPage() {
  return (
    <>
      <main
        style={{
          minHeight: "100vh",
          background: "#000",
          color: "#fff",
          padding: "48px 24px 80px",
        }}
      >
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <p
            style={{
              fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
              fontSize: 11,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "rgba(154,158,176,0.9)",
              marginBottom: 12,
            }}
          >
            Temporary · type bake-off
          </p>
          <h1
            style={{
              fontFamily: "var(--font-display), system-ui, sans-serif",
              fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
              fontWeight: 600,
              marginBottom: 8,
            }}
          >
            Wordmark faces for Tensir
          </h1>
          <p style={{ color: "rgba(232,234,240,0.65)", marginBottom: 36, maxWidth: 520 }}>
            Tell me the number (or name) you like most. Shown uppercase, white, bold —
            same lockup energy as the nav mark.
          </p>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 16,
              marginBottom: 48,
              padding: "20px 24px",
              border: "1px solid rgba(255,255,255,0.12)",
              borderRadius: 8,
            }}
          >
            <TensirMark size={48} id="type-test" />
            <span style={{ color: "rgba(154,158,176,0.9)", fontSize: 13, fontFamily: "ui-monospace, monospace" }}>
              mark reference (weight target)
            </span>
          </div>

          <ol
            style={{
              listStyle: "none",
              padding: 0,
              margin: 0,
              display: "grid",
              gap: 1,
              background: "rgba(255,255,255,0.08)",
            }}
          >
            {FACES.map((face) => (
              <li
                key={face.id}
                style={{
                  background: "#000",
                  padding: "28px 24px",
                  display: "grid",
                  gridTemplateColumns: "48px 1fr",
                  gap: 20,
                  alignItems: "baseline",
                }}
              >
                <span
                  style={{
                    fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
                    fontSize: 12,
                    color: "rgba(154,158,176,0.9)",
                  }}
                >
                  {String(face.id).padStart(2, "0")}
                </span>
                <div>
                  <div
                    style={{
                      fontFamily: face.family,
                      fontWeight: 700,
                      fontSize: "clamp(2.25rem, 5vw, 3.5rem)",
                      lineHeight: 1,
                      letterSpacing: "0.04em",
                      textTransform: "uppercase",
                      color: "#fff",
                      marginBottom: 10,
                    }}
                  >
                    Tensir
                  </div>
                  <div
                    style={{
                      fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
                      fontSize: 11,
                      letterSpacing: "0.08em",
                      color: "rgba(154,158,176,0.85)",
                    }}
                  >
                    {face.name}
                    <span style={{ opacity: 0.55 }}> · {face.note}</span>
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </main>
    </>
  );
}
