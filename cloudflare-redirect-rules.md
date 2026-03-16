# Cloudflare Redirect Rules for thecm2.com

## Goal
Enforce 301 permanent redirects for:
1. `http://` → `https://` (HTTP to HTTPS)
2. `thecm2.com` → `www.thecm2.com` (non-www to www)

These rules must be set in the **Cloudflare Dashboard** under:
**Cloudflare Dashboard → thecm2.com → Rules → Redirect Rules**

---

## Rule 1 — HTTP to HTTPS (non-www)

| Field | Value |
|---|---|
| Rule name | `HTTP to HTTPS non-www` |
| When | `URI Full → starts with → http://thecm2.com` |
| Then | `Dynamic redirect → https://www.thecm2.com${uri.path}` |
| Status code | `301` |
| Preserve query string | Yes |

---

## Rule 2 — non-www to www (HTTPS)

| Field | Value |
|---|---|
| Rule name | `non-www to www` |
| When | `Hostname → equals → thecm2.com` |
| Then | `Dynamic redirect → https://www.thecm2.com${uri.path}` |
| Status code | `301` |
| Preserve query string | Yes |

---

## Alternative: Cloudflare Page Rules (Legacy)

If using the older Page Rules interface:

1. `http://thecm2.com/*` → Forwarding URL (301) → `https://www.thecm2.com/$1`
2. `https://thecm2.com/*` → Forwarding URL (301) → `https://www.thecm2.com/$1`
3. `http://www.thecm2.com/*` → Forwarding URL (301) → `https://www.thecm2.com/$1`

---

## Verification

After setting the rules, test with:

```bash
curl -I http://thecm2.com/
# Expected: HTTP/1.1 301 Moved Permanently
# Location: https://www.thecm2.com/

curl -I https://thecm2.com/
# Expected: HTTP/1.1 301 Moved Permanently
# Location: https://www.thecm2.com/

curl -I http://www.thecm2.com/
# Expected: HTTP/1.1 301 Moved Permanently
# Location: https://www.thecm2.com/

curl -I https://www.thecm2.com/
# Expected: HTTP/1.1 200 OK
```

---

## Note on Cloudflare SSL/TLS

Ensure the SSL/TLS encryption mode is set to **Full (strict)** in:
**Cloudflare Dashboard → thecm2.com → SSL/TLS → Overview**

Also enable **Always Use HTTPS** in:
**Cloudflare Dashboard → thecm2.com → SSL/TLS → Edge Certificates → Always Use HTTPS → ON**

This is the simplest way to enforce HTTP → HTTPS without needing a custom redirect rule.
