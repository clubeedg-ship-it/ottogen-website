(function() {
  if (localStorage.getItem('oopuo_cookies_accepted')) return;
  
  const banner = document.createElement('div');
  banner.id = 'cookie-banner';
  banner.innerHTML = `
    <div class="cookie-inner">
      <div class="cookie-text">
        <p>We use cookies to enhance your experience and analyze site traffic. By clicking "Accept", you consent to our use of cookies.</p>
      </div>
      <div class="cookie-actions">
        <button id="cookie-reject" class="cookie-btn cookie-btn-secondary">Reject</button>
        <button id="cookie-accept" class="cookie-btn cookie-btn-primary">Accept</button>
      </div>
    </div>
  `;
  
  const style = document.createElement('style');
  style.textContent = `
    #cookie-banner {
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
      z-index: 9999;
      background: #111128;
      border-top: 1px solid rgba(0,85,255,.2);
      padding: 16px 24px;
      backdrop-filter: blur(20px);
      animation: slideUp 0.3s ease;
    }
    @keyframes slideUp {
      from { transform: translateY(100%); }
      to { transform: translateY(0); }
    }
    .cookie-inner {
      max-width: 1200px;
      margin: 0 auto;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 24px;
      flex-wrap: wrap;
    }
    .cookie-text p {
      color: #9898b0;
      font-size: 0.85rem;
      line-height: 1.5;
      margin: 0;
    }
    .cookie-actions {
      display: flex;
      gap: 8px;
      flex-shrink: 0;
    }
    .cookie-btn {
      padding: 8px 20px;
      border-radius: 50px;
      font-size: 0.85rem;
      font-weight: 600;
      cursor: pointer;
      border: none;
      font-family: 'Inter', sans-serif;
      transition: all 0.2s;
    }
    .cookie-btn-primary {
      background: #0055ff;
      color: #fff;
    }
    .cookie-btn-primary:hover {
      background: #0044cc;
    }
    .cookie-btn-secondary {
      background: rgba(255,255,255,0.06);
      color: #9898b0;
      border: 1px solid rgba(255,255,255,0.1);
    }
    .cookie-btn-secondary:hover {
      background: rgba(255,255,255,0.1);
      color: #fff;
    }
    @media (max-width: 600px) {
      .cookie-inner { flex-direction: column; text-align: center; }
      .cookie-actions { width: 100%; justify-content: center; }
    }
  `;
  
  document.head.appendChild(style);
  document.body.appendChild(banner);
  
  document.getElementById('cookie-accept').addEventListener('click', function() {
    localStorage.setItem('oopuo_cookies_accepted', 'true');
    if (window.enableAnalytics) window.enableAnalytics();
    banner.remove();
  });
  
  document.getElementById('cookie-reject').addEventListener('click', function() {
    localStorage.setItem('oopuo_cookies_accepted', 'false');
    banner.remove();
  });
})();
