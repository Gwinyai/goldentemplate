# Styling Guide Addendum – Primary & Secondary Buttons

## Core principle
Use the shadcn `Button` component for layout, radius, focus rings, and sizing, and layer token-driven utility classes for visual treatment. A button’s appearance is the combination of:
- Shadcn Button base + `variant` + `size` (layout, spacing, radius via `--token-radius-md`, focus)
- Utility: `btn-primary` or `btn-secondary` (fill, text color, shadow, borders)

## Primary buttons
- Component: `Button`
- Variant: `default`
- Utility: `btn-primary`
- Result: token primary fill, token text primary, token shadow; radius/sizing from Button size (e.g., `size="lg"`).

## Secondary buttons
- Component: `Button`
- Variant: `secondary` (for semantic intent)
- Utility: `btn-secondary`
- Result: token surface fill with token border and text, hover border/fill; radius/sizing from Button size.

## Usage rules
- Always include `btn-primary` or `btn-secondary` on CTAs and pricing buttons so they match hero CTAs.
- Do not set custom inline radius/padding for these buttons; rely on Button size + `--token-radius-md`.
- For consistent look across sections (hero, pricing, forms), reuse these two combinations; avoid ad-hoc colors/shadows.

## Token dependencies
- Colors: `--token-primary`, `--token-text-primary`, `--token-surface`, `--token-border-*`.
- Radius: `--token-radius-md` (via Button base/size).
- Shadows: token shadows applied in utilities; rely on design tokens for updates.
