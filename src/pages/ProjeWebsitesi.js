import React, { useEffect, useMemo, useState } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import logoImg from '../assets/logo/logo2.png';
import PdfThumbnail from '../components/ProjeDetay/PdfThumbnail';
import { getOngoingProject } from '../data/ongoingProjects';
import { getPlansByUnitType, getUnitTypes } from '../data/projectPlans';
import { pickContent, useLang, withLang } from '../utils/lang';
import './ProjeWebsitesi.css';

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
    closeLabel: 'Kapat',
    prevLabel: 'Önceki',
    nextLabel: 'Sonraki',
    openPdf: 'PDF’yi aç',
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
    closeLabel: 'Close',
    prevLabel: 'Previous',
    nextLabel: 'Next',
    openPdf: 'Open PDF',
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
    closeLabel: 'إغلاق',
    prevLabel: 'السابق',
    nextLabel: 'التالي',
    openPdf: 'فتح PDF',
  },
};

const ICON_PDF_BADGE = (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14 2 14 8 20 8" />
    <text x="12" y="17" textAnchor="middle" fontSize="6" fontWeight="700" fill="currentColor" stroke="none">PDF</text>
  </svg>
);

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
      {rest ? (
        <span className={`proje-site__brand-line ${isEvinpark ? 'proje-site__brand-line--project' : ''}`}>
          {isEvinpark ? rest.toLocaleLowerCase('tr-TR') : toTitle(rest)}
        </span>
      ) : null}
    </h1>
  );
}

function planCardLabel(plan) {
  if (plan.layout) return `${plan.name} · ${plan.layout}`;
  return plan.name;
}

function ProjeWebsitesi() {
  const { slug } = useParams();
  const lang = useLang();
  const ui = pickContent(UI, lang);
  const project = getOngoingProject(slug, lang);
  const [ready, setReady] = useState(false);
  const [activeImage, setActiveImage] = useState(0);
  const [activeUnit, setActiveUnit] = useState(null);
  const [planPreviewIndex, setPlanPreviewIndex] = useState(-1);

  const unitTypes = useMemo(
    () => (project ? getUnitTypes(project.key) : []),
    [project]
  );

  const activePlans = useMemo(
    () => (project && activeUnit ? getPlansByUnitType(project.key, activeUnit) : []),
    [project, activeUnit]
  );

  const currentPlan = planPreviewIndex >= 0 ? activePlans[planPreviewIndex] : null;

  useEffect(() => {
    setActiveImage(0);
    setActiveUnit(null);
    setPlanPreviewIndex(-1);
    const t = requestAnimationFrame(() => setReady(true));
    return () => cancelAnimationFrame(t);
  }, [slug]);

  useEffect(() => {
    if (planPreviewIndex < 0) return undefined;
    const onKey = (e) => {
      if (e.key === 'Escape') setPlanPreviewIndex(-1);
      if (e.key === 'ArrowLeft' && activePlans.length > 1) {
        setPlanPreviewIndex((i) => (i <= 0 ? activePlans.length - 1 : i - 1));
      }
      if (e.key === 'ArrowRight' && activePlans.length > 1) {
        setPlanPreviewIndex((i) => (i >= activePlans.length - 1 ? 0 : i + 1));
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [planPreviewIndex, activePlans.length]);

  if (!project) {
    return <Navigate to={withLang('/', lang)} replace />;
  }

  const images = project.images;
  const contactHref = withLang('/iletisim', lang);
  const homeHref = withLang('/', lang);
  const mainImage = images[activeImage] || images[0];

  const toggleUnit = (label) => {
    setActiveUnit((prev) => (prev === label ? null : label));
    setPlanPreviewIndex(-1);
  };

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
            <div className="proje-site__unit-row" role="tablist" aria-label={ui.units}>
              {unitTypes.map((label) => (
                <button
                  key={label}
                  type="button"
                  role="tab"
                  aria-selected={activeUnit === label}
                  className={`proje-site__unit-chip${activeUnit === label ? ' proje-site__unit-chip--active' : ''}`}
                  onClick={() => toggleUnit(label)}
                >
                  {label}
                </button>
              ))}
            </div>

            {activeUnit && activePlans.length > 0 && (
              <div className="proje-site__plans-panel" role="tabpanel">
                <h3 className="proje-site__plans-heading">{activeUnit}</h3>
                <div className="proje-site__plans-grid">
                  {activePlans.map((plan, i) => (
                    <button
                      type="button"
                      key={`${plan.src}-${i}`}
                      className={`proje-site__plan-card${plan.type === 'pdf' ? ' proje-site__plan-card--pdf' : ''}`}
                      onClick={() => setPlanPreviewIndex(i)}
                    >
                      <div className={`proje-site__plan-thumb${plan.type === 'pdf' ? ' proje-site__plan-thumb--pdf' : ''}`}>
                        {plan.type === 'image' ? (
                          <img src={plan.src} alt={planCardLabel(plan)} loading="lazy" />
                        ) : (
                          <>
                            <PdfThumbnail src={plan.src} alt={planCardLabel(plan)} />
                            <span className="proje-site__plan-badge" aria-hidden="true">{ICON_PDF_BADGE}</span>
                          </>
                        )}
                      </div>
                      <span className="proje-site__plan-name">{planCardLabel(plan)}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
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

      {currentPlan && (
        <div
          className="proje-site__lightbox"
          onClick={() => setPlanPreviewIndex(-1)}
          role="dialog"
          aria-modal="true"
          aria-label={ui.units}
        >
          <button
            type="button"
            className="proje-site__lightbox-close"
            onClick={() => setPlanPreviewIndex(-1)}
            aria-label={ui.closeLabel}
          >
            ×
          </button>
          {activePlans.length > 1 && (
            <>
              <button
                type="button"
                className="proje-site__lightbox-arrow proje-site__lightbox-arrow--prev"
                onClick={(e) => {
                  e.stopPropagation();
                  setPlanPreviewIndex((i) => (i <= 0 ? activePlans.length - 1 : i - 1));
                }}
                aria-label={ui.prevLabel}
              />
              <button
                type="button"
                className="proje-site__lightbox-arrow proje-site__lightbox-arrow--next"
                onClick={(e) => {
                  e.stopPropagation();
                  setPlanPreviewIndex((i) => (i >= activePlans.length - 1 ? 0 : i + 1));
                }}
                aria-label={ui.nextLabel}
              />
            </>
          )}
          <div
            className={`proje-site__plan-viewer${currentPlan.type === 'pdf' ? ' proje-site__plan-viewer--pdf' : ''}`}
            onClick={(e) => e.stopPropagation()}
          >
            {currentPlan.type === 'image' ? (
              <img
                src={currentPlan.src}
                alt={planCardLabel(currentPlan)}
                className="proje-site__lightbox-img"
              />
            ) : (
              <iframe
                key={currentPlan.src}
                src={currentPlan.src}
                title={planCardLabel(currentPlan)}
                className="proje-site__plan-pdf-frame"
              />
            )}
            <div className="proje-site__plan-caption">
              <span className="proje-site__plan-caption-name">{planCardLabel(currentPlan)}</span>
              {currentPlan.type === 'pdf' && (
                <a
                  href={currentPlan.src}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="proje-site__plan-caption-link"
                >
                  {ui.openPdf}
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProjeWebsitesi;
