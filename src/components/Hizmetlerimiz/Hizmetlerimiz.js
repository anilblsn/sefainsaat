import React, { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useInView } from '../../hooks/useInView';
import './Hizmetlerimiz.css';

const SERVICE_ICONS = [
  <svg key="1" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M8 42V18L24 6l16 12v24" /><path d="M8 18h32" /><path d="M18 42V28h12v14" /><circle cx="24" cy="14" r="3" /><path d="M20 10l-2-4h12l-2 4" /></svg>,
  <svg key="2" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="6" y="10" width="36" height="32" rx="1" /><path d="M6 20h36" /><path d="M14 14h6" /><path d="M14 26h20" /><path d="M14 32h14" /><path d="M28 38V28l6-4" /><circle cx="28" cy="28" r="4" /></svg>,
  <svg key="3" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="24" cy="24" r="14" /><path d="M24 10v28M10 24h28" /><path d="M14 14l20 20M34 14L14 34" /><path d="M24 18l0-4M24 34l0-4M18 24l-4 0M34 24l-4 0" /></svg>,
  <svg key="4" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M8 42V24l8-6 8 6 8-6 8 6v18" /><path d="M8 24l8-6 8 6 8-6 8 6" /><path d="M16 18V12l8-6 8 6v6" /><path d="M8 42h32" /></svg>,
];

const CONTENT = {
  tr: {
    heading: 'HİZMETLERİMİZ',
    subheading: 'Her Zaman En İyisi İçin Çalışıyoruz',
    services: [
      { title: 'MÜTEAHHİTLİK', description: 'A Sınıfı müteahhitlik sertifikasına sahip olan firmamız, projelerin sorunsuz bir şekilde yürütülmesi için deneyimli ekibiyle inşaat sürecinin her aşamasını koordine etmekte, denetlemekte ve yönetmektedir. Kompleks projelerde multidisipliner bir yaklaşım sunarak yüksek kalitede sonuçlar elde ediyoruz.' },
      { title: 'PROJELENDİRME', description: 'Sefa İnşaat, kapsamlı inşaat projelendirme hizmetleri sunarak projelerin başlangıçtan bitişine kadar olan her aşamasında mühendislik ve danışmanlık desteği sağlamaktadır. Her bir proje için 360 derece çözüm odaklı yaklaşımımızla, detaylı ve fonksiyonel çizimler yapmaktayız.' },
      { title: 'GAYRİMENKUL GELİŞTİRME', description: 'Gayrimenkul sektöründe derinlemesine bilgiye sahip olan Sefa İnşaat, piyasa analizleri yapmakta, yeni projeler için ön fizibilite çalışmaları yürütmekte ve finansal stratejiler geliştirerek gayrimenkul geliştirme süreçlerini hızlandırmaktadır. Bu kapsamlı hizmetlerimizle yatırımcılara değer katıyoruz.' },
      { title: 'KENTSEL DÖNÜŞÜM', description: 'Zamanın gereksinimlerine uygun, depreme dayanıklı yeni binalar tasarlayıp inşa ederek kentsel dönüşüm projelerinde öncü olan Sefa İnşaat, mevcut yapıların yenilenmesi gerektiğinde ekonomik ve pratik çözümler sunmaktadır. Kat maliklerinin ihtiyaçları doğrultusunda güvenli ve modern yapılar inşa ediyoruz.' },
    ],
  },
  en: {
    heading: 'OUR SERVICES',
    subheading: 'We Always Work for the Best',
    services: [
      { title: 'CONTRACTING', description: 'With our Class A contracting certificate, our company coordinates, supervises and manages every phase of the construction process with an experienced team for the smooth execution of projects. We deliver high-quality results with a multidisciplinary approach on complex projects.' },
      { title: 'PROJECT DESIGN', description: 'Sefa Construction provides engineering and consultancy support at every stage from start to finish through comprehensive construction project design services. With our 360-degree solution-oriented approach for each project, we produce detailed and functional designs.' },
      { title: 'REAL ESTATE DEVELOPMENT', description: 'With in-depth knowledge of the real estate sector, Sefa Construction conducts market analyses, carries out pre-feasibility studies for new projects and accelerates real estate development processes by developing financial strategies. We add value for investors with these comprehensive services.' },
      { title: 'URBAN TRANSFORMATION', description: 'A pioneer in urban transformation projects by designing and building new buildings that meet the requirements of the time and are earthquake-resistant, Sefa Construction offers economic and practical solutions when existing structures need to be renewed. We build safe and modern structures in line with the needs of flat owners.' },
    ],
  },
};

function Hizmetlerimiz() {
  const [searchParams] = useSearchParams();
  const lang = searchParams.get('lang') === 'en' ? 'en' : 'tr';
  const c = CONTENT[lang];

  const [scrolled, setScrolled] = useState(false);
  const sectionRef = useRef(null);
  const [inViewRef, inView] = useInView({ threshold: 0.1 });

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setScrolled(true);
      },
      { threshold: 0.2, rootMargin: '0px' }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const setRefs = (el) => {
    sectionRef.current = el;
    inViewRef.current = el;
  };

  return (
    <section ref={setRefs} className={`hizmetlerimiz ${scrolled ? 'hizmetlerimiz--scrolled' : ''} ${inView ? 'hizmetlerimiz--in-view' : ''}`}>
      <h2 className="hizmetlerimiz__heading">{c.heading}</h2>
      <p className="hizmetlerimiz__subheading">{c.subheading}</p>
      <div className="hizmetlerimiz__cards">
        {c.services.map((service, index) => (
          <article
            key={service.title}
            className={`hizmetlerimiz__card ${index === 1 || index === 3 ? 'hizmetlerimiz__card--offset' : ''}`}
          >
            <div className="hizmetlerimiz__header">
              <div className="hizmetlerimiz__icon" aria-hidden="true">
                {SERVICE_ICONS[index]}
              </div>
              <h3 className="hizmetlerimiz__title">{service.title}</h3>
            </div>
            <p className="hizmetlerimiz__description">{service.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

export default Hizmetlerimiz;
