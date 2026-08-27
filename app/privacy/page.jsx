import { Shell, MONO, DISPLAY } from "../components/site";

export const metadata = { title: "Privacy — Tensir" };

export default function PrivacyPage() {
  return (
    <Shell>
      <section className="px-4 md:px-10 pt-28 md:pt-36 pb-24 max-w-2xl">
        <h1
          className="font-semibold tracking-tight"
          style={{ fontFamily: DISPLAY, fontSize: "clamp(2rem, 4.5vw, 3.25rem)" }}
        >
          Privacy
        </h1>
        <p className="mt-8 text-base leading-7 text-black/70" style={{ fontFamily: MONO }}>
          Contact submissions are used only to respond to demo and technical inquiries. We do not
          sell this information. For questions, write to{" "}
          <a href="mailto:eric@tensir.ai" className="underline underline-offset-4">
            eric@tensir.ai
          </a>
          .
        </p>
      </section>
    </Shell>
  );
}
