'use client';

import React, { useEffect, useRef, useState } from 'react';
import AppImage from '@/components/ui/AppImage';

/* ─────────────── Particle ─────────────── */
interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
  driftX: number;
}

/* ─────────────── ECG SVG ─────────────── */
function EcgLine({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 50" className={className} fill="none">
      <polyline
        points="0,25 20,25 30,25 40,10 50,40 60,5 70,45 80,25 100,25 120,25 130,18 140,32 150,25 200,25"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="ecg-line"
      />
    </svg>
  );
}

/* ─────────────── Holographic Card ─────────────── */
function HoloCard({
  icon,
  label,
  value,
  className = '',
}: {
  icon: React.ReactNode;
  label: string;
  value?: string;
  className?: string;
}) {
  return (
    <div
      className={`card-glass-accent rounded-xl px-3 py-2 hologram-flicker ${className}`}
      style={{ minWidth: '120px' }}
    >
      <div className="flex items-center gap-2 mb-1">
        <span className="text-accent">{icon}</span>
        <span className="text-[9px] font-black uppercase tracking-widest text-muted-foreground">
          {label}
        </span>
      </div>
      {value && (
        <p className="text-lg font-black tracking-tighter text-foreground">{value}</p>
      )}
    </div>
  );
}

/* ─────────────── Main Hero ─────────────── */
export default function HeroSection() {
  const heroRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const holoRef = useRef<HTMLDivElement>(null);
  const dashRef = useRef<HTMLDivElement>(null);
  const [particles, setParticles] = useState<Particle[]>([]);
  const [scrollState, setScrollState] = useState<0 | 1 | 2>(0);

  /* Generate particles client-side only */
  useEffect(() => {
    const pts: Particle[] = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: (i * 47 + 13) % 100,
      y: (i * 31 + 7) % 100,
      size: 2 + (i % 3),
      duration: 6 + (i % 5),
      delay: (i * 0.4) % 4,
      driftX: ((i % 5) - 2) * 20,
    }));
    setParticles(pts);
  }, []);

  /* Scroll state machine */
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const vh = window.innerHeight;
      if (scrollY < vh * 0.3) setScrollState(0);
      else if (scrollY < vh * 0.7) setScrollState(1);
      else setScrollState(2);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  /* Scroll parallax */
  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const scrollY = window.scrollY;
          if (logoRef.current) {
            const rotate = scrollY * 0.04;
            const scale = Math.max(0.85, 1 - scrollY * 0.0003);
            logoRef.current.style.transform = `rotateY(${rotate}deg) scale(${scale})`;
          }
          if (holoRef.current) {
            holoRef.current.style.opacity = scrollState >= 1 ? '1' : '0';
            holoRef.current.style.transform = `translateY(${-scrollY * 0.08}px)`;
          }
          if (dashRef.current) {
            dashRef.current.style.opacity = scrollState >= 2 ? '1' : '0';
            dashRef.current.style.transform = `translateY(${-scrollY * 0.12}px)`;
          }
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrollState]);

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden grid-tech"
      id="hero"
    >
      {/* ── Background atmosphere ── */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="blob-hero absolute top-1/4 left-1/4 w-48 h-48 sm:w-72 sm:h-72 lg:w-96 lg:h-96 opacity-60" />
        <div className="blob-accent absolute bottom-1/4 right-1/4 w-40 h-40 sm:w-60 sm:h-60 lg:w-80 lg:h-80 opacity-40" />
        <div className="blob-hero absolute top-1/2 right-1/3 w-32 h-32 sm:w-48 sm:h-48 lg:w-64 lg:h-64 opacity-30" />
      </div>

      {/* ── Particles ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {particles.map((p) => (
          <div
            key={p.id}
            className="absolute rounded-full bg-accent"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: p.size,
              height: p.size,
              opacity: 0,
              animation: `particle-drift ${p.duration}s linear ${p.delay}s infinite`,
            }}
          />
        ))}
      </div>

      {/* ── Scan line ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="scan-line-anim w-full h-20 absolute top-0 left-0" />
      </div>

      {/* ── Massive background text ── */}
      <div
        className="absolute top-1/2 left-1/2 text-foreground pointer-events-none select-none font-black tracking-tighter uppercase text-[clamp(2rem,12vw,8rem)]"
        style={{
          transform: 'translate(-50%, -50%)',
          opacity: 0.015,
          whiteSpace: 'nowrap',
          zIndex: 0,
        }}
      >
        MEDIVARDAAN
      </div>

      {/* ── Main grid layout ── */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center py-12 sm:py-16 lg:py-24">

        {/* ── LEFT: Copy ── */}
        <div className="space-y-6 sm:space-y-8 lg:space-y-10 text-center lg:text-left order-2 lg:order-1">
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-primary/30 bg-primary/10">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
            </span>
            <span className="text-[9px] font-black uppercase tracking-widest text-accent">
              Healthcare SaaS · Live
            </span>
          </div>

          {/* Headline */}
          <div className="space-y-2 sm:space-y-4">
            <h1 className="font-black tracking-tighter uppercase leading-[0.85] text-foreground text-[clamp(2.5rem,8vw,5.5rem)]">
              Digitize<br />
              Your Clinic.<br />
              <span className="text-gradient-teal">Empower</span><br />
              Patient Care.
            </h1>
          </div>

          {/* Subheadline */}
          <p className="max-w-md mx-auto lg:mx-0 text-sm md:text-base font-medium leading-relaxed uppercase tracking-widest text-muted-foreground">
            A thoughtful operating system for the everyday work of care — from first hello to final follow-up.
          </p>

          {/* Stats row */}
          <div className="flex items-center justify-center lg:justify-start gap-6 sm:gap-10 border-t border-border pt-6 sm:pt-8 flex-wrap">
            <div className="text-center lg:text-left">
              <p className="text-2xl sm:text-3xl font-black tracking-tighter text-foreground">1,200+</p>
              <p className="text-[9px] font-black uppercase tracking-widest text-muted-foreground mt-1">Clinics Onboarded</p>
            </div>
            <div className="h-10 w-px bg-border hidden sm:block" />
            <div className="text-center lg:text-left">
              <p className="text-2xl sm:text-3xl font-black tracking-tighter text-foreground">99.9%</p>
              <p className="text-[9px] font-black uppercase tracking-widest text-muted-foreground mt-1">Uptime SLA</p>
            </div>
            <div className="h-10 w-px bg-border hidden sm:block" />
            <div className="text-center lg:text-left">
              <p className="text-2xl sm:text-3xl font-black tracking-tighter text-foreground">4.8s</p>
              <p className="text-[9px] font-black uppercase tracking-widest text-muted-foreground mt-1">Avg Load Time</p>
            </div>
          </div>

          {/* CTAs */}
          <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
            <a
              href="#pricing"
              className="bg-primary text-primary-foreground px-6 sm:px-10 py-3 sm:py-4 rounded-sm text-[10px] font-black uppercase tracking-widest hover:bg-accent transition-all duration-300 border-glow"
            >
              Start Free Trial
            </a>
            <a
              href="#how-it-works"
              className="border border-border px-6 sm:px-10 py-3 sm:py-4 rounded-sm text-[10px] font-black uppercase tracking-widest text-foreground hover:bg-card transition-all duration-300 flex items-center gap-3"
            >
              Watch Demo
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="text-accent">
                <path d="M8 5v14l11-7z" />
              </svg>
            </a>
          </div>
        </div>

        {/* ── RIGHT: 3D Logo + Holographic System ── */}
        <div
          className="relative flex items-center justify-center order-1 lg:order-2"
          style={{ minHeight: 'clamp(320px, 50vw, 560px)' }}
        >
          {/* Outer decorative rings — scale with container */}
          <div
            className="absolute rounded-full border border-primary/10 spin-slow"
            style={{ width: 'clamp(260px, 40vw, 480px)', height: 'clamp(260px, 40vw, 480px)' }}
          />
          <div
            className="absolute rounded-full border border-accent/8 counter-spin"
            style={{ width: 'clamp(220px, 34vw, 400px)', height: 'clamp(220px, 34vw, 400px)' }}
          />

          {/* ── State 2: Dashboard orbit cards (deep scroll) ── */}
          <div
            ref={dashRef}
            className="absolute inset-0 flex items-center justify-center pointer-events-none transition-all duration-1000"
            style={{ opacity: 0 }}
          >
            {/* Dashboard card — top right */}
            <div
              className="absolute card-glass-accent rounded-xl p-2 sm:p-3 hologram-flicker"
              style={{ top: '4%', right: '-2%', width: 'clamp(120px, 18vw, 160px)' }}
            >
              <p className="text-[8px] font-black uppercase tracking-widest text-muted-foreground mb-1 sm:mb-2">
                Revenue Today
              </p>
              <p className="text-lg sm:text-2xl font-black tracking-tighter text-accent">₹84,200</p>
              <div className="mt-1 sm:mt-2 h-1 bg-border rounded-full overflow-hidden">
                <div className="h-full bg-accent rounded-full" style={{ width: '72%' }} />
              </div>
            </div>

            {/* Chart card — bottom left */}
            <div
              className="absolute card-glass-accent rounded-xl p-2 sm:p-3 hologram-flicker"
              style={{ bottom: '8%', left: '-2%', width: 'clamp(115px, 17vw, 155px)' }}
            >
              <p className="text-[8px] font-black uppercase tracking-widest text-muted-foreground mb-1 sm:mb-2">
                Patient Visits
              </p>
              <div className="flex items-end gap-1 h-8 sm:h-10">
                {[40, 65, 50, 80, 60, 90, 75].map((h, i) => (
                  <div
                    key={i}
                    className="flex-1 rounded-sm bg-primary/40"
                    style={{ height: `${h}%`, transitionDelay: `${i * 80}ms` }}
                  />
                ))}
              </div>
            </div>

            {/* Appointments orbit dot */}
            <div
              className="absolute card-glass rounded-lg px-2 sm:px-3 py-1.5 sm:py-2 hologram-flicker"
              style={{ bottom: '30%', right: '-4%' }}
            >
              <div className="flex items-center gap-1.5 sm:gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
                </span>
                <span className="text-[8px] sm:text-[9px] font-black uppercase tracking-widest text-muted-foreground whitespace-nowrap">
                  24 Appts Today
                </span>
              </div>
            </div>
          </div>

          {/* ── State 1: Holographic floating elements (mid scroll) ── */}
          <div
            ref={holoRef}
            className="absolute inset-0 flex items-center justify-center pointer-events-none transition-all duration-1000"
            style={{ opacity: 0 }}
          >
            {/* Medical document — top left */}
            <div
              className="absolute card-glass rounded-xl p-2 sm:p-3 float-gentle hologram-flicker"
              style={{ top: '10%', left: '-2%', width: 'clamp(110px, 16vw, 140px)' }}
            >
              <div className="flex items-center gap-1.5 sm:gap-2 mb-1.5 sm:mb-2">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-accent flex-shrink-0">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                  <line x1="16" y1="13" x2="8" y2="13" />
                  <line x1="16" y1="17" x2="8" y2="17" />
                  <polyline points="10 9 9 9 8 9" />
                </svg>
                <span className="text-[8px] font-black uppercase tracking-widest text-muted-foreground">Patient EHR</span>
              </div>
              <div className="space-y-1">
                <div className="h-1.5 bg-border rounded-full w-full" />
                <div className="h-1.5 bg-border rounded-full w-3/4" />
                <div className="h-1.5 bg-border rounded-full w-5/6" />
              </div>
            </div>

            {/* Telephone — top right */}
            <div
              className="absolute card-glass rounded-xl p-2 sm:p-3 float-gentle-delay hologram-flicker"
              style={{ top: '6%', right: '-2%', width: 'clamp(105px, 15vw, 130px)' }}
            >
              <div className="flex items-center gap-1.5 sm:gap-2 mb-1">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-accent flex-shrink-0">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13.6a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 3h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 10.6a16 16 0 0 0 6 6l.96-.87a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 18z" />
                </svg>
                <span className="text-[8px] font-black uppercase tracking-widest text-muted-foreground">Teleconsult</span>
              </div>
              <p className="text-[10px] sm:text-xs font-bold text-foreground">Dr. Mehta Online</p>
            </div>

            {/* Billing doc — bottom right */}
            <div
              className="absolute card-glass rounded-xl p-2 sm:p-3 float-gentle hologram-flicker"
              style={{ bottom: '12%', right: '-2%', width: 'clamp(115px, 16vw, 145px)' }}
            >
              <div className="flex items-center gap-1.5 sm:gap-2 mb-1.5 sm:mb-2">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-accent flex-shrink-0">
                  <line x1="12" y1="1" x2="12" y2="23" />
                  <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                </svg>
                <span className="text-[8px] font-black uppercase tracking-widest text-muted-foreground">Billing</span>
              </div>
              <p className="text-sm font-black tracking-tighter text-accent">₹12,400</p>
              <p className="text-[9px] text-muted-foreground">Invoice #2847</p>
            </div>
          </div>

          {/* ── Central 3D Logo Object ── */}
          <div
            ref={logoRef}
            className="relative z-10 flex items-center justify-center"
            style={{
              width: 'clamp(200px, 30vw, 280px)',
              height: 'clamp(200px, 30vw, 280px)',
              transformStyle: 'preserve-3d',
              perspective: '800px',
              transition: 'transform 0.1s linear',
            }}
          >
            {/* Glow backdrop */}
            <div
              className="absolute inset-0 rounded-full"
              style={{
                background:
                  'radial-gradient(circle at center, rgba(34,211,165,0.25) 0%, rgba(13,148,136,0.1) 40%, transparent 70%)',
                filter: 'blur(30px)',
              }}
            />

            {/* Pulsing outer rings */}
            <div
              className="absolute rounded-full border-2 border-accent/40 pulse-ring"
              style={{ width: 'clamp(185px, 28vw, 260px)', height: 'clamp(185px, 28vw, 260px)' }}
            />
            <div
              className="absolute rounded-full border border-primary/30 pulse-ring"
              style={{
                width: 'clamp(165px, 25vw, 230px)',
                height: 'clamp(165px, 25vw, 230px)',
                animationDelay: '0.5s',
              }}
            />

            {/* Main logo container */}
            <div
              className="relative rounded-2xl neon-border flex flex-col items-center justify-center gap-2 sm:gap-3 heartbeat-pulse"
              style={{
                width: 'clamp(140px, 20vw, 192px)',
                height: 'clamp(140px, 20vw, 192px)',
                background:
                  'linear-gradient(135deg, rgba(10,22,40,0.95) 0%, rgba(13,148,136,0.15) 100%)',
              }}
            >
              {/* Logo image */}
              <AppImage
                src="https://medivardaan-site.vercel.app/assets/logo-DAbkXH6q.png"
                alt="Medivardaan — hand cradling leaf with ECG pulse, representing care connected"
                width={80}
                height={80}
                className="object-contain glow-teal w-14 h-14 sm:w-16 sm:h-16 lg:w-20 lg:h-20"
                priority
              />

              {/* ECG line */}
              <EcgLine className="w-16 h-6 sm:w-20 sm:h-7 lg:w-24 lg:h-8 text-accent" />

              {/* Status */}
              <div className="flex items-center gap-1.5">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-accent"></span>
                </span>
                <span className="text-[7px] sm:text-[8px] font-black uppercase tracking-widest text-accent">
                  System Live
                </span>
              </div>
            </div>

            {/* Corner tech markers */}
            <div className="absolute top-2 left-2 w-4 h-4 sm:w-5 sm:h-5 border-t-2 border-l-2 border-accent/50 rounded-tl-md" />
            <div className="absolute top-2 right-2 w-4 h-4 sm:w-5 sm:h-5 border-t-2 border-r-2 border-accent/50 rounded-tr-md" />
            <div className="absolute bottom-2 left-2 w-4 h-4 sm:w-5 sm:h-5 border-b-2 border-l-2 border-accent/50 rounded-bl-md" />
            <div className="absolute bottom-2 right-2 w-4 h-4 sm:w-5 sm:h-5 border-b-2 border-r-2 border-accent/50 rounded-br-md" />
          </div>

          {/* ── Scroll hint indicator ── */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40">
            <span className="text-[8px] font-black uppercase tracking-widest text-muted-foreground">
              Scroll to explore
            </span>
            <div className="w-px h-8 bg-gradient-to-b from-accent to-transparent" />
          </div>
        </div>
      </div>

      {/* ── Scroll state indicator ── */}
      <div className="absolute bottom-8 right-4 sm:right-8 flex flex-col gap-2 z-10">
        {[0, 1, 2].map((s) => (
          <div
            key={s}
            className="w-1 rounded-full transition-all duration-500"
            style={{
              height: scrollState === s ? 24 : 8,
              background: scrollState === s ? 'var(--accent)' : 'var(--border)',
            }}
          />
        ))}
      </div>

      {/* ── Bottom fade ── */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
        style={{
          background: 'linear-gradient(to bottom, transparent, var(--background))',
        }}
      />
    </section>
  );
}
