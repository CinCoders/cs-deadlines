import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home/index';
import ConferencePage from './components/ConferencePage';

function RoutesApp() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path={process.env.PUBLIC_URL}
          element={
            <ConferencePage>
              <Home />
            </ConferencePage>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default RoutesApp;
