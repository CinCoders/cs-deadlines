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
      onAccept={() => {
        ('');
      }}
      onDecline={() => {
        ('');
      }}
      expires={150}
      style={{ background: 'rgba(53, 53, 53, 0.97)', backdropFilter: 'blur(20px);' }}
    >
      <h3>Nós nos importamos com sua Privacidade </h3>
      <div style={{ textAlign: 'justify' }}>
        O site CS Conference Deadlines utiliza cookies para coletar dados sobre visitas e origem do tráfego dos nossos
        visitantes. Estes rastreadores nos ajudam a melhorar nossos serviços continuamente. Todas as informações
        coletadas por esse tipo de cookies são agregadas, o que significa que não conseguimos identificá-lo
        individualmente. Se você não permitir estes cookies, não saberemos quando visitou nossas plataformas. Ao clicar
        em &quot;Aceitar&quot;, você concorda com o uso desses cookies.
      </div>
    </ReactCookieConsent>
  );
}
