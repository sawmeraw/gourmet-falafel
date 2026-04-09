// Inline SVG decorations: falafel ball, mint leaf, sesame seed, steam.
// All accept className/style for free positioning + animation.

interface SvgProps {
  className?: string;
  style?: React.CSSProperties;
  size?: number;
}

export function FalafelBall({ className = "", style, size = 48 }: SvgProps) {
  return (
    <svg
      className={className}
      style={style}
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      aria-hidden
    >
      <defs>
        <radialGradient id="fb-grad" cx="35%" cy="30%" r="75%">
          <stop offset="0%" stopColor="#a8c97a" />
          <stop offset="55%" stopColor="#6e8f3a" />
          <stop offset="100%" stopColor="#3f5a16" />
        </radialGradient>
      </defs>
      <circle cx="32" cy="32" r="28" fill="url(#fb-grad)" />
      {/* speckles / herbs */}
      <circle cx="22" cy="24" r="1.6" fill="#cfe39a" />
      <circle cx="38" cy="20" r="1.2" fill="#cfe39a" />
      <circle cx="44" cy="34" r="1.5" fill="#2c3f0d" />
      <circle cx="28" cy="40" r="1.3" fill="#2c3f0d" />
      <circle cx="18" cy="36" r="1" fill="#cfe39a" />
      <circle cx="34" cy="46" r="1.1" fill="#2c3f0d" />
      <circle cx="46" cy="46" r="0.9" fill="#cfe39a" />
      {/* highlight */}
      <ellipse cx="22" cy="20" rx="6" ry="3" fill="#ffffff" opacity="0.18" />
    </svg>
  );
}

export function MintLeaf({ className = "", style, size = 40 }: SvgProps) {
  return (
    <svg
      className={className}
      style={style}
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      aria-hidden
    >
      <defs>
        <linearGradient id="mint-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#6dd47e" />
          <stop offset="100%" stopColor="#1e7a3a" />
        </linearGradient>
      </defs>
      <path
        d="M32 6 C50 12, 56 28, 48 46 C40 60, 22 60, 14 46 C6 28, 14 12, 32 6 Z"
        fill="url(#mint-grad)"
      />
      {/* central vein */}
      <path d="M32 8 L32 58" stroke="#0e4c22" strokeWidth="1.4" strokeLinecap="round" opacity="0.6" />
      {/* side veins */}
      <path d="M32 18 L18 24 M32 28 L14 36 M32 38 L18 46 M32 18 L46 24 M32 28 L50 36 M32 38 L46 46"
            stroke="#0e4c22" strokeWidth="1" strokeLinecap="round" opacity="0.45" />
    </svg>
  );
}

export function SesameSeed({ className = "", style, size = 10 }: SvgProps) {
  return (
    <svg
      className={className}
      style={style}
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden
    >
      <ellipse cx="8" cy="8" rx="3" ry="6" fill="#f1d796" />
      <ellipse cx="7" cy="6" rx="0.8" ry="1.6" fill="#fff" opacity="0.6" />
    </svg>
  );
}

export function Steam({ className = "", style, size = 60 }: SvgProps) {
  return (
    <svg
      className={className}
      style={style}
      width={size}
      height={size * 1.6}
      viewBox="0 0 60 96"
      fill="none"
      aria-hidden
    >
      <style>{`
        @keyframes steam-rise-1 { 0% { transform: translateY(20px); opacity: 0; } 30% { opacity: 0.6; } 100% { transform: translateY(-20px); opacity: 0; } }
        @keyframes steam-rise-2 { 0% { transform: translateY(20px); opacity: 0; } 40% { opacity: 0.5; } 100% { transform: translateY(-25px); opacity: 0; } }
        @keyframes steam-rise-3 { 0% { transform: translateY(20px); opacity: 0; } 35% { opacity: 0.55; } 100% { transform: translateY(-22px); opacity: 0; } }
        .steam-1 { animation: steam-rise-1 3.2s ease-out infinite; transform-origin: center; }
        .steam-2 { animation: steam-rise-2 3.6s ease-out infinite 0.6s; }
        .steam-3 { animation: steam-rise-3 3.4s ease-out infinite 1.2s; }
      `}</style>
      <path className="steam-1" d="M14 70 C8 58, 22 52, 18 40 C16 30, 26 24, 22 12" stroke="white" strokeWidth="4" strokeLinecap="round" fill="none" opacity="0.7" />
      <path className="steam-2" d="M30 72 C24 60, 38 54, 34 42 C32 32, 42 26, 38 14" stroke="white" strokeWidth="4" strokeLinecap="round" fill="none" opacity="0.7" />
      <path className="steam-3" d="M46 70 C40 58, 54 52, 50 40 C48 30, 58 24, 54 12" stroke="white" strokeWidth="4" strokeLinecap="round" fill="none" opacity="0.7" />
    </svg>
  );
}
