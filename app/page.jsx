"use client";

import { useRef, useState } from "react";
import { Shell, MONO, DISPLAY, FRAG, PANEL, INK_LIGHT, Cta } from "./components/site";

// ————————————————————————————————————————————
// TENSIR — landing (one-page scroll)
// Light, full-bleed, freeform-grade rhythm. Moon-gray / blue-purple accents.
//
// Product demo: drop a 30s UI video at /public/demo.mp4 and set
// DEMO_VIDEO_SRC to "/demo.mp4". Leave empty for the placeholder.
// ————————————————————————————————————————————

const DEMO_VIDEO_SRC = "";

const t = {
  hero: "Assemble compute for materials science.",
  heroSupport:
    "Software infrastructure for orchestrating complete, controllable materials research pipelines.",
  industries: [
    {
      title: "Energy",
      items: [
        "batteries",
        "solid electrolytes",
        "fusion first-wall",
        "fission cladding",
        "solar cells",
        "electrolyzers",
      ],
    },
    {
      title: "Semiconductors",
      items: ["SiC/GaN", "defects", "interfaces", "dielectrics", "interconnects", "die-level heat"],
    },
    {
      title: "Automotive",
      items: [
        "lightweight alloys",
        "advanced steels",
        "hydrogen-compatible metals",
        "magnets",
        "coatings",
        "crash structures",
      ],
    },
    {
      title: "Aero / Space / Defense",
      items: [
        "thermal barrier coatings",
        "high-T alloys",
        "radiation damage",
        "oxidation",
        "propulsion materials",
      ],
    },
    {
      title: "Chemicals",
      items: [
        "catalyst surfaces",
        "membranes",
        "coatings",
        "specialty formulations",
        "industrial gases",
      ],
    },
    {
      title: "Electronics",
      items: ["solder/intermetallics", "TIMs", "connectors", "board-level thermal paths", "sensors"],
    },
    {
      title: "Robotics",
      items: ["actuator magnets", "structural alloys", "joint wear", "motor thermal paths"],
    },
    {
      title: "MedTech / Biomaterials",
      items: ["implant alloys", "saline corrosion", "coating adhesion", "biointerfaces"],
    },
    {
      title: "Metals & Mining",
      items: ["alloy design", "phase stability", "hydrogen in steel", "refractories", "corrosion"],
    },
    {
      title: "Packaging",
      items: ["barrier films", "multilayer adhesion", "permeability", "inorganic coatings"],
    },
  ],
  keywords: ["Pipeline", "Compute", "Budget", "Provenance", "Tree"],
  materials: [
    {
      title: "Materials Systems",
      items: [
        "crystals",
        "surfaces",
        "interfaces",
        "defects",
        "2D materials",
        "porous materials",
        "amorphous materials",
        "nanostructures",
      ],
    },
    {
      title: "Material Classes",
      items: [
        "metals",
        "alloys",
        "semiconductors",
        "ceramics",
        "polymers",
        "oxides",
        "carbides",
        "nitrides",
      ],
    },
  ],
  stackLead:
    "Public data + proprietary customer data → scientific computation → AI models/agents → controlled compute → fully traced result.",
  stack: [
    {
      title: "Data Sources",
      items: ["Materials Project", "Materials Cloud"],
    },
    {
      title: "Simulation",
      items: ["Quantum ESPRESSO", "LAMMPS"],
    },
    {
      title: "Scientific Models",
      items: ["MACE", "MLIPs"],
    },
    {
      title: "Agents",
      body: "Planners — not physics engines.",
      items: [],
    },
    {
      title: "Tooling",
      items: ["ASE", "pymatgen", "Phonopy"],
    },
    {
      title: "Compute",
      items: ["cloud", "HPC", "on-prem"],
    },
  ],
  deploy: [
    { title: "Cloud", items: ["bookable substrates"] },
    { title: "HPC", items: ["existing lab queues"] },
    { title: "On-prem", items: ["customer iron", "air-gapped"] },
    { title: "Customer infra", items: ["proprietary data stays inside"] },
  ],
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Color system: primary near-black, muted secondary, bg #fff.
const ink = INK_LIGHT; // #0B0B12
const inkMuted = "#5C6275";
const ink70 = "rgba(11,11,18,0.78)";
const ink65 = "rgba(11,11,18,0.72)";
const ink45 = "rgba(92,98,117,0.95)"; // muted labels

const inputCls =
  "w-full rounded-md border border-black/15 bg-[#F4F5F7] px-4 py-3 text-[15px] " +
  "outline-none transition-colors duration-150 focus:border-[#9A9EB0]";

function Field({ label, error, sentence, children }) {
  return (
    <div>
      <label
        className={sentence ? "block mb-3 text-sm leading-6" : "block mb-2 text-[11px] uppercase tracking-[0.2em]"}
        style={{ fontFamily: MONO, color: sentence ? ink70 : ink45 }}
      >
        {label}
      </label>
      {children}
      {error && (
        <p className="mt-2 text-xs" style={{ fontFamily: MONO, color: FRAG }}>
          {error}
        </p>
      )}
    </div>
  );
}

function Kicker({ children }) {
  return (
    <p className="text-[11px] uppercase tracking-[0.22em] mb-4" style={{ fontFamily: MONO, color: ink45 }}>
      {children}
    </p>
  );
}

function ChipList({ items }) {
  if (!items?.length) return null;
  return (
    <ul className="mt-4 flex flex-wrap gap-2">
      {items.map((item) => (
        <li
          key={item}
          className="rounded-md border border-black/15 px-3 py-1.5 text-sm"
          style={{ fontFamily: MONO, color: ink }}
        >
          {item}
        </li>
      ))}
    </ul>
  );
}

// Hover / focus-visible on pointer+keyboard; click/tap persists open (mobile).
function RevealCard({ title, body, items, size = "md" }) {
  const [open, setOpen] = useState(false);
  const pad =
    size === "lg"
      ? "px-5 md:px-8 py-12 md:py-16 min-h-[12rem] md:min-h-[22rem]"
      : "px-4 md:px-6 py-10 md:py-12 min-h-[10rem] md:min-h-[16rem]";

  return (
    <button
      type="button"
      aria-expanded={open}
      onClick={(e) => {
        setOpen((v) => {
          const next = !v;
          if (next) {
            requestAnimationFrame(() => {
              e.currentTarget.scrollIntoView({ block: "nearest", inline: "nearest" });
            });
          }
          return next;
        });
      }}
      className={
        "group w-full h-full text-left bg-white cursor-pointer scroll-mt-28 " +
        "transition-colors duration-150 hover:bg-[#F4F5F7] " +
        "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[#9A9EB0] " +
        pad
      }
    >
      <h3
        className={
          size === "lg"
            ? "text-2xl md:text-3xl font-semibold tracking-tight leading-snug"
            : "text-lg md:text-xl font-semibold tracking-tight leading-snug"
        }
        style={{ fontFamily: DISPLAY, color: ink }}
      >
        {title}
      </h3>
      <p
        className="mt-4 md:hidden text-[11px] uppercase tracking-[0.18em]"
        style={{ fontFamily: MONO, color: ink45 }}
      >
        {open ? "Hide" : "Details"}
      </p>
      <div
        className={
          "mt-5 transition-opacity duration-200 " +
          (open
            ? "opacity-100 visible"
            : "max-md:hidden opacity-0 invisible md:group-hover:visible md:group-hover:opacity-100 md:group-focus-visible:visible md:group-focus-visible:opacity-100")
        }
      >
        {body && (
          <p className="text-sm md:text-base leading-[1.55]" style={{ color: ink65 }}>
            {body}
          </p>
        )}
        <ChipList items={items} />
      </div>
    </button>
  );
}

function DemoVideo({ src }) {
  if (src) {
    return (
      <video
        src={src}
        className="w-full aspect-video bg-black"
        controls
        playsInline
        preload="metadata"
      >
        Your browser does not support embedded video.
      </video>
    );
  }

  return (
    <div
      className="relative aspect-video w-full bg-[#F4F5F7] flex items-center justify-center"
      role="img"
      aria-label="30-second product demo placeholder"
    >
      <div className="flex flex-col items-center gap-5 px-6 text-center">
        <div
          className="flex size-16 md:size-20 items-center justify-center rounded-full border border-black/15"
          aria-hidden="true"
        >
          <svg width="22" height="22" viewBox="0 0 16 16" fill="none" className="ml-0.5">
            <path d="M5 3.5 L13 8 L5 12.5 Z" fill={ink} />
          </svg>
        </div>
        <div>
          <p className="text-[11px] uppercase tracking-[0.22em]" style={{ fontFamily: MONO, color: ink45 }}>
            30-second product demo
          </p>
          <p className="mt-2 text-sm md:text-base" style={{ color: ink65 }}>
            Short UI walkthrough — video coming soon
          </p>
        </div>
      </div>
    </div>
  );
}

// Contact at bottom — Investors (left) | Reach Out (default) | Careers (right).
function ContactSection() {
  const [mode, setMode] = useState("contact"); // investors | contact | careers
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    message: "",
    firm: "",
    checkSize: "",
    thesis: "",
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
    } else if (mode === "investors") {
      if (!form.firm.trim()) errs.firm = "required";
      if (!form.thesis.trim()) errs.thesis = "required — a few sentences is fine";
    } else {
      if (!form.cashEquity.trim()) errs.cashEquity = "required — a one-liner is fine";
      if (!form.role.trim()) errs.role = "required — a one-liner is fine";
      if (!form.whiteboard.trim()) errs.whiteboard = "the whiteboard is the application — it can't be blank";
    }

    setErrors(errs);
    if (Object.keys(errs).length) return;

    setStatus("sending");
    try {
      const endpoint =
        mode === "contact" ? "/api/contact" : mode === "investors" ? "/api/investors" : "/api/careers";
      const body =
        mode === "contact"
          ? {
              firstName: form.firstName,
              lastName: form.lastName,
              email: form.email,
              message: form.message,
            }
          : mode === "investors"
            ? {
                firstName: form.firstName,
                lastName: form.lastName,
                email: form.email,
                firm: form.firm,
                checkSize: form.checkSize,
                thesis: form.thesis,
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

  const title =
    mode === "investors" ? "Investors" : mode === "careers" ? "Careers" : "Reach Out";

  const successCopy =
    mode === "careers"
      ? "we read every whiteboard. if it resonates, you'll hear from eric directly."
      : mode === "investors"
        ? "thanks — we'll be in touch shortly."
        : "thanks — we'll get back to you soon.";

  return (
    <section id="contact" className="border-t border-black/10 scroll-mt-28">
      <div className="px-4 md:px-10 pt-16 md:pt-24 pb-20 md:pb-28 flex justify-center">
        <div className="w-full max-w-3xl">
          {/* Side tabs (Investors / Careers) + main title (Reach Out by default) */}
          <div className="flex items-center justify-between gap-4">
            <button
              type="button"
              role="tab"
              aria-selected={mode === "investors"}
              onClick={() => switchMode("investors")}
              className={
                "shrink-0 text-[11px] uppercase tracking-[0.18em] transition-colors duration-150 " +
                (mode === "investors" ? "opacity-100" : "opacity-50 hover:opacity-80")
              }
              style={{ fontFamily: MONO, color: mode === "investors" ? FRAG : ink }}
            >
              Investors
            </button>
            <h2
              className="font-semibold tracking-tight text-center"
              style={{ fontFamily: DISPLAY, fontSize: "clamp(1.75rem, 4vw, 2.75rem)" }}
            >
              {title}
            </h2>
            <button
              type="button"
              role="tab"
              aria-selected={mode === "careers"}
              onClick={() => switchMode("careers")}
              className={
                "shrink-0 text-[11px] uppercase tracking-[0.18em] transition-colors duration-150 " +
                (mode === "careers" ? "opacity-100" : "opacity-50 hover:opacity-80")
              }
              style={{ fontFamily: MONO, color: mode === "careers" ? FRAG : ink }}
            >
              Careers
            </button>
          </div>

          {/* When on a side mode, allow return to Reach Out */}
          {mode !== "contact" && (
            <div className="mt-4 text-center">
              <button
                type="button"
                onClick={() => switchMode("contact")}
                className="text-[11px] uppercase tracking-[0.18em] opacity-50 hover:opacity-80 transition-opacity duration-150"
                style={{ fontFamily: MONO, color: ink }}
              >
                ← Reach Out
              </button>
            </div>
          )}

          <div className="mt-10">
            {status === "sent" ? (
              <div className="rounded-md border p-8 md:p-10" style={{ borderColor: FRAG, backgroundColor: PANEL }}>
                <p className="text-sm" style={{ fontFamily: MONO, color: FRAG }}>
                  [ received ]
                </p>
                <p className="mt-4 text-base md:text-lg leading-7" style={{ fontFamily: MONO, color: ink70 }}>
                  {successCopy}
                </p>
              </div>
            ) : (
              <form onSubmit={onSubmit} noValidate>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Field label="First name" error={errors.firstName}>
                    <input
                      className={inputCls}
                      style={{ color: ink, caretColor: ink }}
                      value={form.firstName}
                      onChange={set("firstName")}
                      autoComplete="given-name"
                    />
                  </Field>
                  <Field label="Last name" error={errors.lastName}>
                    <input
                      className={inputCls}
                      style={{ color: ink, caretColor: ink }}
                      value={form.lastName}
                      onChange={set("lastName")}
                      autoComplete="family-name"
                    />
                  </Field>
                  <div className="md:col-span-2">
                    <Field label="Email" error={errors.email}>
                      <input
                        className={inputCls}
                        style={{ color: ink, caretColor: ink }}
                        type="email"
                        value={form.email}
                        onChange={set("email")}
                        autoComplete="email"
                      />
                    </Field>
                  </div>
                </div>

                {mode === "contact" && (
                  <div className="mt-8">
                    <Field label="Message" error={errors.message}>
                      <textarea
                        rows={6}
                        value={form.message}
                        onChange={set("message")}
                        className={`${inputCls} resize-y leading-7`}
                        style={{ fontFamily: MONO, color: ink, caretColor: ink }}
                        placeholder="What are you working on?"
                      />
                    </Field>
                  </div>
                )}

                {mode === "investors" && (
                  <div className="mt-8 space-y-8">
                    <Field label="Firm / fund" error={errors.firm}>
                      <input
                        className={inputCls}
                        style={{ color: ink, caretColor: ink }}
                        value={form.firm}
                        onChange={set("firm")}
                        autoComplete="organization"
                      />
                    </Field>
                    <Field label="Typical check size (optional)" error={errors.checkSize}>
                      <input
                        className={inputCls}
                        style={{ color: ink, caretColor: ink }}
                        value={form.checkSize}
                        onChange={set("checkSize")}
                        placeholder="e.g. $250k–$1M"
                      />
                    </Field>
                    <Field
                      label="what draws you to tensir — stage, thesis, how you can help?"
                      error={errors.thesis}
                      sentence
                    >
                      <textarea
                        rows={5}
                        value={form.thesis}
                        onChange={set("thesis")}
                        className={`${inputCls} resize-y leading-7`}
                        style={{ fontFamily: MONO, color: ink, caretColor: ink }}
                      />
                    </Field>
                  </div>
                )}

                {mode === "careers" && (
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
                          style={{ fontFamily: MONO, color: ink, caretColor: ink }}
                        />
                      </Field>
                      <Field label="define your own role. what would you do at tensir?" error={errors.role} sentence>
                        <textarea
                          rows={3}
                          value={form.role}
                          onChange={set("role")}
                          className={`${inputCls} resize-none leading-7`}
                          style={{ fontFamily: MONO, color: ink, caretColor: ink }}
                        />
                      </Field>
                    </div>
                    <div className="mt-12">
                      <p className="text-sm leading-6" style={{ fontFamily: MONO, color: ink70 }}>
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
                        style={{ fontFamily: MONO, color: ink, caretColor: ink }}
                      />
                      {errors.whiteboard && (
                        <p className="mt-2 text-xs" style={{ fontFamily: MONO, color: FRAG }}>
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
                      "group inline-flex items-center gap-2.5 rounded-md border border-black/15 px-4 py-2.5 " +
                      "text-xs uppercase tracking-[0.15em] whitespace-nowrap cursor-pointer " +
                      "transition-[background-color,border-color,color] duration-150 ease-out " +
                      "hover:border-[#9A9EB0] hover:bg-[#9A9EB0] hover:text-[#0B0B12] " +
                      "disabled:opacity-40 disabled:pointer-events-none"
                    }
                    style={{ fontFamily: MONO, color: ink }}
                  >
                    {status === "sending"
                      ? "Sending…"
                      : mode === "careers"
                        ? "Send it"
                        : mode === "investors"
                          ? "Send note"
                          : "Send message"}
                    <svg
                      width="13"
                      height="13"
                      viewBox="0 0 16 16"
                      fill="none"
                      className="text-[#9A9EB0] group-hover:text-[#0B0B12] transition-colors duration-150"
                    >
                      <path d="M2 8 H13 M9 3.5 L13.5 8 L9 12.5" stroke="currentColor" strokeWidth="1.8" />
                    </svg>
                  </button>
                  {status === "error" && (
                    <p className="text-xs" style={{ fontFamily: MONO, color: FRAG }}>
                      something broke on our side — try again in a minute
                    </p>
                  )}
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default function TensirLanding() {
  return (
    <Shell>
      <Landing />
    </Shell>
  );
}

function Landing() {
  return (
    <>
      {/* 1 — Hero */}
      <section className="relative z-10 pt-28 md:pt-36">
        <div className="px-4 md:px-10 pb-16 md:pb-24">
          <h1
            className="font-semibold leading-[1.02] whitespace-nowrap"
            style={{
              fontFamily: DISPLAY,
              fontSize: "clamp(1.05rem, 4.35vw, 4.75rem)",
              letterSpacing: "-0.025em",
              color: ink,
            }}
          >
            {t.hero}
          </h1>
          <p
            className="mt-8 max-w-2xl text-base md:text-lg leading-[1.65]"
            style={{ color: ink70 }}
          >
            {t.heroSupport}
          </p>
          <div className="mt-10">
            <Cta href="#contact">Request a Demo</Cta>
          </div>
        </div>
      </section>

      {/* 2 — Product demo + five tabs as a single line */}
      <section id="demo" className="border-t border-black/10 scroll-mt-28">
        <div className="px-4 md:px-10 pt-16 md:pt-20 pb-10 md:pb-12">
          <Kicker>Product Demo</Kicker>
          <div className="overflow-hidden rounded-md border border-black/10">
            <DemoVideo src={DEMO_VIDEO_SRC} />
          </div>
        </div>
        <div className="border-t border-black/10">
          <div className="flex flex-wrap md:flex-nowrap items-center justify-center gap-x-3 sm:gap-x-5 md:gap-x-8 gap-y-3 px-4 py-8 md:py-10">
            {t.keywords.map((name, i) => (
              <span key={name} className="contents">
                {i > 0 && (
                  <span className="text-black/25" aria-hidden="true">
                    →
                  </span>
                )}
                <span
                  className="text-base md:text-lg font-semibold tracking-tight"
                  style={{ fontFamily: DISPLAY, color: ink }}
                >
                  {name}
                </span>
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* 3 — Industries: two rows of five; reveal buyer examples */}
      <section id="industries" className="border-t border-black/10 scroll-mt-28">
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-px bg-black/10">
          {t.industries.map((card) => (
            <RevealCard key={card.title} title={card.title} items={card.items} />
          ))}
        </div>
      </section>

      {/* 4 — Materials: systems | classes */}
      <section id="materials" className="border-t border-black/10 scroll-mt-28">
        <div className="px-4 md:px-10 pt-12 md:pt-16 pb-4">
          <Kicker>Materials</Kicker>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-black/10 border-t border-black/10">
          {t.materials.map((card) => (
            <RevealCard
              key={card.title}
              title={card.title}
              items={card.items}
              size="lg"
            />
          ))}
        </div>
      </section>

      {/* 5 — Software stack */}
      <section id="stack" className="border-t border-black/10 scroll-mt-28">
        <div className="px-4 md:px-10 pt-16 md:pt-20 pb-8">
          <Kicker>Software Stack</Kicker>
          <p className="max-w-3xl text-base md:text-lg leading-[1.55]" style={{ color: ink65 }}>
            {t.stackLead}
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-black/10 border-t border-black/10">
          {t.stack.map((card) => (
            <RevealCard
              key={card.title}
              title={card.title}
              body={card.body}
              items={card.items}
            />
          ))}
        </div>
      </section>

      {/* 6 — Deployment / Enterprise */}
      <section id="deploy" className="border-t border-black/10 scroll-mt-28">
        <div className="px-4 md:px-10 pt-12 md:pt-16 pb-4">
          <Kicker>Deployment</Kicker>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-black/10 border-t border-black/10">
          {t.deploy.map((card) => (
            <RevealCard key={card.title} title={card.title} items={card.items} />
          ))}
        </div>
      </section>

      {/* 7 — Request a Demo + contact form */}
      <ContactSection />
    </>
  );
}
