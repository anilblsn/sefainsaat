import React from 'react';
import { useSearchParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import ProjeDetay from '../components/ProjeDetay';
import Iletisim from '../components/Iletisim';
import Footer from '../components/Footer';
import './SatisiDevamEdenProjeler.css';

import evinpark0 from '../assets/devamedenprojects/1-EVİNPARK ORMAN/0.JPG';
import evinpark1 from '../assets/devamedenprojects/1-EVİNPARK ORMAN/1.JPG';
import evinpark2 from '../assets/devamedenprojects/1-EVİNPARK ORMAN/2.JPG';
import evinpark3 from '../assets/devamedenprojects/1-EVİNPARK ORMAN/3.JPG';
import evinpark4 from '../assets/devamedenprojects/1-EVİNPARK ORMAN/4.JPG';

import harput0 from '../assets/devamedenprojects/2- EVİNPARK HARPUT/0.jpg';
import harput1 from '../assets/devamedenprojects/2- EVİNPARK HARPUT/1.jpg';
import harput2 from '../assets/devamedenprojects/2- EVİNPARK HARPUT/2.jpg';
import harput3 from '../assets/devamedenprojects/2- EVİNPARK HARPUT/3.jpg';
import harput4 from '../assets/devamedenprojects/2- EVİNPARK HARPUT/4.jpg';

import cekmekoy0 from '../assets/planlananprojects/2-EVİNPARK ÇEKMEKÖY/0.jpg';

const EVİNPARK_IMAGES = [evinpark0, evinpark1, evinpark2, evinpark3, evinpark4];
const HARPUT_IMAGES = [harput0, harput1, harput2, harput3, harput4];
const CEKMEKOY_IMAGES = [cekmekoy0];

const CONTENT = {
  tr: {
    bannerTitle: 'Satışı Devam Eden Projeler',
    evinpark: {
      title: 'EVİNPARK Orman',
      description: 'Doğayla iç içe, %70 peyzaj ve yeşil alan oranıyla villalar; çatı terasları, hobi bahçeleri ve geniş bahçe alanlarıyla konforlu bir yaşam sunar.',
      details: [],
    },
    harput: {
      title: 'EVİNPARK Harput',
      description: 'EVİNPARK Harput projesi; konumu, konforu ve yaşam alanlarıyla öne çıkan bir projedir.',
      details: [],
    },
    cekmekoy: {
      title: 'EVİNPARK Çekmeköy',
      description: 'EVİNPARK Çekmeköy projesi; satışı devam eden projelerimiz arasındadır.',
      details: [],
    },
  },
  en: {
    bannerTitle: 'Ongoing Sales Projects',
    evinpark: {
      title: 'EVİNPARK Orman',
      description: 'Villas surrounded by nature with 70% landscaping and green area; offering a comfortable lifestyle with roof terraces, hobby gardens and spacious garden areas.',
      details: [],
    },
    harput: {
      title: 'EVİNPARK Harput',
      description: 'EVİNPARK Harput stands out with its location, comfort and living spaces.',
      details: [],
    },
    cekmekoy: {
      title: 'EVİNPARK Çekmeköy',
      description: 'EVİNPARK Çekmeköy is among our ongoing sales projects.',
      details: [],
    },
  },
};

function SatisiDevamEdenProjeler() {
  const [searchParams] = useSearchParams();
  const lang = searchParams.get('lang') === 'en' ? 'en' : 'tr';
  const c = CONTENT[lang];

  return (
    <>
      <Navbar />
      <section className="satisi-devam-eden-banner">
        <div className="satisi-devam-eden-banner__overlay" />
        <h1 className="satisi-devam-eden-banner__title">{c.bannerTitle}</h1>
      </section>
      <main className="satisi-devam-eden">
        <ProjeDetay
          developer="Sefa İnşaat"
          title={c.evinpark.title}
          images={EVİNPARK_IMAGES}
          details={c.evinpark.details}
          description={c.evinpark.description}
          websiteUrl="#"
        />
        <ProjeDetay
          developer="Sefa İnşaat"
          title={c.harput.title}
          images={HARPUT_IMAGES}
          details={c.harput.details}
          description={c.harput.description}
          websiteUrl="#"
        />
        <ProjeDetay
          developer="Sefa İnşaat"
          title={c.cekmekoy.title}
          images={CEKMEKOY_IMAGES}
          details={c.cekmekoy.details}
          description={c.cekmekoy.description}
          websiteUrl="#"
        />
      </main>
      <Iletisim />
      <Footer />
    </>
  );
}

export default SatisiDevamEdenProjeler;
