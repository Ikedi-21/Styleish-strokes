import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowDownToLine, BookOpen, Sparkles, RefreshCw, Download } from 'lucide-react';

const tierSheets = {
  Beginner: [
    { id: 'b1', title: 'Foundational Linear Inklings', file: 'Strokes_Beginner_Linear.pdf', type: 'Basic Grids' },
    { id: 'b2', title: 'Calculated Oval Adjustments', file: 'Strokes_Beginner_Ovals.pdf', type: 'Loop Frameworks' }
  ],
  Advanced: [
    { id: 'a1', title: 'Thuluth Geometric Intersections', file: 'Strokes_Advanced_Thuluth.pdf', type: 'Proportional Dots' },
    { id: 'a2', title: 'Blackletter Rhythm Matrix', file: 'Strokes_Advanced_Fraktur.pdf', type: 'Angle Compression' },
    { id: 'a3', title: 'Asymmetric Brush Variance', file: 'Strokes_Advanced_Brush.pdf', type: 'Velocity Fluctuations' }
  ]
};

export default function LearningResources() {
  const [activeTier, setActiveTier] = useState('Advanced');
  const [activeDownloadId, setActiveDownloadId] = useState(null);

  // Tracing customizer states
  const [tracingText, setTracingText] = useState('FLOW');
  const [fontPreset, setFontPreset] = useState('SERIF_ITALIC'); // SERIF_ITALIC, SANS_CAPS
  const [showGuides, setShowGuides] = useState(true);

  // Drawing refs
  const tracingCanvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const lastPos = useRef({ x: 0, y: 0 });

  const simulateDownload = (sheet) => {
    setActiveDownloadId(sheet.id);
    setTimeout(() => {
      setActiveDownloadId(null);
      alert(`FILE DISPATCH SUCCESS\nDocument: ${sheet.file}\nPayload Spec: Formatted Guidelines & Font Descriptions Template.`);
    }, 1200);
  };

  useEffect(() => {
    const canvas = tracingCanvasRef.current;
    if (!canvas) return;
    const rect = canvas.parentElement.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.height || 220;
    
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }, [tracingText, fontPreset]);

  const getMousePos = (e) => {
    const canvas = tracingCanvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    return {
      x: clientX - rect.left,
      y: clientY - rect.top
    };
  };

  const startTrace = (e) => {
    e.preventDefault();
    const pos = getMousePos(e);
    setIsDrawing(true);
    lastPos.current = pos;
  };

  const trace = (e) => {
    if (!isDrawing) return;
    e.preventDefault();
    const canvas = tracingCanvasRef.current;
    const ctx = canvas.getContext('2d');
    const pos = getMousePos(e);

    ctx.beginPath();
    ctx.strokeStyle = '#D4AF37'; // Elegant Gold
    ctx.lineWidth = 2.5;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.moveTo(lastPos.current.x, lastPos.current.y);
    ctx.lineTo(pos.x, pos.y);
    ctx.stroke();

    lastPos.current = pos;
  };

  const stopTrace = () => {
    setIsDrawing(false);
  };

  const clearTrace = () => {
    const canvas = tracingCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  const exportCustomSVG = () => {
    const fontName = fontPreset === 'SERIF_ITALIC' ? 'Playfair Display, Georgia, serif' : 'Bebas Neue, sans-serif';
    const fontStyle = fontPreset === 'SERIF_ITALIC' ? 'italic' : 'normal';
    const letterSpacing = fontPreset === 'SANS_CAPS' ? '0.2em' : 'normal';

    const svgContent = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 400" width="800" height="400" style="background:#FBFBFA; font-family: Playfair Display, serif;">
        <rect x="0" y="0" width="800" height="60" fill="#000000" />
        <text x="30" y="38" fill="#FFFFFF" font-size="14" font-weight="normal" letter-spacing="1">STYLISHSTROKES // CUSTOM PRACTICE SHEET</text>
        <text x="770" y="35" fill="#888888" font-size="9" text-anchor="end" font-family="monospace">DATE: ${new Date().toLocaleDateString()}</text>
        
        <g stroke="#E0E0DF" stroke-dasharray="4,4" stroke-width="1">
          <line x1="30" y1="180" x2="770" y2="180" />
          <line x1="30" y1="220" x2="770" y2="220" stroke="#CCCCCC" stroke-dasharray="0" />
          <line x1="30" y1="260" x2="770" y2="260" />
        </g>
        
        <text x="400" y="245" fill="#EAEAE9" font-size="70" text-anchor="middle" font-family="${fontName}" font-style="${fontStyle}" letter-spacing="${letterSpacing}">
          ${tracingText.toUpperCase()}
        </text>
        
        ${fontPreset === 'SERIF_ITALIC' ? `
          <g stroke="rgba(0,0,0,0.03)" stroke-width="1">
            <line x1="150" y1="100" x2="100" y2="320" />
            <line x1="250" y1="100" x2="200" y2="320" />
            <line x1="350" y1="100" x2="300" y2="320" />
            <line x1="450" y1="100" x2="400" y2="320" />
            <line x1="550" y1="100" x2="500" y2="320" />
            <line x1="650" y1="100" x2="600" y2="320" />
          </g>
        ` : ''}
        <line x1="30" y1="350" x2="770" y2="350" stroke="#111111" stroke-width="0.5" />
        <text x="30" y="370" fill="#333333" font-size="9" font-style="italic">Preserving traditional letterforms digitally</text>
      </svg>
    `;

    const blob = new Blob([svgContent], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.download = `practice_sheet_${tracingText.toLowerCase()}.svg`;
    link.href = url;
    link.click();
  };

  return (
    <div className="bg-[#000000] text-[#FFFFFF] min-h-screen py-32 px-8 md:px-16 flex flex-col items-center justify-center border-t border-neutral-900">
      <div className="max-w-7xl w-full space-y-24">
        
        {/* Practice Layout Hub Cards Grid */}
        <div>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end border-b border-neutral-800 pb-8 mb-16 gap-6">
            <div className="space-y-2">
              <span className="font-mono text-xs tracking-widest text-neutral-500 block">// Educational Schematics</span>
              <h2 className="text-4xl md:text-5xl font-serif font-normal tracking-tight">Practice Layout Hub</h2>
            </div>

            {/* Luxury Switch Component */}
            <div className="flex border border-white/20 p-1 bg-neutral-950">
              {['Beginner', 'Advanced'].map((tier) => (
                <button
                  key={tier}
                  onClick={() => setActiveTier(tier)}
                  className={`px-6 py-2 font-mono text-xs tracking-wider uppercase transition-all duration-300 cursor-pointer ${
                    activeTier === tier 
                      ? 'bg-white text-black font-bold hover:bg-neutral-200' 
                      : 'text-neutral-400 hover:bg-white hover:text-black'
                  }`}
                >
                  {tier === 'Beginner' ? 'Kids & Starters' : 'Masterclass Level'}
                </button>
              ))}
            </div>
          </div>

          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence mode="popLayout">
              {tierSheets[activeTier].map((sheet) => (
                <motion.div
                  layout
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1] }}
                  key={sheet.id}
                  className="border border-neutral-800 bg-neutral-950/40 p-8 flex flex-col justify-between h-80 hover:border-neutral-700 transition-colors duration-300"
                >
                  <div className="flex justify-between items-start">
                    <div className="text-neutral-400 border border-neutral-800 p-3 bg-neutral-900">
                      <BookOpen size={18} />
                    </div>
                    <span className="font-mono text-[10px] tracking-widest text-neutral-500 uppercase bg-neutral-900 px-2 py-1">
                      {sheet.type}
                    </span>
                  </div>

                  <div className="space-y-6">
                    <h3 className="text-xl font-serif text-neutral-100 tracking-tight font-light">{sheet.title}</h3>
                    <button
                      onClick={() => simulateDownload(sheet)}
                      disabled={activeDownloadId !== null}
                      className="w-full flex items-center justify-between border border-neutral-700 px-4 py-3 font-mono text-xs tracking-wider uppercase transition-all duration-300 text-neutral-300 hover:text-black hover:bg-white hover:border-white cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <span>{activeDownloadId === sheet.id ? 'Extracting File...' : 'Download Practice Grid'}</span>
                      <ArrowDownToLine size={13} />
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>

        {/* Live Tracing Customizer Module */}
        <div className="border border-neutral-800 p-8 bg-[#050505] rounded-none">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center border-b border-neutral-800 pb-6 mb-8 gap-6">
            <div>
              <span className="font-mono text-xs tracking-widest text-neutral-500 block mb-1 flex items-center gap-2">
                <Sparkles size={12} className="text-[#D4AF37]" /> // WORKSPACE
              </span>
              <h3 className="text-2xl md:text-3xl font-serif font-light tracking-tight uppercase">LIVE TRACING BLUEPRINT CREATOR</h3>
            </div>

            {/* Customizer controls */}
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex border border-neutral-800 p-1 bg-black">
                <button 
                  onClick={() => setFontPreset('SERIF_ITALIC')} 
                  className={`px-3 py-1.5 font-mono text-[9px] tracking-wider font-bold transition-all duration-300 cursor-pointer ${fontPreset === 'SERIF_ITALIC' ? 'bg-white text-black hover:bg-neutral-200' : 'text-white hover:bg-white hover:text-black'}`}
                >
                  WESTERN ITALIC
                </button>
                <button 
                  onClick={() => setFontPreset('SANS_CAPS')} 
                  className={`px-3 py-1.5 font-mono text-[9px] tracking-wider font-bold transition-all duration-300 cursor-pointer ${fontPreset === 'SANS_CAPS' ? 'bg-white text-black hover:bg-neutral-200' : 'text-white hover:bg-white hover:text-black'}`}
                >
                  MODERN CAPITALS
                </button>
              </div>

              <button 
                onClick={() => setShowGuides(!showGuides)}
                className={`px-4 py-2 border font-mono text-[9px] tracking-wider uppercase transition-all duration-300 cursor-pointer ${
                  showGuides 
                    ? 'bg-white/5 border-neutral-700 text-white hover:bg-white hover:text-black hover:border-white' 
                    : 'border-neutral-800 text-neutral-500 hover:bg-white hover:text-black hover:border-white'
                }`}
              >
                {showGuides ? 'GUIDES: ON' : 'GUIDES: OFF'}
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Input Config side */}
            <div className="lg:col-span-4 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="flex flex-col border-b border-neutral-800 pb-2 focus-within:border-neutral-500 transition-colors">
                  <label className="font-mono text-[9px] text-neutral-500 tracking-wider uppercase">ENTER CHAR SEQUENCE</label>
                  <input 
                    type="text"
                    maxLength={10}
                    value={tracingText}
                    onChange={(e) => setTracingText(e.target.value.replace(/[^A-Za-z]/gi, ''))}
                    className="bg-transparent border-0 outline-none p-0 mt-1 font-serif text-lg italic text-white tracking-widest uppercase font-light"
                    placeholder="TYPE WORD"
                  />
                </div>
                <p className="font-serif text-[13px] text-neutral-400 leading-relaxed font-light italic">
                  Input letters to dynamically generate dotted letterforms. Hover over the workspace, drag your cursor, and trace the stroke geometries in gold leaf.
                </p>
              </div>

              <div className="flex gap-4 font-mono text-[10px]">
                <button 
                  onClick={clearTrace}
                  className="flex-1 flex items-center justify-center gap-2 border border-neutral-800 py-3 tracking-widest uppercase transition-all duration-300 cursor-pointer bg-black text-white hover:bg-white hover:text-black hover:border-white"
                >
                  <RefreshCw size={12} /> RESET TRACE
                </button>
                <button 
                  onClick={exportCustomSVG}
                  className="flex-1 flex items-center justify-center gap-2 bg-white text-black py-3 tracking-widest uppercase border border-transparent hover:border-white hover:bg-black hover:text-white transition-all duration-300 cursor-pointer"
                >
                  <Download size={12} /> EXPORT SVG
                </button>
              </div>
            </div>

            {/* Tracing Area Workspace */}
            <div className="lg:col-span-8 border border-neutral-800 h-64 bg-black relative flex items-center justify-center overflow-hidden">
              
              {/* Backing guidelines */}
              {showGuides && (
                <div className="absolute inset-0 pointer-events-none flex flex-col justify-center gap-8 px-4 opacity-10">
                  <div className="w-full border-t border-dashed border-white"></div>
                  <div className="w-full border-t border-white"></div>
                  <div className="w-full border-t border-dashed border-white"></div>
                </div>
              )}

              {/* Dotted target text layout */}
              <div 
                className="absolute inset-0 flex items-center justify-center select-none pointer-events-none text-neutral-800 text-[60px] md:text-[76px] font-light uppercase text-center"
                style={{
                  fontFamily: fontPreset === 'SERIF_ITALIC' ? 'Playfair Display, Georgia, serif' : 'Bebas Neue, sans-serif',
                  fontStyle: fontPreset === 'SERIF_ITALIC' ? 'italic' : 'normal',
                  letterSpacing: fontPreset === 'SANS_CAPS' ? '0.15em' : 'normal',
                }}
              >
                <span className="opacity-25 select-none font-light" style={{
                  textShadow: '0 0 1px rgba(255,255,255,0.2)',
                  backgroundImage: 'radial-gradient(rgba(255,255,255,0.1) 15%, transparent 16%)',
                  backgroundSize: '3px 3px',
                  color: 'transparent',
                  WebkitBackgroundClip: 'text',
                  backgroundClip: 'text',
                  WebkitTextStroke: '1.2px rgba(255,255,255,0.3)'
                }}>
                  {tracingText || 'FLOW'}
                </span>
              </div>

              {/* Interactive Tracing Draw Layer */}
              <canvas
                ref={tracingCanvasRef}
                onMouseDown={startTrace}
                onMouseMove={trace}
                onMouseUp={stopTrace}
                onMouseLeave={stopTrace}
                onTouchStart={startTrace}
                onTouchMove={trace}
                onTouchEnd={stopTrace}
                className="w-full h-full relative z-10 block cursor-crosshair"
              />

              {/* Bottom telemetry overlay badge */}
              <div className="absolute bottom-3 right-4 font-mono text-[9px] text-neutral-600 pointer-events-none uppercase tracking-wider">
                // SYSTEM_TRACEPAD // INPUT_INDEX: ${tracingText.length}
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
