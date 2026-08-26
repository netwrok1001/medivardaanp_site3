import React from 'react';
import Link from 'next/link';
import AppImage from '@/components/ui/AppImage';

export default function Footer() {
  return (
    <footer className="border-t border-border py-16">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Logo + brand */}
          <Link href="/" className="flex items-center gap-3 group">
            <AppImage
              src="https://medivardaan-site.vercel.app/assets/logo-DAbkXH6q.png"
              alt="Medivardaan logo"
              width={32}
              height={32}
              className="object-contain" />

            <span className="text-sm font-black tracking-widest uppercase text-muted-foreground group-hover:text-accent transition-colors">
              medivardaan<span className="text-accent">.</span>
            </span>
          </Link>

          {/* Links */}
          <nav className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-[13px] font-semibold text-muted-foreground">
            <a href="#features" className="hover:text-foreground transition-colors py-2">Platform</a>
            <a href="#security" className="hover:text-foreground transition-colors py-2">Security</a>
            <a href="#pricing" className="hover:text-foreground transition-colors py-2">Pricing</a>
            <Link href="/privacy" className="hover:text-foreground transition-colors py-2">Privacy</Link>
            <Link href="/terms" className="hover:text-foreground transition-colors py-2">Terms</Link>
          </nav>

          {/* Social + copyright */}
          <div className="flex items-center gap-6 text-muted-foreground">
            <a href="https://twitter.com" aria-label="Twitter" className="hover:text-accent transition-colors p-2">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
            <a href="https://linkedin.com" aria-label="LinkedIn" className="hover:text-accent transition-colors p-2">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </a>
            <span className="text-[12px] font-medium">© 2026 Infintrix Global</span>
          </div>
        </div>
      </div>
    </footer>);

}