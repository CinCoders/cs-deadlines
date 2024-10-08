import { useEffect, useState } from 'react';
import { Page } from '@cincoders/cinnamon';
import logoCin from '../../assets/cin-logo.svg';
import logoCinSmall from '../../assets/cin-logo-small.svg';
import { CookieConsent } from '../CookieConsent';

interface PageProps {
  children: JSX.Element | JSX.Element[];
}

export default function ConferencePage({ children }: PageProps) {
  const [logoSrc, setLogoSrc] = useState(window.innerWidth >= 900 ? logoCin : logoCinSmall);
  const [title, setTitle] = useState(window.innerWidth >= 900 ? 'Top CS Conference Deadlines' : 'Conference Deadlines');

  useEffect(() => {
    const handleResize = () => {
      setLogoSrc(window.innerWidth >= 900 ? logoCin : logoCinSmall);
      setTitle(window.innerWidth >= 900 ? 'Top CS Conference Deadlines' : 'Conference Deadlines');
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <Page
      navbar={{
        title,
        isLandingPage: true,
        hiddenUser: true,
        logoSrc,
        logoRedirectUrl: 'https://portal.cin.ufpe.br/',
      }}
      footer={{
        copyrightText: 'CIn UFPE | Todos os direitos reservados',
        largeFooter: false,
      }}
      haveToast={false}
      createNavbarContext={false}
    >
      <div>{children}</div>
      <CookieConsent />
    </Page>
  );
}
