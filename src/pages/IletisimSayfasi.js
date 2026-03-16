import React from 'react';
import { useSearchParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import IletisimSayfaIcerik from '../components/IletisimSayfaIcerik';
import Footer from '../components/Footer';
import './IletisimSayfasi.css';

const BANNER_TITLE = {
  tr: 'İletişime Geçin',
  en: 'Contact Us',
};

function IletisimSayfasi() {
  const [searchParams] = useSearchParams();
  const lang = searchParams.get('lang') === 'en' ? 'en' : 'tr';

  return (
    <>
      <Navbar />
      <section className="iletisim-sayfasi-banner">
        <div className="iletisim-sayfasi-banner__overlay" />
        <h1 className="iletisim-sayfasi-banner__title">{BANNER_TITLE[lang]}</h1>
      </section>
      <main className="iletisim-sayfasi">
        <IletisimSayfaIcerik lang={lang} />
      </main>
      <Footer />
    </>
  );
}

export default IletisimSayfasi;
