# TODO — Before Production Launch

## 🔴 Critical

### Contact Form Not Connected
- **Current state**: Form in `contact.html` is handled by `js/main.js` — it calls `preventDefault()`, shows a "Message Sent ✓" success message, but **data is never sent anywhere**
- **Fix options**:
  - **HubSpot Forms**: Already have HubSpot tracking (ID: 147967707). Create a HubSpot form and either embed it or POST to HubSpot Forms API
  - **Email backend**: Use a service like Formspree, EmailJS, or a simple serverless function
  - **HubSpot API**: POST form data to `https://api.hsforms.com/submissions/v3/integration/submit/{portalId}/{formGuid}`

### Google Analytics Placeholder
- **Current state**: `js/analytics.js` has `G-XXXXXXXXXX` as the measurement ID
- **Fix**: Create a GA4 property for oopuo.com in Google Analytics, get the real `G-XXXXXXXXXX` ID, update `js/analytics.js` line 5

## 🟡 Important

### YouTube Link 404
- **Current state**: Footer links to `https://youtube.com/@oopuo` — this channel does not exist
- **Fix options**:
  - Create the YouTube channel `@oopuo`
  - Remove the YouTube link from the footer (in `index.html` and all other page footers)
  - Replace with a different platform link

### LinkedIn Link Untested
- **Current state**: Footer links to `https://linkedin.com/company/oopuo`
- **Action**: Verify this company page exists and is properly set up. If not, create it or remove the link

## 🟢 Nice to Have

### Chat Widget Enhancement
- Currently FAQ-based with client-side pattern matching
- Could connect to an actual AI API for more dynamic responses (structure is ready — `SYSTEM_PROMPT` constant exists)

### Portfolio Images
- Only 4 portfolio images exist (`abura.jpg`, `cuttingedge.jpg`, `interactivemove.jpg`, `solyx.jpg`)
- Portfolio page references more projects (ZenithCred, SentinAgro) — verify they have images or placeholder treatment

### Cookie Consent i18n
- Cookie banner text is hardcoded in English in `js/cookie-consent.js`
- Should respect the selected language from i18n system

### Meta / SEO
- Add Open Graph (`og:`) and Twitter Card meta tags for social sharing
- Add `robots.txt` and `sitemap.xml`
- Add structured data (JSON-LD) for local business
