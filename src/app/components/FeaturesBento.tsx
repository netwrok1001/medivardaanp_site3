'use client';

import React, { useEffect, useRef } from 'react';
import Icon from '@/components/ui/AppIcon';

/* ── BENTO GRID AUDIT ──────────────────────────────
   Array has 6 cards: [Scheduling, Records, Billing, Telemedicine, Security, Uptime]

   3-col grid:
   Row 1: [col-1,2: Scheduling cs-2 rs-1] [col-3: Records cs-1 rs-1]
   Row 2: [col-1,2: Billing cs-2 rs-1]    [col-3: Telemedicine cs-1 rs-1]
   Row 3: [col-1,2: Security cs-2 rs-1]   [col-3: Uptime cs-1 rs-1]

   Placed 6/6 cards ✓
───────────────────────────────────────────────────── */

export default function FeaturesBento() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const items = entry.target.querySelectorAll('.bento-reveal');
            items.forEach((item, i) => {
              setTimeout(() => {
                (item as HTMLElement).style.opacity = '1';
                (item as HTMLElement).style.transform = 'translateY(0)';
              }, i * 100);
            });
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-16 md:py-24 overflow-hidden" id="features">
      <div className="mx-auto max-w-7xl px-6">
        {/* Header */}
        <div className="mb-14 bento-reveal opacity-100" style={{ transition: 'opacity 0.6s ease, transform 0.6s ease' }}>
          <p className="text-[9px] font-black uppercase tracking-[0.5em] text-accent mb-3">
            The Platform
          </p>
          <h2 className="text-4xl md:text-6xl font-black tracking-tighter uppercase leading-[0.9] text-foreground">
            Everything Your<br />
            <span className="text-gradient-teal">Clinic Needs.</span>
          </h2>
          <p className="mt-4 max-w-lg text-sm font-medium uppercase tracking-widest text-muted-foreground leading-relaxed">
            Nothing it doesn't. Six modules. One smoother day.
          </p>
        </div>

        {/* Bento Grid — 3 cols */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">

          {/* ── CARD 1: Scheduling (col-span-2) ── */}
          <div
            className="md:col-span-2 bento-reveal opacity-100 card-glass rounded-2xl p-8 group hover:border-primary/50 transition-all duration-500 relative overflow-hidden"
            style={{ transition: 'opacity 0.6s ease, transform 0.6s ease, border-color 0.3s ease' }}
          >
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              style={{ background: 'radial-gradient(ellipse at top left, rgba(13,148,136,0.08) 0%, transparent 60%)' }} />
            <div className="flex flex-col md:flex-row gap-8 items-start relative z-10">
              <div className="flex-1 space-y-4">
                <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center">
                  <Icon name="CalendarDaysIcon" size={24} className="text-accent" />
                </div>
                <div>
                  <p className="text-[9px] font-black uppercase tracking-widest text-muted-foreground mb-1">01</p>
                  <h3 className="text-2xl font-black uppercase tracking-tight text-foreground">Smart Scheduling</h3>
                  <p className="mt-2 text-sm font-medium text-muted-foreground leading-relaxed uppercase tracking-wider">
                    Drag-and-drop appointment calendar. Auto-confirmation SMS. Zero double-bookings.
                  </p>
                </div>
                <div className="flex items-center gap-3 pt-2">
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent/10 border border-accent/20">
                    <span className="relative flex h-1.5 w-1.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-accent"></span>
                    </span>
                    <span className="text-[9px] font-black uppercase tracking-widest text-accent">Live Sync</span>
                  </div>
                  <span className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground">
                    24 appts today
                  </span>
                </div>
              </div>
              {/* Mini calendar visual */}
              <div className="flex-shrink-0 hidden md:block">
                <div className="card-glass-accent rounded-xl p-4 w-44">
                  <p className="text-[8px] font-black uppercase tracking-widest text-muted-foreground mb-3">August 2026</p>
                  <div className="grid grid-cols-7 gap-1">
                    {['M','T','W','T','F','S','S'].map((d, i) => (
                      <div key={i} className="text-[7px] font-black text-muted-foreground text-center">{d}</div>
                    ))}
                    {Array.from({ length: 31 }, (_, i) => (
                      <div
                        key={i}
                        className={`text-[8px] font-bold text-center rounded py-0.5 ${
                          [4, 11, 18, 25].includes(i + 1)
                            ? 'bg-primary text-primary-foreground'
                            : i + 1 === 25
                            ? 'bg-accent text-accent-foreground'
                            : 'text-muted-foreground hover:text-foreground'
                        }`}
                      >
                        {i + 1}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ── CARD 2: Records (col-span-1) ── */}
          <div
            className="bento-reveal opacity-100 card-glass rounded-2xl p-6 group hover:border-primary/50 transition-all duration-500 relative overflow-hidden"
            style={{ transition: 'opacity 0.6s ease, transform 0.6s ease, border-color 0.3s ease' }}
          >
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              style={{ background: 'radial-gradient(ellipse at bottom right, rgba(34,211,165,0.08) 0%, transparent 60%)' }} />
            <div className="relative z-10 h-full flex flex-col justify-between">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-accent/20 flex items-center justify-center">
                  <Icon name="DocumentTextIcon" size={24} className="text-accent" />
                </div>
                <div>
                  <p className="text-[9px] font-black uppercase tracking-widest text-muted-foreground mb-1">02</p>
                  <h3 className="text-xl font-black uppercase tracking-tight text-foreground">Patient Records</h3>
                  <p className="mt-2 text-xs font-medium text-muted-foreground leading-relaxed uppercase tracking-wider">
                    Complete EHR. Searchable in 2 seconds.
                  </p>
                </div>
              </div>
              <div className="mt-6 space-y-2">
                {['Priya Sharma — OPD', 'Rajan Mehta — Follow-up', 'Ananya Singh — Lab'].map((r, i) => (
                  <div key={i} className="flex items-center gap-2 py-1.5 border-b border-border/50 last:border-0">
                    <div className="w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0" />
                    <span className="text-[9px] font-bold text-muted-foreground truncate">{r}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── CARD 3: Billing (col-span-2) ── */}
          <div
            className="md:col-span-2 bento-reveal opacity-100 card-glass rounded-2xl p-8 group hover:border-primary/50 transition-all duration-500 relative overflow-hidden"
            style={{ transition: 'opacity 0.6s ease, transform 0.6s ease, border-color 0.3s ease' }}
          >
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              style={{ background: 'radial-gradient(ellipse at bottom left, rgba(13,148,136,0.08) 0%, transparent 60%)' }} />
            <div className="relative z-10 flex flex-col md:flex-row gap-8 items-start">
              <div className="flex-1 space-y-4">
                <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center">
                  <Icon name="CurrencyRupeeIcon" size={24} className="text-accent" />
                </div>
                <div>
                  <p className="text-[9px] font-black uppercase tracking-widest text-muted-foreground mb-1">03</p>
                  <h3 className="text-2xl font-black uppercase tracking-tight text-foreground">Billing & Invoicing</h3>
                  <p className="mt-2 text-sm font-medium text-muted-foreground leading-relaxed uppercase tracking-wider">
                    GST-ready invoices. Insurance claims. One-click payment links via WhatsApp.
                  </p>
                </div>
              </div>
              {/* Revenue stat */}
              <div className="flex-shrink-0">
                <div className="card-glass-accent rounded-xl p-5 text-center">
                  <p className="text-[8px] font-black uppercase tracking-widest text-muted-foreground mb-1">
                    This Month
                  </p>
                  <p className="text-4xl font-black tracking-tighter text-accent">₹4.2L</p>
                  <p className="text-[9px] font-bold text-muted-foreground mt-1 uppercase tracking-widest">
                    +18% vs last month
                  </p>
                  <div className="mt-3 flex items-end gap-1 h-8">
                    {[55, 70, 60, 85, 75, 95, 88].map((h, i) => (
                      <div
                        key={i}
                        className="flex-1 rounded-sm bg-primary/50 group-hover:bg-accent/60 transition-colors duration-300"
                        style={{ height: `${h}%`, transitionDelay: `${i * 50}ms` }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ── CARD 4: Telemedicine (col-span-1) ── */}
          <div
            className="bento-reveal opacity-100 card-glass rounded-2xl p-6 group hover:border-primary/50 transition-all duration-500 relative overflow-hidden"
            style={{ transition: 'opacity 0.6s ease, transform 0.6s ease, border-color 0.3s ease' }}
          >
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              style={{ background: 'radial-gradient(ellipse at top, rgba(34,211,165,0.1) 0%, transparent 60%)' }} />
            <div className="relative z-10 h-full flex flex-col justify-between">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-accent/20 flex items-center justify-center">
                  <Icon name="VideoCameraIcon" size={24} className="text-accent" />
                </div>
                <div>
                  <p className="text-[9px] font-black uppercase tracking-widest text-muted-foreground mb-1">04</p>
                  <h3 className="text-xl font-black uppercase tracking-tight text-foreground">Telemedicine</h3>
                  <p className="mt-2 text-xs font-medium text-muted-foreground leading-relaxed uppercase tracking-wider">
                    HD video consults. Built-in prescription pads.
                  </p>
                </div>
              </div>
              <div className="mt-6 flex items-center gap-3 p-3 rounded-xl bg-accent/10 border border-accent/20">
                <div className="w-8 h-8 rounded-full bg-accent/30 flex items-center justify-center flex-shrink-0">
                  <Icon name="UserCircleIcon" size={16} className="text-accent" />
                </div>
                <div>
                  <p className="text-[9px] font-black text-foreground">Dr. Kavita Nair</p>
                  <div className="flex items-center gap-1">
                    <span className="relative flex h-1.5 w-1.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-accent"></span>
                    </span>
                    <span className="text-[8px] text-accent font-bold">In session</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ── CARD 5: Security (col-span-2) ── */}
          <div
            className="md:col-span-2 bento-reveal opacity-100 rounded-2xl p-8 group transition-all duration-500 relative overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, #0D9488 0%, #065F56 100%)',
              transition: 'opacity 0.6s ease, transform 0.6s ease',
            }}
          >
            <div className="grid-tech-fine absolute inset-0 opacity-30" />
            <div className="relative z-10 flex flex-col md:flex-row gap-8 items-start">
              <div className="flex-1 space-y-4">
                <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
                  <Icon name="ShieldCheckIcon" size={24} className="text-white" />
                </div>
                <div>
                  <p className="text-[9px] font-black uppercase tracking-widest text-white/60 mb-1">05</p>
                  <h3 className="text-2xl font-black uppercase tracking-tight text-white">
                    Security & Privacy
                  </h3>
                  <p className="mt-2 text-sm font-medium text-white/70 leading-relaxed uppercase tracking-wider">
                    Your data deserves deep respect. End-to-end encryption. HIPAA-aligned. Strong protection that feels invisible.
                  </p>
                </div>
              </div>
              <div className="flex-shrink-0 grid grid-cols-2 gap-2">
                {['AES-256', 'HIPAA', 'SOC 2', 'ISO 27001'].map((cert) => (
                  <div key={cert} className="px-3 py-2 rounded-lg bg-white/15 border border-white/20 text-center">
                    <span className="text-[9px] font-black uppercase tracking-widest text-white">{cert}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── CARD 6: Uptime (col-span-1) ── */}
          <div
            className="bento-reveal opacity-100 card-glass rounded-2xl p-6 group hover:border-primary/50 transition-all duration-500 relative overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, rgba(10,22,40,0.9) 0%, rgba(6,95,86,0.3) 100%)',
              transition: 'opacity 0.6s ease, transform 0.6s ease, border-color 0.3s ease',
            }}
          >
            <div className="relative z-10 h-full flex flex-col justify-end">
              <div className="mb-4">
                <Icon name="SignalIcon" size={32} className="text-accent mb-3" />
                <p className="text-[9px] font-black uppercase tracking-widest text-muted-foreground mb-1">06</p>
                <h3 className="text-xl font-black uppercase tracking-tight text-foreground">
                  Team Uptime
                </h3>
                <p className="mt-2 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Always-on. Global mesh. Zero downtime promise.
                </p>
              </div>
              <div className="relative">
                <div className="absolute -inset-6 rounded-full opacity-20"
                  style={{ background: 'radial-gradient(circle, rgba(34,211,165,0.4) 0%, transparent 70%)' }} />
                <span className="relative text-6xl font-black tracking-tighter text-foreground">
                  99.9<span className="text-accent text-3xl">%</span>
                </span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}