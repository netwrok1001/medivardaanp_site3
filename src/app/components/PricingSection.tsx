// 'use client';

// import React, { useEffect, useRef } from 'react';
// import Icon from '@/components/ui/AppIcon';

// const plans = [
//   {
//     tier: 'Tier_01',
//     name: 'Clinic Starter',
//     tagline: 'For solo practitioners and small clinics.',
//     price: '₹2,499',
//     period: '/mo',
//     features: [
//       '1 Doctor profile',
//       'Up to 500 patients/month',
//       'Scheduling & EHR',
//       'Basic billing & invoicing',
//       'Email support',
//     ],
//     cta: 'Start Free Trial',
//     accent: false,
//   },
//   {
//     tier: 'Tier_02 · Recommended',
//     name: 'Clinic Pro',
//     tagline: 'For multi-doctor clinics and growing practices.',
//     price: '₹6,999',
//     period: '/mo',
//     features: [
//       'Up to 10 Doctor profiles',
//       'Unlimited patients',
//       'Full EHR + Telemedicine',
//       'GST-ready billing + WhatsApp',
//       'Analytics dashboard',
//       '24/7 priority support',
//     ],
//     cta: 'Start Free Trial',
//     accent: true,
//   },
//   {
//     tier: 'Tier_03',
//     name: 'Hospital Suite',
//     tagline: 'Custom infrastructure for multi-specialty hospitals.',
//     price: 'Custom',
//     period: '',
//     features: [
//       'Unlimited doctors & staff',
//       'Multi-branch management',
//       'Custom integrations (HL7, FHIR)',
//       'Dedicated account manager',
//       'Full SLA guarantee',
//     ],
//     cta: 'Contact Sales',
//     accent: false,
//   },
// ];

// export default function PricingSection() {
//   const sectionRef = useRef<HTMLElement>(null);

//   useEffect(() => {
//     const observer = new IntersectionObserver(
//       (entries) => {
//         entries.forEach((entry) => {
//           if (entry.isIntersecting) {
//             const items = entry.target.querySelectorAll('.price-reveal');
//             items.forEach((item, i) => {
//               setTimeout(() => {
//                 (item as HTMLElement).style.opacity = '1';
//                 (item as HTMLElement).style.transform = 'translateY(0)';
//               }, i * 120);
//             });
//             observer.unobserve(entry.target);
//           }
//         });
//       },
//       { threshold: 0.1 }
//     );
//     if (sectionRef.current) observer.observe(sectionRef.current);
//     return () => observer.disconnect();
//   }, []);

//   return (
//     <section ref={sectionRef} className="py-16 md:py-24 overflow-hidden" id="pricing">
//       <div className="mx-auto max-w-7xl px-6 space-y-16">

//         {/* Header */}
//         <div className="price-reveal opacity-100 text-center space-y-4"
//           style={{ transition: 'opacity 0.6s ease, transform 0.6s ease' }}>
//           <p className="text-[9px] font-black uppercase tracking-[0.5em] text-accent">Defense Allocation</p>
//           <h2 className="text-5xl md:text-8xl font-black tracking-tighter uppercase italic text-foreground/10 select-none">
//             Select Protocol.
//           </h2>
//           <h3 className="text-2xl font-black uppercase tracking-[0.3em] text-accent -mt-8 relative z-10">
//             Good Care, Better Systems.
//           </h3>
//         </div>

//         {/* Pricing cards */}
//         <div className="grid md:grid-cols-3 gap-1 price-reveal opacity-100"
//           style={{ transition: 'opacity 0.6s ease 0.15s, transform 0.6s ease 0.15s' }}>
//           {plans.map((plan) => (
//             <div
//               key={plan.name}
//               className={`relative overflow-hidden flex flex-col justify-between p-10 transition-all duration-500 ${
//                 plan.accent
//                   ? 'bg-primary text-primary-foreground'
//                   : 'bg-card/50 border border-border hover:bg-card'
//               }`}
//             >
//               {/* Grid texture on accent */}
//               {plan.accent && <div className="grid-tech-fine absolute inset-0 opacity-20" />}

//               {/* Hover glow on non-accent */}
//               {!plan.accent && (
//                 <div
//                   className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-500"
//                   style={{ background: 'radial-gradient(ellipse at top, rgba(13,148,136,0.08) 0%, transparent 60%)' }}
//                 />
//               )}

//               <div className="relative z-10 space-y-8">
//                 {/* Tier label + icon */}
//                 <div className="flex items-start justify-between">
//                   <p className={`text-[9px] font-black uppercase tracking-[0.4em] ${
//                     plan.accent ? 'text-white/60' : 'text-muted-foreground'
//                   }`}>
//                     {plan.tier}
//                   </p>
//                   <Icon
//                     name={plan.accent ? 'ShieldCheckIcon' : plan.price === 'Custom' ? 'BoltIcon' : 'ShieldIcon' as any}
//                     size={20}
//                     className={plan.accent ? 'text-white' : 'text-muted-foreground/40'}
//                   />
//                 </div>

//                 {/* Name + tagline */}
//                 <div className="space-y-2">
//                   <h4 className={`text-2xl font-black uppercase tracking-tight ${
//                     plan.accent ? 'text-white italic' : 'text-foreground'
//                   }`}>
//                     {plan.name}
//                   </h4>
//                   <p className={`text-[10px] font-bold uppercase tracking-widest ${
//                     plan.accent ? 'text-white/60' : 'text-muted-foreground'
//                   }`}>
//                     {plan.tagline}
//                   </p>
//                 </div>

//                 {/* Price */}
//                 <div className={`text-5xl font-black tracking-tighter ${
//                   plan.accent ? 'text-white' : 'text-foreground'
//                 }`}>
//                   {plan.price}
//                   <span className={`text-xs ml-1 ${plan.accent ? 'text-white/40' : 'text-muted-foreground/40'}`}>
//                     {plan.period}
//                   </span>
//                 </div>

//                 {/* Features */}
//                 <ul className="space-y-3">
//                   {plan.features.map((f) => (
//                     <li key={f} className="flex items-center gap-3">
//                       <Icon
//                         name="CheckIcon"
//                         size={12}
//                         className={plan.accent ? 'text-white flex-shrink-0' : 'text-accent flex-shrink-0'}
//                       />
//                       <span className={`text-[10px] font-black uppercase tracking-widest ${
//                         plan.accent ? 'text-white/80' : 'text-muted-foreground'
//                       }`}>
//                         {f}
//                       </span>
//                     </li>
//                   ))}
//                 </ul>
//               </div>

//               {/* CTA */}
//               <button
//                 className={`relative z-10 mt-12 w-full py-4 text-[10px] font-black uppercase tracking-widest transition-all duration-300 ${
//                   plan.accent
//                     ? 'bg-white text-primary-foreground hover:bg-accent'
//                     : 'border border-border text-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary'
//                 }`}
//                 style={{ color: plan.accent ? 'var(--accent-foreground)' : undefined }}
//               >
//                 {plan.cta}
//               </button>
//             </div>
//           ))}
//         </div>

//         {/* CTA Banner */}
//         <div
//           className="price-reveal opacity-100 relative overflow-hidden rounded-2xl p-10 md:p-16 text-center border border-border"
//           style={{
//             background: 'linear-gradient(135deg, #060A0F 0%, #0F2027 40%, #060A0F 100%)',
//             transition: 'opacity 0.6s ease 0.3s, transform 0.6s ease 0.3s',
//           }}
//         >
//           <div className="absolute inset-0 grid-tech opacity-20" />
//           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full opacity-15"
//             style={{ background: 'radial-gradient(circle, rgba(34,211,165,0.4) 0%, transparent 70%)', filter: 'blur(60px)' }} />

//           {/* Floating decorative icons */}
//           <div className="absolute top-8 left-12 opacity-20 float-gentle">
//             <Icon name="HeartIcon" size={48} className="text-accent" />
//           </div>
//           <div className="absolute bottom-8 right-12 opacity-20 float-gentle-delay">
//             <Icon name="StarIcon" size={40} className="text-primary" />
//           </div>
//           <div className="absolute top-12 right-24 opacity-15 float-gentle">
//             <Icon name="SparklesIcon" size={36} className="text-accent" />
//           </div>

//           <div className="relative z-10 max-w-3xl mx-auto space-y-8">
//             <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border bg-card/50">
//               <span className="relative flex h-2 w-2">
//                 <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
//                 <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
//               </span>
//               <span className="text-[9px] font-black uppercase tracking-widest text-muted-foreground">
//                 14-day free trial · No credit card required
//               </span>
//             </div>

//             <h2 className="text-4xl md:text-7xl font-black tracking-tighter uppercase leading-[0.9] text-foreground">
//               Ready to start<br />
//               <span className="text-gradient-teal">caring, better?</span>
//             </h2>

//             <p className="text-base text-muted-foreground font-medium uppercase tracking-widest max-w-xl mx-auto leading-relaxed">
//               Join 1,200+ clinics already running on Medivardaan. Your calmer workflow is 10 minutes away.
//             </p>

//             <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
//               <a
//                 href="#"
//                 className="inline-flex items-center gap-3 bg-primary text-primary-foreground px-10 py-4 text-[10px] font-black uppercase tracking-widest hover:bg-accent transition-all duration-300 rounded-sm border-glow"
//               >
//                 Start Free Trial
//                 <Icon name="ArrowRightIcon" size={16} className="text-primary-foreground" />
//               </a>
//               <a
//                 href="#"
//                 className="inline-flex items-center gap-3 border border-border px-10 py-4 text-[10px] font-black uppercase tracking-widest text-foreground hover:bg-card transition-all duration-300 rounded-sm"
//               >
//                 Schedule a Demo
//               </a>
//             </div>

//             <div className="flex items-center justify-center gap-8 border-t border-border pt-8 mt-8">
//               {[
//                 { val: '1,200+', label: 'Active Clinics' },
//                 { val: '4.9/5', label: 'Satisfaction' },
//                 { val: '24/7', label: 'Support' },
//               ].map((s, i) => (
//                 <React.Fragment key={s.label}>
//                   {i > 0 && <div className="h-8 w-px bg-border" />}
//                   <div className="text-center">
//                     <p className="text-2xl font-black tracking-tighter text-foreground">{s.val}</p>
//                     <p className="text-[9px] font-black uppercase tracking-widest text-muted-foreground mt-1">{s.label}</p>
//                   </div>
//                 </React.Fragment>
//               ))}
//             </div>
//           </div>
//         </div>

//       </div>
//     </section>
//   );
// }