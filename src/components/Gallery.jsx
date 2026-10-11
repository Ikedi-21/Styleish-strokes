import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Compass } from 'lucide-react';

const imageryArchive = [
  { 
    id: 1, 
    url: 'https://images.unsplash.com/photo-1564981797816-1043664bf78d?auto=format&fit=crop&w=800&q=80', 
    title: 'Fluid Ligature Saturation',
    specs: { script: 'Western Gothic', nib: 'Metal Broad Edge', paper: 'Pure Cotton Vellum', structure: '45° slant axes, strict vertical stem guidelines' }
  },
  { 
    id: 2, 
    url: 'https://images.unsplash.com/photo-1516962215378-7fa2e137ae93?auto=format&fit=crop&w=800&q=80', 
    title: 'Steel Nib Angle Grid',
    specs: { script: 'Copperplate Spencerian', nib: 'Fine Flexible Steel Point', paper: 'Smooth Calligraphy Card', structure: '55° italic slant grid, dynamic hairline thickness' }
  },
  { 
    id: 3, 
    url: 'https://images.unsplash.com/photo-1506784983877-45594efa4cbe?auto=format&fit=crop&w=800&q=80', 
    title: 'Monastic Script Blueprint',
    specs: { script: 'Roman Capitals', nib: 'Flat Brush Calibrator', paper: 'Pressed Rag Board', structure: 'Circular geometric bounds, golden section margins' }
  },
  { 
    id: 4, 
    url: 'https://images.unsplash.com/photo-1457369804613-52c61a468e7d?auto=format&fit=crop&w=800&q=80', 
    title: 'Fibrous Canvas Absorption',
    specs: { script: 'East Asian Kanji', nib: 'Bamboo Wolf-Hair Brush', paper: 'Mulberry Xuan Washi', structure: 'Dynamic weight modulation, singular stroke focus' }
  }
];

export default function Gallery() {
  const [selectedItem, setSelectedItem] = useState(null);
  const [showBlueprint, setShowBlueprint] = useState(false);

  // Escape Hatch Listener
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setSelectedItem(null);
      }
    };
    if (selectedItem) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedItem]);

  return (
    <div className="bg-[#FBFBFA] text-[#000000] py-32 px-8 md:px-16 border-t border-neutral-200 paper-grid">
      <div className="max-w-7xl w-full mx-auto">
        
        <div className="mb-16">
          <p className="font-mono text-xs tracking-widest text-neutral-400 mb-2">// Curated Texture Exhibits</p>
          <h2 className="text-4xl md:text-5xl font-serif font-normal tracking-tight text-neutral-900">The Script Gallery</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {imageryArchive.map((image) => (
            <div
              key={image.id}
              onClick={() => {
                setSelectedItem(image);
                setShowBlueprint(false);
              }}
              className="cursor-pointer group flex flex-col space-y-4"
            >
              <div className="overflow-hidden bg-neutral-200 aspect-[3/4]">
                <img 
                  src={image.url} 
                  alt={image.title} 
                  loading="lazy"
                  className="w-full h-full object-cover filter grayscale contrast-115 transition-transform duration-700 ease-[0.16, 1, 0.3, 1] group-hover:scale-102"
                />
              </div>
              <div className="flex justify-between items-baseline border-t border-neutral-200 pt-2 px-1">
                <h4 className="font-serif text-sm text-neutral-800 font-light">{image.title}</h4>
                <span className="font-mono text-[10px] text-neutral-400">[0{image.id}]</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Cinematic Modal Element */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            onClick={() => setSelectedItem(null)}
            className="fixed inset-0 z-50 bg-black/95 dynamic flex items-center justify-between p-6 md:p-12 cursor-zoom-out"
          >
            <button 
              onClick={() => setSelectedItem(null)}
              className="absolute top-8 right-8 text-neutral-400 hover:text-white transition-colors cursor-pointer z-50"
              aria-label="Close modal"
            >
              <X size={26} />
            </button>
            
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 15 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="max-w-5xl w-full bg-[#0d0d0d] border border-neutral-800 p-2 flex flex-col md:flex-row items-stretch mx-auto cursor-default"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Image box with relative proportional container wrapper */}
              <div className="relative flex-1 bg-black flex items-center justify-center min-h-[350px] overflow-hidden">
                <div className="relative max-h-[65vh] aspect-[3/4] w-full max-w-sm md:max-w-none md:w-auto flex items-center justify-center">
                  <img 
                    src={selectedItem.url} 
                    alt={selectedItem.title} 
                    className="max-h-[65vh] w-full h-full object-cover filter grayscale contrast-110" 
                  />

                  {/* Thin, Golden Geometry Blueprint grid lines */}
                  {showBlueprint && (
                    <svg className="absolute inset-0 w-full h-full pointer-events-none stroke-[#D4AF37] opacity-60" viewBox="0 0 100 100" preserveAspectRatio="none">
                      <line x1="0" y1="38.2" x2="100" y2="38.2" strokeWidth="0.1" strokeDasharray="1,2" />
                      <line x1="0" y1="61.8" x2="100" y2="61.8" strokeWidth="0.1" strokeDasharray="1,2" />
                      <line x1="38.2" y1="0" x2="38.2" y2="100" strokeWidth="0.1" strokeDasharray="1,2" />
                      <line x1="61.8" y1="0" x2="61.8" y2="100" strokeWidth="0.1" strokeDasharray="1,2" />
                      
                      <circle cx="50" cy="50" r="30" fill="none" strokeWidth="0.1" strokeDasharray="1,2" />
                      <circle cx="50" cy="50" r="12" fill="none" strokeWidth="0.1" />
                      
                      <line x1="0" y1="0" x2="100" y2="100" strokeWidth="0.08" strokeDasharray="1,3" />
                      <line x1="100" y1="0" x2="0" y2="100" strokeWidth="0.08" strokeDasharray="1,3" />

                      <text x="4" y="8" fill="#D4AF37" fontSize="2" fontFamily="serif" fontStyle="italic">[Ratio: 1.618]</text>
                      <text x="4" y="96" fill="#D4AF37" fontSize="2" fontFamily="monospace">[Metrics: Pass]</text>
                    </svg>
                  )}
                </div>
              </div>

              {/* Sidebar detail board */}
              <div className="w-full md:w-80 bg-[#0d0d0d] text-white p-8 flex flex-col justify-between border-t md:border-t-0 md:border-l border-neutral-800">
                <div className="space-y-6">
                  <div>
                    <span className="font-mono text-[10px] text-neutral-500 block uppercase tracking-wider">// Spec Overview</span>
                    <h3 className="text-xl font-serif italic font-normal text-white mt-1">{selectedItem.title}</h3>
                  </div>

                  <div className="border-t border-neutral-800 pt-4 space-y-4 font-serif text-xs text-neutral-400">
                    <div>
                      <p className="font-mono text-[9px] text-neutral-600 uppercase tracking-widest">Script Lineage</p>
                      <p className="text-neutral-200 mt-0.5">{selectedItem.specs.script}</p>
                    </div>
                    <div>
                      <p className="font-mono text-[9px] text-neutral-600 uppercase tracking-widest">Pen / Tool</p>
                      <p className="text-neutral-200 mt-0.5">{selectedItem.specs.nib}</p>
                    </div>
                    <div>
                      <p className="font-mono text-[9px] text-neutral-600 uppercase tracking-widest">Medium</p>
                      <p className="text-neutral-200 mt-0.5">{selectedItem.specs.paper}</p>
                    </div>
                    <div>
                      <p className="font-mono text-[9px] text-neutral-600 uppercase tracking-widest">Proportion Notes</p>
                      <p className="text-neutral-300 leading-relaxed mt-1 font-light italic">{selectedItem.specs.structure}</p>
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-4 space-y-3">
                  <button 
                    onClick={() => setShowBlueprint(!showBlueprint)}
                    className={`w-full flex items-center justify-center gap-2 border px-4 py-3 font-mono text-[10px] tracking-widest uppercase transition-all duration-300 cursor-pointer ${
                      showBlueprint 
                        ? 'bg-[#D4AF37] text-black border-[#D4AF37] hover:bg-white hover:text-black hover:border-white' 
                        : 'border-neutral-700 text-white hover:bg-white hover:text-black hover:border-white'
                    }`}
                  >
                    <Compass size={12} className={showBlueprint ? 'animate-spin' : ''} />
                    {showBlueprint ? 'Hide Geometry' : 'Geometry Grid'}
                  </button>
                  
                  <button 
                    onClick={() => setSelectedItem(null)}
                    className="w-full bg-black text-white border border-neutral-700 py-3 font-mono text-[10px] tracking-widest uppercase transition-all duration-300 cursor-pointer hover:bg-white hover:text-black hover:border-white text-center block"
                  >
                    Close Image
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
