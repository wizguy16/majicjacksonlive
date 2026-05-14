"use client";

import Script from "next/script";

const PREMIUM_CHAT_WID = 970021;

/**
 * Official Premium.Chat embed (full widget in `.pchat-widget-placeholder`).
 * Mirrors their snippet; wid comes from the IIFE’s third argument like their `i`.
 */
export function PremiumChatWidget() {
  const boot = `(function(d,w,i){w.premiumchat = w.premiumchat || [];var p = w.premiumchat; if(!p.length){(()=>{
w.premiumchat_domain = 'https://premium.chat/';var s = d.createElement('script'); s.type = 'text/javascript'; s.async = true; s.src = w.premiumchat_domain+'embed/js/widget.js'; var ss = d.getElementsByTagName('script')[0]; ss.parentNode.insertBefore(s, ss);})();}
p.push({'num': p.length, 'wid': i});})(document, window,${PREMIUM_CHAT_WID});`;

  return (
    <div className="w-full">
      <div className="pchat-widget-placeholder"></div>

      <Script id="premium-chat-widget" strategy="afterInteractive">
        {boot}
      </Script>
    </div>
  );
}
