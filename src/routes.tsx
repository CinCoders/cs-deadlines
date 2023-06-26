import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useEffect } from 'react';
import Home from './pages/Home/index';
// import apiBack from './services/api';
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
