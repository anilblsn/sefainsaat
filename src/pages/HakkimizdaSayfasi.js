import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Iletisim from '../components/Iletisim';
import Footer from '../components/Footer';
import { useInView } from '../hooks/useInView';
import logoImg from '../assets/logo/sefa-1.png';
import './HakkimizdaSayfasi.css';

const HAKKIMIZDA = {
  tr: {
    bannerTitle: 'Hakkımızda',
    paragraphs: [
      'Sefa inşaat; 1977 yılında kurulmuş bir aile şirketi olup, kurulduğundan bugüne ülkenin bir çok yerinde gayrimenkul yatırım ve taahhütlerinde bulunmuştur. Faaliyet konusu çoğunlukla yap-sat yöntemi ile nezih semtlerde lüks konut üretimi olan şirketimiz, ayrıca özel inşaat taahhütleri ve iş merkezleri yapmış ve yapmaya devam etmektedir.',
      'Hızla değişen teknoloji ve sosyo-kültürel ortamın gereklerini, en yenilikçi özgün tarz ve tasarımlar ile ele alan şirketimiz, çağdaş yapılarla sağlıklı kentsel dönüşüme katkıda bulunmakta; profesyonel yönetimi, hızlı organizasyon yapısı ve tecrübeli teknik kadrosuyla, konusunda markalaşmış bir inşaat firmasıdır. Her taahhüdünü ayrı bir heyecan ve kalite ufkuyla ele alan Sefa inşaat, hep daha iyinin peşinde olarak yapacaklarına odaklanmaktadır. Bir inşaat firması olarak taşıdığı sorumlulukların farkında olan firmamız, ortaya konulan yapıların işlevsellik, sağlamlık ve estetiği ile standart taşımasına önem vermektedir. Şirketimiz dürüstlük, müşteri memnuniyeti, süreklilik, yenilik ve üstün kalite anlayışıyla, tüm müşteri ve iş ortakları ile sorunsuz, güvenli ve kazançlı ilişkiler hedeflemektedir.',
    ],
  },
  en: {
    bannerTitle: 'About Us',
    paragraphs: [
      'Sefa Construction is a family company founded in 1977. Since its establishment, it has been involved in real estate investments and contracting across many parts of the country. Our company primarily focuses on luxury residential production in distinguished neighborhoods through the turnkey method, and also carries out and continues to carry out private construction contracts and office buildings.',
      'Our company addresses the demands of rapidly changing technology and socio-cultural environment with the most innovative and original style and designs, contributing to healthy urban transformation through contemporary structures. With its professional management, agile organization and experienced technical staff, it is a construction company that has become a brand in its field. Sefa Construction approaches each project with distinct enthusiasm and a quality-oriented vision, always striving for better. Aware of its responsibilities as a construction company, our company emphasizes that the buildings it delivers meet standards in functionality, durability and aesthetics. With a focus on integrity, customer satisfaction, continuity, innovation and superior quality, our company aims for smooth, secure and mutually beneficial relations with all clients and business partners.',
    ],
  },
};

function HakkimizdaSayfasi() {
  const [searchParams] = useSearchParams();
  const lang = searchParams.get('lang') === 'en' ? 'en' : 'tr';
  const content = HAKKIMIZDA[lang];
  const [bannerReady, setBannerReady] = useState(false);
  const [contentRef, contentInView] = useInView({ threshold: 0.12 });

  useEffect(() => {
    const t = setTimeout(() => setBannerReady(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <>
      <Navbar />
      <section className={`hakkimizda-sayfasi-banner ${bannerReady ? 'hakkimizda-sayfasi-banner--ready' : ''}`}>
        <div className="hakkimizda-sayfasi-banner__overlay" />
        <h1 className="hakkimizda-sayfasi-banner__title">{content.bannerTitle}</h1>
      </section>
      <main ref={contentRef} className={`hakkimizda-sayfasi ${contentInView ? 'hakkimizda-sayfasi--in-view' : ''}`}>
        <div className="hakkimizda-sayfasi__content">
          <img src={logoImg} alt="Sefa İnşaat" className="hakkimizda-sayfasi__logo" />
          {content.paragraphs.map((paragraf, i) => (
            <p key={i} className="hakkimizda-sayfasi__paragraf">
              {paragraf}
            </p>
          ))}
        </div>
      </main>
      <div id="daha-fazla">
        <Iletisim />
      </div>
      <Footer />
    </>
  );
}

export default HakkimizdaSayfasi;
