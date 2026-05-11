type Props = {
  className?: string;
};

/**
 * Horizon "h" mark — transparent background, white glyph only.
 * Drop your real PNG at `/public/horizon-logo.png` to swap it in Hero/Navbar.
 */
export function HorizonLogo({ className = "" }: Props) {
  return (
    <svg
      viewBox="0 0 200 200"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M30 44 L44 28 L72 28 L72 92 L170 92 L170 158 L156 172 L128 172 L128 122 L72 122 L72 172 L30 172 Z"
        fill="currentColor"
      />
    </svg>
  );
}
