import React, { useState } from 'react';
import './IletisimSayfaIcerik.css';

const PROJE_OPTIONS_TR = [
  { value: '', label: 'Proje Seçiniz' },
  { value: 'evınpark-orman', label: 'Evınpark Orman' },
  { value: 'evınpark-harput', label: 'Evınpark Harput' },
  { value: 'evınpark-kartal', label: 'Evınpark Kartal' },
  { value: 'evınpark-cekmekoy', label: 'Evınpark Çekmeköy' },
  { value: 'diger', label: 'Diğer' },
];

const PROJE_OPTIONS_EN = [
  { value: '', label: 'Select Project' },
  { value: 'evınpark-orman', label: 'Evınpark Orman' },
  { value: 'evınpark-harput', label: 'Evınpark Harput' },
  { value: 'evınpark-kartal', label: 'Evınpark Kartal' },
  { value: 'evınpark-cekmekoy', label: 'Evınpark Çekmeköy' },
  { value: 'diger', label: 'Other' },
];

const CONTENT = {
  tr: {
    officeHeading: 'İstanbul Ofis',
    address: 'Adres',
    phone: 'Telefon',
    email: 'E-posta',
    web: 'Web',
    formHeading: <>Form Doldurun,<br />Sizi Arayalım</>,
    placeholderName: 'Ad Soyad *',
    placeholderPhone: 'Telefon *',
    placeholderEmail: 'E-posta Adresi *',
    placeholderMessage: 'Mesajınız',
    errorRequired: 'Bu alan zorunludur.',
    kvkkText: <><span className="iletisim-sayfa-icerik__checkbox-link">Kişisel Verilerin Korunması Kanunu&apos;nu</span> okudum, onaylıyorum.</>,
    submit: 'FORM GÖNDER',
    mapTitle: 'Sefa İnşaat konum',
  },
  en: {
    officeHeading: 'Istanbul Office',
    address: 'Address',
    phone: 'Phone',
    email: 'E-mail',
    web: 'Web',
    formHeading: <>Fill in the form,<br />We will call you</>,
    placeholderName: 'Full Name *',
    placeholderPhone: 'Phone *',
    placeholderEmail: 'E-mail Address *',
    placeholderMessage: 'Your message',
    errorRequired: 'This field is required.',
    kvkkText: <>I have read and accept the Personal Data Protection Law.</>,
    submit: 'SEND FORM',
    mapTitle: 'Sefa İnşaat location',
  },
};

const ICON_PIN = (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);
const ICON_PHONE = (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
);
const ICON_WHATSAPP = (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);
const ICON_MAIL = (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <polyline points="22,6 12,13 2,6" />
  </svg>
);
const ICON_GLOBE = (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <line x1="2" y1="12" x2="22" y2="12" />
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
  </svg>
);

function IletisimSayfaIcerik({ lang = 'tr' }) {
  const t = CONTENT[lang];
  const projeOptions = lang === 'en' ? PROJE_OPTIONS_EN : PROJE_OPTIONS_TR;

  const [form, setForm] = useState({
    adSoyad: '',
    telefon: '',
    email: '',
    proje: '',
    mesaj: '',
    kvkk: false,
  });
  const [touched, setTouched] = useState({ adSoyad: false, telefon: false, email: false });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleBlur = (e) => {
    setTouched((prev) => ({ ...prev, [e.target.name]: true }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setTouched({ adSoyad: true, telefon: true, email: true });
    if (!form.adSoyad.trim() || !form.telefon.trim() || !form.email.trim()) return;
    // Gönderim işlemi burada yapılabilir
  };

  const adSoyadError = touched.adSoyad && !form.adSoyad.trim();
  const telefonError = touched.telefon && !form.telefon.trim();
  const emailError = touched.email && !form.email.trim();

  return (
    <section className="iletisim-sayfa-icerik">
      <div className="iletisim-sayfa-icerik__inner">
        <div className="iletisim-sayfa-icerik__col iletisim-sayfa-icerik__col--info">
          <h2 className="iletisim-sayfa-icerik__heading">{t.officeHeading}</h2>
          <ul className="iletisim-sayfa-icerik__list">
            <li className="iletisim-sayfa-icerik__item">
              <span className="iletisim-sayfa-icerik__icon">{ICON_PIN}</span>
              <div>
                <strong className="iletisim-sayfa-icerik__label">{t.address}</strong>
                <p className="iletisim-sayfa-icerik__value">Suadiye, Bağdat Cad. No:451 D:8, 34740 Kadıköy/İstanbul</p>
              </div>
            </li>
            <li className="iletisim-sayfa-icerik__item">
              <span className="iletisim-sayfa-icerik__icon">{ICON_PHONE}</span>
              <div>
                <strong className="iletisim-sayfa-icerik__label">{t.phone}</strong>
                <p className="iletisim-sayfa-icerik__value">
                  <a href="tel:+902164451549" className="iletisim-sayfa-icerik__link">0216 445 15 49</a>
                </p>
              </div>
            </li>
            <li className="iletisim-sayfa-icerik__item">
              <span className="iletisim-sayfa-icerik__icon">{ICON_WHATSAPP}</span>
              <div>
                <strong className="iletisim-sayfa-icerik__label">WhatsApp</strong>
                <p className="iletisim-sayfa-icerik__value">
                  <a href="https://wa.me/902164451549" target="_blank" rel="noopener noreferrer" className="iletisim-sayfa-icerik__link">0216 445 15 49</a>
                </p>
              </div>
            </li>
            <li className="iletisim-sayfa-icerik__item">
              <span className="iletisim-sayfa-icerik__icon">{ICON_MAIL}</span>
              <div>
                <strong className="iletisim-sayfa-icerik__label">{t.email}</strong>
                <p className="iletisim-sayfa-icerik__value">
                  <a href="mailto:info@sefainsaat.com.tr" className="iletisim-sayfa-icerik__link">info@sefainsaat.com.tr</a>
                </p>
              </div>
            </li>
            <li className="iletisim-sayfa-icerik__item">
              <span className="iletisim-sayfa-icerik__icon">{ICON_GLOBE}</span>
              <div>
                <strong className="iletisim-sayfa-icerik__label">{t.web}</strong>
                <p className="iletisim-sayfa-icerik__value">
                  <a href="http://www.sefainsaat.com.tr/" target="_blank" rel="noopener noreferrer" className="iletisim-sayfa-icerik__link">www.sefainsaat.com.tr</a>
                </p>
              </div>
            </li>
          </ul>
        </div>

        <div className="iletisim-sayfa-icerik__col iletisim-sayfa-icerik__col--form">
          <div className="iletisim-sayfa-icerik__form-wrap">
            <div className="iletisim-sayfa-icerik__form-heading-wrap">
              <h2 className="iletisim-sayfa-icerik__form-heading">{t.formHeading}</h2>
            </div>
            <form className="iletisim-sayfa-icerik__form" onSubmit={handleSubmit} noValidate>
              <div className="iletisim-sayfa-icerik__row">
                <div className="iletisim-sayfa-icerik__field">
                  <input
                    id="adSoyad"
                    name="adSoyad"
                    type="text"
                    value={form.adSoyad}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`iletisim-sayfa-icerik__input ${adSoyadError ? 'iletisim-sayfa-icerik__input--error' : ''}`}
                    placeholder={t.placeholderName}
                  />
                  {adSoyadError && <span className="iletisim-sayfa-icerik__error">{t.errorRequired}</span>}
                </div>
                <div className="iletisim-sayfa-icerik__field">
                  <input
                    id="telefon"
                    name="telefon"
                    type="tel"
                    value={form.telefon}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`iletisim-sayfa-icerik__input ${telefonError ? 'iletisim-sayfa-icerik__input--error' : ''}`}
                    placeholder={t.placeholderPhone}
                  />
                  {telefonError && <span className="iletisim-sayfa-icerik__error">{t.errorRequired}</span>}
                </div>
              </div>
              <div className="iletisim-sayfa-icerik__row">
                <div className="iletisim-sayfa-icerik__field">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`iletisim-sayfa-icerik__input ${emailError ? 'iletisim-sayfa-icerik__input--error' : ''}`}
                    placeholder={t.placeholderEmail}
                  />
                  {emailError && <span className="iletisim-sayfa-icerik__error">{t.errorRequired}</span>}
                </div>
                <div className="iletisim-sayfa-icerik__field">
                  <select
                    id="proje"
                    name="proje"
                    value={form.proje}
                    onChange={handleChange}
                    className="iletisim-sayfa-icerik__input iletisim-sayfa-icerik__select"
                  >
                    {projeOptions.map((opt) => (
                      <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="iletisim-sayfa-icerik__field">
                <textarea
                  name="mesaj"
                  value={form.mesaj}
                  onChange={handleChange}
                  className="iletisim-sayfa-icerik__input iletisim-sayfa-icerik__textarea"
                  placeholder={t.placeholderMessage}
                  rows={4}
                />
              </div>
              <div className="iletisim-sayfa-icerik__checkbox-wrap">
                <label className="iletisim-sayfa-icerik__checkbox-label">
                  <input
                    name="kvkk"
                    type="checkbox"
                    checked={form.kvkk}
                    onChange={handleChange}
                    className="iletisim-sayfa-icerik__checkbox"
                  />
                  <span className="iletisim-sayfa-icerik__checkbox-text">
                    {t.kvkkText}
                  </span>
                </label>
              </div>
              <button type="submit" className="iletisim-sayfa-icerik__submit">
                {t.submit}
              </button>
            </form>
          </div>
        </div>
      </div>
      <div className="iletisim-sayfa-icerik__map-wrap">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3013.018175448972!2d29.0810129766939!3d40.959180671357494!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14cac705afd65ea1%3A0xf44ad35a982850b5!2zU2VmYSDEsG7Fn2FhdA!5e0!3m2!1str!2str!4v1773595180214!5m2!1str!2str"
          title={t.mapTitle}
          width="600"
          height="450"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="iletisim-sayfa-icerik__map"
        />
      </div>
    </section>
  );
}

export default IletisimSayfaIcerik;
