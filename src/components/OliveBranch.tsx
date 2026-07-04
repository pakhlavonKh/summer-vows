export function OliveBranch({
  className,
  style,
}: {
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <svg
      viewBox="0 0 200 80"
      className={className}
      style={style}
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
      strokeLinecap="round"
    >
      <path d="M10 40 C 60 30, 120 30, 190 40" />
      {[25, 50, 75, 100, 125, 150, 175].map((x, i) => (
        <g key={x} transform={`translate(${x} 40)`}>
          <ellipse
            cx="0"
            cy={i % 2 === 0 ? -10 : 10}
            rx="10"
            ry="3.5"
            transform={`rotate(${i % 2 === 0 ? -25 : 25})`}
            fill="currentColor"
            fillOpacity="0.35"
          />
        </g>
      ))}
    </svg>
  );
}

export function OliveLeaf({
  className,
  style,
}: {
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <svg viewBox="0 0 40 14" className={className} style={style} fill="currentColor">
      <ellipse cx="20" cy="7" rx="18" ry="4.5" />
      <path
        d="M2 7 L38 7"
        stroke="rgba(255,255,255,0.35)"
        strokeWidth="0.6"
        fill="none"
      />
    </svg>
  );
}
