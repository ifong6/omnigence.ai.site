"use client";

import Image from "next/image";
import { Workflow, Bot, GitBranch, Shield } from "lucide-react";
import Nav from "../components/Nav";

const accent = {
  from: "#54B3CA",
  to: "#3FBC95",
};

const Orb = ({ className = "", style = {} }) => (
  <div
    className={`pointer-events-none absolute -z-10 rounded-full blur-3xl ${className}`}
    style={style}
  />
);

const Container = ({ children, className = "" }) => (
  <div className={`mx-auto w-full max-w-7xl px-6 ${className}`}>{children}</div>
);

const FeatureCard = ({ icon: Icon, title, desc }) => (
  <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
    <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/5">
      <Icon className="h-5 w-5 text-emerald-300" />
    </div>
    <h3 className="mb-2 text-lg font-semibold text-emerald-300">{title}</h3>
    <p className="text-sm leading-relaxed text-white/65">{desc}</p>
  </div>
);

export default function OrchestratorPage() {
  return (
    <main className="min-h-screen">
      <Nav />
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

        <section className="pb-16 pt-36 md:pb-24 md:pt-40">
          <Container>
            <div className="flex items-center gap-4 mb-6">
              <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/5">
                <Workflow className="h-7 w-7 text-emerald-300" />
              </div>
              <div>
                <div className="text-xs font-semibold tracking-wide text-white/60 uppercase">
                  Multi-Agent System
                </div>
                <h1 className="text-3xl font-semibold text-emerald-300 md:text-4xl">
                  Orchestration
                </h1>
              </div>
            </div>

            <p className="max-w-2xl text-lg text-white/70 mb-12">
              <span className="font-semibold text-emerald-300">AI agents</span> that coordinate across your workflows—flexible, connected, and built to grow with you.
            </p>

            <div className="grid gap-5 md:grid-cols-3 mb-16">
              <FeatureCard
                icon={Bot}
                title="Agent Coordination"
                desc="Multiple specialized agents working together, routing tasks intelligently based on context and capability."
              />
              <FeatureCard
                icon={GitBranch}
                title="Workflow Routing"
                desc="Dynamic task distribution across agents with automatic handoffs and context preservation."
              />
              <FeatureCard
                icon={Shield}
                title="Governance Layer"
                desc="Policy enforcement, audit trails, and human-in-the-loop checkpoints for safe autonomous operations."
              />
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-8 text-center">
              <h2 className="text-xl font-semibold text-emerald-300 mb-3">Coming Soon</h2>
              <p className="text-white/60 mb-6">
                Multi-agent orchestration is currently in development. Request early access to be notified when it launches.
              </p>
              <a
                href="/#contact"
                className="inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-black"
                style={{
                  backgroundImage: `linear-gradient(90deg, ${accent.from}, ${accent.to})`,
                }}
              >
                Request early access
              </a>
            </div>
          </Container>
        </section>
      </div>
    </main>
  );
}
