const DEFAULT_ALLOWED_PROTOCOLS = new Set(['http:', 'https:', 'mailto:', 'tel:']);

/**
 * Returns a safe href string or null.
 *
 * Prevents common XSS vectors like `javascript:` URLs.
 * Allows absolute URLs with allowed protocols, plus optional relative URLs.
 */
export function safeHref(href, { allowRelative = true, allowedProtocols = DEFAULT_ALLOWED_PROTOCOLS } = {}) {
    if (typeof href !== 'string') return null;

    const value = href.trim();
    if (!value) return null;

    // Allow same-site relative navigation when explicitly permitted.
    if (allowRelative && (value.startsWith('/') || value.startsWith('#'))) {
        return value;
    }

    // Block protocol-relative URLs (e.g. //evil.com)
    if (value.startsWith('//')) return null;

    try {
        const url = new URL(value);
        if (!allowedProtocols.has(url.protocol)) return null;
        return url.toString();
    } catch {
        return null;
    }
}

export function isSafeExternalHref(href) {
    const safe = safeHref(href, { allowRelative: false });
    return Boolean(safe);
}
