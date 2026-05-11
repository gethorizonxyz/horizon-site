"use client";

import { ReactNode, useRef } from "react";

type Props = {
  children: ReactNode;
  className?: string;
  /** Max tilt in degrees on each axis. Default 2.5 — very subtle. */
  maxTilt?: number;
  style?: React.CSSProperties;
};

/**
 * Subtly tilts a card toward the cursor on mouse-move. No lift — only rotation.
 * The transform is JS-driven; CSS transition smooths every state change so the
 * card glides between resting and tilted, never jumps.
 */
export function TiltCard({ children, className = "", maxTilt = 2.5, style }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  const apply = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    const rotY = px * 2 * maxTilt;
    const rotX = -py * 2 * maxTilt;
    el.style.transform = `perspective(1100px) rotateX(${rotX}deg) rotateY(${rotY}deg)`;
  };

  const reset = () => {
    if (ref.current) ref.current.style.transform = "";
  };

  return (
    <div
      ref={ref}
      onMouseMove={apply}
      onMouseLeave={reset}
      style={style}
      className={`will-change-transform [transform-style:preserve-3d] [transition:transform_400ms_cubic-bezier(0.22,1,0.36,1)] ${className}`}
    >
      {children}
    </div>
  );
}
