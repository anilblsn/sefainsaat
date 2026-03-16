import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import HomePage from './pages/HomePage';
import SatisiDevamEdenProjeler from './pages/SatisiDevamEdenProjeler';
import TamamlananProjeler from './pages/TamamlananProjeler';
import PlanlananProjeler from './pages/PlanlananProjeler';
import IletisimSayfasi from './pages/IletisimSayfasi';
import HakkimizdaSayfasi from './pages/HakkimizdaSayfasi';
import './App.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/hakkimizda" element={<HakkimizdaSayfasi />} />
          <Route path="/satisi-devam-eden-projeler" element={<SatisiDevamEdenProjeler />} />
          <Route path="/tamamlanan-projeler" element={<TamamlananProjeler />} />
          <Route path="/planlanan-projeler" element={<PlanlananProjeler />} />
          <Route path="/iletisim" element={<IletisimSayfasi />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
