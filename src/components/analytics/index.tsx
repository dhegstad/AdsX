"use client";

import Script from "next/script";

// =============================================================================
// ANALYTICS CONFIGURATION
// Add your tracking IDs and pixel IDs here for easy management
// =============================================================================

const config = {
  // Google Analytics
  googleAnalytics: {
    enabled: true,
    measurementId: "G-LEYJH1XDJJ",
  },

  // Future pixels - uncomment and add IDs when ready
  // facebookPixel: {
  //   enabled: false,
  //   pixelId: "",
  // },
  // linkedInInsight: {
  //   enabled: false,
  //   partnerId: "",
  // },
  // twitterPixel: {
  //   enabled: false,
  //   pixelId: "",
  // },
  // hubspot: {
  //   enabled: false,
  //   portalId: "",
  // },
  // hotjar: {
  //   enabled: false,
  //   hjid: "",
  //   hjsv: "",
  // },
};

// =============================================================================
// GOOGLE ANALYTICS
// =============================================================================

function GoogleAnalytics() {
  if (!config.googleAnalytics.enabled || !config.googleAnalytics.measurementId) {
    return null;
  }

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${config.googleAnalytics.measurementId}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${config.googleAnalytics.measurementId}');
        `}
      </Script>
    </>
  );
}

// =============================================================================
// FACEBOOK PIXEL (Template - uncomment when ready)
// =============================================================================

// function FacebookPixel() {
//   if (!config.facebookPixel?.enabled || !config.facebookPixel?.pixelId) {
//     return null;
//   }
//
//   return (
//     <Script id="facebook-pixel" strategy="afterInteractive">
//       {`
//         !function(f,b,e,v,n,t,s)
//         {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
//         n.callMethod.apply(n,arguments):n.queue.push(arguments)};
//         if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
//         n.queue=[];t=b.createElement(e);t.async=!0;
//         t.src=v;s=b.getElementsByTagName(e)[0];
//         s.parentNode.insertBefore(t,s)}(window, document,'script',
//         'https://connect.facebook.net/en_US/fbevents.js');
//         fbq('init', '${config.facebookPixel.pixelId}');
//         fbq('track', 'PageView');
//       `}
//     </Script>
//   );
// }

// =============================================================================
// LINKEDIN INSIGHT TAG (Template - uncomment when ready)
// =============================================================================

// function LinkedInInsight() {
//   if (!config.linkedInInsight?.enabled || !config.linkedInInsight?.partnerId) {
//     return null;
//   }
//
//   return (
//     <Script id="linkedin-insight" strategy="afterInteractive">
//       {`
//         _linkedin_partner_id = "${config.linkedInInsight.partnerId}";
//         window._linkedin_data_partner_ids = window._linkedin_data_partner_ids || [];
//         window._linkedin_data_partner_ids.push(_linkedin_partner_id);
//         (function(l) {
//           if (!l){window.lintrk = function(a,b){window.lintrk.q.push([a,b])};
//           window.lintrk.q=[]}
//           var s = document.getElementsByTagName("script")[0];
//           var b = document.createElement("script");
//           b.type = "text/javascript";b.async = true;
//           b.src = "https://snap.licdn.com/li.lms-analytics/insight.min.js";
//           s.parentNode.insertBefore(b, s);})(window.lintrk);
//       `}
//     </Script>
//   );
// }

// =============================================================================
// MAIN ANALYTICS COMPONENT
// Add new tracking components here as you enable them
// =============================================================================

export function Analytics() {
  return (
    <>
      <GoogleAnalytics />
      {/* Add future pixels here:
      <FacebookPixel />
      <LinkedInInsight />
      */}
    </>
  );
}

export default Analytics;
