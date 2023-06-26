import { Page } from '@cincoders/cinnamon';
import { useCallback } from 'react';
import RecentActorsIcon from '@mui/icons-material/RecentActors';

interface PageProps {
  children: JSX.Element | JSX.Element[];
}

export default function ConferencePage({ children }: PageProps) {
  // const RecentActorsIconComponent = useCallback(
  //   () => <RecentActorsIcon sx={{ display: 'center', marginLeft: '2rem' }} fontSize='large' htmlColor='#DB1E2F' />,
  //   [],
  // );

  return (
    <Page
      navbar={{
        title: 'Top CS Conference Deadlines',
        // IconComponent: RecentActorsIconComponent,
        hiddenUser: true,
        isLandingPage: true,
       
      }}
      footer={{
        copyrightText: 'CIn UFPE | Todos os direitos reservados',
      }}
      centralized
      haveToast
      createNavbarContext={false}
    >
      {children}
    </Page>
  );
}
