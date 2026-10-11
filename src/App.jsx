import React, { useEffect, useState } from 'react';
import Lenis from 'lenis';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import AboutCalligraphy from './components/AboutCalligraphy';
import CalligraphyLab from './components/CalligraphyLab';
import LearningResources from './components/LearningResources';
import Gallery from './components/Gallery';
import AboutUs from './components/AboutUs';
import ContactForm from './components/ContactForm';
import StickyTicker from './components/StickyTicker';

export default function App() {
  const [coords, setCoords] = useState({ lat: "6.4281", lon: "3.4219" }); // default polished coords
  const [activeSection, setActiveSection] = useState('hero');
  const [scrollSkew, setScrollSkew] = useState(0);

  useEffect(() => {
    // Lenis Smooth Scroll Engine
    const lenis = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });
    window.lenis = lenis;

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // Geolocation API Telemetry Capturing
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setCoords({
            lat: pos.coords.latitude.toFixed(4),
            lon: pos.coords.longitude.toFixed(4)
          });
        },
        (err) => console.log("Telemetry allocation shifted to default matrix.", err)
      );
    }

    // Active Section Intersection Observer for Navigation Tracking
    const sections = ['hero', 'about', 'lab', 'resources', 'gallery', 'team', 'contact'];
    const observers = sections.map(id => {
      const el = document.getElementById(id);
      if (!el) return null;
      
      const observer = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) {
          setActiveSection(id);
        }
      }, { threshold: 0.25 });
      
      observer.observe(el);
      return { observer, el };
    });

    return () => {
      lenis.destroy();
      window.lenis = null;
      observers.forEach(obs => obs && obs.observer.unobserve(obs.el));
    };
  }, []);

  // Subtle scroll-skew kinetic physics (max 1 degree)
  useEffect(() => {
    let lastScroll = window.scrollY;
    let lastTime = Date.now();
    let frame;

    const update = () => {
      const currentScroll = window.scrollY;
      const currentTime = Date.now();
      const distance = currentScroll - lastScroll;
      const duration = Math.max(currentTime - lastTime, 1);
      
      const speed = distance / duration;
      const targetSkew = Math.max(-1, Math.min(1, speed * 0.8));
      
      setScrollSkew(prev => prev + (targetSkew - prev) * 0.08);
      
      lastScroll = currentScroll;
      lastTime = currentTime;
      frame = requestAnimationFrame(update);
    };

    frame = requestAnimationFrame(update);
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <div className="bg-[#000000] text-[#FFFFFF] min-h-screen antialiased select-text font-serif selection:bg-neutral-800 selection:text-white overflow-x-hidden">
      <Navbar activeSection={activeSection} />
      <main style={{ transform: `skewY(${scrollSkew}deg)`, transformOrigin: 'center', transition: 'transform 0.1s ease-out' }}>
        <section id="hero"><Hero /></section>
        <section id="about"><AboutCalligraphy /></section>
        <section id="lab"><CalligraphyLab /></section>
        <section id="resources"><LearningResources /></section>
        <section id="gallery"><Gallery /></section>
        <section id="team"><AboutUs /></section>
        <section id="contact"><ContactForm coords={coords} /></section>
      </main>
      <StickyTicker coords={coords} />
    </div>
  );
}
