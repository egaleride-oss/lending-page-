// ---- CONFIGURATION (इसे अपनी डिटेल्स से बदलें) ----
const CONFIG = {
  brandName: "BULLBUY",
  heroBrand: "BullBuy",
  rateTag: "High Commission", 
  officeAddress: "26-A Sanjay Nagar, Niwaru Road, Jhotwara, Jaipur Pin - 302012",
  
  // 1. टेलीग्राम बॉट टोकन (BotFather से मिलेगा)
  telegramToken: "YOUR_BOT_TOKEN_HERE", 
  
  // 2. आपकी चैट आईडी (userinfobot से मिलेगी)
  telegramChatId: "YOUR_CHAT_ID_HERE",

  stats: { retailers: "5000+", distributors: "300+", masters: "100+", happy: "15k+" }
};

// ---- Apply config to page ----
function applyConfig() {
  const setText = (id, val) => {
    const el = document.getElementById(id);
    if (el) el.textContent = val;
  };

  setText("brandName", CONFIG.brandName);
  setText("heroBrand", CONFIG.heroBrand);
  setText("footerBrand", CONFIG.brandName);
  setText("footerBrand2", CONFIG.brandName);
  setText("rateTag", CONFIG.rateTag);
  setText("officeAddress", CONFIG.officeAddress);
  setText("statRetailers", CONFIG.stats.retailers);
  setText("statDistributors", CONFIG.stats.distributors);
  setText("statMasters", CONFIG.stats.masters);
  setText("statHappy", CONFIG.stats.happy);
  setText("year", new Date().getFullYear());
}

// ---- Mobile nav toggle ----
function setupNav() {
  const nav = document.getElementById("nav");
  const toggle = document.getElementById("navToggle");
  if (!nav || !toggle) return;

  toggle.addEventListener("click", () => nav.classList.toggle("show"));
}

// ---- Telegram Bot Form System ----
function setupLeadForm() {
  const form = document.getElementById("leadForm");
  const msg = document.getElementById("formMsg");
  
  if (!form || !msg) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    
    // सबमिट बटन को "Sending..." मोड में डालना
    msg.textContent = "भेजा जा रहा है... कृपया रुकें।";
    msg.style.color = "var(--brand)";

    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    // टेलीग्राम मैसेज का फॉर्मेट (इसे आप अपने हिसाब से सजा सकते हैं)
    const text = `
🚀 *New Lead: BullBuy*
━━━━━━━━━━━━━━━━━━
👤 *Name:* ${data.name}
📱 *Mobile:* ${data.mobile}
📍 *City:* ${data.city}
💼 *Interested In:* ${data.interest}
━━━━━━━━━━━━━━━━━━
🌐 *Source:* BullBuy Website
    `;

    try {
      const response = await fetch(`https://api.telegram.org/bot${CONFIG.telegramToken}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: CONFIG.telegramChatId,
          text: text,
          parse_mode: "Markdown"
        })
      });

      if (response.ok) {
        msg.textContent = "✅ सफलतापूर्वक भेजा गया! हमारी टीम आपसे संपर्क करेगी।";
        msg.style.color = "var(--brand2)";
        form.reset();
      } else {
        throw new Error("Telegram API Error");
      }
    } catch (err) {
      msg.textContent = "❌ भेजने में समस्या आई। कृपया WhatsApp पर संपर्क करें।";
      msg.style.color = "#ff4e4e";
      console.error(err);
    }
  });
}

// सभी फंक्शन्स को रन करें
applyConfig();
setupNav();
setupLeadForm();
