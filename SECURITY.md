# Security Policy

## Supported Versions

This project maintains the latest version deployed on Netlify.

| Version | Supported          |
| ------- | ------------------ |
| Latest  | :white_check_mark: |

## Reporting a Vulnerability

If you discover a security vulnerability, please:

1. **DO NOT** open a public issue
2. Email john.shelburne@icloud.com with details
3. Include:
   - Description of the vulnerability
   - Steps to reproduce
   - Potential impact
   - Suggested fix (if any)

## Security Measures

### Content Security Policy
Strict CSP headers are configured in `netlify.toml` to prevent:
- XSS attacks
- Clickjacking
- MIME type sniffing

### Headers
- X-Frame-Options: DENY
- X-XSS-Protection: 1; mode=block
- X-Content-Type-Options: nosniff
- Referrer-Policy: strict-origin-when-cross-origin

### Branch Protection
- Main branch requires pull request reviews
- No direct pushes to main
- All commits should be signed

### Dependencies
- No npm dependencies (pure static site)
- Regular security audits
- Automated vulnerability scanning via GitHub

## Best Practices

1. Never commit sensitive data
2. Use environment variables for API keys
3. Keep all client-side code minified in production
4. Regular security reviews
5. Monitor for suspicious activity

## Response Time

Security issues will be acknowledged within 48 hours and addressed based on severity:
- Critical: Within 24 hours
- High: Within 72 hours
- Medium: Within 1 week
- Low: Next regular update