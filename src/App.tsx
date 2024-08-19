import { CssBaseline } from '@mui/material';
import ReactGA from 'react-ga4';
import RoutesApp from './routes';

function App() {
  ReactGA.gtag('consent', 'default', {
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
    analytics_storage: 'denied',
  });
  if (process.env.REACT_APP_GOOGLE_ANALYTICS_ID) {
    ReactGA.initialize(process.env.REACT_APP_GOOGLE_ANALYTICS_ID);
  }

  return (
    <>
      <CssBaseline />
      <RoutesApp />
    </>
  );
}

export default App;
