# Horizon Design Guidebook

Single source of truth für das Look-and-Feel über die Marketing-Site hinaus
(App, Dashboard, E-Mails, Mobile). Abgeleitet aus dem aktuellen Code in
`app/` und gedacht als Referenz, wenn neue Flächen gebaut werden.

> **Leitidee:** _Self-custody, ohne dass es sich nach Krypto anfühlt._
> Klares Helvetica, kühles Cobalt, Himmel-Imagery für „große“ Momente,
> Glas/Frost für UI-Chrome, sehr ruhige Animation. Keine Neon-Krypto-Optik.

---

## 1. Tokens

### 1.1 Farben

Alle Brand-Tokens sind in `app/globals.css` als `@theme` deklariert und
damit als Tailwind-Utilities (`bg-cobalt`, `text-cobalt-deep`, …) verfügbar.

| Token | Hex | Tailwind | Einsatz |
|---|---|---|---|
| `--color-cobalt-deep` | `#1F3BD6` | `cobalt-deep` | Primärfarbe in Charts, Logo-Akzenten, Keyhole, Buttons-Hover-Schatten |
| `--color-cobalt` | `#3A5EF0` | `cobalt` | Standard-Brand-Akzent (Check-Icons, Crypto-Tag-Tokens, Glow) |
| `--color-cobalt-soft` | `#A8B8F5` | `cobalt-soft` | Akzent auf dunklen Flächen (Lightning-Icon, Tag-Text) |
| `--color-cobalt-pale` | `#DCE2F8` | `cobalt-pale` | Helle Tile-Hintergründe, Fiat-Tag-Bg, Avatar-Ring |
| `--background` | `#EEF2F8` | `bg-background` | App-/Section-Hintergrund (kühles Off-White) |
| `--foreground` | `#171717` | `text-foreground` | Primärer Text auf hellem Bg |

**Neutrale Skala**: Tailwind `slate` ist die einzige Graustufen-Familie:

- `slate-900` — primäre Buttons, dunkle „Hero“-Karten, Hauptüberschriften
- `slate-700` — Body-Copy auf hellen Karten
- `slate-600` — Beschreibungstexte, Footer-Sekundärtext
- `slate-500` — Meta-Labels, Caption
- `slate-200` / `slate-100` — Trennlinien, sekundäre Button-Bg
- `slate-300` — Body-Copy auf dunklen Karten

**Weiß-Opazität-Stack** (auf Sky/Cobalt-Hintergründen):

```
text-white/95   primärer Text (Hero-Subline)
text-white/85   gesperrte Labels mit Schatten
text-white/70   Partner-Logos (vor Logoswap)
bg-white/30     Glass-Pills, Glass-Cards
bg-white/15     dezente Highlight-Glows hinter Hero/CTA
```

**Was es _nicht_ gibt**: keine sekundären Brand-Farben, kein Gelb, kein Grün,
keine Magenta-Highlights. Avatar-Gradients (Team-Tile) sind ausnahmsweise
mehrfarbig — strikt auf Avatare beschränkt.

### 1.2 Typografie

**Font**: Helvetica Now Display, Fallback Helvetica Neue → Helvetica → Arial.
Kein Variable-Font-Setup, kein Google-Font-Loader.

```css
--font-sans: "Helvetica Now Display", "Helvetica Now", "Helvetica Neue",
             Helvetica, Arial, sans-serif;
font-feature-settings: "ss01", "cv11"; /* aktiv im body */
letter-spacing: -0.012em;              /* default body */
```

**Typescale & Tracking** (so wie es auf der Site eingesetzt ist):

| Stil | Größen | Weight | Tracking | Wo |
|---|---|---|---|---|
| Hero H1 | 6xl/7xl/8xl | `font-normal` (400) | `tracking-[-0.04em]` | `app/components/Hero.tsx:31` |
| Section H2 | 4xl/5xl/6xl | `font-medium` (500) | `tracking-[-0.025em]` | Product / Pricing |
| Card H3 | xl–2xl | `font-medium` | `tracking-tight` | Feature-Karten |
| Body L | text-lg / text-xl | `font-normal` | default | Hero-Subline, Section-Lead |
| Body M | text-sm | `font-normal` | default | Karten-Beschreibung, Plan-Text |
| Caption / Eyebrow | text-[11px] | `font-medium` | `tracking-[0.18em]` – `tracking-[0.22em]` `uppercase` | Plan-Name, Tags, Footer-Links |
| Tag | text-xs | `font-medium` | `tracking-wide` `uppercase` | Latency-Badge `~1.2s avg` |

**Hero-Headline-Verlauf** (signature move): weißer Text mit subtilem Top-↓-Fade
zu 55 % Weiß, gibt Tiefe ohne Farbzusatz:

```tsx
className="bg-[linear-gradient(180deg,#ffffff_0%,#ffffff_45%,rgba(255,255,255,0.55)_100%)]
           bg-clip-text pb-3 text-transparent
           drop-shadow-[0_3px_8px_rgba(15,23,42,0.4)]"
```

**Italic** ausschließlich für Akzent-Phrasen in Section-Headern
(Beispiel: `Scale on your horizon.` in `PricingSection.tsx:110`).
Niemals italic in Body-Text.

### 1.3 Radien

Konsistent gestaffelt — nichts dazwischen erfinden.

| Token | Wert | Wo |
|---|---|---|
| `rounded-full` | 9999 | Avatare, Currency-Chips, Tags, Indicator-Dot |
| `rounded-xl` | 12 px | Buttons, Plan-CTA, Nav-Indicator |
| `rounded-2xl` | 16 px | Glass-Pills (Navbar-Backing, Waitlist-Form-Container) |
| `rounded-3xl` | 24 px | Karten (Glass / Cobalt-pale / Slate-900) |
| `rounded-bl/br-[2rem]` | 32 px | Section-Bottom (Hero, Product, Pricing) — kaskadiert die Sektionen |

Radien _niemals_ am Phone-Mockup-Rand benutzen — der Phone-Body hat eigene
Werte (`18px` außen / `15px` innen), die seine Identität ausmachen.

### 1.4 Shadows

Vier Schatten-Rollen — _nicht_ frei kombinieren.

```css
/* Section drop (zwischen den großen, abgerundeten Stages) */
shadow-[0_24px_40px_-16px_rgba(15,23,42,0.18),0_8px_16px_-6px_rgba(15,23,42,0.08)]

/* Glass-Card (Default Feature-Karte) */
shadow-[inset_0_1px_0_rgba(255,255,255,0.6),0_8px_30px_rgba(31,59,214,0.08)]
ring-1 ring-white/55

/* Primary Button (slate-900) */
shadow-[inset_0_1px_0_rgba(255,255,255,0.18),
        inset_0_-1px_0_rgba(255,255,255,0.06),
        0_4px_14px_rgba(15,23,42,0.3)]

/* Featured Card (Pricing „Most Chosen“) */
shadow-[0_20px_50px_-12px_rgba(15,23,42,0.2)]
ring-1 ring-white/80

/* Big CTA-Box (Footer) */
shadow-[inset_0_1px_0_rgba(255,255,255,0.18),
        0_30px_60px_-20px_rgba(15,23,42,0.25)]
```

Faustregel: Cobalt-eingefärbter Schatten (`rgba(31,59,214,…)`) gehört nur zu
Glass-Karten — er suggeriert das durchscheinende Sky-Blau. Alle anderen
Schatten sind neutral mit Slate-900 als Tinte.

### 1.5 Spacing

Container `max-w-7xl` (80 rem) für Content; Navbar weiter (`max-w-[1400px]`).
Section-Padding: `px-6 py-24 sm:py-32`. Card-Padding: `p-6` (klein) bis `p-8`/`p-10` (Pricing).
Grid-Gaps: `gap-4` für Bento-Grids, `gap-6` für Pricing-Karten, `gap-x-10/14`
für Logo-Reihen, `gap-2`/`gap-3` für inline Icons.

---

## 2. Surfaces — 5 Treatments, mehr nicht

Jede Fläche im Produkt fällt in genau eine dieser Kategorien. Nicht mischen.

### 2.1 Sky („Hero“)

`/sky.jpg` mit Cobalt-Tint und Multiply-Blend. Ausschließlich für
Top-of-Funnel-Momente (Landing-Hero, Marketing-CTA-Box, Onboarding-Welcome,
Empty-State-Hero im Dashboard wenn ein Konto frisch ist).

```css
backgroundImage:
  "linear-gradient(180deg, rgba(31,59,214,0.14) 0%, rgba(58,94,240,0.10) 100%),
   url('/sky.jpg')"
backgroundSize: cover
backgroundPosition: center
backgroundBlendMode: multiply
```

Text auf Sky: **immer** weiß mit `text-shadow: 0 2px 4px rgba(15,23,42,0.35)`
oder `drop-shadow-[0_3px_8px_rgba(15,23,42,0.4)]` für H1.

### 2.2 Glass

Matter Frost auf hellem Bg. **Standardflächen für Cards, Modals,
Sticky-Bars im Dashboard.** Klassen-String aus `ProductSection.tsx:5`
(zur Wiederverwendung exportierfähig):

```ts
const GLASS =
  "rounded-3xl bg-white/30 p-6 backdrop-blur-2xl backdrop-saturate-150 " +
  "ring-1 ring-white/55 " +
  "shadow-[inset_0_1px_0_rgba(255,255,255,0.6),0_8px_30px_rgba(31,59,214,0.08)] " +
  "transition-[background-color] duration-300 ease-[cubic-bezier(0.25,1,0.5,1)] " +
  "hover:bg-white/45";
```

Hover hebt nur die Tönung um eine Stufe an (30 % → 45 %), niemals lift /
scale / Schattenwechsel.

### 2.3 Cobalt-Pale (Accent Tile)

Flache, blassblaue Karte für hervorgehobene Daten-Visualisierungen (z.B.
das Treasury-Chart-Tile). Kein Frost, sondern feste Fläche.

```
bg-cobalt-pale rounded-3xl p-7 shadow-sm
```

Alle Inhalte in `slate-900` (Headline) / `slate-700` (Body). Akzentlinien und
SVG-Strokes in `cobalt-deep` (`#1F3BD6`). Auf dieser Fläche wird _nicht_
geblurrt und _kein_ Glas-Inset gesetzt.

### 2.4 Slate-900 (Dark Tile)

Tiefe, narrative Karte für Statements / Zahlen / „heroische“ Konzepte
(Beispiel: „Instant settlements ~1.2 s avg“). Body-Text in `slate-300`,
Akzent-Glow als zwei `blur-2xl/3xl` Kreise in `cobalt/30` und `cobalt-soft/15`.

```
bg-slate-900 text-white rounded-3xl p-7
shadow-[inset_0_1px_0_rgba(255,255,255,0.1)]
```

Im Dashboard nur sparsam — höchstens eine Slate-Card pro Bildschirm.
Sonst kippt der Look.

### 2.5 White Card

Reines `bg-white` (oder `bg-white/70` als „elevated“ in einer Glass-Reihe).
Pricing „Most Chosen“ und Body-Cards im Footer. Schatten siehe §1.4.
Nutze für: Detail-Views, Tabellen, Forms im Dashboard.

---

## 3. Komponenten

### 3.1 Buttons

Vier Varianten — exakt diese Klassen wiederverwenden:

**Primary (slate-900, dunkel mit Pfeil)** — Default-CTA überall:

```tsx
<button className="inline-flex items-center gap-2 rounded-xl
                   bg-slate-900 px-5 py-3 text-base font-medium text-white
                   shadow-[inset_0_1px_0_rgba(255,255,255,0.18),
                           inset_0_-1px_0_rgba(255,255,255,0.06),
                           0_4px_14px_rgba(15,23,42,0.3)]
                   transition-colors hover:bg-slate-800">
  Get Started
  <ArrowRight />
</button>
```

`<ArrowRight />` ist ein 14×14 inline-SVG, `stroke-width 1.6`, round caps —
siehe `Navbar.tsx:199-208`. Diese Pfeil-SVG ist überall identisch.

**Secondary (light)** — auf hellem Bg, niedrigere Hierarchie:

```tsx
className="rounded-xl bg-slate-100 px-5 py-3 text-sm font-medium
           text-slate-900 ring-1 ring-slate-200 hover:bg-slate-200"
```

**Glass-White** — wenn der Bg dunkel/Sky ist und Primary slate-950 belegt:

```tsx
className="rounded-xl bg-white/95 px-5 py-3 text-sm font-medium
           text-slate-900 shadow-[inset_0_1px_0_rgba(255,255,255,0.6),
           0_4px_14px_rgba(15,23,42,0.18)] hover:bg-white"
```

**Submit-on-glass** — Form-Submit innerhalb einer Glass-Pill (Waitlist-Form),
identisch zu Primary aber `text-sm py-2.5`.

Padding & Höhe: Buttons haben **immer** `rounded-xl`, niemals `rounded-2xl`
oder `rounded-full` (Ausnahme: Tag-Pills). Min-Tap-Target: 44 px (Mobile).

### 3.2 Glass-Pill (Navbar-Pattern)

Die zentrale Navbar nutzt einen Sliding-White-Indicator, der _hinter_ den
Labels läuft — Inspiration für jedes „Tab/Segment-Control“ im Dashboard.

Schlüssel-Mechanik (`Navbar.tsx`):

- Glass-Backing fadet erst ab `scrollY > 20` ein (`opacity-0` → `opacity-100`).
- Aktiver Item-Pill hat `bg-gradient-to-b from-white to-slate-100` und
  einen 6 px Indicator-Dot links innen (`rounded-full bg-slate-900`).
- Position via `transform: translateX(...)`+`width` auf einem absolut
  positionierten Sibling — Labels selbst bleiben statisch, nur die Pille gleitet.
- Easing `cubic-bezier(0.32,0.72,0,1)`, `duration-300`.

Für Dashboard-Tabs: gleiche Mechanik, gleiches Easing — nur ohne den
„fadet-on-scroll“-Trigger.

### 3.3 Cards (Bento-Grid)

Section-Layout aus `ProductSection.tsx`:

```
md:grid-cols-12  md:auto-rows-[200px]  gap-4
Row 1: 7 + 5
Row 2: 4 + 4 + 4
Row 3: 5 + 7
```

Wide Cards (`col-span-7`) erzählen, Small Cards (`col-span-4–5`) zeigen.
Jeder Bento-Slot bekommt **eine** Surface aus §2 — niemals zwei
nebeneinander mit identischer Surface. Variation kommt aus dem Wechsel
Glass ↔ Cobalt-pale ↔ Slate-900 ↔ Sky-Tile.

### 3.4 Form-Field

Nur ein Input-Pattern bisher (Hero-Waitlist), ist aber für Dashboard
nicht das Default — siehe Empfehlung in §6.

```tsx
// Auf-Sky-Pille:
className="rounded-2xl border border-white/40 bg-white/15 p-1.5
           backdrop-blur-md focus-within:border-white/60 focus-within:bg-white/25"
```

Im Dashboard auf hellem Bg: weiße Karte (`bg-white`), `ring-1 ring-slate-200`,
`focus-within:ring-cobalt focus-within:ring-2`, `rounded-xl`, `px-4 py-2.5`.

### 3.5 Avatar / Currency-Chip / Status-Chip

Alle drei sind 36–40 px round Tiles, nur die Inhalte unterscheiden:

```
Currency Chip: h-10 w-10 rounded-full grid place-items-center
               (bg-cobalt-pale text-cobalt-deep für Fiat,
                bg-cobalt für BTC, bg-cobalt-deep für ETH)
Avatar:        h-9 w-9 rounded-full bg-gradient-to-br ring-2 ring-white
Status Chip:   px-3 py-1 rounded-full text-xs uppercase tracking-wide
               (z.B. ring-1 ring-cobalt-soft/30 bg-cobalt-deep/40 text-cobalt-soft)
```

### 3.6 Logo

Brand-Mark `HorizonLogo` in `app/components/HorizonLogo.tsx`. Single-Path
SVG mit `fill="currentColor"` — d.h. die Farbe folgt `text-*`.
Dashboard-App-Icon: 40–48 px, `text-cobalt-deep` auf hellem Bg /
`text-white` auf Sky/Slate.

### 3.7 Tilt-Card

`TiltCard` (`components/TiltCard.tsx`) — `maxTilt` Default 2.5°, max 5°
(siehe Brand-Tile). **Niemals** über 5° — sonst kippt der Eindruck von
„material/präzise“ zu „spielzeug/playful“. Bei dichter Karten-Kachelung
(>9 Karten) ganz weglassen, damit der Mauspfeil nicht ständig „Wackeln“
auslöst.

---

## 4. Iconographie

- **Stil**: Outline, `stroke-width: 1.6` (große Symbole) bzw. `2.4` (kleine
  Check-Häkchen). `strokeLinecap`/`strokeLinejoin: round`. Keine gefüllten
  Glyphen außer dem Lightning-Bolt im Slate-Tile.
- **Pfeil rechts**: einheitliches 16×16 SVG `M3 8h9M8 3.5L12.5 8 8 12.5`
  in jedem CTA. Wenn ein neuer CTA ohne Pfeil auskommt, ist das eine
  bewusste Designentscheidung.
- **Lock3D**: Markant, nur für Brand-Momente. _Nicht_ als generisches
  Security-Icon im Dashboard verwenden — dafür der einfache Schild-Glyph
  aus `ProductSection.tsx:103`.
- **Quelle**: Inline-SVGs, kein Icon-Library-Dependency. Konsistenter
  Stil wichtiger als Vollständigkeit.

---

## 5. Motion

Bewusst sparsam. Drei Easings reichen für alles.

| Use case | Easing | Duration |
|---|---|---|
| Slide / Position | `cubic-bezier(0.32, 0.72, 0, 1)` | 300 ms |
| Hover Card / Color | `cubic-bezier(0.25, 1, 0.5, 1)` | 300–400 ms |
| Tilt-Reset | `cubic-bezier(0.22, 1, 0.36, 1)` | 400 ms |
| Pulse (Highlight-Once) | `cubic-bezier(0.25, 0.46, 0.45, 0.94)` | 1.2 s, `1 forwards` |

**Regeln**:
- Karten heben **nicht** auf Hover (kein `translate-y`, kein `scale`).
  Nur Bg-Tint und/oder Border-Opacity ändern.
- Keine endlos-laufenden Loops auf Marketing/Dashboard. Die einzige
  Ausnahme war die Scroll-Mouse-Animation — bewusst entfernt.
- „Aufmerksamkeitspuls“ (`wl-pulse`): max 1×, ausgelöst durch User-Aktion.
  Skript-Pattern siehe `Navbar.tsx:17` / `Footer.tsx:5` / `WaitlistForm.tsx:8`.
- Smooth-Scroll global aktiv (`html { scroll-behavior: smooth }`).
- Reduzierte Bewegung respektieren: jede neue Animation sollte mit
  `@media (prefers-reduced-motion: reduce)` gedimmt werden (TODO im Code).

---

## 6. Übertragung auf App / Dashboard

Marketing-Site und App teilen Tokens, aber nicht jedes Pattern passt 1:1.
Empfehlungen:

**Was übernehmen:**

- Alle Tokens aus §1 (Farben, Type-Stack, Radien, Shadows).
- Buttons aus §3.1 — _ohne_ Anpassung.
- Glass-Cards (§2.2) als Default-Karten-Surface, _solange_ ein hellerer
  oder „Sky“-Bg dahinter liegt. Auf reinem `#EEF2F8` ohne Tiefe sieht
  Glass dünn aus → dann lieber White-Card (§2.5) mit Slate-Ring.
- Bento-Grid für „Overview“-Dashboards (§3.3).
- Sliding-Pill-Tab (§3.2) als Universal-Tab-/Segment-Control.

**Was anpassen:**

- **Forms**: nicht das Glass-Pill-Pattern aus dem Hero. App-Forms auf
  weißer Karte, Slate-Ring, Cobalt-Focus. Siehe Skizze in §3.4.
- **Sky-Imagery**: nur für Onboarding-Welcome / leere Start-Screens.
  Nicht für Daten-Dashboards — der Bg-Kontrast macht Tabellen unleserlich.
- **Hero-Type-Größen** (8xl) im Dashboard ersetzen durch H1 in 4xl/5xl.
  Tracking bleibt `-0.025em`, Weight `font-medium`.
- **Tilt-Cards** im Dashboard nur auf isolierten Hero-Tiles
  (z.B. „Available Balance“). In Tabellen-/Listen-Sicht aus.

**Neue Patterns, die das Guide noch nicht abdeckt** (wenn der Dashboard
gebaut wird, hier ergänzen):

- Datentabellen (Padding-System, Zebra-Streifen ja/nein, Header-Sticky)
- Chart-Farbskala über Cobalt hinaus (für Multi-Series-Charts)
- Empty-State-Illustrationen
- Toasts / Inline-Validation (Erfolg / Warnung / Fehler-Farben sind heute
  noch nicht definiert; Vorschlag: `emerald-500` / `amber-500` / `rose-500`,
  aber bestätigen lassen)
- Dark-Mode (App-Surface). Aktuell existiert nur Slate-900 als Akzent-
  Surface; ein vollständiger Dark-Mode-Token-Map fehlt.

---

## 7. Voice & Microcopy

Direkt aus den Texten der Site abgeleitet — nicht beliebig.

- **Sätze sind kurz.** Eine Idee pro Satz. Kein Marketing-Geschwafel.
- **Erste Person aktiv** in CTAs („Get started“, „Join the waitlist“,
  „Take a tour“) — niemals „Let’s …“, niemals Ausrufezeichen.
- **Pricing-Sprache**: „Move up when the venture moves up. Never before.“
  Wert-orientiert, nicht „Premium / Pro / Enterprise“.
- **Eyebrows** über Sektionen: gesperrtes Uppercase, exakt eine Phrase
  mit `·` als Trenner („Self-custody · Business OS“).
- **Zahlen-Storytelling**: relative Zeitangaben in Tags
  (`~1.2s avg`, `+12`), nicht in Fließtext.
- **Keine Emojis.** Auch keine in Buttons, auch keine in Toasts.
- **Akzent kursiv** für eine bewusste Phrase pro Bildschirm, mehr nicht.

---

## 8. Reuse-Snippets

Direkt zum Copy-Paste in App-Komponenten. Wenn neue Patterns dazukommen,
hier ergänzen, damit das Guide praktisch bleibt.

### Glass Card

```tsx
const glassCard =
  "rounded-3xl bg-white/30 p-6 backdrop-blur-2xl backdrop-saturate-150 " +
  "ring-1 ring-white/55 " +
  "shadow-[inset_0_1px_0_rgba(255,255,255,0.6),0_8px_30px_rgba(31,59,214,0.08)] " +
  "transition-[background-color] duration-300 hover:bg-white/45";
```

### Primary Button

```tsx
const btnPrimary =
  "inline-flex items-center gap-2 rounded-xl bg-slate-900 px-5 py-3 " +
  "text-sm font-medium text-white transition-colors hover:bg-slate-800 " +
  "shadow-[inset_0_1px_0_rgba(255,255,255,0.18),inset_0_-1px_0_rgba(255,255,255,0.06),0_4px_14px_rgba(15,23,42,0.3)]";
```

### Section Wrapper

```tsx
<section className="relative overflow-hidden rounded-b-[2rem] bg-[#eef2f8]
                    px-6 py-24 sm:py-32
                    shadow-[0_24px_40px_-16px_rgba(15,23,42,0.14),0_8px_16px_-6px_rgba(15,23,42,0.06)]">
  <div className="relative mx-auto max-w-7xl">
    {/* … */}
  </div>
</section>
```

### Sky Background

```tsx
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
```

### Eyebrow Label

```tsx
<span className="text-[11px] font-medium uppercase tracking-[0.22em] text-slate-500">
  Treasury
</span>
```

---

## 9. Files-of-Truth

Wenn dieses Guide und der Code abweichen, gewinnt der Code. Diese Dateien
sind die Quelle:

- `app/globals.css` — Tokens (Farben, Fonts, Animationen)
- `app/components/Hero.tsx` — Sky-Bg-Recipe, Hero-Type
- `app/components/Navbar.tsx` — Glass-Pill + Sliding-Indicator
- `app/components/ProductSection.tsx` — `GLASS`-Klassen-String, Bento-Grid
- `app/components/PricingSection.tsx` — Plan-Card, Featured-State
- `app/components/Footer.tsx` — Big-CTA-Card, Wordmark-mit-Sky-Pattern
- `app/components/TiltCard.tsx` — Tilt-Mechanik
- `app/components/Lock3D.tsx`, `HorizonLogo.tsx` — Brand-Marken

Wer Patterns refactored, sollte dieses Guide synchron pflegen.
