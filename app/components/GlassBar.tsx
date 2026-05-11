"use client";

import "./glass-bar.css";

type Props = {
  children: React.ReactNode;
  className?: string;
  contentClassName?: string;
  /** Refraction strength 30–100, default 70 */
  scale?: number;
  /** Noise frequency 0.005–0.02, default 0.008 */
  baseFrequency?: number;
  /** Seeds the noise pattern; pass a unique number per instance */
  seed?: number;
};

export function GlassBar({
  children,
  className = "",
  contentClassName = "",
  scale = 70,
  baseFrequency = 0.008,
  seed = 92,
}: Props) {
  const filterId = `lg-dist-${seed}`;

  return (
    <div className={`glass-container ${className}`}>
      <div
        className="glass-filter"
        style={{
          backdropFilter: `url(#${filterId}) blur(4px) saturate(180%)`,
          WebkitBackdropFilter: `blur(20px) saturate(180%)`,
        }}
      />
      <div className="glass-overlay" />
      <div className="glass-specular" />

      <svg
        style={{ position: "absolute", width: 0, height: 0 }}
        aria-hidden="true"
      >
        <defs>
          <filter
            id={filterId}
            x="-50%"
            y="-50%"
            width="200%"
            height="200%"
            filterUnits="objectBoundingBox"
            primitiveUnits="userSpaceOnUse"
            colorInterpolationFilters="linearRGB"
          >
            <feTurbulence
              type="fractalNoise"
              baseFrequency={`${baseFrequency} ${baseFrequency}`}
              numOctaves={2}
              seed={seed}
              stitchTiles="stitch"
              result="noise"
            />
            <feGaussianBlur in="noise" stdDeviation={2} result="blurred" />
            <feDisplacementMap
              in="SourceGraphic"
              in2="blurred"
              scale={scale}
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        </defs>
      </svg>

      <div className={`glass-content ${contentClassName}`}>{children}</div>
    </div>
  );
}
