#!/usr/bin/env node
// Zero-dependency Chrome DevTools Protocol driver for the SHM site.
//
// Drives the running Next.js dev server (default http://localhost:3000) with
// headless Chrome over CDP. No npm deps — relies on Node 18+ global fetch and
// WebSocket (tested on Node 26). The page is a single 'use client' component
// that uses three.js (WebGL) for the hero background and gates content behind
// a 3.5s loading splash, so we MUST use software WebGL and wait past the timer.
//
// Usage:
//   node driver.mjs [url] [outfile.png] [--click "Prestations"] [--scroll 1600] [--wait 6000]
//
// Examples:
//   node driver.mjs                                   # full-page shot of home
//   node driver.mjs http://localhost:3000 /tmp/shots/home.png
//   node driver.mjs http://localhost:3000 /tmp/shots/nails.png --click "Ongles"
//
// Exit code is non-zero if the page logged console errors (beyond known noise).

import { spawn } from 'node:child_process';
import { mkdirSync } from 'node:fs';
import { dirname } from 'node:path';

const URL_ARG = process.argv[2] && !process.argv[2].startsWith('--') ? process.argv[2] : 'http://localhost:3000';
const OUT = process.argv[3] && !process.argv[3].startsWith('--') ? process.argv[3] : '/tmp/shots/shm.png';
const argv = process.argv.slice(2);
const opt = (flag, def) => { const i = argv.indexOf(flag); return i >= 0 ? argv[i + 1] : def; };
const CLICK = opt('--click', null);          // click first element whose text matches (case-insensitive)
const SCROLL = parseInt(opt('--scroll', '0'), 10);
const WAIT = parseInt(opt('--wait', '6000'), 10); // ms to wait after load (must exceed the 3.5s splash)
const PORT = 9222 + Math.floor(Math.random() * 1000);

mkdirSync(dirname(OUT), { recursive: true });

// These flags are mandatory: without SwiftShader, three.js throws
// "Error creating WebGL context" → unhandledRejection and the hero never paints.
const chrome = spawn('google-chrome', [
  '--headless=new', '--no-sandbox', '--disable-gpu',
  '--enable-unsafe-swiftshader', '--use-gl=angle', '--use-angle=swiftshader',
  '--hide-scrollbars', '--window-size=1440,900',
  `--remote-debugging-port=${PORT}`, '--remote-allow-origins=*',
  'about:blank',
], { stdio: ['ignore', 'ignore', 'ignore'] });

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function cdpEndpoint() {
  // Wait for Chrome to be up, then open a fresh page target. We must connect to
  // a *page* websocket (not /json/version, which is browser-level and lacks the
  // Page/Runtime domains). /json/new needs PUT on current Chrome.
  for (let i = 0; i < 50; i++) {
    try {
      const v = await fetch(`http://127.0.0.1:${PORT}/json/version`);
      if (v.ok) break;
    } catch {}
    await sleep(200);
  }
  const r = await fetch(`http://127.0.0.1:${PORT}/json/new?about:blank`, { method: 'PUT' });
  const j = await r.json();
  if (!j.webSocketDebuggerUrl) throw new Error('could not open page target: ' + JSON.stringify(j));
  return j.webSocketDebuggerUrl;
}

function cdp(wsUrl) {
  const ws = new WebSocket(wsUrl);
  let id = 0;
  const pending = new Map();
  const errors = [];
  const ready = new Promise((res, rej) => { ws.onopen = res; ws.onerror = rej; });
  ws.onmessage = (ev) => {
    const m = JSON.parse(ev.data);
    if (m.id && pending.has(m.id)) {
      const { resolve, reject } = pending.get(m.id);
      pending.delete(m.id);
      if (m.error) reject(new Error(m.error.message)); else resolve(m.result);
    } else if (m.method === 'Runtime.consoleAPICalled' && m.params.type === 'error') {
      errors.push(m.params.args.map((a) => a.value || a.description || '').join(' '));
    } else if (m.method === 'Runtime.exceptionThrown') {
      errors.push(m.params.exceptionDetails.exception?.description || m.params.exceptionDetails.text);
    }
  };
  const send = (method, params = {}) => new Promise((resolve, reject) => {
    const myId = ++id;
    pending.set(myId, { resolve, reject });
    ws.send(JSON.stringify({ id: myId, method, params }));
  });
  return { ready, send, errors, close: () => ws.close() };
}

const main = async () => {
  const ws = await cdpEndpoint();
  const c = cdp(ws);
  await c.ready;
  await c.send('Page.enable');
  await c.send('Runtime.enable');
  await c.send('Page.navigate', { url: URL_ARG });
  await sleep(WAIT); // clear the 3.5s loading splash + let Unsplash hero images decode

  if (CLICK) {
    const js = `(() => {
      const want = ${JSON.stringify(CLICK)}.toLowerCase();
      const el = [...document.querySelectorAll('button, a, [role=button]')]
        .find(e => (e.textContent || '').trim().toLowerCase().includes(want));
      if (el) { el.scrollIntoView({block:'center'}); el.click(); return 'clicked: ' + el.textContent.trim(); }
      return 'NOT FOUND: ' + want;
    })()`;
    const r = await c.send('Runtime.evaluate', { expression: js, returnByValue: true });
    console.log(r.result.value);
    await sleep(1500);
  }

  if (SCROLL) {
    await c.send('Runtime.evaluate', { expression: `window.scrollTo(0, ${SCROLL})` });
    await sleep(1200);
  }

  const shot = await c.send('Page.captureScreenshot', { format: 'png', captureBeyondViewport: true, fromSurface: true });
  const { writeFileSync } = await import('node:fs');
  writeFileSync(OUT, Buffer.from(shot.data, 'base64'));
  console.log('screenshot ->', OUT);

  const realErrors = c.errors.filter((e) =>
    !/WebGL|GroupMarkerNotSet|Hydration|hydration|server rendered HTML/.test(e));
  if (realErrors.length) {
    console.error('CONSOLE ERRORS:\n' + realErrors.join('\n'));
  }
  c.close();
  chrome.kill('SIGKILL');
  process.exit(realErrors.length ? 1 : 0);
};

main().catch((e) => { console.error(e); chrome.kill('SIGKILL'); process.exit(2); });
