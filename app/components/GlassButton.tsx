"use client";

import "./glass-button.css";

type Props = {
  children: React.ReactNode;
  onClick?: () => void;
  width?: number;
  height?: number;
  className?: string;
};

export function GlassButton({
  children,
  onClick,
  width = 236,
  height = 68,
  className = "",
}: Props) {
  return (
    <div className={`glass-btn-wrap ${className}`} style={{ width }}>
      <span className="glass-btn-shadow" aria-hidden />
      <button
        className="glass-btn"
        style={{ width, height }}
        onClick={onClick}
        type="button"
      >
        <span>{children}</span>
      </button>
    </div>
  );
}
