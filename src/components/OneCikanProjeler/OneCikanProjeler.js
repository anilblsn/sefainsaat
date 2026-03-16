import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { useInView } from '../../hooks/useInView';
import './OneCikanProjeler.css';
import proje1 from '../../assets/forhero/1.jpg';
import proje2 from '../../assets/forhero/2.jpg';
import proje3 from '../../assets/forhero/3.jpg';

const PROJECTS_BASE = [
  { id: 1, image: proje1, titleTr: 'Ballıca Saklı Bahçe Villaları', titleEn: 'Ballıca Saklı Bahçe Villaları' },
  { id: 2, image: proje2, titleTr: 'Proje 2', titleEn: 'Project 2' },
  { id: 3, image: proje3, titleTr: 'Proje 3', titleEn: 'Project 3' },
  { id: 4, image: proje1, titleTr: 'Proje 4', titleEn: 'Project 4' },
];

const CONTENT = {
  tr: {
    subtitle: 'PROJELERİMİZ',
    title: 'Öne Çıkan Projelerimiz',
    category: 'Satışı Devam Eden Projeler',
    btn: 'DİĞER PROJELER',
  },
  en: {
    subtitle: 'OUR PROJECTS',
    title: 'Featured Projects',
    category: 'Ongoing Sales Projects',
    btn: 'OTHER PROJECTS',
  },
};

function OneCikanProjeler() {
  const [searchParams] = useSearchParams();
  const lang = searchParams.get('lang') === 'en' ? 'en' : 'tr';
  const c = CONTENT[lang];
  const [ref, inView] = useInView({ threshold: 0.1 });

  return (
    <section ref={ref} className={`onecikan-projeler ${inView ? 'onecikan-projeler--in-view' : ''}`}>
      <p className="onecikan-projeler__subtitle">{c.subtitle}</p>
      <h2 className="onecikan-projeler__title">{c.title}</h2>
      <div className="onecikan-projeler__grid">
        {PROJECTS_BASE.map((project) => (
          <article key={project.id} className="onecikan-projeler__card">
            <div className="onecikan-projeler__image-wrap">
              <img
                src={project.image}
                alt={lang === 'en' ? project.titleEn : project.titleTr}
                className="onecikan-projeler__image"
              />
            </div>
            <div className="onecikan-projeler__black">
              <p className="onecikan-projeler__black-category">{c.category}</p>
              <span className="onecikan-projeler__black-line" aria-hidden="true" />
              <h3 className="onecikan-projeler__black-title">{lang === 'en' ? project.titleEn : project.titleTr}</h3>
            </div>
          </article>
        ))}
      </div>
      <div className="onecikan-projeler__actions">
        <a href={lang === 'en' ? '/tamamlanan-projeler?lang=en' : '#projeler'} className="onecikan-projeler__btn">
          {c.btn}
        </a>
      </div>
    </section>
  );
}

export default OneCikanProjeler;
