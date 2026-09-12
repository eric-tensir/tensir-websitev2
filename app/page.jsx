"use client";

import { useState } from "react";
import { Shell, MONO, DISPLAY, Cta } from "./components/site";

const t = {
  industries: [
    {
      title: "Energy",
      items: [
        "battery electrodes",
        "solid electrolytes",
        "fusion first-wall",
        "fission cladding",
        "photovoltaic materials",
        "electrolyzer catalysts",
      ],
    },
    {
      title: "Semiconductors",
      items: ["SiC/GaN", "defects", "interfaces", "dielectrics", "interconnects", "thermal transport"],
    },
    {
      title: "Automotive",
      items: [
        "lightweight alloys",
        "advanced steels",
        "hydrogen-compatible metals",
        "magnets",
        "coatings",
        "deformation and fracture",
      ],
    },
    {
      title: "Aero / Space / Defense",
      items: [
        "thermal barrier coatings",
        "high-temperature alloys",
        "radiation damage",
        "oxidation",
      ],
    },
    {
      title: "Chemicals",
      items: [
        "catalyst surfaces",
        "membranes",
        "coatings",
        "adsorption and diffusion",
      ],
    },
    {
      title: "Electronics",
      items: ["solder/intermetallics", "thermal interface materials", "contact materials"],
    },
    {
      title: "Robotics",
      items: ["actuator magnets", "structural alloys", "joint wear", "friction"],
    },
    {
      title: "MedTech / Biomaterials",
      items: ["implant alloys", "saline corrosion", "coating adhesion", "biointerfaces"],
    },
    {
      title: "Metals & Mining",
      items: ["alloy design", "phase stability", "hydrogen in steel", "refractories", "corrosion"],
    },
  ],
  concepts: [
    {
      title: "Pipeline",
      body: "The graph of computational tasks and transformations. Nodes describe the work; connections describe how that work fits together.",
    },
    {
      title: "Compute",
      body: "Allocation and execution of workloads across public cloud, HPC, and on-premises infrastructure.",
    },
    {
      title: "Budget",
      body: "Cost estimation, spend control, and recorded authorization for computational work.",
    },
    {
      title: "Provenance",
      body: "Execution context stays attached to results: source, method, parameters, licence class, operator, cost, and other context from the run.",
    },
    {
      title: "Tree",
      body: "A hierarchical planning and reasoning layer over the pipeline. It can support bounded LLM or agent tasks: suggesting nodes, restructuring parts of a pipeline, optimizing cost, or proposing next computations.",
    },
  ],
  methods: [
    "Density-functional theory (DFT)",
    "Machine-learned interatomic potentials (MLIP)",
    "Molecular dynamics",
  ],
  operations: [
    "Structure ingest",
    "Relaxation",
    "Scoring",
    "Ranking",
    "Refinement",
  ],
  systems: [
    "Crystals", "Surfaces", "Interfaces", "Defects", "Grain boundaries",
    "Coatings", "2D materials", "Porous materials", "Amorphous materials", "Nanostructures",
  ],
  classes: ["Metals and alloys", "Semiconductors", "Ceramics and glasses", "Polymers", "Carbon materials", "Composites and hybrids"],
  deployment: ["Public / private cloud", "HPC", "On-premises", "Isolated / air-gapped environments"],
};

const sectionClass = "border-t border-black/10 scroll-mt-28";
const innerClass = "mx-auto max-w-[1440px] px-4 md:px-10 py-14 md:py-20";
const headingClass = "text-3xl md:text-4xl font-semibold tracking-tight leading-tight";
const inputClass = "w-full rounded-md border border-black/20 bg-[#F4F5F7] px-4 py-3 text-base outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#5C6275]";

function Kicker({ children }) {
  return <p className="mb-5 text-xs uppercase tracking-[0.18em] text-[#5C6275]" style={{ fontFamily: MONO }}>{children}</p>;
}

function ContactSection() {
  const [form, setForm] = useState({ firstName: "", lastName: "", email: "", message: "" });
  const [status, setStatus] = useState("idle");

  async function onSubmit(event) {
    event.preventDefault();
    setStatus("sending");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      setStatus(response.ok ? "sent" : "error");
    } catch {
      setStatus("error");
    }
  }

  return (
    <section id="contact" aria-labelledby="contact-heading" className={sectionClass}>
      <div className={`${innerClass} grid gap-10 lg:grid-cols-[1fr_1.3fr] lg:gap-20`}>
        <div>
          <Kicker>Contact</Kicker>
          <h2 id="contact-heading" className={headingClass}>Request a Demo</h2>
          <p className="mt-6 max-w-md text-base leading-7 text-[#5C6275]">
            Tell us about your research pipeline, computational methods, and infrastructure.
          </p>
        </div>
        <div>
          {status === "sent" ? (
            <p role="status" className="border border-black/15 bg-[#F4F5F7] p-6 leading-7">
              Thank you. Your inquiry has been received. We will be in touch.
            </p>
          ) : (
            <form onSubmit={onSubmit} className="grid grid-cols-1 gap-6 sm:grid-cols-2" aria-label="Demo inquiry">
              {[
                ["firstName", "First name", "text", "given-name"],
                ["lastName", "Last name", "text", "family-name"],
                ["email", "Work email", "email", "email"],
              ].map(([name, label, type, autoComplete]) => (
                <div key={name} className={name === "email" ? "sm:col-span-2" : ""}>
                  <label htmlFor={name} className="mb-2 block text-sm">{label}</label>
                  <input id={name} name={name} type={type} autoComplete={autoComplete} required
                    pattern={type === "text" ? ".*\\S.*" : undefined}
                    value={form[name]} onChange={(event) => setForm({ ...form, [name]: event.target.value })}
                    className={inputClass} />
                </div>
              ))}
              <div className="sm:col-span-2">
                <label htmlFor="message" className="mb-2 block text-sm">Research pipeline / inquiry</label>
                <textarea id="message" name="message" rows={5} required value={form.message}
                  onChange={(event) => {
                    event.target.setCustomValidity(event.target.value.trim() ? "" : "Please describe your inquiry.");
                    setForm({ ...form, message: event.target.value });
                  }} className={`${inputClass} resize-y leading-7`} />
              </div>
              <div className="sm:col-span-2 flex flex-wrap items-center gap-5">
                <button type="submit" disabled={status === "sending"}
                  className="rounded-md border border-black/30 px-5 py-3 text-xs uppercase tracking-[0.12em] hover:bg-[#F4F5F7] focus-visible:outline-2 focus-visible:outline-offset-4 disabled:opacity-50"
                  style={{ fontFamily: MONO }}>
                  {status === "sending" ? "Sending…" : "Request a Demo"}
                </button>
                <p role="status" className="text-sm text-[#5C6275]">
                  {status === "sending" ? "Submitting your inquiry." : ""}
                </p>
                {status === "error" && <p role="alert" className="w-full text-sm">We could not send your inquiry. Please try again.</p>}
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
    <Shell>
      <section aria-labelledby="hero-heading" className="mx-auto max-w-[1440px] px-4 md:px-10 pt-32 md:pt-44 pb-16 md:pb-24">
        <h1 id="hero-heading" className="max-w-5xl font-semibold leading-[1.06] tracking-[-0.025em] text-[clamp(2.5rem,5.5vw,4.75rem)]" style={{ fontFamily: DISPLAY }}>
          Assemble compute for materials science.
        </h1>
        <p className="mt-7 max-w-2xl text-lg md:text-xl leading-relaxed text-[#5C6275]">
          Software infrastructure for orchestrating materials research pipelines.
        </p>
        <div className="mt-9"><Cta href="#contact">Request a Demo</Cta></div>
      </section>

      <section id="pipeline" aria-labelledby="pipeline-heading" className={sectionClass}>
        <div className={`${innerClass} grid gap-8 lg:grid-cols-[1fr_1.3fr] lg:gap-20`}>
          <div>
            <Kicker>The pipeline</Kicker>
            <h2 id="pipeline-heading" className={`${headingClass} max-w-lg`}>A graph of computational work.</h2>
          </div>
          <div className="content-card space-y-5 text-base md:text-lg leading-relaxed text-[#5C6275]">
            <p>A Tensir pipeline is a graph whose nodes represent computations or transformations: structure ingest, density-functional theory (DFT), machine-learned interatomic potentials (MLIP), molecular dynamics, relaxation, scoring, ranking, or refinement.</p>
            <p>Tensir provides one interface for managing these heterogeneous computations across a research pipeline. Execution can span public cloud, HPC, and on-premises infrastructure.</p>
          </div>
        </div>
      </section>

      <section id="product" aria-labelledby="product-heading" className={sectionClass}>
        <div className={innerClass}>
          <Kicker>Product</Kicker>
          <h2 id="product-heading" className={headingClass}>Five responsibilities. One system.</h2>
          <dl className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {t.concepts.map(({ title, body, note }) => (
              <div key={title} className="content-card flex flex-col gap-4">
                <dt className="text-2xl font-semibold tracking-tight">{title}</dt>
                <dd className="max-w-3xl text-base md:text-lg leading-relaxed text-[#5C6275]">
                  <p>{body}</p>
                  {note && <p className="mt-4 text-[#0B0B12]">{note}</p>}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section id="methods" aria-labelledby="methods-heading" className={sectionClass}>
        <div className={innerClass}>
          <Kicker>Methods and materials</Kicker>
          <h2 id="methods-heading" className={headingClass}>Computations and objects of work.</h2>
          <div className="mt-10 grid gap-10 lg:grid-cols-2 lg:gap-16">
            <div className="space-y-8">
              {[["Scientific methods", t.methods], ["Workflow operations", t.operations]].map(([title, items]) => (
                <div key={title}>
                  <h3 className="mb-5 text-xl font-semibold">{title}</h3>
                  <ul className="flex flex-wrap gap-2">
                    {items.map((item) => <li key={item} className="text-chip text-base text-[#5C6275]">{item}</li>)}
                  </ul>
                </div>
              ))}
            </div>
            <div className="space-y-8">
              {[["Material systems", t.systems], ["Material classes", t.classes]].map(([title, items]) => (
                <div key={title}>
                  <h3 className="mb-5 text-xl font-semibold">{title}</h3>
                  <ul className="flex flex-wrap gap-2">
                    {items.map((item) => <li key={item} className="text-chip text-base text-[#5C6275]">{item}</li>)}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="industries" aria-labelledby="industries-heading" className={sectionClass}>
        <div className={innerClass}>
          <h2 id="industries-heading" className="mb-8 text-xs uppercase tracking-[0.18em] text-[#5C6275]" style={{ fontFamily: MONO }}>Industries we serve</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {t.industries.map(({ title, items }) => (
              <div key={title} className="content-card">
                <h3 className="text-xl font-semibold tracking-tight">{title}</h3>
                <p className="mt-3 text-sm leading-7 text-[#5C6275]">{items.join(" · ")}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="deploy" aria-labelledby="deployment-heading" className={sectionClass}>
        <div className={innerClass}>
          <Kicker>Deployment</Kicker>
          <h2 id="deployment-heading" className={headingClass}>Deployment inside customer-managed infrastructure.</h2>
          <p className="mt-6 max-w-3xl text-base md:text-lg leading-relaxed text-[#5C6275]">
            Tensir can run fully inside customer-managed infrastructure using standard containerized deployment, including Kubernetes and Helm. One software interface supports computational work across cloud, HPC, on-premises, and isolated or air-gapped environments.
          </p>
          <ul className="mt-10 flex flex-wrap gap-3">
            {t.deployment.map((environment) => <li key={environment} className="text-chip text-base font-semibold">{environment}</li>)}
          </ul>
          <div className="content-card mt-8 max-w-3xl">
            <h3 className="text-xl font-semibold">Research data path</h3>
            <p className="mt-4 text-base md:text-lg leading-relaxed text-[#5C6275]">
              Research data can remain within the customer environment. When bursting to cloud compute, execution and data can flow directly between the customer-side Tensir deployment and selected compute infrastructure. No transit through, proxying by, or aggregation on Tensir-controlled servers is required.
            </p>
          </div>
        </div>
      </section>

      <ContactSection />
    </Shell>
  );
}
