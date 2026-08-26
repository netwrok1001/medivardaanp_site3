'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (menuOpen) {
      const handleScroll = () => setMenuOpen(false);
      window.addEventListener('scroll', handleScroll, { passive: true });
      return () => window.removeEventListener('scroll', handleScroll);
    }
  }, [menuOpen]);

  const navLinks = [
  { label: 'Platform', href: '#features' },
  { label: 'How it Works', href: '#how-it-works' },
  { label: 'Security', href: '#security' },
  { label: 'Pricing', href: '#pricing' }];


  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${
      scrolled ?
      'bg-background/80 backdrop-blur-xl border-b border-border' : 'bg-transparent'}`
      }>

      <div className="mx-auto max-w-7xl px-6 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative w-10 h-10 flex-shrink-0">
            <AppImage
              src="https://medivardaan-site.vercel.app/assets/logo-DAbkXH6q.png"
              alt="Medivardaan logo — hand cradling a leaf with ECG pulse line"
              width={40}
              height={40}
              className="object-contain group-hover:scale-105 transition-transform duration-300"
              priority />

          </div>
          <div className="flex flex-col leading-none">
            <span className="text-base font-black tracking-widest uppercase text-foreground">
              MEDIVARDAAN
            </span>
            <span className="text-[10px] font-medium tracking-widest text-muted-foreground">
              care, connected
            </span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8 text-[11px] font-bold uppercase tracking-[0.3em] text-muted-foreground">
          {navLinks?.map((link) =>
          <a
            key={link?.label}
            href={link?.href}
            className="hover:text-accent transition-colors duration-200">

              {link?.label}
            </a>
          )}
        </nav>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-4">
          <span className="flex items-center gap-1.5 text-[9px] font-black uppercase tracking-widest text-accent">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
            </span>
            Live Demo
          </span>
          <a
            href="#pricing"
            className="bg-primary text-primary-foreground px-6 py-2.5 rounded-sm text-[10px] font-black uppercase tracking-widest hover:bg-accent transition-all duration-300">

            Get Started
          </a>
        </div>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden p-2 text-muted-foreground hover:text-foreground transition-colors"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}>

          <Icon name={menuOpen ? 'XMarkIcon' : 'Bars3Icon'} size={24} />
        </button>
      </div>
      {/* Mobile Menu */}
      {menuOpen &&
      <div className="md:hidden absolute top-20 left-0 right-0 bg-background/95 backdrop-blur-xl border-b border-border px-6 py-8 flex flex-col gap-6">
          {navLinks?.map((link) =>
        <a
          key={link?.label}
          href={link?.href}
          onClick={() => setMenuOpen(false)}
          className="text-sm font-bold uppercase tracking-widest text-muted-foreground hover:text-accent transition-colors py-2"
          style={{ minHeight: '44px', display: 'flex', alignItems: 'center' }}>

              {link?.label}
            </a>
        )}
          <a
          href="#pricing"
          onClick={() => setMenuOpen(false)}
          className="bg-primary text-primary-foreground px-6 py-3 rounded-sm text-[10px] font-black uppercase tracking-widest hover:bg-accent transition-all text-center"
          style={{ minHeight: '44px' }}>

            Get Started
          </a>
        </div>
      }
    </header>);

}