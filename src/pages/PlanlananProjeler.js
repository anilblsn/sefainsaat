import React from 'react';
import { useSearchParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import ProjeDetay from '../components/ProjeDetay';
import Iletisim from '../components/Iletisim';
import Footer from '../components/Footer';
import './PlanlananProjeler.css';

import kartal0 from '../assets/planlananprojects/1-EVİNPARK KARTAL/0.jpg';
import kartal1 from '../assets/planlananprojects/1-EVİNPARK KARTAL/1.jpg';

import kasaba0 from '../assets/planlananprojects/4- EVİNPARK KASABA/0.jpg';

import omerli0 from '../assets/planlananprojects/5- EVİNPARK ÖMERLİ/0.jpg';
import omerli1 from '../assets/planlananprojects/5- EVİNPARK ÖMERLİ/1.jpg';

const KARTAL_IMAGES = [kartal0, kartal1];
const KASABA_IMAGES = [kasaba0];
const OMERLI_IMAGES = [omerli0, omerli1];

const CONTENT = {
  tr: {
    bannerTitle: 'Planlanan Projeler',
    kartal: {
      title: 'EVİNPARK Kartal',
      description: 'EVİNPARK Kartal projesi; konumu ve yaşam alanlarıyla öne çıkan planlanan bir projedir.',
      details: [],
    },
    kasaba: {
      title: 'EVİNPARK Kasaba',
      description: 'EVİNPARK Kasaba projesi; planlama aşamasında olan projemizdir. Detaylar yakında güncellenecektir.',
      details: [],
    },
    omerli: {
      title: 'EVİNPARK Ömerli',
      description: 'EVİNPARK Ömerli projesi; planlama aşamasında olan projemizdir. Detaylar yakında güncellenecektir.',
      details: [],
    },
  },
  en: {
    bannerTitle: 'Planned Projects',
    kartal: {
      title: 'EVİNPARK Kartal',
      description: 'EVİNPARK Kartal is a planned project that stands out with its location and living spaces.',
      details: [],
    },
    kasaba: {
      title: 'EVİNPARK Kasaba',
      description: 'EVİNPARK Kasaba is a planned project. Details will be updated soon.',
      details: [],
    },
    omerli: {
      title: 'EVİNPARK Ömerli',
      description: 'EVİNPARK Ömerli is a planned project. Details will be updated soon.',
      details: [],
    },
  },
};

function PlanlananProjeler() {
  const [searchParams] = useSearchParams();
  const lang = searchParams.get('lang') === 'en' ? 'en' : 'tr';
  const c = CONTENT[lang];

  return (
    <>
      <Navbar />
      <section className="planlanan-projeler-banner">
        <div className="planlanan-projeler-banner__overlay" />
        <h1 className="planlanan-projeler-banner__title">{c.bannerTitle}</h1>
      </section>
      <main className="planlanan-projeler">
        <ProjeDetay
          developer="Sefa İnşaat"
          title={c.kartal.title}
          images={KARTAL_IMAGES}
          details={c.kartal.details}
          description={c.kartal.description}
          websiteUrl="#"
        />
        <ProjeDetay
          developer="Sefa İnşaat"
          title={c.kasaba.title}
          images={KASABA_IMAGES}
          details={c.kasaba.details}
          description={c.kasaba.description}
          websiteUrl="#"
        />
        <ProjeDetay
          developer="Sefa İnşaat"
          title={c.omerli.title}
          images={OMERLI_IMAGES}
          details={c.omerli.details}
          description={c.omerli.description}
          websiteUrl="#"
        />
      </main>
      <Iletisim />
      <Footer />
    </>
  );
}

export default PlanlananProjeler;
