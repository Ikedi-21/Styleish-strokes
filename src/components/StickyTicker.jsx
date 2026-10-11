import React, { useState, useEffect } from 'react';

export default function StickyTicker({ coords }) {
  const [currentTime, setCurrentTime] = useState('');
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const clockEngine = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' }));
    };
    clockEngine();
    const interval = setInterval(clockEngine, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const progress = (window.scrollY / totalHeight) * 100;
        setScrollProgress(Math.round(progress));
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const dateStr = new Date().toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' });
  const rawTickerText = ` /// DATE: ${dateStr} | CURRENT_TIME: ${currentTime} | TELEMETRY_COORDS: LAT ${coords.lat} / LON ${coords.lon} | SCROLL_POS: ${scrollProgress}% /// STYLISHSTROKES SINGLE-PAGE LUXURY ARCHIVE MATRIX /// REVERING THE CADENCE OF INTENTIONAL INK METRICS /// `;

  return (
    <div className="fixed bottom-0 left-0 w-full bg-[#FFFFFF] text-[#000000] border-t border-neutral-200 z-50 h-9 flex items-center overflow-hidden select-none">
      <div className="w-full flex whitespace-nowrap overflow-hidden">
        {/* Elegant infinite text slide animation */}
        <div className="animate-fluidMarquee flex font-mono text-[10px] tracking-[0.2em] uppercase py-1">
          {Array.from({ length: 4 }).map((_, i) => (
            <span key={i} className="mr-12 font-medium">{rawTickerText}</span>
          ))}
        </div>
      </div>

      <style jsx global>{`
        @keyframes fluidMarquee {
          0% { transform: translate3d(0, 0, 0); }
          100% { transform: translate3d(-50%, 0, 0); }
        }
        .animate-fluidMarquee {
          animation: fluidMarquee 35s linear infinite;
        }
      `}</style>
    </div>
  );
}
