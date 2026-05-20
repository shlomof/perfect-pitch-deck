#!/usr/bin/env node
// ghl-ping.mjs — verify GHL credentials work end-to-end.
//
// Reads GHL_API_KEY and GHL_LOCATION_ID from .env (or current shell env).
// Hits the same upstream as functions/api/lead.js — `contacts/search` with
// the user's location ID. Returns 200 if creds are valid, friendly error
// messages otherwise.
//
// Usage: node scripts/ghl-ping.mjs

import { readFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';

const ROOT = resolve(import.meta.dirname, '..');
const ENV_PATH = resolve(ROOT, '.env');

const GHL_BASE = 'https://services.leadconnectorhq.com';
const GHL_VERSION = '2021-07-28';

function loadEnv() {
  const env = { ...process.env };
  if (existsSync(ENV_PATH)) {
    const content = readFileSync(ENV_PATH, 'utf8');
    for (const line of content.split('\n')) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('#')) continue;
      const eq = trimmed.indexOf('=');
      if (eq < 0) continue;
      const key = trimmed.slice(0, eq).trim();
      const val = trimmed.slice(eq + 1).trim().replace(/^["']|["']$/g, '');
      if (!env[key]) env[key] = val;
    }
  }
  return env;
}

const env = loadEnv();
const apiKey = env.GHL_API_KEY;
const locationId = env.GHL_LOCATION_ID;

if (!apiKey || !locationId) {
  console.error('✗ ghl-ping: missing GHL_API_KEY or GHL_LOCATION_ID');
  console.error('  Set them in .env (copy from .env.example) or run /ghl-setup.');
  process.exit(2);
}

try {
  const res = await fetch(`${GHL_BASE}/contacts/search`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
      Version: GHL_VERSION,
      Accept: 'application/json',
    },
    body: JSON.stringify({
      locationId,
      pageLimit: 1,
    }),
  });

  const data = await res.json().catch(() => ({}));

  if (res.ok) {
    const count = data.total ?? data.contacts?.length ?? 0;
    console.log(`✓ ghl-ping OK`);
    console.log(`  Location ID:  ${locationId}`);
    console.log(`  Contact count: ${count}`);
    console.log(`  GHL is wired. Slide 23 submissions will reach this location.`);
    process.exit(0);
  }

  console.error(`✗ ghl-ping failed (HTTP ${res.status})`);
  if (res.status === 401 || res.status === 403) {
    console.error('  → Token rejected. Common causes:');
    console.error('    • Token has wrong scope. Needs at least `contacts.readonly` for this ping (and `contacts.write` to capture leads).');
    console.error('    • Token was copied with extra whitespace.');
    console.error('    • Token belongs to a different sub-account / agency.');
  } else if (res.status === 404) {
    console.error('  → Location not found. Check GHL_LOCATION_ID — it should be a 20-character alphanumeric string from your GHL URL.');
  } else if (res.status === 422 || res.status === 400) {
    console.error(`  → Bad request. GHL response: ${data?.message ?? '(no message)'}`);
  } else if (res.status >= 500) {
    console.error('  → GHL upstream error — try again in a few minutes.');
  } else {
    console.error(`  → Unexpected status. GHL response: ${JSON.stringify(data).slice(0, 200)}`);
  }
  process.exit(1);
} catch (err) {
  console.error(`✗ ghl-ping network error: ${err.message}`);
  console.error('  Check internet connectivity. If using a corporate proxy, GHL may be blocked.');
  process.exit(1);
}
