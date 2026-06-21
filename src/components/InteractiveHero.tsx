"use client";

import * as React from "react";
import { Icon } from "./Icon";

interface InteractiveHeroProps {
  isAr: boolean;
  altText: string;
  badgeText1: string;
  badgeSub1: string;
  badgeText2: string;
  badgeSub2: string;
}

export function InteractiveHero({
  isAr,
  altText,
  badgeText1,
  badgeSub1,
  badgeText2,
  badgeSub2
}: InteractiveHeroProps) {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [coords, setCoords] = React.useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = React.useState(false);
  const [spotlight, setSpotlight] = React.useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    
    // Mouse position relative to the element
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Calculate percentages (-0.5 to 0.5)
    const pctX = (x / rect.width) - 0.5;
    const pctY = (y / rect.height) - 0.5;
    
    // Tilt angle maximum of 8 degrees
    const rotateY = pctX * 16;
    const rotateX = -pctY * 16; // Invert to tilt towards mouse
    
    setCoords({ x: rotateY, y: rotateX });
    setSpotlight({ x, y });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setCoords({ x: 0, y: 0 });
  };

  // Smooth out transition on hover enter/leave
  const tiltStyle = {
    transform: isHovered 
      ? `rotateY(${coords.x}deg) rotateX(${coords.y}deg) scale(1.02)` 
      : 'rotateY(0deg) rotateX(0deg) scale(1)',
    transition: isHovered ? 'transform 0.1s cubic-bezier(0.25, 1, 0.5, 1)' : 'transform 0.5s cubic-bezier(0.25, 1, 0.5, 1)',
    transformStyle: "preserve-3d" as const,
  };

  // Parallax elements move slightly more for depth
  const badge1Style = {
    transform: isHovered
      ? `rotateY(${coords.x * 1.3}deg) rotateX(${coords.y * 1.3}deg) translateZ(40px) translateY(-5px)`
      : 'rotateY(0deg) rotateX(0deg) translateZ(0px) translateY(0)',
    transition: isHovered ? 'transform 0.1s cubic-bezier(0.25, 1, 0.5, 1)' : 'transform 0.6s cubic-bezier(0.25, 1, 0.5, 1)',
  };

  const badge2Style = {
    transform: isHovered
      ? `rotateY(${coords.x * 1.4}deg) rotateX(${coords.y * 1.4}deg) translateZ(60px) translateY(5px)`
      : 'rotateY(0deg) rotateX(0deg) translateZ(0px) translateY(0)',
    transition: isHovered ? 'transform 0.1s cubic-bezier(0.25, 1, 0.5, 1)' : 'transform 0.6s cubic-bezier(0.25, 1, 0.5, 1)',
  };

  const gridStyle = {
    transform: isHovered
      ? `rotateY(${coords.x * 0.4}deg) rotateX(${coords.y * 0.4}deg) translateZ(-30px)`
      : 'rotateY(0deg) rotateX(0deg) translateZ(0)',
    transition: isHovered ? 'transform 0.15s ease-out' : 'transform 0.5s ease-out',
  };

  return (
    <div 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative w-full aspect-[4/3] select-none"
      style={{ perspective: "1200px" }}
    >
      {/* Decorative Vector Blueprint Grid - tilts backward */}
      <div 
        className="absolute inset-[-12%] pointer-events-none opacity-40 z-0 transition-transform"
        style={gridStyle}
      >
        <svg viewBox="0 0 500 500" fill="none" className="w-full h-full text-[var(--color-accent)]/15">
          <circle cx="250" cy="250" r="230" stroke="currentColor" strokeWidth="0.8" strokeDasharray="3 6" />
          <circle cx="250" cy="250" r="140" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2 4" />
          <line x1="20" y1="250" x2="480" y2="250" stroke="currentColor" strokeWidth="0.5" strokeDasharray="4 4" />
          <line x1="250" y1="20" x2="250" y2="480" stroke="currentColor" strokeWidth="0.5" strokeDasharray="4 4" />
          <path d="M 120 120 L 140 120 L 120 140 Z" stroke="currentColor" strokeWidth="0.8" />
          <path d="M 380 120 L 360 120 L 380 140 Z" stroke="currentColor" strokeWidth="0.8" />
          <path d="M 120 380 L 140 380 L 120 360 Z" stroke="currentColor" strokeWidth="0.8" />
          <path d="M 380 380 L 360 380 L 380 360 Z" stroke="currentColor" strokeWidth="0.8" />
        </svg>
      </div>

      {/* Main Image Container Card */}
      <div 
        className="ui-card relative w-full h-full overflow-hidden rounded-3xl border border-[var(--color-border)] bg-[var(--color-surface)] shadow-2xl group cursor-pointer z-10"
        style={tiltStyle}
      >
        {/* Outer soft aura glow */}
        <div className="absolute -inset-2 rounded-[32px] bg-gradient-to-tr from-[var(--color-accent)]/15 to-[var(--color-accent)]/2 blur-xl opacity-75 animate-halo pointer-events-none" />

        {/* Real Microcement Image */}
        <img
          src="/images/microcement_hero.png"
          alt={altText}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-103"
        />

        {/* Spotlight overlay following cursor */}
        {isHovered && (
          <div 
            className="absolute inset-0 pointer-events-none z-10 transition-opacity duration-300"
            style={{
              background: `radial-gradient(circle at ${spotlight.x}px ${spotlight.y}px, rgba(255, 255, 255, 0.28) 0%, rgba(0, 189, 58, 0.08) 35%, transparent 65%)`
            }}
          />
        )}
      </div>

      {/* Floating Badge 1: Top-Right (Off-White Seamless Finish info) */}
      <div 
        className={`absolute top-6 z-20 transition-transform ${isAr ? 'left-6' : 'right-6'}`}
        style={badge1Style}
      >
        <div className="backdrop-blur-md bg-white/75 border border-white/50 shadow-xl px-4 py-3 rounded-2xl flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[var(--color-accent-soft)] text-[var(--color-accent)]">
            <Icon name="Sparkles" size={18} />
          </div>
          <div>
            <div className="text-[11px] font-bold text-[var(--color-fg)] leading-none">{badgeText1}</div>
            <div className="text-[9px] text-[var(--color-fg-muted)] mt-1 font-medium leading-none">{badgeSub1}</div>
          </div>
        </div>
      </div>

      {/* Floating Badge 2: Bottom-Left (Prestige KSA Villas) */}
      <div 
        className={`absolute bottom-6 z-20 transition-transform ${isAr ? 'right-6' : 'left-6'}`}
        style={badge2Style}
      >
        <div className="backdrop-blur-md bg-white/75 border border-white/50 shadow-xl px-4 py-3 rounded-2xl flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[var(--color-accent-soft)] text-[var(--color-accent)] relative">
            <span className="absolute top-1.5 right-1.5 flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--color-accent)] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--color-accent)]"></span>
            </span>
            <Icon name="Building" size={18} />
          </div>
          <div>
            <div className="text-[11px] font-bold text-[var(--color-fg)] leading-none">{badgeText2}</div>
            <div className="text-[9px] text-[var(--color-fg-muted)] mt-1 font-medium leading-none">{badgeSub2}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
