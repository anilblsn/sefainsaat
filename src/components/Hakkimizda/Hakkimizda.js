import React from 'react';
import { useInView } from '../../hooks/useInView';
import { pickContent, useLang } from '../../utils/lang';
import hakkimizdaImg2 from '../../assets/logo/3.jpg';
import './Hakkimizda.css';

const HAKKIMIZDA_IMAGES = [
  'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80',
  hakkimizdaImg2,
];

const CONTENT = {
  tr: {
    brand: 'Sefa İnşaat',
    headingLine1: 'Dürüstlük İlkemiz,',
    headingLine2: 'Mükemmellik Hedefimizdir',
    paragraph:
      'Sefa İnşaat, kuruluşundan bu yana Türkiye’nin birçok bölgesinde gayrimenkul yatırımları ve inşaat taahhüt projeleri hayata geçiren, kalite odaklı bir firmadır. Güveni sağlam temellerle, kaliteyi özgün tasarımlarla birleştirerek geleceğe değer katan yaşam alanları inşa etmektedir.',
    alt1: 'İnşaat ekibi',
    alt2: 'Proje ekibi',
  },
  en: {
    brand: 'Sefa İnşaat',
    headingLine1: 'Integrity is Our Principle,',
    headingLine2: 'Excellence is Our Goal',
    paragraph:
      'Since its founding, Sefa Construction has delivered real estate investments and contracting projects across many regions of Türkiye with a quality-focused approach. It builds living spaces that add value to the future by combining trust with solid foundations and quality with original designs.',
    alt1: 'Construction team',
    alt2: 'Project team',
  },
  ar: {
    brand: 'سيفا للإنشاءات',
    headingLine1: 'النزاهة مبدأنا،',
    headingLine2: 'والتميز هدفنا',
    paragraph:
      'منذ تأسيسها تنفّذ سيفا للإنشاءات استثمارات عقارية ومشاريع مقاولات في مناطق عديدة من تركيا بنهج يركّز على الجودة. تبني مساحات معيشة تضيف قيمة للمستقبل، بجمع الثقة مع أسس متينة والجودة مع تصاميم أصيلة.',
    alt1: 'فريق البناء',
    alt2: 'فريق المشروع',
  },
};

function Hakkimizda() {
  const lang = useLang();
  const c = pickContent(CONTENT, lang);
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
      </div>
    </section>
  );
}

export default Hakkimizda;
