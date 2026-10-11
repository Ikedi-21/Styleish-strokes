import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

/**
 * Generates a standard UUIDv4 tracking token.
 * Falls back to math-based generation if crypto.randomUUID is not available in the environment.
 */
const generateUUIDv4 = () => {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

export default function Navbar({ activeSection }) {
  const [isOpen, setIsOpen] = useState(false);
  
  // State initialization safely reads from localStorage to simulate client-side file persistence
  const [visitorCount, setVisitorCount] = useState(() => {
    try {
      const stored = localStorage.getItem('stylishstrokes_visitor_tracking');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed && typeof parsed.cachedCount === 'number') {
          return parsed.cachedCount;
        }
      }
    } catch (error) {
      console.error('Failed to parse visitor tracking data from localStorage:', error);
    }
    return 0; // Default baseline value to start at zero
  });

  useEffect(() => {
    const STORAGE_KEY = 'stylishstrokes_visitor_tracking';
    
    // Inspect local storage on mount. If key does not exist, initialize persistent record.
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed && typeof parsed.cachedCount === 'number') {
          setVisitorCount(parsed.cachedCount);
        } else {
          const initialSchema = {
            cachedCount: 0,
            uniqueVisitorId: generateUUIDv4(),
            lastVerifiedTimestamp: Date.now()
          };
          localStorage.setItem(STORAGE_KEY, JSON.stringify(initialSchema));
          setVisitorCount(0);
        }
      } else {
        const initialSchema = {
          cachedCount: 0,
          uniqueVisitorId: generateUUIDv4(),
          lastVerifiedTimestamp: Date.now()
        };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(initialSchema));
        setVisitorCount(0);
      }
    } catch (error) {
      console.error('Failed to initialize visitor tracking schema in localStorage:', error);
    }

    // Set up the 5-second asynchronous interval loop
    const internalClock = setInterval(() => {
      try {
        const currentStored = localStorage.getItem(STORAGE_KEY);
        let trackingObj = {};
        let currentCount = 0;
        
        if (currentStored) {
          trackingObj = JSON.parse(currentStored);
          if (trackingObj && typeof trackingObj.cachedCount === 'number') {
            currentCount = trackingObj.cachedCount;
          }
        }
        
        // Compute the new value (incrementing by a random amount to show activity)
        const nextCount = currentCount + Math.floor(Math.random() * 2) + 1;
        
        // Serialize and save updated tracking state back to localStorage
        const updatedSchema = {
          cachedCount: nextCount,
          uniqueVisitorId: trackingObj.uniqueVisitorId || generateUUIDv4(),
          lastVerifiedTimestamp: Date.now()
        };
        
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedSchema));
        
        // Simultaneously update state to reflect the persisted count in UI
        setVisitorCount(nextCount);
      } catch (error) {
        console.error('Failed to synchronize visitor count to localStorage:', error);
      }
    }, 5000);

    // Clean up interval loop to prevent memory leaks on unmount
    return () => clearInterval(internalClock);
  }, []);

  const links = [
    { name: 'Home', target: '#hero', id: 'hero' },
    { name: 'About Script', target: '#about', id: 'about' },
    { name: 'Ink Lab', target: '#lab', id: 'lab' },
    { name: 'Learning Resources', target: '#resources', id: 'resources' },
    { name: 'Gallery', target: '#gallery', id: 'gallery' },
    { name: 'Our Team', target: '#team', id: 'team' },
    { name: 'Contact Us', target: '#contact', id: 'contact' }
  ];

  const handleNavClick = (e, id) => {
    e?.preventDefault();
    setIsOpen(false);
    
    if (!id) return;
    const cleanId = id.startsWith('#') ? id.slice(1) : id;
    const element = document.getElementById(cleanId);
    
    if (element) {
      if (window.lenis) {
        window.lenis.scrollTo(element, {
          duration: 1.4,
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
        });
      } else {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <>
      <nav className="w-full fixed top-0 z-50 bg-black/80 backdrop-blur-md border-b border-neutral-900 px-6 py-4 flex items-center justify-between">
        {/* Left Side: Brand Logo in blocky Bebas Neue */}
        <a 
          href="#hero" 
          onClick={(e) => handleNavClick(e, 'hero')} 
          className="text-2xl font-display tracking-widest uppercase text-white hover:text-neutral-300 transition-colors cursor-pointer"
        >
          STYLISHSTROKES
        </a>

        {/* Center: Desktop Navigation Interface */}
        <div className="hidden lg:flex items-center space-x-6 xl:space-x-8">
          {links.map((link) => (
            <a
              key={link.id}
              href={link.target}
              onClick={(e) => handleNavClick(e, link.id)}
              className={`font-mono text-xs tracking-wider transition-all duration-300 uppercase pb-1 border-b cursor-pointer ${
                activeSection === link.id 
                  ? 'text-white border-white font-bold' 
                  : 'text-neutral-400 border-transparent hover:text-white hover:border-neutral-500'
              }`}
            >
              {link.name}
            </a>
          ))}
        </div>

        {/* Right Side: Monospace Live Telemetry Container & Mobile Trigger */}
        <div className="flex items-center space-x-6">
          <div className="font-mono text-[10px] text-neutral-400 tracking-wider uppercase select-none flex items-center gap-1.5">
            LIVE: <span className="text-white font-bold tabular-nums">{visitorCount}</span>
          </div>
          
          <button onClick={() => setIsOpen(!isOpen)} className="lg:hidden text-white transition-colors hover:text-neutral-300 cursor-pointer">
            {isOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      {/* Fluid Mobile Slide & Fade Matrix Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: [0.25, 1, 0.5, 1] }}
            className="fixed inset-0 z-40 bg-[#000000] pt-28 px-8 flex flex-col justify-between pb-16 lg:hidden"
          >
            <div className="flex flex-col space-y-6">
              {links.map((link) => (
                <a
                  key={link.id}
                  href={link.target}
                  onClick={(e) => handleNavClick(e, link.id)}
                  className={`font-serif text-3xl tracking-tight cursor-pointer transition-all duration-300 ${
                    activeSection === link.id ? 'text-white italic pl-2 border-l border-white' : 'text-neutral-500 hover:text-white'
                  }`}
                >
                  {link.name}
                </a>
              ))}
            </div>
            <div className="font-mono text-xs text-neutral-500 border-t border-white/10 pt-6 uppercase select-none">
              LIVE PORTAL INDEX OVERSEE: <span className="text-white tracking-widest">{visitorCount}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
