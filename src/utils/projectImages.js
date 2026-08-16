/** Normalize for Turkish-insensitive filename matching. */
export function normalizeProjectKey(value) {
  return String(value || '')
    .toLocaleLowerCase('tr-TR')
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Prefer a cover file named after the project (e.g. "Evinpark Göktürk.jpg"),
 * then fall back to 0.jpg/png, then first image.
 * Prefer .jpg over .png when both named covers exist.
 */
export function pickCoverFile(files, projectName) {
  if (!files?.length) return null;
  const target = normalizeProjectKey(projectName);

  const named = files.filter((f) => {
    const fileName = (f.fullPath || f.path || '').split(/[/\\]/).pop() || '';
    const base = fileName.replace(/\.[^.]+$/, '');
    return normalizeProjectKey(base) === target;
  });

  if (named.length) {
    const jpg = named.find((f) => /\.jpe?g$/i.test(f.fullPath || f.path || ''));
    return jpg || named[0];
  }

  const zero = files.find((f) => /[/\\]0\.(jpe?g|png)$/i.test(f.fullPath || f.path || ''));
  return zero || files[0];
}
