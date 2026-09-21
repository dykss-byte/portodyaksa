import React from "react";

// 1. SHERIFF WOODY AUTHENTIC VECTOR FIGURE
export function WoodyFigure({ className = "w-12 h-12", size = 48 }: { className?: string; size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ filter: "drop-shadow(0 4px 6px rgba(120,53,15,0.35))" }}
    >
      {/* Cowboy Hat */}
      <ellipse cx="50" cy="22" rx="42" ry="12" fill="#78350F" />
      <path d="M28 22 C28 8, 72 8, 72 22 Z" fill="#92400E" />
      <path d="M30 21 Q50 16 70 21" stroke="#B45309" strokeWidth="2.5" fill="none" />
      <ellipse cx="50" cy="22" rx="22" ry="5" fill="#451A03" />

      {/* Ears & Face */}
      <circle cx="30" cy="46" r="6" fill="#FDE68A" />
      <circle cx="70" cy="46" r="6" fill="#FDE68A" />
      <path
        d="M32 32 C32 26, 68 26, 68 32 C68 48, 62 60, 50 62 C38 60, 32 48, 32 32 Z"
        fill="#FDE68A"
      />

      {/* Hair tuft */}
      <path d="M36 28 Q44 23 48 29 Q56 22 64 28" stroke="#78350F" strokeWidth="3" strokeLinecap="round" fill="none" />

      {/* Eyes */}
      <ellipse cx="42" cy="38" rx="4" ry="5" fill="#FFFFFF" />
      <circle cx="43" cy="38" r="2.2" fill="#451A03" />
      <circle cx="44" cy="37" r="0.8" fill="#FFFFFF" />

      <ellipse cx="58" cy="38" rx="4" ry="5" fill="#FFFFFF" />
      <circle cx="57" cy="38" r="2.2" fill="#451A03" />
      <circle cx="58" cy="37" r="0.8" fill="#FFFFFF" />

      {/* Rosy Cheeks */}
      <circle cx="37" cy="44" r="3.5" fill="#F87171" opacity="0.6" />
      <circle cx="63" cy="44" r="3.5" fill="#F87171" opacity="0.6" />

      {/* Smile & Nose */}
      <path d="M49 40 L50 44 L48 45" stroke="#D97706" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M43 49 Q50 56 57 49" stroke="#991B1B" strokeWidth="2" strokeLinecap="round" fill="none" />

      {/* Red Bandana */}
      <path d="M36 58 Q50 64 64 58 L50 72 Z" fill="#DC2626" />
      <circle cx="50" cy="62" r="1.5" fill="#FFFFFF" />
      <circle cx="44" cy="60" r="1" fill="#FFFFFF" />
      <circle cx="56" cy="60" r="1" fill="#FFFFFF" />

      {/* Yellow Flannel Shirt & Cowhide Vest */}
      <path d="M30 68 L70 68 L74 96 L26 96 Z" fill="#FBBF24" />
      {/* Red flannel stripes */}
      <path d="M40 68 L40 96 M60 68 L60 96 M28 78 L72 78 M28 88 L72 88" stroke="#EF4444" strokeWidth="1.5" opacity="0.8" />
      {/* Cowhide Vest Panels */}
      <path d="M28 68 L44 68 L42 96 L26 96 Z" fill="#FFFFFF" />
      <path d="M72 68 L56 68 L58 96 L74 96 Z" fill="#FFFFFF" />
      {/* Cowhide black spots */}
      <ellipse cx="34" cy="74" rx="4" ry="3" fill="#1E1B4B" />
      <ellipse cx="36" cy="88" rx="5" ry="4" fill="#1E1B4B" />
      <ellipse cx="66" cy="76" rx="4" ry="5" fill="#1E1B4B" />
      <ellipse cx="64" cy="90" rx="3.5" ry="3" fill="#1E1B4B" />

      {/* Gold Sheriff Badge on Vest */}
      <polygon
        points="37,79 38.5,83 43,83 39.5,85.5 41,89.5 37,87 33,89.5 34.5,85.5 31,83 35.5,83"
        fill="#FACC15"
        stroke="#CA8A04"
        strokeWidth="0.8"
      />
      <circle cx="37" cy="85" r="1" fill="#854D0E" />
    </svg>
  );
}

// 2. BUZZ LIGHTYEAR AUTHENTIC VECTOR FIGURE
export function BuzzFigure({ className = "w-12 h-12", size = 48 }: { className?: string; size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ filter: "drop-shadow(0 4px 6px rgba(34,197,94,0.35))" }}
    >
      {/* Space Wings Extended Behind */}
      <polygon points="12,58 2,52 6,42 22,48" fill="#9333EA" stroke="#22C55E" strokeWidth="1.5" />
      <polygon points="88,58 98,52 94,42 78,48" fill="#9333EA" stroke="#22C55E" strokeWidth="1.5" />
      <rect x="2" y="44" width="4" height="6" fill="#EF4444" />
      <rect x="94" y="44" width="4" height="6" fill="#22C55E" />

      {/* Clear Helmet Dome */}
      <circle cx="50" cy="38" r="28" fill="#BAE6FD" fillOpacity="0.4" stroke="#7DD3FC" strokeWidth="2" />
      <ellipse cx="42" cy="26" rx="8" ry="4" fill="#FFFFFF" fillOpacity="0.7" transform="rotate(-30 42 26)" />

      {/* Purple Head Cowl */}
      <path
        d="M34 36 C34 26, 66 26, 66 36 C66 48, 62 52, 50 52 C38 52, 34 48, 34 36 Z"
        fill="#9333EA"
      />

      {/* Face */}
      <path
        d="M37 36 C37 30, 63 30, 63 36 C63 46, 60 50, 50 50 C40 50, 37 46, 37 36 Z"
        fill="#FDE68A"
      />

      {/* Buzz Eyes */}
      <circle cx="44" cy="36" r="3" fill="#FFFFFF" />
      <circle cx="44" cy="36" r="1.8" fill="#3B82F6" />
      <circle cx="56" cy="36" r="3" fill="#FFFFFF" />
      <circle cx="56" cy="36" r="1.8" fill="#3B82F6" />

      {/* Characteristic Buzz Chin Swirl */}
      <path d="M48 44 Q50 46 52 44 Q51 47 49 46" stroke="#9333EA" strokeWidth="1.5" strokeLinecap="round" fill="none" />
      <path d="M45 42 Q50 45 55 42" stroke="#B45309" strokeWidth="1.2" strokeLinecap="round" fill="none" />

      {/* Torso Armor - White & Lime Green Collar */}
      <path d="M26 56 C26 52, 74 52, 74 56 L78 94 C78 97, 22 97, 22 94 Z" fill="#F8FAFC" stroke="#CBD5E1" strokeWidth="1.5" />
      <path d="M28 54 C36 50, 64 50, 72 54 L74 68 C62 64, 38 64, 26 68 Z" fill="#22C55E" />

      {/* Red Laser Button on Right Arm */}
      <circle cx="28" cy="62" r="3.5" fill="#EF4444" stroke="#B91C1C" strokeWidth="1" />

      {/* 3 Chest Buttons: Red, Green, Blue */}
      <ellipse cx="62" cy="60" rx="3" ry="2" fill="#3B82F6" stroke="#1D4ED8" strokeWidth="0.8" />
      <ellipse cx="68" cy="61" rx="3" ry="2" fill="#22C55E" stroke="#15803D" strokeWidth="0.8" />
      <ellipse cx="72" cy="63" rx="3" ry="2" fill="#EF4444" stroke="#B91C1C" strokeWidth="0.8" />

      {/* Star Command Chest Logo */}
      <path d="M44 68 L56 68 L52 74 L48 74 Z" fill="#1E293B" />
      <polygon points="50,69 51,71 53,71 51.5,72.5 52,74.5 50,73.5 48,74.5 48.5,72.5 47,71 49,71" fill="#FACC15" />
      {/* Lightyear label line */}
      <rect x="42" y="76" width="16" height="4" rx="1.5" fill="#3B82F6" />

      {/* Waist belt with black and purple bands */}
      <rect x="25" y="86" width="50" height="6" fill="#1E293B" />
      <rect x="44" y="85" width="12" height="8" rx="2" fill="#9333EA" stroke="#6B21A8" strokeWidth="1" />
    </svg>
  );
}

// 3. PIZZA PLANET 3-EYED ALIEN VECTOR FIGURE
export function AlienFigure({ className = "w-12 h-12", size = 48 }: { className?: string; size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ filter: "drop-shadow(0 4px 6px rgba(132,204,22,0.4))" }}
    >
      {/* Antenna with tip */}
      <path d="M50 28 L50 14" stroke="#84CC16" strokeWidth="4" strokeLinecap="round" />
      <circle cx="50" cy="11" r="5.5" fill="#84CC16" stroke="#4D7C0F" strokeWidth="1" />

      {/* Pointy Alien Ears */}
      <polygon points="12,38 32,32 30,46" fill="#84CC16" stroke="#4D7C0F" strokeWidth="1" />
      <polygon points="88,38 68,32 70,46" fill="#84CC16" stroke="#4D7C0F" strokeWidth="1" />

      {/* Lime Green Head */}
      <ellipse cx="50" cy="40" rx="32" ry="20" fill="#84CC16" stroke="#4D7C0F" strokeWidth="1.5" />

      {/* THREE EYES */}
      {/* Left Eye */}
      <ellipse cx="36" cy="38" rx="6.5" ry="7.5" fill="#FFFFFF" stroke="#000000" strokeWidth="1" />
      <circle cx="36" cy="38" r="3.2" fill="#0F172A" />
      <circle cx="38" cy="36" r="1.2" fill="#FFFFFF" />

      {/* Middle Eye */}
      <ellipse cx="50" cy="34" rx="7" ry="8" fill="#FFFFFF" stroke="#000000" strokeWidth="1" />
      <circle cx="50" cy="34" r="3.5" fill="#0F172A" />
      <circle cx="52" cy="32" r="1.3" fill="#FFFFFF" />

      {/* Right Eye */}
      <ellipse cx="64" cy="38" rx="6.5" ry="7.5" fill="#FFFFFF" stroke="#000000" strokeWidth="1" />
      <circle cx="64" cy="38" r="3.2" fill="#0F172A" />
      <circle cx="66" cy="36" r="1.2" fill="#FFFFFF" />

      {/* Cute Alien Open Smile */}
      <path d="M42 48 Q50 55 58 48" stroke="#15803D" strokeWidth="2.5" strokeLinecap="round" fill="#14532D" />

      {/* Blue Space Jumpsuit & Purple Collar */}
      <path d="M26 62 C26 56, 74 56, 74 62 L78 96 L22 96 Z" fill="#2563EB" />
      <ellipse cx="50" cy="62" rx="24" ry="7" fill="#9333EA" stroke="#6B21A8" strokeWidth="1.5" />

      {/* Pizza Planet Planet Badge */}
      <ellipse cx="38" cy="74" rx="6" ry="4" fill="#EA580C" />
      <ellipse cx="38" cy="74" rx="9" ry="2.5" stroke="#FDE047" strokeWidth="1.2" fill="none" transform="rotate(-15 38 74)" />
      <circle cx="38" cy="74" r="1.5" fill="#FFFFFF" />

      {/* Green 3-Fingered Hands */}
      <circle cx="20" cy="76" r="5" fill="#84CC16" />
      <circle cx="80" cy="76" r="5" fill="#84CC16" />
    </svg>
  );
}

// 4. SLINKY DOG AUTHENTIC VECTOR FIGURE
export function SlinkyFigure({ className = "w-12 h-12", size = 48 }: { className?: string; size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ filter: "drop-shadow(0 4px 6px rgba(217,119,6,0.35))" }}
    >
      {/* Front Dog Face */}
      <path
        d="M20 38 C20 28, 48 28, 48 38 C48 54, 40 64, 30 64 C20 64, 20 50, 20 38 Z"
        fill="#F59E0B"
      />
      {/* Dark Floppy Ear */}
      <ellipse cx="18" cy="44" rx="8" ry="16" fill="#78350F" transform="rotate(-15 18 44)" />

      {/* Snout & Nose */}
      <ellipse cx="38" cy="48" rx="10" ry="7" fill="#FDE68A" />
      <circle cx="44" cy="46" r="3.2" fill="#0F172A" />
      <path d="M40 52 Q44 55 42 58" stroke="#DC2626" strokeWidth="2.5" strokeLinecap="round" />

      {/* Eye */}
      <circle cx="32" cy="38" r="3.5" fill="#FFFFFF" />
      <circle cx="34" cy="38" r="2" fill="#451A03" />

      {/* Green Collar */}
      <rect x="22" y="60" width="16" height="5" rx="2" fill="#22C55E" />

      {/* Slinky Spring Coils Body */}
      <g stroke="#CA8A04" strokeWidth="3.5" fill="none">
        <ellipse cx="44" cy="62" rx="4" ry="14" />
        <ellipse cx="52" cy="62" rx="4" ry="14" />
        <ellipse cx="60" cy="62" rx="4" ry="14" />
        <ellipse cx="68" cy="62" rx="4" ry="14" />
      </g>

      {/* Back Quarter & Hind Leg */}
      <ellipse cx="76" cy="62" rx="10" ry="12" fill="#F59E0B" />
      <rect x="72" y="70" width="6" height="14" rx="3" fill="#B45309" />
      <rect x="26" y="68" width="6" height="16" rx="3" fill="#B45309" />

      {/* Spring Tail with Ball Tip */}
      <path d="M84 56 Q92 46 88 38" stroke="#D97706" strokeWidth="2.5" fill="none" />
      <circle cx="88" cy="38" r="3" fill="#78350F" />
    </svg>
  );
}

// 5. GREEN ARMY MAN AUTHENTIC PLASTIC MOLDED TOY FIGURE
export function ArmyManFigure({ className = "w-12 h-12", size = 48 }: { className?: string; size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ filter: "drop-shadow(0 4px 6px rgba(22,101,52,0.45))" }}
    >
      {/* Plastic Base Stand */}
      <ellipse cx="50" cy="92" rx="34" ry="7" fill="#15803D" stroke="#166534" strokeWidth="2" />
      <ellipse cx="48" cy="91" rx="28" ry="4" fill="#22C55E" opacity="0.4" />

      {/* Helmet */}
      <path d="M32 28 C32 14, 68 14, 68 28 L72 32 L28 32 Z" fill="#16A34A" />
      <ellipse cx="50" cy="32" rx="22" ry="4" fill="#15803D" />

      {/* Head */}
      <circle cx="50" cy="38" r="10" fill="#16A34A" />

      {/* Torso with Military Harness */}
      <path d="M36 48 L64 48 L68 76 L32 76 Z" fill="#15803D" />
      <path d="M42 48 L46 76 M58 48 L54 76" stroke="#166534" strokeWidth="2" />

      {/* Binoculars held up */}
      <rect x="42" y="34" width="16" height="8" rx="2" fill="#14532D" />
      <circle cx="45" cy="38" r="3.5" fill="#22C55E" opacity="0.8" />
      <circle cx="55" cy="38" r="3.5" fill="#22C55E" opacity="0.8" />

      {/* Arms Holding Binoculars */}
      <path d="M36 50 L42 40 M64 50 L58 40" stroke="#16A34A" strokeWidth="6" strokeLinecap="round" />

      {/* Legs Connected to Molded Base */}
      <rect x="38" y="74" width="10" height="18" fill="#15803D" />
      <rect x="52" y="74" width="10" height="18" fill="#15803D" />
      {/* Boots merging to base */}
      <polygon points="34,92 48,92 46,88 36,88" fill="#14532D" />
      <polygon points="52,88 64,88 66,92 50,92" fill="#14532D" />
    </svg>
  );
}

// 6. REX DINOSAUR AUTHENTIC VECTOR FIGURE
export function RexFigure({ className = "w-12 h-12", size = 48 }: { className?: string; size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ filter: "drop-shadow(0 4px 6px rgba(16,185,129,0.35))" }}
    >
      {/* Big Dino Tail */}
      <path d="M68 68 Q90 60 94 40 Q82 55 64 62" fill="#10B981" />

      {/* Round Body */}
      <ellipse cx="52" cy="66" rx="22" ry="20" fill="#10B981" />
      <ellipse cx="48" cy="68" rx="14" ry="14" fill="#6EE7B7" opacity="0.6" />

      {/* Dino Head & Snout */}
      <path
        d="M26 34 C26 22, 54 22, 58 32 C60 44, 46 50, 42 50 L34 50 C26 50, 26 42, 26 34 Z"
        fill="#10B981"
      />

      {/* Cartoon Eyes */}
      <circle cx="44" cy="30" r="4.5" fill="#FFFFFF" />
      <circle cx="44" cy="30" r="2.2" fill="#065F46" />
      <circle cx="45" cy="29" r="0.8" fill="#FFFFFF" />

      {/* Friendly White Teeth & Open Mouth */}
      <path d="M28 44 L44 44" stroke="#065F46" strokeWidth="2" />
      <polygon points="30,44 32,41 34,44" fill="#FFFFFF" />
      <polygon points="34,44 36,41 38,44" fill="#FFFFFF" />
      <polygon points="38,44 40,41 42,44" fill="#FFFFFF" />

      {/* Little Tiny Rex Arms */}
      <path d="M42 56 Q48 58 46 64" stroke="#047857" strokeWidth="4" strokeLinecap="round" fill="none" />
      <circle cx="46" cy="64" r="2" fill="#047857" />

      {/* Sturdy Dinosaur Feet */}
      <rect x="40" y="82" width="10" height="12" rx="3" fill="#047857" />
      <rect x="56" y="82" width="10" height="12" rx="3" fill="#047857" />
      <polygon points="38,94 52,94 50,90 40,90" fill="#065F46" />
      <polygon points="54,90 64,90 68,94 56,94" fill="#065F46" />
    </svg>
  );
}

// 7. HAMM PIGGY BANK WITH COIN SLOT
export function HammFigure({ className = "w-12 h-12", size = 48 }: { className?: string; size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ filter: "drop-shadow(0 4px 6px rgba(244,114,182,0.35))" }}
    >
      {/* Golden Coin Dropping In */}
      <ellipse cx="50" cy="18" rx="8" ry="4" fill="#FACC15" stroke="#CA8A04" strokeWidth="1.5" />
      <text x="48" y="20" fontSize="5" fontWeight="bold" fill="#854D0E" textAnchor="middle">$</text>

      {/* Coin Slot on Back */}
      <rect x="42" y="28" width="16" height="3" rx="1.5" fill="#4A044E" />

      {/* Curly Tail */}
      <path d="M78 52 Q88 44 86 54 Q84 60 90 58" stroke="#DB2777" strokeWidth="2.5" fill="none" strokeLinecap="round" />

      {/* Chubby Pink Piggy Body */}
      <ellipse cx="52" cy="56" rx="28" ry="24" fill="#F472B6" stroke="#DB2777" strokeWidth="1.5" />

      {/* Pig Ears */}
      <polygon points="26,36 34,26 38,38" fill="#EC4899" />
      <polygon points="44,34 50,22 56,34" fill="#EC4899" />

      {/* Eyes */}
      <circle cx="34" cy="48" r="2.8" fill="#1E1B4B" />
      <circle cx="35" cy="47" r="0.8" fill="#FFFFFF" />

      {/* Snout with Nostrils */}
      <ellipse cx="22" cy="56" rx="10" ry="8" fill="#FBCFE8" stroke="#DB2777" strokeWidth="1.2" />
      <circle cx="19" cy="56" r="2.2" fill="#831843" />
      <circle cx="25" cy="56" r="2.2" fill="#831843" />

      {/* Stumpy Legs */}
      <rect x="36" y="76" width="8" height="12" rx="3" fill="#DB2777" />
      <rect x="58" y="76" width="8" height="12" rx="3" fill="#DB2777" />
    </svg>
  );
}

// 8. RC TOY CAR FIGURE
export function RCFigure({ className = "w-12 h-12", size = 48 }: { className?: string; size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ filter: "drop-shadow(0 4px 6px rgba(34,197,94,0.4))" }}
    >
      {/* Radio Antenna with Red Ball */}
      <path d="M72 45 L84 16" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round" />
      <circle cx="85" cy="14" r="4" fill="#EF4444" />

      {/* Green Buggy Body */}
      <path
        d="M20 62 L32 46 L68 46 L82 62 Z"
        fill="#22C55E"
        stroke="#15803D"
        strokeWidth="2"
      />
      {/* Blue Roof & Spoiler */}
      <rect x="40" y="38" width="24" height="10" rx="3" fill="#3B82F6" />
      <polygon points="74,48 86,44 86,52 74,52" fill="#3B82F6" />

      {/* Front Eyes Headlights */}
      <circle cx="28" cy="54" r="5" fill="#FFFFFF" stroke="#000" strokeWidth="1" />
      <circle cx="27" cy="54" r="2.5" fill="#1E293B" />
      <circle cx="38" cy="54" r="5" fill="#FFFFFF" stroke="#000" strokeWidth="1" />
      <circle cx="39" cy="54" r="2.5" fill="#1E293B" />

      {/* Front Bumper with Hazard colors */}
      <rect x="14" y="60" width="10" height="6" rx="2" fill="#EF4444" />

      {/* Big Knobby RC Off-road Tires */}
      <ellipse cx="30" cy="74" rx="14" ry="14" fill="#1E293B" stroke="#0F172A" strokeWidth="3" />
      <circle cx="30" cy="74" r="6" fill="#FACC15" />

      <ellipse cx="72" cy="74" rx="14" ry="14" fill="#1E293B" stroke="#0F172A" strokeWidth="3" />
      <circle cx="72" cy="74" r="6" fill="#FACC15" />
    </svg>
  );
}

// 9. ICONIC PIXAR LUXO BALL
export function PixarBall({ className = "w-12 h-12", size = 48 }: { className?: string; size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ filter: "drop-shadow(0 6px 10px rgba(0,0,0,0.3))" }}
    >
      {/* Yellow Sphere */}
      <circle cx="50" cy="50" r="46" fill="#FACC15" />

      {/* Blue Equatorial Band */}
      <path
        d="M6 50 C16 34, 84 34, 94 50 C84 66, 16 66, 6 50 Z"
        fill="#2563EB"
      />

      {/* Red Star in Center */}
      <polygon
        points="50,32 55,43 67,43 57.5,50 61,61 50,54 39,61 42.5,50 33,43 45,43"
        fill="#DC2626"
      />

      {/* Spherical Reflection Highlight */}
      <ellipse cx="36" cy="28" rx="16" ry="8" fill="#FFFFFF" fillOpacity="0.45" transform="rotate(-30 36 28)" />
    </svg>
  );
}

// 10. FORKY HANDMADE CRAFT FIGURE
export function ForkyFigure({ className = "w-12 h-12", size = 48 }: { className?: string; size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ filter: "drop-shadow(0 4px 6px rgba(220,38,38,0.3))" }}
    >
      {/* Spork Body & 4 Prongs */}
      <path
        d="M36 10 L40 22 L46 10 L50 22 L54 10 L58 22 L64 10 L66 32 C66 44, 56 50, 52 56 L48 56 C44 50, 34 44, 34 32 Z"
        fill="#FFFFFF"
        stroke="#E2E8F0"
        strokeWidth="1.5"
      />
      <rect x="47" y="54" width="6" height="26" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="1" />

      {/* Red Pipe Cleaner Arms */}
      <path
        d="M20 54 Q32 46 48 58 Q66 46 80 54"
        stroke="#DC2626"
        strokeWidth="5"
        strokeLinecap="round"
        fill="none"
      />
      {/* Pipe Cleaner 3-pronged Hands */}
      <circle cx="18" cy="54" r="3" fill="#DC2626" />
      <circle cx="82" cy="54" r="3" fill="#DC2626" />

      {/* Two Mis-matched Googly Eyes */}
      <circle cx="43" cy="30" r="6.5" fill="#FFFFFF" stroke="#000000" strokeWidth="1" />
      <circle cx="43" cy="30" r="3" fill="#000000" />
      <circle cx="56" cy="32" r="4.5" fill="#FFFFFF" stroke="#000000" strokeWidth="1" />
      <circle cx="56" cy="32" r="2" fill="#000000" />

      {/* Red Wax Eyebrow */}
      <path d="M38 22 Q48 18 58 24" stroke="#DC2626" strokeWidth="2.5" strokeLinecap="round" fill="none" />

      {/* Blue Clay Squiggle Smile */}
      <path d="M42 40 Q49 46 56 40" stroke="#2563EB" strokeWidth="3" strokeLinecap="round" fill="none" />

      {/* White Clay Base & Popsicle Sticks Feet */}
      <ellipse cx="50" cy="84" rx="14" ry="7" fill="#F8FAFC" stroke="#E2E8F0" strokeWidth="1.5" />
      {/* Popsicle Stick with Rainbow */}
      <rect x="28" y="86" width="44" height="6" rx="3" fill="#FDE68A" stroke="#CA8A04" strokeWidth="1" />
      <path d="M34 88 Q40 85 46 88" stroke="#EF4444" strokeWidth="1.5" fill="none" />
      <path d="M34 90 Q40 87 46 90" stroke="#3B82F6" strokeWidth="1.5" fill="none" />
    </svg>
  );
}

// 11. WHEEZY PENGUIN JUKEBOX FIGURE
export function WheezyFigure({ className = "w-12 h-12", size = 48 }: { className?: string; size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ filter: "drop-shadow(0 4px 6px rgba(0,0,0,0.3))" }}
    >
      {/* Chubby Penguin Body */}
      <ellipse cx="50" cy="56" rx="26" ry="30" fill="#0F172A" />
      {/* White Belly */}
      <ellipse cx="50" cy="62" rx="18" ry="22" fill="#FFFFFF" />

      {/* Wings / Flippers */}
      <ellipse cx="22" cy="56" rx="6" ry="16" fill="#0F172A" transform="rotate(20 22 56)" />
      <ellipse cx="78" cy="56" rx="6" ry="16" fill="#0F172A" transform="rotate(-20 78 56)" />

      {/* Head */}
      <circle cx="50" cy="32" r="16" fill="#0F172A" />

      {/* Eyes */}
      <circle cx="44" cy="30" r="3.5" fill="#FFFFFF" />
      <circle cx="44" cy="30" r="1.8" fill="#000000" />
      <circle cx="56" cy="30" r="3.5" fill="#FFFFFF" />
      <circle cx="56" cy="30" r="1.8" fill="#000000" />

      {/* Orange Beak */}
      <polygon points="46,36 54,36 50,42" fill="#F97316" />

      {/* Bright Red Bowtie */}
      <polygon points="44,45 50,47 44,49" fill="#DC2626" />
      <polygon points="56,45 50,47 56,49" fill="#DC2626" />
      <circle cx="50" cy="47" r="2" fill="#991B1B" />

      {/* Orange Feet */}
      <ellipse cx="40" cy="88" rx="8" ry="4" fill="#F97316" />
      <ellipse cx="60" cy="88" rx="8" ry="4" fill="#F97316" />
    </svg>
  );
}

// 12. GREEN ARMY PARATROOPER DESCENDING FIGURE
export function ParatrooperFigure({ className = "w-14 h-20", size = 64 }: { className?: string; size?: number }) {
  return (
    <svg
      width={size}
      height={size * 1.3}
      viewBox="0 0 100 130"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ filter: "drop-shadow(0 6px 12px rgba(21,128,61,0.4))" }}
    >
      {/* Green Parachute Dome */}
      <path
        d="M10 40 C10 10, 90 10, 90 40 C75 36, 60 38, 50 40 C40 38, 25 36, 10 40 Z"
        fill="#16A34A"
        stroke="#15803D"
        strokeWidth="2"
      />
      {/* Parachute Segments */}
      <path d="M50 10 L50 40 M30 18 L28 38 M70 18 L72 38" stroke="#22C55E" strokeWidth="1.5" opacity="0.6" />

      {/* Suspension Cords */}
      <path d="M14 39 L46 80 M32 39 L48 80 M68 39 L52 80 M86 39 L54 80" stroke="#86EFAC" strokeWidth="1" />

      {/* Little Hanging Green Soldier */}
      <circle cx="50" cy="82" r="5" fill="#15803D" />
      <path d="M42 87 L58 87 L55 106 L45 106 Z" fill="#166534" />
      {/* Arms holding cords */}
      <path d="M44 90 L46 80 M56 90 L54 80" stroke="#15803D" strokeWidth="3" strokeLinecap="round" />
      {/* Legs */}
      <rect x="44" y="106" width="4" height="12" rx="1.5" fill="#14532D" />
      <rect x="52" y="106" width="4" height="12" rx="1.5" fill="#14532D" />
      {/* Plastic base */}
      <ellipse cx="50" cy="120" rx="12" ry="3" fill="#15803D" />
    </svg>
  );
}

