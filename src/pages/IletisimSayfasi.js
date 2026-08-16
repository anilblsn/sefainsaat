import React from 'react';
import Navbar from '../components/Navbar';
import IletisimSayfaIcerik from '../components/IletisimSayfaIcerik';
import Footer from '../components/Footer';
import { pickContent, useLang } from '../utils/lang';
import bannerBg from '../assets/covers/iletisim-bg.jpg';
import './IletisimSayfasi.css';

const BANNER_TITLE = {
  tr: 'İletişime Geçin',
  en: 'Contact Us',
  ar: 'تواصل معنا',
};

function IletisimSayfasi() {
  const lang = useLang();

  return (
    <>
      <Navbar />
      <section className="iletisim-sayfasi-banner">
        <img src={bannerBg} alt="" className="iletisim-sayfasi-banner__bg" />
        <div className="iletisim-sayfasi-banner__overlay" />
        <h1 className="iletisim-sayfasi-banner__title">{pickContent(BANNER_TITLE, lang)}</h1>
      </section>
      <main className="iletisim-sayfasi">
        <IletisimSayfaIcerik lang={lang} />
      </main>
      <Footer />
    </>
  );
}

export default IletisimSayfasi;
