# Northside Voice: Playground and Console

Clickable prototype for the "Appointment Reminder Voice Agent" design challenge. Northside Health, a fictional clinic group, runs an AI voice agent that calls patients 24 to 48 hours before an appointment to confirm, and reschedules on the call. Playground is where an engineer builds and tests the agent. Console is where front-desk staff monitor it.

Plain HTML, CSS and JavaScript. No build step, no dependencies. Open `p01-templates.html` in a browser (`index.html` redirects there). All paths are relative, so the folder works from `file://` or any static host.

## Personas
- **Sam, 31, integration engineer.** Uses Playground. Reads JSON fluently, cares about latency and failing scenarios.
- **Teresa, 47, front-desk operations lead.** Uses Console. Not technical. Needs to know which patients need a human, fast.
- **Maria, 59, patient.** Never sees a screen. Every decision on these screens decides whether she shows up at the right time.

## File map
| File | What it is |
|---|---|
| `p01-templates.html` | Choose a template. Card grid, details drawer. |
| `p02-configure.html` | Edit instructions, models, functions, variables, guardrails (5 tabs). On Instructions every line is its own field: the greeting, the role line and each numbered rule. Click the text to edit it in place (Enter saves, Esc cancels, Insert Variable chips under the open field); one field is open at a time. Rules reorder by the grip (drag, or arrow keys on the grip), and Add Rule appends one. |
| `p03-live-call.html` | Test call in two states on one page. While live, the bottom dock holds only the Live badge, clock, waveform, Mute Agent and End Call. End Call flips the same page to Ended: the dock becomes a scrubber (play, skip 10 seconds) with a Run Test Scenarios button. The left panel shows call state, response time and guardrail statuses. |
| `p03-alt-wrong-person.html` | The same template, already ended: a call where a guardrail held (wrong person answered). |
| `p04-scenarios.html` | Test scenarios and results. Run All Scenarios and Re-Run Failed animate the Result column. A verdict banner (Not Ready To Deploy) leads, then filter chips, search and CSV download, then the table. A scenario name opens a detail drawer (expected, actual, function call, transcript excerpt, prompt fix). One scenario fails by design. |
| `c01-deploy.html` | Deploy rules on one page with a step list on the left: Calendar Source, When To Call, If No One Answers, Caller ID & Hand-Off. The primary Review And Deploy button in the header opens a modal (the point of decision): your rules with Change links, the summary, the failed-test warning and acknowledgement checkbox, the PHI policy, then Deploy v7. Deploy is gated by the checkbox, which names who acknowledged. It reads Test Scenarios' last results (not-run count) and, once deployed, shows a v7 Is Live state with who and when, in place. That state is not kept: reloading C01 starts the deploy fresh (Overview still shows "deployed just now" once). It is a Console screen (C01, "Deploy & Monitor in Console") that Sam reaches from P04's Deploy To Console, so it shows the Console nav but keeps whoever is signed in (Sam from P04, or Teresa). |
| `c02-overview.html` | Console overview: the no-show rate leads (40px number on its 12-week trend chart, with the change against before the agent), then four outcome tiles (Calls Placed gradient bars, Confirmed ring, Rescheduled one square per call with failed writes outlined, Unreached retry funnel), then the Needs Attention queue (framed like the chart, a chevron per row). The date range animates the no-show number and the tiles, and slides a shaded band over the part of the fixed 12-week line it covers (Today the last point, 7 Days the last week, 30 Days back to mid-September). Each queue row says how soon the patient's visit is. "Deployed just now" shows once after a deploy. |
| `c03-call-log.html` | Filterable call log with outcome chips, search, Export CSV and Load More. Calls without a full page open a preview drawer with the reason and the next step; `?tab=review&open=call_id` opens one directly (the Overview queue links this way). |
| `c04-call-detail.html` | A successful reschedule, end to end. Step list: Calendar Change, Checks (what the agent said against what the systems did), Transcript (end to end, with the docked player), Identity, Function Calls, Audit Log, Call Quality. |
| `c04-alt-needs-review.html` | The same failure reaching a patient. Step list: The Problem (headline leads, times in the explanation jump to the moment), Checks (2 of 4 failed), The Evidence (opens at 1:44 as in the brief, earlier turns fold above and open when the playhead goes earlier), Resolution, Identity, Function Calls, Audit Log, Call Quality, For Sam. Resolving (or "Patient Not Affected? Mark Reviewed", the flow's No branch) stays on the page, which reloads into the resolved state: What She Will Hear next to Calendar Right Now, marked Calendar Matches or Waiting For Maria. It also removes the call from the queue, adds an audit line, and sets Maria's row on C03 to the chosen outcome. |
| `notes.html` | Design notes: type scale, mono rule, reading order, color logic. |
| `northside.css` | All tokens and shared components. |
| `shell.js` | Left nav, user switcher (Sam sees Playground, Teresa sees Console), toast, demo state, tab helper. |
| `icons.js` | SF Symbols as inline SVG strings, `window.NSI`. |
| `fonts/` | Inter and Roboto Mono, bundled. |
| `assets/user-flow.svg` | The user flow diagram shown on the notes page. |
| `_source/` | Brief annotations and element checklists extracted from the design file. Not needed to run the prototype. |

Page-specific CSS and JS live inline in each page. Shared components belong in `northside.css`.

## Navigation
Playground: P01 Templates, P02 Configure, P03 Test Call, P03-alt Test Call Alt, P04 Test Scenarios. Console: C01 Deploy, C02 Overview, C03 Call Log, C04 Call Detail, C04-alt Needs Review. Deploy is in the Console nav only, as in the brief.

## The flow
P01 pick a template, P02 configure, P03 test call, P04 scenarios (scenario 3 fails), C01 deploy (must acknowledge the failure), C02 overview, C03 call log, C04-alt the same failure reaching Maria. Resolving it in C04-alt removes it from the queue and drops the counts from 6 to 5.

## Design rules
**Components come from the Wireframe Kit.** Buttons, badges, chips, fields, toggles, tabs, nav items, metric cards, bubbles, function blocks, variable chips, the waveform and annotation markers use the kit's radii, borders and fills (see the top of `northside.css`). Anything the kit lacks (table, banner, option card, checkbox, segmented control, disclosure, toast, chart) is derived from the kit's own borders and radii. Do not introduce new radii or a new accent color.

**Layout follows an existing admin-UI pattern:** left nav, page header with a hairline divider, main column plus a sticky right rail, slide-out drawers for details.

**Status is encoded by form, never by color alone.** Filled = done or passed. Outline = changed. Dashed = absent or not run. Muted fill = passive. Heavy outline with a "!" = needs a person. Color only confirms the form, and it comes from the Northstar palette (go green `#1D6A4E`, soon slate `#2E5873`, stop rust `#8A3A22`, link and selection teal `#146F6A`). Green and rust have almost the same luminance, so never let color alone carry a status. There is no Low fidelity mode any more, but the rule stands: every status needs text and a distinct form, so it reads for someone who cannot tell the colors apart.

**Typography.** Inter for language, Roboto Mono for machine strings. Seven text styles plus mono: Display 40/44, Title 28/32, Headline 20/24, Heading 16/24, Body 14/20, Caption 12/16, Eyebrow 12/16 caps, Mono 12/16. Use mono only for text a machine produced that a developer might copy or compare: function names, args and results, status codes, latencies, IDs, `{variables}`, transcript timestamps. Never for anything a person said or wrote, and never for buttons or labels.

**Choosing between chips, tabs and segmented controls.** Chips filter one list or grid in place (P01 categories, C03 call outcomes). Underline tabs switch between sections that show different content (P02 sections, C04 transcript / function calls / audit log). The segmented control picks one value of a setting that rescopes a page (C02 date range). Do not mix them for the same job.

**Selecting among a few options.** Use option cards (`.opt` with a title and a one-line description) when there are four options or fewer and each needs explaining (P02 speech-to-text and LLM, C04-alt resolution). Use the kit select for long or self-explanatory lists (P02 voice and language). The selected card uses `--sel` teal `#146F6A` with the `--sel-bg` tint `#E6F2EF`, taken from the Northstar palette.

**Detail panels are drawers.** P01 template details, the P02 Agent Summary, the P03-alt Checks (from the banner or Scenario check in Call State) and the C03 call preview open in a right-hand drawer (460px) over a dim layer. Keep the drawer outside the page container so `inert` on the page does not disable it.

**Spacing and sizes** use even pixels only (4s preferred, 2s allowed). No fractional rem.

**Color is for one thing at a time.** The alert color (rust) marks `!` badges and at most one prominent surface per page (the P04 verdict banner, the C04-alt Problem card). The P04 verdict banner uses `--alert-wash`, a rust tint spread evenly top to bottom. The C04-alt Problem card is a rust border on plain white. Everything else uses weight, a dark outline, strikethrough or a badge. No pink row fills, no pink boxes inside pink boxes.

**One container per idea.** A card never holds another bordered or filled card. Inside a card use hairlines and columns. The C02 metric tiles and chart tray are the one framed exception, taken from a reference video.

**Pages with several sections** (C01, C04, C04-alt) show every section on one page with a sticky step list on the left. A click jumps straight to the section, scrolling moves the highlight, and each item carries a one-line summary. Section cards use `.pn` with `.pn-h` and `.pn-b`.

**Call player row.** Every dock (P03, P03-alt, C04, C04-alt) is one row, after ChatKit's: back 10, play, forward 10, the playhead time, the waveform, the total, then any call actions. The waveform takes the width that is left and rebuilds its bars when that width changes (`.pbar` in `northside.css`).

## Copy rules
- No em dashes in UI copy. Use commas, periods or restructure. An em dash as an empty-value placeholder in a table cell is fine.
- Title Case for buttons, titles, drawer headers, headings and tab labels. Articles (a, an, the) stay lowercase. Sentence case for prose, hints and placeholders.
- The middle dot (`·`) is for compact metadata only (`Oct 13, 2026 · 10:04 AM`). Never join clauses with it and never use it inside menu or list rows.
- Tone: reassuring, not alarming, even when something has gone wrong. Plain words for people, exact values for machines.

## Accessibility (WCAG 2.2 AA is a hard requirement)
- Contrast is computed from the tokens and listed on `notes.html`. Secondary text is `#626262`, not the kit's `#6B6B6B`, because the kit gray is 4.47:1 on its own muted fill.
- Edges of interactive controls use `--control` `#8C8C8C` (3.4:1). The kit's `#D1D1D1` (1.5:1) is kept for card hairlines only.
- Real elements: buttons are `<button>`, links are `<a>`, tabs use `role="tablist"`, switches use `role="switch"` with `aria-checked`, option groups use `role="radiogroup"`. No clickable `<div>`s.
- One `<h1>` per page, `<h2>` for sections, tables have a visually hidden `<caption>`.
- Focus is a single solid 2px ring (`:focus-visible`). Honor `prefers-reduced-motion`.
- Drawers and dialogs: put them outside any element you mark `inert` (a drawer inside an inert container is dead), return focus to the opener on close, close on Escape, the X and a click outside.
- Known gap: contrast was checked by calculation only. A screen reader pass and an automated audit have not been run.

## Shared JavaScript (`shell.js`)
Exposed as `window.NS`.
- `NS.ico(name, cls)`, `NS.chev()`, `NS.chevd()`, `NS.check`, `NS.play`: icon strings.
- `NS.wave(n, played)`: waveform bars in kit proportions.
- `NS.player({wave, play, back, fwd, time, dur, pos})`: the call recording player (scrubbable waveform with playhead, play or pause, back and forward 10 seconds). Returns `{ seek(seconds) }`.
- `NS.stepNav({el, steps, sums, warn, groups})`: the sticky step list for a page of stacked sections, with instant jump and scroll highlight. `groups` puts a small label above an item (C04-alt: For Teresa, Details).
- `NS.toast(msg)`: top-center status message (`role="status"`).
- `NS.tabs(listEl, onChange)`: roving-tabindex tab behavior with arrow keys.
- `NS.bindToggles(root)`: toggles marked `data-toggle`.
- `NS.get(key, default)` / `NS.set(key, value)`: localStorage under the `ns:` prefix.
- `NS.reviewCount()`, `NS.isResolved(id)`, `NS.resolve(id)`: demo queue state. The seeded count is 6 and the resolvable call is `call_3c71d0`.
- `NS.user()`: the signed-in person's name.
- `NS.reset()`: clears resolved calls, `deployed`, `ack`, saved resolutions, Test Scenarios run results (`scn`) and the view settings. The nav's Reset Demo link calls it.
- Query param: `?ann=on|off` shows or hides the brief annotations. There is no control for it in the nav; it persists until changed or until Reset Demo. (The old `?fi=low` grayscale mode was removed.)
- `p01-templates.html#open=reminders` opens a template's details drawer.

Each page declares `<body data-product="play|cons|ref" data-nav="p01">` (`ref` shows the signed-in person's nav; C01 adds `data-keep-person`, so it shows the Console nav without changing who is signed in). Switching user from the chip always goes to that person's home: Sam to Templates (P01), Teresa to Overview (C02). and an empty `<aside class="side" id="side">`. `shell.js` fills the nav.

## Content notes
Taken from the brief and design file: personas, screen purposes, the appointment-reminders template (5 functions, 6 variables, 7 scenarios, 4 guardrails), the failure story, and all annotation text.

Invented: James T.'s real appointment (Fri Oct 16, 2:00 PM), the older calls Load More adds, the Next Step wording in the C03 preview, the C02 tile pictures (calls per day, hour or week, and the retry funnel behind Unreached), the change figures on the C02 tiles (except No-Show Rate), the mini-bar heights, the C01 worked example and step summaries, Maria's and Priya's earlier transcript turns, Priya's date of birth, her function-call timings, audit times and call-quality figures on C04-alt, the wording of the P02 prompt rules, the other five templates, extra Call Log rows, the Today and 30 Days figures on C02, the suggested prompt fix on P04, and the C01 retry count (2, from the user flow's "max 2 per attempt"). Replace these with real values when they exist.

## Open items
- Screen reader and automated accessibility audit.
- Let a prompt fix in P02 flow into a passing re-run on P04.
- Guardrail weighting (P02 open question): answered by showing the rules as fixed (shield icon, "Always Enforced", no on/off switch) with one "Show in call reviews" checkbox per rule, and by listing them first in the Agent Summary. Worth testing with Sam.
- Compact density for the Call Log. Dark mode.
