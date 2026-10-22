# Giuseppe Frattura — personal identity

## Approved identity

The user approved this GF identity as the site's default logo and favicon. Preserve it in future site changes unless the user requests a replacement. Use `gf-icon.webp` in the shared header and the matching favicon files declared in `BaseHead.astro`; the old planet logo is no longer the site's identity. The transparent teal mark is an alternate asset for reuse, not the default header mark.

The GF monogram is based on Giuseppe's initials. Its open, geometric letterforms suggest programming brackets and a camera viewfinder, connecting software development and photography without adding small decorative icons. The muted teal comes from the site's existing palette.

The website uses the high-contrast square mark with a real-text wordmark on desktop and the mark alone on mobile. The favicon uses the same letterforms with a high-contrast background for browser tabs. The logo link retains its accessible name.

## Assets

- `public/assets/brand/gf-mark.webp`: transparent website mark.
- `public/assets/brand/gf-mark.png`: transparent PNG for reuse.
- `public/assets/brand/gf-icon.png`: square icon master.
- `public/assets/brand/gf-icon.webp`: compact header mark.
- `public/favicon.ico`: 16, 32 and 48 px frames.
- `public/favicon-32.png`, `public/favicon-192.png`: browser icons.
- `public/apple-touch-icon.png`: 180 px home-screen icon.

Created using the built-in image-generation tool. Only resizing and format conversion use Sharp; the favicon ICO container contains PNG frames. No new runtime dependency is introduced.

## Generation prompts

### Mark

Use case: logo-brand. Asset type: final website brand mark for Giuseppe Frattura, an Italian software developer who writes about clean code, technology and photography. Create ONE refined geometric GF monogram, custom drawn letters, G on left F on right, immediately readable as GF. The monogram's open square geometry subtly suggests a camera viewfinder and programming brackets, without adding separate camera or code icons. Flat solid muted teal #548e9b on a genuinely transparent background. Bold consistent strokes, carefully balanced negative space, slightly softened corners, confident editorial personal brand. Square composition with the single mark centered, fills about 80% of canvas. This is a production logo icon, not a brand presentation. Text: only the intertwined letters "GF". No other text. Avoid gradients, lighting, 3D, shadows, mockups, photography, orbit or planet imagery, hairline details, decorative small elements, multiple variants. Must be legible when scaled to 48 pixels and work against white and dark charcoal.

### Cleanup

Use case: precise-object-edit. Image 1 is the logo edit target. Clean up this GF monogram into a final crisp flat logo. Preserve exactly its recognizable GF geometry and proportions. Replace the mottled or shaded fill with perfectly uniform solid teal #548e9b. Remove every stray speckle and fringe outside the mark. Edges must be clean smooth antialiased outlines, no pixel noise, no blue or red fringes, no shadows, no texture, no gradients. Truly transparent background. Center with even minimal padding around the entire mark. Output only this one logo, no mockup or captions.

### Favicon

Use case: logo-brand. Asset type: production favicon and home-screen app icon for Giuseppe Frattura's personal website. Image 1 is a reference for the GF monogram shape. Create ONE square favicon: use exactly the same GF letterforms but rendered in perfectly flat warm white #ffffff, centered on a completely solid dark teal #234852 square background. Enlarge the mark to occupy approximately 82% of the square's width. Keep generous negative space inside the G and around the F for clarity at 16x16 pixels. Preserve recognizable G on left, F on right and bold even strokes. Remove texture, mottling, stray pixels, fringes and shading from the reference. All background pixels must be the same dark teal color, all foreground interiors solid white. Straight-on graphic with clean antialiased outlines, no mockup, no shadow, no 3D, no border, no rounded-square outline, no text except GF, no extra symbols. Output only this one square icon, edge-to-edge color with no surrounding margin.
