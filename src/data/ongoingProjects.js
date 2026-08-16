import gokturk0 from '../assets/tamamlananprojects/1-EVİNPARK GÖKTÜRK/0.jpg';
import gokturk1 from '../assets/tamamlananprojects/1-EVİNPARK GÖKTÜRK/1.jpg';
import gokturk2 from '../assets/tamamlananprojects/1-EVİNPARK GÖKTÜRK/2.jpg';
import gokturk3 from '../assets/tamamlananprojects/1-EVİNPARK GÖKTÜRK/3.jpg';
import gokturk4 from '../assets/tamamlananprojects/1-EVİNPARK GÖKTÜRK/4.jpg';
import gokturk5 from '../assets/tamamlananprojects/1-EVİNPARK GÖKTÜRK/5.jpg';
import gokturk6 from '../assets/tamamlananprojects/1-EVİNPARK GÖKTÜRK/6.jpg';
import gokturkCover from '../assets/tamamlananprojects/1-EVİNPARK GÖKTÜRK/Evinpark Göktürk.jpg';

import kemer0 from '../assets/tamamlananprojects/2-EVİNPARK KEMER/0.jpg';
import kemer1 from '../assets/tamamlananprojects/2-EVİNPARK KEMER/1.jpg';
import kemer2 from '../assets/tamamlananprojects/2-EVİNPARK KEMER/2.jpg';
import kemer3 from '../assets/tamamlananprojects/2-EVİNPARK KEMER/3.jpg';
import kemer4 from '../assets/tamamlananprojects/2-EVİNPARK KEMER/4.jpg';
import kemerCover from '../assets/tamamlananprojects/2-EVİNPARK KEMER/Evinpark Kemer.jpg';

import orman0 from '../assets/devamedenprojects/1-EVİNPARK ORMAN/0.JPG';
import orman1 from '../assets/devamedenprojects/1-EVİNPARK ORMAN/1.JPG';
import orman2 from '../assets/devamedenprojects/1-EVİNPARK ORMAN/2.JPG';
import orman3 from '../assets/devamedenprojects/1-EVİNPARK ORMAN/3.JPG';
import orman4 from '../assets/devamedenprojects/1-EVİNPARK ORMAN/4.JPG';

import cinar0 from '../assets/tamamlananprojects/4-EVİNPARK ÇINAR/0.png';
import cinar1 from '../assets/tamamlananprojects/4-EVİNPARK ÇINAR/1.png';
import cinar2 from '../assets/tamamlananprojects/4-EVİNPARK ÇINAR/2.png';
import cinar3 from '../assets/tamamlananprojects/4-EVİNPARK ÇINAR/3.png';
import cinarCover from '../assets/tamamlananprojects/4-EVİNPARK ÇINAR/Evinpark Çınar.jpg';

import dededen0 from '../assets/tamamlananprojects/5-DEDEDEN APT/0.png';
import dededen1 from '../assets/tamamlananprojects/5-DEDEDEN APT/1.jpg';

import harput0 from '../assets/devamedenprojects/2- EVİNPARK HARPUT/0.jpg';
import harput1 from '../assets/devamedenprojects/2- EVİNPARK HARPUT/1.jpg';
import harput2 from '../assets/devamedenprojects/2- EVİNPARK HARPUT/2.jpg';
import harput3 from '../assets/devamedenprojects/2- EVİNPARK HARPUT/3.jpg';
import harput4 from '../assets/devamedenprojects/2- EVİNPARK HARPUT/4.jpg';

import cekmekoy0 from '../assets/planlananprojects/2-EVİNPARK ÇEKMEKÖY/0.jpg';

import { resolveLang } from '../utils/lang';

export const ONGOING_PROJECT_KEYS = [
  'gokturk',
  'kemer',
  'orman',
  'cinar',
  'dededen',
  'harput',
  'cekmekoy',
];

export const PROJECT_IMAGES = {
  gokturk: [gokturkCover, gokturk0, gokturk1, gokturk2, gokturk3, gokturk4, gokturk5, gokturk6],
  kemer: [kemerCover, kemer0, kemer1, kemer2, kemer3, kemer4],
  orman: [orman0, orman1, orman2, orman3, orman4],
  cinar: [cinarCover, cinar0, cinar1, cinar2, cinar3],
  dededen: [dededen0, dededen1],
  harput: [harput0, harput1, harput2, harput3, harput4],
  cekmekoy: [cekmekoy0],
};

const PROJECT_COPY = {
  tr: {
    gokturk: {
      title: 'EVİNPARK Göktürk',
      tagline: 'Göktürk’te konforlu ve planlı bir yaşam.',
      description: 'EVİNPARK Göktürk; konumu, konforu ve yaşam alanlarıyla öne çıkan bir projemizdir.',
      location: 'Göktürk, İstanbul',
      status: 'Satışı devam ediyor',
      type: 'Konut projesi',
      paragraphs: [
        'EVİNPARK Göktürk, Eyüp Göktürk bölgesinde konumlanan ve günlük yaşamı kolaylaştıran bir konut projesidir. Ulaşım bağlantıları, çevresel yeşil doku ve planlı yerleşimiyle hem yatırım hem yaşam açısından dengeli bir seçenek sunar.',
        'Proje; modern mimari anlayışı, işlevsel daire planları ve ortak alan düzeniyle sakinlerine sakin, düzenli ve konforlu bir yaşam ortamı hedefler. Satışları devam eden proje kapsamında farklı ihtiyaçlara uygun daire seçenekleri değerlendirilebilir.',
      ],
      highlights: [
        'Göktürk’te merkezi ve ulaşılabilir konum',
        'Modern mimari ve işlevsel daire planları',
        'Konfor odaklı yaşam alanları',
        'Sefa İnşaat güvencesiyle satış',
      ],
    },
    kemer: {
      title: 'EVİNPARK Kemer',
      tagline: 'Modern çizgilerle şekillenen yaşam alanları.',
      description: 'EVİNPARK Kemer; modern yaşam alanlarıyla satışı devam eden projelerimiz arasındadır.',
      location: 'Kemerburgaz / İstanbul',
      status: 'Satışı devam ediyor',
      type: 'Konut projesi',
      paragraphs: [
        'EVİNPARK Kemer, modern yaşam beklentilerine yanıt veren planları ve sade-estetik mimarisiyle öne çıkan satışı devam eden bir projedir. Günlük konforu destekleyen mekân kurgusu, proje kimliğinin temelini oluşturur.',
        'Sakinlerine düzenli bir yerleşim, ferah iç mekânlar ve çağdaş bir yaşam standardı sunmayı amaçlayan proje; konum avantajı ve Sefa İnşaat kalitesiyle değerlendirilebilir.',
      ],
      highlights: [
        'Modern mimari yaklaşım',
        'Günlük yaşama uygun daire kurgusu',
        'Satışı devam eden EVİNPARK projesi',
        'Kaliteli malzeme ve işçilik anlayışı',
      ],
    },
    orman: {
      title: 'EVİNPARK Orman',
      tagline: 'Doğayla iç içe villa yaşamı.',
      description:
        'Doğayla iç içe, %70 peyzaj ve yeşil alan oranıyla villalar; çatı terasları, hobi bahçeleri ve geniş bahçe alanlarıyla konforlu bir yaşam sunar.',
      location: 'İstanbul',
      status: 'Satışı devam ediyor',
      type: 'Villa projesi',
      paragraphs: [
        'EVİNPARK Orman, yüksek peyzaj oranı ve yeşil dokusuyla doğanın içinde bir yaşam sunmak üzere kurgulanmıştır. Projede yaklaşık %70 peyzaj ve yeşil alan anlayışı; villa yaşamını açık alanlarla bütünleştirir.',
        'Çatı terasları, hobi bahçeleri ve geniş bahçe kullanım olanaklarıyla aileler için hem mahrem hem sosyal bir yaşam dengesi hedeflenir. Satışı devam eden villa seçenekleriyle doğaya yakın, konforlu bir yerleşim arayanlara hitap eder.',
      ],
      highlights: [
        '%70 peyzaj ve yeşil alan odaklı kurgu',
        'Villa tipolojisi ve geniş bahçe alanları',
        'Çatı terasları ve hobi bahçeleri',
        'Doğayla bütünleşen yaşam atmosferi',
      ],
    },
    cinar: {
      title: 'EVİNPARK Çınar',
      tagline: 'Konumu ve yaşam alanlarıyla dengeli bir proje.',
      description: 'EVİNPARK Çınar; konumu ve yaşam alanlarıyla öne çıkan satışı devam eden projemizdir.',
      location: 'İstanbul',
      status: 'Satışı devam ediyor',
      type: 'Konut projesi',
      paragraphs: [
        'EVİNPARK Çınar, konum avantajını işlevsel yaşam alanlarıyla bir araya getiren satışı devam eden bir konut projesidir. Proje; günlük hayatın ritmine uyum sağlayan planlar ve sade bir mimari dil üzerine kuruludur.',
        'Sakinlerine düzenli ortak alanlar, konforlu daire seçenekleri ve Sefa İnşaat’ın proje yaklaşımıyla güvenilir bir yaşam sunmayı amaçlar.',
      ],
      highlights: [
        'Konum ve yaşam dengesi',
        'İşlevsel daire planları',
        'Satışı devam eden proje',
        'Sefa İnşaat proje güvencesi',
      ],
    },
    dededen: {
      title: 'Dededen Apartmanı',
      tagline: 'Kompakt ve konforlu bir apartman yaşamı.',
      description: 'Dededen Apartmanı; konumu ve konforuyla satışı devam eden projemizdir.',
      location: 'İstanbul',
      status: 'Satışı devam ediyor',
      type: 'Apartman',
      paragraphs: [
        'Dededen Apartmanı, konum ve konforu ön planda tutan, satışı devam eden bir apartman projesidir. Ölçek olarak daha özel bir yapı sunarak sakinlerine düzenli ve yaşanabilir bir ortam hedefler.',
        'Günlük ihtiyaçlara uygun planlanan daireler ve Sefa İnşaat’ın uygulama yaklaşımıyla, pratik şehir yaşamı arayanlar için değerlendirilebilir bir seçenektir.',
      ],
      highlights: [
        'Kompakt ve yaşanabilir planlar',
        'Konum odaklı yerleşim',
        'Satışı devam eden daireler',
        'Sefa İnşaat kalite anlayışı',
      ],
    },
    harput: {
      title: 'EVİNPARK Harput',
      tagline: 'Konfor ve yaşam kalitesini bir araya getiren proje.',
      description: 'EVİNPARK Harput projesi; konumu, konforu ve yaşam alanlarıyla öne çıkan bir projedir.',
      location: 'İstanbul',
      status: 'Satışı devam ediyor',
      type: 'Konut projesi',
      paragraphs: [
        'EVİNPARK Harput; konum, konfor ve yaşam alanlarını aynı çatı altında buluşturmayı hedefleyen satışı devam eden bir projedir. Modern yerleşim anlayışıyla sakinlerine dengeli bir günlük yaşam kurgusu sunar.',
        'Proje kapsamında işlevsel planlar, çağdaş bir mimari dil ve Sefa İnşaat’ın marka yaklaşımı bir araya gelir. Detaylı daire seçenekleri ve güncel satış bilgisi için bizimle iletişime geçebilirsiniz.',
      ],
      highlights: [
        'Konum ve konfor odaklı kurgu',
        'Modern yaşam alanları',
        'Satışı devam eden EVİNPARK projesi',
        'Danışmanlık ve satış desteği',
      ],
    },
    cekmekoy: {
      title: 'EVİNPARK Çekmeköy',
      tagline: 'Çekmeköy’de EVİNPARK yaşamı.',
      description: 'EVİNPARK Çekmeköy projesi; satışı devam eden projelerimiz arasındadır.',
      location: 'Çekmeköy, İstanbul',
      status: 'Satışı devam ediyor',
      type: 'Konut projesi',
      paragraphs: [
        'EVİNPARK Çekmeköy, Çekmeköy’ün gelişen yaşam aksında konumlanan ve satışı devam eden EVİNPARK projelerinden biridir. Bölgenin sunduğu yaşam ve ulaşım olanaklarıyla entegre bir konut deneyimi hedeflenir.',
        'Proje; modern yerleşim anlayışı ve Sefa İnşaat’ın proje disiplinini birleştirerek, Çekmeköy’de yeni bir yaşam adresi arayanlar için değerlendirilebilir bir seçenek sunar. Güncel bilgilendirme için satış ekibimizle iletişime geçebilirsiniz.',
      ],
      highlights: [
        'Çekmeköy konum avantajı',
        'EVİNPARK marka yaşamı',
        'Satışı devam eden proje',
        'Satış ve bilgilendirme desteği',
      ],
    },
  },
  en: {
    gokturk: {
      title: 'EVİNPARK Göktürk',
      tagline: 'Comfortable, well-planned living in Göktürk.',
      description:
        'EVİNPARK Göktürk is one of our ongoing sales projects, standing out with its location, comfort and living spaces.',
      location: 'Göktürk, Istanbul',
      status: 'On sale',
      type: 'Residential project',
      paragraphs: [
        'EVİNPARK Göktürk is a residential project in Eyüp Göktürk that supports everyday living with strong transport links, green surroundings and a planned settlement layout.',
        'With modern architecture, practical apartment plans and thoughtfully arranged common areas, it aims for a calm and comfortable lifestyle. Multiple unit options are available while sales continue.',
      ],
      highlights: [
        'Accessible Göktürk location',
        'Modern architecture and practical layouts',
        'Comfort-focused living spaces',
        'Sefa Construction sales assurance',
      ],
    },
    kemer: {
      title: 'EVİNPARK Kemer',
      tagline: 'Living spaces shaped by modern lines.',
      description: 'EVİNPARK Kemer is among our ongoing sales projects with its modern living spaces.',
      location: 'Kemerburgaz / Istanbul',
      status: 'On sale',
      type: 'Residential project',
      paragraphs: [
        'EVİNPARK Kemer is an ongoing sales project known for modern plans and a clean architectural language. The spatial concept is designed to support daily comfort.',
        'It aims to offer orderly settlement, spacious interiors and a contemporary living standard, backed by location advantages and Sefa Construction quality.',
      ],
      highlights: [
        'Modern architectural approach',
        'Layouts suited to daily life',
        'Ongoing EVİNPARK project',
        'Quality materials and workmanship',
      ],
    },
    orman: {
      title: 'EVİNPARK Orman',
      tagline: 'Villa living surrounded by nature.',
      description:
        'Villas surrounded by nature with 70% landscaping and green area; offering a comfortable lifestyle with roof terraces, hobby gardens and spacious garden areas.',
      location: 'Istanbul',
      status: 'On sale',
      type: 'Villa project',
      paragraphs: [
        'EVİNPARK Orman is designed for life immersed in nature, with a strong landscaping and green-area concept of about 70%. Open spaces are integral to the villa experience.',
        'Roof terraces, hobby gardens and generous garden areas create a balance of privacy and social living for families seeking comfort close to nature.',
      ],
      highlights: [
        'Around 70% landscaping and green areas',
        'Villa typology with large gardens',
        'Roof terraces and hobby gardens',
        'Nature-integrated atmosphere',
      ],
    },
    cinar: {
      title: 'EVİNPARK Çınar',
      tagline: 'Balanced living through location and space.',
      description: 'EVİNPARK Çınar is an ongoing sales project that stands out with its location and living spaces.',
      location: 'Istanbul',
      status: 'On sale',
      type: 'Residential project',
      paragraphs: [
        'EVİNPARK Çınar combines location advantages with functional living spaces. The project is built on practical layouts and a clear architectural language.',
        'It aims to deliver orderly common areas, comfortable unit options and the reliability of Sefa Construction’s project approach.',
      ],
      highlights: [
        'Balance of location and living quality',
        'Functional apartment plans',
        'Ongoing sales',
        'Sefa Construction assurance',
      ],
    },
    dededen: {
      title: 'Dededen Apartment',
      tagline: 'Compact, comfortable apartment living.',
      description: 'Dededen Apartment is an ongoing sales project with its location and comfort.',
      location: 'Istanbul',
      status: 'On sale',
      type: 'Apartment building',
      paragraphs: [
        'Dededen Apartment is an ongoing sales project that prioritizes location and comfort at a more intimate building scale.',
        'Units planned for everyday needs, together with Sefa Construction’s delivery approach, make it a practical option for city living.',
      ],
      highlights: [
        'Compact, livable plans',
        'Location-focused settlement',
        'Units currently on sale',
        'Sefa Construction quality',
      ],
    },
    harput: {
      title: 'EVİNPARK Harput',
      tagline: 'Comfort and living quality under one roof.',
      description: 'EVİNPARK Harput stands out with its location, comfort and living spaces.',
      location: 'Istanbul',
      status: 'On sale',
      type: 'Residential project',
      paragraphs: [
        'EVİNPARK Harput brings together location, comfort and living spaces in an ongoing sales project with a modern settlement concept.',
        'Functional plans, a contemporary architectural language and the EVİNPARK brand approach come together. Contact us for current unit availability.',
      ],
      highlights: [
        'Location and comfort focused',
        'Modern living spaces',
        'Ongoing EVİNPARK project',
        'Sales consultancy support',
      ],
    },
    cekmekoy: {
      title: 'EVİNPARK Çekmeköy',
      tagline: 'EVİNPARK living in Çekmeköy.',
      description: 'EVİNPARK Çekmeköy is among our ongoing sales projects.',
      location: 'Çekmeköy, Istanbul',
      status: 'On sale',
      type: 'Residential project',
      paragraphs: [
        'EVİNPARK Çekmeköy is an ongoing EVİNPARK project on Çekmeköy’s growing living corridor, designed to connect with the area’s lifestyle and transport opportunities.',
        'It combines a modern settlement approach with Sefa Construction’s project discipline. Reach our sales team for the latest information.',
      ],
      highlights: [
        'Çekmeköy location advantage',
        'EVİNPARK brand living',
        'Ongoing sales',
        'Sales information support',
      ],
    },
  },
  ar: {
    gokturk: {
      title: 'EVİNPARK Göktürk',
      tagline: 'حياة مريحة ومخططة في غوكتورك.',
      description: 'مشروع EVİNPARK Göktürk من مشاريعنا قيد البيع، ويتميز بموقعه وراحته ومساحاته المعيشية.',
      location: 'غوكتورك، إسطنبول',
      status: 'قيد البيع',
      type: 'مشروع سكني',
      paragraphs: [
        'يقع EVİNPARK Göktürk في منطقة غوكتورك بإييوب، ويوفر تجربة سكنية مدعومة بروابط مواصلات ومحيط أخضر وتخطيط منظم.',
        'بمعمارية حديثة ومخططات شقق عملية ومساحات مشتركة مدروسة، يهدف المشروع إلى أسلوب حياة هادئ ومريح مع خيارات وحدات متنوعة أثناء استمرار البيع.',
      ],
      highlights: [
        'موقع غوكتورك يسهل الوصول',
        'معمارية حديثة ومخططات عملية',
        'مساحات معيشية تركز على الراحة',
        'ضمان مبيعات سيفا للإنشاءات',
      ],
    },
    kemer: {
      title: 'EVİNPARK Kemer',
      tagline: 'مساحات معيشية بخطوط حديثة.',
      description: 'مشروع EVİNPARK Kemer من مشاريعنا قيد البيع بمساحاته المعيشية الحديثة.',
      location: 'كيمربورغاز / إسطنبول',
      status: 'قيد البيع',
      type: 'مشروع سكني',
      paragraphs: [
        'EVİNPARK Kemer مشروع قيد البيع يتميز بمخططات حديثة ولغة معمارية بسيطة تدعم راحة الحياة اليومية.',
        'يهدف إلى تقديم استقرار منظم وداخل واسع ومعايير معيشة عصرية بدعم من الموقع وجودة سيفا للإنشاءات.',
      ],
      highlights: [
        'نهج معماري حديث',
        'مخططات مناسبة للحياة اليومية',
        'مشروع EVİNPARK قيد البيع',
        'مواد وتنفيذ عالي الجودة',
      ],
    },
    orman: {
      title: 'EVİNPARK Orman',
      tagline: 'حياة فلل وسط الطبيعة.',
      description:
        'فلل محاطة بالطبيعة بنسبة 70٪ مساحات خضراء وتنسيق حدائق؛ توفر أسلوب حياة مريحاً مع شرفات السطح وحدائق الهوايات ومساحات الحديقة الواسعة.',
      location: 'إسطنبول',
      status: 'قيد البيع',
      type: 'مشروع فلل',
      paragraphs: [
        'صُمم EVİNPARK Orman لحياة مندمجة مع الطبيعة بنسبة تنسيق ومساحات خضراء تقارب 70٪، حيث تكون المساحات المفتوحة جزءاً أساسياً من تجربة الفيلا.',
        'توفر شرفات السطح وحدائق الهوايات والحدائق الواسعة توازناً بين الخصوصية والحياة الاجتماعية للعائلات الباحثة عن الراحة قرب الطبيعة.',
      ],
      highlights: [
        'حوالي 70٪ مساحات خضراء وتنسيق',
        'نمط فلل مع حدائق واسعة',
        'شرفات سطح وحدائق هوايات',
        'أجواء مندمجة مع الطبيعة',
      ],
    },
    cinar: {
      title: 'EVİNPARK Çınar',
      tagline: 'توازن بين الموقع والمساحات المعيشية.',
      description: 'مشروع EVİNPARK Çınar قيد البيع ويتميز بموقعه ومساحاته المعيشية.',
      location: 'إسطنبول',
      status: 'قيد البيع',
      type: 'مشروع سكني',
      paragraphs: [
        'يجمع EVİNPARK Çınar بين ميزة الموقع والمساحات المعيشية العملية عبر مخططات وظيفية ولغة معمارية واضحة.',
        'يهدف إلى تقديم مساحات مشتركة منظمة وخيارات شقق مريحة ونهج موثوق من سيفا للإنشاءات.',
      ],
      highlights: [
        'توازن الموقع وجودة المعيشة',
        'مخططات شقق عملية',
        'بيع مستمر',
        'ضمان سيفا للإنشاءات',
      ],
    },
    dededen: {
      title: 'Dededen Apartmanı',
      tagline: 'حياة شقق مدمجة ومريحة.',
      description: 'مبنى Dededen Apartmanı مشروع قيد البيع يتميز بموقعه وراحته.',
      location: 'إسطنبول',
      status: 'قيد البيع',
      type: 'مبنى شقق',
      paragraphs: [
        'Dededen Apartmanı مشروع قيد البيع يركز على الموقع والراحة ضمن مقياس بناء أكثر خصوصية.',
        'وحدات مخططة للاحتياجات اليومية مع نهج تنفيذ سيفا للإنشاءات تجعله خياراً عملياً لحياة المدينة.',
      ],
      highlights: [
        'مخططات مدمجة وقابلة للعيش',
        'استقرار يركز على الموقع',
        'وحدات قيد البيع',
        'جودة سيفا للإنشاءات',
      ],
    },
    harput: {
      title: 'EVİNPARK Harput',
      tagline: 'الراحة وجودة المعيشة معاً.',
      description: 'يتميز مشروع EVİNPARK Harput بموقعه وراحته ومساحاته المعيشية.',
      location: 'إسطنبول',
      status: 'قيد البيع',
      type: 'مشروع سكني',
      paragraphs: [
        'يجمع EVİNPARK Harput الموقع والراحة والمساحات المعيشية في مشروع قيد البيع بمفهوم استيطان حديث.',
        'تلتقي المخططات العملية واللغة المعمارية المعاصرة ونهج علامة EVİNPARK. تواصل معنا لمعرفة الوحدات المتاحة حالياً.',
      ],
      highlights: [
        'تركيز على الموقع والراحة',
        'مساحات معيشية حديثة',
        'مشروع EVİNPARK قيد البيع',
        'دعم استشارات المبيعات',
      ],
    },
    cekmekoy: {
      title: 'EVİNPARK Çekmeköy',
      tagline: 'حياة EVİNPARK في تشكمكوي.',
      description: 'مشروع EVİNPARK Çekmeköy من مشاريعنا قيد البيع.',
      location: 'تشكمكوي، إسطنبول',
      status: 'قيد البيع',
      type: 'مشروع سكني',
      paragraphs: [
        'EVİNPARK Çekmeköy مشروع قيد البيع على محور تشكمكوي المتنامي، مصمم ليتصل بفرص الحياة والمواصلات في المنطقة.',
        'يجمع نهجاً استيطانياً حديثاً مع انضباط مشاريع سيفا للإنشاءات. تواصل مع فريق المبيعات لأحدث المعلومات.',
      ],
      highlights: [
        'ميزة موقع تشكمكوي',
        'حياة علامة EVİNPARK',
        'بيع مستمر',
        'دعم معلومات المبيعات',
      ],
    },
  },
};

export function getOngoingProject(slug, lang) {
  const key = String(slug || '').toLowerCase();
  if (!ONGOING_PROJECT_KEYS.includes(key)) return null;
  const l = resolveLang(lang);
  const copy = (PROJECT_COPY[l] || PROJECT_COPY.tr)[key] || PROJECT_COPY.tr[key];
  return {
    key,
    images: PROJECT_IMAGES[key] || [],
    title: copy.title,
    tagline: copy.tagline,
    description: copy.description,
    location: copy.location,
    status: copy.status,
    type: copy.type,
    paragraphs: copy.paragraphs || [copy.description],
    highlights: copy.highlights || [],
  };
}

export function getOngoingProjects(lang) {
  return ONGOING_PROJECT_KEYS.map((key) => getOngoingProject(key, lang)).filter(Boolean);
}
