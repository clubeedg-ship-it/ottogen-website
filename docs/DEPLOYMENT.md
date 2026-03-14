# Deployment

## Current Setup (Staging)

- **Server**: `npx serve` running on port `8090`
- **Host**: oopuopu-cloud VM
- **Proxy**: Cloudflare (DNS + CDN) on a `zenithcred.com` subdomain
- **URL**: Accessible via zenithcred.com subdomain (Cloudflare-proxied)

### Running the dev server

```bash
cd ~/kira/projects/oopuo-website
npx serve -l 8090
```

To run in background:
```bash
nohup npx serve -l 8090 > /dev/null 2>&1 &
```

## Production Target

- **Domain**: oopuo.com
- **Hosting**: Hostinger
- **Type**: Static site — upload files directly, no build step needed

### Steps to Deploy to Production

1. **Prepare files**
   - Update `G-XXXXXXXXXX` in `js/analytics.js` with real GA4 measurement ID
   - Verify all social links work (see [TODO.md](TODO.md))
   - Connect contact form to backend (HubSpot or email service)

2. **Upload to Hostinger**
   - Log into Hostinger control panel
   - Navigate to File Manager → `public_html`
   - Upload all files (HTML, css/, js/, assets/) to `public_html`
   - Ensure `index.html` is in the root of `public_html`

3. **DNS Configuration**
   - Point `oopuo.com` A record to Hostinger server IP
   - Add `www` CNAME pointing to `oopuo.com`
   - If using Cloudflare: proxy through Cloudflare for CDN/DDoS protection

4. **SSL**
   - Hostinger provides free SSL via Let's Encrypt
   - Or use Cloudflare's SSL if proxied through Cloudflare

5. **Verify**
   - Check all pages load at `https://oopuo.com`
   - Test contact form submission
   - Verify GA4 is receiving data (Google Analytics Real-time report)
   - Test all 6 language versions
   - Check mobile responsiveness

### Alternative: Cloudflare Pages

Since it's a static site, Cloudflare Pages is a good alternative:

```bash
# Install Wrangler
npm install -g wrangler

# Deploy
cd ~/kira/projects/oopuo-website
wrangler pages deploy . --project-name=oopuo-website
```

Then point `oopuo.com` CNAME to the Cloudflare Pages URL.
