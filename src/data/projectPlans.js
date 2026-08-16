const plansContext = require.context(
  '../assets/daireler',
  true,
  /\.(jpe?g|png|pdf)$/i
);

const UNIT_TYPE_RE = /^\d+(?:[.,]\d+)?\+\d+$/;

export const PLAN_FOLDER_BY_KEY = {
  gokturk: '1-Evinpark Göktürk',
  kemer: '2-Evinpark Kemer',
  orman: '3-Evinpark Orman',
  cinar: '4- Evinpark Çınar',
  dededen: '5- Dededen Apartmanı',
  cekmekoy: '6-Evinpark Çekmeköy',
  harput: '7-Evinpark Harput',
};

function unitSortValue(unitType) {
  const m = String(unitType || '').match(/^(\d+)(?:[.,](\d+))?\+(\d+)$/);
  if (!m) return 9000;
  const main = parseInt(m[1], 10);
  const frac = m[2] ? parseInt(m[2], 10) : 0;
  const plus = parseInt(m[3], 10);
  return main * 1000 + frac * 10 + plus;
}

function parseUnitInfo(parts) {
  const dirs = parts.slice(1, -1).filter((p) => !/^daireler$/i.test(p));
  let unitType = '';
  let layout = '';
  dirs.forEach((dir) => {
    const upper = dir.toLocaleUpperCase('tr-TR');
    if (upper === 'DUBLEKS') layout = 'Dubleks';
    else if (upper === 'FOURLEX') layout = 'Fourlex';
    else if (UNIT_TYPE_RE.test(dir)) unitType = dir.replace('.', ',');
  });
  const unitLabel = [unitType, layout].filter(Boolean).join(' · ');
  const layoutOrder = layout === 'Fourlex' ? 2 : layout === 'Dubleks' ? 1 : 0;
  const sortKey = layoutOrder * 10000 + unitSortValue(unitType);
  return { unitType, layout, unitLabel, sortKey };
}

const PLANS_BY_FOLDER = (() => {
  const map = {};
  plansContext.keys().forEach((key) => {
    const rel = key.replace(/^\.\//, '');
    const parts = rel.split('/');
    const folder = parts[0];
    const fileName = parts[parts.length - 1];
    if (/^thumbs\.db$/i.test(fileName)) return;
    const ext = (fileName.split('.').pop() || '').toLowerCase();
    const type = ext === 'pdf' ? 'pdf' : 'image';
    const src = plansContext(key);
    const name = fileName.replace(/\.[^.]+$/, '');
    const unit = parseUnitInfo(parts);
    if (!unit.unitType) return;
    if (!map[folder]) map[folder] = [];
    map[folder].push({ type, src, name, ...unit });
  });
  Object.keys(map).forEach((k) => {
    map[k].sort((a, b) => {
      if (a.sortKey !== b.sortKey) return a.sortKey - b.sortKey;
      if (a.type !== b.type) return a.type === 'image' ? -1 : 1;
      return a.name.localeCompare(b.name, 'tr', { numeric: true });
    });
  });
  return map;
})();

export function getPlans(projectKey) {
  const folder = PLAN_FOLDER_BY_KEY[projectKey];
  return folder ? PLANS_BY_FOLDER[folder] || [] : [];
}

/** Unit types only (1+1, 2+1, …) — dubleks/fourlex fold into the same room count. */
export function getUnitTypes(projectKey) {
  const plans = getPlans(projectKey);
  const types = [...new Set(plans.map((p) => p.unitType).filter(Boolean))];
  return types.sort((a, b) => unitSortValue(a) - unitSortValue(b));
}

export function getPlansByUnitType(projectKey, unitType) {
  return getPlans(projectKey).filter((p) => p.unitType === unitType);
}
