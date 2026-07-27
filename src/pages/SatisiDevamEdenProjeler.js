import React from 'react';
import Navbar from '../components/Navbar';
import ProjeDetay from '../components/ProjeDetay';
import Iletisim from '../components/Iletisim';
import Footer from '../components/Footer';
import { getOngoingProjects } from '../data/ongoingProjects';
import { pickContent, useLang, withLang } from '../utils/lang';
import './SatisiDevamEdenProjeler.css';

const plansContext = require.context(
  '../assets/daireler',
  true,
  /\.(jpe?g|png|pdf)$/i
);

const UNIT_TYPE_RE = /^\d+(?:[.,]\d+)?\+\d+$/;

function unitSortValue(unitType) {
  const m = String(unitType || '').match(/^(\d+)(?:[.,](\d+))?\+(\d+)$/);
  if (!m) return 9000;
  const main = parseInt(m[1], 10);
  const frac = m[2] ? parseInt(m[2], 10) : 0;
  const plus = parseInt(m[3], 10);
  return main * 1000 + frac * 10 + plus;
}

function parseUnitInfo(parts) {
  const dirs = parts.slice(1, -1).filter((p) => !/^daireler$/i.test(p));
  let unitType = '';
  let layout = '';
  dirs.forEach((dir) => {
    const upper = dir.toLocaleUpperCase('tr-TR');
    if (upper === 'DUBLEKS') layout = 'Dubleks';
    else if (upper === 'FOURLEX') layout = 'Fourlex';
    else if (UNIT_TYPE_RE.test(dir)) unitType = dir.replace('.', ',');
  });
  const unitLabel = [unitType, layout].filter(Boolean).join(' · ');
  const layoutOrder = layout === 'Fourlex' ? 2 : layout === 'Dubleks' ? 1 : 0;
  const sortKey = layoutOrder * 10000 + unitSortValue(unitType);
  return { unitType, layout, unitLabel, sortKey };
}

const PLANS_BY_FOLDER = (() => {
  const map = {};
  plansContext.keys().forEach((key) => {
    const rel = key.replace(/^\.\//, '');
    const parts = rel.split('/');
    const folder = parts[0];
    const fileName = parts[parts.length - 1];
    if (/^thumbs\.db$/i.test(fileName)) return;
    const ext = (fileName.split('.').pop() || '').toLowerCase();
    const type = ext === 'pdf' ? 'pdf' : 'image';
    const src = plansContext(key);
    const name = fileName.replace(/\.[^.]+$/, '');
    const unit = parseUnitInfo(parts);
    if (!map[folder]) map[folder] = [];
    map[folder].push({ type, src, name, ...unit });
  });
  Object.keys(map).forEach((k) => {
    map[k].sort((a, b) => {
      if (a.sortKey !== b.sortKey) return a.sortKey - b.sortKey;
      if (a.type !== b.type) return a.type === 'image' ? -1 : 1;
      return a.name.localeCompare(b.name, 'tr', { numeric: true });
    });
  });
  return map;
})();

const PLAN_FOLDER_BY_KEY = {
  gokturk: '1-Evinpark Göktürk',
  kemer: '2-Evinpark Kemer',
  orman: '3-Evinpark Orman',
  cinar: '4- Evinpark Çınar',
  dededen: '5- Dededen Apartmanı',
  cekmekoy: '6-Evinpark Çekmeköy',
  harput: '7-Evinpark Harput',
};

const getPlans = (key) => PLANS_BY_FOLDER[PLAN_FOLDER_BY_KEY[key]] || [];

const CONTENT = {
  tr: {
    bannerTitle: 'Satışı Devam Eden Projeler',
    floorPlansLabel: 'Daireler',
    websiteLabel: 'Web sitesi',
    closeLabel: 'Kapat',
    prevLabel: 'Önceki',
    nextLabel: 'Sonraki',
    zoomLabel: 'Resmi büyüt',
    lightboxLabel: 'Büyütülmüş resim',
  },
  en: {
    bannerTitle: 'Ongoing Sales Projects',
    floorPlansLabel: 'Apartments',
    websiteLabel: 'Website',
    closeLabel: 'Close',
    prevLabel: 'Previous',
    nextLabel: 'Next',
    zoomLabel: 'Enlarge image',
    lightboxLabel: 'Enlarged image',
  },
  ar: {
    bannerTitle: 'مشاريع قيد البيع',
    floorPlansLabel: 'الشقق',
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
            floorPlans={getPlans(proje.key)}
            floorPlansLabel={c.floorPlansLabel}
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
