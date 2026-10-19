/** Normalize for Turkish-insensitive filename matching. */
export function normalizeProjectKey(value) {
  return String(value || '')
    .toLocaleLowerCase('tr-TR')
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Cover is always the numbered 0 image (0.jpg / 0.png / 0.JPG).
 * Falls back to the first file if 0.* is missing.
 */
export function pickCoverFile(files) {
  if (!files?.length) return null;

  const zero = files.find((f) => {
    const fileName = (f.fullPath || f.path || '').split(/[/\\]/).pop() || '';
    return /^0\.(jpe?g|png)$/i.test(fileName);
  });
  return zero || files[0];
}
