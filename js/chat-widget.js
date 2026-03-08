/* ============================================
  OOPUO — AI Chat Widget
  FAQ-based, structured for future API integration
  ============================================ */

(function() {
 const SYSTEM_PROMPT = "You are Oopuo's AI assistant. Help visitors understand our outsourced digital & AI team plans, pricing, and how to get started. Respond in visitor's language.";

 // FAQ knowledge base — language-aware
 const faqDB = {
  en: {
   services: {
    patterns: ['service', 'offer', 'what do you do', 'help', 'provide', 'include'],
    answer: "We're your outsourced digital & AI team. One subscription covers:\n\n• Website management & hosting\n• Email & DNS infrastructure\n• AI tools setup & automation\n• Ongoing support & guidance\n• Strategic digital direction\n\nTwo plans: **Essentials** (EUR 300/mo) and **Growth** (EUR 500/mo). Would you like details on either?"
   },
   pricing: {
    patterns: ['price', 'cost', 'how much', 'pricing', 'budget', 'afford', 'expensive', 'plan'],
    answer: "Simple, transparent pricing:\n\n**Essentials — EUR 300/mo:**\n• Website, hosting, email, DNS\n• 5h monthly support\n• Basic AI setup & guidance\n• Quarterly strategy check-in\n• 48h response time\n\n**Growth — EUR 500/mo:**\n• Everything in Essentials\n• 12h monthly support\n• Full AI workflow automation\n• Monthly strategic review\n• 24h priority response\n• Dedicated point of contact\n• Cost optimization audit\n\n**Custom** — for specific or larger needs.\n\nNo long-term contracts. Billed monthly. Cancel anytime."
   },
   enterprise: {
    patterns: ['enterprise', 'large company', 'corporate', 'custom', 'bigger'],
    answer: "For businesses with specific or larger needs, we offer custom plans. These can include custom AI builds, larger support hours, or specialized requirements.\n\nThe best way to explore this is to book a free 15-minute call — we'll discuss your situation and propose something tailored."
   },
   started: {
    patterns: ['start', 'begin', 'get started', 'next step', 'book', 'call', 'contact'],
    answer: "Getting started is simple:\n\n1. **Free call** — 15 minutes, we learn about your business\n2. **Audit** — We map what you're paying and what's working\n3. **Transition** — We take over and consolidate your providers\n4. **Ongoing** — Monthly support, guidance, and improvement\n\nBook your free call at our Contact page!"
   },
   different: {
    patterns: ['different', 'unique', 'why you', 'competitor', 'special', 'stand out'],
    answer: "What makes Oopuo different:\n\n• **One team, not five providers** — Website, email, AI, support, strategy all under one roof\n• **Built for small businesses** — We understand teams of 2-20 people\n• **Privacy-first** — Dutch company, EU jurisdiction, GDPR native\n• **AI that's practical** — Not buzzwords, actual tools that save you time\n• **100% client retention** — Our partners stay because it works\n\nWe become your digital & AI department."
   },
   default: {
    answer: "I can help you with:\n\n• **What we do** — Your outsourced digital & AI team\n• **Pricing** — Plans from EUR 300/mo\n• **Getting started** — How the process works\n• **What makes us different** — Our approach\n\nOr feel free to ask anything else! You can also book a free 15-minute call."
   }
  },
  nl: {
   services: {
    patterns: ['dienst', 'aanbod', 'wat doen', 'help', 'bied'],
    answer: "Wij zijn uw uitbestede digitale & AI team. Eén abonnement dekt:\n\n• Website beheer & hosting\n• E-mail & DNS infrastructuur\n• AI tools & automatisering\n• Doorlopende ondersteuning\n• Strategische digitale richting\n\nTwee plannen: **Essentials** (EUR 300/mnd) en **Growth** (EUR 500/mnd)."
   },
   default: {
    answer: "Ik kan u helpen met:\n\n• **Wat wij doen** — Uw uitbestede digitale & AI team\n• **Prijzen** — Plannen vanaf EUR 300/mnd\n• **Aan de slag** — Hoe het werkt\n\nVoel u vrij om iets te vragen!"
   }
  }
 };

 function matchFAQ(input) {
  const lang = (typeof currentLang !== 'undefined') ? currentLang : 'en';
  const db = faqDB[lang] || faqDB.en;
  const lower = input.toLowerCase();

  for (const [key, entry] of Object.entries(db)) {
   if (key === 'default') continue;
   if (entry.patterns && entry.patterns.some(p => lower.includes(p))) {
    return entry.answer;
   }
  }

  // Fallback: check English patterns too
  if (lang !== 'en') {
   for (const [key, entry] of Object.entries(faqDB.en)) {
    if (key === 'default') continue;
    if (entry.patterns && entry.patterns.some(p => lower.includes(p))) {
     return entry.answer;
    }
   }
  }

  return (db.default || faqDB.en.default).answer;
 }

 function createWidget() {
  // Bubble
  const bubble = document.createElement('div');
  bubble.id = 'chat-bubble';
  bubble.innerHTML = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>`;
  bubble.style.cssText = `position:fixed;bottom:24px;right:24px;width:56px;height:56px;border-radius:50%;background:#0055ff;display:flex;align-items:center;justify-content:center;cursor:pointer;z-index:9999;box-shadow:0 4px 24px rgba(0,85,255,.4);transition:transform .2s;`;
  bubble.addEventListener('mouseenter', () => bubble.style.transform = 'scale(1.1)');
  bubble.addEventListener('mouseleave', () => bubble.style.transform = 'scale(1)');

  // Chat window
  const chat = document.createElement('div');
  chat.id = 'chat-widget';
  chat.style.cssText = `position:fixed;bottom:96px;right:24px;width:380px;max-height:520px;background:#0a0a1a;border:1px solid rgba(255,255,255,.08);border-radius:16px;z-index:9999;display:none;flex-direction:column;overflow:hidden;box-shadow:0 20px 60px rgba(0,0,0,.6);`;

  chat.innerHTML = `
   <div style="display:flex;align-items:center;justify-content:space-between;padding:16px 20px;background:rgba(0,0,0,.4);border-bottom:1px solid rgba(255,255,255,.06);">
    <div style="display:flex;align-items:center;gap:12px;">
     <div style="width:36px;height:36px;border-radius:50%;background:linear-gradient(135deg,#0055ff,#7c3aed);display:flex;align-items:center;justify-content:center;font-weight:700;font-size:.8rem;color:#fff;">O</div>
     <div>
      <div style="font-size:.9rem;font-weight:600;color:#fff;">Oopuo AI</div>
      <div style="font-size:.7rem;color:#22c55e;">● Online</div>
     </div>
    </div>
    <button id="chat-close" style="background:none;border:none;color:#9898b0;cursor:pointer;font-size:1.2rem;padding:4px;"></button>
   </div>
   <div id="chat-messages" style="flex:1;padding:16px;overflow-y:auto;display:flex;flex-direction:column;gap:12px;max-height:360px;"></div>
   <div style="display:flex;gap:8px;padding:12px 16px;border-top:1px solid rgba(255,255,255,.06);">
    <input id="chat-input" type="text" placeholder="Ask about our services..." style="flex:1;background:#111128;border:1px solid rgba(255,255,255,.06);border-radius:50px;padding:10px 16px;color:#f0f0f5;font-size:.85rem;font-family:Inter,sans-serif;outline:none;">
    <button id="chat-send" style="width:36px;height:36px;border-radius:50%;background:#0055ff;border:none;color:#fff;cursor:pointer;display:flex;align-items:center;justify-content:center;font-size:1rem;">↑</button>
   </div>
  `;

  document.body.appendChild(bubble);
  document.body.appendChild(chat);

  let isOpen = false;

  bubble.addEventListener('click', () => {
   isOpen = !isOpen;
   chat.style.display = isOpen ? 'flex' : 'none';
   if (isOpen && !chat.dataset.greeted) {
    chat.dataset.greeted = '1';
    addBotMessage("Hi! I'm Oopuo's AI assistant. Looking for a simpler way to manage your business's digital presence? I can help you find the right plan, explain what's included, or walk you through how to get started.");
   }
  });

  document.getElementById('chat-close').addEventListener('click', () => {
   isOpen = false;
   chat.style.display = 'none';
  });

  const input = document.getElementById('chat-input');
  const sendBtn = document.getElementById('chat-send');

  function sendMessage() {
   const text = input.value.trim();
   if (!text) return;
   addUserMessage(text);
   input.value = '';
   // Simulate typing delay
   setTimeout(() => {
    const response = matchFAQ(text);
    addBotMessage(response);
   }, 600 + Math.random() * 400);
  }

  sendBtn.addEventListener('click', sendMessage);
  input.addEventListener('keydown', e => { if (e.key === 'Enter') sendMessage(); });

  function addUserMessage(text) {
   const msgs = document.getElementById('chat-messages');
   const div = document.createElement('div');
   div.style.cssText = 'align-self:flex-end;max-width:80%;';
   div.innerHTML = `<div style="background:#0055ff;color:#fff;padding:10px 14px;border-radius:16px 16px 4px 16px;font-size:.9rem;line-height:1.5;">${escapeHtml(text)}</div>`;
   msgs.appendChild(div);
   msgs.scrollTop = msgs.scrollHeight;
  }

  function addBotMessage(text) {
   const msgs = document.getElementById('chat-messages');
   const div = document.createElement('div');
   div.style.cssText = 'align-self:flex-start;max-width:85%;';
   // Simple markdown-like formatting
   const formatted = escapeHtml(text)
    .replace(/\*\*(.*?)\*\*/g, '<strong style="color:#fff">$1</strong>')
    .replace(/\n/g, '<br>');
   div.innerHTML = `<div style="background:#111128;color:#f0f0f5;padding:10px 14px;border-radius:16px 16px 16px 4px;font-size:.9rem;line-height:1.6;border:1px solid rgba(255,255,255,.06);">${formatted}</div>`;
   msgs.appendChild(div);
   msgs.scrollTop = msgs.scrollHeight;
  }

  function escapeHtml(str) {
   const div = document.createElement('div');
   div.textContent = str;
   return div.innerHTML;
  }
 }

 // Init on DOM ready
 if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', createWidget);
 } else {
  createWidget();
 }
})();
