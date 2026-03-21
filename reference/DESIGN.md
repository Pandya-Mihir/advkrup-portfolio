```markdown
# Design System: The Noir Advocate

## 1. Overview & Creative North Star
The Creative North Star for this design system is **"The Noir Advocate."** This is not a standard corporate legal tool; it is a high-end editorial experience that mirrors the precision of a master litigator and the dramatic tension of a film noir. 

The system moves beyond the "template" look by embracing **intentional asymmetry** and **aggressive minimalism**. We break the traditional rigid grid to create a sense of movement and authority. By utilizing large expanses of "dead space" (negative space) and over-scaled typography, we position the brand as a singular, unapologetic force in the legal landscape. The goal is to feel custom, curated, and intimidatingly professional.

---

## 2. Colors & Surface Philosophy
The palette is built on extreme contrast to evoke clarity and power.

### The Palette
*   **Background / Surface (`#131313`):** The "Midnight Black." This is the canvas. It is not a flat charcoal, but a deep, immersive void.
*   **On-Surface (`#e2e2e2`):** The "Stark Paper." Used for maximum legibility and high-contrast impact.
*   **Primary (`#ffb4a9` / `#fe5545`):** The "Burnt Vermilion." This high-energy accent is used sparingly to draw the eye to critical actions or "The Truth."

### The "No-Line" Rule
**Prohibit 1px solid borders for sectioning.** Boundaries must be defined solely through background color shifts or extreme white space. 
*   Use `surface-container-low` (`#1b1b1b`) against `surface` (`#131313`) to define regions. 
*   Never use a stroke to separate a header from a body; use a jump in the spacing scale (e.g., `spacing.20`).

### Signature Textures & Gradients
To avoid a flat "digital" feel, use a subtle radial gradient on hero backgrounds: transitioning from `surface` (`#131313`) to `surface-container-high` (`#2a2a2a`) in the corner of the viewport. This mimics the "vignette" of a Leica lens, adding editorial depth.

---

## 3. Typography: The Editorial Voice
The typography is a study in tension: the classicism of the serif versus the cold precision of the sans-serif.

*   **Display & Headline (Newsreader):** High-contrast, oversized, and dramatic. These should be treated as "Art." Headlines should often break the grid or overlap imagery to create a layered, "Noir" look.
    *   *Rule:* Use `display-lg` (3.5rem) for impact, often with tight line-height to make the letterforms feel structural.
*   **Body & UI (Inter):** Functional, wide-spaced, and invisible. 
    *   *Rule:* Increase `letter-spacing` by 0.02em to 0.05em on all UI labels to ensure the "high-end" feel. 
    *   *Hierarchy:* `label-md` is your primary tool for metadata, suggesting a "case file" aesthetic.

---

## 4. Elevation, Depth & Sharpness
In this system, **rounding is prohibited.** The `roundedness` scale is set to `0px` across all tokens to maintain a "precise, aggressive" edge.

### The Layering Principle
Depth is achieved through **Tonal Layering** rather than shadows.
*   **Nesting:** Place a `surface-container-highest` (`#353535`) component inside a `surface-container-low` (`#1b1b1b`) section. The shift in value creates a "lift" without the need for dated drop-shadows.
*   **Glassmorphism:** For floating elements (like a navigation bar or a mobile menu), use semi-transparent `surface` colors with a `backdrop-blur` of 20px. This allows the high-contrast photography beneath to bleed through, softening the harshness of the black while maintaining the "Noir" mood.
*   **The Ghost Border:** If a boundary is strictly required for accessibility, use `outline-variant` (`#5b403c`) at **15% opacity**. It should be felt, not seen.

---

## 5. Components

### Buttons
*   **Primary:** Sharp corners (`0px`). Background: `primary_container` (`#fe5545`). Text: `on_primary_container` (White/Dark).
*   **Secondary:** Sharp corners. No background. `1px` Ghost Border (`outline-variant` at 20%). 
*   **Interaction:** On hover, the button should invert colors instantly—no slow transitions. This reinforces the "Precision" brand value.

### Cards & Lists
*   **Rule:** Forbid divider lines. 
*   **Cards:** Use `surface-container-low` with generous internal padding (`spacing.8`). Content should be aligned asymmetrically—e.g., text top-left, call-to-action bottom-right.
*   **Lists:** Separate items using vertical white space (`spacing.6`). Use a `primary` color dot or a small Newsreader serif numeral (e.g., *01.*) to denote list items instead of bullets.

### Input Fields
*   **Style:** Underline only. No box. 
*   **State:** When active, the underline transitions from `outline` to `primary` (`Burnt Vermilion`). 
*   **Labels:** Use `label-sm` in all-caps with `0.1rem` letter-spacing, positioned above the input.

---

## 6. Do’s and Don’ts

### Do:
*   **Embrace the Void:** Use `spacing.24` between major sections. If it feels like "too much" white space, it’s probably just right.
*   **Asymmetric Balance:** Place a large `display-lg` headline on the left and a small `body-md` paragraph on the far right. The tension between them creates the "High-End" feel.
*   **Dramatic Imagery:** Use photography with "Chiaroscuro" lighting (extreme shadows and highlights). Photography should be treated as a structural element, not a decoration.

### Don’t:
*   **No Rounding:** Never use `border-radius`. Not even 2px. Sharpness is our signature.
*   **No Generic Icons:** Avoid "out of the box" thin-line icons. If an icon is needed, it should be custom, solid, and geometric.
*   **No Centered Text:** Centering is for templates. We align to the edges of the asymmetrical grid to maintain a "bespoke" editorial look.
*   **No Pure Grey:** Use the `surface-container` tokens which have a slight tonal shift, preventing the UI from looking like a default wireframe.

---

## 7. Spacing Scale Reference
Use these values to maintain the "Editorial" rhythm:
*   **Micro (spacing.1 - 3):** Internal component padding.
*   **Macro (spacing.12 - 24):** Section margins and headline-to-body gaps. The "Noir Advocate" thrives in the space between the elements.