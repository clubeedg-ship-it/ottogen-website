// Oopuo Analytics — Google Tag (gtag.js)
// Only loads after cookie consent
// GA4 Measurement ID: placeholder (update with real ID)

window.OOPUO_GA_ID = 'G-6Q4Z0KWEDM'; // TODO: Replace with real GA4 Measurement ID

window.enableAnalytics = function() {
  if (window._analyticsLoaded) return;
  window._analyticsLoaded = true;
  
  // Load gtag.js
  const script = document.createElement('script');
  script.async = true;
  script.src = 'https://www.googletagmanager.com/gtag/js?id=' + window.OOPUO_GA_ID;
  document.head.appendChild(script);
  
  script.onload = function() {
    window.dataLayer = window.dataLayer || [];
    function gtag(){ dataLayer.push(arguments); }
    window.gtag = gtag;
    
    gtag('js', new Date());
    gtag('config', window.OOPUO_GA_ID, {
      // Enhanced measurement (auto-tracks scrolls, outbound clicks, site search, video, file downloads)
      'enhanced_measurement': true,
      // Anonymize IP for GDPR
      'anonymize_ip': true,
      // Link domains for cross-domain tracking
      'linker': {
        'domains': ['oopuo.com']
      },
      // Custom dimensions
      'custom_map': {
        'dimension1': 'page_language',
        'dimension2': 'user_tier'
      }
    });
    
    // Track page language
    const lang = localStorage.getItem('oopuo_lang') || 'en';
    gtag('set', 'user_properties', {
      'preferred_language': lang
    });
    
    // Track which tier pages they visit
    const path = window.location.pathname;
    if (path.includes('enterprise')) {
      gtag('event', 'view_tier', { 'tier': 'enterprise' });
    } else if (path.includes('services')) {
      gtag('event', 'view_tier', { 'tier': 'smb' });
    }
    
    // Track CTA clicks
    document.querySelectorAll('a[href*="contact"], a[href*="calendly"], .btn-primary').forEach(function(el) {
      el.addEventListener('click', function() {
        gtag('event', 'cta_click', {
          'cta_text': this.textContent.trim(),
          'cta_page': window.location.pathname
        });
      });
    });
    
    // Track portfolio card clicks
    document.querySelectorAll('.project-card, .portfolio-card, [data-project]').forEach(function(el) {
      el.addEventListener('click', function() {
        gtag('event', 'portfolio_view', {
          'project_name': this.querySelector('h3')?.textContent || 'unknown'
        });
      });
    });
    
    // Track pricing section views (scroll into view)
    const pricingSection = document.querySelector('.pricing, #pricing, [data-section="pricing"]');
    if (pricingSection) {
      const observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
          if (entry.isIntersecting) {
            gtag('event', 'view_pricing', {
              'page': window.location.pathname
            });
            observer.disconnect();
          }
        });
      }, { threshold: 0.5 });
      observer.observe(pricingSection);
    }
    
    // Track contact form submissions
    const contactForm = document.querySelector('form');
    if (contactForm) {
      contactForm.addEventListener('submit', function() {
        gtag('event', 'generate_lead', {
          'event_category': 'contact',
          'event_label': window.location.pathname
        });
      });
    }
    
    // Track language switches
    document.querySelectorAll('[data-lang]').forEach(function(el) {
      el.addEventListener('click', function() {
        gtag('event', 'language_switch', {
          'language': this.dataset.lang
        });
      });
    });
    
    console.log('[Oopuo Analytics] Loaded — GA4:', window.OOPUO_GA_ID);
  };
};

// Auto-enable if previously consented
if (localStorage.getItem('oopuo_cookies_accepted') === 'true') {
  window.enableAnalytics();
}
