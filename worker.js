// UUID generator API (v4/v7).

const DEFAULT_VERSION = '4';
const SUPPORTED_VERSIONS = new Set(['4', '7']);

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
  'X-Robots-Tag': 'noindex, nofollow'
};

function parseVersion(rawVersion) {
  if (!rawVersion) {
    return { ok: true, version: DEFAULT_VERSION };
  }

  let normalized = String(rawVersion).trim().toLowerCase();
  if (normalized.startsWith('v')) {
    normalized = normalized.slice(1);
  }

  if (SUPPORTED_VERSIONS.has(normalized)) {
    return { ok: true, version: normalized };
  }

  return {
    ok: false,
    error: 'Unsupported version. Use version=4 or version=7.'
  };
}

function formatUuidFromBytes(bytes) {
  const hex = [...bytes].map((b) => b.toString(16).padStart(2, '0'));
  return (
    `${hex[0]}${hex[1]}${hex[2]}${hex[3]}` +
    `-${hex[4]}${hex[5]}` +
    `-${hex[6]}${hex[7]}` +
    `-${hex[8]}${hex[9]}` +
    `-${hex[10]}${hex[11]}${hex[12]}${hex[13]}${hex[14]}${hex[15]}`
  );
}

function generateUuidV4() {
  if (crypto?.randomUUID) {
    return crypto.randomUUID();
  }

  const bytes = new Uint8Array(16);
  crypto.getRandomValues(bytes);
  bytes[6] = (bytes[6] & 0x0f) | 0x40;
  bytes[8] = (bytes[8] & 0x3f) | 0x80;
  return formatUuidFromBytes(bytes);
}

function generateUuidV7() {
  const bytes = new Uint8Array(16);
  crypto.getRandomValues(bytes);

  const timestamp = BigInt(Date.now());
  bytes[0] = Number((timestamp >> 40n) & 0xffn);
  bytes[1] = Number((timestamp >> 32n) & 0xffn);
  bytes[2] = Number((timestamp >> 24n) & 0xffn);
  bytes[3] = Number((timestamp >> 16n) & 0xffn);
  bytes[4] = Number((timestamp >> 8n) & 0xffn);
  bytes[5] = Number(timestamp & 0xffn);

  bytes[6] = (bytes[6] & 0x0f) | 0x70;
  bytes[8] = (bytes[8] & 0x3f) | 0x80;

  return formatUuidFromBytes(bytes);
}

function generateUuid(version) {
  return version === '7' ? generateUuidV7() : generateUuidV4();
}

function jsonResponse(data, status = 200) {
  return new Response(JSON.stringify(data, null, 2), {
    status,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      ...CORS_HEADERS
    }
  });
}

function textResponse(text, status = 200) {
  return new Response(text, {
    status,
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      ...CORS_HEADERS
    }
  });
}

export default {
  async fetch(request) {
    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: CORS_HEADERS });
    }

    const url = new URL(request.url);
    if (url.pathname === '/favicon.ico') {
      return new Response(null, {
        status: 204,
        headers: { 'Cache-Control': 'public, max-age=86400' }
      });
    }
    if (url.pathname === '/robots.txt') {
      return textResponse('User-agent: *\nDisallow: /\n');
    }
    if (url.pathname === '/health') {
      return jsonResponse({ status: 'ok' });
    }

    const versionResult = parseVersion(url.searchParams.get('version'));
    if (!versionResult.ok) {
      return jsonResponse({ error: versionResult.error }, 400);
    }

    // GET and POST both return a freshly generated UUID.
    const version = versionResult.version;
    const uuid = generateUuid(version);
    const plain = url.searchParams.get('plain') === '1';

    if (plain) {
      return textResponse(uuid);
    }

    return jsonResponse({ uuid, version: `v${version}` });
  }
};
