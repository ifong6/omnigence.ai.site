"use client";

import Image from "next/image";
import { ArrowRight, FileSpreadsheet, Users } from "lucide-react";

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
    <path d="M12 6.5l4 2.3v4.4l-4 2.3-4-2.3V8.8l4-2.3z" />
    <path d="M12 1l2.5 1.4v2.8L12 6.6 9.5 5.2V2.4L12 1z" />
    <path d="M12 17.4l2.5 1.4v2.8L12 23l-2.5-1.4v-2.8l2.5-1.4z" />
    <path d="M4 9.2l2.5 1.4v2.8L4 14.8 1.5 13.4v-2.8L4 9.2z" />
    <path d="M20 9.2l2.5 1.4v2.8L20 14.8l-2.5-1.4v-2.8L20 9.2z" />
    <line x1="12" y1="6.5" x2="12" y2="5.2" />
    <line x1="12" y1="15.5" x2="12" y2="17.4" />
    <line x1="8" y1="8.8" x2="6.5" y2="10.6" />
    <line x1="16" y1="8.8" x2="17.5" y2="10.6" />
  </svg>
);

export default function Nav() {
  return (
    <div className="fixed left-0 right-0 top-0 z-50">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mt-4 flex items-center justify-between rounded-2xl px-4 py-3 backdrop-blur-md">
          <a href="/" className="flex items-center gap-3">
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
              <a href="/#solutions" className="hover:text-white flex items-center gap-1">
                Solutions
                <svg className="h-3 w-3 transition-transform group-hover:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </a>
              <div className="invisible absolute left-1/2 top-full pt-2 opacity-0 transition-all group-hover:visible group-hover:opacity-100 -translate-x-1/2">
                <div className="rounded-2xl border border-white/10 bg-black/90 backdrop-blur-md p-3 min-w-[180px]">
                  <a href="/omnifin" className="flex items-center gap-3 rounded-xl px-3 py-2 hover:bg-white/10">
                    <FileSpreadsheet className="h-4 w-4 text-emerald-300" />
                    <span className="text-sm text-white">OmniFin</span>
                  </a>
                  <a href="/omnihr" className="flex items-center gap-3 rounded-xl px-3 py-2 hover:bg-white/10">
                    <Users className="h-4 w-4 text-emerald-300" />
                    <span className="text-sm text-white">OmniHR</span>
                  </a>
                  <a href="/orchestrator" className="flex items-center gap-3 rounded-xl px-3 py-2 hover:bg-white/10">
                    <MultiAgentIcon className="h-4 w-4 text-emerald-300" />
                    <span className="text-sm text-white">Multi-agent</span>
                  </a>
                </div>
              </div>
            </div>
            <a href="/#how" className="hover:text-white">
              How it works
            </a>
            <a href="/#governance" className="hover:text-white">
              Governance
            </a>
            <a href="/#contact" className="hover:text-white">
              Contact
            </a>
          </div>

          <a
            href="/#contact"
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white hover:bg-white/10"
          >
            Request access <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </div>
  );
}
