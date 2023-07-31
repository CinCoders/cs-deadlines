import { Page } from '@cincoders/cinnamon';
import logoCin from '../../assets/cin-logo.svg';

interface PageProps {
  children: JSX.Element | JSX.Element[];
}

export default function ConferencePage({ children }: PageProps) {
  return (
    <Page
      navbar={{
        title: 'Top CS Conference Deadlines',
        hiddenUser: true,
        isLandingPage: true,
        logoSrc: logoCin,
      }}
      footer={{
        copyrightText: 'CIn UFPE | Todos os direitos reservados',
        largeFooter: false,
      }}
      centralized
      haveToast={false}
      createNavbarContext={false}
    >
      {children}
    </Page>
  );
}
