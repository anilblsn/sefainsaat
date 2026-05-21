import React from 'react';
import { useSearchParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import ProjeDetay from '../components/ProjeDetay';
import Iletisim from '../components/Iletisim';
import Footer from '../components/Footer';
import './SatisiDevamEdenProjeler.css';

import gokturk0 from '../assets/tamamlananprojects/1-EVİNPARK GÖKTÜRK/0.jpg';
import gokturk1 from '../assets/tamamlananprojects/1-EVİNPARK GÖKTÜRK/1.jpg';
import gokturk2 from '../assets/tamamlananprojects/1-EVİNPARK GÖKTÜRK/2.jpg';
import gokturk3 from '../assets/tamamlananprojects/1-EVİNPARK GÖKTÜRK/3.jpg';
import gokturk4 from '../assets/tamamlananprojects/1-EVİNPARK GÖKTÜRK/4.jpg';
import gokturk5 from '../assets/tamamlananprojects/1-EVİNPARK GÖKTÜRK/5.jpg';
import gokturk6 from '../assets/tamamlananprojects/1-EVİNPARK GÖKTÜRK/6.jpg';

import kemer0 from '../assets/tamamlananprojects/2-EVİNPARK KEMER/0.jpg';
import kemer1 from '../assets/tamamlananprojects/2-EVİNPARK KEMER/1.jpg';
import kemer2 from '../assets/tamamlananprojects/2-EVİNPARK KEMER/2.jpg';
import kemer3 from '../assets/tamamlananprojects/2-EVİNPARK KEMER/3.jpg';
import kemer4 from '../assets/tamamlananprojects/2-EVİNPARK KEMER/4.jpg';

import orman0 from '../assets/devamedenprojects/1-EVİNPARK ORMAN/0.JPG';
import orman1 from '../assets/devamedenprojects/1-EVİNPARK ORMAN/1.JPG';
import orman2 from '../assets/devamedenprojects/1-EVİNPARK ORMAN/2.JPG';
import orman3 from '../assets/devamedenprojects/1-EVİNPARK ORMAN/3.JPG';
import orman4 from '../assets/devamedenprojects/1-EVİNPARK ORMAN/4.JPG';

import cinar0 from '../assets/tamamlananprojects/4-EVİNPARK ÇINAR/0.png';
import cinar1 from '../assets/tamamlananprojects/4-EVİNPARK ÇINAR/1.png';
import cinar2 from '../assets/tamamlananprojects/4-EVİNPARK ÇINAR/2.png';
import cinar3 from '../assets/tamamlananprojects/4-EVİNPARK ÇINAR/3.png';

import dededen0 from '../assets/tamamlananprojects/5-DEDEDEN APT/0.png';
import dededen1 from '../assets/tamamlananprojects/5-DEDEDEN APT/1.jpg';

import harput0 from '../assets/devamedenprojects/2- EVİNPARK HARPUT/0.jpg';
import harput1 from '../assets/devamedenprojects/2- EVİNPARK HARPUT/1.jpg';
import harput2 from '../assets/devamedenprojects/2- EVİNPARK HARPUT/2.jpg';
import harput3 from '../assets/devamedenprojects/2- EVİNPARK HARPUT/3.jpg';
import harput4 from '../assets/devamedenprojects/2- EVİNPARK HARPUT/4.jpg';

import cekmekoy0 from '../assets/planlananprojects/2-EVİNPARK ÇEKMEKÖY/0.jpg';

const GOKTURK_IMAGES = [gokturk0, gokturk1, gokturk2, gokturk3, gokturk4, gokturk5, gokturk6];
const KEMER_IMAGES = [kemer0, kemer1, kemer2, kemer3, kemer4];
const ORMAN_IMAGES = [orman0, orman1, orman2, orman3, orman4];
const CINAR_IMAGES = [cinar0, cinar1, cinar2, cinar3];
const DEDEDEN_IMAGES = [dededen0, dededen1];
const HARPUT_IMAGES = [harput0, harput1, harput2, harput3, harput4];
const CEKMEKOY_IMAGES = [cekmekoy0];

const CONTENT = {
  tr: {
    bannerTitle: 'Satışı Devam Eden Projeler',
    projects: [
      {
        key: 'gokturk',
        title: 'EVİNPARK Göktürk',
        description: 'EVİNPARK Göktürk; konumu, konforu ve yaşam alanlarıyla öne çıkan bir projemizdir.',
        images: GOKTURK_IMAGES,
      },
      {
        key: 'kemer',
        title: 'EVİNPARK Kemer',
        description: 'EVİNPARK Kemer; modern yaşam alanlarıyla satışı devam eden projelerimiz arasındadır.',
        images: KEMER_IMAGES,
      },
      {
        key: 'orman',
        title: 'EVİNPARK Orman',
        description: 'Doğayla iç içe, %70 peyzaj ve yeşil alan oranıyla villalar; çatı terasları, hobi bahçeleri ve geniş bahçe alanlarıyla konforlu bir yaşam sunar.',
        images: ORMAN_IMAGES,
      },
      {
        key: 'cinar',
        title: 'EVİNPARK Çınar',
        description: 'EVİNPARK Çınar; konumu ve yaşam alanlarıyla öne çıkan satışı devam eden projemizdir.',
        images: CINAR_IMAGES,
      },
      {
        key: 'dededen',
        title: 'Dededen Apartmanı',
        description: 'Dededen Apartmanı; konumu ve konforuyla satışı devam eden projemizdir.',
        images: DEDEDEN_IMAGES,
      },
      {
        key: 'harput',
        title: 'EVİNPARK Harput',
        description: 'EVİNPARK Harput projesi; konumu, konforu ve yaşam alanlarıyla öne çıkan bir projedir.',
        images: HARPUT_IMAGES,
      },
      {
        key: 'cekmekoy',
        title: 'EVİNPARK Çekmeköy',
        description: 'EVİNPARK Çekmeköy projesi; satışı devam eden projelerimiz arasındadır.',
        images: CEKMEKOY_IMAGES,
      },
    ],
  },
  en: {
    bannerTitle: 'Ongoing Sales Projects',
    projects: [
      {
        key: 'gokturk',
        title: 'EVİNPARK Göktürk',
        description: 'EVİNPARK Göktürk is one of our ongoing sales projects, standing out with its location, comfort and living spaces.',
        images: GOKTURK_IMAGES,
      },
      {
        key: 'kemer',
        title: 'EVİNPARK Kemer',
        description: 'EVİNPARK Kemer is among our ongoing sales projects with its modern living spaces.',
        images: KEMER_IMAGES,
      },
      {
        key: 'orman',
        title: 'EVİNPARK Orman',
        description: 'Villas surrounded by nature with 70% landscaping and green area; offering a comfortable lifestyle with roof terraces, hobby gardens and spacious garden areas.',
        images: ORMAN_IMAGES,
      },
      {
        key: 'cinar',
        title: 'EVİNPARK Çınar',
        description: 'EVİNPARK Çınar is an ongoing sales project that stands out with its location and living spaces.',
        images: CINAR_IMAGES,
      },
      {
        key: 'dededen',
        title: 'Dededen Apartment',
        description: 'Dededen Apartment is an ongoing sales project with its location and comfort.',
        images: DEDEDEN_IMAGES,
      },
      {
        key: 'harput',
        title: 'EVİNPARK Harput',
        description: 'EVİNPARK Harput stands out with its location, comfort and living spaces.',
        images: HARPUT_IMAGES,
      },
      {
        key: 'cekmekoy',
        title: 'EVİNPARK Çekmeköy',
        description: 'EVİNPARK Çekmeköy is among our ongoing sales projects.',
        images: CEKMEKOY_IMAGES,
      },
    ],
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
        {c.projects.map((proje) => (
          <ProjeDetay
            key={proje.key}
            developer="Sefa İnşaat"
            title={proje.title}
            images={proje.images}
            details={[]}
            description={proje.description}
            websiteUrl="#"
          />
        ))}
      </main>
      <Iletisim />
      <Footer />
    </>
  );
}

export default SatisiDevamEdenProjeler;
