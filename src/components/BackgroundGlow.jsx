import React from 'react'

export default function BackgroundGlow() {
  return (
    <div className="glow-bg-layer" aria-hidden="true">
      {/* Radiant ambient glow spots */}
      <div className="radial-glow glow-1"></div>
      <div className="radial-glow glow-2"></div>
      <div className="radial-glow glow-3"></div>

      {/* Floating 3D Depth Crystals & Holographic Orbs */}
      <div className="ambient-3d-crystal crystal-1" aria-hidden="true"></div>
      <div className="ambient-3d-crystal crystal-2" aria-hidden="true"></div>
      <div className="ambient-3d-crystal crystal-3" aria-hidden="true"></div>

      {/* Center Backdrop: AI Head Silhouette + Scales of Justice + Floating Holographic Cyber Badges */}
      <div className="bg-watermark-scales">
        <svg viewBox="0 0 1200 900" fill="none" xmlns="http://www.w3.org/2000/svg" className="watermark-svg">
          {/* Subtle Concentric Cyber Rings */}
          <circle cx="600" cy="420" r="380" stroke="rgba(16, 185, 129, 0.07)" strokeWidth="1.5" strokeDasharray="8 8"/>
          <circle cx="600" cy="420" r="260" stroke="rgba(16, 185, 129, 0.09)" strokeWidth="1.5"/>
          <circle cx="600" cy="420" r="140" stroke="rgba(16, 185, 129, 0.06)" strokeWidth="1"/>

          {/* AI Humanoid Head Silhouette Profile (Facing Left, Holographic Wireframe) */}
          <g opacity="0.45" stroke="rgba(16, 185, 129, 0.35)" strokeWidth="1.5" fill="none">
            {/* Outer Head Profile */}
            <path d="M570 170 C510 170 440 210 420 280 C410 320 420 350 405 385 C390 410 365 425 350 445 C340 460 348 480 370 488 C390 495 405 510 415 535 C435 575 455 635 480 685 C520 755 610 765 660 765 C730 765 770 735 780 675 C795 605 775 525 775 440 C775 330 725 170 570 170 Z" />
            
            {/* Internal Neural Circuit Lines & Head Details */}
            <path d="M460 270 C520 250 630 260 670 300" strokeDasharray="4 4" />
            <path d="M440 370 C490 350 580 370 630 420" strokeDasharray="3 3" />
            <path d="M410 450 C460 440 540 460 590 510" strokeDasharray="4 4" />
            <path d="M450 540 C510 520 600 550 650 600" strokeDasharray="3 3" />
            
            {/* Brain/Neural Nodes */}
            <circle cx="530" cy="270" r="4" fill="rgba(16, 185, 129, 0.4)"/>
            <circle cx="610" cy="310" r="3.5" fill="rgba(16, 185, 129, 0.4)"/>
            <circle cx="560" cy="360" r="4" fill="rgba(16, 185, 129, 0.4)"/>
            <circle cx="500" cy="420" r="3.5" fill="rgba(16, 185, 129, 0.4)"/>
            <line x1="530" y1="270" x2="610" y2="310" stroke="rgba(16, 185, 129, 0.2)"/>
            <line x1="610" y1="310" x2="560" y2="360" stroke="rgba(16, 185, 129, 0.2)"/>
            <line x1="560" y1="360" x2="500" y2="420" stroke="rgba(16, 185, 129, 0.2)"/>
          </g>

          {/* Scales of Justice (Central Classical Balances of Law) */}
          <g stroke="rgba(16, 185, 129, 0.32)" strokeWidth="3" fill="none">
            {/* Central Pillar */}
            <line x1="680" y1="130" x2="680" y2="700" strokeWidth="4.5" strokeLinecap="round"/>
            <circle cx="680" cy="130" r="14" fill="rgba(16, 185, 129, 0.15)" strokeWidth="3"/>
            <line x1="640" y1="700" x2="720" y2="700" strokeWidth="6" strokeLinecap="round"/>

            {/* Horizontal Crossbeam */}
            <line x1="480" y1="240" x2="880" y2="240" strokeWidth="4.5" strokeLinecap="round"/>
            <circle cx="680" cy="240" r="12" fill="rgba(16, 185, 129, 0.4)" strokeWidth="2.5"/>

            {/* Left Balance Strings & Pan */}
            <line x1="520" y1="240" x2="450" y2="430" strokeWidth="2" stroke="rgba(16, 185, 129, 0.25)"/>
            <line x1="520" y1="240" x2="590" y2="430" strokeWidth="2" stroke="rgba(16, 185, 129, 0.25)"/>
            <ellipse cx="520" cy="440" rx="75" ry="18" fill="rgba(16, 185, 129, 0.04)" strokeWidth="2.5"/>
            <path d="M445 440 C445 470 595 470 595 440" strokeWidth="2"/>

            {/* Right Balance Strings & Pan */}
            <line x1="840" y1="240" x2="770" y2="430" strokeWidth="2" stroke="rgba(16, 185, 129, 0.25)"/>
            <line x1="840" y1="240" x2="910" y2="430" strokeWidth="2" stroke="rgba(16, 185, 129, 0.25)"/>
            <ellipse cx="840" cy="440" rx="75" ry="18" fill="rgba(16, 185, 129, 0.04)" strokeWidth="2.5"/>
            <path d="M765 440 C765 470 915 470 915 440" strokeWidth="2"/>
          </g>

          {/* Floating Holographic Cyber Badges Matching Screenshot */}
          {/* Badge 1: Bar Chart / Statistics (Top Right) */}
          <g transform="translate(890, 125)" opacity="0.65">
            <rect x="0" y="0" width="76" height="60" rx="14" fill="rgba(255, 255, 255, 0.35)" stroke="rgba(16, 185, 129, 0.45)" strokeWidth="1.8"/>
            <line x1="18" y1="46" x2="18" y2="34" stroke="rgba(16, 185, 129, 0.85)" strokeWidth="3.5" strokeLinecap="round"/>
            <line x1="32" y1="46" x2="32" y2="20" stroke="rgba(16, 185, 129, 0.85)" strokeWidth="3.5" strokeLinecap="round"/>
            <line x1="46" y1="46" x2="46" y2="28" stroke="rgba(16, 185, 129, 0.85)" strokeWidth="3.5" strokeLinecap="round"/>
            <line x1="60" y1="46" x2="60" y2="16" stroke="rgba(16, 185, 129, 0.85)" strokeWidth="3.5" strokeLinecap="round"/>
          </g>

          {/* Badge 2: Document / Scale Card (Top Center-Right) */}
          <g transform="translate(810, 85)" opacity="0.55">
            <rect x="0" y="0" width="62" height="52" rx="12" fill="rgba(255, 255, 255, 0.3)" stroke="rgba(16, 185, 129, 0.4)" strokeWidth="1.5"/>
            <path d="M20 16 H42 M20 26 H42 M20 36 H34" stroke="rgba(16, 185, 129, 0.75)" strokeWidth="2.5" strokeLinecap="round"/>
          </g>

          {/* Badge 3: IA / AI Chip Card (Right Middle - exact "IA" text from screenshot) */}
          <g transform="translate(950, 330)" opacity="0.65">
            <rect x="0" y="0" width="105" height="90" rx="18" fill="rgba(255, 255, 255, 0.35)" stroke="rgba(16, 185, 129, 0.5)" strokeWidth="2"/>
            <text x="24" y="60" fill="rgba(16, 185, 129, 0.7)" fontSize="44" fontFamily="'Plus Jakarta Sans', sans-serif" fontWeight="800">IA</text>
          </g>

          {/* Badge 4: Legal Case File Card (Right Lower) */}
          <g transform="translate(1020, 500)" opacity="0.55">
            <rect x="0" y="0" width="58" height="50" rx="12" fill="rgba(255, 255, 255, 0.3)" stroke="rgba(16, 185, 129, 0.4)" strokeWidth="1.5"/>
            <rect x="14" y="12" width="30" height="26" rx="4" stroke="rgba(16, 185, 129, 0.7)" strokeWidth="2" fill="none"/>
            <line x1="20" y1="20" x2="38" y2="20" stroke="rgba(16, 185, 129, 0.7)" strokeWidth="2"/>
            <line x1="20" y1="26" x2="32" y2="26" stroke="rgba(16, 185, 129, 0.7)" strokeWidth="2"/>
          </g>

          {/* Badge 5: Signal / Wireless Node Card (Right Bottom) */}
          <g transform="translate(1040, 665)" opacity="0.55">
            <rect x="0" y="0" width="56" height="48" rx="12" fill="rgba(255, 255, 255, 0.3)" stroke="rgba(16, 185, 129, 0.4)" strokeWidth="1.5"/>
            <path d="M18 36 C22 30 34 30 38 36" stroke="rgba(16, 185, 129, 0.7)" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
            <path d="M22 38 C25 34 31 34 34 38" stroke="rgba(16, 185, 129, 0.7)" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
            <circle cx="28" cy="41" r="2" fill="rgba(16, 185, 129, 0.8)"/>
          </g>

          {/* Holographic Connecting Traces */}
          <line x1="890" y1="155" x2="810" y2="110" stroke="rgba(16, 185, 129, 0.2)" strokeWidth="1.5" strokeDasharray="5 5"/>
          <line x1="920" y1="185" x2="950" y2="330" stroke="rgba(16, 185, 129, 0.2)" strokeWidth="1.5" strokeDasharray="5 5"/>
          <line x1="1000" y1="420" x2="1030" y2="500" stroke="rgba(16, 185, 129, 0.2)" strokeWidth="1.5" strokeDasharray="5 5"/>
          <line x1="1050" y1="550" x2="1060" y2="665" stroke="rgba(16, 185, 129, 0.2)" strokeWidth="1.5" strokeDasharray="5 5"/>
        </svg>
      </div>
    </div>
  )
}
