import React from 'react';
import Navbar from '../components/Navbar';
import ProjeDetay from '../components/ProjeDetay';
import Iletisim from '../components/Iletisim';
import Footer from '../components/Footer';
import { getOngoingProjects } from '../data/ongoingProjects';
import { pickContent, useLang, withLang } from '../utils/lang';
import './SatisiDevamEdenProjeler.css';

const CONTENT = {
  tr: {
    bannerTitle: 'Satışı Devam Eden Projeler',
    websiteLabel: 'Web sitesi',
    closeLabel: 'Kapat',
    prevLabel: 'Önceki',
    nextLabel: 'Sonraki',
    zoomLabel: 'Resmi büyüt',
    lightboxLabel: 'Büyütülmüş resim',
  },
  en: {
    bannerTitle: 'Ongoing Sales Projects',
    websiteLabel: 'Website',
    closeLabel: 'Close',
    prevLabel: 'Previous',
    nextLabel: 'Next',
    zoomLabel: 'Enlarge image',
    lightboxLabel: 'Enlarged image',
  },
  ar: {
    bannerTitle: 'مشاريع قيد البيع',
    websiteLabel: 'الموقع',
    closeLabel: 'إغلاق',
    prevLabel: 'السابق',
    nextLabel: 'التالي',
    zoomLabel: 'تكبير الصورة',
    lightboxLabel: 'صورة مكبرة',
  },
};

function SatisiDevamEdenProjeler() {
  const lang = useLang();
  const c = pickContent(CONTENT, lang);
  const projects = getOngoingProjects(lang);

  return (
    <>
      <Navbar />
      <section className="satisi-devam-eden-banner">
        <div className="satisi-devam-eden-banner__overlay" />
        <h1 className="satisi-devam-eden-banner__title">{c.bannerTitle}</h1>
      </section>
      <main className="satisi-devam-eden">
        {projects.map((proje) => (
          <ProjeDetay
            key={proje.key}
            developer="Sefa İnşaat"
            title={proje.title}
            images={proje.images}
            details={[]}
            description={proje.description}
            websiteUrl={withLang(`/proje/${proje.key}`, lang)}
            websiteLabel={c.websiteLabel}
            closeLabel={c.closeLabel}
            prevLabel={c.prevLabel}
            nextLabel={c.nextLabel}
            zoomLabel={c.zoomLabel}
            lightboxLabel={c.lightboxLabel}
          />
        ))}
      </main>
      <Iletisim />
      <Footer />
    </>
  );
}

export default SatisiDevamEdenProjeler;
