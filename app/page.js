"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import {
  ArrowRight,
  ShieldCheck,
  Workflow,
  Bot,
  FileSpreadsheet,
  Users,
  Sparkles,
  CheckCircle2,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";

// Custom smooth scroll with dramatic ease-out effect
const smoothScrollTo = (targetY, duration = 1200) => {
  const startY = window.scrollY;
  const difference = targetY - startY;
  const startTime = performance.now();

  // Ease-out quint for very smooth, gradual slow-down
  // Starts fast, then dramatically slows as it approaches target
  const easeOutQuint = (t) => 1 - Math.pow(1 - t, 5);

  const animateScroll = (currentTime) => {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const easeProgress = easeOutQuint(progress);

    window.scrollTo(0, startY + difference * easeProgress);

    if (progress < 1) {
      requestAnimationFrame(animateScroll);
    }
  };

  requestAnimationFrame(animateScroll);
};

const accent = {
  from: "#54B3CA",
  to: "#3FBC95",
};

const MultiAgentIcon = ({ className = "" }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    {/* Center hexagon */}
    <path d="M12 6.5l4 2.3v4.4l-4 2.3-4-2.3V8.8l4-2.3z" />
    {/* Top hexagon */}
    <path d="M12 1l2.5 1.4v2.8L12 6.6 9.5 5.2V2.4L12 1z" />
    {/* Bottom hexagon */}
    <path d="M12 17.4l2.5 1.4v2.8L12 23l-2.5-1.4v-2.8l2.5-1.4z" />
    {/* Left hexagon */}
    <path d="M4 9.2l2.5 1.4v2.8L4 14.8 1.5 13.4v-2.8L4 9.2z" />
    {/* Right hexagon */}
    <path d="M20 9.2l2.5 1.4v2.8L20 14.8l-2.5-1.4v-2.8L20 9.2z" />
    {/* Connection lines */}
    <line x1="12" y1="6.5" x2="12" y2="5.2" />
    <line x1="12" y1="15.5" x2="12" y2="17.4" />
    <line x1="8" y1="8.8" x2="6.5" y2="10.6" />
    <line x1="16" y1="8.8" x2="17.5" y2="10.6" />
  </svg>
);

const OrchestratorIcon = ({ className = "" }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    {/* Top circle with code brackets */}
    <circle cx="8" cy="8" r="5" />
    <path d="M6.5 6.5L5 8l1.5 1.5" />
    <path d="M9.5 6.5L11 8l-1.5 1.5" />
    {/* Circular arrow around top */}
    <path d="M3 5.5A6.5 6.5 0 0 1 8 1.5" />
    <path d="M13 10.5A6.5 6.5 0 0 1 8 14.5" />
    {/* Bottom circle with gear */}
    <circle cx="16" cy="16" r="5" />
    <circle cx="16" cy="16" r="2" />
    <path d="M16 12v1" />
    <path d="M16 19v1" />
    <path d="M12 16h1" />
    <path d="M19 16h1" />
    {/* Circular arrow around bottom */}
    <path d="M21 18.5A6.5 6.5 0 0 1 16 22.5" />
    <path d="M11 13.5A6.5 6.5 0 0 1 16 9.5" />
    {/* Connection between circles */}
    <path d="M11.5 11.5l1 1" />
  </svg>
);

const fadeUp = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0 },
};

const Container = ({ children, className = "" }) => (
  <div className={`mx-auto w-full max-w-7xl px-6 ${className}`}>{children}</div>
);

const Pill = ({ children }) => (
  <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/80">
    <Sparkles className="h-4 w-4" />
    {children}
  </span>
);

const Card = ({ icon: Icon, title, desc, tag, href }) => (
  <div className="group relative h-full overflow-hidden rounded-3xl border border-white/10 bg-white/[0.035] p-7 backdrop-blur">
    <div
      className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
      style={{
        background:
          "radial-gradient(600px circle at 20% 10%, rgba(84,179,202,0.18), transparent 55%), radial-gradient(700px circle at 80% 90%, rgba(63,188,149,0.14), transparent 60%)",
      }}
    />
    <div className="relative flex h-full flex-col">
      {tag ? (
        <div className="mb-3 text-[11px] font-semibold tracking-wide text-white/60">
          {tag}
        </div>
      ) : null}
      <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/5">
        <Icon className="h-7 w-7 text-emerald-300" />
      </div>
      <h3 className="mb-2 text-lg font-semibold text-white">{title}</h3>
      <p className="text-sm leading-relaxed text-white/65 text-justify">{desc}</p>
      {href && (
        <a
          href={href}
          className="mt-auto pt-4 inline-flex items-center gap-1 text-sm font-medium text-white/70 transition-all hover:text-white hover:gap-2"
        >
          Learn more <ArrowRight className="h-4 w-4" />
        </a>
      )}
    </div>
  </div>
);

const MiniStep = ({ n, title, desc }) => (
  <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
    <div className="mb-3 inline-flex items-center gap-2">
      <span
        className="inline-flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold"
        style={{
          background: "rgba(63,188,149,0.18)",
          border: "1px solid rgba(63,188,149,0.25)",
          color: "#CFFBEA",
        }}
      >
        {n}
      </span>
      <div className="text-sm font-semibold text-emerald-300">{title}</div>
    </div>
    <p className="text-sm leading-relaxed text-white/65">{desc}</p>
  </div>
);

const Nav = () => (
  <nav className="fixed left-0 right-0 top-0 z-50 bg-[#0B0F14]/80 backdrop-blur-md">
    <div className="mx-auto max-w-7xl px-6">
      <div className="flex items-center justify-between py-4">
        <a href="#top" className="flex items-center gap-3">
          <Image
            src="/omnigence-logo.jpg"
            alt="Omnigence logo"
            width={36}
            height={36}
            className="rounded-xl"
            priority
          />
          <span className="text-sm font-semibold tracking-wide text-white">
            Omnigence
          </span>
        </a>

        <div className="hidden items-center gap-7 text-sm text-white/70 md:flex">
          <div className="group relative">
            <a href="#solutions" className="hover:text-white flex items-center gap-1">
              Solutions
              <svg className="h-3 w-3 transition-transform group-hover:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </a>
            <div className="invisible absolute left-1/2 top-full pt-2 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100 -translate-x-1/2">
              <div className="rounded-2xl border border-white/10 bg-black/90 backdrop-blur-md p-3 min-w-[180px]">
                <Link href="/omnifin" className="flex items-center gap-3 rounded-xl px-3 py-2 transition-colors hover:bg-white/10">
                  <FileSpreadsheet className="h-4 w-4 text-emerald-300" />
                  <span className="text-sm text-white">OmniFin</span>
                </Link>
                <Link href="/omnihr" className="flex items-center gap-3 rounded-xl px-3 py-2 transition-colors hover:bg-white/10">
                  <Users className="h-4 w-4 text-emerald-300" />
                  <span className="text-sm text-white">OmniHR</span>
                </Link>
                <Link href="/orchestrator" className="flex items-center gap-3 rounded-xl px-3 py-2 transition-colors hover:bg-white/10">
                  <MultiAgentIcon className="h-4 w-4 text-emerald-300" />
                  <span className="text-sm text-white">Multi-agent</span>
                </Link>
              </div>
            </div>
          </div>
          <a href="#how" className="hover:text-white">
            How it works
          </a>
          <a href="#governance" className="hover:text-white">
            Governance
          </a>
          <a href="#contact" className="hover:text-white">
            Contact
          </a>
        </div>

        <motion.a
          href="#contact"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
          transition={{ type: "spring", stiffness: 450, damping: 30 }}
          className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white hover:bg-white/10"
        >
          Request access <ArrowRight className="h-4 w-4" />
        </motion.a>
      </div>
    </div>
  </nav>
);

const Orb = ({ className = "", style = {} }) => (
  <div
    className={`pointer-events-none absolute -z-10 rounded-full blur-3xl ${className}`}
    style={style}
  />
);

export default function Page() {
  const [email, setEmail] = useState("");

  // Handle smooth scroll with easing for anchor links
  useEffect(() => {
    const handleAnchorClick = (e) => {
      const href = e.currentTarget.getAttribute("href");
      if (href && href.startsWith("#")) {
        e.preventDefault();
        const targetId = href.substring(1);
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
          const navHeight = 100;
          const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - navHeight;
          const distance = Math.abs(targetPosition - window.scrollY);

          // Dynamic duration: longer distance = longer duration (min 800ms, max 1600ms)
          const duration = Math.min(1600, Math.max(800, distance * 0.8));
          smoothScrollTo(targetPosition, duration);
        }
      }
    };

    const anchors = document.querySelectorAll('a[href^="#"]');
    anchors.forEach((anchor) => anchor.addEventListener("click", handleAnchorClick));

    return () => {
      anchors.forEach((anchor) => anchor.removeEventListener("click", handleAnchorClick));
    };
  }, []);

  const mailto = useMemo(() => {
    const subject = encodeURIComponent("Omnigence — Request access");
    const body = encodeURIComponent(
      `Hi Omnigence,\n\nI'd like to request access / a demo.\n\nEmail: ${email || "<your email>"}\n\nWhat I want to automate:\n- Finance:\n- HR:\n- Other:\n\nThanks!`
    );
    return `mailto:omnigence.ai@gmail.com?subject=${subject}&body=${body}`;
  }, [email]);

  return (
    <main id="top" className="min-h-screen">
      <Nav />

      {/* Background */}
      <div className="relative overflow-hidden">
        <Orb
          className="left-[-180px] top-[-140px] h-[520px] w-[520px] opacity-70"
          style={{ background: "rgba(84,179,202,0.22)" }}
        />
        <Orb
          className="right-[-220px] top-[120px] h-[640px] w-[640px] opacity-60"
          style={{ background: "rgba(63,188,149,0.18)" }}
        />
        <div className="absolute inset-0 -z-20 bg-grid opacity-60" />

        {/* Hero */}
        <section className="pb-16 pt-36 md:pb-24 md:pt-40">
          <Container>
            <motion.div
              initial="hidden"
              animate="show"
              variants={{ show: { transition: { staggerChildren: 0.08 } } }}
              className="grid gap-10 md:grid-cols-[1.2fr_0.8fr] md:items-center"
            >
              <motion.div variants={fadeUp}>
                <h1 className="mt-5 text-4xl font-semibold leading-tight tracking-tight text-white md:text-6xl">
                  AI agents that do the work—with{" "}
                  <span
                    className="bg-clip-text text-transparent"
                    style={{
                      backgroundImage: `linear-gradient(90deg, ${accent.from}, ${accent.to})`,
                    }}
                  >
                    guardrails
                  </span>
                  .
                </h1>

                <p className="mt-5 max-w-xl text-base leading-relaxed text-white/70 md:text-lg">
                  Automate finance, HR, and analytics workflows end-to-end. You set policies and approvals; every action is validated and fully auditable.
                </p>

                <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-start">
                  <div className="flex flex-col items-center">
                    <motion.a
                      href={mailto}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.98 }}
                      transition={{ type: "spring", stiffness: 450, damping: 30 }}
                      className="inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-black"
                      style={{
                        backgroundImage: `linear-gradient(90deg, ${accent.from}, ${accent.to})`,
                      }}
                    >
                      Watch demo <ArrowRight className="h-4 w-4" />
                    </motion.a>
                    <span className="mt-1.5 text-xs text-white/40 text-center">End-to-end in 2 min.</span>
                  </div>

                  <div className="flex flex-col items-center">
                    <a
                      href="#solutions"
                      className="inline-flex items-center justify-center gap-2 rounded-full border border-white/10 bg-white/5 px-6 py-3 text-sm font-semibold text-white/70 hover:bg-white/10 hover:text-white"
                    >
                      Browse workflows <Workflow className="h-4 w-4" />
                    </a>
                    <span className="mt-1.5 text-xs text-white/40 text-center">See if we cover yours.</span>
                  </div>
                </div>

                <div className="mt-10 grid gap-3 text-sm">
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 mt-0.5 text-emerald-300 shrink-0" />
                    <div>
                      <span className="text-white">Human-approved actions</span>
                      <span className="text-white/50 ml-1">— Set approvals for sensitive steps.</span>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 mt-0.5 text-emerald-300 shrink-0" />
                    <div>
                      <span className="text-white">Audit-ready by default</span>
                      <span className="text-white/50 ml-1">— Every action logged, immutable history.</span>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 mt-0.5 text-emerald-300 shrink-0" />
                    <div>
                      <span className="text-white">Schema-validated data</span>
                      <span className="text-white/50 ml-1">— Structured JSON—not messy chat text.</span>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Right visual */}
              <motion.div variants={fadeUp} className="relative">
                <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-6 shadow-glow">
                  <div
                    className="absolute inset-0 opacity-70"
                    style={{
                      background:
                        "radial-gradient(800px circle at 30% 15%, rgba(84,179,202,0.16), transparent 55%), radial-gradient(700px circle at 80% 90%, rgba(63,188,149,0.14), transparent 60%)",
                    }}
                  />
                  <div className="relative">
                    <div className="flex items-center justify-between">
                      <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/30 px-3 py-1 text-xs text-white/70">
                        <div className="h-2 w-2 animate-pulse rounded-full bg-emerald-300" />
                        SYSTEM ACTIVE
                      </div>
                      <div className="text-xs text-white/50">v0.1</div>
                    </div>

                    <div className="mt-6 grid gap-4">
                      <div className="rounded-2xl border border-white/10 bg-black/25 p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2 text-sm font-semibold text-emerald-300">
                            <OrchestratorIcon className="h-7 w-7 text-emerald-300" />
                            Orchestrator
                          </div>
                          <span className="text-xs text-white/60">planning</span>
                        </div>
                        <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-white/10">
                          <div
                            className="h-full w-[78%]"
                            style={{
                              backgroundImage: `linear-gradient(90deg, ${accent.from}, ${accent.to})`,
                            }}
                          />
                        </div>
                        <div className="mt-2 text-xs text-white/55">
                          Routing tasks • enforcing policy • requesting missing
                          fields
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="rounded-2xl border border-white/10 bg-black/25 p-4">
                          <div className="flex items-center gap-2 text-sm font-semibold text-emerald-300">
                            <FileSpreadsheet className="h-4 w-4 text-emerald-300" />
                            Finance Agent
                          </div>
                          <div className="mt-2 space-y-2 text-xs text-white/55">
                            <div>• Smart Quotations</div>
                            <div>• DocIQ</div>
                            <div>• LiveInsights</div>
                          </div>
                        </div>
                        <div className="rounded-2xl border border-white/10 bg-black/25 p-4">
                          <div className="flex items-center gap-2 text-sm font-semibold text-emerald-300">
                            <Users className="h-4 w-4 text-emerald-300" />
                            HR Agent
                          </div>
                          <div className="mt-2 space-y-2 text-xs text-white/55">
                            <div>• Hire-to-Start</div>
                            <div>• DocIQ</div>
                            <div>• Approvals Autopilot</div>
                          </div>
                        </div>
                      </div>

                      <div className="rounded-2xl border border-white/10 bg-black/25 p-4">
                        <div className="flex items-center justify-between">
                          <div className="text-sm font-semibold text-emerald-300">
                            Audit trail
                          </div>
                          <span className="text-xs text-white/50">immutable</span>
                        </div>
                        <div className="mt-1 text-xs text-white/40">
                          Know what happened, why, and who approved it.
                        </div>
                        <div className="mt-3 space-y-2 text-xs text-white/55">
                          <div className="flex justify-between">
                            <span>Inputs validated (schema + required fields)</span>
                            <span>✓</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Tool calls recorded (args + outputs)</span>
                            <span>✓</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Exportable logs (for compliance)</span>
                            <span>✓</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 text-center text-xs text-white/45">
                      Built to scale with you—from your first workflow to your entire operation.
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </Container>
        </section>

        {/* Solutions */}
        <section id="solutions" className="py-16 md:py-20">
          <Container>
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
              variants={{ show: { transition: { staggerChildren: 0.08 } } }}
            >
              <motion.div variants={fadeUp} className="flex items-end justify-between gap-6">
                <div>
                  <h2 className="text-2xl font-semibold text-emerald-300 md:text-3xl">
                    Solutions
                  </h2>
                  <p className="mt-2 max-w-2xl text-sm text-white/65 md:text-base">
                    Start with focused AI tools, then scale to multi-agent workflows across your business.
                  </p>
                </div>
              </motion.div>

              <div className="mt-10 grid gap-5 md:grid-cols-3">
                <motion.div variants={fadeUp}>
                  <Card
                    icon={FileSpreadsheet}
                    tag="Finance automation"
                    title="OmniFin"
                    desc={<>An <span className="font-semibold text-emerald-300">AI Secretary</span> that proactively analyzes, processes documents and keeps metrics current for daily finance management.</>}
                    href="/omnifin"
                  />
                </motion.div>
                <motion.div variants={fadeUp}>
                  <Card
                    icon={Users}
                    tag="HR automation"
                    title="OmniHR"
                    desc={<>Streamline onboarding, forms, approvals, and employee workflows—while keeping <span className="font-semibold text-emerald-300">humans in control</span>.</>}
                    href="/omnihr"
                  />
                </motion.div>
                <motion.div variants={fadeUp}>
                  <Card
                    icon={MultiAgentIcon}
                    tag="Multi-agents"
                    title="Orchestration"
                    desc={<><span className="font-semibold text-emerald-300">AI agents</span> that coordinate across your workflows—flexible, connected, and built to grow with you.</>}
                    href="/orchestrator"
                  />
                </motion.div>
              </div>
            </motion.div>
          </Container>
        </section>

        {/* How it works */}
        <section id="how" className="py-16 md:py-20">
          <Container>
            <div className="grid gap-10 md:grid-cols-[1fr_1fr] md:items-start">
              <div>
                <h2 className="text-2xl font-semibold text-emerald-300 md:text-3xl">
                  How it works
                </h2>
                <p className="mt-3 max-w-xl text-sm text-white md:text-base">
                  A clean pipeline from messy inputs to safe, repeatable outcomes—designed for real operations.
                </p>

                <div className="mt-7 space-y-3 text-sm text-white">
                  {[
                    "Extract structured fields from documents, emails, portals, and APIs.",
                    "Validate rules + request missing info (HITL when needed).",
                    "Execute tools, record everything, and ship results to your systems.",
                  ].map((t, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 text-emerald-300" />
                      <span>{t}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid gap-4">
                <MiniStep
                  n="1"
                  title="Ingest"
                  desc="PDFs, forms, spreadsheets, emails, or APIs — bring your operational data in."
                />
                <MiniStep
                  n="2"
                  title="Govern"
                  desc="Schema validation, policy checks, approvals, and HITL checkpoints when confidence is low."
                />
                <MiniStep
                  n="3"
                  title="Execute"
                  desc="Tool calls, retries, and observable runs — with an auditable history for every workflow."
                />
              </div>
            </div>
          </Container>
        </section>

        {/* Governance */}
        <section id="governance" className="py-16 md:py-20">
          <Container>
            <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-8 md:p-10">
              <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
                <div className="max-w-2xl">
                  <h2 className="text-2xl font-semibold text-emerald-300 md:text-3xl">
                    Governance & security
                  </h2>
                  <p className="mt-3 text-sm text-white/65 md:text-base">
                    Automation is only useful when it’s safe. Omnigence is built
                    around policy, observability, and human oversight.
                  </p>
                </div>

                <div className="grid gap-4 md:max-w-md">
                  {[
                    {
                      icon: ShieldCheck,
                      title: "Audit-ready",
                      desc: "Immutable logs of tool calls, inputs, outputs, and approvals.",
                    },
                    {
                      icon: Workflow,
                      title: "Deterministic structure",
                      desc: "Schema-first outputs reduce surprises and make integrations stable.",
                    },
                    {
                      icon: Bot,
                      title: "HITL controls",
                      desc: "Review/approve at key checkpoints—especially for sensitive actions.",
                    },
                  ].map((x, i) => (
                    <div
                      key={i}
                      className="flex gap-3 rounded-2xl border border-white/10 bg-black/25 p-4"
                    >
                      <div className="mt-0.5 inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-white/5">
                        <x.icon className="h-5 w-5 text-emerald-300" />
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-emerald-300">
                          {x.title}
                        </div>
                        <div className="mt-1 text-sm text-white/65">
                          {x.desc}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Container>
        </section>

        {/* Contact */}
        <section id="contact" className="py-16 md:py-24">
          <Container>
            <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03]">
              <div
                className="relative p-8 md:p-12"
                style={{
                  background:
                    "radial-gradient(900px circle at 20% 10%, rgba(84,179,202,0.15), transparent 60%), radial-gradient(900px circle at 90% 90%, rgba(63,188,149,0.12), transparent 60%)",
                }}
              >
                <div className="relative grid gap-10 md:grid-cols-2 md:items-center">
                  <div>
                    <h2 className="text-2xl font-semibold text-emerald-300 md:text-3xl">
                      Request access
                    </h2>
                    <p className="mt-3 text-sm text-white/65 md:text-base">
                      Tell us what you want to automate. We’ll reply with next
                      steps (or a demo).
                    </p>
                    <div className="mt-6 flex flex-wrap gap-4">
                      {[
                        { icon: FileSpreadsheet, label: "OmniFin" },
                        { icon: Users, label: "OmniHR" },
                        { icon: Workflow, label: "Multi-agent" },
                      ].map((item, i) => (
                        <div key={i} className="flex items-center gap-2">
                          <div className="inline-flex h-7 w-7 items-center justify-center rounded-lg border border-white/10 bg-white/5">
                            <item.icon className="h-4 w-4 text-emerald-300" />
                          </div>
                          <div className="text-sm font-medium text-white">{item.label}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="rounded-3xl border border-white/10 bg-black/25 p-6">
                    <div className="text-sm font-semibold text-emerald-300">
                      Your email (optional)
                    </div>
                    <input
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@company.com"
                      className="mt-3 w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white placeholder:text-white/35 outline-none focus:border-emerald-400/50"
                    />
                    <a
                      href={mailto}
                      className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-2xl px-5 py-3 text-sm font-semibold text-black"
                      style={{
                        backgroundImage: `linear-gradient(90deg, ${accent.from}, ${accent.to})`,
                      }}
                    >
                      Email Omnigence <ArrowRight className="h-4 w-4" />
                    </a>

                    <div className="mt-3 text-center text-xs text-white/45">
                      This button opens your email client to{" "}
                      <span className="text-white/70">omnigence.ai@gmail.com</span>.
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col items-center justify-between gap-4 border-t border-white/10 px-8 py-6 text-xs text-white/45 md:flex-row">
                <div className="flex items-center gap-2">
                  <Image
                    src="/omnigence-logo.jpg"
                    alt="Omnigence"
                    width={22}
                    height={22}
                    className="rounded-lg"
                  />
                  <span>© {new Date().getFullYear()} Omnigence</span>
                </div>
                <div className="flex items-center gap-5">
                  <a className="hover:text-white" href="#solutions">
                    Solutions
                  </a>
                  <a className="hover:text-white" href="#how">
                    How it works
                  </a>
                  <a className="hover:text-white" href="#governance">
                    Governance
                  </a>
                </div>
              </div>
            </div>
          </Container>
        </section>
      </div>
    </main>
  );
}
