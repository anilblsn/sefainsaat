import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Hakkimizda from '../components/Hakkimizda';
import Hizmetlerimiz from '../components/Hizmetlerimiz';
import OneCikanProjeler from '../components/OneCikanProjeler';
import Iletisim from '../components/Iletisim';
import Footer from '../components/Footer';

function HomePage() {
  return (
    <>
      <Navbar />
      <Hero />
      <Hakkimizda />
      <Hizmetlerimiz />
      <OneCikanProjeler />
      <Iletisim />
      <Footer />
    </>
  );
}

export default HomePage;
