"use client";

import { useEffect, useRef, useState } from "react";
import { Shell, Cta, MONO, DISPLAY, FRAG, PANEL } from "./components/site";

// ————————————————————————————————————————————
// TENSIR — landing (one-page scroll)
// Dark, full-bleed, freeform-grade rhythm. Crimson accent only.
// Logo lives in Shell — do not touch it.
// ————————————————————————————————————————————

const t = {
  sub: "Compute logistics for chemistry R&D",
  sectionTitle: "Core concepts of Tensir",
  heads: ["Build pipelines", "Assemble compute", "Forecast budget", "Trace provenance", "Deploy workflows"],
  bodies: [
    "custom sequence to answer this : do we keep working on this compound or trash it ??",
    "qpu, gpu, tpu — cloud, on prem, air gapped. one view of the whole arena.",
    "money, cash, the burn. chemistry compute is expensive, see exactly where it goes !",
    "the biography, the records, the life story.",
    null, // Deploy workflows — a sketch-language arrow renders instead of copy
  ],
  materialsUmbrella: "Materials & Molecular Systems",
  materialTypes: [
    "metallodrugs",
    "catalysts",
    "crystalline",
    "alloys",
    "f-elements",
    "excited organics",
    "porous frameworks",
    "battery interfaces",
  ],
  industries: [
    {
      name: "Energy",
      body:
        "Powering a thriving civilization: advanced solar materials, next-generation batteries and storage systems, safer fission fuels, and fusion reactor components.",
    },
    {
      name: "Space Exploration",
      body:
        "Building humanity’s multi-planetary future: reusable rocket engines and heat shields, lightweight radiation-shielding habitats, in-situ resource utilization on the Moon and Mars, and durable solar arrays for deep space.",
    },
    {
      name: "Semiconductors & Computing",
      body:
        "Pushing the frontiers of silicon and beyond: new gate dielectrics and channel materials for sub-1 nm nodes, dopant diffusion and defect engineering, thermal interface materials, and materials for scalable quantum processors.",
    },
    {
      name: "Robotics & Advanced Machines",
      body:
        "Creating stronger, lighter, and more capable machines: rare-earth-free permanent magnets and high-performance actuators, lightweight structural alloys and composites, soft robotics materials, and neural-interface electrode materials.",
    },
    {
      name: "Human Health & Longevity",
      body:
        "Advancing therapies that heal and extend human life: precision metallodrugs and organometallic catalysts, next-generation antibiotics, protein-degrader molecules, regenerative medicine materials, and anti-aging compounds.",
    },
    {
      name: "Sustainable Materials & Planetary Solutions",
      body:
        "Healing the planet while feeding and housing humanity: carbon capture materials (MOFs, porous frameworks), next-generation fertilizers and green ammonia catalysts that feed billions with lower emissions, low-carbon cement and construction materials, recyclable plastics and packaging, and green chemistry catalysts.",
    },
  ],
  quote: "“Some interesting things happen once fragments are able to stack.”",
  founder: "Eric — Founder, Tensir",
};

// Hand sketches — white strokes on #0B0F13, pre-matched to the site bg.
// Order follows t.heads.
const SKETCHES = [
  "/sketches/02_gates_v1_white_on_dark.png",
  "/sketches/03_molecule_v1_white_on_dark.png",
  "/sketches/04_budget_v1_white_on_dark.png",
  "/sketches/01_pipeline_v1_white_on_dark.png",
  "/sketches/05_hierarchy_v1_white_on_dark.png",
];

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const inputCls =
  "w-full rounded-md border border-white/15 bg-[#10151B] px-4 py-3 text-[15px] text-white " +
  "placeholder:text-white/25 outline-none transition-colors duration-150 focus:border-[#CB433A]";

// Hand-drawn-style arrow — same visual language as the sketches.
function SketchArrow() {
  return (
    <svg width="220" height="64" viewBox="0 0 220 64" fill="none" aria-hidden="true">
      <path
        d="M6 38 C 48 30, 96 27, 148 29 C 168 30, 188 31, 206 33"
        stroke="#EDEDED"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <path
        d="M182 14 C 191 21, 199 27, 206 33 C 196 36, 186 42, 178 50"
        stroke="#EDEDED"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

// ————— Expandable door band — smooth grid-rows height animation —————
function Door({ label, children }) {
  const [open, setOpen] = useState(false);
  return (
    <section className="border-t border-white/10">
      <button
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="group w-full right-axis-row px-4 md:px-10 py-10 md:py-14 text-left cursor-pointer"
      >
        <span className="flex items-center justify-between gap-6">
          <span
            className={
              "text-[1.75rem] md:text-[2.5rem] font-semibold tracking-tight leading-tight transition-colors duration-150 " +
              (open ? "text-[#CB433A]" : "group-hover:text-[#CB433A]")
            }
            style={{ fontFamily: DISPLAY }}
          >
            {label}
          </span>
          <span
            className={
              "shrink-0 flex items-center justify-center w-11 h-11 md:w-13 md:h-13 rounded-md border transition-all duration-300 " +
              (open ? "border-[#CB433A] rotate-180" : "border-white/20 group-hover:border-[#CB433A]")
            }
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-[#CB433A]">
              <path d="M3 5.5 L8 10.5 L13 5.5" stroke="currentColor" strokeWidth="1.8" />
            </svg>
          </span>
        </span>
      </button>
      <div
        className="grid transition-[grid-template-rows] duration-500 ease-in-out"
        style={{ gridTemplateRows: open ? "1fr" : "0fr" }}
      >
        <div className="overflow-hidden min-h-0">
          <div className="right-axis-row px-4 md:px-10 pb-12 md:pb-16">
            <div>{children}</div>
          </div>
        </div>
      </div>
    </section>
  );
}

function DoorTeaser({ children }) {
  return (
    <p className="text-sm md:text-base leading-6 text-white/50 max-w-xl" style={{ fontFamily: MONO }}>
      {children}
    </p>
  );
}

function Field({ label, error, sentence, children }) {
  return (
    <div>
      <label
        className={
          sentence
            ? "block mb-3 text-sm leading-6 text-white/70"
            : "block mb-2 text-[11px] uppercase tracking-[0.2em] text-white/45"
        }
        style={{ fontFamily: MONO }}
      >
        {label}
      </label>
      {children}
      {error && (
        <p className="mt-2 text-xs text-[#CB433A]" style={{ fontFamily: MONO }}>
          {error}
        </p>
      )}
    </div>
  );
}

// Contact at bottom — toggle between Contact and Careers.
function ContactSection() {
  const [mode, setMode] = useState("contact"); // contact | careers
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    message: "",
    cashEquity: "",
    role: "",
    whiteboard: "",
  });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error
  const taRef = useRef(null);

  const set = (key) => (e) => {
    setForm((f) => ({ ...f, [key]: e.target.value }));
    setErrors((errs) => ({ ...errs, [key]: undefined }));
  };

  const switchMode = (next) => {
    setMode(next);
    setStatus("idle");
    setErrors({});
  };

  const autogrow = () => {
    const el = taRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${el.scrollHeight}px`;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const errs = {};
    if (!form.firstName.trim()) errs.firstName = "required";
    if (!form.lastName.trim()) errs.lastName = "required";
    if (!EMAIL_RE.test(form.email)) errs.email = "that doesn't look like an email";

    if (mode === "contact") {
      if (!form.message.trim()) errs.message = "required";
    } else {
      if (!form.cashEquity.trim()) errs.cashEquity = "required — a one-liner is fine";
      if (!form.role.trim()) errs.role = "required — a one-liner is fine";
      if (!form.whiteboard.trim()) errs.whiteboard = "the whiteboard is the application — it can't be blank";
    }

    setErrors(errs);
    if (Object.keys(errs).length) return;

    setStatus("sending");
    try {
      const endpoint = mode === "contact" ? "/api/contact" : "/api/careers";
      const body =
        mode === "contact"
          ? {
              firstName: form.firstName,
              lastName: form.lastName,
              email: form.email,
              message: form.message,
            }
          : {
              firstName: form.firstName,
              lastName: form.lastName,
              email: form.email,
              cashEquity: form.cashEquity,
              role: form.role,
              whiteboard: form.whiteboard,
            };
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      setStatus(res.ok ? "sent" : "error");
    } catch {
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="border-t border-white/10">
      <div className="px-4 md:px-10 pt-16 md:pt-24 pb-6">
        <h2
          className="font-semibold tracking-tight"
          style={{ fontFamily: DISPLAY, fontSize: "clamp(2rem, 4.5vw, 3rem)" }}
        >
          Get in touch
        </h2>
        <div className="mt-8 inline-flex rounded-md border border-white/15 p-1" role="tablist" aria-label="Contact mode">
          {[
            { id: "contact", label: "Contact" },
            { id: "careers", label: "Careers" },
          ].map((tab) => {
            const active = mode === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => switchMode(tab.id)}
                className={
                  "px-5 py-2.5 text-xs uppercase tracking-[0.18em] rounded-[5px] transition-colors duration-150 " +
                  (active ? "bg-[#CB433A] text-[#0B0F13]" : "text-white/55 hover:text-white")
                }
                style={{ fontFamily: MONO }}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      <div className="px-4 md:px-10 pb-20 md:pb-28">
        <div className="max-w-3xl">
          {status === "sent" ? (
            <div className="rounded-md border p-8 md:p-10" style={{ borderColor: FRAG, backgroundColor: PANEL }}>
              <p className="text-sm text-[#CB433A]" style={{ fontFamily: MONO }}>
                [ received ]
              </p>
              <p className="mt-4 text-base md:text-lg leading-7 text-white/80" style={{ fontFamily: MONO }}>
                {mode === "careers"
                  ? "we read every whiteboard. if it resonates, you'll hear from eric directly."
                  : "thanks — we'll get back to you soon."}
              </p>
            </div>
          ) : (
            <form onSubmit={onSubmit} noValidate>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Field label="First name" error={errors.firstName}>
                  <input
                    className={inputCls}
                    value={form.firstName}
                    onChange={set("firstName")}
                    autoComplete="given-name"
                  />
                </Field>
                <Field label="Last name" error={errors.lastName}>
                  <input
                    className={inputCls}
                    value={form.lastName}
                    onChange={set("lastName")}
                    autoComplete="family-name"
                  />
                </Field>
                <div className="md:col-span-2">
                  <Field label="Email" error={errors.email}>
                    <input
                      className={inputCls}
                      type="email"
                      value={form.email}
                      onChange={set("email")}
                      autoComplete="email"
                    />
                  </Field>
                </div>
              </div>

              {mode === "contact" ? (
                <div className="mt-8">
                  <Field label="Message" error={errors.message}>
                    <textarea
                      rows={6}
                      value={form.message}
                      onChange={set("message")}
                      className={`${inputCls} resize-y leading-7`}
                      style={{ fontFamily: MONO }}
                      placeholder="[USER WILL WRITE THIS TEXT]"
                    />
                  </Field>
                </div>
              ) : (
                <>
                  <div className="mt-12 space-y-10">
                    <Field
                      label="cash vs. equity — what's your preference and why?"
                      error={errors.cashEquity}
                      sentence
                    >
                      <textarea
                        rows={3}
                        value={form.cashEquity}
                        onChange={set("cashEquity")}
                        className={`${inputCls} resize-none leading-7`}
                        style={{ fontFamily: MONO }}
                      />
                    </Field>
                    <Field label="define your own role. what would you do at tensir?" error={errors.role} sentence>
                      <textarea
                        rows={3}
                        value={form.role}
                        onChange={set("role")}
                        className={`${inputCls} resize-none leading-7`}
                        style={{ fontFamily: MONO }}
                      />
                    </Field>
                  </div>
                  <div className="mt-12">
                    <p className="text-sm leading-6 text-white/70" style={{ fontFamily: MONO }}>
                      write anything you want about yourself. we read everything.
                    </p>
                    <textarea
                      ref={taRef}
                      rows={10}
                      value={form.whiteboard}
                      onChange={(e) => {
                        set("whiteboard")(e);
                        autogrow();
                      }}
                      placeholder="the whiteboard is yours."
                      className={`${inputCls} mt-5 resize-none overflow-hidden leading-7`}
                      style={{ fontFamily: MONO }}
                    />
                    {errors.whiteboard && (
                      <p className="mt-2 text-xs text-[#CB433A]" style={{ fontFamily: MONO }}>
                        {errors.whiteboard}
                      </p>
                    )}
                  </div>
                </>
              )}

              <div className="mt-10 flex items-center gap-6">
                <button
                  type="submit"
                  disabled={status === "sending"}
                  className={
                    "group inline-flex items-center gap-2.5 rounded-md border border-white/25 px-4 py-2.5 " +
                    "text-xs uppercase tracking-[0.15em] text-white whitespace-nowrap cursor-pointer " +
                    "transition-colors duration-150 ease-out hover:border-[#CB433A] hover:bg-[#CB433A] hover:text-[#0B0F13] " +
                    "disabled:opacity-40 disabled:pointer-events-none"
                  }
                  style={{ fontFamily: MONO }}
                >
                  {status === "sending" ? "Sending…" : mode === "careers" ? "Send it" : "Send message"}
                  <svg
                    width="13"
                    height="13"
                    viewBox="0 0 16 16"
                    fill="none"
                    className="text-[#CB433A] group-hover:text-[#0B0F13] transition-colors duration-150"
                  >
                    <path d="M2 8 H13 M9 3.5 L13.5 8 L9 12.5" stroke="currentColor" strokeWidth="1.8" />
                  </svg>
                </button>
                {status === "error" && (
                  <p className="text-xs text-[#CB433A]" style={{ fontFamily: MONO }}>
                    something broke on our side — try again in a minute
                  </p>
                )}
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

export default function TensirLanding() {
  return (
    <Shell heroOverlap>
      <Landing />
    </Shell>
  );
}

function Landing() {
  const [loaded, setLoaded] = useState(false);
  const [videoOk, setVideoOk] = useState(false);

  useEffect(() => {
    const tm = setTimeout(() => setLoaded(true), 60);
    return () => clearTimeout(tm);
  }, []);

  return (
    <>
      {/* ————— HERO — full-viewport video at top ————— */}
      <section className="relative flex flex-col min-h-[100svh]">
        <div className="absolute inset-0" style={{ backgroundColor: "#090D11" }}>
          {/* Video: drop /public/hero.mp4 when ready. Grid shows until video can play. */}
          <video
            autoPlay
            muted
            loop
            playsInline
            src="/hero.mp4"
            className={
              "absolute inset-0 w-full h-full object-cover transition-opacity duration-700 " +
              (videoOk ? "opacity-100" : "opacity-0")
            }
            onCanPlay={() => setVideoOk(true)}
            onError={() => setVideoOk(false)}
          />
          {!videoOk && (
            <div
              className="absolute inset-0"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(0deg, rgba(255,255,255,0.035) 0 1px, transparent 1px 32px)," +
                  "repeating-linear-gradient(90deg, rgba(255,255,255,0.035) 0 1px, transparent 1px 32px)",
              }}
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <span
                  className="text-xs tracking-widest uppercase text-white/30 px-6 text-center"
                  style={{ fontFamily: MONO }}
                >
                  [ 30s product capture — autoplay muted loop ]
                </span>
              </div>
            </div>
          )}
          <span
            className="absolute top-[92px] left-4 md:left-10 flex items-center gap-2 text-[10px] text-white/40"
            style={{ fontFamily: MONO }}
          >
            <span className="inline-block w-2 h-2 rounded-full" style={{ background: FRAG }} />
            REC
          </span>
          <span
            className="absolute top-[92px] right-4 md:right-10 text-[10px] text-white/40"
            style={{ fontFamily: MONO }}
          >
            00:30
          </span>
        </div>
      </section>

      {/* ————— HEADLINE — right after hero video ————— */}
      <section className="border-t border-white/10">
        <div
          className="px-4 md:px-10 py-16 md:py-24"
          style={{
            opacity: loaded ? 1 : 0,
            transform: loaded ? "none" : "translateY(10px)",
            transition: "opacity 700ms ease, transform 700ms ease",
          }}
        >
          <h1
            className="font-semibold leading-[1.02] max-w-5xl"
            style={{ fontFamily: DISPLAY, fontSize: "clamp(2.75rem, 7vw, 5.5rem)", letterSpacing: "-0.02em" }}
          >
            Assemble compute for chemistry.
          </h1>
        </div>
      </section>

      {/* ————— CORE CONCEPTS ————— */}
      <section className="border-t border-white/10">
        <div className="px-4 md:px-10 py-8 md:py-10 border-b border-white/10">
          <h2 className="text-2xl md:text-[2rem] font-semibold tracking-tight" style={{ fontFamily: DISPLAY }}>
            {t.sectionTitle}
          </h2>
        </div>
        <div>
          {t.heads.map((head, i) => (
            <div
              key={head}
              className="relative flex flex-col md:flex-row md:items-center border-b border-white/10 last:border-b-0"
            >
              <div className="flex-1 min-w-0 px-4 md:px-10 pt-8 md:py-12">
                <span className="text-xs uppercase tracking-[0.2em] text-white/45" style={{ fontFamily: MONO }}>
                  {head}
                </span>
                {t.bodies[i] ? (
                  <p className="mt-4 text-lg md:text-[1.375rem] font-medium leading-[1.45] tracking-tight text-white/90 max-w-2xl">
                    {t.bodies[i]}
                  </p>
                ) : (
                  <div className="mt-6 flex md:justify-end md:pr-6">
                    <SketchArrow />
                  </div>
                )}
              </div>
              <div className="shrink-0 px-4 pt-8 pb-6 md:w-[460px] md:border-l md:border-white/10 md:px-8 md:py-8">
                <img
                  src={SKETCHES[i]}
                  alt=""
                  loading="lazy"
                  className="w-full max-w-[420px] h-auto md:max-w-none"
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ————— MATERIALS & MOLECULAR SYSTEMS ————— */}
      <section className="border-t border-white/10">
        <div className="px-4 md:px-10 py-16 md:py-24">
          <p className="text-[11px] uppercase tracking-[0.22em] text-white/45 mb-4" style={{ fontFamily: MONO }}>
            Domain
          </p>
          <h2
            className="font-semibold tracking-tight max-w-4xl"
            style={{ fontFamily: DISPLAY, fontSize: "clamp(2rem, 4.5vw, 3.25rem)" }}
          >
            {t.materialsUmbrella}
          </h2>
          <p className="mt-6 max-w-2xl text-base md:text-lg leading-7 text-white/55" style={{ fontFamily: MONO }}>
            [USER WILL WRITE THIS TEXT]
          </p>
          <ul className="mt-12 flex flex-wrap gap-3 md:gap-4">
            {t.materialTypes.map((type) => (
              <li
                key={type}
                className="rounded-md border border-white/15 px-4 py-2.5 text-sm md:text-base text-white/80"
                style={{ fontFamily: MONO }}
              >
                {type}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ————— INDUSTRIES ————— */}
      <section className="border-t border-white/10">
        <div className="px-4 md:px-10 py-8 md:py-10 border-b border-white/10">
          <h2 className="text-2xl md:text-[2rem] font-semibold tracking-tight" style={{ fontFamily: DISPLAY }}>
            Industries
          </h2>
        </div>
        <div>
          {t.industries.map((ind) => (
            <div
              key={ind.name}
              className="flex flex-col md:flex-row md:items-start border-b border-white/10 last:border-b-0"
            >
              <div className="md:w-[340px] shrink-0 px-4 md:px-10 pt-8 md:py-12">
                <h3
                  className="text-xl md:text-2xl font-semibold tracking-tight leading-snug"
                  style={{ fontFamily: DISPLAY }}
                >
                  {ind.name}
                </h3>
              </div>
              <div className="flex-1 min-w-0 px-4 md:px-10 pb-8 md:py-12 md:border-l md:border-white/10">
                <p className="text-base md:text-lg leading-[1.55] text-white/75 max-w-3xl">{ind.body}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ————— FOUNDER QUOTE ————— */}
      <section className="border-t border-white/10">
        <div className="px-4 md:px-10 py-24 md:py-36">
          <blockquote className="max-w-4xl border-l-2 pl-6 md:pl-12" style={{ borderColor: FRAG }}>
            <p
              className="text-[1.625rem] md:text-[2.25rem] font-medium italic tracking-tight leading-[1.25]"
              style={{ fontFamily: DISPLAY }}
            >
              {t.quote}
            </p>
            <footer className="mt-8 text-xs uppercase tracking-[0.2em] text-white/45" style={{ fontFamily: MONO }}>
              {t.founder}
            </footer>
          </blockquote>
        </div>
      </section>

      {/* ————— PLATFORM DOOR ————— */}
      <Door label="Tour the platform">
        <DoorTeaser>[USER WILL WRITE THIS TEXT]</DoorTeaser>
        <div className="mt-8">
          <Cta href="#contact">Contact us for access</Cta>
        </div>
      </Door>

      {/* ————— MISSION DOOR ————— */}
      <Door label="Discover our mission">
        <DoorTeaser>[USER WILL WRITE THIS TEXT]</DoorTeaser>
      </Door>

      {/* ————— PIP INSTALL CTA ————— */}
      <section id="install" className="border-t border-white/10">
        <div className="px-4 md:px-10 py-20 md:py-28 text-center">
          <p className="text-[11px] uppercase tracking-[0.22em] text-white/45 mb-6" style={{ fontFamily: MONO }}>
            Get started
          </p>
          <pre
            className="inline-block rounded-md border border-white/15 px-6 py-4 md:px-10 md:py-5 text-lg md:text-2xl text-white"
            style={{ fontFamily: MONO, backgroundColor: PANEL }}
          >
            pip install tensir-runner
          </pre>
        </div>
      </section>

      {/* ————— CONTACT + CAREERS TOGGLE ————— */}
      <ContactSection />
    </>
  );
}
