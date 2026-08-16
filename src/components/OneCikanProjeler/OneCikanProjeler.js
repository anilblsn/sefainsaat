import React, { useMemo } from 'react';
import { useInView } from '../../hooks/useInView';
import { pickContent, useLang, withLang } from '../../utils/lang';
import { pickCoverFile } from '../../utils/projectImages';
import './OneCikanProjeler.css';

const imageContext = require.context(
  '../../assets/tamamlananprojects',
  true,
  /\.(jpe?g|png|JPE?G|PNG)$/
);

const FEATURED_PROJECTS = [
  { display: 'EVİNPARK GÖKTÜRK', match: ['evinpark göktürk'] },
  { display: 'EVİNPARK KADIKÖY REZİDANS', match: ['evinpark kadıköy'] },
  { display: 'EVİNPARK KEMER', match: ['evinpark kemer'] },
  { display: 'EVİNPARK ÇINAR', match: ['evinpark çınar'] },
  { display: 'EVİNPARK ADA', match: ['evinpark ada'] },
  { display: 'EVİNPARK TEPE', match: ['evinpark tepe'] },
  { display: 'EVİNPARK DOĞA (HALİMAĞA)', match: ['halimağa', 'evinpark doğa'] },
  { display: 'EVİNPARK ATAŞEHİR', match: ['evinpark ataşehir'] },
  { display: 'EVİNPARK ÇAMLICA', match: ['evinpark çamlıca'] },
  { display: 'DEDEDEN REZİDANS', match: ['dededen'] },
  { display: 'BİRLİK REZİDANS', match: ['birlik rezidans', 'birlik'] },
  { display: 'KORU REZİDANS', match: ['koru rezidans', 'koru'] },
];

function normalize(value) {
  return String(value || '')
    .toLocaleLowerCase('tr-TR')
    .replace(/\s+/g, ' ')
    .trim();
}

function getProjectsFromContext() {
  const keys = imageContext.keys();
  const byFolder = {};
  keys.forEach((key) => {
    const path = key.slice(2);
    const folder = path.split('/')[0];
    if (!byFolder[folder]) byFolder[folder] = [];
    byFolder[folder].push({ path: key, fullPath: path });
  });

  return Object.keys(byFolder).map((folder) => {
    const files = byFolder[folder].sort((a, b) => a.fullPath.localeCompare(b.fullPath));
    const name = folder.replace(/^\d+\s*-\s*/, '').trim();
    const cover = pickCoverFile(files, name);
    const imageKey = cover ? cover.path : files[0].path;
    return {
      id: folder,
      folder,
      name,
      search: `${normalize(folder)} ${normalize(name)}`,
      image: imageContext(imageKey),
    };
  });
}

function findFeaturedProject(all, matchKeys) {
  for (const key of matchKeys) {
    const needle = normalize(key);
    const found = all.find((p) => p.search.includes(needle));
    if (found) return found;
  }
  return null;
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
  ar: {
    subtitle: 'مشاريعنا',
    title: 'المشاريع المميزة',
    category: 'المشاريع المكتملة',
    btn: 'مشاريع أخرى',
  },
};

function OneCikanProjeler() {
  const lang = useLang();
  const c = pickContent(CONTENT, lang);
  const [ref, inView] = useInView({ threshold: 0.1 });
  const projects = useMemo(() => {
    const all = getProjectsFromContext();
    return FEATURED_PROJECTS.map((item) => {
      const matched = findFeaturedProject(all, item.match);
      if (!matched) return null;
      return {
        ...matched,
        name: item.display,
      };
    }).filter(Boolean);
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
              <h3 className="onecikan-projeler__caption">
                {(() => {
                  const toTitle = (s) =>
                    s
                      .toLocaleLowerCase('tr-TR')
                      .split(' ')
                      .map((w) => (w ? w.charAt(0).toLocaleUpperCase('tr-TR') + w.slice(1) : w))
                      .join(' ');
                  const parts = project.name.split(' ');
                  const first = parts[0];
                  const rest = parts.slice(1).join(' ');
                  const isEvinpark = first.toLocaleUpperCase('tr-TR') === 'EVİNPARK';
                  return (
                    <>
                      <span
                        className={`onecikan-projeler__caption-line ${isEvinpark ? 'onecikan-projeler__caption-line--evinpark' : ''}`}
                      >
                        {isEvinpark ? first.toLocaleLowerCase('tr-TR') : toTitle(first)}
                      </span>
                      {rest && (
                        <span
                          className={`onecikan-projeler__caption-line ${isEvinpark ? 'onecikan-projeler__caption-line--project' : ''}`}
                        >
                          {isEvinpark ? rest.toLocaleLowerCase('tr-TR') : toTitle(rest)}
                        </span>
                      )}
                    </>
                  );
                })()}
              </h3>
            </div>
          </article>
        ))}
      </div>
      <div className="onecikan-projeler__actions">
        <a href={withLang('/tamamlanan-projeler', lang)} className="onecikan-projeler__btn">
          {c.btn}
        </a>
      </div>
    </section>
  );
}

export default OneCikanProjeler;
