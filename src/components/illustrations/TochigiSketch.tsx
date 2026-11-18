import { useId } from "react";

/**
 * Hand-drawn watercolour sketch of Nikko: Shinkyo bridge (神橋) over the river,
 * autumn maples and mountains, with pencil annotations — the trip the learner
 * is working towards. Colours come from CSS variables so it follows dark mode.
 */
export function TochigiSketch({ className, annotate = true, caption }: { className?: string; annotate?: boolean; caption?: string }) {
  const id = useId().replace(/:/g, "");
  const wash = `wash-${id}`;
  const pencil = `pencil-${id}`;
  // paper-coloured halo keeps handwriting readable over the pencil lines
  const hand = {
    fontFamily: "var(--font-hand)",
    fill: "var(--sakura-deep)",
    stroke: "var(--surface)",
    strokeWidth: 5,
    paintOrder: "stroke",
    strokeLinejoin: "round",
  } as const;
  const line = { stroke: "var(--sketch)", fill: "none", strokeLinecap: "round", strokeLinejoin: "round" } as const;

  return (
    <svg viewBox="0 0 480 300" className={className} role="img" aria-label="ภาพวาดสีน้ำ: สะพานชินเคียวที่นิกโก้ ช่วงใบไม้แดง">
      <defs>
        {/* watercolour: wobbly edges + soft bleed */}
        <filter id={wash} x="-10%" y="-10%" width="120%" height="120%">
          <feTurbulence type="fractalNoise" baseFrequency="0.035" numOctaves="2" seed="4" result="t" />
          <feDisplacementMap in="SourceGraphic" in2="t" scale="9" />
          <feGaussianBlur stdDeviation="0.8" />
        </filter>
        {/* pencil: slightly shaky lines */}
        <filter id={pencil}>
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="1" seed="2" result="n" />
          <feDisplacementMap in="SourceGraphic" in2="n" scale="1.6" />
        </filter>
      </defs>

      {/* ---------- watercolour washes ---------- */}
      <g filter={`url(#${wash})`}>
        <ellipse cx="250" cy="80" rx="215" ry="62" fill="var(--wash-sky)" opacity="0.55" />
        <path d="M20 170 L95 92 L150 132 L215 70 L300 150 L360 98 L462 172 Z" fill="var(--matcha)" opacity="0.55" />
        <path d="M60 175 L130 128 L190 165 L250 120 L330 172 Z" fill="var(--matcha)" opacity="0.4" />
        {/* river */}
        <path d="M10 218 C120 206 220 230 320 214 C380 205 430 212 470 220 L470 252 C380 246 300 262 200 252 C120 246 60 256 10 250 Z" fill="var(--wash-sky)" opacity="0.8" />
        {/* maple clusters */}
        <circle cx="70" cy="178" r="30" fill="var(--wash-maple)" opacity="0.75" />
        <circle cx="96" cy="190" r="22" fill="var(--wash-gold)" opacity="0.75" />
        <circle cx="44" cy="196" r="20" fill="var(--wash-maple)" opacity="0.6" />
        <circle cx="408" cy="176" r="32" fill="var(--wash-maple)" opacity="0.75" />
        <circle cx="440" cy="194" r="21" fill="var(--wash-gold)" opacity="0.8" />
        <circle cx="378" cy="196" r="18" fill="var(--wash-gold)" opacity="0.6" />
        {/* bridge (vermilion lacquer) */}
        <path d="M150 196 Q240 150 330 196 L330 206 Q240 162 150 206 Z" fill="#cf4a32" opacity="0.88" />
        {/* stone piers */}
        <rect x="186" y="200" width="16" height="30" fill="var(--sketch-soft)" opacity="0.9" />
        <rect x="278" y="200" width="16" height="30" fill="var(--sketch-soft)" opacity="0.9" />
      </g>

      {/* ---------- pencil linework ---------- */}
      <g filter={`url(#${pencil})`} strokeWidth="1.4">
        <path {...line} d="M20 170 L95 92 L150 132 L215 70 L300 150 L360 98 L462 172" opacity="0.7" />
        <path {...line} d="M150 196 Q240 150 330 196" strokeWidth="1.8" />
        <path {...line} d="M150 206 Q240 162 330 206" />
        {/* railing posts */}
        {[165, 185, 205, 225, 245, 265, 285, 305, 320].map((x) => {
          const t = (x - 150) / 180;
          // point on the deck curve Q(150,196)-(240,150)-(330,196)
          const y = 196 - 92 * t * (1 - t);
          return <path key={x} {...line} d={`M${x} ${y} l0 -9`} />;
        })}
        <path {...line} d="M150 187 Q240 141 330 187" />
        <path {...line} d="M186 200 v30 M202 200 v30 M278 200 v30 M294 200 v30" opacity="0.8" />
        {/* tree trunks */}
        <path {...line} d="M72 205 v24 M410 205 v24" strokeWidth="2" />
        {/* water ripples */}
        <path {...line} d="M40 232 q12 -4 24 0 M110 240 q12 -4 24 0 M350 236 q12 -4 24 0 M410 230 q10 -3 20 0" opacity="0.6" />
        {/* ground line */}
        <path {...line} d="M10 214 C120 204 220 226 320 212 C380 204 430 210 470 216" opacity="0.6" />
      </g>

      {/* sakura petals for cuteness */}
      {[
        [118, 60, 12],
        [342, 46, -18],
        [430, 92, 30],
      ].map(([x, y, r]) => (
        <path key={`${x}`} d="M0 -6 C5 -6 6 0 0 6 C-6 0 -5 -6 0 -6 Z" transform={`translate(${x} ${y}) rotate(${r})`} fill="var(--sakura)" opacity="0.9" />
      ))}

      {annotate && (
        <g fontSize="15">
          {/* bridge note — label in the sky, arrow down to the arch */}
          <path {...line} d="M250 44 C262 80 258 118 246 146" strokeWidth="1.2" />
          <path {...line} d="M240 139 l6 8 l4 -9" strokeWidth="1.2" />
          <text x="214" y="36" style={hand}>
            神橋 ชินเคียว
          </text>
          {/* maple note */}
          <path {...line} d="M66 62 C52 96 54 126 64 148" strokeWidth="1.2" />
          <path {...line} d="M58 142 l6 7 l3 -9" strokeWidth="1.2" />
          <text x="24" y="54" style={hand}>
            紅葉 ใบไม้แดง
          </text>
          {/* mountain note */}
          <text x="380" y="44" style={hand}>
            日光 นิกโก้
          </text>
          <path {...line} d="M392 50 C380 62 370 76 362 96" strokeWidth="1.2" />
        </g>
      )}

      {/* dimension line, like a scale bar on a drawing */}
      <g {...line} strokeWidth="1.2" opacity="0.85">
        <path d="M60 278 H420 M60 272 v12 M420 272 v12" />
      </g>
      <text x="240" y="272" textAnchor="middle" fontSize="13" style={{ fontFamily: "var(--font-hand)", fill: "var(--ink-soft)" }}>
        {caption ?? "ปลาย ต.ค. 2027 · ทริปโทจิงิ 5 วัน 4 คืน"}
      </text>
    </svg>
  );
}
