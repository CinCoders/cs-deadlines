import { useEffect } from 'react';
import ReactCookieConsent, { getCookieConsentValue } from 'react-cookie-consent';
import ReactGA from 'react-ga4';

export function CookieConsent() {
  function allConsentUpdate(granted: boolean) {
    const state = granted ? 'granted' : 'denied';

    ReactGA.gtag('consent', 'update', {
      ad_storage: state,
      ad_user_data: state,
      ad_personalization: state,
      analytics_storage: state,
    });
  }

  useEffect(() => {
    if (getCookieConsentValue('CookieConsent') === 'true') {
      allConsentUpdate(true);
    }
  }, []);

  return (
    <ReactCookieConsent
      location='bottom'
      buttonText='Accept'
      declineButtonText='Decline'
      enableDeclineButton
      buttonStyle={{
        background: '#db1e2f',
        fontWeight: 'bold',
        color: '#fafafa',
        fontSize: '14px',
        borderRadius: '4px',
      }}
      declineButtonStyle={{
        background: 'transparent',
        border: '2px solid #db1e2f',
        borderRadius: '4px',
        fontWeight: 'bold',
        color: '#fafafa',
      }}
      onAccept={() => allConsentUpdate(true)}
      onDecline={() => allConsentUpdate(false)}
      expires={150}
      style={{ background: 'rgba(53, 53, 53, 0.97)', backdropFilter: 'blur(20px)' }}
    >
      <div style={{ textAlign: 'justify' }}>
        This website uses cookies to ensure you get the best experience on our website.
      </div>
    </ReactCookieConsent>
  );
}
