"use client";

import Link from "next/link";
import { RiWifiOffLine } from "react-icons/ri";
import { HiHome, HiBookOpen } from "react-icons/hi2";

export default function OfflinePage() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center p-6 text-center bg-bg-primary min-h-[70vh]">
      <div className="glass-card max-w-md w-full p-8 rounded-2xl flex flex-col items-center shadow-lg border border-border">
        <div className="p-4 bg-accent/10 text-accent rounded-full mb-6">
          <RiWifiOffLine size={48} aria-hidden="true" />
        </div>
        
        <h1 className="text-2xl font-black tracking-tight text-text-primary mb-3">
          Connection Lost
        </h1>
        
        <p className="text-text-secondary text-sm leading-relaxed mb-8">
          You are currently offline or your network is unstable. Continue reading your saved history or try refreshing when your signal returns.
        </p>

        <div className="w-full flex flex-col gap-3">
          <button 
            onClick={() => window.location.reload()}
            className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-gradient-to-r from-accent to-accent-secondary hover:opacity-90 text-white rounded-xl font-semibold transition-all duration-300"
          >
            Try Again
          </button>
          
          <Link 
            href="/"
            className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-white/5 hover:bg-white/10 text-text-primary rounded-xl font-semibold border border-white/5 transition-all duration-300"
          >
            <HiHome size={18} aria-hidden="true" />
            <span>Go Home</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
