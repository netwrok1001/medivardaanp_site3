'use client';

import React, { useEffect, useRef } from 'react';
import Icon from '@/components/ui/AppIcon';

const stats = [
  { label: 'Infiltration Rate', value: '0.00%', sub: 'Breach attempts defeated' },
  { label: 'Response Time', value: '1.2s', sub: 'Threat isolation speed' },
  { label: 'Encryption', value: 'AES-256', sub: 'All data at rest + transit' },
  { label: 'Uptime SLA', value: '99.9%', sub: 'Global mesh guarantee' },
];

const certs = [
  { icon: 'ShieldCheckIcon' as const, label: 'HIPAA Aligned' },
  { icon: 'DocumentCheckIcon' as const, label: 'SOC 2 Type 2' },
  { icon: 'LockClosedIcon' as const, label: 'ISO 27001' },
  { icon: 'GlobeAltIcon' as const, label: 'GDPR Ready' },
];

export default function SecuritySection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const items = entry.target.querySelectorAll('.sec-reveal');
            items.forEach((item, i) => {
              setTimeout(() => {
                (item as HTMLElement).style.opacity = '1';
                (item as HTMLElement).style.transform = 'translateY(0)';
              }, i * 120);
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
    <section ref={sectionRef} className="py-16 md:py-24 overflow-hidden" id="security">
      <div className="mx-auto max-w-7xl px-6 space-y-16">

        {/* ── Stats bar ── */}
        <div className="sec-reveal opacity-100 grid grid-cols-2 md:grid-cols-4 border border-border"
          style={{ transition: 'opacity 0.6s ease, transform 0.6s ease' }}>
          {stats.map((s, i) => (
            <div
              key={s.label}
              className={`p-8 space-y-3 group hover:bg-card/50 transition-colors duration-300 ${
                i < stats.length - 1 ? 'border-r border-border' : ''
              } ${i >= 2 ? 'border-t border-border md:border-t-0' : ''}`}
            >
              <p className="text-[9px] font-black uppercase tracking-[0.5em] text-accent">{s.label}</p>
              <p className="text-3xl md:text-4xl font-black tracking-tighter text-foreground">{s.value}</p>
              <p className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground leading-relaxed">{s.sub}</p>
            </div>
          ))}
        </div>

        {/* ── Main security content ── */}
        <div className="grid lg:grid-cols-2 gap-1">

          {/* Left: copy */}
          <div
            className="sec-reveal opacity-100 p-10 md:p-16 border border-border bg-card/30 flex flex-col justify-between"
            style={{ transition: 'opacity 0.6s ease 0.12s, transform 0.6s ease 0.12s' }}
          >
            <div className="space-y-8">
              <p className="text-[9px] font-black uppercase tracking-[0.5em] text-accent">Security & Trust</p>
              <h2 className="text-4xl md:text-6xl font-black tracking-tighter uppercase leading-[0.9] text-foreground">
                Your Data<br />
                Deserves Deep<br />
                <span className="text-gradient-teal">Respect.</span>
              </h2>
              <p className="text-sm font-medium uppercase tracking-widest text-muted-foreground leading-relaxed max-w-md">
                Strong protection should feel invisible. We handle the hard parts so your team can focus on care — not compliance.
              </p>
            </div>

            <div className="mt-12 grid grid-cols-2 gap-3">
              {certs.map((cert) => (
                <div
                  key={cert.label}
                  className="flex items-center gap-3 p-4 rounded-xl border border-border bg-card/50 hover:border-primary/50 hover:bg-card transition-all duration-300 group"
                >
                  <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/30 transition-colors">
                    <Icon name={cert.icon} size={20} className="text-accent" />
                  </div>
                  <span className="text-[9px] font-black uppercase tracking-widest text-muted-foreground group-hover:text-foreground transition-colors">
                    {cert.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: visual terminal */}
          <div
            className="sec-reveal opacity-100 relative overflow-hidden border border-border"
            style={{
              background: 'linear-gradient(135deg, #060A0F 0%, #0F2027 100%)',
              transition: 'opacity 0.6s ease 0.24s, transform 0.6s ease 0.24s',
            }}
          >
            <div className="grid-tech absolute inset-0 opacity-30" />
            <div className="absolute inset-0 opacity-10"
              style={{ background: 'radial-gradient(ellipse at top right, rgba(34,211,165,0.3) 0%, transparent 60%)' }} />

            <div className="relative z-10 p-10 md:p-16 h-full flex flex-col justify-between">
              {/* Terminal header */}
              <div className="flex items-center gap-2 mb-6">
                <div className="w-3 h-3 rounded-full bg-red-500/70" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
                <div className="w-3 h-3 rounded-full bg-accent/70" />
                <span className="ml-3 text-[9px] font-black uppercase tracking-widest text-muted-foreground">
                  security_monitor.sh
                </span>
              </div>

              {/* Terminal lines */}
              <div className="font-mono text-[11px] space-y-3 flex-1">
                {[
                  { prefix: '>', text: 'SYSTEM_AUTH: OK', color: 'text-accent' },
                  { prefix: '>', text: 'ENCRYPTION: AES_256_GCM', color: 'text-accent' },
                  { prefix: '>', text: 'THREAT_LEVEL: 0.00%', color: 'text-accent' },
                  { prefix: '>', text: 'LAST_AUDIT: 2026-08-25', color: 'text-muted-foreground' },
                  { prefix: '>', text: 'HIPAA_STATUS: COMPLIANT', color: 'text-accent' },
                  { prefix: '>', text: 'DATA_RESIDENCY: IN/US', color: 'text-muted-foreground' },
                  { prefix: '>', text: 'UPTIME: 99.999% (30d avg)', color: 'text-accent' },
                  { prefix: '$', text: 'All systems nominal_', color: 'text-foreground', blink: true },
                ].map((line, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <span className="text-primary font-black">{line.prefix}</span>
                    <span className={`${line.color} font-bold`}>
                      {line.text}
                      {line.blink && <span className="blink-cursor text-accent">|</span>}
                    </span>
                  </div>
                ))}
              </div>

              {/* Bottom stat */}
              <div className="mt-8 pt-8 border-t border-border flex items-center justify-between">
                <div>
                  <p className="text-[9px] font-black uppercase tracking-widest text-muted-foreground">Protected Nodes</p>
                  <p className="text-5xl font-black tracking-tighter text-accent">450K+</p>
                </div>
                <div className="w-16 h-16 rounded-full border-2 border-accent/30 flex items-center justify-center">
                  <Icon name="ShieldCheckIcon" size={28} className="text-accent" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── Growth chart ── */}
        <div
          className="sec-reveal opacity-100 border border-border p-10 md:p-16"
          style={{ transition: 'opacity 0.6s ease 0.36s, transform 0.6s ease 0.36s' }}
        >
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 mb-12">
            <div>
              <p className="text-[9px] font-black uppercase tracking-[0.5em] text-accent mb-3">Scale With Medivardaan</p>
              <h3 className="text-3xl md:text-5xl font-black tracking-tighter uppercase leading-[0.9] text-foreground">
                Growing With<br />Every Clinic
              </h3>
            </div>
            <div className="text-right">
              <p className="text-[9px] font-black uppercase tracking-widest text-muted-foreground mb-2">Clinics Onboarded</p>
              <p className="text-6xl md:text-8xl font-black tracking-tighter text-accent">1,200+</p>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 border-t border-border">
            {[
              { year: '2022', val: '210', h: 'h-16' },
              { year: '2023', val: '480', h: 'h-28' },
              { year: '2024', val: '820', h: 'h-40' },
              { year: '2025 →', val: '1,200+', h: 'h-56' },
            ].map((item, i) => (
              <div
                key={item.year}
                className={`p-6 flex flex-col justify-between group hover:bg-card/50 transition-colors duration-300 ${
                  i < 3 ? 'border-r border-border' : ''
                }`}
              >
                <span className="text-[9px] font-black uppercase tracking-widest text-muted-foreground">{item.year}</span>
                <div className="space-y-3">
                  <div
                    className={`w-full ${item.h} bg-primary/20 group-hover:bg-primary/30 transition-colors duration-300 rounded-sm relative overflow-hidden`}
                  >
                    <div
                      className="absolute bottom-0 left-0 right-0 bg-accent/40 group-hover:bg-accent/60 transition-colors duration-300"
                      style={{ height: '30%' }}
                    />
                  </div>
                  <p className="text-xl font-black tracking-tighter text-foreground">{item.val}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}