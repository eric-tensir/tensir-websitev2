const FONT_HREF =
  "https://fonts.googleapis.com/css2?" +
  [
    "family=Exo+2:wght@700;800",
    "family=Saira:wght@600;700",
    "family=Saira+Condensed:wght@600;700",
    "family=Titillium+Web:wght@600;700",
    "family=Barlow:wght@600;700",
    "family=Barlow+Condensed:wght@600;700",
    "family=Rajdhani:wght@600;700",
    "family=Chakra+Petch:wght@600;700",
    "family=Orbitron:wght@700",
    "family=Oxanium:wght@700",
    "family=Audiowide",
    "family=Michroma",
    "family=Quantico:wght@700",
    "family=Syncopate:wght@700",
    "family=Unbounded:wght@700",
    "family=Syne:wght@700",
    "family=Outfit:wght@700",
    "family=Manrope:wght@700",
    "family=Space+Grotesk:wght@700",
    "family=IBM+Plex+Sans:wght@600;700",
    "family=Inter:wght@700",
    "family=Montserrat:wght@700",
    "family=Bebas+Neue",
    "family=Teko:wght@600;700",
    "family=Russo+One",
    "family=Bai+Jamjuree:wght@600;700",
    "family=Jura:wght@700",
    "family=Turret+Road:wght@700",
    "family=Aldrich",
    "family=Onest:wght@700",
  ].join("&") +
  "&display=swap";

export default function TypeTestLayout({ children }) {
  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link rel="stylesheet" href={FONT_HREF} />
      {children}
    </>
  );
}
