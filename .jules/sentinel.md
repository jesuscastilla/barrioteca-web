## 2025-05-15 - Insecure API proxy CORS configuration
**Vulnerability:** The proxy scripts (`api-proxy.php`) reflect any value in `Origin` header when it exists, or fallback to wildcard `*`.
**Learning:** Returning wildcard is bad, but dynamically reflecting the Origin header with `Access-Control-Allow-Credentials: true` is an even worse security vulnerability, allowing any site to perform authenticated CSRF if it has cookie-based authentication, or simply steal data via CORS.
**Prevention:** Hardcode allowed origins or use a whitelist of allowed origins.
