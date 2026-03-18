import React, { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useInView } from '../../hooks/useInView';
import './OneCikanProjeler.css';

const imageContext = require.context(
  '../../assets/tamamlananprojects',
  true,
  /\.(jpe?g|png|JPE?G|PNG)$/
);

function getProjectsFromContext() {
  const keys = imageContext.keys();
  const byFolder = {};
  keys.forEach((key) => {
    const path = key.slice(2);
    const folder = path.split('/')[0];
    if (!byFolder[folder]) byFolder[folder] = [];
    byFolder[folder].push({ path: key, fullPath: path });
  });

  const folders = Object.keys(byFolder).sort((a, b) => {
    const nA = parseInt(a.match(/^(\d+)/)?.[1] || '0', 10);
    const nB = parseInt(b.match(/^(\d+)/)?.[1] || '0', 10);
    return nA - nB;
  });

  return folders.map((folder) => {
    const files = byFolder[folder].sort((a, b) => a.fullPath.localeCompare(b.fullPath));
    const preferred = files.find((f) => /[/\\]0\.(jpg|jpeg|png)$/i.test(f.fullPath));
    const imageKey = preferred ? preferred.path : files[0].path;
    const name = folder.replace(/^\d+\s*-\s*/, '').trim();
    return {
      id: folder,
      folder,
      number: parseInt(folder.match(/^(\d+)/)?.[1] || '0', 10),
      name,
      image: imageContext(imageKey),
    };
  });
}

const CONTENT = {
  tr: {
    subtitle: 'PROJELERİMİZ',
    title: 'Öne Çıkan Projelerimiz',
    category: 'Tamamlanan Projeler',
    btn: 'DİĞER PROJELER',
  },
  en: {
    subtitle: 'OUR PROJECTS',
    title: 'Featured Projects',
    category: 'Completed Projects',
    btn: 'OTHER PROJECTS',
  },
};

function OneCikanProjeler() {
  const [searchParams] = useSearchParams();
  const lang = searchParams.get('lang') === 'en' ? 'en' : 'tr';
  const c = CONTENT[lang];
  const [ref, inView] = useInView({ threshold: 0.1 });
  const projects = useMemo(() => {
    const all = getProjectsFromContext();
    const order = [1, 3, 14, 2, 7, 12];
    const byNumber = new Map();
    all.forEach((p) => {
      if (!byNumber.has(p.number)) byNumber.set(p.number, p);
    });
    return order
      .map((n) => byNumber.get(n))
      .filter(Boolean)
      .map((p) => (p.number === 14 ? { ...p, name: 'EVİNPARK ADATEPE' } : p));
  }, []);

  return (
    <section ref={ref} className={`onecikan-projeler ${inView ? 'onecikan-projeler--in-view' : ''}`}>
      <p className="onecikan-projeler__subtitle">{c.subtitle}</p>
      <h2 className="onecikan-projeler__title">{c.title}</h2>
      <div className="onecikan-projeler__grid">
        {projects.map((project) => (
          <article key={project.id} className="onecikan-projeler__card">
            <div className="onecikan-projeler__image-wrap">
              <img
                src={project.image}
                alt={project.name}
                className="onecikan-projeler__image"
              />
            </div>
            <div className="onecikan-projeler__black">
              <p className="onecikan-projeler__black-category">{c.category}</p>
              <span className="onecikan-projeler__black-line" aria-hidden="true" />
              <h3 className="onecikan-projeler__black-title">{project.name}</h3>
            </div>
          </article>
        ))}
      </div>
      <div className="onecikan-projeler__actions">
        <a href={lang === 'en' ? '/tamamlanan-projeler?lang=en' : '/tamamlanan-projeler'} className="onecikan-projeler__btn">
          {c.btn}
        </a>
      </div>
    </section>
  );
}

export default OneCikanProjeler;
