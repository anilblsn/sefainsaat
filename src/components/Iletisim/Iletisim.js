import React, { useState } from 'react';
import { useInView } from '../../hooks/useInView';
import { pickContent, useLang } from '../../utils/lang';
import './Iletisim.css';
import bgImage from '../../assets/covers/iletisim-bg.jpg';

const PROJE_OPTIONS = {
  tr: [
    { value: '', label: 'Proje Seçiniz' },
    { value: 'proje1', label: 'Proje 1' },
    { value: 'proje2', label: 'Proje 2' },
    { value: 'diger', label: 'Diğer' },
  ],
  en: [
    { value: '', label: 'Select Project' },
    { value: 'proje1', label: 'Project 1' },
    { value: 'proje2', label: 'Project 2' },
    { value: 'diger', label: 'Other' },
  ],
  ar: [
    { value: '', label: 'اختر المشروع' },
    { value: 'proje1', label: 'المشروع 1' },
    { value: 'proje2', label: 'المشروع 2' },
    { value: 'diger', label: 'أخرى' },
  ],
};

const CONTENT = {
  tr: {
    title: '| İLETİŞİME GEÇİN',
    description: 'Aşağıdaki formu doldurarak bizimle iletişime geçebilirsiniz. Müşteri danışmanımız en kısa sürede size geri dönüş sağlayacaktır.',
    labelName: 'Ad Soyad *',
    labelPhone: 'Telefon *',
    labelProject: 'Proje Seçiniz',
    errorRequired: 'Bu alan zorunludur.',
    submit: 'GÖNDER',
    kvkk: "Kişisel Verilerin Korunması Kanunu'nu okudum, onaylıyorum.",
  },
  en: {
    title: '| CONTACT US',
    description: 'You can reach us by filling out the form below. Our customer advisor will get back to you as soon as possible.',
    labelName: 'Full Name *',
    labelPhone: 'Phone *',
    labelProject: 'Select Project',
    errorRequired: 'This field is required.',
    submit: 'SEND',
    kvkk: "I have read and accept the Personal Data Protection Law.",
  },
  ar: {
    title: '| اتصل بنا',
    description: 'يمكنكم التواصل معنا عبر تعبئة النموذج أدناه. سيتواصل معكم مستشار العملاء في أقرب وقت ممكن.',
    labelName: 'الاسم الكامل *',
    labelPhone: 'الهاتف *',
    labelProject: 'اختر المشروع',
    errorRequired: 'هذا الحقل مطلوب.',
    submit: 'إرسال',
    kvkk: 'لقد قرأتُ وأوافق على قانون حماية البيانات الشخصية.',
  },
};

function Iletisim() {
  const lang = useLang();
  const t = pickContent(CONTENT, lang);
  const projeOptions = pickContent(PROJE_OPTIONS, lang);

  const [ref, inView] = useInView({ threshold: 0.12 });

  const [form, setForm] = useState({
    adSoyad: '',
    telefon: '',
    proje: '',
    kvkk: false,
  });
  const [touched, setTouched] = useState({ adSoyad: false, telefon: false });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleBlur = (e) => {
    setTouched((prev) => ({ ...prev, [e.target.name]: true }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setTouched({ adSoyad: true, telefon: true });
    if (!form.adSoyad.trim() || !form.telefon.trim()) return;
    // Gönderim işlemi burada yapılabilir
  };

  const adSoyadError = touched.adSoyad && !form.adSoyad.trim();
  const telefonError = touched.telefon && !form.telefon.trim();

  return (
    <section
      ref={ref}
      className={`iletisim ${inView ? 'iletisim--in-view' : ''}`}
    >
      <img src={bgImage} alt="" className="iletisim__bg" />
      <div className="iletisim__overlay" />
      <div className="iletisim__inner">
        <h2 className="iletisim__title">{t.title}</h2>
        <p className="iletisim__description">{t.description}</p>
        <form className="iletisim__form" onSubmit={handleSubmit} noValidate>
          <div className="iletisim__row">
            <div className="iletisim__field">
              <label htmlFor="adSoyad" className="iletisim__label">
                {t.labelName}
              </label>
              <input
                id="adSoyad"
                name="adSoyad"
                type="text"
                value={form.adSoyad}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`iletisim__input ${adSoyadError ? 'iletisim__input--error' : ''}`}
                placeholder=""
              />
              {adSoyadError && (
                <span className="iletisim__error">{t.errorRequired}</span>
              )}
            </div>
            <div className="iletisim__field">
              <label htmlFor="telefon" className="iletisim__label">
                {t.labelPhone}
              </label>
              <input
                id="telefon"
                name="telefon"
                type="tel"
                value={form.telefon}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`iletisim__input ${telefonError ? 'iletisim__input--error' : ''}`}
                placeholder=""
              />
              {telefonError && (
                <span className="iletisim__error">{t.errorRequired}</span>
              )}
            </div>
            <div className="iletisim__field iletisim__field--proje">
              <label htmlFor="proje" className="iletisim__label">
                {t.labelProject}
              </label>
              <select
                id="proje"
                name="proje"
                value={form.proje}
                onChange={handleChange}
                className="iletisim__select"
              >
                {projeOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
            <button type="submit" className="iletisim__submit">
              {t.submit}
            </button>
          </div>
          <div className="iletisim__row iletisim__row--checkbox">
            <div className="iletisim__field iletisim__field--checkbox">
              <label className="iletisim__checkbox-label">
                <input
                  name="kvkk"
                  type="checkbox"
                  checked={form.kvkk}
                  onChange={handleChange}
                  className="iletisim__checkbox"
                />
                <span className="iletisim__checkbox-text">{t.kvkk}</span>
              </label>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}

export default Iletisim;
