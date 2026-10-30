# TrafficCorp Design System

The visual rules for this website. Use them for every design decision.

**Source:** the "Trafficorp — Homepage" frame in the Paper file [Smart mist](https://app.paper.design/file/01M63KZXN110N2Z4VJ09YWN9HZ/p-1-0/8C-0), read on 2026-10-30.

**How far this goes:** colors and font families are official tokens saved in Paper. Type sizes, spacing and component specs are not tokens. They were measured from this one desktop frame (1440px wide). The file's other frames and its "Navigation states" and "Estimate configurator" pages were not reviewed.

---

## The style in brief

Practical and direct, like good roadside signage: clear, high contrast, no decoration.

- **Warm grey and near-black do the work.** Orange is the single accent, used like a traffic cone: small and impossible to miss.
- **Square corners.** Buttons, cards, images and sections have no rounding. Only small status pills and avatars are round.
- **Flat surfaces.** No shadows and no decorative gradients. Hairlines (1px lines) and background changes separate things.
- **Two typefaces with distinct jobs.** Geist speaks in sentences. Geist Mono, in uppercase, labels things and sits on buttons, like stencilled equipment markings.
- **Real job-site photography.** Crews, vehicles and roads, darkened so text stays readable.
- **Lots of space between sections,** with tight spacing inside each group.

---

## Colors

These are the Paper tokens. Always use a token instead of a raw color value.

| Token | Value | Use for |
|---|---|---|
| `--color-ink` | `#141413` | Headlines, primary dark buttons, text on orange |
| `--color-stone` | `#6B6A65` | Body copy, captions and secondary text on light backgrounds |
| `--color-hairline` | `#E3E2DD` | Borders and dividers on light surfaces; body text on dark surfaces |
| `--color-canvas` | `#EDECE8` | Section backgrounds, tab tracks |
| `--color-paper` | `#FAFAF8` | Page background and cards; text on dark surfaces |
| `--color-asphalt` | `#1D1E1A` | Dark sections |
| `--color-olive-grey` | `#3A3C34` | Surfaces and borders inside dark sections |
| `--color-orange` | `#F7941D` | Brand accent, under 5% of any page |
| `--color-burnt-orange` | `#A8550A` | Orange text and links on light backgrounds |
| `--color-cone-tint` | `#FDEBD6` | Soft highlights, chart fills, "in progress" pills |

### Orange rules

- Text **on** orange is always ink, never white (8.1:1 versus 2.2:1).
- Orange **text** only goes on dark surfaces or photos (7.4:1 on asphalt).
- On paper, orange text fails contrast (2.2:1), so use burnt orange (5.1:1).
- On canvas, even burnt orange falls just short (4.48:1 against the 4.5:1 target), so use stone for small labels there (4.6:1).
- Reserve solid orange for the one action that matters most in a view.

### Colors used in the frame that are not tokens yet

| Value | Where it appears | Guidance |
|---|---|---|
| `#E2F1E5` + `#23683A` | "On site" status pill | Keep as the success state; worth adding as tokens |
| `#B4B3AC` | Dimmed text | Dark surfaces only (2:1 on paper) |
| `#8C8B84`, `#9E9D96` | Footer headings, list numbers | Use stone instead on light surfaces |
| `#CFCEC8`, `#D6D5CF` | Avatar and photo placeholders | Placeholders only |

---

## Typography

Fonts: **Geist** (tokens `--geist-font`) and **Geist Mono** (`--geist-mono-font`).

Tracking gets tighter as type gets bigger. Weights stay moderate: headlines are medium (500), not bold.

### Geist

| Role | Size / line height | Weight | Tracking |
|---|---|---|---|
| Display, large (dark closing sections) | 56 / 58 | 600 | -0.04em |
| Section and hero headline | 48 / 58 | 500 | -0.04em |
| Sub-headline | 40 / 48 | 500 | -0.035em |
| Stat number | 29 / 44 | 500 | -0.03em |
| Pull quote | 28 / 38 | 400 | -0.02em |
| Card title | 24 / 30 | 500 | -0.02em |
| List item title | 22 / 28 | 600 | -0.02em |
| Lead paragraph | 17 / 27 | 400 | none |
| Body | 16 / 27 | 400 | none |
| Card body | 15 / 23 | 400 | none |
| Navigation and tabs | 15 / 18 | 400 (500 when active) | none |
| Small | 14 / 18 | 400 | none |
| Caption and top bar | 13 / 16 | 400 | none |

### Geist Mono

Always uppercase, except the logo.

| Role | Size / line height | Weight | Notes |
|---|---|---|---|
| Logo wordmark | 19 / 24 | 600 | -0.02em, not uppercase |
| Large button | 16 / 20 | 400 | Section-level actions |
| Small button | 14 / 18 | 500 | Navigation bar |
| Eyebrow (small label above a headline) | 14 / 18 | 400 | Follows the orange rules above |
| Card link ("See more →") | 14 / 18 | 400 | Orange, on photos |
| Hero location line | 13 / 16 | 400 | Paper at 53% opacity |

---

## Spacing and layout

- **Page width:** 1440px design, with **64px** side margins and a 1312px content area. On wider screens content stays within 1440px and backgrounds run edge to edge; use the `px-page` style for side margins.
- **Section padding (top and bottom):** 241px for major light sections, 120px for dark sections, 112px for the Locations section. Sections with a hairline on top use 140px at the top and 241px at the bottom.
- **Spacing steps in use:** 2, 4, 6, 8, 10, 12, 16, 20, 24, 28, 32, 40, 48, 64, 80.
- **Common gaps:**
  - 48px between a section header and its content
  - 64px between two columns
  - 16px between cards
  - 20px from eyebrow to headline
  - 12px between buttons
- **Layouts:**
  - Three equal image cards
  - A 560px text column beside a large image
  - A split panel
  - Left-aligned headlines are the default. Centered is the exception, used for the customer stories header.

---

## Components

### Buttons

Square corners, Geist Mono, uppercase, 16px / 26px padding.

| Type | Background | Text | Use |
|---|---|---|---|
| Primary | orange | ink | The main action, such as a same-hour estimate or calling |
| Dark | ink | paper | Considered actions on light surfaces |
| Light | paper | ink | On dark sections |
| Outline | none, 1px paper border | paper | Second action on photos |
| Nav | asphalt, 1px olive-grey border, 12px / 20px padding | paper | Navigation bar action |

### Image cards

Used for services and locations.

- Full-bleed photo, 486px tall for services and 427px for locations.
- Black overlay at about 53% (`#00000087`).
- Text is pinned to the bottom under a 1px hairline, with 24px padding (28px at the bottom).
- Title in paper, description in hairline, link in orange.

### Tabs

A canvas-colored track with a 4px gap. The active tab is solid ink with paper text. Inactive tabs have no fill and ink text. 15px text, 10px / 22px padding, square.

### Numbered feature list

A 32px column for the number, a 24px gap, then title and description. Rows are divided by 1px lines with 24px padding. Inactive rows have a stone title instead of ink, so the list reads as an interactive selector. The frame fades them to 30% opacity, but that text is too faint to read (1.5:1). The list moves on by itself and waits while someone hovers over it or tabs through it. It has no pause button, by request.

### Status card and pills

- Paper card, 4px corners, the only rounded card in the frame. Rows are divided by hairlines, with 16px / 22px padding.
- Pills are fully rounded, 12 / 16 at weight 600, 5px / 10px padding:
  - **Done / on site:** `#E2F1E5` with `#23683A`
  - **In progress:** cone tint with burnt orange
  - **Scheduled:** canvas with stone

### Other patterns

- **Stats row:** large number over a small label, separated by 1px vertical lines with 24px padding.
- **Logo strip:** 114px tall, between hairlines, with a small 13px lead-in line. Logos use their original colors or are inverted, so dark artwork can sit on light backgrounds.
- **Logo grid + quote:** a 3×2 grid of 150px cells with hairlines, beside a 28px quote and a 44px round avatar.
- **Job list (on dark):** role on the left, location on the right, with hairlines and 16px padding.

### Navigation and footer

- **Top bar:** 29px tall, right-aligned phone and email, 13px, with a line beneath.
- **Main nav:** sits over the hero photo. Logo on the left, links in the middle (36px apart), action button on the right.
- **Nav looks:** transparent with paper text only at the top of the homepage. Everywhere else, and whenever a dropdown is open, it is paper with ink text.
- **Nav on scroll:** scrolling down hides it, and scrolling up brings it back in the paper look.
- **Active page:** orange text, including on paper, by explicit request. This is the one exception to the orange text rule above.
- **Dropdowns:** Services, Solutions and Locations open on hover, under a 2px orange line. Built from the "Navigation states" page in Paper.
- **Nav line:** a 1px hairline runs under the logo row, at 40% opacity on dark and hidden while a dropdown's orange line is showing.
- **Mobile and tablet (below 1100px):** phone and email together on the right of the top bar, then the logo and menu button. From 768px, the action button sits next to the menu button. The menu is a full-screen asphalt page with the five main pages and an orange action button.
- **Mobile menu motion:** six horizontal stripes wipe across, starting at the bottom and working up, until the screen is solid. They leave from the top down when closing.
- **Footer:** paper background, 72px top padding and 40px bottom. Logo and tagline, then link columns (12px between items, 80px between columns), then a line above the legal row. Links are stone and turn ink on hover.

---

## Photography

- Real crews, vehicles and roads in the Pacific Northwest. No stock-looking office or handshake images.
- Hero photos get an ink overlay at 72%. Cards get a black overlay at about 53%.
- Check that text over a photo stays readable. Never put text on an image without an overlay.

---

## Do and don't

**Do**

- Use tokens for every color.
- Keep one orange moment per view.
- Keep corners square by default.
- Separate things with lines, background changes and space.
- Write in specifics, like the frame does: "Tell us where and when. You'll have a price within the hour."

**Don't**

- Add shadows, gradients, blur or decorative shapes.
- Put white text on orange, or orange text on paper or canvas.
- Introduce another font or accent color.
- Use bold (700+) headlines.
- Round buttons or image cards.
- Use type below 12px.

---

## Where the frame is inconsistent

These look like leftovers or mistakes in the frame. New work should follow the "Use this" column rather than copying them. A designer may want to confirm or fix these in Paper.

| In the frame | Use this | Why |
|---|---|---|
| Orange eyebrows on paper and canvas | Burnt orange on paper, stone on canvas | Fails contrast, and breaks the token's own rule |
| Footer links `#B4B3AC` and `#8C8B84` on paper | Stone | 2:1 and 3.3:1, hard to read |
| Job list locations in stone on asphalt | `#B4B3AC` | 3.1:1, hard to read |
| "Working with us" and Locations text set in the default system font | Geist | The file's fonts are Geist; these are the only sections that differ |
| Locations headline 45px line height with no tracking | 48 / 58, -0.04em | The other 48px headlines use 56–58px |
| Hero headline line height 76px, and 12px hero buttons with 12px side padding on the orange one | Keep in the hero only, built exactly as the frame by request. Use 48 / 58 and 14px, 26px padding elsewhere | These hero values aren't the standard for other sections |
| Complex project: 447px paragraph inside a 403px text block (Quick job's block is 416px) | Same text width in both columns | The paragraph overflows its block, and the two columns don't match |
| Olive-grey lines on light surfaces (feature list, footer) | Keep for the feature list; hairline in the footer | The token is meant for dark sections |
| Token note mentions "nav pills", and inactive tabs carry a 999px radius | Square | Everything visible in the frame is square |
| Spelled "TrafficCorp", "TraffiCorp" and trafficorp.com | **Needs a decision** | See below |

### Not defined in this frame

Nothing here covers the following, so ask or check Paper before inventing them:

- Phone and tablet layouts, apart from the navigation
- Hover, focus and pressed states, apart from the navigation
- Form fields, apart from the estimate form (`components/estimate/`), which follows the "Estimate configurator" page in Paper
- Motion, apart from the navigation, the hero, the estimate form (the mobile menu's stripes in asphalt, below the stepper only) and homepage sections (each part of the content fades in and rises 20px over 700ms the first time that part scrolls into view; backgrounds stay still)
- Correct spelling of the company name

---

## Using this in code

This project uses Tailwind v4. The block below is in `app/globals.css`, so these colors are available across the site.

```css
@theme {
  --color-ink: #141413;
  --color-stone: #6b6a65;
  --color-hairline: #e3e2dd;
  --color-canvas: #edece8;
  --color-paper: #fafaf8;
  --color-asphalt: #1d1e1a;
  --color-olive-grey: #3a3c34;
  --color-orange: #f7941d;
  --color-burnt-orange: #a8550a;
  --color-cone-tint: #fdebd6;
}
```

Geist and Geist Mono are loaded in `app/layout.tsx`.
