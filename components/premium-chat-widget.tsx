"use client";

import Script from "next/script";

/** Full profile embed (not `type: 'button'`). Renders in `.pchat-widget-placeholder` only. */
export function PremiumChatWidget() {
  return (
    <div className="w-full">
      <div className="pchat-widget-placeholder" />

      <Script id="premium-chat-widget" strategy="afterInteractive">
        {`
          (function(d,w,i){
            w.premiumchat = w.premiumchat || [];
            var p = w.premiumchat;
            if(!p.length){
              (() => {
                w.premiumchat_domain = 'https://premium.chat/';
                var s = d.createElement('script');
                s.type = 'text/javascript';
                s.async = true;
                s.src = w.premiumchat_domain + 'embed/js/widget.js';
                var ss = d.getElementsByTagName('script')[0];
                ss.parentNode.insertBefore(s, ss);
              })();
            }
            p.push({
              num: p.length,
              wid: 970021
            });
          })(document, window, 970021);
        `}
      </Script>
    </div>
  );
}
