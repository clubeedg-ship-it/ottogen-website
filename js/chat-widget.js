/* ============================================
   OOPUO — AI Chat Widget
   FAQ-based, structured for future API integration
   ============================================ */

(function() {
  const SYSTEM_PROMPT = "You are Oopuo's AI assistant. Help visitors understand services, pricing, and how to get started. Respond in visitor's language.";

  // FAQ knowledge base — language-aware
  const faqDB = {
    en: {
      services: {
        patterns: ['service', 'offer', 'what do you do', 'help', 'provide'],
        answer: "We offer two tiers of services:\n\n**For Growing Businesses:**\n• Web Design & Development (€3,500–€8,000)\n• Business Systems / Inventory (€2,500–€6,000)\n• AI Customer Support (€2,000–€4,000)\n• Brand & Strategy (€2,000–€5,000)\n\n**For Enterprise:**\n• AI Strategy & Governance (€8K–€25K)\n• Local AI Deployment (€15K–€75K)\n• Internal Automation (€10K–€40K)\n• Data Infrastructure (€10K–€30K)\n\nWould you like to know more about any specific service?"
      },
      pricing: {
        patterns: ['price', 'cost', 'how much', 'pricing', 'budget', 'afford', 'expensive'],
        answer: "Our pricing is transparent and stackable:\n\n**SMB Monthly Retainers:**\n• Website & Maintenance: €397/mo\n• Inventory / Business System: €497/mo\n• AI Customer Support: €497/mo\n• Full Stack (all-in-one): €1,097/mo (save €294)\n\n**Enterprise Monthly Retainers:**\n• AI Operations: €2,500/mo\n• Infrastructure: €1,500/mo\n• AI Engineering: €4,500/mo\n• Strategy: €2,000/mo\n• Enterprise Full Stack: €8,500/mo\n\nAll plans require initial project setup. Want to discuss your specific needs?"
      },
      enterprise: {
        patterns: ['enterprise', 'large company', 'corporate', 'institutional', 'private ai', 'local model', 'on-premise'],
        answer: "Absolutely! Our enterprise tier is built for organizations that need:\n\n🔒 **Private AI** — Models run on your hardware, data never leaves your building\n🇪🇺 **EU/GDPR Native** — Dutch company, full compliance\n🏗️ **Chimera Technology** — Our own privacy-preserving AI compute layer\n🤝 **Dedicated Teams** — Not a vendor, your AI engineering team\n\nWe work with institutional clients on AI strategy, local deployments, and internal automation. Want to request a consultation?"
      },
      started: {
        patterns: ['start', 'begin', 'get started', 'next step', 'book', 'call', 'contact'],
        answer: "Getting started is simple:\n\n1️⃣ **Book a discovery call** — Free 30-minute conversation about your needs\n2️⃣ **We scope your project** — Clear proposal with timeline and pricing\n3️⃣ **We build** — 2-6 week delivery depending on scope\n4️⃣ **Launch + Grow** — Ongoing support keeps your systems evolving\n\n📅 Book your call at our Contact page, or just tell me what you need and I'll point you in the right direction!"
      },
      different: {
        patterns: ['different', 'unique', 'why you', 'competitor', 'special', 'stand out'],
        answer: "What makes Oopuo different:\n\n🔧 **We build infrastructure, not just websites** — Complete AI-powered business systems\n🔒 **Privacy-first** — We built Chimera, our own AI compute layer. Your data stays yours.\n💼 **Two tiers, one team** — Whether you're an SMB or enterprise, same quality of engineering\n📊 **Proven results** — 6+ projects, €1.1M+ funding raised for portfolio companies, 100% client retention\n🇳🇱 **Netherlands-based** — EU jurisdiction, GDPR native\n\nWe're not an agency. We're your AI infrastructure partner."
      },
      default: {
        answer: "I can help you with:\n\n• **Our services** — What we build\n• **Pricing** — How much it costs\n• **Enterprise** — Solutions for larger organizations\n• **Getting started** — Next steps\n• **What makes us different** — Our approach\n\nOr feel free to ask anything else! For detailed discussions, you can also book a free discovery call."
      }
    },
    nl: {
      services: {
        patterns: ['dienst', 'aanbod', 'wat doen', 'help', 'bied'],
        answer: "Wij bieden twee niveaus van diensten:\n\n**Voor groeiende bedrijven:**\n• Webdesign & Ontwikkeling (€3.500–€8.000)\n• Bedrijfssystemen (€2.500–€6.000)\n• AI Klantenservice (€2.000–€4.000)\n• Merk & Strategie (€2.000–€5.000)\n\n**Voor Enterprise:**\n• AI Strategie (€8K–€25K)\n• Lokale AI-implementatie (€15K–€75K)\n\nWilt u meer weten over een specifieke dienst?"
      },
      default: {
        answer: "Ik kan u helpen met:\n\n• **Onze diensten** — Wat wij bouwen\n• **Prijzen** — Hoeveel het kost\n• **Enterprise** — Oplossingen voor grotere organisaties\n• **Aan de slag** — Volgende stappen\n\nVoel u vrij om iets te vragen!"
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
        <button id="chat-close" style="background:none;border:none;color:#9898b0;cursor:pointer;font-size:1.2rem;padding:4px;">✕</button>
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
        addBotMessage("Hi! 👋 I'm Oopuo's AI assistant. I can help you understand our services, pricing, and how to get started. What would you like to know?");
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
