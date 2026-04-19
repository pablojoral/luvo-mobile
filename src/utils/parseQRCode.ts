export type QRCodeResult =
  | { type: 'access_code'; code: string }
  | { type: 'laundry'; laundryId: number }
  | { type: 'machine'; machineId: number; url: string }
  | { type: 'other_deeplink'; url: string }
  | { type: 'unknown' };

const SCHEME = 'luvo://';

/**
 * Extracts { host, path, query } from a luvo:// URL using plain string ops.
 * Avoids relying on `new URL()` which parses custom schemes inconsistently
 * across JS engines (Hermes treats the authority portion differently).
 *
 * Examples:
 *   luvo://register-access?code=ABC  → host='register-access', path='', query='code=ABC'
 *   luvo://laundry/42               → host='laundry', path='/42', query=''
 */
const parseLuvoURL = (raw: string) => {
  const body = raw.slice(SCHEME.length); // 'register-access?code=ABC'
  const qIdx = body.indexOf('?');
  const sIdx = body.indexOf('/');

  let host: string;
  let path: string;
  let query: string;

  if (qIdx !== -1 && (sIdx === -1 || qIdx < sIdx)) {
    // query comes before any path — e.g. register-access?code=ABC
    host = body.slice(0, qIdx);
    path = '';
    query = body.slice(qIdx + 1);
  } else if (sIdx !== -1) {
    // path comes first — e.g. laundry/42
    host = body.slice(0, sIdx);
    path = body.slice(sIdx);
    query = qIdx !== -1 ? body.slice(qIdx + 1) : '';
  } else {
    host = body;
    path = '';
    query = '';
  }

  return { host, path, query };
};

const getQueryParam = (query: string, key: string): string | null => {
  const match = query.match(new RegExp(`(?:^|&)${key}=([^&]*)`));
  return match ? decodeURIComponent(match[1]) : null;
};

/**
 * Parses a raw QR code string into a typed result.
 *
 * Known luvo:// URL patterns:
 *   luvo://register-access?code=:code   → access_code
 *   luvo://laundry/:laundryId           → laundry
 *   luvo://machine/:machineId           → machine
 *   luvo://<anything else>              → other_deeplink
 *   <non-luvo string>                   → unknown
 */
export const parseQRCode = (raw: string): QRCodeResult => {
  if (!raw.startsWith(SCHEME)) {
    const result: QRCodeResult = { type: 'unknown' };
    return result;
  }

  const { host, path, query } = parseLuvoURL(raw);

  // 'register' kept for backward compatibility with QR codes generated before the rename
  if (host === 'register-access' || host === 'register') {
    const code = getQueryParam(query, 'code');
    if (code) {
      const result: QRCodeResult = { type: 'access_code', code };
      return result;
    }
  }

  if (host === 'laundry') {
    const id = parseInt(path.replace(/^\//, ''), 10);
    if (!isNaN(id)) {
      const result: QRCodeResult = { type: 'laundry', laundryId: id };
      return result;
    }
  }

  if (host === 'machine') {
    const id = parseInt(path.replace(/^\//, ''), 10);
    if (!isNaN(id)) {
      const result: QRCodeResult = { type: 'machine', machineId: id, url: raw };
      return result;
    }
  }

  const result: QRCodeResult = { type: 'other_deeplink', url: raw };
  return result;
};
