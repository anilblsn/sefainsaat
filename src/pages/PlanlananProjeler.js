import React from 'react';
import Navbar from '../components/Navbar';
import ProjeDetay from '../components/ProjeDetay';
import Iletisim from '../components/Iletisim';
import Footer from '../components/Footer';
import { pickContent, useLang } from '../utils/lang';
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
    websiteLabel: 'Websitesi',
    kartal: {
      title: 'EVİNPARK Kartal',
      description: 'EVİNPARK Kartal projesi; planlama aşamasında olan projemizdir. Detaylar yakında güncellenecektir.',
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
    websiteLabel: 'Website',
    kartal: {
      title: 'EVİNPARK Kartal',
      description: 'EVİNPARK Kartal is a planned project. Details will be updated soon.',
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
  ar: {
    bannerTitle: 'المشاريع المخططة',
    websiteLabel: 'الموقع',
    kartal: {
      title: 'EVİNPARK Kartal',
      description: 'مشروع EVİNPARK Kartal في مرحلة التخطيط. سيتم تحديث التفاصيل قريباً.',
      details: [],
    },
    kasaba: {
      title: 'EVİNPARK Kasaba',
      description: 'مشروع EVİNPARK Kasaba في مرحلة التخطيط. سيتم تحديث التفاصيل قريباً.',
      details: [],
    },
    omerli: {
      title: 'EVİNPARK Ömerli',
      description: 'مشروع EVİNPARK Ömerli في مرحلة التخطيط. سيتم تحديث التفاصيل قريباً.',
      details: [],
    },
  },
};

function PlanlananProjeler() {
  const lang = useLang();
  const c = pickContent(CONTENT, lang);

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
          websiteLabel={c.websiteLabel}
        />
        <ProjeDetay
          developer="Sefa İnşaat"
          title={c.kasaba.title}
          images={KASABA_IMAGES}
          details={c.kasaba.details}
          description={c.kasaba.description}
          websiteUrl="#"
          websiteLabel={c.websiteLabel}
        />
        <ProjeDetay
          developer="Sefa İnşaat"
          title={c.omerli.title}
          images={OMERLI_IMAGES}
          details={c.omerli.details}
          description={c.omerli.description}
          websiteUrl="#"
          websiteLabel={c.websiteLabel}
        />
      </main>
      <Iletisim />
      <Footer />
    </>
  );
}

export default PlanlananProjeler;
