type WaveDividerProps = {
  className?: string;
};

export function WaveDivider({ className = '' }: WaveDividerProps) {
  return (
    <div className={`relative h-[56px] w-full overflow-hidden ${className}`} aria-hidden="true">
      <span className="absolute inset-x-0 bottom-5 h-px bg-border" />
      <svg
        className="absolute inset-0 h-full w-full overflow-visible"
        viewBox="0 0 920 72"
        preserveAspectRatio="none"
        focusable="false"
      >
        <path
          d="M106 42 C166 42 194 36 250 36 C309 36 332 46 390 46 C449 46 472 39 529 39 C588 39 613 48 671 48 C730 48 755 42 812 42 C857 42 892 45 920 45"
          fill="none"
          stroke="hsl(var(--border))"
          strokeLinecap="round"
          strokeWidth="0.9"
          vectorEffect="non-scaling-stroke"
        />
        <path
          d="M105 42 C139 42 157 35 184 35 C213 35 225 46 253 46 C283 46 298 39 327 39 C358 39 370 48 400 48 C432 48 446 42 476 42 C507 42 519 50 550 50 C582 50 596 44 627 44 C659 44 673 51 705 51 C737 51 750 46 782 46 C814 46 828 50 859 50 C885 50 904 47 920 47"
          fill="none"
          stroke="hsl(var(--primary) / 0.58)"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.1"
          vectorEffect="non-scaling-stroke"
        />
        <g transform="translate(5 4)">
          <path
            d="M3 45 C16 41 48 41 68 45 C54 50 18 52 3 45 Z"
            fill="hsl(var(--foreground) / 0.08)"
            stroke="hsl(var(--foreground) / 0.72)"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.15"
            vectorEffect="non-scaling-stroke"
          />
          <path d="M8 45 C20 47 51 47 65 45" fill="none" stroke="hsl(var(--foreground) / 0.72)" strokeLinecap="round" strokeWidth="1.05" vectorEffect="non-scaling-stroke" />
          <ellipse cx="36" cy="42.5" rx="10.5" ry="2.35" fill="none" stroke="hsl(var(--primary) / 0.58)" strokeWidth="1" vectorEffect="non-scaling-stroke" />
          <path d="M34 10.5 C36 8.8 39 9.5 40 11.5 L42 13.2 L39.5 15.8 C37.5 17.2 34.5 16.2 33.5 14.1 C33 12.8 33.2 11.4 34 10.5 Z" fill="hsl(var(--foreground))" />
          <path
            d="M33 17 C36 16 39 18 40 21 L40 28 C40 31 43 34 47 37 L41 40 L35 35 L30 40 L25 37 C29 33 30 30 30 26 L30 20 C30.5 18.5 31.5 17.5 33 17 Z"
            fill="hsl(var(--foreground) / 0.86)"
          />
          <path
            d="M35 21 C38 22 41 24 44 27 L47 31 L44 33 L40 29 L35 26 Z M37 23 C40 25 43 27 46 30 L44 32 L39 28 L35 26 Z"
            fill="hsl(var(--foreground) / 0.86)"
          />
          <path d="M22 4 L46 34 L57 52" fill="none" stroke="hsl(var(--primary) / 0.72)" strokeLinecap="round" strokeWidth="1.25" vectorEffect="non-scaling-stroke" />
          <path d="M22 4 L17 1 L19 8 L24 7 Z M57 52 L63 57 L61 49 L56 50 Z" fill="hsl(var(--primary) / 0.72)" />
          <path d="M53 55 C57 53 61 53 65 55" fill="none" stroke="hsl(var(--accent) / 0.7)" strokeLinecap="round" strokeWidth="0.9" vectorEffect="non-scaling-stroke" />
        </g>
      </svg>
    </div>
  );
}
