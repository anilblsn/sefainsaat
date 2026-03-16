import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import './Hero.css';
import heroImage1 from '../../assets/forhero/1.jpg';
import heroImage2 from '../../assets/forhero/2.jpg';
import heroImage3 from '../../assets/forhero/3.jpg';

const HERO_SLIDES_TR = [
  {
    image: heroImage1,
    badge: '21 Yıl',
    title: 'Sefa İnşaat',
    description:
      '2023 yılında anahtar teslimi yapılan Sefa İnşaat, toplam 3 blok ve 195 daireden oluşuyor. İçinde gri su sistemi teknolojisini barındıran Sefa İnşaat\'ın sosyal tesislerinin yanı sıra, kapalı otoparkı, özel tahsisli depolan, barbekü alanı, elektrikli şarj istasyonu bulunuyor.',
    ctaLabel: 'İNCELE',
  },
  {
    image: heroImage2,
    badge: '21 Yıl',
    title: 'Sefa İnşaat',
    description:
      '2023 yılında anahtar teslimi yapılan Sefa İnşaat, toplam 3 blok ve 195 daireden oluşuyor. İçinde gri su sistemi teknolojisini barındıran Sefa İnşaat\'ın sosyal tesislerinin yanı sıra, kapalı otoparkı, özel tahsisli depolan, barbekü alanı, elektrikli şarj istasyonu bulunuyor.',
    ctaLabel: 'İNCELE',
  },
  {
    image: heroImage3,
    badge: '21 Yıl',
    title: 'Sefa İnşaat',
    description:
      '2023 yılında anahtar teslimi yapılan Sefa İnşaat, toplam 3 blok ve 195 daireden oluşuyor. İçinde gri su sistemi teknolojisini barındıran Sefa İnşaat\'ın sosyal tesislerinin yanı sıra, kapalı otoparkı, özel tahsisli depolan, barbekü alanı, elektrikli şarj istasyonu bulunuyor.',
    ctaLabel: 'İNCELE',
  },
];

const HERO_SLIDES_EN = [
  {
    image: heroImage1,
    badge: '21 Years',
    title: 'Sefa İnşaat',
    description:
      'Sefa Construction, delivered in 2023, consists of 3 blocks and 195 units. Along with social facilities that include greywater system technology, it features covered parking, dedicated storage, barbecue area and electric charging stations.',
    ctaLabel: 'DISCOVER',
  },
  {
    image: heroImage2,
    badge: '21 Years',
    title: 'Sefa İnşaat',
    description:
      'Sefa Construction, delivered in 2023, consists of 3 blocks and 195 units. Along with social facilities that include greywater system technology, it features covered parking, dedicated storage, barbecue area and electric charging stations.',
    ctaLabel: 'DISCOVER',
  },
  {
    image: heroImage3,
    badge: '21 Years',
    title: 'Sefa İnşaat',
    description:
      'Sefa Construction, delivered in 2023, consists of 3 blocks and 195 units. Along with social facilities that include greywater system technology, it features covered parking, dedicated storage, barbecue area and electric charging stations.',
    ctaLabel: 'DISCOVER',
  },
];

const ARIA = { tr: { prev: 'Önceki', next: 'Sonraki' }, en: { prev: 'Previous', next: 'Next' } };

function Hero() {
  const [searchParams] = useSearchParams();
  const lang = searchParams.get('lang') === 'en' ? 'en' : 'tr';
  const slides = lang === 'en' ? HERO_SLIDES_EN : HERO_SLIDES_TR;
  const aria = ARIA[lang];

  const [currentSlide, setCurrentSlide] = useState(0);

  const goToSlide = (index) => {
    setCurrentSlide((index + slides.length) % slides.length);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      goToSlide(currentSlide + 1);
    }, 4000);
    return () => clearInterval(timer);
  }, [currentSlide, slides.length]);

  return (
    <section className="hero">
      <div
        className="hero__track"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {slides.map((slide, i) => (
          <div
            key={i}
            className={`hero__slide ${i === currentSlide ? 'hero__slide--active' : ''}`}
            style={{ backgroundImage: `url(${slide.image})` }}
          >
            <div className="hero__overlay" />
            <span className="hero__badge">{slide.badge}</span>
            <div className="hero__content">
              <h1 className="hero__title">{slide.title}</h1>
              <p className="hero__description">{slide.description}</p>
              <a href={lang === 'en' ? '/hakkimizda?lang=en' : '#incele'} className="hero__cta">
                {slide.ctaLabel}
              </a>
            </div>
          </div>
        ))}
      </div>

      <div className="hero__slider-nav">
        <button
          type="button"
          className="hero__slider-btn"
          aria-label={aria.prev}
          onClick={() => goToSlide(currentSlide - 1)}
        >
          ‹
        </button>
        <button
          type="button"
          className="hero__slider-btn"
          aria-label={aria.next}
          onClick={() => goToSlide(currentSlide + 1)}
        >
          ›
        </button>
      </div>
    </section>
  );
}

export default Hero;
