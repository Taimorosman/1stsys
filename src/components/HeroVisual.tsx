import * as React from "react";

export function HeroVisual() {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[560px] select-none">
      {/* Soft outer halos (CSS blur, beyond SVG bounds) */}
      <div className="absolute inset-[12%] rounded-full bg-[var(--color-accent-2)]/20 blur-[70px] animate-halo" />
      <div className="absolute inset-[30%] rounded-full bg-[var(--color-accent-2)]/15 blur-[50px] animate-halo-delayed" />

      <svg
        viewBox="0 0 600 600"
        className="absolute inset-0 h-full w-full"
        aria-hidden="true"
      >
        <defs>
          <radialGradient id="hv-core" cx="38%" cy="32%">
            <stop offset="0%" stopColor="#f3f5f7" />
            <stop offset="35%" stopColor="#cad2db" />
            <stop offset="70%" stopColor="#8e9aa8" />
            <stop offset="100%" stopColor="#31373e" />
          </radialGradient>
          <radialGradient id="hv-halo" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#8e9aa8" stopOpacity="0.32" />
            <stop offset="45%" stopColor="#8e9aa8" stopOpacity="0.08" />
            <stop offset="100%" stopColor="#8e9aa8" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="hv-coreGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#8e9aa8" stopOpacity="0.65" />
            <stop offset="55%" stopColor="#8e9aa8" stopOpacity="0.12" />
            <stop offset="100%" stopColor="#8e9aa8" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="hv-atom" cx="35%" cy="30%">
            <stop offset="0%" stopColor="#f3f5f7" />
            <stop offset="55%" stopColor="#8e9aa8" />
            <stop offset="100%" stopColor="#222830" />
          </radialGradient>

          <pattern
            id="hv-hex"
            x="0"
            y="0"
            width="46"
            height="40"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M23 0 L46 13 L46 27 L23 40 L0 27 L0 13 Z"
              stroke="rgba(142,154,168,0.2)"
              strokeWidth="0.6"
              fill="none"
            />
          </pattern>

          <radialGradient id="hv-hexFade" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="white" stopOpacity="0.7" />
            <stop offset="55%" stopColor="white" stopOpacity="0.18" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </radialGradient>
          <mask id="hv-hexMask">
            <rect width="600" height="600" fill="url(#hv-hexFade)" />
          </mask>

          <filter
            id="hv-blur"
            x="-50%"
            y="-50%"
            width="200%"
            height="200%"
          >
            <feGaussianBlur stdDeviation="3" />
          </filter>

          <linearGradient id="hv-orbit-1" x1="0" y1="0" x2="600" y2="0">
            <stop offset="0%" stopColor="#00bd3a" stopOpacity="0" />
            <stop offset="35%" stopColor="#00bd3a" stopOpacity="0.65" />
            <stop offset="65%" stopColor="#00bd3a" stopOpacity="0.65" />
            <stop offset="100%" stopColor="#00bd3a" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="hv-orbit-2" x1="0" y1="0" x2="600" y2="0">
            <stop offset="0%" stopColor="#00bd3a" stopOpacity="0" />
            <stop offset="40%" stopColor="#00bd3a" stopOpacity="0.7" />
            <stop offset="60%" stopColor="#00bd3a" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#00bd3a" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="hv-orbit-3" x1="0" y1="0" x2="600" y2="0">
            <stop offset="0%" stopColor="#8e9aa8" stopOpacity="0" />
            <stop offset="50%" stopColor="#8e9aa8" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#8e9aa8" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Hex backdrop with radial fade */}
        <rect
          width="600"
          height="600"
          fill="url(#hv-hex)"
          mask="url(#hv-hexMask)"
        />

        {/* Outer luminous halo */}
        <circle cx="300" cy="300" r="290" fill="url(#hv-halo)" />

        {/* Orbit 1 — flat, slow forward */}
        <g>
          <ellipse
            cx="300"
            cy="300"
            rx="260"
            ry="78"
            stroke="url(#hv-orbit-1)"
            strokeWidth="1.2"
            strokeDasharray="2 6"
            fill="none"
          />
          <g>
            <circle cx="560" cy="300" r="24" fill="#8e9aa8" opacity="0.14" />
            <circle cx="560" cy="300" r="11" fill="url(#hv-atom)" />
            <circle
              cx="556.5"
              cy="296.5"
              r="3.5"
              fill="#fff5e0"
              opacity="0.85"
            />
          </g>
          <animateTransform
            attributeName="transform"
            type="rotate"
            from="0 300 300"
            to="360 300 300"
            dur="38s"
            repeatCount="indefinite"
          />
        </g>

        {/* Orbit 2 — tilted 65°, medium reverse */}
        <g>
          <ellipse
            cx="300"
            cy="300"
            rx="240"
            ry="96"
            stroke="url(#hv-orbit-2)"
            strokeWidth="1.2"
            strokeDasharray="3 7"
            fill="none"
          />
          <g>
            <circle cx="540" cy="300" r="22" fill="#8e9aa8" opacity="0.16" />
            <circle cx="540" cy="300" r="10" fill="url(#hv-atom)" />
            <circle
              cx="537"
              cy="297"
              r="3"
              fill="#fff5e0"
              opacity="0.85"
            />
          </g>
          <animateTransform
            attributeName="transform"
            type="rotate"
            from="65 300 300"
            to="-295 300 300"
            dur="28s"
            repeatCount="indefinite"
          />
        </g>

        {/* Orbit 3 — tilted -35°, fast forward */}
        <g>
          <ellipse
            cx="300"
            cy="300"
            rx="218"
            ry="66"
            stroke="url(#hv-orbit-3)"
            strokeWidth="1.2"
            strokeDasharray="2 5"
            fill="none"
          />
          <g>
            <circle cx="518" cy="300" r="20" fill="#8e9aa8" opacity="0.16" />
            <circle cx="518" cy="300" r="8.5" fill="url(#hv-atom)" />
            <circle
              cx="515.5"
              cy="297.5"
              r="2.6"
              fill="#fff5e0"
              opacity="0.85"
            />
          </g>
          <animateTransform
            attributeName="transform"
            type="rotate"
            from="-35 300 300"
            to="325 300 300"
            dur="20s"
            repeatCount="indefinite"
          />
        </g>

        {/* Floating particles drifting upward */}
        <g>
          {[
            { cx: 120, delay: 0.2, dur: 9, r: 1.8 },
            { cx: 195, delay: 3.1, dur: 11, r: 1.4 },
            { cx: 95, delay: 5.4, dur: 10, r: 1.2 },
            { cx: 380, delay: 1.6, dur: 8, r: 1.6 },
            { cx: 470, delay: 4.2, dur: 12, r: 1.3 },
            { cx: 510, delay: 6.5, dur: 9.5, r: 1.5 },
            { cx: 250, delay: 7.1, dur: 11.5, r: 1.1 },
            { cx: 340, delay: 2.7, dur: 10.5, r: 1.4 },
          ].map((p, i) => (
            <circle key={i} cx={p.cx} cy="540" r={p.r} fill="#8e9aa8">
              <animate
                attributeName="cy"
                from="560"
                to="60"
                dur={`${p.dur}s`}
                begin={`${p.delay}s`}
                repeatCount="indefinite"
              />
              <animate
                attributeName="opacity"
                values="0;0.85;0.85;0"
                keyTimes="0;0.15;0.85;1"
                dur={`${p.dur}s`}
                begin={`${p.delay}s`}
                repeatCount="indefinite"
              />
            </circle>
          ))}
        </g>

        {/* Pulsing core aura */}
        <circle cx="300" cy="300" r="105" fill="url(#hv-coreGlow)">
          <animate
            attributeName="r"
            values="92;115;92"
            dur="4s"
            repeatCount="indefinite"
          />
          <animate
            attributeName="opacity"
            values="0.7;1;0.7"
            dur="4s"
            repeatCount="indefinite"
          />
        </circle>

        {/* Core sphere */}
        <circle cx="300" cy="300" r="58" fill="url(#hv-core)" />

        {/* Core inner ring */}
        <circle
          cx="300"
          cy="300"
          r="58"
          fill="none"
          stroke="#fff5e0"
          strokeOpacity="0.28"
          strokeWidth="0.7"
        />

        {/* Core highlight */}
        <ellipse
          cx="282"
          cy="282"
          rx="15"
          ry="10"
          fill="white"
          opacity="0.5"
          filter="url(#hv-blur)"
        />

        {/* Light rays from core */}
        <g opacity="0.5">
          <line
            x1="300"
            y1="300"
            x2="300"
            y2="160"
            stroke="#fff5e0"
            strokeWidth="0.6"
            strokeOpacity="0.4"
          >
            <animate
              attributeName="stroke-opacity"
              values="0.1;0.6;0.1"
              dur="3s"
              repeatCount="indefinite"
            />
          </line>
          <line
            x1="300"
            y1="300"
            x2="440"
            y2="300"
            stroke="#fff5e0"
            strokeWidth="0.6"
            strokeOpacity="0.4"
          >
            <animate
              attributeName="stroke-opacity"
              values="0.1;0.6;0.1"
              dur="3s"
              begin="0.5s"
              repeatCount="indefinite"
            />
          </line>
          <line
            x1="300"
            y1="300"
            x2="300"
            y2="440"
            stroke="#fff5e0"
            strokeWidth="0.6"
            strokeOpacity="0.4"
          >
            <animate
              attributeName="stroke-opacity"
              values="0.1;0.6;0.1"
              dur="3s"
              begin="1s"
              repeatCount="indefinite"
            />
          </line>
          <line
            x1="300"
            y1="300"
            x2="160"
            y2="300"
            stroke="#fff5e0"
            strokeWidth="0.6"
            strokeOpacity="0.4"
          >
            <animate
              attributeName="stroke-opacity"
              values="0.1;0.6;0.1"
              dur="3s"
              begin="1.5s"
              repeatCount="indefinite"
            />
          </line>
        </g>
      </svg>
    </div>
  );
}
