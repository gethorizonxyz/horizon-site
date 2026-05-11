import { RotatingWord } from "./RotatingWord";
import { WaitlistForm } from "./WaitlistForm";

export default function Hero() {
  return (
    <section
      id="home"
      className="relative isolate z-10 flex min-h-screen flex-col items-center justify-center overflow-hidden rounded-bl-[2rem] rounded-br-[2rem] shadow-[0_24px_40px_-16px_rgba(15,23,42,0.18),0_8px_16px_-6px_rgba(15,23,42,0.08)] [backface-visibility:hidden] [transform:translateZ(0)] [will-change:transform]"
    >
      {/* Sky photo, slightly darkened (neutral, no color tint) for white-text readability */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-20"
        style={{
          backgroundImage:
            "linear-gradient(180deg, rgba(31,59,214,0.14) 0%, rgba(58,94,240,0.10) 100%), url('/sky.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundBlendMode: "multiply",
        }}
      />

      {/* Subtle bottom-edge fade so sections below transition smoothly */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-32 bg-gradient-to-b from-transparent to-white/20"
      />

      {/* Hero content */}
      <div className="relative z-10 mx-auto w-full max-w-5xl px-6 text-center">
        <h1 className="font-display bg-[linear-gradient(180deg,#ffffff_0%,#ffffff_45%,rgba(255,255,255,0.55)_100%)] bg-clip-text pb-3 text-5xl font-normal leading-[1.15] tracking-[-0.04em] text-transparent sm:text-7xl md:text-8xl">
          The first <RotatingWord />
          <br />
          finance OS
        </h1>

        <p className="mx-auto mt-4 max-w-2xl text-sm text-white/95 [text-shadow:0_2px_4px_rgba(15,23,42,0.35)] sm:text-xl">
          One business account with banking, payments, cards, and treasury. US
          ACH, EU IBAN, every major local rail, and stablecoins on every major
          chain. All self-custodial, all in one balance.
        </p>

        <WaitlistForm />
      </div>

      {/* Partner row */}
      <div className="absolute right-0 bottom-8 left-0 z-10 px-6 sm:bottom-24">
        <div className="mx-auto flex max-w-4xl flex-wrap items-center justify-center gap-x-10 gap-y-6 sm:gap-x-14">
          {[
            { name: "Visa", src: "/logos/visa.png", h: 22 },
            { name: "Mastercard", src: "/logos/mastercard.png", h: 30 },
            { name: "Bridge", src: "/logos/bridge.png", h: 22 },
            { name: "Privy", src: "/logos/privy.png", h: 22 },
            { name: "Rain", src: "/logos/rain.png", h: 22 },
          ].map(({ name, src, h }) => (
            <img
              key={name}
              src={src}
              alt={name}
              style={{ height: `${h}px` }}
              className="w-auto opacity-80 [filter:brightness(0)_invert(1)_drop-shadow(0_2px_4px_rgba(15,23,42,0.35))] transition-opacity hover:opacity-100"
            />
          ))}
        </div>
      </div>

    </section>
  );
}
