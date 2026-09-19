# UAG Entertainment — Interactive Website

A React + Vite concept redesign inspired by the high-interaction, editorial feel requested for UAG Entertainment.

## Run locally
```bash
npm install
npm run dev
```

## Build
```bash
npm run build
```

## Replace placeholders
- Put the hero reel at `public/media/uag-hero.mp4`.
- Replace `Placeholder` components in `src/main.jsx` with approved images.
- The roster profile modal is designed for 4 images per artist/model.
- The event modal is designed for 6 images per event.
- Placeholder biographies / event facts are clearly marked where source information was missing.

## Main interactions
- Fullscreen opening video with oversized UAG VIDEO typography.
- Animated scroll-led home layout.
- Black-and-white talent grid that reveals color on hover.
- Artist/model profile overlays with galleries and social links.
- Draggable, zoomable event “web” with clickable nodes and six-image event galleries.
- Redesigned Press & Media index.
- “Unscripted with Priscilla” podcast page.
- Services + contact form combined on one page.

This is a front-end concept. Connect the form, CMS, analytics, media hosting, accessibility QA and press & media image optimisation before launch.


## Visual system update
- UAG natural palette: dark brown, black, grey, beige and cream.
- Hero title changed to **United Artist Group**.
- Added interactive cursor, scroll progress, orbit/grid hero treatment, floating editorial canvas, richer hover transitions and motion-led cards.
- Navigation uses the UAG logo URL supplied by the client. For press & media, download the approved logo to `public/media/uag-logo.png` and swap the image `src` to the local file.

## V4 interaction / visual update
- Services “BOOK / ENQUIRE” buttons now smooth-scroll to the Work With UAG contact section.
- Press arrow actions now move to Media Enquiries.
- Hero “Discover” arrow scrolls into the site.
- Added GSAP + ScrollTrigger and Lenis for smooth scrolling, reveal animation, parallax, cursor response, magnetic buttons and scroll-linked image movement.
- Subpage intros are intentionally shorter and typography has been reduced.
- Palette is now near-monochrome: black, charcoal, stone grey, beige and off-white.
- Headline font changed to Bodoni Moda with Manrope for body text.

## V5 update
- Navigation logo is rendered through a transparent-background helper. It samples the supplied logo image background in-browser and removes matching pixels when CORS permits, with a monochrome blended fallback.
- More breathing room after the homepage hero.
- Social buttons are equal-size grid cells.
- Event universe rebuilt with p5.js: cursor-driven camera travel, smooth inertial movement, animated nodes, responsive network lines, wheel zoom and clickable event nodes.
- Additional GSAP pointer tilt added to talent, team and press cards.

## V6 update
- Whole site moved to a darker UAG aesthetic: black, charcoal, muted stone and beige.
- UAG logo now appears in the footer as well as the navigation.
- Service enquiry flow is stateful: clicking BOOK / ENQUIRE sets that exact service in the contact dropdown before scrolling to Work With UAG.
- Contact email subject/body also include the selected service automatically.
- Services redesigned as a split-screen interactive experience with a sticky live preview, animated active rows and moving service marquee.
- Added a cursor-following ambient backdrop for more depth across all pages.

## V7 polish
- UAG Universe media is now contained in a responsive editorial grid so every image remains fully inside the section.
- All belt/marquee sections now use two identical moving groups for a seamless continuous loop.
- Subpage description copy directly beneath headings is smaller and more refined.
- Display typography changed to Cormorant Garamond for a softer luxury/editorial feel.

## V8 update
- Page descriptions now sit directly inside each page hero, including About; removed the extra standalone description blocks.
- Page descriptions are smaller, left-aligned, and span horizontally rather than appearing as a narrow interrupted block.
- Events p5.js universe enlarged to 88vh with wider travel range, stronger/brighter connecting lines and larger nodes.
- UAG Universe rebuilt as an overlapping interactive collage with cursor parallax, hover zoom, depth layering and responsive mobile fallback.

## V9 update
- UAG Universe now uses a full-height mosaic that fills the available visual column.
- Marquee/ticker belts use four repeated groups and never pause on hover.
- Priscilla Cortese and Executive Team portraits begin black-and-white and reveal slight colour + zoom on hover.
- Footer logo is smaller.
- Added official UAG Instagram and TikTok links to Contact and Footer.
- Talent biography placeholders have been replaced with researched or carefully grounded profile copy.

## V9.1 update
- Christopher Rudolph Instagram updated to https://www.instagram.com/chrisreindeer/

## V10 update
- Events web now takes over the full viewport immediately after the page hero.
- Clicking an event triggers a visual zoom/focus state and opens an immersive information layer with a six-image gallery.
- Footer now groups Instagram/TikTok in one column and Email/Call in another.
- Sydney NSW, Australia is styled as muted non-interactive location text.
- Footer logo and brand description are grouped together and vertically aligned.

## V11 update
The home page now includes a scroll driven United Artist Group story with one animated word per full screen moment.
The UAG Universe is now a selectable category canvas with a central information card and four animated image frames.
Artists and Models now use an interactive roster browser with previous and next controls, names on every card, and the existing profile gallery, biography and social links on selection.
Rendered prose descriptions are cleaned so dash characters do not appear in descriptive copy.

## V11.1 refinement
The United Artist Group scroll sequence now has stronger scale, blur, horizontal drift, spacing changes and a vertical progress rail.
The UAG Universe remains a four image category canvas around one central information card.
Artists and Models remain button controlled roster browsers with clickable profiles, four image detail grids, biographies and social links.
Descriptive copy is normalised to avoid dash punctuation.

## V12 update
United Artist Group scroll storytelling now uses distinct motion languages for each word. United uses ripples and soft light. Artist uses kaleidoscope shards and reveal motion. Group uses perspective zoom and luminous depth.
UAG Universe now pins for multiple viewport lengths and uses four stacked central cards. Scrolling advances one card at a time before leaving the section. The four surrounding images sit in dedicated side grids and do not overlap the central card or one another.
Artists and Models now use a curved orbital carousel. Arrow buttons below the roster rotate the active profile through the circle. Clicking the active portrait opens the same profile gallery, biography and social links.

## V12.2 critical parser repair
Restored the About component that had been accidentally truncated by the V12 source transformation.
Rebuilt the circular TalentGrid component with parser safe JSX and explicit orbit calculations.

## V13 update
Footer description is now explicitly left aligned to the logo.
United Artist Group storytelling now includes live p5.js motion that responds continuously to page scroll and pointer position.
United uses expanding wave fields and ripple motion.
Artist uses a continuously changing kaleidoscope line system.
Group uses moving perspective tunnels and radial zoom lines.
UAG Universe images animate into place whenever the active scroll category changes and scale gently on hover.
Spotify and TikTok now use distinct custom SVG marks.
Talent profile image galleries now use a completely flush two by two grid with no row or column spacing.
Carol Ferrone has been added to the About page as a public figure with Instagram and TikTok links.

## V13.1 update
Added a small amount of space between the UAG circle roster and its description.
Removed the remaining static decorative story artwork and expanded the live p5.js animation systems for United, Artist and Group.
United now has denser moving ripple fields, wave lines and orbiting particles.
Artist now has continuously rotating layered kaleidoscope geometry and particles.
Group now has a deeper animated perspective tunnel, radial lines and streaming points.
UAG Universe image groups now remount and replay their pop in animation on every category change, including Artists and Models, in either scroll direction.
Universe image hover zoom remains active.

## V13.2 update
Removed the duplicate standalone Public Figure Carol Ferrone section from the About page so Carol appears only once.

## V13.3 update
Carol Ferrone has been added back to the About page as one single editorial feature matching the Priscilla section, with her portrait on the left and copy on the right.
The footer description is positioned directly below and left aligned with the UAG logo.
Artist and Model roster descriptions now sit slightly lower beneath the circular roster.

## V13.4 update
Increased the visual prominence of the live p5.js animation behind United, Artist and Group while keeping the typography readable.
Rebuilt the footer brand block as a clean single-column layout so the description sits neatly beneath the UAG logo with no overlap or excessive left offset.

## V13.5 update
Carol Ferrone now appears after the Executive Team section.
Her description is on the left and her image is on the right.
The footer description has been removed completely and the footer has been shortened for a cleaner finish.

## V13.6 update
Further reduced footer height and removed excess vertical spacing.
Changed the Home four-part grid label from Services to Press & Media.
Priscilla Cortese and Carol Ferrone portraits now start in black and white and transition to colour with a slight zoom on hover, matching the executive team portrait behaviour.

## V13.7 update
Talent profile popup is now smaller, fully visible, centred, and layered above all navigation and page elements.
The Home hero is slightly taller for a stronger banner feel.
UAG Universe category buttons now scroll the pinned card stack to the matching card, keeping the central card and surrounding imagery synchronized.
The Home grid now links Press & Media instead of Services.
The footer has been compressed again with explicit overrides removing legacy minimum height, excess gaps, large margins, and decorative empty space.

## V13.8 update
Added a small amount of balanced breathing room above and below the compact footer.
Vertically centred Priscilla Cortese's text content against her portrait.
Added subtle spacing between UNITED and its description on the Home story sequence.
Removed the UAG Universe category buttons completely while preserving the scroll-driven card and image sequence.

## V13.9 update
Slightly increased the spacing between UNITED and its description.
Added more balanced breathing room above and below the footer.
Kept Raw Conversations together on one line in Live Now.

## V14 update
Changed Raw Conversations to title case while keeping the two words together.
Converted the Unscripted with Priscilla reel artwork area to a square image treatment.
Increased the separation between UNITED and its description.
Added more balanced top and bottom breathing room to the footer.

## V14.1 update
Corrected the footer spacing interpretation. The added breathing room now exists only inside the footer itself, above its first content row and below its last content row. No extra spacing or margins were added between the footer and surrounding sections.

## V14.2 update
Increased the visual separation between UNITED and its description.
Added a little more internal top and bottom breathing room inside the footer only.
Synchronized the four UAG Universe images to the exact scroll timing of their respective stacked card. Image swaps now use the same progress boundaries as the card transitions, with faster synchronized entrance animations to prevent visual lag.

## V14.3 update
Restored and explicitly preserved the header, eyebrow and description at the top of every internal page.
Smoothed the four-image UAG Universe transitions with gentler scale, movement, easing and longer fades while keeping them synchronized to their respective cards.
Reduced the UNITED, ARTIST and GROUP story typography slightly.

## V14.4 update
Restored and explicitly preserved Priscilla Cortese and Carol Ferrone descriptions.
Slowed and softened the UAG Universe four-image entrance animations.
Added more internal breathing room above and below footer content only.
Adjusted the selected-event collage so images use contained framing and are not cropped by the collage layout.
Reduced unnecessary empty space in static content sections while leaving the immersive hero, UAG story, UAG Universe and event canvas scroll mechanics intact.

## V14.5 update
Changed the selected-event experience to a single event image on the left with previous/next image controls and event description on the right.
Restored the Executive Team heading, Home featured-event copy, Press & Media contact content, and the left-hand Services enquiry content by removing reveal-state dependencies.
Restored the fuller Press & Media contact section and two-column Services enquiry layout.

## V14.6 update
Reordered the Services enquiry contact details to Email, Phone, Instagram, TikTok, then Location.
Made the UAG Universe image entrances slightly quicker while preserving the smooth floating pop motion.
Added a subtle editorial border, inset line and soft depth to the four UAG Universe images.

## V14.7 update
Changed the Services page label from Press & Media & Distribution to Production & Distribution.

## V14.8 update
UAG Universe now uses an explicit active-category object so all four surrounding images remount and change together with the active Artists, Models, Events or Press & Media card.
Refined the image entrance into a smooth floating upward pop with gentle scale and rotation.
Changed the four image frames to a dark editorial border with subtle depth.

## V14.9 update
Changed the UAG Universe imagery from a scale pop to a smooth fade-in.
The four images retain a very subtle floating settle while fading, and remain explicitly synchronized to the active Artists, Models, Events or Press & Media card.

## V15 update
Changed UAG Universe category imagery to a true opacity-only fade. The images no longer scale, rotate or move into place; each new four-image category set starts invisible and slowly appears.
Added an interactive Brand Collaborations section after UAG Universe and before the four homepage navigation tiles. It includes two moving brand streams, hover/focus image preview, click-to-open editorial collaboration panels, and responsive styling.
Brand names use the currently established UAG brand list. Collaboration project, talent and year specifics remain unfilled until approved information is supplied.

## V15.1 update
Made the UAG Universe image fade-in faster while keeping it as a true opacity-only fade.
Changed the homepage 2x2 Artists / Models / Events / Press & Media grid to a light palette that turns dark on hover.
Removed the continuous word strip from the homepage.

## V15.2 update
Strengthened the homepage 2x2 navigation tile hover state: each tile is light by default and turns pure black on hover/focus, while its title, label and arrow switch to a light colour.

## V15.3 fix
Fixed the homepage 2x2 tile hover conflict caused by an older sliding ::before overlay.
Tiles are now light by default and a black overlay fades in on hover/focus, with all text and arrows switching to light colours.

## V15.4 update
Moved the arrows in the homepage Artists / Models / Events / Press & Media tiles below the title text.

## V15.5 update
Upgraded the p5.js treatment behind UNITED / ARTIST / GROUP to be more visible and cinematic.
UNITED now has brighter expanding wave rings, a denser particle constellation and live flowing signal lines.
ARTIST now uses a stronger multi-layer rotating kaleidoscope with diamond geometry, rings and orbiting particles.
GROUP now has a deeper perspective tunnel with more frames, radial beams and streaming particles.
All three effects react more noticeably to pointer position while staying behind the typography.

## V15.6 — full image implementation
All image placeholders are now wired to the agreed `/public/media/` filenames. Add the real files using `public/media/_IMAGE-NAMING-GUIDE.txt` and they will appear automatically. Missing assets retain the existing designed placeholder instead of breaking the layout. The homepage hero now also uses `/media/uag-hero-poster.jpg` as the video poster.

## V15.7 — Unscripted photo correction
The Unscripted with Priscilla media has been corrected to a still square photograph. The play button has been removed and the expected file is now `/public/media/podcast/unscripted-with-priscilla.jpg`.

## V15.8 — Unscripted image loading fix
The Unscripted with Priscilla still image now tries JPG, JPEG, PNG and WEBP versions automatically, including the previous `-cover` filename. CSS for this photo is isolated so older global placeholder rules cannot hide or distort it.

## V15.9 — universal image loader
Every required still image now automatically tries `.jpg`, `.jpeg`, `.png` and `.webp`. Existing folder paths and basenames remain unchanged. The loader falls back to the next extension if a file is missing or fails to decode, then shows the designed placeholder only if no supported version exists. The homepage hero poster now uses this same loader.

## V15.10 — universal colour-on-hover imagery
Every still image across the site is now black and white by default and transitions to full colour on hover, with a subtle zoom. This applies to homepage imagery, UAG Universe, collaborations, artists, models, team, events, press and Unscripted with Priscilla. The hero video/poster is excluded.

## V15.11 — performance optimisation
This build keeps the visual design and colour-on-hover treatment while reducing scroll work:
- removed the per-image scrubbed GSAP parallax that created a ScrollTrigger for every placeholder;
- removed blur from scroll-driven reveals;
- reduced p5 canvas pixel density and particle workload;
- p5 canvases pause automatically when off-screen;
- replaced repeated mousemove GSAP tween creation with `quickTo`;
- removed continuous card tilt/media mouse tracking;
- retained essential UAG story, Universe, event, hover and pinned interactions;
- added paint containment/content-visibility hints for large image-heavy sections.

## V15.12 — crisp homepage titles + reliable original-colour hover
Homepage category titles are explicitly protected from blur/filter/transform effects. All real still-image wrappers are forced to `filter:none`, while the image itself begins grayscale and switches to the original uploaded colour on direct hover or relevant parent-card hover. This prevents legacy placeholder filters from keeping images black and white.

## V15.13 — definitive B&W hover + sharp ARTIST
The ARTIST P5 word no longer starts with a GSAP blur and is protected from blur/filter effects in CSS. All still media images now use one final high-specificity rule: grayscale by default and `filter:none` on hover so the source file's original colour is shown exactly.

## V15.15 — content-only additions
Added Georgie Martin to the existing Models/Talent roster with the supplied Instagram link, plus Napoleon Perdis Event, Logitech MX Event, and Weleda Event. No design, CSS, animation, layout, typography, or existing content changes were made.
