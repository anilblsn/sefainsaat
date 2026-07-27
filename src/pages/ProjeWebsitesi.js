import React, { useEffect, useMemo, useState } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import logoImg from '../assets/logo/logo2.png';
import { getOngoingProject } from '../data/ongoingProjects';
import { pickContent, useLang, withLang } from '../utils/lang';
import './ProjeWebsitesi.css';

const plansContext = require.context(
  '../assets/daireler',
  true,
  /\.(jpe?g|png|pdf)$/i
);

const PLAN_FOLDER_BY_KEY = {
  gokturk: '1-Evinpark Göktürk',
  kemer: '2-Evinpark Kemer',
  orman: '3-Evinpark Orman',
  cinar: '4- Evinpark Çınar',
  dededen: '5- Dededen Apartmanı',
  cekmekoy: '6-Evinpark Çekmeköy',
  harput: '7-Evinpark Harput',
};

const UNIT_TYPE_RE = /^\d+(?:[.,]\d+)?\+\d+$/;

function getUnitTypesForProject(key) {
  const folder = PLAN_FOLDER_BY_KEY[key];
  if (!folder) return [];
  const labels = new Set();
  plansContext.keys().forEach((path) => {
    const parts = path.replace(/^\.\//, '').split('/');
    if (parts[0] !== folder) return;
    parts.slice(1, -1).forEach((dir) => {
      if (UNIT_TYPE_RE.test(dir)) labels.add(dir.replace('.', ','));
      const upper = dir.toLocaleUpperCase('tr-TR');
      if (upper === 'DUBLEKS') labels.add('Dubleks');
      if (upper === 'FOURLEX') labels.add('Fourlex');
    });
  });
  return Array.from(labels);
}

const UI = {
  tr: {
    contact: 'İletişim',
    about: 'Proje Hakkında',
    highlights: 'Öne Çıkanlar',
    details: 'Proje Bilgileri',
    location: 'Konum',
    status: 'Durum',
    type: 'Tip',
    units: 'Daire Tipleri',
    gallery: 'Galeri',
    cta: 'İletişime Geçin',
    phone: 'Telefon',
    email: 'E-posta',
    back: 'Sefa İnşaat',
    developer: 'Sefa İnşaat',
    address: 'Adres',
    office: 'Suadiye, Bağdat Cad. No:451 D:8, Kadıköy/İstanbul',
  },
  en: {
    contact: 'Contact',
    about: 'About the Project',
    highlights: 'Highlights',
    details: 'Project Details',
    location: 'Location',
    status: 'Status',
    type: 'Type',
    units: 'Unit Types',
    gallery: 'Gallery',
    cta: 'Contact Us',
    phone: 'Phone',
    email: 'E-mail',
    back: 'Sefa Construction',
    developer: 'Sefa Construction',
    address: 'Address',
    office: 'Suadiye, Bağdat Cad. No:451 D:8, Kadıköy/Istanbul',
  },
  ar: {
    contact: 'اتصل بنا',
    about: 'عن المشروع',
    highlights: 'أبرز المزايا',
    details: 'معلومات المشروع',
    location: 'الموقع',
    status: 'الحالة',
    type: 'النوع',
    units: 'أنواع الشقق',
    gallery: 'المعرض',
    cta: 'تواصل معنا',
    phone: 'الهاتف',
    email: 'البريد الإلكتروني',
    back: 'سيفا للإنشاءات',
    developer: 'سيفا للإنشاءات',
    address: 'العنوان',
    office: 'Suadiye, Bağdat Cad. No:451 D:8, Kadıköy/İstanbul',
  },
};

const toTitle = (s) =>
  s
    .toLocaleLowerCase('tr-TR')
    .split(' ')
    .map((w) => (w ? w.charAt(0).toLocaleUpperCase('tr-TR') + w.slice(1) : w))
    .join(' ');

function ProjectBrandTitle({ title }) {
  if (!title) return null;
  const parts = title.split(' ');
  const first = parts[0];
  const rest = parts.slice(1).join(' ');
  const isEvinpark = first.toLocaleUpperCase('tr-TR') === 'EVİNPARK';
  return (
    <h1 className="proje-site__brand">
      <span className={`proje-site__brand-line ${isEvinpark ? 'proje-site__brand-line--evinpark' : ''}`}>
        {isEvinpark ? first.toLocaleLowerCase('tr-TR') : toTitle(first)}
      </span>
      {rest ? <span className="proje-site__brand-line">{toTitle(rest)}</span> : null}
    </h1>
  );
}

function ProjeWebsitesi() {
  const { slug } = useParams();
  const lang = useLang();
  const ui = pickContent(UI, lang);
  const project = getOngoingProject(slug, lang);
  const [ready, setReady] = useState(false);
  const [activeImage, setActiveImage] = useState(0);

  const unitTypes = useMemo(
    () => (project ? getUnitTypesForProject(project.key) : []),
    [project]
  );

  useEffect(() => {
    setActiveImage(0);
    const t = requestAnimationFrame(() => setReady(true));
    return () => cancelAnimationFrame(t);
  }, [slug]);

  if (!project) {
    return <Navigate to={withLang('/', lang)} replace />;
  }

  const images = project.images;
  const contactHref = withLang('/iletisim', lang);
  const homeHref = withLang('/', lang);
  const mainImage = images[activeImage] || images[0];

  return (
    <div className={`proje-site ${ready ? 'proje-site--ready' : ''}`}>
      <header className="proje-site__top">
        <Link to={homeHref} className="proje-site__logo-link" aria-label={ui.back}>
          <img src={logoImg} alt="Sefa İnşaat" className="proje-site__logo" />
        </Link>
        <span className="proje-site__top-name">{project.title}</span>
        <Link to={contactHref} className="proje-site__top-contact">
          {ui.contact}
        </Link>
      </header>

      <main className="proje-site__main">
        <section className="proje-site__intro">
          <p className="proje-site__developer">{ui.developer}</p>
          <ProjectBrandTitle title={project.title} />
          <p className="proje-site__tagline">{project.tagline}</p>
        </section>

        <section className="proje-site__facts" aria-label={ui.details}>
          <div className="proje-site__fact">
            <span className="proje-site__fact-label">{ui.location}</span>
            <span className="proje-site__fact-value">{project.location}</span>
          </div>
          <div className="proje-site__fact">
            <span className="proje-site__fact-label">{ui.status}</span>
            <span className="proje-site__fact-value">{project.status}</span>
          </div>
          <div className="proje-site__fact">
            <span className="proje-site__fact-label">{ui.type}</span>
            <span className="proje-site__fact-value">{project.type}</span>
          </div>
        </section>

        {mainImage && (
          <section className="proje-site__media">
            <div className="proje-site__media-main">
              <img src={mainImage} alt={`${project.title} ${activeImage + 1}`} />
            </div>
            {images.length > 1 && (
              <div className="proje-site__thumbs" role="list">
                {images.map((src, i) => (
                  <button
                    key={`${project.key}-thumb-${i}`}
                    type="button"
                    role="listitem"
                    className={`proje-site__thumb ${i === activeImage ? 'proje-site__thumb--active' : ''}`}
                    onClick={() => setActiveImage(i)}
                    aria-label={`${project.title} ${i + 1}`}
                  >
                    <img src={src} alt="" />
                  </button>
                ))}
              </div>
            )}
          </section>
        )}

        <section className="proje-site__about">
          <h2 className="proje-site__section-title">{ui.about}</h2>
          {project.paragraphs.map((text, i) => (
            <p key={i} className="proje-site__about-text">
              {text}
            </p>
          ))}
        </section>

        {project.highlights.length > 0 && (
          <section className="proje-site__highlights">
            <h2 className="proje-site__section-title">{ui.highlights}</h2>
            <ul className="proje-site__highlight-list">
              {project.highlights.map((item) => (
                <li key={item} className="proje-site__highlight-item">
                  {item}
                </li>
              ))}
            </ul>
          </section>
        )}

        {unitTypes.length > 0 && (
          <section className="proje-site__units">
            <h2 className="proje-site__section-title">{ui.units}</h2>
            <div className="proje-site__unit-row">
              {unitTypes.map((label) => (
                <span key={label} className="proje-site__unit-chip">
                  {label}
                </span>
              ))}
            </div>
          </section>
        )}

        {images.length > 0 && (
          <section className="proje-site__gallery">
            <h2 className="proje-site__section-title">{ui.gallery}</h2>
            <div className="proje-site__gallery-strip">
              {images.map((src, i) => (
                <figure key={`${project.key}-g-${i}`} className="proje-site__gallery-item">
                  <img src={src} alt={`${project.title} ${i + 1}`} />
                </figure>
              ))}
            </div>
          </section>
        )}

        <section className="proje-site__contact">
          <h2 className="proje-site__section-title">{ui.contact}</h2>
          <p className="proje-site__contact-lead">{project.tagline}</p>
          <div className="proje-site__contact-grid">
            <div>
              <span className="proje-site__contact-label">{ui.phone}</span>
              <a href="tel:+902164451549" className="proje-site__contact-value">
                0216 445 15 49
              </a>
            </div>
            <div>
              <span className="proje-site__contact-label">{ui.email}</span>
              <a href="mailto:info@sefainsaat.com.tr" className="proje-site__contact-value">
                info@sefainsaat.com.tr
              </a>
            </div>
            <div>
              <span className="proje-site__contact-label">{ui.address}</span>
              <span className="proje-site__contact-value proje-site__contact-value--plain">
                {ui.office}
              </span>
            </div>
          </div>
          <Link to={contactHref} className="proje-site__cta proje-site__cta--solid">
            {ui.cta}
          </Link>
        </section>
      </main>

      <footer className="proje-site__footer">
        <Link to={homeHref} className="proje-site__footer-link">
          {ui.back}
        </Link>
      </footer>
    </div>
  );
}

export default ProjeWebsitesi;
