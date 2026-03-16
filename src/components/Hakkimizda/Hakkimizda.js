import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { useInView } from '../../hooks/useInView';
import './Hakkimizda.css';

const HAKKIMIZDA_IMAGES = [
  'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80',
  'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=800&q=80',
];

const CONTENT = {
  tr: {
    brand: 'Sefa İnşaat',
    headingLine1: 'Dürüstlük İlkemiz,',
    headingLine2: 'Mükemmellik Hedefimizdir',
    paragraph:
      'Sefa İnşaat, 2005 yılında insanların hayatına değer katan projeler üretmek amacıyla kurulmuştur. Kısa sürede önemli başarılara imza atan firmamız, kaliteli inşaatı zamanında teslim etmenin gururunu yaşamaktadır. Yeniliğe, büyümeye ve sektöre katkı sunmaya devam etmektedir.',
    ctaLabel: 'DAHA FAZLA BİLGİ',
    alt1: 'İnşaat ekibi',
    alt2: 'Proje ekibi',
  },
  en: {
    brand: 'Sefa İnşaat',
    headingLine1: 'Integrity is Our Principle,',
    headingLine2: 'Excellence is Our Goal',
    paragraph:
      'Sefa Construction was founded in 2005 with the aim of creating projects that add value to people\'s lives. Our company has achieved significant success in a short time and takes pride in delivering quality construction on time. We continue to contribute to innovation, growth and the industry.',
    ctaLabel: 'MORE INFO',
    alt1: 'Construction team',
    alt2: 'Project team',
  },
};

function Hakkimizda() {
  const [searchParams] = useSearchParams();
  const lang = searchParams.get('lang') === 'en' ? 'en' : 'tr';
  const c = CONTENT[lang];
  const ctaHref = lang === 'en' ? '/hakkimizda?lang=en' : '#daha-fazla';
  const [ref, inView] = useInView({ threshold: 0.12 });

  return (
    <section ref={ref} className={`hakkimizda ${inView ? 'hakkimizda--in-view' : ''}`}>
      <div className="hakkimizda__images">
        <div className="hakkimizda__image hakkimizda__image--top">
          <img src={HAKKIMIZDA_IMAGES[0]} alt={c.alt1} />
        </div>
        <div className="hakkimizda__image hakkimizda__image--bottom">
          <img src={HAKKIMIZDA_IMAGES[1]} alt={c.alt2} />
        </div>
      </div>
      <div className="hakkimizda__content">
        <span className="hakkimizda__brand">{c.brand}</span>
        <h2 className="hakkimizda__heading">
          {c.headingLine1}
          <span className="hakkimizda__heading-line2">{c.headingLine2}</span>
        </h2>
        <p className="hakkimizda__paragraph">{c.paragraph}</p>
        <a href={ctaHref} className="hakkimizda__cta">
          {c.ctaLabel}
        </a>
      </div>
    </section>
  );
}

export default Hakkimizda;
