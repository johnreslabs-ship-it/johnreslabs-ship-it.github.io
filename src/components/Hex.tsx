type HexProps = {
  size?: number;
  className?: string;
  strokeOpacity?: number;
};

/** A single outlined hexagon, used as a decorative motif throughout the site. */
export default function Hex({ size = 80, className = "", strokeOpacity = 0.5 }: HexProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      className={className}
      aria-hidden="true"
    >
      <polygon
        points="50,3 95,26 95,74 50,97 5,74 5,26"
        fill="none"
        stroke="var(--color-cyan)"
        strokeOpacity={strokeOpacity}
        strokeWidth={2}
      />
    </svg>
  );
}
