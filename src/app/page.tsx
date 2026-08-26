import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HeroSection from '@/app/components/HeroSection';
import FeaturesBento from '@/app/components/FeaturesBento';
import HowItWorks from '@/app/components/HowItWorks';
import SecuritySection from '@/app/components/SecuritySection';


export default function Home() {
  return (
    <main className="relative bg-background overflow-x-hidden">
      <Header />
      <HeroSection />
      <FeaturesBento />
      <HowItWorks />
      <SecuritySection />
      
      <Footer />
    </main>
  );
}