import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Trash2, Download, Grid, EyeOff, Activity } from 'lucide-react';

const COLORS = [
  { name: 'Carbon Black', value: '#111111' },
  { name: 'Cinnabar Red', value: '#E63946' },
  { name: 'Gold Leaf', value: '#D4AF37' },
  { name: 'Emerald Jade', value: '#2A9D8F' }
];

export default function CalligraphyLab() {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  
  // Safe state initialization from localStorage to simulate local config file preference load.
  // Properties are parsed, verified against valid options, and fallback default states.
  const [preset, setPreset] = useState(() => {
    try {
      const stored = localStorage.getItem('stylishstrokes_brush_preferences');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed && ['BROAD_EDGE', 'FLEX_REED', 'SHODO_BRUSH'].includes(parsed.preset)) {
          return parsed.preset;
        }
      }
    } catch (e) {
      console.error('Failed to parse brush preferences preset from localStorage:', e);
    }
    return 'BROAD_EDGE';
  });

  const [brushSize, setBrushSize] = useState(() => {
    try {
      const stored = localStorage.getItem('stylishstrokes_brush_preferences');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed && typeof parsed.brushSize === 'number' && !isNaN(parsed.brushSize)) {
          // Clamp brush weight size integer safely between min 4 and max 48
          return Math.max(4, Math.min(48, Math.round(parsed.brushSize)));
        }
      }
    } catch (e) {
      console.error('Failed to parse brush preferences size from localStorage:', e);
    }
    return 16;
  });

  const [inkColor, setInkColor] = useState(() => {
    try {
      const stored = localStorage.getItem('stylishstrokes_brush_preferences');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed && typeof parsed.inkColor === 'string' && /^#[0-9A-Fa-f]{6}$/.test(parsed.inkColor)) {
          return parsed.inkColor;
        }
      }
    } catch (e) {
      console.error('Failed to parse brush preferences inkColor from localStorage:', e);
    }
    return '#111111';
  });

  const [dilution, setDilution] = useState(() => {
    try {
      const stored = localStorage.getItem('stylishstrokes_brush_preferences');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed && typeof parsed.dilution === 'number' && !isNaN(parsed.dilution)) {
          // Clamp float dilution opacity scale index between min 0.1 and max 1.0
          return Math.max(0.1, Math.min(1.0, parsed.dilution));
        }
      }
    } catch (e) {
      console.error('Failed to parse brush preferences dilution from localStorage:', e);
    }
    return 1.0;
  });

  const [showGrid, setShowGrid] = useState(() => {
    try {
      const stored = localStorage.getItem('stylishstrokes_brush_preferences');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed && typeof parsed.showGrid === 'boolean') {
          return parsed.showGrid;
        }
      }
    } catch (e) {
      console.error('Failed to parse brush preferences showGrid from localStorage:', e);
    }
    return true;
  });

  // Synchronize state adjustments back to client-side localStorage simulation pipeline automatically
  useEffect(() => {
    try {
      const prefs = {
        preset,
        brushSize: Math.max(4, Math.min(48, Math.round(brushSize))),
        inkColor,
        dilution: Math.max(0.1, Math.min(1.0, dilution)),
        showGrid
      };
      localStorage.setItem('stylishstrokes_brush_preferences', JSON.stringify(prefs));
    } catch (e) {
      console.error('Failed to write brush preferences to localStorage:', e);
    }
  }, [preset, brushSize, inkColor, dilution, showGrid]);
  
  // Drawing states
  const [isDrawing, setIsDrawing] = useState(false);
  const lastPointRef = useRef(null);
  const lastTimeRef = useRef(null);
  
  // Telemetry states
  const [velocity, setVelocity] = useState(0);
  const [canvasCoords, setCanvasCoords] = useState({ x: 0, y: 0 });
  const [pointCount, setPointCount] = useState(0);

  // Resize canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const rect = canvas.parentElement.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.height || 500;
    
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }, []);

  const getCanvasMousePos = (e) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    
    return {
      x: Math.round(clientX - rect.left),
      y: Math.round(clientY - rect.top)
    };
  };

  const drawSegment = (ctx, p1, p2, vel, travelAngle) => {
    ctx.save();
    
    ctx.globalAlpha = dilution;
    ctx.fillStyle = inkColor;
    ctx.strokeStyle = inkColor;
    
    const dx = p2.x - p1.x;
    const dy = p2.y - p1.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    const steps = Math.max(Math.floor(distance), 1);
    
    for (let i = 0; i <= steps; i++) {
      const t = i / steps;
      const x = p1.x + dx * t;
      const y = p1.y + dy * t;
      
      if (preset === 'BROAD_EDGE') {
        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(-Math.PI / 4); 
        ctx.fillRect(-brushSize / 2, -1.5, brushSize, 3);
        ctx.restore();
        
      } else if (preset === 'FLEX_REED') {
        const nibAngle = -Math.PI / 6; 
        const diff = Math.abs(Math.sin(travelAngle - nibAngle));
        const dynamicWidth = Math.max(3, brushSize * (0.3 + 0.7 * diff));
        
        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(nibAngle);
        ctx.fillRect(-dynamicWidth / 2, -1, dynamicWidth, 2);
        ctx.restore();
        
      } else if (preset === 'SHODO_BRUSH') {
        const speed = Math.min(vel, 12);
        const dynamicWidth = Math.max(2, brushSize * (1.2 - speed * 0.08));
        
        ctx.beginPath();
        ctx.arc(x, y, dynamicWidth / 2, 0, Math.PI * 2);
        ctx.fill();
        
        if (vel > 6 && i % 4 === 0) {
          ctx.beginPath();
          ctx.arc(x + (Math.random() - 0.5) * dynamicWidth, y + (Math.random() - 0.5) * dynamicWidth, 1, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    }
    
    ctx.restore();
  };

  const startDrawing = (e) => {
    e.preventDefault();
    const pos = getCanvasMousePos(e);
    setIsDrawing(true);
    lastPointRef.current = pos;
    lastTimeRef.current = Date.now();
    setPointCount(1);
  };

  const draw = (e) => {
    if (!isDrawing) return;
    e.preventDefault();
    
    const pos = getCanvasMousePos(e);
    setCanvasCoords(pos);
    
    const currentTime = Date.now();
    const timeDiff = Math.max(currentTime - lastTimeRef.current, 1);
    
    const dx = pos.x - lastPointRef.current.x;
    const dy = pos.y - lastPointRef.current.y;
    const dist = Math.sqrt(dx * dx + dy * dy);
    
    const currentVelocity = dist / timeDiff;
    setVelocity(Math.round(currentVelocity * 100) / 10);
    
    const travelAngle = Math.atan2(dy, dx);
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      drawSegment(ctx, lastPointRef.current, pos, currentVelocity, travelAngle);
    }
    
    lastPointRef.current = pos;
    lastTimeRef.current = currentTime;
    setPointCount(prev => prev + 1);
  };

  const stopDrawing = () => {
    setIsDrawing(false);
    lastPointRef.current = null;
    lastTimeRef.current = null;
    setVelocity(0);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    setPointCount(0);
  };

  const exportCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const image = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.download = `strokes_spec_${preset.toLowerCase()}.png`;
    link.href = image;
    link.click();
  };

  return (
    <div className="bg-[#000000] text-[#FFFFFF] min-h-screen py-32 px-8 md:px-16 border-t border-neutral-800 flex flex-col justify-center">
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
        
        {/* Left column: Telemetry Controls */}
        <div className="lg:col-span-4 flex flex-col justify-between space-y-8">
          <div>
            <span className="font-mono text-xs tracking-widest text-neutral-500 block mb-2">// INK PRESSURE LAB</span>
            <h2 className="text-4xl md:text-5xl font-serif font-light tracking-tight uppercase mb-6">Stroke Engine</h2>
            <p className="text-neutral-400 font-serif font-light text-sm leading-relaxed max-w-sm">
              Interact directly with calligraphic physics. Test nib angles, speed drag resistance, and ink flow dynamics.
            </p>
          </div>

          {/* Controls Panels */}
          <div className="space-y-6 border-t border-neutral-800 pt-6">
            {/* Nib Preset Grid */}
            <div className="space-y-2">
              <span className="font-mono text-[10px] text-neutral-500 block uppercase">NIB GEOMETRY PRESET</span>
              <div className="grid grid-cols-3 gap-2">
                {['BROAD_EDGE', 'FLEX_REED', 'SHODO_BRUSH'].map((type) => (
                  <button
                    key={type}
                    onClick={() => setPreset(type)}
                    className={`border px-2 py-3 text-[10px] font-mono tracking-wider uppercase transition-all duration-300 cursor-pointer ${
                      preset === type 
                        ? 'bg-white text-black border-white hover:bg-neutral-200 hover:border-neutral-200' 
                        : 'border-neutral-800 text-white hover:bg-white hover:text-black hover:border-white'
                    }`}
                  >
                    {type.replace('_', ' ')}
                  </button>
                ))}
              </div>
            </div>

            {/* Brush settings */}
            <div className="space-y-4 font-mono text-[10px]">
              <div>
                <div className="flex justify-between text-neutral-500 mb-2">
                  <span>NIB WEIGHT (SIZE)</span>
                  <span className="text-white font-bold">{brushSize}MM</span>
                </div>
                <input 
                  type="range" min="4" max="48" step="1" value={brushSize}
                  onChange={(e) => setBrushSize(Number(e.target.value))}
                  className="w-full accent-white bg-neutral-800 h-[2px] appearance-none cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between text-neutral-500 mb-2">
                  <span>INK DILUTION (WATER RATIO)</span>
                  <span className="text-white font-bold">{Math.round(dilution * 100)}%</span>
                </div>
                <input 
                  type="range" min="0.1" max="1.0" step="0.05" value={dilution}
                  onChange={(e) => setDilution(Number(e.target.value))}
                  className="w-full accent-white bg-neutral-800 h-[2px] appearance-none cursor-pointer"
                />
              </div>
            </div>

            {/* Color grid */}
            <div className="space-y-2">
              <span className="font-mono text-[10px] text-neutral-500 block uppercase">INK FORMULATION COLOR</span>
              <div className="flex gap-3">
                {COLORS.map((color) => (
                  <button
                    key={color.value}
                    onClick={() => setInkColor(color.value)}
                    style={{ backgroundColor: color.value === '#111111' ? '#1c1c1c' : color.value }}
                    className={`w-8 h-8 rounded-full border-2 transition-all cursor-pointer ${
                      inkColor === color.value ? 'border-white scale-110' : 'border-transparent hover:scale-105'
                    }`}
                    title={color.name}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="grid grid-cols-2 gap-4 border-t border-neutral-800 pt-6">
            <button 
              onClick={clearCanvas}
              className="flex items-center justify-center gap-2 border border-neutral-800 hover:border-white py-3 text-xs font-mono tracking-widest uppercase transition-all duration-300 cursor-pointer bg-black text-white hover:bg-white hover:text-black hover:border-white"
            >
              <Trash2 size={12} /> CLEAR
            </button>
            <button 
              onClick={exportCanvas}
              className="flex items-center justify-center gap-2 bg-white text-black py-3 text-xs font-mono tracking-widest uppercase border border-transparent hover:border-white hover:bg-black hover:text-white transition-all duration-300 cursor-pointer"
            >
              <Download size={12} /> EXPORT
            </button>
          </div>
        </div>

        {/* Right column: Interactive Canvas */}
        <div className="lg:col-span-8 flex flex-col justify-between border border-neutral-800 relative min-h-[500px]">
          
          {/* Practice Canvas Header */}
          <div className="flex justify-between items-center bg-[#070707] px-6 py-3 border-b border-neutral-800 font-mono text-[10px] tracking-widest uppercase text-neutral-400">
            <div className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-neutral-400"></span>
              <span>TELEMETRY CHANNEL</span>
            </div>
            
            <button 
              onClick={() => setShowGrid(!showGrid)}
              className="flex items-center gap-2 hover:text-white transition-colors cursor-pointer"
            >
              {showGrid ? (
                <>
                  <EyeOff size={12} /> HIDE GUIDELINES
                </>
              ) : (
                <>
                  <Grid size={12} /> SHOW GUIDELINES
                </>
              )}
            </button>
          </div>

          {/* Actual Canvas wrapper */}
          <div className="flex-1 bg-white relative overflow-hidden" ref={containerRef}>
            
            {/* Calligraphic guideline grids */}
            {showGrid && (
              <div className="absolute inset-0 pointer-events-none opacity-[0.06] select-none flex flex-col justify-around px-8">
                <div className="absolute inset-0" style={{
                  backgroundImage: 'repeating-linear-gradient(-30deg, transparent, transparent 50px, #000 50px, #000 51px)',
                }} />
                
                <div className="w-full border-b border-dashed border-black h-0"></div>
                <div className="w-full border-b border-black h-0"></div>
                <div className="w-full border-b border-dashed border-black h-0"></div>
                <div className="w-full border-b border-black h-0"></div>
                <div className="w-full border-b border-dashed border-black h-0"></div>
              </div>
            )}

            {/* Drawing Canvas */}
            <canvas
              ref={canvasRef}
              onMouseDown={startDrawing}
              onMouseMove={draw}
              onMouseUp={stopDrawing}
              onMouseLeave={stopDrawing}
              onTouchStart={startDrawing}
              onTouchMove={draw}
              onTouchEnd={stopDrawing}
              className="w-full h-full relative z-10 block cursor-crosshair"
            />
          </div>

          {/* Telemetry Footer Dashboard */}
          <div className="bg-[#050505] border-t border-neutral-800 p-6 grid grid-cols-2 md:grid-cols-4 gap-4 font-mono text-[10px] text-neutral-500 tracking-wider">
            <div>
              <p className="text-neutral-600">COORD_X</p>
              <p className="text-neutral-200 mt-0.5 tabular-nums">{canvasCoords.x}PX</p>
            </div>
            <div>
              <p className="text-neutral-600">COORD_Y</p>
              <p className="text-neutral-200 mt-0.5 tabular-nums">{canvasCoords.y}PX</p>
            </div>
            <div>
              <p className="text-neutral-600 flex items-center gap-1">
                <Activity size={10} /> VELOCITY
              </p>
              <p className="text-neutral-200 mt-0.5 tabular-nums">{velocity} PX/MS</p>
            </div>
            <div>
              <p className="text-neutral-600">POINTS</p>
              <p className="text-neutral-200 mt-0.5 tabular-nums">{pointCount}</p>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
