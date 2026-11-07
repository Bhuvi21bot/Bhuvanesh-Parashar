// Original abstract illustrations per project — no stock photos, no real
// screenshots (none were provided), just on-brand visual identity per app.

function Defs({ id }) {
  return (
    <defs>
      <linearGradient id={id} x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#89AACC" />
        <stop offset="100%" stopColor="#4E85BF" />
      </linearGradient>
    </defs>
  )
}

export function BusMateThumb() {
  return (
    <svg viewBox="0 0 400 300" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
      <Defs id="bm" />
      <rect width="400" height="300" fill="#0c0c0c" />
      <path d="M20 230 C 100 230, 120 120, 200 120 S 320 60, 380 60" stroke="url(#bm)" strokeWidth="2" strokeDasharray="6 8" fill="none" opacity="0.6" />
      <circle cx="20" cy="230" r="5" fill="#89AACC" />
      <circle cx="200" cy="120" r="5" fill="#89AACC" />
      <circle cx="380" cy="60" r="6" fill="#4E85BF" />
      <g transform="translate(150 165)">
        <rect x="0" y="0" width="86" height="40" rx="10" fill="url(#bm)" opacity="0.9" />
        <rect x="10" y="8" width="20" height="14" rx="2" fill="#0c0c0c" opacity="0.5" />
        <rect x="36" y="8" width="20" height="14" rx="2" fill="#0c0c0c" opacity="0.5" />
        <circle cx="18" cy="42" r="7" fill="#0c0c0c" />
        <circle cx="68" cy="42" r="7" fill="#0c0c0c" />
        <circle cx="18" cy="42" r="3" fill="#89AACC" />
        <circle cx="68" cy="42" r="3" fill="#89AACC" />
      </g>
      <circle cx="380" cy="60" r="14" fill="none" stroke="#4E85BF" strokeWidth="1.5" opacity="0.5">
        <animate attributeName="r" values="10;20;10" dur="2.4s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.6;0;0.6" dur="2.4s" repeatCount="indefinite" />
      </circle>
    </svg>
  )
}

export function CampusGridThumb() {
  const blocks = []
  for (let r = 0; r < 3; r++) {
    for (let c = 0; c < 5; c++) {
      blocks.push({ x: 40 + c * 64, y: 60 + r * 64, h: 30 + ((r + c) % 3) * 14 })
    }
  }
  return (
    <svg viewBox="0 0 400 300" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
      <Defs id="cg" />
      <rect width="400" height="300" fill="#0c0c0c" />
      {blocks.map((b, i) => (
        <rect
          key={i}
          x={b.x}
          y={b.y + (54 - b.h)}
          width="44"
          height={b.h}
          rx="4"
          fill={i % 6 === 0 ? 'url(#cg)' : '#89AACC'}
          opacity={i % 6 === 0 ? 0.95 : 0.12 + (i % 4) * 0.05}
        />
      ))}
      <line x1="0" y1="240" x2="400" y2="240" stroke="#89AACC" strokeOpacity="0.25" strokeWidth="1" />
    </svg>
  )
}

export function StudyOSThumb() {
  return (
    <svg viewBox="0 0 400 300" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
      <Defs id="so" />
      <rect width="400" height="300" fill="#0c0c0c" />
      <rect x="40" y="70" width="180" height="120" rx="14" fill="#111111" stroke="#89AACC" strokeOpacity="0.25" />
      <rect x="58" y="92" width="100" height="8" rx="4" fill="#89AACC" opacity="0.5" />
      <rect x="58" y="112" width="140" height="6" rx="3" fill="#A1A1AA" opacity="0.4" />
      <rect x="58" y="128" width="120" height="6" rx="3" fill="#A1A1AA" opacity="0.4" />
      <rect x="58" y="144" width="130" height="6" rx="3" fill="#A1A1AA" opacity="0.3" />
      <rect x="190" y="40" width="170" height="150" rx="16" fill="url(#so)" opacity="0.92" />
      <circle cx="275" cy="105" r="38" fill="none" stroke="#0c0c0c" strokeWidth="6" opacity="0.35" />
      <circle cx="275" cy="105" r="38" fill="none" stroke="#0c0c0c" strokeWidth="6" strokeDasharray="180 240" opacity="0.8" />
      <text x="275" y="112" textAnchor="middle" fontFamily="Space Mono, monospace" fontSize="20" fill="#0c0c0c">25:00</text>
    </svg>
  )
}

export function AyurvedaTraceThumb() {
  return (
    <svg viewBox="0 0 400 300" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
      <Defs id="at" />
      <rect width="400" height="300" fill="#0c0c0c" />
      <path
        d="M90 230 C 60 160, 70 90, 140 60 C 210 90, 220 160, 190 230 C 160 200, 120 200, 90 230 Z"
        fill="url(#at)"
        opacity="0.9"
      />
      <path d="M140 60 C 140 110, 140 180, 140 225" stroke="#0c0c0c" strokeWidth="2" opacity="0.4" />
      <path d="M140 100 C 120 110, 105 120, 95 135" stroke="#0c0c0c" strokeWidth="1.5" opacity="0.35" />
      <path d="M140 140 C 165 150, 178 162, 188 178" stroke="#0c0c0c" strokeWidth="1.5" opacity="0.35" />
      <g stroke="#89AACC" strokeDasharray="4 6" strokeWidth="1.5" opacity="0.7" fill="none">
        <path d="M210 150 L 280 150 L 280 90 L 330 90" />
      </g>
      <circle cx="210" cy="150" r="4" fill="#89AACC" />
      <circle cx="280" cy="90" r="4" fill="#89AACC" />
      <rect x="326" y="74" width="32" height="32" rx="4" fill="none" stroke="#4E85BF" strokeWidth="1.5" />
      <rect x="332" y="80" width="6" height="6" fill="#4E85BF" />
      <rect x="346" y="80" width="6" height="6" fill="#4E85BF" />
      <rect x="332" y="94" width="6" height="6" fill="#4E85BF" />
      <rect x="346" y="94" width="6" height="6" fill="#4E85BF" />
    </svg>
  )
}

const thumbnails = {
  busmate: BusMateThumb,
  campusgrid: CampusGridThumb,
  studyos: StudyOSThumb,
  ayurvedatrace: AyurvedaTraceThumb,
}

export default thumbnails
