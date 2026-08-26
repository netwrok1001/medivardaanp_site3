'use client';

import React, { useEffect, useRef } from 'react';
import Icon from '@/components/ui/AppIcon';

const steps = [
  {
    num: '01',
    icon: 'BuildingOffice2Icon' as const,
    title: 'Register Your Clinic',
    desc: 'Set up your clinic profile in under 10 minutes. Add doctors, departments, and working hours. No IT team required.',
    stat: '< 10 min setup',
  },
  {
    num: '02',
    icon: 'UsersIcon' as const,
    title: 'Onboard Your Team',
    desc: 'Role-based access for doctors, nurses, and admin staff. Each person sees exactly what they need — nothing more.',
    stat: 'Role-based access',
  },
  {
    num: '03',
    icon: 'HeartIcon' as const,
    title: 'Start Caring, Better',
    desc: 'Schedule appointments, manage records, send prescriptions, and process payments — all from one calm workspace.',
    stat: '1 platform, all workflows',
  },
];

export default function HowItWorks() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const items = entry.target.querySelectorAll('.step-reveal');
            items.forEach((item, i) => {
              setTimeout(() => {
                (item as HTMLElement).style.opacity = '1';
                (item as HTMLElement).style.transform = 'translateY(0)';
              }, i * 150);
            });
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-16 md:py-24 border-y border-border bg-secondary/30" id="how-it-works">
      <div className="mx-auto max-w-7xl px-6">

        {/* Header */}
        <div className="mb-16 step-reveal opacity-100" style={{ transition: 'opacity 0.6s ease, transform 0.6s ease' }}>
          <p className="text-[9px] font-black uppercase tracking-[0.5em] text-accent mb-3">How it Works</p>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter uppercase leading-[0.9] text-foreground">
              Six Steps.<br />
              <span className="text-gradient-teal">One Smoother Day.</span>
            </h2>
            <p className="max-w-xs text-sm font-medium uppercase tracking-widest text-muted-foreground leading-relaxed">
              Healthcare is human. Technology should be too.
            </p>
          </div>
        </div>

        {/* Three-column asymmetric layout */}
        <div className="grid md:grid-cols-3 gap-1">
          {steps.map((step, i) => (
            <div
              key={step.num}
              className={`step-reveal opacity-100 p-10 border border-border relative overflow-hidden group transition-all duration-500 ${
                i === 1 ? 'bg-primary text-primary-foreground' : 'bg-card/50 hover:bg-card'
              }`}
              style={{
                transition: `opacity 0.6s ease ${i * 0.15}s, transform 0.6s ease ${i * 0.15}s, background-color 0.3s ease`,
              }}
            >
              {/* Grid pattern on accent card */}
              {i === 1 && <div className="grid-tech-fine absolute inset-0 opacity-20" />}

              {/* Hover glow */}
              {i !== 1 && (
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ background: 'radial-gradient(ellipse at top left, rgba(13,148,136,0.1) 0%, transparent 60%)' }}
                />
              )}

              <div className="relative z-10 space-y-8 flex flex-col h-full">
                <div className="flex items-start justify-between">
                  <div
                    className={`w-14 h-14 rounded-xl flex items-center justify-center ${
                      i === 1 ? 'bg-white/20' : 'bg-primary/20'
                    }`}
                  >
                    <Icon
                      name={step.icon}
                      size={28}
                      className={i === 1 ? 'text-white' : 'text-accent'}
                    />
                  </div>
                  <span
                    className={`text-5xl font-black tracking-tighter ${
                      i === 1 ? 'text-white/20' : 'text-foreground/10'
                    }`}
                  >
                    {step.num}
                  </span>
                </div>

                <div className="flex-1 space-y-3">
                  <h3
                    className={`text-2xl font-black uppercase tracking-tight ${
                      i === 1 ? 'text-white' : 'text-foreground'
                    }`}
                  >
                    {step.title}
                  </h3>
                  <p
                    className={`text-sm font-medium leading-relaxed uppercase tracking-wider ${
                      i === 1 ? 'text-white/70' : 'text-muted-foreground'
                    }`}
                  >
                    {step.desc}
                  </p>
                </div>

                <div
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-sm text-[9px] font-black uppercase tracking-widest ${
                    i === 1 ? 'bg-white/20 text-white' : 'bg-accent/10 border border-accent/20 text-accent'
                  }`}
                >
                  <Icon name="CheckCircleIcon" size={12} className={i === 1 ? 'text-white' : 'text-accent'} />
                  {step.stat}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Screenshot mockup */}
        <div
          className="step-reveal opacity-100 mt-1 relative overflow-hidden rounded-b-2xl border border-t-0 border-border"
          style={{ transition: 'opacity 0.8s ease 0.45s, transform 0.8s ease 0.45s' }}
        >
          <div
            className="w-full p-8 md:p-16"
            style={{
              background: 'linear-gradient(135deg, #0A1628 0%, #0F2027 50%, #060A0F 100%)',
            }}
          >
            {/* Mock dashboard UI */}
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-red-500/70" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
                  <div className="w-3 h-3 rounded-full bg-accent/70" />
                </div>
                <div className="px-4 py-1.5 rounded-full bg-card/50 border border-border text-[9px] font-bold text-muted-foreground uppercase tracking-widest">
                  app.medivardaan.com
                </div>
                <div className="flex items-center gap-2">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
                  </span>
                  <span className="text-[9px] font-black uppercase tracking-widest text-accent">Live</span>
                </div>
              </div>

              {/* Dashboard content */}
              <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
                {/* Stat cards */}
                {[
                  { label: 'Patients Today', val: '48' },
                  { label: 'Revenue', val: '₹84K' },
                  { label: 'Pending Rx', val: '12' },
                ].map((s, i) => (
                  <div key={i} className="col-span-1 md:col-span-2 card-glass rounded-xl p-4">
                    <p className="text-[8px] font-black uppercase tracking-widest text-muted-foreground mb-1">{s.label}</p>
                    <p className="text-2xl font-black tracking-tighter text-foreground">{s.val}</p>
                  </div>
                ))}
                {/* Chart area */}
                <div className="col-span-3 md:col-span-4 card-glass rounded-xl p-4">
                  <p className="text-[8px] font-black uppercase tracking-widest text-muted-foreground mb-3">Weekly Visits</p>
                  <div className="flex items-end gap-2 h-14">
                    {[60, 80, 55, 90, 70, 95, 75].map((h, i) => (
                      <div
                        key={i}
                        className="flex-1 rounded-t-sm bg-primary/40"
                        style={{ height: `${h}%` }}
                      />
                    ))}
                  </div>
                </div>
                {/* Appointment list */}
                <div className="col-span-3 md:col-span-2 card-glass rounded-xl p-4">
                  <p className="text-[8px] font-black uppercase tracking-widest text-muted-foreground mb-3">Next Appointments</p>
                  {['9:00 — Priya Sharma', '9:30 — Arjun Patel', '10:00 — Meera Iyer'].map((a, i) => (
                    <div key={i} className="flex items-center gap-2 py-1.5 border-b border-border/40 last:border-0">
                      <div className="w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0" />
                      <span className="text-[9px] font-bold text-muted-foreground truncate">{a}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}