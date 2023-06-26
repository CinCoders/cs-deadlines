import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home/index';
import ConferencePage from './components/ConferencePage';

function Rotas() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path={'/'}
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

export default Rotas;
