// Cloudflare Pages Function — POST /api/lead
// Captures slide-23 CTA submissions and forwards to GoHighLevel.
// Ported from steve-funnel-kit's /api/lead pattern, adapted to the three
// pitch-deck choices: pitch_in, pitch_question, pitch_out.

const GHL_API_URL = 'https://services.leadconnectorhq.com';
const GHL_API_VERSION = '2021-07-28';

// Tags the function will forward to GHL. Edit ALLOWED_TAGS to add more.
const ALLOWED_TAGS = [
  'pitch_in',
  'pitch_question',
  'pitch_out',
  'perfect_pitch_deck',
];

const CHOICE_TO_TAG = {
  in: 'pitch_in',
  question: 'pitch_question',
  out: 'pitch_out',
};

const MAX_REQUESTS_PER_MINUTE = 10;
const MAX_BODY_SIZE = 16 * 1024;
const requestLog = new Map();

function isRateLimited(ip) {
  const now = Date.now();
  const windowMs = 60_000;
  const timestamps = requestLog.get(ip) ?? [];
  const recent = timestamps.filter((t) => now - t < windowMs);
  recent.push(now);
  requestLog.set(ip, recent);

  if (requestLog.size > 10_000) {
    for (const [key, val] of requestLog) {
      const filtered = val.filter((t) => now - t < windowMs);
      if (filtered.length === 0) requestLog.delete(key);
      else requestLog.set(key, filtered);
    }
  }
  return recent.length > MAX_REQUESTS_PER_MINUTE;
}

function getClientIp(request) {
  return (
    request.headers.get('cf-connecting-ip') ??
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ??
    'unknown'
  );
}

// Parse ALLOWED_ORIGINS env (comma-separated). Localhost always allowed for dev.
function parseAllowedOrigins(env) {
  return (env.ALLOWED_ORIGINS ?? '')
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean);
}

function isAllowedOrigin(request, env) {
  const origin = request.headers.get('origin') ?? '';
  if (!origin) return false;
  if (origin.startsWith('http://localhost:') || origin.startsWith('http://127.0.0.1:')) {
    return true;
  }
  return parseAllowedOrigins(env).includes(origin);
}

function getCorsOrigin(request, env) {
  const origin = request.headers.get('origin') ?? '';
  if (origin.startsWith('http://localhost:') || origin.startsWith('http://127.0.0.1:')) {
    return origin;
  }
  const allowed = parseAllowedOrigins(env);
  return allowed.includes(origin) ? origin : (allowed[0] ?? '');
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_REGEX = /^\+?[1-9]\d{1,14}$/;

function sanitizeString(str) {
  return String(str).trim().replace(/[<>"'&\\]/g, '');
}

function splitName(fullName) {
  if (!fullName) return { firstName: undefined, lastName: undefined };
  const parts = sanitizeString(fullName).split(/\s+/);
  return {
    firstName: parts[0] || undefined,
    lastName: parts.length > 1 ? parts.slice(1).join(' ') : undefined,
  };
}

function validate(body) {
  const errors = {};
  if (!body || typeof body !== 'object') {
    return { valid: false, errors: { form: 'Invalid form data' } };
  }

  if (!body.choice || !CHOICE_TO_TAG[body.choice]) {
    errors.choice = 'Choice must be one of: in, question, out';
  }

  // "out" branch only collects email + optional feedback, so name and phone
  // are optional there. "in" and "question" still require name + phone.
  const isOut = body.choice === 'out';
  const nameRequired = !isOut;
  const phoneRequired = !isOut;

  if (nameRequired || (body.name && body.name.trim() !== '')) {
    if (!body.name || typeof body.name !== 'string' || body.name.trim() === '') {
      if (nameRequired) errors.name = 'Name is required';
    } else if (body.name.length > 100) {
      errors.name = 'Name is too long';
    }
  }

  if (!body.email || typeof body.email !== 'string' || body.email.trim() === '') {
    errors.email = 'Email is required';
  } else if (body.email.length > 254) {
    errors.email = 'Email is too long';
  } else if (!EMAIL_REGEX.test(body.email.trim())) {
    errors.email = 'Please enter a valid email address';
  }

  if (phoneRequired) {
    if (!body.phone || typeof body.phone !== 'string' || body.phone.trim() === '') {
      errors.phone = 'Phone is required';
    } else if (body.phone.length > 20) {
      errors.phone = 'Phone number is too long';
    } else if (!PHONE_REGEX.test(body.phone.trim())) {
      errors.phone = 'Please enter a valid phone number';
    }
  } else if (body.phone && typeof body.phone === 'string') {
    if (body.phone.length > 20) {
      errors.phone = 'Phone number is too long';
    } else if (!PHONE_REGEX.test(body.phone.trim())) {
      errors.phone = 'Please enter a valid phone number';
    }
  }

  // Question branch: message is required.
  if (body.choice === 'question') {
    if (!body.message || typeof body.message !== 'string' || body.message.trim() === '') {
      errors.message = 'Please share your question';
    } else if (body.message.length > 2000) {
      errors.message = 'Message is too long';
    }
  }

  // Out branch: message is optional but capped.
  if (body.choice === 'out' && body.message && body.message.length > 2000) {
    errors.message = 'Message is too long';
  }

  if (Object.keys(errors).length > 0) return { valid: false, errors };

  return {
    valid: true,
    errors: {},
    data: {
      name: body.name ? sanitizeString(body.name) : undefined,
      email: body.email.trim().toLowerCase(),
      phone: body.phone ? sanitizeString(body.phone) : undefined,
      choice: body.choice,
      message: body.message ? sanitizeString(body.message) : undefined,
    },
  };
}

function ghlHeaders(apiKey) {
  return {
    Accept: 'application/json',
    Authorization: `Bearer ${apiKey}`,
    'Content-Type': 'application/json',
    Version: GHL_API_VERSION,
  };
}

async function upsertContact(payload, apiKey) {
  const response = await fetch(`${GHL_API_URL}/contacts/upsert`, {
    method: 'POST',
    headers: ghlHeaders(apiKey),
    body: JSON.stringify(payload),
  });
  const data = await response.json().catch(() => ({}));

  if (response.ok) {
    return { success: true, contactId: data?.contact?.id, isDuplicate: false };
  }
  // GHL duplicate handling
  if (response.status === 400 || response.status === 409 || response.status === 422) {
    const message = (data.message ?? '').toLowerCase();
    const contactId = data?.meta?.contactId ?? data?.meta?.id;
    if (message.includes('duplicate') || contactId) {
      return { success: true, contactId, isDuplicate: true };
    }
  }
  return { success: false, statusCode: response.status, error: data?.message };
}

async function addContactTags(contactId, tags, apiKey) {
  const response = await fetch(`${GHL_API_URL}/contacts/${contactId}/tags`, {
    method: 'POST',
    headers: ghlHeaders(apiKey),
    body: JSON.stringify({ tags }),
  });
  return response.ok;
}

async function addContactNote(contactId, body, apiKey) {
  const response = await fetch(`${GHL_API_URL}/contacts/${contactId}/notes`, {
    method: 'POST',
    headers: ghlHeaders(apiKey),
    body: JSON.stringify({ body }),
  });
  return response.ok;
}

function json(payload, status, corsOrigin) {
  return new Response(JSON.stringify(payload), {
    status,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': corsOrigin || '',
      Vary: 'Origin',
    },
  });
}

export async function onRequestPost({ request, env }) {
  const corsOrigin = getCorsOrigin(request, env);

  if (!isAllowedOrigin(request, env)) {
    return json({ success: false, message: 'Forbidden' }, 403, corsOrigin);
  }

  if (isRateLimited(getClientIp(request))) {
    return json({ success: false, message: 'Too many requests. Try again shortly.' }, 429, corsOrigin);
  }

  const contentLength = parseInt(request.headers.get('content-length') ?? '0', 10);
  if (contentLength > MAX_BODY_SIZE) {
    return json({ success: false, message: 'Request too large' }, 413, corsOrigin);
  }

  if (!(request.headers.get('content-type') ?? '').includes('application/json')) {
    return json({ success: false, message: 'Content-Type must be application/json' }, 415, corsOrigin);
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return json({ success: false, message: 'Invalid JSON' }, 400, corsOrigin);
  }

  const v = validate(body);
  if (!v.valid) {
    return json({ success: false, message: 'Validation failed', errors: v.errors }, 400, corsOrigin);
  }

  const apiKey = env.GHL_API_KEY;
  const locationId = env.GHL_LOCATION_ID;
  if (!apiKey || !locationId) {
    console.error('Missing GHL env vars (GHL_API_KEY / GHL_LOCATION_ID)');
    return json({ success: false, message: 'Server configuration error' }, 500, corsOrigin);
  }

  const { firstName, lastName } = splitName(v.data.name);
  const choiceTag = CHOICE_TO_TAG[v.data.choice];
  const tags = Array.from(new Set([choiceTag, 'perfect_pitch_deck']))
    .filter((t) => ALLOWED_TAGS.includes(t));

  const upsertPayload = { email: v.data.email, locationId, source: 'Perfect Pitch Deck' };
  if (firstName) upsertPayload.firstName = firstName;
  if (lastName) upsertPayload.lastName = lastName;
  if (v.data.phone) upsertPayload.phone = v.data.phone;
  const upsert = await upsertContact(upsertPayload, apiKey);

  if (!upsert.success) {
    if (upsert.statusCode === 401 || upsert.statusCode === 403) {
      console.error('GHL auth failure — check API key scopes (contacts.write needed)');
    }
    console.error('GHL upsert error:', upsert.statusCode, upsert.error);
    return json({ success: false, message: 'Something went wrong. Please try again.' }, 502, corsOrigin);
  }

  if (upsert.contactId && tags.length > 0) {
    await addContactTags(upsert.contactId, tags, apiKey);
  }

  // Persist the choice + optional message as a contact note so it shows up
  // in the GHL contact timeline.
  if (upsert.contactId) {
    const label =
      v.data.choice === 'in'
        ? "I'm in — let's go"
        : v.data.choice === 'question'
        ? 'Has a question'
        : "I'm out — not now";
    const note = v.data.message
      ? `Pitch deck CTA: ${label}\n\n${v.data.message}`
      : `Pitch deck CTA: ${label}`;
    await addContactNote(upsert.contactId, note, apiKey);
  }

  return json(
    {
      success: true,
      message: upsert.isDuplicate ? 'Contact updated' : 'Contact created',
    },
    200,
    corsOrigin
  );
}

export async function onRequestOptions({ request, env }) {
  const corsOrigin = getCorsOrigin(request, env);
  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': corsOrigin || '',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Max-Age': '86400',
      Vary: 'Origin',
    },
  });
}
