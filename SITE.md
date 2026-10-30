# TrafficCorp

> Tagline to come, once setup questions are answered.

## About This Site

**Primary Goal:** Not decided yet
**Target Audience:** Not decided yet
**Problem We Solve:** Not decided yet

## Brand Identity

The full visual rules are in `DESIGN.md`. The exact spelling of the company name still needs to be confirmed.

- **Fonts:** Geist for sentences and headlines, Geist Mono for labels and buttons
- **Colors:** Listed in `DESIGN.md` and available to the site. The starter page still uses the starter colors.

## Pages

- **Homepage** (`/`) - Hero, trusted-by logos, services, "How it looks working with us", customer stories, the two-path call to action, locations and "Join our team".
- **Estimate** (`/estimate`) - A three-step form: what you need, your details, review and send. It ends on a "Request received" confirmation. **Nothing is sent or saved yet**, so requests made here don't reach anyone until it is connected to email or another system.

## Components

- **Estimate form** - The stepper stays in place while paper-colored stripes, timed like the mobile menu, wipe everything below it between steps. Includes a searchable service list, a date calendar, required-field messages and a summary on steps 2 and 3. Prices aren't shown.

- **Button** - One button with five looks: `nav` (small dark button for the top menu), `primary` (solid orange, for the most important action), `secondary` (outlined in white, for dark sections and photos), `dark` (solid near-black, for considered actions on light backgrounds) and `light` (solid off-white, for actions on dark sections). It comes in a small size and a large size for main section actions. Each look changes color on hover. Used in the two-path call to action.

- **Two-path call to action** - Two side-by-side options on a light grey background: "Quick job" with an orange estimate button, and "Complex project" with a dark "Schedule a call" button and a phone link. They stack on phones and tablets. The "Schedule a call" page doesn't exist yet.

- **How it looks working with us** - Three features on the left. Each one plays for 5 seconds, shown by a thin orange bar on its top line, then the next starts automatically. Pressing one jumps to it. Each changes the photo and plays its animated interface: a notification pop-up, today's work zones, and a message from the account manager. The sites, times and messages are sample content.

- **Customer stories** - A centered heading above a grey panel with six customer logos and a quote. Pressing a logo shows that company's testimonial. All logo cells are the same height and logos resize to fit them. Only the Poe Asphalt quote has real wording; the other five are placeholders, and all names, job titles and photos are still placeholders.

- **Locations** - A heading above three cards with an aerial photo for Coeur d'Alene, Boise and Spokane. Each card links to that location's page.

- **Join our team** - A dark section with a careers heading, three open roles and an "Apply now" button that opens the TraffiCorp job board on BambooHR. The TraffiCorp careers video from Vimeo plays on the right, or below the text on phones and tablets.

- **Footer** - Appears on every page. Logo and tagline, Services and Company links, contact details, then the copyright and certifications at the bottom.

## Recent Changes

- 2026-10-30: Accessibility and speed pass: added a "Skip to content" link, a Pause button on the feature list, readable inactive features, larger menu arrows, clearer required fields in the estimate form, smaller images, and a proper page title and description
- 2026-10-30: The stripes between steps in the estimate page are now the paper color instead of dark green-grey
- 2026-10-30: Homepage sections below the hero now gently fade and rise into place the first time they scroll into view
- 2026-10-30: Added the three-step estimate form at `/estimate`, with a stripe transition between steps and a confirmation at the end
- 2026-10-30: Headings in the Solutions and Locations menu dropdowns now match the style of the Services dropdown
- 2026-10-30: Added the footer to every page and removed the temporary blank section from the homepage
- 2026-10-30: The "Schedule a call" button now opens a "coming soon" page instead of a "page not found" error
- 2026-10-30: "Quick job" and "Complex project" labels are now orange
- 2026-10-30: Added a hover effect to every look of the button, matching the buttons in the hero
- 2026-10-30: Added the "Join our team" section with the careers video below locations, plus a light look for the button
- 2026-10-30: Added the locations section to the homepage, in the same order as the design
- 2026-10-30: Added the two-path call to action to the homepage, below customer stories, plus a dark look and a large size for the button
- 2026-10-30: Customer stories logos now sit in equal-height cells, and pressing a logo shows that company's testimonial
- 2026-10-30: New background photos in "How it looks working with us": a pilot car for Notifications and a crane at a railroad crossing for One account manager
- 2026-10-30: Added the customer stories section to the homepage, below "How it looks working with us"
- 2026-10-30: Features in "How it looks working with us" now move on automatically every 5 seconds, with an orange timer bar
- 2026-10-30: Added the "How it looks working with us" section with three animated interfaces
- 2026-10-30: Mobile menu now has a paper background with ink text. Services, Solutions and Locations open as dropdowns, each starting with an "All..." link, and the arrows are gone
- 2026-10-30: Created the button in its three looks and added the brand colors to the site
- 2026-10-30: Installed Geist and Geist Mono and made them the site's fonts, replacing Space Grotesk and DM Sans

## How to Customize

- To change a feature's text or photo: edit the list at the top of `components/WorkingWithUs.tsx`
- To change the customer quote or logos: edit the lists at the top of `components/CustomerStories.tsx`
- To change a location's text or photo: edit the list at the top of `components/Locations.tsx`
- To change the open roles, video or apply link: edit the top of `components/JoinOurTeam.tsx`
- To change the services or shifts in the estimate form: edit the lists at the top of `components/estimate/estimateData.ts`
- To change the estimate form's wording or stripe color: edit `components/estimate/EstimateConfigurator.tsx`
- To use the label font: add the `font-mono` style to a piece of text
- To use the main font: nothing needed, Geist is the default everywhere
- To change how a button looks: edit the looks at the top of `components/Button.tsx`
- To change the call to action wording or links: edit `components/TwoPaths.tsx`
- To change the footer's links or text: edit `components/Footer.tsx`
- To change the section appear animation: edit the "Homepage sections on appear" part of `app/globals.css`
