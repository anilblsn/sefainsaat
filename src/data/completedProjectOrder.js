/**
 * Tamamlanan projeler görüntü sırası.
 * İlk 22 kayıt özel öncelik sırasıdır; kalanlar klasör numarasına göre eklenir.
 */
export const COMPLETED_PROJECT_PRIORITY = [
  '1-EVİNPARK GÖKTÜRK',
  '2-EVİNPARK KEMER',
  '3-EVİNPARK KADIKÖY REZİDANS',
  '4-EVİNPARK ÇINAR',
  '14-EVİNPARK ADA',
  '15-EVİNPARK TEPE',
  '16-EVİNPARK DOĞA',
  '42-EVİNPARK ATAŞEHİR REZİDANS',
  '41-EVİNPARK ÇAMLICA REZİDANS',
  '5-DEDEDEN APT',
  '6-BİRLİK REZİDANS',
  '7-KORU REZİDANS',
  '33-DENİZ REZİDANS',
  '19-ALP REZİDANS',
  '34-CADDE REZİDANS',
  '39-SUADİYE REZİDANS',
  '8-YAŞAR APT',
  '9- TURKMEN APT',
  '12-İZZET UĞUR APT',
  '60-KADER APT',
  '21-ÇAM APT',
  '23-SEDEF APT',
];

/** Folder name (after number prefix) → display label overrides. */
export const COMPLETED_PROJECT_DISPLAY_NAMES = {
  'EVİNPARK DOĞA': 'EVİNPARK Doğa',
  'HALİMAĞA': 'EVİNPARK Doğa',
  'HALIMAGA': 'EVİNPARK Doğa',
  'HALİMAĞA APT': 'EVİNPARK Doğa',
  'HALIMAGA APT': 'EVİNPARK Doğa',
  'EVİNPARK ATAŞEHİR REZİDANS': 'EVİNPARK Ataşehir',
  'EVİNPARK ÇAMLICA REZİDANS': 'EVİNPARK Çamlıca',
  'DEDEDEN APT': 'Dededen Apartmanı',
  'YAŞAR APT': 'Yaşar Apartmanı',
  'TURKMEN APT': 'Turkmen Apartmanı',
  'İZZET UĞUR APT': 'İzzet Uğur Apartmanı',
  'KADER APT': 'Kader Apartmanı',
  'ÇAM APT': 'Çam Apartmanı',
  'SEDEF APT': 'Sedef Apartmanı',
};

function folderNumber(folder) {
  return parseInt((String(folder).match(/^(\d+)/) || [])[1] || '9999', 10);
}

/** Full ordered list: priority first, then remaining by folder number. */
export function buildCompletedProjectOrder(allFolders) {
  const folders = Array.isArray(allFolders) ? [...allFolders] : [];
  const used = new Set();
  const ordered = [];

  COMPLETED_PROJECT_PRIORITY.forEach((id) => {
    if (folders.includes(id) && !used.has(id)) {
      ordered.push(id);
      used.add(id);
    }
  });

  folders
    .filter((f) => !used.has(f))
    .sort((a, b) => folderNumber(a) - folderNumber(b) || a.localeCompare(b, 'tr'))
    .forEach((f) => ordered.push(f));

  return ordered;
}

/** @deprecated Prefer buildCompletedProjectOrder(allFolders) for live folder sync. */
export const COMPLETED_PROJECT_ORDER = buildCompletedProjectOrder([
  ...COMPLETED_PROJECT_PRIORITY,
  // Remaining placeholders kept for backwards compatibility if needed:
  '10-İPEK APT',
  '11-SELVİ APT',
  '13-YAMAN APT',
  '17-BORA APT',
  '18-ÜSTÜN APT',
  '20-ITRİ APT',
  '22-GÜLPALAS APT',
  '24-UGUR APT',
  '25-GÜRSES APT',
  '26-ERENGÜL',
  '27-TEVER APT',
  '28-CAN APT',
  '29-GÖKSEL APT',
  '30-ŞEREF APT',
  '31-AKAY APT',
  '32-ÇAMLI APT',
  '35-VARDAR APT',
  '36-KAYASULTAN',
  '37-BUHARA',
  '38-YAMAN',
  '40-SU REZİDANS',
  '43-ZÜMRÜT REZİDANS',
  '44-SOMER APT',
  '45-İPEK APT',
  '46-ATABEY APT',
  '47-EREL APT',
  '48-SEFA APT',
  '49-KAMER APT',
  '50-ESAY APT',
  '51-ABBASOGLU APT',
  '52-UMUT APT',
  '53-BAHAR APT',
  '54-BENGÜ APT',
  '55-ARZU',
  '56-DERYA APT',
  '57-MİNE APT',
  '58-TAN APT',
  '59-TUNALI APT',
  '61-BİRKAN APT',
  '62-SEFA İŞ MERKEZİ',
  '63-MUTLU APT',
  '64-YANARDAĞ APT',
  '65-ESİN APT',
  '66-GÖLHAN APT',
  '67-KAHRAMAN APT',
  '68-ÇİMEN APT',
  '69-POLAT REZİDANS',
  '70-EREN APT',
  '71-BARLAS APT',
  '72-SEFA APT',
  '73-SOYGEL',
  '74-ÇINAR',
  '75 -ERGÜL APT',
  '76-EKŞİ APT',
  '77-SEFA APT',
  '78-KUZUOĞLU APT',
  '79-UGUR APT',
  '80-SEFA APT',
]);
