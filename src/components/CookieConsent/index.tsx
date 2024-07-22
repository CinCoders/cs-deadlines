import ReactCookieConsent from 'react-cookie-consent';

export function CookieConsent() {
  return (
    <ReactCookieConsent
      location='bottom'
      buttonText='Aceitar'
      declineButtonText='Rejeitar'
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
      onAccept={() => {}}
      onDecline={() => {}}
      expires={150}
    >
      O CS Conference Deadlines utiliza cookies para garantir que você obtenha a melhor experiência em nosso site.
    </ReactCookieConsent>
  );
}
