# Clean Product Design and Frontend Standards

Apply these rules to all front-end code, components, and pages generated or modified in this repository. Ensure every layout reflects structured, disciplined engineering rather than improvised or vibe-coded patterns.

## Spacing Rhythm
- Use a strict 8-point scale for margins, padding, and gaps:
  - 4px (`gap-1`, `p-1`) - micro spacing only
  - 8px (`gap-2`, `p-2`) - compact element spacing
  - 16px (`gap-4`, `p-4`) - standard internal padding
  - 24px (`gap-6`, `p-6`) - card padding
  - 32px (`gap-8`, `p-8`) - section sub-grouping
  - 48px (`py-12`, `mb-12`) - medium section separation
  - 64px (`py-16`, `mb-16`) - primary section spacing
  - 96px (`py-24`) - major landing section padding
- Never use arbitrary spacing values or drift between arbitrary offsets.

## Typography Ramp
- Font families:
  - Headings: `var(--font-display)` (`Space Grotesk`)
  - Body & UI: `var(--font-sans)` (`Plus Jakarta Sans`)
  - Code & telemetry: `var(--font-mono)` (`JetBrains Mono`)
- Establish a consistent scale:
  - `text-xs` (12px, line-height 16px) - metadata and badges
  - `text-sm` (14px, line-height 20px) - secondary body and button labels
  - `text-base` (16px, line-height 24px) - standard body text
  - `text-lg` (18px, line-height 28px) - card titles
  - `text-xl` (20px, line-height 28px) - subsection titles
  - `text-2xl` / `text-3xl` (24-30px) - section titles
  - `text-4xl` / `text-5xl` (36-48px) - hero titles
- Maintain consistent line heights. Never make body copy excessively bold or thin.

## Color Discipline
- Base UI on the established theme palette:
  - Primary: Brand blue (`oklch(62.3% 0.214 259.815)`)
  - Semantic neutrals: `background`, `card`, `muted`, `foreground`, `muted-foreground`, `border`
- Avoid neon hues.
- Avoid purple gradients (`from-primary via-purple-500 to-indigo-500`) unless explicitly required by brand identity.
- Every color accent must serve structural hierarchy and readability. High contrast is mandatory.

## Component Language and Radiuses
- Standardize border radiuses:
  - Cards, panels, and large containers: `rounded-xl` (12px)
  - Buttons, inputs, and badges: `rounded-lg` (8px)
- Shadows: Use subtle, uniform elevation (`shadow-xs`, `shadow-sm`, or clean `border`). Avoid heavy, floating, colored outer drop-shadows.
- Keep alignments predictable. Do not mix pill buttons with sharp rectangular cards.

## Interactions and Transitions
- All transitions must be subtle (`duration-200` or `duration-150` with standard ease curves).
- Never attach scroll hijacking or multi-thousand-viewport runways (`min-h-[500vh]`, `min-h-[750vh]`) to display core page content.
- Interactive controls must actually work: tabs switch views, accordions toggle, buttons submit or route correctly.
- Avoid motion purely for decoration. Avoid spinning shapes, laser sweeps, and floating particle backgrounds.

## Layout and Grid
- Center content within standard responsive containers (`max-w-6xl mx-auto px-4 sm:px-6 lg:px-8`).
- Use CSS grid or flexbox with strict alignment.
- Content must not visually wobble or drift during scroll.
- Mobile layouts must be first-class citizens, mirroring desktop clarity without awkward truncated states.

## Copy Standards
- Write concrete, grounded descriptions of what Joey's platform offers: actual developer tools, technical articles, and open-source projects.
- Avoid generic hero clichés like "build your dreams" or filler text like "dive into real-world codebases".
- Maintain a direct, confident engineering voice.

## Elements to Actively Remove
- `Sparkles` icon usage as generic decor.
- Floating particle orbs (`FloatingParticles`).
- Multi-viewport scroll runways that force users to scroll through hundreds of pixels just to reveal static text.
- Text gradient fills with purple and pink.
- Mixed border radiuses on the same screen.
- Fake metrics or ungrounded statistics.
