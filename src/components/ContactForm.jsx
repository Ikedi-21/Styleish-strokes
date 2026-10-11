import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Custom Marker Pin with styling aligned to our strict editorial aesthetic (Gold Leaf #D4AF37 and Ink Black #000000)
const customMarkerIcon = new L.divIcon({
  className: 'custom-leaflet-marker',
  html: `<div style="
    width: 24px;
    height: 24px;
    background-color: #D4AF37;
    border: 2px solid #000000;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 2px 6px rgba(0,0,0,0.5);
  ">
    <div style="width: 8px; height: 8px; background-color: #000000; border-radius: 50%;"></div>
  </div>`,
  iconSize: [24, 24],
  iconAnchor: [12, 12]
});

// Helper component to smoothly center/pan the map container
function MapRecenter({ center }) {
  const map = useMap();
  useEffect(() => {
    if (center && center[0] && center[1]) {
      map.setView(center, 13, { animate: true, duration: 1.5 });
    }
  }, [center, map]);
  return null;
}

export default function ContactForm({ coords }) {
  // Controlled text input tracking states to simulate client-side memory fields
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  // Frontend lifecycle state machine: 'READY' -> 'SENDING' -> 'COMPLETE'
  const [lifecycle, setLifecycle] = useState('READY');
  const [error, setError] = useState('');

  // Manage resolved coordinates locally, initializing with Enugu/Lagos fallback values
  const [localCoords, setLocalCoords] = useState({
    lat: coords?.lat ? Number(coords.lat) : 6.4281,
    lon: coords?.lon ? Number(coords.lon) : 3.4219
  });

  useEffect(() => {
    // If coordinates are provided as props and resolved, update local state
    if (coords?.lat && coords?.lon) {
      setLocalCoords({
        lat: Number(coords.lat),
        lon: Number(coords.lon)
      });
      return;
    }

    // Geolocation API check and lookup on mount
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setLocalCoords({
            lat: Number(pos.coords.latitude.toFixed(4)),
            lon: Number(pos.coords.longitude.toFixed(4))
          });
        },
        (err) => {
          console.warn("ContactForm Geolocation failed or denied. Falling back to Enugu/Lagos default node.", err);
          setLocalCoords({ lat: 6.4281, lon: 3.4219 });
        }
      );
    } else {
      setLocalCoords({ lat: 6.4281, lon: 3.4219 });
    }
  }, [coords]);

  /**
   * Handles form validation, status transitions, and data persistence logs.
   * Compiles the payload into a strictly structured JSON entry.
   */
  const dispatchForm = (e) => {
    e.preventDefault();
    setError('');

    // Input Validation: Intercept submissions, strip spaces, and validate empty inputs
    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    const trimmedMessage = message.trim();

    if (!trimmedName) {
      setError('Identifier (Name) cannot be empty or contain only whitespace.');
      return;
    }
    if (!trimmedEmail) {
      setError('Return Node (Email) cannot be empty or contain only whitespace.');
      return;
    }
    if (!trimmedMessage) {
      setError('Payload Text (Message) cannot be empty or contain only whitespace.');
      return;
    }

    // Validate email inputs against standard syntax regular expression
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmedEmail)) {
      setError('Digital Return Node (Email) does not conform to expected structural syntax rules.');
      return;
    }

    // Validation passed - Transition operational pipeline state to SENDING
    setLifecycle('SENDING');

    // Simulate active network upload processes via 1500ms latency delay block
    setTimeout(() => {
      try {
        const STORAGE_KEY = 'stylishstrokes_contact_history';
        let history = [];

        // Retrieve existing history collection array from localStorage (simulated file system)
        const storedHistory = localStorage.getItem(STORAGE_KEY);
        if (storedHistory) {
          try {
            history = JSON.parse(storedHistory);
            if (!Array.isArray(history)) {
              history = [];
            }
          } catch (parseErr) {
            console.error('Failed to parse client contact history. Initializing new array.', parseErr);
            history = [];
          }
        }

        // Compile text inputs and contextual system telemetry indicators into a schema-valid JSON object
        const newRecord = {
          name: trimmedName,
          email: trimmedEmail,
          message: trimmedMessage,
          timestamp: Date.now(),
          location: {
            lat: localCoords.lat,
            lon: localCoords.lon
          }
        };

        // Append the new record block to the history array and save it
        history.push(newRecord);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(history));

      } catch (writeErr) {
        console.error('Failed to serialize contact log records to browser storage:', writeErr);
      }

      // Complete transmission step: transition flag, flush fields, and show success confirmation banner
      setLifecycle('COMPLETE');
      setName('');
      setEmail('');
      setMessage('');

      // Trigger final 3000ms delay window before returning to READY to enable interactive elements
      setTimeout(() => {
        setLifecycle('READY');
      }, 3000);

    }, 1500);
  };

  return (
    <div className="bg-[#FBFBFA] text-[#000000] min-h-screen py-32 px-8 md:px-16 flex items-center justify-center border-t border-neutral-200 paper-grid">
      {/* Sleek editorial mapping custom styles block */}
      <style jsx="true" global="true">{`
        .leaflet-tile {
          filter: grayscale(100%) invert(100%) contrast(120%) brightness(80%);
        }
        .leaflet-container {
          background: #0a0a0a !important;
          font-family: inherit;
        }
        .leaflet-bar a {
          background-color: #1a1a1a !important;
          color: #ffffff !important;
          border-color: #2a2a2a !important;
        }
        .leaflet-bar a:hover {
          background-color: #d4af37 !important;
          color: #000000 !important;
        }
        .leaflet-popup-content-wrapper {
          background-color: #1a1a1a !important;
          color: #ffffff !important;
          border-radius: 0px !important;
          border: 1px solid #d4af37 !important;
        }
        .leaflet-popup-tip {
          background-color: #1a1a1a !important;
        }
      `}</style>

      <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16">
        
        {/* Controlled Input Section */}
        <div className="lg:col-span-7 space-y-10">
          <div className="space-y-2">
            <span className="font-mono text-xs tracking-widest text-neutral-400 block">// Get In Touch</span>
            <h2 className="text-4xl md:text-5xl font-serif font-normal tracking-tight text-neutral-900">Feedback & Inquiries</h2>
          </div>

          <form onSubmit={dispatchForm} className="space-y-8">
            {/* System Error Warnings Banner */}
            {error && (
              <div className="bg-black text-white p-4 border border-black font-mono text-xs tracking-widest uppercase flex items-center justify-between select-none">
                <span>Error: {error}</span>
                <button 
                  type="button" 
                  onClick={() => setError('')} 
                  className="font-bold hover:underline cursor-pointer focus:outline-none"
                >
                  [Dismiss]
                </button>
              </div>
            )}

            {/* High-Contrast System Success Validation Banner */}
            {lifecycle === 'COMPLETE' && (
              <div className="bg-black text-white p-4 border border-black font-mono text-xs tracking-widest uppercase animate-pulse flex items-center justify-between select-none">
                <span>✓ Transmission Complete. Log Record Written to History.</span>
                <span className="font-bold">SUCCESS</span>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="flex flex-col border-b border-neutral-300 pb-2 focus-within:border-black transition-colors duration-300">
                <label className="font-mono text-[10px] uppercase tracking-wider text-neutral-400">Your Full Identifier</label>
                <input 
                  type="text" 
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    if (error) setError('');
                  }}
                  disabled={lifecycle !== 'READY'}
                  className="bg-transparent border-none outline-none p-0 mt-2 font-serif text-base text-neutral-900 disabled:opacity-50 disabled:cursor-not-allowed"
                />
              </div>
              <div className="flex flex-col border-b border-neutral-300 pb-2 focus-within:border-black transition-colors duration-300">
                <label className="font-mono text-[10px] uppercase tracking-wider text-neutral-400">Digital Return Node (Email)</label>
                <input 
                  type="text" 
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (error) setError('');
                  }}
                  disabled={lifecycle !== 'READY'}
                  className="bg-transparent border-none outline-none p-0 mt-2 font-mono text-sm text-neutral-900 disabled:opacity-50 disabled:cursor-not-allowed"
                />
              </div>
            </div>

            <div className="flex flex-col border-b border-neutral-300 pb-2 focus-within:border-black transition-colors duration-300">
              <label className="font-mono text-[10px] uppercase tracking-wider text-neutral-400">Message / Suggestions Parameters</label>
              <textarea 
                rows={3} 
                value={message}
                onChange={(e) => {
                  setMessage(e.target.value);
                  if (error) setError('');
                }}
                disabled={lifecycle !== 'READY'}
                className="bg-transparent border-none outline-none p-0 mt-2 font-serif text-base text-neutral-900 resize-none disabled:opacity-50 disabled:cursor-not-allowed"
              />
            </div>

            <button
              type="submit"
              disabled={lifecycle !== 'READY'}
              className={`w-full bg-[#000000] text-[#FFFFFF] px-8 py-4 font-mono text-xs tracking-widest uppercase transition-colors duration-300 ${
                lifecycle !== 'READY' ? 'opacity-50 cursor-not-allowed' : 'hover:bg-neutral-800'
              }`}
            >
              {lifecycle === 'READY' && 'Transmit Dispatch'}
              {lifecycle === 'SENDING' && 'Uploading Packets...'}
              {lifecycle === 'COMPLETE' && '✓ Transmission Dispatched Successfully'}
            </button>
          </form>
        </div>

        {/* Dashboard Geolocation Interface */}
        <div className="lg:col-span-5 border border-neutral-200 bg-white p-8 flex flex-col justify-between h-[500px] lg:h-auto dark-grid">
          <div className="space-y-6">
            <div className="flex justify-between items-center border-b border-neutral-100 pb-4">
              <span className="font-mono text-[11px] tracking-wider text-neutral-400 uppercase">// Device Hardware Telemetry</span>
              <span className="h-2 w-2 bg-neutral-900 rounded-full animate-ping"></span>
            </div>
            
            <div className="space-y-3 font-mono text-xs text-neutral-600">
              <p>DEVICE_LATITUDE: <span className="text-black font-bold tracking-normal">{localCoords.lat.toFixed(4)}° N</span></p>
              <p>DEVICE_LONGITUDE: <span className="text-black font-bold tracking-normal">{localCoords.lon.toFixed(4)}° E</span></p>
              <p>CONNECTION_NODE: <span className="text-black font-bold">STYLISH_STROKES_LIVE</span></p>
            </div>
          </div>

          {/* Actual Production-Ready Leaflet Map Container */}
          <div className="w-full h-64 border border-neutral-800 bg-neutral-950 my-6 relative z-10 overflow-hidden">
            <MapContainer
              center={[localCoords.lat, localCoords.lon]}
              zoom={13}
              scrollWheelZoom={false}
              className="w-full h-full"
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <Marker position={[localCoords.lat, localCoords.lon]} icon={customMarkerIcon}>
                <Popup>
                  <div className="font-mono text-[10px] text-white">
                    <span className="text-neutral-400 uppercase">// ACTIVE_NODE</span>
                    <p className="mt-1">LAT: {localCoords.lat.toFixed(4)}°</p>
                    <p>LON: {localCoords.lon.toFixed(4)}°</p>
                  </div>
                </Popup>
              </Marker>
              <MapRecenter center={[localCoords.lat, localCoords.lon]} />
            </MapContainer>
          </div>

          <p className="font-mono text-[10px] text-neutral-400 leading-normal">
            Telemetry extracted using global hardware metrics. Coordinates dynamically map localized routing nodes securely.
          </p>
        </div>

      </div>
    </div>
  );
}
