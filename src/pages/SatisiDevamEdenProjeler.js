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

const EVINPARK_IMAGES = [evinpark0, evinpark1, evinpark2, evinpark3, evinpark4];
const HARPUT_IMAGES = [harput0, harput1, harput2, harput3, harput4];

const CONTENT = {
  tr: {
    bannerTitle: 'Satışı Devam Eden Projeler',
    evinpark: {
      title: 'Evınpark Orman',
      description: 'Doğayla iç içe, %70 peyzaj ve yeşil alan oranıyla villalar; çatı terasları, hobi bahçeleri ve geniş bahçe alanlarıyla konforlu bir yaşam sunar.',
      details: [
        { icon: 'building', label: 'İnşaat Alanı', value: '2880,95 m²' },
        { icon: 'ruler', label: 'Proje alanı', value: '5.500 m²' },
        { icon: 'calendar', label: 'Ruhsat Tarihi', value: '23.10.2024' },
        { icon: 'house', label: 'Villa sayısı', value: '9' },
        { icon: 'house', label: 'Villa tipleri', value: '3+1 - 4+1' },
        { icon: 'calendar', label: 'Teslim Tarihi', value: 'Aralık 2025' },
        { icon: 'calendar', label: 'İskan tarihi', value: '21.11.2025' },
      ],
    },
    harput: {
      title: 'Evınpark Harput',
      description: 'Evınpark Harput projesi; konumu, konforu ve yaşam alanlarıyla öne çıkan bir projedir.',
      details: [
        { icon: 'building', label: 'İnşaat Alanı', value: '—' },
        { icon: 'ruler', label: 'Proje alanı', value: '—' },
        { icon: 'calendar', label: 'Ruhsat Tarihi', value: '—' },
        { icon: 'house', label: 'Villa sayısı', value: '—' },
        { icon: 'house', label: 'Villa tipleri', value: '—' },
        { icon: 'calendar', label: 'Teslim Tarihi', value: '—' },
        { icon: 'calendar', label: 'İskan tarihi', value: '—' },
      ],
    },
  },
  en: {
    bannerTitle: 'Ongoing Sales Projects',
    evinpark: {
      title: 'Evınpark Orman',
      description: 'Villas surrounded by nature with 70% landscaping and green area; offering a comfortable lifestyle with roof terraces, hobby gardens and spacious garden areas.',
      details: [
        { icon: 'building', label: 'Construction Area', value: '2,880.95 m²' },
        { icon: 'ruler', label: 'Project Area', value: '5,500 m²' },
        { icon: 'calendar', label: 'Permit Date', value: '23.10.2024' },
        { icon: 'house', label: 'Number of Villas', value: '9' },
        { icon: 'house', label: 'Villa Types', value: '3+1 - 4+1' },
        { icon: 'calendar', label: 'Delivery Date', value: 'December 2025' },
        { icon: 'calendar', label: 'Occupancy Date', value: '21.11.2025' },
      ],
    },
    harput: {
      title: 'Evınpark Harput',
      description: 'Evınpark Harput stands out with its location, comfort and living spaces.',
      details: [
        { icon: 'building', label: 'Construction Area', value: '—' },
        { icon: 'ruler', label: 'Project Area', value: '—' },
        { icon: 'calendar', label: 'Permit Date', value: '—' },
        { icon: 'house', label: 'Number of Villas', value: '—' },
        { icon: 'house', label: 'Villa Types', value: '—' },
        { icon: 'calendar', label: 'Delivery Date', value: '—' },
        { icon: 'calendar', label: 'Occupancy Date', value: '—' },
      ],
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
          images={EVINPARK_IMAGES}
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
      </main>
      <Iletisim />
      <Footer />
    </>
  );
}

export default SatisiDevamEdenProjeler;
