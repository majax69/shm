---
name: run-shm
description: Build, run, and drive the SHM salon site. Use when asked to start SHM, run the Next.js dev server, build it, screenshot the page, or interact with the running app (click service filters, scroll sections).
---

SHM is a single-page Next.js 16 marketing site for a lashes & nails salon in
Villeurbanne. The whole UI is one `'use client'` component (`app/page.tsx`) that
uses **three.js/WebGL** for the hero background, **framer-motion** for
scroll-triggered animations, and a **3.5s loading splash** before content shows.
You drive it by starting the dev server and pointing the committed CDP driver at
it: `.claude/skills/run-shm/driver.mjs` (headless Chrome, zero npm deps).

All paths below are relative to the repo root (`/home/majax/projets/shm`).

## Prerequisites

- **Node 18+** (tested on Node 26 — the driver needs global `fetch` + `WebSocket`).
- **pnpm** (`corepack enable pnpm` if missing).
- **Google Chrome** for the driver. Verify it's present:

```bash
google-chrome --version   # tested: Google Chrome 149.0.7827.53
```

No `apt-get` was needed in this container — Chrome and Node were already
installed. If Chrome is missing, install `google-chrome-stable` (or adapt the
driver's binary name to `chromium`).

## Setup

```bash
pnpm install   # "Already up to date" if node_modules is present
```

## Run (agent path)

Two steps: start the dev server, then drive it with the CDP driver.

**1. Start the dev server in the background and wait for the port:**

```bash
pnpm dev > /tmp/shm-dev.log 2>&1 &
timeout 60 bash -c 'until curl -sf http://localhost:3000 >/dev/null 2>&1; do sleep 1; done' && echo "SERVER UP"
```

(First compile takes ~10–20s. Stop later with `pkill -f 'next dev'`.)

**2. Drive it.** The driver launches headless Chrome with software WebGL,
navigates, waits past the loading splash, optionally scrolls/clicks, and writes a
full-page screenshot:

```bash
# Home page → /tmp/shots/driver-home.png
node .claude/skills/run-shm/driver.mjs http://localhost:3000 /tmp/shots/driver-home.png

# Filter to nail services: scroll into the Prestations section, click the "Ongles" chip
node .claude/skills/run-shm/driver.mjs http://localhost:3000 /tmp/shots/driver-ongles.png --scroll 1500 --click "Ongles"
```

Exit code is **0** on success, **1** if the page logged real console errors
(known WebGL/hydration noise is filtered out). Always open the PNG and confirm it
isn't black — see Gotchas.

| arg / flag | what it does |
|---|---|
| `[url]` (1st positional) | page to load (default `http://localhost:3000`) |
| `[outfile.png]` (2nd positional) | screenshot path (default `/tmp/shots/shm.png`) |
| `--wait <ms>` | delay after load before capture (default `6000`; must exceed the 3.5s splash) |
| `--scroll <px>` | scroll down this many px before capture (reveals scroll-gated sections) |
| `--click "<text>"` | click the first button/link whose text contains this string |

## Run (human path)

```bash
pnpm dev   # → serves http://localhost:3000; open in a real browser; Ctrl-C to stop
```

Useless headless — a real browser is needed to see it, which is why the driver
exists.

## Build / Lint

```bash
pnpm build   # production build
pnpm lint    # eslint — app/page.tsx has 3 pre-existing unused-var warnings, 0 errors
```

There is no test suite in this project.

## Gotchas

- **WebGL crashes the page without SwiftShader.** Plain headless Chrome can't
  create a WebGL context (`THREE.WebGLRenderer: Error creating WebGL context` →
  `unhandledRejection`), and the hero never paints. The driver passes
  `--enable-unsafe-swiftshader --use-gl=angle --use-angle=swiftshader` to force
  software WebGL. Don't remove those flags.
- **The 3.5s loading splash eats early screenshots.** `page.tsx` gates all
  content behind `setTimeout(() => setIsLoading(false), 3500)`. A screenshot
  taken before ~4s shows only a pink sparkle on black. The driver's default
  `--wait 6000` covers it; a naive `google-chrome --screenshot` does not.
- **Mid-page sections render black unless you scroll.** framer-motion animates
  the services / testimonials in on scroll-into-view, so a full-page capture
  without `--scroll` leaves them at opacity 0 (black). Use `--scroll 1500` to see
  the Prestations section.
- **Service filter is client-side.** The category chips (Extensions de cils /
  Ongles / Sourcils / Epilation) filter the cards in place — `--click "Ongles"`
  collapses the list to the two nail services, proving the React state updates.
- **Hydration mismatch warning is expected** in the dev console and is filtered
  out of the driver's error check; it does not block rendering.

## Troubleshooting

- **`'Page.enable' wasn't found`**: you connected to the browser-level CDP
  endpoint. The driver opens a *page* target via `PUT /json/new` — keep that.
- **Screenshot is fully black**: either WebGL flags were dropped, or `--wait` was
  too short (< 3500ms), or the section needs `--scroll`. Check `/tmp/shm-dev.log`
  for `WebGL context could not be created`.
- **`EADDRINUSE` on `pnpm dev`**: a dev server is already running. `pkill -f
  'next dev'` before relaunching.
- **`curl` poll times out**: the first compile is slow; check `/tmp/shm-dev.log`.
  The driver also leaves enough time for the local hero images to decode.
