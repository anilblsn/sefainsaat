import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Iletisim from '../components/Iletisim';
import Footer from '../components/Footer';
import { useInView } from '../hooks/useInView';
import { pickContent, useLang } from '../utils/lang';
import logoImg from '../assets/logo/logo2.png';
import './HakkimizdaSayfasi.css';

const HAKKIMIZDA = {
  tr: {
    bannerTitle: 'Hakkımızda',
    paragraphs: [
      'Sefa İnşaat, kuruluşundan bu yana Türkiye’nin birçok bölgesinde gayrimenkul yatırımları gerçekleştiren ve inşaat taahhüt projeleri hayata geçiren, sektördeki deneyimi ve kalite odaklı yaklaşımıyla faaliyetlerini sürdüren bir firmadır. Ağırlıklı olarak yap-sat modeliyle seçkin lokasyonlarda nitelikli ve lüks konut projeleri geliştiren şirketimiz, özel inşaat taahhütleri ve iş merkezi projeleriyle de faaliyet alanını genişletmektedir.',
      'Teknolojik gelişmeleri ve değişen sosyo-kültürel ihtiyaçları yakından takip eden Sefa İnşaat, yenilikçi ve özgün tasarım anlayışıyla çağdaş yaşam alanları üretmeyi hedeflemektedir. Mimari estetiği, işlevselliği ve yapı güvenliğini bir araya getiren projeleriyle sürdürülebilir kentleşmeye ve sağlıklı kentsel dönüşüme katkıda bulunmaktadır. Profesyonel yönetim anlayışı, etkin organizasyon yapısı ve deneyimli teknik kadrosuyla her projeyi kendi gereksinimleri doğrultusunda titizlikle yürütmektedir.',
      'Üstlendiği her projeye sorumluluk bilinci ve yüksek kalite anlayışıyla yaklaşan Sefa İnşaat, sürekli gelişimi esas alarak sektörde kalıcı değerler oluşturmayı amaçlamaktadır. Yapıların sağlamlığını, işlevselliğini ve estetik bütünlüğünü temel öncelikleri arasında gören şirketimiz, güncel standartlara uygun çözümler geliştirerek nitelikli ve uzun ömürlü yapılar ortaya koymaya önem vermektedir.',
      'Dürüstlük, güven, müşteri memnuniyeti, yenilikçilik ve sürdürülebilir kalite ilkelerini benimseyen Sefa İnşaat, müşterileri ve iş ortaklarıyla şeffaf, karşılıklı güvene dayalı ve uzun vadeli ilişkiler kurmayı hedeflemektedir. Her projesinde beklentileri karşılayan, yaşam kalitesini yükselten ve geleceğe değer katan çözümler sunma anlayışıyla hareket ederek deneyimini çağdaş yapı projeleriyle buluşturmaktadır. Sefa İnşaat, güveni sağlam temellerle, kaliteyi özgün tasarımlarla birleştirerek geleceğe değer katan yaşam alanları inşa etmektedir.',
    ],
  },
  en: {
    bannerTitle: 'About Us',
    paragraphs: [
      'Sefa Construction is a company that has carried out real estate investments and contracting projects across many regions of Türkiye since its founding, continuing its operations with sector experience and a quality-focused approach. Primarily developing qualified and luxury residential projects in distinguished locations through the build-and-sell model, our company also expands its scope with private construction contracts and business center projects.',
      'Closely following technological advances and changing socio-cultural needs, Sefa Construction aims to create contemporary living spaces with an innovative and original design approach. Through projects that combine architectural aesthetics, functionality and structural safety, it contributes to sustainable urbanization and healthy urban transformation. With professional management, an effective organization and an experienced technical team, it carefully delivers each project according to its own requirements.',
      'Approaching every project with a sense of responsibility and high quality standards, Sefa Construction aims to create lasting value in the sector through continuous improvement. Seeing durability, functionality and aesthetic integrity as core priorities, our company develops solutions in line with current standards to deliver qualified, long-lasting buildings.',
      'Embracing honesty, trust, customer satisfaction, innovation and sustainable quality, Sefa Construction seeks transparent, mutual-trust-based and long-term relationships with clients and partners. Acting with the understanding of offering solutions that meet expectations, elevate quality of life and add value to the future, it brings its experience together with contemporary building projects. Sefa Construction builds living spaces that add value to the future by combining trust with solid foundations and quality with original designs.',
    ],
  },
  ar: {
    bannerTitle: 'من نحن',
    paragraphs: [
      'سيفا للإنشاءات شركة تنفّذ منذ تأسيسها استثمارات عقارية ومشاريع مقاولات في مناطق عديدة من تركيا، وتواصل نشاطها بخبرة القطاع ونهج يركّز على الجودة. تطوّر شركتنا بشكل أساسي مشاريع سكنية نوعية وفاخرة في مواقع مميزة بنموذج البناء والبيع، وتوسّع مجال عملها أيضاً بعقود بناء خاصة ومشاريع مراكز أعمال.',
      'تتابع سيفا للإنشاءات التطورات التقنية والاحتياجات الاجتماعية والثقافية المتغيرة عن كثب، وتهدف إلى إنتاج مساحات معيشة معاصرة بفهم تصميمي مبتكر وأصيل. وبمشاريع تجمع الجمال المعماري والوظيفية وسلامة المبنى، تسهم في التحضر المستدام والتحول الحضري الصحي. وبإدارة مهنية وتنظيم فعّال وكوادر فنية ذات خبرة، تنفّذ كل مشروع بعناية وفق متطلباته.',
      'تتعامل سيفا للإنشاءات مع كل مشروع بوعي بالمسؤولية ومعايير جودة عالية، وتهدف إلى بناء قيم دائمة في القطاع عبر التطوير المستمر. إذ ترى متانة المباني ووظيفتها ووحدة جمالياتها من أولوياتها الأساسية، وتعطي أهمية لتقديم مبانٍ نوعية وطويلة الأمد عبر حلول توافق المعايير الراهنة.',
      'وبتبني مبادئ الصدق والثقة ورضا العملاء والابتكار والجودة المستدامة، تهدف سيفا للإنشاءات إلى علاقات شفافة طويلة الأمد قائمة على الثقة المتبادلة مع العملاء وشركاء العمل. وتتحرك بفهم تقديم حلول تلبي التوقعات وترفع جودة الحياة وتضيف قيمة للمستقبل، لتلتقي خبرتها بمشاريع البناء المعاصرة. تبني سيفا للإنشاءات مساحات معيشة تضيف قيمة للمستقبل، بجمع الثقة مع أسس متينة والجودة مع تصاميم أصيلة.',
    ],
  },
};

function HakkimizdaSayfasi() {
  const lang = useLang();
  const content = pickContent(HAKKIMIZDA, lang);
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
